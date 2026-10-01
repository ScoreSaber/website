import { create, fromBinary, toBinary } from '@bufbuild/protobuf';
import { Result } from 'better-result';

import {
   LiveChatMessageKind,
   LiveChatMessageRequestSchema,
   type LiveChatMessage,
   type LiveChatSnapshot
} from '@/modules/live/ludus/generated/proto/scoresaber/live/v1/chat_pb';
import { LudusCommandType, type PromptResponse, type ServerCommand } from '@/modules/live/ludus/generated/proto/scoresaber/live/v1/commands_pb';
import {
   LivePlayerPlatform,
   LudusClientType,
   LudusDownloadState,
   LudusPlayState,
   LudusReadyState
} from '@/modules/live/ludus/generated/proto/scoresaber/live/v1/common_pb';
import { LudusEnvelopeSchema, type LudusEnvelope as ProtoLudusEnvelope } from '@/modules/live/ludus/generated/proto/scoresaber/live/v1/ludus_pb';
import { ReplayStreamState } from '@/modules/live/ludus/generated/proto/scoresaber/live/v1/replay_stream_pb';
import {
   FollowRoomRequestSchema,
   LudusRoomContextType,
   type RoomContextUpdated
} from '@/modules/live/ludus/generated/proto/scoresaber/live/v1/room_actions_pb';
import {
   LivePlaybackPolicy,
   type LivePlaybackBuffer,
   type LiveMatchRoomState,
   type LiveRoomReplayState,
   type LiveRoomStreamSnapshot,
   type LiveTournamentStreamSnapshot,
   type RoomSnapshot
} from '@/modules/live/ludus/generated/proto/scoresaber/live/v1/room_state_pb';
import {
   ConnectRequestSchema,
   HeartbeatSchema,
   SetClientTypeRequestSchema,
   type ConnectAccepted,
   type ErrorResponse,
   type ReconnectRequested
} from '@/modules/live/ludus/generated/proto/scoresaber/live/v1/session_pb';

const protocolVersion = 1;

export type LudusClientKind = 'ORGANIZER' | 'SPECTATOR' | 'WEBSITE' | 'CASTER';
export type LudusRoomContext = 'CORE' | 'PUBLIC_PRESENCE' | 'TOURNAMENT';

export type LudusEnvelope =
   | {
        type: 'CONNECT_ACCEPTED';
        connectionId: string;
        roomContext: LudusRoomContext;
        tournamentId: string;
        currentMatchId: string;
        clientType: LudusClientKind | 'UNSPECIFIED';
        heartbeatIntervalMs: number;
     }
   | {
        type: 'ROOM_CONTEXT_UPDATED';
        roomContext: LudusRoomContext;
        tournamentId: string;
        currentMatchId: string;
        clientType: LudusClientKind | 'UNSPECIFIED';
     }
   | {
        type: 'RECONNECT_REQUESTED';
        websocketUrl: string;
        reason: string;
        retryAfterMs: number;
     }
   | {
        type: 'ROOM_SNAPSHOT';
        rooms: LudusRoomState[];
     }
   | {
        type: 'STREAM_SNAPSHOT';
        snapshot: LudusStreamSnapshot;
     }
   | {
        type: 'START_MAP_COMMAND';
        command: LudusStartMapCommand;
     }
   | {
        type: 'RETURN_TO_MENU_COMMAND';
        matchId: string;
     }
   | {
        type: 'PROMPT_RESPONSE';
        response: LudusPromptResponse;
     }
   | {
        type: 'CHAT_MESSAGE';
        message: LudusChatMessage;
     }
   | {
        type: 'CHAT_SNAPSHOT';
        tournamentId: string;
        matchId: string;
        messages: LudusChatMessage[];
     }
   | {
        type: 'ERROR';
        code: string;
        message: string;
        retryable: boolean;
     }
   | {
        type: 'UNKNOWN';
        label: string;
     };

