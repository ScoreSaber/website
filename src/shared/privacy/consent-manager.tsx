'use client';

import '@c15t/react/styles.css';

import { type ReactNode, useMemo } from 'react';

import { ConsentBanner, ConsentButton, ConsentDialog, ConsentManagerProvider, type Theme, type Translations } from '@c15t/react';
import { getRouteApi } from '@tanstack/react-router';
import { useLocale, useTranslations } from 'use-intl';

import { consentStorageKey } from '@/shared/privacy/consent-storage';

const privacyRoute = getRouteApi('/legal/privacy');
const cookiesPolicyRoute = getRouteApi('/legal/cookies-policy');

const consentColors = {
   primary: 'var(--primary)',
   primaryHover: 'color-mix(in srgb, var(--primary) 88%, var(--foreground))',
   surface: 'var(--card)',
   surfaceHover: 'var(--secondary)',
   border: 'var(--border)',
   borderHover: 'color-mix(in srgb, var(--border) 70%, var(--foreground))',
   text: 'var(--foreground)',
   textMuted: 'var(--muted-foreground)',
   textOnPrimary: 'var(--primary-foreground)',
   overlay: 'color-mix(in srgb, var(--overlay) 62%, transparent)',
   switchTrack: 'var(--muted)',
   switchTrackActive: 'var(--primary)',
   switchThumb: 'var(--card)'
};

const consentTheme: Theme = {
   colors: consentColors,
   dark: consentColors,
   typography: {
      fontFamily: 'var(--font-sans)',
      fontSize: {
         sm: '0.8125rem',
         base: '0.875rem',
         lg: '1rem'
      },
      fontWeight: {
         normal: 400,
         medium: 500,
         semibold: 600
      },
      lineHeight: {
         tight: '1.25',
         normal: '1.5',
         relaxed: '1.625'
      }
   },
   radius: {
      sm: '0.375rem',
      md: '0.5rem',
      lg: '0.5rem',
      full: '9999px'
   },
   shadows: {
      sm: '0 1px 2px color-mix(in srgb, var(--overlay) 12%, transparent)',
      md: '0 12px 32px color-mix(in srgb, var(--overlay) 16%, transparent)',
      lg: '0 24px 70px color-mix(in srgb, var(--overlay) 24%, transparent)'
   },
   consentActions: {
      customize: {
         variant: 'primary',
         mode: 'stroke'
      }
   },
   slots: {
      consentBanner: {
         className:
            'z-[1700] !px-3 !pt-3 !pb-[calc(var(--content-offset-bottom)+0.75rem)] sm:!left-8 sm:!p-4 md:!left-12 lg:!left-61 lg:!pb-4 3xl:!left-68',
         style: {
            '--consent-banner-max-width': 'min(40rem, calc(100vw - 5rem))'
         }
      },
      consentBannerCard:
         'max-w-full overflow-hidden rounded-lg border border-border bg-card/95 shadow-2xl shadow-black/20 backdrop-blur supports-[backdrop-filter]:bg-card/90',
      consentBannerHeader: 'gap-2 px-4 py-4 sm:px-5',
      consentBannerTitle: 'text-base font-semibold tracking-normal text-foreground',
      consentBannerDescription:
         'max-w-none text-sm leading-6 text-muted-foreground [&>span]:mt-1.5 [&>span]:flex [&>span]:flex-wrap [&>span]:gap-x-1.5 [&_a]:!text-primary [&_a]:font-medium',
      consentBannerFooter: 'flex-wrap items-stretch gap-2 border-t border-border bg-secondary/60 px-4 py-3 sm:px-5',
      consentBannerFooterSubGroup: 'min-w-0 flex-1 flex-wrap gap-2 [&_button]:min-w-32 [&_button]:flex-1',
      consentDialogCard: {
         className:
            'overflow-hidden rounded-lg border border-border bg-card shadow-2xl shadow-black/25 [&_[data-testid=consent-dialog-content]]:pt-4',
         style: {
            '--consent-dialog-card-padding': '1.25rem',
            '--consent-dialog-card-padding-mobile': '1rem'
         }
      },
      consentDialogHeader: 'border-b border-border bg-secondary/60 px-5 py-4',
      consentDialogTitle: 'text-base font-semibold tracking-normal text-foreground',
      consentDialogDescription:
         'text-sm leading-6 text-muted-foreground [&>span]:mt-1.5 [&>span]:flex [&>span]:flex-wrap [&>span]:gap-x-1.5 [&_a]:!text-primary [&_a]:font-medium',
      consentDialogContent:
         '[--consent-widget-accordion-focus-ring:var(--primary)] [--consent-widget-accordion-focus-ring-dark:var(--primary)] [--consent-widget-accordion-focus-shadow:0_0_0_2px_var(--primary)] [--consent-widget-accordion-focus-shadow-dark:0_0_0_2px_var(--primary)]',
      consentWidgetAccordion: 'gap-2',
      consentWidgetFooter: 'flex-wrap border-t border-border bg-secondary/60 px-5 py-3',
      consentWidgetFooterSubGroup: 'min-w-0 flex-1 flex-wrap gap-2 [&_button]:min-w-32 [&_button]:flex-1',
      buttonPrimary: 'h-10 min-w-0 cursor-pointer whitespace-nowrap rounded-md px-4 text-sm font-medium !text-primary shadow-none',
      buttonSecondary: 'h-9 min-w-28 cursor-pointer whitespace-nowrap rounded-md px-4 text-sm font-medium shadow-none',
      toggle: 'cursor-pointer'
   }
};

