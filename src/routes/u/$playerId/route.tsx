import { Fragment, useEffect, useRef, type ReactNode } from 'react';

import { createFileRoute, linkOptions } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { Result } from 'better-result';
import { FaTrophy } from 'react-icons/fa';
import { useTranslations } from 'use-intl';
import { z } from 'zod';

import { Separator } from '@/components/ui/separator';

import { readAuthCookie } from '@/modules/auth/actions/session.server';
import type { MetricKey } from '@/modules/player/chart/chart-types';
import { PlayerChartLazy as PlayerChart } from '@/modules/player/chart/player-chart-lazy';
import { getSortedPlayerHistory } from '@/modules/player/chart/player-chart-model';
import { computeDenyahSections } from '@/modules/player/chart/use-denyah-overlay';
import { isDenyah } from '@/modules/player/denyah/denyah';
import { DenyahCursorTrail } from '@/modules/player/denyah/denyah-cursor-trail';
import { DenyahModeProvider } from '@/modules/player/denyah/denyah-mode-context';
import { DenyahPageEffects } from '@/modules/player/denyah/denyah-page-effects';
import { PlayerActions } from '@/modules/player/operations/player-actions';
import { PlayerBioSection } from '@/modules/player/profile/player-bio-section';
import { PlayerPinnedScoresSection } from '@/modules/player/profile/player-pinned-scores-section';
import type { PlayerProfileCustomizationStyle } from '@/modules/player/profile/player-profile-accent';
import { PlayerProfileAccentScope } from '@/modules/player/profile/player-profile-accent-scope';
import { PlayerProfileCustomization } from '@/modules/player/profile/player-profile-customization';
import { PlayerProfileHeader } from '@/modules/player/profile/player-profile-header';
import { PlayerScoresList } from '@/modules/player/profile/player-scores-list';
import { PlayerScoresToolbar } from '@/modules/player/profile/player-scores-toolbar';
import { versionedImageUrl } from '@/modules/player/shared/player-avatar';
import type { UserControllerUpdateProfileCustomizationPayload } from '@/shared/api/generated/Api';
import type {
   AdminUserControllerGetActiveBanResponse,
   PlayerControllerGetPlayerResponse,
   PlayerControllerGetPlayerScoresDataItem,
   PlayerControllerGetPlayerScoresSort
} from '@/shared/api/generated/ApiParams';
import { api, publicApi } from '@/shared/api/server-api';
import { NotFoundCard } from '@/shared/components/error/not-found-card';
import { PageError } from '@/shared/components/error/page-error';
import { Time } from '@/shared/components/time';
import { cn, formatAccuracy, formatNumber, formatPP } from '@/shared/format/helpers';
import { apiResult, optionalApi, optionalApiData, pageApiData } from '@/shared/result/api';
import { hasRichTextContent, sanitizeRichTextHtml } from '@/shared/rich-text/server';
import { buildSeoHead } from '@/shared/seo/metadata';
import { isPageNumber, isPlayerId, isVanitySlug, ScoreEnum, requestOrNotFound } from '@/shared/url-state/params';
import type { SearchParamsRecord } from '@/shared/url-state/search-params';
import { updateSearchParams } from '@/shared/url-state/update-search-params';
import { SetPageBackground } from '@/shell/background/page-background-provider';

const playerParamsSchema = z.object({
   playerId: z.string().refine((value) => isPlayerId.safeParse(value).success || isVanitySlug.safeParse(value.toLowerCase()).success)
});

const playerSearchSchema = z.object({
   sort: ScoreEnum.optional(),
   page: isPageNumber.optional(),
   search: z.string().min(3).max(64).optional()
});

type PlayerProfileSearch = SearchParamsRecord & {
   sort?: PlayerControllerGetPlayerScoresSort;
   page?: number;
   search?: string;
};

type PlayerProfileRouteInput = {
   playerId: string;
   search: PlayerProfileSearch;
};

type ParsePlayerSearch = (search: SearchParamsRecord) => PlayerProfileSearch | null;

type BanMetadataAccess = { visible: false } | { visible: true; record: AdminUserControllerGetActiveBanResponse };

const hiddenBanMetadata: BanMetadataAccess = { visible: false };

type PlayerProfileSectionId = NonNullable<UserControllerUpdateProfileCustomizationPayload['sectionOrder']>[number];
const DEFAULT_PROFILE_SECTION_ORDER: PlayerProfileSectionId[] = ['charts', 'bio', 'pinnedScores', 'scores'];
const REQUIRED_PROFILE_SECTION_IDS: readonly PlayerProfileSectionId[] = ['scores'];

