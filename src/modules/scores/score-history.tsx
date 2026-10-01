'use client';

import { useEffect, useRef, useState } from 'react';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Result } from 'better-result';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'use-intl';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

import { LeaderboardScoresTable, type ScoredLeaderboard } from '@/modules/scores/leaderboard/leaderboard-scores-table';
import { api } from '@/shared/api/ApiInstance';
import { SCORE_CONTROLLER_GET_SCORE_HISTORY_OUTCOMES, type ScoreControllerGetScoreHistoryOutcomes } from '@/shared/api/generated/ApiParams';
import { Icons } from '@/shared/components/icons';
import { cn } from '@/shared/format/helpers';
import { queryApiData } from '@/shared/result/api';
import { readStorageJson, writeStorageJson } from '@/shared/result/storage';

interface ScoreHistoryProps {
   scoreId: number;
   leaderboard: ScoredLeaderboard;
   mapName?: string;
   onReadyAction?: () => void;
}

const PAGE_SIZE = 6;

type OutcomeFilter = {
   value: ScoreControllerGetScoreHistoryOutcomes;
   labelKey: 'score.historyFilterClears' | 'score.historyFilterRestarts' | 'score.historyFilterQuits' | 'score.historyFilterFails';
};

const OUTCOME_FILTERS: OutcomeFilter[] = [
   { value: 'CLEAR', labelKey: 'score.historyFilterClears' },
   { value: 'RESTART', labelKey: 'score.historyFilterRestarts' },
   { value: 'QUIT', labelKey: 'score.historyFilterQuits' },
   { value: 'FAIL', labelKey: 'score.historyFilterFails' }
];

const OUTCOME_STORAGE_KEY = 'score-history-outcome-filters';
const outcomeFiltersSchema = z.array(z.enum(SCORE_CONTROLLER_GET_SCORE_HISTORY_OUTCOMES));

export function ScoreHistory({ scoreId, leaderboard, mapName, onReadyAction }: ScoreHistoryProps) {
   const t = useTranslations();
   const [page, setPage] = useState(1);
   const [selected, setSelected] = useState<Set<ScoreControllerGetScoreHistoryOutcomes>>(() => {
      const stored = Result.unwrapOr(readStorageJson(OUTCOME_STORAGE_KEY, outcomeFiltersSchema), null);
      return new Set(stored ?? SCORE_CONTROLLER_GET_SCORE_HISTORY_OUTCOMES);
   });
   const readyFiredRef = useRef(false);

   useEffect(() => {
      writeStorageJson(OUTCOME_STORAGE_KEY, Array.from(selected));
   }, [selected]);

   const outcomes = OUTCOME_FILTERS.map((f) => f.value).filter((value) => selected.has(value));
   const noneSelected = outcomes.length === 0;

   const { data, isLoading, isError, isPlaceholderData } = useQuery({
      queryKey: ['scoreHistory', scoreId, page, outcomes.join(',')],
      queryFn: () =>
         queryApiData(
            api.score.scoreControllerGetScoreHistory({
               id: scoreId,
               page,
               limit: PAGE_SIZE,
               excludePersonalBest: 'true',
               outcomes
            })
         ),
      placeholderData: keepPreviousData,
      enabled: !noneSelected
   });

   const { data: totalData } = useQuery({
      queryKey: ['scoreHistoryTotal', scoreId],
      queryFn: () => queryApiData(api.score.scoreControllerGetScoreHistory({ id: scoreId, page: 1, limit: 1 }))
   });
   const totalPlays = totalData?.metadata.totalItems ?? null;

   const items = noneSelected ? [] : (data?.data ?? null);
   const totalPages = data?.metadata.totalPages ?? 1;

   useEffect(() => {
      if (!isLoading && !readyFiredRef.current) {
         readyFiredRef.current = true;
         onReadyAction?.();
      }
   }, [isLoading]);

   function toggleOutcome(value: ScoreControllerGetScoreHistoryOutcomes, checked: boolean) {
      setSelected((prev) => {
         const next = new Set(prev);
         if (checked) next.add(value);
         else next.delete(value);
         return next;
      });
      setPage(1);
   }

   return (
      <div className="animate-in fade-in text-sm duration-300">
         <div className="mb-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
               {OUTCOME_FILTERS.map((filter) => {
                  const checked = selected.has(filter.value);
                  return (
                     <label
                        key={filter.value}
                        className={cn(
                           'flex cursor-pointer items-center gap-1.5 py-1 text-xs font-medium transition-colors select-none',
                           checked ? 'text-foreground' : 'text-muted-foreground/50'
                        )}
                     >
                        <Checkbox
                           checked={checked}
                           onCheckedChange={(value) => toggleOutcome(filter.value, value === true)}
                           className="size-3.5 cursor-pointer data-[state=checked]:border-[color:var(--profile-accent,var(--primary))] data-[state=checked]:bg-[var(--profile-accent,var(--primary))] data-[state=checked]:text-[color:var(--profile-accent-foreground,var(--primary-foreground))] dark:data-[state=checked]:bg-[var(--profile-accent,var(--primary))]"
                        />
                        {t(filter.labelKey)}
                     </label>
                  );
               })}
            </div>
            {totalPlays != null && (
               <span className="text-muted-foreground ml-auto shrink-0 text-xs whitespace-nowrap tabular-nums">
                  {t('score.totalPlays', { count: totalPlays })}
               </span>
            )}
         </div>

         {isLoading && !items ? (
            <div className="flex items-center justify-center py-8">
               <Icons.spinner className="text-muted-foreground size-6 animate-spin" />
            </div>
         ) : isError ? (
            <p className="text-destructive py-4 text-center text-sm">{t('leaderboard.failedToLoad')}</p>
         ) : items && items.length > 0 ? (
            <div className={isPlaceholderData ? 'pointer-events-none opacity-50 transition-opacity' : 'transition-opacity'}>
               <LeaderboardScoresTable
                  scores={items.map((item) => item.score)}
                  leaderboard={leaderboard}
                  highlight={scoreId}
                  showHistory={false}
                  historyContext
                  mapName={mapName}
               />
               {totalPages > 1 && (
                  <div className="mt-2 flex items-center justify-center gap-2">
                     <Button
                        variant="secondary"
                        size="icon-sm"
                        disabled={page <= 1 || isPlaceholderData}
                        onClick={() => setPage(page - 1)}
                        className="cursor-pointer"
                     >
                        <ChevronLeft data-icon />
                     </Button>
                     <span className="text-muted-foreground text-sm tabular-nums">
                        {page} / {totalPages}
                     </span>
                     <Button
                        variant="secondary"
                        size="icon-sm"
                        disabled={page >= totalPages || isPlaceholderData}
                        onClick={() => setPage(page + 1)}
                        className="cursor-pointer"
                     >
                        <ChevronRight data-icon />
                     </Button>
                  </div>
               )}
            </div>
         ) : (
            <p className="text-muted-foreground py-4 text-center text-sm">{t('score.noScoreHistory')}</p>
         )}
      </div>
   );
}
