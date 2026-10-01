'use client';

import { memo, useEffect, useState } from 'react';

import { getRouteApi, useLocation, useRouter } from '@tanstack/react-router';
import { Check, ChevronsUpDown, CircleEllipsis, CircleHelp, EllipsisVertical, ExternalLink, LogIn, LogOut, Plus, Search } from 'lucide-react';
import { FaGlobe } from 'react-icons/fa';
import { useTranslations } from 'use-intl';

import { Button } from '@/components/ui/button';
import { Kbd } from '@/components/ui/kbd';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { useAuth } from '@/modules/auth';
import { canUseLivePlatform } from '@/modules/live/lib/permissions';
import { PlayerAvatar } from '@/modules/player/shared/player-avatar';
import { useOmniSearch } from '@/modules/search/search-provider';
import { CountryImage } from '@/shared/components/country-image';
import { Image } from '@/shared/components/image';
import { parseCountryRegionParam } from '@/shared/country-region';
import { cn, formatNumber, rankToPage } from '@/shared/format/helpers';
import { getPlayerRoleStyleAndTitle } from '@/shared/format/styling';
import Permissions from '@/shared/permissions';
import { isNavActive, navItems, secondaryItems, socialLinks } from '@/shell/nav-data';
import { SidebarNavLink } from '@/shell/sidebar-nav-link';
import { useSidebar } from '@/shell/sidebar-provider';
import { SidebarMoreMenu } from '@/shell/sidebar/sidebar-more-menu';

const homeRoute = getRouteApi('/');
const loginRoute = getRouteApi('/login');
const playerRoute = getRouteApi('/u/$playerId');
const rankingsRoute = getRouteApi('/rankings');

const navLinkClass =
   'flex touch-manipulation items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-[color,background-color,scale] duration-150 active:scale-[0.96]';
const activeClass = 'bg-primary text-primary-foreground dark:bg-accent dark:text-primary';
const inactiveClass = 'text-muted-foreground hover:bg-accent/50 hover:text-primary';
const disabledClass = 'cursor-not-allowed text-muted-foreground/45';

const SidebarBrand = memo(function SidebarBrand({ alt, onNavigateAction }: { alt: string; onNavigateAction?: () => void }) {
   const router = useRouter();

   function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) return;
      event.preventDefault();
      onNavigateAction?.();
      void router.navigate({ to: '/' });
   }

   return (
      <homeRoute.Link className="flex min-w-0 shrink-0 items-center gap-2.5" onClick={handleClick}>
         <Image src="/scoresaber.svg" width={28} height={28} alt={alt} priority className="shrink-0" />
         <span className="sr-only">ScoreSaber</span>
         <span
            aria-hidden="true"
            className="block h-[1.15rem] w-[8rem] shrink-0 bg-current [-webkit-mask:url('/fonts/scoresaber-wordmark-mask.svg')_left_center/contain_no-repeat] [mask:url('/fonts/scoresaber-wordmark-mask.svg')_left_center/contain_no-repeat]"
         />
      </homeRoute.Link>
   );
});

