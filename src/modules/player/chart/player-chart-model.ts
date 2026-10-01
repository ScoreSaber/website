import type { ChartDataset, ChartOptions } from 'chart.js';

import { type MetricKey, type MetricLabel, METRICS, type PlayerChartMetricStat, type PlayerChartStats, type TimeRange } from './chart-types';

import type { PlayerControllerGetPlayerHistoryItem } from '@/shared/api/generated/ApiParams';
import type { ChartColors } from '@/shared/components/chart/use-chart-colors';

const MIN_CHART_POINTS = 5;
const DAY_MS = 24 * 60 * 60 * 1000;

interface DatedChartPoint {
   x: number;
   y: number | null;
}

function getSortedPlayerHistory(history: PlayerControllerGetPlayerHistoryItem[]) {
   return [...history].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
}

function getTimeRangePlayerHistory(history: PlayerControllerGetPlayerHistoryItem[], timeRange: TimeRange, now: Date) {
   if (timeRange === 'all') return history;

   const earliestTime = now.getTime() - Number(timeRange) * DAY_MS;
   return history.filter((entry) => new Date(entry.createdAt).getTime() >= earliestTime);
}

function getPlayerChartNowValues(stats: PlayerChartStats) {
   return {
      rank: stats.rank === -1 ? null : stats.rank,
      totalPP: stats.totalPP,
      averageAccuracy: stats.averageAccuracy,
      totalSubmittedPlays: stats.totalSubmittedPlays
   };
}

function getVisibleChartDayCount(history: PlayerControllerGetPlayerHistoryItem[], now: Date) {
   if (history.length === 0) return 1;

   const firstTime = new Date(history[0].createdAt).getTime();
   const days = Math.ceil((now.getTime() - firstTime) / DAY_MS);
   return Math.max(1, days);
}

function getPlayerChartPadding(pointCount: number) {
   if (pointCount >= MIN_CHART_POINTS) return 0;
   return Math.ceil((MIN_CHART_POINTS - pointCount) / 2);
}

function getPreviousHistoryByCreatedAt(history: PlayerControllerGetPlayerHistoryItem[]) {
   const result = new Map<string, PlayerControllerGetPlayerHistoryItem>();
   for (let i = 1; i < history.length; i++) {
      result.set(history[i].createdAt, history[i - 1]);
   }
   return result;
}

function getDailyPlayCount(totalSubmittedPlays: number, time: number, previousEntry: PlayerControllerGetPlayerHistoryItem | undefined) {
   if (!previousEntry) return null;

   const previousTime = new Date(previousEntry.createdAt).getTime();
   const dayCount = Math.max(1, Math.round((time - previousTime) / DAY_MS));
   return Math.max(0, totalSubmittedPlays - previousEntry.totalSubmittedPlays) / dayCount;
}

function getHistoryMetricValue(
   key: MetricKey,
   entry: PlayerControllerGetPlayerHistoryItem,
   previousEntry: PlayerControllerGetPlayerHistoryItem | undefined
) {
   if (key === 'totalSubmittedPlays') {
      return getDailyPlayCount(entry.totalSubmittedPlays, new Date(entry.createdAt).getTime(), previousEntry);
   }
   return METRICS[key].getValue(entry);
}

function getNowMetricValue(
   key: MetricKey,
   nowValue: number | null,
   nowTime: number,
   latestHistoryEntry: PlayerControllerGetPlayerHistoryItem | undefined
) {
   if (nowValue === null) return null;
   if (key === 'totalSubmittedPlays') return getDailyPlayCount(nowValue, nowTime, latestHistoryEntry);
   return nowValue;
}

function padChartPoints(values: DatedChartPoint[], chartPadding: number, minTime: number, maxTime: number) {
   if (chartPadding <= 0) return values;

   const range = Math.max(DAY_MS, maxTime - minTime);
   const step = range / (values.length + chartPadding * 2 - 1);
   const leading = Array.from({ length: chartPadding }, (_, index) => ({
      x: minTime - step * (chartPadding - index),
      y: null
   }));
   const trailing = Array.from({ length: chartPadding }, (_, index) => ({
      x: maxTime + step * (index + 1),
      y: null
   }));

   return [...leading, ...values, ...trailing];
}

