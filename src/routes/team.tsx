import type { ComponentType, CSSProperties } from 'react';

import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { Result } from 'better-result';
import { AlertCircle } from 'lucide-react';
import { FaTwitch } from 'react-icons/fa';
import { useTranslations } from 'use-intl';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Icons } from '@/shared/components/icons';
import { Image } from '@/shared/components/image';
import { cn } from '@/shared/format/helpers';
import { BLURRED_BG_IMAGE_CLASSES, CARD_GRADIENT_CLASSES } from '@/shared/format/styling';
import { buildSeoHead } from '@/shared/seo/metadata';
import { SetPageBackground } from '@/shell/background/page-background-provider';

type TeamKey = 'Backend' | 'Admin' | 'NAT' | 'RT' | 'QAT' | 'CAT' | 'CCT' | 'Frontend' | 'Mod' | 'PPv3';
type TeamTone = 'owner' | 'admin' | 'nat' | 'rt' | 'qat' | 'cat' | 'cct' | 'dev' | 'ppv3' | 'mod';
type SocialKey = 'discord' | 'twitter' | 'twitch' | 'youtube' | 'github';
type TeamMember = {
   Name: string;
   ProfilePicture: string;
   Discord?: string | null;
   GitHub?: string | null;
   Twitch?: string | null;
   Twitter?: string | null;
   YouTube?: string | null;
};
type TeamData = {
   TeamMembers: Record<TeamKey, TeamMember[]>;
};
type TeamPageData = { ok: true; team: TeamData } | { ok: false };
type SocialMetadata = {
   [Social in SocialKey]: {
      Icon: ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' }>;
      href: (value: string) => string;
   };
};

const TEAM_IMAGE_BASE_URL = 'https://raw.githubusercontent.com/ScoreSaber/scoresaber-team/main/images';

const teamSections: {
   key: TeamKey;
   tone: TeamTone;
   removeUmbra?: boolean;
}[] = [
   { key: 'Backend', tone: 'owner' },
   { key: 'Admin', tone: 'admin', removeUmbra: true },
   { key: 'NAT', tone: 'nat' },
   { key: 'RT', tone: 'rt' },
   { key: 'QAT', tone: 'qat' },
   { key: 'CAT', tone: 'cat' },
   { key: 'CCT', tone: 'cct', removeUmbra: true },
   { key: 'Frontend', tone: 'dev' },
   { key: 'Mod', tone: 'mod' },
   { key: 'PPv3', tone: 'ppv3', removeUmbra: true }
];

const toneColor = {
   owner: 'var(--role-owner)',
   admin: 'var(--role-admin)',
   nat: 'var(--role-nat)',
   rt: 'var(--role-rt)',
   qat: 'var(--role-qat)',
   cat: 'var(--role-cat)',
   cct: 'var(--role-cct)',
   dev: 'var(--role-dev)',
   ppv3: 'var(--role-ppv3)',
   mod: 'var(--primary)'
};

const textToneColor = new Map<TeamTone, string>([['dev', 'var(--foreground)']]);

const memberToneOverrides = new Map<string, TeamTone | 'rainbow'>([
   ['umbranox', 'owner'],
   ['qwasyx', 'rainbow'],
   ['williums', 'rainbow']
]);

const socialMeta: SocialMetadata = {
   discord: { Icon: Icons.discord, href: (value) => `https://discordapp.com/users/${value}` },
   twitter: { Icon: Icons.twitter, href: (value) => `https://twitter.com/${value}` },
   twitch: { Icon: FaTwitch, href: (value) => `https://twitch.tv/${value}` },
   youtube: { Icon: Icons.youtube, href: (value) => `https://youtube.com/channel/${value}` },
   github: { Icon: Icons.github, href: (value) => `https://github.com/${value}` }
};

