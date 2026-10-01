import '@tanstack/react-start/server-only';

import { Result, TaggedError } from 'better-result';
import sanitizeHtml from 'sanitize-html';
import * as z from 'zod';

import { HOME_NEWS_YOUTUBE_CHANNEL_ID, HOME_NEWS_YOUTUBE_HANDLE } from '../home-constants';
import type { HomeNewsFeed, HomeNewsPost, HomeNewsQuotedPost, HomeNewsSource, HomeNewsVideo, HomeRankedBatchVideo } from './news';

import { env } from '@/env';

const NEWS_FEED_POST_LIMIT = 15;
const FEED_CACHE_MS = 10 * 60 * 1000;
const FEED_RETRY_MS = 15 * 1000;
const REQUEST_TIMEOUT_MS = 8_000;
const POST_BODY_LENGTH = 500;
const YOUTUBE_POST_BODY_WORD_LIMIT = 22;
const SHORT_URL_TIMEOUT_MS = 4_000;
const YOUTUBE_SHORT_MAX_SECONDS = 3 * 60;

type SocialSource = HomeNewsSource | 'url';

class HomeNewsFetchError extends TaggedError('HomeNewsFetchError')<{
   source: SocialSource;
   message: string;
   cause: unknown;
}>() {}

const patreonPostSchema = z.object({
   id: z.string(),
   attributes: z.object({
      title: z.string().optional(),
      content: z.string().optional(),
      published_at: z.string().optional(),
      url: z.string().optional(),
      is_public: z.boolean().optional()
   })
});
const patreonPostsResponseSchema = z.object({
   data: z.array(patreonPostSchema).optional(),
   links: z.object({ next: z.string().nullable().optional() }).optional()
});

const xTweetSchema = z.object({
   id: z.string(),
   text: z.string(),
   author_id: z.string().optional(),
   created_at: z.string().optional(),
   attachments: z.object({ media_keys: z.array(z.string()).optional() }).optional(),
   referenced_tweets: z
      .array(
         z.object({
            type: z.enum(['retweeted', 'quoted', 'replied_to']),
            id: z.string()
         })
      )
      .optional(),
   entities: z
      .object({
         urls: z
            .array(
               z.object({
                  url: z.string(),
                  expanded_url: z.string().optional(),
                  unwound_url: z.string().optional(),
                  // present when the t.co link points at the tweet's own media
                  media_key: z.string().optional()
               })
            )
            .optional()
      })
      .optional()
});
const xMediaSchema = z.object({
   media_key: z.string(),
   type: z.enum(['photo', 'video', 'animated_gif']),
   url: z.string().optional(),
   alt_text: z.string().optional(),
   preview_image_url: z.string().optional(),
   variants: z
      .array(
         z.object({
            bit_rate: z.number().optional(),
            content_type: z.string(),
            url: z.string()
         })
      )
      .optional()
});
const xUserSchema = z.object({ id: z.string(), username: z.string().optional() });
const xPostsResponseSchema = z.object({
   data: z.array(xTweetSchema).optional(),
   includes: z
      .object({
         tweets: z.array(xTweetSchema).optional(),
         users: z.array(xUserSchema).optional(),
         media: z.array(xMediaSchema).optional()
      })
      .optional()
});
const xUserResponseSchema = z.object({ data: z.object({ id: z.string() }) });

const youtubeThumbnailSchema = z.object({ url: z.string() });
const youtubeThumbnailsSchema = z.object({
   default: youtubeThumbnailSchema.optional(),
   medium: youtubeThumbnailSchema.optional(),
   high: youtubeThumbnailSchema.optional(),
   standard: youtubeThumbnailSchema.optional(),
   maxres: youtubeThumbnailSchema.optional()
});
const youtubePlaylistItemSchema = z.object({
   snippet: z.object({
      title: z.string(),
      description: z.string(),
      publishedAt: z.string(),
      thumbnails: youtubeThumbnailsSchema.optional(),
      resourceId: z.object({ videoId: z.string().optional() })
   }),
   contentDetails: z.object({ videoPublishedAt: z.string().optional() }).optional()
});
const youtubePlaylistResponseSchema = z.object({ items: z.array(youtubePlaylistItemSchema).optional() });
const youtubeVideosResponseSchema = z.object({
   items: z
      .array(
         z.object({
            id: z.string(),
            contentDetails: z.object({ duration: z.string() })
         })
      )
      .optional()
});

