'use client';

import { useState, type CSSProperties, type ReactNode } from 'react';

import { getRouteApi } from '@tanstack/react-router';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react';
import type { IconType } from 'react-icons';
import {
   FaBan,
   FaBullseye,
   FaCalendarAlt,
   FaExternalLinkAlt,
   FaEye,
   FaGamepad,
   FaGlobe,
   FaHashtag,
   FaMoon,
   FaShieldAlt,
   FaStar,
   FaTrophy,
   FaVolumeMute
} from 'react-icons/fa';
import { useTranslations } from 'use-intl';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { useDenyahMode } from '@/modules/player/denyah/denyah-mode-context';
import { Runaway } from '@/modules/player/denyah/runaway';
import { PlayerFollowButton } from '@/modules/player/operations/member/player-follow-button';
import { buildPlayerSummary } from '@/modules/player/player-summary';
import { PlayerAliases } from '@/modules/player/profile/player-aliases';
import { PlayerBadges } from '@/modules/player/profile/player-badges';
import { PlayerLivePresenceIndicator } from '@/modules/player/profile/player-live-presence-indicator';
import { getProfileAccentProperties } from '@/modules/player/profile/player-profile-accent';
import { PlayerRelationships } from '@/modules/player/profile/player-relationships';
import { PlayerAvatar } from '@/modules/player/shared/player-avatar';
import { PlayerLink } from '@/modules/player/shared/player-link';
import { WeeklyRankChange } from '@/modules/player/shared/weekly-rank-change';
import type { UserControllerUpdateProfileCustomizationPayload } from '@/shared/api/generated/Api';
import type { PlayerAliasControllerGetAliasesItem, PlayerControllerGetPlayerResponse } from '@/shared/api/generated/ApiParams';
import { CountryImage } from '@/shared/components/country-image';
import { DeviceDisplay } from '@/shared/components/device-display';
import { Stat } from '@/shared/components/stat';
import { Time } from '@/shared/components/time';
import { parseCountryRegionParam } from '@/shared/country-region';
import { cn, formatAccuracy, formatNumber, formatPP, rankToPage } from '@/shared/format/helpers';
import { normalizePlayerRoleText } from '@/shared/format/styling';
import Permissions from '@/shared/permissions';

const rankingsRoute = getRouteApi('/rankings');

const ppBadgeClass =
   'border-primary/25 bg-primary/15 text-primary-foreground dark:text-primary rounded-full border px-2.5 py-0.5 text-sm font-semibold tabular-nums';
const ppUnitClass = 'text-[10px] font-medium uppercase';
const rankPillBaseClass = 'inline-flex items-center gap-2 rounded-md border-l-2 px-2.5 py-1 transition-colors';
const rankPillClass = cn(rankPillBaseClass, 'border-primary/60 bg-primary/5 hover:bg-primary/10');
const rankPillAccentClass = cn(
   rankPillBaseClass,
   'bg-[color:color-mix(in_srgb,var(--profile-accent)_9%,transparent)] hover:bg-[color:color-mix(in_srgb,var(--profile-accent)_16%,transparent)]'
);

export type PlayerProfileStatId = NonNullable<UserControllerUpdateProfileCustomizationPayload['statOrder']>[number];

export const PLAYER_PROFILE_STAT_IDS: PlayerProfileStatId[] = [
   'rankedPlays',
   'rankedScore',
   'rankedAcc',
   'plusOnePP',
   'totalPlays',
   'totalScore',
   'joined',
   'replayViews',
   'role'
];

interface ProfileStatItem {
   id: PlayerProfileStatId;
   icon: IconType;
   label: string;
   value: ReactNode;
   primary?: boolean;
   tooltip?: string;
}

