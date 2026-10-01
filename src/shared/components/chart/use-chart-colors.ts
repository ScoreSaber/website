import { useMemo } from 'react';

import { useTheme } from '@/shared/ui-adjacent/theme-provider';

const METRIC_VARS = {
   rank: '--chart-metric-rank',
   totalPP: '--chart-metric-pp',
   averageAccuracy: '--chart-metric-acc',
   totalSubmittedPlays: '--chart-metric-plays'
};

function getVar(name: string) {
   if (globalThis.document === undefined) return '';
   return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

let _colorCtx: CanvasRenderingContext2D | null = null;

// normalize css color to rgba via offscreen canvas for chart.js compat
function toRgba(cssColor: string, alpha = 1) {
   if (!_colorCtx) {
      _colorCtx = document.createElement('canvas').getContext('2d');
   }
   if (!_colorCtx) return `rgba(128,128,128,${alpha})`;

   _colorCtx.fillStyle = '#000';
   _colorCtx.fillStyle = cssColor;
   const hex = _colorCtx.fillStyle;

   if (hex.startsWith('#') && hex.length === 7) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r},${g},${b},${alpha})`;
   }
   return hex;
}

function computeColors(resolvedTheme: 'light' | 'dark') {
   const overlay = getVar('--overlay');
   const badgeFg = getVar('--badge-foreground');
   const chartGrid = getVar('--chart-grid');

   const grid = chartGrid ? toRgba(chartGrid, 0.1) : 'rgba(128,128,128,0.1)';
   const axisText = resolvedTheme === 'light' ? 'rgba(35,31,28,0.82)' : 'rgba(245,245,245,0.82)';
   const tooltipBg = overlay ? toRgba(overlay, 0.8) : 'rgba(0,0,0,0.8)';
   const tooltipText = badgeFg ? toRgba(badgeFg) : '#ffffff';
   const pointHoverBorder = badgeFg ? toRgba(badgeFg) : '#ffffff';

   const rankColor = getVar(METRIC_VARS.rank);
   const totalPPColor = getVar(METRIC_VARS.totalPP);
   const averageAccuracyColor = getVar(METRIC_VARS.averageAccuracy);
   const totalSubmittedPlaysColor = getVar(METRIC_VARS.totalSubmittedPlays);

   const metricBorder = {
      rank: rankColor ? toRgba(rankColor) : '#888',
      totalPP: totalPPColor ? toRgba(totalPPColor) : '#888',
      averageAccuracy: averageAccuracyColor ? toRgba(averageAccuracyColor) : '#888',
      totalSubmittedPlays: totalSubmittedPlaysColor ? toRgba(totalSubmittedPlaysColor) : '#888'
   };
   const metricBg = {
      rank: rankColor ? toRgba(rankColor, 0.1) : 'rgba(128,128,128,0.1)',
      totalPP: totalPPColor ? toRgba(totalPPColor, 0.1) : 'rgba(128,128,128,0.1)',
      averageAccuracy: averageAccuracyColor ? toRgba(averageAccuracyColor, 0.1) : 'rgba(128,128,128,0.1)',
      totalSubmittedPlays: totalSubmittedPlaysColor ? toRgba(totalSubmittedPlaysColor, 0.1) : 'rgba(128,128,128,0.1)'
   };

   return { grid, axisText, tooltipBg, tooltipText, pointHoverBorder, metricBorder, metricBg };
}

export type ChartColors = ReturnType<typeof computeColors>;

export function useChartColors() {
   const { resolvedTheme } = useTheme();
   return useMemo(() => computeColors(resolvedTheme), [resolvedTheme]);
}
