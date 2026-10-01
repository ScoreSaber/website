export interface Messages {
   [key: string]: string | Messages;
}

export function mergeMessages(base: Messages, override: Messages): Messages {
   const merged: Messages = {};
   for (const [key, value] of Object.entries(base)) {
      const replacement = override[key];
      if (typeof value === 'string') {
         merged[key] = typeof replacement === 'string' && replacement.trim() ? replacement : value;
         continue;
      }
      merged[key] = mergeMessages(value, replacement && typeof replacement !== 'string' ? replacement : {});
   }
   return merged;
}