type PatreonPost = z.infer<typeof patreonPostSchema>;
type XTweet = z.infer<typeof xTweetSchema>;
type XMedia = z.infer<typeof xMediaSchema>;
type YouTubeThumbnails = z.infer<typeof youtubeThumbnailsSchema>;

type YouTubeVideo = {
   id: string;
   title: string;
   description: string;
   publishedAt: string;
   imageUrl?: string;
   durationSeconds: number | null;
};

// x posts carry their linked urls until duplicate filtering, then only the post is published
type XPost = {
   post: HomeNewsPost;
   linkedUrls: string[];
};
interface CachedSources {
   patreon: HomeNewsPost[] | null;
   youtube: YouTubeVideo[] | null;
   x: XPost[] | null;
}

let cachedFeed: { expiresAt: number; feed: HomeNewsFeed } | null = null;
let pendingRefresh: Promise<void> | null = null;
const cachedSources: CachedSources = {
   patreon: null,
   youtube: null,
   x: null
};

export async function getHomeNewsFeed() {
   if (cachedFeed && cachedFeed.expiresAt > Date.now()) return cachedFeed.feed;

   if (!pendingRefresh) {
      pendingRefresh = refreshHomeNewsFeed().then(() => {
         pendingRefresh = null;
      });
   }

   // external news is optional, so never hold a page response open for it
   return cachedFeed?.feed ?? emptyHomeNewsFeed();
}

async function refreshHomeNewsFeed() {
   const result = await Result.tryPromise({
      try: loadHomeNewsFeed,
      catch: (cause) =>
         new HomeNewsFetchError({
            source: 'url',
            message: 'background refresh failed',
            cause
         })
   });

   const feed = Result.match(result, {
      ok: (value) => value,
      err: (error) => {
         logHomeNewsError(error);
         return cachedFeed?.feed ?? emptyHomeNewsFeed();
      }
   });

   cachedFeed = {
      expiresAt: Date.now() + (result.isOk() ? FEED_CACHE_MS : FEED_RETRY_MS),
      feed
   };
}

async function loadHomeNewsFeed(): Promise<HomeNewsFeed> {
   const [patreonPosts, youtubeVideos, xPosts] = await Promise.all([
      fetchOptional('patreon', fetchPatreonPosts),
      fetchOptional('youtube', fetchYouTubeVideos),
      fetchOptional('x', fetchXPosts)
   ]);

   if (patreonPosts != null) cachedSources.patreon = patreonPosts;
   if (youtubeVideos != null) cachedSources.youtube = youtubeVideos;
   if (xPosts != null) cachedSources.x = xPosts;

   const currentPatreonPosts = cachedSources.patreon ?? [];
   const currentYouTubeVideos = cachedSources.youtube ?? [];
   const currentXPosts = cachedSources.x ?? [];
   const latestRankedBatchVideo = await findLatestRankedBatchVideo(currentYouTubeVideos);
   const filteredXPosts = await removeDuplicateXPosts(currentXPosts, latestRankedBatchVideo);
   const posts = [...currentPatreonPosts, ...currentYouTubeVideos.map(toYouTubePost), ...filteredXPosts]
      .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
      .slice(0, NEWS_FEED_POST_LIMIT);

   return {
      posts,
      latestRankedBatchVideo,
      generatedAt: new Date().toISOString()
   };
}

