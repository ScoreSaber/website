'use client';

import { useEffect, useState } from 'react';

import { mergeAttributes, Node } from '@tiptap/core';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
   AlignCenter,
   AlignLeft,
   AlignRight,
   Bold,
   ChevronDown,
   Code,
   Heading1,
   Heading2,
   Heading3,
   Heading4,
   ImageIcon,
   Italic,
   LinkIcon,
   List,
   ListOrdered,
   type LucideIcon,
   Minus,
   Quote,
   Strikethrough,
   UnderlineIcon,
   Unlink,
   Video
} from 'lucide-react';
import { toast } from 'sonner';
import { useTranslations } from 'use-intl';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { ConfirmDialog } from '@/shared/components/confirm-dialog';
import { cn } from '@/shared/format/helpers';
import {
   buildRichTextIframe,
   isAllowedRichTextImage,
   isAllowedRichTextLink,
   normalizeRichTextIframe,
   richTextEmbedPlatforms,
   richTextImageHosts,
   sanitizeRichTextHtml
} from '@/shared/rich-text';

const editorAttributeSchema = z.string();

interface RichTextEditorProps {
   id?: string;
   value: string;
   onChangeAction: (value: string) => void;
   placeholder?: string;
   disabled?: boolean;
   className?: string;
}

type ToolbarButtonProps = {
   label: string;
   active?: boolean;
   disabled?: boolean;
   onClick: () => void;
   icon: LucideIcon;
};

type ToolbarDropdownItem = {
   label: string;
   icon: LucideIcon;
   active?: boolean;
   disabled?: boolean;
   onSelect: () => void;
};

type ToolbarDropdownProps = {
   label: string;
   icon: LucideIcon;
   active?: boolean;
   items: ToolbarDropdownItem[];
};

type RichTextDialogType = 'link' | 'image' | 'embed' | null;

