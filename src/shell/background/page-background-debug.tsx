'use client';

import { useEffect, useState } from 'react';

import { Result } from 'better-result';
import { ChevronDown, ChevronUp, Image as ImageIcon, Pin } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';

import { CopyButton } from '@/shared/components/copy-button';
import { cn } from '@/shared/format/helpers';
import { readStorageValue, writeStorageValue } from '@/shared/result/storage';
import type { ScoredImage } from '@/shell/background/analyze-background';

const MINIMIZED_STORAGE_KEY = 'page-background-debug:minimized';
const percentFormatter = new Intl.NumberFormat('en', { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1 });

interface BackgroundDebugPanelProps {
   results: ScoredImage[];
   onSwap: (url: string, intensity: number) => void;
}

export function BackgroundDebugPanel({ results, onSwap }: BackgroundDebugPanelProps) {
   const [minimized, setMinimized] = useState<boolean>(() => {
      if (globalThis.window === undefined) return false;
      return Result.unwrapOr(readStorageValue(MINIMIZED_STORAGE_KEY), null) === 'true';
   });
   const [openIds, setOpenIds] = useState<Set<string>>(new Set());
   const [pinnedIds, setPinnedIds] = useState<Set<string>>(new Set());

   useEffect(() => {
      writeStorageValue(MINIMIZED_STORAGE_KEY, String(minimized));
   }, [minimized]);

   if (results.length === 0) return null;

   if (minimized) {
      return (
         <Button
            size="icon-sm"
            variant="secondary"
            className="fixed top-4 right-4 z-50 shadow-lg backdrop-blur"
            onClick={() => setMinimized(false)}
            aria-label="expand page background debug"
         >
            <ChevronDown className="size-3" />
         </Button>
      );
   }

   // opening an item closes every other non-pinned open item
   const handleOpenChange = (id: string, next: boolean) => {
      setOpenIds((prev) => {
         if (next) {
            const keep = new Set<string>();
            for (const existing of prev) if (pinnedIds.has(existing)) keep.add(existing);
            keep.add(id);
            return keep;
         }
         const nextSet = new Set(prev);
         nextSet.delete(id);
         return nextSet;
      });
   };

   const togglePin = (id: string) => {
      setPinnedIds((prev) => {
         const next = new Set(prev);
         if (next.has(id)) next.delete(id);
         else next.add(id);
         return next;
      });
   };

   return (
      <div className="border-border bg-background/90 fixed top-4 right-4 z-50 flex max-h-[90vh] w-80 cursor-default flex-col overflow-hidden rounded-lg border shadow-lg backdrop-blur">
         <div className="border-border text-muted-foreground flex items-center justify-between gap-2 px-3 py-2 text-xs font-semibold">
            <span>background algo debug ({results.length})</span>
            <Button size="icon-xs" variant="ghost" onClick={() => setMinimized(true)} aria-label="minimize panel">
               <ChevronUp className="size-3" />
            </Button>
         </div>
         <Separator />
         <div className="flex flex-1 flex-col gap-1 overflow-y-auto p-2">
            {results.map((r, i) => (
               <DebugItem
                  key={r.url}
                  rank={i + 1}
                  result={r}
                  open={openIds.has(r.url)}
                  pinned={pinnedIds.has(r.url)}
                  onOpenChange={(next) => handleOpenChange(r.url, next)}
                  onTogglePin={() => togglePin(r.url)}
                  onSwap={onSwap}
               />
            ))}
         </div>
      </div>
   );
}

interface DebugItemProps {
   rank: number;
   result: ScoredImage;
   open: boolean;
   pinned: boolean;
   onOpenChange: (next: boolean) => void;
   onTogglePin: () => void;
   onSwap: (url: string, intensity: number) => void;
}