const getTeamPageData = createServerFn({ method: 'GET' }).handler(async (): Promise<TeamPageData> => {
   const { fetchTeam } = await import('@/modules/team/lib/team');
   const result = await fetchTeam();
   return Result.isOk(result) ? { ok: true, team: result.value } : { ok: false };
});

export const Route = createFileRoute('/team')({
   loader: () => getTeamPageData(),
   head: () =>
      buildSeoHead({
         title: 'Team',
         description: 'Meet the ScoreSaber team',
         path: '/team'
      }),
   component: TeamRoute
});

function TeamRoute() {
   const data = Route.useLoaderData();
   const t = useTranslations('team');

   if (!data.ok) {
      return (
         <div className="relative flex-1 overflow-hidden">
            <SetPageBackground src="/images/banner.jpg" />
            <main className="app-container relative z-10 p-4 md:p-8">
               <Alert variant="destructive" className="max-w-2xl">
                  <AlertCircle aria-hidden />
                  <AlertTitle>{t('errorTitle')}</AlertTitle>
                  <AlertDescription>{t('errorDescription')}</AlertDescription>
               </Alert>
            </main>
         </div>
      );
   }

   const team = data.team;
   const imageCandidates = Array.from(
      new Set(Object.values(team.TeamMembers).flatMap((members) => members.map((member) => getTeamImageUrl(member.ProfilePicture))))
   );

   return (
      <div className="relative flex-1 overflow-hidden">
         {imageCandidates.length > 0 && <SetPageBackground src={imageCandidates[0]} candidates={imageCandidates} />}

         <main className="app-container relative z-10 flex flex-col gap-6 p-4 md:p-8">
            <div className="flex flex-col gap-5">
               {teamSections.map((section) => {
                  const members = team.TeamMembers[section.key].filter((member) => !(section.removeUmbra && member.Name === 'Umbranox'));
                  if (members.length === 0) return null;

                  return (
                     <TeamSection
                        key={section.key}
                        title={getTeamSectionTitle(t, section.key)}
                        tone={section.tone}
                        members={members}
                        socialLabels={{
                           discord: t('social.discord'),
                           twitter: t('social.twitter'),
                           twitch: t('social.twitch'),
                           youtube: t('social.youtube'),
                           github: t('social.github')
                        }}
                     />
                  );
               })}
            </div>
         </main>
      </div>
   );
}

function TeamSection({
   title,
   tone,
   members,
   socialLabels
}: {
   title: string;
   tone: TeamTone;
   members: TeamMember[];
   socialLabels: Record<SocialKey, string>;
}) {
   return (
      <section className="flex flex-col gap-3">
         <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
            <div className="from-border h-px flex-1 bg-linear-to-r to-transparent" />
         </div>
         <div className="3xl:grid-cols-4 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {members.map((member) => (
               <TeamMemberCard key={`${title}-${member.Name}`} member={member} tone={tone} socialLabels={socialLabels} />
            ))}
         </div>
      </section>
   );
}