function buildPlayerChartDatasets({
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
}: {
   activeKeys: MetricKey[];
   sortedHistory: PlayerControllerGetPlayerHistoryItem[];
   fullHistory: PlayerControllerGetPlayerHistoryItem[];
   chartColors: ChartColors;
   isSingle: boolean;
   estimatedFlags: boolean[];
   isShowingEstimated: boolean;
   nowValues: Record<MetricKey, number | null>;
   chartPadding: number;
   nowTime: number;
   metricLabels: Record<MetricKey, MetricLabel>;
}) {
   const minTime = sortedHistory.length > 0 ? new Date(sortedHistory[0].createdAt).getTime() : nowTime;
   const maxTime = nowTime;
   const previousHistoryByCreatedAt = getPreviousHistoryByCreatedAt(fullHistory);
   const latestHistoryEntry = fullHistory[fullHistory.length - 1];

   return activeKeys.map((key): ChartDataset<'line', DatedChartPoint[]> => {
      const isRankMetric = key === 'rank';
      const historyData = sortedHistory.map((entry, i) => {
         const val = getHistoryMetricValue(key, entry, previousHistoryByCreatedAt.get(entry.createdAt));
         return {
            x: new Date(entry.createdAt).getTime(),
            y: val === null || val === -1 || (!isRankMetric && !isShowingEstimated && estimatedFlags[i]) ? null : val
         };
      });
      const nowVal = getNowMetricValue(key, nowValues[key], nowTime, latestHistoryEntry);
      const rawData = [...historyData, { x: nowTime, y: nowVal }];
      const data = padChartPoints(rawData, chartPadding, minTime, maxTime);

      const visiblePoints = data.filter((value) => value.y !== null).length;
      const pointRadiusArr = data.map((value) => {
         if (value.y === null) return 0;
         if (value.x === nowTime) return 5;
         return visiblePoints <= 3 ? 4 : 0;
      });
      const pointBgArr = data.map(() => chartColors.metricBorder[key]);

      return {
         label: metricLabels[key].label,
         data,
         yAxisID: `y-${key}`,
         fill: isSingle,
         backgroundColor: isSingle ? chartColors.metricBg[key] : 'transparent',
         borderColor: chartColors.metricBorder[key],
         borderWidth: isSingle ? 3 : 2,
         pointRadius: pointRadiusArr,
         pointBackgroundColor: pointBgArr,
         pointHoverRadius: 6,
         pointHoverBackgroundColor: chartColors.metricBorder[key],
         pointHoverBorderColor: chartColors.pointHoverBorder,
         parsing: false,
         cubicInterpolationMode: isRankMetric ? 'monotone' : 'default',
         tension: 0.3,
         spanGaps: false,
         segment: isRankMetric
            ? undefined
            : {
                 borderDash: (ctx: { p0DataIndex: number; p1DataIndex: number }) => {
                    const p0 = ctx.p0DataIndex - chartPadding;
                    const p1 = ctx.p1DataIndex - chartPadding;
                    if (estimatedFlags[p0] || estimatedFlags[p1]) return [6, 4];
                    return undefined;
                 }
              }
      };
   });
}

