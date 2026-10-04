'use client';

import { useState, type ReactNode } from 'react';

import type { IconType } from 'react-icons';
import { FaBan, FaCodeBranch, FaFlag, FaGlobe, FaIdBadge, FaMedal, FaLock, FaUndoAlt, FaUsersCog, FaVolumeUp } from 'react-icons/fa';
import { useTranslations } from 'use-intl';

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from '@/components/ui/select';

import { useActionMutation } from '@/hooks/use-action-mutation';
import { useAuth } from '@/modules/auth';
import { type PlayerAdminOperation, PlayerAdminOperations } from '@/modules/player/operations/admin/player-admin-operations';
import type { AdminMergeTarget } from '@/modules/player/operations/admin/player-merge-dialog';
import { PlayerReportDialog } from '@/modules/player/operations/member/player-report-dialog';
import Permissions from '@/shared/permissions';

type PlayerOperation = PlayerAdminOperation | 'report';
type ActiveDialog = PlayerOperation | null;
type PlayerOperationGroup = 'primary' | 'country';

interface PlayerOperationDescriptor {
   id: PlayerOperation;
   group: PlayerOperationGroup;
   visible: boolean;
   icon: IconType;
   label: string;
}

export interface PlayerExtraAction {
   id: string;
   label: string;
   icon?: ReactNode;
   visible?: boolean;
   onSelect: () => void;
}

interface PlayerActionsProps {
   playerId: string;
   playerBanned: boolean;
   playerSilenced: boolean;
   playerPermissions: number;
   playerRole: string | null;
   mergeTarget?: AdminMergeTarget;
   compact?: boolean;
   extraActions?: PlayerExtraAction[];
}

export function PlayerActions({
   playerId,
   playerBanned,
   playerSilenced,
   playerPermissions,
   playerRole,
   mergeTarget,
   compact = false,
   extraActions = []
}: PlayerActionsProps) {
   const t = useTranslations();
   const { user } = useAuth();
   const isOwnProfile = user?.id === playerId;
   const userPerms = user?.permissions ?? 0;
   const isAdmin = Permissions.checkPermissionNumber(userPerms, Permissions.security.ADMIN);
   const canBan = isAdmin;
   const canUpdateRoleText = isAdmin;
   const canManagePermissions = isAdmin;
   const canAdminResetCountry = isAdmin;
   const [activeDialog, setActiveDialog] = useState<ActiveDialog>(null);
   const [actionSelectKey, setActionSelectKey] = useState(0);
   const action = useActionMutation();
   const pending = action.isPending;
   const compactIconClass = compact ? 'size-2.5' : undefined;
   const activeAdminDialog = activeDialog === 'report' ? null : activeDialog;

   function closeDialog() {
      setActiveDialog(null);
   }

   const operations: PlayerOperationDescriptor[] = [
      {
         id: 'unban',
         group: 'primary',
         visible: canBan && !isOwnProfile && playerBanned,
         icon: FaUndoAlt,
         label: t('player.unbanPlayer')
      },
      {
         id: 'unsilence',
         group: 'primary',
         visible: canBan && !isOwnProfile && playerSilenced,
         icon: FaVolumeUp,
         label: t('player.unsilencePlayer')
      },
      {
         id: 'report',
         group: 'primary',
         visible: !!user && !isOwnProfile && !playerBanned,
         icon: FaFlag,
         label: t('player.reportProfile')
      },
      {
         id: 'ban',
         group: 'primary',
         visible: canBan && !isOwnProfile && !playerBanned,
         icon: FaBan,
         label: t('player.banPlayer')
      },
      {
         id: 'badges',
         group: 'primary',
         visible: isAdmin,
         icon: FaMedal,
         label: t('player.badges.manage')
      },
      {
         id: 'merge',
         group: 'primary',
         visible: isAdmin && mergeTarget != null,
         icon: FaCodeBranch,
         label: t('player.merge.title')
      },
      {
         id: 'permissions',
         group: 'primary',
         visible: canManagePermissions,
         icon: FaLock,
         label: t('player.managePermissions')
      },
      {
         id: 'role-text',
         group: 'primary',
         visible: canUpdateRoleText,
         icon: FaIdBadge,
         label: t('player.setRoleText')
      },
      {
         id: 'admin-country',
         group: 'country',
         visible: canAdminResetCountry,
         icon: FaGlobe,
         label: t('player.setCountry')
      }
   ];
   const visibleOperations = operations.filter((operation) => operation.visible);
   const visibleExtraActions = extraActions.filter((extraAction) => extraAction.visible ?? true);
   const primaryOperations = visibleOperations.filter((operation) => operation.group === 'primary');
   const countryOperations = visibleOperations.filter((operation) => operation.group === 'country');
   const hasAnyAction = visibleOperations.length > 0 || visibleExtraActions.length > 0;
   if (!hasAnyAction) return null;

   function handlePlayerAction(value: string) {
      setActionSelectKey((prev) => prev + 1);
      const extraAction = visibleExtraActions.find((item) => item.id === value);
      if (extraAction) {
         extraAction.onSelect();
         return;
      }

      const operation = visibleOperations.find((item) => item.id === value);
      if (operation) setActiveDialog(operation.id);
   }

   return (
      <>
         <div className="flex flex-col gap-1.5">
            <Select key={actionSelectKey} onValueChange={handlePlayerAction}>
               <SelectTrigger variant="icon" size="icon" aria-label={t('player.playerActions')} disabled={pending}>
                  <SelectValue placeholder={t('player.playerActions')} />
                  <FaUsersCog data-icon className={compactIconClass} aria-hidden="true" />
               </SelectTrigger>
               <SelectContent align="end" position="popper">
                  <SelectGroup>
                     <SelectLabel>{t('player.playerActions')}</SelectLabel>
                     {visibleExtraActions.map((extraAction) => (
                        <PlayerActionItem key={extraAction.id} value={extraAction.id} icon={extraAction.icon} label={extraAction.label} />
                     ))}
                     {visibleExtraActions.length > 0 && visibleOperations.length > 0 && <SelectSeparator />}
                     {primaryOperations.map((operation) => (
                        <PlayerOperationItem key={operation.id} operation={operation} />
                     ))}
                     {primaryOperations.length > 0 && countryOperations.length > 0 && <SelectSeparator />}
                     {countryOperations.map((operation) => (
                        <PlayerOperationItem key={operation.id} operation={operation} />
                     ))}
                  </SelectGroup>
               </SelectContent>
            </Select>
         </div>

         <PlayerAdminOperations
            activeOperation={activeAdminDialog}
            playerId={playerId}
            playerBanned={playerBanned}
            playerPermissions={playerPermissions}
            playerRole={playerRole}
            mergeTarget={mergeTarget}
            currentUserPermissions={userPerms}
            isOwnProfile={isOwnProfile}
            action={action}
            onOpenChangeAction={(open) => !open && closeDialog()}
         />
         <PlayerReportDialog
            open={activeDialog === 'report'}
            playerId={playerId}
            action={action}
            onOpenChangeAction={(open) => !open && closeDialog()}
         />
      </>
   );
}

function PlayerOperationItem({ operation }: { operation: PlayerOperationDescriptor }) {
   const Icon = operation.icon;

   return <PlayerActionItem value={operation.id} icon={<Icon data-icon="inline-start" />} label={operation.label} />;
}

function PlayerActionItem({ value, icon, label }: { value: string; icon?: ReactNode; label: string }) {
   return (
      <SelectItem value={value}>
         {icon}
         {label}
      </SelectItem>
   );
}
