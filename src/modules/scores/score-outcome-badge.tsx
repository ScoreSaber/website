'use client';

import { LogOut, RotateCcw, X } from 'lucide-react';
import { useTranslations } from 'use-intl';

import { Stat } from '@/shared/components/stat';
import { cn } from '@/shared/format/helpers';

type NonClearOutcome = 'FAIL' | 'QUIT' | 'RESTART';
type OutcomeStyle = {
   icon: typeof X;
   className: string;
   labelKey: 'score.outcomeFailAt' | 'score.outcomeQuitAt' | 'score.outcomeRestartAt';
};

const OUTCOME_STYLES = {
   FAIL: {
      icon: X,
      className: 'border-score-combo-broken/50 bg-score-combo-broken/10 text-score-combo-broken',
      labelKey: 'score.outcomeFailAt'
   },
   QUIT: {
      icon: LogOut,
      className: 'border-amber-500/50 bg-amber-500/10 text-amber-500',
      labelKey: 'score.outcomeQuitAt'
   },
   RESTART: {
      icon: RotateCcw,
      className: 'border-sky-500/50 bg-sky-500/10 text-sky-500',
      labelKey: 'score.outcomeRestartAt'
   }
} satisfies Record<NonClearOutcome, OutcomeStyle>;

export function formatOutcomeTime(seconds: number) {
   const total = Math.max(0, Math.floor(seconds));
   const minutes = Math.floor(total / 60);
   const secs = total % 60;
   return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

interface ScoreOutcomeBadgeProps {
   outcome: NonClearOutcome;
   time: number;
   statClassName?: string;
   iconClassName?: string;
}

export function ScoreOutcomeBadge({ outcome, time, statClassName, iconClassName }: ScoreOutcomeBadgeProps) {
   const t = useTranslations();
   const style = OUTCOME_STYLES[outcome];

   return (
      <Stat
         icon={style.icon}
         className={cn(statClassName, 'cursor-default', style.className)}
         valueClassName="text-inherit"
         iconClassName={iconClassName}
      >
         <span className="whitespace-nowrap tabular-nums">{t(style.labelKey, { time: formatOutcomeTime(time) })}</span>
      </Stat>
   );
}