function DebugItem({ rank, result, open, pinned, onOpenChange, onTogglePin, onSwap }: DebugItemProps) {
   const d = result.diagnostics;

   return (
      <Collapsible open={open} onOpenChange={onOpenChange} className="border-border/40 rounded border">
         <div className="flex items-center gap-1 pr-1">
            <CollapsibleTrigger className="hover:bg-muted/50 flex min-w-0 flex-1 cursor-default items-center gap-2 p-2 text-left">
               <span className="text-muted-foreground w-6 font-mono text-xs">#{rank}</span>
               <img src={result.url} alt="" className="h-10 w-10 rounded object-cover" />
               <div className="min-w-0 flex-1">
                  <div className="font-mono text-xs">{result.score.toFixed(4)}</div>
                  <div className="text-muted-foreground truncate text-[10px]">{result.url}</div>
               </div>
            </CollapsibleTrigger>
            <Button
               size="icon-xs"
               variant="ghost"
               className={cn('cursor-pointer', pinned && 'text-primary')}
               onClick={onTogglePin}
               aria-label={pinned ? 'unpin item' : 'pin item'}
            >
               <Pin className={cn('size-3', pinned && 'fill-current')} />
            </Button>
         </div>
         <Separator className="bg-border/40" />
         <CollapsibleContent className="flex flex-col gap-1 px-2 py-2 font-mono text-[10px]">
            <div>
               avg sat: {percentFormatter.format(d.avgSaturation)} &nbsp;|&nbsp; avg lightness: {percentFormatter.format(d.avgLightness)}
            </div>
            <div className="text-muted-foreground mt-1 font-semibold">hue dist (current multiplier)</div>
            <div>blue/purple 200-320 x1.6: {percentFormatter.format(d.hueBuckets.bluePurple)}</div>
            <div>teal/cyan 160-200 x1.5: {percentFormatter.format(d.hueBuckets.tealCyan)}</div>
            <div>red &lt;30 | &gt;330 x0.7: {percentFormatter.format(d.hueBuckets.redWarm)}</div>
            <div>orange/yellow 30-70 x0.5: {percentFormatter.format(d.hueBuckets.orangeYellow)}</div>
            <div>green 70-160 x1.0: {percentFormatter.format(d.hueBuckets.other)}</div>
            <div className="text-muted-foreground mt-1 font-semibold">lightness dist (sat-aware multiplier)</div>
            <div>very bright &gt;0.6 x(0.05+s*0.25): {percentFormatter.format(d.lightnessBuckets.veryBright)}</div>
            <div>bright 0.45-0.6 x(0.2+s*0.5): {percentFormatter.format(d.lightnessBuckets.bright)}</div>
            <div>mid 0.15-0.45 x1.0: {percentFormatter.format(d.lightnessBuckets.mid)}</div>
            <div>dark 0.08-0.15 x0.75: {percentFormatter.format(d.lightnessBuckets.dark)}</div>
            <div>very dark &lt;0.08 x0.4: {percentFormatter.format(d.lightnessBuckets.veryDark)}</div>
            <div className="text-muted-foreground mt-1 font-semibold">region boost (positives only, peak x3 -&gt; edge x1)</div>
            <div>positives in core (middle 25%): {percentFormatter.format(d.region.positiveCoreShare)}</div>
            <div>avg boost on positives: x{d.region.avgBoostOnPositive.toFixed(2)}</div>
            <div>bright-in-core share (center-bright penalty): {percentFormatter.format(d.region.brightInCoreShare)}</div>
            <div className="text-muted-foreground mt-1 font-semibold">post multipliers (applied after per-pixel sum)</div>
            <div>raw score (pre-post): {d.post.rawScore.toFixed(4)}</div>
            <div>sat gate x{d.post.satGate.toFixed(3)} (sat&gt;=0.5: 1, else (sat/0.5)^0.8)</div>
            <div>hue concentration x{d.post.hueConcentrationPenalty.toFixed(3)} (kicks in &gt;95% in one bucket)</div>
            <div className="mt-2 flex gap-1">
               <div className="bg-secondary/60 flex h-6 flex-1 items-center justify-center gap-1 rounded-md text-[10px]">
                  <CopyButton value={() => formatStats(result)} size="sm" errorMessage="copy failed" />
                  copy stats
               </div>
               <Button
                  size="sm"
                  variant="secondary"
                  className="h-6 flex-1 cursor-pointer text-[10px]"
                  onClick={() => onSwap(result.url, result.intensity)}
               >
                  <ImageIcon className="size-3" />
                  swap background
               </Button>
            </div>
         </CollapsibleContent>
      </Collapsible>
   );
}

function formatStats(r: ScoredImage) {
   const d = r.diagnostics;
   return [
      `url: ${r.url}`,
      `score: ${r.score.toFixed(4)}`,
      `intensity: ${r.intensity.toFixed(3)}`,
      `avg saturation: ${percentFormatter.format(d.avgSaturation)}`,
      `avg lightness: ${percentFormatter.format(d.avgLightness)}`,
      '',
      'hue distribution (current multiplier):',
      `  blue/purple 200-320 x1.6: ${percentFormatter.format(d.hueBuckets.bluePurple)}`,
      `  teal/cyan 160-200 x1.5: ${percentFormatter.format(d.hueBuckets.tealCyan)}`,
      `  red <30 | >330 x0.7: ${percentFormatter.format(d.hueBuckets.redWarm)}`,
      `  orange/yellow 30-70 x0.5: ${percentFormatter.format(d.hueBuckets.orangeYellow)}`,
      `  green 70-160 x1.0: ${percentFormatter.format(d.hueBuckets.other)}`,
      '',
      'lightness distribution (sat-aware multiplier):',
      `  very bright >0.6 x(0.05+s*0.25): ${percentFormatter.format(d.lightnessBuckets.veryBright)}`,
      `  bright 0.45-0.6 x(0.2+s*0.5): ${percentFormatter.format(d.lightnessBuckets.bright)}`,
      `  mid 0.15-0.45 x1.0: ${percentFormatter.format(d.lightnessBuckets.mid)}`,
      `  dark 0.08-0.15 x0.75: ${percentFormatter.format(d.lightnessBuckets.dark)}`,
      `  very dark <0.08 x0.4: ${percentFormatter.format(d.lightnessBuckets.veryDark)}`,
      '',
      `region boost (positive-hue pixels only; curve: exp peak x3 at center -> shoulder x1.2 at +/-0.125 -> linear tail to x1 at edges, falloff 4):`,
      `  positives in core (middle 25%): ${percentFormatter.format(d.region.positiveCoreShare)}`,
      `  avg boost on positives: x${d.region.avgBoostOnPositive.toFixed(3)}`,
      `  bright-in-core share (center-bright penalty): ${percentFormatter.format(d.region.brightInCoreShare)}`,
      '',
      'post multipliers (applied after per-pixel sum):',
      `  raw score (pre-post): ${d.post.rawScore.toFixed(4)}`,
      `  sat gate: x${d.post.satGate.toFixed(3)} - sat>=0.5: 1, else (sat/0.5)^0.8`,
      `  hue concentration: x${d.post.hueConcentrationPenalty.toFixed(3)} - kicks in when one hue bucket >95%`
   ].join('\n');
}
