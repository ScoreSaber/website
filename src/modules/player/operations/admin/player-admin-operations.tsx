'use client';

import { useEffect, useState } from 'react';

import { useTranslations } from 'use-intl';

import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { adminResetCountry, banPlayer, unbanPlayer, unsilencePlayer, updateRoleText } from '@/modules/player/actions/user/admin';
import { PlayerBadgeManagerDialog } from '@/modules/player/operations/admin/player-badge-manager-dialog';
import { PlayerMergeDialog, type AdminMergeTarget } from '@/modules/player/operations/admin/player-merge-dialog';
import { PlayerPermissionEditor } from '@/modules/player/operations/admin/player-permission-editor';
import type { OperationAction } from '@/modules/player/operations/operation-action';
import { ConfirmDialog } from '@/shared/components/confirm-dialog';

type PlayerAdminOperation = 'ban' | 'unban' | 'unsilence' | 'admin-country' | 'role-text' | 'permissions' | 'badges' | 'merge';

interface PlayerAdminOperationsProps {
   activeOperation: PlayerAdminOperation | null;
   playerId: string;
   playerBanned: boolean;
   playerPermissions: number;
   playerRole: string | null;
   mergeTarget?: AdminMergeTarget;
   currentUserPermissions: number;
   isOwnProfile: boolean;
   action: OperationAction;
   onOpenChangeAction: (open: boolean) => void;
}

