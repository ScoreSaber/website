import type { SearchParamsRecord } from '@/shared/url-state/search-params';

export function updateSearchParams<T extends SearchParamsRecord>(
   current: T | undefined,
   updates: Partial<SearchParamsRecord>,
   resetKeys: readonly (keyof T)[] = []
): T {
   const resetValues = Object.fromEntries(resetKeys.map((key) => [key, undefined]));
   const updatedValues = Object.fromEntries(Object.entries(updates).map(([key, value]) => [key, value === '' ? undefined : value]));
   return Object.assign({}, current, resetValues, updatedValues);
}
