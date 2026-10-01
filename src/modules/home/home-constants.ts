import type { MapControllerGetMapListingsParams } from '@/shared/api/generated/Api';

export const HOME_NEWS_YOUTUBE_CHANNEL_ID = 'UCghphPmwEZz3YRRt6Q-BRWQ';
export const HOME_NEWS_YOUTUBE_HANDLE = '@ScoreSaberOfficial';
export const TOP_PLAYER_COUNT = 5;
export const TRENDING_MAP_COUNT = 3;

type HomeTrendingMapSearch = {
   status: NonNullable<MapControllerGetMapListingsParams['status']>[number];
   sortBy: NonNullable<MapControllerGetMapListingsParams['sortBy']>;
   sortDirection: NonNullable<MapControllerGetMapListingsParams['sortDirection']>;
};

export const HOME_TRENDING_MAP_SEARCH: HomeTrendingMapSearch = {
   status: 'RANKED',
   sortBy: 'trending',
   sortDirection: 'desc'
};
