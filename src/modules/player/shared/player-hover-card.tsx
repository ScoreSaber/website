'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';
import { FaGlobe } from 'react-icons/fa';
import { useTranslations } from 'use-intl';

import { PlayerAvatar } from './player-avatar';

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { PlayerFollowButton } from '@/modules/player/operations/member/player-follow-button';
import { PlayerActions } from '@/modules/player/operations/player-actions';
import { buildPlayerSummary } from '@/modules/player/player-summary';
import { api } from '@/shared/api/ApiInstance';
import type { PlayerControllerGetPlayerResponse } from '@/shared/api/generated/ApiParams';
import { CountryImage } from '@/shared/components/country-image';
import { DeviceDisplay } from '@/shared/components/device-display';
import { FadeInImage } from '@/shared/components/fade-in-image';
import { parseCountryRegionParam } from '@/shared/country-region';
import { cn, formatNumber, rankToPage } from '@/shared/format/helpers';
import { BLURRED_BG_IMAGE_CLASSES } from '@/shared/format/styling';
import { optionalApiData } from '@/shared/result/api';
import { toInt64PathParam } from '@/shared/url-state/params';

const playerRoute = getRouteApi('/u/$playerId');
const rankingsRoute = getRouteApi('/rankings');

interface PlayerHoverCardProps {
   playerId: string;
   children: ReactNode;
}

export function PlayerHoverCard({ playerId, children }: PlayerHoverCardProps) {
   const [open, setOpen] = useState(false);
   const suppressHoverOpenRef = useRef(false);

   const { data: player, isLoading: loading } = useQuery({
      queryKey: ['playerHoverCard', playerId],
      queryFn: () => optionalApiData(api.player.playerControllerGetPlayer({ id: toInt64PathParam(playerId) })),
      enabled: open,
      staleTime: 5 * 60 * 1000
   });

   function handleOpenChange(nextOpen: boolean) {
      if (nextOpen && suppressHoverOpenRef.current) return;
      if (!nextOpen && hasOpenChildOverlay()) return;

      setOpen(nextOpen);
   }

   function cancelPendingOpen() {
      suppressHoverOpenRef.current = true;
      setOpen(false);
   }

   function resetPendingOpenCancel() {
      suppressHoverOpenRef.current = false;
   }

   function handleInteractOutside(e: Event) {
      if (hasOpenChildOverlay()) {
         e.preventDefault();
      }
   }

   return (
      <HoverCard open={open} onOpenChange={handleOpenChange} openDelay={700} closeDelay={150}>
         <HoverCardTrigger asChild>
            <span
               className="inline-flex min-w-0 flex-1 items-center overflow-hidden"
               onPointerDown={cancelPendingOpen}
               onClick={cancelPendingOpen}
               onPointerLeave={resetPendingOpenCancel}
            >
               {children}
            </span>
         </HoverCardTrigger>
         <HoverCardContent
            side="top"
            align="start"
            className="dark:bg-popover/80 w-80 overflow-hidden p-0 dark:backdrop-blur-xl"
            onEscapeKeyDown={() => setOpen(false)}
            onInteractOutside={handleInteractOutside}
         >
            {loading && !player ? (
               <div className="flex items-center justify-center py-4">
                  <div className="border-primary h-5 w-5 animate-spin rounded-full border-2 border-t-transparent" />
               </div>
            ) : player ? (
               <HoverCardBody player={player} onClose={() => setOpen(false)} />
            ) : null}
         </HoverCardContent>
      </HoverCard>
   );
}

function hasOpenChildOverlay() {
   return !!document.querySelector('[data-slot="dropdown-menu-content"], [data-slot="select-content"]');
}

