import { notFound } from '@tanstack/react-router';
import { matchError, Result, TaggedError } from 'better-result';
import { z } from 'zod';

const optionalApiErrorString = z.string().optional().catch(undefined);
const apiErrorCauseSchema = z.object({
   status: z.number().optional().catch(undefined),
   statusText: optionalApiErrorString,
   url: optionalApiErrorString,
   message: optionalApiErrorString,
   error: z.object({ message: optionalApiErrorString }).optional().catch(undefined)
});

class ApiNotFoundError extends TaggedError('ApiNotFoundError')<{
   message: string;
   cause: unknown;
}>() {}

export class ApiRequestError extends TaggedError('ApiRequestError')<{
   message: string;
   status: number | null;
   cause: unknown;
}>() {}

type ApiError = ApiNotFoundError | ApiRequestError;
type ApiResponse<T> = { data: T };
type PageDataResult<T> = { ok: true; data: T } | { ok: false; status: number | null; message: string };

export function apiResult<T>(promise: Promise<T>): Promise<Result<T, ApiError>> {
   return Result.tryPromise({
      try: () => promise,
      catch: toApiError
   });
}

export async function pageApiData<T>(promise: Promise<ApiResponse<T>>): Promise<PageDataResult<T>> {
   const result = await pageApi(promise);

   if (!result.ok) {
      return result;
   }

   return {
      ok: true,
      data: result.data.data
   };
}

export async function optionalApi<T>(promise: Promise<T>): Promise<T | null> {
   const result = await apiResult(promise);

   return Result.match(result, {
      ok: (value) => value,
      err: () => null
   });
}

export async function optionalApiData<T>(promise: Promise<ApiResponse<T>>): Promise<T | null> {
   const response = await optionalApi(promise);
   return response?.data ?? null;
}

export async function queryApiData<T>(promise: Promise<ApiResponse<T>>) {
   const result = await apiResult(promise);

   if (Result.isOk(result)) {
      return result.value.data;
   }

   throw result.error;
}

export function pageDataOk<T>(data: T): PageDataResult<T> {
   return { ok: true, data };
}

// page-level fetch -- returns data or error info for inline rendering
// 404 still triggers notFound() so Next.js renders the not-found page
async function pageApi<T>(promise: Promise<T>): Promise<PageDataResult<T>> {
   const result = await apiResult(promise);

   if (Result.isOk(result)) {
      return { ok: true, data: result.value };
   }

   return matchError(result.error, {
      ApiNotFoundError: () => {
         throw notFound();
      },
      ApiRequestError: (error) => ({
         ok: false,
         status: error.status,
         message: error.message
      })
   });
}

function toApiError(cause: unknown) {
   const parsed = apiErrorCauseSchema.safeParse(cause);
   const details = parsed.success ? parsed.data : null;
   const status = details?.status ?? null;
   const message =
      cause instanceof Error && cause.message
         ? cause.message
         : details?.error?.message !== undefined
           ? details.error.message
           : details?.message || 'request failed';

   if (status === 404) {
      return new ApiNotFoundError({
         message: message === 'request failed' ? 'resource not found' : message,
         cause
      });
   }

   const requestDetails = [details?.url, details?.statusText].filter(Boolean);
   const statusLabel = status == null ? 'unknown status' : String(status);
   const requestMessage =
      message !== 'request failed'
         ? message
         : requestDetails.length > 0
           ? `api request failed (${statusLabel} ${requestDetails.join(' ')}): ${message}`
           : `api request failed (${statusLabel}): ${message}`;

   return new ApiRequestError({
      message: requestMessage,
      status,
      cause
   });
}
