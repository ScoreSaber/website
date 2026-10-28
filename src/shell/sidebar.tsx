'use client';

import { useSyncExternalStore } from 'react';

import { getRouteApi, useLocation } from '@tanstack/react-router';
import { ChevronLeft, ChevronRight, CircleEllipsis, LogIn, Search } from 'lucide-react';
import { useTranslations } from 'use-intl';

import { Button } from '@/components/ui/button';
import { Kbd } from '@/components/ui/kbd';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { useAuth } from '@/modules/auth';
import { canUseLivePlatform } from '@/modules/live/lib/permissions';
import { PlayerAvatar } from '@/modules/player/shared/player-avatar';
import { useOmniSearch } from '@/modules/search/search-provider';
import { Image } from '@/shared/components/image';
import { cn } from '@/shared/format/helpers';
import Permissions from '@/shared/permissions';
import { useDesktopLayout } from '@/shared/ui-adjacent/viewport';
import { isNavActive, navItems, secondaryItems } from '@/shell/nav-data';
import { NavLink } from '@/shell/nav-link';
import { SidebarNav } from '@/shell/sidebar-nav';
import { useSidebar } from '@/shell/sidebar-provider';
import { SidebarMoreMenu } from '@/shell/sidebar/sidebar-more-menu';

const homeRoute = getRouteApi('/');
const loginRoute = getRouteApi('/login');
const playerRoute = getRouteApi('/u/$playerId');

const navLinkClass =
   'flex touch-manipulation items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-[color,background-color,scale] duration-150 active:scale-[0.96]';
const activeClass = 'bg-primary text-primary-foreground dark:bg-accent dark:text-primary';
const inactiveClass = 'text-muted-foreground hover:bg-accent/50 hover:text-primary';
const disabledClass = 'cursor-not-allowed text-muted-foreground/45';

function CollapsedSidebar({ onExpand }: { onExpand: () => void }) {
   const location = useLocation();
   const pathname = location.pathname;
   const { user } = useAuth();
   const { setOpen: setSearchOpen } = useOmniSearch();
   const tNav = useTranslations('nav');
   const tSidebar = useTranslations();

   const iconLink = cn(navLinkClass, inactiveClass, 'justify-center px-0');
   const currentPath = location.href;

   const visibleNavItems = navItems.filter((item) => item.route !== 'live' || canUseLivePlatform(user?.permissions));
   const visibleSecondaryItems = secondaryItems.filter((item) => item.key !== 'support' || !Permissions.isSupporter(user?.permissions ?? 0));

   return (
      <>
         {/* logo */}
         <div className="flex justify-center p-3">
            <homeRoute.Link aria-label="ScoreSaber Home">
               <Image src="/scoresaber.svg" width={24} height={24} alt={tSidebar('common.scoreSaberLogo')} priority />
            </homeRoute.Link>
         </div>

         <Separator />

         {/* nav */}
         <nav className="flex flex-1 flex-col gap-1 overflow-x-hidden overflow-y-auto p-2">
            <Tooltip>
               <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" onClick={() => setSearchOpen(true)} className={cn(iconLink, 'w-full')}>
                     <Search data-icon />
                  </Button>
               </TooltipTrigger>
               <TooltipContent side="right">{tNav('search')}</TooltipContent>
            </Tooltip>
            {visibleNavItems.map((item) => (
               <Tooltip key={item.key}>
                  <TooltipTrigger asChild>
                     {item.disabled ? (
                        <span className={cn(navLinkClass, disabledClass, 'justify-center px-0')} aria-disabled="true">
                           {item.icon}
                        </span>
                     ) : (
                        <NavLink
                           route={item.route}
                           className={cn(navLinkClass, isNavActive(pathname, item.route) ? activeClass : inactiveClass, 'justify-center px-0')}
                        >
                           {item.icon}
                        </NavLink>
                     )}
                  </TooltipTrigger>
                  <TooltipContent side="right">{item.disabled ? tNav('comingSoon') : tNav(item.key)}</TooltipContent>
               </Tooltip>
            ))}

            <Separator className="my-2" />

            {visibleSecondaryItems.map((item) => (
               <Tooltip key={item.key}>
                  <TooltipTrigger asChild>
                     {item.external ? (
                        <a href={item.href} target="_blank" rel="noreferrer" className={cn(navLinkClass, inactiveClass, 'justify-center px-0')}>
                           {item.icon}
                        </a>
                     ) : (
                        <NavLink
                           route={item.route}
                           className={cn(navLinkClass, isNavActive(pathname, item.route) ? activeClass : inactiveClass, 'justify-center px-0')}
                        >
                           {item.icon}
                        </NavLink>
                     )}
                  </TooltipTrigger>
                  <TooltipContent side="right">{tNav(item.key)}</TooltipContent>
               </Tooltip>
            ))}
         </nav>

         <Separator />

         {/* bottom */}
         <div className="flex flex-col gap-1 p-2">
            {user ? (
               <Tooltip>
                  <TooltipTrigger asChild>
                     <playerRoute.Link params={{ playerId: user.id }} className={iconLink}>
                        <PlayerAvatar
                           src={user.avatar}
                           version={user.avatarVersion}
                           alt={user.name}
                           width={24}
                           height={24}
                           className="size-6 rounded-md"
                        />
                     </playerRoute.Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">{user.name}</TooltipContent>
               </Tooltip>
            ) : (
               <Tooltip>
                  <TooltipTrigger asChild>
                     <Button variant="ghost" asChild className={cn(iconLink, 'cursor-pointer')}>
                        <loginRoute.Link search={pathname === loginRoute.id ? {} : { redirectTo: currentPath }}>
                           <LogIn data-icon />
                        </loginRoute.Link>
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">{tSidebar('sidebar.logIn')}</TooltipContent>
               </Tooltip>
            )}
            <div className="flex justify-center">
               <SidebarMoreMenu
                  side="top"
                  trigger={
                     <Button
                        variant="ghost"
                        size="icon-sm"
                        className="text-muted-foreground hover:text-foreground rounded-full"
                        aria-label={tSidebar('sidebar.more')}
                     >
                        <CircleEllipsis data-icon />
                     </Button>
                  }
               />
            </div>
            <Tooltip>
               <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" onClick={onExpand} className={cn(iconLink, 'w-full')}>
                     <ChevronRight data-icon />
                  </Button>
               </TooltipTrigger>
               <TooltipContent side="right">{tSidebar('sidebar.expand')}</TooltipContent>
            </Tooltip>
         </div>
      </>
   );
}

