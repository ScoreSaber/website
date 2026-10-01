import { getRouteApi } from '@tanstack/react-router';
import { Result } from 'better-result';

import { env } from '@/env';
import {
   authCookieMaxAge,
   getApiOrigin,
   getSiteUrl,
   oauthIntentCookieName,
   oauthRedirectCookieName,
   safeSiteRedirect
} from '@/modules/auth/lib/redirect';
import type {
   AuthControllerDiscordLoginIntent,
   AuthControllerPatreonLoginIntent,
   AuthControllerSteamLoginIntent
} from '@/shared/api/generated/ApiParams';
import { api } from '@/shared/api/server-api';
import { apiResult } from '@/shared/result/api';
import { stringifyUrlSearch } from '@/shared/url-state/search-serializer';

type OAuthProvider = 'discord' | 'patreon';

const discordAuthRoute = getRouteApi('/auth/discord');
const homeRoute = getRouteApi('/');
const loginRoute = getRouteApi('/login');
const patreonAuthRoute = getRouteApi('/auth/patreon');
const settingsConnectionsRoute = getRouteApi('/settings/connections');

const oauthProviderRoutes = {
   discord: discordAuthRoute,
   patreon: patreonAuthRoute
};

export async function handleSteamLogin(
   request: Request,
   {
      intent,
      returnUrl,
      redirectTo: requestedRedirectTo
   }: {
      intent: AuthControllerSteamLoginIntent;
      returnUrl?: string;
      redirectTo?: string;
   }
): Promise<Response> {
   const referer = request.headers.get('referer');
   const defaultRedirectTo = getSiteUrl(intent === 'merge' ? settingsConnectionsRoute.id : homeRoute.id);
   const redirectTo = requestedRedirectTo
      ? safeSiteRedirect(requestedRedirectTo, defaultRedirectTo)
      : referer
        ? safeSiteRedirect(referer, defaultRedirectTo)
        : defaultRedirectTo;
   const failedRedirect =
      intent === 'merge'
         ? getSiteUrl(`${settingsConnectionsRoute.id}${stringifyUrlSearch({ steam: 'failed' })}`)
         : getSiteUrl(`${loginRoute.id}${stringifyUrlSearch({ steam: 'failed', redirectTo })}`);
   const result = await apiResult(
      api.auth.authControllerSteamLogin(
         {
            intent,
            returnUrl: returnUrl ?? getApiOrigin(),
            redirectTo
         },
         {
            cache: 'no-store'
         }
      )
   );

   return Result.match(result, {
      ok: (response) => {
         const redirect = createMutableRedirectResponse(response.data.redirectUrl);
         appendApiCookies(redirect, response.headers);
         const state = getSteamState(response.data.redirectUrl);
         if (state) {
            setCookie(redirect, 'steam-auth-state', state, {
               httpOnly: true,
               sameSite: 'lax',
               secure: env.NODE_ENV === 'production',
               path: '/',
               maxAge: 600
            });
         }

         return redirect;
      },
      err: () => createMutableRedirectResponse(failedRedirect)
   });
}

export async function handleDiscordLogin({
   intent,
   redirectTo: requestedRedirectTo
}: {
   intent: AuthControllerDiscordLoginIntent;
   redirectTo?: string;
}): Promise<Response> {
   return handleOAuthLogin({
      provider: 'discord',
      intent,
      requestedRedirectTo,
      requestAuth: (redirectTo) => api.auth.authControllerDiscordLogin({ intent, redirectTo }, { cache: 'no-store' })
   });
}

export async function handlePatreonLogin({
   intent,
   redirectTo: requestedRedirectTo
}: {
   intent: AuthControllerPatreonLoginIntent;
   redirectTo?: string;
}): Promise<Response> {
   return handleOAuthLogin({
      provider: 'patreon',
      intent,
      requestedRedirectTo,
      requestAuth: (redirectTo) => api.auth.authControllerPatreonLogin({ intent, redirectTo }, { cache: 'no-store' })
   });
}

export async function handleDiscordCallback(request: Request): Promise<Response> {
   return handleOAuthCallback({
      request,
      provider: 'discord',
      requestCallback: (code, state) =>
         api.auth.authControllerDiscordCallback(
            { code, state },
            { secure: false, headers: { Cookie: request.headers.get('cookie') ?? '' }, cache: 'no-store' }
         )
   });
}

export async function handlePatreonCallback(request: Request): Promise<Response> {
   return handleOAuthCallback({
      request,
      provider: 'patreon',
      requestCallback: (code, state) =>
         api.auth.authControllerPatreonCallback(
            { code, state },
            { secure: false, headers: { Cookie: request.headers.get('cookie') ?? '' }, cache: 'no-store' }
         )
   });
}

