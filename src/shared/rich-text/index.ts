type RichTextAttrs = Record<string, string | undefined>;

const richTextPolicy = {
   tags: ['p', 'br', 'hr', 'h1', 'h2', 'h3', 'h4', 'strong', 'em', 'u', 's', 'code', 'blockquote', 'ul', 'ol', 'li', 'a', 'img', 'iframe'],
   imagePrefixes: ['https://i.imgur.com/', 'https://cdn.scoresaber.com/', 'https://files.catbox.moe/', 'https://i.ibb.co/'],
   iframeHosts: ['www.youtube.com', 'youtube.com', 'player.vimeo.com', 'player.twitch.tv', 'clips.twitch.tv', 'w.soundcloud.com', 'open.spotify.com'],
   imageHosts: ['i.imgur.com', 'cdn.scoresaber.com', 'files.catbox.moe', 'i.ibb.co'],
   embedPlatforms: ['YouTube', 'Vimeo', 'Twitch', 'SoundCloud', 'Spotify'],
   twitchEmbedParents: ['scoresaber.com', 'www.scoresaber.com', 'new.scoresaber.com', 'localhost'],
   styles: {
      color: [/^#(0x)?[0-9a-f]+$/i, /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i],
      'text-align': [/^(left|right|center)$/],
      'text-decoration': [/^(underline|overline|none|dashed|solid|blink|line-through)$/],
      'font-size': [/^\d+(?:px|em|%|rem)$/],
      display: [/^block$/],
      'margin-left': [/^auto$/],
      'margin-right': [/^auto$/],
      float: [/^(left|right)$/]
   }
};

const richTextImageHosts = [...richTextPolicy.imageHosts];
const richTextEmbedPlatforms = [...richTextPolicy.embedPlatforms];
const richTextStyleValidators = new Map<string, RegExp[]>(Object.entries(richTextPolicy.styles));

function sanitizeRichTextHtml(value: string): string {
   if (globalThis.DOMParser === undefined) return value;

   const doc = new DOMParser().parseFromString(`<div>${value}</div>`, 'text/html');
   const root = doc.body.firstElementChild;
   if (!root) return '';

   sanitizeRichTextChildren(root);
   return removeEmptyRichTextShell(root.innerHTML);
}

function removeEmptyRichTextShell(value: string): string {
   return hasRichTextContent(value) ? value : '';
}

function normalizeRichTextIframe(value: string) {
   const src = getFirstIframeSrc(value);
   if (src) return normalizeRichTextIframe(src);

   const url = URL.canParse(value) ? new URL(value) : null;
   if (!url) return '';

   if ((url.hostname === 'youtube.com' || url.hostname === 'www.youtube.com') && url.pathname === '/watch') {
      const videoId = url.searchParams.get('v');
      return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
   }

   if (url.hostname === 'youtu.be') {
      const videoId = url.pathname.replace('/', '');
      return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
   }

   if (url.hostname === 'vimeo.com') {
      const videoId = url.pathname.replace('/', '');
      return videoId ? `https://player.vimeo.com/video/${videoId}` : '';
   }

   if (url.hostname === 'twitch.tv' || url.hostname === 'www.twitch.tv') {
      const pathParts = url.pathname.split('/').filter(Boolean);
      const clipIndex = pathParts.indexOf('clip');
      if (clipIndex >= 0 && pathParts[clipIndex + 1]) {
         return buildTwitchEmbedUrl('https://clips.twitch.tv/embed', { clip: pathParts[clipIndex + 1] });
      }

      return pathParts[0] ? buildTwitchEmbedUrl('https://player.twitch.tv/', { channel: pathParts[0] }) : '';
   }

   if (url.hostname === 'clips.twitch.tv' && !url.pathname.startsWith('/embed')) {
      const clip = url.pathname.replace('/', '');
      return clip ? buildTwitchEmbedUrl('https://clips.twitch.tv/embed', { clip }) : '';
   }

   if (url.hostname === 'soundcloud.com' || url.hostname.endsWith('.soundcloud.com')) {
      return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url.toString())}`;
   }

   if (url.hostname === 'open.spotify.com' && !url.pathname.startsWith('/embed/')) {
      return `https://open.spotify.com/embed${url.pathname}`;
   }

   if (isAllowedRichTextIframe(value)) {
      return value;
   }

   return '';
}

function buildRichTextIframe(src: string) {
   return sanitizeRichTextHtml(`<iframe src="${escapeHtmlAttr(src)}" width="560" height="315" allowfullscreen></iframe>`);
}

function isAllowedRichTextIframe(value: string) {
   const url = URL.canParse(value) ? new URL(value) : null;
   return !!url && url.protocol === 'https:' && richTextPolicy.iframeHosts.includes(url.hostname);
}

function isAllowedRichTextLink(value: string) {
   const url = URL.canParse(value) ? new URL(value) : null;
   return !!url && ['http:', 'https:', 'mailto:'].includes(url.protocol);
}

function isAllowedRichTextImage(value: string) {
   return richTextPolicy.imagePrefixes.some((prefix) => value.startsWith(prefix));
}

