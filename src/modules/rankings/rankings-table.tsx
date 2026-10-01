'use client';

import { useCallback, useEffect, useRef, useTransition } from 'react';

import { useRouter } from '@tanstack/react-router';
import type { IconType } from 'react-icons';
import { FaBullseye, FaGlobe, FaPlay, FaSortAmountDown, FaSortAmountUp, FaStar, FaTrophy } from 'react-icons/fa';
import { useTranslations } from 'use-intl';

import { cardSurfaceVariants } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { PlayerListLivePresenceIndicator } from '@/modules/player/profile/player-live-presence-indicator';
import { PlayerAvatar } from '@/modules/player/shared/player-avatar';
import { PlayerLink } from '@/modules/player/shared/player-link';
import { WeeklyRankChange } from '@/modules/player/shared/weekly-rank-change';
import type {
   PlayerControllerGetPlayersDataItem,
   PlayerControllerGetPlayersPivot,
   PlayerControllerGetPlayersSort,
   PlayerControllerGetPlayersSortDirection
} from '@/shared/api/generated/ApiParams';
import { CountryImage } from '@/shared/components/country-image';
import { FilterPill } from '@/shared/components/filter-pill';
import { NAV_CARD_ABOVE_OVERLAY, NAV_CARD_PRESS, NavCardChevron, NavCardOverlay } from '@/shared/components/nav-card';
import type { CountryRegionFilterValue } from '@/shared/country-region';
import { cn, formatAccuracy, formatNumber, formatPP } from '@/shared/format/helpers';
import { navigateToRoute, type RouteLocationBuilder } from '@/shared/url-state/route-location';
import type { SearchParamsRecord } from '@/shared/url-state/search-params';
import { updateSearchParams } from '@/shared/url-state/update-search-params';
import { useRouteHrefPreload } from '@/shared/url-state/use-route-href-preload';

const PAGE_SIZE = 50;

const DEFAULT_DIRECTIONS = {
   rank: 'asc',
   countryRank: 'asc',
   totalPP: 'desc',
   totalScore: 'desc',
   totalRankedScore: 'desc',
   totalPlayedLeaderboards: 'desc',
   totalPlayedRankedLeaderboards: 'desc',
   totalSubmittedPlays: 'desc',
   totalReplayViews: 'desc',
   averageAccuracy: 'desc',
   weightedAverageAccuracy: 'desc',
   completionAccuracy: 'desc'
} satisfies Record<PlayerControllerGetPlayersSort, PlayerControllerGetPlayersSortDirection>;

interface SortableColumn {
   sortField: PlayerControllerGetPlayersSort;
   icon: IconType;
}

const SORTABLE_COLUMNS: SortableColumn[] = [
   { sortField: 'totalPP', icon: FaStar },
   { sortField: 'totalSubmittedPlays', icon: FaPlay },
   { sortField: 'totalPlayedRankedLeaderboards', icon: FaTrophy },
   { sortField: 'averageAccuracy', icon: FaBullseye }
];

interface RankingsTableProps<TLocation> {
   players: PlayerControllerGetPlayersDataItem[];
   countryFiltered: boolean;
   currentSort?: PlayerControllerGetPlayersSort;
   currentSortDirection?: PlayerControllerGetPlayersSortDirection;
   currentPage: number;
   currentPivot?: PlayerControllerGetPlayersPivot;
   highlight?: string;
   search: RankingsTableSearch;
   buildLocation: RouteLocationBuilder<RankingsTableSearch, TLocation>;
}

type RankingsTableSearch = SearchParamsRecord & {
   page?: number;
   search?: string;
   countries?: CountryRegionFilterValue;
   sort?: PlayerControllerGetPlayersSort;
   sortDirection?: PlayerControllerGetPlayersSortDirection;
   pivot?: PlayerControllerGetPlayersPivot;
   includeInactive?: 'true' | 'false';
   live?: 'true' | 'false';
   highlight?: string;
};

