import type { CSSProperties } from 'react';

import type { PlayerControllerGetPlayerResponse } from '@/shared/api/generated/ApiParams';

export const DEFAULT_PROFILE_ACCENT_COLOR = '#facc15';
export const DEFAULT_PROFILE_ACCENT_FOREGROUND_COLOR = '#422006';
export const DEFAULT_PROFILE_ACCENT_ACTIVE_FOREGROUND_COLOR = '#422006';

export type PlayerProfileCustomizationStyle = Pick<
   PlayerControllerGetPlayerResponse['profileCustomization'],
   | 'backgroundImage'
   | 'backgroundImageVersion'
   | 'accentColor'
   | 'accentForegroundColor'
   | 'accentForegroundActiveColor'
   | 'supporterNameColorEnabled'
>;

export const DEFAULT_PROFILE_CUSTOMIZATION_STYLE: PlayerProfileCustomizationStyle = {
   backgroundImage: null,
   backgroundImageVersion: null,
   accentColor: null,
   accentForegroundColor: null,
   accentForegroundActiveColor: null,
   supporterNameColorEnabled: true
};

export function normalizeProfileCustomizationStyle(
   customization: PlayerProfileCustomizationStyle | null | undefined
): PlayerProfileCustomizationStyle {
   if (!customization) return DEFAULT_PROFILE_CUSTOMIZATION_STYLE;

   const accentColor = customization.accentColor ?? null;

   return {
      backgroundImage: customization.backgroundImage ?? null,
      backgroundImageVersion: customization.backgroundImageVersion ?? null,
      accentColor,
      accentForegroundColor: accentColor ? (customization.accentForegroundColor ?? null) : null,
      accentForegroundActiveColor: accentColor ? (customization.accentForegroundActiveColor ?? null) : null,
      supporterNameColorEnabled: customization.supporterNameColorEnabled ?? true
   };
}

export function getProfileAccentProperties(customization: PlayerProfileCustomizationStyle | null | undefined) {
   const style = normalizeProfileCustomizationStyle(customization);
   if (!style.accentColor) return undefined;

   const properties: CSSProperties & {
      '--profile-accent': string;
      '--profile-accent-foreground': string;
      '--profile-accent-active-foreground': string;
   } = {
      '--profile-accent': style.accentColor,
      '--profile-accent-foreground': style.accentForegroundColor ?? DEFAULT_PROFILE_ACCENT_FOREGROUND_COLOR,
      '--profile-accent-active-foreground': style.accentForegroundActiveColor ?? DEFAULT_PROFILE_ACCENT_ACTIVE_FOREGROUND_COLOR
   };
   return properties;
}
