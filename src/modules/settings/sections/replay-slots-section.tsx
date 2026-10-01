'use client';

import { getRouteApi } from '@tanstack/react-router';
import { Database, ExternalLink, Loader2, LockKeyhole, LogIn, ShieldCheck } from 'lucide-react';
import { useTranslations } from 'use-intl';

import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

import { useActionMutation } from '@/hooks/use-action-mutation';
import { useAuth } from '@/modules/auth';
import { claimReplaySlot, releaseReplaySlot } from '@/modules/settings/actions/perks';
import type { ScoreControllerGetScoreResponse, UserControllerGetReplaySlotsResponse } from '@/shared/api/generated/ApiParams';
import { FadeInImage } from '@/shared/components/fade-in-image';
import { Icons } from '@/shared/components/icons';
import { cn, formatNumber, formatPP, formatStars } from '@/shared/format/helpers';
import { getDifficultyLabel } from '@/shared/format/strings';
import { isLeaderboardRanked } from '@/shared/format/styling';
import Permissions from '@/shared/permissions';

const loginRoute = getRouteApi('/login');
const mapDifficultyRoute = getRouteApi('/map/$id/difficulty/$leaderboardId');
const replaysRoute = getRouteApi('/settings/perks/replays');

type ReplaySlot = UserControllerGetReplaySlotsResponse['slots'][number];
type ReplayScoreDetails = Record<number, ScoreControllerGetScoreResponse | null>;

interface ReplaySlotsSectionProps {
   replaySlots: UserControllerGetReplaySlotsResponse | null;
   scoreDetails: ReplayScoreDetails;
}

const replayPruneGraceDays = 30;
const baseRowGridClass = 'grid grid-cols-[minmax(0,1fr)_auto] gap-3 px-3 py-2.5 lg:items-center';
const protectedRowGridClass = cn(baseRowGridClass, 'lg:grid-cols-[minmax(0,1.7fr)_8.5rem_5rem_4rem_auto]');
const claimableRowGridClass = cn(baseRowGridClass, 'lg:grid-cols-[7.5rem_minmax(0,1.7fr)_8.5rem_5rem_4rem_auto]');

export function ReplaySlotsSection({ replaySlots, scoreDetails }: ReplaySlotsSectionProps) {
   const t = useTranslations();
   const { user } = useAuth();
   const mutation = useActionMutation();

   if (!user) {
      return (
         <div className="flex flex-col items-center justify-center py-12">
            <Button asChild className="cursor-pointer">
               <loginRoute.Link search={{ redirectTo: replaysRoute.id }}>
                  <LogIn data-icon="inline-start" />
                  {t('sidebar.logIn')}
               </loginRoute.Link>
            </Button>
         </div>
      );
   }

   if (!replaySlots) {
      return (
         <Card variant="settings">
            <CardContent className="text-muted-foreground px-5 py-8 text-sm">{t('settings.perks.replaySlots.loadFailed')}</CardContent>
         </Card>
      );
   }

   const isAtLimit = replaySlots.used >= replaySlots.limit;
   const permissions = user.permissions;
   const isPPFarmer = Permissions.isPPFarmer(permissions);
   const isSupporter = Permissions.isSupporter(permissions);
   const showCta = !isPPFarmer && (isSupporter || replaySlots.limit <= 25);

   return (
      <Card variant="settings">
         <CardHeader className="gap-4 px-5">
            <div className="min-w-0">
               <CardTitle className="text-xl">{t('settings.perks.replaySlots.title')}</CardTitle>
               <p className="text-muted-foreground mt-1 text-sm">{t('settings.perks.replaySlots.description')}</p>
            </div>
            <CardAction className="flex shrink-0 flex-col gap-2 sm:flex-row">
               <div className="border-border/70 bg-secondary/20 flex h-9 items-center gap-2 rounded-md border px-3 text-sm">
                  <Database className="text-muted-foreground size-4" aria-hidden />
                  <span className="tabular-nums">
                     {formatNumber(replaySlots.used)} / {formatNumber(replaySlots.limit)} {t('settings.perks.replaySlots.used')}
                  </span>
               </div>
               {showCta && (
                  <Button variant="outline" size="sm" asChild className="cursor-pointer justify-start">
                     <a href="https://patreon.com/scoresaber/membership" target="_blank" rel="noreferrer">
                        <Icons.patreon data-icon="inline-start" className="size-4 fill-current text-[#ff424d]" />
                        {isSupporter ? t('settings.perks.replaySlots.supporterCta') : t('settings.perks.replaySlots.patreonCta')}
                        <ExternalLink className="size-3" aria-hidden />
                     </a>
                  </Button>
               )}
            </CardAction>
         </CardHeader>
         <CardContent className="flex flex-col gap-6 px-5">
            <ReplayList
               title={t('settings.perks.replaySlots.protectedTitle')}
               description={t('settings.perks.replaySlots.protectedDescription')}
               emptyText={t('settings.perks.replaySlots.emptyProtected')}
               actionLabel={t('settings.perks.replaySlots.releaseAction')}
               pendingActionLabel={t('settings.perks.replaySlots.releasingAction')}
               items={replaySlots.slots}
               scoreDetails={scoreDetails}
               actionVariant="outline"
               showTimeRemaining={false}
               isActionPending={(scoreId) => mutation.isPendingKey(`release-${scoreId}`)}
               actionDisabled={mutation.isPending}
               onAction={(scoreId) =>
                  mutation.runKeyed(
                     `release-${scoreId}`,
                     () => releaseReplaySlot(scoreId),
                     t('settings.perks.replaySlots.releasedToast'),
                     t('settings.perks.replaySlots.releaseFailedToast')
                  )
               }
            />
            <ReplayList
               title={t('settings.perks.replaySlots.claimableTitle')}
               description={isAtLimit ? t('settings.perks.replaySlots.limitDescription') : t('settings.perks.replaySlots.claimableDescription')}
               emptyText={t('settings.perks.replaySlots.emptyClaimable')}
               actionLabel={t('settings.perks.replaySlots.claimAction')}
               pendingActionLabel={t('settings.perks.replaySlots.claimingAction')}
               items={replaySlots.claimable}
               scoreDetails={scoreDetails}
               actionVariant="default"
               showTimeRemaining
               isActionPending={(scoreId) => mutation.isPendingKey(`claim-${scoreId}`)}
               actionDisabled={mutation.isPending || isAtLimit}
               onAction={(scoreId) =>
                  mutation.runKeyed(
                     `claim-${scoreId}`,
                     () => claimReplaySlot(scoreId),
                     t('settings.perks.replaySlots.claimedToast'),
                     t('settings.perks.replaySlots.claimFailedToast')
                  )
               }
            />
         </CardContent>
      </Card>
   );
}

