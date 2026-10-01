import type { MouseEvent } from 'react';

import type { InferFrom, InferMaskFrom, InferMaskTo, InferTo, RegisteredRouter, ToOptions, ValidateNavigateOptions } from '@tanstack/react-router';

type RouteNavigationOptions = {
   replace?: boolean;
   resetScroll?: boolean;
};

type BuildRouteLocationOptions<TLocation> = ToOptions<
   RegisteredRouter,
   InferFrom<TLocation>,
   InferTo<TLocation>,
   InferMaskFrom<TLocation>,
   InferMaskTo<TLocation>
> & {
   leaveParams?: boolean;
   _includeValidateSearch?: boolean;
   _isNavigate?: boolean;
};

export type RouteLocation<TLocation> = ValidateNavigateOptions<RegisteredRouter, TLocation> & BuildRouteLocationOptions<TLocation>;
export type RouteLocationBuilder<TSearch, TLocation> = (search?: TSearch) => RouteLocation<TLocation>;

export function getRouteHref<
   TTo extends string | undefined,
   TFrom extends string = string,
   TMaskFrom extends string = TFrom,
   TMaskTo extends string = ''
>(
   router: RegisteredRouter,
   location: ToOptions<RegisteredRouter, TFrom, TTo, TMaskFrom, TMaskTo> & {
      leaveParams?: boolean;
      _includeValidateSearch?: boolean;
      _isNavigate?: boolean;
   }
) {
   return router.buildLocation<RegisteredRouter, TTo, TFrom, TMaskFrom, TMaskTo>(location).href;
}

export function navigateToRoute<const TLocation>(router: RegisteredRouter, location: RouteLocation<TLocation>, options: RouteNavigationOptions = {}) {
   return router.navigate({ ...location, ...options });
}

export function preloadRouteLocation<const TLocation>(router: RegisteredRouter, location: RouteLocation<TLocation>) {
   return router.preloadRoute(location);
}

export function isRouterClick(event: MouseEvent<HTMLAnchorElement>) {
   const target = event.currentTarget.getAttribute('target');
   return (
      !event.defaultPrevented &&
      event.button === 0 &&
      !event.metaKey &&
      !event.altKey &&
      !event.ctrlKey &&
      !event.shiftKey &&
      (!target || target === '_self')
   );
}
