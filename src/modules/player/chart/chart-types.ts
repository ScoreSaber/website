import type { Dispatch, SetStateAction } from 'react';

import { z } from 'zod';

import type { PlayerControllerGetPlayerHistoryItem } from '@/shared/api/generated/ApiParams';

export const METRIC_KEY_SCHEMA = z.enum(['rank', 'totalPP', 'averageAccuracy', 'totalSubmittedPlays']);
export type MetricKey = z.infer<typeof METRIC_KEY_SCHEMA>;
export const METRIC_KEYS = METRIC_KEY_SCHEMA.options;

export interface PlayerChartStats {
   rank: number;
   totalPP: number;
   averageAccuracy: number;
   totalSubmittedPlays: number;
}

interface MetricConfig {
   cssVar: string;
   getValue: (entry: PlayerControllerGetPlayerHistoryItem) => number;
   getPlayerStat: (stats: PlayerChartStats) => number;
   formatTick: (value: number) => string;
   reverse: boolean;
}

export const METRICS = {
   rank: {
      cssVar: '--chart-metric-rank',
      getValue: (e) => e.rank,
      getPlayerStat: (s) => s.rank,
      formatTick: (v) => '#' + v.toLocaleString(),
      reverse: true
   },
   totalPP: {
      cssVar: '--chart-metric-pp',
      getValue: (e) => e.totalPP,
      getPlayerStat: (s) => s.totalPP,
      formatTick: (v) => v.toLocaleString(undefined, { maximumFractionDigits: 0 }) + 'pp',
      reverse: false
   },
   averageAccuracy: {
      cssVar: '--chart-metric-acc',
      getValue: (e) => e.averageAccuracy,
      getPlayerStat: (s) => s.averageAccuracy,
      formatTick: (v) => v.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 3 }) + '%',
      reverse: false
   },
   totalSubmittedPlays: {
      cssVar: '--chart-metric-plays',
      getValue: (e) => e.totalSubmittedPlays,
      getPlayerStat: (s) => s.totalSubmittedPlays,
      formatTick: (v) => v.toLocaleString(undefined, { maximumFractionDigits: 1 }),
      reverse: false
   }
} satisfies Record<MetricKey, MetricConfig>;

export const TIME_RANGE_SCHEMA = z.enum(['7', '30', '90', '180', 'all']);
export type TimeRange = z.infer<typeof TIME_RANGE_SCHEMA>;
export const TIME_RANGE_VALUES = TIME_RANGE_SCHEMA.options;

export interface MetricLabel {
   label: string;
   shortLabel: string;
}

export interface PlayerChartMetricStat {
   key: MetricKey;
   current: number;
   change: number;
   changeLabel: string;
   peak: number | null;
}

export interface PlayerChartContextValue {
   activeMetrics: Set<MetricKey>;
   enabledMetricKeys: MetricKey[];
   isShowingEstimated: boolean;
   setIsShowingEstimated: Dispatch<SetStateAction<boolean>>;
   isInfoOpen: boolean;
   setIsInfoOpen: Dispatch<SetStateAction<boolean>>;
   timeRange: TimeRange;
   setTimeRange: Dispatch<SetStateAction<TimeRange>>;
   handlePointerDown: (key: MetricKey) => void;
   handlePointerUp: (key: MetricKey, shiftKey: boolean) => void;
   handlePointerCancel: () => void;
   hasEstimated: boolean;
   metricLabels: Record<MetricKey, MetricLabel>;
   timeRangeLabels: Record<TimeRange, string>;
   metricStats: PlayerChartMetricStat[];
}