interface ReplayListProps {
   title: string;
   description: string;
   emptyText: string;
   actionLabel: string;
   pendingActionLabel: string;
   items: ReplaySlot[];
   scoreDetails: ReplayScoreDetails;
   actionVariant: 'default' | 'outline';
   showTimeRemaining: boolean;
   actionDisabled: boolean;
   isActionPending: (scoreId: number) => boolean;
   onAction: (scoreId: number) => void;
}

function ReplayList({
   title,
   description,
   emptyText,
   actionLabel,
   pendingActionLabel,
   items,
   scoreDetails,
   actionVariant,
   showTimeRemaining,
   actionDisabled,
   isActionPending,
   onAction
}: ReplayListProps) {
   const t = useTranslations();

   return (
      <section className="min-w-0">
         <div className="mb-2">
            <h2 className="text-base font-semibold">{title}</h2>
            <p className="text-muted-foreground text-sm">{description}</p>
         </div>
         <div className="border-border/70 overflow-hidden rounded-md border">
            <div
               className={cn(
                  showTimeRemaining ? claimableRowGridClass : protectedRowGridClass,
                  'text-muted-foreground bg-secondary/20 hidden border-b text-xs lg:grid'
               )}
            >
               {showTimeRemaining && <span>{t('settings.perks.replaySlots.timeRemainingColumn')}</span>}
               <span>{t('settings.perks.replaySlots.songColumn')}</span>
               <span>{t('settings.perks.replaySlots.difficultyColumn')}</span>
               <span>{t('common.pp')}</span>
               <span>{t('settings.perks.replaySlots.rankColumn')}</span>
               <span className="sr-only">{t('settings.perks.replaySlots.actionColumn')}</span>
            </div>
            {items.length === 0 ? (
               <div className="text-muted-foreground px-3 py-6 text-sm">{emptyText}</div>
            ) : (
               <ScrollArea className="h-[17rem]">
                  <div className="divide-border/60 divide-y">
                     {items.map((item) => (
                        <ReplayRow
                           key={item.scoreId}
                           item={item}
                           details={scoreDetails[item.scoreId] ?? null}
                           actionLabel={actionLabel}
                           pendingActionLabel={pendingActionLabel}
                           actionVariant={actionVariant}
                           actionDisabled={actionDisabled}
                           showTimeRemaining={showTimeRemaining}
                           actionPending={isActionPending(item.scoreId)}
                           onAction={() => onAction(item.scoreId)}
                        />
                     ))}
                  </div>
               </ScrollArea>
            )}
         </div>
      </section>
   );
}

interface ReplayRowProps {
   item: ReplaySlot;
   details: ScoreControllerGetScoreResponse | null;
   actionLabel: string;
   pendingActionLabel: string;
   actionVariant: 'default' | 'outline';
   actionDisabled: boolean;
   showTimeRemaining: boolean;
   actionPending: boolean;
   onAction: () => void;
}