export function PlayerAdminOperations({
   activeOperation,
   playerId,
   playerBanned,
   playerPermissions,
   playerRole,
   mergeTarget,
   currentUserPermissions,
   isOwnProfile,
   action,
   onOpenChangeAction
}: PlayerAdminOperationsProps) {
   const t = useTranslations();
   const [banReason, setBanReason] = useState('');
   const [banNotes, setBanNotes] = useState('');
   const [autoUnban, setAutoUnban] = useState(false);
   const [autoUnbansAt, setAutoUnbansAt] = useState('');
   const [earliestAppealDate, setEarliestAppealDate] = useState('');
   const [countryValue, setCountryValue] = useState('');
   const [roleTextValue, setRoleTextValue] = useState(playerRole ?? '');
   const pending = action.isPending;
   const trimmedBanReason = banReason.trim();
   const autoUnbanDate = autoUnbansAt ? new Date(autoUnbansAt) : null;
   const autoUnbanDateInvalid = autoUnban && (!autoUnbanDate || Number.isNaN(autoUnbanDate.getTime()) || autoUnbanDate <= new Date());
   const appealDate = earliestAppealDate ? new Date(earliestAppealDate) : null;
   const appealDateInvalid = appealDate != null && Number.isNaN(appealDate.getTime());

   useEffect(() => {
      if (activeOperation === 'role-text') {
         setRoleTextValue(playerRole ?? '');
      }
   }, [activeOperation, playerRole]);

   function closeDialog() {
      onOpenChangeAction(false);
   }

   function handleBan() {
      if (!trimmedBanReason || autoUnbanDateInvalid || appealDateInvalid) return;
      action.run(
         () =>
            banPlayer({
               playerId,
               reason: trimmedBanReason,
               notes: banNotes || undefined,
               autoUnban,
               autoUnbansAt: autoUnban && autoUnbansAt ? new Date(autoUnbansAt).toISOString() : undefined,
               earliestAppealDate: appealDate?.toISOString()
            }),
         t('player.playerBanned'),
         t('player.failedToBan'),
         () => {
            closeDialog();
            setBanReason('');
            setBanNotes('');
            setAutoUnban(false);
            setAutoUnbansAt('');
            setEarliestAppealDate('');
         }
      );
   }

   function handleUnban() {
      if (!playerBanned) return;
      action.run(() => unbanPlayer(playerId), t('player.playerUnbanned'), t('player.failedToUnban'), closeDialog);
   }

   function handleUnsilence() {
      action.run(() => unsilencePlayer(playerId), t('player.playerUnsilenced'), t('player.failedToUnsilence'), closeDialog);
   }

   function handleAdminResetCountry() {
      if (!countryValue || countryValue.length !== 2) return;
      action.run(
         () => adminResetCountry(playerId, countryValue.toUpperCase()),
         t('player.countryUpdated'),
         t('player.failedToSetCountry'),
         () => {
            closeDialog();
            setCountryValue('');
         }
      );
   }

   function handleRoleTextUpdate() {
      action.run(() => updateRoleText(playerId, roleTextValue.trim()), t('player.roleTextUpdated'), t('player.failedToUpdateRoleText'), closeDialog);
   }

   return (
      <>
         <ConfirmDialog
            open={activeOperation === 'unban'}
            onOpenChangeAction={onOpenChangeAction}
            title={t('player.unbanPlayer')}
            description={t('player.unbanDialogDesc')}
            confirmLabel={t('player.unbanPlayer')}
            pending={pending}
            onConfirmAction={handleUnban}
         />

         <ConfirmDialog
            open={activeOperation === 'unsilence'}
            onOpenChangeAction={onOpenChangeAction}
            title={t('player.unsilencePlayer')}
            description={t('player.unsilenceDialogDesc')}
            confirmLabel={t('player.unsilencePlayer')}
            pending={pending}
            onConfirmAction={handleUnsilence}
         />

         <ConfirmDialog
            open={activeOperation === 'ban'}
            onOpenChangeAction={onOpenChangeAction}
            title={t('player.banPlayer')}
            description={t('player.banDialogDesc')}
            confirmLabel={t('player.banPlayer')}
            pending={pending}
            variant="destructive"
            disabled={!trimmedBanReason || autoUnbanDateInvalid || appealDateInvalid}
            onConfirmAction={handleBan}
         >
            <div className="flex flex-col gap-3">
               <div className="flex flex-col gap-1.5">
                  <Label>{t('player.reason')}</Label>
                  <Input
                     value={banReason}
                     onChange={(e) => setBanReason(e.target.value)}
                     placeholder={t('player.banReason')}
                     maxLength={256}
                     required
                  />
               </div>
               <div className="flex flex-col gap-1.5">
                  <Label>{t('player.internalNotes')}</Label>
                  <Textarea
                     value={banNotes}
                     onChange={(e) => setBanNotes(e.target.value)}
                     placeholder={t('player.internalNotesPlaceholder')}
                     maxLength={512}
                     rows={3}
                     size="sm"
                     resize="none"
                  />
               </div>
               <label className="flex items-center gap-2 text-sm font-medium">
                  <Checkbox checked={autoUnban} onCheckedChange={(value) => setAutoUnban(value === true)} />
                  {t('player.automaticallyUnban')}
               </label>
               {autoUnban && (
                  <div className="flex flex-col gap-1.5">
                     <Label htmlFor="auto-unban-date">{t('player.automaticUnbanDate')}</Label>
                     <Input
                        id="auto-unban-date"
                        type="datetime-local"
                        value={autoUnbansAt}
                        onChange={(event) => setAutoUnbansAt(event.target.value)}
                        required
                        aria-invalid={autoUnbanDateInvalid}
                     />
                     {autoUnbanDateInvalid && <p className="text-destructive text-sm">{t('player.automaticUnbanDateError')}</p>}
                  </div>
               )}
               <div className="flex flex-col gap-1.5">
                  <Label htmlFor="earliest-appeal-date">{t('player.earliestAppealDate')}</Label>
                  <Input
                     id="earliest-appeal-date"
                     type="datetime-local"
                     value={earliestAppealDate}
                     onChange={(event) => setEarliestAppealDate(event.target.value)}
                     aria-invalid={appealDateInvalid}
                  />
                  {appealDateInvalid && <p className="text-destructive text-sm">{t('player.appealDateError')}</p>}
               </div>
            </div>
         </ConfirmDialog>

         <PlayerBadgeManagerDialog open={activeOperation === 'badges'} playerId={playerId} onOpenChangeAction={onOpenChangeAction} />

         {mergeTarget && <PlayerMergeDialog open={activeOperation === 'merge'} target={mergeTarget} onOpenChangeAction={onOpenChangeAction} />}

         <PlayerPermissionEditor
            open={activeOperation === 'permissions'}
            onOpenChangeAction={onOpenChangeAction}
            playerId={playerId}
            playerPermissions={playerPermissions}
            currentUserPermissions={currentUserPermissions}
            isOwnProfile={isOwnProfile}
         />

         <ConfirmDialog
            open={activeOperation === 'role-text'}
            onOpenChangeAction={onOpenChangeAction}
            title={t('player.setRoleText')}
            description={t('player.setRoleTextDialogDesc')}
            confirmLabel={t('player.setRoleText')}
            pending={pending}
            disabled={roleTextValue.length > 128}
            onConfirmAction={handleRoleTextUpdate}
         >
            <div className="flex flex-col gap-1.5">
               <Label>{t('player.roleText')}</Label>
               <Input
                  value={roleTextValue}
                  onChange={(e) => setRoleTextValue(e.target.value)}
                  placeholder={t('player.roleTextPlaceholder')}
                  maxLength={128}
               />
            </div>
         </ConfirmDialog>

         <ConfirmDialog
            open={activeOperation === 'admin-country'}
            onOpenChangeAction={onOpenChangeAction}
            title={t('player.setCountry')}
            description={t('player.setCountryDialogDesc')}
            confirmLabel={t('player.setCountry')}
            pending={pending}
            disabled={countryValue.length !== 2}
            onConfirmAction={handleAdminResetCountry}
         >
            <div className="flex flex-col gap-1.5">
               <Label>{t('player.countryCode')}</Label>
               <Input value={countryValue} onChange={(e) => setCountryValue(e.target.value.toUpperCase())} placeholder="US" maxLength={2} required />
            </div>
         </ConfirmDialog>
      </>
   );
}

export type { PlayerAdminOperation };
