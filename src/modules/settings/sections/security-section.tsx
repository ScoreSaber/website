'use client';

import type { SubmitEvent } from 'react';
import { useEffect, useRef, useState } from 'react';

import { startRegistration } from '@simplewebauthn/browser';
import { getRouteApi, useRouter } from '@tanstack/react-router';
import { Result } from 'better-result';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { ChevronRight, Fingerprint, Gamepad2, KeyRound, Loader2, Mail, Pencil, Plus, Save, ShieldCheck, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslations } from 'use-intl';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';

import { useActionMutation } from '@/hooks/use-action-mutation';
import { useEmailChallenge } from '@/hooks/use-email-challenge';
import { useAuth } from '@/modules/auth';
import { changePassword, completePasswordSetup, startPasswordSetup, type PasswordCredentialSummary } from '@/modules/auth/actions/credentials';
import { deletePasskey, getPasskeyRegistrationOptions, renamePasskey, verifyPasskeyRegistration } from '@/modules/auth/actions/passkey';
import { DeviceCodePanel } from '@/modules/auth/device-code-panel';
import type { PasskeyControllerListPasskeysResponse } from '@/shared/api/generated/ApiParams';
import { ConfirmDialog } from '@/shared/components/confirm-dialog';
import { Time } from '@/shared/components/time';
import { cn } from '@/shared/format/helpers';
import { unwrapAction } from '@/shared/result/action';

type PasskeySummary = PasskeyControllerListPasskeysResponse['passkeys'][number];

interface SecuritySectionProps {
   passkeys: PasskeySummary[] | null;
   credential: PasswordCredentialSummary | null;
   openPasswordSetup?: boolean;
}

const iconClass = 'border-border/60 bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-full border';
const loginRoute = getRouteApi('/login');
const settingsAccountRoute = getRouteApi('/settings/account');

export function SecuritySection({ passkeys, credential, openPasswordSetup }: SecuritySectionProps) {
   const t = useTranslations();
   const { user } = useAuth();

   if (!user) {
      return null;
   }

   return (
      <Card variant="settings" className="gap-4 py-5">
         <CardHeader className="px-5">
            <CardTitle className="text-base">{t('settings.security.title')}</CardTitle>
         </CardHeader>
         <CardContent className="flex flex-col px-5">
            {credential?.hasPassword ? <ChangePasswordRow /> : <SetPasswordLoginRow autoOpen={openPasswordSetup} />}
            <PasskeysRow passkeys={passkeys ?? []} />
            <DeviceLoginRow />
         </CardContent>
      </Card>
   );
}

