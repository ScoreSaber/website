import { Result } from 'better-result';

import { apiResult } from './api';

// plain object that survives server function serialization
export type ActionResult<T = void> = { ok: true; value: T } | { ok: false; error: string };

type ApiResponse<T> = { data: T };

export async function actionApiData<T>(promise: Promise<ApiResponse<T>>): Promise<ActionResult<T>> {
   const result = await apiResult(promise);

   if (Result.isOk(result)) {
      return { ok: true, value: result.value.data };
   }
   return actionFailure(result.error.message);
}

// unwrap for use in useMutation -- throws on error so react-query catches it
export function unwrapAction<T>(result: ActionResult<T>): T {
   if (!result.ok) throw new Error(result.error);
   return result.value;
}

export function actionSuccess<T>(value: T): ActionResult<T> {
   return { ok: true, value };
}

export function actionFailure(error: string): ActionResult<never> {
   return { ok: false, error };
}

// convenience for void actions that just need ok/error
export async function actionResultVoid<T>(promise: Promise<T>): Promise<ActionResult> {
   const result = await apiResult(promise);

   if (Result.isOk(result)) {
      return { ok: true, value: undefined };
   }
   return actionFailure(result.error.message);
}
