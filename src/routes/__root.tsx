import '@/styles/globals.css';

import type { ReactNode } from 'react';

import { createRootRouteWithContext, HeadContent, Outlet, Scripts } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { getCookie } from '@tanstack/react-start/server';
import { Loader2 } from 'lucide-react';
import { preconnect, preload } from 'react-dom';
import { IntlProvider } from 'use-intl';
import { z } from 'zod';

import { env } from '@/env';
import { getLocale, getMessages, getVisibleLocales } from '@/i18n/server';
import { readAuthCookie } from '@/modules/auth/actions/session.server';
import { BSWC_PROMO_ENABLED } from '@/modules/home/actions/bswc';
import { getHomeBswcPromo } from '@/modules/home/actions/bswc.server';
import { BswcLiveNotice } from '@/modules/home/bswc-promo-section';
import type { RouterContext } from '@/router';
import { api } from '@/shared/api/server-api';
import { cn } from '@/shared/format/helpers';
import { optionalApi } from '@/shared/result/api';
import { absoluteSiteUrl, SITE_DESCRIPTION, SITE_NAME, buildSeoHead } from '@/shared/seo/metadata';
import { parseServerTheme, THEME_COOKIE_NAME, THEME_MEDIA_QUERY, THEME_STORAGE_KEY } from '@/shared/ui-adjacent/theme';
import { optionalSearchParamString } from '@/shared/url-state/params';
import { AppShell } from '@/shell/app-shell';
import { isMacRequest } from '@/shell/platform.server';
import { parseSidebarCollapsedCookie, SIDEBAR_COLLAPSED_COOKIE_NAME } from '@/shell/sidebar-state';

const themeInitScript = `(function(){var theme='system';try{var stored=localStorage.getItem('${THEME_STORAGE_KEY}');if(stored==='light'||stored==='dark'||stored==='system')theme=stored}catch(e){}var resolved=theme==='system'?(window.matchMedia('${THEME_MEDIA_QUERY}').matches?'dark':'light'):theme;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);root.style.colorScheme=resolved;try{document.cookie='${THEME_COOKIE_NAME}='+theme+'; Path=/; Max-Age=31536000; SameSite=Lax'}catch(e){}})()`;
const criticalPaintStyles = `@layer theme,base,components,utilities;@layer base{*,::after,::before,::backdrop,::file-selector-button{border-color:var(--border,hsl(0 0% 20%))}body{background:var(--background,hsl(240 10% 4%));color:var(--foreground,hsl(60 7% 90%))}}@layer utilities{.app-container{margin-inline:auto;padding-inline:2rem;max-width:1300px}}`;
const preloaderStyles = `#app-preloader{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:var(--background,hsl(240 10% 4%));transition:opacity .4s ease,visibility 0s linear .4s;animation:app-preloader-bail 0s linear 4s forwards}html[data-app-ready] #app-preloader{opacity:0;visibility:hidden;pointer-events:none;animation-name:none}#app-preloader svg{width:32px;height:32px;color:var(--muted-foreground,hsl(0 0% 55%));opacity:0;animation:app-preloader-in .3s ease .3s forwards,app-preloader-spin 1s linear infinite}@keyframes app-preloader-in{to{opacity:1}}@keyframes app-preloader-spin{to{transform:rotate(360deg)}}@keyframes app-preloader-bail{to{opacity:0;visibility:hidden}}@media print{#app-preloader{display:none}}@media (prefers-reduced-motion:reduce){#app-preloader{transition:opacity .01s linear,visibility 0s linear .01s}#app-preloader svg{animation:app-preloader-in .01s linear forwards}}`;
const preloaderFaces = ['400 1rem Geist', '500 1rem Geist', '600 1rem Geist', '700 1rem Geist', "500 1rem 'Geist Pixel'"];
const preloaderFamilies = ['Geist', 'Geist Pixel'];
const PRELOADER_SETTLE_MS = 60;
const preloaderScript = `(function(){var d=document,r=d.documentElement,done=false,t=setTimeout(reveal,2800);function reveal(){if(done)return;done=true;clearTimeout(t);r.setAttribute('data-app-ready','')}function paintThenReveal(){if(typeof requestAnimationFrame!=='function'){reveal();return}requestAnimationFrame(function(){requestAnimationFrame(reveal)})}function settleThenReveal(){setTimeout(paintThenReveal,${PRELOADER_SETTLE_MS})}var f=d.fonts;if(!f||!f.load||!f.forEach){settleThenReveal();return}var faces=${JSON.stringify(preloaderFaces)},fams=${JSON.stringify(preloaderFamilies)};function registered(){var n=0;f.forEach(function(ff){if(fams.indexOf(ff.family)>=0)n++});return n>=faces.length}function load(){var pending=[];for(var i=0;i<faces.length;i++){try{pending.push(f.load(faces[i]))}catch(e){}}Promise.all(pending).then(function(){return f.ready}).then(settleThenReveal,settleThenReveal)}function wait(){if(done)return;if(registered()){load();return}setTimeout(wait,40)}wait()})()`;
const preloaderNoScriptStyles = `#app-preloader{display:none}`;
const criticalFonts = [
   '/fonts/geist-latin-400-normal.woff2',
   '/fonts/geist-latin-500-normal.woff2',
   '/fonts/geist-latin-600-normal.woff2',
   '/fonts/geist-latin-700-normal.woff2',
   '/fonts/GeistPixel-Square.woff2'
];
const rootSearchSchema = z
   .object({
      bswcLive: optionalSearchParamString
   })
   .passthrough();

const ROOT_DATA_STALE_MS = 5 * 60 * 1000;
const ROOT_SHELL_QUERY_KEY = ['root-shell'];

