'use client';

import type { ComponentType } from 'react';
import { useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { getRouteApi, linkOptions, useRouter } from '@tanstack/react-router';
import { ExternalLink, KeyRound, Loader2, LockKeyhole, LogIn, RefreshCw, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslations } from 'use-intl';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { useActionMutation } from '@/hooks/use-action-mutation';
import { useAuth } from '@/modules/auth';
import { refreshPatreonBenefits, removeConnection, switchPrimaryConnection } from '@/modules/settings/actions/connections';
import { AccountMergeDialog } from '@/modules/settings/sections/account-merge-dialog';
import {
   USER_CONTROLLER_REMOVE_CONNECTION_PROVIDER,
   type UserControllerGetAccountMergeChallengeResponse,
   type UserControllerGetConnectionsItem
} from '@/shared/api/generated/ApiParams';
import { Icons } from '@/shared/components/icons';
import { Image } from '@/shared/components/image';
import { cn } from '@/shared/format/helpers';
import { getRouteHref } from '@/shared/url-state/route-location';

const loginRoute = getRouteApi('/login');
const settingsAccountRoute = getRouteApi('/settings/account');
const settingsConnectionsRoute = getRouteApi('/settings/connections');

interface ConnectionsSectionProps {
   connections: UserControllerGetConnectionsItem[];
   initialMergeChallengeId: string | null;
   steamFailed: boolean;
}

type ConnectionProvider = UserControllerGetConnectionsItem['provider'];
type MergeProvider = Extract<ConnectionProvider, 'STEAM' | 'OCULUS'>;
type SwitchPrimaryConnection = Extract<Awaited<ReturnType<typeof switchPrimaryConnection>>, { ok: true }>['value'];
type RefreshPatreonBenefits = Extract<Awaited<ReturnType<typeof refreshPatreonBenefits>>, { ok: true }>['value'];

const providers: ConnectionProvider[] = ['SCORESABER', ...USER_CONTROLLER_REMOVE_CONNECTION_PROVIDER];
const primaryProviders: ConnectionProvider[] = ['SCORESABER', 'STEAM', 'OCULUS'];

const secondaryProviderLocations = {
   PATREON: () => linkOptions({ to: '/auth/patreon', search: { intent: 'link' } }),
   DISCORD: () => linkOptions({ to: '/auth/discord', search: { intent: 'link' } })
};

type ProviderIconProps = {
   className?: string;
};

const providerIcons = {
   SCORESABER: ({ className }) => <Image src="/scoresaber.svg" width={20} height={20} alt="" className={className} aria-hidden />,
   STEAM: ({ className }) => <Icons.steam className={className} aria-hidden />,
   OCULUS: ({ className }) => <Icons.meta className={className} aria-hidden />,
   PATREON: ({ className }) => <Icons.patreon className={className} aria-hidden />,
   DISCORD: ({ className }) => <Icons.discordColor className={className} aria-hidden />
} satisfies Record<ConnectionProvider, ComponentType<ProviderIconProps>>;

export function ConnectionsSection({ connections, initialMergeChallengeId, steamFailed }: ConnectionsSectionProps) {
   const t = useTranslations();
   const { user } = useAuth();
   const router = useRouter();
   const queryClient = useQueryClient();
   const mutation = useActionMutation();
   const primarySwitchMutation = useActionMutation<SwitchPrimaryConnection>();
   const patreonRefreshMutation = useActionMutation<RefreshPatreonBenefits>();
   const [localConnections, setLocalConnections] = useState(connections);
   const [mergeProvider, setMergeProvider] = useState<MergeProvider | null>(initialMergeChallengeId || steamFailed ? 'STEAM' : null);
   const [mergeDialogOpen, setMergeDialogOpen] = useState(Boolean(initialMergeChallengeId || steamFailed));
   const byProvider = new Map(localConnections.map((connection) => [connection.provider, connection]));
   const hasMultiplePrimary = primaryProviders.filter((provider) => byProvider.has(provider)).length > 1;
   const providerLabels = {
      SCORESABER: t('common.scoreSaber'),
      STEAM: t('common.providers.STEAM'),
      OCULUS: t('common.providers.OCULUS'),
      PATREON: t('common.providers.PATREON'),
      DISCORD: t('common.providers.DISCORD')
   };

   useEffect(() => {
      if (!initialMergeChallengeId && !steamFailed) return;

      setMergeDialogOpen(true);
      setMergeProvider('STEAM');
   }, [initialMergeChallengeId, steamFailed]);

   useEffect(() => {
      setLocalConnections(connections);
   }, [connections]);

   if (!user) {
      return (
         <div className="flex flex-col items-center justify-center py-12">
            <Button asChild className="cursor-pointer">
               <loginRoute.Link search={{ redirectTo: settingsConnectionsRoute.id }}>
                  <LogIn data-icon="inline-start" />
                  {t('sidebar.logIn')}
               </loginRoute.Link>
            </Button>
         </div>
      );
   }

   function closeMergeDialog(open: boolean) {
      setMergeDialogOpen(open);

      if (open) return;

      setMergeProvider(null);
      if (initialMergeChallengeId || steamFailed) {
         void router.navigate({ to: '/settings/connections', replace: true });
      }
   }

   return (
      <>
         <div className="divide-border/70 divide-y">
            {providers.map((provider) => {
               const connection = byProvider.get(provider);
               const hasConnection = Boolean(connection);
               const isVerified = connection?.state === 'VERIFIED';
               const isSecondary = provider === 'PATREON' || provider === 'DISCORD';
               const isPrimary = provider === 'SCORESABER' || provider === 'STEAM' || provider === 'OCULUS';
               const canConnectSecondary = isSecondary && (!connection || isVerified);
               const canConnectPrimary = isPrimary && !connection;
               const canDisconnect = isSecondary && hasConnection;
               const connectHref = isSecondary ? getRouteHref(router, secondaryProviderLocations[provider]()) : undefined;
               const ProviderIcon = providerIcons[provider];
               const disconnectPending = mutation.isPendingKey(`disconnect-${provider}`);
               const refreshPatreonPending = patreonRefreshMutation.isPending && provider === 'PATREON';
               const switchPrimaryPending = primarySwitchMutation.isPendingKey(`primary-${provider}`);
               const canSwitchPrimary = isPrimary && hasMultiplePrimary && connection && !connection.isPrimary;
               const canRefreshPatreon = provider === 'PATREON' && hasConnection;
               const hasPrimaryConnection = isPrimary && hasConnection;
               const hasHelperText = Boolean(hasPrimaryConnection || (isVerified && isSecondary));

               return (
                  <div
                     key={provider}
                     className={cn(
                        'grid gap-x-3 gap-y-2 py-4 md:flex md:items-center md:justify-between',
                        hasHelperText ? 'grid-cols-[auto_1fr]' : 'grid-cols-[auto_1fr_auto] items-center'
                     )}
                  >
                     <div className="contents md:flex md:min-w-0 md:gap-3">
                        <span className="border-border/60 bg-secondary/35 text-muted-foreground flex size-9 shrink-0 items-center justify-center rounded border">
                           <ProviderIcon className="size-5 fill-current" />
                        </span>
                        <div className="flex min-h-9 min-w-0 flex-col justify-center">
                           <h3 className="flex items-center gap-1.5 leading-5 font-semibold">
                              {providerLabels[provider]}
                              {connection?.isPrimary && <LockKeyhole className="text-muted-foreground size-3.5" />}
                              {connection?.isPrimary && <Badge variant="secondary">{t('settings.connections.merge.primaryBadge')}</Badge>}
                           </h3>
                           {hasPrimaryConnection && (
                              <p className="text-muted-foreground text-xs leading-4 text-pretty">{t('settings.connections.primaryHelper')}</p>
                           )}
                           {isVerified && isSecondary && (
                              <p className="text-muted-foreground text-xs leading-4 text-pretty">{t('settings.connections.legacyUpgradeHelper')}</p>
                           )}
                        </div>
                     </div>
                     <div
                        className={cn(
                           'flex shrink-0 flex-wrap items-center gap-1.5 md:col-start-auto md:gap-2 md:justify-end',
                           hasHelperText ? 'col-start-2' : 'col-start-3 row-start-1 justify-end'
                        )}
                     >
                        {canConnectPrimary && provider === 'STEAM' && (
                           <Button
                              type="button"
                              size="sm"
                              asChild
                              className="h-7 cursor-pointer rounded-sm px-2 text-xs md:h-8 md:rounded-md md:px-2.5 md:text-sm"
                           >
                              <a
                                 href={getRouteHref(
                                    router,
                                    linkOptions({ to: '/auth/steam', search: { intent: 'merge', redirectTo: settingsConnectionsRoute.id } })
                                 )}
                              >
                                 <ExternalLink data-icon="inline-start" />
                                 {t('settings.connections.connect')}
                              </a>
                           </Button>
                        )}
                        {canConnectPrimary && provider === 'SCORESABER' && (
                           <Button
                              type="button"
                              size="sm"
                              asChild
                              className="h-7 cursor-pointer rounded-sm px-2 text-xs md:h-8 md:rounded-md md:px-2.5 md:text-sm"
                           >
                              <settingsAccountRoute.Link search={{ setupPassword: true }} resetScroll={false}>
                                 <KeyRound data-icon="inline-start" />
                                 {t('settings.connections.setup')}
                              </settingsAccountRoute.Link>
                           </Button>
                        )}
                        {canConnectPrimary && provider === 'OCULUS' && (
                           <Button
                              type="button"
                              size="sm"
                              onClick={() => {
                                 setMergeProvider('OCULUS');
                                 setMergeDialogOpen(true);
                              }}
                              className="h-7 rounded-sm px-2 text-xs md:h-8 md:rounded-md md:px-2.5 md:text-sm"
                           >
                              {t('settings.connections.connect')}
                           </Button>
                        )}
                        {canSwitchPrimary && (
                           <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              disabled={primarySwitchMutation.isPending}
                              onClick={() =>
                                 primarySwitchMutation.mutateKeyed(`primary-${provider}`, () => switchPrimaryConnection(provider), {
                                    onSuccess: (result) => {
                                       queryClient.clear();
                                       toast.success(
                                          t('settings.connections.merge.primarySwitched', {
                                             provider: providerLabels[result.provider],
                                             publicPlayerId: result.publicPlayerId
                                          })
                                       );
                                    },
                                    onError: () => toast.error(t('settings.connections.merge.primarySwitchFailedTitle'))
                                 })
                              }
                              className="h-7 cursor-pointer rounded-sm px-2 text-xs md:h-8 md:rounded-md md:px-2.5 md:text-sm"
                           >
                              {switchPrimaryPending ? (
                                 <Loader2 data-icon="inline-start" className="animate-spin" />
                              ) : (
                                 <RefreshCw data-icon="inline-start" />
                              )}
                              {t('settings.connections.merge.switchPrimary')}
                           </Button>
                        )}
                        {canConnectSecondary && connectHref && (
                           <Button
                              type="button"
                              size="sm"
                              asChild
                              className="h-7 cursor-pointer rounded-sm px-2 text-xs md:h-8 md:rounded-md md:px-2.5 md:text-sm"
                           >
                              <a href={connectHref}>
                                 <ExternalLink data-icon="inline-start" />
                                 {isVerified ? t('settings.connections.upgrade') : t('settings.connections.connect')}
                              </a>
                           </Button>
                        )}
                        {canRefreshPatreon && (
                           <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              disabled={patreonRefreshMutation.isPending || mutation.isPending}
                              onClick={() =>
                                 patreonRefreshMutation.mutate(() => refreshPatreonBenefits(), {
                                    onSuccess: () => {
                                       queryClient.clear();
                                       toast.success(t('settings.connections.refreshed'));
                                    },
                                    onError: () => toast.error(t('settings.connections.refreshFailed'))
                                 })
                              }
                              className="h-7 cursor-pointer rounded-sm px-2 text-xs md:h-8 md:rounded-md md:px-2.5 md:text-sm"
                           >
                              {refreshPatreonPending ? (
                                 <Loader2 data-icon="inline-start" className="animate-spin" />
                              ) : (
                                 <RefreshCw data-icon="inline-start" />
                              )}
                              {t('settings.connections.refresh')}
                           </Button>
                        )}
                        {canDisconnect && (
                           <Button
                              type="button"
                              size="sm"
                              variant="destructive"
                              disabled={mutation.isPending}
                              onClick={() =>
                                 mutation.runKeyed(
                                    `disconnect-${provider}`,
                                    () => removeConnection(provider),
                                    t('settings.connections.removed'),
                                    t('settings.connections.removeFailed')
                                 )
                              }
                              className="h-7 cursor-pointer rounded-sm px-2 text-xs md:h-8 md:rounded-md md:px-2.5 md:text-sm"
                           >
                              {disconnectPending ? (
                                 <Loader2 data-icon="inline-start" className="animate-spin" />
                              ) : (
                                 <Trash2 data-icon="inline-start" />
                              )}
                              {t('settings.connections.disconnect')}
                           </Button>
                        )}
                     </div>
                  </div>
               );
            })}
         </div>

         <AccountMergeDialog
            open={mergeDialogOpen}
            onOpenChange={closeMergeDialog}
            proofProvider={mergeProvider}
            initialChallengeId={initialMergeChallengeId}
            steamFailed={steamFailed}
            onMerged={(challenge) => setLocalConnections((current) => mergeConnections(current, challenge))}
         />
      </>
   );
}

function mergeConnections(connections: UserControllerGetConnectionsItem[], challenge: UserControllerGetAccountMergeChallengeResponse) {
   const existingByProvider = new Map(connections.map((connection) => [connection.provider, connection]));

   for (const player of [challenge.targetPlayer, challenge.sourcePlayer]) {
      if (existingByProvider.has(player.provider)) continue;

      existingByProvider.set(player.provider, {
         id: 0,
         provider: player.provider,
         providerAccountId: player.providerAccountId,
         state: 'CONNECTED',
         source: player.provider === 'STEAM' ? 'STEAM_OPENID' : 'GAME_AUTH',
         isPrimary: player.provider === challenge.targetPlayer.provider,
         connectedAt: null,
         tokenBacked: false
      });
   }

   return providers.flatMap((provider) => {
      const connection = existingByProvider.get(provider);
      return connection ? [connection] : [];
   });
}
