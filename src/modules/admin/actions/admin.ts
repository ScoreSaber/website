import { createServerFn } from '@tanstack/react-start';
import { Result } from 'better-result';

import { readAuthCookie } from '@/modules/auth/actions/session.server';
import type { AdminBadgeControllerUpdateBadgePayload } from '@/shared/api/generated/Api';
import { api } from '@/shared/api/server-api';
import { actionApiData, actionFailure, actionSuccess } from '@/shared/result/action';
import { apiResult } from '@/shared/result/api';

const maxBadgeImageSize = 10 * 1024 * 1024;

type AdminAccess = { status: 'unauthenticated' | 'authorised' | 'forbidden' };

const checkAdminAccessFn = createServerFn({ method: 'GET' }).handler(async (): Promise<AdminAccess> => {
   if (!readAuthCookie()) return { status: 'unauthenticated' };

   const access = await apiResult(api.adminPermission.adminPermissionControllerListPermissions());
   return { status: Result.isOk(access) ? 'authorised' : 'forbidden' };
});

const getAdminBadgesFn = createServerFn({ method: 'GET' }).handler(() =>
   actionApiData(api.adminBadge.adminBadgeControllerGetAllBadges({ cache: 'no-store' }))
);

const createBadgeFn = createServerFn({ method: 'POST' })
   .validator((formData: FormData) => formData)
   .handler(async ({ data }) => {
      const form = readBadgeForm(data);
      if (!form.ok) return form;
      if (!form.value.image) return actionFailure('Badge image is required');

      return actionApiData(api.adminBadge.adminBadgeControllerCreateBadge({ description: form.value.description, image: form.value.image }));
   });

const updateBadgeFn = createServerFn({ method: 'POST' })
   .validator((formData: FormData) => formData)
   .handler(async ({ data }) => {
      const badgeId = Number(data.get('badgeId'));
      if (!Number.isInteger(badgeId) || badgeId <= 0) return actionFailure('Invalid badge');

      const form = readBadgeForm(data);
      if (!form.ok) return form;

      const payload: AdminBadgeControllerUpdateBadgePayload = { description: form.value.description };
      if (form.value.image) payload.image = form.value.image;
      return actionApiData(api.adminBadge.adminBadgeControllerUpdateBadge({ id: badgeId }, payload));
   });

const deleteBadgeFn = createServerFn({ method: 'POST' })
   .validator((badgeId: number) => badgeId)
   .handler(({ data }) => actionApiData(api.adminBadge.adminBadgeControllerDeleteBadge({ id: data })));

const addOfficialBuildCompatibilityFn = createServerFn({ method: 'POST' })
   .validator((toGameVersion: string) => toGameVersion)
   .handler(({ data }) => actionApiData(api.adminUploadTrust.adminUploadTrustControllerAddOfficialBuildCompatibility({ toGameVersion: data })));

function readBadgeForm(formData: FormData) {
   const image = formData.get('image');
   const description = formData.get('description');

   if (typeof description !== 'string' || description.trim().length === 0 || description.trim().length > 128) {
      return actionFailure('Badge description must be between 1 and 128 characters');
   }
   if (image instanceof File && image.size > maxBadgeImageSize) {
      return actionFailure('Badge image must be 10MB or smaller');
   }

   return actionSuccess({
      description: description.trim(),
      image: image instanceof File && image.size > 0 ? image : null
   });
}

export async function checkAdminAccess() {
   return checkAdminAccessFn();
}

export async function getAdminBadges() {
   return getAdminBadgesFn();
}

export async function createBadge(formData: FormData) {
   return createBadgeFn({ data: formData });
}

export async function updateBadge(badgeId: number, formData: FormData) {
   formData.set('badgeId', String(badgeId));
   return updateBadgeFn({ data: formData });
}

export async function deleteBadge(badgeId: number) {
   return deleteBadgeFn({ data: badgeId });
}

export async function addOfficialBuildCompatibility(toGameVersion: string) {
   return addOfficialBuildCompatibilityFn({ data: toGameVersion });
}
