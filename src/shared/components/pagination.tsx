'use client';

import { useCallback, useEffect, useState, type MouseEvent } from 'react';

import { useRouter } from '@tanstack/react-router';
import { CornerDownLeft } from 'lucide-react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useTranslations } from 'use-intl';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { Icons } from '@/shared/components/icons';
import { generateNavigationOptions } from '@/shared/components/pagination-options';
import { cn, formatNumber } from '@/shared/format/helpers';
import { isRouterClick, navigateToRoute, type RouteLocation } from '@/shared/url-state/route-location';
import { useRouteHrefPreload } from '@/shared/url-state/use-route-href-preload';

type PaginationProps<TLocation> = {
   totalItems: number;
   pageSize: number;
   currentPage: number;
   limit?: number;
   anchor?: string;
   scroll?: boolean;
   getPageLocation: (page: number) => RouteLocation<TLocation>;
};

export function Pagination<TLocation>({
   totalItems,
   pageSize,
   currentPage,
   anchor,
   scroll = true,
   getPageLocation: getBasePageLocation
}: PaginationProps<TLocation>) {
   const router = useRouter();
   const { getHref, schedulePreload, preloadNow, cancelPreload } = useRouteHrefPreload();
   const getPageLocation = useCallback(
      (page: number) => {
         const location = getBasePageLocation(page);
         return anchor ? { ...location, hash: anchor } : location;
      },
      [getBasePageLocation, anchor]
   );
   const totalPages = Math.ceil(totalItems / pageSize);
   const [pendingPage, setPendingPage] = useState<{ value: number | undefined; type: string } | null>(null);

   const isLoading = pendingPage !== null && pendingPage.value !== currentPage;

   useEffect(() => {
      if (pendingPage?.value === currentPage) setPendingPage(null);
   }, [pendingPage?.value, currentPage]);

   const options = generateNavigationOptions({ totalItems, pageSize, currentPage, limit: 1, showStepOptions: true });

   if (totalPages <= 1) return null;

   return (
      <div data-pagination className="flex flex-row items-center gap-1">
         {options.map((option) => {
            if (option.type === 'symbol' && option.symbol === 'ELLIPSIS') {
               return (
                  <EllipsisPageJump
                     key={`ellipsis-${option.value}`}
                     totalPages={totalPages}
                     onNavigate={(page) => {
                        const location = getPageLocation(page);
                        setPendingPage({ value: page, type: 'number' });
                        void navigateToRoute(router, location, { resetScroll: scroll });
                     }}
                  />
               );
            }

            const key = option.type === 'number' ? `num-${option.value}` : `sym-${option.symbol}`;
            const atBounds =
               option.type === 'symbol' &&
               ((option.symbol === 'NEXT_PAGE' && currentPage >= totalPages) || (option.symbol === 'PREVIOUS_PAGE' && currentPage <= 1));
            const disabled = atBounds;
            const label = option.type === 'number' ? formatNumber(option.value) : option.symbol === 'PREVIOUS_PAGE' ? '<' : '>';
            const active = option.type === 'number' && option.value === currentPage;
            const loading = isLoading && pendingPage?.value === option.value && pendingPage?.type === option.type;
            const location = getPageLocation(option.value);
            const href = getHref(location);
            const activeStyle =
               active || loading
                  ? {
                       borderColor: 'var(--profile-accent, var(--primary))',
                       backgroundColor: 'var(--profile-accent, var(--primary))',
                       color: 'var(--profile-accent-active-foreground, var(--profile-accent-foreground, var(--primary-foreground)))'
                    }
                  : undefined;
            const inactiveStyle =
               !active && !loading && !disabled
                  ? {
                       color: 'var(--profile-accent-foreground)'
                    }
                  : undefined;

            function handleClick(event: MouseEvent<HTMLAnchorElement>) {
               if (disabled) {
                  event.preventDefault();
                  return;
               }

               if (!isRouterClick(event)) return;

               event.preventDefault();
               setPendingPage({ value: option.value, type: option.type });
               void navigateToRoute(router, location, { resetScroll: scroll });
            }

            return (
               <a
                  key={key}
                  href={href}
                  onClick={handleClick}
                  onMouseEnter={() => !disabled && schedulePreload(location)}
                  onFocus={() => !disabled && schedulePreload(location)}
                  onMouseLeave={cancelPreload}
                  onBlur={cancelPreload}
                  onTouchStart={() => !disabled && preloadNow(location)}
                  className={disabled ? 'pointer-events-none' : ''}
               >
                  <Button
                     disabled={disabled}
                     variant="secondary"
                     className={cn('min-w-8 cursor-pointer items-center border p-1', (active || loading) && 'border-primary/85 bg-card')}
                     style={activeStyle ?? inactiveStyle}
                  >
                     {loading ? <Icons.spinner data-icon className="size-4 animate-spin" /> : label}
                  </Button>
               </a>
            );
         })}
      </div>
   );
}

