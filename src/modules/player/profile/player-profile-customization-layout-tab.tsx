'use client';

import type { ReactNode } from 'react';

import { ArrowDown, ArrowUp } from 'lucide-react';
import { useTranslations } from 'use-intl';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

import { METRIC_KEYS, type MetricKey } from '@/modules/player/chart/chart-types';
import { PLAYER_PROFILE_STAT_IDS, type PlayerProfileStatId } from '@/modules/player/profile/player-profile-header';
import type { UserControllerUpdateProfileCustomizationPayload } from '@/shared/api/generated/Api';
import { ConditionalOverlay } from '@/shared/components/conditional-overlay';
import { SupporterRequiredOverlay } from '@/shared/components/supporter-required-overlay';
import { cn } from '@/shared/format/helpers';

export type ProfileSectionId = NonNullable<UserControllerUpdateProfileCustomizationPayload['sectionOrder']>[number];
export const PROFILE_SECTION_IDS: ProfileSectionId[] = ['charts', 'bio', 'pinnedScores', 'scores'];
export const REQUIRED_PROFILE_SECTION_IDS: readonly ProfileSectionId[] = ['scores'];

export interface ProfileLayoutCustomization {
   statOrder: PlayerProfileStatId[];
   enabledStatIds: PlayerProfileStatId[];
   chartMetricIds: MetricKey[];
   sectionOrder: ProfileSectionId[];
}

export const DEFAULT_PROFILE_LAYOUT: ProfileLayoutCustomization = {
   statOrder: [...PLAYER_PROFILE_STAT_IDS],
   enabledStatIds: [...PLAYER_PROFILE_STAT_IDS],
   chartMetricIds: [...METRIC_KEYS],
   sectionOrder: [...PROFILE_SECTION_IDS]
};

interface PlayerProfileCustomizationLayoutTabProps {
   draftLayout: ProfileLayoutCustomization;
   canUseLayoutCustomization: boolean;
   patreonConnected: boolean;
   onToggleStatAction: (statId: PlayerProfileStatId, checked: boolean) => void;
   onMoveStatAction: (statId: PlayerProfileStatId, direction: -1 | 1) => void;
   onToggleChartMetricAction: (metric: MetricKey, checked: boolean) => void;
   onToggleSectionAction: (sectionId: ProfileSectionId, checked: boolean) => void;
   onMoveSectionAction: (sectionId: ProfileSectionId, direction: -1 | 1) => void;
}

export function PlayerProfileCustomizationLayoutTab({
   draftLayout,
   canUseLayoutCustomization,
   patreonConnected,
   onToggleStatAction,
   onMoveStatAction,
   onToggleChartMetricAction,
   onToggleSectionAction,
   onMoveSectionAction
}: PlayerProfileCustomizationLayoutTabProps) {
   const t = useTranslations();
   const sectionLabels = {
      charts: t('player.customization.layout.sectionCharts'),
      bio: t('player.customization.layout.sectionBio'),
      pinnedScores: t('player.customization.layout.sectionPinnedScores'),
      scores: t('player.customization.layout.sectionScores')
   };
   const statLabels = {
      rankedPlays: t('player.rankedPlays'),
      rankedScore: t('player.rankedScore'),
      rankedAcc: t('player.rankedAcc'),
      plusOnePP: t('player.plusOnePP'),
      totalPlays: t('common.totalPlays'),
      totalScore: t('player.totalScore'),
      joined: t('player.joined'),
      replayViews: t('player.replayViews'),
      role: t('player.role')
   };
   const chartMetricLabels = {
      rank: t('player.chartMetricRankShort'),
      totalPP: t('common.pp'),
      averageAccuracy: t('player.chartMetricAccShort'),
      totalSubmittedPlays: t('player.chartMetricPlaysShort')
   };

   return (
      <div className="flex min-h-0 flex-1 flex-col">
         <ScrollArea className="min-h-0 flex-1">
            <div className="flex flex-col gap-5 px-5 py-4">
               <ConditionalOverlay
                  shouldShow={() => !canUseLayoutCustomization}
                  component={SupporterRequiredOverlay}
                  componentProps={{
                     patreonConnected,
                     title: t('player.customization.layout.lockTitle'),
                     description: t('player.customization.layout.lockDescription')
                  }}
                  className={cn('rounded-md', canUseLayoutCustomization && 'overflow-visible', !canUseLayoutCustomization && 'min-h-80')}
                  contentClassName="flex flex-col gap-5"
                  overlayClassName="min-h-80"
               >
                  <LayoutSection
                     title={t('player.customization.layout.sectionsTitle')}
                     description={t('player.customization.layout.sectionsDescription')}
                  >
                     <OrderedOptions
                        items={PROFILE_SECTION_IDS}
                        selectedItems={draftLayout.sectionOrder}
                        requiredItems={REQUIRED_PROFILE_SECTION_IDS}
                        disabled={!canUseLayoutCustomization}
                        getLabel={(sectionId) => sectionLabels[sectionId]}
                        onToggle={onToggleSectionAction}
                        onMove={onMoveSectionAction}
                     />
                  </LayoutSection>

                  <Separator />

                  <LayoutSection title={t('player.customization.layout.statsTitle')} description={t('player.customization.layout.statsDescription')}>
                     <OrderedOptions
                        items={PLAYER_PROFILE_STAT_IDS}
                        orderedItems={draftLayout.statOrder}
                        selectedItems={draftLayout.enabledStatIds}
                        allowUncheckedMove
                        disabled={!canUseLayoutCustomization}
                        getLabel={(statId) => statLabels[statId] ?? statId}
                        onToggle={onToggleStatAction}
                        onMove={onMoveStatAction}
                     />
                  </LayoutSection>

                  <Separator />

                  <LayoutSection
                     title={t('player.customization.layout.chartMetricsTitle')}
                     description={t('player.customization.layout.chartMetricsDescription')}
                  >
                     <div className="grid gap-2 sm:grid-cols-2">
                        {METRIC_KEYS.map((metric) => {
                           const checked = draftLayout.chartMetricIds.includes(metric);
                           return (
                              <label
                                 key={metric}
                                 htmlFor={`profile-chart-metric-${metric}`}
                                 className="border-border/60 bg-card/40 flex min-w-0 cursor-default items-center gap-2 rounded-md border p-3"
                              >
                                 <Checkbox
                                    id={`profile-chart-metric-${metric}`}
                                    checked={checked}
                                    disabled={!canUseLayoutCustomization}
                                    onCheckedChange={(value) => onToggleChartMetricAction(metric, value === true)}
                                 />
                                 <span className="truncate text-sm font-medium">{chartMetricLabels[metric]}</span>
                              </label>
                           );
                        })}
                     </div>
                  </LayoutSection>
               </ConditionalOverlay>
            </div>
         </ScrollArea>
      </div>
   );
}

