'use client';

import { type ReactNode, useEffect, useState } from 'react';

import { FaArrowDown, FaArrowUp, FaCheckCircle, FaChevronDown, FaFire, FaHeart, FaMedal, FaStar, FaTimes, FaTrophy } from 'react-icons/fa';
import { useTranslations } from 'use-intl';

import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { useDebouncedCallback } from '@/hooks/use-debounced-callback';
import { isMapSearchReady } from '@/modules/maps/shared/map-search';
import {
   MAP_CONTROLLER_GET_MAP_LISTINGS_SORT_BY,
   MAP_CONTROLLER_GET_MAP_LISTINGS_STATUS,
   type MapControllerGetMapListingsSortBy,
   type MapControllerGetMapListingsSortDirection,
   type MapControllerGetMapListingsStatus
} from '@/shared/api/generated/ApiParams';
import { DebouncedSearchInput } from '@/shared/components/debounced-search-input';
import { FilterPill } from '@/shared/components/filter-pill';
import { PaginationArrow } from '@/shared/components/pagination';
import { useHorizontalScrollFade } from '@/shared/components/use-horizontal-scroll-fade';
import { cn } from '@/shared/format/helpers';
import { mapFilterPreferences } from '@/shared/url-state/persisted-filter-preferences';
import { usePersistedParams } from '@/shared/url-state/persisted/use-persisted-params';
import type { RouteLocationBuilder } from '@/shared/url-state/route-location';
import type { SearchParamsRecord } from '@/shared/url-state/search-params';
import { updateSearchParams } from '@/shared/url-state/update-search-params';

const STATUS_OPTIONS: { value: MapControllerGetMapListingsStatus; icon: typeof FaTrophy }[] = [
   { value: 'RANKED', icon: FaTrophy },
   { value: 'QUALIFIED', icon: FaMedal },
   { value: 'LOVED', icon: FaHeart },
   { value: 'UNRANKED', icon: FaFire }
];

const SORT_OPTIONS: { value: MapControllerGetMapListingsSortBy }[] = [
   { value: 'trending' },
   { value: 'createdAt' },
   { value: 'latestRankedAt' },
   { value: 'highestStars' },
   { value: 'totalScores' }
];

interface StarRangeUpdates extends SearchParamsRecord {
   minStars?: number;
   maxStars?: number;
   status?: string;
}

export const DEFAULT_MIN_STARS = 0;
export const DEFAULT_MAX_STARS = 16;

// sorts that imply ranked-only results
const RANKED_SORTS = new Set<MapControllerGetMapListingsSortBy>(['highestStars', 'latestRankedAt']);

function isMapSortBy(value: string | undefined): value is MapControllerGetMapListingsSortBy {
   return value != null && MAP_CONTROLLER_GET_MAP_LISTINGS_SORT_BY.some((sortBy) => sortBy === value);
}

function parseMapListingStatuses(status?: string) {
   return (status?.split(',') ?? []).filter(isMapStatus);
}

function isMapStatus(value: string): value is MapControllerGetMapListingsStatus {
   return MAP_CONTROLLER_GET_MAP_LISTINGS_STATUS.some((status) => status === value);
}

interface MapFiltersProps<TLocation> {
   currentPage: number;
   totalPages: number;
   search: MapsFilterSearch;
   buildLocation: RouteLocationBuilder<MapsFilterSearch, TLocation>;
   parseSearch: (search: SearchParamsRecord) => MapsFilterSearch | null;
   initialFiltersOpen: boolean;
   trailingAction?: ReactNode;
}

type MapsFilterSearch = SearchParamsRecord & {
   page?: number;
   search?: string;
   status?: string;
   verified?: 'true' | 'false';
   minStars?: number;
   maxStars?: number;
   sortBy?: MapControllerGetMapListingsSortBy;
   sortDirection?: MapControllerGetMapListingsSortDirection;
};

