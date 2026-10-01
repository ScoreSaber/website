import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { CircleCheck, TriangleAlert } from 'lucide-react';
import { useTranslations } from 'use-intl';
import { z } from 'zod';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { ConnectionsSection } from '@/modules/settings/sections/connections-section';
import { SettingsShell } from '@/modules/settings/settings-shell';
import { api } from '@/shared/api/server-api';
import { optionalApi } from '@/shared/result/api';
import { buildNoindexHead } from '@/shared/seo/metadata';
import { optionalSearchParamEnum, optionalSearchParamString, requestOrNotFound } from '@/shared/url-state/params';
import { SetPageBackground } from '@/shell/background/page-background-provider';

type ConnectionOAuthProvider = 'steam' | 'patreon' | 'discord';
const connectionOAuthProviders: ConnectionOAuthProvider[] = ['steam', 'patreon', 'discord'];
type SettingsConnectionsSearch = ReturnType<typeof settingsConnectionsSearchSchema.parse>;

const settingsConnectionsSearchSchema = z.object({
   accountMergeChallengeId: optionalSearchParamString,
   steam: optionalSearchParamEnum(['connected', 'failed']),
   patreon: optionalSearchParamEnum(['connected', 'failed']),
   discord: optionalSearchParamEnum(['connected', 'failed'])
});

const getConnectionsSettingsData = createServerFn({ method: 'GET' }).handler(async () => {
   return {
      connections: (await optionalApi(api.user.userControllerGetConnections().then((r) => r.data))) ?? []
   };
});

export const Route = createFileRoute('/settings/connections')({
   validateSearch: (search) => requestOrNotFound(settingsConnectionsSearchSchema.safeParse(search)),
   loaderDeps: ({ search }) => search,
   loader: () => getConnectionsSettingsData(),
   head: () => buildNoindexHead('Connections Settings', 'Manage your ScoreSaber connected accounts', '/settings/connections'),
   component: SettingsConnectionsRoute
});

function SettingsConnectionsRoute() {
   const data = Route.useLoaderData();
   const params = Route.useSearch();
   const t = useTranslations();
   const initialMergeChallengeId = params.accountMergeChallengeId ?? null;
   const steamFailed = params.steam === 'failed';
   const oauthStatus = getOAuthStatus(params);
   const oauthProviderLabels = {
      steam: t('common.providers.STEAM'),
      patreon: t('common.providers.PATREON'),
      discord: t('common.providers.DISCORD')
   };

   return (
      <>
         <SetPageBackground src="/images/banner.jpg" />
         <SettingsShell activeTab="connections">
            {oauthStatus && (
               <Alert variant={oauthStatus.status === 'failed' ? 'destructive' : 'default'} className="mb-4">
                  {oauthStatus.status === 'failed' ? <TriangleAlert aria-hidden /> : <CircleCheck aria-hidden />}
                  <AlertTitle>
                     {oauthStatus.status === 'failed'
                        ? t('settings.connections.oauth.failedTitle', {
                             provider: oauthProviderLabels[oauthStatus.provider]
                          })
                        : t('settings.connections.oauth.connectedTitle', {
                             provider: oauthProviderLabels[oauthStatus.provider]
                          })}
                  </AlertTitle>
                  <AlertDescription>
                     {oauthStatus.status === 'failed'
                        ? t('settings.connections.oauth.failedDescription')
                        : t('settings.connections.oauth.connectedDescription')}
                  </AlertDescription>
               </Alert>
            )}
            <ConnectionsSection connections={data.connections} initialMergeChallengeId={initialMergeChallengeId} steamFailed={steamFailed} />
         </SettingsShell>
      </>
   );
}

function getOAuthStatus(params: SettingsConnectionsSearch): { provider: ConnectionOAuthProvider; status: 'connected' | 'failed' } | null {
   for (const provider of connectionOAuthProviders) {
      const status = params[provider];
      if (status === 'connected' || status === 'failed') {
         return { provider, status };
      }
   }

   return null;
}
