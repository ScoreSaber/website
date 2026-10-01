'use client';

import { Result, TaggedError } from 'better-result';

import { CopyButton } from '@/shared/components/copy-button';

class NoticeTemplateCopyError extends TaggedError('NoticeTemplateCopyError')<{
   message: string;
   cause: unknown;
}>() {}

function noticeTemplateCopyError(cause: unknown) {
   return new NoticeTemplateCopyError({
      message: 'failed to copy copyright notice template',
      cause
   });
}

const noticeTemplateFields = [
   {
      label: 'Subject',
      placeholder: 'Copyright takedown notice'
   },
   {
      label: 'Copyright owner or exclusive licensee',
      placeholder: '[name]'
   },
   {
      label: 'Your authority',
      placeholder: '[owner, exclusive licensee, or authorised agent; if agent, identify who authorised you]'
   },
   {
      label: 'Copyright work',
      placeholder: '[title, description, source URL, or representative list]'
   },
   {
      label: 'ScoreSaber material, link, or reference to review',
      placeholder: '[ScoreSaber URL, image URL, map ID, leaderboard ID, BeatSaver URL, or other locator]'
   },
   {
      label: 'Contact information',
      placeholder: '[mailing address, phone number, email address]'
   },
   {
      label: 'Good faith statement',
      placeholder:
         'I believe in good faith that the disputed storage, display, link, or reference is not authorised by the copyright owner, ' +
         'an exclusive licensee, an agent, or the law.'
   },
   {
      label: 'Accuracy statement',
      placeholder: 'I have taken reasonable steps to ensure that the information and statements in this notice are accurate.'
   },
   {
      label: 'Signature',
      placeholder: '[typed full legal name or electronic signature]'
   }
];

const noticeTemplateHtml = `
<ul>
${noticeTemplateFields.map((field) => `<li><strong>${field.label}:</strong> ${field.placeholder}</li>`).join('')}
</ul>
`.trim();

const noticeTemplateText = noticeTemplateFields.map((field) => `- ${field.label}:\n  ${field.placeholder}`).join('\n');

function getNoticeTemplateWriter() {
   if (globalThis.ClipboardItem !== undefined && navigator.clipboard?.write) {
      const html = new Blob([noticeTemplateHtml], { type: 'text/html' });
      const text = new Blob([noticeTemplateText], { type: 'text/plain' });

      return () =>
         navigator.clipboard.write([
            new ClipboardItem({
               'text/html': html,
               'text/plain': text
            })
         ]);
   }

   return navigator.clipboard?.writeText ? () => navigator.clipboard.writeText(noticeTemplateText) : null;
}

async function writeNoticeTemplate() {
   const write = getNoticeTemplateWriter();
   if (!write) return Result.err(noticeTemplateCopyError(new Error('clipboard unavailable')));

   return Result.tryPromise({
      try: write,
      catch: noticeTemplateCopyError
   });
}

export function CopyrightNoticeTemplate() {
   return (
      <div className="space-y-3">
         <div className="flex justify-end print:hidden">
            <CopyButton copyAction={writeNoticeTemplate} aria-label="Copy" title="Copy" errorMessage="Copy failed" />
         </div>

         <ul aria-label="Copyright takedown notice template">
            {noticeTemplateFields.map((field) => (
               <li key={field.label}>
                  <strong>{field.label}:</strong> {field.placeholder}
               </li>
            ))}
         </ul>
      </div>
   );
}
