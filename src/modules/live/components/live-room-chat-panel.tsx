'use client';

import { type FormEvent, useEffect, useRef, useState } from 'react';

import { MessageSquare, Send } from 'lucide-react';
import { useTranslations } from 'use-intl';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import type { LudusChatMessage } from '@/modules/live/ludus/packets/protobuf';
import { api } from '@/shared/api/ApiInstance';
import { cn } from '@/shared/format/helpers';
import { optionalApiData } from '@/shared/result/api';

type LiveRoomChatPanelProps = {
   messages: LudusChatMessage[];
   disabled?: boolean;
   className?: string;
   onSendAction: (message: string) => boolean;
};

type LiveRoomChatSheetProps = LiveRoomChatPanelProps & {
   open: boolean;
   onOpenChangeAction: (open: boolean) => void;
};

export function LiveRoomChatSheet({ open, onOpenChangeAction, messages, disabled, onSendAction }: LiveRoomChatSheetProps) {
   const t = useTranslations('live');

   return (
      <Sheet open={open} onOpenChange={onOpenChangeAction}>
         <SheetTrigger asChild>
            <Button type="button" variant="secondary" size="icon-sm" className="self-center" title={t('roomChatAndLog')}>
               <MessageSquare data-icon />
               <span className="sr-only">{t('roomChatAndLog')}</span>
            </Button>
         </SheetTrigger>
         <SheetContent side="right" overlayClassName="bg-transparent" className="w-[min(100vw,28rem)] overflow-hidden sm:max-w-md">
            <SheetHeader>
               <SheetTitle>{t('roomChatAndLog')}</SheetTitle>
            </SheetHeader>
            <LiveRoomChatPanel messages={messages} disabled={disabled} className="min-h-0 flex-1 px-4 pb-4" onSendAction={onSendAction} />
         </SheetContent>
      </Sheet>
   );
}

export function LiveRoomChatPanel({ messages, disabled, className, onSendAction }: LiveRoomChatPanelProps) {
   const t = useTranslations('live');
   const [draft, setDraft] = useState('');
   const [playerNames, setPlayerNames] = useState<Record<string, string | null>>({});
   const [mapNames, setMapNames] = useState<Record<string, string | null>>({});
   const scrollTargetRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      scrollTargetRef.current?.scrollIntoView({ block: 'end' });
   }, [messages.length]);

   useEffect(() => {
      const playerIds = new Set<string>();
      const mapHashes = new Set<string>();

      for (const message of messages) {
         if (message.senderPlayerId && !(message.senderPlayerId in playerNames)) {
            playerIds.add(message.senderPlayerId);
         }

         const playerId = rawPlayerRoomLogId(message.text);
         if (playerId && !(playerId in playerNames)) playerIds.add(playerId);

         const mapHash = rawLoadedMapLogHash(message.text);
         if (mapHash && !(mapHash in mapNames)) mapHashes.add(mapHash);
      }

      if (playerIds.size === 0 && mapHashes.size === 0) return;

      let cancelled = false;

      async function resolveLogs() {
         const [resolvedPlayers, resolvedMaps] = await Promise.all([
            Promise.all(
               [...playerIds].map(async (playerId): Promise<[string, string | null]> => {
                  const player = await optionalApiData(api.player.playerControllerGetPlayer({ id: playerId }));
                  return [playerId, cleanDisplayName(player?.name || player?.playerNameInGame)];
               })
            ),
            Promise.all(
               [...mapHashes].map(async (hash): Promise<[string, string | null]> => {
                  const map = await optionalApiData(api.map.mapControllerGetMapByHash({ hash }));
                  return [hash, map ? formatResolvedMapName(map) : null];
               })
            )
         ]);

         if (cancelled) return;

         if (resolvedPlayers.length > 0) {
            setPlayerNames((current) => ({
               ...current,
               ...Object.fromEntries(resolvedPlayers)
            }));
         }
         if (resolvedMaps.length > 0) {
            setMapNames((current) => ({
               ...current,
               ...Object.fromEntries(resolvedMaps)
            }));
         }
      }

      void resolveLogs();

      return () => {
         cancelled = true;
      };
   }, [mapNames, messages, playerNames]);

   function submitMessage(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      const message = draft.trim();
      if (!message) return;
      if (onSendAction(message)) {
         setDraft('');
      }
   }

   return (
      <div className={cn('flex min-h-[28rem] min-w-0 flex-col gap-3', className)}>
         <ScrollArea className="min-h-0 flex-1">
            <div className="flex min-h-full flex-col gap-2 pr-3">
               {messages.length === 0 ? (
                  <div className="text-muted-foreground flex min-h-[18rem] items-center justify-center text-center text-sm">{t('roomChatEmpty')}</div>
               ) : (
                  messages.map((message) => (
                     <article key={message.messageId || `${message.matchId}:${message.roomSequence}`} className="flex min-w-0 flex-col gap-1 py-1.5">
                        <div className="flex min-w-0 items-center gap-2">
                           <span className="text-muted-foreground shrink-0 text-[11px] tabular-nums">{formatChatTime(message.createdAtUnixMs)}</span>
                           {message.kind !== 'CHAT' ? (
                              <Badge variant="outline" className="h-5 rounded-md px-1.5">
                                 {message.kind === 'LOG' ? t('roomChatLogBadge') : t('roomChatSystemBadge')}
                              </Badge>
                           ) : (
                              <span className="text-foreground min-w-0 truncate text-xs font-semibold">
                                 {displayChatSender(message, playerNames, t('roomChatUnknownSender'))}
                              </span>
                           )}
                        </div>
                        <p className={cn('min-w-0 break-words text-sm leading-relaxed', message.kind !== 'CHAT' && 'text-muted-foreground')}>
                           {displayChatMessageText(message, playerNames, mapNames)}
                        </p>
                     </article>
                  ))
               )}
               <div ref={scrollTargetRef} />
            </div>
         </ScrollArea>
         <form className="grid w-full grid-cols-[minmax(0,1fr)_auto] gap-2 border-t pt-3" onSubmit={submitMessage}>
            <Input
               value={draft}
               onChange={(event) => setDraft(event.target.value)}
               placeholder={t('roomChatPlaceholder')}
               disabled={disabled}
               maxLength={500}
            />
            <Button type="submit" size="icon" disabled={disabled || draft.trim().length === 0} title={t('roomChatSend')}>
               <Send data-icon />
               <span className="sr-only">{t('roomChatSend')}</span>
            </Button>
         </form>
      </div>
   );
}