function emptyHomeNewsFeed(): HomeNewsFeed {
   return {
      posts: [],
      latestRankedBatchVideo: null,
      generatedAt: new Date().toISOString()
   };
}

// null means the source failed, so the feed is degraded rather than legitimately empty
async function fetchOptional<T>(source: SocialSource, load: () => Promise<T>) {
   const result = await Result.tryPromise({
      try: load,
      catch: (cause) =>
         new HomeNewsFetchError({
            source,
            message: `failed to load ${source} feed`,
            cause
         })
   });

   return Result.match(result, {
      ok: (value) => value,
      err: (error) => {
         logHomeNewsError(error);
         return null;
      }
   });
}

function logHomeNewsError(error: HomeNewsFetchError) {
   const cause = error.cause instanceof Error ? error.cause.message : String(error.cause);
   console.warn(`[home news] ${error.message}: ${cause}`);
}

async function fetchPatreonPosts(): Promise<HomeNewsPost[]> {
   if (!env.HOME_NEWS_PATREON_ACCESS_TOKEN || !env.HOME_NEWS_PATREON_CAMPAIGN_ID) return [];

   const url = new URL(`https://www.patreon.com/api/oauth2/v2/campaigns/${env.HOME_NEWS_PATREON_CAMPAIGN_ID}/posts`);
   url.searchParams.set('fields[post]', 'title,content,published_at,url,is_public');
   url.searchParams.set('page[count]', String(NEWS_FEED_POST_LIMIT));

   const response = await fetchJson('patreon', url, patreonPostsResponseSchema, { headers: patreonHeaders() });

   return (response.data ?? [])
      .filter((post) => post.attributes.is_public)
      .sort((a, b) => Date.parse(b.attributes.published_at ?? '') - Date.parse(a.attributes.published_at ?? ''))
      .map((post) => ({
         id: `patreon:${post.id}`,
         source: 'patreon',
         sourceLabel: 'Patreon',
         title: post.attributes.title ?? 'Patreon post',
         body: excerpt(htmlToText(post.attributes.content ?? ''), POST_BODY_LENGTH),
         href: patreonPostUrl(post),
         publishedAt: post.attributes.published_at ?? new Date(0).toISOString()
      }));
}

