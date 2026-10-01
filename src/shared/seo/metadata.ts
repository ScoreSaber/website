import type { AnyRouteMatch } from '@tanstack/react-router';

import { env } from '@/env';

export const SITE_NAME = 'ScoreSaber';
const SITE_TITLE = 'ScoreSaber!';
const SITE_SOCIAL_TITLE = 'ScoreSaber';
export const SITE_DESCRIPTION = "Beat Saber's largest leaderboard system for custom songs, earn PP from ranked maps, and compare scores with others";

const DEFAULT_IMAGE_PATH = '/icon-512.png';

type PageHeadOptions = {
   title?: string;
   description?: string;
   path?: string;
   image?: string;
   imageAlt?: string;
   twitterCard?: 'summary' | 'summary_large_image';
   noindex?: boolean;
};

type HeadMeta = NonNullable<AnyRouteMatch['meta']>[number];
type HeadLink = NonNullable<AnyRouteMatch['links']>[number];

export function absoluteSiteUrl(path: string) {
   if (URL.canParse(path)) return path;

   const origin = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
   return `${origin}${path.startsWith('/') ? path : `/${path}`}`;
}

export function buildSeoHead({
   title,
   description = SITE_DESCRIPTION,
   path,
   image = DEFAULT_IMAGE_PATH,
   imageAlt = 'ScoreSaber',
   twitterCard = 'summary',
   noindex = false
}: PageHeadOptions = {}) {
   const pageTitle = title ? `${title} | ${SITE_TITLE}` : SITE_TITLE;
   const socialTitle = title ?? SITE_SOCIAL_TITLE;
   const canonicalUrl = path ? absoluteSiteUrl(path) : undefined;
   const imageUrl = absoluteSiteUrl(image);
   const robots = noindex ? 'noindex, nofollow' : 'index, follow';
   const links: HeadLink[] = canonicalUrl ? [{ rel: 'canonical', href: canonicalUrl }] : [];

   const meta: HeadMeta[] = [
      { title: pageTitle },
      { name: 'title', content: socialTitle },
      { name: 'description', content: description },
      { name: 'robots', content: robots },
      { property: 'og:title', content: socialTitle },
      { property: 'og:description', content: description },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:type', content: 'website' },
      ...(canonicalUrl ? [{ property: 'og:url', content: canonicalUrl }] : []),
      { property: 'og:image', content: imageUrl },
      { property: 'og:image:alt', content: imageAlt },
      { name: 'twitter:card', content: twitterCard },
      { name: 'twitter:title', content: socialTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: imageUrl },
      { name: 'twitter:site', content: '@ScoreSaber' }
   ];

   return {
      meta,
      links
   };
}

export function buildNoindexHead(title: string, description: string, path: string) {
   return buildSeoHead({ title, description, path, noindex: true, twitterCard: 'summary' });
}