export function SidebarNav({ onNavigateAction }: { onNavigateAction?: () => void }) {
   const location = useLocation();
   const pathname = location.pathname;
   const { user } = useAuth();
   const { setOpen: setSearchOpen } = useOmniSearch();
   const { isMac } = useSidebar();
   const [mounted, setMounted] = useState(false);
   const t = useTranslations();
   const tNav = useTranslations('nav');
   const [playerNameClass] = getPlayerRoleStyleAndTitle(user);
   const currentPath = location.href;
   const visibleNavItems = navItems.filter((item) => item.route !== 'live' || canUseLivePlatform(user?.permissions));
   const visibleSecondaryItems = secondaryItems.filter((item) => item.key !== 'support' || !Permissions.isSupporter(user?.permissions ?? 0));

   const realmSwitcherTrigger = (
      <Button variant="ghost" size="icon-xs" className="text-muted-foreground" aria-label={t('sidebar.switchRealm')}>
         <ChevronsUpDown data-icon />
      </Button>
   );

   useEffect(() => {
      setMounted(true);
   }, []);

   return (
      <div
         className="flex h-full flex-col"
         style={{ paddingTop: 'env(safe-area-inset-top, 0px)', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
         {/* logo + realm switcher */}
         <div className="p-4">
            <div className="flex items-center gap-2.5">
               <SidebarBrand alt={t('common.scoreSaberLogo')} onNavigateAction={onNavigateAction} />
               <div className="-mr-2 ml-auto flex shrink-0 items-center gap-0.5 xl:mr-0">
                  {/* avoid radix id drift on fresh loads:
                      https://github.com/radix-ui/primitives/issues/3700
                      https://github.com/shadcn-ui/ui/issues/1018 */}
                  {!mounted && realmSwitcherTrigger}
                  {mounted && (
                     <Popover>
                        <PopoverTrigger asChild>{realmSwitcherTrigger}</PopoverTrigger>
                        <PopoverContent side="right" align="start" avoidCollisions={false} collisionPadding={16} className="w-44 p-3 xl:w-56">
                           <div className="mb-2 flex items-center justify-between">
                              <p className="text-muted-foreground cursor-default text-xs font-medium select-none">{t('sidebar.activeRealm')}</p>
                              <Button asChild variant="ghost" size="icon-xs" className="text-muted-foreground cursor-pointer">
                                 <a href="https://www.patreon.com/posts/157688806" target="_blank" rel="noreferrer">
                                    <CircleHelp data-icon />
                                 </a>
                              </Button>
                           </div>
                           <div className="flex flex-col gap-1">
                              <div className="flex cursor-default items-center gap-2 rounded-md px-2 py-1.5 text-sm">
                                 <Check className="text-primary size-4 shrink-0" />
                                 <span className="flex-1 font-medium select-none">Main</span>
                                 <Button variant="ghost" size="icon-xs" disabled className="shrink-0 cursor-pointer opacity-30">
                                    <LogOut data-icon />
                                 </Button>
                              </div>
                              <div className="flex cursor-default items-center gap-2 rounded-md px-2 py-1.5 text-sm opacity-50">
                                 <div className="size-4 shrink-0" />
                                 <span className="flex-1 select-none">{t('sidebar.comingSoon')}</span>
                              </div>
                           </div>
                           <Separator className="my-3" />
                           <Button variant="ghost" size="sm" disabled className="w-full justify-start">
                              <Plus data-icon />
                              {t('sidebar.joinRealm')}
                           </Button>
                        </PopoverContent>
                     </Popover>
                  )}
               </div>
            </div>

            {/* social links */}
            <div className="mt-2 -ml-1 flex items-center gap-0.5">
               {socialLinks.map(({ href, label, Icon }) => (
                  <a
                     key={label}
                     href={href}
                     target="_blank"
                     rel="noreferrer"
                     aria-label={label}
                     className="text-muted-foreground hover:text-primary rounded-md p-1.5 transition-colors"
                  >
                     <Icon className="size-3.5 fill-current" aria-hidden="true" />
                  </a>
               ))}
            </div>
         </div>

         <Separator />

         {/* search */}
         <div className="px-3 pt-3">
            <Button
               variant="outline"
               size="sm"
               onClick={() => setSearchOpen(true)}
               className="bg-secondary/50 text-muted-foreground hover:bg-secondary/80 hover:text-muted-foreground w-full justify-start gap-2 font-normal shadow-none"
            >
               <Search data-icon />
               <span className="flex-1 text-left">{t('common.searchPlaceholder')}</span>
               <Kbd>{isMac ? '⌘K' : 'Ctrl+K'}</Kbd>
            </Button>
         </div>

         {/* main nav */}
         <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
            {visibleNavItems.map((item) => {
               if (item.disabled) {
                  return (
                     <Tooltip key={item.key}>
                        <TooltipTrigger asChild>
                           <span className={cn(navLinkClass, disabledClass)} aria-disabled="true">
                              {item.icon}
                              {tNav(item.key)}
                           </span>
                        </TooltipTrigger>
                        <TooltipContent>{tNav('comingSoon')}</TooltipContent>
                     </Tooltip>
                  );
               }

               return (
                  <SidebarNavLink
                     key={item.key}
                     route={item.route}
                     className={cn(navLinkClass, isNavActive(pathname, item.route) ? activeClass : inactiveClass)}
                     onNavigateAction={onNavigateAction}
                  >
                     {item.icon}
                     {tNav(item.key)}
                  </SidebarNavLink>
               );
            })}

            <Separator className="my-2" />

            {visibleSecondaryItems.map((item) => (
               <SidebarNavLink
                  key={item.key}
                  {...(item.external ? { external: true, href: item.href } : { route: item.route })}
                  className={cn(navLinkClass, !item.external && isNavActive(pathname, item.route) ? activeClass : inactiveClass)}
                  onNavigateAction={onNavigateAction}
               >
                  {item.icon}
                  <span className="flex-1">{tNav(item.key)}</span>
                  {item.external && <ExternalLink data-icon className="ml-auto size-3" aria-hidden="true" />}
               </SidebarNavLink>
            ))}
         </nav>

         <Separator />

         {/* bottom: user + theme */}
         <div className="flex flex-col gap-1 px-3 pt-3 pb-1">
            {user ? (
               <div className="flex w-full items-center gap-1.5">
                  <div className="hover:bg-accent/40 min-w-0 flex-1 rounded-md px-2 py-1.5 transition-colors">
                     <div className="flex min-w-0 items-center gap-2">
                        <playerRoute.Link params={{ playerId: user.id }} onClick={onNavigateAction} className="shrink-0 translate-y-1 self-center">
                           <PlayerAvatar
                              src={user.avatar}
                              version={user.avatarVersion}
                              alt={user.name}
                              width={32}
                              height={32}
                              className="h-8 w-8 rounded-full"
                           />
                        </playerRoute.Link>
                        <div className="min-w-0 flex-1">
                           <playerRoute.Link
                              params={{ playerId: user.id }}
                              onClick={onNavigateAction}
                              className="text-foreground block min-w-0 overflow-hidden"
                           >
                              <span className={cn(playerNameClass, 'block truncate text-sm font-medium')}>{user.name}</span>
                           </playerRoute.Link>
                           {!user.banned && !user.inactive && (
                              <div className="text-muted-foreground mt-0.5 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[11px] leading-none sm:text-xs">
                                 <rankingsRoute.Link
                                    search={{ page: rankToPage(user.stats.rank, 50), highlight: user.id, includeInactive: 'false' }}
                                    onClick={onNavigateAction}
                                    className="hover:text-foreground flex items-center gap-0.5 whitespace-nowrap transition-colors"
                                 >
                                    <FaGlobe className="size-2 shrink-0 sm:size-2.5" />
                                    <span className="tabular-nums">#{formatNumber(user.stats.rank)}</span>
                                 </rankingsRoute.Link>
                                 <rankingsRoute.Link
                                    search={{
                                       page: rankToPage(user.stats.countryRank, 50),
                                       countries: parseCountryRegionParam(user.country),
                                       highlight: user.id,
                                       includeInactive: 'false'
                                    }}
                                    onClick={onNavigateAction}
                                    className="hover:text-foreground flex items-center gap-0.5 whitespace-nowrap transition-colors"
                                 >
                                    <CountryImage country={user.country} size={10} />
                                    <span className="tabular-nums">#{formatNumber(user.stats.countryRank)}</span>
                                 </rankingsRoute.Link>
                              </div>
                           )}
                        </div>
                     </div>
                  </div>
                  <SidebarMoreMenu
                     side="top"
                     trigger={
                        <Button
                           variant="ghost"
                           size="icon-sm"
                           className="text-muted-foreground hover:bg-accent/70 hover:text-foreground rounded-full"
                           aria-label={t('sidebar.more')}
                        >
                           <EllipsisVertical data-icon />
                        </Button>
                     }
                  />
               </div>
            ) : (
               <Button asChild variant="ghost" className={cn(navLinkClass, inactiveClass, 'w-full cursor-pointer justify-start')}>
                  <loginRoute.Link search={pathname === loginRoute.id ? {} : { redirectTo: currentPath }} onClick={onNavigateAction}>
                     <LogIn data-icon />
                     {t('sidebar.logIn')}
                  </loginRoute.Link>
               </Button>
            )}
            {!user && (
               <SidebarMoreMenu
                  side="top"
                  trigger={
                     <Button variant="ghost" className={cn(navLinkClass, inactiveClass, 'w-full justify-start')} aria-label={t('sidebar.more')}>
                        <CircleEllipsis data-icon />
                        {t('sidebar.more')}
                     </Button>
                  }
               />
            )}
         </div>
      </div>
   );
}
