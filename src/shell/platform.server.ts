import '@tanstack/react-start/server-only';

import { getRequestHeaders } from '@tanstack/react-start/server';

export function isMacRequest() {
   const headers = getRequestHeaders();
   const platform = headers.get('sec-ch-ua-platform')?.replaceAll('"', '');
   if (platform) return platform === 'macOS' || platform === 'iOS';

   return /(Mac|iPhone|iPod|iPad)/i.test(headers.get('user-agent') ?? '');
}

export function isMobileRequest() {
   const headers = getRequestHeaders();
   const mobileHint = headers.get('sec-ch-ua-mobile');
   if (mobileHint) return mobileHint === '?1';

   return /Mobi/i.test(headers.get('user-agent') ?? '');
}
