'use client';

import type { RegisteredRouter, RouteIds } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import { Activity, Settings, Shield, UserRound, Users } from 'lucide-react';
import { useTranslations } from 'use-intl';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import type { LiveTab } from '@/modules/live/live-tabs';

type LiveRouteId = Extract<RouteIds<RegisteredRouter['routeTree']>, `/live/$tournamentId/${LiveTab}`>;
type LiveNavItem = { tab: LiveTab; to: LiveRouteId; icon: React.ReactNode };

const LIVE_NAV_ITEMS: LiveNavItem[] = [
   { tab: 'settings', to: '/live/$tournamentId/settings', icon: <Settings data-icon /> },
   { tab: 'players', to: '/live/$tournamentId/players', icon: <Users data-icon /> },
   { tab: 'teams', to: '/live/$tournamentId/teams', icon: <UserRound data-icon /> },
   { tab: 'roles', to: '/live/$tournamentId/roles', icon: <Shield data-icon /> },
   { tab: 'rooms', to: '/live/$tournamentId/rooms', icon: <Activity data-icon /> }
];

export function LiveNav({ tournamentId, activeTab }: { tournamentId: string; activeTab: LiveTab }) {
   const t = useTranslations('live');

   return (
      <Tabs value={activeTab} orientation="vertical">
         <TabsList variant="sidebar">
            {LIVE_NAV_ITEMS.map((item) => (
               <TabsTrigger key={item.tab} value={item.tab} asChild>
                  <Link to={item.to} params={{ tournamentId }} resetScroll={false}>
                     {item.icon}
                     {t(item.tab)}
                  </Link>
               </TabsTrigger>
            ))}
         </TabsList>
      </Tabs>
   );
}
