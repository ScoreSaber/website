'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { Result } from 'better-result';

import { readStorageValue, writeStorageValue } from '@/shared/result/storage';
import {
   parseTheme,
   type ResolvedTheme,
   type Theme,
   THEME_COOKIE_NAME,
   THEME_MEDIA_QUERY,
   THEME_STORAGE_KEY,
   themes
} from '@/shared/ui-adjacent/theme';

type ThemeContextValue = {
   theme: Theme;
   setTheme: (theme: string) => void;
   resolvedTheme: ResolvedTheme;
   systemTheme: ResolvedTheme;
   themes: readonly Theme[];
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function getSystemTheme(): ResolvedTheme {
   if (globalThis.window === undefined) return 'dark';
   return window.matchMedia(THEME_MEDIA_QUERY).matches ? 'dark' : 'light';
}

function getInitialTheme(): Theme {
   if (globalThis.window === undefined) return 'system';
   return parseTheme(Result.unwrapOr(readStorageValue(THEME_STORAGE_KEY), null));
}

function applyTheme(resolved: ResolvedTheme) {
   const root = document.documentElement;
   root.classList.remove('light', 'dark');
   root.classList.add(resolved);
   root.style.colorScheme = resolved;
}

function writeThemeCookie(theme: Theme) {
   document.cookie = `${THEME_COOKIE_NAME}=${theme}; Path=/; Max-Age=31536000; SameSite=Lax`;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
   const [theme, setThemeState] = useState<Theme>(getInitialTheme);
   const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(getSystemTheme);
   const resolvedTheme = theme === 'system' ? systemTheme : theme;

   const setTheme = useCallback((next: string) => {
      const validated = parseTheme(next);
      setThemeState(validated);
      writeStorageValue(THEME_STORAGE_KEY, validated);
      writeThemeCookie(validated);
   }, []);

   useEffect(() => {
      applyTheme(resolvedTheme);
      writeThemeCookie(theme);
   }, [resolvedTheme, theme]);

   useEffect(() => {
      const mq = window.matchMedia(THEME_MEDIA_QUERY);
      const handler = (e: MediaQueryListEvent) => setSystemTheme(e.matches ? 'dark' : 'light');
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
   }, []);

   useEffect(() => {
      const handler = (e: StorageEvent) => {
         if (e.key === THEME_STORAGE_KEY) {
            setThemeState(parseTheme(e.newValue));
         }
      };
      window.addEventListener('storage', handler);
      return () => window.removeEventListener('storage', handler);
   }, []);

   const value = useMemo<ThemeContextValue>(
      () => ({ theme, setTheme, resolvedTheme, systemTheme, themes }),
      [theme, setTheme, resolvedTheme, systemTheme]
   );

   return <ThemeContext value={value}>{children}</ThemeContext>;
}

export function useTheme(): ThemeContextValue {
   const ctx = useContext(ThemeContext);
   if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
   return ctx;
}