function ReplayRow({
   item,
   details,
   actionLabel,
   pendingActionLabel,
   actionVariant,
   actionDisabled,
   showTimeRemaining,
   actionPending,
   onAction
}: ReplayRowProps) {
   const t = useTranslations();
   const leaderboard = details?.leaderboard;
   const score = details?.score;
   const isRanked = leaderboard ? isLeaderboardRanked(leaderboard) : false;
   const difficulty = leaderboard
      ? `${getDifficultyLabel(leaderboard.difficulty.difficulty)}${isRanked ? ` (${formatStars(leaderboard.realm.stars)})` : ''}`
      : t('settings.perks.replaySlots.unknownDifficulty');
   const leaderboardSearch = { page: 1, highlight: score?.id };
   const rowContent = (
      <>
         {showTimeRemaining && (
            <div className="text-muted-foreground hidden text-sm tabular-nums lg:block">
               {formatReplayTimeRemaining(item.releasedAt, score?.createdAt, t('settings.perks.replaySlots.unknownValue'))}
            </div>
         )}
         <div className="flex min-w-0 items-center gap-3">
            {leaderboard ? (
               <FadeInImage src={leaderboard.map.coverUrl} alt="" width={40} height={40} className="size-10 rounded object-cover" />
            ) : (
               <span className="border-border/60 bg-secondary/35 text-muted-foreground flex size-10 shrink-0 items-center justify-center rounded border">
                  <LockKeyhole className="size-4" aria-hidden />
               </span>
            )}
            <div className="min-w-0">
               <p className="truncate text-sm font-semibold">
                  {leaderboard?.map.songName ?? t('settings.perks.replaySlots.scoreFallback', { scoreId: item.scoreId })}
               </p>
               <p className="text-muted-foreground truncate text-xs">
                  {leaderboard
                     ? leaderboard.map.songAuthorName
                     : t('settings.perks.replaySlots.leaderboardFallback', { leaderboardId: item.leaderboardId })}
               </p>
            </div>
         </div>
         <div className="text-muted-foreground hidden text-sm lg:block">{difficulty}</div>
         <div className="text-muted-foreground hidden text-sm tabular-nums lg:block">
            {score ? `${formatPP(score.pp)}pp` : t('settings.perks.replaySlots.unknownValue')}
         </div>
         <div className="text-muted-foreground hidden text-sm tabular-nums lg:block">
            {score ? `#${formatNumber(score.rank)}` : t('settings.perks.replaySlots.unknownValue')}
         </div>
      </>
   );

   return (
      <div className={showTimeRemaining ? claimableRowGridClass : protectedRowGridClass}>
         {leaderboard ? (
            <mapDifficultyRoute.Link
               params={{ id: leaderboard.map.id, leaderboardId: leaderboard.id }}
               search={leaderboardSearch}
               className="contents"
            >
               {rowContent}
            </mapDifficultyRoute.Link>
         ) : (
            rowContent
         )}
         <div className="col-start-2 row-span-2 row-start-1 flex justify-end lg:row-span-1">
            <Button
               type="button"
               size="sm"
               variant={actionVariant}
               disabled={actionDisabled}
               onClick={onAction}
               className="h-8 cursor-pointer px-2.5 text-xs"
            >
               {actionPending ? <Loader2 data-icon="inline-start" className="animate-spin" /> : <ShieldCheck data-icon="inline-start" />}
               {actionPending ? pendingActionLabel : actionLabel}
            </Button>
         </div>
         <div className="text-muted-foreground col-span-2 flex flex-wrap gap-x-3 gap-y-1 text-xs lg:hidden">
            {showTimeRemaining && (
               <span>{formatReplayTimeRemaining(item.releasedAt, score?.createdAt, t('settings.perks.replaySlots.unknownValue'))}</span>
            )}
            <span>{difficulty}</span>
            <span>{score ? `${formatPP(score.pp)}pp` : t('settings.perks.replaySlots.unknownValue')}</span>
            <span>{score ? `#${formatNumber(score.rank)}` : t('settings.perks.replaySlots.unknownValue')}</span>
         </div>
      </div>
   );
}

function formatReplayTimeRemaining(releasedAt: string | null, scoreCreatedAt: string | undefined, fallback: string) {
   // TODO: this is a hack just to get us over the line for ScoreSaber 2. use the API deadline once replay slots expose it.
   const basisDate = releasedAt ?? scoreCreatedAt;
   if (!basisDate) return fallback;

   const basisTime = new Date(basisDate).getTime();
   if (!Number.isFinite(basisTime)) return fallback;

   const expiresAt = basisTime + replayPruneGraceDays * 24 * 60 * 60 * 1000;
   const remainingMs = expiresAt - Date.now();
   if (remainingMs <= 0) return fallback;

   const totalHours = Math.ceil(remainingMs / (60 * 60 * 1000));
   const days = Math.floor(totalHours / 24);
   const hours = totalHours % 24;

   if (days > 0 && hours > 0) return `${days}d ${hours}h`;
   if (days > 0) return `${days}d`;
   return `${totalHours}h`;
}
