import { Result } from 'better-result';
import { z } from 'zod';

const PERSISTED_SEARCH_COOKIE_PREFIX = 'ss-persisted-search-';
const PERSISTED_SEARCH_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
const persistedSearchCookieSchema = z.record(z.string(), z.string().optional().catch(undefined)).transform((values) => {
   const search: Record<string, string> = {};

   for (const [key, value] of Object.entries(values)) {
      if (value !== undefined) search[key] = value;
   }

   return search;
});

function getPersistedSearchCookieName(storageKey: string) {
   return `${PERSISTED_SEARCH_COOKIE_PREFIX}${storageKey}`;
}

function parsePersistedSearchCookieValue(value: string | undefined): Record<string, string> {
   if (!value) return {};

   const result = Result.try(() => persistedSearchCookieSchema.parse(JSON.parse(decodeURIComponent(value))));
   return Result.unwrapOr(result, {});
}

function serializePersistedSearchCookieValue(value: Record<string, string>) {
   return encodeURIComponent(JSON.stringify(value));
}

function readPersistedSearchCookieValue(storageKey: string) {
   if (globalThis.document === undefined) return {};

   const cookieName = `${getPersistedSearchCookieName(storageKey)}=`;
   const cookie = document.cookie
      .split(';')
      .map((part) => part.trim())
      .find((part) => part.startsWith(cookieName));

   return parsePersistedSearchCookieValue(cookie?.slice(cookieName.length));
}

export {
   getPersistedSearchCookieName,
   parsePersistedSearchCookieValue,
   PERSISTED_SEARCH_COOKIE_MAX_AGE,
   readPersistedSearchCookieValue,
   serializePersistedSearchCookieValue
};
