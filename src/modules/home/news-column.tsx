import { useEffect, useRef, useState } from 'react';

import { ExternalLink, Maximize2, Play, Repeat2 } from 'lucide-react';
import { useTranslations } from 'use-intl';

import type { HomeNewsPost, HomeNewsQuotedPost, HomeNewsVideo } from './actions/news';
import { HomeColumnEmptyCard } from './home-column';

import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import { Icons } from '@/shared/components/icons';
import { Time } from '@/shared/components/time';
import { cn } from '@/shared/format/helpers';
import { socialLinks } from '@/shell/nav-data';

const NEWS_SOCIAL_LABELS = new Set(['Patreon', 'X', 'YouTube']);

const NEWS_ACTION_CLASS = 'text-muted-foreground hover:text-primary rounded-md p-1.5 transition-colors';

const SOURCE_ICONS = {
   patreon: Icons.patreon,
   x: Icons.twitter,
   youtube: Icons.youtube
};

// the full feed view drops the column's height cap, scroll fades and per-card clamping
export function NewsColumn({ posts, fullFeed = false }: { posts: HomeNewsPost[]; fullFeed?: boolean }) {
   const t = useTranslations('home');
   const { scrollRef, showTopScrollFade, showBottomScrollFade } = useNewsScrollFade(posts.length, !fullFeed);

   if (posts.length === 0) {
      return <HomeColumnEmptyCard>{t('empty.news')}</HomeColumnEmptyCard>;
   }

   return (
      <div
         className={cn(
            'relative min-h-0 min-w-0 flex-1',
            showTopScrollFade && showBottomScrollFade && 'home-news-scroll-fade-both',
            showTopScrollFade && !showBottomScrollFade && 'home-news-scroll-fade-top',
            !showTopScrollFade && showBottomScrollFade && 'home-news-scroll-fade-bottom'
         )}
      >
         <div
            ref={scrollRef}
            className={cn(
               'grid max-h-[19.25rem] min-w-0 auto-rows-min gap-2.5 overflow-x-hidden overflow-y-auto pr-1 [scrollbar-gutter:stable]',
               fullFeed && 'h-full max-h-none'
            )}
         >
            {posts.map((post) => (
               <NewsCard key={post.id} post={post} fullFeed={fullFeed} />
            ))}
         </div>
      </div>
   );
}

function useNewsScrollFade(itemCount: number, enabled: boolean) {
   const scrollRef = useRef<HTMLDivElement>(null);
   const [showTopScrollFade, setShowTopScrollFade] = useState(false);
   const [showBottomScrollFade, setShowBottomScrollFade] = useState(false);

   useEffect(() => {
      const scrollElement = scrollRef.current;
      if (!scrollElement || !enabled) return;

      const updateScrollFade = () => {
         setShowTopScrollFade(scrollElement.scrollTop > 1);
         setShowBottomScrollFade(scrollElement.scrollTop + scrollElement.clientHeight < scrollElement.scrollHeight - 1);
      };

      updateScrollFade();
      scrollElement.addEventListener('scroll', updateScrollFade, { passive: true });
      window.addEventListener('resize', updateScrollFade);

      return () => {
         scrollElement.removeEventListener('scroll', updateScrollFade);
         window.removeEventListener('resize', updateScrollFade);
      };
   }, [itemCount, enabled]);

   return { scrollRef, showTopScrollFade, showBottomScrollFade };
}