export function PlayerProfileHeader({ player, aliases, actions, customization, plusOneRawPP, children }: PlayerProfileHeaderProps) {
   const t = useTranslations();
   const [statsExpanded, setStatsExpanded] = useState(false);
   const { stats } = player;
   const denyahMode = useDenyahMode();
   const playerSummary = buildPlayerSummary(player, 'text');
   const restricted = player.banned || player.silenced;
   const isActive = !player.inactive && !restricted;
   const profileAccentStyle = getProfileAccentProperties(customization);
   const hasCustomAccent = profileAccentStyle !== undefined;
   const accentColor = 'var(--profile-accent)';
   const accentTextClass = hasCustomAccent ? 'text-[color:var(--profile-accent)]' : 'text-primary-foreground dark:text-primary';
   const accentSubtleTextClass = hasCustomAccent
      ? 'text-[color:var(--profile-accent)] opacity-70'
      : 'text-primary-foreground/70 dark:text-primary/70';
   const canApplySupporterNameColorToggle = !Permissions.checkPermissionNumber(player.permissions, Permissions.groups.ALL_STAFF);
   const playerNameColorClass =
      customization?.supporterNameColorEnabled === false && canApplySupporterNameColorToggle
         ? hasCustomAccent
            ? 'text-[color:var(--profile-accent)]'
            : 'text-foreground'
         : undefined;
   const primaryStatItems: ProfileStatItem[] = [
      {
         id: 'rankedPlays',
         icon: FaTrophy,
         label: t('player.rankedPlays'),
         value: formatNumber(stats.totalPlayedRankedLeaderboards),
         primary: true
      },
      {
         id: 'rankedScore',
         icon: FaStar,
         label: t('player.rankedScore'),
         value: formatNumber(Number(stats.totalRankedScore)),
         primary: true
      },
      {
         id: 'rankedAcc',
         icon: FaBullseye,
         label: t('player.rankedAcc'),
         value: formatAccuracy(stats.averageAccuracy),
         primary: true
      }
   ];
   if (plusOneRawPP != null) {
      primaryStatItems.push({
         id: 'plusOnePP',
         icon: FaStar,
         label: t('player.plusOnePP'),
         value: `${formatPP(plusOneRawPP)}pp`,
         primary: true,
         tooltip: t('player.plusOnePPHint')
      });
   }
   const secondaryStatItems: ProfileStatItem[] = [
      {
         id: 'totalPlays',
         icon: FaGamepad,
         label: t('common.totalPlays'),
         value: formatNumber(stats.totalPlayedLeaderboards)
      },
      {
         id: 'totalScore',
         icon: FaHashtag,
         label: t('player.totalScore'),
         value: formatNumber(Number(stats.totalScore))
      },
      {
         id: 'joined',
         icon: FaCalendarAlt,
         label: t('player.joined'),
         value: <Time date={player.createdAt} dateOnly />
      },
      {
         id: 'replayViews',
         icon: FaEye,
         label: t('player.replayViews'),
         value: formatNumber(stats.totalReplayViews)
      }
   ];
   if (playerSummary.hasSpecialRole) {
      secondaryStatItems.push({
         id: 'role',
         icon: FaShieldAlt,
         label: t('player.role'),
         value: player.role ? normalizePlayerRoleText(player.role) : playerSummary.roleTitle
      });
   }
   const statsById = new Map([...primaryStatItems, ...secondaryStatItems].map((item) => [item.id, item]));
   const customizedStatOrder = customization?.statOrder ?? (customization?.enabledStatIds ? [...PLAYER_PROFILE_STAT_IDS] : null);
   const orderedCustomizedStats = customizedStatOrder ? getOrderedProfileStats(customizedStatOrder, statsById) : null;
   const enabledCustomizedStatIds = customization?.enabledStatIds ?? customization?.statOrder ?? null;
   const enabledCustomizedStatIdSet = new Set(enabledCustomizedStatIds ?? []);
   const customizedStats = orderedCustomizedStats?.filter((item) => enabledCustomizedStatIdSet.has(item.id));
   const hiddenCustomizedStats = orderedCustomizedStats?.filter((item) => !enabledCustomizedStatIdSet.has(item.id)) ?? [];
   const hasShownCustomizedStats = (customizedStats?.length ?? 0) > 0;
   const statsToggleLabel = t('player.customization.layout.statsTitle');
   const hiddenStatsToggle =
      hiddenCustomizedStats.length > 0 ? (
         <Runaway enabled={denyahMode}>
            <Button
               type="button"
               variant="ghost"
               size="icon-xs"
               className="text-muted-foreground hover:text-foreground hover:bg-transparent active:!scale-100 dark:hover:bg-transparent"
               aria-expanded={statsExpanded}
               aria-label={statsToggleLabel}
               onClick={() => setStatsExpanded((expanded) => !expanded)}
            >
               {hasShownCustomizedStats ? (
                  statsExpanded ? (
                     <ChevronLeft data-icon />
                  ) : (
                     <ChevronRight data-icon />
                  )
               ) : statsExpanded ? (
                  <ChevronUp data-icon />
               ) : (
                  <ChevronDown data-icon />
               )}
            </Button>
         </Runaway>
      ) : null;
   const accentSurfaceStyle = hasCustomAccent
      ? {
           borderColor: `color-mix(in srgb, ${accentColor} 45%, transparent)`,
           backgroundColor: `color-mix(in srgb, ${accentColor} 13%, transparent)`,
           color: accentColor
        }
      : undefined;
   const rankPillStyle = hasCustomAccent
      ? {
           borderLeftColor: `color-mix(in srgb, ${accentColor} 65%, transparent)`
        }
      : undefined;
   const playerNameClassName = cn('truncate text-xl font-bold', playerNameColorClass);
   return (
      <div className="relative z-10" style={profileAccentStyle}>
         <div className="relative flex items-start">
            <div className="flex min-w-0 flex-1 flex-col items-center gap-3 sm:flex-row sm:items-start sm:gap-5">
               <div className="flex shrink-0 flex-col items-center gap-2">
                  <div className="relative">
                     <PlayerAvatar
                        className={cn(
                           'h-24 w-24 rounded-full shadow-lg ring-2',
                           restricted ? 'ring-destructive/40 grayscale' : player.inactive ? 'opacity-60 grayscale' : ''
                        )}
                        width={96}
                        height={96}
                        alt={player.name}
                        src={player.avatar}
                        version={player.avatarVersion}
                        priority
                     />
                     {player.banned && (
                        <div className="bg-destructive/20 absolute inset-0 flex items-center justify-center rounded-full">
                           <FaBan className="text-destructive/70 size-10" />
                        </div>
                     )}
                     <PlayerLivePresenceIndicator playerId={player.id} className="absolute bottom-1.5 left-[72%] z-10" />
                  </div>
                  <Runaway enabled={denyahMode} className="hidden sm:block">
                     <PlayerFollowButton playerId={player.id} />
                  </Runaway>
                  {!restricted && <PlayerRelationships player={player} />}
               </div>

               <div className="flex min-w-0 flex-1 flex-col items-center gap-1.5 sm:items-start">
                  <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                     <div className="flex min-w-0 items-center gap-1.5">
                        <CountryImage country={player.country} size={18} />
                        <h1 className="min-w-0">
                           <PlayerLink player={player} variant="inline" className={playerNameClassName} />
                        </h1>
                        {playerSummary.steamHref && (
                           <a
                              href={playerSummary.steamHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={t('player.viewSteamProfile')}
                              className="text-muted-foreground hover:text-primary shrink-0 transition-colors"
                           >
                              <FaExternalLinkAlt className="size-2.5" aria-hidden="true" />
                           </a>
                        )}
                        {aliases && <PlayerAliases aliases={aliases} playerId={player.id} />}
                     </div>

                     {!restricted && (
                        <StatusBadge tooltip={t('common.performancePoints')} className={ppBadgeClass} style={accentSurfaceStyle}>
                           {formatPP(stats.totalPP)}
                           <span className={cn(ppUnitClass, accentSubtleTextClass)}>{denyahMode ? 'pee pee' : 'pp'}</span>
                        </StatusBadge>
                     )}

                     {player.inactive && !restricted && (
                        <StatusBadge
                           tooltip={t('player.inactiveTooltip')}
                           className="border-border/40 bg-muted/40 text-muted-foreground rounded-md border px-2 py-0.5 text-xs font-medium"
                        >
                           <FaMoon className="size-2.5" />
                           {t('player.inactive')}
                        </StatusBadge>
                     )}

                     {player.banned && (
                        <StatusBadge
                           tooltip={t('player.bannedTooltip')}
                           className="border-destructive/30 bg-destructive/15 text-destructive rounded-md border px-2 py-0.5 text-xs font-semibold"
                        >
                           <FaBan className="size-2.5" />
                           {t('player.banned')}
                        </StatusBadge>
                     )}

                     {player.silenced && (
                        <StatusBadge
                           tooltip={t('player.silencedTooltip')}
                           className="border-destructive/30 bg-destructive/15 text-destructive rounded-md border px-2 py-0.5 text-xs font-semibold"
                        >
                           <FaVolumeMute className="size-2.5" />
                           {t('player.silenced')}
                        </StatusBadge>
                     )}
                  </div>

                  {/* rank pills + device */}
                  {isActive && (
                     <div className="flex flex-wrap items-stretch justify-center gap-2 sm:justify-start">
                        {[
                           {
                              page: rankToPage(stats.rank, 50),
                              countries: undefined,
                              icon: <FaGlobe className="text-muted-foreground size-3" />,
                              value: stats.rank,
                              change: stats.rankChange,
                              label: t('player.global')
                           },
                           {
                              page: rankToPage(stats.countryRank, 50),
                              countries: parseCountryRegionParam(player.country),
                              icon: <CountryImage country={player.country} size={16} />,
                              value: stats.countryRank,
                              change: null,
                              label: t('player.countryRank')
                           }
                        ].map(({ page, countries, icon, value, change, label }) => (
                           <rankingsRoute.Link
                              key={label}
                              search={{ page, countries, highlight: player.id, includeInactive: 'false' }}
                              className={hasCustomAccent ? rankPillAccentClass : rankPillClass}
                              style={rankPillStyle}
                           >
                              {icon}
                              <div>
                                 <div className="flex items-center gap-1">
                                    <div className={cn(accentTextClass, 'text-sm font-bold tabular-nums')}>#{formatNumber(value)}</div>
                                    <WeeklyRankChange change={change} />
                                 </div>
                                 <div className="text-muted-foreground text-[9px] tracking-wider uppercase">{label}</div>
                              </div>
                           </rankingsRoute.Link>
                        ))}
                        {stats.device?.hmd &&
                           (denyahMode ? (
                              <div className="flex flex-col items-center gap-0.5">
                                 <Tooltip>
                                    <TooltipTrigger asChild>
                                       <span
                                          className="flex cursor-help items-center justify-center text-2xl leading-none"
                                          role="img"
                                          aria-label={stats.device.hmd}
                                       >
                                          🚽
                                       </span>
                                    </TooltipTrigger>
                                    <TooltipContent side="top">{stats.device.hmd}</TooltipContent>
                                 </Tooltip>
                                 <DeviceDisplay
                                    controllerLeft={stats.device.controllerLeft}
                                    controllerRight={stats.device.controllerRight}
                                    variant="stacked"
                                    size="md"
                                 />
                              </div>
                           ) : (
                              <DeviceDisplay
                                 hmd={stats.device.hmd}
                                 controllerLeft={stats.device.controllerLeft}
                                 controllerRight={stats.device.controllerRight}
                                 variant="stacked"
                                 size="md"
                              />
                           ))}
                     </div>
                  )}

                  {/* stats */}
                  {!restricted && (
                     <div className="flex flex-col gap-1.5">
                        {customizedStats ? (
                           <ProfileStatsRow
                              items={statsExpanded ? (orderedCustomizedStats ?? customizedStats) : customizedStats}
                              accentTextClass={accentTextClass}
                              accentSubtleTextClass={accentSubtleTextClass}
                              trailingAction={hiddenStatsToggle}
                           />
                        ) : (
                           <>
                              <ProfileStatsRow
                                 items={primaryStatItems}
                                 accentTextClass={accentTextClass}
                                 accentSubtleTextClass={accentSubtleTextClass}
                              />
                              {statsExpanded && (
                                 <ProfileStatsRow
                                    items={secondaryStatItems}
                                    accentTextClass={accentTextClass}
                                    accentSubtleTextClass={accentSubtleTextClass}
                                 />
                              )}
                              {secondaryStatItems.length > 0 && (
                                 <div className="flex justify-center sm:justify-start">
                                    <Runaway enabled={denyahMode}>
                                       <Button
                                          type="button"
                                          variant="ghost"
                                          size="icon-xs"
                                          className="text-muted-foreground"
                                          aria-expanded={statsExpanded}
                                          aria-label={statsToggleLabel}
                                          onClick={() => setStatsExpanded((expanded) => !expanded)}
                                       >
                                          {statsExpanded ? <ChevronLeft data-icon /> : <ChevronRight data-icon />}
                                       </Button>
                                    </Runaway>
                                 </div>
                              )}
                           </>
                        )}
                     </div>
                  )}

                  {!restricted && (
                     <PlayerBadges badges={player.badges} badgeOrder={customization?.badgeOrder} badgeComments={customization?.badgeComments} />
                  )}
               </div>
            </div>

            <div className="absolute top-4 right-4 flex flex-col items-end gap-1.5 sm:relative sm:top-auto sm:right-auto sm:ml-3 sm:shrink-0">
               <div className="sm:hidden">
                  <PlayerFollowButton playerId={player.id} compact />
               </div>
               <Runaway enabled={denyahMode}>{actions}</Runaway>
            </div>
         </div>

         {children}
      </div>
   );
}

function ProfileStatsRow({
   items,
   accentTextClass,
   accentSubtleTextClass,
   trailingAction
}: {
   items: ProfileStatItem[];
   accentTextClass: string;
   accentSubtleTextClass: string;
   trailingAction?: ReactNode;
}) {
   const [openTooltipId, setOpenTooltipId] = useState<PlayerProfileStatId | null>(null);

   if (items.length === 0 && !trailingAction) return null;

   return (
      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 sm:justify-start">
         {items.map((item) => {
            const Icon = item.icon;
            const labelClassName = cn(item.primary && accentSubtleTextClass, item.tooltip && 'cursor-help');
            const valueClassName = cn('tabular-nums', item.primary && accentTextClass);

            if (!item.tooltip) {
               return (
                  <Stat key={item.id} icon={item.icon} label={item.label} labelClassName={labelClassName} valueClassName={valueClassName}>
                     {item.value}
                  </Stat>
               );
            }

            return (
               <Tooltip
                  key={item.id}
                  open={openTooltipId === item.id}
                  onOpenChange={(open) =>
                     setOpenTooltipId((current) => {
                        if (open) return item.id;
                        return current === item.id ? null : current;
                     })
                  }
               >
                  <TooltipTrigger asChild>
                     <button
                        type="button"
                        className="bg-secondary/35 text-muted-foreground focus-visible:ring-ring inline-flex cursor-help items-center gap-2 rounded-md border px-2.5 py-1 text-left text-xs focus-visible:ring-2 focus-visible:outline-none"
                        onClick={() => setOpenTooltipId((current) => (current === item.id ? null : item.id))}
                     >
                        <Icon className="h-3 w-3 shrink-0" />
                        <span className={cn('select-none', labelClassName)}>{item.label}</span>
                        <span className={cn('text-foreground font-semibold', valueClassName)}>{item.value}</span>
                     </button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" sideOffset={4} className="max-w-64 text-center">
                     <p>{item.tooltip}</p>
                  </TooltipContent>
               </Tooltip>
            );
         })}
         {trailingAction}
      </div>
   );
}

function getOrderedProfileStats(statOrder: PlayerProfileStatId[], statsById: Map<PlayerProfileStatId, ProfileStatItem>) {
   const orderedStats = statOrder.map((statId) => statsById.get(statId)).filter((item): item is ProfileStatItem => item !== undefined);
   const orderedStatIds = new Set(orderedStats.map((item) => item.id));
   const remainingStats = PLAYER_PROFILE_STAT_IDS.filter((statId) => !orderedStatIds.has(statId))
      .map((statId) => statsById.get(statId))
      .filter((item): item is ProfileStatItem => item !== undefined);

   return [...orderedStats, ...remainingStats];
}

function StatusBadge({ tooltip, className, style, children }: { tooltip: string; className: string; style?: CSSProperties; children: ReactNode }) {
   return (
      <Tooltip>
         <TooltipTrigger asChild>
            <span className={cn('inline-flex cursor-help items-center gap-1', className)} style={style}>
               {children}
            </span>
         </TooltipTrigger>
         <TooltipContent>
            <p>{tooltip}</p>
         </TooltipContent>
      </Tooltip>
   );
}

interface PlayerProfileHeaderProps {
   player: PlayerControllerGetPlayerResponse;
   aliases?: PlayerAliasControllerGetAliasesItem[];
   actions?: ReactNode;
   customization?: PlayerControllerGetPlayerResponse['profileCustomization'];
   plusOneRawPP?: number | null;
   children?: ReactNode;
}
