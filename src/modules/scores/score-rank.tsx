'use client';

import { getRouteApi } from '@tanstack/react-router';
import { FaGlobeAmericas } from 'react-icons/fa';

import { DeviceDisplay } from '@/shared/components/device-display';
import { Time } from '@/shared/components/time';
import { cn, formatNumber, rankToPage } from '@/shared/format/helpers';

const mapDifficultyRoute = getRouteApi('/map/$id/difficulty/$leaderboardId');

interface ScoreRankProps {
   rank: number;
   scoreId: number;
   mapId: number;
   leaderboardId: number;
   timeSet: string | Date;
   hmdName?: string | null;
   controllerLeft?: string | null;
   controllerRight?: string | null;
   useContainerQueries?: boolean;
}

export function ScoreRank({
   rank,
   scoreId,
   mapId,
   leaderboardId,
   timeSet,
   hmdName,
   controllerLeft,
   controllerRight,
   useContainerQueries = false
}: ScoreRankProps) {
   const cq = useContainerQueries;
   return (
      <div
         className={cn(
            'relative flex w-full shrink-0 flex-row justify-between text-sm',
            cq ? '@min-[600px]/scorecard:w-20 @min-[600px]/scorecard:flex-col' : 'lg:w-20 lg:flex-col'
         )}
      >
         <span className={cn('flex items-center', cq ? '@min-[600px]/scorecard:justify-center' : 'lg:justify-center')}>
            <FaGlobeAmericas className="mr-1 size-4" />
            <mapDifficultyRoute.Link
               params={{ id: mapId, leaderboardId }}
               search={{ page: rankToPage(rank, 12), highlight: scoreId }}
               className="text-foreground font-semibold transition-colors"
            >
               #{formatNumber(rank)}
            </mapDifficultyRoute.Link>
         </span>
         <span
            className={cn(
               'absolute top-0 left-1/2 -translate-x-1/2 text-center whitespace-nowrap',
               cq ? '@min-[600px]/scorecard:static @min-[600px]/scorecard:translate-x-0' : 'lg:static lg:translate-x-0'
            )}
         >
            <Time
               short={true}
               date={timeSet}
               longRelativeClassName={cq ? '@min-[600px]/scorecard:text-(length:--short-time-font-size)' : 'lg:text-(length:--short-time-font-size)'}
            />
         </span>
         <DeviceDisplay
            hmd={hmdName}
            controllerLeft={controllerLeft}
            controllerRight={controllerRight}
            className={cn('flex-nowrap pt-0.75', cq ? '@min-[600px]/scorecard:justify-center' : 'lg:justify-center')}
         />
      </div>
   );
}
