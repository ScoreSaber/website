import { Err, Result, TaggedError } from 'better-result';
import { z } from 'zod';

type JsonPrimitive = string | number | boolean | null;
type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };

class StorageAccessError extends TaggedError('StorageAccessError')<{
   message: string;
   key: string;
   operation: 'read' | 'write' | 'remove';
   cause: unknown;
}>() {}

class JsonParseError extends TaggedError('JsonParseError')<{
   message: string;
   source: string;
   cause: unknown;
}>() {}

class JsonSerializeError extends TaggedError('JsonSerializeError')<{
   message: string;
   source: string;
   cause: unknown;
}>() {}

export function readStorageValue(key: string): Result<string | null, StorageAccessError> {
   return Result.try({
      try: () => localStorage.getItem(key),
      catch: (cause) =>
         new StorageAccessError({
            message: `failed to read localStorage key "${key}"`,
            key,
            operation: 'read',
            cause
         })
   });
}

export function writeStorageValue(key: string, value: string): Result<void, StorageAccessError> {
   return Result.try({
      try: () => {
         localStorage.setItem(key, value);
      },
      catch: (cause) =>
         new StorageAccessError({
            message: `failed to write localStorage key "${key}"`,
            key,
            operation: 'write',
            cause
         })
   });
}

export function removeStorageValue(key: string): Result<void, StorageAccessError> {
   return Result.try({
      try: () => {
         localStorage.removeItem(key);
      },
      catch: (cause) =>
         new StorageAccessError({
            message: `failed to remove localStorage key "${key}"`,
            key,
            operation: 'remove',
            cause
         })
   });
}

function parseJsonValue<T>(value: string, schema: z.ZodType<T>, source: string): Result<T, JsonParseError> {
   const parsed = Result.try({
      try: () => schema.safeParse(JSON.parse(value)),
      catch: (cause) =>
         new JsonParseError({
            message: `failed to parse json from ${source}`,
            source,
            cause
         })
   });

   if (Result.isError(parsed)) return new Err(parsed.error);
   if (parsed.value.success) return Result.ok(parsed.value.data);

   return new Err(
      new JsonParseError({
         message: `failed to parse json from ${source}`,
         source,
         cause: parsed.value.error
      })
   );
}

function stringifyJsonValue(value: JsonValue, source: string): Result<string, JsonSerializeError> {
   return Result.try({
      try: () => {
         const serialized = JSON.stringify(value);
         if (serialized == null) throw new TypeError('json serialization returned no value');
         return serialized;
      },
      catch: (cause) =>
         new JsonSerializeError({
            message: `failed to serialize json for ${source}`,
            source,
            cause
         })
   });
}

export function readStorageJson<T>(key: string, schema: z.ZodType<T>): Result<T | null, StorageAccessError | JsonParseError> {
   return Result.gen(function* () {
      const raw = yield* readStorageValue(key);

      if (raw == null) {
         return Result.ok(null);
      }

      const parsed = yield* parseJsonValue<T>(raw, schema, `localStorage key "${key}"`);
      return Result.ok(parsed);
   });
}

export function writeStorageJson(key: string, value: JsonValue): Result<void, StorageAccessError | JsonSerializeError> {
   return Result.gen(function* () {
      const serialized = yield* stringifyJsonValue(value, `localStorage key "${key}"`);
      yield* writeStorageValue(key, serialized);
      return Result.ok();
   });
}
