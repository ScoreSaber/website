import sanitizeHtml from 'sanitize-html';

import { isAllowedRichTextIframe, isAllowedRichTextImage, richTextPolicy } from '@/shared/rich-text';

type SanitizeOptions = NonNullable<Parameters<typeof sanitizeHtml>[1]>;

const richTextSanitizeOptions: SanitizeOptions = {
   allowedTags: [...richTextPolicy.tags],
   allowedAttributes: {
      '*': ['style', 'alt', 'title'],
      a: ['href', 'rel', 'target', 'style', 'title'],
      img: ['src', 'width', 'height', 'alt', 'title', 'style'],
      iframe: ['src', 'width', 'height', 'allowfullscreen', 'title', 'style']
   },
   allowedStyles: {
      '*': richTextPolicy.styles
   },
   allowedSchemes: ['http', 'https', 'mailto'],
   allowedSchemesAppliedToAttributes: ['href', 'src'],
   allowProtocolRelative: false,
   allowedIframeHostnames: [...richTextPolicy.iframeHosts],
   parseStyleAttributes: true,
   transformTags: {
      img: (_tagName, attribs) => ({
         tagName: 'img',
         attribs: sanitizeMediaAttrs(attribs, isAllowedRichTextImage)
      }),
      iframe: (_tagName, attribs) => ({
         tagName: 'iframe',
         attribs: sanitizeMediaAttrs(attribs, isAllowedRichTextIframe)
      })
   },
   exclusiveFilter: (frame) => {
      if (frame.tag === 'img') return !isAllowedRichTextImage(frame.attribs.src ?? '');
      if (frame.tag === 'iframe') return !isAllowedRichTextIframe(frame.attribs.src ?? '');
      return false;
   }
};

const textOnlyOptions: SanitizeOptions = {
   allowedTags: [],
   allowedAttributes: {},
   textFilter: (text) => text.replace(/\u00a0/g, ' ')
};

const mediaContentOptions: SanitizeOptions = {
   allowedTags: ['hr', 'img', 'iframe'],
   allowedAttributes: {
      img: ['src'],
      iframe: ['src']
   },
   allowedSchemes: ['https'],
   transformTags: {
      img: (_tagName, attribs) => ({
         tagName: 'img',
         attribs: sanitizeMediaAttrs(attribs, isAllowedRichTextImage)
      }),
      iframe: (_tagName, attribs) => ({
         tagName: 'iframe',
         attribs: sanitizeMediaAttrs(attribs, isAllowedRichTextIframe)
      })
   },
   exclusiveFilter: (frame) => {
      if (frame.tag === 'img') return !isAllowedRichTextImage(frame.attribs.src ?? '');
      if (frame.tag === 'iframe') return !isAllowedRichTextIframe(frame.attribs.src ?? '');
      return false;
   }
};

function sanitizeRichTextHtml(value: string) {
   return removeEmptyRichTextShell(sanitizeHtml(value, richTextSanitizeOptions));
}

function hasRichTextContent(value: string) {
   if (sanitizeHtml(value, textOnlyOptions).trim().length > 0) return true;
   return sanitizeHtml(value, mediaContentOptions).trim().length > 0;
}

function removeEmptyRichTextShell(value: string) {
   return hasRichTextContent(value) ? value : '';
}

function sanitizeMediaAttrs(attribs: sanitizeHtml.Attributes, isAllowedSrc: (src: string) => boolean) {
   let next = attribs;
   if (!isAllowedSrc(next.src ?? '')) next = withoutAttrs(next, ['src']);
   if (next.width && !/^\d{1,4}$/.test(next.width)) next = withoutAttrs(next, ['width']);
   if (next.height && !/^\d{1,4}$/.test(next.height)) next = withoutAttrs(next, ['height']);
   return next;
}

function withoutAttrs(attribs: sanitizeHtml.Attributes, attrs: string[]) {
   const next = { ...attribs };
   for (const attr of attrs) {
      delete next[attr];
   }
   return next;
}

export { sanitizeRichTextHtml };
