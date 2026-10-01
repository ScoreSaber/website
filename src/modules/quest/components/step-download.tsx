'use client';

import { useMutation } from '@tanstack/react-query';
import { getRouteApi, linkOptions, useRouter } from '@tanstack/react-router';
import { AlertTriangle, Download, ExternalLink, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslations } from 'use-intl';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Toggle } from '@/components/ui/toggle';

import { useAuth } from '@/modules/auth';
import type { QuestRelease } from '@/modules/quest/lib/releases';
import { api } from '@/shared/api/ApiInstance';
import { Time } from '@/shared/components/time';
import { cn } from '@/shared/format/helpers';
import { ApiRequestError, queryApiData } from '@/shared/result/api';
import { getRouteHref } from '@/shared/url-state/route-location';

const DOWNLOAD_FILENAME = 'ScoreSaber_DO_NOT_SHARE.qmod';
const QUEST_KEY_FILENAME = 'scoresaber_DO_NOT_SHARE.scary';
const privacyRoute = getRouteApi('/legal/privacy');

type Props = {
   releases: QuestRelease[];
   hasPrereleases: boolean;
   showPrereleases: boolean;
   onTogglePrereleases: (next: boolean) => void;
};

export function StepDownload({ releases, hasPrereleases, showPrereleases, onTogglePrereleases }: Props) {
   const t = useTranslations();
   const { user } = useAuth();
   const router = useRouter();

   const downloadMutation = useMutation({
      mutationFn: async (tag: string) => {
         if (!user) throw new Error(t('quest.step.3.downloadAuthError'));

         const [{ questKey }, qmodResponse, { default: JSZip }] = await Promise.all([
            queryApiData(api.user.userControllerGetQuestKey()),
            fetch(getRouteHref(router, linkOptions({ to: '/quest/download', search: { tag } }))),
            import('jszip')
         ]);
         if (!qmodResponse.ok) {
            throw new Error(t('quest.step.3.downloadGenericError'));
         }
         const buffer = await qmodResponse.arrayBuffer();
         const zip = await JSZip.loadAsync(buffer);
         zip.file(QUEST_KEY_FILENAME, `${questKey}:${user.id}`);
         return zip.generateAsync({ type: 'blob', mimeType: 'application/qmod' });
      },
      onSuccess: (blob) => {
         const url = URL.createObjectURL(blob);
         const link = document.createElement('a');
         link.href = url;
         link.download = DOWNLOAD_FILENAME;
         document.body.appendChild(link);
         link.click();
         link.remove();
         URL.revokeObjectURL(url);
         toast.success(t('quest.step.3.downloadStarted'));
      },
      onError: (err) => {
         const message = err instanceof ApiRequestError && err.status === 401 ? t('quest.step.3.downloadAuthError') : err.message;
         toast.error(message);
      }
   });

   const latestStableTag = releases.find((r) => !r.prerelease)?.tag;
   const pendingTag = downloadMutation.isPending ? downloadMutation.variables : undefined;

   if (!user) {
      return (
         <Alert variant="warning">
            <AlertTitle>{t('quest.step.3.signInRequiredTitle')}</AlertTitle>
            <AlertDescription>{t('quest.step.3.signInRequiredDescription')}</AlertDescription>
         </Alert>
      );
   }

   return (
      <div className="flex flex-col gap-4">
         <Alert variant="destructive">
            <AlertTriangle aria-hidden />
            <AlertTitle>{t('quest.step.3.warningTitle')}</AlertTitle>
            <AlertDescription>{t('quest.step.3.warningDescription')}</AlertDescription>
         </Alert>

         <p className="text-sm">
            {t.rich('quest.step.3.privacyNotice', {
               link: (chunks) => (
                  <privacyRoute.Link target="_blank" rel="noreferrer noopener" className="text-primary hover:underline">
                     {chunks}
                  </privacyRoute.Link>
               )
            })}
         </p>

         {hasPrereleases ? (
            <div className="flex items-center justify-end">
               <Toggle
                  size="sm"
                  pressed={showPrereleases}
                  onPressedChange={onTogglePrereleases}
                  variant="outline"
                  className="text-xs"
                  aria-label={t('quest.step.3.togglePrereleasesAria')}
               >
                  {t('quest.step.3.togglePrereleases')}
               </Toggle>
            </div>
         ) : null}

         {releases.length === 0 ? (
            <Alert>
               <AlertTitle>{t('quest.step.3.emptyTitle')}</AlertTitle>
               <AlertDescription>{t('quest.step.3.emptyDescription')}</AlertDescription>
            </Alert>
         ) : (
            <div className="max-h-56 overflow-y-auto rounded-lg border [scrollbar-gutter:stable]">
               <Table>
                  <TableHeader className="bg-muted/40 sticky top-0 z-10 backdrop-blur">
                     <TableRow className="hover:bg-transparent">
                        <TableHead>{t('common.scoreSaber')}</TableHead>
                        <TableHead>{t('quest.step.3.column.bsVersion')}</TableHead>
                        <TableHead className="hidden sm:table-cell">{t('quest.step.3.column.published')}</TableHead>
                        <TableHead className="text-right" />
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {releases.map((release) => {
                        const isLatest = release.tag === latestStableTag;
                        const isPending = pendingTag === release.tag;
                        return (
                           <TableRow key={release.tag}>
                              <TableCell>
                                 <div className="flex items-center gap-2">
                                    <a
                                       href={release.htmlUrl}
                                       target="_blank"
                                       rel="noreferrer noopener"
                                       className="hover:text-primary inline-flex items-center gap-1 font-medium transition-colors"
                                    >
                                       {release.modVersion}
                                       <ExternalLink className="size-3 opacity-50" aria-hidden />
                                    </a>
                                    {isLatest ? (
                                       <Badge variant="default" className="text-[10px] tracking-wide uppercase">
                                          {t('quest.step.3.badge.latest')}
                                       </Badge>
                                    ) : null}
                                    {release.prerelease ? (
                                       <Badge variant="outline" className="text-[10px] tracking-wide uppercase">
                                          {t('quest.step.3.badge.prerelease')}
                                       </Badge>
                                    ) : null}
                                 </div>
                              </TableCell>
                              <TableCell className="font-mono text-xs">{release.bsGameVersion}</TableCell>
                              <TableCell className="text-muted-foreground hidden text-xs sm:table-cell">
                                 {release.publishedAt ? <Time date={release.publishedAt} short /> : null}
                              </TableCell>
                              <TableCell className="text-right">
                                 <Button
                                    size="sm"
                                    variant={isLatest ? 'default' : 'outline'}
                                    onClick={() => downloadMutation.mutate(release.tag)}
                                    disabled={downloadMutation.isPending}
                                    className={cn('cursor-pointer', isPending && 'opacity-80')}
                                 >
                                    {isPending ? <Loader2 className="size-3.5 animate-spin" /> : <Download className="size-3.5" />}
                                    {isPending ? t('quest.step.3.downloadingButton') : t('quest.step.3.downloadButton')}
                                 </Button>
                              </TableCell>
                           </TableRow>
                        );
                     })}
                  </TableBody>
               </Table>
            </div>
         )}

         <p className="text-muted-foreground text-sm">{t('quest.step.3.nextHint')}</p>
      </div>
   );
}
