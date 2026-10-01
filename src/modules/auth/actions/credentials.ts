import { createServerFn } from '@tanstack/react-start';

import { setAuthCookie } from '@/modules/auth/actions/session.server';
import { getClientRequestHeaders } from '@/shared/api/client-request.server';
import type { RequestParams } from '@/shared/api/generated/Api';
import type { PasswordAuthControllerGetPasswordCredentialResponse } from '@/shared/api/generated/ApiParams';
import { api } from '@/shared/api/server-api';
import { actionApiData, actionSuccess, type ActionResult } from '@/shared/result/action';

export type CredentialAuthActionValue = { status: 'authenticated'; playerId: string } | { status: 'support-required' };
export type PasswordCredentialSummary = PasswordAuthControllerGetPasswordCredentialResponse;

type CredentialAuthResponse = Awaited<ReturnType<typeof api.auth.passwordAuthControllerCompleteSignup>>['data'];

function requestOptions(): RequestParams {
   return { cache: 'no-store', headers: getClientRequestHeaders() };
}

function finishAuth(result: ActionResult<CredentialAuthResponse>): ActionResult<CredentialAuthActionValue> {
   if (!result.ok) return result;

   if (result.value.status === 'authenticated') {
      setAuthCookie(result.value.token);
      return actionSuccess({ status: 'authenticated', playerId: result.value.playerId });
   }

   return actionSuccess(result.value);
}

const startSignupFn = createServerFn({ method: 'POST' })
   .validator((email: string) => email)
   .handler(({ data: email }) => actionApiData(api.auth.passwordAuthControllerStartSignup({ email }, requestOptions())));

export async function startSignup(email: string) {
   return startSignupFn({ data: email });
}

const completeSignupFn = createServerFn({ method: 'POST' })
   .validator((data: { email: string; challengeId: string; code: string; password: string; displayName: string }) => data)
   .handler(async ({ data }) => finishAuth(await actionApiData(api.auth.passwordAuthControllerCompleteSignup(data, requestOptions()))));

export async function completeSignup(data: { email: string; challengeId: string; code: string; password: string; displayName: string }) {
   return completeSignupFn({ data });
}

const loginWithPasswordFn = createServerFn({ method: 'POST' })
   .validator((data: { email: string; password: string }) => data)
   .handler(async ({ data }) => finishAuth(await actionApiData(api.auth.passwordAuthControllerLoginWithPassword(data, requestOptions()))));

export async function loginWithPassword(data: { email: string; password: string }) {
   return loginWithPasswordFn({ data });
}

const startPasswordResetFn = createServerFn({ method: 'POST' })
   .validator((email: string) => email)
   .handler(({ data: email }) => actionApiData(api.auth.passwordAuthControllerStartPasswordReset({ email }, requestOptions())));

export async function startPasswordReset(email: string) {
   return startPasswordResetFn({ data: email });
}

const completePasswordResetFn = createServerFn({ method: 'POST' })
   .validator((data: { email: string; challengeId: string; code: string; password: string }) => data)
   .handler(async ({ data }) => finishAuth(await actionApiData(api.auth.passwordAuthControllerCompletePasswordReset(data, requestOptions()))));

export async function completePasswordReset(data: { email: string; challengeId: string; code: string; password: string }) {
   return completePasswordResetFn({ data });
}

const getPasswordCredentialFn = createServerFn({ method: 'GET' }).handler(() =>
   actionApiData(api.auth.passwordAuthControllerGetPasswordCredential(requestOptions()))
);

export async function getPasswordCredential() {
   return getPasswordCredentialFn();
}

const startPasswordSetupFn = createServerFn({ method: 'POST' })
   .validator((email: string) => email)
   .handler(({ data: email }) => actionApiData(api.auth.passwordAuthControllerStartPasswordSetup({ email }, requestOptions())));

export async function startPasswordSetup(email: string) {
   return startPasswordSetupFn({ data: email });
}

const completePasswordSetupFn = createServerFn({ method: 'POST' })
   .validator((data: { email: string; challengeId: string; code: string; password: string }) => data)
   .handler(async ({ data }) => {
      const result = await actionApiData(api.auth.passwordAuthControllerCompletePasswordSetup(data, requestOptions()));

      if (result.ok) {
         setAuthCookie(result.value.token);
         return actionSuccess(undefined);
      }

      return result;
   });

export async function completePasswordSetup(data: { email: string; challengeId: string; code: string; password: string }) {
   return completePasswordSetupFn({ data });
}

const changePasswordFn = createServerFn({ method: 'POST' })
   .validator((data: { currentPassword: string; newPassword: string }) => data)
   .handler(async ({ data }) => {
      const result = await actionApiData(api.auth.passwordAuthControllerChangePassword(data, requestOptions()));

      if (result.ok) {
         // password change rotates every session; keep this one alive with the fresh token
         setAuthCookie(result.value.token);
         return actionSuccess(undefined);
      }

      return result;
   });

export async function changePassword(data: { currentPassword: string; newPassword: string }) {
   return changePasswordFn({ data });
}
