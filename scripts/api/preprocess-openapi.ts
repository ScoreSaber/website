import { z } from 'zod';

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const INPUT = resolve(import.meta.dirname, 'openapi.json');
const OUTPUT = resolve(import.meta.dirname, 'openapi.processed.json');

// Map new tag names back to the old module-name convention (singular, no spaces/colons)
const TAG_MAP = new Map<string, string>(
   Object.entries({
      Players: 'Player',
      'Player Aliases': 'PlayerAlias',
      Leaderboards: 'Leaderboard',
      Maps: 'Map',
      Authentication: 'Auth',
      Scores: 'Score',
      'Admin: Badges': 'AdminBadge',
      'Admin: Leaderboards': 'AdminLeaderboard',
      'Admin: Permissions': 'AdminPermission',
      'Admin: Scores': 'AdminScore',
      'Admin: Users': 'AdminUser',
      'Admin: Versions': 'AdminVersion',
      Realms: 'Realm'
   })
);

const V1_TAGS = new Set(['V1: Game', 'V1: Main']);

const jsonObjectSchema = z.looseObject({});
const operationSchema = z.object({
   operationId: z.string().optional().catch(undefined),
   tags: z.array(z.string()).catch([])
});
const tagSchema = z.object({ name: z.string().optional().catch(undefined) });
const tagArraySchema = z.array(z.unknown());

const credentialDescriptorSchema = {
   type: 'object',
   properties: {
      id: { type: 'string' },
      type: { type: 'string', enum: ['public-key'] },
      transports: { type: 'array', items: { type: 'string', enum: ['ble', 'cable', 'hybrid', 'internal', 'nfc', 'smart-card', 'usb'] } }
   },
   required: ['id', 'type'],
   additionalProperties: false
};

const credentialRequestOptionsSchema = {
   type: 'object',
   properties: {
      challenge: { type: 'string' },
      timeout: { type: 'number' },
      rpId: { type: 'string' },
      allowCredentials: { type: 'array', items: credentialDescriptorSchema },
      userVerification: { type: 'string', enum: ['discouraged', 'preferred', 'required'] },
      hints: { type: 'array', items: { type: 'string', enum: ['hybrid', 'security-key', 'client-device'] } },
      extensions: { type: 'object', additionalProperties: true }
   },
   required: ['challenge'],
   additionalProperties: false
};

const credentialCreationOptionsSchema = {
   type: 'object',
   properties: {
      rp: {
         type: 'object',
         properties: { id: { type: 'string' }, name: { type: 'string' } },
         required: ['name'],
         additionalProperties: false
      },
      user: {
         type: 'object',
         properties: { id: { type: 'string' }, name: { type: 'string' }, displayName: { type: 'string' } },
         required: ['id', 'name', 'displayName'],
         additionalProperties: false
      },
      challenge: { type: 'string' },
      pubKeyCredParams: {
         type: 'array',
         items: {
            type: 'object',
            properties: { alg: { type: 'integer' }, type: { type: 'string', enum: ['public-key'] } },
            required: ['alg', 'type'],
            additionalProperties: false
         }
      },
      timeout: { type: 'number' },
      excludeCredentials: { type: 'array', items: credentialDescriptorSchema },
      authenticatorSelection: {
         type: 'object',
         properties: {
            authenticatorAttachment: { type: 'string', enum: ['cross-platform', 'platform'] },
            residentKey: { type: 'string', enum: ['discouraged', 'preferred', 'required'] },
            requireResidentKey: { type: 'boolean' },
            userVerification: { type: 'string', enum: ['discouraged', 'preferred', 'required'] }
         },
         additionalProperties: false
      },
      hints: { type: 'array', items: { type: 'string', enum: ['hybrid', 'security-key', 'client-device'] } },
      attestation: { type: 'string', enum: ['direct', 'enterprise', 'indirect', 'none'] },
      attestationFormats: {
         type: 'array',
         items: { type: 'string', enum: ['fido-u2f', 'packed', 'android-safetynet', 'android-key', 'tpm', 'apple', 'none'] }
      },
      extensions: { type: 'object', additionalProperties: true }
   },
   required: ['rp', 'user', 'challenge', 'pubKeyCredParams'],
   additionalProperties: false
};

function main() {
   const spec = jsonObjectSchema.parse(JSON.parse(readFileSync(INPUT, 'utf-8')));
   const paths = jsonObjectSchema.catch({}).parse(spec.paths);

   const newPaths: typeof paths = {};
   for (const [path, rawMethods] of Object.entries(paths)) {
      const methods = jsonObjectSchema.safeParse(rawMethods);
      if (!methods.success) continue;

      const newMethods: typeof methods.data = {};
      for (const [method, rawDetails] of Object.entries(methods.data)) {
         const details = jsonObjectSchema.safeParse(rawDetails);
         if (!details.success) continue;

         if (!['get', 'post', 'put', 'delete', 'patch'].includes(method)) {
            newMethods[method] = details.data;
            continue;
         }

         const operation = operationSchema.parse(details.data);
         const tags = operation.tags;
         if (tags.some((t) => V1_TAGS.has(t))) continue;

         // strip _v2 suffix from operationId
         if (operation.operationId) {
            details.data.operationId = operation.operationId.replace(/_v2$/, '');
         }

         if (operation.operationId === 'PasskeyController_startAuthentication_v2') {
            replaceSuccessResponseSchema(details.data, {
               type: 'object',
               properties: { sessionId: { type: 'string' }, options: credentialRequestOptionsSchema },
               required: ['sessionId', 'options'],
               additionalProperties: false
            });
         }
         if (operation.operationId === 'PasskeyController_startRegistration_v2') {
            replaceSuccessResponseSchema(details.data, credentialCreationOptionsSchema);
         }

         // normalize tag names
         details.data.tags = tags.map((t) => TAG_MAP.get(t) ?? t);

         newMethods[method] = details.data;
      }

      if (Object.keys(newMethods).length > 0) {
         newPaths[path] = newMethods;
      }
   }
   spec.paths = newPaths;

   // Update top-level tags array
   const tags = tagArraySchema.safeParse(spec.tags);
   if (tags.success) {
      spec.tags = tags.data.flatMap((rawTag) => {
         const tag = jsonObjectSchema.safeParse(rawTag);
         if (!tag.success) return [];

         const name = tagSchema.parse(tag.data).name;
         if (!name || V1_TAGS.has(name)) return [];

         return [{ ...tag.data, name: TAG_MAP.get(name) ?? name }];
      });
   }

   writeFileSync(OUTPUT, JSON.stringify(spec));
   console.log(`✔ Preprocessed spec -> ${OUTPUT}`);
}

function replaceSuccessResponseSchema(operation: z.output<typeof jsonObjectSchema>, schema: z.output<typeof jsonObjectSchema>) {
   const responses = jsonObjectSchema.parse(operation.responses);
   const response = jsonObjectSchema.parse(responses['200']);
   const content = jsonObjectSchema.parse(response.content);
   const jsonContent = jsonObjectSchema.parse(content['application/json']);
   operation.responses = {
      ...responses,
      '200': {
         ...response,
         content: {
            ...content,
            'application/json': { ...jsonContent, schema }
         }
      }
   };
}

main();