export function RichTextEditor({ id, value, onChangeAction, placeholder, disabled = false, className }: RichTextEditorProps) {
   const t = useTranslations();
   const [dialogType, setDialogType] = useState<RichTextDialogType>(null);
   const [dialogValue, setDialogValue] = useState('');
   const [, rerenderToolbar] = useState(0);

   const editor = useEditor({
      immediatelyRender: false,
      editable: !disabled,
      content: sanitizeRichTextHtml(value),
      extensions: [
         StarterKit.configure({
            codeBlock: false,
            heading: {
               levels: [1, 2, 3, 4]
            },
            link: false,
            underline: false
         }),
         Underline,
         Iframe,
         Image.configure({
            allowBase64: false,
            inline: false,
            HTMLAttributes: {
               loading: 'lazy'
            }
         }),
         TextAlign.configure({
            types: ['paragraph', 'heading']
         }),
         Link.configure({
            autolink: true,
            openOnClick: false,
            linkOnPaste: true,
            protocols: ['http', 'https', 'mailto'],
            isAllowedUri: (url, context) => context.defaultValidate(url) && isAllowedRichTextLink(url),
            HTMLAttributes: {
               rel: 'noopener noreferrer nofollow',
               target: '_blank'
            }
         }),
         Placeholder.configure({
            placeholder
         })
      ],
      editorProps: {
         attributes: {
            ...(id && { id }),
            class: cn(
               'min-h-36 px-3 py-2 text-sm outline-none',
               '[&.is-editor-empty:first-child::before]:text-muted-foreground [&.is-editor-empty:first-child::before]:pointer-events-none [&.is-editor-empty:first-child::before]:float-left [&.is-editor-empty:first-child::before]:h-0 [&.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]',
               '[&_a]:text-link [&_a]:underline [&_blockquote]:border-l [&_blockquote]:pl-3 [&_blockquote]:italic [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5',
               '[&_h1]:my-4 [&_h1]:text-3xl [&_h1]:font-bold [&_h2]:my-3 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:my-2 [&_h3]:text-xl [&_h3]:font-semibold [&_h4]:my-2 [&_h4]:text-lg [&_h4]:font-semibold',
               '[&_hr]:border-border [&_hr]:my-4',
               '[&_iframe]:my-3 [&_iframe]:aspect-video [&_iframe]:h-auto [&_iframe]:max-h-80 [&_iframe]:w-full [&_iframe]:max-w-xl [&_iframe]:rounded-md',
               '[&_img]:mx-auto [&_img]:my-3 [&_img]:max-h-80 [&_img]:max-w-full [&_img]:rounded-md [&_img]:object-contain',
               '[&_li]:my-1 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-2 [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5'
            )
         },
         handlePaste: (_view, event) => {
            if (!hasImageClipboardData(event.clipboardData)) return false;

            toast.error(t('richTextEditor.imageDialogDescription'));
            return true;
         }
      },
      onSelectionUpdate: () => {
         rerenderToolbar((version) => version + 1);
      },
      onUpdate: ({ editor: activeEditor }) => {
         rerenderToolbar((version) => version + 1);
         const next = sanitizeRichTextHtml(activeEditor.getHTML());
         onChangeAction(next);
      }
   });

   useEffect(() => {
      if (!editor) return;
      editor.setEditable(!disabled);
   }, [disabled, editor]);

   useEffect(() => {
      if (!editor || editor.isFocused) return;

      const next = sanitizeRichTextHtml(value);
      if (sanitizeRichTextHtml(editor.getHTML()) === next) return;

      editor.commands.setContent(next || '<p></p>', { emitUpdate: false });
   }, [editor, value]);

   const dialogConfig =
      dialogType === 'image'
         ? {
              title: t('richTextEditor.imageDialogTitle'),
              description: t('richTextEditor.imageDialogDescription'),
              inputLabel: t('richTextEditor.imageUrl'),
              placeholder: 'https://i.imgur.com/example.png',
              confirmLabel: t('richTextEditor.insertImage'),
              listTitle: t('richTextEditor.allowedHosts'),
              hosts: richTextImageHosts
           }
         : dialogType === 'embed'
           ? {
                title: t('richTextEditor.embedDialogTitle'),
                description: t('richTextEditor.embedDialogDescription'),
                inputLabel: t('richTextEditor.embedUrl'),
                placeholder: 'https://www.youtube.com/watch?v=...',
                confirmLabel: t('richTextEditor.insertEmbed'),
                listTitle: t('richTextEditor.allowedPlatforms'),
                hosts: richTextEmbedPlatforms
             }
           : {
                title: t('richTextEditor.linkDialogTitle'),
                description: t('richTextEditor.linkDialogDescription'),
                inputLabel: t('richTextEditor.linkUrl'),
                placeholder: 'https://example.com',
                confirmLabel: t('richTextEditor.insertLink'),
                listTitle: t('richTextEditor.allowedHosts'),
                hosts: []
             };
   const dialogError =
      dialogValue.trim().length === 0
         ? undefined
         : dialogType === 'link' && !isAllowedRichTextLink(dialogValue)
           ? t('richTextEditor.invalidLink')
           : dialogType === 'image' && !isAllowedRichTextImage(dialogValue)
             ? t('richTextEditor.invalidImage')
             : dialogType === 'embed' && !normalizeRichTextIframe(dialogValue)
               ? t('richTextEditor.invalidEmbed')
               : undefined;

   function openDialog(type: Exclude<RichTextDialogType, null>) {
      const href = editorAttributeSchema.safeParse(editor?.getAttributes('link').href);
      setDialogValue(type === 'link' && href.success ? href.data : '');
      setDialogType(type);
   }

   function closeDialog() {
      setDialogType(null);
      setDialogValue('');
   }

   function applyDialogValue() {
      if (!editor || !dialogType || dialogError || !dialogValue.trim()) return;

      if (dialogType === 'link') {
         editor.chain().focus().extendMarkRange('link').setLink({ href: dialogValue }).run();
      }

      if (dialogType === 'image') {
         editor.chain().focus().setImage({ src: dialogValue }).run();
      }

      if (dialogType === 'embed') {
         editor
            .chain()
            .focus()
            .insertContent(buildRichTextIframe(normalizeRichTextIframe(dialogValue)))
            .run();
      }

      closeDialog();
   }

   return (
      <>
         <div
            className={cn(
               'border-input dark:bg-input/30 overflow-hidden rounded-md border bg-transparent shadow-xs transition-[color,box-shadow]',
               'focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]',
               disabled && 'pointer-events-none opacity-50',
               className
            )}
         >
            <div className="bg-muted/30 flex flex-wrap items-center gap-1 border-b px-2 py-1.5">
               <ToolbarDropdown
                  label={t('richTextEditor.formatting')}
                  icon={Bold}
                  active={
                     editor?.isActive('bold') ||
                     editor?.isActive('italic') ||
                     editor?.isActive('underline') ||
                     editor?.isActive('strike') ||
                     editor?.isActive('code')
                  }
                  items={[
                     {
                        label: t('richTextEditor.bold'),
                        icon: Bold,
                        active: editor?.isActive('bold'),
                        disabled: !editor?.can().chain().focus().toggleBold().run(),
                        onSelect: () => editor?.chain().focus().toggleBold().run()
                     },
                     {
                        label: t('richTextEditor.italic'),
                        icon: Italic,
                        active: editor?.isActive('italic'),
                        disabled: !editor?.can().chain().focus().toggleItalic().run(),
                        onSelect: () => editor?.chain().focus().toggleItalic().run()
                     },
                     {
                        label: t('richTextEditor.underline'),
                        icon: UnderlineIcon,
                        active: editor?.isActive('underline'),
                        onSelect: () => editor?.chain().focus().toggleUnderline().run()
                     },
                     {
                        label: t('richTextEditor.strike'),
                        icon: Strikethrough,
                        active: editor?.isActive('strike'),
                        disabled: !editor?.can().chain().focus().toggleStrike().run(),
                        onSelect: () => editor?.chain().focus().toggleStrike().run()
                     },
                     {
                        label: t('richTextEditor.code'),
                        icon: Code,
                        active: editor?.isActive('code'),
                        disabled: !editor?.can().chain().focus().toggleCode().run(),
                        onSelect: () => editor?.chain().focus().toggleCode().run()
                     }
                  ]}
               />
               <ToolbarDropdown
                  label={t('richTextEditor.blocks')}
                  icon={Heading2}
                  active={
                     editor?.isActive('heading', { level: 1 }) ||
                     editor?.isActive('heading', { level: 2 }) ||
                     editor?.isActive('heading', { level: 3 }) ||
                     editor?.isActive('heading', { level: 4 }) ||
                     editor?.isActive('bulletList') ||
                     editor?.isActive('orderedList') ||
                     editor?.isActive('blockquote')
                  }
                  items={[
                     {
                        label: t('richTextEditor.heading1'),
                        icon: Heading1,
                        active: editor?.isActive('heading', { level: 1 }),
                        onSelect: () => editor?.chain().focus().toggleHeading({ level: 1 }).run()
                     },
                     {
                        label: t('richTextEditor.heading2'),
                        icon: Heading2,
                        active: editor?.isActive('heading', { level: 2 }),
                        onSelect: () => editor?.chain().focus().toggleHeading({ level: 2 }).run()
                     },
                     {
                        label: t('richTextEditor.heading3'),
                        icon: Heading3,
                        active: editor?.isActive('heading', { level: 3 }),
                        onSelect: () => editor?.chain().focus().toggleHeading({ level: 3 }).run()
                     },
                     {
                        label: t('richTextEditor.heading4'),
                        icon: Heading4,
                        active: editor?.isActive('heading', { level: 4 }),
                        onSelect: () => editor?.chain().focus().toggleHeading({ level: 4 }).run()
                     },
                     {
                        label: t('richTextEditor.bulletList'),
                        icon: List,
                        active: editor?.isActive('bulletList'),
                        onSelect: () => editor?.chain().focus().toggleBulletList().run()
                     },
                     {
                        label: t('richTextEditor.orderedList'),
                        icon: ListOrdered,
                        active: editor?.isActive('orderedList'),
                        onSelect: () => editor?.chain().focus().toggleOrderedList().run()
                     },
                     {
                        label: t('richTextEditor.blockquote'),
                        icon: Quote,
                        active: editor?.isActive('blockquote'),
                        onSelect: () => editor?.chain().focus().toggleBlockquote().run()
                     },
                     {
                        label: t('richTextEditor.horizontalRule'),
                        icon: Minus,
                        onSelect: () => editor?.chain().focus().setHorizontalRule().run()
                     }
                  ]}
               />
               <ToolbarDropdown
                  label={t('richTextEditor.alignment')}
                  icon={AlignLeft}
                  active={
                     editor?.isActive({ textAlign: 'left' }) || editor?.isActive({ textAlign: 'center' }) || editor?.isActive({ textAlign: 'right' })
                  }
                  items={[
                     {
                        label: t('richTextEditor.alignLeft'),
                        icon: AlignLeft,
                        active: editor?.isActive({ textAlign: 'left' }),
                        onSelect: () => editor?.chain().focus().setTextAlign('left').run()
                     },
                     {
                        label: t('richTextEditor.alignCenter'),
                        icon: AlignCenter,
                        active: editor?.isActive({ textAlign: 'center' }),
                        onSelect: () => editor?.chain().focus().setTextAlign('center').run()
                     },
                     {
                        label: t('richTextEditor.alignRight'),
                        icon: AlignRight,
                        active: editor?.isActive({ textAlign: 'right' }),
                        onSelect: () => editor?.chain().focus().setTextAlign('right').run()
                     }
                  ]}
               />
               <Separator orientation="vertical" className="mx-1 h-5" />
               <ToolbarButton label={t('richTextEditor.link')} icon={LinkIcon} active={editor?.isActive('link')} onClick={() => openDialog('link')} />
               <ToolbarButton label={t('richTextEditor.image')} icon={ImageIcon} onClick={() => openDialog('image')} />
               <ToolbarButton label={t('richTextEditor.embed')} icon={Video} onClick={() => openDialog('embed')} />
               <ToolbarButton
                  label={t('richTextEditor.unlink')}
                  icon={Unlink}
                  disabled={!editor?.isActive('link')}
                  onClick={() => editor?.chain().focus().extendMarkRange('link').unsetLink().run()}
               />
            </div>
            <EditorContent editor={editor} />
         </div>
         <ConfirmDialog
            open={dialogType != null}
            onOpenChangeAction={(open) => !open && closeDialog()}
            title={dialogConfig.title}
            description={dialogConfig.description}
            confirmLabel={dialogConfig.confirmLabel}
            disabled={!editor}
            textInput={{
               label: dialogConfig.inputLabel,
               value: dialogValue,
               onValueChangeAction: setDialogValue,
               placeholder: dialogConfig.placeholder,
               required: true,
               error: dialogError
            }}
            onConfirmAction={applyDialogValue}
         >
            {dialogConfig.hosts.length > 0 && <AllowedHosts title={dialogConfig.listTitle} hosts={dialogConfig.hosts} />}
         </ConfirmDialog>
      </>
   );
}