async function handleOAuthLogin({
   provider,
   intent,
   requestedRedirectTo,
   requestAuth
}: {
   provider: OAuthProvider;
   intent: 'login' | 'link';
   requestedRedirectTo?: string;
   requestAuth: (redirectTo: string) => Promise<{ data: { redirectUrl: string }; headers: Headers }>;
}) {
   const redirectTo = intent === 'login' ? safeSiteRedirect(requestedRedirectTo, getSiteUrl(homeRoute.id)) : getSiteUrl(settingsConnectionsRoute.id);
   const failedRedirect =
      intent === 'login'
         ? getSiteUrl(`${loginRoute.id}${stringifyUrlSearch({ [provider]: 'failed', redirectTo })}`)
         : getSiteUrl(`${settingsConnectionsRoute.id}${stringifyUrlSearch({ [provider]: 'failed' })}`);

   const result = await apiResult(requestAuth(redirectTo));

   return Result.match(result, {
      ok: (response) => {
         const redirect = createMutableRedirectResponse(response.data.redirectUrl);
         appendApiCookies(redirect, response.headers);
         const state = getOAuthState(response.data.redirectUrl);
         if (state) {
            setCookie(redirect, `${provider}-auth-state`, state, {
               httpOnly: true,
               sameSite: 'lax',
               secure: env.NODE_ENV === 'production',
               path: '/',
               maxAge: authCookieMaxAge
            });
         }
         setCookie(redirect, oauthIntentCookieName, intent, {
            httpOnly: true,
            sameSite: 'lax',
            secure: env.NODE_ENV === 'production',
            path: oauthProviderRoutes[provider].id,
            maxAge: authCookieMaxAge
         });
         setCookie(redirect, oauthRedirectCookieName, redirectTo, {
            httpOnly: true,
            sameSite: 'lax',
            secure: env.NODE_ENV === 'production',
            path: oauthProviderRoutes[provider].id,
            maxAge: authCookieMaxAge
         });
         return redirect;
      },
      err: () => createMutableRedirectResponse(failedRedirect)
   });
}

async function handleOAuthCallback({
   request,
   provider,
   requestCallback
}: {
   request: Request;
   provider: OAuthProvider;
   requestCallback: (code: string, state: string) => Promise<{ headers: Headers }>;
}) {
   const url = new URL(request.url);
   const cookies = parseCookieHeader(request.headers.get('cookie'));
   const code = url.searchParams.get('code');
   const state = url.searchParams.get('state');
   const intent = cookies[oauthIntentCookieName];
   const redirectTo = safeSiteRedirect(cookies[oauthRedirectCookieName], getSiteUrl(homeRoute.id));
   const successRedirect =
      intent === 'login' ? redirectTo : getSiteUrl(`${settingsConnectionsRoute.id}${stringifyUrlSearch({ [provider]: 'connected' })}`);
   const failedRedirect =
      intent === 'login'
         ? getSiteUrl(`${loginRoute.id}${stringifyUrlSearch({ [provider]: 'failed', redirectTo })}`)
         : getSiteUrl(`${settingsConnectionsRoute.id}${stringifyUrlSearch({ [provider]: 'failed' })}`);

   if (!code || !state) {
      return createMutableRedirectResponse(failedRedirect);
   }

   const result = await apiResult(requestCallback(code, state));

   return Result.match(result, {
      ok: (response) => {
         const redirect = createMutableRedirectResponse(successRedirect);
         appendApiCookies(redirect, response.headers);
         setCookie(redirect, oauthIntentCookieName, '', { path: oauthProviderRoutes[provider].id, maxAge: 0 });
         setCookie(redirect, oauthRedirectCookieName, '', { path: oauthProviderRoutes[provider].id, maxAge: 0 });
         return redirect;
      },
      err: () => createMutableRedirectResponse(failedRedirect)
   });
}

function appendApiCookies(redirect: Response, headers: Headers) {
   for (const setCookie of headers.getSetCookie()) {
      redirect.headers.append('set-cookie', setCookie);
   }
}

function createMutableRedirectResponse(url: string) {
   // Response.redirect() headers are immutable in Node
   return new Response(null, { status: 307, headers: { Location: url } });
}

interface CookieOptions {
   httpOnly?: boolean;
   sameSite?: 'lax' | 'strict' | 'none';
   secure?: boolean;
   path?: string;
   maxAge?: number;
}

function setCookie(response: Response, name: string, value: string, options: CookieOptions = {}) {
   const parts = [`${name}=${encodeURIComponent(value)}`];

   if (options.maxAge != null) parts.push(`Max-Age=${options.maxAge}`);
   if (options.path) parts.push(`Path=${options.path}`);
   if (options.httpOnly) parts.push('HttpOnly');
   if (options.secure) parts.push('Secure');
   if (options.sameSite) parts.push(`SameSite=${options.sameSite[0].toUpperCase()}${options.sameSite.slice(1)}`);

   response.headers.append('set-cookie', parts.join('; '));
}

function parseCookieHeader(header: string | null) {
   const cookies: Record<string, string> = {};
   if (!header) return cookies;

   for (const part of header.split(';')) {
      const [name, ...valueParts] = part.trim().split('=');
      if (!name) continue;
      cookies[name] = decodeURIComponent(valueParts.join('='));
   }

   return cookies;
}

function getOAuthState(redirectUrl: string) {
   return Result.unwrapOr(
      Result.try(() => {
         const url = new URL(redirectUrl);
         return url.searchParams.get('state');
      }),
      null
   );
}

function getSteamState(redirectUrl: string) {
   return Result.unwrapOr(
      Result.try(() => {
         const redirect = new URL(redirectUrl);
         const returnTo = redirect.searchParams.get('openid.return_to');
         return returnTo ? new URL(returnTo).searchParams.get('state') : null;
      }),
      null
   );
}
