'use client';

import { useLocation } from '@tanstack/react-router';
import { Check, Hash } from 'lucide-react';
import { FaClock, FaDrum, FaLink, FaMusic, FaPlay } from 'react-icons/fa';
import { useTranslations } from 'use-intl';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import type { LeaderboardSearchParams, MapLeaderboard } from '@/modules/maps/detail/map-leaderboard-view/map-leaderboard-view-types';
import { MapReuploadVersionSelection } from '@/modules/maps/detail/map-reupload-version-selection';
import { BeatSaverKeyPill } from '@/modules/maps/shared/beatsaver-key-pill';
import { ReplayDialog } from '@/modules/scores/replay-dialog';
import { LinkedNames } from '@/modules/search/search-link';
import type { MapControllerGetMapByIdResponse } from '@/shared/api/generated/ApiParams';
import { CopyButton } from '@/shared/components/copy-button';
import { FadeInImage } from '@/shared/components/fade-in-image';
import { Stat } from '@/shared/components/stat';
import { Time } from '@/shared/components/time';
import { cn, formatNumber } from '@/shared/format/helpers';
import { getNoSoloGameModeLabel } from '@/shared/format/strings';
import { getStatusAccentClass } from '@/shared/format/styling';
import { isLeaderboardPersonalizationParam } from '@/shared/url-state/persisted-filter-preferences';

export function MapLeaderboardHero({ mapInfo, leaderboard, linkSearchParams }: MapLeaderboardHeroProps) {
   const tc = useTranslations();
   const status = leaderboard.realm.leaderboardStatus;

   return (
      <div className="flex flex-col gap-1.5">
         <div className="flex min-w-0 flex-1 items-center gap-4 md:gap-5">
            <FadeInImage
               src={mapInfo.coverUrl}
               alt={mapInfo.songName}
               width={96}
               height={96}
               priority
               className="h-20 w-20 shrink-0 rounded-md object-cover shadow-md outline outline-1 outline-black/10 sm:h-24 sm:w-24 md:h-32 md:w-32 dark:outline-white/10"
            />

            <div className="flex min-w-0 flex-1 flex-col gap-1">
               <div className="flex items-center gap-1.5">
                  <span
                     className={cn(
                        'inline-flex w-fit items-center rounded-full px-2 py-0.5 text-[11px] font-semibold',
                        getStatusAccentClass(status),
                        'text-foreground'
                     )}
                  >
                     {status === 'RANKED'
                        ? tc('map.statusRanked')
                        : status === 'QUALIFIED'
                          ? tc('map.statusQualified')
                          : status === 'LOVED'
                            ? tc('map.statusLoved')
                            : tc('map.statusUnranked')}
                  </span>
                  <ShareMapButton />
                  <CopyMapHashButton hash={mapInfo.hash} />
                  <MapReuploadVersionSelection
                     mapInfo={mapInfo}
                     activeLeaderboardId={leaderboard.id}
                     linkSearchParams={linkSearchParams}
                     triggerVariant="icon"
                  />
                  <MapViewer
                     mapKey={mapInfo.bsid}
                     difficulty={leaderboard.difficulty}
                     gameMode={leaderboard.gameMode}
                  />
               </div>

               <h1 className="min-w-0 text-base leading-tight text-pretty sm:text-lg md:text-xl">
                  <span className="font-bold">
                     {mapInfo.songName}
                     {mapInfo.songSubName ? ` ${mapInfo.songSubName}` : ''}
                  </span>{' '}
                  <span className="text-muted-foreground text-sm font-normal md:text-base">
                     {tc('common.by')} <LinkedNames name={mapInfo.songAuthorName} />
                  </span>
               </h1>

               <p className="text-muted-foreground text-xs">
                  {tc('common.mappedBy')} <LinkedNames name={mapInfo.levelAuthorName} splitCommas />
               </p>

               {/* stats inline on desktop */}
               <div className="mt-1 hidden md:block">
                  <MapStats mapInfo={mapInfo} />
               </div>
            </div>
         </div>

         {/* stats below cover on mobile */}
         <div className="md:hidden">
            <MapStats mapInfo={mapInfo} />
         </div>
      </div>
   );
}