async function fetchXPosts(): Promise<XPost[]> {
   if (!env.HOME_NEWS_X_BEARER_TOKEN) return [];

   const userId = await fetchXUserId();
   const url = new URL(`https://api.x.com/2/users/${userId}/tweets`);
   url.searchParams.set('max_results', String(NEWS_FEED_POST_LIMIT));
   url.searchParams.set('tweet.fields', 'author_id,created_at,entities,referenced_tweets');
   url.searchParams.set(
      'expansions',
      'attachments.media_keys,referenced_tweets.id,referenced_tweets.id.author_id,referenced_tweets.id.attachments.media_keys'
   );
   url.searchParams.set('media.fields', 'url,type,alt_text,preview_image_url,variants');
   url.searchParams.set('user.fields', 'username');
   url.searchParams.set('exclude', 'replies');

   const response = await fetchJson('x', url, xPostsResponseSchema, { headers: xHeaders() });
   const tweetsById = new Map((response.includes?.tweets ?? []).map((tweet) => [tweet.id, tweet]));
   const usersById = new Map((response.includes?.users ?? []).map((user) => [user.id, user]));
   const mediaByKey = new Map((response.includes?.media ?? []).map((media) => [media.media_key, media]));

   return (response.data ?? []).flatMap((tweet) => {
      // exclude=replies keeps self-replies, so drop those thread continuations ourselves
      if (tweet.referenced_tweets?.some((reference) => reference.type === 'replied_to')) return [];

      const repostReference = tweet.referenced_tweets?.find((reference) => reference.type === 'retweeted');
      const repostedTweet = repostReference ? tweetsById.get(repostReference.id) : undefined;
      const repostedAuthor = repostedTweet?.author_id ? usersById.get(repostedTweet.author_id) : undefined;
      const contentTweet = repostedTweet ?? tweet;
      const quoteReference = contentTweet.referenced_tweets?.find((reference) => reference.type === 'quoted');
      const quotedTweet = quoteReference ? tweetsById.get(quoteReference.id) : undefined;
      const quotedAuthor = quotedTweet?.author_id ? usersById.get(quotedTweet.author_id) : undefined;
      const quotedPost = quotedTweet && quotedAuthor?.username ? toQuotedPost(quotedTweet, quotedAuthor.username, mediaByKey) : undefined;
      const text = tweetText(contentTweet, quotedPost?.id);
      const { images, video } = tweetMedia(contentTweet, mediaByKey);
      if (!text && images.length === 0 && !video && !quotedPost) return [];

      const originalUsername = repostedAuthor?.username;
      const sourceLabel = originalUsername ? `@${originalUsername}` : `@${env.HOME_NEWS_X_USERNAME}`;
      const sourceHref = `https://x.com/${originalUsername ?? env.HOME_NEWS_X_USERNAME}`;
      const href = originalUsername
         ? `https://x.com/${originalUsername}/status/${contentTweet.id}`
         : `https://x.com/${env.HOME_NEWS_X_USERNAME}/status/${tweet.id}`;

      return [
         {
            post: {
               id: `x:${tweet.id}`,
               source: 'x',
               sourceLabel,
               sourceHref,
               repostedBy: originalUsername
                  ? {
                       label: `@${env.HOME_NEWS_X_USERNAME}`,
                       href: `https://x.com/${env.HOME_NEWS_X_USERNAME}`
                    }
                  : undefined,
               body: excerpt(text, POST_BODY_LENGTH),
               href,
               publishedAt: tweet.created_at ?? new Date(0).toISOString(),
               images,
               video,
               quotedPost
            },
            linkedUrls: tweetLinkedUrls(contentTweet)
         }
      ];
   });
}

function toQuotedPost(tweet: XTweet, authorUsername: string, mediaByKey: Map<string, XMedia>): HomeNewsQuotedPost {
   const { images, video } = tweetMedia(tweet, mediaByKey);

   return {
      id: tweet.id,
      sourceLabel: `@${authorUsername}`,
      sourceHref: `https://x.com/${authorUsername}`,
      body: excerpt(tweetText(tweet), POST_BODY_LENGTH),
      href: `https://x.com/${authorUsername}/status/${tweet.id}`,
      publishedAt: tweet.created_at ?? new Date(0).toISOString(),
      images,
      video
   };
}

function tweetMedia(tweet: XTweet, mediaByKey: Map<string, XMedia>) {
   const media = (tweet.attachments?.media_keys ?? []).map((key) => mediaByKey.get(key)).filter((item) => item != null);
   const images = media.flatMap((item) => (item.type === 'photo' && item.url ? [{ url: item.url, alt: item.alt_text }] : []));
   const videoMedia = media.find((item) => item.type === 'video' || item.type === 'animated_gif');

   return {
      images,
      video: videoMedia ? toNewsVideo(videoMedia) : undefined
   };
}

function toNewsVideo(media: XMedia): HomeNewsVideo | undefined {
   const mp4Variants = media.variants?.filter((variant) => variant.content_type === 'video/mp4') ?? [];
   const playbackUrl = mp4Variants.reduce<(typeof mp4Variants)[number] | undefined>(
      (best, variant) => (!best || (variant.bit_rate ?? 0) > (best.bit_rate ?? 0) ? variant : best),
      undefined
   )?.url;

   if (!playbackUrl && !media.preview_image_url) return undefined;
   return { playbackUrl, posterUrl: media.preview_image_url };
}

// the id never changes for a username, so look it up once per process
let cachedXUserId: string | null = null;

