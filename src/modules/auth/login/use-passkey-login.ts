'use client';

import { startAuthentication } from '@simplewebauthn/browser';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { toast } from 'sonner';
import { useTranslations } from 'use-intl';

import { getPasskeyLoginOptions, verifyPasskeyLogin } from '@/modules/auth/actions/passkey';
import { unwrapAction } from '@/shared/result/action';

export function usePasskeyLogin(redirectTo: string) {
   const t = useTranslations();
   const router = useRouter();

   return useMutation({
      mutationFn: async () => {
         const { sessionId, options } = unwrapAction(await getPasskeyLoginOptions());
         const response = await startAuthentication({ optionsJSON: options });
         return unwrapAction(await verifyPasskeyLogin({ sessionId, response }));
      },
      onSuccess: async (value) => {
         if (value.status === 'authenticated') {
            await router.invalidate();
            await router.navigate({ href: redirectTo, replace: true });
            return;
         }

         toast.warning(t('login.email.supportTitle'), { description: t('login.email.supportDescription') });
      },
      onError: (error) => {
         // user closing the browser prompt is not a failure worth toasting
         if (error.name === 'NotAllowedError') {
            return;
         }

         toast.error(t('login.passkey.failedToast'), { description: error.message });
      }
   });
}
