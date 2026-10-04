import { createServerFn } from '@tanstack/react-start';

import { api } from '@/shared/api/server-api';
import { actionApiData, actionResultVoid } from '@/shared/result/action';
import { toInt64PathParam } from '@/shared/url-state/params';

type BanPlayerInput = {
   playerId: string;
   reason: string;
   notes?: string;
   autoUnban?: boolean;
   autoUnbansAt?: string;
   earliestAppealDate?: string;
};

const banPlayerFn = createServerFn({ method: 'POST' })
   .validator((data: BanPlayerInput) => data)
   .handler(({ data }) => {
      const apiPlayerId = toInt64PathParam(data.playerId);

      return actionResultVoid(
         api.adminUser.adminUserControllerBanPlayer(
            { id: apiPlayerId },
            {
               reason: data.reason,
               ...(data.notes && { notes: data.notes }),
               ...(data.autoUnban != null && { autoUnban: data.autoUnban }),
               ...(data.autoUnbansAt && { autoUnbansAt: new Date(data.autoUnbansAt) }),
               ...(data.earliestAppealDate && { earliestAppealDate: new Date(data.earliestAppealDate) })
            }
         )
      );
   });

const unbanPlayerFn = createServerFn({ method: 'POST' })
   .validator((playerId: string) => playerId)
   .handler(({ data }) => actionResultVoid(api.adminUser.adminUserControllerUnbanPlayer({ id: toInt64PathParam(data) })));

const unsilencePlayerFn = createServerFn({ method: 'POST' })
   .validator((playerId: string) => playerId)
   .handler(({ data }) => actionResultVoid(api.adminUser.adminUserControllerUnsilencePlayer({ id: toInt64PathParam(data) })));

const adminResetCountryFn = createServerFn({ method: 'POST' })
   .validator((data: { playerId: string; country: string }) => data)
   .handler(({ data }) =>
      actionResultVoid(api.adminUser.adminUserControllerAdminResetCountry({ id: toInt64PathParam(data.playerId) }, { country: data.country }))
   );

const updateRoleTextFn = createServerFn({ method: 'POST' })
   .validator((data: { playerId: string; roleText: string }) => data)
   .handler(({ data }) =>
      actionResultVoid(api.adminUser.adminUserControllerUpdateRoleText({ id: toInt64PathParam(data.playerId) }, { roleText: data.roleText }))
   );

const updatePermissionsFn = createServerFn({ method: 'POST' })
   .validator((data: { playerId: string; add?: string[]; remove?: string[] }) => data)
   .handler(({ data }) =>
      actionApiData(
         api.adminUser.adminUserControllerUpdatePermissions({ id: toInt64PathParam(data.playerId) }, { add: data.add, remove: data.remove })
      )
   );

const getPlayerBadgeAssignmentsFn = createServerFn({ method: 'GET' })
   .validator((playerId: string) => playerId)
   .handler(({ data }) => actionApiData(api.adminBadge.adminBadgeControllerGetPlayerBadges({ playerId: data }, { cache: 'no-store' })));

const replacePlayerBadgeAssignmentsFn = createServerFn({ method: 'POST' })
   .validator((data: { playerId: string; badges: { badgeId: number; descriptionOverride: string | null }[] }) => data)
   .handler(({ data }) =>
      actionApiData(api.adminBadge.adminBadgeControllerReplacePlayerBadges({ playerId: data.playerId }, { badges: data.badges }))
   );

const getActiveBanFn = createServerFn({ method: 'GET' })
   .validator((playerId: string) => playerId)
   .handler(({ data }) => actionApiData(api.adminUser.adminUserControllerGetActiveBan({ id: toInt64PathParam(data) }, { cache: 'no-store' })));

const mergePlayerFn = createServerFn({ method: 'POST' })
   .validator((data: { targetPlayerId: string; sourcePlayerId: string; reason: string }) => data)
   .handler(({ data }) =>
      actionApiData(
         api.adminUser.adminUserControllerMergePlayer(
            { id: toInt64PathParam(data.targetPlayerId) },
            { sourcePlayerId: data.sourcePlayerId, reason: data.reason }
         )
      )
   );

export async function banPlayer(input: BanPlayerInput) {
   return banPlayerFn({ data: input });
}

export async function unbanPlayer(playerId: string) {
   return unbanPlayerFn({ data: playerId });
}

export async function unsilencePlayer(playerId: string) {
   return unsilencePlayerFn({ data: playerId });
}

export async function adminResetCountry(playerId: string, country: string) {
   return adminResetCountryFn({ data: { playerId, country } });
}

export async function updateRoleText(playerId: string, roleText: string) {
   return updateRoleTextFn({ data: { playerId, roleText } });
}

export async function updatePermissions(playerId: string, add?: string[], remove?: string[]) {
   return updatePermissionsFn({ data: { playerId, add, remove } });
}

export async function getPlayerBadgeAssignments(playerId: string) {
   return getPlayerBadgeAssignmentsFn({ data: playerId });
}

export async function replacePlayerBadgeAssignments(playerId: string, badges: { badgeId: number; descriptionOverride: string | null }[]) {
   return replacePlayerBadgeAssignmentsFn({ data: { playerId, badges } });
}

export async function getActiveBan(playerId: string) {
   return getActiveBanFn({ data: playerId });
}

export async function mergePlayer(targetPlayerId: string, sourcePlayerId: string, reason: string) {
   return mergePlayerFn({ data: { targetPlayerId, sourcePlayerId, reason } });
}
