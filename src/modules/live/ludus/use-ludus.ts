'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Result } from 'better-result';
import { z } from 'zod';

import { env } from '@/env';
import { createLudusPacketDispatcher, createLudusState, type LudusPacketBytes, type LudusState } from '@/modules/live/ludus/packets';
import {
   decodeLudusEnvelope,
   encodeChatMessageEnvelope,
   encodeConnectEnvelope,
   encodeFollowRoomEnvelope,
   encodeHeartbeatEnvelope,
   getLudusWebSocketUrl,
   type LudusClientKind,
   type LudusRoomContext
} from '@/modules/live/ludus/packets/protobuf';

export type { LudusState } from '@/modules/live/ludus/packets';

const socketErrorDelayMs = 750;
const reconnectDelaysMs = [250, 500, 1000, 2000, 5000, 10000];

type UseLudusOptions = {
   enabled: boolean;
   ludusBaseUrl: string | null | undefined;
   roomContext: LudusRoomContext;
   tournamentId?: string;
   playerId?: string;
   authToken?: string;
   clientType: LudusClientKind;
   identifyWithSiteSession?: boolean;
   targetMatchId?: string;
};

const ludusBrowserSessionSchema = z.object({
   authToken: z.string(),
   playerId: z.string(),
   expiresAtUnixMs: z.number()
});

type LudusBrowserSession = z.infer<typeof ludusBrowserSessionSchema>;

type LudusBrowserSessionOptions = {
   clientType: LudusClientKind;
   roomContext: LudusRoomContext;
   tournamentId?: string;
   targetMatchId?: string;
};