export type LudusRoomState = {
   matchId: string;
   roomId: string;
   playStatus: LudusRoomPlayStatus;
   loadedSong: boolean;
   loadedSongHash: string;
   loadedSongName: string;
   playerIds: string[];
   playerStates: LudusRoomPlayerState[];
   viewerCount: number;
   viewers: LudusRoomViewerState[];
};

export type LudusRoomPlayStatus = 'IDLE' | 'PLAYING';

export type LudusStartMapCommand = {
   commandId: string;
   matchId: string;
   startTimeUnixMs: number;
   countdownMs: number;
   forceStart: boolean;
};

export type LudusRoomPlayerState = {
   playerId: string;
   playState: 'IDLE' | 'PAUSED' | 'PLAYING';
   downloadState: 'NONE' | 'DOWNLOADING' | 'DOWNLOADED' | 'ERROR';
   readyState: 'NOT_READY' | 'READY' | 'AFK';
   isBot: boolean;
   errorMessage: string;
};

export type LudusRoomViewerState = {
   playerId: string;
   clientType: LudusClientKind | 'UNSPECIFIED';
};

export type LudusReplayScore = {
   matchId: string;
   playerId: string;
   streamState: 'STARTING' | 'LIVE' | 'DISCONNECTED' | 'RESUMING' | 'ENDED' | 'FAILED' | 'UNKNOWN';
   rank: number;
   score: number;
   accuracy: number | null;
   combo: number | null;
   notesMissed: number;
   fullCombo: boolean;
   songPositionMs: number;
   sourceStreamId: string;
   sourceSequence: string;
   sourceServerTimeUnixMs: number;
   sourceReceivedAtUnixMs: number;
};

export type LudusStreamSnapshot = {
   tournamentId: string;
   sequence: string;
   serverTimeUnixMs: number;
   rooms: LudusRoomStreamSnapshot[];
};

export type LudusRoomStreamSnapshot = {
   room: LudusRoomState;
   scores: LudusReplayScore[];
   liveEdgeSongTimeMs: number;
   playbackBuffer: LudusPlaybackBuffer | null;
};

export type LudusPlaybackBuffer = {
   policy: 'LOW_LATENCY' | 'SYNCED_ROOM' | 'UNKNOWN';
   recommendedDelayMs: number;
   minDelayMs: number;
   maxDelayMs: number;
};

export type LudusPromptResponse = {
   commandId: string;
   matchId: string;
   playerId: string;
   accepted: boolean;
   respondedAtUnixMs: number;
   promptMessage: string;
};

export type LudusChatMessage = {
   messageId: string;
   tournamentId: string;
   matchId: string;
   roomId: string;
   senderConnectionId: string;
   senderPlayerId: string;
   senderDisplayName: string;
   senderClientType: LudusClientKind | 'UNSPECIFIED';
   kind: 'CHAT' | 'LOG' | 'SYSTEM' | 'UNKNOWN';
   text: string;
   createdAtUnixMs: number;
   roomSequence: string;
};

type ProtoEnvelopeBody = ProtoLudusEnvelope['body'];
type ServerCommandDecoder = (command: ServerCommand) => LudusEnvelope;

const unknownEnvelope: LudusEnvelope = {
   type: 'UNKNOWN',
   label: 'unknown ludus frame'
};
const unknownCommandEnvelope: LudusEnvelope = {
   type: 'UNKNOWN',
   label: 'unknown ludus command'
};

const serverCommandDecoders = new Map<LudusCommandType, ServerCommandDecoder>([
   [LudusCommandType.START_MAP, decodeStartMapCommand],
   [LudusCommandType.RETURN_TO_MENU, decodeReturnToMenuCommand]
]);

const replayStreamStates = new Map<ReplayStreamState, LudusReplayScore['streamState']>([
   [ReplayStreamState.STARTING, 'STARTING'],
   [ReplayStreamState.STREAMING, 'LIVE'],
   [ReplayStreamState.DISCONNECTED, 'DISCONNECTED'],
   [ReplayStreamState.RESUMING, 'RESUMING'],
   [ReplayStreamState.ENDED, 'ENDED'],
   [ReplayStreamState.FAILED, 'FAILED']
]);