function hasImageClipboardData(data: DataTransfer | null) {
   if (!data) return false;

   return (
      [...data.items].some((item) => item.kind === 'file' && item.type.startsWith('image/')) ||
      [...data.files].some((file) => file.type.startsWith('image/'))
   );
}

function ToolbarButton({ label, icon: Icon, active = false, disabled = false, onClick }: ToolbarButtonProps) {
   return (
      <Tooltip>
         <TooltipTrigger asChild>
            <Button
               type="button"
               variant={active ? 'secondary' : 'ghost'}
               size="icon-xs"
               aria-label={label}
               disabled={disabled}
               onClick={onClick}
               className="cursor-pointer"
            >
               <Icon data-icon />
            </Button>
         </TooltipTrigger>
         <TooltipContent>{label}</TooltipContent>
      </Tooltip>
   );
}

function ToolbarDropdown({ label, icon: Icon, active = false, items }: ToolbarDropdownProps) {
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button type="button" variant={active ? 'secondary' : 'ghost'} size="xs" aria-label={label} className="cursor-pointer gap-1 px-1.5">
               <Icon data-icon />
               <ChevronDown data-icon className="size-2.5 opacity-70" />
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="start">
            {items.map((item) => (
               <DropdownMenuItem
                  key={item.label}
                  disabled={item.disabled}
                  onSelect={() => item.onSelect()}
                  className={cn(item.active && 'bg-accent text-accent-foreground')}
               >
                  <item.icon data-icon="inline-start" />
                  {item.label}
               </DropdownMenuItem>
            ))}
         </DropdownMenuContent>
      </DropdownMenu>
   );
}

const Iframe = Node.create({
   name: 'iframe',
   group: 'block',
   atom: true,

   addAttributes() {
      return {
         src: { default: null },
         width: { default: '560' },
         height: { default: '315' },
         title: { default: null },
         allowfullscreen: { default: 'true' }
      };
   },

   parseHTML() {
      return [{ tag: 'iframe[src]' }];
   },

   renderHTML({ HTMLAttributes }) {
      return ['iframe', mergeAttributes(HTMLAttributes, { allowfullscreen: 'true' })];
   }
});

function AllowedHosts({ title, hosts }: { title: string; hosts: string[] }) {
   return (
      <div className="bg-muted/30 rounded-md border px-3 py-2 text-sm">
         <p className="text-muted-foreground mb-1">{title}</p>
         <ul className="list-disc space-y-1 pl-5">
            {hosts.map((host) => (
               <li key={host}>
                  <code className="text-xs">{host}</code>
               </li>
            ))}
         </ul>
      </div>
   );
}
