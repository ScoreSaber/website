'use client';

import { useEffect, useMemo, useState } from 'react';

import { Result } from 'better-result';
import { CategoryScale, Chart as ChartJS, Filler, LinearScale, LineController, LineElement, PointElement, Tooltip } from 'chart.js';
import type { ScriptableContext } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useFormatter, useTranslations } from 'use-intl';
import { z } from 'zod';

import { Checkbox } from '@/components/ui/checkbox';

import { formatOutcomeTime } from '@/modules/scores/score-outcome-badge';
import type { LeaderboardControllerGetLeaderboardPlayStatsByIdResponse } from '@/shared/api/generated/ApiParams';
import { getChartTooltipColors, getLineChartBaseOptions } from '@/shared/components/chart/chart-options';
import { useChartColors } from '@/shared/components/chart/use-chart-colors';
import { cn } from '@/shared/format/helpers';
import { readStorageJson, writeStorageJson } from '@/shared/result/storage';

ChartJS.register(LineController, LinearScale, CategoryScale, PointElement, LineElement, Tooltip, Filler);

type PlayStats = NonNullable<LeaderboardControllerGetLeaderboardPlayStatsByIdResponse>;
type OutcomePlayKey = Extract<keyof PlayStats['buckets'][number] & keyof PlayStats, `${string}Plays`>;
type OutcomeFromPlayKey<T extends string> = T extends `${infer Outcome}Plays` ? Uppercase<Outcome> : never;
type HeatmapOutcome = OutcomeFromPlayKey<OutcomePlayKey>;
type HeatmapColumn = { start: number } & Record<HeatmapOutcome, number>;
type OutcomeLabelKey = 'score.historyFilterRestarts' | 'score.historyFilterQuits' | 'score.historyFilterFails';

const HEATMAP_OUTCOME_ORDER: HeatmapOutcome[] = ['RESTART', 'QUIT', 'FAIL'];

const TRACKING_START = new Date('2026-06-09');

const OUTCOME_META = {
   RESTART: { labelKey: 'score.historyFilterRestarts', playKey: 'restartPlays', rgb: '14, 165, 233', dotClass: 'bg-sky-500' },
   QUIT: { labelKey: 'score.historyFilterQuits', playKey: 'quitPlays', rgb: '245, 158, 11', dotClass: 'bg-amber-500' },
   FAIL: { labelKey: 'score.historyFilterFails', playKey: 'failPlays', rgb: '239, 68, 68', dotClass: 'bg-score-combo-broken' }
} satisfies Record<HeatmapOutcome, { labelKey: OutcomeLabelKey; playKey: OutcomePlayKey; rgb: string; dotClass: string }>;

const OUTCOME_STORAGE_KEY = 'map-insights-heatmap-outcomes';
const outcomeFiltersSchema = z.array(z.enum(HEATMAP_OUTCOME_ORDER));

function outcomeFill(rgb: string) {
   return (context: ScriptableContext<'line'>) => {
      const { ctx, chartArea } = context.chart;
      if (!chartArea) return `rgba(${rgb}, 0.16)`;
      const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
      gradient.addColorStop(0, `rgba(${rgb}, 0.35)`);
      gradient.addColorStop(0.55, `rgba(${rgb}, 0.1)`);
      gradient.addColorStop(1, `rgba(${rgb}, 0)`);
      return gradient;
   };
}

interface PlayStatsHeatmapProps {
   stats: PlayStats;
}

