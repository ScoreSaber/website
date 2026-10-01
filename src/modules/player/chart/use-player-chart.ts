import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';

import { Result } from 'better-result';
import type { Chart } from 'chart.js';
import { useLocale, useTranslations } from 'use-intl';
import { z } from 'zod';

import type { MetricKey, MetricLabel, PlayerChartStats, TimeRange } from '@/modules/player/chart/chart-types';
import { METRIC_KEYS, METRIC_KEY_SCHEMA, TIME_RANGE_SCHEMA } from '@/modules/player/chart/chart-types';
import {
   buildPlayerChartDatasets,
   buildPlayerChartMetricStats,
   buildPlayerChartScales,
   getPlayerChartNowValues,
   getPlayerChartPadding,
   getSortedPlayerHistory,
   getTimeRangePlayerHistory,
   getVisibleChartDayCount
} from '@/modules/player/chart/player-chart-model';
import { useDenyahOverlay } from '@/modules/player/chart/use-denyah-overlay';
import { useLongPress } from '@/modules/player/chart/use-long-press';
import type { PlayerControllerGetPlayerHistoryItem } from '@/shared/api/generated/ApiParams';
import { useChartColors } from '@/shared/components/chart/use-chart-colors';
import { createRelativeTimeFormatters } from '@/shared/format/relative-time';
import { readStorageJson, writeStorageJson } from '@/shared/result/storage';

const STORAGE_KEY = 'player-chart-prefs:v1';
const DEFAULT_CHART_PREFS: ChartPrefs = { activeMetrics: ['rank'], isShowingEstimated: true, timeRange: '90' };
const DAY_MS = 24 * 60 * 60 * 1000;

interface ChartPrefs {
   activeMetrics: MetricKey[];
   isShowingEstimated: boolean;
   timeRange: TimeRange;
}

const chartPrefsSchema = z.object({
   activeMetrics: z.array(METRIC_KEY_SCHEMA).optional(),
   isShowingEstimated: z.boolean().optional(),
   timeRange: TIME_RANGE_SCHEMA.optional()
});

function loadPrefs() {
   if (globalThis.window === undefined) return DEFAULT_CHART_PREFS;

   const storedPrefs = Result.unwrapOr(readStorageJson(STORAGE_KEY, chartPrefsSchema), null);
   if (!storedPrefs) return DEFAULT_CHART_PREFS;

   return {
      activeMetrics:
         storedPrefs.activeMetrics && storedPrefs.activeMetrics.length > 0 ? storedPrefs.activeMetrics : DEFAULT_CHART_PREFS.activeMetrics,
      isShowingEstimated: storedPrefs.isShowingEstimated ?? DEFAULT_CHART_PREFS.isShowingEstimated,
      timeRange: storedPrefs.timeRange ?? DEFAULT_CHART_PREFS.timeRange
   };
}

const mobileQuery = globalThis.window === undefined ? null : window.matchMedia('(max-width: 767px)');
function subscribeIsMobile(cb: () => void) {
   mobileQuery?.addEventListener('change', cb);
   return () => mobileQuery?.removeEventListener('change', cb);
}
function getIsMobile() {
   return mobileQuery?.matches ?? false;
}

function formatDaysAgo(formatters: ReturnType<typeof createRelativeTimeFormatters>, date: Date, now: Date, short: boolean) {
   const daysAgo = Math.max(0, Math.round((now.getTime() - date.getTime()) / DAY_MS));
   const formatter = short ? formatters.relativeShort : formatters.relativeLong;
   if (daysAgo < 7) return formatter.format(-daysAgo, 'day');
   if (short) {
      if (daysAgo < 30) return formatter.format(-Math.round(daysAgo / 7), 'week');
      return formatter.format(-Math.round(daysAgo / 30), 'month');
   }
   if (daysAgo === 7 || daysAgo === 14) return formatter.format(-daysAgo / 7, 'week');
   if (daysAgo === 30) return formatter.format(-1, 'month');
   return formatter.format(-daysAgo, 'day');
}