function NewsCard({ post, fullFeed }: { post: HomeNewsPost; fullFeed: boolean }) {
   const t = useTranslations('home');
   const tc = useTranslations('common');
   const Icon = SOURCE_ICONS[post.source];
   const { bodyRef, expanded: bodyExpanded, clamped, expand } = useBodyClamp(post.body);
   const expanded = fullFeed || bodyExpanded;
   // media-only posts show their media up front, others reveal it on expansion
   const images = post.images ?? [];
   const hasMedia = images.length > 0 || post.video != null;
   const mediaAlwaysVisible = hasMedia && !post.body;
   const showMedia = hasMedia && (expanded || mediaAlwaysVisible);
   // youtube descriptions aren't worth expanding, the post links to the video anyway
   const showReadMore = post.source !== 'youtube' && !expanded && (clamped || (hasMedia && !mediaAlwaysVisible));

   return (
      <Card variant="settings" className="min-h-0 min-w-0 gap-2 border-white/20 p-4">
         {post.repostedBy && (
            <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
               <Repeat2 className="size-3.5" aria-hidden />
               <a href={post.repostedBy.href} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                  {t('news.repostedBy', { name: post.repostedBy.label })}
               </a>
            </div>
         )}
         <div className="text-muted-foreground flex min-w-0 items-center gap-2 text-xs">
            <Icon className="size-3.5 shrink-0 fill-current" aria-hidden />
            <a
               href={post.sourceHref ?? post.href}
               target="_blank"
               rel="noreferrer"
               className="text-foreground hover:text-primary min-w-0 truncate font-semibold transition-colors"
            >
               {post.sourceLabel}
            </a>
            <Time date={post.publishedAt} short />
            <a
               href={post.href}
               target="_blank"
               rel="noreferrer"
               aria-label={tc('openInNewTab')}
               className="hover:text-primary ml-auto shrink-0 transition-colors"
            >
               <ExternalLink className="size-3.5" aria-hidden />
            </a>
         </div>
         {post.title && (
            <h3 className={cn('text-sm font-bold', !fullFeed && 'line-clamp-1')}>
               <a href={post.href} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                  {post.title}
               </a>
            </h3>
         )}
         {post.body && (
            <p
               ref={bodyRef}
               className={cn(
                  'text-muted-foreground text-sm leading-relaxed',
                  !expanded && (post.source === 'youtube' ? 'line-clamp-2' : 'line-clamp-3')
               )}
            >
               {renderPostBody(post)}
            </p>
         )}
         {showMedia && images.length > 0 && <NewsImageGallery images={images} />}
         {showMedia && post.video && <NewsVideo video={post.video} postHref={post.href} sourceLabel={post.sourceLabel} />}
         {post.quotedPost && <NewsQuotedPostCard post={post.quotedPost} fullFeed={fullFeed} />}
         {showReadMore && (
            <button type="button" onClick={expand} className="text-primary self-start text-xs font-medium hover:underline">
               {t('news.readMore')}
            </button>
         )}
      </Card>
   );
}

