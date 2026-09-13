import type { RegisteredRouter, RouteIds } from '@tanstack/react-router';
import { BookOpen, Heart, Home, MessageSquareText, RadioTower, Search, Smartphone, Users } from 'lucide-react';
import { FaList, FaMap, FaMedal } from 'react-icons/fa';
import type { Messages } from 'use-intl';

import { Icons } from '@/shared/components/icons';

type NavKey = keyof Messages['nav'];
export type AppNavRoute = 'home' | 'maps' | 'rankings' | 'rankRequests' | 'live' | 'questInstaller' | 'team' | 'support';
type AppRouteId = RouteIds<RegisteredRouter['routeTree']>;
type NavItem = { key: NavKey; shortKey: NavKey; icon: React.ReactNode; route: AppNavRoute; disabled?: boolean };
type SearchNavItem = { key: NavKey; shortKey: NavKey; icon: React.ReactNode; action: 'search' };
type InternalSecondaryItem = { key: NavKey; icon: React.ReactNode; route: AppNavRoute; external: false };
type ExternalSecondaryItem = { key: NavKey; icon: React.ReactNode; href: string; external: true };

export const navItems: NavItem[] = [
   { key: 'home', shortKey: 'home', icon: <Home data-icon className="size-4" aria-hidden="true" />, route: 'home' },
   {
      key: 'maps',
      shortKey: 'maps',
      icon: <FaMap data-icon className="size-4 fill-current" aria-hidden="true" />,
      route: 'maps'
   },
   {
      key: 'rankings',
      shortKey: 'rankings',
      icon: <FaMedal data-icon className="size-4 fill-current" aria-hidden="true" />,
      route: 'rankings'
   },
   {
      key: 'rankRequests',
      shortKey: 'requests',
      icon: <FaList data-icon className="size-4 fill-current" aria-hidden="true" />,
      route: 'rankRequests'
   },
   {
      key: 'livePlatform',
      shortKey: 'livePlatform',
      icon: <RadioTower data-icon className="size-4" aria-hidden="true" />,
      route: 'live'
   }
];

// bottom bar uses search instead of being in the main nav
export const bottomBarItems: (NavItem | SearchNavItem)[] = [
   { key: 'home', shortKey: 'home', icon: <Home data-icon className="size-4" aria-hidden="true" />, route: 'home' },
   {
      key: 'search',
      shortKey: 'search',
      icon: <Search data-icon className="size-4" aria-hidden="true" />,
      action: 'search'
   },
   {
      key: 'maps',
      shortKey: 'maps',
      icon: <FaMap data-icon className="size-4 fill-current" aria-hidden="true" />,
      route: 'maps'
   },
   {
      key: 'rankings',
      shortKey: 'rankings',
      icon: <FaMedal data-icon className="size-4 fill-current" aria-hidden="true" />,
      route: 'rankings'
   },
   {
      key: 'rankRequests',
      shortKey: 'requests',
      icon: <FaList data-icon className="size-4 fill-current" aria-hidden="true" />,
      route: 'rankRequests'
   }
];

export const secondaryItems: (InternalSecondaryItem | ExternalSecondaryItem)[] = [
   {
      key: 'wiki',
      icon: <BookOpen data-icon className="size-4" aria-hidden="true" />,
      href: 'https://wiki.scoresaber.com',
      external: true
   },
   {
      key: 'feedbackHub',
      icon: <MessageSquareText data-icon className="size-4" aria-hidden="true" />,
      href: 'https://hub.scoresaber.com',
      external: true
   },
   {
      key: 'questInstaller',
      icon: <Smartphone data-icon className="size-4" aria-hidden="true" />,
      route: 'questInstaller',
      external: false
   },
   { key: 'team', icon: <Users data-icon className="size-4" aria-hidden="true" />, route: 'team', external: false },
   {
      key: 'support',
      icon: <Heart data-icon className="size-4" aria-hidden="true" />,
      route: 'support',
      external: false
   }
];

export const socialLinks = [
   { href: 'https://discord.gg/scoresaber', label: 'Discord', Icon: Icons.discord },
   { href: 'https://patreon.com/scoresaber', label: 'Patreon', Icon: Icons.patreon },
   { href: 'https://bsky.app/profile/scoresaber.com', label: 'Bluesky', Icon: Icons.bluesky },
   { href: 'https://x.com/scoresaber', label: 'X', Icon: Icons.twitter },
   { href: 'https://youtube.com/@ScoreSaber', label: 'YouTube', Icon: Icons.youtube }
];

export const githubLink = { href: 'https://github.com/ScoreSaber/website', label: 'GitHub', Icon: Icons.github };

const navRouteIds = {
   home: '/',
   maps: '/maps',
   rankings: '/rankings',
   rankRequests: '/ranking/requests',
   live: '/live/',
   questInstaller: '/quest',
   team: '/team',
   support: '/support'
} satisfies Record<AppNavRoute, AppRouteId>;

export function isNavActive(pathname: string, route: AppNavRoute) {
   const href = navRouteIds[route];
   return href === navRouteIds.home ? pathname === navRouteIds.home : pathname.startsWith(href);
}