function HoverCardBody({ player, onClose }: { player: PlayerControllerGetPlayerResponse; onClose: () => void }) {
   const t = useTranslations();
   const { stats, badges } = player;
   const playerSummary = buildPlayerSummary(player);

   const hasDevice = !!(stats?.device?.hmd || stats?.device?.controllerLeft || stats?.device?.controllerRight);

   const BADGE_W = 52;
   const BADGE_GAP = 6;
   const ELLIPSIS_W = 20;
   const badgesRef = useRef<HTMLDivElement>(null);
   const [visibleBadgeCount, setVisibleBadgeCount] = useState(badges?.length ?? 0);

   useEffect(() => {
      const el = badgesRef.current;
      if (!el || !badges?.length) return;
      const containerW = el.clientWidth;
      // how many badges fit fully, reserving space for "..." if not all fit
      const fitAll = Math.floor((containerW + BADGE_GAP) / (BADGE_W + BADGE_GAP));
      if (fitAll >= badges.length) {
         setVisibleBadgeCount(badges.length);
         return;
      }
      const fitWithEllipsis = Math.floor((containerW - ELLIPSIS_W - BADGE_GAP + BADGE_GAP) / (BADGE_W + BADGE_GAP));
      setVisibleBadgeCount(Math.max(1, fitWithEllipsis));
   }, [badges]);

   const nameEl = (
      <playerRoute.Link params={{ playerId: player.id }} className="group/hovername min-w-0 text-sm font-semibold" onClick={onClose}>
         <span className={cn(playerSummary.roleClassName, 'block truncate')}>{player.name}</span>
      </playerRoute.Link>
   );

   return (
      <div className="relative">
         {/* blurred avatar background */}
         <div className="absolute inset-0 opacity-0 dark:opacity-25">
            <FadeInImage src={player.avatar} alt="" fill className={BLURRED_BG_IMAGE_CLASSES} sizes="320px" />
         </div>
         <div className="from-popover/60 to-popover/60 absolute inset-0 hidden bg-linear-to-r via-transparent dark:block" />

         <div className="relative z-10 flex flex-col gap-2.5 p-3">
            {/* header row: avatar + info + follow */}
            <div className="flex items-center gap-2.5">
               <PlayerAvatar
                  src={player.avatar}
                  version={player.avatarVersion}
                  alt={player.name}
                  width={44}
                  height={44}
                  className="h-11 w-11 shrink-0 rounded-full"
               />
               <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                     <CountryImage country={player.country} size={14} />
                     {playerSummary.hasSpecialRole ? (
                        <Tooltip>
                           <TooltipTrigger asChild>{nameEl}</TooltipTrigger>
                           <TooltipContent>
                              <p>{playerSummary.roleTitle}</p>
                           </TooltipContent>
                        </Tooltip>
                     ) : (
                        nameEl
                     )}
                     {/* inline devices */}
                     {hasDevice && (
                        <DeviceDisplay
                           hmd={stats?.device?.hmd}
                           controllerLeft={stats?.device?.controllerLeft}
                           controllerRight={stats?.device?.controllerRight}
                           size="xs"
                           className="shrink-0"
                        />
                     )}
                  </div>
                  {stats && !player.banned && !player.inactive && (
                     <div className="text-muted-foreground flex items-center gap-1 text-xs">
                        <rankingsRoute.Link
                           search={{ page: rankToPage(stats.rank, 50), highlight: player.id, includeInactive: 'false' }}
                           className="hover:text-foreground flex items-center gap-1 transition-colors"
                        >
                           <FaGlobe className="size-2.5 shrink-0" />
                           <span className="tabular-nums">#{formatNumber(stats.rank)}</span>
                        </rankingsRoute.Link>
                        <span className="mx-0.5">·</span>
                        <rankingsRoute.Link
                           search={{
                              page: rankToPage(stats.countryRank, 50),
                              countries: parseCountryRegionParam(player.country),
                              highlight: player.id,
                              includeInactive: 'false'
                           }}
                           className="hover:text-foreground flex items-center gap-1 transition-colors"
                        >
                           <CountryImage country={player.country} size={12} />
                           <span className="tabular-nums">#{formatNumber(stats.countryRank)}</span>
                        </rankingsRoute.Link>
                     </div>
                  )}
                  <div className="text-muted-foreground mt-0.5 text-xs">
                     <span className="text-foreground font-semibold tabular-nums">{formatNumber(player.followers)}</span> {t('player.followers')}
                  </div>
               </div>
               <div className="flex shrink-0 flex-col items-center gap-0.5 pt-0.5 [&_button]:size-5">
                  <PlayerFollowButton playerId={player.id} compact />
                  <PlayerActions
                     playerId={player.id}
                     playerBanned={player.banned}
                     playerSilenced={player.silenced}
                     playerPermissions={player.permissions}
                     playerRole={player.role}
                     compact
                  />
               </div>
            </div>

            {/* badges */}
            {badges && badges.length > 0 && (
               <div className="flex flex-col gap-2">
                  <Separator className="bg-border/50" />
                  <div ref={badgesRef} className="flex items-center gap-1.5">
                     {badges.slice(0, visibleBadgeCount).map((badge) => (
                        <Tooltip key={badge.id}>
                           <TooltipTrigger asChild>
                              <div className="shrink-0 cursor-help" style={{ width: BADGE_W, height: 20 }}>
                                 <FadeInImage
                                    src={badge.image}
                                    alt={badge.description}
                                    width={BADGE_W}
                                    height={20}
                                    className="rounded-sm"
                                    style={{ width: BADGE_W, height: 20, objectFit: 'contain' }}
                                    unoptimized
                                 />
                              </div>
                           </TooltipTrigger>
                           <TooltipContent side="bottom">
                              <p className="font-medium">{badge.description}</p>
                           </TooltipContent>
                        </Tooltip>
                     ))}
                     {visibleBadgeCount < badges.length && (
                        <playerRoute.Link
                           params={{ playerId: player.id }}
                           className="text-muted-foreground hover:text-foreground shrink-0 text-xs font-medium transition-colors"
                           onClick={onClose}
                        >
                           ...
                        </playerRoute.Link>
                     )}
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}