const playbackPolicies = new Map<LivePlaybackPolicy, LudusPlaybackBuffer['policy']>([
   [LivePlaybackPolicy.LOW_LATENCY, 'LOW_LATENCY'],
   [LivePlaybackPolicy.SYNCED_ROOM, 'SYNCED_ROOM']
]);

const playStates = new Map<LudusPlayState, LudusRoomPlayerState['playState']>([
   [LudusPlayState.IN_MENUS, 'IDLE'],
   [LudusPlayState.PAUSED, 'PAUSED'],
   [LudusPlayState.IN_GAME, 'PLAYING']
]);

const readyStates = new Map<LudusReadyState, LudusRoomPlayerState['readyState']>([
   [LudusReadyState.READY, 'READY'],
   [LudusReadyState.AFK, 'AFK']
]);

const downloadStates = new Map<LudusDownloadState, LudusRoomPlayerState['downloadState']>([
   [LudusDownloadState.DOWNLOADING, 'DOWNLOADING'],
   [LudusDownloadState.DOWNLOADED, 'DOWNLOADED'],
   [LudusDownloadState.ERROR, 'ERROR']
]);

export function getLudusWebSocketUrl(baseUrl: string | null | undefined) {
   if (!baseUrl || !URL.canParse(baseUrl)) return null;

   const inputUrl = new URL(baseUrl);
   if (inputUrl.protocol === 'ws:' || inputUrl.protocol === 'wss:') {
      if (inputUrl.pathname === '/' || inputUrl.pathname === '') inputUrl.pathname = '/v1/connect';
      return inputUrl.toString();
   }

   const url = new URL('/v1/connect', inputUrl);
   if (url.protocol === 'https:') url.protocol = 'wss:';
   else if (url.protocol === 'http:') url.protocol = 'ws:';
   else return null;

   return url.toString();
}

export function encodeConnectEnvelope(input: {
   roomContext: LudusRoomContext;
   tournamentId?: string;
   authToken?: string;
   playerId?: string;
   clientType: LudusClientKind;
}) {
   return encodeLudusEnvelope({
      case: 'connectRequest',
      value: create(ConnectRequestSchema, {
         authToken: input.authToken,
         tournamentId: input.tournamentId,
         platform: LivePlayerPlatform.UNSPECIFIED,
         playerId: input.playerId,
         clientType: ludusClientTypeValue(input.clientType),
         initialRoomContext: ludusRoomContextValue(input.roomContext)
      })
   });
}

export function encodeHeartbeatEnvelope(lastReceivedSequence: string) {
   return encodeLudusEnvelope({
      case: 'heartbeat',
      value: create(HeartbeatSchema, {
         lastReceivedSequence: BigInt(lastReceivedSequence || '0')
      })
   });
}

export function encodeSetClientTypeEnvelope(clientType: LudusClientKind) {
   return encodeLudusEnvelope({
      case: 'setClientTypeRequest',
      value: create(SetClientTypeRequestSchema, {
         clientType: ludusClientTypeValue(clientType)
      })
   });
}

export function encodeFollowRoomEnvelope(matchId: string) {
   return encodeLudusEnvelope({
      case: 'followRoomRequest',
      value: create(FollowRoomRequestSchema, {
         matchId
      })
   });
}

export function encodeChatMessageEnvelope(input: { matchId: string; text: string; senderDisplayName?: string }) {
   return encodeLudusEnvelope({
      case: 'chatMessageRequest',
      value: create(LiveChatMessageRequestSchema, {
         matchId: input.matchId,
         text: input.text,
         senderDisplayName: input.senderDisplayName
      })
   });
}

export function decodeLudusEnvelope(bytes: ArrayBuffer) {
   const envelope = Result.unwrapOr(
      Result.try(() => fromBinary(LudusEnvelopeSchema, new Uint8Array(bytes))),
      null
   );
   if (!envelope) return null;

   return decodeEnvelopeBody(envelope.body);
}

