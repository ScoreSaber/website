'use client';

import type { MouseEvent, ReactNode } from 'react';
import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { ExternalLink, Loader2, Play } from 'lucide-react';
import { useTranslations } from 'use-intl';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { api } from '@/shared/api/ApiInstance';
import type { ScoreControllerGetScoreResponse } from '@/shared/api/generated/ApiParams';
import { getReplayArcviewerUrl } from '@/shared/arcviewer-url';
import { cn } from '@/shared/format/helpers';
import { optionalApiData } from '@/shared/result/api';
import { isMobileViewport } from '@/shared/ui-adjacent/viewport';

type ScoreWithReplayViewCount = ScoreControllerGetScoreResponse['score'] & {
   replayViewCount?: number;
};

interface ReplayDialogProps {
   scoreId?: number;
   mapId?: string;
   trigger: (props: ReplayTriggerProps) => ReactNode;
   tooltip?: string;
   tooltipDelayMs?: number;
   tooltipSide?: 'top' | 'right' | 'bottom' | 'left';
}

interface ReplayTriggerProps {
   replayUrl: string;
   openReplayAction: (event: MouseEvent<HTMLElement>) => void;
}

export function ReplayDialog({ scoreId, mapId, trigger, tooltip, tooltipDelayMs, tooltipSide }: ReplayDialogProps) {
   const t = useTranslations();
   const [loaded, setLoaded] = useState(false);
   const [open, setOpen] = useState(false);
   const [tooltipOpen, setTooltipOpen] = useState(false);
   const replayUrl = mapId ?? (scoreId != null ? getReplayArcviewerUrl({ scoreId: scoreId.toString() }) : '');
   const shouldFetchReplayViews = scoreId != null;
   const { data: replayViewCount } = useQuery({
      queryKey: ['scoreReplayViews', scoreId],
      queryFn: async () => {
         if (scoreId == null) return null;
         const detail = await optionalApiData(api.score.scoreControllerGetScore({ id: scoreId, includeScoreStats: 'false' }));
         const score: ScoreWithReplayViewCount | undefined = detail?.score;
         return score?.replayViewCount ?? null;
      },
      enabled: shouldFetchReplayViews && (open || tooltipOpen),
      staleTime: 60_000
   });
   const replayViewCountLabel = replayViewCount == null || replayViewCount <= 0 ? null : t('score.replayViews', { count: replayViewCount });
   const openReplayAction = (event: MouseEvent<HTMLElement>) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (isMobileViewport()) return;

      event.preventDefault();
      setOpen(true);
      setTooltipOpen(false);
   };
   const renderedTrigger = trigger({ replayUrl, openReplayAction });

   const wrappedTrigger = tooltip ? (
      <Tooltip open={tooltipOpen && !open} onOpenChange={setTooltipOpen} delayDuration={tooltipDelayMs}>
         <TooltipTrigger asChild>{renderedTrigger}</TooltipTrigger>
         <TooltipContent side={tooltipSide} className="whitespace-nowrap">
            <p className="leading-none">{tooltip}</p>
            {replayViewCountLabel && <p className="mt-1 text-[0.6875rem] leading-none text-current/75 tabular-nums">{replayViewCountLabel}</p>}
         </TooltipContent>
      </Tooltip>
   ) : (
      renderedTrigger
   );

   return (
      <Dialog
         open={open}
         onOpenChange={(next) => {
            setOpen(next);
            if (!next) setLoaded(false);
         }}
      >
         {wrappedTrigger}
         <DialogContent className="w-[90vw] max-w-[90vw] sm:max-w-[90vw]" aria-describedby={undefined} showCloseButton>
            <DialogHeader>
               <DialogTitle className="flex min-w-0 items-center gap-2">
                  <Play className="size-4 shrink-0" />
                  <span className="min-w-0 truncate">{t('score.replayViewer')}</span>
                  {replayViewCountLabel && (
                     <span className="text-muted-foreground shrink-0 text-xs font-medium tabular-nums">{replayViewCountLabel}</span>
                  )}
                  <Tooltip>
                     <TooltipTrigger asChild>
                        <a
                           href={replayUrl}
                           target="_blank"
                           rel="noopener noreferrer"
                           aria-label={t('score.openReplayNewTab')}
                           className="text-muted-foreground hover:text-primary transition-colors"
                        >
                           <ExternalLink className="size-3" aria-hidden="true" />
                        </a>
                     </TooltipTrigger>
                     <TooltipContent>
                        <p>{t('common.openInNewTab')}</p>
                     </TooltipContent>
                  </Tooltip>
               </DialogTitle>
            </DialogHeader>
            <div className="bg-card relative aspect-video max-h-[80vh] w-full overflow-hidden rounded-md border">
               {!loaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                     <Loader2 className="text-muted-foreground/40 size-6 animate-spin" />
                  </div>
               )}
               {open && (
                  <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
                     {/* slight overscan hides arcviewer edge artifacts */}
                     <iframe
                        src={replayUrl}
                        title={t('score.replayViewer')}
                        className={cn(
                           'absolute -inset-px h-[calc(100%+2px)] w-[calc(100%+2px)] border-0 bg-black transition-opacity duration-300',
                           loaded ? 'animate-in fade-in opacity-100 duration-300' : 'opacity-0'
                        )}
                        onLoad={() => setLoaded(true)}
                        referrerPolicy="no-referrer"
                        sandbox="allow-scripts allow-same-origin allow-presentation allow-popups allow-popups-to-escape-sandbox"
                        allowFullScreen
                     />
                  </div>
               )}
            </div>
         </DialogContent>
      </Dialog>
   );
}
