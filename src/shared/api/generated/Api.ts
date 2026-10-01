/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface RealmControllerGetRealmByIdParams {
   /** @exclusiveMin true */
   id: number;
}

export interface RealmControllerGetRealmPPCurveParams {
   /** @exclusiveMin true */
   id: number;
}

export interface PlayerControllerGetPlayersParams {
   /**
    * Page number
    * @exclusiveMin true
    * @default 1
    */
   page?: number;
   /**
    * Items per page (max: 100)
    * @min 1
    * @max 100
    * @default 50
    */
   limit?: number;
   /** Comma-separated country codes. Takes precedence over scope when both are provided */
   countries?: string;
   /** Authenticated viewer country or region filter for game clients */
   scope?: 'country' | 'region';
   /**
    * Search by player name (min 3 chars)
    * @minLength 3
    * @maxLength 64
    */
   search?: string;
   /**
    * Realm ID (defaults to the active realm)
    * @min 0
    */
   realmId?: number;
   /**
    * Include inactive players
    * @default false
    */
   includeInactive?: string;
   /**
    * Only include players currently visible in public live presence
    * @default false
    */
   live?: string;
   /**
    * Sort field
    * @default "totalPP"
    */
   sort?:
      | 'rank'
      | 'countryRank'
      | 'totalPP'
      | 'totalScore'
      | 'totalRankedScore'
      | 'totalPlayedLeaderboards'
      | 'totalPlayedRankedLeaderboards'
      | 'totalSubmittedPlays'
      | 'totalReplayViews'
      | 'averageAccuracy'
      | 'weightedAverageAccuracy'
      | 'completionAccuracy';
   /** Sort direction (defaults vary by field) */
   sortDirection?: 'asc' | 'desc';
   /** Player listing pivot mode. player centers results around the authenticated viewer; friends limits to friends */
   pivot?: 'player' | 'friends';
}

export interface PlayerControllerGetPlayerCountParams {
   /**
    * Realm ID (defaults to the active realm)
    * @min 0
    */
   realmId?: number;
   /**
    * Include inactive players
    * @default false
    */
   includeInactive?: string;
   /**
    * Only count players currently visible in public live presence
    * @default false
    */
   live?: string;
}

export interface PlayerControllerGetPlayerByVanityParams {
   /**
    * Realm ID (defaults to the active realm)
    * @min 0
    */
   realmId?: number;
   /**
    * @minLength 3
    * @maxLength 32
    */
   slug: string;
}

export interface PlayerControllerGetPlayerParams {
   /**
    * Realm ID (defaults to the active realm)
    * @min 0
    */
   realmId?: number;
   id: string;
}

export interface PlayerControllerGetPlayerProfileParams {
   /**
    * Realm ID (defaults to the active realm)
    * @min 0
    */
   realmId?: number;
   id: string;
}

export interface PlayerControllerGetPlayerBasicParams {
   /**
    * Realm ID (defaults to the active realm)
    * @min 0
    */
   realmId?: number;
   id: string;
}

export interface PlayerControllerGetPlayerHistoryParams {
   /**
    * Realm ID (defaults to the active realm)
    * @min 0
    */
   realmId?: number;
   id: string;
}

export interface PlayerControllerGetGlobalPlayerHistoryParams {
   id: string;
}

export interface PlayerControllerGetPlayerScoreByHashParams {
   /**
    * Realm ID (defaults to the active realm)
    * @min 0
    */
   realmId?: number;
   id: string;
   /**
    * @minLength 1
    * @maxLength 40
    */
   hash: string;
   /**
    * @minLength 1
    * @maxLength 64
    */
   mode: string;
   /** @exclusiveMin true */
   difficulty: number;
}

export interface PlayerControllerGetPlayerScoresParams {
   /**
    * Page number
    * @exclusiveMin true
    * @default 1
    */
   page?: number;
   /**
    * Items per page (max: 100)
    * @min 1
    * @max 100
    * @default 8
    */
   limit?: number;
   /**
    * Sort order
    * @default "top"
    */
   sort?: 'top' | 'recent' | 'oldest' | 'accuracy';
   /**
    * Search by song name (min 3 chars)
    * @minLength 3
    * @maxLength 64
    */
   search?: string;
   /** Personal best filter */
   personalBest?: string | 'all';
   /**
    * Leaderboard id
    * @exclusiveMin true
    */
   leaderboardId?: number;
   /**
    * Map id
    * @exclusiveMin true
    */
   mapId?: number;
   /** Oldest score timestamp */
   from?: string;
   /** Newest score timestamp */
   to?: string;
   /** Replay availability filter */
   hasReplay?: string;
   /**
    * Realm ID (defaults to the active realm)
    * @min 0
    */
   realmId?: number;
   id: string;
}

export interface PlayerAliasControllerGetAliasesParams {
   id: string;
}

export interface PlayerAliasControllerDisableAliasParams {
   id: string;
   /** @exclusiveMin true */
   aliasId: number;
}

export interface PlayerAliasControllerDisableAllAliasesParams {
   id: string;
}

export interface PlayerRelationshipControllerGetRelationshipsParams {
   type: 'followers' | 'following' | 'platform-friends';
   /**
    * Page number
    * @exclusiveMin true
    * @default 1
    */
   page?: number;
   /**
    * Items per page (max: 50)
    * @min 1
    * @max 50
    * @default 20
    */
   limit?: number;
   id: string;
}

export interface PlayerRelationshipControllerFollowPlayerParams {
   id: string;
}

export interface PlayerRelationshipControllerUnfollowPlayerParams {
   id: string;
}

export interface PlayerReportControllerSubmitProfileReportPayload {
   /** Reason for the profile report */
   reason: 'INAPPROPRIATE_PROFILE' | 'IMPERSONATION' | 'HARASSMENT' | 'CHEATING' | 'OTHER';
   /**
    * Optional report details
    * @maxLength 1000
    * @default ""
    */
   details?: string;
}

export interface PlayerReportControllerSubmitProfileReportParams {
   id: string;
}

export interface LeaderboardControllerGetLeaderboardListingsParams {
   /**
    * Page number
    * @exclusiveMin true
    * @default 1
    */
   page?: number;
   /**
    * Items per page (max: 100)
    * @min 1
    * @max 100
    * @default 14
    */
   limit?: number;
   /**
    * Filter by status. accepts a single value or comma-separated values
    * @minItems 1
    */
   status?: ('UNRANKED' | 'RANKED' | 'QUALIFIED' | 'LOVED')[];
   /** Verified maps only */
   verified?: string;
   /**
    * Minimum star rating
    * @min 0
    */
   minStars?: number;
   /**
    * Maximum star rating
    * @min 0
    */
   maxStars?: number;
   /**
    * Search by song name (min 3 chars)
    * @minLength 3
    * @maxLength 64
    */
   search?: string;
   /** Sort field */
   sortBy?: 'createdAt' | 'rankedAt' | 'stars' | 'totalScores' | 'dailyScores' | 'trending';
   /**
    * Sort direction
    * @default "desc"
    */
   sortDirection?: 'asc' | 'desc';
   /**
    * Realm ID (defaults to the active realm)
    * @min 0
    */
   realmId?: number;
}

export interface LeaderboardControllerGetLeaderboardByIdParams {
   /**
    * Realm ID (defaults to the active realm)
    * @min 0
    */
   realmId?: number;
   /** @exclusiveMin true */
   id: number;
}

export interface LeaderboardControllerGetLeaderboardPlayStatsByIdParams {
   /**
    * Realm ID (defaults to the active realm)
    * @min 0
    */
   realmId?: number;
   /** @exclusiveMin true */
   id: number;
}

export interface LeaderboardControllerGetLeaderboardScoresByIdParams {
   /**
    * Page number
    * @exclusiveMin true
    * @default 1
    */
   page?: number;
   /**
    * Items per page (max: 100)
    * @min 1
    * @max 100
    * @default 12
    */
   limit?: number;
   /** Score pivot mode. player centers results around the authenticated viewer; friends limits to friends */
   pivot?: 'player' | 'friends';
   /**
    * Score country scope. Use country for the authenticated viewer country, region for the authenticated viewer region, or comma-separated country codes such as US,CA
    * @maxLength 128
    */
   scope?: string;
   /** Exclude scores submitted with the NA modifier */
   hideNA?: string;
   /**
    * Search by player name (min 3 chars)
    * @minLength 3
    * @maxLength 32
    */
   search?: string;
   /**
    * Sort field (default: score)
    * @default "score"
    */
   sort?: 'score' | 'timeSet';
   /**
    * Sort direction (default: desc)
    * @default "desc"
    */
   sortDirection?: 'asc' | 'desc';
   /**
    * Realm ID (defaults to the active realm)
    * @min 0
    */
   realmId?: number;
   /** @exclusiveMin true */
   id: number;
}

export interface LeaderboardControllerGetDifficultiesForHashParams {
   /**
    * Realm ID (defaults to the active realm)
    * @min 0
    */
   realmId?: number;
   /**
    * @minLength 1
    * @maxLength 40
    */
   hash: string;
}

export interface LeaderboardControllerGetLeaderboardByHashParams {
   /**
    * Realm ID (defaults to the active realm)
    * @min 0
    */
   realmId?: number;
   /**
    * @minLength 1
    * @maxLength 40
    */
   hash: string;
   /**
    * @minLength 1
    * @maxLength 64
    */
   mode: string;
   /** @exclusiveMin true */
   difficulty: number;
}

export interface LeaderboardControllerGetLeaderboardScoresByHashParams {
   /**
    * Page number
    * @exclusiveMin true
    * @default 1
    */
   page?: number;
   /**
    * Items per page (max: 100)
    * @min 1
    * @max 100
    * @default 12
    */
   limit?: number;
   /** Score pivot mode. player centers results around the authenticated viewer; friends limits to friends */
   pivot?: 'player' | 'friends';
   /**
    * Score country scope. Use country for the authenticated viewer country, region for the authenticated viewer region, or comma-separated country codes such as US,CA
    * @maxLength 128
    */
   scope?: string;
   /** Exclude scores submitted with the NA modifier */
   hideNA?: string;
   /**
    * Search by player name (min 3 chars)
    * @minLength 3
    * @maxLength 32
    */
   search?: string;
   /**
    * Sort field (default: score)
    * @default "score"
    */
   sort?: 'score' | 'timeSet';
   /**
    * Sort direction (default: desc)
    * @default "desc"
    */
   sortDirection?: 'asc' | 'desc';
   /**
    * Realm ID (defaults to the active realm)
    * @min 0
    */
   realmId?: number;
   /**
    * Include the authenticated player's score in playerScore
    * @default false
    */
   includePlayerScore?: string;
   /**
    * @minLength 1
    * @maxLength 40
    */
   hash: string;
   /**
    * @minLength 1
    * @maxLength 64
    */
   mode: string;
   /** @exclusiveMin true */
   difficulty: number;
}

export interface LiveTournamentControllerCreateTournamentPayload {
   /**
    * @minLength 1
    * @maxLength 128
    */
   name: string;
   /** @minItems 1 */
   staffPermissions?: (
      | 'VIEW_TOURNAMENT'
      | 'EDIT_TOURNAMENT_SETTINGS'
      | 'EDIT_TOURNAMENT_ROLES'
      | 'ASSIGN_TOURNAMENT_ROLES'
      | 'SYNC_TOURNAMENT_PLAYERS'
      | 'MANAGE_MATCH_ROOMS'
      | 'COORDINATE_MATCHES'
      | 'CAST_MATCHES'
   )[];
}

export interface LiveTournamentControllerGetSettingsParams {
   /**
    * @minLength 1
    * @maxLength 64
    */
   tournamentId: string;
}

export interface LiveTournamentControllerUpsertSettingsPayload {
   /**
    * @minLength 1
    * @maxLength 128
    */
   name?: string;
   status?: 'DRAFT' | 'ACTIVE' | 'ARCHIVED';
   /** @maxItems 256 */
   deniedMods?: string[];
}

export interface LiveTournamentControllerUpsertSettingsParams {
   /**
    * @minLength 1
    * @maxLength 64
    */
   tournamentId: string;
}

export interface LivePlayerControllerListPlayerRoomsParams {
   /**
    * @minLength 1
    * @maxLength 64
    */
   tournamentId: string;
}

export interface LivePlayerControllerGetPlayerRoomParams {
   /**
    * @minLength 1
    * @maxLength 64
    */
   tournamentId: string;
   /**
    * @minLength 1
    * @maxLength 128
    */
   matchId: string;
}

export interface LivePlayerControllerGetPlayerRoomByInviteCodeParams {
   /** @pattern ^\d{4}$ */
   inviteCode: string;
}

export interface LiveTournamentRosterControllerListRolesParams {
   /**
    * @minLength 1
    * @maxLength 64
    */
   tournamentId: string;
}

export interface LiveTournamentRosterControllerUpsertRolePayload {
   /** @exclusiveMin true */
   id?: number;
   /**
    * @minLength 1
    * @maxLength 64
    */
   name: string;
   /** @maxLength 512 */
   description?: string | null;
   /** @maxLength 16 */
   color?: string | null;
   order?: number;
   /** @minItems 1 */
   permissions: (
      | 'VIEW_TOURNAMENT'
      | 'EDIT_TOURNAMENT_SETTINGS'
      | 'EDIT_TOURNAMENT_ROLES'
      | 'ASSIGN_TOURNAMENT_ROLES'
      | 'SYNC_TOURNAMENT_PLAYERS'
      | 'MANAGE_MATCH_ROOMS'
      | 'COORDINATE_MATCHES'
      | 'CAST_MATCHES'
   )[];
}

export interface LiveTournamentRosterControllerUpsertRoleParams {
   /**
    * @minLength 1
    * @maxLength 64
    */
   tournamentId: string;
}

export interface LiveTournamentRosterControllerDeleteRoleParams {
   /**
    * @minLength 1
    * @maxLength 64
    */
   tournamentId: string;
   /** @exclusiveMin true */
   roleId: number;
}

export interface LiveTournamentRosterControllerAssignRolePayload {
   /** @pattern ^\d+$ */
   playerId: string;
}

export interface LiveTournamentRosterControllerAssignRoleParams {
   /**
    * @minLength 1
    * @maxLength 64
    */
   tournamentId: string;
   /** @exclusiveMin true */
   roleId: number;
}

export interface LiveTournamentRosterControllerUnassignRoleParams {
   /**
    * @minLength 1
    * @maxLength 64
    */
   tournamentId: string;
   /** @exclusiveMin true */
   roleId: number;
   /** @pattern ^\d+$ */
   playerId: string;
}

export interface LiveTournamentRosterControllerListTeamsParams {
   /**
    * @minLength 1
    * @maxLength 64
    */
   tournamentId: string;
}

export interface LiveTournamentRosterControllerUpsertTeamPayload {
   /** @exclusiveMin true */
   id?: number;
   /**
    * @minLength 1
    * @maxLength 64
    */
   name: string;
}

export interface LiveTournamentRosterControllerUpsertTeamParams {
   /**
    * @minLength 1
    * @maxLength 64
    */
   tournamentId: string;
}

export interface LiveTournamentRosterControllerDeleteTeamParams {
   /**
    * @minLength 1
    * @maxLength 64
    */
   tournamentId: string;
   /** @exclusiveMin true */
   teamId: number;
}

export interface LiveTournamentRosterControllerListAuthorizedPlayersParams {
   /**
    * @minLength 1
    * @maxLength 64
    */
   tournamentId: string;
}

export interface LiveTournamentRosterControllerSyncAuthorizedPlayersPayload {
   players: {
      /** @pattern ^\d+$ */
      playerId: string;
      /** @exclusiveMin true */
      teamId?: number | null;
   }[];
}

export interface LiveTournamentRosterControllerSyncAuthorizedPlayersParams {
   /**
    * @minLength 1
    * @maxLength 64
    */
   tournamentId: string;
}

export interface LiveMatchRoomControllerListRoomsParams {
   /**
    * @minLength 1
    * @maxLength 64
    */
   tournamentId: string;
}

export interface LiveMatchRoomControllerUpsertRoomPayload {
   /**
    * @minLength 1
    * @maxLength 128
    */
   matchId: string;
   rosterMode?: 'TEAM' | 'FLAT';
   members?: {
      /**
       * @minLength 1
       * @maxLength 64
       */
      playerId: string;
      role?: 'PLAYER' | 'VIEWER';
   }[];
   activePlayerIds?: string[];
}

export interface LiveMatchRoomControllerUpsertRoomParams {
   /**
    * @minLength 1
    * @maxLength 64
    */
   tournamentId: string;
}

export interface LiveMatchRoomControllerGetRoomsViewParams {
   /**
    * @minLength 1
    * @maxLength 64
    */
   tournamentId: string;
}

export interface LiveMatchRoomControllerGetRoomViewParams {
   /**
    * @minLength 1
    * @maxLength 64
    */
   tournamentId: string;
   /**
    * @minLength 1
    * @maxLength 128
    */
   matchId: string;
}

export interface LiveMatchRoomControllerSetRoomMembersPayload {
   members: {
      /**
       * @minLength 1
       * @maxLength 64
       */
      playerId: string;
      role?: 'PLAYER' | 'VIEWER';
   }[];
   activePlayerIds?: string[];
   rosterMode?: 'TEAM' | 'FLAT';
}

export interface LiveMatchRoomControllerSetRoomMembersParams {
   /**
    * @minLength 1
    * @maxLength 64
    */
   tournamentId: string;
   /**
    * @minLength 1
    * @maxLength 128
    */
   matchId: string;
}

export interface LiveMatchRoomControllerSetRoomSongPayload {
   /** @exclusiveMin true */
   mapId?: number | null;
   /** @exclusiveMin true */
   leaderboardId?: number | null;
   difficulty?: 'Easy' | 'Normal' | 'Hard' | 'Expert' | 'ExpertPlus';
   characteristic?: 'Standard' | 'Lawless' | 'OneSaber' | 'NoArrows' | 'NinetyDegree' | 'ThreeSixtyDegree' | 'Lightshow';
}

export interface LiveMatchRoomControllerSetRoomSongParams {
   /**
    * @minLength 1
    * @maxLength 64
    */
   tournamentId: string;
   /**
    * @minLength 1
    * @maxLength 128
    */
   matchId: string;
}

export interface LiveMatchRoomControllerCloseRoomParams {
   /**
    * @minLength 1
    * @maxLength 64
    */
   tournamentId: string;
   /**
    * @minLength 1
    * @maxLength 128
    */
   matchId: string;
}

export interface LiveMatchRoomControllerDeleteRoomParams {
   /**
    * @minLength 1
    * @maxLength 64
    */
   tournamentId: string;
   /**
    * @minLength 1
    * @maxLength 128
    */
   matchId: string;
}

export interface LiveMatchCommandControllerStartMapPayload {
   /** @default false */
   withSync?: boolean;
   /**
    * @min 0
    * @max 120000
    * @default 10000
    */
   countdownMs?: number;
   /** @default false */
   forceStart?: boolean;
}

export interface LiveMatchCommandControllerStartMapParams {
   /**
    * @minLength 1
    * @maxLength 64
    */
   tournamentId: string;
   /**
    * @minLength 1
    * @maxLength 128
    */
   matchId: string;
}

export interface LiveMatchCommandControllerReturnToMenuParams {
   /**
    * @minLength 1
    * @maxLength 64
    */
   tournamentId: string;
   /**
    * @minLength 1
    * @maxLength 128
    */
   matchId: string;
}

export interface LiveMatchCommandControllerPromptPayload {
   playerIds: string[];
   /**
    * @minLength 1
    * @maxLength 128
    */
   title?: string;
   /**
    * @minLength 1
    * @maxLength 512
    */
   message: string;
   /**
    * @minLength 1
    * @maxLength 32
    */
   primaryText?: string;
   /**
    * @minLength 1
    * @maxLength 32
    */
   secondaryText?: string;
   /** @exclusiveMin true */
   timeoutMs?: number;
}

export interface LiveMatchCommandControllerPromptParams {
   /**
    * @minLength 1
    * @maxLength 64
    */
   tournamentId: string;
   /**
    * @minLength 1
    * @maxLength 128
    */
   matchId: string;
}

export interface LiveMatchCommandControllerBottifyPlayerPayload {
   /** @default true */
   autoReady?: boolean;
   /** @default false */
   erratic?: boolean;
}

export interface LiveMatchCommandControllerBottifyPlayerParams {
   /**
    * @minLength 1
    * @maxLength 64
    */
   tournamentId: string;
   /**
    * @minLength 1
    * @maxLength 128
    */
   matchId: string;
   /** @pattern ^\d+$ */
   playerId: string;
}

export interface LiveMatchCommandControllerUnbottifyPlayerParams {
   /**
    * @minLength 1
    * @maxLength 64
    */
   tournamentId: string;
   /**
    * @minLength 1
    * @maxLength 128
    */
   matchId: string;
   /** @pattern ^\d+$ */
   playerId: string;
}

export interface LiveMatchCommandControllerFollowRoomPayload {
   /**
    * @minLength 1
    * @maxLength 128
    */
   matchId: string;
}

export interface LiveMatchCommandControllerFollowRoomParams {
   /**
    * @minLength 1
    * @maxLength 64
    */
   tournamentId: string;
}

export interface MapControllerGetMapListingsParams {
   /**
    * Page number
    * @exclusiveMin true
    * @default 1
    */
   page?: number;
   /**
    * Items per page (max: 100)
    * @min 1
    * @max 100
    * @default 14
    */
   limit?: number;
   /**
    * Filter by status. accepts a single value or comma-separated values
    * @minItems 1
    */
   status?: ('UNRANKED' | 'RANKED' | 'QUALIFIED' | 'LOVED')[];
   /** Verified maps only */
   verified?: string;
   /**
    * Minimum star rating (across any difficulty)
    * @min 0
    */
   minStars?: number;
   /**
    * Maximum star rating (across any difficulty)
    * @min 0
    */
   maxStars?: number;
   /**
    * Search by song name, author, mapper, map hash, or map identifier
    * @minLength 1
    * @maxLength 64
    */
   search?: string;
   /** Sort field */
   sortBy?: 'createdAt' | 'latestRankedAt' | 'highestStars' | 'totalScores' | 'trending';
   /**
    * Sort direction
    * @default "desc"
    */
   sortDirection?: 'asc' | 'desc';
   /**
    * Realm ID (defaults to the active realm)
    * @min 0
    */
   realmId?: number;
}

export interface MapControllerGetMapByHashParams {
   /**
    * Realm ID (defaults to the active realm)
    * @min 0
    */
   realmId?: number;
   /**
    * @minLength 1
    * @maxLength 40
    */
   hash: string;
}

export interface MapControllerGetMapByIdParams {
   /**
    * Realm ID (defaults to the active realm)
    * @min 0
    */
   realmId?: number;
   /** @exclusiveMin true */
   id: number;
}

export interface AuthControllerSteamLoginParams {
   intent?: 'login' | 'merge';
   /**
    * Frontend origin to use as OpenID realm and return_to base
    * @format uri
    */
   returnUrl?: string;
   /**
    * URL to redirect the user to after successful authentication
    * @format uri
    */
   redirectTo?: string;
}

export interface AuthControllerPatreonLoginParams {
   intent?: 'login' | 'link';
   /**
    * URL to redirect the user to after authentication
    * @format uri
    */
   redirectTo?: string;
}

export interface AuthControllerPatreonCallbackParams {
   /**
    * Patreon OAuth authorization code
    * @minLength 1
    */
   code?: string;
   /**
    * Patreon OAuth state
    * @minLength 1
    */
   state?: string;
}

export interface AuthControllerDiscordLoginParams {
   intent?: 'login' | 'link';
   /**
    * URL to redirect the user to after authentication
    * @format uri
    */
   redirectTo?: string;
}

export interface AuthControllerDiscordCallbackParams {
   /**
    * Discord OAuth authorization code
    * @minLength 1
    */
   code?: string;
   /**
    * Discord OAuth state
    * @minLength 1
    */
   state?: string;
}

export interface AuthControllerStartEmailLoginPayload {
   /**
    * Email address to send the one-time code to
    * @format email
    * @pattern ^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$
    */
   email: string;
}

export interface AuthControllerVerifyEmailLoginPayload {
   /** @minLength 1 */
   challengeId: string;
   /**
    * Six digit one-time code
    * @pattern ^\d{6}$
    */
   code: string;
}

export interface PasswordAuthControllerStartSignupPayload {
   /**
    * Email address to send the one-time code to
    * @format email
    * @pattern ^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$
    */
   email: string;
}

export interface PasswordAuthControllerCompleteSignupPayload {
   /**
    * @format email
    * @pattern ^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$
    */
   email: string;
   /** @minLength 1 */
   challengeId: string;
   /**
    * Six digit one-time code
    * @pattern ^\d{6}$
    */
   code: string;
   /**
    * Account password
    * @minLength 10
    * @maxLength 128
    */
   password: string;
   /**
    * Public display name; never a login identifier
    * @minLength 1
    * @maxLength 128
    */
   displayName: string;
}

export interface PasswordAuthControllerLoginWithPasswordPayload {
   /**
    * @format email
    * @pattern ^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$
    */
   email: string;
   /**
    * @minLength 1
    * @maxLength 128
    */
   password: string;
}

export interface PasswordAuthControllerStartPasswordResetPayload {
   /**
    * Email address to send the one-time code to
    * @format email
    * @pattern ^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$
    */
   email: string;
}

export interface PasswordAuthControllerCompletePasswordResetPayload {
   /**
    * @format email
    * @pattern ^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$
    */
   email: string;
   /** @minLength 1 */
   challengeId: string;
   /**
    * Six digit one-time code
    * @pattern ^\d{6}$
    */
   code: string;
   /**
    * Account password
    * @minLength 10
    * @maxLength 128
    */
   password: string;
}

export interface PasswordAuthControllerStartPasswordSetupPayload {
   /**
    * Email address to send the one-time code to
    * @format email
    * @pattern ^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$
    */
   email: string;
}

export interface PasswordAuthControllerCompletePasswordSetupPayload {
   /**
    * @format email
    * @pattern ^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$
    */
   email: string;
   /** @minLength 1 */
   challengeId: string;
   /**
    * Six digit one-time code
    * @pattern ^\d{6}$
    */
   code: string;
   /**
    * Account password
    * @minLength 10
    * @maxLength 128
    */
   password: string;
}

export interface PasswordAuthControllerChangePasswordPayload {
   /**
    * @minLength 1
    * @maxLength 128
    */
   currentPassword: string;
   /**
    * Account password
    * @minLength 10
    * @maxLength 128
    */
   newPassword: string;
}

export interface PasskeyControllerVerifyRegistrationPayload {
   /** WebAuthn registration response from the browser */
   response: any;
   /**
    * Friendly name for this passkey
    * @minLength 1
    * @maxLength 128
    */
   label?: string;
}

export interface PasskeyControllerVerifyAuthenticationPayload {
   /** @minLength 1 */
   sessionId: string;
   /** WebAuthn authentication response from the browser */
   response: any;
}

export interface PasskeyControllerRenamePasskeyPayload {
   /**
    * @minLength 1
    * @maxLength 128
    */
   label: string;
}

export interface PasskeyControllerRenamePasskeyParams {
   /** @exclusiveMin true */
   id: number;
}

export interface PasskeyControllerDeletePasskeyParams {
   /** @exclusiveMin true */
   id: number;
}

export interface OAuthControllerGetAuthorizeInfoParams {
   /**
    * OAuth client id
    * @minLength 1
    */
   client_id: string;
   /**
    * Exact registered redirect URI
    * @minLength 1
    */
   redirect_uri: string;
   /**
    * Space-separated scopes
    * @minLength 1
    * @default "identity"
    */
   scope?: string;
   /**
    * PKCE S256 code challenge
    * @minLength 43
    * @maxLength 128
    */
   code_challenge: string;
   code_challenge_method: 'S256';
}

export interface OAuthControllerApproveAuthorizationPayload {
   /**
    * OAuth client id
    * @minLength 1
    */
   client_id: string;
   /**
    * Exact registered redirect URI
    * @minLength 1
    */
   redirect_uri: string;
   /**
    * Space-separated scopes
    * @minLength 1
    * @default "identity"
    */
   scope?: string;
   /**
    * PKCE S256 code challenge
    * @minLength 43
    * @maxLength 128
    */
   code_challenge: string;
   code_challenge_method: 'S256';
   /** @maxLength 512 */
   state?: string;
}

export interface OAuthControllerTokenPayload {
   /** authorization_code or refresh_token */
   grant_type: string;
   /** @minLength 1 */
   client_id: string;
   /**
    * OAuth client secret
    * @minLength 1
    */
   client_secret?: string;
   code?: string;
   redirect_uri?: string;
   /** PKCE code verifier */
   code_verifier?: string;
   refresh_token?: string;
}

export interface OAuthClientControllerCreateClientPayload {
   /**
    * @minLength 3
    * @maxLength 128
    */
   name: string;
   /** @maxLength 512 */
   description?: string;
   /**
    * @maxItems 10
    * @minItems 1
    */
   redirectUris: string[];
   allowedScopes?: ('identity' | 'identity.providers')[];
}

export interface OAuthClientControllerUpdateClientPayload {
   /**
    * @minLength 3
    * @maxLength 128
    */
   name?: string;
   /** @maxLength 512 */
   description?: string | null;
   /**
    * @maxItems 10
    * @minItems 1
    */
   redirectUris?: string[];
   allowedScopes?: ('identity' | 'identity.providers')[];
}

export interface OAuthClientControllerUpdateClientParams {
   /** @exclusiveMin true */
   id: number;
}

export interface OAuthClientControllerRevokeClientParams {
   /** @exclusiveMin true */
   id: number;
}

export interface OAuthClientControllerRotateSecretParams {
   /** @exclusiveMin true */
   id: number;
}

export interface GameControllerAuthenticatePayload {
   /** Auth type (0=Steam, 1=Oculus, 2=Quest key, 3=Dev, 4=Device code) */
   at: number;
   /**
    * Player platform ID
    * @pattern ^\d+$
    * @example "76561199471863419"
    */
   playerId: string;
   /**
    * Auth nonce
    * @minLength 1
    */
   nonce: string;
   /**
    * Comma-separated friend IDs
    * @default ""
    */
   friends?: string;
   /**
    * Player display name
    * @default ""
    */
   name?: string;
   /**
    * Official client build ID
    * @maxLength 128
    */
   clientBuildId?: string;
   /**
    * Upload protocol version
    * @exclusiveMin true
    */
   uploadProtocolVersion?: number;
   /**
    * Client plugin version
    * @maxLength 32
    */
   pluginVersion?: string;
   /**
    * Beat Saber game version
    * @maxLength 32
    */
   gameVersion?: string;
   /**
    * Upload version hash / infoHash
    * @maxLength 36
    */
   uploadVersionHash?: string;
   /** Client trust path */
   clientKind?: 'official' | 'development' | 'legacy';
   /**
    * Optional client telemetry/proof blob
    * @maxLength 4096
    */
   clientProof?: string;
   /**
    * Development upload credential
    * @maxLength 256
    */
   devUploadToken?: string;
   /**
    * Self-reported client artifact SHA-256
    * @maxLength 64
    */
   artifactSha256?: string;
}

/** Multipart score upload. */
export interface GameControllerUploadScorePayload {
   /** Encrypted score payload string. */
   data: string;
   /**
    * Replay binary file data.
    * @format binary
    */
   zr: File;
}

export interface GameControllerSetActiveRealmsPayload {
   /**
    * Realm IDs to upload scores to
    * @minItems 1
    */
   activeRealmIds: number[];
}

export interface GameBuildControllerRegisterOfficialBuildPayload {
   /**
    * @minLength 1
    * @maxLength 128
    */
   buildId: string;
   /**
    * @minLength 1
    * @maxLength 32
    */
   pluginVersion: string;
   /**
    * @minLength 1
    * @maxLength 32
    */
   gameVersion: string;
   /**
    * @minLength 1
    * @maxLength 36
    */
   uploadVersionHash: string;
   /** @default "pc" */
   platform?: 'pc' | 'quest';
   /** @maxItems 32 */
   supportedVersions?: {
      /**
       * @minLength 1
       * @maxLength 32
       */
      gameVersion: string;
      /**
       * @minLength 1
       * @maxLength 36
       */
      uploadVersionHash: string;
      platform?: 'pc' | 'quest';
   }[];
   protocolVersion: 2;
   /** @pattern ^[a-f0-9]{40}$ */
   commitSha: string;
   /**
    * @minLength 1
    * @maxLength 128
    */
   sourceRepository: string;
   /**
    * @minLength 1
    * @maxLength 256
    */
   sourceRef: string;
   /**
    * @minLength 1
    * @maxLength 512
    */
   sourceWorkflowRef: string;
   /** @maxLength 128 */
   sourceEnvironment?: string | null;
   /** @pattern ^[a-f0-9]{64}$ */
   artifactSha256?: string | null;
   /**
    * @format uri
    * @maxLength 1024
    */
   artifactUrl?: string | null;
}

export interface RankingControllerGetRequestsParams {
   /**
    * Page number
    * @exclusiveMin true
    * @default 1
    */
   page?: number;
   /**
    * Items per page (max: 50)
    * @min 1
    * @max 50
    * @default 10
    */
   limit?: number;
   /**
    * Realm ID (defaults to the active realm)
    * @min 0
    */
   realmId?: number;
}

export interface RankingControllerCreateRequestPayload {
   /**
    * Map ID to request ranking for
    * @exclusiveMin true
    */
   mapId: number;
   /**
    * Request description
    * @minLength 1
    * @maxLength 4096
    */
   description: string;
   /**
    * Leaderboard IDs to include
    * @minItems 1
    */
   leaderboardIds: number[];
   /**
    * Realm ID (defaults to the active realm)
    * @min 0
    */
   realmId?: number;
}

export interface RankingControllerGetRequestByIdParams {
   /**
    * Realm ID (defaults to the active realm)
    * @min 0
    */
   realmId?: number;
   /** @exclusiveMin true */
   id: number;
}

export interface RankingControllerReplaceRequestPayload {
   /**
    * Map ID
    * @exclusiveMin true
    */
   mapId: number;
   /**
    * Updated request description
    * @minLength 1
    * @maxLength 4096
    */
   description: string;
   /**
    * Leaderboard IDs
    * @minItems 1
    */
   leaderboardIds: number[];
   /**
    * Realm ID (defaults to the active realm)
    * @min 0
    */
   realmId?: number;
}

export interface RankingControllerReplaceRequestParams {
   /** @exclusiveMin true */
   id: number;
}

export interface RankingControllerCreateUnrankRequestPayload {
   /**
    * Map ID to request unranking for
    * @exclusiveMin true
    */
   mapId: number;
   /**
    * Request description
    * @minLength 1
    * @maxLength 4096
    */
   description: string;
   /**
    * Leaderboard IDs to include
    * @minItems 1
    */
   leaderboardIds: number[];
   /**
    * Realm ID (defaults to the active realm)
    * @min 0
    */
   realmId?: number;
}

export interface RankingControllerRtVotePayload {
   /** Vote value */
   vote: 'UPVOTE' | 'DOWNVOTE';
   /**
    * Realm ID (defaults to the active realm)
    * @min 0
    */
   realmId?: number;
}

export interface RankingControllerRtVoteParams {
   /** @exclusiveMin true */
   id: number;
}

export interface RankingControllerRtCommentPayload {
   /**
    * Comment text
    * @minLength 1
    * @maxLength 4096
    */
   comment: string;
   /**
    * Realm ID (defaults to the active realm)
    * @min 0
    */
   realmId?: number;
}

export interface RankingControllerRtCommentParams {
   /** @exclusiveMin true */
   id: number;
}

export interface RankingControllerQatVotePayload {
   /** Vote value */
   vote: 'UPVOTE' | 'DOWNVOTE' | 'NEUTRAL';
   /**
    * Realm ID (defaults to the active realm)
    * @min 0
    */
   realmId?: number;
}

export interface RankingControllerQatVoteParams {
   /** @exclusiveMin true */
   id: number;
}

export interface RankingControllerQatCommentPayload {
   /**
    * Comment text
    * @minLength 1
    * @maxLength 4096
    */
   comment: string;
   /**
    * Realm ID (defaults to the active realm)
    * @min 0
    */
   realmId?: number;
}

export interface RankingControllerQatCommentParams {
   /** @exclusiveMin true */
   id: number;
}

export interface RankingControllerRtDeleteCommentParams {
   /**
    * Realm ID (defaults to the active realm)
    * @min 0
    */
   realmId?: number;
   /** @exclusiveMin true */
   id: number;
   /** @exclusiveMin true */
   commentId: number;
}

export interface RankingControllerRtEditCommentPayload {
   /**
    * Comment text
    * @minLength 1
    * @maxLength 4096
    */
   comment: string;
   /**
    * Realm ID (defaults to the active realm)
    * @min 0
    */
   realmId?: number;
}

export interface RankingControllerRtEditCommentParams {
   /** @exclusiveMin true */
   id: number;
   /** @exclusiveMin true */
   commentId: number;
}

export interface RankingControllerQatDeleteCommentParams {
   /**
    * Realm ID (defaults to the active realm)
    * @min 0
    */
   realmId?: number;
   /** @exclusiveMin true */
   id: number;
   /** @exclusiveMin true */
   commentId: number;
}

export interface RankingControllerQatEditCommentPayload {
   /**
    * Comment text
    * @minLength 1
    * @maxLength 4096
    */
   comment: string;
   /**
    * Realm ID (defaults to the active realm)
    * @min 0
    */
   realmId?: number;
}

export interface RankingControllerQatEditCommentParams {
   /** @exclusiveMin true */
   id: number;
   /** @exclusiveMin true */
   commentId: number;
}

export interface RankingControllerQualifyPayload {
   /**
    * Realm ID (defaults to the active realm)
    * @min 0
    */
   realmId?: number;
   /**
    * Limit the action to one leaderboard
    * @exclusiveMin true
    */
   leaderboardId?: number;
}

export interface RankingControllerQualifyParams {
   /** @exclusiveMin true */
   id: number;
}

export interface RankingControllerDenyPayload {
   /**
    * Realm ID (defaults to the active realm)
    * @min 0
    */
   realmId?: number;
   /**
    * Limit the action to one leaderboard
    * @exclusiveMin true
    */
   leaderboardId?: number;
}

export interface RankingControllerDenyParams {
   /** @exclusiveMin true */
   id: number;
}

export interface RankingControllerApprovePayload {
   /**
    * Realm ID (defaults to the active realm)
    * @min 0
    */
   realmId?: number;
   /**
    * Limit the action to one leaderboard
    * @exclusiveMin true
    */
   leaderboardId?: number;
}

export interface RankingControllerApproveParams {
   /** @exclusiveMin true */
   id: number;
}

export interface ScoreControllerGetScoreParams {
   /**
    * Realm ID (defaults to the active realm)
    * @min 0
    */
   realmId?: number;
   /**
    * Include detailed replay statistics
    * @default true
    */
   includeScoreStats?: string;
   /** @exclusiveMin true */
   id: number;
}

export interface ScoreControllerGetScoreHistoryParams {
   /**
    * Realm ID (defaults to the active realm)
    * @min 0
    */
   realmId?: number;
   /**
    * Page number
    * @exclusiveMin true
    * @default 1
    */
   page?: number;
   /**
    * Items per page (max: 100)
    * @min 1
    * @max 100
    * @default 20
    */
   limit?: number;
   /**
    * Filter by play outcome. accepts a single value or comma-separated values
    * @minItems 1
    */
   outcomes?: ('CLEAR' | 'FAIL' | 'QUIT' | 'RESTART')[];
   /** Exclude personal best attempts */
   excludePersonalBest?: string;
   /** @exclusiveMin true */
   id: number;
}

export interface ScoreControllerDownloadReplayParams {
   /** @exclusiveMin true */
   id: number;
}

export interface ScoreControllerGetScoreStatsParams {
   /** @exclusiveMin true */
   id: number;
}

export interface AdminBadgeControllerCreateBadgePayload {
   /** @format binary */
   image: File;
   /**
    * @minLength 1
    * @maxLength 128
    */
   description: string;
}

export interface AdminBadgeControllerUpdateBadgePayload {
   /** @format binary */
   image?: File;
   /**
    * @minLength 1
    * @maxLength 128
    */
   description?: string;
}

export interface AdminBadgeControllerUpdateBadgeParams {
   /** @exclusiveMin true */
   id: number;
}

export interface AdminBadgeControllerDeleteBadgeParams {
   /** @exclusiveMin true */
   id: number;
}

export interface AdminBadgeControllerGetPlayerBadgesParams {
   playerId: string;
}

export interface AdminBadgeControllerReplacePlayerBadgesPayload {
   /** @maxItems 1000 */
   badges: {
      /** @exclusiveMin true */
      badgeId: number;
      /** @maxLength 256 */
      descriptionOverride: string | null;
   }[];
}

export interface AdminBadgeControllerReplacePlayerBadgesParams {
   playerId: string;
}

export interface AdminBadgeControllerAssignBadgeParams {
   /**
    * Badge description override
    * @minLength 1
    * @maxLength 256
    */
   description?: string;
   /** @exclusiveMin true */
   id: number;
   playerId: string;
}

export interface AdminBadgeControllerUnassignBadgeParams {
   /** @exclusiveMin true */
   id: number;
   playerId: string;
}

export interface AdminLeaderboardControllerRankLeaderboardPayload {
   /**
    * Maximum PP value for the leaderboard
    * @min 0
    * @exclusiveMin true
    */
   maxPP: number;
}

export interface AdminLeaderboardControllerRankLeaderboardParams {
   /**
    * Realm ID (defaults to the active realm)
    * @min 0
    */
   realmId?: number;
   /** @exclusiveMin true */
   id: number;
}

export interface AdminLeaderboardControllerUnrankLeaderboardParams {
   /**
    * Realm ID (defaults to the active realm)
    * @min 0
    */
   realmId?: number;
   /** @exclusiveMin true */
   id: number;
}

export interface AdminLeaderboardControllerRecalculatePPParams {
   /**
    * Realm ID (defaults to the active realm)
    * @min 0
    */
   realmId?: number;
   /** @exclusiveMin true */
   id: number;
}

export interface AdminLeaderboardControllerSetManualPPPayload {
   /**
    * New maximum PP value
    * @min 0
    */
   maxPP: number;
}

export interface AdminLeaderboardControllerSetManualPPParams {
   /**
    * Realm ID (defaults to the active realm)
    * @min 0
    */
   realmId?: number;
   /** @exclusiveMin true */
   id: number;
}

export interface AdminLeaderboardControllerQualifyLeaderboardParams {
   /**
    * Realm ID (defaults to the active realm)
    * @min 0
    */
   realmId?: number;
   /** @exclusiveMin true */
   id: number;
}

export interface AdminLeaderboardControllerLoveLeaderboardParams {
   /**
    * Realm ID (defaults to the active realm)
    * @min 0
    */
   realmId?: number;
   /** @exclusiveMin true */
   id: number;
}

export interface AdminScoreControllerDeleteScoreParams {
   /** @exclusiveMin true */
   id: number;
}

export interface AdminUploadTrustControllerCreateDevelopmentCredentialPayload {
   /**
    * Developer public player ID
    * @pattern ^\d+$
    * @example "76561199471863419"
    */
   playerId: string;
   /**
    * Credential label
    * @minLength 1
    * @maxLength 128
    */
   label: string;
   /**
    * Optional expiry timestamp
    * @format date-time
    * @pattern ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
    */
   expiresAt?: Date | null;
}

export interface AdminUploadTrustControllerRevokeDevelopmentCredentialParams {
   /** @exclusiveMin true */
   id: number;
}

export interface AdminUploadTrustControllerRevokeOfficialBuildParams {
   /**
    * @minLength 1
    * @maxLength 128
    */
   buildId: string;
}

export interface AdminUploadTrustControllerAddOfficialBuildCompatibilityPayload {
   /**
    * Compatible source version override
    * @minLength 1
    * @maxLength 16
    */
   fromGameVersion?: string;
   /**
    * New Beat Saber game version to allow
    * @minLength 1
    * @maxLength 16
    */
   toGameVersion: string;
}

export interface AdminUserControllerBanPlayerPayload {
   /**
    * Ban reason
    * @minLength 1
    * @maxLength 256
    */
   reason: string;
   /**
    * Internal notes
    * @maxLength 512
    */
   notes?: string;
   /** Whether to auto-unban */
   autoUnban?: boolean;
   /**
    * Auto-unban date (ISO 8601)
    * @format date-time
    * @pattern ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
    */
   autoUnbansAt?: Date;
   /**
    * Earliest appeal date (ISO 8601)
    * @format date-time
    * @pattern ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
    */
   earliestAppealDate?: Date;
}

export interface AdminUserControllerBanPlayerParams {
   id: string;
}

export interface AdminUserControllerGetActiveBanParams {
   id: string;
}

export interface AdminUserControllerUnbanPlayerParams {
   id: string;
}

export interface AdminUserControllerSilencePlayerPayload {
   /**
    * Silence reason
    * @maxLength 256
    */
   reason: string;
   /**
    * Evidence or internal context
    * @maxLength 4096
    */
   evidence?: string;
}

export interface AdminUserControllerSilencePlayerParams {
   id: string;
}

export interface AdminUserControllerUnsilencePlayerParams {
   id: string;
}

export interface AdminUserControllerUpdateRoleTextPayload {
   /**
    * Role text override
    * @maxLength 128
    */
   roleText: string;
}

export interface AdminUserControllerUpdateRoleTextParams {
   id: string;
}

export interface AdminUserControllerAdminResetCountryPayload {
   /**
    * Country code
    * @minLength 2
    * @maxLength 2
    */
   country: string;
}

export interface AdminUserControllerAdminResetCountryParams {
   id: string;
}

export interface AdminUserControllerUpdatePermissionsPayload {
   /** Permission names to add */
   add?: string[];
   /** Permission names to remove */
   remove?: string[];
}

export interface AdminUserControllerUpdatePermissionsParams {
   id: string;
}

export interface AdminUserControllerMergePlayerPayload {
   /**
    * Public source player id to merge into this player
    * @pattern ^\d+$
    * @example "76561199471863419"
    */
   sourcePlayerId: string;
   /**
    * Support reason for the merge
    * @minLength 1
    * @maxLength 512
    */
   reason: string;
}

export interface AdminUserControllerMergePlayerParams {
   id: string;
}

export interface AdminUserControllerDeleteUserDataParams {
   id: string;
}

export interface AdminVersionControllerCreateVersionPayload {
   /**
    * Version hash
    * @maxLength 36
    */
   hash: string;
   /**
    * Version string
    * @maxLength 16
    */
   version: string;
   /**
    * Platform (e.g. PC, Quest)
    * @maxLength 16
    */
   platform: string;
   /**
    * Beat Saber game version
    * @maxLength 16
    */
   beatSaberVersion?: string | null;
   /** Whether this version is whitelisted */
   whitelisted: boolean;
   /**
    * Minimum upload protocol version
    * @exclusiveMin true
    */
   requiredUploadProtocolVersion?: number | null;
}

export interface AdminVersionControllerUpdateWhitelistPayload {
   /** Whitelist status */
   whitelisted: boolean;
}

export interface AdminVersionControllerUpdateWhitelistParams {
   /** @exclusiveMin true */
   id: number;
}

export interface AdminVersionControllerDeleteVersionParams {
   /** @exclusiveMin true */
   id: number;
}

export interface UserControllerClaimVanityPayload {
   /**
    * Desired vanity URL slug
    * @minLength 3
    * @maxLength 32
    */
   slug: string;
}

export interface UserControllerUpdatePinnedScoresPayload {
   /** @maxItems 6 */
   pinnedScores: {
      /** @exclusiveMin true */
      scoreId: number;
      /**
       * @maxLength 512
       * @default ""
       */
      comment?: string;
   }[];
}

export interface UserControllerUpdateProfileCustomizationPayload {
   /** @pattern ^#[0-9A-Fa-f]{6}$ */
   accentColor: string | null;
   /** @pattern ^#[0-9A-Fa-f]{6}$ */
   accentForegroundColor: string | null;
   /** @pattern ^#[0-9A-Fa-f]{6}$ */
   accentForegroundActiveColor: string | null;
   supporterNameColorEnabled: boolean;
   /** @maxItems 128 */
   badgeOrder: number[] | null;
   badgeComments: Record<string, string> | null;
   /** @maxItems 16 */
   statOrder: ('rankedPlays' | 'rankedScore' | 'rankedAcc' | 'plusOnePP' | 'totalPlays' | 'totalScore' | 'joined' | 'replayViews' | 'role')[] | null;
   /** @maxItems 16 */
   enabledStatIds:
      | ('rankedPlays' | 'rankedScore' | 'rankedAcc' | 'plusOnePP' | 'totalPlays' | 'totalScore' | 'joined' | 'replayViews' | 'role')[]
      | null;
   /** @maxItems 8 */
   chartMetricIds: ('rank' | 'totalPP' | 'averageAccuracy' | 'totalSubmittedPlays')[] | null;
   /** @maxItems 8 */
   sectionOrder: ('charts' | 'bio' | 'pinnedScores' | 'scores')[] | null;
}

export interface UserControllerUpdateProfileCustomizationStylePayload {
   /** @pattern ^#[0-9A-Fa-f]{6}$ */
   accentColor: string | null;
   /** @pattern ^#[0-9A-Fa-f]{6}$ */
   accentForegroundColor: string | null;
   /** @pattern ^#[0-9A-Fa-f]{6}$ */
   accentForegroundActiveColor: string | null;
   supporterNameColorEnabled: boolean;
}

export interface UserControllerUploadProfileCustomizationBackgroundPayload {
   /** @format binary */
   backgroundImage: File;
}

export interface UserControllerUpdateBioPayload {
   /**
    * Player bio
    * @maxLength 4096
    */
   bio: string;
}

export interface UserControllerUpdateNamePayload {
   /**
    * New display name
    * @minLength 1
    * @maxLength 128
    */
   name: string;
}

export interface UserControllerUpdateLiveSpectatingPayload {
   /** Opt out of public live presence outside tournaments */
   publicLivePresenceOptOut: boolean;
}

export interface UserControllerUploadAvatarPayload {
   /** @format binary */
   avatar: File;
}

export interface UserControllerClaimReplaySlotParams {
   /** @exclusiveMin true */
   scoreId: number;
}

export interface UserControllerReleaseReplaySlotParams {
   /** @exclusiveMin true */
   scoreId: number;
}

export interface UserControllerSwitchPrimaryConnectionPayload {
   /** Primary provider to expose publicly */
   provider: 'STEAM' | 'OCULUS' | 'SCORESABER';
}

export interface UserControllerStartOculusEmailMergePayload {
   /**
    * Email address to send the one-time code to
    * @format email
    * @pattern ^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$
    */
   email: string;
}

export interface UserControllerVerifyOculusEmailMergePayload {
   /** @minLength 1 */
   challengeId: string;
   /**
    * Six digit one-time code
    * @pattern ^\d{6}$
    */
   code: string;
}

export interface UserControllerGetAccountMergeChallengeParams {
   /** @minLength 1 */
   challengeId: string;
}

export interface UserControllerConfirmAccountMergeParams {
   /** @minLength 1 */
   challengeId: string;
}

export interface UserControllerRemoveConnectionParams {
   provider: 'STEAM' | 'OCULUS' | 'PATREON' | 'DISCORD';
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
   /** set parameter to `true` for call `securityWorker` for this request */
   secure?: boolean;
   /** request path */
   path: string;
   /** content type of request body */
   type?: ContentType;
   /** query params */
   query?: QueryParamsType;
   /** format of response (i.e. response.json() -> format: "json") */
   format?: ResponseFormat;
   /** request body */
   body?: unknown;
   /** base url */
   baseUrl?: string;
   /** request cancellation token */
   cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> {
   baseUrl?: string;
   baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
   securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
   customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
   data: D;
   error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
   Json = 'application/json',
   JsonApi = 'application/vnd.api+json',
   FormData = 'multipart/form-data',
   UrlEncoded = 'application/x-www-form-urlencoded',
   Text = 'text/plain'
}

export class HttpClient<SecurityDataType = unknown> {
   public baseUrl: string = '';
   private securityData: SecurityDataType | null = null;
   private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
   private abortControllers = new Map<CancelToken, AbortController>();
   private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

   private baseApiParams: RequestParams = {
      credentials: 'same-origin',
      headers: {},
      redirect: 'follow',
      referrerPolicy: 'no-referrer'
   };

   constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
      Object.assign(this, apiConfig);
   }

   public setSecurityData = (data: SecurityDataType | null) => {
      this.securityData = data;
   };

   protected encodeQueryParam(key: string, value: any) {
      const encodedKey = encodeURIComponent(key);
      return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`;
   }

   protected addQueryParam(query: QueryParamsType, key: string) {
      return this.encodeQueryParam(key, query[key]);
   }

   protected addArrayQueryParam(query: QueryParamsType, key: string) {
      const value = query[key];
      return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
   }

   protected toQueryString(rawQuery?: QueryParamsType): string {
      const query = rawQuery || {};
      const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key]);
      return keys.map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key))).join('&');
   }

   protected addQueryParams(rawQuery?: QueryParamsType): string {
      const queryString = this.toQueryString(rawQuery);
      return queryString ? `?${queryString}` : '';
   }

   private contentFormatters: Record<ContentType, (input: any) => any> = {
      [ContentType.Json]: (input: any) =>
         input !== null && (typeof input === 'object' || typeof input === 'string') ? JSON.stringify(input) : input,
      [ContentType.JsonApi]: (input: any) =>
         input !== null && (typeof input === 'object' || typeof input === 'string') ? JSON.stringify(input) : input,
      [ContentType.Text]: (input: any) => (input !== null && typeof input !== 'string' ? JSON.stringify(input) : input),
      [ContentType.FormData]: (input: any) => {
         if (input instanceof FormData) {
            return input;
         }

         return Object.keys(input || {}).reduce((formData, key) => {
            const property = input[key];
            formData.append(
               key,
               property instanceof Blob ? property : typeof property === 'object' && property !== null ? JSON.stringify(property) : `${property}`
            );
            return formData;
         }, new FormData());
      },
      [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input)
   };

   protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
      return {
         ...this.baseApiParams,
         ...params1,
         ...(params2 || {}),
         headers: {
            ...(this.baseApiParams.headers || {}),
            ...(params1.headers || {}),
            ...((params2 && params2.headers) || {})
         }
      };
   }

   protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
      if (this.abortControllers.has(cancelToken)) {
         const abortController = this.abortControllers.get(cancelToken);
         if (abortController) {
            return abortController.signal;
         }
         return void 0;
      }

      const abortController = new AbortController();
      this.abortControllers.set(cancelToken, abortController);
      return abortController.signal;
   };

   public abortRequest = (cancelToken: CancelToken) => {
      const abortController = this.abortControllers.get(cancelToken);

      if (abortController) {
         abortController.abort();
         this.abortControllers.delete(cancelToken);
      }
   };

   public request = async <T = any, E = any>({
      body,
      secure,
      path,
      type,
      query,
      format,
      baseUrl,
      cancelToken,
      ...params
   }: FullRequestParams): Promise<HttpResponse<T, E>> => {
      const secureParams =
         ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
            this.securityWorker &&
            (await this.securityWorker(this.securityData))) ||
         {};
      const requestParams = this.mergeRequestParams(params, secureParams);
      const queryString = query && this.toQueryString(query);
      const payloadFormatter = this.contentFormatters[type || ContentType.Json];
      const responseFormat = format || requestParams.format;

      return this.customFetch(`${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`, {
         ...requestParams,
         headers: {
            ...(requestParams.headers || {}),
            ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {})
         },
         signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
         body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body)
      }).then(async (response) => {
         const r = response as HttpResponse<T, E>;
         r.data = null as unknown as T;
         r.error = null as unknown as E;

         const responseToParse = responseFormat ? response.clone() : response;
         const data = !responseFormat
            ? r
            : await responseToParse[responseFormat]()
                 .then((data) => {
                    if (r.ok) {
                       r.data = data;
                    } else {
                       r.error = data;
                    }
                    return r;
                 })
                 .catch((e) => {
                    r.error = e;
                    return r;
                 });

         if (cancelToken) {
            this.abortControllers.delete(cancelToken);
         }

         if (!response.ok) throw data;
         return data;
      });
   };
}

/**
 * @title ScoreSaber API v2
 * @version 2.0
 * @contact
 *
 * ScoreSaber API v2 Documentation
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
   health = {
      /**
       * No description
       *
       * @tags Health
       * @name HealthControllerGetHealth
       * @request GET:/api/v2/health
       * @response `200` `void`
       */
      healthControllerGetHealth: (params: RequestParams = {}) =>
         this.request<void, any>({
            path: `/api/v2/health`,
            method: 'GET',
            ...params
         })
   };
   realm = {
      /**
 * No description
 *
 * @tags Realm
 * @name RealmControllerGetRealms
 * @request GET:/api/v2/realms
 * @response `200` `({
    id: number,
    name: string,
    startDate: string,
    endDate: string | null,
    isAcceptingScores: boolean,
    hasPP: boolean,
    hasHistory: boolean,
    decayFactor: number,

})[]` All realms
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 */
      realmControllerGetRealms: (params: RequestParams = {}) =>
         this.request<
            {
               id: number;
               name: string;
               startDate: string;
               endDate: string | null;
               isAcceptingScores: boolean;
               hasPP: boolean;
               hasHistory: boolean;
               decayFactor: number;
            }[],
            {
               statusCode: 401;
               error: 'Unauthorized';
               code: 'UNAUTHORIZED';
               message: string;
            }
         >({
            path: `/api/v2/realms`,
            method: 'GET',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Realm
 * @name RealmControllerGetRealmById
 * @request GET:/api/v2/realms/{id}
 * @response `200` `{
    id: number,
    name: string,
    startDate: string,
    endDate: string | null,
    isAcceptingScores: boolean,
    hasPP: boolean,
    hasHistory: boolean,
    decayFactor: number,
    leaderboardCount: number,
    playerCount: number,
    scoreCount: number,

}` Realm details
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      realmControllerGetRealmById: ({ id }: RealmControllerGetRealmByIdParams, params: RequestParams = {}) =>
         this.request<
            {
               id: number;
               name: string;
               startDate: string;
               endDate: string | null;
               isAcceptingScores: boolean;
               hasPP: boolean;
               hasHistory: boolean;
               decayFactor: number;
               leaderboardCount: number;
               playerCount: number;
               scoreCount: number;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/realms/${id}`,
            method: 'GET',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Realm
 * @name RealmControllerGetRealmPPCurve
 * @request GET:/api/v2/realms/{id}/pp-curve
 * @response `200` `{
    curve: (((number))[])[],
    positiveModifierCurve: (((number))[])[],

}` Realm PP curve
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      realmControllerGetRealmPPCurve: ({ id }: RealmControllerGetRealmPPCurveParams, params: RequestParams = {}) =>
         this.request<
            {
               curve: number[][];
               positiveModifierCurve: number[][];
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/realms/${id}/pp-curve`,
            method: 'GET',
            format: 'json',
            ...params
         })
   };
   player = {
      /**
 * No description
 *
 * @tags Player
 * @name PlayerControllerGetPlayers
 * @request GET:/api/v2/players
 * @response `200` `{
    data: ({
    id: string,
    name: string,
    playerNameInGame: string,
    country: string,
    role: string | null,
    avatar: string,
    avatarVersion: number,
    permissions: number,
    banned: boolean,
    silenced: boolean,
    inactive: boolean,
    stats: {
    realmId: number,
    realmName: string,
    rank: number,
    countryRank: number,
    rankChange: number | null,
    totalPP: number,
    plusOnePP: number | null,
    totalScore: string,
    totalRankedScore: string,
    totalPlayedLeaderboards: number,
    totalPlayedRankedLeaderboards: number,
    totalSubmittedPlays: number,
    totalReplayViews: number,
    averageAccuracy: number,
    weightedAverageAccuracy: number,
    completionAccuracy: number,
    device: {
    hmd: string | null,
    controllerLeft: string | null,
    controllerRight: string | null,

} | null,

},

})[],
    metadata: {
    page: number,
    itemsPerPage: number,
    totalItems: number,
    totalPages: number,

},

}` Paginated list of players
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      playerControllerGetPlayers: (query: PlayerControllerGetPlayersParams, params: RequestParams = {}) =>
         this.request<
            {
               data: {
                  id: string;
                  name: string;
                  playerNameInGame: string;
                  country: string;
                  role: string | null;
                  avatar: string;
                  avatarVersion: number;
                  permissions: number;
                  banned: boolean;
                  silenced: boolean;
                  inactive: boolean;
                  stats: {
                     realmId: number;
                     realmName: string;
                     rank: number;
                     countryRank: number;
                     rankChange: number | null;
                     totalPP: number;
                     plusOnePP: number | null;
                     totalScore: string;
                     totalRankedScore: string;
                     totalPlayedLeaderboards: number;
                     totalPlayedRankedLeaderboards: number;
                     totalSubmittedPlays: number;
                     totalReplayViews: number;
                     averageAccuracy: number;
                     weightedAverageAccuracy: number;
                     completionAccuracy: number;
                     device: {
                        hmd: string | null;
                        controllerLeft: string | null;
                        controllerRight: string | null;
                     } | null;
                  };
               }[];
               metadata: {
                  page: number;
                  itemsPerPage: number;
                  totalItems: number;
                  totalPages: number;
               };
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/players`,
            method: 'GET',
            query: query,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Player
 * @name PlayerControllerGetPlayerCount
 * @request GET:/api/v2/players/count
 * @response `200` `{
    count: number,

}` Total player count
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      playerControllerGetPlayerCount: (query: PlayerControllerGetPlayerCountParams, params: RequestParams = {}) =>
         this.request<
            {
               count: number;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/players/count`,
            method: 'GET',
            query: query,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Player
 * @name PlayerControllerGetLivePlayerIdAliases
 * @request GET:/api/v2/players/live-ids
 * @response `200` `({
  /** Primary public player id used across the site *\/
    playerId: string,
  /** Public id the player is connected to live presence with *\/
    livePlayerId: string,

})[]` Id aliases for players whose live presence connection id differs from their primary public player id
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      playerControllerGetLivePlayerIdAliases: (params: RequestParams = {}) =>
         this.request<
            {
               /** Primary public player id used across the site */
               playerId: string;
               /** Public id the player is connected to live presence with */
               livePlayerId: string;
            }[],
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/players/live-ids`,
            method: 'GET',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Player
 * @name PlayerControllerGetPlayerByVanity
 * @request GET:/api/v2/players/vanity/{slug}
 * @response `200` `{
    id: string,
    name: string,
    playerNameInGame: string,
    country: string,
    role: string | null,
    avatar: string,
    avatarVersion: number,
    permissions: number,
    banned: boolean,
    silenced: boolean,
    inactive: boolean,
    stats: {
    realmId: number,
    realmName: string,
    rank: number,
    countryRank: number,
    rankChange: number | null,
    totalPP: number,
    plusOnePP: number | null,
    totalScore: string,
    totalRankedScore: string,
    totalPlayedLeaderboards: number,
    totalPlayedRankedLeaderboards: number,
    totalSubmittedPlays: number,
    totalReplayViews: number,
    averageAccuracy: number,
    weightedAverageAccuracy: number,
    completionAccuracy: number,
    device: {
    hmd: string | null,
    controllerLeft: string | null,
    controllerRight: string | null,

} | null,

},
    bio: string | null,
    vanity: string | null,
    profileCustomization: {
    backgroundImage: string | null,
    backgroundImageVersion: number | null,
    accentColor: string | null,
    accentForegroundColor: string | null,
    accentForegroundActiveColor: string | null,
    supporterNameColorEnabled: boolean,
    badgeOrder: (number)[] | null,
    badgeComments: Record<string,string> | null,
    statOrder: ("rankedPlays" | "rankedScore" | "rankedAcc" | "plusOnePP" | "totalPlays" | "totalScore" | "joined" | "replayViews" | "role")[] | null,
    enabledStatIds: ("rankedPlays" | "rankedScore" | "rankedAcc" | "plusOnePP" | "totalPlays" | "totalScore" | "joined" | "replayViews" | "role")[] | null,
    chartMetricIds: ("rank" | "totalPP" | "averageAccuracy" | "totalSubmittedPlays")[] | null,
    sectionOrder: ("charts" | "bio" | "pinnedScores" | "scores")[] | null,

},
    createdAt: string,
    lastSeenAt: string,
    badges: ({
    id: number,
  /** @maxLength 32 *\/
    image: string,
  /** @maxLength 128 *\/
    description: string,

})[],
    pinnedScores: ({
    score: {
    score: {
    id: number,
    rank: number,
    unmodifiedScore: number,
    modifiedScore: number,
    accuracy: number,
    pp: number,
    weight: number,
    mods: (string)[],
    badCuts: number,
    missedNotes: number,
    maxCombo: number,
    fullCombo: boolean,
    hasReplay: boolean,
    replayViewCount?: number,
    personalBest: boolean,
    legacyHmdId: number | null,
    version: string | null,
    playOutcome: "CLEAR" | "FAIL" | "QUIT" | "RESTART",
    playOutcomeTime: number | null,
    createdAt: string,
    hasHistory?: boolean,
    player: {
    id: string,
    name: string,
    playerNameInGame: string,
    country: string,
    role: string | null,
    avatar: string,
    avatarVersion: number,
    permissions: number,

},
    device: {
    hmd: string | null,
    controllerLeft: string | null,
    controllerRight: string | null,

} | null,

},
    leaderboard: {
    id: number,
    map: {
    id: number,
    hash: string,
    bsid: string | null,
    songName: string,
    songSubName: string,
    songAuthorName: string,
    levelAuthorName: string,
    bpm: number,
    coverUrl: string,
    verified: boolean,

},
    difficulty: {
    id: number,
    difficulty: number,
    rawDifficulty: string,
    gameMode: string,

},
    maxScore: number,
    totalScores: number,
    dailyScores: number,
    createdAt: string,
    realm: {
    realmId: number,
    realmName: string,
    leaderboardStatus: "UNRANKED" | "RANKED" | "QUALIFIED" | "LOVED",
    positiveModifiers: boolean,
    stars: number,
    rankedAt: string | null,
    qualifiedAt: string | null,
    lovedAt: string | null,

},

},

},
    comment: string,

})[],
    followers: number,
    following: number,
    platformFriends: number,
    recentFollowers: ({
    id: string,
    name: string,
    playerNameInGame: string,
    country: string,
    role: string | null,
    avatar: string,
    avatarVersion: number,

})[],
    recentFollowing: ({
    id: string,
    name: string,
    playerNameInGame: string,
    country: string,
    role: string | null,
    avatar: string,
    avatarVersion: number,

})[],

}` Player profile resolved by vanity slug
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      playerControllerGetPlayerByVanity: ({ slug, ...query }: PlayerControllerGetPlayerByVanityParams, params: RequestParams = {}) =>
         this.request<
            {
               id: string;
               name: string;
               playerNameInGame: string;
               country: string;
               role: string | null;
               avatar: string;
               avatarVersion: number;
               permissions: number;
               banned: boolean;
               silenced: boolean;
               inactive: boolean;
               stats: {
                  realmId: number;
                  realmName: string;
                  rank: number;
                  countryRank: number;
                  rankChange: number | null;
                  totalPP: number;
                  plusOnePP: number | null;
                  totalScore: string;
                  totalRankedScore: string;
                  totalPlayedLeaderboards: number;
                  totalPlayedRankedLeaderboards: number;
                  totalSubmittedPlays: number;
                  totalReplayViews: number;
                  averageAccuracy: number;
                  weightedAverageAccuracy: number;
                  completionAccuracy: number;
                  device: {
                     hmd: string | null;
                     controllerLeft: string | null;
                     controllerRight: string | null;
                  } | null;
               };
               bio: string | null;
               vanity: string | null;
               profileCustomization: {
                  backgroundImage: string | null;
                  backgroundImageVersion: number | null;
                  accentColor: string | null;
                  accentForegroundColor: string | null;
                  accentForegroundActiveColor: string | null;
                  supporterNameColorEnabled: boolean;
                  badgeOrder: number[] | null;
                  badgeComments: Record<string, string> | null;
                  statOrder:
                     | ('rankedPlays' | 'rankedScore' | 'rankedAcc' | 'plusOnePP' | 'totalPlays' | 'totalScore' | 'joined' | 'replayViews' | 'role')[]
                     | null;
                  enabledStatIds:
                     | ('rankedPlays' | 'rankedScore' | 'rankedAcc' | 'plusOnePP' | 'totalPlays' | 'totalScore' | 'joined' | 'replayViews' | 'role')[]
                     | null;
                  chartMetricIds: ('rank' | 'totalPP' | 'averageAccuracy' | 'totalSubmittedPlays')[] | null;
                  sectionOrder: ('charts' | 'bio' | 'pinnedScores' | 'scores')[] | null;
               };
               createdAt: string;
               lastSeenAt: string;
               badges: {
                  id: number;
                  /** @maxLength 32 */
                  image: string;
                  /** @maxLength 128 */
                  description: string;
               }[];
               pinnedScores: {
                  score: {
                     score: {
                        id: number;
                        rank: number;
                        unmodifiedScore: number;
                        modifiedScore: number;
                        accuracy: number;
                        pp: number;
                        weight: number;
                        mods: string[];
                        badCuts: number;
                        missedNotes: number;
                        maxCombo: number;
                        fullCombo: boolean;
                        hasReplay: boolean;
                        replayViewCount?: number;
                        personalBest: boolean;
                        legacyHmdId: number | null;
                        version: string | null;
                        playOutcome: 'CLEAR' | 'FAIL' | 'QUIT' | 'RESTART';
                        playOutcomeTime: number | null;
                        createdAt: string;
                        hasHistory?: boolean;
                        player: {
                           id: string;
                           name: string;
                           playerNameInGame: string;
                           country: string;
                           role: string | null;
                           avatar: string;
                           avatarVersion: number;
                           permissions: number;
                        };
                        device: {
                           hmd: string | null;
                           controllerLeft: string | null;
                           controllerRight: string | null;
                        } | null;
                     };
                     leaderboard: {
                        id: number;
                        map: {
                           id: number;
                           hash: string;
                           bsid: string | null;
                           songName: string;
                           songSubName: string;
                           songAuthorName: string;
                           levelAuthorName: string;
                           bpm: number;
                           coverUrl: string;
                           verified: boolean;
                        };
                        difficulty: {
                           id: number;
                           difficulty: number;
                           rawDifficulty: string;
                           gameMode: string;
                        };
                        maxScore: number;
                        totalScores: number;
                        dailyScores: number;
                        createdAt: string;
                        realm: {
                           realmId: number;
                           realmName: string;
                           leaderboardStatus: 'UNRANKED' | 'RANKED' | 'QUALIFIED' | 'LOVED';
                           positiveModifiers: boolean;
                           stars: number;
                           rankedAt: string | null;
                           qualifiedAt: string | null;
                           lovedAt: string | null;
                        };
                     };
                  };
                  comment: string;
               }[];
               followers: number;
               following: number;
               platformFriends: number;
               recentFollowers: {
                  id: string;
                  name: string;
                  playerNameInGame: string;
                  country: string;
                  role: string | null;
                  avatar: string;
                  avatarVersion: number;
               }[];
               recentFollowing: {
                  id: string;
                  name: string;
                  playerNameInGame: string;
                  country: string;
                  role: string | null;
                  avatar: string;
                  avatarVersion: number;
               }[];
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/players/vanity/${slug}`,
            method: 'GET',
            query: query,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Player
 * @name PlayerControllerGetPlayer
 * @request GET:/api/v2/players/{id}
 * @response `200` `{
    id: string,
    name: string,
    playerNameInGame: string,
    country: string,
    role: string | null,
    avatar: string,
    avatarVersion: number,
    permissions: number,
    banned: boolean,
    silenced: boolean,
    inactive: boolean,
    stats: {
    realmId: number,
    realmName: string,
    rank: number,
    countryRank: number,
    rankChange: number | null,
    totalPP: number,
    plusOnePP: number | null,
    totalScore: string,
    totalRankedScore: string,
    totalPlayedLeaderboards: number,
    totalPlayedRankedLeaderboards: number,
    totalSubmittedPlays: number,
    totalReplayViews: number,
    averageAccuracy: number,
    weightedAverageAccuracy: number,
    completionAccuracy: number,
    device: {
    hmd: string | null,
    controllerLeft: string | null,
    controllerRight: string | null,

} | null,

},
    bio: string | null,
    vanity: string | null,
    profileCustomization: {
    backgroundImage: string | null,
    backgroundImageVersion: number | null,
    accentColor: string | null,
    accentForegroundColor: string | null,
    accentForegroundActiveColor: string | null,
    supporterNameColorEnabled: boolean,
    badgeOrder: (number)[] | null,
    badgeComments: Record<string,string> | null,
    statOrder: ("rankedPlays" | "rankedScore" | "rankedAcc" | "plusOnePP" | "totalPlays" | "totalScore" | "joined" | "replayViews" | "role")[] | null,
    enabledStatIds: ("rankedPlays" | "rankedScore" | "rankedAcc" | "plusOnePP" | "totalPlays" | "totalScore" | "joined" | "replayViews" | "role")[] | null,
    chartMetricIds: ("rank" | "totalPP" | "averageAccuracy" | "totalSubmittedPlays")[] | null,
    sectionOrder: ("charts" | "bio" | "pinnedScores" | "scores")[] | null,

},
    createdAt: string,
    lastSeenAt: string,
    badges: ({
    id: number,
  /** @maxLength 32 *\/
    image: string,
  /** @maxLength 128 *\/
    description: string,

})[],
    pinnedScores: ({
    score: {
    score: {
    id: number,
    rank: number,
    unmodifiedScore: number,
    modifiedScore: number,
    accuracy: number,
    pp: number,
    weight: number,
    mods: (string)[],
    badCuts: number,
    missedNotes: number,
    maxCombo: number,
    fullCombo: boolean,
    hasReplay: boolean,
    replayViewCount?: number,
    personalBest: boolean,
    legacyHmdId: number | null,
    version: string | null,
    playOutcome: "CLEAR" | "FAIL" | "QUIT" | "RESTART",
    playOutcomeTime: number | null,
    createdAt: string,
    hasHistory?: boolean,
    player: {
    id: string,
    name: string,
    playerNameInGame: string,
    country: string,
    role: string | null,
    avatar: string,
    avatarVersion: number,
    permissions: number,

},
    device: {
    hmd: string | null,
    controllerLeft: string | null,
    controllerRight: string | null,

} | null,

},
    leaderboard: {
    id: number,
    map: {
    id: number,
    hash: string,
    bsid: string | null,
    songName: string,
    songSubName: string,
    songAuthorName: string,
    levelAuthorName: string,
    bpm: number,
    coverUrl: string,
    verified: boolean,

},
    difficulty: {
    id: number,
    difficulty: number,
    rawDifficulty: string,
    gameMode: string,

},
    maxScore: number,
    totalScores: number,
    dailyScores: number,
    createdAt: string,
    realm: {
    realmId: number,
    realmName: string,
    leaderboardStatus: "UNRANKED" | "RANKED" | "QUALIFIED" | "LOVED",
    positiveModifiers: boolean,
    stars: number,
    rankedAt: string | null,
    qualifiedAt: string | null,
    lovedAt: string | null,

},

},

},
    comment: string,

})[],
    followers: number,
    following: number,
    platformFriends: number,
    recentFollowers: ({
    id: string,
    name: string,
    playerNameInGame: string,
    country: string,
    role: string | null,
    avatar: string,
    avatarVersion: number,

})[],
    recentFollowing: ({
    id: string,
    name: string,
    playerNameInGame: string,
    country: string,
    role: string | null,
    avatar: string,
    avatarVersion: number,

})[],

}` Player profile
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      playerControllerGetPlayer: ({ id, ...query }: PlayerControllerGetPlayerParams, params: RequestParams = {}) =>
         this.request<
            {
               id: string;
               name: string;
               playerNameInGame: string;
               country: string;
               role: string | null;
               avatar: string;
               avatarVersion: number;
               permissions: number;
               banned: boolean;
               silenced: boolean;
               inactive: boolean;
               stats: {
                  realmId: number;
                  realmName: string;
                  rank: number;
                  countryRank: number;
                  rankChange: number | null;
                  totalPP: number;
                  plusOnePP: number | null;
                  totalScore: string;
                  totalRankedScore: string;
                  totalPlayedLeaderboards: number;
                  totalPlayedRankedLeaderboards: number;
                  totalSubmittedPlays: number;
                  totalReplayViews: number;
                  averageAccuracy: number;
                  weightedAverageAccuracy: number;
                  completionAccuracy: number;
                  device: {
                     hmd: string | null;
                     controllerLeft: string | null;
                     controllerRight: string | null;
                  } | null;
               };
               bio: string | null;
               vanity: string | null;
               profileCustomization: {
                  backgroundImage: string | null;
                  backgroundImageVersion: number | null;
                  accentColor: string | null;
                  accentForegroundColor: string | null;
                  accentForegroundActiveColor: string | null;
                  supporterNameColorEnabled: boolean;
                  badgeOrder: number[] | null;
                  badgeComments: Record<string, string> | null;
                  statOrder:
                     | ('rankedPlays' | 'rankedScore' | 'rankedAcc' | 'plusOnePP' | 'totalPlays' | 'totalScore' | 'joined' | 'replayViews' | 'role')[]
                     | null;
                  enabledStatIds:
                     | ('rankedPlays' | 'rankedScore' | 'rankedAcc' | 'plusOnePP' | 'totalPlays' | 'totalScore' | 'joined' | 'replayViews' | 'role')[]
                     | null;
                  chartMetricIds: ('rank' | 'totalPP' | 'averageAccuracy' | 'totalSubmittedPlays')[] | null;
                  sectionOrder: ('charts' | 'bio' | 'pinnedScores' | 'scores')[] | null;
               };
               createdAt: string;
               lastSeenAt: string;
               badges: {
                  id: number;
                  /** @maxLength 32 */
                  image: string;
                  /** @maxLength 128 */
                  description: string;
               }[];
               pinnedScores: {
                  score: {
                     score: {
                        id: number;
                        rank: number;
                        unmodifiedScore: number;
                        modifiedScore: number;
                        accuracy: number;
                        pp: number;
                        weight: number;
                        mods: string[];
                        badCuts: number;
                        missedNotes: number;
                        maxCombo: number;
                        fullCombo: boolean;
                        hasReplay: boolean;
                        replayViewCount?: number;
                        personalBest: boolean;
                        legacyHmdId: number | null;
                        version: string | null;
                        playOutcome: 'CLEAR' | 'FAIL' | 'QUIT' | 'RESTART';
                        playOutcomeTime: number | null;
                        createdAt: string;
                        hasHistory?: boolean;
                        player: {
                           id: string;
                           name: string;
                           playerNameInGame: string;
                           country: string;
                           role: string | null;
                           avatar: string;
                           avatarVersion: number;
                           permissions: number;
                        };
                        device: {
                           hmd: string | null;
                           controllerLeft: string | null;
                           controllerRight: string | null;
                        } | null;
                     };
                     leaderboard: {
                        id: number;
                        map: {
                           id: number;
                           hash: string;
                           bsid: string | null;
                           songName: string;
                           songSubName: string;
                           songAuthorName: string;
                           levelAuthorName: string;
                           bpm: number;
                           coverUrl: string;
                           verified: boolean;
                        };
                        difficulty: {
                           id: number;
                           difficulty: number;
                           rawDifficulty: string;
                           gameMode: string;
                        };
                        maxScore: number;
                        totalScores: number;
                        dailyScores: number;
                        createdAt: string;
                        realm: {
                           realmId: number;
                           realmName: string;
                           leaderboardStatus: 'UNRANKED' | 'RANKED' | 'QUALIFIED' | 'LOVED';
                           positiveModifiers: boolean;
                           stars: number;
                           rankedAt: string | null;
                           qualifiedAt: string | null;
                           lovedAt: string | null;
                        };
                     };
                  };
                  comment: string;
               }[];
               followers: number;
               following: number;
               platformFriends: number;
               recentFollowers: {
                  id: string;
                  name: string;
                  playerNameInGame: string;
                  country: string;
                  role: string | null;
                  avatar: string;
                  avatarVersion: number;
               }[];
               recentFollowing: {
                  id: string;
                  name: string;
                  playerNameInGame: string;
                  country: string;
                  role: string | null;
                  avatar: string;
                  avatarVersion: number;
               }[];
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/players/${id}`,
            method: 'GET',
            query: query,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Player
 * @name PlayerControllerGetPlayerProfile
 * @request GET:/api/v2/players/{id}/profile
 * @response `200` `{
    player: {
    id: string,
    name: string,
    playerNameInGame: string,
    country: string,
    role: string | null,
    avatar: string,
    avatarVersion: number,
    permissions: number,
    banned: boolean,
    silenced: boolean,
    inactive: boolean,
    stats: {
    realmId: number,
    realmName: string,
    rank: number,
    countryRank: number,
    rankChange: number | null,
    totalPP: number,
    plusOnePP: number | null,
    totalScore: string,
    totalRankedScore: string,
    totalPlayedLeaderboards: number,
    totalPlayedRankedLeaderboards: number,
    totalSubmittedPlays: number,
    totalReplayViews: number,
    averageAccuracy: number,
    weightedAverageAccuracy: number,
    completionAccuracy: number,
    device: {
    hmd: string | null,
    controllerLeft: string | null,
    controllerRight: string | null,

} | null,

},
    bio: string | null,
    vanity: string | null,
    profileCustomization: {
    backgroundImage: string | null,
    backgroundImageVersion: number | null,
    accentColor: string | null,
    accentForegroundColor: string | null,
    accentForegroundActiveColor: string | null,
    supporterNameColorEnabled: boolean,
    badgeOrder: (number)[] | null,
    badgeComments: Record<string,string> | null,
    statOrder: ("rankedPlays" | "rankedScore" | "rankedAcc" | "plusOnePP" | "totalPlays" | "totalScore" | "joined" | "replayViews" | "role")[] | null,
    enabledStatIds: ("rankedPlays" | "rankedScore" | "rankedAcc" | "plusOnePP" | "totalPlays" | "totalScore" | "joined" | "replayViews" | "role")[] | null,
    chartMetricIds: ("rank" | "totalPP" | "averageAccuracy" | "totalSubmittedPlays")[] | null,
    sectionOrder: ("charts" | "bio" | "pinnedScores" | "scores")[] | null,

},
    createdAt: string,
    lastSeenAt: string,
    badges: ({
    id: number,
  /** @maxLength 32 *\/
    image: string,
  /** @maxLength 128 *\/
    description: string,

})[],
    pinnedScores: ({
    score: {
    score: {
    id: number,
    rank: number,
    unmodifiedScore: number,
    modifiedScore: number,
    accuracy: number,
    pp: number,
    weight: number,
    mods: (string)[],
    badCuts: number,
    missedNotes: number,
    maxCombo: number,
    fullCombo: boolean,
    hasReplay: boolean,
    replayViewCount?: number,
    personalBest: boolean,
    legacyHmdId: number | null,
    version: string | null,
    playOutcome: "CLEAR" | "FAIL" | "QUIT" | "RESTART",
    playOutcomeTime: number | null,
    createdAt: string,
    hasHistory?: boolean,
    player: {
    id: string,
    name: string,
    playerNameInGame: string,
    country: string,
    role: string | null,
    avatar: string,
    avatarVersion: number,
    permissions: number,

},
    device: {
    hmd: string | null,
    controllerLeft: string | null,
    controllerRight: string | null,

} | null,

},
    leaderboard: {
    id: number,
    map: {
    id: number,
    hash: string,
    bsid: string | null,
    songName: string,
    songSubName: string,
    songAuthorName: string,
    levelAuthorName: string,
    bpm: number,
    coverUrl: string,
    verified: boolean,

},
    difficulty: {
    id: number,
    difficulty: number,
    rawDifficulty: string,
    gameMode: string,

},
    maxScore: number,
    totalScores: number,
    dailyScores: number,
    createdAt: string,
    realm: {
    realmId: number,
    realmName: string,
    leaderboardStatus: "UNRANKED" | "RANKED" | "QUALIFIED" | "LOVED",
    positiveModifiers: boolean,
    stars: number,
    rankedAt: string | null,
    qualifiedAt: string | null,
    lovedAt: string | null,

},

},

},
    comment: string,

})[],
    followers: number,
    following: number,
    platformFriends: number,
    recentFollowers: ({
    id: string,
    name: string,
    playerNameInGame: string,
    country: string,
    role: string | null,
    avatar: string,
    avatarVersion: number,

})[],
    recentFollowing: ({
    id: string,
    name: string,
    playerNameInGame: string,
    country: string,
    role: string | null,
    avatar: string,
    avatarVersion: number,

})[],

},
    history: ({
    rank: number,
    totalPP: number,
    totalScore: string,
    totalRankedScore: string,
    totalPlayedLeaderboards: number,
    totalPlayedRankedLeaderboards: number,
    totalSubmittedPlays: number,
    totalReplayViews: number,
    averageAccuracy: number,
    weightedAverageAccuracy: number,
    completionAccuracy: number,
    estimated: boolean,
    createdAt: string,

})[],
    aliases: ({
    id: number,
    alias: string,
    disabled: boolean,
    createdAt: string,

})[],

}` Player profile bundle: profile, realm history and aliases
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      playerControllerGetPlayerProfile: ({ id, ...query }: PlayerControllerGetPlayerProfileParams, params: RequestParams = {}) =>
         this.request<
            {
               player: {
                  id: string;
                  name: string;
                  playerNameInGame: string;
                  country: string;
                  role: string | null;
                  avatar: string;
                  avatarVersion: number;
                  permissions: number;
                  banned: boolean;
                  silenced: boolean;
                  inactive: boolean;
                  stats: {
                     realmId: number;
                     realmName: string;
                     rank: number;
                     countryRank: number;
                     rankChange: number | null;
                     totalPP: number;
                     plusOnePP: number | null;
                     totalScore: string;
                     totalRankedScore: string;
                     totalPlayedLeaderboards: number;
                     totalPlayedRankedLeaderboards: number;
                     totalSubmittedPlays: number;
                     totalReplayViews: number;
                     averageAccuracy: number;
                     weightedAverageAccuracy: number;
                     completionAccuracy: number;
                     device: {
                        hmd: string | null;
                        controllerLeft: string | null;
                        controllerRight: string | null;
                     } | null;
                  };
                  bio: string | null;
                  vanity: string | null;
                  profileCustomization: {
                     backgroundImage: string | null;
                     backgroundImageVersion: number | null;
                     accentColor: string | null;
                     accentForegroundColor: string | null;
                     accentForegroundActiveColor: string | null;
                     supporterNameColorEnabled: boolean;
                     badgeOrder: number[] | null;
                     badgeComments: Record<string, string> | null;
                     statOrder:
                        | (
                             | 'rankedPlays'
                             | 'rankedScore'
                             | 'rankedAcc'
                             | 'plusOnePP'
                             | 'totalPlays'
                             | 'totalScore'
                             | 'joined'
                             | 'replayViews'
                             | 'role'
                          )[]
                        | null;
                     enabledStatIds:
                        | (
                             | 'rankedPlays'
                             | 'rankedScore'
                             | 'rankedAcc'
                             | 'plusOnePP'
                             | 'totalPlays'
                             | 'totalScore'
                             | 'joined'
                             | 'replayViews'
                             | 'role'
                          )[]
                        | null;
                     chartMetricIds: ('rank' | 'totalPP' | 'averageAccuracy' | 'totalSubmittedPlays')[] | null;
                     sectionOrder: ('charts' | 'bio' | 'pinnedScores' | 'scores')[] | null;
                  };
                  createdAt: string;
                  lastSeenAt: string;
                  badges: {
                     id: number;
                     /** @maxLength 32 */
                     image: string;
                     /** @maxLength 128 */
                     description: string;
                  }[];
                  pinnedScores: {
                     score: {
                        score: {
                           id: number;
                           rank: number;
                           unmodifiedScore: number;
                           modifiedScore: number;
                           accuracy: number;
                           pp: number;
                           weight: number;
                           mods: string[];
                           badCuts: number;
                           missedNotes: number;
                           maxCombo: number;
                           fullCombo: boolean;
                           hasReplay: boolean;
                           replayViewCount?: number;
                           personalBest: boolean;
                           legacyHmdId: number | null;
                           version: string | null;
                           playOutcome: 'CLEAR' | 'FAIL' | 'QUIT' | 'RESTART';
                           playOutcomeTime: number | null;
                           createdAt: string;
                           hasHistory?: boolean;
                           player: {
                              id: string;
                              name: string;
                              playerNameInGame: string;
                              country: string;
                              role: string | null;
                              avatar: string;
                              avatarVersion: number;
                              permissions: number;
                           };
                           device: {
                              hmd: string | null;
                              controllerLeft: string | null;
                              controllerRight: string | null;
                           } | null;
                        };
                        leaderboard: {
                           id: number;
                           map: {
                              id: number;
                              hash: string;
                              bsid: string | null;
                              songName: string;
                              songSubName: string;
                              songAuthorName: string;
                              levelAuthorName: string;
                              bpm: number;
                              coverUrl: string;
                              verified: boolean;
                           };
                           difficulty: {
                              id: number;
                              difficulty: number;
                              rawDifficulty: string;
                              gameMode: string;
                           };
                           maxScore: number;
                           totalScores: number;
                           dailyScores: number;
                           createdAt: string;
                           realm: {
                              realmId: number;
                              realmName: string;
                              leaderboardStatus: 'UNRANKED' | 'RANKED' | 'QUALIFIED' | 'LOVED';
                              positiveModifiers: boolean;
                              stars: number;
                              rankedAt: string | null;
                              qualifiedAt: string | null;
                              lovedAt: string | null;
                           };
                        };
                     };
                     comment: string;
                  }[];
                  followers: number;
                  following: number;
                  platformFriends: number;
                  recentFollowers: {
                     id: string;
                     name: string;
                     playerNameInGame: string;
                     country: string;
                     role: string | null;
                     avatar: string;
                     avatarVersion: number;
                  }[];
                  recentFollowing: {
                     id: string;
                     name: string;
                     playerNameInGame: string;
                     country: string;
                     role: string | null;
                     avatar: string;
                     avatarVersion: number;
                  }[];
               };
               history: {
                  rank: number;
                  totalPP: number;
                  totalScore: string;
                  totalRankedScore: string;
                  totalPlayedLeaderboards: number;
                  totalPlayedRankedLeaderboards: number;
                  totalSubmittedPlays: number;
                  totalReplayViews: number;
                  averageAccuracy: number;
                  weightedAverageAccuracy: number;
                  completionAccuracy: number;
                  estimated: boolean;
                  createdAt: string;
               }[];
               aliases: {
                  id: number;
                  alias: string;
                  disabled: boolean;
                  createdAt: string;
               }[];
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/players/${id}/profile`,
            method: 'GET',
            query: query,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Player
 * @name PlayerControllerGetPlayerBasic
 * @request GET:/api/v2/players/{id}/basic
 * @response `200` `{
    id: string,
    name: string,
    playerNameInGame: string,
    country: string,
    role: string | null,
    avatar: string,
    avatarVersion: number,
    permissions: number,
    banned: boolean,
    silenced: boolean,
    inactive: boolean,
    stats: {
    realmId: number,
    realmName: string,
    rank: number,
    countryRank: number,
    rankChange: number | null,
    totalPP: number,
    plusOnePP: number | null,
    totalScore: string,
    totalRankedScore: string,
    totalPlayedLeaderboards: number,
    totalPlayedRankedLeaderboards: number,
    totalSubmittedPlays: number,
    totalReplayViews: number,
    averageAccuracy: number,
    weightedAverageAccuracy: number,
    completionAccuracy: number,
    device: {
    hmd: string | null,
    controllerLeft: string | null,
    controllerRight: string | null,

} | null,

},

}` Basic player info
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      playerControllerGetPlayerBasic: ({ id, ...query }: PlayerControllerGetPlayerBasicParams, params: RequestParams = {}) =>
         this.request<
            {
               id: string;
               name: string;
               playerNameInGame: string;
               country: string;
               role: string | null;
               avatar: string;
               avatarVersion: number;
               permissions: number;
               banned: boolean;
               silenced: boolean;
               inactive: boolean;
               stats: {
                  realmId: number;
                  realmName: string;
                  rank: number;
                  countryRank: number;
                  rankChange: number | null;
                  totalPP: number;
                  plusOnePP: number | null;
                  totalScore: string;
                  totalRankedScore: string;
                  totalPlayedLeaderboards: number;
                  totalPlayedRankedLeaderboards: number;
                  totalSubmittedPlays: number;
                  totalReplayViews: number;
                  averageAccuracy: number;
                  weightedAverageAccuracy: number;
                  completionAccuracy: number;
                  device: {
                     hmd: string | null;
                     controllerLeft: string | null;
                     controllerRight: string | null;
                  } | null;
               };
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/players/${id}/basic`,
            method: 'GET',
            query: query,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Player
 * @name PlayerControllerGetPlayerHistory
 * @request GET:/api/v2/players/{id}/history
 * @response `200` `({
    rank: number,
    totalPP: number,
    totalScore: string,
    totalRankedScore: string,
    totalPlayedLeaderboards: number,
    totalPlayedRankedLeaderboards: number,
    totalSubmittedPlays: number,
    totalReplayViews: number,
    averageAccuracy: number,
    weightedAverageAccuracy: number,
    completionAccuracy: number,
    estimated: boolean,
    createdAt: string,

})[]` Player realm history over time
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      playerControllerGetPlayerHistory: ({ id, ...query }: PlayerControllerGetPlayerHistoryParams, params: RequestParams = {}) =>
         this.request<
            {
               rank: number;
               totalPP: number;
               totalScore: string;
               totalRankedScore: string;
               totalPlayedLeaderboards: number;
               totalPlayedRankedLeaderboards: number;
               totalSubmittedPlays: number;
               totalReplayViews: number;
               averageAccuracy: number;
               weightedAverageAccuracy: number;
               completionAccuracy: number;
               estimated: boolean;
               createdAt: string;
            }[],
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/players/${id}/history`,
            method: 'GET',
            query: query,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Player
 * @name PlayerControllerGetGlobalPlayerHistory
 * @request GET:/api/v2/players/{id}/global-history
 * @response `200` `({
    rank: number,
    totalPP: number,
    totalScore: string,
    totalRankedScore: string,
    totalPlayedLeaderboards: number,
    totalPlayedRankedLeaderboards: number,
    totalSubmittedPlays: number,
    totalReplayViews: number,
    averageAccuracy: number,
    weightedAverageAccuracy: number,
    completionAccuracy: number,
    estimated: boolean,
    createdAt: string,

})[]` Player global history over time
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 */
      playerControllerGetGlobalPlayerHistory: ({ id }: PlayerControllerGetGlobalPlayerHistoryParams, params: RequestParams = {}) =>
         this.request<
            {
               rank: number;
               totalPP: number;
               totalScore: string;
               totalRankedScore: string;
               totalPlayedLeaderboards: number;
               totalPlayedRankedLeaderboards: number;
               totalSubmittedPlays: number;
               totalReplayViews: number;
               averageAccuracy: number;
               weightedAverageAccuracy: number;
               completionAccuracy: number;
               estimated: boolean;
               createdAt: string;
            }[],
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
         >({
            path: `/api/v2/players/${id}/global-history`,
            method: 'GET',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Player
 * @name PlayerControllerGetPlayerScoreByHash
 * @request GET:/api/v2/players/{id}/scores/hash/{hash}/{mode}/{difficulty}
 * @response `200` `{
    id: number,
    rank: number,
    unmodifiedScore: number,
    modifiedScore: number,
    accuracy: number,
    pp: number,
    weight: number,
    mods: (string)[],
    badCuts: number,
    missedNotes: number,
    maxCombo: number,
    fullCombo: boolean,
    hasReplay: boolean,
    replayViewCount?: number,
    personalBest: boolean,
    legacyHmdId: number | null,
    version: string | null,
    playOutcome: "CLEAR" | "FAIL" | "QUIT" | "RESTART",
    playOutcomeTime: number | null,
    createdAt: string,
    hasHistory?: boolean,
    player: {
    id: string,
    name: string,
    playerNameInGame: string,
    country: string,
    role: string | null,
    avatar: string,
    avatarVersion: number,
    permissions: number,

},
    device: {
    hmd: string | null,
    controllerLeft: string | null,
    controllerRight: string | null,

} | null,

}` Player's score by hash and difficulty
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      playerControllerGetPlayerScoreByHash: (
         { id, hash, mode, difficulty, ...query }: PlayerControllerGetPlayerScoreByHashParams,
         params: RequestParams = {}
      ) =>
         this.request<
            {
               id: number;
               rank: number;
               unmodifiedScore: number;
               modifiedScore: number;
               accuracy: number;
               pp: number;
               weight: number;
               mods: string[];
               badCuts: number;
               missedNotes: number;
               maxCombo: number;
               fullCombo: boolean;
               hasReplay: boolean;
               replayViewCount?: number;
               personalBest: boolean;
               legacyHmdId: number | null;
               version: string | null;
               playOutcome: 'CLEAR' | 'FAIL' | 'QUIT' | 'RESTART';
               playOutcomeTime: number | null;
               createdAt: string;
               hasHistory?: boolean;
               player: {
                  id: string;
                  name: string;
                  playerNameInGame: string;
                  country: string;
                  role: string | null;
                  avatar: string;
                  avatarVersion: number;
                  permissions: number;
               };
               device: {
                  hmd: string | null;
                  controllerLeft: string | null;
                  controllerRight: string | null;
               } | null;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/players/${id}/scores/hash/${hash}/${mode}/${difficulty}`,
            method: 'GET',
            query: query,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Player
 * @name PlayerControllerGetPlayerScores
 * @request GET:/api/v2/players/{id}/scores
 * @response `200` `{
    data: ({
    score: {
    id: number,
    rank: number,
    unmodifiedScore: number,
    modifiedScore: number,
    accuracy: number,
    pp: number,
    weight: number,
    mods: (string)[],
    badCuts: number,
    missedNotes: number,
    maxCombo: number,
    fullCombo: boolean,
    hasReplay: boolean,
    replayViewCount?: number,
    personalBest: boolean,
    legacyHmdId: number | null,
    version: string | null,
    playOutcome: "CLEAR" | "FAIL" | "QUIT" | "RESTART",
    playOutcomeTime: number | null,
    createdAt: string,
    hasHistory?: boolean,
    player: {
    id: string,
    name: string,
    playerNameInGame: string,
    country: string,
    role: string | null,
    avatar: string,
    avatarVersion: number,
    permissions: number,

},
    device: {
    hmd: string | null,
    controllerLeft: string | null,
    controllerRight: string | null,

} | null,

},
    leaderboard: {
    id: number,
    map: {
    id: number,
    hash: string,
    bsid: string | null,
    songName: string,
    songSubName: string,
    songAuthorName: string,
    levelAuthorName: string,
    bpm: number,
    coverUrl: string,
    verified: boolean,

},
    difficulty: {
    id: number,
    difficulty: number,
    rawDifficulty: string,
    gameMode: string,

},
    maxScore: number,
    totalScores: number,
    dailyScores: number,
    createdAt: string,
    realm: {
    realmId: number,
    realmName: string,
    leaderboardStatus: "UNRANKED" | "RANKED" | "QUALIFIED" | "LOVED",
    positiveModifiers: boolean,
    stars: number,
    rankedAt: string | null,
    qualifiedAt: string | null,
    lovedAt: string | null,

},

},

})[],
    metadata: {
    page: number,
    itemsPerPage: number,
    totalItems: number,
    totalPages: number,

},

}` Paginated player scores
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      playerControllerGetPlayerScores: ({ id, ...query }: PlayerControllerGetPlayerScoresParams, params: RequestParams = {}) =>
         this.request<
            {
               data: {
                  score: {
                     id: number;
                     rank: number;
                     unmodifiedScore: number;
                     modifiedScore: number;
                     accuracy: number;
                     pp: number;
                     weight: number;
                     mods: string[];
                     badCuts: number;
                     missedNotes: number;
                     maxCombo: number;
                     fullCombo: boolean;
                     hasReplay: boolean;
                     replayViewCount?: number;
                     personalBest: boolean;
                     legacyHmdId: number | null;
                     version: string | null;
                     playOutcome: 'CLEAR' | 'FAIL' | 'QUIT' | 'RESTART';
                     playOutcomeTime: number | null;
                     createdAt: string;
                     hasHistory?: boolean;
                     player: {
                        id: string;
                        name: string;
                        playerNameInGame: string;
                        country: string;
                        role: string | null;
                        avatar: string;
                        avatarVersion: number;
                        permissions: number;
                     };
                     device: {
                        hmd: string | null;
                        controllerLeft: string | null;
                        controllerRight: string | null;
                     } | null;
                  };
                  leaderboard: {
                     id: number;
                     map: {
                        id: number;
                        hash: string;
                        bsid: string | null;
                        songName: string;
                        songSubName: string;
                        songAuthorName: string;
                        levelAuthorName: string;
                        bpm: number;
                        coverUrl: string;
                        verified: boolean;
                     };
                     difficulty: {
                        id: number;
                        difficulty: number;
                        rawDifficulty: string;
                        gameMode: string;
                     };
                     maxScore: number;
                     totalScores: number;
                     dailyScores: number;
                     createdAt: string;
                     realm: {
                        realmId: number;
                        realmName: string;
                        leaderboardStatus: 'UNRANKED' | 'RANKED' | 'QUALIFIED' | 'LOVED';
                        positiveModifiers: boolean;
                        stars: number;
                        rankedAt: string | null;
                        qualifiedAt: string | null;
                        lovedAt: string | null;
                     };
                  };
               }[];
               metadata: {
                  page: number;
                  itemsPerPage: number;
                  totalItems: number;
                  totalPages: number;
               };
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/players/${id}/scores`,
            method: 'GET',
            query: query,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Player
 * @name PlayerRelationshipControllerGetRelationships
 * @request GET:/api/v2/player/{id}/relationships
 * @response `200` `{
    data: ({
    player: {
    id: string,
    name: string,
    playerNameInGame: string,
    country: string,
    role: string | null,
    avatar: string,
    avatarVersion: number,
    permissions: number,

},
    relation: "platform-friend" | "follow",

})[],
    metadata: {
    page: number,
    itemsPerPage: number,
    totalItems: number,
    totalPages: number,

},

}` Player followers, following or platform friends. Platform-friend identities are owner-only
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `403` `{
    statusCode: 403,
    error: "Forbidden",
    code: "FORBIDDEN",
    message: string,
    details?: {
    reason: string,

},

}` Forbidden
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      playerRelationshipControllerGetRelationships: (
         { id, ...query }: PlayerRelationshipControllerGetRelationshipsParams,
         params: RequestParams = {}
      ) =>
         this.request<
            {
               data: {
                  player: {
                     id: string;
                     name: string;
                     playerNameInGame: string;
                     country: string;
                     role: string | null;
                     avatar: string;
                     avatarVersion: number;
                     permissions: number;
                  };
                  relation: 'platform-friend' | 'follow';
               }[];
               metadata: {
                  page: number;
                  itemsPerPage: number;
                  totalItems: number;
                  totalPages: number;
               };
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 403;
                 error: 'Forbidden';
                 code: 'FORBIDDEN';
                 message: string;
                 details?: {
                    reason: string;
                 };
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/player/${id}/relationships`,
            method: 'GET',
            query: query,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Player
 * @name PlayerRelationshipControllerFollowPlayer
 * @request POST:/api/v2/player/{id}/follow
 * @response `200` `{
    success: boolean,

}` Follow player result
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `403` `{
    statusCode: 403,
    error: "Forbidden",
    code: "FORBIDDEN",
    message: string,
    details?: {
    reason: string,

},

}` Forbidden
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      playerRelationshipControllerFollowPlayer: ({ id }: PlayerRelationshipControllerFollowPlayerParams, params: RequestParams = {}) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 403;
                 error: 'Forbidden';
                 code: 'FORBIDDEN';
                 message: string;
                 details?: {
                    reason: string;
                 };
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/player/${id}/follow`,
            method: 'POST',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Player
 * @name PlayerRelationshipControllerUnfollowPlayer
 * @request POST:/api/v2/player/{id}/unfollow
 * @response `200` `{
    success: boolean,

}` Unfollow player result
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `403` `{
    statusCode: 403,
    error: "Forbidden",
    code: "FORBIDDEN",
    message: string,
    details?: {
    reason: string,

},

}` Forbidden
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      playerRelationshipControllerUnfollowPlayer: ({ id }: PlayerRelationshipControllerUnfollowPlayerParams, params: RequestParams = {}) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 403;
                 error: 'Forbidden';
                 code: 'FORBIDDEN';
                 message: string;
                 details?: {
                    reason: string;
                 };
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/player/${id}/unfollow`,
            method: 'POST',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Player
 * @name PlayerReportControllerSubmitProfileReport
 * @request POST:/api/v2/players/{id}/report
 * @response `200` `{
    success: boolean,

}` Submit a profile report
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      playerReportControllerSubmitProfileReport: (
         { id }: PlayerReportControllerSubmitProfileReportParams,
         data: PlayerReportControllerSubmitProfileReportPayload,
         params: RequestParams = {}
      ) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/players/${id}/report`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         })
   };
   playerAlias = {
      /**
 * No description
 *
 * @tags PlayerAlias
 * @name PlayerAliasControllerGetAliases
 * @request GET:/api/v2/players/{id}/aliases
 * @response `200` `({
    id: number,
    alias: string,
    disabled: boolean,
    createdAt: string,

})[]` Player name aliases
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 */
      playerAliasControllerGetAliases: ({ id }: PlayerAliasControllerGetAliasesParams, params: RequestParams = {}) =>
         this.request<
            {
               id: number;
               alias: string;
               disabled: boolean;
               createdAt: string;
            }[],
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
         >({
            path: `/api/v2/players/${id}/aliases`,
            method: 'GET',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags PlayerAlias
 * @name PlayerAliasControllerDisableAlias
 * @request POST:/api/v2/players/{id}/aliases/{aliasId}/disable
 * @response `200` `{
    success: boolean,

}` Alias disable result
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      playerAliasControllerDisableAlias: ({ id, aliasId }: PlayerAliasControllerDisableAliasParams, params: RequestParams = {}) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/players/${id}/aliases/${aliasId}/disable`,
            method: 'POST',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags PlayerAlias
 * @name PlayerAliasControllerDisableAllAliases
 * @request POST:/api/v2/players/{id}/aliases/disable-all
 * @response `200` `{
    success: boolean,

}` Disable all aliases for a player
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 */
      playerAliasControllerDisableAllAliases: ({ id }: PlayerAliasControllerDisableAllAliasesParams, params: RequestParams = {}) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
         >({
            path: `/api/v2/players/${id}/aliases/disable-all`,
            method: 'POST',
            format: 'json',
            ...params
         })
   };
   leaderboard = {
      /**
 * No description
 *
 * @tags Leaderboard
 * @name LeaderboardControllerGetLeaderboardListings
 * @request GET:/api/v2/leaderboards
 * @response `200` `{
    data: ({
    id: number,
    map: {
    id: number,
    hash: string,
    bsid: string | null,
    songName: string,
    songSubName: string,
    songAuthorName: string,
    levelAuthorName: string,
    bpm: number,
    coverUrl: string,
    verified: boolean,

},
    difficulty: {
    id: number,
    difficulty: number,
    rawDifficulty: string,
    gameMode: string,

},
    maxScore: number,
    totalScores: number,
    dailyScores: number,
    createdAt: string,
    realm: {
    realmId: number,
    realmName: string,
    leaderboardStatus: "UNRANKED" | "RANKED" | "QUALIFIED" | "LOVED",
    positiveModifiers: boolean,
    stars: number,
    rankedAt: string | null,
    qualifiedAt: string | null,
    lovedAt: string | null,

},

})[],
    metadata: {
    page: number,
    itemsPerPage: number,
    totalItems: number,
    totalPages: number,

},

}` Paginated leaderboard listings
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      leaderboardControllerGetLeaderboardListings: (query: LeaderboardControllerGetLeaderboardListingsParams, params: RequestParams = {}) =>
         this.request<
            {
               data: {
                  id: number;
                  map: {
                     id: number;
                     hash: string;
                     bsid: string | null;
                     songName: string;
                     songSubName: string;
                     songAuthorName: string;
                     levelAuthorName: string;
                     bpm: number;
                     coverUrl: string;
                     verified: boolean;
                  };
                  difficulty: {
                     id: number;
                     difficulty: number;
                     rawDifficulty: string;
                     gameMode: string;
                  };
                  maxScore: number;
                  totalScores: number;
                  dailyScores: number;
                  createdAt: string;
                  realm: {
                     realmId: number;
                     realmName: string;
                     leaderboardStatus: 'UNRANKED' | 'RANKED' | 'QUALIFIED' | 'LOVED';
                     positiveModifiers: boolean;
                     stars: number;
                     rankedAt: string | null;
                     qualifiedAt: string | null;
                     lovedAt: string | null;
                  };
               }[];
               metadata: {
                  page: number;
                  itemsPerPage: number;
                  totalItems: number;
                  totalPages: number;
               };
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/leaderboards`,
            method: 'GET',
            query: query,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Leaderboard
 * @name LeaderboardControllerGetLeaderboardById
 * @request GET:/api/v2/leaderboards/{id}
 * @response `200` `{
    id: number,
    map: {
    id: number,
    hash: string,
    bsid: string | null,
    songName: string,
    songSubName: string,
    songAuthorName: string,
    levelAuthorName: string,
    bpm: number,
    coverUrl: string,
    verified: boolean,

},
    difficulty: {
    id: number,
    difficulty: number,
    rawDifficulty: string,
    gameMode: string,

},
    maxScore: number,
    totalScores: number,
    dailyScores: number,
    createdAt: string,
    realm: {
    realmId: number,
    realmName: string,
    leaderboardStatus: "UNRANKED" | "RANKED" | "QUALIFIED" | "LOVED",
    positiveModifiers: boolean,
    stars: number,
    rankedAt: string | null,
    qualifiedAt: string | null,
    lovedAt: string | null,

},

}` Leaderboard details
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      leaderboardControllerGetLeaderboardById: ({ id, ...query }: LeaderboardControllerGetLeaderboardByIdParams, params: RequestParams = {}) =>
         this.request<
            {
               id: number;
               map: {
                  id: number;
                  hash: string;
                  bsid: string | null;
                  songName: string;
                  songSubName: string;
                  songAuthorName: string;
                  levelAuthorName: string;
                  bpm: number;
                  coverUrl: string;
                  verified: boolean;
               };
               difficulty: {
                  id: number;
                  difficulty: number;
                  rawDifficulty: string;
                  gameMode: string;
               };
               maxScore: number;
               totalScores: number;
               dailyScores: number;
               createdAt: string;
               realm: {
                  realmId: number;
                  realmName: string;
                  leaderboardStatus: 'UNRANKED' | 'RANKED' | 'QUALIFIED' | 'LOVED';
                  positiveModifiers: boolean;
                  stars: number;
                  rankedAt: string | null;
                  qualifiedAt: string | null;
                  lovedAt: string | null;
               };
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/leaderboards/${id}`,
            method: 'GET',
            query: query,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Leaderboard
 * @name LeaderboardControllerGetLeaderboardPlayStatsById
 * @request GET:/api/v2/leaderboards/{id}/play-stats
 * @response `200` `{
    totalPlays: number,
    clearPlays: number,
    failPlays: number,
    quitPlays: number,
    restartPlays: number,
    unknownTimePlays: number,
    bucketSizeSeconds: number,
    refreshedAt: string,
    buckets: ({
    startSeconds: number,
    failPlays: number,
    quitPlays: number,
    restartPlays: number,

})[],

} | null` Leaderboard play outcome stats
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      leaderboardControllerGetLeaderboardPlayStatsById: (
         { id, ...query }: LeaderboardControllerGetLeaderboardPlayStatsByIdParams,
         params: RequestParams = {}
      ) =>
         this.request<
            {
               totalPlays: number;
               clearPlays: number;
               failPlays: number;
               quitPlays: number;
               restartPlays: number;
               unknownTimePlays: number;
               bucketSizeSeconds: number;
               refreshedAt: string;
               buckets: {
                  startSeconds: number;
                  failPlays: number;
                  quitPlays: number;
                  restartPlays: number;
               }[];
            } | null,
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/leaderboards/${id}/play-stats`,
            method: 'GET',
            query: query,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Leaderboard
 * @name LeaderboardControllerGetLeaderboardScoresById
 * @request GET:/api/v2/leaderboards/{id}/scores
 * @response `200` `{
    data: ({
    id: number,
    rank: number,
    unmodifiedScore: number,
    modifiedScore: number,
    accuracy: number,
    pp: number,
    weight: number,
    mods: (string)[],
    badCuts: number,
    missedNotes: number,
    maxCombo: number,
    fullCombo: boolean,
    hasReplay: boolean,
    replayViewCount?: number,
    personalBest: boolean,
    legacyHmdId: number | null,
    version: string | null,
    playOutcome: "CLEAR" | "FAIL" | "QUIT" | "RESTART",
    playOutcomeTime: number | null,
    createdAt: string,
    hasHistory?: boolean,
    player: {
    id: string,
    name: string,
    playerNameInGame: string,
    country: string,
    role: string | null,
    avatar: string,
    avatarVersion: number,
    permissions: number,

},
    device: {
    hmd: string | null,
    controllerLeft: string | null,
    controllerRight: string | null,

} | null,

})[],
    metadata: {
    page: number,
    itemsPerPage: number,
    totalItems: number,
    totalPages: number,

},

}` Paginated leaderboard scores
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      leaderboardControllerGetLeaderboardScoresById: (
         { id, ...query }: LeaderboardControllerGetLeaderboardScoresByIdParams,
         params: RequestParams = {}
      ) =>
         this.request<
            {
               data: {
                  id: number;
                  rank: number;
                  unmodifiedScore: number;
                  modifiedScore: number;
                  accuracy: number;
                  pp: number;
                  weight: number;
                  mods: string[];
                  badCuts: number;
                  missedNotes: number;
                  maxCombo: number;
                  fullCombo: boolean;
                  hasReplay: boolean;
                  replayViewCount?: number;
                  personalBest: boolean;
                  legacyHmdId: number | null;
                  version: string | null;
                  playOutcome: 'CLEAR' | 'FAIL' | 'QUIT' | 'RESTART';
                  playOutcomeTime: number | null;
                  createdAt: string;
                  hasHistory?: boolean;
                  player: {
                     id: string;
                     name: string;
                     playerNameInGame: string;
                     country: string;
                     role: string | null;
                     avatar: string;
                     avatarVersion: number;
                     permissions: number;
                  };
                  device: {
                     hmd: string | null;
                     controllerLeft: string | null;
                     controllerRight: string | null;
                  } | null;
               }[];
               metadata: {
                  page: number;
                  itemsPerPage: number;
                  totalItems: number;
                  totalPages: number;
               };
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/leaderboards/${id}/scores`,
            method: 'GET',
            query: query,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Leaderboard
 * @name LeaderboardControllerGetDifficultiesForHash
 * @request GET:/api/v2/leaderboards/hash/{hash}
 * @response `200` `({
    id: number,
    difficulty: number,
    rawDifficulty: string,
    gameMode: string,

})[]` Difficulties for map hash
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      leaderboardControllerGetDifficultiesForHash: (
         { hash, ...query }: LeaderboardControllerGetDifficultiesForHashParams,
         params: RequestParams = {}
      ) =>
         this.request<
            {
               id: number;
               difficulty: number;
               rawDifficulty: string;
               gameMode: string;
            }[],
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/leaderboards/hash/${hash}`,
            method: 'GET',
            query: query,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Leaderboard
 * @name LeaderboardControllerGetLeaderboardByHash
 * @request GET:/api/v2/leaderboards/hash/{hash}/{mode}/{difficulty}
 * @response `200` `{
    id: number,
    map: {
    id: number,
    hash: string,
    bsid: string | null,
    songName: string,
    songSubName: string,
    songAuthorName: string,
    levelAuthorName: string,
    bpm: number,
    coverUrl: string,
    verified: boolean,

},
    difficulty: {
    id: number,
    difficulty: number,
    rawDifficulty: string,
    gameMode: string,

},
    maxScore: number,
    totalScores: number,
    dailyScores: number,
    createdAt: string,
    realm: {
    realmId: number,
    realmName: string,
    leaderboardStatus: "UNRANKED" | "RANKED" | "QUALIFIED" | "LOVED",
    positiveModifiers: boolean,
    stars: number,
    rankedAt: string | null,
    qualifiedAt: string | null,
    lovedAt: string | null,

},

}` Leaderboard by hash and difficulty
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      leaderboardControllerGetLeaderboardByHash: (
         { hash, mode, difficulty, ...query }: LeaderboardControllerGetLeaderboardByHashParams,
         params: RequestParams = {}
      ) =>
         this.request<
            {
               id: number;
               map: {
                  id: number;
                  hash: string;
                  bsid: string | null;
                  songName: string;
                  songSubName: string;
                  songAuthorName: string;
                  levelAuthorName: string;
                  bpm: number;
                  coverUrl: string;
                  verified: boolean;
               };
               difficulty: {
                  id: number;
                  difficulty: number;
                  rawDifficulty: string;
                  gameMode: string;
               };
               maxScore: number;
               totalScores: number;
               dailyScores: number;
               createdAt: string;
               realm: {
                  realmId: number;
                  realmName: string;
                  leaderboardStatus: 'UNRANKED' | 'RANKED' | 'QUALIFIED' | 'LOVED';
                  positiveModifiers: boolean;
                  stars: number;
                  rankedAt: string | null;
                  qualifiedAt: string | null;
                  lovedAt: string | null;
               };
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/leaderboards/hash/${hash}/${mode}/${difficulty}`,
            method: 'GET',
            query: query,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Leaderboard
 * @name LeaderboardControllerGetLeaderboardScoresByHash
 * @request GET:/api/v2/leaderboards/hash/{hash}/{mode}/{difficulty}/scores
 * @response `200` `{
    data: ({
    id: number,
    rank: number,
    unmodifiedScore: number,
    modifiedScore: number,
    accuracy: number,
    pp: number,
    weight: number,
    mods: (string)[],
    badCuts: number,
    missedNotes: number,
    maxCombo: number,
    fullCombo: boolean,
    hasReplay: boolean,
    replayViewCount?: number,
    personalBest: boolean,
    legacyHmdId: number | null,
    version: string | null,
    playOutcome: "CLEAR" | "FAIL" | "QUIT" | "RESTART",
    playOutcomeTime: number | null,
    createdAt: string,
    hasHistory?: boolean,
    player: {
    id: string,
    name: string,
    playerNameInGame: string,
    country: string,
    role: string | null,
    avatar: string,
    avatarVersion: number,
    permissions: number,

},
    device: {
    hmd: string | null,
    controllerLeft: string | null,
    controllerRight: string | null,

} | null,

})[],
    metadata: {
    page: number,
    itemsPerPage: number,
    totalItems: number,
    totalPages: number,

},
    playerScore: {
    id: number,
    rank: number,
    unmodifiedScore: number,
    modifiedScore: number,
    accuracy: number,
    pp: number,
    weight: number,
    mods: (string)[],
    badCuts: number,
    missedNotes: number,
    maxCombo: number,
    fullCombo: boolean,
    hasReplay: boolean,
    replayViewCount?: number,
    personalBest: boolean,
    legacyHmdId: number | null,
    version: string | null,
    playOutcome: "CLEAR" | "FAIL" | "QUIT" | "RESTART",
    playOutcomeTime: number | null,
    createdAt: string,
    hasHistory?: boolean,
    player: {
    id: string,
    name: string,
    playerNameInGame: string,
    country: string,
    role: string | null,
    avatar: string,
    avatarVersion: number,
    permissions: number,

},
    device: {
    hmd: string | null,
    controllerLeft: string | null,
    controllerRight: string | null,

} | null,

} | null,

}` Scores by hash and difficulty
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      leaderboardControllerGetLeaderboardScoresByHash: (
         { hash, mode, difficulty, ...query }: LeaderboardControllerGetLeaderboardScoresByHashParams,
         params: RequestParams = {}
      ) =>
         this.request<
            {
               data: {
                  id: number;
                  rank: number;
                  unmodifiedScore: number;
                  modifiedScore: number;
                  accuracy: number;
                  pp: number;
                  weight: number;
                  mods: string[];
                  badCuts: number;
                  missedNotes: number;
                  maxCombo: number;
                  fullCombo: boolean;
                  hasReplay: boolean;
                  replayViewCount?: number;
                  personalBest: boolean;
                  legacyHmdId: number | null;
                  version: string | null;
                  playOutcome: 'CLEAR' | 'FAIL' | 'QUIT' | 'RESTART';
                  playOutcomeTime: number | null;
                  createdAt: string;
                  hasHistory?: boolean;
                  player: {
                     id: string;
                     name: string;
                     playerNameInGame: string;
                     country: string;
                     role: string | null;
                     avatar: string;
                     avatarVersion: number;
                     permissions: number;
                  };
                  device: {
                     hmd: string | null;
                     controllerLeft: string | null;
                     controllerRight: string | null;
                  } | null;
               }[];
               metadata: {
                  page: number;
                  itemsPerPage: number;
                  totalItems: number;
                  totalPages: number;
               };
               playerScore: {
                  id: number;
                  rank: number;
                  unmodifiedScore: number;
                  modifiedScore: number;
                  accuracy: number;
                  pp: number;
                  weight: number;
                  mods: string[];
                  badCuts: number;
                  missedNotes: number;
                  maxCombo: number;
                  fullCombo: boolean;
                  hasReplay: boolean;
                  replayViewCount?: number;
                  personalBest: boolean;
                  legacyHmdId: number | null;
                  version: string | null;
                  playOutcome: 'CLEAR' | 'FAIL' | 'QUIT' | 'RESTART';
                  playOutcomeTime: number | null;
                  createdAt: string;
                  hasHistory?: boolean;
                  player: {
                     id: string;
                     name: string;
                     playerNameInGame: string;
                     country: string;
                     role: string | null;
                     avatar: string;
                     avatarVersion: number;
                     permissions: number;
                  };
                  device: {
                     hmd: string | null;
                     controllerLeft: string | null;
                     controllerRight: string | null;
                  } | null;
               } | null;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/leaderboards/hash/${hash}/${mode}/${difficulty}/scores`,
            method: 'GET',
            query: query,
            format: 'json',
            ...params
         })
   };
   livePlatform = {
      /**
 * No description
 *
 * @tags Live Platform
 * @name LiveTournamentControllerListTournaments
 * @request GET:/api/v2/live/tournaments
 * @response `200` `({
    tournamentId: string,
    name: string,
    status: "DRAFT" | "ACTIVE" | "ARCHIVED",
    roleNames: (string)[],
    permissions: ("VIEW_TOURNAMENT" | "EDIT_TOURNAMENT_SETTINGS" | "EDIT_TOURNAMENT_ROLES" | "ASSIGN_TOURNAMENT_ROLES" | "SYNC_TOURNAMENT_PLAYERS" | "MANAGE_MATCH_ROOMS" | "COORDINATE_MATCHES" | "CAST_MATCHES")[],
    createdAt: string,
    updatedAt: string,

})[]` Live tournaments available to the current player
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 */
      liveTournamentControllerListTournaments: (params: RequestParams = {}) =>
         this.request<
            {
               tournamentId: string;
               name: string;
               status: 'DRAFT' | 'ACTIVE' | 'ARCHIVED';
               roleNames: string[];
               permissions: (
                  | 'VIEW_TOURNAMENT'
                  | 'EDIT_TOURNAMENT_SETTINGS'
                  | 'EDIT_TOURNAMENT_ROLES'
                  | 'ASSIGN_TOURNAMENT_ROLES'
                  | 'SYNC_TOURNAMENT_PLAYERS'
                  | 'MANAGE_MATCH_ROOMS'
                  | 'COORDINATE_MATCHES'
                  | 'CAST_MATCHES'
               )[];
               createdAt: string;
               updatedAt: string;
            }[],
            {
               statusCode: 401;
               error: 'Unauthorized';
               code: 'UNAUTHORIZED';
               message: string;
            }
         >({
            path: `/api/v2/live/tournaments`,
            method: 'GET',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Live Platform
 * @name LiveTournamentControllerCreateTournament
 * @request POST:/api/v2/live/tournaments
 * @response `200` `{
    tournamentId: string,
    name: string,
    status: "DRAFT" | "ACTIVE" | "ARCHIVED",
    roleNames: (string)[],
    permissions: ("VIEW_TOURNAMENT" | "EDIT_TOURNAMENT_SETTINGS" | "EDIT_TOURNAMENT_ROLES" | "ASSIGN_TOURNAMENT_ROLES" | "SYNC_TOURNAMENT_PLAYERS" | "MANAGE_MATCH_ROOMS" | "COORDINATE_MATCHES" | "CAST_MATCHES")[],
    createdAt: string,
    updatedAt: string,

}` Created live tournament
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      liveTournamentControllerCreateTournament: (data: LiveTournamentControllerCreateTournamentPayload, params: RequestParams = {}) =>
         this.request<
            {
               tournamentId: string;
               name: string;
               status: 'DRAFT' | 'ACTIVE' | 'ARCHIVED';
               roleNames: string[];
               permissions: (
                  | 'VIEW_TOURNAMENT'
                  | 'EDIT_TOURNAMENT_SETTINGS'
                  | 'EDIT_TOURNAMENT_ROLES'
                  | 'ASSIGN_TOURNAMENT_ROLES'
                  | 'SYNC_TOURNAMENT_PLAYERS'
                  | 'MANAGE_MATCH_ROOMS'
                  | 'COORDINATE_MATCHES'
                  | 'CAST_MATCHES'
               )[];
               createdAt: string;
               updatedAt: string;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/live/tournaments`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Live Platform
 * @name LiveTournamentControllerGetWorkflowOptions
 * @request GET:/api/v2/live/tournaments/options
 * @response `200` `{
    tournamentStatuses: ("DRAFT" | "ACTIVE" | "ARCHIVED")[],
    playerPlatforms: ("STEAM" | "OCULUS" | "UNKNOWN")[],
    roomRosterModes: ("TEAM" | "FLAT")[],
    roomMemberRoles: ("PLAYER" | "VIEWER")[],
    mapDifficulties: ("Easy" | "Normal" | "Hard" | "Expert" | "ExpertPlus")[],
    mapCharacteristics: ("Standard" | "Lawless" | "OneSaber" | "NoArrows" | "NinetyDegree" | "ThreeSixtyDegree" | "Lightshow")[],
    tournamentPermissions: ("VIEW_TOURNAMENT" | "EDIT_TOURNAMENT_SETTINGS" | "EDIT_TOURNAMENT_ROLES" | "ASSIGN_TOURNAMENT_ROLES" | "SYNC_TOURNAMENT_PLAYERS" | "MANAGE_MATCH_ROOMS" | "COORDINATE_MATCHES" | "CAST_MATCHES")[],

}` Live workflow option values
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 */
      liveTournamentControllerGetWorkflowOptions: (params: RequestParams = {}) =>
         this.request<
            {
               tournamentStatuses: ('DRAFT' | 'ACTIVE' | 'ARCHIVED')[];
               playerPlatforms: ('STEAM' | 'OCULUS' | 'UNKNOWN')[];
               roomRosterModes: ('TEAM' | 'FLAT')[];
               roomMemberRoles: ('PLAYER' | 'VIEWER')[];
               mapDifficulties: ('Easy' | 'Normal' | 'Hard' | 'Expert' | 'ExpertPlus')[];
               mapCharacteristics: ('Standard' | 'Lawless' | 'OneSaber' | 'NoArrows' | 'NinetyDegree' | 'ThreeSixtyDegree' | 'Lightshow')[];
               tournamentPermissions: (
                  | 'VIEW_TOURNAMENT'
                  | 'EDIT_TOURNAMENT_SETTINGS'
                  | 'EDIT_TOURNAMENT_ROLES'
                  | 'ASSIGN_TOURNAMENT_ROLES'
                  | 'SYNC_TOURNAMENT_PLAYERS'
                  | 'MANAGE_MATCH_ROOMS'
                  | 'COORDINATE_MATCHES'
                  | 'CAST_MATCHES'
               )[];
            },
            {
               statusCode: 401;
               error: 'Unauthorized';
               code: 'UNAUTHORIZED';
               message: string;
            }
         >({
            path: `/api/v2/live/tournaments/options`,
            method: 'GET',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Live Platform
 * @name LiveTournamentControllerGetSettings
 * @request GET:/api/v2/live/tournaments/{tournamentId}/settings
 * @response `200` `{
    tournamentId: string,
    name: string,
    status: "DRAFT" | "ACTIVE" | "ARCHIVED",
    deniedMods: (string)[],
    liveConnectionUrl: string | null,
    createdAt: string,
    updatedAt: string,

}` Live tournament settings
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      liveTournamentControllerGetSettings: ({ tournamentId }: LiveTournamentControllerGetSettingsParams, params: RequestParams = {}) =>
         this.request<
            {
               tournamentId: string;
               name: string;
               status: 'DRAFT' | 'ACTIVE' | 'ARCHIVED';
               deniedMods: string[];
               liveConnectionUrl: string | null;
               createdAt: string;
               updatedAt: string;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/live/tournaments/${tournamentId}/settings`,
            method: 'GET',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Live Platform
 * @name LiveTournamentControllerUpsertSettings
 * @request PUT:/api/v2/live/tournaments/{tournamentId}/settings
 * @response `200` `{
    tournamentId: string,
    name: string,
    status: "DRAFT" | "ACTIVE" | "ARCHIVED",
    deniedMods: (string)[],
    liveConnectionUrl: string | null,
    createdAt: string,
    updatedAt: string,

}` Updated live tournament settings
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `403` `{
    statusCode: 403,
    error: "Forbidden",
    code: "FORBIDDEN",
    message: string,
    details?: {
    reason: string,

},

}` Forbidden
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      liveTournamentControllerUpsertSettings: (
         { tournamentId }: LiveTournamentControllerUpsertSettingsParams,
         data: LiveTournamentControllerUpsertSettingsPayload,
         params: RequestParams = {}
      ) =>
         this.request<
            {
               tournamentId: string;
               name: string;
               status: 'DRAFT' | 'ACTIVE' | 'ARCHIVED';
               deniedMods: string[];
               liveConnectionUrl: string | null;
               createdAt: string;
               updatedAt: string;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 403;
                 error: 'Forbidden';
                 code: 'FORBIDDEN';
                 message: string;
                 details?: {
                    reason: string;
                 };
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/live/tournaments/${tournamentId}/settings`,
            method: 'PUT',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Live Platform
 * @name LivePlayerControllerListPlayerTournaments
 * @request GET:/api/v2/live/player/tournaments
 * @response `200` `({
    tournamentId: string,
    name: string,
    status: "DRAFT" | "ACTIVE" | "ARCHIVED",
    permissions: ("VIEW_TOURNAMENT" | "EDIT_TOURNAMENT_SETTINGS" | "EDIT_TOURNAMENT_ROLES" | "ASSIGN_TOURNAMENT_ROLES" | "SYNC_TOURNAMENT_PLAYERS" | "MANAGE_MATCH_ROOMS" | "COORDINATE_MATCHES" | "CAST_MATCHES")[],
    roomSummary: string,
    createdAt: string,
    updatedAt: string,

})[]` Active live tournaments available to the current player as a participant
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 */
      livePlayerControllerListPlayerTournaments: (params: RequestParams = {}) =>
         this.request<
            {
               tournamentId: string;
               name: string;
               status: 'DRAFT' | 'ACTIVE' | 'ARCHIVED';
               permissions: (
                  | 'VIEW_TOURNAMENT'
                  | 'EDIT_TOURNAMENT_SETTINGS'
                  | 'EDIT_TOURNAMENT_ROLES'
                  | 'ASSIGN_TOURNAMENT_ROLES'
                  | 'SYNC_TOURNAMENT_PLAYERS'
                  | 'MANAGE_MATCH_ROOMS'
                  | 'COORDINATE_MATCHES'
                  | 'CAST_MATCHES'
               )[];
               roomSummary: string;
               createdAt: string;
               updatedAt: string;
            }[],
            {
               statusCode: 401;
               error: 'Unauthorized';
               code: 'UNAUTHORIZED';
               message: string;
            }
         >({
            path: `/api/v2/live/player/tournaments`,
            method: 'GET',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Live Platform
 * @name LivePlayerControllerListPlayerRooms
 * @request GET:/api/v2/live/player/tournaments/{tournamentId}/rooms
 * @response `200` `({
    tournamentId: string,
    matchId: string,
  /** @pattern ^\d{4}$ *\/
    inviteCode: string,
    state: "OPEN" | "CLOSED" | "ARCHIVED",
    rosterMode: "TEAM" | "FLAT",
    playerCount: number,
    selectedSong: {
    id: number,
    tournamentId: string,
    mapId: number,
    beatSaverKey: string | null,
    mapHash: string,
    difficulty: "Easy" | "Normal" | "Hard" | "Expert" | "ExpertPlus",
    characteristic: "Standard" | "Lawless" | "OneSaber" | "NoArrows" | "NinetyDegree" | "ThreeSixtyDegree" | "Lightshow",
    leaderboardId: number | null,
    songName: string,
    songSubName: string,
    songAuthorName: string,
    levelAuthorName: string,
    bpm: number,
    nps: number,
    durationSeconds: number,
    maxScore: number,
    downloadUrl: string | null,
    coverUrl: string | null,
    createdAt: string,
    updatedAt: string,

} | null,
    createdAt: string,
    updatedAt: string,

})[]` Live match rooms available to the current player as a participant
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      livePlayerControllerListPlayerRooms: ({ tournamentId }: LivePlayerControllerListPlayerRoomsParams, params: RequestParams = {}) =>
         this.request<
            {
               tournamentId: string;
               matchId: string;
               /** @pattern ^\d{4}$ */
               inviteCode: string;
               state: 'OPEN' | 'CLOSED' | 'ARCHIVED';
               rosterMode: 'TEAM' | 'FLAT';
               playerCount: number;
               selectedSong: {
                  id: number;
                  tournamentId: string;
                  mapId: number;
                  beatSaverKey: string | null;
                  mapHash: string;
                  difficulty: 'Easy' | 'Normal' | 'Hard' | 'Expert' | 'ExpertPlus';
                  characteristic: 'Standard' | 'Lawless' | 'OneSaber' | 'NoArrows' | 'NinetyDegree' | 'ThreeSixtyDegree' | 'Lightshow';
                  leaderboardId: number | null;
                  songName: string;
                  songSubName: string;
                  songAuthorName: string;
                  levelAuthorName: string;
                  bpm: number;
                  nps: number;
                  durationSeconds: number;
                  maxScore: number;
                  downloadUrl: string | null;
                  coverUrl: string | null;
                  createdAt: string;
                  updatedAt: string;
               } | null;
               createdAt: string;
               updatedAt: string;
            }[],
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/live/player/tournaments/${tournamentId}/rooms`,
            method: 'GET',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Live Platform
 * @name LivePlayerControllerGetPlayerRoom
 * @request GET:/api/v2/live/player/tournaments/{tournamentId}/rooms/{matchId}
 * @response `200` `{
    tournamentId: string,
    matchId: string,
  /** @pattern ^\d{4}$ *\/
    inviteCode: string,
    state: "OPEN" | "CLOSED" | "ARCHIVED",
    rosterMode: "TEAM" | "FLAT",
    playerCount: number,
    selectedSong: {
    id: number,
    tournamentId: string,
    mapId: number,
    beatSaverKey: string | null,
    mapHash: string,
    difficulty: "Easy" | "Normal" | "Hard" | "Expert" | "ExpertPlus",
    characteristic: "Standard" | "Lawless" | "OneSaber" | "NoArrows" | "NinetyDegree" | "ThreeSixtyDegree" | "Lightshow",
    leaderboardId: number | null,
    songName: string,
    songSubName: string,
    songAuthorName: string,
    levelAuthorName: string,
    bpm: number,
    nps: number,
    durationSeconds: number,
    maxScore: number,
    downloadUrl: string | null,
    coverUrl: string | null,
    createdAt: string,
    updatedAt: string,

} | null,
    members: ({
    playerId: string,
    player: {
    id: string,
    name: string,
    playerNameInGame: string,
    country: string,
    role: string | null,
    avatar: string,
    avatarVersion: number,
    permissions: number,

} | null,
    teamId: number | null,
    teamName: string | null,
    connected: boolean,
    isBot: boolean,
    role: "PLAYER" | "VIEWER",
    active: boolean,
    playState: "IN_MENU" | "PAUSED" | "IN_GAME",
    downloadState: "NONE" | "DOWNLOADING" | "DOWNLOADED" | "ERROR",
    joinedAt: string,
    lastSeenAt: string,

})[],
    createdAt: string,
    updatedAt: string,

}` Live match room details available to the current player as a participant
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      livePlayerControllerGetPlayerRoom: ({ tournamentId, matchId }: LivePlayerControllerGetPlayerRoomParams, params: RequestParams = {}) =>
         this.request<
            {
               tournamentId: string;
               matchId: string;
               /** @pattern ^\d{4}$ */
               inviteCode: string;
               state: 'OPEN' | 'CLOSED' | 'ARCHIVED';
               rosterMode: 'TEAM' | 'FLAT';
               playerCount: number;
               selectedSong: {
                  id: number;
                  tournamentId: string;
                  mapId: number;
                  beatSaverKey: string | null;
                  mapHash: string;
                  difficulty: 'Easy' | 'Normal' | 'Hard' | 'Expert' | 'ExpertPlus';
                  characteristic: 'Standard' | 'Lawless' | 'OneSaber' | 'NoArrows' | 'NinetyDegree' | 'ThreeSixtyDegree' | 'Lightshow';
                  leaderboardId: number | null;
                  songName: string;
                  songSubName: string;
                  songAuthorName: string;
                  levelAuthorName: string;
                  bpm: number;
                  nps: number;
                  durationSeconds: number;
                  maxScore: number;
                  downloadUrl: string | null;
                  coverUrl: string | null;
                  createdAt: string;
                  updatedAt: string;
               } | null;
               members: {
                  playerId: string;
                  player: {
                     id: string;
                     name: string;
                     playerNameInGame: string;
                     country: string;
                     role: string | null;
                     avatar: string;
                     avatarVersion: number;
                     permissions: number;
                  } | null;
                  teamId: number | null;
                  teamName: string | null;
                  connected: boolean;
                  isBot: boolean;
                  role: 'PLAYER' | 'VIEWER';
                  active: boolean;
                  playState: 'IN_MENU' | 'PAUSED' | 'IN_GAME';
                  downloadState: 'NONE' | 'DOWNLOADING' | 'DOWNLOADED' | 'ERROR';
                  joinedAt: string;
                  lastSeenAt: string;
               }[];
               createdAt: string;
               updatedAt: string;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/live/player/tournaments/${tournamentId}/rooms/${matchId}`,
            method: 'GET',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Live Platform
 * @name LivePlayerControllerGetPlayerRoomByInviteCode
 * @request GET:/api/v2/live/player/rooms/by-invite-code/{inviteCode}
 * @response `200` `{
    tournamentId: string,
    matchId: string,
  /** @pattern ^\d{4}$ *\/
    inviteCode: string,
    state: "OPEN" | "CLOSED" | "ARCHIVED",
    rosterMode: "TEAM" | "FLAT",
    playerCount: number,
    selectedSong: {
    id: number,
    tournamentId: string,
    mapId: number,
    beatSaverKey: string | null,
    mapHash: string,
    difficulty: "Easy" | "Normal" | "Hard" | "Expert" | "ExpertPlus",
    characteristic: "Standard" | "Lawless" | "OneSaber" | "NoArrows" | "NinetyDegree" | "ThreeSixtyDegree" | "Lightshow",
    leaderboardId: number | null,
    songName: string,
    songSubName: string,
    songAuthorName: string,
    levelAuthorName: string,
    bpm: number,
    nps: number,
    durationSeconds: number,
    maxScore: number,
    downloadUrl: string | null,
    coverUrl: string | null,
    createdAt: string,
    updatedAt: string,

} | null,
    members: ({
    playerId: string,
    player: {
    id: string,
    name: string,
    playerNameInGame: string,
    country: string,
    role: string | null,
    avatar: string,
    avatarVersion: number,
    permissions: number,

} | null,
    teamId: number | null,
    teamName: string | null,
    connected: boolean,
    isBot: boolean,
    role: "PLAYER" | "VIEWER",
    active: boolean,
    playState: "IN_MENU" | "PAUSED" | "IN_GAME",
    downloadState: "NONE" | "DOWNLOADING" | "DOWNLOADED" | "ERROR",
    joinedAt: string,
    lastSeenAt: string,

})[],
    createdAt: string,
    updatedAt: string,

}` Live match room details for a participant invite code
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      livePlayerControllerGetPlayerRoomByInviteCode: (
         { inviteCode }: LivePlayerControllerGetPlayerRoomByInviteCodeParams,
         params: RequestParams = {}
      ) =>
         this.request<
            {
               tournamentId: string;
               matchId: string;
               /** @pattern ^\d{4}$ */
               inviteCode: string;
               state: 'OPEN' | 'CLOSED' | 'ARCHIVED';
               rosterMode: 'TEAM' | 'FLAT';
               playerCount: number;
               selectedSong: {
                  id: number;
                  tournamentId: string;
                  mapId: number;
                  beatSaverKey: string | null;
                  mapHash: string;
                  difficulty: 'Easy' | 'Normal' | 'Hard' | 'Expert' | 'ExpertPlus';
                  characteristic: 'Standard' | 'Lawless' | 'OneSaber' | 'NoArrows' | 'NinetyDegree' | 'ThreeSixtyDegree' | 'Lightshow';
                  leaderboardId: number | null;
                  songName: string;
                  songSubName: string;
                  songAuthorName: string;
                  levelAuthorName: string;
                  bpm: number;
                  nps: number;
                  durationSeconds: number;
                  maxScore: number;
                  downloadUrl: string | null;
                  coverUrl: string | null;
                  createdAt: string;
                  updatedAt: string;
               } | null;
               members: {
                  playerId: string;
                  player: {
                     id: string;
                     name: string;
                     playerNameInGame: string;
                     country: string;
                     role: string | null;
                     avatar: string;
                     avatarVersion: number;
                     permissions: number;
                  } | null;
                  teamId: number | null;
                  teamName: string | null;
                  connected: boolean;
                  isBot: boolean;
                  role: 'PLAYER' | 'VIEWER';
                  active: boolean;
                  playState: 'IN_MENU' | 'PAUSED' | 'IN_GAME';
                  downloadState: 'NONE' | 'DOWNLOADING' | 'DOWNLOADED' | 'ERROR';
                  joinedAt: string;
                  lastSeenAt: string;
               }[];
               createdAt: string;
               updatedAt: string;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/live/player/rooms/by-invite-code/${inviteCode}`,
            method: 'GET',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Live Platform
 * @name LiveTournamentRosterControllerListRoles
 * @request GET:/api/v2/live/tournaments/{tournamentId}/roles
 * @response `200` `({
    id: number,
    tournamentId: string,
    name: string,
    description: string | null,
    color: string | null,
    order: number,
    permissions: ("VIEW_TOURNAMENT" | "EDIT_TOURNAMENT_SETTINGS" | "EDIT_TOURNAMENT_ROLES" | "ASSIGN_TOURNAMENT_ROLES" | "SYNC_TOURNAMENT_PLAYERS" | "MANAGE_MATCH_ROOMS" | "COORDINATE_MATCHES" | "CAST_MATCHES")[],
    assignments: ({
    roleId: number,
    playerId: string,
    player: {
    id: string,
    name: string,
    playerNameInGame: string,
    country: string,
    role: string | null,
    avatar: string,
    avatarVersion: number,
    permissions: number,

} | null,
    assignedAt: string,

})[],
    createdAt: string,
    updatedAt: string,

})[]` Live tournament roles
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 */
      liveTournamentRosterControllerListRoles: ({ tournamentId }: LiveTournamentRosterControllerListRolesParams, params: RequestParams = {}) =>
         this.request<
            {
               id: number;
               tournamentId: string;
               name: string;
               description: string | null;
               color: string | null;
               order: number;
               permissions: (
                  | 'VIEW_TOURNAMENT'
                  | 'EDIT_TOURNAMENT_SETTINGS'
                  | 'EDIT_TOURNAMENT_ROLES'
                  | 'ASSIGN_TOURNAMENT_ROLES'
                  | 'SYNC_TOURNAMENT_PLAYERS'
                  | 'MANAGE_MATCH_ROOMS'
                  | 'COORDINATE_MATCHES'
                  | 'CAST_MATCHES'
               )[];
               assignments: {
                  roleId: number;
                  playerId: string;
                  player: {
                     id: string;
                     name: string;
                     playerNameInGame: string;
                     country: string;
                     role: string | null;
                     avatar: string;
                     avatarVersion: number;
                     permissions: number;
                  } | null;
                  assignedAt: string;
               }[];
               createdAt: string;
               updatedAt: string;
            }[],
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
         >({
            path: `/api/v2/live/tournaments/${tournamentId}/roles`,
            method: 'GET',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Live Platform
 * @name LiveTournamentRosterControllerUpsertRole
 * @request POST:/api/v2/live/tournaments/{tournamentId}/roles
 * @response `200` `{
    id: number,
    tournamentId: string,
    name: string,
    description: string | null,
    color: string | null,
    order: number,
    permissions: ("VIEW_TOURNAMENT" | "EDIT_TOURNAMENT_SETTINGS" | "EDIT_TOURNAMENT_ROLES" | "ASSIGN_TOURNAMENT_ROLES" | "SYNC_TOURNAMENT_PLAYERS" | "MANAGE_MATCH_ROOMS" | "COORDINATE_MATCHES" | "CAST_MATCHES")[],
    assignments: ({
    roleId: number,
    playerId: string,
    player: {
    id: string,
    name: string,
    playerNameInGame: string,
    country: string,
    role: string | null,
    avatar: string,
    avatarVersion: number,
    permissions: number,

} | null,
    assignedAt: string,

})[],
    createdAt: string,
    updatedAt: string,

}` Created or updated live tournament role
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      liveTournamentRosterControllerUpsertRole: (
         { tournamentId }: LiveTournamentRosterControllerUpsertRoleParams,
         data: LiveTournamentRosterControllerUpsertRolePayload,
         params: RequestParams = {}
      ) =>
         this.request<
            {
               id: number;
               tournamentId: string;
               name: string;
               description: string | null;
               color: string | null;
               order: number;
               permissions: (
                  | 'VIEW_TOURNAMENT'
                  | 'EDIT_TOURNAMENT_SETTINGS'
                  | 'EDIT_TOURNAMENT_ROLES'
                  | 'ASSIGN_TOURNAMENT_ROLES'
                  | 'SYNC_TOURNAMENT_PLAYERS'
                  | 'MANAGE_MATCH_ROOMS'
                  | 'COORDINATE_MATCHES'
                  | 'CAST_MATCHES'
               )[];
               assignments: {
                  roleId: number;
                  playerId: string;
                  player: {
                     id: string;
                     name: string;
                     playerNameInGame: string;
                     country: string;
                     role: string | null;
                     avatar: string;
                     avatarVersion: number;
                     permissions: number;
                  } | null;
                  assignedAt: string;
               }[];
               createdAt: string;
               updatedAt: string;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/live/tournaments/${tournamentId}/roles`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Live Platform
 * @name LiveTournamentRosterControllerDeleteRole
 * @request DELETE:/api/v2/live/tournaments/{tournamentId}/roles/{roleId}
 * @response `200` `{
    success: boolean,

}` Deleted live tournament role
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      liveTournamentRosterControllerDeleteRole: (
         { tournamentId, roleId }: LiveTournamentRosterControllerDeleteRoleParams,
         params: RequestParams = {}
      ) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/live/tournaments/${tournamentId}/roles/${roleId}`,
            method: 'DELETE',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Live Platform
 * @name LiveTournamentRosterControllerAssignRole
 * @request POST:/api/v2/live/tournaments/{tournamentId}/roles/{roleId}/assign
 * @response `200` `{
    success: boolean,

}` Assigned live tournament role
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      liveTournamentRosterControllerAssignRole: (
         { tournamentId, roleId }: LiveTournamentRosterControllerAssignRoleParams,
         data: LiveTournamentRosterControllerAssignRolePayload,
         params: RequestParams = {}
      ) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/live/tournaments/${tournamentId}/roles/${roleId}/assign`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Live Platform
 * @name LiveTournamentRosterControllerUnassignRole
 * @request DELETE:/api/v2/live/tournaments/{tournamentId}/roles/{roleId}/assignments/{playerId}
 * @response `200` `{
    success: boolean,

}` Removed live tournament role assignment
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      liveTournamentRosterControllerUnassignRole: (
         { tournamentId, roleId, playerId }: LiveTournamentRosterControllerUnassignRoleParams,
         params: RequestParams = {}
      ) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/live/tournaments/${tournamentId}/roles/${roleId}/assignments/${playerId}`,
            method: 'DELETE',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Live Platform
 * @name LiveTournamentRosterControllerListTeams
 * @request GET:/api/v2/live/tournaments/{tournamentId}/teams
 * @response `200` `({
    id: number,
    tournamentId: string,
    name: string,
    createdAt: string,
    updatedAt: string,

})[]` Live tournament teams
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 */
      liveTournamentRosterControllerListTeams: ({ tournamentId }: LiveTournamentRosterControllerListTeamsParams, params: RequestParams = {}) =>
         this.request<
            {
               id: number;
               tournamentId: string;
               name: string;
               createdAt: string;
               updatedAt: string;
            }[],
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
         >({
            path: `/api/v2/live/tournaments/${tournamentId}/teams`,
            method: 'GET',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Live Platform
 * @name LiveTournamentRosterControllerUpsertTeam
 * @request POST:/api/v2/live/tournaments/{tournamentId}/teams
 * @response `200` `{
    id: number,
    tournamentId: string,
    name: string,
    createdAt: string,
    updatedAt: string,

}` Created or updated live tournament team
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      liveTournamentRosterControllerUpsertTeam: (
         { tournamentId }: LiveTournamentRosterControllerUpsertTeamParams,
         data: LiveTournamentRosterControllerUpsertTeamPayload,
         params: RequestParams = {}
      ) =>
         this.request<
            {
               id: number;
               tournamentId: string;
               name: string;
               createdAt: string;
               updatedAt: string;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/live/tournaments/${tournamentId}/teams`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Live Platform
 * @name LiveTournamentRosterControllerDeleteTeam
 * @request DELETE:/api/v2/live/tournaments/{tournamentId}/teams/{teamId}
 * @response `200` `{
    success: boolean,

}` Deleted live tournament team
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      liveTournamentRosterControllerDeleteTeam: (
         { tournamentId, teamId }: LiveTournamentRosterControllerDeleteTeamParams,
         params: RequestParams = {}
      ) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/live/tournaments/${tournamentId}/teams/${teamId}`,
            method: 'DELETE',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Live Platform
 * @name LiveTournamentRosterControllerListAuthorizedPlayers
 * @request GET:/api/v2/live/tournaments/{tournamentId}/authorized-players
 * @response `200` `({
    id: number,
    tournamentId: string,
    playerId: string,
    platform: "STEAM" | "OCULUS" | "UNKNOWN",
    player: {
    id: string,
    name: string,
    playerNameInGame: string,
    country: string,
    role: string | null,
    avatar: string,
    avatarVersion: number,
    permissions: number,

} | null,
    teamId: number | null,
    teamName: string | null,
    lastSyncedAt: string | null,
    createdAt: string,
    updatedAt: string,

})[]` Authorized live tournament players
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 */
      liveTournamentRosterControllerListAuthorizedPlayers: (
         { tournamentId }: LiveTournamentRosterControllerListAuthorizedPlayersParams,
         params: RequestParams = {}
      ) =>
         this.request<
            {
               id: number;
               tournamentId: string;
               playerId: string;
               platform: 'STEAM' | 'OCULUS' | 'UNKNOWN';
               player: {
                  id: string;
                  name: string;
                  playerNameInGame: string;
                  country: string;
                  role: string | null;
                  avatar: string;
                  avatarVersion: number;
                  permissions: number;
               } | null;
               teamId: number | null;
               teamName: string | null;
               lastSyncedAt: string | null;
               createdAt: string;
               updatedAt: string;
            }[],
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
         >({
            path: `/api/v2/live/tournaments/${tournamentId}/authorized-players`,
            method: 'GET',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Live Platform
 * @name LiveTournamentRosterControllerSyncAuthorizedPlayers
 * @request PUT:/api/v2/live/tournaments/{tournamentId}/authorized-players
 * @response `200` `{
    players: ({
    id: number,
    tournamentId: string,
    playerId: string,
    platform: "STEAM" | "OCULUS" | "UNKNOWN",
    player: {
    id: string,
    name: string,
    playerNameInGame: string,
    country: string,
    role: string | null,
    avatar: string,
    avatarVersion: number,
    permissions: number,

} | null,
    teamId: number | null,
    teamName: string | null,
    lastSyncedAt: string | null,
    createdAt: string,
    updatedAt: string,

})[],

}` Synced authorized live tournament players
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `403` `{
    statusCode: 403,
    error: "Forbidden",
    code: "FORBIDDEN",
    message: string,
    details?: {
    reason: string,

},

}` Forbidden
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      liveTournamentRosterControllerSyncAuthorizedPlayers: (
         { tournamentId }: LiveTournamentRosterControllerSyncAuthorizedPlayersParams,
         data: LiveTournamentRosterControllerSyncAuthorizedPlayersPayload,
         params: RequestParams = {}
      ) =>
         this.request<
            {
               players: {
                  id: number;
                  tournamentId: string;
                  playerId: string;
                  platform: 'STEAM' | 'OCULUS' | 'UNKNOWN';
                  player: {
                     id: string;
                     name: string;
                     playerNameInGame: string;
                     country: string;
                     role: string | null;
                     avatar: string;
                     avatarVersion: number;
                     permissions: number;
                  } | null;
                  teamId: number | null;
                  teamName: string | null;
                  lastSyncedAt: string | null;
                  createdAt: string;
                  updatedAt: string;
               }[];
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 403;
                 error: 'Forbidden';
                 code: 'FORBIDDEN';
                 message: string;
                 details?: {
                    reason: string;
                 };
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/live/tournaments/${tournamentId}/authorized-players`,
            method: 'PUT',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Live Platform
 * @name LiveMatchRoomControllerListRooms
 * @request GET:/api/v2/live/tournaments/{tournamentId}/rooms
 * @response `200` `({
    id: number,
    tournamentId: string,
    matchId: string,
  /** @pattern ^\d{4}$ *\/
    inviteCode: string,
    state: "OPEN" | "CLOSED" | "ARCHIVED",
    rosterMode: "TEAM" | "FLAT",
    selectedSong: {
    id: number,
    tournamentId: string,
    mapId: number,
    beatSaverKey: string | null,
    mapHash: string,
    difficulty: "Easy" | "Normal" | "Hard" | "Expert" | "ExpertPlus",
    characteristic: "Standard" | "Lawless" | "OneSaber" | "NoArrows" | "NinetyDegree" | "ThreeSixtyDegree" | "Lightshow",
    leaderboardId: number | null,
    songName: string,
    songSubName: string,
    songAuthorName: string,
    levelAuthorName: string,
    bpm: number,
    nps: number,
    durationSeconds: number,
    maxScore: number,
    downloadUrl: string | null,
    coverUrl: string | null,
    createdAt: string,
    updatedAt: string,

} | null,
    loadedSong: boolean,
    members: ({
    playerId: string,
    connected: boolean,
    isBot: boolean,
    role: "PLAYER" | "VIEWER",
    active: boolean,
    playState: "IN_MENU" | "PAUSED" | "IN_GAME",
    downloadState: "NONE" | "DOWNLOADING" | "DOWNLOADED" | "ERROR",
    joinedAt: string,
    lastSeenAt: string,

})[],
    activePlayerIds?: (string)[],
    createdAt: string,
    updatedAt: string,
    closedAt: string | null,

})[]` Live match rooms
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 */
      liveMatchRoomControllerListRooms: ({ tournamentId }: LiveMatchRoomControllerListRoomsParams, params: RequestParams = {}) =>
         this.request<
            {
               id: number;
               tournamentId: string;
               matchId: string;
               /** @pattern ^\d{4}$ */
               inviteCode: string;
               state: 'OPEN' | 'CLOSED' | 'ARCHIVED';
               rosterMode: 'TEAM' | 'FLAT';
               selectedSong: {
                  id: number;
                  tournamentId: string;
                  mapId: number;
                  beatSaverKey: string | null;
                  mapHash: string;
                  difficulty: 'Easy' | 'Normal' | 'Hard' | 'Expert' | 'ExpertPlus';
                  characteristic: 'Standard' | 'Lawless' | 'OneSaber' | 'NoArrows' | 'NinetyDegree' | 'ThreeSixtyDegree' | 'Lightshow';
                  leaderboardId: number | null;
                  songName: string;
                  songSubName: string;
                  songAuthorName: string;
                  levelAuthorName: string;
                  bpm: number;
                  nps: number;
                  durationSeconds: number;
                  maxScore: number;
                  downloadUrl: string | null;
                  coverUrl: string | null;
                  createdAt: string;
                  updatedAt: string;
               } | null;
               loadedSong: boolean;
               members: {
                  playerId: string;
                  connected: boolean;
                  isBot: boolean;
                  role: 'PLAYER' | 'VIEWER';
                  active: boolean;
                  playState: 'IN_MENU' | 'PAUSED' | 'IN_GAME';
                  downloadState: 'NONE' | 'DOWNLOADING' | 'DOWNLOADED' | 'ERROR';
                  joinedAt: string;
                  lastSeenAt: string;
               }[];
               activePlayerIds?: string[];
               createdAt: string;
               updatedAt: string;
               closedAt: string | null;
            }[],
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
         >({
            path: `/api/v2/live/tournaments/${tournamentId}/rooms`,
            method: 'GET',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Live Platform
 * @name LiveMatchRoomControllerUpsertRoom
 * @request POST:/api/v2/live/tournaments/{tournamentId}/rooms
 * @response `200` `{
    id: number,
    tournamentId: string,
    matchId: string,
  /** @pattern ^\d{4}$ *\/
    inviteCode: string,
    state: "OPEN" | "CLOSED" | "ARCHIVED",
    rosterMode: "TEAM" | "FLAT",
    selectedSong: {
    id: number,
    tournamentId: string,
    mapId: number,
    beatSaverKey: string | null,
    mapHash: string,
    difficulty: "Easy" | "Normal" | "Hard" | "Expert" | "ExpertPlus",
    characteristic: "Standard" | "Lawless" | "OneSaber" | "NoArrows" | "NinetyDegree" | "ThreeSixtyDegree" | "Lightshow",
    leaderboardId: number | null,
    songName: string,
    songSubName: string,
    songAuthorName: string,
    levelAuthorName: string,
    bpm: number,
    nps: number,
    durationSeconds: number,
    maxScore: number,
    downloadUrl: string | null,
    coverUrl: string | null,
    createdAt: string,
    updatedAt: string,

} | null,
    loadedSong: boolean,
    members: ({
    playerId: string,
    connected: boolean,
    isBot: boolean,
    role: "PLAYER" | "VIEWER",
    active: boolean,
    playState: "IN_MENU" | "PAUSED" | "IN_GAME",
    downloadState: "NONE" | "DOWNLOADING" | "DOWNLOADED" | "ERROR",
    joinedAt: string,
    lastSeenAt: string,

})[],
    activePlayerIds?: (string)[],
    createdAt: string,
    updatedAt: string,
    closedAt: string | null,

}` Created or updated live match room
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `403` `{
    statusCode: 403,
    error: "Forbidden",
    code: "FORBIDDEN",
    message: string,
    details?: {
    reason: string,

},

}` Forbidden
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      liveMatchRoomControllerUpsertRoom: (
         { tournamentId }: LiveMatchRoomControllerUpsertRoomParams,
         data: LiveMatchRoomControllerUpsertRoomPayload,
         params: RequestParams = {}
      ) =>
         this.request<
            {
               id: number;
               tournamentId: string;
               matchId: string;
               /** @pattern ^\d{4}$ */
               inviteCode: string;
               state: 'OPEN' | 'CLOSED' | 'ARCHIVED';
               rosterMode: 'TEAM' | 'FLAT';
               selectedSong: {
                  id: number;
                  tournamentId: string;
                  mapId: number;
                  beatSaverKey: string | null;
                  mapHash: string;
                  difficulty: 'Easy' | 'Normal' | 'Hard' | 'Expert' | 'ExpertPlus';
                  characteristic: 'Standard' | 'Lawless' | 'OneSaber' | 'NoArrows' | 'NinetyDegree' | 'ThreeSixtyDegree' | 'Lightshow';
                  leaderboardId: number | null;
                  songName: string;
                  songSubName: string;
                  songAuthorName: string;
                  levelAuthorName: string;
                  bpm: number;
                  nps: number;
                  durationSeconds: number;
                  maxScore: number;
                  downloadUrl: string | null;
                  coverUrl: string | null;
                  createdAt: string;
                  updatedAt: string;
               } | null;
               loadedSong: boolean;
               members: {
                  playerId: string;
                  connected: boolean;
                  isBot: boolean;
                  role: 'PLAYER' | 'VIEWER';
                  active: boolean;
                  playState: 'IN_MENU' | 'PAUSED' | 'IN_GAME';
                  downloadState: 'NONE' | 'DOWNLOADING' | 'DOWNLOADED' | 'ERROR';
                  joinedAt: string;
                  lastSeenAt: string;
               }[];
               activePlayerIds?: string[];
               createdAt: string;
               updatedAt: string;
               closedAt: string | null;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 403;
                 error: 'Forbidden';
                 code: 'FORBIDDEN';
                 message: string;
                 details?: {
                    reason: string;
                 };
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/live/tournaments/${tournamentId}/rooms`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Live Platform
 * @name LiveMatchRoomControllerGetRoomsView
 * @request GET:/api/v2/live/tournaments/{tournamentId}/rooms/view
 * @response `200` `{
    settings: {
    tournamentId: string,
    name: string,
    status: "DRAFT" | "ACTIVE" | "ARCHIVED",
    deniedMods: (string)[],
    liveConnectionUrl: string | null,
    createdAt: string,
    updatedAt: string,

},
    access: {
    tournamentId: string,
    roleNames: (string)[],
    permissions: ("VIEW_TOURNAMENT" | "EDIT_TOURNAMENT_SETTINGS" | "EDIT_TOURNAMENT_ROLES" | "ASSIGN_TOURNAMENT_ROLES" | "SYNC_TOURNAMENT_PLAYERS" | "MANAGE_MATCH_ROOMS" | "COORDINATE_MATCHES" | "CAST_MATCHES")[],

},
    rooms: ({
    id: number,
    tournamentId: string,
    matchId: string,
  /** @pattern ^\d{4}$ *\/
    inviteCode: string,
    state: "OPEN" | "CLOSED" | "ARCHIVED",
    rosterMode: "TEAM" | "FLAT",
    selectedSong: {
    id: number,
    tournamentId: string,
    mapId: number,
    beatSaverKey: string | null,
    mapHash: string,
    difficulty: "Easy" | "Normal" | "Hard" | "Expert" | "ExpertPlus",
    characteristic: "Standard" | "Lawless" | "OneSaber" | "NoArrows" | "NinetyDegree" | "ThreeSixtyDegree" | "Lightshow",
    leaderboardId: number | null,
    songName: string,
    songSubName: string,
    songAuthorName: string,
    levelAuthorName: string,
    bpm: number,
    nps: number,
    durationSeconds: number,
    maxScore: number,
    downloadUrl: string | null,
    coverUrl: string | null,
    createdAt: string,
    updatedAt: string,

} | null,
    loadedSong: boolean,
    members: ({
    playerId: string,
    connected: boolean,
    isBot: boolean,
    role: "PLAYER" | "VIEWER",
    active: boolean,
    playState: "IN_MENU" | "PAUSED" | "IN_GAME",
    downloadState: "NONE" | "DOWNLOADING" | "DOWNLOADED" | "ERROR",
    joinedAt: string,
    lastSeenAt: string,

})[],
    activePlayerIds?: (string)[],
    createdAt: string,
    updatedAt: string,
    closedAt: string | null,

})[],
    authorizedPlayers: ({
    id: number,
    tournamentId: string,
    playerId: string,
    platform: "STEAM" | "OCULUS" | "UNKNOWN",
    player: {
    id: string,
    name: string,
    playerNameInGame: string,
    country: string,
    role: string | null,
    avatar: string,
    avatarVersion: number,
    permissions: number,

} | null,
    teamId: number | null,
    teamName: string | null,
    lastSyncedAt: string | null,
    createdAt: string,
    updatedAt: string,

})[],
    teams: ({
    id: number,
    tournamentId: string,
    name: string,
    createdAt: string,
    updatedAt: string,

})[],
    options: {
    tournamentStatuses: ("DRAFT" | "ACTIVE" | "ARCHIVED")[],
    playerPlatforms: ("STEAM" | "OCULUS" | "UNKNOWN")[],
    roomRosterModes: ("TEAM" | "FLAT")[],
    roomMemberRoles: ("PLAYER" | "VIEWER")[],
    mapDifficulties: ("Easy" | "Normal" | "Hard" | "Expert" | "ExpertPlus")[],
    mapCharacteristics: ("Standard" | "Lawless" | "OneSaber" | "NoArrows" | "NinetyDegree" | "ThreeSixtyDegree" | "Lightshow")[],
    tournamentPermissions: ("VIEW_TOURNAMENT" | "EDIT_TOURNAMENT_SETTINGS" | "EDIT_TOURNAMENT_ROLES" | "ASSIGN_TOURNAMENT_ROLES" | "SYNC_TOURNAMENT_PLAYERS" | "MANAGE_MATCH_ROOMS" | "COORDINATE_MATCHES" | "CAST_MATCHES")[],

},

}` Live rooms workflow view
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      liveMatchRoomControllerGetRoomsView: ({ tournamentId }: LiveMatchRoomControllerGetRoomsViewParams, params: RequestParams = {}) =>
         this.request<
            {
               settings: {
                  tournamentId: string;
                  name: string;
                  status: 'DRAFT' | 'ACTIVE' | 'ARCHIVED';
                  deniedMods: string[];
                  liveConnectionUrl: string | null;
                  createdAt: string;
                  updatedAt: string;
               };
               access: {
                  tournamentId: string;
                  roleNames: string[];
                  permissions: (
                     | 'VIEW_TOURNAMENT'
                     | 'EDIT_TOURNAMENT_SETTINGS'
                     | 'EDIT_TOURNAMENT_ROLES'
                     | 'ASSIGN_TOURNAMENT_ROLES'
                     | 'SYNC_TOURNAMENT_PLAYERS'
                     | 'MANAGE_MATCH_ROOMS'
                     | 'COORDINATE_MATCHES'
                     | 'CAST_MATCHES'
                  )[];
               };
               rooms: {
                  id: number;
                  tournamentId: string;
                  matchId: string;
                  /** @pattern ^\d{4}$ */
                  inviteCode: string;
                  state: 'OPEN' | 'CLOSED' | 'ARCHIVED';
                  rosterMode: 'TEAM' | 'FLAT';
                  selectedSong: {
                     id: number;
                     tournamentId: string;
                     mapId: number;
                     beatSaverKey: string | null;
                     mapHash: string;
                     difficulty: 'Easy' | 'Normal' | 'Hard' | 'Expert' | 'ExpertPlus';
                     characteristic: 'Standard' | 'Lawless' | 'OneSaber' | 'NoArrows' | 'NinetyDegree' | 'ThreeSixtyDegree' | 'Lightshow';
                     leaderboardId: number | null;
                     songName: string;
                     songSubName: string;
                     songAuthorName: string;
                     levelAuthorName: string;
                     bpm: number;
                     nps: number;
                     durationSeconds: number;
                     maxScore: number;
                     downloadUrl: string | null;
                     coverUrl: string | null;
                     createdAt: string;
                     updatedAt: string;
                  } | null;
                  loadedSong: boolean;
                  members: {
                     playerId: string;
                     connected: boolean;
                     isBot: boolean;
                     role: 'PLAYER' | 'VIEWER';
                     active: boolean;
                     playState: 'IN_MENU' | 'PAUSED' | 'IN_GAME';
                     downloadState: 'NONE' | 'DOWNLOADING' | 'DOWNLOADED' | 'ERROR';
                     joinedAt: string;
                     lastSeenAt: string;
                  }[];
                  activePlayerIds?: string[];
                  createdAt: string;
                  updatedAt: string;
                  closedAt: string | null;
               }[];
               authorizedPlayers: {
                  id: number;
                  tournamentId: string;
                  playerId: string;
                  platform: 'STEAM' | 'OCULUS' | 'UNKNOWN';
                  player: {
                     id: string;
                     name: string;
                     playerNameInGame: string;
                     country: string;
                     role: string | null;
                     avatar: string;
                     avatarVersion: number;
                     permissions: number;
                  } | null;
                  teamId: number | null;
                  teamName: string | null;
                  lastSyncedAt: string | null;
                  createdAt: string;
                  updatedAt: string;
               }[];
               teams: {
                  id: number;
                  tournamentId: string;
                  name: string;
                  createdAt: string;
                  updatedAt: string;
               }[];
               options: {
                  tournamentStatuses: ('DRAFT' | 'ACTIVE' | 'ARCHIVED')[];
                  playerPlatforms: ('STEAM' | 'OCULUS' | 'UNKNOWN')[];
                  roomRosterModes: ('TEAM' | 'FLAT')[];
                  roomMemberRoles: ('PLAYER' | 'VIEWER')[];
                  mapDifficulties: ('Easy' | 'Normal' | 'Hard' | 'Expert' | 'ExpertPlus')[];
                  mapCharacteristics: ('Standard' | 'Lawless' | 'OneSaber' | 'NoArrows' | 'NinetyDegree' | 'ThreeSixtyDegree' | 'Lightshow')[];
                  tournamentPermissions: (
                     | 'VIEW_TOURNAMENT'
                     | 'EDIT_TOURNAMENT_SETTINGS'
                     | 'EDIT_TOURNAMENT_ROLES'
                     | 'ASSIGN_TOURNAMENT_ROLES'
                     | 'SYNC_TOURNAMENT_PLAYERS'
                     | 'MANAGE_MATCH_ROOMS'
                     | 'COORDINATE_MATCHES'
                     | 'CAST_MATCHES'
                  )[];
               };
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/live/tournaments/${tournamentId}/rooms/view`,
            method: 'GET',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Live Platform
 * @name LiveMatchRoomControllerGetRoomView
 * @request GET:/api/v2/live/tournaments/{tournamentId}/rooms/{matchId}/view
 * @response `200` `{
    settings: {
    tournamentId: string,
    name: string,
    status: "DRAFT" | "ACTIVE" | "ARCHIVED",
    deniedMods: (string)[],
    liveConnectionUrl: string | null,
    createdAt: string,
    updatedAt: string,

},
    access: {
    tournamentId: string,
    roleNames: (string)[],
    permissions: ("VIEW_TOURNAMENT" | "EDIT_TOURNAMENT_SETTINGS" | "EDIT_TOURNAMENT_ROLES" | "ASSIGN_TOURNAMENT_ROLES" | "SYNC_TOURNAMENT_PLAYERS" | "MANAGE_MATCH_ROOMS" | "COORDINATE_MATCHES" | "CAST_MATCHES")[],

},
    room: {
    id: number,
    tournamentId: string,
    matchId: string,
  /** @pattern ^\d{4}$ *\/
    inviteCode: string,
    state: "OPEN" | "CLOSED" | "ARCHIVED",
    rosterMode: "TEAM" | "FLAT",
    selectedSong: {
    id: number,
    tournamentId: string,
    mapId: number,
    beatSaverKey: string | null,
    mapHash: string,
    difficulty: "Easy" | "Normal" | "Hard" | "Expert" | "ExpertPlus",
    characteristic: "Standard" | "Lawless" | "OneSaber" | "NoArrows" | "NinetyDegree" | "ThreeSixtyDegree" | "Lightshow",
    leaderboardId: number | null,
    songName: string,
    songSubName: string,
    songAuthorName: string,
    levelAuthorName: string,
    bpm: number,
    nps: number,
    durationSeconds: number,
    maxScore: number,
    downloadUrl: string | null,
    coverUrl: string | null,
    createdAt: string,
    updatedAt: string,

} | null,
    loadedSong: boolean,
    members: ({
    playerId: string,
    connected: boolean,
    isBot: boolean,
    role: "PLAYER" | "VIEWER",
    active: boolean,
    playState: "IN_MENU" | "PAUSED" | "IN_GAME",
    downloadState: "NONE" | "DOWNLOADING" | "DOWNLOADED" | "ERROR",
    joinedAt: string,
    lastSeenAt: string,

})[],
    activePlayerIds?: (string)[],
    createdAt: string,
    updatedAt: string,
    closedAt: string | null,

},
    finalScores: ({
    id: number,
    tournamentId: string,
    roomId: number,
    matchId: string,
    song: {
    id: number,
    tournamentId: string,
    mapId: number,
    beatSaverKey: string | null,
    mapHash: string,
    difficulty: "Easy" | "Normal" | "Hard" | "Expert" | "ExpertPlus",
    characteristic: "Standard" | "Lawless" | "OneSaber" | "NoArrows" | "NinetyDegree" | "ThreeSixtyDegree" | "Lightshow",
    leaderboardId: number | null,
    songName: string,
    songSubName: string,
    songAuthorName: string,
    levelAuthorName: string,
    bpm: number,
    nps: number,
    durationSeconds: number,
    maxScore: number,
    downloadUrl: string | null,
    coverUrl: string | null,
    createdAt: string,
    updatedAt: string,

},
    scoreId: number,
    playerId: string,
    player: {
    id: string,
    name: string,
    playerNameInGame: string,
    country: string,
    role: string | null,
    avatar: string,
    avatarVersion: number,
    permissions: number,

} | null,
    rank: number | null,
    score: number,
    modifiedScore: number | null,
    maxScore: number | null,
    accuracy: number | null,
    badCuts: number,
    misses: number,
    completion: "PASSED" | "FAILED" | "QUIT",
    fullCombo: boolean,
    reportedAt: string,
    createdAt: string,

})[],
    authorizedPlayers: ({
    id: number,
    tournamentId: string,
    playerId: string,
    platform: "STEAM" | "OCULUS" | "UNKNOWN",
    player: {
    id: string,
    name: string,
    playerNameInGame: string,
    country: string,
    role: string | null,
    avatar: string,
    avatarVersion: number,
    permissions: number,

} | null,
    teamId: number | null,
    teamName: string | null,
    lastSyncedAt: string | null,
    createdAt: string,
    updatedAt: string,

})[],
    teams: ({
    id: number,
    tournamentId: string,
    name: string,
    createdAt: string,
    updatedAt: string,

})[],
    options: {
    tournamentStatuses: ("DRAFT" | "ACTIVE" | "ARCHIVED")[],
    playerPlatforms: ("STEAM" | "OCULUS" | "UNKNOWN")[],
    roomRosterModes: ("TEAM" | "FLAT")[],
    roomMemberRoles: ("PLAYER" | "VIEWER")[],
    mapDifficulties: ("Easy" | "Normal" | "Hard" | "Expert" | "ExpertPlus")[],
    mapCharacteristics: ("Standard" | "Lawless" | "OneSaber" | "NoArrows" | "NinetyDegree" | "ThreeSixtyDegree" | "Lightshow")[],
    tournamentPermissions: ("VIEW_TOURNAMENT" | "EDIT_TOURNAMENT_SETTINGS" | "EDIT_TOURNAMENT_ROLES" | "ASSIGN_TOURNAMENT_ROLES" | "SYNC_TOURNAMENT_PLAYERS" | "MANAGE_MATCH_ROOMS" | "COORDINATE_MATCHES" | "CAST_MATCHES")[],

},

}` Live room workflow view
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `403` `{
    statusCode: 403,
    error: "Forbidden",
    code: "FORBIDDEN",
    message: string,
    details?: {
    reason: string,

},

}` Forbidden
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      liveMatchRoomControllerGetRoomView: ({ tournamentId, matchId }: LiveMatchRoomControllerGetRoomViewParams, params: RequestParams = {}) =>
         this.request<
            {
               settings: {
                  tournamentId: string;
                  name: string;
                  status: 'DRAFT' | 'ACTIVE' | 'ARCHIVED';
                  deniedMods: string[];
                  liveConnectionUrl: string | null;
                  createdAt: string;
                  updatedAt: string;
               };
               access: {
                  tournamentId: string;
                  roleNames: string[];
                  permissions: (
                     | 'VIEW_TOURNAMENT'
                     | 'EDIT_TOURNAMENT_SETTINGS'
                     | 'EDIT_TOURNAMENT_ROLES'
                     | 'ASSIGN_TOURNAMENT_ROLES'
                     | 'SYNC_TOURNAMENT_PLAYERS'
                     | 'MANAGE_MATCH_ROOMS'
                     | 'COORDINATE_MATCHES'
                     | 'CAST_MATCHES'
                  )[];
               };
               room: {
                  id: number;
                  tournamentId: string;
                  matchId: string;
                  /** @pattern ^\d{4}$ */
                  inviteCode: string;
                  state: 'OPEN' | 'CLOSED' | 'ARCHIVED';
                  rosterMode: 'TEAM' | 'FLAT';
                  selectedSong: {
                     id: number;
                     tournamentId: string;
                     mapId: number;
                     beatSaverKey: string | null;
                     mapHash: string;
                     difficulty: 'Easy' | 'Normal' | 'Hard' | 'Expert' | 'ExpertPlus';
                     characteristic: 'Standard' | 'Lawless' | 'OneSaber' | 'NoArrows' | 'NinetyDegree' | 'ThreeSixtyDegree' | 'Lightshow';
                     leaderboardId: number | null;
                     songName: string;
                     songSubName: string;
                     songAuthorName: string;
                     levelAuthorName: string;
                     bpm: number;
                     nps: number;
                     durationSeconds: number;
                     maxScore: number;
                     downloadUrl: string | null;
                     coverUrl: string | null;
                     createdAt: string;
                     updatedAt: string;
                  } | null;
                  loadedSong: boolean;
                  members: {
                     playerId: string;
                     connected: boolean;
                     isBot: boolean;
                     role: 'PLAYER' | 'VIEWER';
                     active: boolean;
                     playState: 'IN_MENU' | 'PAUSED' | 'IN_GAME';
                     downloadState: 'NONE' | 'DOWNLOADING' | 'DOWNLOADED' | 'ERROR';
                     joinedAt: string;
                     lastSeenAt: string;
                  }[];
                  activePlayerIds?: string[];
                  createdAt: string;
                  updatedAt: string;
                  closedAt: string | null;
               };
               finalScores: {
                  id: number;
                  tournamentId: string;
                  roomId: number;
                  matchId: string;
                  song: {
                     id: number;
                     tournamentId: string;
                     mapId: number;
                     beatSaverKey: string | null;
                     mapHash: string;
                     difficulty: 'Easy' | 'Normal' | 'Hard' | 'Expert' | 'ExpertPlus';
                     characteristic: 'Standard' | 'Lawless' | 'OneSaber' | 'NoArrows' | 'NinetyDegree' | 'ThreeSixtyDegree' | 'Lightshow';
                     leaderboardId: number | null;
                     songName: string;
                     songSubName: string;
                     songAuthorName: string;
                     levelAuthorName: string;
                     bpm: number;
                     nps: number;
                     durationSeconds: number;
                     maxScore: number;
                     downloadUrl: string | null;
                     coverUrl: string | null;
                     createdAt: string;
                     updatedAt: string;
                  };
                  scoreId: number;
                  playerId: string;
                  player: {
                     id: string;
                     name: string;
                     playerNameInGame: string;
                     country: string;
                     role: string | null;
                     avatar: string;
                     avatarVersion: number;
                     permissions: number;
                  } | null;
                  rank: number | null;
                  score: number;
                  modifiedScore: number | null;
                  maxScore: number | null;
                  accuracy: number | null;
                  badCuts: number;
                  misses: number;
                  completion: 'PASSED' | 'FAILED' | 'QUIT';
                  fullCombo: boolean;
                  reportedAt: string;
                  createdAt: string;
               }[];
               authorizedPlayers: {
                  id: number;
                  tournamentId: string;
                  playerId: string;
                  platform: 'STEAM' | 'OCULUS' | 'UNKNOWN';
                  player: {
                     id: string;
                     name: string;
                     playerNameInGame: string;
                     country: string;
                     role: string | null;
                     avatar: string;
                     avatarVersion: number;
                     permissions: number;
                  } | null;
                  teamId: number | null;
                  teamName: string | null;
                  lastSyncedAt: string | null;
                  createdAt: string;
                  updatedAt: string;
               }[];
               teams: {
                  id: number;
                  tournamentId: string;
                  name: string;
                  createdAt: string;
                  updatedAt: string;
               }[];
               options: {
                  tournamentStatuses: ('DRAFT' | 'ACTIVE' | 'ARCHIVED')[];
                  playerPlatforms: ('STEAM' | 'OCULUS' | 'UNKNOWN')[];
                  roomRosterModes: ('TEAM' | 'FLAT')[];
                  roomMemberRoles: ('PLAYER' | 'VIEWER')[];
                  mapDifficulties: ('Easy' | 'Normal' | 'Hard' | 'Expert' | 'ExpertPlus')[];
                  mapCharacteristics: ('Standard' | 'Lawless' | 'OneSaber' | 'NoArrows' | 'NinetyDegree' | 'ThreeSixtyDegree' | 'Lightshow')[];
                  tournamentPermissions: (
                     | 'VIEW_TOURNAMENT'
                     | 'EDIT_TOURNAMENT_SETTINGS'
                     | 'EDIT_TOURNAMENT_ROLES'
                     | 'ASSIGN_TOURNAMENT_ROLES'
                     | 'SYNC_TOURNAMENT_PLAYERS'
                     | 'MANAGE_MATCH_ROOMS'
                     | 'COORDINATE_MATCHES'
                     | 'CAST_MATCHES'
                  )[];
               };
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 403;
                 error: 'Forbidden';
                 code: 'FORBIDDEN';
                 message: string;
                 details?: {
                    reason: string;
                 };
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/live/tournaments/${tournamentId}/rooms/${matchId}/view`,
            method: 'GET',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Live Platform
 * @name LiveMatchRoomControllerSetRoomMembers
 * @request PUT:/api/v2/live/tournaments/{tournamentId}/rooms/{matchId}/members
 * @response `200` `{
    id: number,
    tournamentId: string,
    matchId: string,
  /** @pattern ^\d{4}$ *\/
    inviteCode: string,
    state: "OPEN" | "CLOSED" | "ARCHIVED",
    rosterMode: "TEAM" | "FLAT",
    selectedSong: {
    id: number,
    tournamentId: string,
    mapId: number,
    beatSaverKey: string | null,
    mapHash: string,
    difficulty: "Easy" | "Normal" | "Hard" | "Expert" | "ExpertPlus",
    characteristic: "Standard" | "Lawless" | "OneSaber" | "NoArrows" | "NinetyDegree" | "ThreeSixtyDegree" | "Lightshow",
    leaderboardId: number | null,
    songName: string,
    songSubName: string,
    songAuthorName: string,
    levelAuthorName: string,
    bpm: number,
    nps: number,
    durationSeconds: number,
    maxScore: number,
    downloadUrl: string | null,
    coverUrl: string | null,
    createdAt: string,
    updatedAt: string,

} | null,
    loadedSong: boolean,
    members: ({
    playerId: string,
    connected: boolean,
    isBot: boolean,
    role: "PLAYER" | "VIEWER",
    active: boolean,
    playState: "IN_MENU" | "PAUSED" | "IN_GAME",
    downloadState: "NONE" | "DOWNLOADING" | "DOWNLOADED" | "ERROR",
    joinedAt: string,
    lastSeenAt: string,

})[],
    activePlayerIds?: (string)[],
    createdAt: string,
    updatedAt: string,
    closedAt: string | null,

}` Updated live match room members
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `403` `{
    statusCode: 403,
    error: "Forbidden",
    code: "FORBIDDEN",
    message: string,
    details?: {
    reason: string,

},

}` Forbidden
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      liveMatchRoomControllerSetRoomMembers: (
         { tournamentId, matchId }: LiveMatchRoomControllerSetRoomMembersParams,
         data: LiveMatchRoomControllerSetRoomMembersPayload,
         params: RequestParams = {}
      ) =>
         this.request<
            {
               id: number;
               tournamentId: string;
               matchId: string;
               /** @pattern ^\d{4}$ */
               inviteCode: string;
               state: 'OPEN' | 'CLOSED' | 'ARCHIVED';
               rosterMode: 'TEAM' | 'FLAT';
               selectedSong: {
                  id: number;
                  tournamentId: string;
                  mapId: number;
                  beatSaverKey: string | null;
                  mapHash: string;
                  difficulty: 'Easy' | 'Normal' | 'Hard' | 'Expert' | 'ExpertPlus';
                  characteristic: 'Standard' | 'Lawless' | 'OneSaber' | 'NoArrows' | 'NinetyDegree' | 'ThreeSixtyDegree' | 'Lightshow';
                  leaderboardId: number | null;
                  songName: string;
                  songSubName: string;
                  songAuthorName: string;
                  levelAuthorName: string;
                  bpm: number;
                  nps: number;
                  durationSeconds: number;
                  maxScore: number;
                  downloadUrl: string | null;
                  coverUrl: string | null;
                  createdAt: string;
                  updatedAt: string;
               } | null;
               loadedSong: boolean;
               members: {
                  playerId: string;
                  connected: boolean;
                  isBot: boolean;
                  role: 'PLAYER' | 'VIEWER';
                  active: boolean;
                  playState: 'IN_MENU' | 'PAUSED' | 'IN_GAME';
                  downloadState: 'NONE' | 'DOWNLOADING' | 'DOWNLOADED' | 'ERROR';
                  joinedAt: string;
                  lastSeenAt: string;
               }[];
               activePlayerIds?: string[];
               createdAt: string;
               updatedAt: string;
               closedAt: string | null;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 403;
                 error: 'Forbidden';
                 code: 'FORBIDDEN';
                 message: string;
                 details?: {
                    reason: string;
                 };
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/live/tournaments/${tournamentId}/rooms/${matchId}/members`,
            method: 'PUT',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Live Platform
 * @name LiveMatchRoomControllerSetRoomSong
 * @request PUT:/api/v2/live/tournaments/{tournamentId}/rooms/{matchId}/song
 * @response `200` `{
    room: {
    id: number,
    tournamentId: string,
    matchId: string,
  /** @pattern ^\d{4}$ *\/
    inviteCode: string,
    state: "OPEN" | "CLOSED" | "ARCHIVED",
    rosterMode: "TEAM" | "FLAT",
    selectedSong: {
    id: number,
    tournamentId: string,
    mapId: number,
    beatSaverKey: string | null,
    mapHash: string,
    difficulty: "Easy" | "Normal" | "Hard" | "Expert" | "ExpertPlus",
    characteristic: "Standard" | "Lawless" | "OneSaber" | "NoArrows" | "NinetyDegree" | "ThreeSixtyDegree" | "Lightshow",
    leaderboardId: number | null,
    songName: string,
    songSubName: string,
    songAuthorName: string,
    levelAuthorName: string,
    bpm: number,
    nps: number,
    durationSeconds: number,
    maxScore: number,
    downloadUrl: string | null,
    coverUrl: string | null,
    createdAt: string,
    updatedAt: string,

} | null,
    loadedSong: boolean,
    members: ({
    playerId: string,
    connected: boolean,
    isBot: boolean,
    role: "PLAYER" | "VIEWER",
    active: boolean,
    playState: "IN_MENU" | "PAUSED" | "IN_GAME",
    downloadState: "NONE" | "DOWNLOADING" | "DOWNLOADED" | "ERROR",
    joinedAt: string,
    lastSeenAt: string,

})[],
    activePlayerIds?: (string)[],
    createdAt: string,
    updatedAt: string,
    closedAt: string | null,

},
    song: {
    id: number,
    tournamentId: string,
    mapId: number,
    beatSaverKey: string | null,
    mapHash: string,
    difficulty: "Easy" | "Normal" | "Hard" | "Expert" | "ExpertPlus",
    characteristic: "Standard" | "Lawless" | "OneSaber" | "NoArrows" | "NinetyDegree" | "ThreeSixtyDegree" | "Lightshow",
    leaderboardId: number | null,
    songName: string,
    songSubName: string,
    songAuthorName: string,
    levelAuthorName: string,
    bpm: number,
    nps: number,
    durationSeconds: number,
    maxScore: number,
    downloadUrl: string | null,
    coverUrl: string | null,
    createdAt: string,
    updatedAt: string,

},

}` Set and load live match room song
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `403` `{
    statusCode: 403,
    error: "Forbidden",
    code: "FORBIDDEN",
    message: string,
    details?: {
    reason: string,

},

}` Forbidden
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      liveMatchRoomControllerSetRoomSong: (
         { tournamentId, matchId }: LiveMatchRoomControllerSetRoomSongParams,
         data: LiveMatchRoomControllerSetRoomSongPayload,
         params: RequestParams = {}
      ) =>
         this.request<
            {
               room: {
                  id: number;
                  tournamentId: string;
                  matchId: string;
                  /** @pattern ^\d{4}$ */
                  inviteCode: string;
                  state: 'OPEN' | 'CLOSED' | 'ARCHIVED';
                  rosterMode: 'TEAM' | 'FLAT';
                  selectedSong: {
                     id: number;
                     tournamentId: string;
                     mapId: number;
                     beatSaverKey: string | null;
                     mapHash: string;
                     difficulty: 'Easy' | 'Normal' | 'Hard' | 'Expert' | 'ExpertPlus';
                     characteristic: 'Standard' | 'Lawless' | 'OneSaber' | 'NoArrows' | 'NinetyDegree' | 'ThreeSixtyDegree' | 'Lightshow';
                     leaderboardId: number | null;
                     songName: string;
                     songSubName: string;
                     songAuthorName: string;
                     levelAuthorName: string;
                     bpm: number;
                     nps: number;
                     durationSeconds: number;
                     maxScore: number;
                     downloadUrl: string | null;
                     coverUrl: string | null;
                     createdAt: string;
                     updatedAt: string;
                  } | null;
                  loadedSong: boolean;
                  members: {
                     playerId: string;
                     connected: boolean;
                     isBot: boolean;
                     role: 'PLAYER' | 'VIEWER';
                     active: boolean;
                     playState: 'IN_MENU' | 'PAUSED' | 'IN_GAME';
                     downloadState: 'NONE' | 'DOWNLOADING' | 'DOWNLOADED' | 'ERROR';
                     joinedAt: string;
                     lastSeenAt: string;
                  }[];
                  activePlayerIds?: string[];
                  createdAt: string;
                  updatedAt: string;
                  closedAt: string | null;
               };
               song: {
                  id: number;
                  tournamentId: string;
                  mapId: number;
                  beatSaverKey: string | null;
                  mapHash: string;
                  difficulty: 'Easy' | 'Normal' | 'Hard' | 'Expert' | 'ExpertPlus';
                  characteristic: 'Standard' | 'Lawless' | 'OneSaber' | 'NoArrows' | 'NinetyDegree' | 'ThreeSixtyDegree' | 'Lightshow';
                  leaderboardId: number | null;
                  songName: string;
                  songSubName: string;
                  songAuthorName: string;
                  levelAuthorName: string;
                  bpm: number;
                  nps: number;
                  durationSeconds: number;
                  maxScore: number;
                  downloadUrl: string | null;
                  coverUrl: string | null;
                  createdAt: string;
                  updatedAt: string;
               };
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 403;
                 error: 'Forbidden';
                 code: 'FORBIDDEN';
                 message: string;
                 details?: {
                    reason: string;
                 };
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/live/tournaments/${tournamentId}/rooms/${matchId}/song`,
            method: 'PUT',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Live Platform
 * @name LiveMatchRoomControllerCloseRoom
 * @request POST:/api/v2/live/tournaments/{tournamentId}/rooms/{matchId}/close
 * @response `200` `{
    success: boolean,

}` Closed live match room
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `403` `{
    statusCode: 403,
    error: "Forbidden",
    code: "FORBIDDEN",
    message: string,
    details?: {
    reason: string,

},

}` Forbidden
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      liveMatchRoomControllerCloseRoom: ({ tournamentId, matchId }: LiveMatchRoomControllerCloseRoomParams, params: RequestParams = {}) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 403;
                 error: 'Forbidden';
                 code: 'FORBIDDEN';
                 message: string;
                 details?: {
                    reason: string;
                 };
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/live/tournaments/${tournamentId}/rooms/${matchId}/close`,
            method: 'POST',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Live Platform
 * @name LiveMatchRoomControllerDeleteRoom
 * @request DELETE:/api/v2/live/tournaments/{tournamentId}/rooms/{matchId}
 * @response `200` `{
    success: boolean,

}` Deleted live match room
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `403` `{
    statusCode: 403,
    error: "Forbidden",
    code: "FORBIDDEN",
    message: string,
    details?: {
    reason: string,

},

}` Forbidden
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      liveMatchRoomControllerDeleteRoom: ({ tournamentId, matchId }: LiveMatchRoomControllerDeleteRoomParams, params: RequestParams = {}) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 403;
                 error: 'Forbidden';
                 code: 'FORBIDDEN';
                 message: string;
                 details?: {
                    reason: string;
                 };
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/live/tournaments/${tournamentId}/rooms/${matchId}`,
            method: 'DELETE',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Live Platform
 * @name LiveMatchCommandControllerStartMap
 * @request POST:/api/v2/live/tournaments/{tournamentId}/rooms/{matchId}/start
 * @response `200` `{
    success: boolean,

}` Start map command
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `403` `{
    statusCode: 403,
    error: "Forbidden",
    code: "FORBIDDEN",
    message: string,
    details?: {
    reason: string,

},

}` Forbidden
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      liveMatchCommandControllerStartMap: (
         { tournamentId, matchId }: LiveMatchCommandControllerStartMapParams,
         data: LiveMatchCommandControllerStartMapPayload,
         params: RequestParams = {}
      ) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 403;
                 error: 'Forbidden';
                 code: 'FORBIDDEN';
                 message: string;
                 details?: {
                    reason: string;
                 };
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/live/tournaments/${tournamentId}/rooms/${matchId}/start`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Live Platform
 * @name LiveMatchCommandControllerReturnToMenu
 * @request POST:/api/v2/live/tournaments/{tournamentId}/rooms/{matchId}/return-to-menu
 * @response `200` `{
    success: boolean,

}` Return room to menu command
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `403` `{
    statusCode: 403,
    error: "Forbidden",
    code: "FORBIDDEN",
    message: string,
    details?: {
    reason: string,

},

}` Forbidden
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      liveMatchCommandControllerReturnToMenu: ({ tournamentId, matchId }: LiveMatchCommandControllerReturnToMenuParams, params: RequestParams = {}) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 403;
                 error: 'Forbidden';
                 code: 'FORBIDDEN';
                 message: string;
                 details?: {
                    reason: string;
                 };
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/live/tournaments/${tournamentId}/rooms/${matchId}/return-to-menu`,
            method: 'POST',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Live Platform
 * @name LiveMatchCommandControllerPrompt
 * @request POST:/api/v2/live/tournaments/{tournamentId}/rooms/{matchId}/prompt
 * @response `200` `{
    success: boolean,

}` Prompt players command
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `403` `{
    statusCode: 403,
    error: "Forbidden",
    code: "FORBIDDEN",
    message: string,
    details?: {
    reason: string,

},

}` Forbidden
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      liveMatchCommandControllerPrompt: (
         { tournamentId, matchId }: LiveMatchCommandControllerPromptParams,
         data: LiveMatchCommandControllerPromptPayload,
         params: RequestParams = {}
      ) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 403;
                 error: 'Forbidden';
                 code: 'FORBIDDEN';
                 message: string;
                 details?: {
                    reason: string;
                 };
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/live/tournaments/${tournamentId}/rooms/${matchId}/prompt`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Live Platform
 * @name LiveMatchCommandControllerBottifyPlayer
 * @request POST:/api/v2/live/tournaments/{tournamentId}/rooms/{matchId}/players/{playerId}/bottify
 * @response `200` `{
    success: boolean,

}` Turn a room player into a live test bot
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `403` `{
    statusCode: 403,
    error: "Forbidden",
    code: "FORBIDDEN",
    message: string,
    details?: {
    reason: string,

},

}` Forbidden
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      liveMatchCommandControllerBottifyPlayer: (
         { tournamentId, matchId, playerId }: LiveMatchCommandControllerBottifyPlayerParams,
         data: LiveMatchCommandControllerBottifyPlayerPayload,
         params: RequestParams = {}
      ) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 403;
                 error: 'Forbidden';
                 code: 'FORBIDDEN';
                 message: string;
                 details?: {
                    reason: string;
                 };
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/live/tournaments/${tournamentId}/rooms/${matchId}/players/${playerId}/bottify`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Live Platform
 * @name LiveMatchCommandControllerUnbottifyPlayer
 * @request POST:/api/v2/live/tournaments/{tournamentId}/rooms/{matchId}/players/{playerId}/unbottify
 * @response `200` `{
    success: boolean,

}` Turn a live test bot back into a normal room player
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `403` `{
    statusCode: 403,
    error: "Forbidden",
    code: "FORBIDDEN",
    message: string,
    details?: {
    reason: string,

},

}` Forbidden
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      liveMatchCommandControllerUnbottifyPlayer: (
         { tournamentId, matchId, playerId }: LiveMatchCommandControllerUnbottifyPlayerParams,
         params: RequestParams = {}
      ) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 403;
                 error: 'Forbidden';
                 code: 'FORBIDDEN';
                 message: string;
                 details?: {
                    reason: string;
                 };
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/live/tournaments/${tournamentId}/rooms/${matchId}/players/${playerId}/unbottify`,
            method: 'POST',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Live Platform
 * @name LiveMatchCommandControllerFollowRoom
 * @request POST:/api/v2/live/tournaments/{tournamentId}/watch/follow
 * @response `200` `{
    success: boolean,

}` Follow a live room from the current player game client
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `403` `{
    statusCode: 403,
    error: "Forbidden",
    code: "FORBIDDEN",
    message: string,
    details?: {
    reason: string,

},

}` Forbidden
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      liveMatchCommandControllerFollowRoom: (
         { tournamentId }: LiveMatchCommandControllerFollowRoomParams,
         data: LiveMatchCommandControllerFollowRoomPayload,
         params: RequestParams = {}
      ) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 403;
                 error: 'Forbidden';
                 code: 'FORBIDDEN';
                 message: string;
                 details?: {
                    reason: string;
                 };
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/live/tournaments/${tournamentId}/watch/follow`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         })
   };
   map = {
      /**
 * No description
 *
 * @tags Map
 * @name MapControllerGetMapListings
 * @request GET:/api/v2/maps
 * @response `200` `{
    data: ({
    id: number,
    hash: string,
    bsid: string | null,
    songName: string,
    songSubName: string,
    songAuthorName: string,
    levelAuthorName: string,
    bpm: number,
    coverUrl: string,
    verified: boolean,
    totalScores: number,
    dailyScores: number,
    createdAt: string,
    leaderboards: ({
    id: number,
    difficulty: number,
    gameMode: string,
    rawDifficulty: string,
    maxScore: number,
    totalScores: number,
    dailyScores: number,
    createdAt: string,
    realm: {
    realmId: number,
    realmName: string,
    leaderboardStatus: "UNRANKED" | "RANKED" | "QUALIFIED" | "LOVED",
    positiveModifiers: boolean,
    stars: number,
    rankedAt: string | null,
    qualifiedAt: string | null,
    lovedAt: string | null,

},

})[],

})[],
    metadata: {
    page: number,
    itemsPerPage: number,
    totalItems: number,
    totalPages: number,

},

}` Paginated map listings
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      mapControllerGetMapListings: (query: MapControllerGetMapListingsParams, params: RequestParams = {}) =>
         this.request<
            {
               data: {
                  id: number;
                  hash: string;
                  bsid: string | null;
                  songName: string;
                  songSubName: string;
                  songAuthorName: string;
                  levelAuthorName: string;
                  bpm: number;
                  coverUrl: string;
                  verified: boolean;
                  totalScores: number;
                  dailyScores: number;
                  createdAt: string;
                  leaderboards: {
                     id: number;
                     difficulty: number;
                     gameMode: string;
                     rawDifficulty: string;
                     maxScore: number;
                     totalScores: number;
                     dailyScores: number;
                     createdAt: string;
                     realm: {
                        realmId: number;
                        realmName: string;
                        leaderboardStatus: 'UNRANKED' | 'RANKED' | 'QUALIFIED' | 'LOVED';
                        positiveModifiers: boolean;
                        stars: number;
                        rankedAt: string | null;
                        qualifiedAt: string | null;
                        lovedAt: string | null;
                     };
                  }[];
               }[];
               metadata: {
                  page: number;
                  itemsPerPage: number;
                  totalItems: number;
                  totalPages: number;
               };
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/maps`,
            method: 'GET',
            query: query,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Map
 * @name MapControllerGetMapByHash
 * @request GET:/api/v2/maps/hash/{hash}
 * @response `200` `{
    id: number,
    hash: string,
    bsid: string | null,
    songName: string,
    songSubName: string,
    songAuthorName: string,
    levelAuthorName: string,
    bpm: number,
    coverUrl: string,
    verified: boolean,
    totalScores: number,
    dailyScores: number,
    createdAt: string,
    leaderboards: ({
    id: number,
    difficulty: number,
    gameMode: string,
    rawDifficulty: string,
    maxScore: number,
    totalScores: number,
    dailyScores: number,
    createdAt: string,
    realm: {
    realmId: number,
    realmName: string,
    leaderboardStatus: "UNRANKED" | "RANKED" | "QUALIFIED" | "LOVED",
    positiveModifiers: boolean,
    stars: number,
    rankedAt: string | null,
    qualifiedAt: string | null,
    lovedAt: string | null,

},

})[],

}` Map details by hash
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      mapControllerGetMapByHash: ({ hash, ...query }: MapControllerGetMapByHashParams, params: RequestParams = {}) =>
         this.request<
            {
               id: number;
               hash: string;
               bsid: string | null;
               songName: string;
               songSubName: string;
               songAuthorName: string;
               levelAuthorName: string;
               bpm: number;
               coverUrl: string;
               verified: boolean;
               totalScores: number;
               dailyScores: number;
               createdAt: string;
               leaderboards: {
                  id: number;
                  difficulty: number;
                  gameMode: string;
                  rawDifficulty: string;
                  maxScore: number;
                  totalScores: number;
                  dailyScores: number;
                  createdAt: string;
                  realm: {
                     realmId: number;
                     realmName: string;
                     leaderboardStatus: 'UNRANKED' | 'RANKED' | 'QUALIFIED' | 'LOVED';
                     positiveModifiers: boolean;
                     stars: number;
                     rankedAt: string | null;
                     qualifiedAt: string | null;
                     lovedAt: string | null;
                  };
               }[];
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/maps/hash/${hash}`,
            method: 'GET',
            query: query,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Map
 * @name MapControllerGetMapById
 * @request GET:/api/v2/maps/{id}
 * @response `200` `{
    id: number,
    hash: string,
    bsid: string | null,
    songName: string,
    songSubName: string,
    songAuthorName: string,
    levelAuthorName: string,
    bpm: number,
    coverUrl: string,
    verified: boolean,
    totalScores: number,
    dailyScores: number,
    createdAt: string,
    leaderboards: ({
    id: number,
    difficulty: number,
    gameMode: string,
    rawDifficulty: string,
    maxScore: number,
    totalScores: number,
    dailyScores: number,
    createdAt: string,
    realm: {
    realmId: number,
    realmName: string,
    leaderboardStatus: "UNRANKED" | "RANKED" | "QUALIFIED" | "LOVED",
    positiveModifiers: boolean,
    stars: number,
    rankedAt: string | null,
    qualifiedAt: string | null,
    lovedAt: string | null,

},

})[],
    reuploadVersions: ({
    id: number,
    hash: string,
    bsid: string | null,
    songName: string,
    songSubName: string,
    songAuthorName: string,
    levelAuthorName: string,
    bpm: number,
    coverUrl: string,
    verified: boolean,
    totalScores: number,
    dailyScores: number,
    createdAt: string,
    leaderboards: ({
    id: number,
    difficulty: number,
    gameMode: string,
    rawDifficulty: string,
    maxScore: number,
    totalScores: number,
    dailyScores: number,
    createdAt: string,
    realm: {
    realmId: number,
    realmName: string,
    leaderboardStatus: "UNRANKED" | "RANKED" | "QUALIFIED" | "LOVED",
    positiveModifiers: boolean,
    stars: number,
    rankedAt: string | null,
    qualifiedAt: string | null,
    lovedAt: string | null,

},

})[],

})[],
    rankRequest: {
    id: number,
    description: string,
    requestType: "RANK" | "UNRANK",
    approvalStatus: "PENDING" | "QUALIFIED" | "APPROVED" | "DENIED" | "REPLACED",
    replacedBy: {
    id: number,
    map: {
    id: number,
    hash: string,
    bsid: string | null,
    songName: string,
    songSubName: string,
    songAuthorName: string,
    levelAuthorName: string,
    bpm: number,
    coverUrl: string,
    verified: boolean,

},

} | null,
    replacedFrom: {
    id: number,
    map: {
    id: number,
    hash: string,
    bsid: string | null,
    songName: string,
    songSubName: string,
    songAuthorName: string,
    levelAuthorName: string,
    bpm: number,
    coverUrl: string,
    verified: boolean,

},

} | null,
    weight: number,
    createdAt: string,
    difficulties: ({
    id: number,
    description: string,
    approvalStatus: "PENDING" | "QUALIFIED" | "APPROVED" | "DENIED" | "REPLACED",
    leaderboard: {
    id: number,
    map: {
    id: number,
    hash: string,
    bsid: string | null,
    songName: string,
    songSubName: string,
    songAuthorName: string,
    levelAuthorName: string,
    bpm: number,
    coverUrl: string,
    verified: boolean,

},
    difficulty: {
    id: number,
    difficulty: number,
    rawDifficulty: string,
    gameMode: string,

},
    maxScore: number,
    totalScores: number,
    dailyScores: number,
    createdAt: string,
    realm: {
    realmId: number,
    realmName: string,
    leaderboardStatus: "UNRANKED" | "RANKED" | "QUALIFIED" | "LOVED",
    positiveModifiers: boolean,
    stars: number,
    rankedAt: string | null,
    qualifiedAt: string | null,
    lovedAt: string | null,

},

},
    rtVotes: {
    upvotes: number,
    downvotes: number,
    myVote: "UPVOTE" | "DOWNVOTE" | null,

},
    qatVotes: {
    upvotes: number,
    downvotes: number,
    neutrals: number,
    myVote: "UPVOTE" | "DOWNVOTE" | "NEUTRAL" | null,

},
    rtComments: ({
    id: number,
    player: {
    id: string,
    name: string,
    playerNameInGame: string,
    country: string,
    role: string | null,
    avatar: string,
    avatarVersion: number,
    permissions: number,

},
    comment: string,
    createdAt: string,
    edited: boolean,

})[],
    qatComments: ({
    id: number,
    player: {
    id: string,
    name: string,
    playerNameInGame: string,
    country: string,
    role: string | null,
    avatar: string,
    avatarVersion: number,
    permissions: number,

},
    comment: string,
    createdAt: string,
    edited: boolean,

})[],

})[],
    commentsObfuscated: boolean,

} | null,

}` Map details with rank request
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      mapControllerGetMapById: ({ id, ...query }: MapControllerGetMapByIdParams, params: RequestParams = {}) =>
         this.request<
            {
               id: number;
               hash: string;
               bsid: string | null;
               songName: string;
               songSubName: string;
               songAuthorName: string;
               levelAuthorName: string;
               bpm: number;
               coverUrl: string;
               verified: boolean;
               totalScores: number;
               dailyScores: number;
               createdAt: string;
               leaderboards: {
                  id: number;
                  difficulty: number;
                  gameMode: string;
                  rawDifficulty: string;
                  maxScore: number;
                  totalScores: number;
                  dailyScores: number;
                  createdAt: string;
                  realm: {
                     realmId: number;
                     realmName: string;
                     leaderboardStatus: 'UNRANKED' | 'RANKED' | 'QUALIFIED' | 'LOVED';
                     positiveModifiers: boolean;
                     stars: number;
                     rankedAt: string | null;
                     qualifiedAt: string | null;
                     lovedAt: string | null;
                  };
               }[];
               reuploadVersions: {
                  id: number;
                  hash: string;
                  bsid: string | null;
                  songName: string;
                  songSubName: string;
                  songAuthorName: string;
                  levelAuthorName: string;
                  bpm: number;
                  coverUrl: string;
                  verified: boolean;
                  totalScores: number;
                  dailyScores: number;
                  createdAt: string;
                  leaderboards: {
                     id: number;
                     difficulty: number;
                     gameMode: string;
                     rawDifficulty: string;
                     maxScore: number;
                     totalScores: number;
                     dailyScores: number;
                     createdAt: string;
                     realm: {
                        realmId: number;
                        realmName: string;
                        leaderboardStatus: 'UNRANKED' | 'RANKED' | 'QUALIFIED' | 'LOVED';
                        positiveModifiers: boolean;
                        stars: number;
                        rankedAt: string | null;
                        qualifiedAt: string | null;
                        lovedAt: string | null;
                     };
                  }[];
               }[];
               rankRequest: {
                  id: number;
                  description: string;
                  requestType: 'RANK' | 'UNRANK';
                  approvalStatus: 'PENDING' | 'QUALIFIED' | 'APPROVED' | 'DENIED' | 'REPLACED';
                  replacedBy: {
                     id: number;
                     map: {
                        id: number;
                        hash: string;
                        bsid: string | null;
                        songName: string;
                        songSubName: string;
                        songAuthorName: string;
                        levelAuthorName: string;
                        bpm: number;
                        coverUrl: string;
                        verified: boolean;
                     };
                  } | null;
                  replacedFrom: {
                     id: number;
                     map: {
                        id: number;
                        hash: string;
                        bsid: string | null;
                        songName: string;
                        songSubName: string;
                        songAuthorName: string;
                        levelAuthorName: string;
                        bpm: number;
                        coverUrl: string;
                        verified: boolean;
                     };
                  } | null;
                  weight: number;
                  createdAt: string;
                  difficulties: {
                     id: number;
                     description: string;
                     approvalStatus: 'PENDING' | 'QUALIFIED' | 'APPROVED' | 'DENIED' | 'REPLACED';
                     leaderboard: {
                        id: number;
                        map: {
                           id: number;
                           hash: string;
                           bsid: string | null;
                           songName: string;
                           songSubName: string;
                           songAuthorName: string;
                           levelAuthorName: string;
                           bpm: number;
                           coverUrl: string;
                           verified: boolean;
                        };
                        difficulty: {
                           id: number;
                           difficulty: number;
                           rawDifficulty: string;
                           gameMode: string;
                        };
                        maxScore: number;
                        totalScores: number;
                        dailyScores: number;
                        createdAt: string;
                        realm: {
                           realmId: number;
                           realmName: string;
                           leaderboardStatus: 'UNRANKED' | 'RANKED' | 'QUALIFIED' | 'LOVED';
                           positiveModifiers: boolean;
                           stars: number;
                           rankedAt: string | null;
                           qualifiedAt: string | null;
                           lovedAt: string | null;
                        };
                     };
                     rtVotes: {
                        upvotes: number;
                        downvotes: number;
                        myVote: 'UPVOTE' | 'DOWNVOTE' | null;
                     };
                     qatVotes: {
                        upvotes: number;
                        downvotes: number;
                        neutrals: number;
                        myVote: 'UPVOTE' | 'DOWNVOTE' | 'NEUTRAL' | null;
                     };
                     rtComments: {
                        id: number;
                        player: {
                           id: string;
                           name: string;
                           playerNameInGame: string;
                           country: string;
                           role: string | null;
                           avatar: string;
                           avatarVersion: number;
                           permissions: number;
                        };
                        comment: string;
                        createdAt: string;
                        edited: boolean;
                     }[];
                     qatComments: {
                        id: number;
                        player: {
                           id: string;
                           name: string;
                           playerNameInGame: string;
                           country: string;
                           role: string | null;
                           avatar: string;
                           avatarVersion: number;
                           permissions: number;
                        };
                        comment: string;
                        createdAt: string;
                        edited: boolean;
                     }[];
                  }[];
                  commentsObfuscated: boolean;
               } | null;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/maps/${id}`,
            method: 'GET',
            query: query,
            format: 'json',
            ...params
         })
   };
   auth = {
      /**
 * No description
 *
 * @tags Auth
 * @name AuthControllerSteamLogin
 * @request GET:/api/v2/auth/steam
 * @response `200` `{
    redirectUrl: string,

}` Steam OpenID redirect URL
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 */
      authControllerSteamLogin: (query: AuthControllerSteamLoginParams, params: RequestParams = {}) =>
         this.request<
            {
               redirectUrl: string;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
         >({
            path: `/api/v2/auth/steam`,
            method: 'GET',
            query: query,
            format: 'json',
            ...params
         }),

      /**
       * No description
       *
       * @tags Auth
       * @name AuthControllerSteamCallback
       * @request GET:/api/v2/auth/steam/callback
       * @response `200` `void`
       */
      authControllerSteamCallback: (params: RequestParams = {}) =>
         this.request<void, any>({
            path: `/api/v2/auth/steam/callback`,
            method: 'GET',
            ...params
         }),

      /**
 * No description
 *
 * @tags Auth
 * @name AuthControllerPatreonLogin
 * @request GET:/api/v2/auth/patreon
 * @response `200` `{
    redirectUrl: string,

}` Patreon OAuth redirect URL
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 */
      authControllerPatreonLogin: (query: AuthControllerPatreonLoginParams, params: RequestParams = {}) =>
         this.request<
            {
               redirectUrl: string;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
         >({
            path: `/api/v2/auth/patreon`,
            method: 'GET',
            query: query,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Auth
 * @name AuthControllerPatreonCallback
 * @request GET:/api/v2/auth/patreon/callback
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 */
      authControllerPatreonCallback: (query: AuthControllerPatreonCallbackParams, params: RequestParams = {}) =>
         this.request<
            any,
            | {
                 statusCode: 400;
                 error: 'Bad Request';
                 code: 'VALIDATION_ERROR';
                 message: string;
                 details?: {
                    field?: string;
                 };
              }
            | {
                 statusCode: 400;
                 error: 'Bad Request';
                 code: 'REQUEST_VALIDATION_ERROR';
                 message: string;
                 details: {
                    errors: {
                       path: string;
                       message: string;
                    }[];
                 };
              }
            | {
                 statusCode: 400;
                 error: 'Bad Request';
                 code: 'INVALID_PATH_PARAMETER';
                 message: string;
                 details: {
                    errors: {
                       path: string;
                       message: string;
                    }[];
                 };
              }
         >({
            path: `/api/v2/auth/patreon/callback`,
            method: 'GET',
            query: query,
            ...params
         }),

      /**
 * No description
 *
 * @tags Auth
 * @name AuthControllerDiscordLogin
 * @request GET:/api/v2/auth/discord
 * @response `200` `{
    redirectUrl: string,

}` Discord OAuth redirect URL
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 */
      authControllerDiscordLogin: (query: AuthControllerDiscordLoginParams, params: RequestParams = {}) =>
         this.request<
            {
               redirectUrl: string;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
         >({
            path: `/api/v2/auth/discord`,
            method: 'GET',
            query: query,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Auth
 * @name AuthControllerDiscordCallback
 * @request GET:/api/v2/auth/discord/callback
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 */
      authControllerDiscordCallback: (query: AuthControllerDiscordCallbackParams, params: RequestParams = {}) =>
         this.request<
            any,
            | {
                 statusCode: 400;
                 error: 'Bad Request';
                 code: 'VALIDATION_ERROR';
                 message: string;
                 details?: {
                    field?: string;
                 };
              }
            | {
                 statusCode: 400;
                 error: 'Bad Request';
                 code: 'REQUEST_VALIDATION_ERROR';
                 message: string;
                 details: {
                    errors: {
                       path: string;
                       message: string;
                    }[];
                 };
              }
            | {
                 statusCode: 400;
                 error: 'Bad Request';
                 code: 'INVALID_PATH_PARAMETER';
                 message: string;
                 details: {
                    errors: {
                       path: string;
                       message: string;
                    }[];
                 };
              }
         >({
            path: `/api/v2/auth/discord/callback`,
            method: 'GET',
            query: query,
            ...params
         }),

      /**
 * No description
 *
 * @tags Auth
 * @name AuthControllerGetToken
 * @request GET:/api/v2/auth/token
 * @response `200` `{
    token: string,

}` New session token
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 */
      authControllerGetToken: (params: RequestParams = {}) =>
         this.request<
            {
               token: string;
            },
            {
               statusCode: 401;
               error: 'Unauthorized';
               code: 'UNAUTHORIZED';
               message: string;
            }
         >({
            path: `/api/v2/auth/token`,
            method: 'GET',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Auth
 * @name AuthControllerStartEmailLogin
 * @request POST:/api/v2/auth/email/start
 * @response `200` `{
    challengeId: string,
    expiresAt: string,
    resendAvailableAt: string,

}` Start an email one-time-code login challenge
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      authControllerStartEmailLogin: (data: AuthControllerStartEmailLoginPayload, params: RequestParams = {}) =>
         this.request<
            {
               challengeId: string;
               expiresAt: string;
               resendAvailableAt: string;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/auth/email/start`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Auth
 * @name AuthControllerVerifyEmailLogin
 * @request POST:/api/v2/auth/email/verify
 * @response `200` `({
    status: "authenticated",
    token: string,
  /** @pattern ^\d+$ *\/
    playerId: string,

} | {
    status: "pending-game-auth",

} | {
    status: "support-required",

})` Verify an email one-time-code login challenge
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      authControllerVerifyEmailLogin: (data: AuthControllerVerifyEmailLoginPayload, params: RequestParams = {}) =>
         this.request<
            | {
                 status: 'authenticated';
                 token: string;
                 /** @pattern ^\d+$ */
                 playerId: string;
              }
            | {
                 status: 'pending-game-auth';
              }
            | {
                 status: 'support-required';
              },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/auth/email/verify`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Auth
 * @name AuthControllerLogout
 * @request POST:/api/v2/auth/logout
 * @response `200` `{
    success: boolean,

}` Logout result
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      authControllerLogout: (params: RequestParams = {}) =>
         this.request<
            {
               success: boolean;
            },
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/auth/logout`,
            method: 'POST',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Auth
 * @name PasswordAuthControllerStartSignup
 * @request POST:/api/v2/auth/signup/start
 * @response `200` `{
    challengeId: string,
    expiresAt: string,
    resendAvailableAt: string,

}` Start an email signup challenge
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      passwordAuthControllerStartSignup: (data: PasswordAuthControllerStartSignupPayload, params: RequestParams = {}) =>
         this.request<
            {
               challengeId: string;
               expiresAt: string;
               resendAvailableAt: string;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/auth/signup/start`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Auth
 * @name PasswordAuthControllerCompleteSignup
 * @request POST:/api/v2/auth/signup/complete
 * @response `200` `({
    status: "authenticated",
    token: string,
  /** @pattern ^\d+$ *\/
    playerId: string,

} | {
    status: "support-required",

})` Complete signup with a verified email code, password and display name
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      passwordAuthControllerCompleteSignup: (data: PasswordAuthControllerCompleteSignupPayload, params: RequestParams = {}) =>
         this.request<
            | {
                 status: 'authenticated';
                 token: string;
                 /** @pattern ^\d+$ */
                 playerId: string;
              }
            | {
                 status: 'support-required';
              },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/auth/signup/complete`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Auth
 * @name PasswordAuthControllerLoginWithPassword
 * @request POST:/api/v2/auth/password/login
 * @response `200` `({
    status: "authenticated",
    token: string,
  /** @pattern ^\d+$ *\/
    playerId: string,

} | {
    status: "support-required",

})` Log in with email and password
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 */
      passwordAuthControllerLoginWithPassword: (data: PasswordAuthControllerLoginWithPasswordPayload, params: RequestParams = {}) =>
         this.request<
            | {
                 status: 'authenticated';
                 token: string;
                 /** @pattern ^\d+$ */
                 playerId: string;
              }
            | {
                 status: 'support-required';
              },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
         >({
            path: `/api/v2/auth/password/login`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Auth
 * @name PasswordAuthControllerStartPasswordReset
 * @request POST:/api/v2/auth/password/reset/start
 * @response `200` `{
    challengeId: string,
    expiresAt: string,
    resendAvailableAt: string,

}` Start a password reset challenge
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      passwordAuthControllerStartPasswordReset: (data: PasswordAuthControllerStartPasswordResetPayload, params: RequestParams = {}) =>
         this.request<
            {
               challengeId: string;
               expiresAt: string;
               resendAvailableAt: string;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/auth/password/reset/start`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Auth
 * @name PasswordAuthControllerCompletePasswordReset
 * @request POST:/api/v2/auth/password/reset/complete
 * @response `200` `({
    status: "authenticated",
    token: string,
  /** @pattern ^\d+$ *\/
    playerId: string,

} | {
    status: "support-required",

})` Complete a password reset with a verified email code
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      passwordAuthControllerCompletePasswordReset: (data: PasswordAuthControllerCompletePasswordResetPayload, params: RequestParams = {}) =>
         this.request<
            | {
                 status: 'authenticated';
                 token: string;
                 /** @pattern ^\d+$ */
                 playerId: string;
              }
            | {
                 status: 'support-required';
              },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/auth/password/reset/complete`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Auth
 * @name PasswordAuthControllerGetPasswordCredential
 * @request GET:/api/v2/auth/password/credential
 * @response `200` `{
    hasPassword: boolean,
    email: string | null,
    updatedAt: string | null,
    lastUsedAt: string | null,

}` Current account email/password credential state
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 */
      passwordAuthControllerGetPasswordCredential: (params: RequestParams = {}) =>
         this.request<
            {
               hasPassword: boolean;
               email: string | null;
               updatedAt: string | null;
               lastUsedAt: string | null;
            },
            {
               statusCode: 401;
               error: 'Unauthorized';
               code: 'UNAUTHORIZED';
               message: string;
            }
         >({
            path: `/api/v2/auth/password/credential`,
            method: 'GET',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Auth
 * @name PasswordAuthControllerStartPasswordSetup
 * @request POST:/api/v2/auth/password/setup/start
 * @response `200` `{
    challengeId: string,
    expiresAt: string,
    resendAvailableAt: string,

}` Start an email challenge to add password login to the current account
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      passwordAuthControllerStartPasswordSetup: (data: PasswordAuthControllerStartPasswordSetupPayload, params: RequestParams = {}) =>
         this.request<
            {
               challengeId: string;
               expiresAt: string;
               resendAvailableAt: string;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/auth/password/setup/start`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Auth
 * @name PasswordAuthControllerCompletePasswordSetup
 * @request POST:/api/v2/auth/password/setup/complete
 * @response `200` `{
    success: true,
    token: string,

}` Set email/password login for the current account; invalidates all other sessions
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      passwordAuthControllerCompletePasswordSetup: (data: PasswordAuthControllerCompletePasswordSetupPayload, params: RequestParams = {}) =>
         this.request<
            {
               success: true;
               token: string;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/auth/password/setup/complete`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Auth
 * @name PasswordAuthControllerChangePassword
 * @request POST:/api/v2/auth/password/change
 * @response `200` `{
    success: true,
    token: string,

}` Change the account password; invalidates all other sessions
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      passwordAuthControllerChangePassword: (data: PasswordAuthControllerChangePasswordPayload, params: RequestParams = {}) =>
         this.request<
            {
               success: true;
               token: string;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/auth/password/change`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Auth
 * @name PasskeyControllerStartRegistration
 * @request POST:/api/v2/auth/passkey/register/options
 * @response `200` `{
    rp: {
    id?: string,
    name: string,

},
    user: {
    id: string,
    name: string,
    displayName: string,

},
    challenge: string,
    pubKeyCredParams: ({
    alg: number,
    type: "public-key",

})[],
    timeout?: number,
    excludeCredentials?: ({
    id: string,
    type: "public-key",
    transports?: ("ble" | "cable" | "hybrid" | "internal" | "nfc" | "smart-card" | "usb")[],

})[],
    authenticatorSelection?: {
    authenticatorAttachment?: "cross-platform" | "platform",
    residentKey?: "discouraged" | "preferred" | "required",
    requireResidentKey?: boolean,
    userVerification?: "discouraged" | "preferred" | "required",

},
    hints?: ("hybrid" | "security-key" | "client-device")[],
    attestation?: "direct" | "enterprise" | "indirect" | "none",
    attestationFormats?: ("fido-u2f" | "packed" | "android-safetynet" | "android-key" | "tpm" | "apple" | "none")[],
    extensions?: Record<string,any>,

}` Begin passkey registration for the current account
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      passkeyControllerStartRegistration: (params: RequestParams = {}) =>
         this.request<
            {
               rp: {
                  id?: string;
                  name: string;
               };
               user: {
                  id: string;
                  name: string;
                  displayName: string;
               };
               challenge: string;
               pubKeyCredParams: {
                  alg: number;
                  type: 'public-key';
               }[];
               timeout?: number;
               excludeCredentials?: {
                  id: string;
                  type: 'public-key';
                  transports?: ('ble' | 'cable' | 'hybrid' | 'internal' | 'nfc' | 'smart-card' | 'usb')[];
               }[];
               authenticatorSelection?: {
                  authenticatorAttachment?: 'cross-platform' | 'platform';
                  residentKey?: 'discouraged' | 'preferred' | 'required';
                  requireResidentKey?: boolean;
                  userVerification?: 'discouraged' | 'preferred' | 'required';
               };
               hints?: ('hybrid' | 'security-key' | 'client-device')[];
               attestation?: 'direct' | 'enterprise' | 'indirect' | 'none';
               attestationFormats?: ('fido-u2f' | 'packed' | 'android-safetynet' | 'android-key' | 'tpm' | 'apple' | 'none')[];
               extensions?: Record<string, any>;
            },
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/auth/passkey/register/options`,
            method: 'POST',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Auth
 * @name PasskeyControllerVerifyRegistration
 * @request POST:/api/v2/auth/passkey/register/verify
 * @response `200` `{
    id: number,
    label: string,
    deviceType: string,
    backedUp: boolean,
    createdAt: string,
    lastUsedAt: string | null,

}` Verify the browser response and store the new passkey
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      passkeyControllerVerifyRegistration: (data: PasskeyControllerVerifyRegistrationPayload, params: RequestParams = {}) =>
         this.request<
            {
               id: number;
               label: string;
               deviceType: string;
               backedUp: boolean;
               createdAt: string;
               lastUsedAt: string | null;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/auth/passkey/register/verify`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Auth
 * @name PasskeyControllerStartAuthentication
 * @request POST:/api/v2/auth/passkey/login/options
 * @response `200` `{
    sessionId: string,
    options: {
    challenge: string,
    timeout?: number,
    rpId?: string,
    allowCredentials?: ({
    id: string,
    type: "public-key",
    transports?: ("ble" | "cable" | "hybrid" | "internal" | "nfc" | "smart-card" | "usb")[],

})[],
    userVerification?: "discouraged" | "preferred" | "required",
    hints?: ("hybrid" | "security-key" | "client-device")[],
    extensions?: Record<string,any>,

},

}` Begin a usernameless passkey login
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      passkeyControllerStartAuthentication: (params: RequestParams = {}) =>
         this.request<
            {
               sessionId: string;
               options: {
                  challenge: string;
                  timeout?: number;
                  rpId?: string;
                  allowCredentials?: {
                     id: string;
                     type: 'public-key';
                     transports?: ('ble' | 'cable' | 'hybrid' | 'internal' | 'nfc' | 'smart-card' | 'usb')[];
                  }[];
                  userVerification?: 'discouraged' | 'preferred' | 'required';
                  hints?: ('hybrid' | 'security-key' | 'client-device')[];
                  extensions?: Record<string, any>;
               };
            },
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/auth/passkey/login/options`,
            method: 'POST',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Auth
 * @name PasskeyControllerVerifyAuthentication
 * @request POST:/api/v2/auth/passkey/login/verify
 * @response `200` `({
    status: "authenticated",
    token: string,
  /** @pattern ^\d+$ *\/
    playerId: string,

} | {
    status: "support-required",

})` Verify the browser assertion and create a session
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      passkeyControllerVerifyAuthentication: (data: PasskeyControllerVerifyAuthenticationPayload, params: RequestParams = {}) =>
         this.request<
            | {
                 status: 'authenticated';
                 token: string;
                 /** @pattern ^\d+$ */
                 playerId: string;
              }
            | {
                 status: 'support-required';
              },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/auth/passkey/login/verify`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Auth
 * @name PasskeyControllerListPasskeys
 * @request GET:/api/v2/auth/passkeys
 * @response `200` `{
    passkeys: ({
    id: number,
    label: string,
    deviceType: string,
    backedUp: boolean,
    createdAt: string,
    lastUsedAt: string | null,

})[],

}` List passkeys registered to the current account
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 */
      passkeyControllerListPasskeys: (params: RequestParams = {}) =>
         this.request<
            {
               passkeys: {
                  id: number;
                  label: string;
                  deviceType: string;
                  backedUp: boolean;
                  createdAt: string;
                  lastUsedAt: string | null;
               }[];
            },
            {
               statusCode: 401;
               error: 'Unauthorized';
               code: 'UNAUTHORIZED';
               message: string;
            }
         >({
            path: `/api/v2/auth/passkeys`,
            method: 'GET',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Auth
 * @name PasskeyControllerRenamePasskey
 * @request PATCH:/api/v2/auth/passkeys/{id}
 * @response `200` `{
    success: true,

}` Rename a passkey
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      passkeyControllerRenamePasskey: (
         { id }: PasskeyControllerRenamePasskeyParams,
         data: PasskeyControllerRenamePasskeyPayload,
         params: RequestParams = {}
      ) =>
         this.request<
            {
               success: true;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/auth/passkeys/${id}`,
            method: 'PATCH',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Auth
 * @name PasskeyControllerDeletePasskey
 * @request DELETE:/api/v2/auth/passkeys/{id}
 * @response `200` `{
    success: true,

}` Delete a passkey
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      passkeyControllerDeletePasskey: ({ id }: PasskeyControllerDeletePasskeyParams, params: RequestParams = {}) =>
         this.request<
            {
               success: true;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/auth/passkeys/${id}`,
            method: 'DELETE',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Auth
 * @name DeviceCodeControllerStartDeviceLogin
 * @request POST:/api/v2/auth/device/start
 * @response `200` `{
  /** @pattern ^[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{12}$ *\/
    code: string,
    expiresAt: string,

}` Generate a one-time code to sign in on Beat Saber for Quest
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      deviceCodeControllerStartDeviceLogin: (params: RequestParams = {}) =>
         this.request<
            {
               /** @pattern ^[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{12}$ */
               code: string;
               expiresAt: string;
            },
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/auth/device/start`,
            method: 'POST',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Auth
 * @name DeviceCodeControllerGetDeviceLoginStatus
 * @request GET:/api/v2/auth/device/status
 * @response `200` `{
    status: "pending" | "claimed" | "expired",

}` Check whether the current device code has been claimed in-game
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 */
      deviceCodeControllerGetDeviceLoginStatus: (params: RequestParams = {}) =>
         this.request<
            {
               status: 'pending' | 'claimed' | 'expired';
            },
            {
               statusCode: 401;
               error: 'Unauthorized';
               code: 'UNAUTHORIZED';
               message: string;
            }
         >({
            path: `/api/v2/auth/device/status`,
            method: 'GET',
            format: 'json',
            ...params
         })
   };
   oAuth = {
      /**
 * No description
 *
 * @tags OAuth
 * @name OAuthControllerGetAuthorizeInfo
 * @request GET:/api/v2/oauth/authorize/info
 * @response `200` `{
    clientId: string,
    name: string,
    description: string | null,
    scopes: (string)[],

}` Validate an authorization request and return consent info
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 */
      oAuthControllerGetAuthorizeInfo: (query: OAuthControllerGetAuthorizeInfoParams, params: RequestParams = {}) =>
         this.request<
            {
               clientId: string;
               name: string;
               description: string | null;
               scopes: string[];
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
         >({
            path: `/api/v2/oauth/authorize/info`,
            method: 'GET',
            query: query,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags OAuth
 * @name OAuthControllerApproveAuthorization
 * @request POST:/api/v2/oauth/authorize/approve
 * @response `200` `{
    redirectUrl: string,

}` Approve an authorization request and mint a single-use code
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 */
      oAuthControllerApproveAuthorization: (data: OAuthControllerApproveAuthorizationPayload, params: RequestParams = {}) =>
         this.request<
            {
               redirectUrl: string;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
         >({
            path: `/api/v2/oauth/authorize/approve`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags OAuth
 * @name OAuthControllerToken
 * @request POST:/api/v2/oauth/token
 * @response `200` `{
    access_token: string,
    token_type: "Bearer",
    expires_in: number,
    refresh_token: string,
    scope: string,

}` Exchange an authorization code or refresh token for tokens
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 */
      oAuthControllerToken: (data: OAuthControllerTokenPayload, params: RequestParams = {}) =>
         this.request<
            {
               access_token: string;
               token_type: 'Bearer';
               expires_in: number;
               refresh_token: string;
               scope: string;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
         >({
            path: `/api/v2/oauth/token`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags OAuth
 * @name OAuthControllerUserinfo
 * @request GET:/api/v2/oauth/userinfo
 * @response `200` `{
  /** Primary public player id *\/
    id: string,
    scoresaberId: string | null,
    name: string,
    avatar: string,
    country: string,
    role: string | null,
    vanity: string | null,
  /** Present with the identity.providers scope *\/
    providers?: ({
    provider: string,
    id: string,
    isPrimary: boolean,

})[],

}` Profile of the player who granted the token
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 */
      oAuthControllerUserinfo: (params: RequestParams = {}) =>
         this.request<
            {
               /** Primary public player id */
               id: string;
               scoresaberId: string | null;
               name: string;
               avatar: string;
               country: string;
               role: string | null;
               vanity: string | null;
               /** Present with the identity.providers scope */
               providers?: {
                  provider: string;
                  id: string;
                  isPrimary: boolean;
               }[];
            },
            {
               statusCode: 401;
               error: 'Unauthorized';
               code: 'UNAUTHORIZED';
               message: string;
            }
         >({
            path: `/api/v2/oauth/userinfo`,
            method: 'GET',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags OAuth
 * @name OAuthClientControllerListClients
 * @request GET:/api/v2/oauth/clients
 * @response `200` `{
    clients: ({
    id: number,
    clientId: string,
    name: string,
    description: string | null,
    redirectUris: (string)[],
    allowedScopes: string,
    createdAt: string,

})[],

}` List your OAuth applications
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 */
      oAuthClientControllerListClients: (params: RequestParams = {}) =>
         this.request<
            {
               clients: {
                  id: number;
                  clientId: string;
                  name: string;
                  description: string | null;
                  redirectUris: string[];
                  allowedScopes: string;
                  createdAt: string;
               }[];
            },
            {
               statusCode: 401;
               error: 'Unauthorized';
               code: 'UNAUTHORIZED';
               message: string;
            }
         >({
            path: `/api/v2/oauth/clients`,
            method: 'GET',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags OAuth
 * @name OAuthClientControllerCreateClient
 * @request POST:/api/v2/oauth/clients
 * @response `200` `{
    client: {
    id: number,
    clientId: string,
    name: string,
    description: string | null,
    redirectUris: (string)[],
    allowedScopes: string,
    createdAt: string,

},
  /** Shown once; store it now *\/
    clientSecret: string,

}` Register an OAuth application; the secret is only returned here
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 */
      oAuthClientControllerCreateClient: (data: OAuthClientControllerCreateClientPayload, params: RequestParams = {}) =>
         this.request<
            {
               client: {
                  id: number;
                  clientId: string;
                  name: string;
                  description: string | null;
                  redirectUris: string[];
                  allowedScopes: string;
                  createdAt: string;
               };
               /** Shown once; store it now */
               clientSecret: string;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
         >({
            path: `/api/v2/oauth/clients`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags OAuth
 * @name OAuthClientControllerUpdateClient
 * @request PATCH:/api/v2/oauth/clients/{id}
 * @response `200` `{
    id: number,
    clientId: string,
    name: string,
    description: string | null,
    redirectUris: (string)[],
    allowedScopes: string,
    createdAt: string,

}` Update an OAuth application you own
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `403` `{
    statusCode: 403,
    error: "Forbidden",
    code: "FORBIDDEN",
    message: string,
    details?: {
    reason: string,

},

}` Forbidden
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      oAuthClientControllerUpdateClient: (
         { id }: OAuthClientControllerUpdateClientParams,
         data: OAuthClientControllerUpdateClientPayload,
         params: RequestParams = {}
      ) =>
         this.request<
            {
               id: number;
               clientId: string;
               name: string;
               description: string | null;
               redirectUris: string[];
               allowedScopes: string;
               createdAt: string;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 403;
                 error: 'Forbidden';
                 code: 'FORBIDDEN';
                 message: string;
                 details?: {
                    reason: string;
                 };
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/oauth/clients/${id}`,
            method: 'PATCH',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags OAuth
 * @name OAuthClientControllerRevokeClient
 * @request DELETE:/api/v2/oauth/clients/{id}
 * @response `200` `{
    success: boolean,

}` Revoke an OAuth application; all of its tokens stop working
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `403` `{
    statusCode: 403,
    error: "Forbidden",
    code: "FORBIDDEN",
    message: string,
    details?: {
    reason: string,

},

}` Forbidden
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      oAuthClientControllerRevokeClient: ({ id }: OAuthClientControllerRevokeClientParams, params: RequestParams = {}) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 403;
                 error: 'Forbidden';
                 code: 'FORBIDDEN';
                 message: string;
                 details?: {
                    reason: string;
                 };
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/oauth/clients/${id}`,
            method: 'DELETE',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags OAuth
 * @name OAuthClientControllerRotateSecret
 * @request POST:/api/v2/oauth/clients/{id}/rotate-secret
 * @response `200` `{
  /** Shown once; store it now *\/
    clientSecret: string,

}` Rotate the client secret; the new secret is only returned here
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `403` `{
    statusCode: 403,
    error: "Forbidden",
    code: "FORBIDDEN",
    message: string,
    details?: {
    reason: string,

},

}` Forbidden
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      oAuthClientControllerRotateSecret: ({ id }: OAuthClientControllerRotateSecretParams, params: RequestParams = {}) =>
         this.request<
            {
               /** Shown once; store it now */
               clientSecret: string;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 403;
                 error: 'Forbidden';
                 code: 'FORBIDDEN';
                 message: string;
                 details?: {
                    reason: string;
                 };
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/oauth/clients/${id}/rotate-secret`,
            method: 'POST',
            format: 'json',
            ...params
         })
   };
   game = {
      /**
 * No description
 *
 * @tags Game
 * @name GameControllerAuthenticate
 * @request POST:/api/v2/game/auth
 * @response `200` `{
    key: string,
    sessionId: string,
    uploadProtocolVersion?: number,
    clientTrust?: "official" | "development" | "legacy" | "untrusted",
    buildId?: string,
    uploadVersionHash?: string,
  /** Durable quest credential, returned for device-code auth *\/
    questKey?: string,
  /** Public player ID, returned for device-code auth *\/
    playerId?: string,

}` Authenticated game session
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `403` `{
    statusCode: 403,
    error: "Forbidden",
    code: "FORBIDDEN",
    message: string,
    details?: {
    reason: string,

},

}` Forbidden
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      gameControllerAuthenticate: (data: GameControllerAuthenticatePayload, params: RequestParams = {}) =>
         this.request<
            {
               key: string;
               sessionId: string;
               uploadProtocolVersion?: number;
               clientTrust?: 'official' | 'development' | 'legacy' | 'untrusted';
               buildId?: string;
               uploadVersionHash?: string;
               /** Durable quest credential, returned for device-code auth */
               questKey?: string;
               /** Public player ID, returned for device-code auth */
               playerId?: string;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 403;
                 error: 'Forbidden';
                 code: 'FORBIDDEN';
                 message: string;
                 details?: {
                    reason: string;
                 };
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/game/auth`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * @description Requires a game session. Lower or duplicate scores are accepted when otherwise valid.
 *
 * @tags Game
 * @name GameControllerUploadScore
 * @summary Upload a game score
 * @request POST:/api/v2/game/upload
 * @response `200` `{
    success: true,

}` Score upload result
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `403` `{
    statusCode: 403,
    error: "Forbidden",
    code: "FORBIDDEN",
    message: string,
    details?: {
    reason: string,

},

}` Forbidden
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      gameControllerUploadScore: (data: GameControllerUploadScorePayload, params: RequestParams = {}) =>
         this.request<
            {
               success: true;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 403;
                 error: 'Forbidden';
                 code: 'FORBIDDEN';
                 message: string;
                 details?: {
                    reason: string;
                 };
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/game/upload`,
            method: 'POST',
            body: data,
            type: ContentType.FormData,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Game
 * @name GameControllerSetActiveRealms
 * @request PUT:/api/v2/game/realms
 * @response `200` `{
    activeRealmIds: (number)[],

}` Updated active realm IDs
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      gameControllerSetActiveRealms: (data: GameControllerSetActiveRealmsPayload, params: RequestParams = {}) =>
         this.request<
            {
               activeRealmIds: number[];
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/game/realms`,
            method: 'PUT',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         })
   };
   gameUploadBuilds = {
      /**
 * No description
 *
 * @tags Game: Upload Builds
 * @name GameBuildControllerRegisterOfficialBuild
 * @request POST:/api/v2/game/official-builds
 * @response `200` `{
    build: {
    buildId: string,
    pluginVersion: string,
    gameVersion: string,
    uploadVersionHash: string,
    protocolVersion: number,
    status: "ACTIVE" | "REVOKED",
    commitSha: string | null,
    sourceRepository: string | null,
    sourceRef: string | null,
    sourceWorkflowRef: string | null,
    sourceEnvironment: string | null,
    "artifactSha256": string | null,
    artifactUrl: string | null,
    createdAt: string,
    updatedAt: string,
    revokedAt: string | null,

},
    credential: string,

}` Registered official upload build and one-time build credential.
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `403` `{
    statusCode: 403,
    error: "Forbidden",
    code: "FORBIDDEN",
    message: string,
    details?: {
    reason: string,

},

}` Forbidden
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      gameBuildControllerRegisterOfficialBuild: (data: GameBuildControllerRegisterOfficialBuildPayload, params: RequestParams = {}) =>
         this.request<
            {
               build: {
                  buildId: string;
                  pluginVersion: string;
                  gameVersion: string;
                  uploadVersionHash: string;
                  protocolVersion: number;
                  status: 'ACTIVE' | 'REVOKED';
                  commitSha: string | null;
                  sourceRepository: string | null;
                  sourceRef: string | null;
                  sourceWorkflowRef: string | null;
                  sourceEnvironment: string | null;
                  artifactSha256: string | null;
                  artifactUrl: string | null;
                  createdAt: string;
                  updatedAt: string;
                  revokedAt: string | null;
               };
               credential: string;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 403;
                 error: 'Forbidden';
                 code: 'FORBIDDEN';
                 message: string;
                 details?: {
                    reason: string;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/game/official-builds`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         })
   };
   ranking = {
      /**
 * No description
 *
 * @tags Ranking
 * @name RankingControllerGetRequests
 * @request GET:/api/v2/ranking/requests
 * @response `200` `{
    data: ({
    id: number,
    description: string,
    requestType: "RANK" | "UNRANK",
    approvalStatus: "PENDING" | "QUALIFIED" | "APPROVED" | "DENIED" | "REPLACED",
    weight: number,
    createdAt: string,
    map: {
    id: number,
    hash: string,
    bsid: string | null,
    songName: string,
    songSubName: string,
    songAuthorName: string,
    levelAuthorName: string,
    bpm: number,
    coverUrl: string,
    verified: boolean,

},
    difficultyCount: number,
    rtVoteReadiness: {
    status: "READY" | "CLOSE" | "BLOCKED" | "QUEUED",
    missingUpvotes: number,
    downvotes: number,

},
    totalRtVotes: {
    upvotes: number,
    downvotes: number,
    myVote: "UPVOTE" | "DOWNVOTE" | null,

},
    totalQatVotes: {
    upvotes: number,
    downvotes: number,
    neutrals: number,
    myVote: "UPVOTE" | "DOWNVOTE" | "NEUTRAL" | null,

},

})[],
    metadata: {
    page: number,
    itemsPerPage: number,
    totalItems: number,
    totalPages: number,

},

}` Paginated rank requests
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      rankingControllerGetRequests: (query: RankingControllerGetRequestsParams, params: RequestParams = {}) =>
         this.request<
            {
               data: {
                  id: number;
                  description: string;
                  requestType: 'RANK' | 'UNRANK';
                  approvalStatus: 'PENDING' | 'QUALIFIED' | 'APPROVED' | 'DENIED' | 'REPLACED';
                  weight: number;
                  createdAt: string;
                  map: {
                     id: number;
                     hash: string;
                     bsid: string | null;
                     songName: string;
                     songSubName: string;
                     songAuthorName: string;
                     levelAuthorName: string;
                     bpm: number;
                     coverUrl: string;
                     verified: boolean;
                  };
                  difficultyCount: number;
                  rtVoteReadiness: {
                     status: 'READY' | 'CLOSE' | 'BLOCKED' | 'QUEUED';
                     missingUpvotes: number;
                     downvotes: number;
                  };
                  totalRtVotes: {
                     upvotes: number;
                     downvotes: number;
                     myVote: 'UPVOTE' | 'DOWNVOTE' | null;
                  };
                  totalQatVotes: {
                     upvotes: number;
                     downvotes: number;
                     neutrals: number;
                     myVote: 'UPVOTE' | 'DOWNVOTE' | 'NEUTRAL' | null;
                  };
               }[];
               metadata: {
                  page: number;
                  itemsPerPage: number;
                  totalItems: number;
                  totalPages: number;
               };
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/ranking/requests`,
            method: 'GET',
            query: query,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Ranking
 * @name RankingControllerCreateRequest
 * @request POST:/api/v2/ranking/requests
 * @response `200` `{
    id: number,
    description: string,
    requestType: "RANK" | "UNRANK",
    approvalStatus: "PENDING" | "QUALIFIED" | "APPROVED" | "DENIED" | "REPLACED",
    replacedBy: {
    id: number,
    map: {
    id: number,
    hash: string,
    bsid: string | null,
    songName: string,
    songSubName: string,
    songAuthorName: string,
    levelAuthorName: string,
    bpm: number,
    coverUrl: string,
    verified: boolean,

},

} | null,
    replacedFrom: {
    id: number,
    map: {
    id: number,
    hash: string,
    bsid: string | null,
    songName: string,
    songSubName: string,
    songAuthorName: string,
    levelAuthorName: string,
    bpm: number,
    coverUrl: string,
    verified: boolean,

},

} | null,
    weight: number,
    createdAt: string,
    map: {
    id: number,
    hash: string,
    bsid: string | null,
    songName: string,
    songSubName: string,
    songAuthorName: string,
    levelAuthorName: string,
    bpm: number,
    coverUrl: string,
    verified: boolean,

},
    difficulties: ({
    id: number,
    description: string,
    approvalStatus: "PENDING" | "QUALIFIED" | "APPROVED" | "DENIED" | "REPLACED",
    leaderboard: {
    id: number,
    map: {
    id: number,
    hash: string,
    bsid: string | null,
    songName: string,
    songSubName: string,
    songAuthorName: string,
    levelAuthorName: string,
    bpm: number,
    coverUrl: string,
    verified: boolean,

},
    difficulty: {
    id: number,
    difficulty: number,
    rawDifficulty: string,
    gameMode: string,

},
    maxScore: number,
    totalScores: number,
    dailyScores: number,
    createdAt: string,
    realm: {
    realmId: number,
    realmName: string,
    leaderboardStatus: "UNRANKED" | "RANKED" | "QUALIFIED" | "LOVED",
    positiveModifiers: boolean,
    stars: number,
    rankedAt: string | null,
    qualifiedAt: string | null,
    lovedAt: string | null,

},

},
    rtVotes: {
    upvotes: number,
    downvotes: number,
    myVote: "UPVOTE" | "DOWNVOTE" | null,

},
    qatVotes: {
    upvotes: number,
    downvotes: number,
    neutrals: number,
    myVote: "UPVOTE" | "DOWNVOTE" | "NEUTRAL" | null,

},
    rtComments: ({
    id: number,
    player: {
    id: string,
    name: string,
    playerNameInGame: string,
    country: string,
    role: string | null,
    avatar: string,
    avatarVersion: number,
    permissions: number,

},
    comment: string,
    createdAt: string,
    edited: boolean,

})[],
    qatComments: ({
    id: number,
    player: {
    id: string,
    name: string,
    playerNameInGame: string,
    country: string,
    role: string | null,
    avatar: string,
    avatarVersion: number,
    permissions: number,

},
    comment: string,
    createdAt: string,
    edited: boolean,

})[],

})[],
    commentsObfuscated: boolean,

}` Created rank request
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      rankingControllerCreateRequest: (data: RankingControllerCreateRequestPayload, params: RequestParams = {}) =>
         this.request<
            {
               id: number;
               description: string;
               requestType: 'RANK' | 'UNRANK';
               approvalStatus: 'PENDING' | 'QUALIFIED' | 'APPROVED' | 'DENIED' | 'REPLACED';
               replacedBy: {
                  id: number;
                  map: {
                     id: number;
                     hash: string;
                     bsid: string | null;
                     songName: string;
                     songSubName: string;
                     songAuthorName: string;
                     levelAuthorName: string;
                     bpm: number;
                     coverUrl: string;
                     verified: boolean;
                  };
               } | null;
               replacedFrom: {
                  id: number;
                  map: {
                     id: number;
                     hash: string;
                     bsid: string | null;
                     songName: string;
                     songSubName: string;
                     songAuthorName: string;
                     levelAuthorName: string;
                     bpm: number;
                     coverUrl: string;
                     verified: boolean;
                  };
               } | null;
               weight: number;
               createdAt: string;
               map: {
                  id: number;
                  hash: string;
                  bsid: string | null;
                  songName: string;
                  songSubName: string;
                  songAuthorName: string;
                  levelAuthorName: string;
                  bpm: number;
                  coverUrl: string;
                  verified: boolean;
               };
               difficulties: {
                  id: number;
                  description: string;
                  approvalStatus: 'PENDING' | 'QUALIFIED' | 'APPROVED' | 'DENIED' | 'REPLACED';
                  leaderboard: {
                     id: number;
                     map: {
                        id: number;
                        hash: string;
                        bsid: string | null;
                        songName: string;
                        songSubName: string;
                        songAuthorName: string;
                        levelAuthorName: string;
                        bpm: number;
                        coverUrl: string;
                        verified: boolean;
                     };
                     difficulty: {
                        id: number;
                        difficulty: number;
                        rawDifficulty: string;
                        gameMode: string;
                     };
                     maxScore: number;
                     totalScores: number;
                     dailyScores: number;
                     createdAt: string;
                     realm: {
                        realmId: number;
                        realmName: string;
                        leaderboardStatus: 'UNRANKED' | 'RANKED' | 'QUALIFIED' | 'LOVED';
                        positiveModifiers: boolean;
                        stars: number;
                        rankedAt: string | null;
                        qualifiedAt: string | null;
                        lovedAt: string | null;
                     };
                  };
                  rtVotes: {
                     upvotes: number;
                     downvotes: number;
                     myVote: 'UPVOTE' | 'DOWNVOTE' | null;
                  };
                  qatVotes: {
                     upvotes: number;
                     downvotes: number;
                     neutrals: number;
                     myVote: 'UPVOTE' | 'DOWNVOTE' | 'NEUTRAL' | null;
                  };
                  rtComments: {
                     id: number;
                     player: {
                        id: string;
                        name: string;
                        playerNameInGame: string;
                        country: string;
                        role: string | null;
                        avatar: string;
                        avatarVersion: number;
                        permissions: number;
                     };
                     comment: string;
                     createdAt: string;
                     edited: boolean;
                  }[];
                  qatComments: {
                     id: number;
                     player: {
                        id: string;
                        name: string;
                        playerNameInGame: string;
                        country: string;
                        role: string | null;
                        avatar: string;
                        avatarVersion: number;
                        permissions: number;
                     };
                     comment: string;
                     createdAt: string;
                     edited: boolean;
                  }[];
               }[];
               commentsObfuscated: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/ranking/requests`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Ranking
 * @name RankingControllerGetRequestById
 * @request GET:/api/v2/ranking/requests/{id}
 * @response `200` `{
    id: number,
    description: string,
    requestType: "RANK" | "UNRANK",
    approvalStatus: "PENDING" | "QUALIFIED" | "APPROVED" | "DENIED" | "REPLACED",
    replacedBy: {
    id: number,
    map: {
    id: number,
    hash: string,
    bsid: string | null,
    songName: string,
    songSubName: string,
    songAuthorName: string,
    levelAuthorName: string,
    bpm: number,
    coverUrl: string,
    verified: boolean,

},

} | null,
    replacedFrom: {
    id: number,
    map: {
    id: number,
    hash: string,
    bsid: string | null,
    songName: string,
    songSubName: string,
    songAuthorName: string,
    levelAuthorName: string,
    bpm: number,
    coverUrl: string,
    verified: boolean,

},

} | null,
    weight: number,
    createdAt: string,
    map: {
    id: number,
    hash: string,
    bsid: string | null,
    songName: string,
    songSubName: string,
    songAuthorName: string,
    levelAuthorName: string,
    bpm: number,
    coverUrl: string,
    verified: boolean,

},
    difficulties: ({
    id: number,
    description: string,
    approvalStatus: "PENDING" | "QUALIFIED" | "APPROVED" | "DENIED" | "REPLACED",
    leaderboard: {
    id: number,
    map: {
    id: number,
    hash: string,
    bsid: string | null,
    songName: string,
    songSubName: string,
    songAuthorName: string,
    levelAuthorName: string,
    bpm: number,
    coverUrl: string,
    verified: boolean,

},
    difficulty: {
    id: number,
    difficulty: number,
    rawDifficulty: string,
    gameMode: string,

},
    maxScore: number,
    totalScores: number,
    dailyScores: number,
    createdAt: string,
    realm: {
    realmId: number,
    realmName: string,
    leaderboardStatus: "UNRANKED" | "RANKED" | "QUALIFIED" | "LOVED",
    positiveModifiers: boolean,
    stars: number,
    rankedAt: string | null,
    qualifiedAt: string | null,
    lovedAt: string | null,

},

},
    rtVotes: {
    upvotes: number,
    downvotes: number,
    myVote: "UPVOTE" | "DOWNVOTE" | null,

},
    qatVotes: {
    upvotes: number,
    downvotes: number,
    neutrals: number,
    myVote: "UPVOTE" | "DOWNVOTE" | "NEUTRAL" | null,

},
    rtComments: ({
    id: number,
    player: {
    id: string,
    name: string,
    playerNameInGame: string,
    country: string,
    role: string | null,
    avatar: string,
    avatarVersion: number,
    permissions: number,

},
    comment: string,
    createdAt: string,
    edited: boolean,

})[],
    qatComments: ({
    id: number,
    player: {
    id: string,
    name: string,
    playerNameInGame: string,
    country: string,
    role: string | null,
    avatar: string,
    avatarVersion: number,
    permissions: number,

},
    comment: string,
    createdAt: string,
    edited: boolean,

})[],

})[],
    commentsObfuscated: boolean,

}` Rank request details
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      rankingControllerGetRequestById: ({ id, ...query }: RankingControllerGetRequestByIdParams, params: RequestParams = {}) =>
         this.request<
            {
               id: number;
               description: string;
               requestType: 'RANK' | 'UNRANK';
               approvalStatus: 'PENDING' | 'QUALIFIED' | 'APPROVED' | 'DENIED' | 'REPLACED';
               replacedBy: {
                  id: number;
                  map: {
                     id: number;
                     hash: string;
                     bsid: string | null;
                     songName: string;
                     songSubName: string;
                     songAuthorName: string;
                     levelAuthorName: string;
                     bpm: number;
                     coverUrl: string;
                     verified: boolean;
                  };
               } | null;
               replacedFrom: {
                  id: number;
                  map: {
                     id: number;
                     hash: string;
                     bsid: string | null;
                     songName: string;
                     songSubName: string;
                     songAuthorName: string;
                     levelAuthorName: string;
                     bpm: number;
                     coverUrl: string;
                     verified: boolean;
                  };
               } | null;
               weight: number;
               createdAt: string;
               map: {
                  id: number;
                  hash: string;
                  bsid: string | null;
                  songName: string;
                  songSubName: string;
                  songAuthorName: string;
                  levelAuthorName: string;
                  bpm: number;
                  coverUrl: string;
                  verified: boolean;
               };
               difficulties: {
                  id: number;
                  description: string;
                  approvalStatus: 'PENDING' | 'QUALIFIED' | 'APPROVED' | 'DENIED' | 'REPLACED';
                  leaderboard: {
                     id: number;
                     map: {
                        id: number;
                        hash: string;
                        bsid: string | null;
                        songName: string;
                        songSubName: string;
                        songAuthorName: string;
                        levelAuthorName: string;
                        bpm: number;
                        coverUrl: string;
                        verified: boolean;
                     };
                     difficulty: {
                        id: number;
                        difficulty: number;
                        rawDifficulty: string;
                        gameMode: string;
                     };
                     maxScore: number;
                     totalScores: number;
                     dailyScores: number;
                     createdAt: string;
                     realm: {
                        realmId: number;
                        realmName: string;
                        leaderboardStatus: 'UNRANKED' | 'RANKED' | 'QUALIFIED' | 'LOVED';
                        positiveModifiers: boolean;
                        stars: number;
                        rankedAt: string | null;
                        qualifiedAt: string | null;
                        lovedAt: string | null;
                     };
                  };
                  rtVotes: {
                     upvotes: number;
                     downvotes: number;
                     myVote: 'UPVOTE' | 'DOWNVOTE' | null;
                  };
                  qatVotes: {
                     upvotes: number;
                     downvotes: number;
                     neutrals: number;
                     myVote: 'UPVOTE' | 'DOWNVOTE' | 'NEUTRAL' | null;
                  };
                  rtComments: {
                     id: number;
                     player: {
                        id: string;
                        name: string;
                        playerNameInGame: string;
                        country: string;
                        role: string | null;
                        avatar: string;
                        avatarVersion: number;
                        permissions: number;
                     };
                     comment: string;
                     createdAt: string;
                     edited: boolean;
                  }[];
                  qatComments: {
                     id: number;
                     player: {
                        id: string;
                        name: string;
                        playerNameInGame: string;
                        country: string;
                        role: string | null;
                        avatar: string;
                        avatarVersion: number;
                        permissions: number;
                     };
                     comment: string;
                     createdAt: string;
                     edited: boolean;
                  }[];
               }[];
               commentsObfuscated: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/ranking/requests/${id}`,
            method: 'GET',
            query: query,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Ranking
 * @name RankingControllerReplaceRequest
 * @request PUT:/api/v2/ranking/requests/{id}
 * @response `200` `{
    id: number,
    description: string,
    requestType: "RANK" | "UNRANK",
    approvalStatus: "PENDING" | "QUALIFIED" | "APPROVED" | "DENIED" | "REPLACED",
    replacedBy: {
    id: number,
    map: {
    id: number,
    hash: string,
    bsid: string | null,
    songName: string,
    songSubName: string,
    songAuthorName: string,
    levelAuthorName: string,
    bpm: number,
    coverUrl: string,
    verified: boolean,

},

} | null,
    replacedFrom: {
    id: number,
    map: {
    id: number,
    hash: string,
    bsid: string | null,
    songName: string,
    songSubName: string,
    songAuthorName: string,
    levelAuthorName: string,
    bpm: number,
    coverUrl: string,
    verified: boolean,

},

} | null,
    weight: number,
    createdAt: string,
    map: {
    id: number,
    hash: string,
    bsid: string | null,
    songName: string,
    songSubName: string,
    songAuthorName: string,
    levelAuthorName: string,
    bpm: number,
    coverUrl: string,
    verified: boolean,

},
    difficulties: ({
    id: number,
    description: string,
    approvalStatus: "PENDING" | "QUALIFIED" | "APPROVED" | "DENIED" | "REPLACED",
    leaderboard: {
    id: number,
    map: {
    id: number,
    hash: string,
    bsid: string | null,
    songName: string,
    songSubName: string,
    songAuthorName: string,
    levelAuthorName: string,
    bpm: number,
    coverUrl: string,
    verified: boolean,

},
    difficulty: {
    id: number,
    difficulty: number,
    rawDifficulty: string,
    gameMode: string,

},
    maxScore: number,
    totalScores: number,
    dailyScores: number,
    createdAt: string,
    realm: {
    realmId: number,
    realmName: string,
    leaderboardStatus: "UNRANKED" | "RANKED" | "QUALIFIED" | "LOVED",
    positiveModifiers: boolean,
    stars: number,
    rankedAt: string | null,
    qualifiedAt: string | null,
    lovedAt: string | null,

},

},
    rtVotes: {
    upvotes: number,
    downvotes: number,
    myVote: "UPVOTE" | "DOWNVOTE" | null,

},
    qatVotes: {
    upvotes: number,
    downvotes: number,
    neutrals: number,
    myVote: "UPVOTE" | "DOWNVOTE" | "NEUTRAL" | null,

},
    rtComments: ({
    id: number,
    player: {
    id: string,
    name: string,
    playerNameInGame: string,
    country: string,
    role: string | null,
    avatar: string,
    avatarVersion: number,
    permissions: number,

},
    comment: string,
    createdAt: string,
    edited: boolean,

})[],
    qatComments: ({
    id: number,
    player: {
    id: string,
    name: string,
    playerNameInGame: string,
    country: string,
    role: string | null,
    avatar: string,
    avatarVersion: number,
    permissions: number,

},
    comment: string,
    createdAt: string,
    edited: boolean,

})[],

})[],
    commentsObfuscated: boolean,

}` Updated rank request
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      rankingControllerReplaceRequest: (
         { id }: RankingControllerReplaceRequestParams,
         data: RankingControllerReplaceRequestPayload,
         params: RequestParams = {}
      ) =>
         this.request<
            {
               id: number;
               description: string;
               requestType: 'RANK' | 'UNRANK';
               approvalStatus: 'PENDING' | 'QUALIFIED' | 'APPROVED' | 'DENIED' | 'REPLACED';
               replacedBy: {
                  id: number;
                  map: {
                     id: number;
                     hash: string;
                     bsid: string | null;
                     songName: string;
                     songSubName: string;
                     songAuthorName: string;
                     levelAuthorName: string;
                     bpm: number;
                     coverUrl: string;
                     verified: boolean;
                  };
               } | null;
               replacedFrom: {
                  id: number;
                  map: {
                     id: number;
                     hash: string;
                     bsid: string | null;
                     songName: string;
                     songSubName: string;
                     songAuthorName: string;
                     levelAuthorName: string;
                     bpm: number;
                     coverUrl: string;
                     verified: boolean;
                  };
               } | null;
               weight: number;
               createdAt: string;
               map: {
                  id: number;
                  hash: string;
                  bsid: string | null;
                  songName: string;
                  songSubName: string;
                  songAuthorName: string;
                  levelAuthorName: string;
                  bpm: number;
                  coverUrl: string;
                  verified: boolean;
               };
               difficulties: {
                  id: number;
                  description: string;
                  approvalStatus: 'PENDING' | 'QUALIFIED' | 'APPROVED' | 'DENIED' | 'REPLACED';
                  leaderboard: {
                     id: number;
                     map: {
                        id: number;
                        hash: string;
                        bsid: string | null;
                        songName: string;
                        songSubName: string;
                        songAuthorName: string;
                        levelAuthorName: string;
                        bpm: number;
                        coverUrl: string;
                        verified: boolean;
                     };
                     difficulty: {
                        id: number;
                        difficulty: number;
                        rawDifficulty: string;
                        gameMode: string;
                     };
                     maxScore: number;
                     totalScores: number;
                     dailyScores: number;
                     createdAt: string;
                     realm: {
                        realmId: number;
                        realmName: string;
                        leaderboardStatus: 'UNRANKED' | 'RANKED' | 'QUALIFIED' | 'LOVED';
                        positiveModifiers: boolean;
                        stars: number;
                        rankedAt: string | null;
                        qualifiedAt: string | null;
                        lovedAt: string | null;
                     };
                  };
                  rtVotes: {
                     upvotes: number;
                     downvotes: number;
                     myVote: 'UPVOTE' | 'DOWNVOTE' | null;
                  };
                  qatVotes: {
                     upvotes: number;
                     downvotes: number;
                     neutrals: number;
                     myVote: 'UPVOTE' | 'DOWNVOTE' | 'NEUTRAL' | null;
                  };
                  rtComments: {
                     id: number;
                     player: {
                        id: string;
                        name: string;
                        playerNameInGame: string;
                        country: string;
                        role: string | null;
                        avatar: string;
                        avatarVersion: number;
                        permissions: number;
                     };
                     comment: string;
                     createdAt: string;
                     edited: boolean;
                  }[];
                  qatComments: {
                     id: number;
                     player: {
                        id: string;
                        name: string;
                        playerNameInGame: string;
                        country: string;
                        role: string | null;
                        avatar: string;
                        avatarVersion: number;
                        permissions: number;
                     };
                     comment: string;
                     createdAt: string;
                     edited: boolean;
                  }[];
               }[];
               commentsObfuscated: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/ranking/requests/${id}`,
            method: 'PUT',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Ranking
 * @name RankingControllerCreateUnrankRequest
 * @request POST:/api/v2/ranking/requests/unrank
 * @response `200` `{
    id: number,
    description: string,
    requestType: "RANK" | "UNRANK",
    approvalStatus: "PENDING" | "QUALIFIED" | "APPROVED" | "DENIED" | "REPLACED",
    replacedBy: {
    id: number,
    map: {
    id: number,
    hash: string,
    bsid: string | null,
    songName: string,
    songSubName: string,
    songAuthorName: string,
    levelAuthorName: string,
    bpm: number,
    coverUrl: string,
    verified: boolean,

},

} | null,
    replacedFrom: {
    id: number,
    map: {
    id: number,
    hash: string,
    bsid: string | null,
    songName: string,
    songSubName: string,
    songAuthorName: string,
    levelAuthorName: string,
    bpm: number,
    coverUrl: string,
    verified: boolean,

},

} | null,
    weight: number,
    createdAt: string,
    map: {
    id: number,
    hash: string,
    bsid: string | null,
    songName: string,
    songSubName: string,
    songAuthorName: string,
    levelAuthorName: string,
    bpm: number,
    coverUrl: string,
    verified: boolean,

},
    difficulties: ({
    id: number,
    description: string,
    approvalStatus: "PENDING" | "QUALIFIED" | "APPROVED" | "DENIED" | "REPLACED",
    leaderboard: {
    id: number,
    map: {
    id: number,
    hash: string,
    bsid: string | null,
    songName: string,
    songSubName: string,
    songAuthorName: string,
    levelAuthorName: string,
    bpm: number,
    coverUrl: string,
    verified: boolean,

},
    difficulty: {
    id: number,
    difficulty: number,
    rawDifficulty: string,
    gameMode: string,

},
    maxScore: number,
    totalScores: number,
    dailyScores: number,
    createdAt: string,
    realm: {
    realmId: number,
    realmName: string,
    leaderboardStatus: "UNRANKED" | "RANKED" | "QUALIFIED" | "LOVED",
    positiveModifiers: boolean,
    stars: number,
    rankedAt: string | null,
    qualifiedAt: string | null,
    lovedAt: string | null,

},

},
    rtVotes: {
    upvotes: number,
    downvotes: number,
    myVote: "UPVOTE" | "DOWNVOTE" | null,

},
    qatVotes: {
    upvotes: number,
    downvotes: number,
    neutrals: number,
    myVote: "UPVOTE" | "DOWNVOTE" | "NEUTRAL" | null,

},
    rtComments: ({
    id: number,
    player: {
    id: string,
    name: string,
    playerNameInGame: string,
    country: string,
    role: string | null,
    avatar: string,
    avatarVersion: number,
    permissions: number,

},
    comment: string,
    createdAt: string,
    edited: boolean,

})[],
    qatComments: ({
    id: number,
    player: {
    id: string,
    name: string,
    playerNameInGame: string,
    country: string,
    role: string | null,
    avatar: string,
    avatarVersion: number,
    permissions: number,

},
    comment: string,
    createdAt: string,
    edited: boolean,

})[],

})[],
    commentsObfuscated: boolean,

}` Created unrank request
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      rankingControllerCreateUnrankRequest: (data: RankingControllerCreateUnrankRequestPayload, params: RequestParams = {}) =>
         this.request<
            {
               id: number;
               description: string;
               requestType: 'RANK' | 'UNRANK';
               approvalStatus: 'PENDING' | 'QUALIFIED' | 'APPROVED' | 'DENIED' | 'REPLACED';
               replacedBy: {
                  id: number;
                  map: {
                     id: number;
                     hash: string;
                     bsid: string | null;
                     songName: string;
                     songSubName: string;
                     songAuthorName: string;
                     levelAuthorName: string;
                     bpm: number;
                     coverUrl: string;
                     verified: boolean;
                  };
               } | null;
               replacedFrom: {
                  id: number;
                  map: {
                     id: number;
                     hash: string;
                     bsid: string | null;
                     songName: string;
                     songSubName: string;
                     songAuthorName: string;
                     levelAuthorName: string;
                     bpm: number;
                     coverUrl: string;
                     verified: boolean;
                  };
               } | null;
               weight: number;
               createdAt: string;
               map: {
                  id: number;
                  hash: string;
                  bsid: string | null;
                  songName: string;
                  songSubName: string;
                  songAuthorName: string;
                  levelAuthorName: string;
                  bpm: number;
                  coverUrl: string;
                  verified: boolean;
               };
               difficulties: {
                  id: number;
                  description: string;
                  approvalStatus: 'PENDING' | 'QUALIFIED' | 'APPROVED' | 'DENIED' | 'REPLACED';
                  leaderboard: {
                     id: number;
                     map: {
                        id: number;
                        hash: string;
                        bsid: string | null;
                        songName: string;
                        songSubName: string;
                        songAuthorName: string;
                        levelAuthorName: string;
                        bpm: number;
                        coverUrl: string;
                        verified: boolean;
                     };
                     difficulty: {
                        id: number;
                        difficulty: number;
                        rawDifficulty: string;
                        gameMode: string;
                     };
                     maxScore: number;
                     totalScores: number;
                     dailyScores: number;
                     createdAt: string;
                     realm: {
                        realmId: number;
                        realmName: string;
                        leaderboardStatus: 'UNRANKED' | 'RANKED' | 'QUALIFIED' | 'LOVED';
                        positiveModifiers: boolean;
                        stars: number;
                        rankedAt: string | null;
                        qualifiedAt: string | null;
                        lovedAt: string | null;
                     };
                  };
                  rtVotes: {
                     upvotes: number;
                     downvotes: number;
                     myVote: 'UPVOTE' | 'DOWNVOTE' | null;
                  };
                  qatVotes: {
                     upvotes: number;
                     downvotes: number;
                     neutrals: number;
                     myVote: 'UPVOTE' | 'DOWNVOTE' | 'NEUTRAL' | null;
                  };
                  rtComments: {
                     id: number;
                     player: {
                        id: string;
                        name: string;
                        playerNameInGame: string;
                        country: string;
                        role: string | null;
                        avatar: string;
                        avatarVersion: number;
                        permissions: number;
                     };
                     comment: string;
                     createdAt: string;
                     edited: boolean;
                  }[];
                  qatComments: {
                     id: number;
                     player: {
                        id: string;
                        name: string;
                        playerNameInGame: string;
                        country: string;
                        role: string | null;
                        avatar: string;
                        avatarVersion: number;
                        permissions: number;
                     };
                     comment: string;
                     createdAt: string;
                     edited: boolean;
                  }[];
               }[];
               commentsObfuscated: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/ranking/requests/unrank`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Ranking
 * @name RankingControllerRtVote
 * @request POST:/api/v2/ranking/requests/{id}/rt/vote
 * @response `200` `{
    success: boolean,

}` RT vote result
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      rankingControllerRtVote: ({ id }: RankingControllerRtVoteParams, data: RankingControllerRtVotePayload, params: RequestParams = {}) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/ranking/requests/${id}/rt/vote`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Ranking
 * @name RankingControllerRtComment
 * @request POST:/api/v2/ranking/requests/{id}/rt/comment
 * @response `200` `{
    success: boolean,

}` RT comment result
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      rankingControllerRtComment: ({ id }: RankingControllerRtCommentParams, data: RankingControllerRtCommentPayload, params: RequestParams = {}) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/ranking/requests/${id}/rt/comment`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Ranking
 * @name RankingControllerQatVote
 * @request POST:/api/v2/ranking/requests/{id}/qat/vote
 * @response `200` `{
    success: boolean,

}` QAT vote result
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      rankingControllerQatVote: ({ id }: RankingControllerQatVoteParams, data: RankingControllerQatVotePayload, params: RequestParams = {}) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/ranking/requests/${id}/qat/vote`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Ranking
 * @name RankingControllerQatComment
 * @request POST:/api/v2/ranking/requests/{id}/qat/comment
 * @response `200` `{
    success: boolean,

}` QAT comment result
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      rankingControllerQatComment: (
         { id }: RankingControllerQatCommentParams,
         data: RankingControllerQatCommentPayload,
         params: RequestParams = {}
      ) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/ranking/requests/${id}/qat/comment`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Ranking
 * @name RankingControllerRtDeleteComment
 * @request DELETE:/api/v2/ranking/requests/{id}/rt/comment/{commentId}
 * @response `200` `{
    success: boolean,

}` RT comment delete result
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `403` `{
    statusCode: 403,
    error: "Forbidden",
    code: "FORBIDDEN",
    message: string,
    details?: {
    reason: string,

},

}` Forbidden
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      rankingControllerRtDeleteComment: ({ id, commentId, ...query }: RankingControllerRtDeleteCommentParams, params: RequestParams = {}) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 403;
                 error: 'Forbidden';
                 code: 'FORBIDDEN';
                 message: string;
                 details?: {
                    reason: string;
                 };
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/ranking/requests/${id}/rt/comment/${commentId}`,
            method: 'DELETE',
            query: query,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Ranking
 * @name RankingControllerRtEditComment
 * @request PATCH:/api/v2/ranking/requests/{id}/rt/comment/{commentId}
 * @response `200` `{
    success: boolean,

}` RT comment edit result
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `403` `{
    statusCode: 403,
    error: "Forbidden",
    code: "FORBIDDEN",
    message: string,
    details?: {
    reason: string,

},

}` Forbidden
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      rankingControllerRtEditComment: (
         { id, commentId }: RankingControllerRtEditCommentParams,
         data: RankingControllerRtEditCommentPayload,
         params: RequestParams = {}
      ) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 403;
                 error: 'Forbidden';
                 code: 'FORBIDDEN';
                 message: string;
                 details?: {
                    reason: string;
                 };
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/ranking/requests/${id}/rt/comment/${commentId}`,
            method: 'PATCH',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Ranking
 * @name RankingControllerQatDeleteComment
 * @request DELETE:/api/v2/ranking/requests/{id}/qat/comment/{commentId}
 * @response `200` `{
    success: boolean,

}` QAT comment delete result
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `403` `{
    statusCode: 403,
    error: "Forbidden",
    code: "FORBIDDEN",
    message: string,
    details?: {
    reason: string,

},

}` Forbidden
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      rankingControllerQatDeleteComment: ({ id, commentId, ...query }: RankingControllerQatDeleteCommentParams, params: RequestParams = {}) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 403;
                 error: 'Forbidden';
                 code: 'FORBIDDEN';
                 message: string;
                 details?: {
                    reason: string;
                 };
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/ranking/requests/${id}/qat/comment/${commentId}`,
            method: 'DELETE',
            query: query,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Ranking
 * @name RankingControllerQatEditComment
 * @request PATCH:/api/v2/ranking/requests/{id}/qat/comment/{commentId}
 * @response `200` `{
    success: boolean,

}` QAT comment edit result
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `403` `{
    statusCode: 403,
    error: "Forbidden",
    code: "FORBIDDEN",
    message: string,
    details?: {
    reason: string,

},

}` Forbidden
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      rankingControllerQatEditComment: (
         { id, commentId }: RankingControllerQatEditCommentParams,
         data: RankingControllerQatEditCommentPayload,
         params: RequestParams = {}
      ) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 403;
                 error: 'Forbidden';
                 code: 'FORBIDDEN';
                 message: string;
                 details?: {
                    reason: string;
                 };
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/ranking/requests/${id}/qat/comment/${commentId}`,
            method: 'PATCH',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Ranking
 * @name RankingControllerQualify
 * @request POST:/api/v2/ranking/requests/{id}/qualify
 * @response `200` `{
    success: boolean,

}` Qualification result
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      rankingControllerQualify: ({ id }: RankingControllerQualifyParams, data: RankingControllerQualifyPayload, params: RequestParams = {}) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/ranking/requests/${id}/qualify`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Ranking
 * @name RankingControllerDeny
 * @request POST:/api/v2/ranking/requests/{id}/deny
 * @response `200` `{
    success: boolean,

}` Denial result
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      rankingControllerDeny: ({ id }: RankingControllerDenyParams, data: RankingControllerDenyPayload, params: RequestParams = {}) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/ranking/requests/${id}/deny`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Ranking
 * @name RankingControllerApprove
 * @request POST:/api/v2/ranking/requests/{id}/approve
 * @response `200` `{
    success: boolean,

}` Approval result
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      rankingControllerApprove: ({ id }: RankingControllerApproveParams, data: RankingControllerApprovePayload, params: RequestParams = {}) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/ranking/requests/${id}/approve`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         })
   };
   score = {
      /**
 * No description
 *
 * @tags Score
 * @name ScoreControllerGetScore
 * @request GET:/api/v2/scores/{id}
 * @response `200` `{
    score: {
    id: number,
    rank: number,
    unmodifiedScore: number,
    modifiedScore: number,
    accuracy: number,
    pp: number,
    weight: number,
    mods: (string)[],
    badCuts: number,
    missedNotes: number,
    maxCombo: number,
    fullCombo: boolean,
    hasReplay: boolean,
    replayViewCount?: number,
    personalBest: boolean,
    legacyHmdId: number | null,
    version: string | null,
    playOutcome: "CLEAR" | "FAIL" | "QUIT" | "RESTART",
    playOutcomeTime: number | null,
    createdAt: string,
    hasHistory?: boolean,
    player: {
    id: string,
    name: string,
    playerNameInGame: string,
    country: string,
    role: string | null,
    avatar: string,
    avatarVersion: number,
    permissions: number,

},
    device: {
    hmd: string | null,
    controllerLeft: string | null,
    controllerRight: string | null,

} | null,

},
    leaderboard: {
    id: number,
    map: {
    id: number,
    hash: string,
    bsid: string | null,
    songName: string,
    songSubName: string,
    songAuthorName: string,
    levelAuthorName: string,
    bpm: number,
    coverUrl: string,
    verified: boolean,

},
    difficulty: {
    id: number,
    difficulty: number,
    rawDifficulty: string,
    gameMode: string,

},
    maxScore: number,
    totalScores: number,
    dailyScores: number,
    createdAt: string,
    realm: {
    realmId: number,
    realmName: string,
    leaderboardStatus: "UNRANKED" | "RANKED" | "QUALIFIED" | "LOVED",
    positiveModifiers: boolean,
    stars: number,
    rankedAt: string | null,
    qualifiedAt: string | null,
    lovedAt: string | null,

},

},
    scoreStats: {
    totalScore: number,
    maxScore: number,
    passed: boolean,
    failTime: number,
    endTime: number,
    maxCombo: number,
    "max115Streak": number | null,
    fcAcc: number,
    accLeft: number,
    accRight: number,
    leftPreswing: number,
    rightPreswing: number,
    leftPostswing: number,
    rightPostswing: number,
    leftTimeDependence: number,
    rightTimeDependence: number,
    leftTiming: number,
    rightTiming: number,
  /**
   * @maxItems 3
   * @minItems 3
   *\/
    leftAverageCut: ((number))[],
  /**
   * @maxItems 3
   * @minItems 3
   *\/
    rightAverageCut: ((number))[],
    leftMiss: number,
    rightMiss: number,
    leftBadCuts: number,
    rightBadCuts: number,
    leftBombs: number,
    rightBombs: number,
    leftSaberHitOffset: number,
    rightSaberHitOffset: number,
    noteSpawnOffset: number,
    jumpDistance?: number,
    pauseCount?: number,
    pauseTotalDurationSeconds?: number,
    averageHeight: number,
    averageHeadPosition: {
    x: number,
    y: number,
    z: number,

},
    scoreGraph: (number)[],
    gridCutDetails: {
    grid: ({
    count: number,
    avgScore: number,
    left: ({
    count: number,
    avgScore: number,
    avgCutAngle: number,
    avgCutOffset: number,
  /**
   * @maxItems 3
   * @minItems 3
   *\/
    avgCutScore: ((number))[],

})[],
    right: ({
    count: number,
    avgScore: number,
    avgCutAngle: number,
    avgCutOffset: number,
  /**
   * @maxItems 3
   * @minItems 3
   *\/
    avgCutScore: ((number))[],

})[],

})[],
    summaryGrids: (({
    count: number,
    avgScore: number,

})[])[],

},
    handSummary: ({
    label: string,
    left: {
    count: number,
    avgScore: number,
    avgTd: number,

},
    right: {
    count: number,
    avgScore: number,
    avgTd: number,

},

})[],
    accuracyDistribution: {
    leftTotal: number,
    rightTotal: number,
    leftCount: (number)[],
    rightCount: (number)[],
    leftTd: (number | null)[],
    rightTd: (number | null)[],
    timingStdDev: (number | null)[],

},
    accuracyTimeline: {
    times: (number)[],
    left: {
    fullSwing: (number)[],
    actual: (number)[],

},
    right: {
    fullSwing: (number)[],
    actual: (number)[],

},
    total: {
    fullSwing: (number)[],
    actual: (number)[],

},

},
    underswingStats: {
    count: number,
    fcScore: number,
    fullSwingScore: number,
    fullSwingFcScore: number,
    maxCutScore: number,
    fcAcc: number,
    fullSwingAcc: number,
    fullSwingFcAcc: number,

},

} | null,

}` Score details
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      scoreControllerGetScore: ({ id, ...query }: ScoreControllerGetScoreParams, params: RequestParams = {}) =>
         this.request<
            {
               score: {
                  id: number;
                  rank: number;
                  unmodifiedScore: number;
                  modifiedScore: number;
                  accuracy: number;
                  pp: number;
                  weight: number;
                  mods: string[];
                  badCuts: number;
                  missedNotes: number;
                  maxCombo: number;
                  fullCombo: boolean;
                  hasReplay: boolean;
                  replayViewCount?: number;
                  personalBest: boolean;
                  legacyHmdId: number | null;
                  version: string | null;
                  playOutcome: 'CLEAR' | 'FAIL' | 'QUIT' | 'RESTART';
                  playOutcomeTime: number | null;
                  createdAt: string;
                  hasHistory?: boolean;
                  player: {
                     id: string;
                     name: string;
                     playerNameInGame: string;
                     country: string;
                     role: string | null;
                     avatar: string;
                     avatarVersion: number;
                     permissions: number;
                  };
                  device: {
                     hmd: string | null;
                     controllerLeft: string | null;
                     controllerRight: string | null;
                  } | null;
               };
               leaderboard: {
                  id: number;
                  map: {
                     id: number;
                     hash: string;
                     bsid: string | null;
                     songName: string;
                     songSubName: string;
                     songAuthorName: string;
                     levelAuthorName: string;
                     bpm: number;
                     coverUrl: string;
                     verified: boolean;
                  };
                  difficulty: {
                     id: number;
                     difficulty: number;
                     rawDifficulty: string;
                     gameMode: string;
                  };
                  maxScore: number;
                  totalScores: number;
                  dailyScores: number;
                  createdAt: string;
                  realm: {
                     realmId: number;
                     realmName: string;
                     leaderboardStatus: 'UNRANKED' | 'RANKED' | 'QUALIFIED' | 'LOVED';
                     positiveModifiers: boolean;
                     stars: number;
                     rankedAt: string | null;
                     qualifiedAt: string | null;
                     lovedAt: string | null;
                  };
               };
               scoreStats: {
                  totalScore: number;
                  maxScore: number;
                  passed: boolean;
                  failTime: number;
                  endTime: number;
                  maxCombo: number;
                  max115Streak: number | null;
                  fcAcc: number;
                  accLeft: number;
                  accRight: number;
                  leftPreswing: number;
                  rightPreswing: number;
                  leftPostswing: number;
                  rightPostswing: number;
                  leftTimeDependence: number;
                  rightTimeDependence: number;
                  leftTiming: number;
                  rightTiming: number;
                  /**
                   * @maxItems 3
                   * @minItems 3
                   */
                  leftAverageCut: number[];
                  /**
                   * @maxItems 3
                   * @minItems 3
                   */
                  rightAverageCut: number[];
                  leftMiss: number;
                  rightMiss: number;
                  leftBadCuts: number;
                  rightBadCuts: number;
                  leftBombs: number;
                  rightBombs: number;
                  leftSaberHitOffset: number;
                  rightSaberHitOffset: number;
                  noteSpawnOffset: number;
                  jumpDistance?: number;
                  pauseCount?: number;
                  pauseTotalDurationSeconds?: number;
                  averageHeight: number;
                  averageHeadPosition: {
                     x: number;
                     y: number;
                     z: number;
                  };
                  scoreGraph: number[];
                  gridCutDetails: {
                     grid: {
                        count: number;
                        avgScore: number;
                        left: {
                           count: number;
                           avgScore: number;
                           avgCutAngle: number;
                           avgCutOffset: number;
                           /**
                            * @maxItems 3
                            * @minItems 3
                            */
                           avgCutScore: number[];
                        }[];
                        right: {
                           count: number;
                           avgScore: number;
                           avgCutAngle: number;
                           avgCutOffset: number;
                           /**
                            * @maxItems 3
                            * @minItems 3
                            */
                           avgCutScore: number[];
                        }[];
                     }[];
                     summaryGrids: {
                        count: number;
                        avgScore: number;
                     }[][];
                  };
                  handSummary: {
                     label: string;
                     left: {
                        count: number;
                        avgScore: number;
                        avgTd: number;
                     };
                     right: {
                        count: number;
                        avgScore: number;
                        avgTd: number;
                     };
                  }[];
                  accuracyDistribution: {
                     leftTotal: number;
                     rightTotal: number;
                     leftCount: number[];
                     rightCount: number[];
                     leftTd: (number | null)[];
                     rightTd: (number | null)[];
                     timingStdDev: (number | null)[];
                  };
                  accuracyTimeline: {
                     times: number[];
                     left: {
                        fullSwing: number[];
                        actual: number[];
                     };
                     right: {
                        fullSwing: number[];
                        actual: number[];
                     };
                     total: {
                        fullSwing: number[];
                        actual: number[];
                     };
                  };
                  underswingStats: {
                     count: number;
                     fcScore: number;
                     fullSwingScore: number;
                     fullSwingFcScore: number;
                     maxCutScore: number;
                     fcAcc: number;
                     fullSwingAcc: number;
                     fullSwingFcAcc: number;
                  };
               } | null;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/scores/${id}`,
            method: 'GET',
            query: query,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Score
 * @name ScoreControllerGetScoreHistory
 * @request GET:/api/v2/scores/{id}/history
 * @response `200` `{
    data: ({
    score: {
    id: number,
    rank: number,
    unmodifiedScore: number,
    modifiedScore: number,
    accuracy: number,
    pp: number,
    weight: number,
    mods: (string)[],
    badCuts: number,
    missedNotes: number,
    maxCombo: number,
    fullCombo: boolean,
    hasReplay: boolean,
    replayViewCount?: number,
    personalBest: boolean,
    legacyHmdId: number | null,
    version: string | null,
    playOutcome: "CLEAR" | "FAIL" | "QUIT" | "RESTART",
    playOutcomeTime: number | null,
    createdAt: string,
    hasHistory?: boolean,
    player: {
    id: string,
    name: string,
    playerNameInGame: string,
    country: string,
    role: string | null,
    avatar: string,
    avatarVersion: number,
    permissions: number,

},
    device: {
    hmd: string | null,
    controllerLeft: string | null,
    controllerRight: string | null,

} | null,

},
    leaderboard: {
    id: number,
    map: {
    id: number,
    hash: string,
    bsid: string | null,
    songName: string,
    songSubName: string,
    songAuthorName: string,
    levelAuthorName: string,
    bpm: number,
    coverUrl: string,
    verified: boolean,

},
    difficulty: {
    id: number,
    difficulty: number,
    rawDifficulty: string,
    gameMode: string,

},
    maxScore: number,
    totalScores: number,
    dailyScores: number,
    createdAt: string,
    realm: {
    realmId: number,
    realmName: string,
    leaderboardStatus: "UNRANKED" | "RANKED" | "QUALIFIED" | "LOVED",
    positiveModifiers: boolean,
    stars: number,
    rankedAt: string | null,
    qualifiedAt: string | null,
    lovedAt: string | null,

},

},

})[],
    metadata: {
    page: number,
    itemsPerPage: number,
    totalItems: number,
    totalPages: number,

},

}` Player's visible attempts on the same leaderboard
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      scoreControllerGetScoreHistory: ({ id, ...query }: ScoreControllerGetScoreHistoryParams, params: RequestParams = {}) =>
         this.request<
            {
               data: {
                  score: {
                     id: number;
                     rank: number;
                     unmodifiedScore: number;
                     modifiedScore: number;
                     accuracy: number;
                     pp: number;
                     weight: number;
                     mods: string[];
                     badCuts: number;
                     missedNotes: number;
                     maxCombo: number;
                     fullCombo: boolean;
                     hasReplay: boolean;
                     replayViewCount?: number;
                     personalBest: boolean;
                     legacyHmdId: number | null;
                     version: string | null;
                     playOutcome: 'CLEAR' | 'FAIL' | 'QUIT' | 'RESTART';
                     playOutcomeTime: number | null;
                     createdAt: string;
                     hasHistory?: boolean;
                     player: {
                        id: string;
                        name: string;
                        playerNameInGame: string;
                        country: string;
                        role: string | null;
                        avatar: string;
                        avatarVersion: number;
                        permissions: number;
                     };
                     device: {
                        hmd: string | null;
                        controllerLeft: string | null;
                        controllerRight: string | null;
                     } | null;
                  };
                  leaderboard: {
                     id: number;
                     map: {
                        id: number;
                        hash: string;
                        bsid: string | null;
                        songName: string;
                        songSubName: string;
                        songAuthorName: string;
                        levelAuthorName: string;
                        bpm: number;
                        coverUrl: string;
                        verified: boolean;
                     };
                     difficulty: {
                        id: number;
                        difficulty: number;
                        rawDifficulty: string;
                        gameMode: string;
                     };
                     maxScore: number;
                     totalScores: number;
                     dailyScores: number;
                     createdAt: string;
                     realm: {
                        realmId: number;
                        realmName: string;
                        leaderboardStatus: 'UNRANKED' | 'RANKED' | 'QUALIFIED' | 'LOVED';
                        positiveModifiers: boolean;
                        stars: number;
                        rankedAt: string | null;
                        qualifiedAt: string | null;
                        lovedAt: string | null;
                     };
                  };
               }[];
               metadata: {
                  page: number;
                  itemsPerPage: number;
                  totalItems: number;
                  totalPages: number;
               };
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/scores/${id}/history`,
            method: 'GET',
            query: query,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Score
 * @name ScoreControllerDownloadReplay
 * @request GET:/api/v2/scores/{id}/replay
 * @response `200` `File` Replay file
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `429` `{
    statusCode: 429,
    error: "Too Many Requests",
    code: "TOO_MANY_REQUESTS",
    message: string,

}` Too Many Requests
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      scoreControllerDownloadReplay: ({ id }: ScoreControllerDownloadReplayParams, params: RequestParams = {}) =>
         this.request<
            Blob,
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | {
                 statusCode: 429;
                 error: 'Too Many Requests';
                 code: 'TOO_MANY_REQUESTS';
                 message: string;
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/scores/${id}/replay`,
            method: 'GET',
            ...params
         }),

      /**
 * No description
 *
 * @tags Score
 * @name ScoreControllerGetScoreStats
 * @request GET:/api/v2/scores/{id}/stats
 * @response `200` `{
    totalScore: number,
    maxScore: number,
    passed: boolean,
    failTime: number,
    endTime: number,
    maxCombo: number,
    "max115Streak": number | null,
    fcAcc: number,
    accLeft: number,
    accRight: number,
    leftPreswing: number,
    rightPreswing: number,
    leftPostswing: number,
    rightPostswing: number,
    leftTimeDependence: number,
    rightTimeDependence: number,
    leftTiming: number,
    rightTiming: number,
  /**
   * @maxItems 3
   * @minItems 3
   *\/
    leftAverageCut: ((number))[],
  /**
   * @maxItems 3
   * @minItems 3
   *\/
    rightAverageCut: ((number))[],
    leftMiss: number,
    rightMiss: number,
    leftBadCuts: number,
    rightBadCuts: number,
    leftBombs: number,
    rightBombs: number,
    leftSaberHitOffset: number,
    rightSaberHitOffset: number,
    noteSpawnOffset: number,
    jumpDistance?: number,
    pauseCount?: number,
    pauseTotalDurationSeconds?: number,
    averageHeight: number,
    averageHeadPosition: {
    x: number,
    y: number,
    z: number,

},
    scoreGraph: (number)[],
    gridCutDetails: {
    grid: ({
    count: number,
    avgScore: number,
    left: ({
    count: number,
    avgScore: number,
    avgCutAngle: number,
    avgCutOffset: number,
  /**
   * @maxItems 3
   * @minItems 3
   *\/
    avgCutScore: ((number))[],

})[],
    right: ({
    count: number,
    avgScore: number,
    avgCutAngle: number,
    avgCutOffset: number,
  /**
   * @maxItems 3
   * @minItems 3
   *\/
    avgCutScore: ((number))[],

})[],

})[],
    summaryGrids: (({
    count: number,
    avgScore: number,

})[])[],

},
    handSummary: ({
    label: string,
    left: {
    count: number,
    avgScore: number,
    avgTd: number,

},
    right: {
    count: number,
    avgScore: number,
    avgTd: number,

},

})[],
    accuracyDistribution: {
    leftTotal: number,
    rightTotal: number,
    leftCount: (number)[],
    rightCount: (number)[],
    leftTd: (number | null)[],
    rightTd: (number | null)[],
    timingStdDev: (number | null)[],

},
    accuracyTimeline: {
    times: (number)[],
    left: {
    fullSwing: (number)[],
    actual: (number)[],

},
    right: {
    fullSwing: (number)[],
    actual: (number)[],

},
    total: {
    fullSwing: (number)[],
    actual: (number)[],

},

},
    underswingStats: {
    count: number,
    fcScore: number,
    fullSwingScore: number,
    fullSwingFcScore: number,
    maxCutScore: number,
    fcAcc: number,
    fullSwingAcc: number,
    fullSwingFcAcc: number,

},

}` Detailed replay statistics for a score
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      scoreControllerGetScoreStats: ({ id }: ScoreControllerGetScoreStatsParams, params: RequestParams = {}) =>
         this.request<
            {
               totalScore: number;
               maxScore: number;
               passed: boolean;
               failTime: number;
               endTime: number;
               maxCombo: number;
               max115Streak: number | null;
               fcAcc: number;
               accLeft: number;
               accRight: number;
               leftPreswing: number;
               rightPreswing: number;
               leftPostswing: number;
               rightPostswing: number;
               leftTimeDependence: number;
               rightTimeDependence: number;
               leftTiming: number;
               rightTiming: number;
               /**
                * @maxItems 3
                * @minItems 3
                */
               leftAverageCut: number[];
               /**
                * @maxItems 3
                * @minItems 3
                */
               rightAverageCut: number[];
               leftMiss: number;
               rightMiss: number;
               leftBadCuts: number;
               rightBadCuts: number;
               leftBombs: number;
               rightBombs: number;
               leftSaberHitOffset: number;
               rightSaberHitOffset: number;
               noteSpawnOffset: number;
               jumpDistance?: number;
               pauseCount?: number;
               pauseTotalDurationSeconds?: number;
               averageHeight: number;
               averageHeadPosition: {
                  x: number;
                  y: number;
                  z: number;
               };
               scoreGraph: number[];
               gridCutDetails: {
                  grid: {
                     count: number;
                     avgScore: number;
                     left: {
                        count: number;
                        avgScore: number;
                        avgCutAngle: number;
                        avgCutOffset: number;
                        /**
                         * @maxItems 3
                         * @minItems 3
                         */
                        avgCutScore: number[];
                     }[];
                     right: {
                        count: number;
                        avgScore: number;
                        avgCutAngle: number;
                        avgCutOffset: number;
                        /**
                         * @maxItems 3
                         * @minItems 3
                         */
                        avgCutScore: number[];
                     }[];
                  }[];
                  summaryGrids: {
                     count: number;
                     avgScore: number;
                  }[][];
               };
               handSummary: {
                  label: string;
                  left: {
                     count: number;
                     avgScore: number;
                     avgTd: number;
                  };
                  right: {
                     count: number;
                     avgScore: number;
                     avgTd: number;
                  };
               }[];
               accuracyDistribution: {
                  leftTotal: number;
                  rightTotal: number;
                  leftCount: number[];
                  rightCount: number[];
                  leftTd: (number | null)[];
                  rightTd: (number | null)[];
                  timingStdDev: (number | null)[];
               };
               accuracyTimeline: {
                  times: number[];
                  left: {
                     fullSwing: number[];
                     actual: number[];
                  };
                  right: {
                     fullSwing: number[];
                     actual: number[];
                  };
                  total: {
                     fullSwing: number[];
                     actual: number[];
                  };
               };
               underswingStats: {
                  count: number;
                  fcScore: number;
                  fullSwingScore: number;
                  fullSwingFcScore: number;
                  maxCutScore: number;
                  fcAcc: number;
                  fullSwingAcc: number;
                  fullSwingFcAcc: number;
               };
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/scores/${id}/stats`,
            method: 'GET',
            format: 'json',
            ...params
         })
   };
   adminBadge = {
      /**
 * No description
 *
 * @tags AdminBadge
 * @name AdminBadgeControllerGetAllBadges
 * @request GET:/api/v2/admin/badges
 * @response `200` `({
    id: number,
  /** @maxLength 32 *\/
    image: string,
  /** @maxLength 128 *\/
    description: string,
    imageUrl: string,
    assignmentCount: number,

})[]` Badge catalogue with assignment counts
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 */
      adminBadgeControllerGetAllBadges: (params: RequestParams = {}) =>
         this.request<
            {
               id: number;
               /** @maxLength 32 */
               image: string;
               /** @maxLength 128 */
               description: string;
               imageUrl: string;
               assignmentCount: number;
            }[],
            {
               statusCode: 401;
               error: 'Unauthorized';
               code: 'UNAUTHORIZED';
               message: string;
            }
         >({
            path: `/api/v2/admin/badges`,
            method: 'GET',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags AdminBadge
 * @name AdminBadgeControllerCreateBadge
 * @request POST:/api/v2/admin/badges
 * @response `200` `{
    id: number,
  /** @maxLength 32 *\/
    image: string,
  /** @maxLength 128 *\/
    description: string,
    imageUrl: string,
    assignmentCount: number,

}` Created badge
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      adminBadgeControllerCreateBadge: (data: AdminBadgeControllerCreateBadgePayload, params: RequestParams = {}) =>
         this.request<
            {
               id: number;
               /** @maxLength 32 */
               image: string;
               /** @maxLength 128 */
               description: string;
               imageUrl: string;
               assignmentCount: number;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/admin/badges`,
            method: 'POST',
            body: data,
            type: ContentType.FormData,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags AdminBadge
 * @name AdminBadgeControllerUpdateBadge
 * @request PUT:/api/v2/admin/badges/{id}
 * @response `200` `{
    id: number,
  /** @maxLength 32 *\/
    image: string,
  /** @maxLength 128 *\/
    description: string,
    imageUrl: string,
    assignmentCount: number,

}` Updated badge
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      adminBadgeControllerUpdateBadge: (
         { id }: AdminBadgeControllerUpdateBadgeParams,
         data: AdminBadgeControllerUpdateBadgePayload,
         params: RequestParams = {}
      ) =>
         this.request<
            {
               id: number;
               /** @maxLength 32 */
               image: string;
               /** @maxLength 128 */
               description: string;
               imageUrl: string;
               assignmentCount: number;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/admin/badges/${id}`,
            method: 'PUT',
            body: data,
            type: ContentType.FormData,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags AdminBadge
 * @name AdminBadgeControllerDeleteBadge
 * @request DELETE:/api/v2/admin/badges/{id}
 * @response `200` `{
    success: boolean,
    assignmentCount: number,

}` Badge deletion result
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      adminBadgeControllerDeleteBadge: ({ id }: AdminBadgeControllerDeleteBadgeParams, params: RequestParams = {}) =>
         this.request<
            {
               success: boolean;
               assignmentCount: number;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/admin/badges/${id}`,
            method: 'DELETE',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags AdminBadge
 * @name AdminBadgeControllerGetPlayerBadges
 * @request GET:/api/v2/admin/badges/player/{playerId}
 * @response `200` `({
    badgeId: number,
    descriptionOverride: string | null,
    addedAt: string,

})[]` Player's exact badge assignments
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      adminBadgeControllerGetPlayerBadges: ({ playerId }: AdminBadgeControllerGetPlayerBadgesParams, params: RequestParams = {}) =>
         this.request<
            {
               badgeId: number;
               descriptionOverride: string | null;
               addedAt: string;
            }[],
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/admin/badges/player/${playerId}`,
            method: 'GET',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags AdminBadge
 * @name AdminBadgeControllerReplacePlayerBadges
 * @request PUT:/api/v2/admin/badges/player/{playerId}
 * @response `200` `({
    badgeId: number,
    descriptionOverride: string | null,
    addedAt: string,

})[]` Replaced player's badge assignments
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      adminBadgeControllerReplacePlayerBadges: (
         { playerId }: AdminBadgeControllerReplacePlayerBadgesParams,
         data: AdminBadgeControllerReplacePlayerBadgesPayload,
         params: RequestParams = {}
      ) =>
         this.request<
            {
               badgeId: number;
               descriptionOverride: string | null;
               addedAt: string;
            }[],
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/admin/badges/player/${playerId}`,
            method: 'PUT',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags AdminBadge
 * @name AdminBadgeControllerAssignBadge
 * @request POST:/api/v2/admin/badges/{id}/assign/{playerId}
 * @response `200` `{
    success: boolean,

}` Badge assignment result
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      adminBadgeControllerAssignBadge: ({ id, playerId, ...query }: AdminBadgeControllerAssignBadgeParams, params: RequestParams = {}) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/admin/badges/${id}/assign/${playerId}`,
            method: 'POST',
            query: query,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags AdminBadge
 * @name AdminBadgeControllerUnassignBadge
 * @request DELETE:/api/v2/admin/badges/{id}/assign/{playerId}
 * @response `200` `{
    success: boolean,

}` Badge removal result
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      adminBadgeControllerUnassignBadge: ({ id, playerId }: AdminBadgeControllerUnassignBadgeParams, params: RequestParams = {}) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/admin/badges/${id}/assign/${playerId}`,
            method: 'DELETE',
            format: 'json',
            ...params
         })
   };
   adminLeaderboard = {
      /**
 * No description
 *
 * @tags AdminLeaderboard
 * @name AdminLeaderboardControllerRankLeaderboard
 * @request POST:/api/v2/admin/leaderboards/{id}/rank
 * @response `200` `{
    success: boolean,
    affectedPlayers: number,

}` Rank result with affected player count
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      adminLeaderboardControllerRankLeaderboard: (
         { id, ...query }: AdminLeaderboardControllerRankLeaderboardParams,
         data: AdminLeaderboardControllerRankLeaderboardPayload,
         params: RequestParams = {}
      ) =>
         this.request<
            {
               success: boolean;
               affectedPlayers: number;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/admin/leaderboards/${id}/rank`,
            method: 'POST',
            query: query,
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags AdminLeaderboard
 * @name AdminLeaderboardControllerUnrankLeaderboard
 * @request POST:/api/v2/admin/leaderboards/{id}/unrank
 * @response `200` `{
    success: boolean,
    affectedPlayers: number,

}` Unrank result with affected player count
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      adminLeaderboardControllerUnrankLeaderboard: (
         { id, ...query }: AdminLeaderboardControllerUnrankLeaderboardParams,
         params: RequestParams = {}
      ) =>
         this.request<
            {
               success: boolean;
               affectedPlayers: number;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/admin/leaderboards/${id}/unrank`,
            method: 'POST',
            query: query,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags AdminLeaderboard
 * @name AdminLeaderboardControllerRecalculatePP
 * @request POST:/api/v2/admin/leaderboards/{id}/pp
 * @response `200` `{
    success: boolean,
    affectedPlayers: number,

}` PP recalculation result with affected player count
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      adminLeaderboardControllerRecalculatePP: ({ id, ...query }: AdminLeaderboardControllerRecalculatePPParams, params: RequestParams = {}) =>
         this.request<
            {
               success: boolean;
               affectedPlayers: number;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/admin/leaderboards/${id}/pp`,
            method: 'POST',
            query: query,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags AdminLeaderboard
 * @name AdminLeaderboardControllerSetManualPP
 * @request POST:/api/v2/admin/leaderboards/{id}/pp-manual
 * @response `200` `{
    success: boolean,
    affectedPlayers: number,

}` Manual PP update result with affected player count
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      adminLeaderboardControllerSetManualPP: (
         { id, ...query }: AdminLeaderboardControllerSetManualPPParams,
         data: AdminLeaderboardControllerSetManualPPPayload,
         params: RequestParams = {}
      ) =>
         this.request<
            {
               success: boolean;
               affectedPlayers: number;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/admin/leaderboards/${id}/pp-manual`,
            method: 'POST',
            query: query,
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags AdminLeaderboard
 * @name AdminLeaderboardControllerQualifyLeaderboard
 * @request POST:/api/v2/admin/leaderboards/{id}/qualify
 * @response `200` `{
    success: boolean,

}` Qualification result
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      adminLeaderboardControllerQualifyLeaderboard: (
         { id, ...query }: AdminLeaderboardControllerQualifyLeaderboardParams,
         params: RequestParams = {}
      ) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/admin/leaderboards/${id}/qualify`,
            method: 'POST',
            query: query,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags AdminLeaderboard
 * @name AdminLeaderboardControllerLoveLeaderboard
 * @request POST:/api/v2/admin/leaderboards/{id}/love
 * @response `200` `{
    success: boolean,

}` Love status result
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      adminLeaderboardControllerLoveLeaderboard: ({ id, ...query }: AdminLeaderboardControllerLoveLeaderboardParams, params: RequestParams = {}) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/admin/leaderboards/${id}/love`,
            method: 'POST',
            query: query,
            format: 'json',
            ...params
         })
   };
   adminPermission = {
      /**
 * No description
 *
 * @tags AdminPermission
 * @name AdminPermissionControllerListPermissions
 * @request GET:/api/v2/admin/permissions
 * @response `200` `({
    name: string,
    value: number,

})[]` List of all available permissions
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 */
      adminPermissionControllerListPermissions: (params: RequestParams = {}) =>
         this.request<
            {
               name: string;
               value: number;
            }[],
            {
               statusCode: 401;
               error: 'Unauthorized';
               code: 'UNAUTHORIZED';
               message: string;
            }
         >({
            path: `/api/v2/admin/permissions`,
            method: 'GET',
            format: 'json',
            ...params
         })
   };
   adminScore = {
      /**
 * No description
 *
 * @tags AdminScore
 * @name AdminScoreControllerDeleteScore
 * @request DELETE:/api/v2/admin/scores/{id}
 * @response `200` `{
    success: boolean,

}` Score deletion result
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      adminScoreControllerDeleteScore: ({ id }: AdminScoreControllerDeleteScoreParams, params: RequestParams = {}) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/admin/scores/${id}`,
            method: 'DELETE',
            format: 'json',
            ...params
         })
   };
   adminUploadTrust = {
      /**
 * No description
 *
 * @tags Admin: Upload Trust
 * @name AdminUploadTrustControllerCreateDevelopmentCredential
 * @request POST:/api/v2/admin/upload-trust/development-credentials
 * @response `200` `{
    id: number,
    playerId: string,
    label: string,
    token: string,
    expiresAt: string | null,
    createdAt: string,

}` Created development upload credential. The token is returned once.
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      adminUploadTrustControllerCreateDevelopmentCredential: (
         data: AdminUploadTrustControllerCreateDevelopmentCredentialPayload,
         params: RequestParams = {}
      ) =>
         this.request<
            {
               id: number;
               playerId: string;
               label: string;
               token: string;
               expiresAt: string | null;
               createdAt: string;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/admin/upload-trust/development-credentials`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Admin: Upload Trust
 * @name AdminUploadTrustControllerRevokeDevelopmentCredential
 * @request POST:/api/v2/admin/upload-trust/development-credentials/{id}/revoke
 * @response `200` `{
    success: boolean,

}` Revoked development upload credential
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `403` `{
    statusCode: 403,
    error: "Forbidden",
    code: "FORBIDDEN",
    message: string,
    details?: {
    reason: string,

},

}` Forbidden
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      adminUploadTrustControllerRevokeDevelopmentCredential: (
         { id }: AdminUploadTrustControllerRevokeDevelopmentCredentialParams,
         params: RequestParams = {}
      ) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 403;
                 error: 'Forbidden';
                 code: 'FORBIDDEN';
                 message: string;
                 details?: {
                    reason: string;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/admin/upload-trust/development-credentials/${id}/revoke`,
            method: 'POST',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Admin: Upload Trust
 * @name AdminUploadTrustControllerRevokeOfficialBuild
 * @request POST:/api/v2/admin/upload-trust/official-builds/{buildId}/revoke
 * @response `200` `{
    success: boolean,

}` Revoked official upload build
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `403` `{
    statusCode: 403,
    error: "Forbidden",
    code: "FORBIDDEN",
    message: string,
    details?: {
    reason: string,

},

}` Forbidden
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      adminUploadTrustControllerRevokeOfficialBuild: ({ buildId }: AdminUploadTrustControllerRevokeOfficialBuildParams, params: RequestParams = {}) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 403;
                 error: 'Forbidden';
                 code: 'FORBIDDEN';
                 message: string;
                 details?: {
                    reason: string;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/admin/upload-trust/official-builds/${buildId}/revoke`,
            method: 'POST',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Admin: Upload Trust
 * @name AdminUploadTrustControllerAddOfficialBuildCompatibility
 * @request POST:/api/v2/admin/upload-trust/official-builds/compatibility
 * @response `200` `{
    success: boolean,
    fromGameVersion: string,
    toGameVersion: string,
    buildsUpdated: number,
    targetVersions: number,

}` Add a compatible Beat Saber runtime version to active official builds.
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      adminUploadTrustControllerAddOfficialBuildCompatibility: (
         data: AdminUploadTrustControllerAddOfficialBuildCompatibilityPayload,
         params: RequestParams = {}
      ) =>
         this.request<
            {
               success: boolean;
               fromGameVersion: string;
               toGameVersion: string;
               buildsUpdated: number;
               targetVersions: number;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/admin/upload-trust/official-builds/compatibility`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags Admin: Upload Trust
 * @name AdminUploadTrustControllerGetOfficialBuildCompatibility
 * @request GET:/api/v2/admin/upload-trust/official-builds/compatibility
 * @response `200` `({
    gameVersion: string,
    compatibleBuildCount: number,
    pluginVersions: (string)[],
    buildIds: (string)[],

})[]` Active official PC build compatibility grouped by Beat Saber version.
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 */
      adminUploadTrustControllerGetOfficialBuildCompatibility: (params: RequestParams = {}) =>
         this.request<
            {
               gameVersion: string;
               compatibleBuildCount: number;
               pluginVersions: string[];
               buildIds: string[];
            }[],
            {
               statusCode: 401;
               error: 'Unauthorized';
               code: 'UNAUTHORIZED';
               message: string;
            }
         >({
            path: `/api/v2/admin/upload-trust/official-builds/compatibility`,
            method: 'GET',
            format: 'json',
            ...params
         })
   };
   adminUser = {
      /**
 * No description
 *
 * @tags AdminUser
 * @name AdminUserControllerBanPlayer
 * @request POST:/api/v2/admin/user/{id}/ban
 * @response `200` `{
    success: boolean,

}` Ban result
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      adminUserControllerBanPlayer: (
         { id }: AdminUserControllerBanPlayerParams,
         data: AdminUserControllerBanPlayerPayload,
         params: RequestParams = {}
      ) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/admin/user/${id}/ban`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags AdminUser
 * @name AdminUserControllerGetActiveBan
 * @request GET:/api/v2/admin/user/{id}/ban
 * @response `200` `{
    reason: string,
    notes: string | null,
    createdAt: string,
    autoUnban: boolean,
    autoUnbansAt: string | null,
    earliestAppealDate: string | null,

} | null` Active player ban metadata
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      adminUserControllerGetActiveBan: ({ id }: AdminUserControllerGetActiveBanParams, params: RequestParams = {}) =>
         this.request<
            {
               reason: string;
               notes: string | null;
               createdAt: string;
               autoUnban: boolean;
               autoUnbansAt: string | null;
               earliestAppealDate: string | null;
            } | null,
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/admin/user/${id}/ban`,
            method: 'GET',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags AdminUser
 * @name AdminUserControllerUnbanPlayer
 * @request POST:/api/v2/admin/user/{id}/unban
 * @response `200` `{
    success: boolean,

}` Unban result
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      adminUserControllerUnbanPlayer: ({ id }: AdminUserControllerUnbanPlayerParams, params: RequestParams = {}) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/admin/user/${id}/unban`,
            method: 'POST',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags AdminUser
 * @name AdminUserControllerSilencePlayer
 * @request POST:/api/v2/admin/user/{id}/silence
 * @response `200` `{
    success: boolean,

}` Silence result
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      adminUserControllerSilencePlayer: (
         { id }: AdminUserControllerSilencePlayerParams,
         data: AdminUserControllerSilencePlayerPayload,
         params: RequestParams = {}
      ) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/admin/user/${id}/silence`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags AdminUser
 * @name AdminUserControllerUnsilencePlayer
 * @request POST:/api/v2/admin/user/{id}/unsilence
 * @response `200` `{
    success: boolean,

}` Unsilence result
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      adminUserControllerUnsilencePlayer: ({ id }: AdminUserControllerUnsilencePlayerParams, params: RequestParams = {}) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/admin/user/${id}/unsilence`,
            method: 'POST',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags AdminUser
 * @name AdminUserControllerUpdateRoleText
 * @request POST:/api/v2/admin/user/{id}/role-text
 * @response `200` `{
    success: boolean,

}` Role text update result
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      adminUserControllerUpdateRoleText: (
         { id }: AdminUserControllerUpdateRoleTextParams,
         data: AdminUserControllerUpdateRoleTextPayload,
         params: RequestParams = {}
      ) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/admin/user/${id}/role-text`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags AdminUser
 * @name AdminUserControllerAdminResetCountry
 * @request POST:/api/v2/admin/user/{id}/reset-country
 * @response `200` `{
    success: boolean,

}` Country reset result
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      adminUserControllerAdminResetCountry: (
         { id }: AdminUserControllerAdminResetCountryParams,
         data: AdminUserControllerAdminResetCountryPayload,
         params: RequestParams = {}
      ) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/admin/user/${id}/reset-country`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags AdminUser
 * @name AdminUserControllerUpdatePermissions
 * @request POST:/api/v2/admin/user/{id}/permissions
 * @response `200` `{
    success: boolean,
    permissions: number,

}` Permission update result
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      adminUserControllerUpdatePermissions: (
         { id }: AdminUserControllerUpdatePermissionsParams,
         data: AdminUserControllerUpdatePermissionsPayload,
         params: RequestParams = {}
      ) =>
         this.request<
            {
               success: boolean;
               permissions: number;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/admin/user/${id}/permissions`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags AdminUser
 * @name AdminUserControllerMergePlayer
 * @request POST:/api/v2/admin/user/{id}/merge
 * @response `200` `{
    success: true,
    targetPlayerId: string,
    publicPlayerId: string,
    mergedPublicPlayerIds: (string)[],

}` Account merge result
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `403` `{
    statusCode: 403,
    error: "Forbidden",
    code: "FORBIDDEN",
    message: string,
    details?: {
    reason: string,

},

}` Forbidden
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      adminUserControllerMergePlayer: (
         { id }: AdminUserControllerMergePlayerParams,
         data: AdminUserControllerMergePlayerPayload,
         params: RequestParams = {}
      ) =>
         this.request<
            {
               success: true;
               targetPlayerId: string;
               publicPlayerId: string;
               mergedPublicPlayerIds: string[];
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 403;
                 error: 'Forbidden';
                 code: 'FORBIDDEN';
                 message: string;
                 details?: {
                    reason: string;
                 };
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/admin/user/${id}/merge`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags AdminUser
 * @name AdminUserControllerDeleteUserData
 * @request DELETE:/api/v2/admin/user/{id}/data
 * @response `200` `{
    success: boolean,

}` User data deletion result
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `403` `{
    statusCode: 403,
    error: "Forbidden",
    code: "FORBIDDEN",
    message: string,
    details?: {
    reason: string,

},

}` Forbidden
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      adminUserControllerDeleteUserData: ({ id }: AdminUserControllerDeleteUserDataParams, params: RequestParams = {}) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 403;
                 error: 'Forbidden';
                 code: 'FORBIDDEN';
                 message: string;
                 details?: {
                    reason: string;
                 };
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/admin/user/${id}/data`,
            method: 'DELETE',
            format: 'json',
            ...params
         })
   };
   adminVersion = {
      /**
 * No description
 *
 * @tags AdminVersion
 * @name AdminVersionControllerGetVersions
 * @request GET:/api/v2/admin/versions
 * @response `200` `({
    id: number,
    hash: string,
    version: string,
    platform: string,
    beatSaberVersion: string | null,
    whitelisted: boolean,
    requiredUploadProtocolVersion: number | null,
    createdAt: string,

})[]` All mod versions
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 */
      adminVersionControllerGetVersions: (params: RequestParams = {}) =>
         this.request<
            {
               id: number;
               hash: string;
               version: string;
               platform: string;
               beatSaberVersion: string | null;
               whitelisted: boolean;
               requiredUploadProtocolVersion: number | null;
               createdAt: string;
            }[],
            {
               statusCode: 401;
               error: 'Unauthorized';
               code: 'UNAUTHORIZED';
               message: string;
            }
         >({
            path: `/api/v2/admin/versions`,
            method: 'GET',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags AdminVersion
 * @name AdminVersionControllerCreateVersion
 * @request POST:/api/v2/admin/versions
 * @response `200` `{
    id: number,
    hash: string,
    version: string,
    platform: string,
    beatSaberVersion: string | null,
    whitelisted: boolean,
    requiredUploadProtocolVersion: number | null,
    createdAt: string,

}` Created version
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      adminVersionControllerCreateVersion: (data: AdminVersionControllerCreateVersionPayload, params: RequestParams = {}) =>
         this.request<
            {
               id: number;
               hash: string;
               version: string;
               platform: string;
               beatSaberVersion: string | null;
               whitelisted: boolean;
               requiredUploadProtocolVersion: number | null;
               createdAt: string;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/admin/versions`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags AdminVersion
 * @name AdminVersionControllerUpdateWhitelist
 * @request POST:/api/v2/admin/versions/{id}/whitelist
 * @response `200` `{
    success: boolean,
    promotedScores?: number,

}` Whitelist update result
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      adminVersionControllerUpdateWhitelist: (
         { id }: AdminVersionControllerUpdateWhitelistParams,
         data: AdminVersionControllerUpdateWhitelistPayload,
         params: RequestParams = {}
      ) =>
         this.request<
            {
               success: boolean;
               promotedScores?: number;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/admin/versions/${id}/whitelist`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags AdminVersion
 * @name AdminVersionControllerDeleteVersion
 * @request DELETE:/api/v2/admin/versions/{id}
 * @response `200` `{
    success: boolean,

}` Version deletion result
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      adminVersionControllerDeleteVersion: ({ id }: AdminVersionControllerDeleteVersionParams, params: RequestParams = {}) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/admin/versions/${id}`,
            method: 'DELETE',
            format: 'json',
            ...params
         })
   };
   user = {
      /**
 * No description
 *
 * @tags User
 * @name UserControllerGetMe
 * @request GET:/api/v2/user/@me
 * @response `200` `{
    id: string,
    name: string,
    playerNameInGame: string,
    role: string | null,
    avatar: string,
    avatarVersion: number,
    bio: string | null,
    country: string,
    permissions: number,
    banned: boolean,
    inactive: boolean,
    vanity: string | null,
    publicLivePresenceOptOut: boolean,
    stats: {
    rank: number,
    countryRank: number,

},
    relationships: {
    following: ({
    id: string,
    relation: "platform-friend" | "follow",

})[],
    mutuals: ({
    id: string,
    relation: "platform-friend" | "follow",

})[],

},

}` Current authenticated player profile
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      userControllerGetMe: (params: RequestParams = {}) =>
         this.request<
            {
               id: string;
               name: string;
               playerNameInGame: string;
               role: string | null;
               avatar: string;
               avatarVersion: number;
               bio: string | null;
               country: string;
               permissions: number;
               banned: boolean;
               inactive: boolean;
               vanity: string | null;
               publicLivePresenceOptOut: boolean;
               stats: {
                  rank: number;
                  countryRank: number;
               };
               relationships: {
                  following: {
                     id: string;
                     relation: 'platform-friend' | 'follow';
                  }[];
                  mutuals: {
                     id: string;
                     relation: 'platform-friend' | 'follow';
                  }[];
               };
            },
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/user/@me`,
            method: 'GET',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags User
 * @name UserControllerGetVanity
 * @request GET:/api/v2/user/@me/vanity
 * @response `200` `{
    slug: string | null,
    canChangeAt: string | null,

}` Current vanity URL and when it can next be changed
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 */
      userControllerGetVanity: (params: RequestParams = {}) =>
         this.request<
            {
               slug: string | null;
               canChangeAt: string | null;
            },
            {
               statusCode: 401;
               error: 'Unauthorized';
               code: 'UNAUTHORIZED';
               message: string;
            }
         >({
            path: `/api/v2/user/@me/vanity`,
            method: 'GET',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags User
 * @name UserControllerClaimVanity
 * @request PUT:/api/v2/user/@me/vanity
 * @response `200` `{
    slug: string | null,
    canChangeAt: string | null,

}` Claim or change the vanity URL for the current account
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `403` `{
    statusCode: 403,
    error: "Forbidden",
    code: "FORBIDDEN",
    message: string,
    details?: {
    reason: string,

},

}` Forbidden
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      userControllerClaimVanity: (data: UserControllerClaimVanityPayload, params: RequestParams = {}) =>
         this.request<
            {
               slug: string | null;
               canChangeAt: string | null;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 403;
                 error: 'Forbidden';
                 code: 'FORBIDDEN';
                 message: string;
                 details?: {
                    reason: string;
                 };
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/user/@me/vanity`,
            method: 'PUT',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags User
 * @name UserControllerUpdatePinnedScores
 * @request PUT:/api/v2/user/@me/pinned-scores
 * @response `200` `{
    success: boolean,

}` Pinned scores update result
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `403` `{
    statusCode: 403,
    error: "Forbidden",
    code: "FORBIDDEN",
    message: string,
    details?: {
    reason: string,

},

}` Forbidden
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      userControllerUpdatePinnedScores: (data: UserControllerUpdatePinnedScoresPayload, params: RequestParams = {}) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 403;
                 error: 'Forbidden';
                 code: 'FORBIDDEN';
                 message: string;
                 details?: {
                    reason: string;
                 };
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/user/@me/pinned-scores`,
            method: 'PUT',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags User
 * @name UserControllerUpdateProfileCustomization
 * @request PUT:/api/v2/user/@me/profile-customization
 * @response `200` `{
    backgroundImage: string | null,
    backgroundImageVersion: number | null,
    accentColor: string | null,
    accentForegroundColor: string | null,
    accentForegroundActiveColor: string | null,
    supporterNameColorEnabled: boolean,
    badgeOrder: (number)[] | null,
    badgeComments: Record<string,string> | null,
    statOrder: ("rankedPlays" | "rankedScore" | "rankedAcc" | "plusOnePP" | "totalPlays" | "totalScore" | "joined" | "replayViews" | "role")[] | null,
    enabledStatIds: ("rankedPlays" | "rankedScore" | "rankedAcc" | "plusOnePP" | "totalPlays" | "totalScore" | "joined" | "replayViews" | "role")[] | null,
    chartMetricIds: ("rank" | "totalPP" | "averageAccuracy" | "totalSubmittedPlays")[] | null,
    sectionOrder: ("charts" | "bio" | "pinnedScores" | "scores")[] | null,

}` Profile customization update result
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `403` `{
    statusCode: 403,
    error: "Forbidden",
    code: "FORBIDDEN",
    message: string,
    details?: {
    reason: string,

},

}` Forbidden
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      userControllerUpdateProfileCustomization: (data: UserControllerUpdateProfileCustomizationPayload, params: RequestParams = {}) =>
         this.request<
            {
               backgroundImage: string | null;
               backgroundImageVersion: number | null;
               accentColor: string | null;
               accentForegroundColor: string | null;
               accentForegroundActiveColor: string | null;
               supporterNameColorEnabled: boolean;
               badgeOrder: number[] | null;
               badgeComments: Record<string, string> | null;
               statOrder:
                  | ('rankedPlays' | 'rankedScore' | 'rankedAcc' | 'plusOnePP' | 'totalPlays' | 'totalScore' | 'joined' | 'replayViews' | 'role')[]
                  | null;
               enabledStatIds:
                  | ('rankedPlays' | 'rankedScore' | 'rankedAcc' | 'plusOnePP' | 'totalPlays' | 'totalScore' | 'joined' | 'replayViews' | 'role')[]
                  | null;
               chartMetricIds: ('rank' | 'totalPP' | 'averageAccuracy' | 'totalSubmittedPlays')[] | null;
               sectionOrder: ('charts' | 'bio' | 'pinnedScores' | 'scores')[] | null;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 403;
                 error: 'Forbidden';
                 code: 'FORBIDDEN';
                 message: string;
                 details?: {
                    reason: string;
                 };
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/user/@me/profile-customization`,
            method: 'PUT',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags User
 * @name UserControllerUpdateProfileCustomizationStyle
 * @request PUT:/api/v2/user/@me/profile-customization/style
 * @response `200` `{
    backgroundImage: string | null,
    backgroundImageVersion: number | null,
    accentColor: string | null,
    accentForegroundColor: string | null,
    accentForegroundActiveColor: string | null,
    supporterNameColorEnabled: boolean,
    badgeOrder: (number)[] | null,
    badgeComments: Record<string,string> | null,
    statOrder: ("rankedPlays" | "rankedScore" | "rankedAcc" | "plusOnePP" | "totalPlays" | "totalScore" | "joined" | "replayViews" | "role")[] | null,
    enabledStatIds: ("rankedPlays" | "rankedScore" | "rankedAcc" | "plusOnePP" | "totalPlays" | "totalScore" | "joined" | "replayViews" | "role")[] | null,
    chartMetricIds: ("rank" | "totalPP" | "averageAccuracy" | "totalSubmittedPlays")[] | null,
    sectionOrder: ("charts" | "bio" | "pinnedScores" | "scores")[] | null,

}` Profile style customization update result
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `403` `{
    statusCode: 403,
    error: "Forbidden",
    code: "FORBIDDEN",
    message: string,
    details?: {
    reason: string,

},

}` Forbidden
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      userControllerUpdateProfileCustomizationStyle: (data: UserControllerUpdateProfileCustomizationStylePayload, params: RequestParams = {}) =>
         this.request<
            {
               backgroundImage: string | null;
               backgroundImageVersion: number | null;
               accentColor: string | null;
               accentForegroundColor: string | null;
               accentForegroundActiveColor: string | null;
               supporterNameColorEnabled: boolean;
               badgeOrder: number[] | null;
               badgeComments: Record<string, string> | null;
               statOrder:
                  | ('rankedPlays' | 'rankedScore' | 'rankedAcc' | 'plusOnePP' | 'totalPlays' | 'totalScore' | 'joined' | 'replayViews' | 'role')[]
                  | null;
               enabledStatIds:
                  | ('rankedPlays' | 'rankedScore' | 'rankedAcc' | 'plusOnePP' | 'totalPlays' | 'totalScore' | 'joined' | 'replayViews' | 'role')[]
                  | null;
               chartMetricIds: ('rank' | 'totalPP' | 'averageAccuracy' | 'totalSubmittedPlays')[] | null;
               sectionOrder: ('charts' | 'bio' | 'pinnedScores' | 'scores')[] | null;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 403;
                 error: 'Forbidden';
                 code: 'FORBIDDEN';
                 message: string;
                 details?: {
                    reason: string;
                 };
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/user/@me/profile-customization/style`,
            method: 'PUT',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags User
 * @name UserControllerUploadProfileCustomizationBackground
 * @request POST:/api/v2/user/@me/profile-customization/background
 * @response `200` `{
    backgroundImage: string | null,
    backgroundImageVersion: number | null,
    accentColor: string | null,
    accentForegroundColor: string | null,
    accentForegroundActiveColor: string | null,
    supporterNameColorEnabled: boolean,
    badgeOrder: (number)[] | null,
    badgeComments: Record<string,string> | null,
    statOrder: ("rankedPlays" | "rankedScore" | "rankedAcc" | "plusOnePP" | "totalPlays" | "totalScore" | "joined" | "replayViews" | "role")[] | null,
    enabledStatIds: ("rankedPlays" | "rankedScore" | "rankedAcc" | "plusOnePP" | "totalPlays" | "totalScore" | "joined" | "replayViews" | "role")[] | null,
    chartMetricIds: ("rank" | "totalPP" | "averageAccuracy" | "totalSubmittedPlays")[] | null,
    sectionOrder: ("charts" | "bio" | "pinnedScores" | "scores")[] | null,

}` Profile background upload result
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `403` `{
    statusCode: 403,
    error: "Forbidden",
    code: "FORBIDDEN",
    message: string,
    details?: {
    reason: string,

},

}` Forbidden
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      userControllerUploadProfileCustomizationBackground: (
         data: UserControllerUploadProfileCustomizationBackgroundPayload,
         params: RequestParams = {}
      ) =>
         this.request<
            {
               backgroundImage: string | null;
               backgroundImageVersion: number | null;
               accentColor: string | null;
               accentForegroundColor: string | null;
               accentForegroundActiveColor: string | null;
               supporterNameColorEnabled: boolean;
               badgeOrder: number[] | null;
               badgeComments: Record<string, string> | null;
               statOrder:
                  | ('rankedPlays' | 'rankedScore' | 'rankedAcc' | 'plusOnePP' | 'totalPlays' | 'totalScore' | 'joined' | 'replayViews' | 'role')[]
                  | null;
               enabledStatIds:
                  | ('rankedPlays' | 'rankedScore' | 'rankedAcc' | 'plusOnePP' | 'totalPlays' | 'totalScore' | 'joined' | 'replayViews' | 'role')[]
                  | null;
               chartMetricIds: ('rank' | 'totalPP' | 'averageAccuracy' | 'totalSubmittedPlays')[] | null;
               sectionOrder: ('charts' | 'bio' | 'pinnedScores' | 'scores')[] | null;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 403;
                 error: 'Forbidden';
                 code: 'FORBIDDEN';
                 message: string;
                 details?: {
                    reason: string;
                 };
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/user/@me/profile-customization/background`,
            method: 'POST',
            body: data,
            type: ContentType.FormData,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags User
 * @name UserControllerResetProfileCustomizationBackground
 * @request DELETE:/api/v2/user/@me/profile-customization/background
 * @response `200` `{
    backgroundImage: string | null,
    backgroundImageVersion: number | null,
    accentColor: string | null,
    accentForegroundColor: string | null,
    accentForegroundActiveColor: string | null,
    supporterNameColorEnabled: boolean,
    badgeOrder: (number)[] | null,
    badgeComments: Record<string,string> | null,
    statOrder: ("rankedPlays" | "rankedScore" | "rankedAcc" | "plusOnePP" | "totalPlays" | "totalScore" | "joined" | "replayViews" | "role")[] | null,
    enabledStatIds: ("rankedPlays" | "rankedScore" | "rankedAcc" | "plusOnePP" | "totalPlays" | "totalScore" | "joined" | "replayViews" | "role")[] | null,
    chartMetricIds: ("rank" | "totalPP" | "averageAccuracy" | "totalSubmittedPlays")[] | null,
    sectionOrder: ("charts" | "bio" | "pinnedScores" | "scores")[] | null,

}` Profile background reset result
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `403` `{
    statusCode: 403,
    error: "Forbidden",
    code: "FORBIDDEN",
    message: string,
    details?: {
    reason: string,

},

}` Forbidden
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      userControllerResetProfileCustomizationBackground: (params: RequestParams = {}) =>
         this.request<
            {
               backgroundImage: string | null;
               backgroundImageVersion: number | null;
               accentColor: string | null;
               accentForegroundColor: string | null;
               accentForegroundActiveColor: string | null;
               supporterNameColorEnabled: boolean;
               badgeOrder: number[] | null;
               badgeComments: Record<string, string> | null;
               statOrder:
                  | ('rankedPlays' | 'rankedScore' | 'rankedAcc' | 'plusOnePP' | 'totalPlays' | 'totalScore' | 'joined' | 'replayViews' | 'role')[]
                  | null;
               enabledStatIds:
                  | ('rankedPlays' | 'rankedScore' | 'rankedAcc' | 'plusOnePP' | 'totalPlays' | 'totalScore' | 'joined' | 'replayViews' | 'role')[]
                  | null;
               chartMetricIds: ('rank' | 'totalPP' | 'averageAccuracy' | 'totalSubmittedPlays')[] | null;
               sectionOrder: ('charts' | 'bio' | 'pinnedScores' | 'scores')[] | null;
            },
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 403;
                 error: 'Forbidden';
                 code: 'FORBIDDEN';
                 message: string;
                 details?: {
                    reason: string;
                 };
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/user/@me/profile-customization/background`,
            method: 'DELETE',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags User
 * @name UserControllerGetMyInfo
 * @request GET:/api/v2/user/my-info
 * @response `200` `{
    country: string,
    ip: string,

}` Client IP and country info
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 */
      userControllerGetMyInfo: (params: RequestParams = {}) =>
         this.request<
            {
               country: string;
               ip: string;
            },
            {
               statusCode: 401;
               error: 'Unauthorized';
               code: 'UNAUTHORIZED';
               message: string;
            }
         >({
            path: `/api/v2/user/my-info`,
            method: 'GET',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags User
 * @name UserControllerGetQuestKey
 * @request GET:/api/v2/user/quest-key
 * @response `200` `{
    questKey: string,

}` Quest authentication key
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      userControllerGetQuestKey: (params: RequestParams = {}) =>
         this.request<
            {
               questKey: string;
            },
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/user/quest-key`,
            method: 'GET',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags User
 * @name UserControllerCanResetCountry
 * @request GET:/api/v2/user/can-reset-country
 * @response `200` `{
    canReset: boolean,
    lastReset: string | null,
    country: string,

}` Country reset eligibility status
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 */
      userControllerCanResetCountry: (params: RequestParams = {}) =>
         this.request<
            {
               canReset: boolean;
               lastReset: string | null;
               country: string;
            },
            {
               statusCode: 401;
               error: 'Unauthorized';
               code: 'UNAUTHORIZED';
               message: string;
            }
         >({
            path: `/api/v2/user/can-reset-country`,
            method: 'GET',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags User
 * @name UserControllerResetCountry
 * @request POST:/api/v2/user/reset-country
 * @response `200` `{
    success: boolean,

}` Country reset result
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      userControllerResetCountry: (params: RequestParams = {}) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/user/reset-country`,
            method: 'POST',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags User
 * @name UserControllerUpdateBio
 * @request POST:/api/v2/user/update-bio
 * @response `200` `{
    success: boolean,

}` Bio update result
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      userControllerUpdateBio: (data: UserControllerUpdateBioPayload, params: RequestParams = {}) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/user/update-bio`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags User
 * @name UserControllerUpdateName
 * @request POST:/api/v2/user/update-name
 * @response `200` `{
    success: boolean,

}` Name update result
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      userControllerUpdateName: (data: UserControllerUpdateNamePayload, params: RequestParams = {}) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/user/update-name`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags User
 * @name UserControllerUpdateLiveSpectating
 * @request POST:/api/v2/user/live-spectating
 * @response `200` `{
    success: boolean,

}` Public live presence preference update result
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      userControllerUpdateLiveSpectating: (data: UserControllerUpdateLiveSpectatingPayload, params: RequestParams = {}) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/user/live-spectating`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags User
 * @name UserControllerUploadAvatar
 * @request POST:/api/v2/user/avatar
 * @response `200` `{
    success: boolean,

}` Avatar upload result
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      userControllerUploadAvatar: (data: UserControllerUploadAvatarPayload, params: RequestParams = {}) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/user/avatar`,
            method: 'POST',
            body: data,
            type: ContentType.FormData,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags User
 * @name UserControllerGetReplaySlots
 * @request GET:/api/v2/user/replay-slots
 * @response `200` `{
    used: number,
    limit: number,
    slots: ({
    scoreId: number,
    leaderboardId: number,
    retentionState: "FREE" | "SUPPORTER" | "ARCHIVED" | "PRUNE_CANDIDATE",
    source: string,
    releasedAt: string | null,

})[],
    claimable: ({
    scoreId: number,
    leaderboardId: number,
    retentionState: "FREE" | "SUPPORTER" | "ARCHIVED" | "PRUNE_CANDIDATE",
    source: string,
    releasedAt: string | null,

})[],

}` Replay slot usage and claimable replays
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      userControllerGetReplaySlots: (params: RequestParams = {}) =>
         this.request<
            {
               used: number;
               limit: number;
               slots: {
                  scoreId: number;
                  leaderboardId: number;
                  retentionState: 'FREE' | 'SUPPORTER' | 'ARCHIVED' | 'PRUNE_CANDIDATE';
                  source: string;
                  releasedAt: string | null;
               }[];
               claimable: {
                  scoreId: number;
                  leaderboardId: number;
                  retentionState: 'FREE' | 'SUPPORTER' | 'ARCHIVED' | 'PRUNE_CANDIDATE';
                  source: string;
                  releasedAt: string | null;
               }[];
            },
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/user/replay-slots`,
            method: 'GET',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags User
 * @name UserControllerRefreshPatreonBenefits
 * @request POST:/api/v2/user/patreon/refresh
 * @response `200` `{
    success: true,
    supporterStatus: "supporter" | "pp-farmer" | "none",

}` Refresh Patreon supporter benefits for the current user
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      userControllerRefreshPatreonBenefits: (params: RequestParams = {}) =>
         this.request<
            {
               success: true;
               supporterStatus: 'supporter' | 'pp-farmer' | 'none';
            },
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/user/patreon/refresh`,
            method: 'POST',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags User
 * @name UserControllerClaimReplaySlot
 * @request POST:/api/v2/user/replay-slots/{scoreId}
 * @response `200` `{
    scoreId: number,
    leaderboardId: number,
    retentionState: "FREE" | "SUPPORTER" | "ARCHIVED" | "PRUNE_CANDIDATE",
    source: string,
    releasedAt: string | null,

}` Claim a current-best replay into a replay slot
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      userControllerClaimReplaySlot: ({ scoreId }: UserControllerClaimReplaySlotParams, params: RequestParams = {}) =>
         this.request<
            {
               scoreId: number;
               leaderboardId: number;
               retentionState: 'FREE' | 'SUPPORTER' | 'ARCHIVED' | 'PRUNE_CANDIDATE';
               source: string;
               releasedAt: string | null;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/user/replay-slots/${scoreId}`,
            method: 'POST',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags User
 * @name UserControllerReleaseReplaySlot
 * @request DELETE:/api/v2/user/replay-slots/{scoreId}
 * @response `200` `{
    scoreId: number,
    leaderboardId: number,
    retentionState: "FREE" | "SUPPORTER" | "ARCHIVED" | "PRUNE_CANDIDATE",
    source: string,
    releasedAt: string | null,

}` Release a replay slot
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      userControllerReleaseReplaySlot: ({ scoreId }: UserControllerReleaseReplaySlotParams, params: RequestParams = {}) =>
         this.request<
            {
               scoreId: number;
               leaderboardId: number;
               retentionState: 'FREE' | 'SUPPORTER' | 'ARCHIVED' | 'PRUNE_CANDIDATE';
               source: string;
               releasedAt: string | null;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/user/replay-slots/${scoreId}`,
            method: 'DELETE',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags User
 * @name UserControllerGetConnections
 * @request GET:/api/v2/user/connections
 * @response `200` `({
    id: number,
    provider: "STEAM" | "OCULUS" | "PATREON" | "DISCORD" | "SCORESABER",
    providerAccountId: string,
    state: "VERIFIED" | "CONNECTED",
    source: "LEGACY_IMPORT" | "GAME_AUTH" | "STEAM_OPENID" | "PATREON_OAUTH" | "DISCORD_OAUTH" | "DISCORD_BOT" | "SCORESABER_SIGNUP" | "SCORESABER_SYSTEM",
    isPrimary: boolean,
  /**
   * @format date-time
   * @pattern ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
   *\/
    connectedAt: Date | null,
    tokenBacked: boolean,

})[]` Player connections
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 */
      userControllerGetConnections: (params: RequestParams = {}) =>
         this.request<
            {
               id: number;
               provider: 'STEAM' | 'OCULUS' | 'PATREON' | 'DISCORD' | 'SCORESABER';
               providerAccountId: string;
               state: 'VERIFIED' | 'CONNECTED';
               source:
                  | 'LEGACY_IMPORT'
                  | 'GAME_AUTH'
                  | 'STEAM_OPENID'
                  | 'PATREON_OAUTH'
                  | 'DISCORD_OAUTH'
                  | 'DISCORD_BOT'
                  | 'SCORESABER_SIGNUP'
                  | 'SCORESABER_SYSTEM';
               isPrimary: boolean;
               /**
                * @format date-time
                * @pattern ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
                */
               connectedAt: Date | null;
               tokenBacked: boolean;
            }[],
            {
               statusCode: 401;
               error: 'Unauthorized';
               code: 'UNAUTHORIZED';
               message: string;
            }
         >({
            path: `/api/v2/user/connections`,
            method: 'GET',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags User
 * @name UserControllerSwitchPrimaryConnection
 * @request POST:/api/v2/user/connections/primary
 * @response `200` `{
    success: true,
    publicPlayerId: string,
    provider: "STEAM" | "OCULUS" | "SCORESABER",

}` Primary public account id switch result
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      userControllerSwitchPrimaryConnection: (data: UserControllerSwitchPrimaryConnectionPayload, params: RequestParams = {}) =>
         this.request<
            {
               success: true;
               publicPlayerId: string;
               provider: 'STEAM' | 'OCULUS' | 'SCORESABER';
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/user/connections/primary`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags User
 * @name UserControllerStartOculusEmailMerge
 * @request POST:/api/v2/user/account-merge/oculus-email/start
 * @response `200` `{
    challengeId: string,
    expiresAt: string,
    resendAvailableAt: string,

}` Start an Oculus email proof challenge for account merge
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      userControllerStartOculusEmailMerge: (data: UserControllerStartOculusEmailMergePayload, params: RequestParams = {}) =>
         this.request<
            {
               challengeId: string;
               expiresAt: string;
               resendAvailableAt: string;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/user/account-merge/oculus-email/start`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags User
 * @name UserControllerVerifyOculusEmailMerge
 * @request POST:/api/v2/user/account-merge/oculus-email/verify
 * @response `200` `{
    challengeId: string,
  /**
   * @format date-time
   * @pattern ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
   *\/
    expiresAt: Date,
    targetPlayer: {
    id: string,
    name: string,
    country: string,
    provider: "STEAM" | "OCULUS" | "SCORESABER",
    providerAccountId: string,
    publicPlayerId: string,

},
    sourcePlayer: {
    id: string,
    name: string,
    country: string,
    provider: "STEAM" | "OCULUS" | "SCORESABER",
    providerAccountId: string,
    publicPlayerId: string,

},

}` Verify an Oculus email proof and create an account merge challenge
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `403` `{
    statusCode: 403,
    error: "Forbidden",
    code: "FORBIDDEN",
    message: string,
    details?: {
    reason: string,

},

}` Forbidden
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      userControllerVerifyOculusEmailMerge: (data: UserControllerVerifyOculusEmailMergePayload, params: RequestParams = {}) =>
         this.request<
            {
               challengeId: string;
               /**
                * @format date-time
                * @pattern ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
                */
               expiresAt: Date;
               targetPlayer: {
                  id: string;
                  name: string;
                  country: string;
                  provider: 'STEAM' | 'OCULUS' | 'SCORESABER';
                  providerAccountId: string;
                  publicPlayerId: string;
               };
               sourcePlayer: {
                  id: string;
                  name: string;
                  country: string;
                  provider: 'STEAM' | 'OCULUS' | 'SCORESABER';
                  providerAccountId: string;
                  publicPlayerId: string;
               };
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 403;
                 error: 'Forbidden';
                 code: 'FORBIDDEN';
                 message: string;
                 details?: {
                    reason: string;
                 };
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/user/account-merge/oculus-email/verify`,
            method: 'POST',
            body: data,
            type: ContentType.Json,
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags User
 * @name UserControllerGetAccountMergeChallenge
 * @request GET:/api/v2/user/account-merge/{challengeId}
 * @response `200` `{
    challengeId: string,
  /**
   * @format date-time
   * @pattern ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
   *\/
    expiresAt: Date,
    targetPlayer: {
    id: string,
    name: string,
    country: string,
    provider: "STEAM" | "OCULUS" | "SCORESABER",
    providerAccountId: string,
    publicPlayerId: string,

},
    sourcePlayer: {
    id: string,
    name: string,
    country: string,
    provider: "STEAM" | "OCULUS" | "SCORESABER",
    providerAccountId: string,
    publicPlayerId: string,

},

}` Account merge challenge preview
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `403` `{
    statusCode: 403,
    error: "Forbidden",
    code: "FORBIDDEN",
    message: string,
    details?: {
    reason: string,

},

}` Forbidden
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      userControllerGetAccountMergeChallenge: ({ challengeId }: UserControllerGetAccountMergeChallengeParams, params: RequestParams = {}) =>
         this.request<
            {
               challengeId: string;
               /**
                * @format date-time
                * @pattern ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
                */
               expiresAt: Date;
               targetPlayer: {
                  id: string;
                  name: string;
                  country: string;
                  provider: 'STEAM' | 'OCULUS' | 'SCORESABER';
                  providerAccountId: string;
                  publicPlayerId: string;
               };
               sourcePlayer: {
                  id: string;
                  name: string;
                  country: string;
                  provider: 'STEAM' | 'OCULUS' | 'SCORESABER';
                  providerAccountId: string;
                  publicPlayerId: string;
               };
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 403;
                 error: 'Forbidden';
                 code: 'FORBIDDEN';
                 message: string;
                 details?: {
                    reason: string;
                 };
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/user/account-merge/${challengeId}`,
            method: 'GET',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags User
 * @name UserControllerConfirmAccountMerge
 * @request POST:/api/v2/user/account-merge/{challengeId}/confirm
 * @response `200` `{
    success: true,
    targetPlayerId: string,
    publicPlayerId: string,
    mergedPublicPlayerIds: (string)[],

}` Account merge result
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `403` `{
    statusCode: 403,
    error: "Forbidden",
    code: "FORBIDDEN",
    message: string,
    details?: {
    reason: string,

},

}` Forbidden
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 * @response `500` `({
    statusCode: 500,
    error: "Internal Server Error",
    code: "EXTERNAL_SERVICE_ERROR",
    message: string,
    details: {
    service: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "DATABASE_WRITE_ERROR",
    message: string,
    details: {
    operation: string,

},

} | {
    statusCode: 500,
    error: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
    message: string,

})` Internal Server Error
 */
      userControllerConfirmAccountMerge: ({ challengeId }: UserControllerConfirmAccountMergeParams, params: RequestParams = {}) =>
         this.request<
            {
               success: true;
               targetPlayerId: string;
               publicPlayerId: string;
               mergedPublicPlayerIds: string[];
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 403;
                 error: 'Forbidden';
                 code: 'FORBIDDEN';
                 message: string;
                 details?: {
                    reason: string;
                 };
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
            | (
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'EXTERNAL_SERVICE_ERROR';
                      message: string;
                      details: {
                         service: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'DATABASE_WRITE_ERROR';
                      message: string;
                      details: {
                         operation: string;
                      };
                   }
                 | {
                      statusCode: 500;
                      error: 'Internal Server Error';
                      code: 'INTERNAL_SERVER_ERROR';
                      message: string;
                   }
              )
         >({
            path: `/api/v2/user/account-merge/${challengeId}/confirm`,
            method: 'POST',
            format: 'json',
            ...params
         }),

      /**
 * No description
 *
 * @tags User
 * @name UserControllerRemoveConnection
 * @request DELETE:/api/v2/user/connections/{provider}
 * @response `200` `{
    success: boolean,

}` Connection removal result
 * @response `400` `({
    statusCode: 400,
    error: "Bad Request",
    code: "VALIDATION_ERROR",
    message: string,
    details?: {
    field?: string,

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "REQUEST_VALIDATION_ERROR",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

} | {
    statusCode: 400,
    error: "Bad Request",
    code: "INVALID_PATH_PARAMETER",
    message: string,
    details: {
    errors: ({
    path: string,
    message: string,

})[],

},

})` Bad Request
 * @response `401` `{
    statusCode: 401,
    error: "Unauthorized",
    code: "UNAUTHORIZED",
    message: string,

}` Unauthorized
 * @response `404` `{
    statusCode: 404,
    error: "Not Found",
    code: "NOT_FOUND",
    message: string,
    details?: {
    resource: string,
    id?: (string | number),

},

}` Not Found
 */
      userControllerRemoveConnection: ({ provider }: UserControllerRemoveConnectionParams, params: RequestParams = {}) =>
         this.request<
            {
               success: boolean;
            },
            | (
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'VALIDATION_ERROR';
                      message: string;
                      details?: {
                         field?: string;
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'REQUEST_VALIDATION_ERROR';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
                 | {
                      statusCode: 400;
                      error: 'Bad Request';
                      code: 'INVALID_PATH_PARAMETER';
                      message: string;
                      details: {
                         errors: {
                            path: string;
                            message: string;
                         }[];
                      };
                   }
              )
            | {
                 statusCode: 401;
                 error: 'Unauthorized';
                 code: 'UNAUTHORIZED';
                 message: string;
              }
            | {
                 statusCode: 404;
                 error: 'Not Found';
                 code: 'NOT_FOUND';
                 message: string;
                 details?: {
                    resource: string;
                    id?: string | number;
                 };
              }
         >({
            path: `/api/v2/user/connections/${provider}`,
            method: 'DELETE',
            format: 'json',
            ...params
         })
   };
}