export function PlayStatsHeatmap({ stats }: PlayStatsHeatmapProps) {
   const t = useTranslations();
   const format = useFormatter();
   const chartColors = useChartColors();
   const [selected, setSelected] = useState<Set<HeatmapOutcome>>(() => {
      const stored = Result.unwrapOr(readStorageJson(OUTCOME_STORAGE_KEY, outcomeFiltersSchema), null);
      return new Set(stored ?? HEATMAP_OUTCOME_ORDER);
   });

   useEffect(() => {
      writeStorageJson(OUTCOME_STORAGE_KEY, Array.from(selected));
   }, [selected]);

   const visibleOutcomes = HEATMAP_OUTCOME_ORDER.filter((outcome) => selected.has(outcome));
   const columns = useMemo(() => buildColumns(stats), [stats]);
   const successRate = stats.totalPlays > 0 ? stats.clearPlays / stats.totalPlays : 0;

   function toggleOutcome(outcome: HeatmapOutcome, checked: boolean) {
      setSelected((prev) => {
         const next = new Set(prev);
         if (checked) next.add(outcome);
         else next.delete(outcome);
         return next;
      });
   }

   return (
      <div className="flex flex-col gap-3 text-sm">
         <div className="flex flex-col gap-1.5">
            <div className="flex items-baseline justify-between gap-3">
               <h3 className="text-muted-foreground text-xs font-semibold">{t('map.insightsSuccessRate')}</h3>
               <span className="text-score-combo-full text-sm font-semibold tabular-nums">
                  {format.number(successRate, { style: 'percent', maximumFractionDigits: 1 })}
               </span>
            </div>
            <div className="bg-secondary h-2 w-full overflow-hidden rounded-full">
               <div className="bg-score-combo-full h-full rounded-full transition-[width] duration-500" style={{ width: `${successRate * 100}%` }} />
            </div>
         </div>

         <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5">
            {HEATMAP_OUTCOME_ORDER.map((outcome) => {
               const checked = selected.has(outcome);
               return (
                  <label
                     key={outcome}
                     className={cn(
                        'flex cursor-pointer items-center gap-1.5 py-1 text-xs font-medium transition-colors select-none',
                        checked ? 'text-foreground' : 'text-muted-foreground/50'
                     )}
                  >
                     <Checkbox
                        checked={checked}
                        onCheckedChange={(value) => toggleOutcome(outcome, value === true)}
                        className="size-3.5 cursor-pointer"
                     />
                     <span className={cn('size-2 rounded-full transition-opacity', OUTCOME_META[outcome].dotClass, !checked && 'opacity-30')} />
                     {t(OUTCOME_META[outcome].labelKey)}
                     <span className="text-muted-foreground tabular-nums">{format.number(stats[OUTCOME_META[outcome].playKey])}</span>
                  </label>
               );
            })}
         </div>

         {columns.length === 0 ? (
            <p className="text-muted-foreground py-12 text-center text-xs">{t('map.insightsNoOutcomeData')}</p>
         ) : visibleOutcomes.length === 0 ? (
            <p className="text-muted-foreground py-12 text-center text-xs">{t('map.insightsNoneSelected')}</p>
         ) : (
            <div className="h-56 sm:h-64">
               <Line
                  data={{
                     labels: columns.map((column) => formatOutcomeTime(column.start)),
                     datasets: visibleOutcomes.map((outcome) => ({
                        label: t(OUTCOME_META[outcome].labelKey),
                        data: columns.map((column) => column[outcome]),
                        borderColor: `rgba(${OUTCOME_META[outcome].rgb}, 1)`,
                        backgroundColor: outcomeFill(OUTCOME_META[outcome].rgb),
                        borderWidth: 2,
                        pointRadius: 0,
                        pointHoverRadius: 4,
                        pointHitRadius: 8,
                        pointHoverBackgroundColor: `rgba(${OUTCOME_META[outcome].rgb}, 1)`,
                        pointHoverBorderColor: chartColors.pointHoverBorder,
                        pointHoverBorderWidth: 2,
                        tension: 0.4,
                        fill: true
                     }))
                  }}
                  options={{
                     ...getLineChartBaseOptions(),
                     scales: {
                        x: {
                           ticks: { maxTicksLimit: 8, maxRotation: 0, color: chartColors.axisText, font: { size: 10 } },
                           grid: { display: false },
                           border: { display: false }
                        },
                        y: {
                           beginAtZero: true,
                           ticks: { precision: 0, color: chartColors.axisText, font: { size: 10 } },
                           grid: { color: chartColors.grid, drawTicks: false },
                           border: { display: false }
                        }
                     },
                     plugins: {
                        legend: { display: false },
                        tooltip: {
                           ...getChartTooltipColors(chartColors),
                           callbacks: {
                              title: (items) => {
                                 const column = columns[items[0]?.dataIndex ?? 0];
                                 if (!column) return '';
                                 return `${formatOutcomeTime(column.start)} - ${formatOutcomeTime(column.start + stats.bucketSizeSeconds)}`;
                              },
                              label: (ctx) => t('map.insightsTooltipCount', { label: ctx.dataset.label ?? '', count: ctx.parsed.y ?? 0 })
                           }
                        }
                     }
                  }}
               />
            </div>
         )}

         <div className="text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs">
            <span>{t('map.insightsDataSince', { date: TRACKING_START })}</span>
            {stats.unknownTimePlays > 0 && <span className="opacity-60">{t('map.insightsUnknownTime', { count: stats.unknownTimePlays })}</span>}
         </div>
      </div>
   );
}

function buildColumns(stats: PlayStats) {
   if (stats.buckets.length === 0 || stats.bucketSizeSeconds <= 0) return [];

   const lastBucket = stats.buckets[stats.buckets.length - 1];
   const columnCount = Math.floor(lastBucket.startSeconds / stats.bucketSizeSeconds) + 2;
   const columns: HeatmapColumn[] = Array.from({ length: columnCount }, (_, index) => ({
      start: index * stats.bucketSizeSeconds,
      RESTART: 0,
      QUIT: 0,
      FAIL: 0
   }));

   for (const bucket of stats.buckets) {
      const column = columns[Math.floor(bucket.startSeconds / stats.bucketSizeSeconds)];
      if (!column) continue;
      for (const outcome of HEATMAP_OUTCOME_ORDER) {
         column[outcome] += bucket[OUTCOME_META[outcome].playKey];
      }
   }

   return columns;
}
