import { formatCountryRegionParam } from '@/shared/country-region';
import type { SearchParamValue, SearchParamsRecord } from '@/shared/url-state/search-params';

export function parseUrlSearch(searchStr: string) {
   const rawSearch = searchStr.startsWith('?') ? searchStr.slice(1) : searchStr;
   const searchParams = new URLSearchParams(rawSearch.replaceAll('?', '&'));
   const search: Record<string, string> = {};

   for (const [key, value] of searchParams.entries()) {
      search[key] = value;
   }

   return search;
}

export function stringifyUrlSearch(search: SearchParamsRecord) {
   const searchParams = new URLSearchParams();

   for (const [key, value] of Object.entries(search)) {
      appendSearchValue(searchParams, key, value);
   }

   const next = searchParams.toString();
   return next ? `?${next}` : '';
}

export function normalizeSearchRecord(search: SearchParamsRecord) {
   const params: Record<string, string | undefined> = {};

   for (const [key, value] of Object.entries(search)) {
      const selected = Array.isArray(value) ? value.at(-1) : value;
      if (selected == null) continue;
      params[key] = typeof selected === 'object' ? formatCountryRegionParam(selected) : String(selected);
   }

   return params;
}

function appendSearchValue(searchParams: URLSearchParams, key: string, value: SearchParamValue) {
   if (value == null || value === '') return;
   if (key === 'page' && value === 1) return;

   if (Array.isArray(value)) {
      for (const item of value) {
         appendSearchValue(searchParams, key, item);
      }
      return;
   }

   searchParams.append(key, typeof value === 'object' ? (formatCountryRegionParam(value) ?? '') : String(value));
}
