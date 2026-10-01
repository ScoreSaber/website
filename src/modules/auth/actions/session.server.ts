import '@tanstack/react-start/server-only';

import { getRequestHeaders, setCookie } from '@tanstack/react-start/server';

import { env } from '@/env';
import { getSiteAuthCookieDomain, siteAuthCookieMaxAge } from '@/modules/auth/lib/site-auth-cookie';

type AuthCookieOptions = {
   httpOnly: boolean;
   sameSite: 'lax';
   secure: boolean;
   path: string;
   maxAge: number;
   domain?: string;
};

export function setAuthCookie(token: string) {
   clearHostAuthCookie();
   setCookie('token', token, getAuthCookieOptions());
}

export function clearAuthCookie() {
   clearHostAuthCookie();

   const options = getAuthCookieOptions();
   if (options.domain) {
      setCookie('token', '', { ...options, maxAge: 0 });
   }
}

export function readAuthCookie() {
   const token = getLastCookieValue(getRequestHeaders().get('cookie'), 'token');
   return token && token !== 'null' ? token : null;
}

function getAuthCookieOptions(): AuthCookieOptions {
   const currentHost = getRequestHeaders().get('host')?.split(':')[0] ?? new URL(env.NEXT_PUBLIC_SITE_URL).hostname;
   const domain = getSiteAuthCookieDomain(currentHost);

   const options: AuthCookieOptions = {
      httpOnly: true,
      sameSite: 'lax',
      secure: env.NODE_ENV === 'production',
      path: '/',
      maxAge: siteAuthCookieMaxAge
   };
   if (domain) options.domain = domain;
   return options;
}

function clearHostAuthCookie() {
   const options = getAuthCookieOptions();
   setCookie('token', '', {
      httpOnly: options.httpOnly,
      sameSite: options.sameSite,
      secure: options.secure,
      path: options.path,
      maxAge: 0
   });
}

function getLastCookieValue(header: string | null, name: string) {
   if (!header) return null;

   let value: string | null = null;
   for (const part of header.split(';')) {
      const [cookieName, ...cookieValueParts] = part.trim().split('=');
      if (cookieName !== name) continue;

      value = decodeCookieValue(cookieValueParts.join('='));
   }

   return value;
}

function decodeCookieValue(value: string) {
   try {
      return decodeURIComponent(value);
   } catch {
      return value;
   }
}
