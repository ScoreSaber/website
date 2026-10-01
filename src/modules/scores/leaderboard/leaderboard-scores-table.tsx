'use client';

import { useState } from 'react';

import { FaGlobeAmericas } from 'react-icons/fa';

import { Separator } from '@/components/ui/separator';

import { useAuth } from '@/modules/auth';
import { PlayerListLivePresenceIndicator, PlayerLivePresenceProvider } from '@/modules/player/profile/player-live-presence-indicator';
import { PlayerAvatar } from '@/modules/player/shared/player-avatar';
import { PlayerLink } from '@/modules/player/shared/player-link';
import { ScoreCardActions } from '@/modules/scores/score-card-actions';
import { ScoreDetailsInline } from '@/modules/scores/score-details-inline';
import { ScoreHistory } from '@/modules/scores/score-history';
import { ScoreStats } from '@/modules/scores/score-stats';
import type {
   LeaderboardControllerGetLeaderboardByIdResponse,
   LeaderboardControllerGetLeaderboardScoresByIdDataItem
} from '@/shared/api/generated/ApiParams';
import { DeviceDisplay } from '@/shared/components/device-display';
import { Time } from '@/shared/components/time';
import { cn, formatNumber, getHmdName, isLegacyAccuracyScore } from '@/shared/format/helpers';
import { starsToPP } from '@/shared/format/star-conversion';
import { isLeaderboardRanked } from '@/shared/format/styling';
import Permissions from '@/shared/permissions';

// only the scoring bits, so both map-detail leaderboards and score leaderboards fit
export type ScoredLeaderboard = Pick<LeaderboardControllerGetLeaderboardByIdResponse, 'maxScore' | 'realm'>;

interface LeaderboardScoresTableProps {
   scores: LeaderboardControllerGetLeaderboardScoresByIdDataItem[];
   leaderboard: ScoredLeaderboard;
   highlight?: number;
   // when filtering by scope/search, pass pagination info to compute relative ranks
   scopedPage?: number;
   scopedPageSize?: number;
   showHistory?: boolean;
   historyContext?: boolean;
   mapName?: string;
}

export function LeaderboardScoresTable({
   scores,
   leaderboard,
   highlight,
   scopedPage,
   scopedPageSize,
   showHistory = true,
   historyContext = false,
   mapName
}: LeaderboardScoresTableProps) {
   const isRanked = isLeaderboardRanked(leaderboard);
   const isScoped = scopedPage != null && scopedPageSize != null;

   return (
      <PlayerLivePresenceProvider enabled={scores.length > 0}>
         <div className="flex flex-col gap-1.5">
            {scores.map((score, index) => (
               <LeaderboardScoreCard
                  key={score.id}
                  score={score}
                  isRanked={isRanked}
                  isHighlighted={highlight === score.id}
                  showAccuracy={leaderboard.maxScore > 0}
                  leaderboard={leaderboard}
                  relativeRank={isScoped ? (scopedPage - 1) * scopedPageSize + index + 1 : undefined}
                  showHistory={showHistory}
                  historyContext={historyContext}
                  mapName={mapName}
               />
            ))}
         </div>
      </PlayerLivePresenceProvider>
   );
}

interface LeaderboardScoreCardProps {
   score: LeaderboardControllerGetLeaderboardScoresByIdDataItem;
   isRanked: boolean;
   isHighlighted: boolean;
   showAccuracy: boolean;
   leaderboard: ScoredLeaderboard;
   relativeRank?: number;
   showHistory: boolean;
   historyContext: boolean;
   mapName?: string;
}

