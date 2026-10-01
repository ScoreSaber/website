'use client';

import { useEffect, useId, useState } from 'react';

import { useTranslations } from 'use-intl';

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { reportPlayer, type PlayerReportReason } from '@/modules/player/actions/user/member';
import type { OperationAction } from '@/modules/player/operations/operation-action';
import { ConfirmDialog } from '@/shared/components/confirm-dialog';

type ReportReasonLabelKey = 'inappropriateProfile' | 'impersonation' | 'harassment' | 'cheating' | 'other';
type ReportReason = { value: PlayerReportReason; labelKey: ReportReasonLabelKey };

const reportReasons: ReportReason[] = [
   { value: 'INAPPROPRIATE_PROFILE', labelKey: 'inappropriateProfile' },
   { value: 'IMPERSONATION', labelKey: 'impersonation' },
   { value: 'HARASSMENT', labelKey: 'harassment' },
   { value: 'CHEATING', labelKey: 'cheating' },
   { value: 'OTHER', labelKey: 'other' }
];

interface PlayerReportDialogProps {
   open: boolean;
   playerId: string;
   action: OperationAction;
   onOpenChangeAction: (open: boolean) => void;
}

export function PlayerReportDialog({ open, playerId, action, onOpenChangeAction }: PlayerReportDialogProps) {
   const t = useTranslations();
   const reasonId = useId();
   const detailsId = useId();
   const [reason, setReason] = useState<PlayerReportReason>('INAPPROPRIATE_PROFILE');
   const [details, setDetails] = useState('');
   const pending = action.isPending;

   useEffect(() => {
      if (!open) return;

      setReason('INAPPROPRIATE_PROFILE');
      setDetails('');
   }, [open]);

   function handleReport() {
      action.run(
         () => reportPlayer(playerId, reason, details.trim() || undefined),
         t('player.reportSubmitted'),
         t('player.failedToReport'),
         () => onOpenChangeAction(false)
      );
   }

   return (
      <ConfirmDialog
         open={open}
         onOpenChangeAction={onOpenChangeAction}
         title={t('player.reportProfile')}
         description={t('player.reportProfileDesc')}
         confirmLabel={t('player.submitReport')}
         pending={pending}
         variant="destructive"
         onConfirmAction={handleReport}
      >
         <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
               <Label htmlFor={reasonId}>{t('player.reportReason')}</Label>
               <Select
                  value={reason}
                  onValueChange={(value) => {
                     const nextReason = reportReasons.find((option) => option.value === value)?.value;
                     if (nextReason) setReason(nextReason);
                  }}
                  disabled={pending}
               >
                  <SelectTrigger id={reasonId}>
                     <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                     {reportReasons.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                           {t(`player.reportReasons.${option.labelKey}`)}
                        </SelectItem>
                     ))}
                  </SelectContent>
               </Select>
            </div>
            <div className="flex flex-col gap-1.5">
               <Label htmlFor={detailsId}>{t('player.reportDetails')}</Label>
               <Textarea
                  id={detailsId}
                  value={details}
                  onChange={(event) => setDetails(event.target.value)}
                  placeholder={t('player.reportDetailsPlaceholder')}
                  maxLength={1000}
                  rows={4}
                  size="sm"
                  resize="none"
                  disabled={pending}
               />
            </div>
         </div>
      </ConfirmDialog>
   );
}