function formatChatTime(createdAtUnixMs: number) {
   if (!createdAtUnixMs) return '--:--';
   return new Date(createdAtUnixMs).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const rawPlayerRoomLogPattern = /^(\d{15,20}) (joined|left) the room$/;
const namedPlayerRoomLogPattern = /^(.+) (joined|left) the room$/s;
const rawLoadedMapLogPattern = /^Loaded map\s+([A-Fa-f0-9]{40})(.*)$/s;
const displayMarkupTagPattern = /<[^>\r\n]{1,128}>/g;

function displayChatMessageText(message: LudusChatMessage, playerNames: Record<string, string | null>, mapNames: Record<string, string | null>) {
   if (message.kind === 'CHAT') return message.text;

   const playerLog = message.text.match(rawPlayerRoomLogPattern);
   if (playerLog) {
      return `${displayLogPlayerName(message, playerNames, '', playerLog[1])} ${playerLog[2]} the room`;
   }

   const namedPlayerLog = message.text.match(namedPlayerRoomLogPattern);
   if (namedPlayerLog) {
      return `${displayLogPlayerName(message, playerNames, namedPlayerLog[1])} ${namedPlayerLog[2]} the room`;
   }

   const mapLog = message.text.match(rawLoadedMapLogPattern);
   if (mapLog) {
      return `Loaded ${mapNames[mapLog[1].toUpperCase()] || 'map'}${mapLogSuffix(mapLog[2])}`;
   }

   return stripDisplayMarkup(message.text);
}

function displayChatSender(message: LudusChatMessage, playerNames: Record<string, string | null>, unknownSender: string) {
   const senderName = cleanDisplayName(message.senderDisplayName);
   if (senderName && senderName !== 'Player') return senderName;
   if (message.senderPlayerId) return playerNames[message.senderPlayerId] || 'Loading player';
   return unknownSender;
}

function displayLogPlayerName(
   message: LudusChatMessage,
   playerNames: Record<string, string | null>,
   fallbackName: string,
   fallbackPlayerId?: string
) {
   const senderName = cleanDisplayName(message.senderDisplayName);
   if (senderName && senderName !== 'Ludus' && senderName !== 'Player') return senderName;

   const playerId = fallbackPlayerId || message.senderPlayerId;
   if (playerId) return playerNames[playerId] || 'Loading player';

   const fallback = cleanDisplayName(fallbackName);
   if (fallback && fallback !== 'Player') return fallback;
   return 'Unknown player';
}

function rawPlayerRoomLogId(text: string) {
   return text.match(rawPlayerRoomLogPattern)?.[1] ?? null;
}

function rawLoadedMapLogHash(text: string) {
   return text.match(rawLoadedMapLogPattern)?.[1]?.toUpperCase() ?? null;
}

function mapLogSuffix(value: string | undefined) {
   const suffix = value?.replace(/\s+/g, ' ').trim();
   return suffix ? ` ${suffix}` : '';
}

function formatResolvedMapName(map: { songName: string; songAuthorName: string }) {
   return map.songAuthorName ? `${map.songName} by ${map.songAuthorName}` : map.songName;
}

function cleanDisplayName(value: string | null | undefined) {
   const name = stripDisplayMarkup(value).replace(/\s+/g, ' ').trim();
   return name || null;
}

function stripDisplayMarkup(value: string | null | undefined) {
   return (value ?? '').replace(displayMarkupTagPattern, '');
}
