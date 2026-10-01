'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Result } from 'better-result';
import { CheckCircle2, Loader2, RefreshCw, TriangleAlert } from 'lucide-react';
import { useTranslations } from 'use-intl';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

import { useCountdownSeconds } from '@/hooks/use-countdown-seconds';
import { getDeviceLoginStatus, startDeviceLogin } from '@/modules/auth/actions/device-code';
import { CopyButton } from '@/shared/components/copy-button';
import { cn } from '@/shared/format/helpers';
import { unwrapAction } from '@/shared/result/action';

type DeviceLoginCode = { code: string; expiresAt: string };

export function DeviceCodePanel({
   autoStart,
   className,
   onStartErrorAction
}: {
   autoStart?: boolean;
   className?: string;
   onStartErrorAction?: (error: Error) => void;
}) {
   const t = useTranslations();
   const didAutoStart = useRef(false);
   const [device, setDevice] = useState<DeviceLoginCode | null>(null);
   const [startPending, setStartPending] = useState(false);
   const [startError, setStartError] = useState<string | null>(null);
   const expirySeconds = useCountdownSeconds(device?.expiresAt);

   const statusQuery = useQuery({
      queryKey: ['device-login-status', device?.code],
      queryFn: async () => unwrapAction(await getDeviceLoginStatus()),
      enabled: device !== null && expirySeconds > 0,
      refetchInterval: (query) => (query.state.data?.status === 'claimed' || query.state.data?.status === 'expired' ? false : 2000)
   });

   const claimed = statusQuery.data?.status === 'claimed';
   const expired = !claimed && device !== null && (statusQuery.data?.status === 'expired' || expirySeconds <= 0);

   const requestCode = useCallback(async () => {
      setStartPending(true);
      setStartError(null);

      const result = await Result.tryPromise(async () => unwrapAction(await startDeviceLogin()));

      if (Result.isOk(result)) {
         setDevice(result.value);
      } else {
         const error = result.error instanceof Error ? result.error : new Error(t('settings.security.deviceCodeFailed'));
         setStartError(error.message);
         onStartErrorAction?.(error);
      }

      setStartPending(false);
   }, [onStartErrorAction, t]);

   useEffect(() => {
      if (!autoStart || didAutoStart.current) return;

      didAutoStart.current = true;
      void requestCode();
   }, [autoStart, requestCode]);

   if (startPending || (!device && !startError)) {
      return (
         <div className={cn('flex min-h-40 flex-col items-center justify-center gap-3 py-4 text-center', className)}>
            <Loader2 className="text-muted-foreground size-6 animate-spin" aria-hidden />
            <p className="text-muted-foreground text-sm">{t('quest.pairing.loading')}</p>
         </div>
      );
   }

   if (startError) {
      return (
         <div className={cn('flex flex-col gap-4 py-4', className)}>
            <Alert variant="destructive">
               <TriangleAlert aria-hidden />
               <AlertTitle>{t('settings.security.deviceCodeFailed')}</AlertTitle>
               <AlertDescription>{startError}</AlertDescription>
            </Alert>
            <Button type="button" onClick={() => void requestCode()} className="w-fit cursor-pointer">
               <RefreshCw data-icon="inline-start" />
               {t('common.retry')}
            </Button>
         </div>
      );
   }

   if (claimed) {
      return (
         <div className={cn('py-4', className)}>
            <Alert>
               <CheckCircle2 aria-hidden />
               <AlertTitle>{t('settings.security.deviceLoginClaimed')}</AlertTitle>
               <AlertDescription>{t('quest.pairing.claimedDescription')}</AlertDescription>
            </Alert>
         </div>
      );
   }

   if (expired) {
      return (
         <div className={cn('flex flex-col items-center gap-4 py-4 text-center', className)}>
            <p className="text-muted-foreground text-sm">{t('settings.security.deviceCodeExpired')}</p>
            <Button type="button" onClick={() => void requestCode()} className="cursor-pointer">
               <RefreshCw data-icon="inline-start" />
               {t('settings.security.deviceCodeNew')}
            </Button>
         </div>
      );
   }

   const activeDevice = device;
   if (!activeDevice) return null;

   return (
      <div className={cn('flex flex-col items-center gap-4 py-4 text-center', className)}>
         <div className="border-border/70 bg-muted/20 flex w-full flex-col items-center gap-4 rounded-lg border p-4">
            <span className="sr-only" aria-live="polite">
               {activeDevice.code}
            </span>
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-2" aria-hidden="true">
               {formatDeviceCode(activeDevice.code).map((chunk) => (
                  <span key={chunk} className="font-mono text-4xl leading-none font-bold tracking-[0.12em] sm:text-5xl">
                     {chunk}
                  </span>
               ))}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
               <span className="text-muted-foreground text-xs tabular-nums">
                  {t('settings.security.deviceCodeExpiresIn', { seconds: expirySeconds })}
               </span>
               <CopyButton value={activeDevice.code} copiedDurationMs={1600}>
                  {({ buttonProps, icon, copied }) => (
                     <Button {...buttonProps} variant="outline" size="sm" className="cursor-pointer">
                        {icon}
                        {copied ? t('quest.pairing.copied') : t('common.copy')}
                     </Button>
                  )}
               </CopyButton>
            </div>
         </div>
         <p className="text-muted-foreground max-w-sm text-sm text-pretty">{t('settings.security.deviceLoginInstructions')}</p>
      </div>
   );
}

function formatDeviceCode(code: string) {
   return code.match(/.{1,4}/g) ?? [code];
}