function LeaderboardScoreCard({
   score,
   isRanked,
   isHighlighted,
   showAccuracy,
   leaderboard,
   relativeRank,
   showHistory,
   historyContext,
   mapName
}: LeaderboardScoreCardProps) {
   const { user } = useAuth();
   const [detailsExpanded, setDetailsExpanded] = useState(false);
   const [historyExpanded, setHistoryExpanded] = useState(false);
   const legacyAccuracy = isLegacyAccuracyScore(score.createdAt);
   const fcPPContext = isRanked
      ? {
           realmId: leaderboard.realm.realmId,
           maxPP: starsToPP(leaderboard.realm.stars),
           positiveModifiers: leaderboard.realm.positiveModifiers
        }
      : undefined;

   const hmdName = getHmdName(score.device, score.legacyHmdId);
   const hasDevice = !!(hmdName || score.device?.controllerLeft || score.device?.controllerRight);
   const canDelete = !historyContext && !!user && Permissions.checkPermissionNumber(user.permissions, Permissions.security.ADMIN);
   const hasBottomActions = score.hasReplay || showHistory || canDelete;

   const deviceIcons = hasDevice ? (
      <DeviceDisplay
         hmd={hmdName}
         controllerLeft={score.device?.controllerLeft}
         controllerRight={score.device?.controllerRight}
         className="-ml-0.5"
      />
   ) : null;

   const rankDisplay = historyContext ? (
      score.playOutcome === 'CLEAR' ? (
         <span className="text-muted-foreground tabular-nums">#{formatNumber(score.rank)}</span>
      ) : (
         <span className="text-muted-foreground/60 tabular-nums">--</span>
      )
   ) : relativeRank != null ? (
      <span className="flex items-baseline gap-1">
         <span className="text-muted-foreground tabular-nums">#{formatNumber(relativeRank)}</span>
         <span className="text-muted-foreground/60 text-xs tabular-nums">(#{formatNumber(score.rank)})</span>
      </span>
   ) : (
      <span className="text-muted-foreground tabular-nums">#{formatNumber(score.rank)}</span>
   );

   return (
      <div>
         <div
            className={cn(
               'bg-secondary/40 relative w-full rounded-lg border px-3 py-2.5 text-left transition-colors',
               hasBottomActions ? 'pb-10' : 'pb-2.5',
               'md:pr-14 md:pb-2.5',
               isHighlighted && 'border-primary'
            )}
         >
            {/* mobile: stacked layout */}
            <div className="md:hidden">
               {/* top bar: rank / player / devices */}
               <div className="mb-1 flex w-full items-center justify-between text-sm">
                  <span className="flex items-center">
                     <FaGlobeAmericas className="text-muted-foreground mr-1 size-4" />
                     {rankDisplay}
                  </span>
                  <div className="flex items-center gap-2">
                     <span className="relative inline-flex shrink-0">
                        <PlayerAvatar
                           src={score.player.avatar}
                           version={score.player.avatarVersion}
                           alt={score.player.name}
                           width={28}
                           height={28}
                           className="shrink-0 rounded-full"
                        />
                        <PlayerListLivePresenceIndicator playerId={score.player.id} className="absolute -bottom-0.5 left-[70%] z-10" />
                     </span>
                     <PlayerLink player={score.player} />
                  </div>
                  {deviceIcons ?? <span />}
               </div>

               {/* stats */}
               <ScoreStats
                  score={score}
                  showAccuracy={showAccuracy}
                  showPP={isRanked}
                  legacyAccuracy={legacyAccuracy}
                  accuracyPPContext={fcPPContext}
                  className="mx-auto mt-0 max-w-80 flex-row flex-wrap gap-1.5"
                  timeSet={score.createdAt}
               />
            </div>

            {/* desktop: horizontal layout */}
            <div className="hidden md:flex md:items-center md:justify-between">
               <div className="flex items-center gap-3">
                  <div className={cn('flex shrink-0 flex-col items-center gap-0.5', relativeRank != null ? 'w-24' : 'w-16')}>
                     <span className="flex items-center gap-1 text-sm">
                        <FaGlobeAmericas className="text-muted-foreground size-3" />
                        {rankDisplay}
                     </span>
                     <span className="text-muted-foreground text-[11px]">
                        <Time
                           short
                           date={score.createdAt}
                           longRelativeClassName="text-(length:--short-time-font-size)"
                           shortFitTargetLength={12}
                           minShortFitScale={0.85}
                        />
                     </span>
                  </div>
                  <span className="relative inline-flex shrink-0">
                     <PlayerAvatar
                        src={score.player.avatar}
                        version={score.player.avatarVersion}
                        alt={score.player.name}
                        width={32}
                        height={32}
                        className="shrink-0 rounded-full"
                     />
                     <PlayerListLivePresenceIndicator playerId={score.player.id} className="absolute -bottom-0.5 left-[70%] z-10" />
                  </span>
                  <div className="min-w-0 flex-1">
                     <PlayerLink player={score.player} />
                     {deviceIcons && <div className="pt-0.5">{deviceIcons}</div>}
                  </div>
               </div>

               <ScoreStats
                  score={score}
                  showAccuracy={showAccuracy}
                  showPP={isRanked}
                  legacyAccuracy={legacyAccuracy}
                  accuracyPPContext={fcPPContext}
                  className="mt-0 items-end"
               />
            </div>

            {/* actions */}
            {hasBottomActions && <Separator variant="gradient" className="absolute right-4 bottom-8 left-4 md:hidden" />}
            <ScoreCardActions
               score={score}
               detailsExpanded={detailsExpanded}
               onToggleDetailsAction={score.hasReplay ? () => setDetailsExpanded((prev) => !prev) : undefined}
               historyExpanded={historyExpanded}
               onToggleHistoryAction={showHistory ? () => setHistoryExpanded((prev) => !prev) : undefined}
               replayTooltipSide="top"
               tooltipSide="bottom"
               mobileBottomRow
               bottomRowDesktopBreakpoint="md"
               allowDelete={!historyContext}
               deleteContext={{ playerName: score.player.name, mapName }}
               className={cn(
                  'md:top-1/2 md:right-3 md:bottom-auto md:left-auto md:translate-x-0 md:-translate-y-1/2',
                  score.hasReplay || showHistory || canDelete ? 'bottom-2 left-1/2 -translate-x-1/2' : 'hidden md:flex'
               )}
            />
         </div>
         {detailsExpanded && (
            <div className="mt-2 lg:mx-6">
               <ScoreDetailsInline score={score} fcPPContext={fcPPContext} />
            </div>
         )}
         {historyExpanded && (
            <div className="mt-2 lg:mx-6">
               <ScoreHistory scoreId={score.id} leaderboard={leaderboard} mapName={mapName} />
            </div>
         )}
      </div>
   );
}