function ExpandedSidebar({ onCollapse }: { onCollapse: () => void }) {
   const tSidebar = useTranslations();
   const { isMac } = useSidebar();

   const shortcut = isMac ? '⌘⇧S' : 'Ctrl+Shift+S';

   return (
      <>
         <SidebarNav />
         <div className="px-3 pb-3">
            <Button variant="ghost" size="sm" onClick={onCollapse} className={cn(navLinkClass, inactiveClass, 'w-full justify-start')}>
               <ChevronLeft data-icon />
               <span className="flex-1 text-left">{tSidebar('sidebar.collapse')}</span>
               <Kbd>{shortcut}</Kbd>
            </Button>
         </div>
      </>
   );
}

const subscribeNothing = () => () => {};

export function Sidebar() {
   const { collapsed, toggle } = useSidebar();
   const desktop = useDesktopLayout('lg');
   const hydrated = useSyncExternalStore(
      subscribeNothing,
      () => true,
      () => false
   );
   if (!desktop) return null;

   return (
      <aside
         className={cn(
            'bg-background fixed top-0 left-0 z-40 hidden h-screen flex-col border-r transition-[width] duration-300 ease-in-out lg:flex overflow-x-hidden',
            collapsed ? 'w-14' : 'w-61 3xl:w-68'
         )}
      >
         <div className="relative h-full w-full">
            <div
               aria-hidden={!collapsed}
               inert={!collapsed}
               className={cn(
                  'absolute inset-0 w-14 flex flex-col transition-opacity duration-300 ease-in-out',
                  collapsed ? 'opacity-100' : 'opacity-0 pointer-events-none'
               )}
            >
               {(collapsed || hydrated) && <CollapsedSidebar onExpand={toggle} />}
            </div>
            <div
               aria-hidden={collapsed}
               inert={collapsed}
               className={cn(
                  'absolute inset-0 w-61 3xl:w-68 flex flex-col transition-opacity duration-300 ease-in-out',
                  collapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'
               )}
            >
               {(!collapsed || hydrated) && <ExpandedSidebar onCollapse={toggle} />}
            </div>
         </div>
      </aside>
   );
}
