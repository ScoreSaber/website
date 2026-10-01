'use client';

import { FaLayerGroup, FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import { FaCheck, FaCircleMinus, FaHourglassHalf } from 'react-icons/fa6';
import { useTranslations } from 'use-intl';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { SongCard } from '@/modules/maps/shared/song-card';
import type { RankingControllerGetRequestsDataItem } from '@/shared/api/generated/ApiParams';
import { cn } from '@/shared/format/helpers';
import { usePersistedLeaderboardSearch } from '@/shared/url-state/persisted/use-persisted-leaderboard-search';

export function RankRequestCard({ request, className, queuePosition }: RankRequestCardProps) {
   const t = useTranslations('rankRequest');
   const map = request.map;
   const linkSearch = usePersistedLeaderboardSearch({ tab: 'rank-request' });
   const readiness = request.rtVoteReadiness;
   const readinessConfig = readinessConfigByStatus[readiness.status];
   const ReadinessIcon = readinessConfig.icon;
   const readinessLabel = getReadinessLabel(t, readiness);

   return (
      <SongCard
         coverUrl={map.coverUrl}
         songName={map.songName}
         songSubName={map.songSubName}
         songAuthorName={map.songAuthorName}
         levelAuthorName={map.levelAuthorName}
         createdAt={request.createdAt}
         accentClass={REQUEST_TYPE_ACCENT[request.requestType] ?? 'bg-muted'}
         mapId={map.id}
         linkSearch={linkSearch}
         className={className}
         coverClassName={readinessConfig.coverClassName}
         coverBadge={
            <Tooltip>
               <TooltipTrigger asChild>
                  <button
                     type="button"
                     className={cn(
                        'inline-flex size-5 cursor-help items-center justify-center rounded-full border text-[10px] shadow-lg backdrop-blur focus-visible:outline-2 focus-visible:outline-offset-2',
                        readinessConfig.badgeClassName
                     )}
                     aria-label={readinessLabel}
                  >
                     <ReadinessIcon className="size-2.5" aria-hidden="true" />
                  </button>
               </TooltipTrigger>
               <TooltipContent>
                  <p>{readinessLabel}</p>
               </TooltipContent>
            </Tooltip>
         }
         pills={
            <>
               {queuePosition !== undefined && (
                  <span className="bg-score-pp/15 text-score-pp inline-flex items-center rounded px-1.5 py-0.5 text-[11px] font-bold tabular-nums">
                     #{queuePosition}
                  </span>
               )}
               <span className="bg-secondary/60 text-muted-foreground inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] font-semibold">
                  <FaLayerGroup className="size-2.5" />
                  {t('difficultyCount', { count: request.difficultyCount })}
               </span>
            </>
         }
         mobileMetadata={
            <>
               <VoteSummary label={t('rt')} up={request.totalRtVotes.upvotes} down={request.totalRtVotes.downvotes} />
               <VoteSummary
                  label={t('qat')}
                  up={request.totalQatVotes.upvotes}
                  neutral={request.totalQatVotes.neutrals}
                  down={request.totalQatVotes.downvotes}
               />
            </>
         }
         desktopMetadata={
            <>
               <div className="flex items-center gap-1.5 text-xs">
                  <VoteSummary label={t('rt')} up={request.totalRtVotes.upvotes} down={request.totalRtVotes.downvotes} />
               </div>
               <div className="flex items-center gap-1.5 text-xs">
                  <VoteSummary
                     label={t('qat')}
                     up={request.totalQatVotes.upvotes}
                     neutral={request.totalQatVotes.neutrals}
                     down={request.totalQatVotes.downvotes}
                  />
               </div>
            </>
         }
      />
   );
}

function getReadinessLabel(t: ReturnType<typeof useTranslations<'rankRequest'>>, readiness: RankingControllerGetRequestsDataItem['rtVoteReadiness']) {
   switch (readiness.status) {
      case 'READY':
         return t('queueIndicatorReady');
      case 'BLOCKED':
         return t('queueIndicatorDownvoted', { count: readiness.downvotes });
      case 'CLOSE':
      case 'QUEUED':
         return t('queueIndicatorNeedsVotes', { count: readiness.missingUpvotes });
   }
}

const readinessConfigByStatus = {
   READY: {
      icon: FaCheck,
      coverClassName: 'ring-2 ring-status-success/80 shadow-status-success/30',
      badgeClassName: 'border-status-success/50 bg-status-success/90 text-white'
   },
   CLOSE: {
      icon: FaHourglassHalf,
      coverClassName: 'ring-2 ring-score-pp/80 shadow-score-pp/25',
      badgeClassName: 'border-score-pp/50 bg-score-pp/90 text-black'
   },
   BLOCKED: {
      icon: FaThumbsDown,
      coverClassName: 'ring-2 ring-destructive/80 shadow-destructive/30',
      badgeClassName: 'border-destructive/50 bg-destructive/90 text-destructive-foreground'
   },
   QUEUED: {
      icon: FaHourglassHalf,
      coverClassName: 'ring-1 ring-border/80',
      badgeClassName: 'border-border/80 bg-secondary/90 text-muted-foreground'
   }
};

function VoteSummary({ label, up, down, neutral }: { label: string; up: number; down: number; neutral?: number }) {
   return (
      <span className="flex items-center gap-1.5">
         <span className="text-muted-foreground">{label}</span>
         <span className="flex items-center gap-0.5 text-green-400">
            <FaThumbsUp className="size-2.5" />
            {up}
         </span>
         {neutral !== undefined && (
            <span className="flex items-center gap-0.5 text-yellow-400">
               <FaCircleMinus className="size-2.5" />
               {neutral}
            </span>
         )}
         <span className="flex items-center gap-0.5 text-red-400">
            <FaThumbsDown className="size-2.5" />
            {down}
         </span>
      </span>
   );
}

const REQUEST_TYPE_ACCENT = {
   RANK: 'bg-status-success',
   UNRANK: 'bg-destructive'
};

interface RankRequestCardProps {
   request: RankingControllerGetRequestsDataItem;
   className?: string;
   queuePosition?: number;
}
