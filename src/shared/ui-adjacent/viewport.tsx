import { createContext, useCallback, useContext, useSyncExternalStore, type ReactNode } from 'react';

export const MOBILE_VIEWPORT_MEDIA_QUERY = '(max-width: 767px)';

const DESKTOP_MEDIA_QUERIES = {
   md: '(width >= 48rem)',
   lg: '(width >= 64rem)'
};

const MobileRequestContext = createContext(false);

export function isMobileViewport() {
   if (globalThis.window === undefined) return false;
   return window.matchMedia(MOBILE_VIEWPORT_MEDIA_QUERY).matches;
}

export function MobileRequestProvider({ mobile, children }: { mobile: boolean; children: ReactNode }) {
   return <MobileRequestContext value={mobile}>{children}</MobileRequestContext>;
}

export function useDesktopLayout(breakpoint: keyof typeof DESKTOP_MEDIA_QUERIES) {
   const mobileRequest = useContext(MobileRequestContext);
   const query = DESKTOP_MEDIA_QUERIES[breakpoint];
   const subscribe = useCallback(
      (onChange: () => void) => {
         const media = window.matchMedia(query);
         media.addEventListener('change', onChange);
         return () => media.removeEventListener('change', onChange);
      },
      [query]
   );

   return useSyncExternalStore(
      subscribe,
      () => window.matchMedia(query).matches,
      () => !mobileRequest
   );
}