export function useLudus({
   enabled,
   ludusBaseUrl,
   roomContext,
   tournamentId,
   playerId,
   authToken,
   clientType,
   identifyWithSiteSession = true,
   targetMatchId
}: UseLudusOptions) {
   const initialWebsocketUrl = useMemo(() => getLudusWebSocketUrl(ludusBaseUrl), [ludusBaseUrl]);
   const dispatcher = useMemo(() => createLudusPacketDispatcher(), []);
   const [state, setState] = useState<LudusState>(() => createLudusState(initialWebsocketUrl));
   const [canSendChat, setCanSendChat] = useState(false);
   const sendSocketBytesRef = useRef<((bytes: LudusPacketBytes) => boolean) | null>(null);

   const sendChatMessage = useCallback((matchId: string, text: string, senderDisplayName?: string) => {
      const sendSocketBytes = sendSocketBytesRef.current;
      if (!sendSocketBytes) return false;

      const sent = sendSocketBytes(encodeChatMessageEnvelope({ matchId, text, senderDisplayName }));
      if (!sent) setCanSendChat(false);
      return sent;
   }, []);

   useEffect(() => {
      setState((current) => ({ ...current, websocketUrl: initialWebsocketUrl }));
   }, [initialWebsocketUrl]);

   useEffect(() => {
      if (!enabled) {
         setCanSendChat(false);
         setState((current) => ({ ...current, status: 'idle', error: null }));
         return;
      }

      if (!initialWebsocketUrl) {
         setCanSendChat(false);
         setState((current) => ({ ...current, status: 'error', error: 'not-configured' }));
         return;
      }

      let websocketUrl = initialWebsocketUrl;
      let socket: WebSocket | null = null;
      let heartbeatId: number | null = null;
      let socketErrorId: number | null = null;
      let reconnectId: number | null = null;
      let reconnectAttempt = 0;
      let active = true;

      setCanSendChat(false);
      setState({ ...createLudusState(websocketUrl), status: 'connecting' });

      const clearHeartbeat = () => {
         if (heartbeatId == null) return;
         window.clearInterval(heartbeatId);
         heartbeatId = null;
      };

      const clearSocketErrorTimeout = () => {
         if (socketErrorId == null) return;
         window.clearTimeout(socketErrorId);
         socketErrorId = null;
      };

      const clearReconnect = () => {
         if (reconnectId == null) return;
         window.clearTimeout(reconnectId);
         reconnectId = null;
      };

      const scheduleReconnect = (delayOverrideMs?: number) => {
         if (!active || reconnectId != null) return;

         clearHeartbeat();
         clearSocketErrorTimeout();
         setCanSendChat(false);
         const delayMs = delayOverrideMs ?? reconnectDelaysMs[Math.min(reconnectAttempt, reconnectDelaysMs.length - 1)];
         if (delayOverrideMs == null) reconnectAttempt++;

         setState((current) => ({
            ...current,
            websocketUrl,
            status: 'connecting',
            error: current.error === 'not-configured' ? null : current.error
         }));

         reconnectId = window.setTimeout(() => {
            reconnectId = null;
            void connect().then((connectResult) => {
               if (Result.isError(connectResult)) {
                  scheduleReconnect();
               }
            });
         }, delayMs);
      };

      const sendSocketBytes = (bytes: LudusPacketBytes) => {
         const currentSocket = socket;
         if (currentSocket?.readyState !== WebSocket.OPEN) {
            scheduleReconnect();
            return false;
         }

         const sendResult = Result.try(() => currentSocket.send(bytes));
         if (Result.isError(sendResult)) {
            currentSocket.close();
            scheduleReconnect();
            return false;
         }
         return true;
      };
      sendSocketBytesRef.current = sendSocketBytes;

      const packetContext = {
         updateState: setState,
         send(bytes: LudusPacketBytes) {
            sendSocketBytes(bytes);
         },
         reconnect(nextWebsocketUrl: string, delayMs: number) {
            websocketUrl = nextWebsocketUrl;
            const currentSocket = socket;
            socket = null;
            setCanSendChat(false);
            currentSocket?.close();
            clearReconnect();
            setState({ ...createLudusState(websocketUrl), status: 'connecting' });
            scheduleReconnect(delayMs);
         },
         clearSocketErrorTimeout,
         startHeartbeat(intervalMs: number) {
            clearHeartbeat();
            heartbeatId = window.setInterval(
               () => {
                  sendSocketBytes(encodeHeartbeatEnvelope('0'));
               },
               Math.max(1000, intervalMs || 10000)
            );
         }
      };

      const connect = async () => {
         if (!active) return Result.ok();

         clearHeartbeat();
         clearSocketErrorTimeout();
         const browserSession = identifyWithSiteSession
            ? await fetchLudusBrowserSession({ clientType, roomContext, tournamentId, targetMatchId })
            : null;
         if (!active) return Result.ok();
         const connectPlayerId = playerId ?? browserSession?.playerId;
         const connectAuthToken = authToken ?? browserSession?.authToken;

         const socketResult = Result.try(() => new WebSocket(websocketUrl));
         if (Result.isError(socketResult)) return Result.err(socketResult.error);

         const currentSocket = socketResult.value;
         currentSocket.binaryType = 'arraybuffer';
         socket = currentSocket;

         currentSocket.onopen = () => {
            if (!active || socket !== currentSocket) return;
            reconnectAttempt = 0;
            clearSocketErrorTimeout();
            setCanSendChat(true);
            setState((current) => ({ ...current, status: 'connecting', error: null }));
            sendSocketBytes(
               encodeConnectEnvelope({
                  tournamentId,
                  roomContext,
                  clientType,
                  authToken: connectAuthToken,
                  playerId: connectPlayerId
               })
            );
            if (targetMatchId) {
               sendSocketBytes(encodeFollowRoomEnvelope(targetMatchId));
            }
         };

         currentSocket.onmessage = (event) => {
            if (!active || socket !== currentSocket) return;
            if (!(event.data instanceof ArrayBuffer)) {
               return;
            }

            const envelope = decodeLudusEnvelope(event.data);
            if (!envelope) {
               return;
            }

            dispatcher.dispatch(packetContext, envelope);
         };

         currentSocket.onerror = () => {
            if (!active || socket !== currentSocket || socketErrorId != null) return;
            socketErrorId = window.setTimeout(() => {
               if (!active || socket !== currentSocket || currentSocket.readyState === WebSocket.OPEN) return;
               setState((current) => ({ ...current, status: 'connecting', error: 'socket-error' }));
            }, socketErrorDelayMs);
         };

         currentSocket.onclose = () => {
            if (!active || socket !== currentSocket) return;
            socket = null;
            setCanSendChat(false);
            scheduleReconnect();
         };

         return Result.ok();
      };

      void connect().then((connectResult) => {
         if (Result.isError(connectResult)) {
            scheduleReconnect();
         }
      });

      return () => {
         active = false;
         clearHeartbeat();
         clearSocketErrorTimeout();
         clearReconnect();
         if (socket != null) {
            socket.close();
         }
         sendSocketBytesRef.current = null;
         setCanSendChat(false);
      };
   }, [authToken, clientType, dispatcher, enabled, identifyWithSiteSession, initialWebsocketUrl, playerId, roomContext, targetMatchId, tournamentId]);

   return useMemo(() => ({ ...state, canSendChat, sendChatMessage }), [canSendChat, sendChatMessage, state]);
}

async function fetchLudusBrowserSession({
   clientType,
   roomContext,
   tournamentId,
   targetMatchId
}: LudusBrowserSessionOptions): Promise<LudusBrowserSession | null> {
   const url = new URL('/api/v2/live/ludus/session', env.NEXT_PUBLIC_API_URL);
   const scopedBody = roomContext === 'TOURNAMENT' && tournamentId ? { tournamentId, clientType, targetMatchId } : null;
   const result = await Result.tryPromise(async () => {
      const request: RequestInit = {
         method: 'POST',
         credentials: 'include'
      };
      if (scopedBody) {
         request.headers = { 'content-type': 'application/json' };
         request.body = JSON.stringify(scopedBody);
      }
      const response = await fetch(url, request);
      if (!response.ok) return null;
      return ludusBrowserSessionSchema.parse(await response.json());
   });

   return Result.unwrapOr(result, null);
}