function decodeEnvelopeBody(body: ProtoEnvelopeBody): LudusEnvelope {
   switch (body.case) {
      case 'connectAccepted':
         return decodeConnectAcceptedEnvelope(body.value);
      case 'roomContextUpdated':
         return decodeRoomContextUpdatedEnvelope(body.value);
      case 'serverCommand':
         return decodeServerCommand(body.value);
      case 'roomSnapshot':
         return decodeRoomSnapshotEnvelope(body.value);
      case 'streamSnapshot':
         return decodeStreamSnapshotEnvelope(body.value);
      case 'reconnectRequested':
         return decodeReconnectRequestedEnvelope(body.value);
      case 'error':
         return decodeErrorEnvelope(body.value);
      case 'promptResponse':
         return decodePromptResponseEnvelope(body.value);
      case 'chatMessage':
         return decodeChatMessageEnvelope(body.value);
      case 'chatSnapshot':
         return decodeChatSnapshotEnvelope(body.value);
      default:
         return unknownEnvelope;
   }
}

function decodeConnectAcceptedEnvelope(value: ConnectAccepted): LudusEnvelope {
   return {
      type: 'CONNECT_ACCEPTED',
      connectionId: value.connectionId,
      roomContext: decodeRoomContext(value.roomContext),
      tournamentId: value.tournamentId,
      currentMatchId: value.currentMatchId,
      clientType: decodeClientType(value.clientType),
      heartbeatIntervalMs: value.heartbeatIntervalMs
   };
}

function decodeRoomContextUpdatedEnvelope(value: RoomContextUpdated): LudusEnvelope {
   return {
      type: 'ROOM_CONTEXT_UPDATED',
      roomContext: decodeRoomContext(value.roomContext),
      tournamentId: value.tournamentId,
      currentMatchId: value.currentMatchId,
      clientType: decodeClientType(value.clientType)
   };
}

function decodeReconnectRequestedEnvelope(value: ReconnectRequested): LudusEnvelope {
   return {
      type: 'RECONNECT_REQUESTED',
      websocketUrl: getLudusWebSocketUrl(value.websocketUrl) ?? value.websocketUrl,
      reason: value.reason,
      retryAfterMs: value.retryAfterMs
   };
}

function decodeRoomSnapshotEnvelope(value: RoomSnapshot): LudusEnvelope {
   return {
      type: 'ROOM_SNAPSHOT',
      rooms: value.rooms.map(decodeRoomState)
   };
}

function decodeStreamSnapshotEnvelope(value: LiveTournamentStreamSnapshot): LudusEnvelope {
   return {
      type: 'STREAM_SNAPSHOT',
      snapshot: decodeStreamSnapshot(value)
   };
}

function decodeErrorEnvelope(value: ErrorResponse): LudusEnvelope {
   return {
      type: 'ERROR',
      code: value.code,
      message: value.message,
      retryable: value.retryable
   };
}

function decodePromptResponseEnvelope(value: PromptResponse): LudusEnvelope {
   return {
      type: 'PROMPT_RESPONSE',
      response: decodePromptResponse(value)
   };
}

function decodeChatMessageEnvelope(value: LiveChatMessage): LudusEnvelope {
   return {
      type: 'CHAT_MESSAGE',
      message: decodeChatMessage(value)
   };
}

function decodeChatSnapshotEnvelope(value: LiveChatSnapshot): LudusEnvelope {
   return {
      type: 'CHAT_SNAPSHOT',
      tournamentId: value.tournamentId,
      matchId: value.matchId,
      messages: value.messages.map(decodeChatMessage)
   };
}

function decodeServerCommand(command: ServerCommand): LudusEnvelope {
   return serverCommandDecoders.get(command.type)?.(command) ?? unknownCommandEnvelope;
}