export function MapFilters<TLocation>({
   currentPage,
   totalPages,
   search,
   buildLocation,
   parseSearch,
   initialFiltersOpen,
   trailingAction
}: MapFiltersProps<TLocation>) {
   const t = useTranslations();
   const statusRowScroll = useHorizontalScrollFade();
   const sortRowScroll = useHorizontalScrollFade();
   const { navigate, preload, preloadClearAll, cancelPreload, clearAll, loadStorage, saveStorage } = usePersistedParams({
      storageKey: mapFilterPreferences.storageKey,
      search,
      buildLocation,
      parseSearch,
      persistedKeys: mapFilterPreferences.persistedKeys
   });
   const currentSearch = search.search;
   const currentStatuses = search.status;
   const currentVerified = search.verified ?? 'true';
   const currentMinStars = search.minStars ?? DEFAULT_MIN_STARS;
   const currentMaxStars = search.maxStars ?? DEFAULT_MAX_STARS;
   const currentSortBy = search.sortBy ?? 'trending';
   const currentSortDirection = search.sortDirection ?? 'desc';

   const activeStatuses = new Set(parseMapListingStatuses(currentStatuses));
   const [filtersOpen, setFiltersOpen] = useState(() => {
      const stored = loadStorage().filtersOpen;
      return stored == null ? initialFiltersOpen : stored === 'true';
   });
   const [pendingStarRange, setPendingStarRange] = useState<[number, number] | null>(null);
   const isRankedMode = RANKED_SORTS.has(currentSortBy) || currentMinStars > DEFAULT_MIN_STARS;
   const showPagination = totalPages > 1;
   const starRange = pendingStarRange ?? [currentMinStars, currentMaxStars];
   const debouncedStarNavigation = useDebouncedCallback((min: number, max: number) => {
      const updates: StarRangeUpdates = {
         minStars: min === DEFAULT_MIN_STARS ? undefined : min,
         maxStars: max === DEFAULT_MAX_STARS ? undefined : max
      };
      const willBeRankedMode = RANKED_SORTS.has(currentSortBy) || min > DEFAULT_MIN_STARS;
      if (willBeRankedMode && !isRankedMode) {
         // entering ranked mode via star filter
         saveStorage({ sortBy: currentSortBy });
         updates.status = 'RANKED';
      } else if (!willBeRankedMode && isRankedMode && !RANKED_SORTS.has(currentSortBy)) {
         // leaving ranked mode by dragging min back to 0
         updates.status = loadStorage().status;
      }
      navigate(updates);
   }, 300);

   function preloadHandlers(updates: Partial<MapsFilterSearch>) {
      return {
         onMouseEnter: () => preload(updates),
         onFocus: () => preload(updates),
         onMouseLeave: cancelPreload,
         onBlur: cancelPreload
      };
   }

   useEffect(() => {
      setPendingStarRange(null);
   }, [currentMinStars, currentMaxStars]);

   function getStatusUpdates(status: MapControllerGetMapListingsStatus) {
      const next = new Set(activeStatuses);
      if (next.has(status)) next.delete(status);
      else next.add(status);
      const value = next.size > 0 ? [...next].join(',') : undefined;

      return { status: value };
   }

   function handleStatusToggle(status: MapControllerGetMapListingsStatus) {
      const updates = getStatusUpdates(status);
      saveStorage({ status: updates.status });
      navigate(updates);
   }

   function handleStarSliderChange(values: number[]) {
      const [min, max] = values;
      setPendingStarRange(min === currentMinStars && max === currentMaxStars ? null : [min, max]);
      debouncedStarNavigation.run(min, max);
   }

   function getSortUpdates(sortBy: MapControllerGetMapListingsSortBy): Partial<MapsFilterSearch> {
      if (sortBy === currentSortBy) {
         return { sortDirection: currentSortDirection === 'desc' ? 'asc' : 'desc' };
      }
      const enteringRankedSort = RANKED_SORTS.has(sortBy);
      if (enteringRankedSort) {
         return { sortBy, sortDirection: 'desc', status: 'RANKED' };
      }
      if (isRankedMode && currentMinStars <= DEFAULT_MIN_STARS) {
         return { sortBy, sortDirection: 'desc', status: loadStorage().status };
      }

      return { sortBy, sortDirection: 'desc' };
   }

   function handleSortChange(sortBy: MapControllerGetMapListingsSortBy) {
      const enteringRankedSort = RANKED_SORTS.has(sortBy);
      // save pre-ranked sort when first entering ranked mode
      if (sortBy !== currentSortBy && enteringRankedSort && !isRankedMode) {
         saveStorage({ sortBy: currentSortBy });
      }
      navigate(getSortUpdates(sortBy));
   }

   function getRankedEscapeUpdates() {
      const stored = loadStorage();
      const restoredSort = isMapSortBy(stored.sortBy) ? stored.sortBy : undefined;
      return {
         sortBy: restoredSort && restoredSort !== 'trending' ? restoredSort : undefined,
         sortDirection: undefined,
         minStars: undefined,
         status: stored.status
      };
   }

   function handleRankedEscape() {
      navigate(getRankedEscapeUpdates());
   }

   const activeFilterCount =
      (activeStatuses.size > 0 ? 1 : 0) +
      (currentVerified === 'false' ? 1 : 0) +
      (currentMinStars !== DEFAULT_MIN_STARS || currentMaxStars !== DEFAULT_MAX_STARS ? 1 : 0) +
      (currentSearch && isMapSearchReady(currentSearch) ? 1 : 0);
   const hasActiveFilters = activeFilterCount > 0;
   const getPageLocation = (page: number) => buildLocation(updateSearchParams(search, { page: page > 1 ? page : undefined }));

   return (
      <Collapsible
         open={filtersOpen}
         onOpenChange={(open) => {
            setFiltersOpen(open);
            saveStorage({ filtersOpen: String(open) });
         }}
      >
         <div className="flex flex-col gap-3">
            {/* search */}
            <div className="flex items-center gap-2 md:gap-3">
               {showPagination && (
                  <PaginationArrow direction="left" page={currentPage - 1} disabled={currentPage <= 1} getPageLocation={getPageLocation} />
               )}

               <div className="relative min-w-0 flex-1">
                  <DebouncedSearchInput
                     id="map-search"
                     initialValue={currentSearch ?? ''}
                     placeholder={t('map.searchPlaceholder')}
                     clearLabel={t('common.clearSearch')}
                     srLabel={t('map.searchMaps')}
                     isSearchReady={isMapSearchReady}
                     onSearchAction={(value) => navigate({ search: value })}
                  />

                  {/* toggle */}
                  <Tooltip>
                     <CollapsibleTrigger asChild>
                        <TooltipTrigger asChild>
                           <Button
                              type="button"
                              variant={hasActiveFilters ? 'default' : 'secondary'}
                              size="icon-xs"
                              aria-label={filtersOpen ? t('common.hideFilters') : t('common.showFilters')}
                              className={cn(
                                 'absolute -bottom-2.5 left-1/2 z-10 h-5 -translate-x-1/2 rounded-full border',
                                 hasActiveFilters ? 'w-auto gap-1 px-2' : 'w-8',
                                 !hasActiveFilters && 'bg-secondary hover:bg-secondary/80'
                              )}
                           >
                              <FaChevronDown className={cn('size-2.5 transition-transform', filtersOpen && 'rotate-180')} aria-hidden="true" />
                              {hasActiveFilters && <span className="text-[10px] leading-none">({activeFilterCount})</span>}
                           </Button>
                        </TooltipTrigger>
                     </CollapsibleTrigger>
                     <TooltipContent>{t('common.filters')}</TooltipContent>
                  </Tooltip>
               </div>

               {showPagination && (
                  <PaginationArrow direction="right" page={currentPage + 1} disabled={currentPage >= totalPages} getPageLocation={getPageLocation} />
               )}
            </div>

            <CollapsibleContent className="flex flex-col gap-1.5 overflow-hidden pt-1">
               {/* filters */}
               <div
                  ref={statusRowScroll.scrollRef}
                  className={cn('flex items-center gap-1.5 overflow-x-auto sm:flex-wrap sm:justify-center', statusRowScroll.fadeClassName)}
               >
                  {STATUS_OPTIONS.map(({ value, icon }) => {
                     const isRankedButton = value === 'RANKED';
                     const active = isRankedMode && isRankedButton ? true : activeStatuses.has(value);
                     const preloadUpdates = isRankedMode ? (isRankedButton ? getRankedEscapeUpdates() : null) : getStatusUpdates(value);
                     return (
                        <FilterPill
                           className="cursor-pointer"
                           key={value}
                           active={active}
                           icon={icon}
                           disabled={isRankedMode && !isRankedButton}
                           {...(preloadUpdates ? preloadHandlers(preloadUpdates) : {})}
                           onClick={() => {
                              if (isRankedMode && isRankedButton) handleRankedEscape();
                              else if (!isRankedMode) handleStatusToggle(value);
                           }}
                        >
                           {value === 'RANKED'
                              ? t('map.statusRanked')
                              : value === 'QUALIFIED'
                                ? t('map.statusQualified')
                                : value === 'LOVED'
                                  ? t('map.statusLoved')
                                  : t('map.statusUnranked')}
                        </FilterPill>
                     );
                  })}
                  <FilterPill
                     className="cursor-pointer"
                     active={currentVerified === 'true'}
                     icon={FaCheckCircle}
                     {...preloadHandlers({ verified: currentVerified === 'true' ? 'false' : undefined })}
                     onClick={() => navigate({ verified: currentVerified === 'true' ? 'false' : undefined })}
                  >
                     {t('map.statusVerified')}
                  </FilterPill>
                  {trailingAction}
               </div>

               {/* sort + stars */}
               <div className="flex flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3">
                  <div
                     ref={sortRowScroll.scrollRef}
                     className={cn('flex items-center gap-1.5 overflow-x-auto sm:justify-center', sortRowScroll.fadeClassName)}
                  >
                     {SORT_OPTIONS.map(({ value }) => {
                        const isActive = currentSortBy === value;
                        return (
                           <FilterPill
                              className="cursor-pointer"
                              key={value}
                              active={isActive}
                              {...preloadHandlers(getSortUpdates(value))}
                              onClick={() => handleSortChange(value)}
                           >
                              {value === 'trending'
                                 ? t('map.sortTrending')
                                 : value === 'createdAt'
                                   ? t('map.sortDateAdded')
                                   : value === 'latestRankedAt'
                                     ? t('map.sortRecentlyRanked')
                                     : value === 'highestStars'
                                       ? t('map.sortStarRating')
                                       : t('map.sortMostPlayed')}
                              {isActive &&
                                 (currentSortDirection === 'desc' ? <FaArrowDown className="size-2.5" /> : <FaArrowUp className="size-2.5" />)}
                           </FilterPill>
                        );
                     })}
                  </div>

                  {/* stars */}
                  <div className="flex items-center gap-2.5">
                     <FaStar className="text-primary size-3.5 shrink-0" aria-hidden="true" />
                     <span className="text-muted-foreground w-7 text-right text-xs tabular-nums">{starRange[0].toFixed(1)}</span>
                     <Slider
                        value={starRange}
                        onValueChange={handleStarSliderChange}
                        min={DEFAULT_MIN_STARS}
                        max={DEFAULT_MAX_STARS}
                        step={0.1}
                        minStepsBetweenThumbs={1}
                        aria-label={t('map.starRatingRange')}
                        className="min-w-36 flex-1 cursor-pointer sm:flex-initial [&_[data-slot=slider-thumb]]:cursor-pointer"
                     />
                     <span className="text-muted-foreground w-7 text-xs tabular-nums">{starRange[1].toFixed(1)}</span>
                     <span className="text-muted-foreground text-xs">{t('map.stars')}</span>
                  </div>

                  {/* clear */}
                  {hasActiveFilters && (
                     <FilterPill
                        className="cursor-pointer"
                        icon={FaTimes}
                        onMouseEnter={preloadClearAll}
                        onFocus={preloadClearAll}
                        onMouseLeave={cancelPreload}
                        onBlur={cancelPreload}
                        onClick={() => clearAll()}
                     >
                        {t('common.clear')}
                     </FilterPill>
                  )}
               </div>
            </CollapsibleContent>
         </div>
      </Collapsible>
   );
}
