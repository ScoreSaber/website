import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

import { AccountSection } from '@/modules/settings/sections/account-section';
import { SecuritySection } from '@/modules/settings/sections/security-section';
import { SettingsShell } from '@/modules/settings/settings-shell';
import { getClientRequestHeaders } from '@/shared/api/client-request.server';
import { api } from '@/shared/api/server-api';
import { optionalApi } from '@/shared/result/api';
import { buildNoindexHead } from '@/shared/seo/metadata';
import { requestOrNotFound } from '@/shared/url-state/params';
import { SetPageBackground } from '@/shell/background/page-background-provider';

const trueSearchParamSchema = z
   .union([
      z.literal(true),
      z.literal('true'),
      z
         .tuple([z.union([z.literal(true), z.literal('true')])])
         .rest(z.unknown())
         .transform(([value]) => value)
   ])
   .transform(() => true)
   .optional();
const accountSettingsSearchSchema = z.object({ setupPassword: trueSearchParamSchema });

const getAccountSettingsData = createServerFn({ method: 'GET' }).handler(async () => {
   const [countryReset, connections, passkeys, credential, vanity] = await Promise.all([
      optionalApi(api.user.userControllerCanResetCountry({ headers: getClientRequestHeaders() }).then((r) => r.data)),
      optionalApi(api.user.userControllerGetConnections().then((r) => r.data)),
      optionalApi(api.auth.passkeyControllerListPasskeys().then((r) => r.data.passkeys)),
      optionalApi(api.auth.passwordAuthControllerGetPasswordCredential().then((r) => r.data)),
      optionalApi(api.user.userControllerGetVanity({ cache: 'no-store' }).then((r) => r.data))
   ]);

   return {
      countryReset,
      passkeys,
      credential,
      vanity,
      patreonConnected: connections?.some((connection) => connection.provider === 'PATREON' && connection.state === 'CONNECTED') ?? false
   };
});

export const Route = createFileRoute('/settings/account')({
   validateSearch: (search) => requestOrNotFound(accountSettingsSearchSchema.safeParse(search)),
   loader: () => getAccountSettingsData(),
   head: () => buildNoindexHead('Account Settings', 'Manage your ScoreSaber account settings', '/settings/account'),
   component: SettingsAccountRoute
});

function SettingsAccountRoute() {
   const data = Route.useLoaderData();
   const search = Route.useSearch();

   return (
      <>
         <SetPageBackground src="/images/banner.jpg" />
         <SettingsShell activeTab="account">
            <AccountSection
               countryReset={data.countryReset}
               vanity={data.vanity}
               patreonConnected={data.patreonConnected}
               beforeActions={<SecuritySection passkeys={data.passkeys} credential={data.credential} openPasswordSetup={search.setupPassword} />}
            />
         </SettingsShell>
      </>
   );
}
