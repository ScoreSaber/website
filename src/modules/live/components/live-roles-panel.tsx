'use client';

import { useEffect, useMemo, useState } from 'react';

import { Loader2, Pencil, Plus, Shield, Trash2, UserPlus, X } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslations } from 'use-intl';
import { z } from 'zod';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';

import { useActionMutation } from '@/hooks/use-action-mutation';
import { assignLiveRole, deleteLiveRole, unassignLiveRole, upsertLiveRole } from '@/modules/live/actions/admin';
import { LiveTournamentPlayerSelectDialog } from '@/modules/live/components/live-tournament-player-select-dialog';
import { CheckboxRow, FormField, LiveActionHeader, LiveRowActions, LiveSection, LiveTableShell } from '@/modules/live/components/live-ui';
import type { LiveTournamentRosterControllerUpsertRolePayload } from '@/shared/api/generated/Api';
import type {
   LiveTournamentControllerGetWorkflowOptionsResponse,
   LiveTournamentRosterControllerListAuthorizedPlayersItem,
   LiveTournamentRosterControllerListRolesItem
} from '@/shared/api/generated/ApiParams';
import { ConfirmDialog } from '@/shared/components/confirm-dialog';

type RoleFormState = {
   id: number | null;
   name: string;
   description: string;
   color: string;
   order: number;
   permissions: LiveTournamentRosterControllerUpsertRolePayload['permissions'];
};

type LiveTournamentPermission = LiveTournamentControllerGetWorkflowOptionsResponse['tournamentPermissions'][number];

const nullableTrimmedStringSchema = z
   .string()
   .trim()
   .transform((value) => value || null);

