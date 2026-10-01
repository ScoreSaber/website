import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import type {
   LeaderboardControllerGetLeaderboardByIdResponse,
   LeaderboardControllerGetLeaderboardScoresByIdDataItem,
   PlayerControllerGetPlayerScoresDataItem
} from '@/shared/api/generated/ApiParams';
import { getDifficultyLabel } from '@/shared/format/strings';
import { isLeaderboardRanked } from '@/shared/format/styling';

export function rankToPage(rank: number, perPage: number) {
   return Math.floor((rank + perPage - 1) / perPage);
}

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

export function formatPP(pp: number) {
   if (!Number.isFinite(pp)) return '0.00';
   return pp.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
}

export function formatNumber(num: number) {
   if (!Number.isFinite(num)) return '0';
   return num.toLocaleString('en-US');
}

export function formatAccuracy(acc: number) {
   if (!Number.isFinite(acc)) return '0.00%';
   return `${acc.toFixed(2)}%`;
}

export function formatStars(stars: number) {
   return `${stars.toFixed(2).replace(/\.?0+$/, '')}★`;
}

const ACCURACY_CHANGE_DATE = Date.parse('2019-05-21T21:27:12Z');

export function isLegacyAccuracyScore(timeSet: string | null | undefined) {
   return !!timeSet && Date.parse(timeSet) <= ACCURACY_CHANGE_DATE;
}

export function isSteamPlayer(id: string) {
   return parseInt(id, 10) >= 70000000000000000;
}

const htmlEntities = new Map([
   ['&amp;', '&'],
   ['&lt;', '<'],
   ['&gt;', '>'],
   ['&quot;', '"'],
   ['&#39;', "'"],
   ['&apos;', "'"]
]);
const entityPattern = /&(?:amp|lt|gt|quot|#39|apos);/g;

export function decodeHtmlEntities(text: string) {
   return text.replace(entityPattern, (match) => htmlEntities.get(match) ?? match);
}

const LEGACY_HMDS = new Map([
   [0, 'Unknown'],
   [1, 'Rift CV1'],
   [2, 'Vive'],
   [4, 'Vive Pro'],
   [8, 'Windows MR'],
   [16, 'Rift S'],
   [32, 'Quest'],
   [64, 'Valve Index'],
   [128, 'Vive Cosmos']
]);

type ScoreDevice = PlayerControllerGetPlayerScoresDataItem['score']['device'] | LeaderboardControllerGetLeaderboardScoresByIdDataItem['device'];

export function getHmdName(device: ScoreDevice, legacyHmdId: number | null): string | null {
   if (device?.hmd) return device.hmd;
   if (legacyHmdId != null) return LEGACY_HMDS.get(legacyHmdId) ?? null;
   return null;
}

export function buildSongInfoProps(leaderboard: LeaderboardControllerGetLeaderboardByIdResponse) {
   const isRanked = isLeaderboardRanked(leaderboard);
   return {
      mapId: leaderboard.map.id,
      leaderboardId: leaderboard.id,
      songName: leaderboard.map.songName,
      songAuthorName: leaderboard.map.songAuthorName,
      levelAuthorName: leaderboard.map.levelAuthorName,
      coverImage: leaderboard.map.coverUrl,
      createdDate: leaderboard.createdAt,
      difficultyValue: leaderboard.difficulty.difficulty,
      difficultyName: getDifficultyLabel(leaderboard.difficulty.difficulty),
      starValue: isRanked ? leaderboard.realm.stars : undefined
   };
}
