'use client';

import { useEffect, type RefObject } from 'react';

const NUMBER_PATTERN = /\d+(?:,\d{3})*(?:\.\d+)?/g;
const TAMPER_CHANCE = 0.35;
const ROMAN_CHANCE = 0.8;
const NUMBER_EFFECT_SELECTOR = '[data-denyah-number-effect]';

interface TextEffectState {
   root: HTMLDivElement;
   rewrittenText: WeakMap<Node, string>;
}

interface RenderedNumberEffects {
   roman: boolean;
   upsideDown: boolean;
}

const ROMAN_NUMERALS: [number, string][] = [
   [1000, 'M'],
   [900, 'CM'],
   [500, 'D'],
   [400, 'CD'],
   [100, 'C'],
   [90, 'XC'],
   [50, 'L'],
   [40, 'XL'],
   [10, 'X'],
   [9, 'IX'],
   [5, 'V'],
   [4, 'IV'],
   [1, 'I']
];

function toRomanNumerals(value: number): string {
   if (value === 0) return 'N';

   if (value >= 4000) {
      const thousands = Math.floor(value / 1000);
      const remainder = value % 1000;
      return `(${toRomanNumerals(thousands)})${remainder === 0 ? '' : toRomanNumerals(remainder)}`;
   }

   let remaining = value;
   let result = '';

   for (const [number, numeral] of ROMAN_NUMERALS) {
      while (remaining >= number) {
         result += numeral;
         remaining -= number;
      }
   }

   return result;
}

function toRomanNumber(value: string) {
   const parts = value.replaceAll(',', '').split('.');
   const romanParts = parts.map((part) => {
      const number = Number(part);
      return Number.isSafeInteger(number) ? toRomanNumerals(number) : null;
   });

   return romanParts.includes(null) ? null : romanParts.join('.');
}

function createUpsideDownNumber(value: string) {
   const span = document.createElement('span');
   span.dataset.denyahNumberEffect = 'upside-down';
   span.ariaLabel = value;
   Object.assign(span.style, {
      display: 'inline-block',
      whiteSpace: 'nowrap'
   });

   for (const character of value) {
      const flippedCharacter = document.createElement('span');
      flippedCharacter.ariaHidden = 'true';
      flippedCharacter.textContent = character;
      Object.assign(flippedCharacter.style, {
         display: 'inline-block',
         lineHeight: 'inherit',
         transform: 'rotate(180deg)',
         transformOrigin: 'center'
      });
      span.append(flippedCharacter);
   }

   return span;
}

function rewriteTextNode(node: Node, state: TextEffectState, renderedEffects: RenderedNumberEffects) {
   const text = node.nodeValue;
   if (!text || state.rewrittenText.get(node) === text || node.parentElement?.closest(NUMBER_EFFECT_SELECTOR)) return;

   const value = text.replace(/(\d)pp\b/g, '$1 pee pee').replace(/\bpp\b/g, 'pee pee');
   const parts: Array<string | HTMLSpanElement> = [];
   const isVisible = (node.parentElement?.getClientRects().length ?? 0) > 0;
   let hasNumberEffect = false;
   let lastIndex = 0;

   for (const match of value.matchAll(NUMBER_PATTERN)) {
      const index = match.index;
      const number = match[0];
      parts.push(value.slice(lastIndex, index));
      lastIndex = index + number.length;

      const romanNumber = toRomanNumber(number);
      const forceRoman = isVisible && !renderedEffects.roman && romanNumber !== null;
      const forceUpsideDown = isVisible && renderedEffects.roman && !renderedEffects.upsideDown;
      if (!forceRoman && !forceUpsideDown && Math.random() >= TAMPER_CHANCE) {
         parts.push(number);
         continue;
      }

      if (!forceUpsideDown && romanNumber !== null && (forceRoman || Math.random() < ROMAN_CHANCE)) {
         const roman = document.createElement('span');
         roman.dataset.denyahNumberEffect = 'roman';
         roman.textContent = romanNumber;
         parts.push(roman);
         hasNumberEffect = true;
         if (isVisible) renderedEffects.roman = true;
         continue;
      }

      parts.push(createUpsideDownNumber(number));
      hasNumberEffect = true;
      if (isVisible) renderedEffects.upsideDown = true;
   }

   parts.push(value.slice(lastIndex));

   if (!hasNumberEffect) {
      state.rewrittenText.set(node, value);
      if (value !== text) node.nodeValue = value;
      return;
   }

   const fragment = document.createDocumentFragment();
   for (const part of parts) {
      if (typeof part === 'string') {
         if (!part) continue;
         const textNode = document.createTextNode(part);
         state.rewrittenText.set(textNode, part);
         fragment.append(textNode);
      } else {
         fragment.append(part);
      }
   }
   node.parentNode?.replaceChild(fragment, node);
}

function rewriteTree(root: Node, state: TextEffectState) {
   const renderedEffects = {
      roman: false,
      upsideDown: false
   };
   for (const element of state.root.querySelectorAll<HTMLElement>(NUMBER_EFFECT_SELECTOR)) {
      if (element.getClientRects().length > 0) {
         renderedEffects[element.dataset.denyahNumberEffect === 'roman' ? 'roman' : 'upsideDown'] = true;
      }
   }

   if (root.nodeType === Node.TEXT_NODE) {
      rewriteTextNode(root, state, renderedEffects);
      return;
   }

   if (root instanceof Element && root.closest(NUMBER_EFFECT_SELECTOR)) return;

   const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
   const textNodes: Node[] = [];
   for (let node = walker.nextNode(); node; node = walker.nextNode()) textNodes.push(node);
   for (const node of textNodes) rewriteTextNode(node, state, renderedEffects);
}

export function DenyahTextEffects({ targetRef }: { targetRef: RefObject<HTMLDivElement | null> }) {
   useEffect(() => {
      const root = targetRef.current;
      if (!root) return;

      const state: TextEffectState = {
         root,
         rewrittenText: new WeakMap()
      };
      rewriteTree(root, state);

      const observer = new MutationObserver((mutations) => {
         for (const mutation of mutations) {
            if (mutation.type === 'characterData') {
               rewriteTree(mutation.target, state);
            } else {
               for (const node of mutation.addedNodes) rewriteTree(node, state);
            }
         }
      });
      observer.observe(root, { subtree: true, childList: true, characterData: true });

      return () => observer.disconnect();
   }, [targetRef]);

   return null;
}