export function usePlayerChart(
   playerId: string,
   stats: PlayerChartStats,
   history: PlayerControllerGetPlayerHistoryItem[],
   enabledMetrics: MetricKey[] = [...METRIC_KEYS]
) {
   const locale = useLocale();
   const t = useTranslations('player');
   const tc = useTranslations('common');
   const initialPrefs = useRef(loadPrefs()).current;
   const enabledMetricKeys = useMemo(() => normalizeEnabledMetrics(enabledMetrics), [enabledMetrics]);
   const enabledMetricSet = useMemo(() => new Set(enabledMetricKeys), [enabledMetricKeys]);
   const [activeMetrics, setActiveMetrics] = useState<Set<MetricKey>>(() => {
      const initialActive = initialPrefs.activeMetrics.filter((key) => enabledMetricKeys.includes(key));
      return new Set(initialActive.length > 0 ? initialActive : enabledMetricKeys.slice(0, 1));
   });
   const [isShowingEstimated, setIsShowingEstimated] = useState(initialPrefs.isShowingEstimated);
   const [isInfoOpen, setIsInfoOpen] = useState(false);
   const [timeRange, setTimeRange] = useState<TimeRange>(initialPrefs.timeRange);
   const chartColors = useChartColors();
   const pulseRef = useRef<HTMLDivElement>(null);
   const nowIndexRef = useRef(0);
   const isSingleRef = useRef(true);
   const denyahOverlayRef = useRef<HTMLDivElement>(null);
   const isFirstRender = useRef(true);

   const metricLabels = useMemo<Record<MetricKey, MetricLabel>>(
      () => ({
         rank: { label: t('chartMetricRank'), shortLabel: t('chartMetricRankShort') },
         totalPP: { label: tc('performancePoints'), shortLabel: tc('pp') },
         averageAccuracy: { label: t('chartMetricAcc'), shortLabel: t('chartMetricAccShort') },
         totalSubmittedPlays: { label: t('chartMetricPlays'), shortLabel: t('chartMetricPlaysShort') }
      }),
      [t, tc]
   );

   const timeRangeLabels = useMemo<Record<TimeRange, string>>(
      () => ({
         '7': t('chartTimeWeek'),
         '30': t('chartTimeMonth'),
         '90': t('chartTime3Months'),
         '180': t('chartTime6Months'),
         all: t('chartTimeAll')
      }),
      [t]
   );

   const formatTooltipValue = useCallback(
      (key: MetricKey, value: number) => {
         switch (key) {
            case 'rank':
               return t('chartTooltipRank', { rank: value.toLocaleString() });
            case 'totalPP':
               return t('chartTooltipPP', { pp: value.toLocaleString(undefined, { maximumFractionDigits: 2 }) });
            case 'averageAccuracy':
               return t('chartTooltipAcc', { acc: value.toFixed(3) });
            case 'totalSubmittedPlays':
               return t('chartTooltipPlays', { plays: value.toLocaleString(undefined, { maximumFractionDigits: 1 }) });
         }
      },
      [t]
   );

   useEffect(() => {
      setActiveMetrics((current) => {
         const next = new Set([...current].filter((key) => enabledMetricSet.has(key)));
         if (next.size === 0 && enabledMetricKeys[0]) next.add(enabledMetricKeys[0]);
         return next;
      });
   }, [enabledMetricKeys, enabledMetricSet]);

   useEffect(() => {
      if (isFirstRender.current) {
         isFirstRender.current = false;
         return;
      }
      const data = {
         activeMetrics: Array.from(activeMetrics),
         isShowingEstimated,
         timeRange
      };
      writeStorageJson(STORAGE_KEY, data);
   }, [activeMetrics, isShowingEstimated, timeRange]);

   const handleMetricClick = useCallback(
      (key: MetricKey, isMultiSelect: boolean) => {
         if (!enabledMetricSet.has(key)) return;

         if (!isMultiSelect) {
            setActiveMetrics(new Set([key]));
            return;
         }

         setActiveMetrics((prev) => {
            const next = new Set(prev);
            if (next.has(key)) {
               if (next.size > 1) next.delete(key);
               return next;
            }
            next.add(key);
            return next;
         });
      },
      [enabledMetricSet]
   );

   const { handlePointerDown, handlePointerUp, handlePointerCancel } = useLongPress<MetricKey>(handleMetricClick);

   const fullHistory = useMemo(() => getSortedPlayerHistory(history), [history]);

   const now = useMemo(() => new Date(), []);
   const nowTime = now.getTime();

   const sortedHistory = useMemo(() => {
      return getTimeRangePlayerHistory(fullHistory, timeRange, now);
   }, [fullHistory, timeRange, now]);

   const hasEstimated = useMemo(() => sortedHistory.some((e) => e.estimated), [sortedHistory]);

   const estimatedFlags = useMemo(() => [...sortedHistory.map((entry) => entry.estimated), false], [sortedHistory]);

   const nowValues = useMemo(() => getPlayerChartNowValues(stats), [stats]);

   const isMobile = useSyncExternalStore(subscribeIsMobile, getIsMobile, () => false);

   const visibleDays = useMemo(() => getVisibleChartDayCount(sortedHistory, now), [sortedHistory, now]);
   const minTime = sortedHistory.length > 0 ? new Date(sortedHistory[0].createdAt).getTime() : nowTime;
   const maxTime = nowTime;
   const chartDateFormatters = useMemo(() => createRelativeTimeFormatters(locale, 'auto'), [locale]);

   const chartPadding = useMemo(() => getPlayerChartPadding(sortedHistory.length + 1), [sortedHistory.length]);

   nowIndexRef.current = chartPadding + sortedHistory.length;

   const labels = useMemo(() => [], []);

   const activeKeys = useMemo(
      () => METRIC_KEYS.filter((key) => activeMetrics.has(key) && enabledMetricSet.has(key)),
      [activeMetrics, enabledMetricSet]
   );
   const isSingle = activeKeys.length === 1;
   isSingleRef.current = isSingle;

   const nowPulsePlugin = useRef({
      id: 'nowPulse',
      afterDraw: (chart: Chart<'line'>) => {
         const el = pulseRef.current;
         if (!el) return;
         if (!isSingleRef.current) {
            el.style.display = 'none';
            return;
         }
         const idx = nowIndexRef.current;
         const meta = chart.getDatasetMeta(0);
         const nowElement = meta.data[idx];
         const nowVal = chart.data.datasets[0]?.data[idx];
         if (!nowElement || nowVal === null || nowVal === undefined) {
            el.style.display = 'none';
            return;
         }
         const canvas = chart.canvas;
         el.style.left = `${nowElement.x + canvas.offsetLeft}px`;
         el.style.top = `${nowElement.y + canvas.offsetTop}px`;
         el.style.display = 'block';
      }
   }).current;

   const datasets = useMemo(() => {
      return buildPlayerChartDatasets({
         activeKeys,
         sortedHistory,
         fullHistory,
         chartColors,
         isSingle,
         estimatedFlags,
         isShowingEstimated,
         nowValues,
         chartPadding,
         nowTime,
         metricLabels
      });
   }, [
      activeKeys,
      sortedHistory,
      fullHistory,
      chartColors,
      isSingle,
      estimatedFlags,
      isShowingEstimated,
      nowValues,
      chartPadding,
      nowTime,
      metricLabels
   ]);

   const scales = useMemo(() => {
      const formatTick = (value: number) => (value === maxTime ? t('chartNow') : formatDaysAgo(chartDateFormatters, new Date(value), now, isMobile));
      return buildPlayerChartScales({
         activeKeys,
         chartColors,
         isSingle,
         isMobile,
         metricLabels,
         chartLastNDaysLabel: t('chartLastNDays', { days: visibleDays }),
         minTime,
         maxTime,
         formatTick
      });
   }, [activeKeys, chartColors, isSingle, isMobile, t, metricLabels, visibleDays, minTime, maxTime, now, chartDateFormatters]);

   const avgPerDayLabel = t('chartAvgPerDay');

   const metricStats = useMemo(() => {
      return buildPlayerChartMetricStats({
         activeKeys,
         sortedHistory,
         fullHistory,
         isShowingEstimated,
         nowValues,
         nowTime,
         changeLabel: avgPerDayLabel
      });
   }, [activeKeys, sortedHistory, fullHistory, isShowingEstimated, nowValues, nowTime, avgPerDayLabel]);

   const rankDataValues = useMemo(() => sortedHistory.map((entry) => entry.rank), [sortedHistory]);

   useDenyahOverlay(playerId, activeMetrics, rankDataValues, denyahOverlayRef);

   const primaryColor = activeKeys.length > 0 ? chartColors.metricBorder[activeKeys[0]] : '#888';

   const tooltipCallbacks = useMemo(
      () => ({
         title: (context: { parsed: { x: number | null } }[]) => {
            const x = context[0]?.parsed.x;
            if (x == null) return '';
            if (x === nowTime) return t('chartNow');
            return formatDaysAgo(chartDateFormatters, new Date(x), now, false);
         },
         label: (context: { datasetIndex: number; dataIndex: number; parsed: { y: number | null } }) => {
            const key = activeKeys[context.datasetIndex];
            if (!key || context.parsed.y == null) return '';
            const idx = context.dataIndex - chartPadding;
            const isEstimated = key !== 'rank' && idx >= 0 && idx < estimatedFlags.length && estimatedFlags[idx];
            const suffix = isEstimated ? t('chartEstimatedSuffix') : '';
            return formatTooltipValue(key, context.parsed.y) + suffix;
         },
         labelColor: (context: { datasetIndex: number }) => {
            const key = activeKeys[context.datasetIndex];
            const color = key ? chartColors.metricBorder[key] : '#888';
            return { borderColor: color, backgroundColor: color };
         }
      }),
      [activeKeys, chartPadding, estimatedFlags, chartColors.metricBorder, formatTooltipValue, t, now, nowTime, chartDateFormatters]
   );

   return {
      activeMetrics,
      enabledMetricKeys,
      isShowingEstimated,
      setIsShowingEstimated,
      isInfoOpen,
      setIsInfoOpen,
      timeRange,
      setTimeRange,

      handlePointerDown,
      handlePointerUp,
      handlePointerCancel,

      labels,
      datasets,
      scales,
      metricStats,
      activeKeys,
      isSingle,
      hasEstimated,
      sortedHistory,
      chartColors,
      primaryColor,
      nowPulsePlugin,
      tooltipCallbacks,

      metricLabels,
      timeRangeLabels,

      pulseRef,
      denyahOverlayRef
   };
}

function normalizeEnabledMetrics(metrics: MetricKey[]) {
   const enabled = new Set(metrics);
   return METRIC_KEYS.filter((key) => enabled.has(key));
}
