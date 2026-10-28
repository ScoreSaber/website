'use client';

import type { MouseEvent } from 'react';
import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { ExternalLink, MonitorPlay, Radio } from 'lucide-react';
import { useTranslations } from 'use-intl';

import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { env } from '@/env';
import { getLudusPlayerPresence, getPublicPlayerMatchId, type LudusPlayerPresence } from '@/modules/live/ludus/packets';
import { useLudus, type LudusState } from '@/modules/live/ludus/use-ludus';
import { api } from '@/shared/api/ApiInstance';
import { getArcviewerUrl } from '@/shared/arcviewer-url';
import { cn } from '@/shared/format/helpers';
import { optionalApiData } from '@/shared/result/api';
import { isMobileViewport } from '@/shared/ui-adjacent/viewport';

type PlayerLivePresenceState = Pick<LudusState, 'status' | 'rooms' | 'scores'>;

const PlayerLivePresenceContext = createContext<(PlayerLivePresenceState & { enabled: boolean }) | null>(null);

interface PlayerLivePresenceIndicatorProps {
   playerId: string;
   className?: string;
   size?: 'default' | 'compact';
}

export function PlayerLivePresenceProvider({ children, enabled = true }: { children: ReactNode; enabled?: boolean }) {
   const ludus = useLudus({
      enabled,
      ludusBaseUrl: env.NEXT_PUBLIC_LUDUS_URL,
      roomContext: 'PUBLIC_PRESENCE',
      clientType: 'WEBSITE'
   });

   const value = useMemo(() => ({ ...ludus, enabled }), [ludus, enabled]);

   return <PlayerLivePresenceContext.Provider value={value}>{children}</PlayerLivePresenceContext.Provider>;
}

export function useLivePlayersState() {
   const ludus = useContext(PlayerLivePresenceContext);
   if (!ludus || !ludus.enabled) return 'unavailable';
   if (ludus.status === 'idle' || ludus.status === 'connecting') return 'loading';

   return ludus.rooms.some((room) => room.playerIds.length > 0) ? 'available' : 'unavailable';
}

export function PlayerLivePresenceIndicator({ playerId, className, size }: PlayerLivePresenceIndicatorProps) {
   const ludus = useLudus({
      enabled: true,
      ludusBaseUrl: env.NEXT_PUBLIC_LUDUS_URL,
      roomContext: 'PUBLIC_PRESENCE',
      clientType: 'WEBSITE'
   });

   return <PlayerLivePresenceIndicatorContent playerId={playerId} className={className} size={size} ludus={ludus} />;
}

export function PlayerListLivePresenceIndicator({ playerId, className }: PlayerLivePresenceIndicatorProps) {
   const ludus = useContext(PlayerLivePresenceContext);
   if (!ludus) return null;

   return <PlayerLivePresenceIndicatorContent playerId={playerId} className={className} size="compact" ludus={ludus} />;
}

function useLivePlayerId(playerId: string) {
   const { data: aliases } = useQuery({
      queryKey: ['livePlayerIdAliases'],
      queryFn: () => optionalApiData(api.player.playerControllerGetLivePlayerIdAliases()),
      staleTime: 15_000,
      refetchInterval: 30_000
   });

   return aliases?.find((alias) => alias.playerId === playerId)?.livePlayerId ?? playerId;
}

function PlayerLivePresenceIndicatorContent(props: PlayerLivePresenceIndicatorProps & { ludus: PlayerLivePresenceState }) {
   if (props.ludus.status !== 'connected' || props.ludus.rooms.length === 0) return null;

   return <RoomPlayerLivePresenceIndicator {...props} />;
}

function RoomPlayerLivePresenceIndicator({
   playerId,
   className,
   size = 'default',
   ludus
}: PlayerLivePresenceIndicatorProps & { ludus: PlayerLivePresenceState }) {
   const livePlayerId = useLivePlayerId(playerId);
   const matchId = getPublicPlayerMatchId(livePlayerId);
   const presence = useMemo(() => getLudusPlayerPresence(ludus, livePlayerId, matchId), [ludus, livePlayerId, matchId]);

   if (!presence.connected) return null;

   return <ConnectedPlayerLivePresenceIndicator playerId={livePlayerId} className={className} size={size} presence={presence} />;
}

