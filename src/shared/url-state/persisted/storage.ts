import { Result } from 'better-result';
import { z } from 'zod';

import { readStorageJson, readStorageValue, writeStorageJson } from '@/shared/result/storage';
import {
   getPersistedSearchCookieName,
   PERSISTED_SEARCH_COOKIE_MAX_AGE,
   serializePersistedSearchCookieValue
} from '@/shared/url-state/persisted-search-cookie';
import type { SearchParamsRecord } from '@/shared/url-state/search-params';

const storageRecordSchema = z.record(z.string(), z.string());

type PersistedSearchKey<TSearch extends SearchParamsRecord> = keyof TSearch & string;

interface ResolvePersistedSearchOptions<TSearch extends SearchParamsRecord> {
   search?: Partial<TSearch>;
   parseSearch: (search: SearchParamsRecord) => TSearch | null;
   stored: Record<string, string>;
   persistedKeys: readonly PersistedSearchKey<TSearch>[];
   legacyStorageKeys?: Partial<Record<PersistedSearchKey<TSearch>, string>>;
}

function loadPersistedSearchStorage(key: string): Record<string, string> {
   return Result.unwrapOr(readStorageJson(key, storageRecordSchema), null) ?? {};
}

function writePersistedSearchCookie(key: string, value: Record<string, string>) {
   if (globalThis.document === undefined) return;

   document.cookie = `${getPersistedSearchCookieName(key)}=${serializePersistedSearchCookieValue(value)}; max-age=${PERSISTED_SEARCH_COOKIE_MAX_AGE}; path=/; samesite=lax`;
}

function savePersistedSearchStorage(key: string, updates: Record<string, string | undefined>) {
   const existing = loadPersistedSearchStorage(key);

   for (const [k, v] of Object.entries(updates)) {
      if (v === undefined) delete existing[k];
      else existing[k] = v;
   }

   writeStorageJson(key, existing);
   writePersistedSearchCookie(key, existing);
}

function buildPersistedSearchStorageUpdates<TSearch extends SearchParamsRecord>(
   persistedKeys: readonly PersistedSearchKey<TSearch>[],
   getValue: (key: PersistedSearchKey<TSearch>) => string | undefined
) {
   return Object.fromEntries(persistedKeys.map((key) => [`active_${key}`, getValue(key)]));
}

function resolvePersistedSearch<TSearch extends SearchParamsRecord>({
   search,
   parseSearch,
   stored,
   persistedKeys,
   legacyStorageKeys = {}
}: ResolvePersistedSearchOptions<TSearch>) {
   const updates: Partial<SearchParamsRecord> = {};
   const migrated: Record<string, string> = {};

   for (const key of persistedKeys) {
      const activeKey = `active_${key}`;
      const legacyStorageKey = legacyStorageKeys[key];
      const legacyValue = legacyStorageKey ? Result.unwrapOr(readStorageValue(legacyStorageKey), null) : null;
      const storedValue = stored[activeKey] ?? legacyValue;
      const parsedSearch = storedValue ? parseSearch({ ...search, [key]: storedValue }) : null;
      const parsedValue = parsedSearch?.[key];

      if (search?.[key] == null && parsedValue != null) updates[key] = parsedValue;
      if (stored[activeKey] == null && legacyValue) migrated[activeKey] = legacyValue;
   }

   return { updates, migrated };
}

export {
   buildPersistedSearchStorageUpdates,
   loadPersistedSearchStorage,
   savePersistedSearchStorage,
   type PersistedSearchKey,
   resolvePersistedSearch,
   writePersistedSearchCookie
};