function ConsentDescription({ description, privacyPolicy, cookiePolicy }: { description: string; privacyPolicy: string; cookiePolicy: string }) {
   return (
      <>
         {description}
         <span>
            <privacyRoute.Link>{privacyPolicy}</privacyRoute.Link>
            <span aria-hidden="true">·</span>
            <cookiesPolicyRoute.Link>{cookiePolicy}</cookiesPolicyRoute.Link>
         </span>
      </>
   );
}

export function ConsentManager({ children }: { children?: ReactNode }) {
   const locale = useLocale();
   const t = useTranslations('legal.consent');
   const tc = useTranslations('common');

   const messages = useMemo<Record<string, Partial<Translations>>>(
      () => ({
         [locale]: {
            common: {
               acceptAll: t('acceptAll'),
               rejectAll: t('rejectAll'),
               customize: t('customize'),
               save: t('save'),
               close: t('close')
            },
            cookieBanner: {
               title: t('bannerTitle'),
               description: t('bannerDescription')
            },
            consentManagerDialog: {
               title: t('dialogTitle'),
               description: t('dialogDescription')
            },
            consentTypes: {
               necessary: {
                  title: t('necessaryTitle'),
                  description: t('necessaryDescription')
               }
            },
            legalLinks: {
               privacyPolicy: tc('privacyPolicy'),
               cookiePolicy: tc('cookiesPolicy')
            }
         }
      }),
      [locale, t, tc]
   );

   const bannerDescription = (
      <ConsentDescription description={t('bannerDescription')} privacyPolicy={tc('privacyPolicy')} cookiePolicy={tc('cookiesPolicy')} />
   );
   const dialogDescription = (
      <ConsentDescription description={t('dialogDescription')} privacyPolicy={tc('privacyPolicy')} cookiePolicy={tc('cookiesPolicy')} />
   );

   return (
      <ConsentManagerProvider
         options={{
            mode: 'offline',
            consentCategories: ['necessary'],
            colorScheme: 'system',
            storageConfig: {
               storageKey: consentStorageKey,
               defaultExpiryDays: 365
            },
            legalLinks: {
               privacyPolicy: {
                  href: privacyRoute.id,
                  target: '_self'
               },
               cookiePolicy: {
                  href: cookiesPolicyRoute.id,
                  target: '_self'
               }
            },
            i18n: {
               locale,
               detectBrowserLanguage: false,
               messages
            },
            theme: consentTheme
         }}
      >
         {children}
         <ConsentBanner
            description={bannerDescription}
            legalLinks={null}
            hideBranding
            layout={[['customize', 'accept']]}
            primaryButton="accept"
            acceptButtonText={t('gotIt')}
            customizeButtonText={t('details')}
            uiSource="site-banner"
         />
         <ConsentDialog.Root uiSource="site-dialog">
            <ConsentDialog.Card>
               <ConsentDialog.Header>
                  <ConsentDialog.HeaderTitle>{t('dialogTitle')}</ConsentDialog.HeaderTitle>
                  <ConsentDialog.HeaderDescription>{dialogDescription}</ConsentDialog.HeaderDescription>
               </ConsentDialog.Header>
               <ConsentDialog.Content>
                  <div className="border-border bg-card rounded-lg border px-4 py-3">
                     <p className="text-foreground text-sm font-medium">{t('necessaryTitle')}</p>
                     <p className="text-muted-foreground mt-1 text-sm leading-6">{t('necessaryDescription')}</p>
                  </div>
               </ConsentDialog.Content>
               <ConsentDialog.Footer>
                  <ConsentButton action="accept-consent" consentAction="accept" isPrimary closeConsentDialog>
                     {t('gotIt')}
                  </ConsentButton>
               </ConsentDialog.Footer>
            </ConsentDialog.Card>
         </ConsentDialog.Root>
      </ConsentManagerProvider>
   );
}
