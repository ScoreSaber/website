'use client';

import type { CSSProperties } from 'react';

import { useLocale, useTranslations } from 'use-intl';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { cn } from '@/shared/format/helpers';
import { createRelativeTimeFormatters } from '@/shared/format/relative-time';

type TimeProps = {
   date: Date | string | number | null | undefined;
   short?: boolean;
   dateOnly?: boolean;
   dateStyle?: 'medium' | 'long';
   className?: string;
   longRelativeClassName?: string;
   shortFitTargetLength?: number;
   minShortFitScale?: number;
};

const RELATIVE_UNITS: { seconds: number; unit: Intl.RelativeTimeFormatUnit }[] = [
   { seconds: 31536000, unit: 'year' },
   { seconds: 2628000, unit: 'month' },
   { seconds: 86400, unit: 'day' },
   { seconds: 3600, unit: 'hour' },
   { seconds: 60, unit: 'minute' }
];

const LONG_SHORT_TIME_LENGTH = 11;
const MIN_SHORT_TIME_SCALE = 0.65;
type TimeFormatters = ReturnType<typeof createTimeFormatters>;
const timeFormattersByLocale = new Map<string, TimeFormatters>();

export function Time({
   date,
   short = false,
   dateOnly,
   dateStyle,
   className,
   longRelativeClassName,
   shortFitTargetLength = LONG_SHORT_TIME_LENGTH,
   minShortFitScale = MIN_SHORT_TIME_SCALE
}: TimeProps) {
   const dateObj = date == null ? null : new Date(date);
   const locale = useLocale();
   const t = useTranslations('common');
   const formatters = getTimeFormatters(locale);

   if (!dateObj || isNaN(dateObj.getTime())) {
      return <span className={className}>{t('unknownDate')}</span>;
   }

   const fullDate = formatters.fullDate.format(dateObj);

   if (dateStyle || dateOnly) {
      const displayText = dateStyle
         ? formatters[dateStyle === 'long' ? 'longDate' : 'mediumDate'].format(dateObj)
         : formatters.monthYear.format(dateObj);

      return (
         <Tooltip>
            <TooltipTrigger asChild>
               <span className={cn(className, 'cursor-help')}>{displayText}</span>
            </TooltipTrigger>
            <TooltipContent>
               <p>{fullDate}</p>
            </TooltipContent>
         </Tooltip>
      );
   }

   const displayText = timeAgo(dateObj, short, formatters, t('justNow'));
   const canFitShortTime = short && !!longRelativeClassName;
   const longShortTimeClassName = canFitShortTime && displayText.length > LONG_SHORT_TIME_LENGTH ? longRelativeClassName : undefined;
   const shortTimeStyle: (CSSProperties & { '--short-time-font-size': string }) | undefined =
      canFitShortTime && displayText.length > shortFitTargetLength
         ? { '--short-time-font-size': `${Math.max(minShortFitScale, shortFitTargetLength / displayText.length)}em` }
         : undefined;

   return (
      <Tooltip>
         <TooltipTrigger asChild>
            <span
               className={cn(className, 'cursor-help', short && 'whitespace-nowrap', longShortTimeClassName)}
               style={shortTimeStyle}
               suppressHydrationWarning
            >
               {displayText}
            </span>
         </TooltipTrigger>
         <TooltipContent>
            <p>{fullDate}</p>
         </TooltipContent>
      </Tooltip>
   );
}

function timeAgo(date: Date, isShort: boolean, formatters: TimeFormatters, justNow: string) {
   const secondsFromNow = Math.round((date.getTime() - Date.now()) / 1000);
   const absoluteSeconds = Math.abs(secondsFromNow);

   for (const { seconds, unit } of RELATIVE_UNITS) {
      if (absoluteSeconds < seconds) continue;
      const value = Math.trunc(secondsFromNow / seconds);
      const rtf = isShort ? formatters.relativeShort : formatters.relativeLong;
      return rtf.format(value, unit);
   }
   return justNow;
}

function getTimeFormatters(locale: string) {
   const cached = timeFormattersByLocale.get(locale);
   if (cached) return cached;

   const formatters = createTimeFormatters(locale);
   timeFormattersByLocale.set(locale, formatters);
   return formatters;
}

function createTimeFormatters(locale: string) {
   return {
      ...createRelativeTimeFormatters(locale),
      fullDate: new Intl.DateTimeFormat(locale, {
         weekday: 'long',
         year: 'numeric',
         month: 'long',
         day: 'numeric',
         hour: 'numeric',
         minute: '2-digit',
         second: '2-digit'
      }),
      monthYear: new Intl.DateTimeFormat(locale, {
         month: 'long',
         year: 'numeric'
      }),
      shortDate: new Intl.DateTimeFormat(locale, {
         month: 'short',
         day: 'numeric',
         year: '2-digit'
      }),
      mediumDate: new Intl.DateTimeFormat(locale, {
         dateStyle: 'medium'
      }),
      longDate: new Intl.DateTimeFormat(locale, {
         dateStyle: 'long'
      })
   };
}