async function fetchXUserId() {
   if (cachedXUserId) return cachedXUserId;

   const url = new URL(`https://api.x.com/2/users/by/username/${env.HOME_NEWS_X_USERNAME}`);
   const response = await fetchJson('x', url, xUserResponseSchema, {
      headers: xHeaders()
   });

   cachedXUserId = response.data.id;
   return cachedXUserId;
}

async function fetchYouTubeVideos(): Promise<YouTubeVideo[]> {
   if (!env.HOME_NEWS_YOUTUBE_API_KEY) return [];

   const uploadsPlaylistId = HOME_NEWS_YOUTUBE_CHANNEL_ID.replace(/^UC/, 'UU');
   const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems');
   url.searchParams.set('key', env.HOME_NEWS_YOUTUBE_API_KEY);
   url.searchParams.set('part', 'snippet,contentDetails');
   url.searchParams.set('playlistId', uploadsPlaylistId);
   url.searchParams.set('maxResults', String(NEWS_FEED_POST_LIMIT));

   const response = await fetchJson('youtube', url, youtubePlaylistResponseSchema);
   const items = (response.items ?? []).flatMap((item) => {
      const id = item.snippet.resourceId.videoId;
      if (!id || item.snippet.title === 'Private video' || item.snippet.title === 'Deleted video') return [];
      return [{ id, item }];
   });
   if (items.length === 0) return [];

   const videosUrl = new URL('https://www.googleapis.com/youtube/v3/videos');
   videosUrl.searchParams.set('key', env.HOME_NEWS_YOUTUBE_API_KEY);
   videosUrl.searchParams.set('part', 'contentDetails');
   videosUrl.searchParams.set('id', items.map(({ id }) => id).join(','));

   const videosResponse = await fetchJson('youtube', videosUrl, youtubeVideosResponseSchema);
   const durations = new Map(videosResponse.items?.map((item) => [item.id, parseYouTubeDuration(item.contentDetails.duration)]));

   return items.map(({ id, item }) => ({
      id,
      title: item.snippet.title,
      description: item.snippet.description,
      publishedAt: item.contentDetails?.videoPublishedAt ?? item.snippet.publishedAt,
      imageUrl: getBestYouTubeThumbnail(item.snippet.thumbnails),
      durationSeconds: durations.get(id) ?? null
   }));
}

// drop tweets that only relay content the feed already shows: patreon posts or the ranked batch video
async function removeDuplicateXPosts(posts: XPost[], latestRankedBatchVideo: HomeRankedBatchVideo | null) {
   const withResolvedUrls = await Promise.all(
      posts.map(async ({ post, linkedUrls }) => ({
         post,
         urls: await Promise.all(linkedUrls.map(resolveShortUrl))
      }))
   );

   return withResolvedUrls
      .filter(({ urls }) => {
         if (urls.some(isPatreonPostUrl)) return false;
         return !latestRankedBatchVideo || !urls.some((url) => getYouTubeVideoId(url) === latestRankedBatchVideo.id);
      })
      .map(({ post }) => post);
}

async function resolveShortUrl(value: string) {
   if (!isTwitterShortUrl(value)) return value;

   const result = await Result.tryPromise({
      try: async () => {
         const response = await fetch(value, {
            method: 'GET',
            cache: 'no-store',
            redirect: 'follow',
            signal: AbortSignal.timeout(SHORT_URL_TIMEOUT_MS)
         });

         return response.url;
      },
      catch: (cause) =>
         new HomeNewsFetchError({
            source: 'url',
            message: 'failed to resolve short url',
            cause
         })
   });

   return Result.unwrapOr(result, value);
}

async function fetchJson<TSchema extends z.ZodType>(source: SocialSource, url: URL, schema: TSchema, init?: RequestInit): Promise<z.output<TSchema>> {
   const response = await fetch(url, {
      ...init,
      cache: 'no-store',
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS)
   });

   if (!response.ok) {
      throw new HomeNewsFetchError({
         source,
         message: `${source} request failed (${response.status})`,
         cause: {
            url: redactedUrl(url),
            status: response.status,
            statusText: response.statusText
         }
      });
   }

   return schema.parse(await response.json());
}

