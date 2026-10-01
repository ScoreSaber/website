import { z } from 'zod';

import type {
   LeaderboardControllerGetLeaderboardScoresByIdPivot,
   MapControllerGetMapListingsSortBy,
   MapControllerGetMapListingsSortDirection
} from '@/shared/api/generated/ApiParams';
import { parseCountryRegionParam, type CountryRegionFilterValue } from '@/shared/country-region';
import type { SearchParamsRecord, SearchParamValue } from '@/shared/url-state/search-params';

type MapsSearchParams = SearchParamsRecord & {
   page?: number;
   search?: string;
   verified?: 'false';
   status?: string;
   minStars?: number;
   maxStars?: number;
   sortBy?: MapControllerGetMapListingsSortBy;
   sortDirection?: MapControllerGetMapListingsSortDirection;
};
type LeaderboardSearchParams = SearchParamsRecord & {
   page?: number;
   search?: string;
   scope?: CountryRegionFilterValue;
   pivot?: LeaderboardControllerGetLeaderboardScoresByIdPivot;
   highlight?: number;
};

function unwrapQueryValue(value: SearchParamValue) {
   return Array.isArray(value) ? value[0] : value;
}

const optionalQueryString = z.preprocess(unwrapQueryValue, z.string().optional());

const legacyPageParam = z.preprocess(unwrapQueryValue, z.coerce.number().int().gt(1).optional()).catch(undefined);

const legacyNumberParam = z.preprocess(unwrapQueryValue, z.coerce.number().min(0).optional()).catch(undefined);

const legacySearchParam = optionalQueryString.transform((value) => {
   const search = value?.trim();
   return search && search.length >= 3 ? search : undefined;
});

const legacyRouteId = z.coerce.number().int().gt(0);

const legacySortByParam = z
   .preprocess(unwrapQueryValue, z.enum(['0', '1', '2', '3', '5']).optional())
   .catch(undefined)
   .transform((category) => {
      switch (category) {
         case '0':
            return 'trending';
         case '1':
         case '5':
            return 'latestRankedAt';
         case '2':
            return 'totalScores';
         case '3':
            return 'highestStars';
         default:
            return undefined;
      }
   });

const legacySortDirectionParam = z
   .preprocess(unwrapQueryValue, z.enum(['0', '1']).optional())
   .catch(undefined)
   .transform((sort) => {
      if (sort === '1') return 'asc';
      if (sort === '0') return 'desc';
      return undefined;
   });

export const legacyLeaderboardsQuery = z
   .object({
      page: legacyPageParam,
      search: legacySearchParam,
      verified: optionalQueryString,
      ranked: optionalQueryString,
      qualified: optionalQueryString,
      minStar: legacyNumberParam,
      maxStar: legacyNumberParam,
      category: legacySortByParam,
      sort: legacySortDirectionParam
   })
   .transform((query): MapsSearchParams => {
      const ranked = query.ranked === '1';
      const qualified = query.qualified === '1';

      return {
         page: query.page,
         search: query.search,
         verified: query.verified === '0' ? 'false' : undefined,
         status: ranked ? 'RANKED' : qualified ? 'QUALIFIED' : undefined,
         minStars: query.minStar,
         maxStars: query.maxStar,
         sortBy: query.category,
         sortDirection: query.sort
      };
   });

export const legacyLeaderboardQuery = z
   .object({
      page: legacyPageParam,
      search: legacySearchParam,
      countries: optionalQueryString
   })
   .transform(
      (query): LeaderboardSearchParams => ({
         page: query.page,
         search: query.search,
         scope: parseCountryRegionParam(query.countries)
      })
   );

export function parseLegacyRouteId(value: string | undefined) {
   const result = legacyRouteId.safeParse(value);
   return result.success ? result.data : null;
}
