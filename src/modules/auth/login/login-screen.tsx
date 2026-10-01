'use client';

import { useState } from 'react';

import { linkOptions, useRouter } from '@tanstack/react-router';
import { TriangleAlert } from 'lucide-react';
import { useTranslations } from 'use-intl';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { getApiOrigin, getSiteUrl, safeSitePath } from '@/modules/auth/lib/redirect';
import { LoginFlow, type LoginPanel } from '@/modules/auth/login/login-flow';
import { getRouteHref } from '@/shared/url-state/route-location';

type LoginSearchParams = {
   steam?: 'failed';
   patreon?: 'failed';
   discord?: 'failed';
   mode?: 'password-reset' | 'signup';
   redirectTo?: string;
};

type LoginOAuthProvider = 'steam' | 'patreon' | 'discord';
const loginOAuthProviders: LoginOAuthProvider[] = ['steam', 'patreon', 'discord'];

export function LoginScreen({ params }: { params: LoginSearchParams }) {
   const t = useTranslations();
   const router = useRouter();
   const failedProvider = loginOAuthProviders.find((provider) => params[provider] === 'failed') ?? null;
   const redirectTo = safeSitePath(params.redirectTo, '/');
   const absoluteRedirectTo = getSiteUrl(redirectTo);
   const initialPanel: LoginPanel = params.mode === 'password-reset' ? 'password' : params.mode === 'signup' ? 'signup' : 'providers';
   const [activePanel, setActivePanel] = useState<LoginPanel>(initialPanel);
   const showIntro = activePanel === 'providers';
   const providerLabels = {
      scoresaber: t('common.scoreSaber'),
      steam: t('common.providers.STEAM'),
      meta: t('common.providers.OCULUS'),
      patreon: t('common.providers.PATREON'),
      discord: t('common.providers.DISCORD')
   };

   return (
      <div className="relative flex min-h-dvh flex-1 items-center justify-center overflow-hidden px-4 pt-10 pb-28">
         <section className="relative z-10 flex w-full max-w-xl flex-col items-center gap-6 text-center">
            {showIntro && (
               <div className="flex flex-col gap-2">
                  <h1 className="text-2xl font-semibold text-balance">
                     {t('login.titlePrefix')}{' '}
                     <span className="font-pixel font-medium tracking-widest whitespace-nowrap [-webkit-text-stroke:0.8px_currentColor]">
                        {t('common.scoreSaber')}
                     </span>
                  </h1>
                  <p className="text-muted-foreground text-sm text-pretty">{t('login.subtitle')}</p>
               </div>
            )}

            {failedProvider && (
               <Alert variant="destructive" className="max-w-sm text-left">
                  <TriangleAlert aria-hidden />
                  <AlertTitle>
                     {t('login.oauth.failedTitle', {
                        provider: providerLabels[failedProvider]
                     })}
                  </AlertTitle>
                  <AlertDescription>{t('login.oauth.failedDescription')}</AlertDescription>
               </Alert>
            )}

            <LoginFlow
               steamHref={getRouteHref(
                  router,
                  linkOptions({ to: '/auth/steam', search: { intent: 'login', returnUrl: getApiOrigin(), redirectTo: absoluteRedirectTo } })
               )}
               patreonHref={getRouteHref(router, linkOptions({ to: '/auth/patreon', search: { intent: 'login', redirectTo: absoluteRedirectTo } }))}
               discordHref={getRouteHref(router, linkOptions({ to: '/auth/discord', search: { intent: 'login', redirectTo: absoluteRedirectTo } }))}
               redirectTo={redirectTo}
               labels={providerLabels}
               metaTooltip={t('login.metaProviderTooltip')}
               showOtherMethodsLabel={t('login.showOtherMethods')}
               hideOtherMethodsLabel={t('login.hideOtherMethods')}
               secondaryDescription={t('login.secondaryDescription')}
               backLabel={t('common.back')}
               metaTitle={t('login.email.title')}
               initialPanel={initialPanel}
               passwordInitialMode={params.mode === 'password-reset' ? 'reset' : 'login'}
               onPanelChange={setActivePanel}
            />
         </section>
      </div>
   );
}