function SetPasswordLoginRow({ autoOpen }: { autoOpen?: boolean }) {
   const t = useTranslations();
   const router = useRouter();
   const rowRef = useRef<HTMLDivElement>(null);
   const didAutoOpen = useRef(false);
   const [open, setOpen] = useState(false);
   const [password, setPassword] = useState('');

   const { email, setEmail, code, setCode, challenge, clearChallenge, resendSeconds, expirySeconds, startMutation, verifyMutation } =
      useEmailChallenge<{ challengeId: string; expiresAt: string; resendAvailableAt: string }, void>({
         start: async (email) => unwrapAction(await startPasswordSetup(email)),
         verify: async (challengeId, code, email) => unwrapAction(await completePasswordSetup({ email, challengeId, code, password })),
         missingChallengeMessage: t('login.email.missingChallenge'),
         onStarted: () => toast.success(t('login.email.sentToast')),
         onStartError: (error) => toast.error(t('login.email.sendFailedToast'), { description: error.message }),
         onVerified: () => {
            toast.success(t('settings.security.passwordSetupSaved'));
            setPassword('');
            clearChallenge();
            setOpen(false);
            void router.invalidate();
         },
         onVerifyError: (error) => toast.error(t('settings.security.passwordSetupFailed'), { description: error.message })
      });

   const pending = startMutation.isPending || verifyMutation.isPending;
   const completeDisabled = code.length !== 6 || password.length < 10 || pending;

   useEffect(() => {
      if (!autoOpen || didAutoOpen.current) {
         return;
      }

      didAutoOpen.current = true;
      setOpen(true);
      requestAnimationFrame(() => rowRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
   }, [autoOpen]);

   function submitEmail(event: SubmitEvent<HTMLFormElement>) {
      event.preventDefault();
      startMutation.mutate();
   }

   function submitSetup(event: SubmitEvent<HTMLFormElement>) {
      event.preventDefault();
      verifyMutation.mutate();
   }

   return (
      <Collapsible ref={rowRef} open={open} onOpenChange={setOpen} className="border-border/70 border-b pb-2">
         <CollapsibleTrigger asChild>
            <button
               type="button"
               className="hover:bg-accent/30 -mx-3 flex w-[calc(100%+1.5rem)] items-center justify-between gap-4 rounded-md px-3 py-3 text-left transition-colors"
            >
               <div className="flex min-w-0 gap-4">
                  <span className={iconClass}>
                     <KeyRound className="size-5" aria-hidden />
                  </span>
                  <div className="flex min-h-10 min-w-0 flex-col justify-center">
                     <h3 className="leading-5 font-semibold">{t('settings.security.setPassword')}</h3>
                     <p className="text-muted-foreground text-sm">{t('settings.security.setPasswordHelper')}</p>
                  </div>
               </div>
               <ChevronRight className={cn('text-muted-foreground size-4 shrink-0 transition-transform', open && 'rotate-90')} aria-hidden />
            </button>
         </CollapsibleTrigger>
         <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden">
            <div className="flex max-w-xl flex-col gap-3 px-1 pt-2 pb-3">
               <form className="flex flex-col gap-2" onSubmit={submitEmail}>
                  <Label htmlFor="security-setup-email">{t('login.email.emailLabel')}</Label>
                  <div className="flex gap-2">
                     <Input
                        id="security-setup-email"
                        type="email"
                        value={email}
                        autoComplete="email"
                        placeholder={t('login.email.emailPlaceholder')}
                        disabled={pending}
                        onChange={(event) => setEmail(event.target.value)}
                     />
                     <Button type="submit" variant="outline" disabled={!email || pending || resendSeconds > 0} className="cursor-pointer">
                        {startMutation.isPending ? <Loader2 data-icon="inline-start" className="animate-spin" /> : <Mail data-icon="inline-start" />}
                        {challenge
                           ? resendSeconds > 0
                              ? t('login.email.resendIn', { seconds: resendSeconds })
                              : t('login.email.resendCode')
                           : t('login.email.sendCode')}
                     </Button>
                  </div>
               </form>

               {challenge && (
                  <form className="flex flex-col gap-3" onSubmit={submitSetup}>
                     <div className="flex w-full items-center justify-between gap-3">
                        <Label htmlFor="security-setup-code">{t('login.email.codeLabel')}</Label>
                        <span className="text-muted-foreground text-xs tabular-nums">{t('login.email.expiresIn', { seconds: expirySeconds })}</span>
                     </div>
                     <InputOTP
                        id="security-setup-code"
                        maxLength={6}
                        pattern={REGEXP_ONLY_DIGITS}
                        value={code}
                        onChange={setCode}
                        disabled={verifyMutation.isPending}
                        containerClassName="justify-center"
                     >
                        <InputOTPGroup>
                           {Array.from({ length: 6 }).map((_, index) => (
                              <InputOTPSlot key={index} index={index} />
                           ))}
                        </InputOTPGroup>
                     </InputOTP>
                     <div className="flex flex-col gap-2">
                        <Label htmlFor="security-setup-password">{t('settings.security.newPassword')}</Label>
                        <Input
                           id="security-setup-password"
                           type="password"
                           value={password}
                           autoComplete="new-password"
                           minLength={10}
                           maxLength={128}
                           disabled={pending}
                           onChange={(event) => setPassword(event.target.value)}
                        />
                        <p className="text-muted-foreground text-xs">{t('login.password.passwordHelp')}</p>
                     </div>
                     <Button type="submit" disabled={completeDisabled} className="w-fit cursor-pointer">
                        {verifyMutation.isPending ? (
                           <Loader2 data-icon="inline-start" className="animate-spin" />
                        ) : (
                           <ShieldCheck data-icon="inline-start" />
                        )}
                        {t('settings.security.setPasswordSubmit')}
                     </Button>
                  </form>
               )}
            </div>
         </CollapsibleContent>
      </Collapsible>
   );
}

function ChangePasswordRow() {
   const t = useTranslations();
   const mutation = useActionMutation();
   const [open, setOpen] = useState(false);
   const [currentPassword, setCurrentPassword] = useState('');
   const [newPassword, setNewPassword] = useState('');

   const pending = mutation.isPendingKey('password');
   const saveDisabled = pending || !currentPassword || newPassword.length < 10;

   function submit(event: SubmitEvent<HTMLFormElement>) {
      event.preventDefault();
      if (saveDisabled) {
         return;
      }

      mutation.runKeyed(
         'password',
         () => changePassword({ currentPassword, newPassword }),
         t('settings.security.passwordSaved'),
         t('settings.security.passwordSaveFailed'),
         () => {
            setCurrentPassword('');
            setNewPassword('');
            setOpen(false);
         }
      );
   }

   return (
      <Collapsible open={open} onOpenChange={setOpen} className="border-border/70 border-b pb-2">
         <CollapsibleTrigger asChild>
            <button
               type="button"
               className="hover:bg-accent/30 -mx-3 flex w-[calc(100%+1.5rem)] items-center justify-between gap-4 rounded-md px-3 py-3 text-left transition-colors"
            >
               <div className="flex min-w-0 gap-4">
                  <span className={iconClass}>
                     <KeyRound className="size-5" aria-hidden />
                  </span>
                  <div className="flex min-h-10 min-w-0 flex-col justify-center">
                     <h3 className="leading-5 font-semibold">{t('settings.security.changePassword')}</h3>
                     <p className="text-muted-foreground text-sm">{t('settings.security.changePasswordHelper')}</p>
                  </div>
               </div>
               <ChevronRight className={cn('text-muted-foreground size-4 shrink-0 transition-transform', open && 'rotate-90')} aria-hidden />
            </button>
         </CollapsibleTrigger>
         <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden">
            <form className="flex max-w-xl flex-col gap-3 px-1 pt-2 pb-3" onSubmit={submit}>
               <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-3">
                     <Label htmlFor="security-current-password">{t('settings.security.currentPassword')}</Label>
                     <loginRoute.Link
                        search={{ mode: 'password-reset', redirectTo: settingsAccountRoute.id }}
                        className="text-muted-foreground hover:text-foreground text-xs underline-offset-4 hover:underline"
                     >
                        {t('settings.security.forgotPassword')}
                     </loginRoute.Link>
                  </div>
                  <Input
                     id="security-current-password"
                     type="password"
                     value={currentPassword}
                     autoComplete="current-password"
                     disabled={pending}
                     onChange={(event) => setCurrentPassword(event.target.value)}
                  />
               </div>
               <div className="flex flex-col gap-2">
                  <Label htmlFor="security-new-password">{t('settings.security.newPassword')}</Label>
                  <Input
                     id="security-new-password"
                     type="password"
                     value={newPassword}
                     autoComplete="new-password"
                     minLength={10}
                     maxLength={128}
                     disabled={pending}
                     onChange={(event) => setNewPassword(event.target.value)}
                  />
                  <p className="text-muted-foreground text-xs">{t('login.password.passwordHelp')}</p>
               </div>
               <Button type="submit" disabled={saveDisabled} className="w-fit cursor-pointer">
                  {pending ? <Loader2 data-icon="inline-start" className="animate-spin" /> : <Save data-icon="inline-start" />}
                  {t('common.save')}
               </Button>
            </form>
         </CollapsibleContent>
      </Collapsible>
   );
}

function PasskeysRow({ passkeys }: { passkeys: PasskeySummary[] }) {
   const t = useTranslations();
   const router = useRouter();
   const mutation = useActionMutation();
   const [addPending, setAddPending] = useState(false);
   const [renameTarget, setRenameTarget] = useState<PasskeySummary | null>(null);
   const [renameValue, setRenameValue] = useState('');
   const [deleteTarget, setDeleteTarget] = useState<PasskeySummary | null>(null);

   const addPasskey = async () => {
      setAddPending(true);
      const result = await Result.tryPromise(async () => {
         const options = unwrapAction(await getPasskeyRegistrationOptions());
         const response = await startRegistration({ optionsJSON: options });
         unwrapAction(await verifyPasskeyRegistration({ response }));
      });

      if (Result.isOk(result)) {
         toast.success(t('settings.security.passkeyAdded'));
         void router.invalidate();
      } else if (!(result.error instanceof Error) || result.error.name !== 'NotAllowedError') {
         // user dismissing the browser prompt is not an error
         toast.error(t('settings.security.passkeyAddFailed'), { description: result.error instanceof Error ? result.error.message : undefined });
      }

      setAddPending(false);
   };

   const submitRename = () => {
      if (!renameTarget || !renameValue.trim()) {
         return;
      }

      mutation.runKeyed(
         'passkey-rename',
         () => renamePasskey(renameTarget.id, renameValue.trim()),
         t('settings.security.passkeyRenamed'),
         t('settings.security.passkeyRenameFailed'),
         () => setRenameTarget(null)
      );
   };

   const submitDelete = () => {
      if (!deleteTarget) {
         return;
      }

      mutation.runKeyed(
         'passkey-delete',
         () => deletePasskey(deleteTarget.id),
         t('settings.security.passkeyDeleted'),
         t('settings.security.passkeyDeleteFailed'),
         () => setDeleteTarget(null)
      );
   };

   return (
      <>
         <div className="border-border/70 flex flex-col gap-3 border-b py-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
               <div className="flex min-w-0 gap-4">
                  <span className={iconClass}>
                     <Fingerprint className="size-5" aria-hidden />
                  </span>
                  <div className="flex min-h-10 min-w-0 flex-col justify-center">
                     <h3 className="leading-5 font-semibold">{t('settings.security.passkeys')}</h3>
                     <p className="text-muted-foreground text-sm">{t('settings.security.passkeysHelper')}</p>
                  </div>
               </div>
               <Button type="button" variant="outline" disabled={addPending} onClick={() => void addPasskey()} className="w-fit cursor-pointer">
                  {addPending ? <Loader2 data-icon="inline-start" className="animate-spin" /> : <Plus data-icon="inline-start" />}
                  {t('settings.security.addPasskey')}
               </Button>
            </div>

            {passkeys.length > 0 && (
               <ul className="flex flex-col gap-2">
                  {passkeys.map((passkey) => (
                     <li
                        key={passkey.id}
                        className="border-border/60 bg-background/40 flex items-center justify-between gap-3 rounded-md border px-3 py-2"
                     >
                        <div className="flex min-w-0 flex-col">
                           <span className="truncate text-sm font-medium">{passkey.label}</span>
                           <span className="text-muted-foreground text-xs">
                              {passkey.lastUsedAt
                                 ? t.rich('settings.security.passkeyLastUsed', {
                                      date: () => <Time date={passkey.lastUsedAt} dateStyle="medium" />
                                   })
                                 : t.rich('settings.security.passkeyCreated', {
                                      date: () => <Time date={passkey.createdAt} dateStyle="medium" />
                                   })}
                           </span>
                        </div>
                        <div className="flex shrink-0 gap-1">
                           <Button
                              type="button"
                              variant="ghost"
                              size="icon-sm"
                              aria-label={t('settings.security.renamePasskey')}
                              onClick={() => {
                                 setRenameTarget(passkey);
                                 setRenameValue(passkey.label);
                              }}
                              className="cursor-pointer"
                           >
                              <Pencil data-icon />
                           </Button>
                           <Button
                              type="button"
                              variant="ghost"
                              size="icon-sm"
                              aria-label={t('settings.security.deletePasskey')}
                              onClick={() => setDeleteTarget(passkey)}
                              className="text-destructive hover:text-destructive cursor-pointer"
                           >
                              <Trash2 data-icon />
                           </Button>
                        </div>
                     </li>
                  ))}
               </ul>
            )}
         </div>

         <ConfirmDialog
            open={renameTarget !== null}
            onOpenChangeAction={(open) => !open && setRenameTarget(null)}
            title={t('settings.security.renamePasskey')}
            description={t('settings.security.renamePasskeyDesc')}
            confirmLabel={t('common.save')}
            pending={mutation.isPendingKey('passkey-rename')}
            textInput={{
               label: t('settings.security.passkeyLabel'),
               value: renameValue,
               onValueChangeAction: setRenameValue,
               required: true
            }}
            onConfirmAction={submitRename}
         />

         <ConfirmDialog
            open={deleteTarget !== null}
            onOpenChangeAction={(open) => !open && setDeleteTarget(null)}
            title={t('settings.security.deletePasskey')}
            description={t('settings.security.deletePasskeyDesc', { label: deleteTarget?.label ?? '' })}
            confirmLabel={t('settings.security.deletePasskey')}
            pending={mutation.isPendingKey('passkey-delete')}
            variant="destructive"
            onConfirmAction={submitDelete}
         />
      </>
   );
}

function DeviceLoginRow() {
   const t = useTranslations();
   const [dialogOpen, setDialogOpen] = useState(false);

   return (
      <>
         <div className="flex flex-col gap-4 pt-5 md:flex-row md:items-center md:justify-between">
            <div className="flex min-w-0 gap-4">
               <span className={iconClass}>
                  <Gamepad2 className="size-5" aria-hidden />
               </span>
               <div className="flex min-h-10 min-w-0 flex-col justify-center">
                  <h3 className="leading-5 font-semibold">{t('settings.security.deviceLogin')}</h3>
                  <p className="text-muted-foreground text-sm">{t('settings.security.deviceLoginHelper')}</p>
               </div>
            </div>
            <Button type="button" variant="outline" onClick={() => setDialogOpen(true)} className="w-fit cursor-pointer">
               <Gamepad2 data-icon="inline-start" />
               {t('settings.security.deviceLoginAction')}
            </Button>
         </div>

         <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="sm:max-w-md">
               <DialogHeader>
                  <DialogTitle>{t('settings.security.deviceLogin')}</DialogTitle>
                  <DialogDescription>{t('settings.security.deviceLoginInstructions')}</DialogDescription>
               </DialogHeader>

               {dialogOpen ? (
                  <DeviceCodePanel
                     autoStart
                     onStartErrorAction={(error) => {
                        toast.error(t('settings.security.deviceCodeFailed'), {
                           description: error instanceof Error ? error.message : undefined
                        });
                        setDialogOpen(false);
                     }}
                  />
               ) : null}
            </DialogContent>
         </Dialog>
      </>
   );
}