function decodeStartMapCommand(command: ServerCommand): LudusEnvelope {
   const countdownMs = command.countdownMs;
   return {
      type: 'START_MAP_COMMAND',
      command: {
         commandId: command.commandId,
         matchId: command.matchId,
         startTimeUnixMs: Number(command.startTimeUnixMs || BigInt(Date.now() + countdownMs)),
         countdownMs,
         forceStart: command.forceStart
      }
   };
}

function decodeReturnToMenuCommand(command: ServerCommand): LudusEnvelope {
   return {
      type: 'RETURN_TO_MENU_COMMAND',
      matchId: command.matchId
   };
}

function encodeLudusEnvelope(body: ProtoLudusEnvelope['body']) {
   return toBinary(
      LudusEnvelopeSchema,
      create(LudusEnvelopeSchema, {
         protocolVersion,
         messageId: crypto.randomUUID(),
         clientTimeUnixMs: BigInt(Date.now()),
         body
      })
   );
}

function decodeRoomState(room: LiveMatchRoomState): LudusRoomState {
   const playerStates = room.playerStates.map((player) => ({
      playerId: player.playerId,
      playState: decodePlayState(player.playState),
      downloadState: decodeDownloadState(player.downloadState),
      readyState: decodeReadyState(player.readyState),
      isBot: player.isBot,
      errorMessage: player.errorMessage
   }));

   return {
      matchId: room.matchId,
      roomId: room.roomId,
      playStatus: getRoomPlayStatus(playerStates),
      loadedSong: room.loadedSong,
      loadedSongHash: room.loadedSongHash,
      loadedSongName: room.loadedSongName,
      playerIds: room.playerIds,
      playerStates,
      viewerCount: room.viewerCount,
      viewers: room.viewers.map((viewer) => ({
         playerId: viewer.playerId,
         clientType: decodeClientType(viewer.clientType)
      }))
   };
}

function decodeStreamSnapshot(snapshot: LiveTournamentStreamSnapshot): LudusStreamSnapshot {
   const receivedAtUnixMs = Date.now();
   return {
      tournamentId: snapshot.tournamentId,
      sequence: snapshot.sequence.toString(),
      serverTimeUnixMs: Number(snapshot.serverTimeUnixMs),
      rooms: snapshot.rooms.flatMap((room) => {
         const decoded = decodeRoomStreamSnapshot(room, receivedAtUnixMs);
         return decoded ? [decoded] : [];
      })
   };
}

function decodeRoomStreamSnapshot(snapshot: LiveRoomStreamSnapshot, receivedAtUnixMs: number): LudusRoomStreamSnapshot | null {
   if (!snapshot.room) return null;

   const room = decodeRoomState(snapshot.room);
   return {
      room,
      scores: snapshot.replayStates.map((state) => decodeReplayState(room.matchId, state, receivedAtUnixMs)),
      liveEdgeSongTimeMs: Number(snapshot.liveEdgeSongTimeMs),
      playbackBuffer: decodePlaybackBuffer(snapshot.playbackBuffer)
   };
}

function decodePlaybackBuffer(buffer: LivePlaybackBuffer | undefined): LudusPlaybackBuffer | null {
   if (!buffer) return null;

   return {
      policy: playbackPolicies.get(buffer.policy) ?? 'UNKNOWN',
      recommendedDelayMs: buffer.recommendedDelayMs,
      minDelayMs: buffer.minDelayMs,
      maxDelayMs: buffer.maxDelayMs
   };
}

function decodeReplayState(matchId: string, state: LiveRoomReplayState, receivedAtUnixMs: number): LudusReplayScore {
   return {
      matchId,
      playerId: state.playerId,
      streamState: decodeReplayStreamState(state.streamState),
      rank: state.rank || 0,
      score: state.score,
      accuracy: state.accuracy ?? null,
      combo: state.combo ?? null,
      notesMissed: state.notesMissed,
      fullCombo: state.fullCombo,
      songPositionMs: Number(state.songTimeMs),
      sourceStreamId: state.streamId,
      sourceSequence: state.sequence.toString(),
      sourceServerTimeUnixMs: Number(state.serverTimeUnixMs),
      sourceReceivedAtUnixMs: receivedAtUnixMs
   };
}