const getPlayerProfilePageData = createServerFn({ method: 'GET' })
   .validator((data: PlayerProfileRouteInput) => data)
   .handler(async ({ data }) => {
      const token = readAuthCookie();
      const profileApi = token ? api : publicApi;
      const playerId = isPlayerId.safeParse(data.playerId).success ? data.playerId : data.playerId.toLowerCase();

      const [profileResult, scores, connections] = await Promise.all([
         pageApiData(profileApi.player.playerControllerGetPlayerProfile({ id: playerId })),
         optionalApiData(
            publicApi.player.playerControllerGetPlayerScores({
               id: playerId,
               limit: 8,
               page: data.search.page ?? 1,
               sort: data.search.sort ?? 'top',
               search: data.search.search
            })
         ),
         token ? optionalApi(api.user.userControllerGetConnections().then((r) => r.data)) : null
      ]);

      if (!profileResult.ok) {
         return {
            result: profileResult,
            scores: null,
            history: null,
            aliases: [],
            patreonConnected: false,
            plusOneRawPP: null,
            sanitizedBio: '',
            hasBioContent: false,
            banMetadata: hiddenBanMetadata
         };
      }

      const { player, history, aliases } = profileResult.data;
      const sanitizedBio = sanitizeRichTextHtml(player.bio ?? '');
      let banMetadata: BanMetadataAccess = hiddenBanMetadata;
      if (token && player.banned) {
         const result = await apiResult(api.adminUser.adminUserControllerGetActiveBan({ id: player.id }, { cache: 'no-store' }));
         if (Result.isOk(result)) banMetadata = { visible: true, record: result.value.data };
      }

      return {
         result: { ok: true, data: player },
         scores,
         history,
         aliases,
         patreonConnected: connections?.some((connection) => connection.provider === 'PATREON' && connection.state === 'CONNECTED') ?? false,
         plusOneRawPP: player.stats.plusOnePP,
         sanitizedBio,
         hasBioContent: hasRichTextContent(sanitizedBio),
         banMetadata
      };
   });

export const Route = createFileRoute('/u/$playerId')({
   params: {
      parse: (params) => requestOrNotFound(playerParamsSchema.safeParse(params))
   },
   validateSearch: (search): PlayerProfileSearch => requestOrNotFound(playerSearchSchema.safeParse(search)),
   loaderDeps: ({ search }) => search,
   loader: ({ params, deps }) =>
      getPlayerProfilePageData({
         data: {
            playerId: params.playerId,
            search: deps
         }
      }),
   head: ({ loaderData }) => buildPlayerProfileHead(loaderData),
   notFoundComponent: () => <NotFoundCard titleKey="playerNotFound" descriptionKey="playerNotFoundDesc" />,
   component: PlayerRoute
});

function PlayerRoute() {
   const params = Route.useParams();
   const search = Route.useSearch();
   const data = Route.useLoaderData();

   return (
      <PlayerProfileRouteContent
         input={{
            playerId: params.playerId,
            search
         }}
         parseSearch={parsePlayerSearch}
         data={data}
      />
   );
}

function parsePlayerSearch(search: SearchParamsRecord) {
   return playerSearchSchema.safeParse({ page: 1, ...search }).data ?? null;
}