function TeamMemberCard({ member, tone, socialLabels }: { member: TeamMember; tone: TeamTone; socialLabels: Record<SocialKey, string> }) {
   const override = memberToneOverrides.get(member.Name.toLowerCase());
   const isRainbow = override === 'rainbow';
   const color = override && override !== 'rainbow' ? toneColor[override] : toneColor[tone];
   const textColor = override && override !== 'rainbow' ? toneColor[override] : (textToneColor.get(tone) ?? toneColor[tone]);
   const socials: { key: SocialKey; href: string }[] = [];
   if (member.Discord) socials.push({ key: 'discord', href: socialMeta.discord.href(member.Discord) });
   if (member.Twitter) socials.push({ key: 'twitter', href: socialMeta.twitter.href(member.Twitter) });
   if (member.Twitch) socials.push({ key: 'twitch', href: socialMeta.twitch.href(member.Twitch) });
   if (member.YouTube) socials.push({ key: 'youtube', href: socialMeta.youtube.href(member.YouTube) });
   if (member.GitHub) socials.push({ key: 'github', href: socialMeta.github.href(member.GitHub) });
   const profilePictureUrl = getTeamImageUrl(member.ProfilePicture);
   const style: CSSProperties & { '--team-color': string; '--team-text-color': string } = { '--team-color': color, '--team-text-color': textColor };

   return (
      <Card
         className={cn(
            CARD_GRADIENT_CLASSES,
            'group isolate gap-0 rounded-lg py-0 shadow-sm backdrop-blur transition-[border-color,box-shadow] duration-300 hover:shadow-lg',
            isRainbow ? 'team-rainbow-card team-rainbow-border border-transparent' : 'hover:border-[var(--team-color)]'
         )}
         style={style}
      >
         <div className="absolute inset-0 opacity-0 dark:opacity-30">
            <Image
               src={profilePictureUrl}
               alt=""
               fill
               sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
               className={BLURRED_BG_IMAGE_CLASSES}
               unoptimized
            />
         </div>
         <div className="from-background/80 via-background/55 to-background/80 absolute inset-0 hidden bg-linear-to-r dark:block" />

         <CardHeader className="relative z-20 grid-cols-[auto_1fr] items-center gap-x-3 gap-y-1 p-3">
            <div
               className={cn(
                  'relative row-span-2 size-13 overflow-hidden rounded-full border-2 border-border bg-muted transition-colors duration-300 group-hover:border-[var(--team-color)]',
                  isRainbow && 'overflow-visible rounded-none border-0 bg-transparent'
               )}
            >
               <Image
                  src={profilePictureUrl}
                  alt={member.Name}
                  fill
                  sizes="52px"
                  className={isRainbow ? 'object-contain' : 'object-cover'}
                  style={isRainbow ? { objectFit: 'contain' } : undefined}
                  unoptimized
               />
            </div>
            <CardTitle
               className={cn(
                  'min-w-0 truncate text-base font-semibold transition-colors duration-300',
                  isRainbow ? 'team-rainbow-text w-fit max-w-full' : 'text-[var(--team-text-color)]'
               )}
            >
               {member.Name}
            </CardTitle>
            {socials.length > 0 ? (
               <CardContent className="flex min-w-0 flex-wrap gap-1 p-0">
                  {socials.map((social) => {
                     const Icon = socialMeta[social.key].Icon;
                     const label = socialLabels[social.key];
                     return (
                        <a
                           key={social.key}
                           href={social.href}
                           target="_blank"
                           rel="external"
                           title={label}
                           aria-label={`${member.Name} ${label}`}
                           className={cn(
                              'text-muted-foreground hover:text-[var(--team-color)] inline-flex size-6 items-center justify-center rounded-md transition-[color,background-color,opacity] duration-300 hover:bg-accent',
                              isRainbow && 'hover:text-foreground'
                           )}
                        >
                           <Icon className={cn('size-3.5 fill-current', isRainbow && 'team-rainbow-fill')} aria-hidden />
                        </a>
                     );
                  })}
               </CardContent>
            ) : null}
         </CardHeader>
      </Card>
   );
}

function getTeamSectionTitle(t: ReturnType<typeof useTranslations<'team'>>, key: TeamKey) {
   switch (key) {
      case 'Backend':
         return t('sections.backend');
      case 'Admin':
         return t('sections.admin');
      case 'NAT':
         return t('sections.nat');
      case 'RT':
         return t('sections.rt');
      case 'QAT':
         return t('sections.qat');
      case 'CAT':
         return t('sections.cat');
      case 'CCT':
         return t('sections.cct');
      case 'Frontend':
         return t('sections.frontend');
      case 'Mod':
         return t('sections.mod');
      case 'PPv3':
         return t('sections.ppv3');
   }
}

function getTeamImageUrl(profilePicture: string) {
   return `${TEAM_IMAGE_BASE_URL}/${profilePicture}`;
}
