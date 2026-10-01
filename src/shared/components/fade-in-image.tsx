'use client';

import { type ComponentProps, type CSSProperties, memo, useEffect, useRef, useState } from 'react';

import { Skeleton } from '@/components/ui/skeleton';

import { cn } from '@/shared/format/helpers';

// next/image carries a lot of per-instance overhead (two contexts, multiple
// hooks, getImgProps + an inner ImageElement wrapper, plus image.decode on
// load). with `images.unoptimized: true` set globally there's no benefit, so
// we render a plain <img> here. callers can still pass `fill`/`sizes` for api
// compatibility -- sizes is ignored, fill maps to absolute positioning.
type FadeInImageProps = Omit<ComponentProps<'img'>, 'ref'> & {
   alt: string;
   fill?: boolean;
   sizes?: string;
   unoptimized?: boolean;
   priority?: boolean;
};

const FILL_STYLE: CSSProperties = { position: 'absolute', inset: 0, width: '100%', height: '100%' };

function FadeInImageImpl({
   className,
   onLoad,
   fill,
   sizes: _sizes,
   unoptimized: _unoptimized,
   priority,
   style,
   alt,
   loading,
   fetchPriority,
   ...props
}: FadeInImageProps) {
   const [isLoaded, setIsLoaded] = useState(() => priority === true);
   const imgRef = useRef<HTMLImageElement>(null);

   // pull rounded-* classes so the skeleton matches
   const roundedClasses =
      !isLoaded && className
         ? className
              .split(/\s+/)
              .filter((c) => /^(?:[\w-]+:)*rounded/.test(c))
              .join(' ')
         : '';

   // check if image is already cached after hydration
   useEffect(() => {
      const img = imgRef.current;
      if (img?.complete && img.naturalWidth > 0) {
         setIsLoaded(true);
      }
   }, []);

   const mergedStyle: CSSProperties = fill ? { ...FILL_STYLE, color: 'transparent', ...style } : { color: 'transparent', ...style };

   return (
      <div className={cn('relative isolate', fill ? 'absolute inset-0' : 'inline-flex')}>
         {!isLoaded && <Skeleton className={cn('absolute inset-0 -z-10', roundedClasses)} />}
         <img
            {...props}
            alt={alt}
            ref={imgRef}
            loading={priority ? 'eager' : (loading ?? 'lazy')}
            fetchPriority={priority ? 'high' : fetchPriority}
            style={mergedStyle}
            className={cn(
               'motion-safe:transition-opacity motion-safe:duration-300 motion-safe:ease-out',
               isLoaded ? 'opacity-100' : 'opacity-0',
               className
            )}
            onLoad={(e) => {
               setIsLoaded(true);
               onLoad?.(e);
            }}
         />
      </div>
   );
}

export const FadeInImage = memo(FadeInImageImpl);