function xHeaders() {
   return {
      Authorization: `Bearer ${env.HOME_NEWS_X_BEARER_TOKEN}`
   };
}

function patreonHeaders() {
   return {
      Authorization: `Bearer ${env.HOME_NEWS_PATREON_ACCESS_TOKEN}`,
      'User-Agent': 'ScoreSaber Website - Home News Feed'
   };
}

function toYouTubePost(video: YouTubeVideo): HomeNewsPost {
   return {
      id: `youtube:${video.id}`,
      source: 'youtube',
      sourceLabel: HOME_NEWS_YOUTUBE_HANDLE,
      sourceHref: `https://www.youtube.com/${HOME_NEWS_YOUTUBE_HANDLE}`,
      title: video.title,
      body: wordExcerpt(video.description, YOUTUBE_POST_BODY_WORD_LIMIT),
      href: youtubeWatchUrl(video.id),
      publishedAt: video.publishedAt
   };
}

async function findLatestRankedBatchVideo(videos: YouTubeVideo[]): Promise<HomeRankedBatchVideo | null> {
   const video = videos.find(isRankedBatchVideo);
   if (!video) return null;

   return {
      id: video.id,
      title: video.title,
      body: excerpt(video.description, 320),
      href: youtubeWatchUrl(video.id),
      publishedAt: video.publishedAt,
      imageUrl: (await fetchMaxResThumbnail(video.id)) ?? video.imageUrl,
      reweightsHref: rankedBatchReweightsHref(video)
   };
}

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// reweight wiki pages are keyed by the batch month, e.g. .../reweights/2026/May-2026
function rankedBatchReweightsHref(video: YouTubeVideo) {
   const month = MONTH_NAMES.find((name) => new RegExp(`\\b${name}\\b`, 'i').test(video.title));
   if (!month) return undefined;

   const year = video.title.match(/\b20\d{2}\b/)?.[0] ?? String(new Date(video.publishedAt).getFullYear());
   return `https://wiki.scoresaber.com/ranking/reweights/${year}/${month}-${year}`;
}

// the search api only returns letterboxed 4:3 thumbnails; the 16:9 maxres
// variant only exists for some videos, so probe before using it
async function fetchMaxResThumbnail(videoId: string) {
   const url = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
   const result = await Result.tryPromise({
      try: async () => {
         const response = await fetch(url, {
            method: 'HEAD',
            cache: 'no-store',
            signal: AbortSignal.timeout(SHORT_URL_TIMEOUT_MS)
         });

         return response.ok ? url : null;
      },
      catch: (cause) =>
         new HomeNewsFetchError({
            source: 'youtube',
            message: 'failed to probe maxres thumbnail',
            cause
         })
   });

   return Result.unwrapOr(result, null);
}

function isRankedBatchVideo(video: YouTubeVideo) {
   return (
      video.durationSeconds != null &&
      video.durationSeconds > YOUTUBE_SHORT_MAX_SECONDS &&
      /\b(?:ranked\s+(?:maps?\s+)?batch|ranking\s+batch|batch\s+overview)\b/i.test(`${video.title}\n${video.description}`)
   );
}