export function RankingsTable<TLocation>({
   players,
   countryFiltered,
   currentSort,
   currentSortDirection,
   currentPage,
   currentPivot,
   highlight,
   search,
   buildLocation
}: RankingsTableProps<TLocation>) {
   const router = useRouter();
   const t = useTranslations();
   const { schedulePreload, cancelPreload } = useRouteHrefPreload();
   const [isPending, startTransition] = useTransition();

   const getSortLocation = useCallback(
      (field: PlayerControllerGetPlayersSort) => {
         const isCurrentField = currentSort === field || (!currentSort && field === 'totalPP');
         const currentDir = currentSortDirection ?? DEFAULT_DIRECTIONS[field];
         const sortDirection = isCurrentField && currentDir === 'desc' ? 'asc' : DEFAULT_DIRECTIONS[field];

         const updates: Partial<RankingsTableSearch> =
            field === 'totalPP' && sortDirection === 'desc' ? { sort: undefined, sortDirection: undefined } : { sort: field, sortDirection };

         return buildLocation(updateSearchParams(search, updates, ['page']));
      },
      [buildLocation, search, currentSort, currentSortDirection]
   );

   const handleSort = useCallback(
      (field: PlayerControllerGetPlayersSort) => {
         startTransition(() => navigateToRoute(router, getSortLocation(field)));
      },
      [getSortLocation, router]
   );

   const isPlayerPivot = currentPivot === 'player';
   const activeField = currentSort ?? 'totalPP';
   const activeDirection = currentSortDirection ?? DEFAULT_DIRECTIONS[activeField];
   const isDefaultSort = !currentSort || currentSort === 'totalPP';
   const SortArrow = activeDirection === 'desc' ? FaSortAmountDown : FaSortAmountUp;
   const sharedProps = { countryFiltered, isDefaultSort, highlight };

   return (
      <div id="rankings" className="scroll-mt-20">
         {/* mobile: sort pills + card list */}
         <div className="lg:hidden">
            {!isPlayerPivot && (
               <div className={cn('flex flex-wrap justify-center gap-1.5 pb-3', isPending && 'pointer-events-none opacity-50')}>
                  {SORTABLE_COLUMNS.map((col) => {
                     const isActive = activeField === col.sortField;
                     return (
                        <FilterPill
                           className="cursor-pointer"
                           key={col.sortField}
                           active={isActive}
                           icon={col.icon}
                           onMouseEnter={() => schedulePreload(getSortLocation(col.sortField))}
                           onFocus={() => schedulePreload(getSortLocation(col.sortField))}
                           onMouseLeave={cancelPreload}
                           onBlur={cancelPreload}
                           onClick={() => handleSort(col.sortField)}
                        >
                           {col.sortField === 'totalPP'
                              ? t('common.pp')
                              : col.sortField === 'totalSubmittedPlays'
                                ? t('rankings.plays')
                                : col.sortField === 'totalPlayedRankedLeaderboards'
                                  ? t('rankings.ranked')
                                  : t('rankings.acc')}
                           {isActive && <SortArrow className="size-2.5" />}
                        </FilterPill>
                     );
                  })}
               </div>
            )}

            <div className="flex flex-col gap-1.5">
               {players.map((player, index) => (
                  <RankingCard
                     key={player.id}
                     player={player}
                     {...sharedProps}
                     listPosition={(currentPage - 1) * PAGE_SIZE + index + 1}
                     showLivePresence
                  />
               ))}
            </div>
         </div>

         {/* desktop: full table */}
         <div className="hidden lg:block">
            <Table className="border-separate border-spacing-y-1.5 text-center whitespace-nowrap">
               <TableHeader>
                  <TableRow className="after:from-border/60 relative border-b-0 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-linear-to-l after:to-transparent hover:bg-transparent">
                     <TableHead className="h-auto px-3 py-2.5 text-center" />
                     <TableHead className="h-auto px-3 py-2.5 text-center" />
                     {SORTABLE_COLUMNS.map((col) => {
                        const isActive = activeField === col.sortField;
                        return (
                           <TableHead
                              key={col.sortField}
                              className={cn(
                                 'h-auto px-4 py-2.5 text-center text-xs font-medium tracking-wide transition-colors select-none',
                                 isPlayerPivot
                                    ? 'text-muted-foreground'
                                    : cn('hover:text-foreground cursor-pointer', isActive ? 'text-foreground' : 'text-muted-foreground'),
                                 isPending && !isPlayerPivot && 'pointer-events-none opacity-50'
                              )}
                              onClick={isPlayerPivot ? undefined : () => handleSort(col.sortField)}
                              onMouseEnter={isPlayerPivot ? undefined : () => schedulePreload(getSortLocation(col.sortField))}
                              onFocus={isPlayerPivot ? undefined : () => schedulePreload(getSortLocation(col.sortField))}
                              onMouseLeave={isPlayerPivot ? undefined : cancelPreload}
                              onBlur={isPlayerPivot ? undefined : cancelPreload}
                           >
                              <span className="inline-flex items-center gap-1.5">
                                 <col.icon className="size-3" />
                                 {col.sortField === 'totalPP'
                                    ? t('common.pp')
                                    : col.sortField === 'totalSubmittedPlays'
                                      ? t('rankings.totalPlayCount')
                                      : col.sortField === 'totalPlayedRankedLeaderboards'
                                        ? t('rankings.rankedPlayCount')
                                        : t('rankings.averageRankedAccuracy')}
                                 {isActive && !isPlayerPivot && <SortArrow className="size-3" />}
                              </span>
                           </TableHead>
                        );
                     })}
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {players.map((player, index) => (
                     <RankingRow
                        key={player.id}
                        player={player}
                        {...sharedProps}
                        listPosition={(currentPage - 1) * PAGE_SIZE + index + 1}
                        showLivePresence
                     />
                  ))}
               </TableBody>
            </Table>
         </div>
      </div>
   );
}