export function PaginationArrow<TLocation>({ direction, page, disabled, getPageLocation }: PaginationArrowProps<TLocation>) {
   const router = useRouter();
   const { getHref, schedulePreload, preloadNow, cancelPreload } = useRouteHrefPreload();
   const [pendingHref, setPendingHref] = useState<string | null>(null);
   const location = getPageLocation(page);
   const href = getHref(location);
   const Icon = direction === 'left' ? FaArrowLeft : FaArrowRight;
   const loading = pendingHref === href;
   const buttonDisabled = disabled || loading;

   useEffect(() => {
      if (pendingHref !== null && (pendingHref !== href || disabled)) setPendingHref(null);
   }, [disabled, href, pendingHref]);

   if (buttonDisabled) {
      return (
         <Button variant="secondary" size="icon" disabled className="cursor-pointer">
            {loading ? <Icons.spinner data-icon className="size-4 animate-spin" /> : <Icon data-icon />}
         </Button>
      );
   }

   return (
      <a
         href={href}
         onClick={(event) => {
            if (!isRouterClick(event)) return;
            event.preventDefault();
            setPendingHref(href);
            void navigateToRoute(router, location, { resetScroll: true });
         }}
         onMouseEnter={() => schedulePreload(location)}
         onFocus={() => schedulePreload(location)}
         onMouseLeave={cancelPreload}
         onBlur={cancelPreload}
         onTouchStart={() => preloadNow(location)}
         className={loading ? 'pointer-events-none' : ''}
      >
         <Button variant="secondary" size="icon" className="cursor-pointer" style={{ color: 'var(--profile-accent-foreground)' }}>
            {loading ? <Icons.spinner data-icon className="size-4 animate-spin" /> : <Icon data-icon />}
         </Button>
      </a>
   );
}

export function PaginationArrows<TLocation>({ currentPage, totalPages, getPageLocation }: PaginationArrowsProps<TLocation>) {
   return (
      <div className="flex items-center justify-between">
         <PaginationArrow direction="left" page={currentPage - 1} disabled={currentPage <= 1} getPageLocation={getPageLocation} />
         <PaginationArrow direction="right" page={currentPage + 1} disabled={currentPage >= totalPages} getPageLocation={getPageLocation} />
      </div>
   );
}

function EllipsisPageJump({ totalPages, onNavigate }: { totalPages: number; onNavigate: (page: number) => void }) {
   const t = useTranslations();
   const [isOpen, setIsOpen] = useState(false);
   const [input, setInput] = useState('');

   function handleSubmit() {
      const page = Math.min(Math.max(1, parseInt(input.replaceAll(',', ''), 10) || 1), totalPages);
      setIsOpen(false);
      setInput('');
      onNavigate(page);
   }

   return (
      <Popover
         open={isOpen}
         onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) setInput('');
         }}
      >
         <PopoverTrigger asChild>
            <Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground" aria-label={t('common.goToPage')}>
               &hellip;
            </Button>
         </PopoverTrigger>
         <PopoverContent className="w-auto p-2" sideOffset={8}>
            <div className="flex items-center gap-1.5">
               <Input
                  type="number"
                  min={1}
                  max={totalPages}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  className="h-8 w-20 text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  placeholder={`1-${formatNumber(totalPages)}`}
                  autoFocus
               />
               <Button variant="secondary" size="icon-sm" onClick={handleSubmit} aria-label={t('common.goToPage')} className="cursor-pointer">
                  <CornerDownLeft data-icon />
               </Button>
            </div>
         </PopoverContent>
      </Popover>
   );
}

type PaginationArrowProps<TLocation> = {
   direction: 'left' | 'right';
   page: number;
   disabled: boolean;
   getPageLocation: (page: number) => RouteLocation<TLocation>;
};

type PaginationArrowsProps<TLocation> = {
   currentPage: number;
   totalPages: number;
   getPageLocation: (page: number) => RouteLocation<TLocation>;
};
