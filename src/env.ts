import { createEnv } from '@t3-oss/env-core';
import * as z from 'zod';

const booleanFlagSchema = z
   .enum(['true', 'false'])
   .default('false')
   .transform((value) => value === 'true');

const localHostnames = new Set(['localhost', '0.0.0.0', '127.0.0.1', '[::1]']);

const serverUrlSchema = z.url().refine(
   (value) => {
      const url = new URL(value);
      return url.protocol === 'http:' || url.protocol === 'https:';
   },
   { message: 'must be http or https' }
);

const publicBrowserUrlSchema = z.url().refine(
   (value) => {
      const url = new URL(value);
      if (url.protocol === 'https:') return true;
      return url.protocol === 'http:' && (localHostnames.has(url.hostname) || url.hostname.endsWith('.localhost'));
   },
   { message: 'must be https, or localhost http' }
);

function readEnv(key: keyof Omit<ImportMetaEnv, 'DEV' | 'PROD' | 'SSR'>) {
   const processValue = globalThis.process?.env[key];
   const importMetaValue = import.meta.env[key];
   return processValue ?? importMetaValue;
}

const isProduction = readEnv('NODE_ENV') === 'production';
const localDefault = <T>(schema: z.ZodType<T>, defaultValue: Exclude<T, undefined>) => (isProduction ? schema : schema.default(defaultValue));

export const env = createEnv({
   isServer: globalThis.window === undefined,
   shared: {
      NODE_ENV: z.enum(['development', 'production', 'test']).default('development')
   },
   server: {
      DEBUG_REACT_SCAN: booleanFlagSchema,
      DEBUG_BREAKPOINTS: booleanFlagSchema,
      DEBUG_PAGE_BACKGROUND: booleanFlagSchema,
      API_URL: localDefault(serverUrlSchema, 'https://scoresaber.com'),
      CF_ACCESS_CLIENT_ID: z.string().optional(),
      CF_ACCESS_CLIENT_SECRET: z.string().optional(),
      VISITOR_RATE_LIMIT_SECRET: z.string().optional(),
      HOME_NEWS_PATREON_ACCESS_TOKEN: z.string().optional(),
      HOME_NEWS_PATREON_CAMPAIGN_ID: z.string().optional(),
      HOME_NEWS_X_BEARER_TOKEN: z.string().optional(),
      HOME_NEWS_X_USERNAME: z.string().default('ScoreSaber'),
      HOME_NEWS_YOUTUBE_API_KEY: z.string().optional(),
      HOME_NEWS_YOUTUBE_HANDLE: z.string().default('@ScoreSaberOfficial')
   },
   clientPrefix: 'NEXT_PUBLIC_',
   client: {
      NEXT_PUBLIC_API_URL: localDefault(publicBrowserUrlSchema, 'https://scoresaber.com'),
      NEXT_PUBLIC_ARCVIEWER_URL: localDefault(publicBrowserUrlSchema, 'https://watch.scoresaber.com'),
      NEXT_PUBLIC_LUDUS_URL: localDefault(publicBrowserUrlSchema, 'https://ludus-1.scoresaber.com'),
      NEXT_PUBLIC_SITE_URL: localDefault(publicBrowserUrlSchema, 'https://scoresaber.local')
   },
   runtimeEnvStrict: {
      NODE_ENV: readEnv('NODE_ENV'),
      DEBUG_REACT_SCAN: readEnv('DEBUG_REACT_SCAN'),
      DEBUG_BREAKPOINTS: readEnv('DEBUG_BREAKPOINTS'),
      DEBUG_PAGE_BACKGROUND: readEnv('DEBUG_PAGE_BACKGROUND'),
      API_URL: readEnv('API_URL'),
      CF_ACCESS_CLIENT_ID: readEnv('CF_ACCESS_CLIENT_ID'),
      CF_ACCESS_CLIENT_SECRET: readEnv('CF_ACCESS_CLIENT_SECRET'),
      VISITOR_RATE_LIMIT_SECRET: readEnv('VISITOR_RATE_LIMIT_SECRET'),
      HOME_NEWS_PATREON_ACCESS_TOKEN: readEnv('HOME_NEWS_PATREON_ACCESS_TOKEN'),
      HOME_NEWS_PATREON_CAMPAIGN_ID: readEnv('HOME_NEWS_PATREON_CAMPAIGN_ID'),
      HOME_NEWS_X_BEARER_TOKEN: readEnv('HOME_NEWS_X_BEARER_TOKEN'),
      HOME_NEWS_X_USERNAME: readEnv('HOME_NEWS_X_USERNAME'),
      HOME_NEWS_YOUTUBE_API_KEY: readEnv('HOME_NEWS_YOUTUBE_API_KEY'),
      HOME_NEWS_YOUTUBE_HANDLE: readEnv('HOME_NEWS_YOUTUBE_HANDLE'),
      NEXT_PUBLIC_API_URL: readEnv('NEXT_PUBLIC_API_URL'),
      NEXT_PUBLIC_ARCVIEWER_URL: readEnv('NEXT_PUBLIC_ARCVIEWER_URL'),
      NEXT_PUBLIC_LUDUS_URL: readEnv('NEXT_PUBLIC_LUDUS_URL'),
      NEXT_PUBLIC_SITE_URL: readEnv('NEXT_PUBLIC_SITE_URL')
   },
   skipValidation: readEnv('SKIP_ENV_VALIDATION') === 'true',
   emptyStringAsUndefined: true
});
