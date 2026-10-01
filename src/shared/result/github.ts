import '@tanstack/react-start/server-only';

import { Result } from 'better-result';
import * as z from 'zod';

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;
const GITHUB_JSON_CACHE_TTL_MS = 12 * HOUR_MS;
const GITHUB_JSON_STALE_WHILE_REVALIDATE_MS = 7 * DAY_MS;

type GithubJsonErrorInput = {
   message: string;
   status: number | null;
   cause: unknown;
};

type GithubJsonErrorFactory<E> = (input: GithubJsonErrorInput) => E;
type GithubJsonCacheEntry<T> = {
   value: T;
   expiresAt: number;
   staleUntil: number;
};

function githubHeaders() {
   const headers = new Headers({
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28'
   });

   if (process.env.GITHUB_TOKEN) {
      headers.set('Authorization', `Bearer ${process.env.GITHUB_TOKEN}`);
   }

   return headers;
}

export function createGithubJsonFetcher<T, E>(url: string, schema: z.ZodType<T>, toError: GithubJsonErrorFactory<E>, label: string) {
   let cached: GithubJsonCacheEntry<T> | null = null;
   let refresh: Promise<Result<T, E>> | null = null;

   return async function fetchGithubJson() {
      const now = Date.now();

      if (cached && cached.staleUntil > now) {
         if (cached.expiresAt <= now) void refreshGithubJson();
         return Result.ok(cached.value);
      }

      return refreshGithubJson();
   };

   function refreshGithubJson() {
      if (!refresh) {
         refresh = loadGithubJson(url, schema, toError, label).then((result) => {
            refresh = null;

            return Result.tap(result, (value) => {
               const now = Date.now();
               cached = {
                  value,
                  expiresAt: now + GITHUB_JSON_CACHE_TTL_MS,
                  staleUntil: now + GITHUB_JSON_CACHE_TTL_MS + GITHUB_JSON_STALE_WHILE_REVALIDATE_MS
               };
            });
         });
      }

      return refresh;
   }
}

function loadGithubJson<T, E>(url: string, schema: z.ZodType<T>, toError: GithubJsonErrorFactory<E>, label: string) {
   return Result.gen(async function* () {
      const response = yield* Result.await(
         Result.tryPromise({
            try: () => fetch(url, { headers: githubHeaders() }),
            catch: (cause) =>
               toError({
                  message: `${label} failed`,
                  status: null,
                  cause
               })
         })
      );

      if (!response.ok) {
         return Result.err(
            toError({
               message: `${label} failed: ${response.status}`,
               status: response.status,
               cause: null
            })
         );
      }

      const raw: unknown = yield* Result.await(
         Result.tryPromise({
            try: () => response.json(),
            catch: (cause) =>
               toError({
                  message: `${label} response parse failed`,
                  status: response.status,
                  cause
               })
         })
      );

      const parsed = schema.safeParse(raw);
      if (!parsed.success) {
         return Result.err(
            toError({
               message: parsed.error.message,
               status: response.status,
               cause: parsed.error
            })
         );
      }

      return Result.ok(parsed.data);
   });
}

export type { GithubJsonErrorInput };