function MapStats({ mapInfo }: { mapInfo: MapControllerGetMapByIdResponse }) {
   const t = useTranslations();
   return (
      <div className="flex flex-wrap items-center gap-2">
         <Stat icon={FaDrum} label="BPM">
            {mapInfo.bpm}
         </Stat>
         <Stat icon={FaMusic} label={t('common.totalPlays')}>
            {formatNumber(mapInfo.totalScores)}
         </Stat>
         <Stat icon={FaClock} label={t('map.created')}>
            <Time date={mapInfo.createdAt} short />
         </Stat>
         {mapInfo.bsid && <BeatSaverKeyPill beatSaverKey={mapInfo.bsid} variant="copy" size="sm" className="bg-secondary/35 rounded-md" />}
      </div>
   );
}

function ShareMapButton() {
   const location = useLocation();
   const t = useTranslations();

   function getShareLink() {
      const url = new URL(location.href, window.location.origin);
      const personalizationKeys = Array.from(url.searchParams.keys()).filter(isLeaderboardPersonalizationParam);

      for (const key of personalizationKeys) {
         url.searchParams.delete(key);
      }

      return url.toString();
   }

   return (
      <Tooltip>
         <TooltipTrigger asChild>
            <CopyButton
               value={getShareLink}
               icon={<FaLink className="size-2.5" />}
               copiedIcon={<Check className="size-2.5" />}
               aria-label={t('map.copyShareLink')}
               title={t('map.copyShareLink')}
               errorMessage={t('map.shareLinkCopyFailed')}
            >
               {({ buttonProps, icon }) => (
                  <Button
                     {...buttonProps}
                     variant="secondary"
                     size="icon-xs"
                     className={cn('border-border/70 h-6 w-6 cursor-pointer rounded-full border', buttonProps.className)}
                  >
                     {icon}
                  </Button>
               )}
            </CopyButton>
         </TooltipTrigger>
         <TooltipContent>{t('map.copyShareLink')}</TooltipContent>
      </Tooltip>
   );
}

function CopyMapHashButton({ hash }: { hash: string }) {
   const t = useTranslations();

   return (
      <Tooltip>
         <TooltipTrigger asChild>
            <CopyButton
               value={hash}
               icon={<Hash className="size-2.5" />}
               copiedIcon={<Check className="size-2.5" />}
               aria-label={t('map.copyMapHash')}
               title={t('map.copyMapHash')}
               errorMessage={t('map.mapHashCopyFailed')}
            >
               {({ buttonProps, icon }) => (
                  <Button
                     {...buttonProps}
                     variant="secondary"
                     size="icon-xs"
                     className={cn('border-border/70 h-6 w-6 cursor-pointer rounded-full border', buttonProps.className)}
                  >
                     {icon}
                  </Button>
               )}
            </CopyButton>
         </TooltipTrigger>
         <TooltipContent>{t('map.copyMapHash')}</TooltipContent>
      </Tooltip>
   );
}

function MapViewer({ mapKey, difficulty, gameMode }: { mapKey?: string | null; difficulty?: number | null; gameMode?: string | null }) {
   const t = useTranslations();

   if (!mapKey) {
      return null;
   }

   const characteristicParam = encodeURIComponent(gameMode ? getNoSoloGameModeLabel(gameMode) : '');
   const difficultyParam = encodeURIComponent(difficulty != null ? difficulty : '');

   return (
      <ReplayDialog
         mapId={`https://watch.scoresaber.com/?map=${encodeURIComponent(mapKey)}&difficulty=${difficultyParam}&characteristic=${characteristicParam}`}
         tooltip={t('score.replayViewer')}
         trigger={({ replayUrl, openReplayAction }) => (
            <Button variant="secondary" size="icon-xs" asChild className="border-border/70 h-6 w-6 cursor-pointer rounded-full border">
               <a href={replayUrl} target="_blank" rel="noopener noreferrer" onClick={openReplayAction} aria-label={t('score.replayViewer')}>
                  <FaPlay className="size-2.5" />
               </a>
            </Button>
         )}
      />
   );
}

interface MapLeaderboardHeroProps {
   mapInfo: MapControllerGetMapByIdResponse;
   leaderboard: MapLeaderboard;
   linkSearchParams?: LeaderboardSearchParams;
}
