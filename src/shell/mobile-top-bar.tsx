'use client';

import { useState } from 'react';

import { getRouteApi } from '@tanstack/react-router';
import { Menu } from 'lucide-react';
import { useTranslations } from 'use-intl';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet';

import { useAuth } from '@/modules/auth';
import { PlayerAvatar } from '@/modules/player/shared/player-avatar';
import { Image } from '@/shared/components/image';
import { cn } from '@/shared/format/helpers';
import { useDesktopLayout } from '@/shared/ui-adjacent/viewport';
import { SidebarNav } from '@/shell/sidebar-nav';
import { useHideOnScroll } from '@/shell/use-hide-on-scroll';

const homeRoute = getRouteApi('/');

export function MobileTopBar() {
   const tSidebar = useTranslations();
   const { user } = useAuth();
   const [open, setOpen] = useState(false);
   const hidden = useHideOnScroll();
   const desktop = useDesktopLayout('lg');
   if (desktop) return null;

   return (
      <>
         <header
            className={cn(
               'bg-background/95 supports-backdrop-filter:bg-background/60 fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-sm transition-transform duration-300 ease-in-out lg:hidden',
               hidden ? '-translate-y-full' : 'translate-y-0'
            )}
            style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
         >
            <div className="relative flex h-12 items-center px-4">
               {/* left: hamburger or pfp */}
               <Button variant="ghost" size="icon-sm" onClick={() => setOpen(true)} aria-label={tSidebar('sidebar.openMenu')}>
                  {user ? (
                     <PlayerAvatar
                        src={user.avatar}
                        version={user.avatarVersion}
                        alt={user.name}
                        width={28}
                        height={28}
                        className="size-7 rounded-full"
                     />
                  ) : (
                     <Menu data-icon className="size-5" />
                  )}
               </Button>

               {/* center: logo */}
               <homeRoute.Link className="absolute left-1/2 -translate-x-1/2" aria-label="ScoreSaber Home">
                  <Image src="/scoresaber.svg" width={28} height={28} alt={tSidebar('common.scoreSaberLogo')} priority />
               </homeRoute.Link>

               {/* right spacer */}
               <div className="ml-auto w-8" />
            </div>
         </header>

         <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent side="left" className="w-54 p-0" showCloseButton={false}>
               <SheetTitle className="sr-only">Menu</SheetTitle>
               <SheetDescription className="sr-only">Navigation menu</SheetDescription>
               <SidebarNav onNavigateAction={() => setOpen(false)} />
            </SheetContent>
         </Sheet>
      </>
   );
}
