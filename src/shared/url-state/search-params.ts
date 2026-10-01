import type { CountryRegionFilterValue } from '@/shared/country-region';

type SearchParamScalar = string | number | bigint | boolean | CountryRegionFilterValue | null | undefined;
export type SearchParamValue = SearchParamScalar | SearchParamScalar[];
export type SearchParamsRecord = Record<string, SearchParamValue>;