function ConnectedPlayerLivePresenceIndicator({
   playerId,
   className,
   size = 'default',
   presence
}: PlayerLivePresenceIndicatorProps & { presence: LudusPlayerPresence }) {
   const t = useTranslations();
   const [loaded, setLoaded] = useState(false);
   const [open, setOpen] = useState(false);
   const liveViewerUrl = getArcviewerUrl({ playerId });
   const label = presence.playing ? t('player.livePresence.live') : t('player.livePresence.online');
   const openLiveViewerAction = (event: MouseEvent<HTMLElement>) => {
      event.stopPropagation();
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (isMobileViewport()) return;

      event.preventDefault();
      setOpen(true);
   };

   return (
      <Dialog
         open={open}
         onOpenChange={(next) => {
            setOpen(next);
            if (!next) setLoaded(false);
         }}
      >
         <Badge
            variant="outline"
            asChild
            className={cn(
               'group justify-start gap-0 rounded-full border-0 bg-transparent font-semibold leading-none text-foreground shadow-none transition-[max-width,background-color,box-shadow] duration-200 ease-out hover:bg-background/90 hover:shadow-md focus-visible:bg-background/90 focus-visible:shadow-md',
               size === 'compact'
                  ? 'h-3.5 min-w-3.5 max-w-3.5 p-0.5 text-[9px] hover:max-w-32 focus-visible:max-w-32'
                  : 'h-5 min-w-5 max-w-5 p-1 text-[10px] hover:max-w-40 focus-visible:max-w-40',
               className
            )}
         >
            <a
               href={liveViewerUrl}
               target="_blank"
               rel="noopener noreferrer"
               onClick={openLiveViewerAction}
               aria-label={t('player.livePresence.openViewer')}
            >
               <span
                  className={cn(
                     'shrink-0 rounded-full transition-shadow duration-150 group-hover:shadow-none group-focus-visible:shadow-none',
                     size === 'compact' ? 'size-2 shadow-[0_0_0_1px_var(--background)]' : 'size-2.5 shadow-[0_0_0_2px_var(--background)]',
                     presence.playing ? 'bg-chart-primary' : 'bg-status-success'
                  )}
                  aria-hidden="true"
               />
               <span
                  className={cn(
                     'flex items-center overflow-hidden whitespace-nowrap opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100',
                     size === 'compact' ? 'ml-1' : 'ml-1.5'
                  )}
               >
                  <span className={cn('leading-none', size === 'compact' ? 'translate-y-0' : '-translate-y-px')}>{label}</span>
                  <span className={cn('bg-primary/45 w-px shrink-0', size === 'compact' ? 'mx-0.5 h-1.5' : 'mx-1 h-2')} aria-hidden="true" />
                  <span
                     className={cn(
                        'text-muted-foreground font-medium leading-none normal-case',
                        size === 'compact' ? 'translate-y-0 text-[7.5px]' : '-translate-y-px'
                     )}
                  >
                     {t('player.livePresence.spectateCta')}
                  </span>
               </span>
            </a>
         </Badge>
         <DialogContent className="w-[90vw] max-w-[90vw] sm:max-w-[90vw]" aria-describedby={undefined} showCloseButton>
            <DialogHeader>
               <DialogTitle className="flex items-center gap-2">
                  <Radio className="size-4" />
                  {t('player.livePresence.viewerTitle')}
                  <Tooltip>
                     <TooltipTrigger asChild>
                        <a
                           href={liveViewerUrl}
                           target="_blank"
                           rel="noopener noreferrer"
                           aria-label={t('player.livePresence.openViewerNewTab')}
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
                     <div className="text-muted-foreground flex items-center gap-2 text-xs">
                        <MonitorPlay className="size-4" />
                        {t('player.livePresence.loading')}
                     </div>
                  </div>
               )}
               {open && (
                  <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
                     <iframe
                        src={liveViewerUrl}
                        title={t('player.livePresence.viewerTitle')}
                        className={cn(
                           'absolute -inset-px h-[calc(100%+2px)] w-[calc(100%+2px)] border-0 bg-black',
                           loaded ? 'opacity-100' : 'opacity-0'
                        )}
                        onLoad={() => setLoaded(true)}
                        allow="autoplay"
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