function NewsQuotedPostCard({ post, fullFeed }: { post: HomeNewsQuotedPost; fullFeed: boolean }) {
   const tc = useTranslations('common');

   return (
      <Card variant="settings" className="gap-0 overflow-hidden py-0">
         <CardHeader className="px-3 pt-3">
            <CardTitle className="text-muted-foreground flex min-w-0 items-center gap-2 text-xs">
               <Icons.twitter className="size-3.5 shrink-0 fill-current" aria-hidden />
               <a href={post.sourceHref} target="_blank" rel="noreferrer" className="text-foreground hover:text-primary truncate transition-colors">
                  {post.sourceLabel}
               </a>
               <Time date={post.publishedAt} short />
            </CardTitle>
            <CardAction>
               <a
                  href={post.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={tc('openInNewTab')}
                  className="text-muted-foreground hover:text-primary transition-colors"
               >
                  <ExternalLink className="size-3.5" aria-hidden />
               </a>
            </CardAction>
         </CardHeader>
         <CardContent className="flex flex-col gap-2 p-3 pt-2">
            {post.body && (
               <p className={cn('text-muted-foreground text-sm leading-relaxed', !fullFeed && 'line-clamp-3')}>{renderXBody(post.body)}</p>
            )}
            {post.images && post.images.length > 0 && <NewsImageGallery images={post.images} />}
            {post.video && <NewsVideo video={post.video} postHref={post.href} sourceLabel={post.sourceLabel} />}
         </CardContent>
      </Card>
   );
}

function NewsVideo({ video, postHref, sourceLabel }: { video: HomeNewsVideo; postHref: string; sourceLabel: string }) {
   const t = useTranslations('home');
   const [playbackFailed, setPlaybackFailed] = useState(false);
   const label = t('news.videoLabel', { name: sourceLabel });

   if (video.playbackUrl && !playbackFailed) {
      return (
         <video
            controls
            playsInline
            preload="metadata"
            poster={video.posterUrl}
            aria-label={label}
            onError={() => setPlaybackFailed(true)}
            className="aspect-video max-h-80 w-full rounded-md object-contain"
         >
            <source src={video.playbackUrl} type="video/mp4" />
         </video>
      );
   }

   if (!video.posterUrl) return null;

   return (
      <a
         href={postHref}
         target="_blank"
         rel="noreferrer"
         aria-label={t('news.playVideoOnX')}
         className="group relative block overflow-hidden rounded-md border"
      >
         <img src={video.posterUrl} alt="" loading="lazy" className="aspect-video w-full object-cover" />
         <span className="bg-background/80 text-foreground absolute top-1/2 left-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-transform group-hover:scale-105">
            <Play className="size-4 fill-current" aria-hidden />
         </span>
      </a>
   );
}

function NewsImageGallery({ images }: { images: NonNullable<HomeNewsPost['images']> }) {
   const t = useTranslations('home');

   return (
      <div className={cn('grid gap-1.5', images.length > 1 && 'grid-cols-2')}>
         {images.map((image, index) => {
            const label = t('news.imageLabel', { number: index + 1, count: images.length });

            return (
               <Dialog key={image.url}>
                  <DialogTrigger asChild>
                     <button
                        type="button"
                        aria-label={label}
                        className={cn(
                           'focus-visible:ring-ring cursor-zoom-in overflow-hidden rounded-md border focus-visible:ring-2 focus-visible:outline-none',
                           images.length === 3 && index === 0 && 'col-span-2'
                        )}
                     >
                        <img
                           src={image.url}
                           alt={image.alt ?? ''}
                           loading="lazy"
                           className="aspect-video w-full object-cover transition-transform hover:scale-[1.02]"
                        />
                     </button>
                  </DialogTrigger>
                  <DialogContent
                     aria-describedby={undefined}
                     className="max-h-[calc(100dvh-2rem)] place-items-center overflow-hidden p-2 sm:max-w-5xl"
                  >
                     <DialogTitle className="sr-only">{label}</DialogTitle>
                     <img src={image.url} alt={image.alt ?? ''} className="max-h-[calc(100dvh-4rem)] max-w-full justify-self-center object-contain" />
                  </DialogContent>
               </Dialog>
            );
         })}
      </div>
   );
}

// linkify urls and @mentions in tweet bodies
function renderPostBody(post: HomeNewsPost) {
   if (post.source !== 'x') return post.body;

   return renderXBody(post.body);
}

function renderXBody(body: string) {
   return body.split(/(https?:\/\/\S+|\B@\w{1,15})/g).map((part, index) => {
      if (/^https?:\/\//.test(part)) {
         return (
            <a key={index} href={part} target="_blank" rel="noreferrer" className="text-primary break-words hover:underline">
               {displayUrl(part)}
            </a>
         );
      }
      if (/^@\w/.test(part)) {
         return (
            <a key={index} href={`https://x.com/${part.slice(1)}`} target="_blank" rel="noreferrer" className="text-primary hover:underline">
               {part}
            </a>
         );
      }
      return part;
   });
}

// trim the protocol so links don't dominate the card
function displayUrl(value: string) {
   const display = value.replace(/^https?:\/\/(www\.)?/, '');
   return display.length > 40 ? `${display.slice(0, 39)}...` : display;
}

// detects whether the clamped body overflows so the card can offer expansion
function useBodyClamp(body: string) {
   const bodyRef = useRef<HTMLParagraphElement>(null);
   const [expanded, setExpanded] = useState(false);
   const [clamped, setClamped] = useState(false);

   useEffect(() => {
      const element = bodyRef.current;
      if (element) setClamped(element.scrollHeight > element.clientHeight + 1);
   }, [body]);

   return { bodyRef, expanded, clamped, expand: () => setExpanded(true) };
}

export function NewsColumnActions({ posts }: { posts: HomeNewsPost[] }) {
   return (
      <div className="flex items-center gap-0.5">
         {socialLinks
            .filter(({ label }) => NEWS_SOCIAL_LABELS.has(label))
            .map(({ href, label, Icon }) => (
               <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className={NEWS_ACTION_CLASS}>
                  <Icon className="size-3.5 fill-current" aria-hidden="true" />
               </a>
            ))}
         <span className="bg-border mx-1 h-3.5 w-px" aria-hidden />
         <NewsFeedDialog posts={posts} />
      </div>
   );
}

function NewsFeedDialog({ posts }: { posts: HomeNewsPost[] }) {
   const t = useTranslations('home');

   return (
      <Dialog>
         <DialogTrigger asChild>
            <button type="button" aria-label={t('news.allNews')} className={NEWS_ACTION_CLASS}>
               <Maximize2 className="size-3.5" aria-hidden />
            </button>
         </DialogTrigger>
         <DialogContent
            aria-describedby={undefined}
            className="h-dvh max-h-dvh max-w-none overflow-hidden rounded-none border-0 p-0 sm:h-[min(46rem,calc(100dvh-4rem))] sm:max-h-[calc(100dvh-4rem)] sm:rounded-lg sm:border"
         >
            <div className="flex h-full min-h-0 flex-col gap-3 p-4 sm:p-6">
               <DialogHeader className="pr-8">
                  <DialogTitle>{t('news.allNews')}</DialogTitle>
               </DialogHeader>
               <NewsColumn posts={posts} fullFeed />
            </div>
         </DialogContent>
      </Dialog>
   );
}
