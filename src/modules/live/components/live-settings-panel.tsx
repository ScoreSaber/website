'use client';

import { useEffect, useMemo, useState } from 'react';

import { Ban, Loader2, Save, Settings } from 'lucide-react';
import { useTranslations } from 'use-intl';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { useActionMutation } from '@/hooks/use-action-mutation';
import { DirtyNavigationBlocker } from '@/hooks/use-dirty-navigation-blocker';
import { upsertLiveSettings } from '@/modules/live/actions/admin';
import { FormField, LiveSection } from '@/modules/live/components/live-ui';
import type { LiveTournamentControllerUpsertSettingsPayload } from '@/shared/api/generated/Api';
import type {
   LiveTournamentControllerGetSettingsResponse,
   LiveTournamentControllerGetWorkflowOptionsResponse
} from '@/shared/api/generated/ApiParams';

type LiveTournamentStatus = NonNullable<LiveTournamentControllerUpsertSettingsPayload['status']>;
type LiveSettings = LiveTournamentControllerGetSettingsResponse;
type LiveSettingsPayload = LiveTournamentControllerUpsertSettingsPayload;

export function LiveSettingsPanel({
   tournamentId,
   settings,
   options
}: {
   tournamentId: string;
   settings: LiveSettings | null;
   options: LiveTournamentControllerGetWorkflowOptionsResponse;
}) {
   const t = useTranslations('live');
   const tc = useTranslations('common');
   const mutation = useActionMutation<LiveSettings>();
   const statusSchema = useMemo(() => createStatusSchema(options.tournamentStatuses), [options.tournamentStatuses]);
   const defaultStatus = options.tournamentStatuses[0] ?? 'DRAFT';
   const [savedName, setSavedName] = useState(settings?.name ?? tournamentId);
   const [savedStatus, setSavedStatus] = useState<LiveSettingsPayload['status']>(settings?.status ?? defaultStatus);
   const [savedDeniedModsText, setSavedDeniedModsText] = useState(formatDeniedMods(settings?.deniedMods ?? []));
   const [name, setName] = useState(savedName);
   const [status, setStatus] = useState<LiveSettingsPayload['status']>(savedStatus);
   const [deniedModsText, setDeniedModsText] = useState(savedDeniedModsText);
   const [deniedModsOpen, setDeniedModsOpen] = useState(false);
   const pending = mutation.isPending;
   const isDirty = name !== savedName || status !== savedStatus || deniedModsText !== savedDeniedModsText;

   useEffect(() => {
      const nextName = settings?.name ?? tournamentId;
      const nextStatus = settings?.status ?? defaultStatus;
      const nextDeniedModsText = formatDeniedMods(settings?.deniedMods ?? []);
      setSavedName(nextName);
      setSavedStatus(nextStatus);
      setSavedDeniedModsText(nextDeniedModsText);
      setName(nextName);
      setStatus(nextStatus);
      setDeniedModsText(nextDeniedModsText);
   }, [defaultStatus, settings, tournamentId]);

   function saveSettings() {
      const payload: LiveSettingsPayload = {
         name: name.trim() || tournamentId,
         status,
         deniedMods: parseDeniedMods(deniedModsText)
      };

      mutation.run(
         () => upsertLiveSettings(tournamentId, payload),
         t('settingsSaved'),
         t('settingsSaveFailed'),
         (result) => {
            const nextName = result.name ?? tournamentId;
            const nextDeniedModsText = formatDeniedMods(result.deniedMods ?? []);
            setSavedName(nextName);
            setSavedStatus(result.status);
            setSavedDeniedModsText(nextDeniedModsText);
            setName(nextName);
            setStatus(result.status);
            setDeniedModsText(nextDeniedModsText);
            setDeniedModsOpen(false);
         }
      );
   }

   return (
      <>
         <LiveSection
            title={t('tournamentSettings')}
            icon={<Settings data-icon />}
            actions={
               <>
                  <Button type="button" variant="secondary" className="cursor-pointer" onClick={() => setDeniedModsOpen(true)} disabled={pending}>
                     <Ban data-icon="inline-start" />
                     {t('deniedMods')}
                  </Button>
                  <Button className="cursor-pointer" onClick={saveSettings} disabled={pending || !isDirty}>
                     {pending ? <Loader2 className="animate-spin" /> : <Save data-icon="inline-start" />}
                     {t('saveChanges')}
                  </Button>
               </>
            }
         >
            <div className="grid gap-3 md:grid-cols-2">
               <FormField id="live-name" label={t('name')}>
                  <Input id="live-name" value={name} onChange={(event) => setName(event.target.value)} disabled={pending} />
               </FormField>
               <FormField id="live-status" label={t('status')}>
                  <Select
                     value={status}
                     onValueChange={(value) => {
                        const result = statusSchema.safeParse(value);
                        if (result.success) setStatus(result.data);
                     }}
                     disabled={pending}
                  >
                     <SelectTrigger id="live-status" className="cursor-pointer">
                        <SelectValue />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectGroup>
                           {options.tournamentStatuses.map((item) => (
                              <SelectItem key={item} value={item}>
                                 {item}
                              </SelectItem>
                           ))}
                        </SelectGroup>
                     </SelectContent>
                  </Select>
               </FormField>
            </div>
         </LiveSection>
         <Dialog open={deniedModsOpen} onOpenChange={setDeniedModsOpen}>
            <DialogContent className="max-h-[calc(100dvh-2rem)] sm:max-w-xl">
               <DialogHeader>
                  <DialogTitle>{t('deniedMods')}</DialogTitle>
                  <DialogDescription>{t('deniedModsDescription')}</DialogDescription>
               </DialogHeader>
               <FormField id="live-denied-mods" label={t('deniedModsList')}>
                  <Textarea
                     id="live-denied-mods"
                     value={deniedModsText}
                     onChange={(event) => setDeniedModsText(event.target.value)}
                     placeholder={t('deniedModsPlaceholder')}
                     className="min-h-56 font-mono text-sm"
                     disabled={pending}
                  />
               </FormField>
               <DialogFooter>
                  <Button type="button" variant="secondary" onClick={() => setDeniedModsOpen(false)} disabled={pending}>
                     {tc('cancel')}
                  </Button>
                  <Button type="button" onClick={saveSettings} disabled={pending || !isDirty}>
                     {pending ? <Loader2 className="animate-spin" /> : <Save data-icon="inline-start" />}
                     {t('saveChanges')}
                  </Button>
               </DialogFooter>
            </DialogContent>
         </Dialog>
         <DirtyNavigationBlocker
            isDirty={isDirty}
            title={t('unsavedChangesTitle')}
            description={t('unsavedChangesConfirm')}
            confirmLabel={t('leaveWithoutSaving')}
         />
      </>
   );
}

function createStatusSchema(statuses: readonly LiveTournamentStatus[]) {
   return z.custom<LiveTournamentStatus>((value) => statuses.some((status) => status === value));
}

function parseDeniedMods(value: string) {
   return [
      ...new Set(
         value
            .split(/\r?\n/g)
            .map((item) => item.trim().toLowerCase())
            .filter(Boolean)
      )
   ];
}

function formatDeniedMods(value: readonly string[]) {
   return value.join('\n');
}
