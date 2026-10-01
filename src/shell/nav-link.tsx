'use client';

import type { ComponentProps } from 'react';

import { getRouteApi } from '@tanstack/react-router';

import { useAuth } from '@/modules/auth';
import {
   MAP_CONTROLLER_GET_MAP_LISTINGS_SORT_BY,
   MAP_CONTROLLER_GET_MAP_LISTINGS_SORT_DIRECTION,
   PLAYER_CONTROLLER_GET_PLAYERS_PIVOT
} from '@/shared/api/generated/ApiParams';
import { parseCountryRegionParam, type CountryRegionFilterValue } from '@/shared/country-region';
import { mapFilterPreferences, rankingFilterPreferences, rankRequestFilterPreferences } from '@/shared/url-state/persisted-filter-preferences';
import { usePersistedSearch } from '@/shared/url-state/persisted/use-persisted-search';
import type { SearchParamsRecord } from '@/shared/url-state/search-params';
import type { AppNavRoute } from '@/shell/nav-data';

type MapsRouteSearch = SearchParamsRecord & {
   page?: number;
   verified?: 'true' | 'false';
   sortBy?: (typeof MAP_CONTROLLER_GET_MAP_LISTINGS_SORT_BY)[number];
   sortDirection?: (typeof MAP_CONTROLLER_GET_MAP_LISTINGS_SORT_DIRECTION)[number];
   status?: string;
};

type RankingsRouteSearch = SearchParamsRecord & {
   page: number;
   includeInactive?: 'true' | 'false';
   countries?: CountryRegionFilterValue;
   pivot?: (typeof PLAYER_CONTROLLER_GET_PLAYERS_PIVOT)[number];
};

type RankRequestsRouteSearch = SearchParamsRecord & {
   page: number;
   hideDownvoted?: true;
};

const defaultMapsSearch: MapsRouteSearch = {};
const defaultRankingsSearch: RankingsRouteSearch = { page: 1 };
const defaultRankRequestsSearch: RankRequestsRouteSearch = { page: 1 };
const homeRoute = getRouteApi('/');
const liveRoute = getRouteApi('/live');
const mapsRoute = getRouteApi('/maps');
const questRoute = getRouteApi('/quest');
const rankingsRoute = getRouteApi('/rankings');
const rankRequestsRoute = getRouteApi('/ranking/requests');
const teamRoute = getRouteApi('/team');
const supportRoute = getRouteApi('/support');

type NavLinkProps = Omit<ComponentProps<'a'>, 'href'> & {
   route: AppNavRoute;
};

export function NavLink({ route, ...props }: NavLinkProps) {
   const { user } = useAuth();
   const mapsSearch = usePersistedSearch<MapsRouteSearch>({
      fallback: defaultMapsSearch,
      parseSearch: parseMapsSearch,
      storageKey: mapFilterPreferences.storageKey,
      persistedKeys: mapFilterPreferences.persistedKeys
   });
   const rankingsSearch = usePersistedSearch<RankingsRouteSearch>({
      fallback: defaultRankingsSearch,
      parseSearch: parseRankingsSearch,
      storageKey: rankingFilterPreferences.storageKey,
      persistedKeys: user ? rankingFilterPreferences.authPersistedKeys : rankingFilterPreferences.persistedKeys,
      legacyStorageKeys: rankingFilterPreferences.legacyStorageKeys
   });
   const rankRequestsSearch = usePersistedSearch<RankRequestsRouteSearch>({
      fallback: defaultRankRequestsSearch,
      parseSearch: parseRankRequestsSearch,
      storageKey: rankRequestFilterPreferences.storageKey,
      persistedKeys: rankRequestFilterPreferences.persistedKeys
   });

   if (route === 'maps') return <mapsRoute.Link {...props} search={mapsSearch} />;
   if (route === 'rankings') return <rankingsRoute.Link {...props} search={rankingsSearch} />;
   if (route === 'rankRequests') return <rankRequestsRoute.Link {...props} search={rankRequestsSearch} />;
   if (route === 'live') return <liveRoute.Link {...props} />;
   if (route === 'questInstaller') return <questRoute.Link {...props} search={{ step: 1 }} />;
   if (route === 'team') return <teamRoute.Link {...props} />;
   if (route === 'support') return <supportRoute.Link {...props} />;

   return <homeRoute.Link {...props} />;
}

function parseMapsSearch(search: SearchParamsRecord): MapsRouteSearch {
   const page = search.page;
   const status = search.status;
   return {
      page: typeof page === 'number' && page > 1 ? page : undefined,
      verified: search.verified === 'false' ? 'false' : undefined,
      sortBy: MAP_CONTROLLER_GET_MAP_LISTINGS_SORT_BY.find((sortBy) => sortBy === search.sortBy),
      sortDirection: MAP_CONTROLLER_GET_MAP_LISTINGS_SORT_DIRECTION.find((direction) => direction === search.sortDirection),
      status: typeof status === 'string' ? status : undefined
   };
}

function parseRankingsSearch(search: SearchParamsRecord): RankingsRouteSearch {
   return {
      page: 1,
      includeInactive: search.includeInactive === 'true' || search.includeInactive === 'false' ? search.includeInactive : undefined,
      countries: parseCountryRegionParam(search.countries),
      pivot: PLAYER_CONTROLLER_GET_PLAYERS_PIVOT.find((pivot) => pivot === search.pivot)
   };
}

function parseRankRequestsSearch(search: SearchParamsRecord): RankRequestsRouteSearch {
   return {
      page: 1,
      hideDownvoted: search.hideDownvoted === true || search.hideDownvoted === 'true' ? true : undefined
   };
}
