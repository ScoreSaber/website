'use client';

import { type ReactNode, useState } from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { useDebouncedCallback } from '@/hooks/use-debounced-callback';
import { FadeInImage } from '@/shared/components/fade-in-image';
import { Image } from '@/shared/components/image';
import { getControllerImage, getDetailedImage, getHmdImage, isLightImage } from '@/shared/format/device-images';
import { cn } from '@/shared/format/helpers';

type DeviceDisplaySize = 'xs' | 'sm' | 'md';
type DeviceDisplayVariant = 'inline' | 'stacked';

interface DeviceDisplayProps {
   hmd?: string | null;
   controllerLeft?: string | null;
   controllerRight?: string | null;
   variant?: DeviceDisplayVariant;
   size?: DeviceDisplaySize;
   className?: string;
}

const SIZE_CLASSES = {
   xs: { hmd: 'h-3.5', controller: 'h-3.5' },
   sm: { hmd: 'h-4', controller: 'h-4' },
   md: { hmd: 'h-6', controller: 'h-5' }
};

interface HoverPopoverProps {
   label: string;
   detailedSrc: string;
   open: boolean;
   onOpenAction: () => void;
   onCloseAction: () => void;
   children: ReactNode;
}

export function DeviceDisplay({ hmd, controllerLeft, controllerRight, variant = 'inline', size = 'sm', className }: DeviceDisplayProps) {
   const hmdImg = hmd ? getHmdImage(hmd) : null;
   const leftImg = controllerLeft ? getControllerImage(controllerLeft, 'left', hmd ?? '') : null;
   const rightImg = controllerRight ? getControllerImage(controllerRight, 'right', hmd ?? '') : null;
   const [activeId, setActiveId] = useState<string | null>(null);

   if (!hmdImg && !leftImg && !rightImg) return null;

   const sizes = SIZE_CLASSES[size];

   const renderDevice = (id: string, label: string, imagePath: string, sizeClass: string) => {
      const light = isLightImage(imagePath);

      return (
         <DeviceHover
            label={label}
            imagePath={imagePath}
            open={activeId === id}
            onOpenAction={() => setActiveId(id)}
            onCloseAction={() => setActiveId((prev) => (prev === id ? null : prev))}
         >
            <FadeInImage
               src={imagePath}
               alt={label}
               width={64}
               height={64}
               className={cn(sizeClass, 'w-auto object-contain', light ? 'brightness-[0.365] dark:brightness-[0.865]' : 'dark:invert')}
               draggable={false}
            />
         </DeviceHover>
      );
   };

   const hmdNode = hmdImg && hmd ? renderDevice('hmd', hmd, hmdImg, sizes.hmd) : null;
   const leftNode = leftImg && controllerLeft ? renderDevice('left', controllerLeft, leftImg, sizes.controller) : null;
   const rightNode = rightImg && controllerRight ? renderDevice('right', controllerRight, rightImg, sizes.controller) : null;

   if (variant === 'stacked') {
      return (
         <div className={cn('flex flex-col items-center gap-0.5', className)}>
            {hmdNode}
            {(leftNode || rightNode) && (
               <div className="flex items-end gap-3">
                  {leftNode}
                  {rightNode}
               </div>
            )}
         </div>
      );
   }

   return (
      <div className={cn('flex items-center gap-0.5', className)}>
         {hmdNode}
         {leftNode}
         {rightNode}
      </div>
   );
}

function HoverPopover({ label, detailedSrc, open, onOpenAction, onCloseAction, children }: HoverPopoverProps) {
   const delayedOpen = useDebouncedCallback(onOpenAction, 300);
   const delayedClose = useDebouncedCallback(onCloseAction, 150);

   function handleEnter() {
      delayedClose.cancel();
      delayedOpen.run();
   }

   function handleLeave() {
      delayedOpen.cancel();
      delayedClose.run();
   }

   return (
      <Popover open={open} onOpenChange={(v) => (v ? onOpenAction() : onCloseAction())}>
         <PopoverTrigger asChild>
            <div className="flex cursor-help items-center justify-center" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
               {children}
            </div>
         </PopoverTrigger>
         <PopoverContent
            side="top"
            className="w-48 p-2.5"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            onOpenAutoFocus={(e) => e.preventDefault()}
         >
            <div className="flex flex-col items-center gap-2">
               <Image
                  src={detailedSrc}
                  alt={label}
                  width={192}
                  height={192}
                  className="h-auto w-full object-contain opacity-80 invert dark:invert-0"
                  style={{ imageRendering: 'auto', filter: 'drop-shadow(0 0 0.4px currentColor) drop-shadow(0 0 0.3px currentColor)' }}
                  draggable={false}
               />
               <span className="text-muted-foreground text-xs">{label}</span>
            </div>
         </PopoverContent>
      </Popover>
   );
}

interface DeviceHoverProps {
   label: string;
   imagePath: string;
   open: boolean;
   onOpenAction: () => void;
   onCloseAction: () => void;
   children: ReactNode;
}

function DeviceHover({ label, imagePath, open, onOpenAction, onCloseAction, children }: DeviceHoverProps) {
   const detailed = getDetailedImage(imagePath);

   if (detailed) {
      return (
         <HoverPopover label={label} detailedSrc={detailed} open={open} onOpenAction={onOpenAction} onCloseAction={onCloseAction}>
            {children}
         </HoverPopover>
      );
   }

   return (
      <Tooltip>
         <TooltipTrigger asChild>
            <div className="flex cursor-help items-center justify-center">{children}</div>
         </TooltipTrigger>
         <TooltipContent side="top">{label}</TooltipContent>
      </Tooltip>
   );
}