function decodeReplayStreamState(state: ReplayStreamState): LudusReplayScore['streamState'] {
   return replayStreamStates.get(state) ?? 'UNKNOWN';
}

function getRoomPlayStatus(playerStates: LudusRoomPlayerState[]): LudusRoomPlayStatus {
   if (playerStates.some((player) => player.playState === 'PLAYING')) return 'PLAYING';
   return 'IDLE';
}

function decodePlayState(state: LudusPlayState): LudusRoomPlayerState['playState'] {
   return playStates.get(state) ?? 'IDLE';
}

function decodeReadyState(state: LudusReadyState): LudusRoomPlayerState['readyState'] {
   return readyStates.get(state) ?? 'NOT_READY';
}

function decodeDownloadState(state: LudusDownloadState): LudusRoomPlayerState['downloadState'] {
   return downloadStates.get(state) ?? 'NONE';
}

function decodePromptResponse(response: PromptResponse): LudusPromptResponse {
   return {
      commandId: response.commandId,
      matchId: response.matchId,
      playerId: response.playerId,
      accepted: response.accepted,
      respondedAtUnixMs: Number(response.respondedAtUnixMs),
      promptMessage: response.promptMessage
   };
}

function decodeChatMessage(message: LiveChatMessage): LudusChatMessage {
   return {
      messageId: message.messageId,
      tournamentId: message.tournamentId,
      matchId: message.matchId,
      roomId: message.roomId,
      senderConnectionId: message.senderConnectionId,
      senderPlayerId: message.senderPlayerId,
      senderDisplayName: message.senderDisplayName,
      senderClientType: decodeClientType(message.senderClientType),
      kind: decodeChatMessageKind(message.kind),
      text: message.text,
      createdAtUnixMs: Number(message.createdAtUnixMs),
      roomSequence: message.roomSequence.toString()
   };
}

function decodeChatMessageKind(kind: LiveChatMessageKind): LudusChatMessage['kind'] {
   if (kind === LiveChatMessageKind.CHAT) return 'CHAT';
   if (kind === LiveChatMessageKind.LOG) return 'LOG';
   if (kind === LiveChatMessageKind.SYSTEM) return 'SYSTEM';
   return 'UNKNOWN';
}

function ludusClientTypeValue(clientType: LudusClientKind) {
   if (clientType === 'SPECTATOR') return LudusClientType.SPECTATOR;
   if (clientType === 'ORGANIZER') return LudusClientType.ORGANIZER;
   if (clientType === 'WEBSITE') return LudusClientType.WEBSITE;
   if (clientType === 'CASTER') return LudusClientType.CASTER;
   return LudusClientType.UNSPECIFIED;
}

function decodeClientType(clientType: LudusClientType): LudusRoomViewerState['clientType'] {
   if (clientType === LudusClientType.SPECTATOR) return 'SPECTATOR';
   if (clientType === LudusClientType.ORGANIZER) return 'ORGANIZER';
   if (clientType === LudusClientType.WEBSITE) return 'WEBSITE';
   if (clientType === LudusClientType.CASTER) return 'CASTER';
   return 'UNSPECIFIED';
}

function ludusRoomContextValue(roomContext: LudusRoomContext) {
   if (roomContext === 'TOURNAMENT') return LudusRoomContextType.TOURNAMENT;
   if (roomContext === 'CORE') return LudusRoomContextType.CORE;
   return LudusRoomContextType.PUBLIC_PRESENCE;
}

function decodeRoomContext(roomContext: LudusRoomContextType): LudusRoomContext {
   if (roomContext === LudusRoomContextType.TOURNAMENT) return 'TOURNAMENT';
   if (roomContext === LudusRoomContextType.CORE) return 'CORE';
   return 'PUBLIC_PRESENCE';
}