function hasRichTextContent(value: string): boolean {
   if (globalThis.DOMParser === undefined) {
      const textContent = value
         .replace(/<[^>]*>/g, '')
         .replace(/\u00a0/g, ' ')
         .trim();
      return textContent.length > 0 || /<(hr|img|iframe)(\s|>|\/)/i.test(value);
   }

   const doc = new DOMParser().parseFromString(`<div>${value}</div>`, 'text/html');
   const root = doc.body.firstElementChild;
   if (!root) return false;

   sanitizeRichTextChildren(root);
   if ((root.textContent ?? '').replace(/\u00a0/g, ' ').trim().length > 0) return true;
   return !!root.querySelector('hr,img,iframe');
}

function getFirstIframeSrc(value: string) {
   return /<iframe\b[^>]*\bsrc=(["'])(.*?)\1/i.exec(value)?.[2] ?? '';
}

function buildTwitchEmbedUrl(baseUrl: string, params: Record<string, string>) {
   const url = new URL(baseUrl);
   for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
   }
   for (const parent of richTextPolicy.twitchEmbedParents) {
      url.searchParams.append('parent', parent);
   }
   return url.toString();
}

function sanitizeLinkAttrs(attribs: RichTextAttrs) {
   let next = attribs;
   if (!isAllowedRichTextLink(next.href ?? '')) next = withoutAttrs(next, ['href']);
   if (next.target && !['_blank', '_self', '_parent', '_top'].includes(next.target)) next = withoutAttrs(next, ['target']);
   return next;
}

function sanitizeMediaAttrs(attribs: RichTextAttrs, isAllowedSrc: (src: string) => boolean) {
   let next = attribs;
   if (!isAllowedSrc(next.src ?? '')) next = withoutAttrs(next, ['src']);
   if (next.width && !/^\d{1,4}$/.test(next.width)) next = withoutAttrs(next, ['width']);
   if (next.height && !/^\d{1,4}$/.test(next.height)) next = withoutAttrs(next, ['height']);
   return next;
}

function withoutAttrs(attribs: RichTextAttrs, attrs: string[]) {
   const next = { ...attribs };
   for (const attr of attrs) {
      delete next[attr];
   }
   return next;
}

function sanitizeRichTextChildren(parent: Element) {
   for (const child of Array.from(parent.childNodes)) {
      if (child.nodeType === Node.TEXT_NODE) continue;
      if (!(child instanceof Element)) {
         child.remove();
         continue;
      }

      const tagName = child.tagName.toLowerCase();
      if (!richTextPolicy.tags.includes(tagName)) {
         child.replaceWith(...child.childNodes);
         continue;
      }

      sanitizeElementAttrs(child, tagName);
      sanitizeRichTextChildren(child);
   }
}

function sanitizeElementAttrs(element: Element, tagName: string) {
   const allowedAttrs = getAllowedAttrs(tagName);
   const attrs = Object.fromEntries([...element.attributes].map((attr) => [attr.name.toLowerCase(), attr.value]));

   for (const attr of Array.from(element.attributes)) {
      element.removeAttribute(attr.name);
   }

   const next =
      tagName === 'a'
         ? sanitizeLinkAttrs(attrs)
         : tagName === 'img'
           ? sanitizeMediaAttrs(attrs, isAllowedRichTextImage)
           : tagName === 'iframe'
             ? sanitizeMediaAttrs(attrs, isAllowedRichTextIframe)
             : attrs;

   if ((tagName === 'img' || tagName === 'iframe') && !next.src) {
      element.remove();
      return;
   }

   for (const attr of allowedAttrs) {
      const value = next[attr];
      if (!value && attr !== 'allowfullscreen') continue;
      if (attr === 'style') {
         const style = sanitizeStyle(value ?? '');
         if (style) element.setAttribute(attr, style);
         continue;
      }
      element.setAttribute(attr, value ?? '');
   }
}

function getAllowedAttrs(tagName: string) {
   if (tagName === 'a') return ['href', 'rel', 'target', 'style', 'title'];
   if (tagName === 'img') return ['src', 'width', 'height', 'alt', 'title', 'style'];
   if (tagName === 'iframe') return ['src', 'width', 'height', 'allowfullscreen', 'title', 'style'];
   return ['style', 'alt', 'title'];
}

function sanitizeStyle(value: string) {
   return value
      .split(';')
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
         const separator = part.indexOf(':');
         if (separator < 0) return null;

         const prop = part.slice(0, separator).trim().toLowerCase();
         const styleValue = part.slice(separator + 1).trim();
         const validators = richTextStyleValidators.get(prop);
         return validators?.some((validator) => validator.test(styleValue)) ? `${prop}: ${styleValue}` : null;
      })
      .filter((part): part is string => !!part)
      .join('; ');
}

function escapeHtmlAttr(value: string) {
   return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export {
   buildRichTextIframe,
   isAllowedRichTextIframe,
   isAllowedRichTextImage,
   isAllowedRichTextLink,
   normalizeRichTextIframe,
   richTextEmbedPlatforms,
   richTextImageHosts,
   richTextPolicy,
   sanitizeRichTextHtml
};
