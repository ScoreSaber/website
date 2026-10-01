declare module '*.css';

interface ImportMetaEnv {
   readonly NODE_ENV?: string;
   readonly DEBUG_REACT_SCAN?: string;
   readonly DEBUG_BREAKPOINTS?: string;
   readonly DEBUG_PAGE_BACKGROUND?: string;
   readonly API_URL?: string;
   readonly CF_ACCESS_CLIENT_ID?: string;
   readonly CF_ACCESS_CLIENT_SECRET?: string;
   readonly VISITOR_RATE_LIMIT_SECRET?: string;
   readonly HOME_NEWS_PATREON_ACCESS_TOKEN?: string;
   readonly HOME_NEWS_PATREON_CAMPAIGN_ID?: string;
   readonly HOME_NEWS_X_BEARER_TOKEN?: string;
   readonly HOME_NEWS_X_USERNAME?: string;
   readonly HOME_NEWS_YOUTUBE_API_KEY?: string;
   readonly HOME_NEWS_YOUTUBE_HANDLE?: string;
   readonly NEXT_PUBLIC_API_URL?: string;
   readonly NEXT_PUBLIC_ARCVIEWER_URL?: string;
   readonly NEXT_PUBLIC_LUDUS_URL?: string;
   readonly NEXT_PUBLIC_SITE_URL?: string;
   readonly SKIP_ENV_VALIDATION?: string;
}

interface ImportMeta {
   readonly env: ImportMetaEnv;
}

interface ViteTypeOptions {
   strictImportMetaEnv: unknown;
}