function LayoutSection({ title, description, children }: { title: string; description: string; children: ReactNode }) {
   return (
      <section className="flex min-w-0 flex-col gap-3">
         <div className="flex flex-col gap-1">
            <h3 className="text-sm font-semibold">{title}</h3>
            <p className="text-muted-foreground text-xs">{description}</p>
         </div>
         {children}
      </section>
   );
}

function OrderedOptions<T extends string>({
   items,
   orderedItems,
   selectedItems,
   requiredItems = [],
   allowUncheckedMove = false,
   disabled,
   getLabel,
   onToggle,
   onMove
}: {
   items: readonly T[];
   orderedItems?: T[];
   selectedItems: T[];
   requiredItems?: readonly T[];
   allowUncheckedMove?: boolean;
   disabled: boolean;
   getLabel: (item: T) => string;
   onToggle: (item: T, checked: boolean) => void;
   onMove: (item: T, direction: -1 | 1) => void;
}) {
   const availableItems = new Set(items);
   const selectedItemSet = new Set(selectedItems);
   const requiredItemSet = new Set(requiredItems);
   const orderedOptionItems = orderedItems?.filter((item) => availableItems.has(item)) ?? selectedItems.filter((item) => availableItems.has(item));
   const orderedItemSet = new Set(orderedOptionItems);
   const optionItems = [
      ...orderedOptionItems,
      ...selectedItems.filter((item) => availableItems.has(item) && !orderedItemSet.has(item)),
      ...items.filter((item) => !orderedItemSet.has(item) && !selectedItemSet.has(item))
   ];

   return (
      <div className="flex flex-col gap-2">
         {optionItems.map((item, optionIndex) => {
            const selectedIndex = selectedItems.indexOf(item);
            const checked = selectedIndex !== -1;
            const required = requiredItemSet.has(item);
            const moveIndex = allowUncheckedMove ? optionIndex : selectedIndex;
            const moveLimit = allowUncheckedMove ? optionItems.length : selectedItems.length;
            const id = `profile-layout-${item}`;

            return (
               <div key={item} className="border-border/60 bg-card/40 flex min-w-0 items-center gap-2 rounded-md border p-3">
                  <Checkbox
                     id={id}
                     checked={checked}
                     disabled={disabled || required}
                     onCheckedChange={(value) => {
                        if (required && value !== true) return;
                        onToggle(item, value === true);
                     }}
                  />
                  <Label htmlFor={id} className="min-w-0 flex-1 cursor-default">
                     <span className="block truncate text-sm font-medium">{getLabel(item)}</span>
                     {checked && (
                        <span className="text-muted-foreground block text-xs">
                           <PositionLabel position={selectedIndex + 1} />
                        </span>
                     )}
                  </Label>
                  <MoveButtons
                     disabled={disabled || (!allowUncheckedMove && !checked)}
                     upDisabled={moveIndex <= 0}
                     downDisabled={moveIndex === -1 || moveIndex >= moveLimit - 1}
                     onUp={() => onMove(item, -1)}
                     onDown={() => onMove(item, 1)}
                  />
               </div>
            );
         })}
      </div>
   );
}

function MoveButtons({
   disabled,
   upDisabled,
   downDisabled,
   onUp,
   onDown
}: {
   disabled: boolean;
   upDisabled: boolean;
   downDisabled: boolean;
   onUp: () => void;
   onDown: () => void;
}) {
   const t = useTranslations();

   return (
      <div className="flex shrink-0 gap-1">
         <Button
            type="button"
            variant="ghost-icon"
            size="icon-xs"
            disabled={disabled || upDisabled}
            onClick={onUp}
            aria-label={t('player.customization.layout.moveUp')}
         >
            <ArrowUp data-icon />
         </Button>
         <Button
            type="button"
            variant="ghost-icon"
            size="icon-xs"
            disabled={disabled || downDisabled}
            onClick={onDown}
            aria-label={t('player.customization.layout.moveDown')}
         >
            <ArrowDown data-icon />
         </Button>
      </div>
   );
}

function PositionLabel({ position }: { position: number }) {
   const t = useTranslations();
   return t('player.customization.layout.position', { position });
}