function PlayerProfileRouteContent({
   input,
   parseSearch,
   data
}: {
   input: PlayerProfileRouteInput;
   parseSearch: ParsePlayerSearch;
   data: Awaited<ReturnType<typeof getPlayerProfilePageData>>;
}) {
   const { result, scores, history, aliases, patreonConnected, plusOneRawPP, sanitizedBio, hasBioContent, banMetadata } = data;
   const t = useTranslations();
   const denyahContainerRef = useRef<HTMLDivElement | null>(null);

   useVanityBrowserUrl(result.ok ? result.data.vanity : null);

   if (!result.ok) return <PageError status={result.status} />;

   const player = result.data;
   const denyahMode = isDenyah(player.id);
   const currentDenyahSection =
      denyahMode && history?.length ? computeDenyahSections(getSortedPlayerHistory(history).map((entry) => entry.rank)).at(-1) : undefined;
   const denyahBackgroundImage = currentDenyahSection ? `/images/denyah-${currentDenyahSection.isGood ? 'good' : 'bad'}.png` : undefined;

   return (
      <DenyahModeProvider value={denyahMode}>
         <div className="relative flex-1 overflow-hidden">
            <div
               ref={denyahContainerRef}
               className="app-container relative z-10 p-4 md:p-8"
               style={
                  denyahMode
                     ? {
                          fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive',
                          rotate: '2deg',
                          cursor: 'wait',
                          filter: 'hue-rotate(180deg) blur(0.4px) saturate(0.85) contrast(1.06)',
                          imageRendering: 'pixelated',
                          WebkitFontSmoothing: 'none'
                       }
                     : undefined
               }
            >
               {denyahMode && <DenyahPageEffects targetRef={denyahContainerRef} backgroundImage={denyahBackgroundImage ?? player.avatar} />}
               <PlayerProfileCustomization player={player} patreonConnected={patreonConnected}>
                  {({ extraActions, profileCustomization, renderScoreAction }) => {
                     const profileBackgroundImage = profileCustomization.backgroundImage
                        ? versionedImageUrl(profileCustomization.backgroundImage, profileCustomization.backgroundImageVersion)
                        : null;
                     const profileSections =
                        player.banned || player.silenced
                           ? []
                           : buildProfileSections({
                                player,
                                history,
                                scores,
                                input,
                                parseSearch,
                                sanitizedBio,
                                hasBioContent,
                                chartMetricIds: profileCustomization.chartMetricIds,
                                profileCustomization,
                                sectionOrder: profileCustomization.sectionOrder,
                                renderScoreAction
                             });

                     return (
                        <PlayerProfileAccentScope customization={profileCustomization}>
                           {denyahMode && <DenyahCursorTrail />}
                           {!denyahMode && (
                              <SetPageBackground
                                 src={profileBackgroundImage ?? player.avatar}
                                 candidates={profileBackgroundImage ? [profileBackgroundImage, player.avatar] : [player.avatar]}
                              />
                           )}
                           <PlayerProfileHeader
                              player={player}
                              aliases={aliases}
                              customization={profileCustomization}
                              plusOneRawPP={plusOneRawPP}
                              actions={
                                 <PlayerActions
                                    playerId={player.id}
                                    playerBanned={player.banned}
                                    playerSilenced={player.silenced}
                                    playerPermissions={player.permissions}
                                    playerRole={player.role}
                                    mergeTarget={{
                                       id: player.id,
                                       name: player.name,
                                       avatar: player.avatar,
                                       avatarVersion: player.avatarVersion,
                                       country: player.country
                                    }}
                                    extraActions={extraActions}
                                 />
                              }
                           >
                              {player.banned || player.silenced ? (
                                 <div className="py-6 text-center">
                                    <Separator variant="gradient" className="via-destructive/15 mb-4" />
                                    <p className="text-muted-foreground text-sm">{t('player.bannedProfileUnavailable')}</p>
                                    {banMetadata.visible && (
                                       <div className="border-destructive/25 bg-destructive/5 mx-auto mt-4 max-w-2xl rounded-md border p-4 text-left">
                                          {banMetadata.record ? (
                                             <dl className="grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                                                <BanMetadata label={t('player.reason')}>{banMetadata.record.reason}</BanMetadata>
                                                <BanMetadata label={t('player.banMetadata.created')}>
                                                   <Time date={banMetadata.record.createdAt} />
                                                </BanMetadata>
                                                <BanMetadata label={t('player.internalNotes')}>
                                                   {banMetadata.record.notes || t('player.banMetadata.none')}
                                                </BanMetadata>
                                                <BanMetadata label={t('player.banMetadata.automaticUnban')}>
                                                   {banMetadata.record.autoUnban && banMetadata.record.autoUnbansAt ? (
                                                      <Time date={banMetadata.record.autoUnbansAt} />
                                                   ) : (
                                                      t('player.banMetadata.disabled')
                                                   )}
                                                </BanMetadata>
                                                <BanMetadata label={t('player.earliestAppealDate')}>
                                                   {banMetadata.record.earliestAppealDate ? (
                                                      <Time date={banMetadata.record.earliestAppealDate} />
                                                   ) : (
                                                      t('player.banMetadata.none')
                                                   )}
                                                </BanMetadata>
                                             </dl>
                                          ) : (
                                             <p className="text-muted-foreground text-sm">{t('player.banMetadata.legacy')}</p>
                                          )}
                                       </div>
                                    )}
                                 </div>
                              ) : null}

                              {profileSections.map((section, index) => (
                                 <Fragment key={section.id}>{section.render(index > 0)}</Fragment>
                              ))}
                           </PlayerProfileHeader>
                        </PlayerProfileAccentScope>
                     );
                  }}
               </PlayerProfileCustomization>
            </div>
         </div>
      </DenyahModeProvider>
   );
}

