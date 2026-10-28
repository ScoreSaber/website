'use client';

import { useLocation } from '@tanstack/react-router';
import { useTranslations } from 'use-intl';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { useOmniSearch } from '@/modules/search/search-provider';
import { cn } from '@/shared/format/helpers';
import { useDesktopLayout } from '@/shared/ui-adjacent/viewport';
import { bottomBarItems, isNavActive } from '@/shell/nav-data';
import { NavLink } from '@/shell/nav-link';
import { useHideOnScroll } from '@/shell/use-hide-on-scroll';

export function MobileBottomBar() {
   const pathname = useLocation({ select: (location) => location.pathname });
   const hidden = useHideOnScroll();
   const { setOpen: setSearchOpen } = useOmniSearch();
   const tNav = useTranslations('nav');
   const desktop = useDesktopLayout('lg');
   if (desktop) return null;

   return (
      <nav
         className={cn(
            'bg-background/95 supports-backdrop-filter:bg-background/60 fixed right-0 bottom-0 left-0 z-50 border-t backdrop-blur-sm transition-transform duration-300 ease-in-out lg:hidden',
            hidden ? 'translate-y-full' : 'translate-y-0'
         )}
         style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
         <div className="flex h-14 items-center justify-around">
            {bottomBarItems.map((item) => {
               // search opens the omnisearch modal
               if ('action' in item) {
                  return (
                     <Button
                        key={item.key}
                        variant="ghost"
                        onClick={() => setSearchOpen(true)}
                        className="text-muted-foreground flex h-auto flex-col items-center gap-0.5 px-2 py-1 text-[10px] font-medium"
                     >
                        {item.icon}
                        <span>{tNav(item.shortKey)}</span>
                     </Button>
                  );
               }

               if (item.disabled) {
                  return (
                     <Tooltip key={item.key}>
                        <TooltipTrigger asChild>
                           <span
                              className="text-muted-foreground/45 flex flex-col items-center gap-0.5 px-2 py-1 text-[10px] font-medium"
                              aria-disabled="true"
                           >
                              {item.icon}
                              <span>{tNav(item.shortKey)}</span>
                           </span>
                        </TooltipTrigger>
                        <TooltipContent>{tNav('comingSoon')}</TooltipContent>
                     </Tooltip>
                  );
               }

               const active = isNavActive(pathname, item.route);
               return (
                  <NavLink
                     key={item.key}
                     route={item.route}
                     className={cn(
                        'flex touch-manipulation flex-col items-center gap-0.5 px-2 py-1 text-[10px] font-medium transition-colors',
                        active ? 'text-primary' : 'text-muted-foreground'
                     )}
                  >
                     {item.icon}
                     <span>{tNav(item.shortKey)}</span>
                  </NavLink>
               );
            })}
         </div>
      </nav>
   );
}