function buildPlayerChartScales({
   activeKeys,
   chartColors,
   isSingle,
   isMobile,
   metricLabels,
   chartLastNDaysLabel,
   minTime,
   maxTime,
   formatTick
}: {
   activeKeys: MetricKey[];
   chartColors: ChartColors;
   isSingle: boolean;
   isMobile: boolean;
   metricLabels: Record<MetricKey, MetricLabel>;
   chartLastNDaysLabel: string;
   minTime: number;
   maxTime: number;
   formatTick: (value: number) => string;
}) {
   const result: NonNullable<ChartOptions<'line'>['scales']> = {
      x: {
         type: 'linear',
         min: minTime,
         max: maxTime,
         title: {
            display: !isMobile,
            text: chartLastNDaysLabel,
            font: { weight: 'bold' }
         },
         ticks: {
            autoSkip: true,
            maxTicksLimit: isMobile ? 4 : 8,
            maxRotation: 0,
            callback: (value: string | number) => formatTick(Number(value))
         },
         grid: { color: chartColors.grid }
      }
   };

   activeKeys.forEach((key, i) => {
      const m = METRICS[key];
      result[`y-${key}`] = {
         position: i % 2 === 0 ? 'left' : 'right',
         title: {
            display: activeKeys.length <= 2,
            text: metricLabels[key].label,
            color: chartColors.metricBorder[key],
            font: { weight: 'bold' }
         },
         ticks: {
            autoSkip: true,
            maxTicksLimit: 6,
            color: isSingle ? undefined : chartColors.metricBorder[key],
            callback: (value: string | number) => {
               const num = Number(value);
               if (m.reverse && num !== Math.floor(num)) return '';
               return m.formatTick(num);
            }
         },
         reverse: m.reverse,
         grid: {
            drawOnChartArea: i === 0,
            color: chartColors.grid
         }
      };
   });

   return result;
}

function buildPlayerChartMetricStats({
   activeKeys,
   sortedHistory,
   fullHistory,
   isShowingEstimated,
   nowValues,
   nowTime,
   changeLabel
}: {
   activeKeys: MetricKey[];
   sortedHistory: PlayerControllerGetPlayerHistoryItem[];
   fullHistory: PlayerControllerGetPlayerHistoryItem[];
   isShowingEstimated: boolean;
   nowValues: Record<MetricKey, number | null>;
   nowTime: number;
   changeLabel: string;
}): PlayerChartMetricStat[] {
   const previousHistoryByCreatedAt = getPreviousHistoryByCreatedAt(fullHistory);
   const latestHistoryEntry = fullHistory[fullHistory.length - 1];

   return activeKeys.map((key) => {
      const isRankMetric = key === 'rank';

      const validValues: number[] = [];
      for (let i = 0; i < sortedHistory.length; i++) {
         const entry = sortedHistory[i];
         const val = getHistoryMetricValue(key, entry, previousHistoryByCreatedAt.get(entry.createdAt));
         if (val === null || val === -1) continue;
         if (!isRankMetric && !isShowingEstimated && entry.estimated) continue;
         validValues.push(val);
      }

      const nowVal = getNowMetricValue(key, nowValues[key], nowTime, latestHistoryEntry);
      const current = nowVal ?? (validValues.length > 0 ? validValues[validValues.length - 1] : 0);
      const first = validValues.length > 0 ? validValues[0] : current;
      const days = validValues.length > 0 ? validValues.length : 1;

      const statValues = nowVal === null ? validValues : [...validValues, nowVal];
      const avgPerDay =
         key === 'totalSubmittedPlays'
            ? statValues.reduce((total, value) => total + value, 0) / Math.max(1, statValues.length)
            : isRankMetric
              ? (first - current) / days
              : (current - first) / days;

      let peak: number | null = null;
      if (isRankMetric || key === 'averageAccuracy') {
         const pickBetter = isRankMetric ? Math.min : Math.max;
         peak = nowVal !== null ? nowVal : validValues.length > 0 ? validValues[0] : null;
         for (let i = 0; i < validValues.length; i++) {
            if (peak === null) {
               peak = validValues[i];
               continue;
            }
            peak = pickBetter(peak, validValues[i]);
         }
      }
      return { key, current, change: avgPerDay, changeLabel, peak };
   });
}

export {
   buildPlayerChartDatasets,
   buildPlayerChartMetricStats,
   buildPlayerChartScales,
   getPlayerChartNowValues,
   getPlayerChartPadding,
   getSortedPlayerHistory,
   getTimeRangePlayerHistory,
   getVisibleChartDayCount
};
