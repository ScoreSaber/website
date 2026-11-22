import { getRouteApi } from '@tanstack/react-router';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { useTranslations } from 'use-intl';

import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { Icons } from '@/shared/components/icons';

const questRoute = getRouteApi('/quest');

export function InstallSection() {
   const t = useTranslations('home');
   const cards = [
      {
         key: 'quest',
         icon: <Icons.meta className="size-7" aria-hidden />,
         title: t('install.quest.title'),
         action: t('install.quest.action'),
         primary: true
      },
      {
         key: 'encore',
         icon: <img src="/images/encore.svg" alt="" className="size-8" aria-hidden />,
         title: t('install.encore.title'),
         action: t('install.encore.action'),
         href: 'https://encore.scoresaber.com/',
         primary: true
      },
      {
         key: 'beatmods',
         icon: <img src="/images/beatmods.svg" alt="" className="size-8" aria-hidden />,
         title: t('install.beatmods.title'),
         action: t('install.beatmods.action'),
         href: 'https://beatmods.com/mods/281'
      }
   ];

   return (
      <section id="get-started" className="scroll-mt-24 pb-2">
         <div className="mb-6 flex flex-col items-center gap-2 text-center">
            <h2 className="text-2xl font-bold sm:text-[26px]">{t('install.title')}</h2>
            <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">{t('install.description')}</p>
         </div>
         <div className="grid gap-4 md:grid-cols-3">
            {cards.map((card) => (
               <Card key={card.key} variant="settings" className="h-full gap-3 overflow-hidden py-4">
                  <CardHeader className="items-center justify-items-center gap-2 px-5 text-center">
                     <div className="flex size-13 items-center justify-center">{card.icon}</div>
                     <div className="flex flex-col gap-1">
                        <CardTitle className="text-base">{card.title}</CardTitle>
                     </div>
                  </CardHeader>
                  <CardFooter className="px-5">
                     <Button asChild className="w-full cursor-pointer" variant={card.primary ? 'default' : 'secondary'}>
                        {card.href ? (
                           <a href={card.href} target="_blank" rel="noreferrer">
                              {card.action}
                              <ExternalLink data-icon />
                           </a>
                        ) : (
                           <questRoute.Link search={{ step: 1 }}>
                              {card.action}
                              <ArrowRight data-icon />
                           </questRoute.Link>
                        )}
                     </Button>
                  </CardFooter>
               </Card>
            ))}
         </div>
      </section>
   );
}