function BanMetadata({ label, children }: { label: string; children: ReactNode }) {
   return (
      <div className="min-w-0">
         <dt className="text-muted-foreground text-xs font-medium">{label}</dt>
         <dd className="mt-0.5 break-words">{children}</dd>
      </div>
   );
}

function buildProfileSections({
   player,
   history,
   scores,
   input,
   parseSearch,
   sanitizedBio,
   hasBioContent,
   chartMetricIds,
   profileCustomization,
   sectionOrder,
   renderScoreAction
}: {
   player: PlayerControllerGetPlayerResponse;
   history: Awaited<ReturnType<typeof getPlayerProfilePageData>>['history'];
   scores: Awaited<ReturnType<typeof getPlayerProfilePageData>>['scores'];
   input: PlayerProfileRouteInput;
   parseSearch: ParsePlayerSearch;
   sanitizedBio: string;
   hasBioContent: boolean;
   chartMetricIds?: MetricKey[] | null;
   profileCustomization: PlayerProfileCustomizationStyle;
   sectionOrder?: PlayerProfileSectionId[] | null;
   renderScoreAction?: (score: PlayerControllerGetPlayerScoresDataItem) => ReactNode;
}) {
   const hasEnabledChartMetrics = chartMetricIds == null || chartMetricIds.length > 0;
   const pinnedScores = player.pinnedScores ?? [];
   const sections = new Map<PlayerProfileSectionId, { id: PlayerProfileSectionId; render: (showSeparator: boolean) => ReactNode } | null>([
      [
         'charts',
         !player.inactive && history && history.length > 0 && hasEnabledChartMetrics
            ? {
                 id: 'charts',
                 render: (showSeparator) => (
                    <div className="py-4">
                       {showSeparator && <Separator variant="gradient" className="mb-4" />}
                       <PlayerChart
                          playerId={player.id}
                          stats={{
                             rank: player.stats.rank,
                             totalPP: player.stats.totalPP,
                             averageAccuracy: player.stats.averageAccuracy,
                             totalSubmittedPlays: player.stats.totalSubmittedPlays
                          }}
                          history={history}
                          enabledMetrics={chartMetricIds ?? undefined}
                       />
                    </div>
                 )
              }
            : null
      ],
      [
         'bio',
         {
            id: 'bio',
            render: (showSeparator) => (
               <PlayerBioSection
                  bio={player.bio ?? ''}
                  sanitizedBio={sanitizedBio}
                  hasBioContent={hasBioContent}
                  playerId={player.id}
                  showSeparator={showSeparator}
               />
            )
         }
      ],
      [
         'pinnedScores',
         pinnedScores.length > 0
            ? {
                 id: 'pinnedScores',
                 render: (showSeparator) => <PlayerPinnedScoresSection pinnedScores={pinnedScores} showSeparator={showSeparator} />
              }
            : null
      ],
      [
         'scores',
         scores
            ? {
                 id: 'scores',
                 render: (showSeparator) => (
                    <PlayerScoresSection
                       playerId={input.playerId}
                       scores={scores}
                       page={input.search.page ?? 1}
                       sort={input.search.sort ?? 'top'}
                       search={input.search.search}
                       hasScores={player.stats.totalSubmittedPlays > 0}
                       showSeparator={showSeparator}
                       parseSearch={parseSearch}
                       customization={profileCustomization}
                       renderScoreAction={renderScoreAction}
                    />
                 )
              }
            : null
      ]
   ]);

   return normalizeProfileSectionOrder(sectionOrder)
      .map((sectionId) => sections.get(sectionId))
      .filter((section) => section != null);
}

function normalizeProfileSectionOrder(sectionOrder?: PlayerProfileSectionId[] | null) {
   if (!sectionOrder) return [...DEFAULT_PROFILE_SECTION_ORDER];

   const allowed = new Set(DEFAULT_PROFILE_SECTION_ORDER);
   const seen = new Set<PlayerProfileSectionId>();
   const normalized = sectionOrder.filter((sectionId) => {
      if (!allowed.has(sectionId) || seen.has(sectionId)) return false;
      seen.add(sectionId);
      return true;
   });

   return [
      ...normalized,
      ...DEFAULT_PROFILE_SECTION_ORDER.filter((sectionId) => REQUIRED_PROFILE_SECTION_IDS.includes(sectionId) && !seen.has(sectionId))
   ];
}