export function LiveRolesPanel({
   tournamentId,
   roles,
   authorizedPlayers,
   options
}: {
   tournamentId: string;
   roles: LiveTournamentRosterControllerListRolesItem[];
   authorizedPlayers: LiveTournamentRosterControllerListAuthorizedPlayersItem[];
   options: LiveTournamentControllerGetWorkflowOptionsResponse;
}) {
   const t = useTranslations('live');
   const tc = useTranslations('common');
   const mutation = useActionMutation();
   const emptyRoleForm = useMemo(() => createEmptyRoleForm(options.tournamentPermissions), [options.tournamentPermissions]);
   const rolePayloadSchema = useMemo(() => createRolePayloadSchema(options.tournamentPermissions), [options.tournamentPermissions]);
   const [roleRows, setRoleRows] = useState(roles);
   const [editorOpen, setEditorOpen] = useState(false);
   const [roleForm, setRoleForm] = useState<RoleFormState>(() => createEmptyRoleForm(options.tournamentPermissions));
   const [deleteCandidate, setDeleteCandidate] = useState<LiveTournamentRosterControllerListRolesItem | null>(null);
   const [assignCandidate, setAssignCandidate] = useState<LiveTournamentRosterControllerListRolesItem | null>(null);
   const pending = mutation.isPending;

   useEffect(() => {
      setRoleRows(roles);
   }, [roles]);

   function openAddRole() {
      setRoleForm({ ...emptyRoleForm, order: getNextRoleOrder(roleRows) });
      setEditorOpen(true);
   }

   function openEditRole(role: LiveTournamentRosterControllerListRolesItem) {
      setRoleForm({
         id: role.id,
         name: role.name,
         description: role.description ?? '',
         color: role.color ?? '',
         order: role.order,
         permissions: role.permissions
      });
      setEditorOpen(true);
   }

   function saveRole() {
      const result = rolePayloadSchema.safeParse({
         id: roleForm.id ?? undefined,
         name: roleForm.name,
         description: roleForm.description,
         color: roleForm.color,
         order: roleForm.order,
         permissions: roleForm.permissions
      });
      if (!result.success) {
         toast.error(t('invalidRole'));
         return;
      }

      mutation.run(
         () => upsertLiveRole(tournamentId, result.data),
         t('roleSaved'),
         t('roleSaveFailed'),
         () => setEditorOpen(false)
      );
   }

   function deleteRole() {
      if (!deleteCandidate) return;

      mutation.run(
         () => deleteLiveRole(tournamentId, deleteCandidate.id),
         t('roleDeleted'),
         t('roleDeleteFailed'),
         () => {
            setRoleRows((current) => current.filter((role) => role.id !== deleteCandidate.id));
            setDeleteCandidate(null);
         }
      );
   }

   function assignPlayerToRole(selection: LiveTournamentRosterControllerListAuthorizedPlayersItem) {
      if (!assignCandidate) return;
      const playerId = selection.playerId;

      mutation.run(
         () => assignLiveRole(tournamentId, assignCandidate.id, playerId),
         t('roleAssigned'),
         t('roleAssignFailed'),
         () => {
            setRoleRows((current) =>
               current.map((role) =>
                  role.id === assignCandidate.id
                     ? {
                          ...role,
                          assignments: [
                             ...role.assignments.filter((assignment) => assignment.playerId !== playerId),
                             {
                                roleId: role.id,
                                playerId,
                                player: selection.player,
                                assignedAt: new Date().toISOString()
                             }
                          ]
                       }
                     : role
               )
            );
            setAssignCandidate(null);
         }
      );
   }

   function removePlayerFromRole(role: LiveTournamentRosterControllerListRolesItem, playerId: string) {
      mutation.run(
         () => unassignLiveRole(tournamentId, role.id, playerId),
         t('roleUnassigned'),
         t('roleUnassignFailed'),
         () =>
            setRoleRows((current) =>
               current.map((row) =>
                  row.id === role.id
                     ? {
                          ...row,
                          assignments: row.assignments.filter((assignment) => assignment.playerId !== playerId)
                       }
                     : row
               )
            )
      );
   }

   function setPermission(permission: LiveTournamentRosterControllerUpsertRolePayload['permissions'][number], checked: boolean) {
      setRoleForm((current) => ({
         ...current,
         permissions: checked
            ? [...new Set([...current.permissions, permission])]
            : current.permissions.filter((currentPermission) => currentPermission !== permission)
      }));
   }

   return (
      <>
         <LiveSection
            title={t('rolesAndAssignments')}
            icon={<Shield data-icon />}
            actions={
               <Button className="w-fit cursor-pointer" onClick={openAddRole} disabled={pending}>
                  <Plus data-icon="inline-start" />
                  {t('addRole')}
               </Button>
            }
         >
            <LiveTableShell className="max-h-[32rem]">
               <Table>
                  <TableHeader>
                     <TableRow>
                        <TableHead>{t('role')}</TableHead>
                        <TableHead>{t('permissions')}</TableHead>
                        <TableHead className="w-0 text-right">
                           <LiveActionHeader label={tc('actions')} />
                        </TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {roleRows.length > 0 ? (
                        roleRows.map((role) => {
                           const protectedRole = role.name === 'Organizer';
                           return (
                              <TableRow key={role.id} className="group/row">
                                 <TableCell>
                                    <div className="flex flex-col gap-1">
                                       <span className="font-medium">{role.name}</span>
                                       <span className="text-muted-foreground text-xs">{role.description ?? '-'}</span>
                                    </div>
                                 </TableCell>
                                 <TableCell>
                                    <div className="flex max-w-xl flex-wrap gap-1">
                                       {role.permissions.map((permission) => (
                                          <Badge key={permission} variant="secondary">
                                             {permission}
                                          </Badge>
                                       ))}
                                    </div>
                                    <div className="mt-3 flex max-w-xl flex-wrap gap-1">
                                       {role.assignments.length > 0 ? (
                                          role.assignments.map((assignment) => (
                                             <Badge key={assignment.playerId} variant="outline" className="gap-1">
                                                {assignment.player?.name ?? t('unknownPlayer')}
                                                <button
                                                   type="button"
                                                   className="hover:text-destructive cursor-pointer rounded-sm"
                                                   onClick={() => removePlayerFromRole(role, assignment.playerId)}
                                                   disabled={pending}
                                                   title={t('removeRolePlayer')}
                                                >
                                                   <X data-icon />
                                                </button>
                                             </Badge>
                                          ))
                                       ) : (
                                          <span className="text-muted-foreground text-xs">{t('noRolePlayers')}</span>
                                       )}
                                    </div>
                                 </TableCell>
                                 <TableCell>
                                    <LiveRowActions>
                                       <Button
                                          variant="ghost"
                                          size="icon-sm"
                                          className="cursor-pointer"
                                          onClick={() => setAssignCandidate(role)}
                                          disabled={pending}
                                          title={t('assignPlayer')}
                                       >
                                          <UserPlus data-icon />
                                       </Button>
                                       <Button
                                          variant="ghost"
                                          size="icon-sm"
                                          className="cursor-pointer"
                                          onClick={() => openEditRole(role)}
                                          disabled={pending}
                                          title={t('editRole')}
                                       >
                                          <Pencil data-icon />
                                       </Button>
                                       <Button
                                          variant="ghost"
                                          size="icon-sm"
                                          className="cursor-pointer"
                                          onClick={() => setDeleteCandidate(role)}
                                          disabled={pending || protectedRole}
                                          title={t('deleteRole')}
                                       >
                                          <Trash2 data-icon />
                                       </Button>
                                    </LiveRowActions>
                                 </TableCell>
                              </TableRow>
                           );
                        })
                     ) : (
                        <TableRow>
                           <TableCell colSpan={3} className="text-muted-foreground h-20 text-center">
                              {t('noRoles')}
                           </TableCell>
                        </TableRow>
                     )}
                  </TableBody>
               </Table>
            </LiveTableShell>
         </LiveSection>

         <Dialog open={editorOpen} onOpenChange={setEditorOpen}>
            <DialogContent className="h-dvh max-h-dvh max-w-none overflow-hidden rounded-none border-0 p-0 sm:h-auto sm:max-h-[calc(100dvh-2rem)] sm:max-w-xl sm:rounded-lg sm:border">
               <form
                  className="flex h-full min-h-0 flex-col sm:max-h-[calc(100dvh-2rem)]"
                  onSubmit={(event) => {
                     event.preventDefault();
                     saveRole();
                  }}
               >
                  <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-6">
                     <DialogHeader>
                        <DialogTitle>{roleForm.id == null ? t('addRole') : t('editRole')}</DialogTitle>
                     </DialogHeader>
                     <div className="grid gap-3 md:grid-cols-2">
                        <FormField id="live-role-name" label={t('name')}>
                           <Input
                              id="live-role-name"
                              value={roleForm.name}
                              onChange={(event) => setRoleForm((current) => ({ ...current, name: event.target.value }))}
                              disabled={pending}
                           />
                        </FormField>
                        <FormField id="live-role-color" label={t('color')}>
                           <Input
                              id="live-role-color"
                              value={roleForm.color}
                              onChange={(event) => setRoleForm((current) => ({ ...current, color: event.target.value }))}
                              disabled={pending}
                           />
                        </FormField>
                     </div>
                     <FormField id="live-role-description" label={t('description')}>
                        <Textarea
                           id="live-role-description"
                           value={roleForm.description}
                           onChange={(event) => setRoleForm((current) => ({ ...current, description: event.target.value }))}
                           disabled={pending}
                        />
                     </FormField>
                     <div className="grid gap-2 sm:grid-cols-2">
                        {options.tournamentPermissions.map((permission) => (
                           <CheckboxRow
                              key={permission}
                              label={permission}
                              checked={roleForm.permissions.includes(permission)}
                              onCheckedChangeAction={(checked) => setPermission(permission, checked)}
                              disabled={pending}
                           />
                        ))}
                     </div>
                  </div>
                  <DialogFooter className="bg-background border-t p-4 sm:p-6">
                     <Button type="button" variant="secondary" onClick={() => setEditorOpen(false)} disabled={pending}>
                        {tc('cancel')}
                     </Button>
                     <Button type="submit" className="cursor-pointer" disabled={pending}>
                        {pending ? <Loader2 className="animate-spin" /> : null}
                        {t('saveRole')}
                     </Button>
                  </DialogFooter>
               </form>
            </DialogContent>
         </Dialog>

         <ConfirmDialog
            open={deleteCandidate != null}
            onOpenChangeAction={(open) => {
               if (!open) setDeleteCandidate(null);
            }}
            title={t('deleteRole')}
            description={t('deleteRoleDescription', { role: deleteCandidate?.name ?? '' })}
            confirmLabel={t('deleteRole')}
            variant="destructive"
            pending={pending}
            onConfirmAction={deleteRole}
         />

         <LiveTournamentPlayerSelectDialog
            open={assignCandidate != null}
            onOpenChangeAction={(open) => {
               if (!open) setAssignCandidate(null);
            }}
            onSelectAction={assignPlayerToRole}
            players={authorizedPlayers}
            disabledPlayerIds={assignCandidate?.assignments.map((assignment) => assignment.playerId) ?? []}
            title={t('assignPlayer')}
         />
      </>
   );
}

function getNextRoleOrder(roles: LiveTournamentRosterControllerListRolesItem[]) {
   if (roles.length === 0) return 0;
   return Math.max(...roles.map((role) => role.order)) + 10;
}

function createEmptyRoleForm(permissions: readonly LiveTournamentPermission[]): RoleFormState {
   return {
      id: null,
      name: '',
      description: '',
      color: '',
      order: 0,
      permissions: permissions.slice(0, 1)
   };
}

function createRolePayloadSchema(permissions: readonly LiveTournamentPermission[]) {
   const liveTournamentPermissionSchema = z.custom<LiveTournamentPermission>((value) => permissions.some((permission) => permission === value));

   const schema: z.ZodType<LiveTournamentRosterControllerUpsertRolePayload> = z.object({
      id: z.number().int().positive().optional(),
      name: z.string().trim().min(1),
      description: nullableTrimmedStringSchema,
      color: nullableTrimmedStringSchema,
      order: z.number().int(),
      permissions: z.array(liveTournamentPermissionSchema).min(1)
   });

   return schema;
}
