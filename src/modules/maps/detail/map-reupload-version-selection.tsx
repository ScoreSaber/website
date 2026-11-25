'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';

import { useRouter } from '@tanstack/react-router';
import { Select as SelectPrimitive } from 'radix-ui';
import { FaArchive } from 'react-icons/fa';
import { useLocale, useTranslations } from 'use-intl';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import type { LeaderboardSearchParams } from '@/modules/maps/detail/map-leaderboard-view/map-leaderboard-view-types';
import { getDisplayLeaderboards } from '@/modules/maps/map-leaderboards';
import type { MapControllerGetMapByIdResponse } from '@/shared/api/generated/ApiParams';
import { Icons } from '@/shared/components/icons';
import { cn } from '@/shared/format/helpers';

type ReuploadVersion = MapControllerGetMapByIdResponse['reuploadVersions'][number];
type VersionLeaderboard = ReuploadVersion['leaderboards'][number];

interface MapReuploadVersionSelectionProps {
   mapInfo: MapControllerGetMapByIdResponse;
   activeLeaderboardId: number;
   linkSearchParams?: LeaderboardSearchParams;
   className?: string;
   triggerVariant?: 'filter' | 'icon';
}

export function MapReuploadVersionSelection({
   mapInfo,
   activeLeaderboardId,
   linkSearchParams,
   className,
   triggerVariant = 'filter'
}: MapReuploadVersionSelectionProps) {
   const t = useTranslations('map');
   const locale = useLocale();
   const router = useRouter();
   const [, startTransition] = useTransition();
   const dateFormatter = useMemo(() => new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', year: 'numeric' }), [locale]);
   const activeLeaderboard = mapInfo.leaderboards.find((leaderboard) => leaderboard.id === activeLeaderboardId) ?? mapInfo.leaderboards[0];
   const options = activeLeaderboard ? buildVersionOptions(mapInfo, activeLeaderboard, dateFormatter) : [];
   const activeOption =
      options.find((option) => option.mapId === mapInfo.id && option.leaderboardId === activeLeaderboardId) ??
      options.find((option) => option.mapId === mapInfo.id) ??
      options[0];
   const activeValue = activeOption?.value ?? '';
   const [pendingValue, setPendingValue] = useState(activeValue);
   const isLoading = pendingValue !== activeValue;
   const linkSearch = { ...linkSearchParams, page: linkSearchParams?.page ?? 1 };

   useEffect(() => {
      setPendingValue(activeValue);
   }, [activeValue]);

   if (options.length <= 1 || !activeOption) {
      return null;
   }

   function handleValueChange(value: string) {
      const option = options.find((candidate) => candidate.value === value);
      if (!option || option.value === activeValue) return;

      setPendingValue(option.value);
      startTransition(() => {
         void router.navigate({
            to: '/map/$id/difficulty/$leaderboardId',
            params: { id: option.mapId, leaderboardId: option.leaderboardId },
            search: linkSearch
         });
      });
   }

   const trigger =
      triggerVariant === 'icon' ? (
         <Tooltip suppressFocusOpen>
            <TooltipTrigger asChild>
               <SelectPrimitive.Trigger asChild aria-label={t('version')}>
                  <Button variant="secondary" size="icon-xs" className={cn('border-border/70 h-6 w-6 rounded-full border', className)}>
                     {isLoading ? <Icons.spinner className="size-3 animate-spin" /> : <FaArchive className="size-2.5 shrink-0" />}
                  </Button>
               </SelectPrimitive.Trigger>
            </TooltipTrigger>
            <TooltipContent side="top">{t('version')}</TooltipContent>
         </Tooltip>
      ) : (
         <SelectTrigger variant="filter" size="compact" className={cn('min-w-0 shadow-none', className)}>
            <SelectValue aria-label={activeOption.label}>
               <span className="flex min-w-0 items-center gap-1.5">
                  {isLoading ? <Icons.spinner className="size-3 animate-spin" /> : <FaArchive className="size-2.5 shrink-0" />}
                  <span className="truncate">{activeOption.shortLabel}</span>
                  <span className="text-muted-foreground/70 hidden text-[10px] md:inline">#{activeOption.mapId}</span>
               </span>
            </SelectValue>
         </SelectTrigger>
      );

   return (
      <Select value={activeValue} onValueChange={handleValueChange} disabled={isLoading}>
         {trigger}
         <SelectContent position="popper" align="start">
            <SelectGroup>
               <SelectLabel>{t('version')}</SelectLabel>
               {options.map((option) => (
                  <SelectItem key={option.value} value={option.value} textValue={option.label} className="cursor-pointer">
                     <span className="truncate">{option.shortLabel}</span>
                  </SelectItem>
               ))}
            </SelectGroup>
         </SelectContent>
      </Select>
   );
}

function buildVersionOptions(
   mapInfo: MapControllerGetMapByIdResponse,
   activeLeaderboard: MapControllerGetMapByIdResponse['leaderboards'][number],
   dateFormatter: Intl.DateTimeFormat
) {
   return mapInfo.reuploadVersions.flatMap((version) => {
      const leaderboard = getVersionLeaderboard(version, activeLeaderboard);
      if (!leaderboard) return [];

      const shortLabel = dateFormatter.format(new Date(version.createdAt));

      return [
         {
            value: `${version.id}:${leaderboard.id}`,
            mapId: version.id,
            leaderboardId: leaderboard.id,
            shortLabel,
            label: shortLabel
         }
      ];
   });
}

function getVersionLeaderboard(version: ReuploadVersion, activeLeaderboard: VersionLeaderboard) {
   const displayLeaderboards = getDisplayLeaderboards(version.leaderboards, activeLeaderboard.gameMode);
   return (
      displayLeaderboards.find(
         (leaderboard) => leaderboard.rawDifficulty === activeLeaderboard.rawDifficulty && leaderboard.difficulty === activeLeaderboard.difficulty
      ) ??
      displayLeaderboards.find((leaderboard) => leaderboard.difficulty === activeLeaderboard.difficulty) ??
      displayLeaderboards[0]
   );
}
