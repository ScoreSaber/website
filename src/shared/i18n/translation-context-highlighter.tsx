'use client';

import { useEffect, useState } from 'react';

import type { Messages } from '@/shared/i18n/messages';

const contextParam = 'ssctx';
const viewportParam = 'ssctxViewport';
const skippedSelectors = [
   '[role="dialog"]',
   '[data-slot="dialog-content"]',
   '[data-slot="popover-content"]',
   '[data-slot="dropdown-menu-content"]',
   '[data-slot="command-dialog"]',
   '[data-radix-popper-content-wrapper]',
   '[aria-hidden="true"]',
   'script',
   'style'
].join(',');

export function TranslationContextHighlighter({ messages }: { messages: Messages }) {
   const [mobilePreviewUrl, setMobilePreviewUrl] = useState<string | null>(null);

   useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const key = params.get(contextParam);
      if (!key) return;

      if (params.get(viewportParam) === 'mobile' && !window.matchMedia('(max-width: 767px)').matches) {
         params.delete(viewportParam);
         setMobilePreviewUrl(`${window.location.pathname}?${params.toString()}${window.location.hash}`);
         return;
      }

      const message = getMessage(messages, key);
      if (!message) return;

      const target = findVisibleTextElement(message);
      if (!target) return;

      target.scrollIntoView({ block: 'center', inline: 'center', behavior: 'smooth' });
      const targetElement = target;

      const overlay = document.createElement('div');
      Object.assign(overlay.style, {
         position: 'fixed',
         zIndex: '2147483647',
         pointerEvents: 'none',
         border: '2px solid var(--primary)',
         borderRadius: '8px',
         boxShadow: '0 0 0 4px color-mix(in srgb, var(--primary) 30%, transparent)',
         transition: 'opacity 150ms ease'
      });

      function syncOverlay() {
         const rect = targetElement.getBoundingClientRect();
         overlay.style.left = `${Math.max(8, rect.left - 4)}px`;
         overlay.style.top = `${Math.max(8, rect.top - 4)}px`;
         overlay.style.width = `${rect.width + 8}px`;
         overlay.style.height = `${rect.height + 8}px`;
      }

      syncOverlay();
      document.body.append(overlay);
      window.addEventListener('resize', syncOverlay);
      window.addEventListener('scroll', syncOverlay, true);

      return () => {
         window.removeEventListener('resize', syncOverlay);
         window.removeEventListener('scroll', syncOverlay, true);
         overlay.remove();
      };
   }, [messages]);

   return mobilePreviewUrl ? (
      <div className="bg-background fixed inset-0 z-[2147483646] flex items-start justify-center overflow-auto p-4 sm:p-6">
         <iframe
            title="Translation context preview"
            className="border-border bg-background h-[844px] max-h-[calc(100vh-2rem)] w-[390px] max-w-full border shadow-xl"
            src={mobilePreviewUrl}
            sandbox="allow-scripts"
         />
      </div>
   ) : null;
}

function getMessage(messages: Messages, key: string) {
   let value: string | Messages = messages;
   for (const segment of key.split('.')) {
      if (typeof value === 'string') return null;
      const next: string | Messages | undefined = value[segment];
      if (next === undefined) return null;
      value = next;
   }

   return typeof value === 'string' ? value : null;
}

function findVisibleTextElement(message: string) {
   const normalizedMessage = normalizeText(message);
   if (!normalizedMessage) return null;

   const candidates = Array.from(document.body.querySelectorAll<HTMLElement>('body *')).filter((element) => {
      if (element.closest(skippedSelectors)) return false;
      if (element.children.length > 4) return false;
      if (!isVisible(element)) return false;

      const text = normalizeText(element.textContent ?? '');
      return text === normalizedMessage || text.includes(normalizedMessage);
   });

   return candidates.sort((a, b) => scoreCandidate(a, normalizedMessage) - scoreCandidate(b, normalizedMessage))[0] ?? null;
}

function normalizeText(value: string) {
   return value
      .replace(/\{[^}]+}/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
}

function isVisible(element: HTMLElement) {
   const rect = element.getBoundingClientRect();
   const style = window.getComputedStyle(element);
   return rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden' && style.display !== 'none' && style.opacity !== '0';
}

function scoreCandidate(element: HTMLElement, normalizedMessage: string) {
   const text = normalizeText(element.textContent ?? '');
   return Math.abs(text.length - normalizedMessage.length) + element.children.length * 20;
}
