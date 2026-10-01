'use client';

import type { ErrorComponentProps } from '@tanstack/react-router';
import { getRouteApi, useRouter } from '@tanstack/react-router';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { z } from 'zod';

import messages from '../../../../messages/en.json';

import { Button } from '@/components/ui/button';

import { ErrorCard } from '@/shared/components/error/error-card';

const errorMessages = messages.error;
const commonMessages = messages.common;
const homeRoute = getRouteApi('/');
const errorDigestSchema = z.object({ digest: z.string() });

export function RouteError({ error, reset }: ErrorComponentProps) {
   const router = useRouter();
   const parsedError = errorDigestSchema.safeParse(error);
   const digest = parsedError.success ? parsedError.data.digest : null;

   function handleRetry() {
      reset();
      void router.invalidate();
   }

   return (
      <ErrorCard
         icon={AlertCircle}
         title={errorMessages.somethingWentWrong}
         description={errorMessages.unexpectedError}
         meta={digest && <span className="text-muted-foreground/50 font-mono text-xs">{errorMessages.errorId.replace('{digest}', digest)}</span>}
         actions={
            <>
               <Button asChild size="sm" variant="secondary" className="cursor-pointer">
                  <homeRoute.Link>{commonMessages.goHome}</homeRoute.Link>
               </Button>
               <Button size="sm" variant="default" onClick={handleRetry} className="cursor-pointer">
                  <RefreshCw data-icon="inline-start" className="size-3" />
                  {commonMessages.retry}
               </Button>
            </>
         }
      />
   );
}