function parseYouTubeDuration(value: string) {
   const match = value.match(/^P(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?$/);
   if (!match) return null;

   const [, days = '0', hours = '0', minutes = '0', seconds = '0'] = match;
   return Number(days) * 86_400 + Number(hours) * 3_600 + Number(minutes) * 60 + Number(seconds);
}

function tweetLinkedUrls(tweet: XTweet) {
   return tweet.entities?.urls?.map((url) => url.unwound_url ?? url.expanded_url ?? url.url) ?? [];
}

function isPatreonPostUrl(value: string) {
   const url = parseUrl(value);
   if (!url) return false;

   const host = stripWww(url.hostname);
   return (host === 'patreon.com' || host.endsWith('.patreon.com')) && url.pathname.startsWith('/posts/');
}

function patreonPostUrl(post: PatreonPost) {
   if (!post.attributes.url) return `https://www.patreon.com/posts/${post.id}`;
   return URL.canParse(post.attributes.url) ? post.attributes.url : `https://www.patreon.com${post.attributes.url}`;
}

function isTwitterShortUrl(value: string) {
   return parseUrl(value)?.hostname === 't.co';
}

function getYouTubeVideoId(value: string) {
   const url = parseUrl(value);
   if (!url) return null;

   const host = stripWww(url.hostname);
   if (host === 'youtu.be') return url.pathname.split('/').filter(Boolean)[0] ?? null;
   if (host !== 'youtube.com' && host !== 'm.youtube.com' && host !== 'music.youtube.com') return null;
   if (url.pathname === '/watch') return url.searchParams.get('v');

   const [kind, id] = url.pathname.split('/').filter(Boolean);
   return kind === 'shorts' || kind === 'embed' || kind === 'live' ? (id ?? null) : null;
}

function parseUrl(value: string) {
   return URL.canParse(value) ? new URL(value) : null;
}

function redactedUrl(url: URL) {
   const redacted = new URL(url);
   if (redacted.searchParams.has('key')) {
      redacted.searchParams.set('key', '[redacted]');
   }

   return redacted.toString();
}

function youtubeWatchUrl(id: string) {
   return `https://www.youtube.com/watch?v=${id}`;
}

function getBestYouTubeThumbnail(thumbnails: YouTubeThumbnails | undefined) {
   return thumbnails?.maxres?.url ?? thumbnails?.standard?.url ?? thumbnails?.high?.url ?? thumbnails?.medium?.url ?? thumbnails?.default?.url;
}

// expand t.co links to their real urls, drop links to the tweet's own media,
// strip leftover short links, and decode the html entities x escapes
function tweetText(tweet: XTweet, omittedTweetId?: string) {
   let text = tweet.text;
   for (const url of tweet.entities?.urls ?? []) {
      const expandedUrl = url.unwound_url ?? url.expanded_url ?? url.url;
      text = text.replaceAll(url.url, url.media_key || getXTweetId(expandedUrl) === omittedTweetId ? '' : expandedUrl);
   }

   return normalizeWhitespace(text.replace(/https:\/\/t\.co\/\w+/g, ''))
      .replaceAll('&lt;', '<')
      .replaceAll('&gt;', '>')
      .replaceAll('&amp;', '&');
}

function getXTweetId(value: string) {
   const url = parseUrl(value);
   if (!url) return null;

   const host = stripWww(url.hostname);
   if (host !== 'x.com' && host !== 'twitter.com' && host !== 'mobile.twitter.com') return null;

   const path = url.pathname.split('/').filter(Boolean);
   const statusIndex = path.indexOf('status');
   return statusIndex === -1 ? null : (path[statusIndex + 1] ?? null);
}

function htmlToText(value: string) {
   return normalizeWhitespace(
      sanitizeHtml(value, {
         allowedTags: [],
         allowedAttributes: {}
      })
   );
}

function normalizeWhitespace(value: string) {
   return value.replace(/\s+/g, ' ').trim();
}

function excerpt(value: string, length: number) {
   const normalized = normalizeWhitespace(value);
   if (normalized.length <= length) return normalized;
   return `${normalized.slice(0, length - 1).trimEnd()}...`;
}

function wordExcerpt(value: string, wordLimit: number) {
   const words = normalizeWhitespace(value).split(' ').filter(Boolean);
   if (words.length <= wordLimit) return words.join(' ');
   return `${words.slice(0, wordLimit).join(' ')}...`;
}

function stripWww(hostname: string) {
   return hostname.toLowerCase().replace(/^www\./, '');
}
