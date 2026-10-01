import { z } from 'zod';

import { countryCodeSchema, type RegionCode, REGIONS } from '@/shared/country-region/countries';

type CountryRegionFilterValue = z.infer<typeof countryRegionFilterSchema>;
type Region = (typeof REGIONS)[number];

const regionCodeSet = new Set<string>(REGIONS.map((region) => region.code));
const regionByCode = new Map<RegionCode, Region>(REGIONS.map((region): [RegionCode, Region] => [region.code, region]));
const regionByCountries = new Map<string, Region>(
   REGIONS.flatMap((region): [string, Region][] => [
      [region.countries, region],
      ...(region.legacyCountries ?? []).map((countries): [string, Region] => [countries, region])
   ])
);
const regionCodeSchema = z.string().refine((value): value is RegionCode => regionCodeSet.has(value));

const countryRegionFilterSchema = z.union([
   z.object({
      kind: z.literal('countries'),
      countries: z.array(countryCodeSchema).min(1)
   }),
   z.object({
      kind: z.literal('region'),
      region: regionCodeSchema
   })
]);

const countryRegionSearchSchema = z
   .union([countryRegionFilterSchema, z.string().transform(parseCountryRegionCsv)])
   .optional()
   .catch(undefined);
const parseCountryRegionParam = countryRegionSearchSchema.parse.bind(countryRegionSearchSchema);

function parseCountryRegionCsv(value: string): CountryRegionFilterValue | undefined {
   const raw = value
      .split(',')
      .map((part) => part.trim().toUpperCase())
      .filter(Boolean);
   if (raw.length === 0) return undefined;

   const csv = raw.join(',');
   const parsedRegionCode = regionCodeSchema.safeParse(raw[0]);
   const parsedCountryCode = countryCodeSchema.safeParse(raw[0]);
   const region =
      regionByCountries.get(csv) ??
      (raw.length === 1 && parsedRegionCode.success && !parsedCountryCode.success ? regionByCode.get(parsedRegionCode.data) : undefined);
   if (region) return { kind: 'region', region: region.code };

   const countries = raw.flatMap((code) => {
      const result = countryCodeSchema.safeParse(code);
      return result.success ? [result.data] : [];
   });
   return countries.length > 0 ? { kind: 'countries', countries: [...new Set(countries)] } : undefined;
}

function formatCountryRegionParam(value: CountryRegionFilterValue | string | null | undefined) {
   if (!value) return undefined;
   if (typeof value === 'string') return value;

   if (value.kind === 'region') {
      return regionByCode.get(value.region)?.countries;
   }

   return value.countries.length > 0 ? value.countries.join(',') : undefined;
}

function getCountryRegionRegion(value?: CountryRegionFilterValue) {
   if (value?.kind !== 'region') return null;
   return regionByCode.get(value.region) ?? null;
}

function getCountryRegionCountries(value?: CountryRegionFilterValue) {
   return value?.kind === 'countries' ? value.countries : [];
}

export type { CountryRegionFilterValue };
export { countryRegionSearchSchema, formatCountryRegionParam, getCountryRegionCountries, getCountryRegionRegion, parseCountryRegionParam };
