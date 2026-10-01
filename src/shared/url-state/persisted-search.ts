import { getCookie } from '@tanstack/react-start/server';

import { getPersistedSearchCookieName, parsePersistedSearchCookieValue } from '@/shared/url-state/persisted-search-cookie';
import type { SearchParamsRecord } from '@/shared/url-state/search-params';

interface ApplyPersistedSearchParamsOptions<TSearch extends SearchParamsRecord> {
   searchParams: Record<string, string | string[] | undefined>;
   parseSearch: (search: SearchParamsRecord) => TSearch | null;
   storageKey: string;
   persistedKeys: readonly (keyof TSearch & string)[];
   enabled?: boolean;
}

async function applyPersistedSearchParams<TSearch extends SearchParamsRecord>({
   searchParams,
   parseSearch,
   storageKey,
   persistedKeys,
   enabled = true
}: ApplyPersistedSearchParamsOptions<TSearch>) {
   if (!enabled || persistedKeys.length === 0) return searchParams;

   const stored = parsePersistedSearchCookieValue(getCookie(getPersistedSearchCookieName(storageKey)));
   const next = { ...searchParams };
   const validationSearch: SearchParamsRecord = {};

   for (const [key, value] of Object.entries(searchParams)) {
      validationSearch[key] = Array.isArray(value) ? value[0] : value;
   }

   for (const key of persistedKeys) {
      if (next[key] != null) continue;

      const storedValue = stored[`active_${key}`];
      if (!storedValue) continue;

      const parsedSearch = parseSearch({ ...validationSearch, [key]: storedValue });
      if (parsedSearch?.[key] != null) {
         next[key] = storedValue;
         validationSearch[key] = storedValue;
      }
   }

   return next;
}

async function readPersistedSearchStorage(storageKey: string) {
   return parsePersistedSearchCookieValue(getCookie(getPersistedSearchCookieName(storageKey)));
}

export { applyPersistedSearchParams, readPersistedSearchStorage };