export function buildPlayerProfileHead(loaderData: Awaited<ReturnType<typeof getPlayerProfilePageData>> | undefined) {
   if (!loaderData?.result.ok) return playerProfileHead('Profile');

   const player = loaderData.result.data;
   const { stats } = player;
   const globalRank = `${String.fromCodePoint(0x1f30d)} #${formatNumber(stats.rank)} Global`;
   const countryRank = `${getFlagEmoji(player.country)} #${formatNumber(stats.countryRank)} ${player.country.toUpperCase()}`;

   return playerProfileHead(`${player.name}'s Profile`, {
      ogTitle: `${player.name}'s profile`,
      image: versionedImageUrl(player.avatar, player.avatarVersion),
      path: `/u/${player.id}`,
      noindex: player.banned,
      description: [
         `${globalRank} / ${countryRank}`,
         `Performance Points: ${formatPP(stats.totalPP)}pp`,
         `Average Ranked Accuracy: ${formatAccuracy(stats.averageAccuracy)}`,
         `Replay Views: ${formatNumber(stats.totalReplayViews)}`
      ].join('\n')
   });
}

function getFlagEmoji(countryCode: string) {
   return countryCode.toLowerCase().replace(/[a-z]/g, (char) => String.fromCodePoint(char.charCodeAt(0) - 97 + 0x1f1e6));
}

function useVanityBrowserUrl(vanity: string | null) {
   useEffect(() => {
      if (!vanity) return;

      const nextPathname = `/u/${vanity}`;
      if (window.location.pathname === nextPathname) return;

      window.history.replaceState(window.history.state, '', `${nextPathname}${window.location.search}${window.location.hash}`);
   }, [vanity]);
}

function PlayerScoresSection({
   playerId,
   scores,
   page,
   sort,
   search,
   hasScores,
   showSeparator,
   parseSearch,
   customization,
   renderScoreAction
}: {
   playerId: string;
   scores: NonNullable<Awaited<ReturnType<typeof getPlayerProfilePageData>>['scores']>;
   page: number;
   sort: PlayerControllerGetPlayerScoresSort;
   search?: string;
   hasScores: boolean;
   showSeparator: boolean;
   parseSearch: ParsePlayerSearch;
   customization: PlayerProfileCustomizationStyle;
   renderScoreAction?: (score: PlayerControllerGetPlayerScoresDataItem) => ReactNode;
}) {
   const t = useTranslations();
   const currentSearch: PlayerProfileSearch = { sort, page, search };
   const buildLocation = (nextSearch?: Partial<PlayerProfileSearch>) => buildPlayerLocation(playerId, nextSearch);
   const getPageLocation = (nextPage: number) => buildLocation(updateSearchParams(currentSearch, { page: nextPage > 1 ? nextPage : undefined }));

   const hasNoScoresAtAll = !hasScores;

   return (
      <div className={cn('pb-3', !showSeparator && 'pt-4')}>
         {showSeparator && <Separator variant="gradient" className="mb-4" />}
         {!hasNoScoresAtAll && (
            <div className="mb-4 flex justify-center">
               <PlayerScoresToolbar search={currentSearch} buildLocation={buildLocation} parseSearch={parseSearch} customization={customization} />
            </div>
         )}
         {scores.data.length > 0 ? (
            <PlayerScoresList
               playerScores={scores.data}
               totalItems={scores.metadata.totalItems}
               pageSize={scores.metadata.itemsPerPage}
               currentPage={page}
               getPageLocation={getPageLocation}
               renderScoreAction={renderScoreAction}
            />
         ) : (
            <div className="text-muted-foreground flex flex-col items-center gap-2 py-16">
               <FaTrophy className="size-8 opacity-20" />
               <p className="text-sm font-medium">{hasNoScoresAtAll ? t('player.noScoresYet') : t('player.noScoresFound')}</p>
               <p className="text-xs opacity-60">{hasNoScoresAtAll ? t('player.noScoresYetDesc') : t('player.adjustSearch')}</p>
            </div>
         )}
      </div>
   );
}

function buildPlayerLocation(playerId: string, search?: Partial<PlayerProfileSearch>) {
   return linkOptions({ to: '/u/$playerId', params: { playerId }, search: normalizePlayerLocationSearch(search) });
}

function normalizePlayerLocationSearch(search?: Partial<PlayerProfileSearch>) {
   const { sort = 'top', page = 1, ...rest } = search ?? {};
   return {
      sort: sort === 'top' ? undefined : sort,
      page: page > 1 ? page : undefined,
      ...rest
   };
}

function playerProfileHead(
   title: string,
   options: {
      ogTitle?: string;
      description?: string;
      image?: string;
      path?: string;
      noindex?: boolean;
   } = {}
) {
   return buildSeoHead({
      title,
      description: options.description,
      path: options.path,
      image: options.image,
      imageAlt: options.ogTitle ?? title,
      twitterCard: 'summary',
      noindex: options.noindex
   });
}