interface RankingItemProps {
   player: PlayerControllerGetPlayersDataItem;
   countryFiltered: boolean;
   isDefaultSort: boolean;
   listPosition: number;
   highlight?: string;
   variant?: 'default' | 'summary';
   className?: string;
   avatarPriority?: boolean;
   showLivePresence?: boolean;
   showRankChange?: boolean;
}

export function RankingCard({
   player,
   countryFiltered,
   isDefaultSort,
   listPosition,
   highlight,
   variant = 'default',
   className,
   avatarPriority,
   showLivePresence
}: RankingItemProps) {
   const router = useRouter();
   const isHighlighted = highlight === player.id;
   const ref = useRef<HTMLDivElement>(null);

   useEffect(() => {
      if (isHighlighted && ref.current) {
         ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
   }, [isHighlighted]);

   return (
      <div
         ref={ref}
         className={cn(
            NAV_CARD_PRESS,
            'group relative flex cursor-pointer flex-col px-3 transition-[color,background-color,border-color,scale]',
            variant === 'summary'
               ? cn(cardSurfaceVariants.settings, 'hover:border-primary/35')
               : 'bg-secondary/40 rounded-lg border hover:border-primary/35',
            variant === 'summary' ? 'py-2' : 'gap-1.5 py-2.5',
            player.inactive && 'opacity-60',
            isHighlighted && 'border-primary ring-primary/40 ring-1',
            className
         )}
         onClick={() => router.navigate({ to: '/u/$playerId', params: { playerId: player.id } })}
      >
         <NavCardOverlay location={{ to: '/u/$playerId', params: { playerId: player.id } }} />
         {variant === 'summary' ? (
            <RankingCardSummary
               player={player}
               countryFiltered={countryFiltered}
               isDefaultSort={isDefaultSort}
               listPosition={listPosition}
               avatarPriority={avatarPriority}
               showLivePresence={showLivePresence}
            />
         ) : (
            <RankingCardDefault
               player={player}
               countryFiltered={countryFiltered}
               isDefaultSort={isDefaultSort}
               listPosition={listPosition}
               showLivePresence={showLivePresence}
            />
         )}
      </div>
   );
}

function RankingCardDefault({ player, countryFiltered, isDefaultSort, listPosition, showLivePresence }: RankingItemProps) {
   const stats = player.stats;

   return (
      <div className="flex items-center gap-2">
         <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <div className="flex items-center gap-2">
               <RankingCardRank player={player} countryFiltered={countryFiltered} isDefaultSort={isDefaultSort} listPosition={listPosition} />
               <div className={cn('min-w-0 flex-1', NAV_CARD_ABOVE_OVERLAY)}>
                  <PlayerLink withPFP player={player} isInactive={player.inactive} showLivePresence={showLivePresence} />
               </div>
            </div>

            <div className="text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-0.5 pl-1 text-[13px] md:text-xs">
               {[
                  { key: 'pp', Icon: FaStar, value: `${formatPP(stats.totalPP)}pp`, extra: 'font-semibold text-score-pp' },
                  { key: 'accuracy', Icon: FaBullseye, value: formatAccuracy(stats.averageAccuracy) },
                  { key: 'plays', Icon: FaPlay, value: formatNumber(stats.totalSubmittedPlays) },
                  { key: 'ranked-plays', Icon: FaTrophy, value: formatNumber(stats.totalPlayedRankedLeaderboards) }
               ].map(({ key, Icon, value, extra }) => (
                  <span key={key} className={cn('inline-flex items-center gap-1', extra)}>
                     <Icon className="size-2.5" />
                     {value}
                  </span>
               ))}
            </div>
         </div>
         <NavCardChevron />
      </div>
   );
}

function RankingCardSummary({ player, countryFiltered, isDefaultSort, listPosition, avatarPriority, showLivePresence }: RankingItemProps) {
   const stats = player.stats;

   return (
      <div className="flex items-center gap-2.5">
         <RankingCardRank
            player={player}
            countryFiltered={countryFiltered}
            isDefaultSort={isDefaultSort}
            listPosition={listPosition}
            showRankChange={false}
         />
         <span className="relative inline-flex shrink-0">
            <PlayerAvatar
               src={player.avatar}
               version={player.avatarVersion}
               alt={player.name}
               width={32}
               height={32}
               priority={avatarPriority}
               className={cn('rounded-full', player.inactive && 'opacity-50 grayscale')}
            />
            {showLivePresence && <PlayerListLivePresenceIndicator playerId={player.id} className="absolute -bottom-0.5 left-[70%] z-10" />}
         </span>
         <div className="grid min-w-0 flex-1 grid-cols-[auto_minmax(0,1fr)] items-center gap-x-2">
            <CountryImage country={player.country} className="row-span-2 shrink-0" />
            <div className="relative -top-px col-start-2 flex min-w-0 flex-col">
               <PlayerLink player={player} variant="inline" className={cn('truncate text-sm font-semibold', player.inactive && 'opacity-50')} />
               <span className="text-score-pp inline-flex min-w-0 items-center gap-1 text-[11px] leading-tight font-semibold">
                  <FaStar className="size-2.5 shrink-0" />
                  <span className="truncate">{formatPP(stats.totalPP)}pp</span>
               </span>
            </div>
         </div>
         <NavCardChevron className="size-3.5" />
      </div>
   );
}

function RankingCardRank({ player, countryFiltered, isDefaultSort, listPosition, showRankChange = true }: RankingItemProps) {
   const stats = player.stats;

   return (
      <span className="text-muted-foreground shrink-0 text-sm tabular-nums">
         <RankCell
            isDefaultSort={isDefaultSort}
            countryFiltered={countryFiltered}
            listPosition={listPosition}
            globalRank={stats.rank}
            countryRank={stats.countryRank}
            rankChange={showRankChange ? stats.rankChange : null}
            country={player.country}
         />
      </span>
   );
}

function RankingRow({ player, countryFiltered, isDefaultSort, listPosition, highlight, showLivePresence }: RankingItemProps) {
   const stats = player.stats;
   const isHighlighted = highlight === player.id;
   const ref = useRef<HTMLTableRowElement>(null);

   useEffect(() => {
      if (isHighlighted && ref.current) {
         ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
   }, [isHighlighted]);

   return (
      <TableRow
         ref={ref}
         className={cn(
            '[&>td]:bg-secondary/40 border-b-0 transition-colors duration-500 ease-out hover:bg-transparent',
            player.inactive && 'opacity-60',
            isHighlighted && '[&>td]:border-primary'
         )}
      >
         <TableCell className="rounded-l-lg border-y border-l px-3 py-2.5 text-left">
            <RankCell
               isDefaultSort={isDefaultSort}
               countryFiltered={countryFiltered}
               listPosition={listPosition}
               globalRank={stats.rank}
               countryRank={stats.countryRank}
               rankChange={stats.rankChange}
               country={player.country}
            />
         </TableCell>
         <TableCell className="max-w-50 border-y py-2.5 text-left font-semibold">
            <div className="truncate">
               <PlayerLink withPFP player={player} isInactive={player.inactive} showLivePresence={showLivePresence} />
            </div>
         </TableCell>
         {[
            { key: 'pp', value: `${formatPP(stats.totalPP)}pp`, extra: 'text-score-pp' },
            { key: 'plays', value: formatNumber(stats.totalSubmittedPlays) },
            { key: 'ranked-plays', value: formatNumber(stats.totalPlayedRankedLeaderboards) },
            { key: 'accuracy', value: formatAccuracy(stats.averageAccuracy), extra: 'rounded-r-lg border-r' }
         ].map(({ key, value, extra }) => (
            <TableCell key={key} className={cn('border-y px-4 py-2.5', extra)}>
               {value}
            </TableCell>
         ))}
      </TableRow>
   );
}

interface RankCellProps {
   isDefaultSort: boolean;
   countryFiltered: boolean;
   listPosition: number;
   globalRank: number;
   countryRank: number;
   rankChange: number | null;
   country: string;
}

function RankCell({ isDefaultSort, countryFiltered, listPosition, globalRank, countryRank, rankChange, country }: RankCellProps) {
   if (isDefaultSort) {
      if (countryFiltered) {
         return (
            <span className="inline-flex items-center gap-1 tabular-nums">
               <span>#{formatNumber(listPosition)}</span>
               <span className="text-muted-foreground text-xs">(#{formatNumber(globalRank)})</span>
               <WeeklyRankChange change={rankChange} />
            </span>
         );
      }
      return (
         <span className="inline-flex items-center gap-1.5 tabular-nums">
            #{formatNumber(globalRank)}
            <WeeklyRankChange change={rankChange} />
         </span>
      );
   }

   return (
      <div className="flex items-center gap-2">
         <span className="tabular-nums">#{formatNumber(listPosition)}</span>
         <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
            {countryFiltered && (
               <span className="inline-flex items-center gap-0.5">
                  <CountryImage country={country} size={12} className="cursor-pointer" />
                  <span className="tabular-nums">#{formatNumber(countryRank)}</span>
               </span>
            )}
            <span className="inline-flex items-center gap-0.5">
               <FaGlobe className="size-2.5" />
               <span className="tabular-nums">#{formatNumber(globalRank)}</span>
               <WeeklyRankChange change={rankChange} />
            </span>
         </div>
      </div>
   );
}