const getRootShellData = createServerFn({ method: 'GET' }).handler(async () => {
   const token = readAuthCookie();
   const [user, bswc] = await Promise.all([
      token ? optionalApi(api.user.userControllerGetMe().then((r) => r.data)) : null,
      BSWC_PROMO_ENABLED ? getHomeBswcPromo() : null
   ]);
   const initialTheme = parseServerTheme(getCookie(THEME_COOKIE_NAME)) ?? null;
   const sidebarCollapsed = parseSidebarCollapsedCookie(getCookie(SIDEBAR_COLLAPSED_COOKIE_NAME));

   return {
      user,
      initialTheme,
      sidebarCollapsed,
      isMac: isMacRequest(),
      locale: await getLocale(),
      visibleLocales: getVisibleLocales(),
      bswc,
      debugBreakpoints: env.DEBUG_BREAKPOINTS,
      debugPageBackground: env.DEBUG_PAGE_BACKGROUND,
      debugReactScan: env.NODE_ENV !== 'production' && env.DEBUG_REACT_SCAN
   };
});

const getRouteMessages = createServerFn({ method: 'GET' }).handler(() => getMessages());

export const Route = createRootRouteWithContext<RouterContext>()({
   validateSearch: (search) => rootSearchSchema.parse(search),
   loader: {
      staleReloadMode: 'blocking',
      handler: async ({ context }) => {
         const shell = await context.queryClient.ensureQueryData({
            queryKey: ROOT_SHELL_QUERY_KEY,
            queryFn: () => getRootShellData(),
            staleTime: ROOT_DATA_STALE_MS
         });
         const messages = await context.queryClient.ensureQueryData({
            queryKey: ['root-messages', shell.locale],
            queryFn: () => getRouteMessages(),
            staleTime: Infinity
         });

         return { ...shell, messages };
      }
   },
   preload: false,
   shouldReload: true,
   head: () => ({
      meta: [
         { charSet: 'utf-8' },
         { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
         { name: 'theme-color', content: '#facc15' },
         { name: 'application-name', content: SITE_NAME },
         { name: 'apple-mobile-web-app-title', content: SITE_NAME },
         ...buildSeoHead().meta
      ],
      scripts: [
         {
            type: 'application/ld+json',
            children: JSON.stringify({
               '@context': 'https://schema.org',
               '@type': 'WebSite',
               name: SITE_NAME,
               url: absoluteSiteUrl('/'),
               description: SITE_DESCRIPTION
            })
         }
      ],
      links: [
         { rel: 'icon', href: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
         { rel: 'icon', href: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
         { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
         { rel: 'manifest', href: '/site.webmanifest' }
      ]
   }),
   component: RootComponent
});

function RootComponent() {
   const data = Route.useLoaderData();
   const search = Route.useSearch();
   const { queryClient } = Route.useRouteContext();
   const previewBswcLive = search.bswcLive === '1';

   if (!queryClient.getQueryData(ROOT_SHELL_QUERY_KEY)) {
      const { messages: _, ...shell } = data;
      queryClient.setQueryData(ROOT_SHELL_QUERY_KEY, shell);
   }
   if (!queryClient.getQueryData(['root-messages', data.locale])) {
      queryClient.setQueryData(['root-messages', data.locale], data.messages);
   }

   return (
      <RootDocument locale={data.locale} initialTheme={data.initialTheme} debugReactScan={data.debugReactScan}>
         <IntlProvider locale={data.locale} messages={data.messages} timeZone="UTC">
            <AppShell
               initialUser={data.user}
               messages={data.messages}
               visibleLocales={data.visibleLocales}
               initialSidebarCollapsed={data.sidebarCollapsed}
               isMac={data.isMac}
               queryClient={queryClient}
               debugBreakpoints={data.debugBreakpoints}
               debugPageBackground={data.debugPageBackground}
            >
               {BSWC_PROMO_ENABLED && <BswcLiveNotice promo={data.bswc} previewLive={previewBswcLive} />}
               <Outlet />
            </AppShell>
         </IntlProvider>
      </RootDocument>
   );
}

function RootDocument({
   locale,
   initialTheme,
   debugReactScan,
   children
}: {
   locale: string;
   initialTheme: string | null;
   debugReactScan: boolean;
   children: ReactNode;
}) {
   preconnect('https://cdn.scoresaber.com');
   for (const href of criticalFonts) {
      preload(href, { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' });
   }
   preload('/fonts/scoresaber-wordmark-mask.svg', { as: 'image', type: 'image/svg+xml', fetchPriority: 'high' });

   return (
      <html
         lang={locale}
         className={initialTheme ?? undefined}
         style={initialTheme ? { colorScheme: initialTheme } : undefined}
         suppressHydrationWarning
      >
         <head>
            <script id="theme-init" dangerouslySetInnerHTML={{ __html: themeInitScript }} suppressHydrationWarning />
            <style id="critical-paint" dangerouslySetInnerHTML={{ __html: criticalPaintStyles }} />
            <style id="app-preloader-style" dangerouslySetInnerHTML={{ __html: preloaderStyles }} />
            <script id="app-preloader-init" dangerouslySetInnerHTML={{ __html: preloaderScript }} suppressHydrationWarning />
            <noscript>
               <style dangerouslySetInnerHTML={{ __html: preloaderNoScriptStyles }} />
            </noscript>
            <HeadContent />
            {debugReactScan && <script src="https://unpkg.com/react-scan/dist/auto.global.js" crossOrigin="anonymous" async />}
         </head>
         <body className={cn('bg-background relative min-h-screen font-sans antialiased')}>
            <div id="app-preloader" aria-hidden="true">
               <Loader2 />
            </div>
            {children}
            <Scripts />
         </body>
      </html>
   );
}
