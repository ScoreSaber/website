import { z } from 'zod';

const localeSchema = z.enum([
   'en',
   'de-DE',
   'ja-JP',
   'zh-CN',
   'ru-RU',
   'fr-FR',
   'pl-PL',
   'nl-NL',
   'pt-BR',
   'zh-TW',
   'cs-CZ',
   'ko-KR',
   'it-IT',
   'es-ES',
   'sv-SE',
   'fi-FI'
]);
export const locales = localeSchema.options;
export type Locale = z.infer<typeof localeSchema>;
export const defaultLocale: Locale = 'en';

export const localeNames = {
   en: 'English',
   'de-DE': 'German',
   'ja-JP': 'Japanese',
   'zh-CN': 'Chinese Simplified',
   'ru-RU': 'Russian',
   'fr-FR': 'French',
   'pl-PL': 'Polish',
   'nl-NL': 'Dutch',
   'pt-BR': 'Portuguese, Brazilian',
   'zh-TW': 'Chinese Traditional',
   'cs-CZ': 'Czech',
   'ko-KR': 'Korean',
   'it-IT': 'Italian',
   'es-ES': 'Spanish',
   'sv-SE': 'Swedish',
   'fi-FI': 'Finnish'
};

const legacyLocaleAliases = new Map<string, Locale>([
   ['cs', 'cs-CZ'],
   ['de', 'de-DE'],
   ['es', 'es-ES'],
   ['fi', 'fi-FI'],
   ['fr', 'fr-FR'],
   ['ja', 'ja-JP'],
   ['ko', 'ko-KR'],
   ['it', 'it-IT'],
   ['nl', 'nl-NL'],
   ['pl', 'pl-PL'],
   ['ru', 'ru-RU'],
   ['sv', 'sv-SE']
]);

export function parseLocale(value: string): Locale {
   const legacyLocale = legacyLocaleAliases.get(value);
   if (legacyLocale) return legacyLocale;
   return localeSchema.catch(defaultLocale).parse(value);
}
