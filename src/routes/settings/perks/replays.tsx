import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';

import { ReplaySlotsSection } from '@/modules/settings/sections/replay-slots-section';
import { SettingsShell } from '@/modules/settings/settings-shell';
import type { ScoreControllerGetScoreResponse } from '@/shared/api/generated/ApiParams';
import { api } from '@/shared/api/server-api';
import { optionalApiData } from '@/shared/result/api';
import { buildNoindexHead } from '@/shared/seo/metadata';
import { SetPageBackground } from '@/shell/background/page-background-provider';

const REPLAY_SCORE_DETAIL_CACHE_MS = 5 * 60 * 1000;
const MAX_CACHED_REPLAY_SCORE_DETAILS = 100;

const cachedScoreDetails = new Map<number, { expiresAt: number; score: ScoreControllerGetScoreResponse }>();
const pendingScoreDetails = new Map<number, Promise<ScoreControllerGetScoreResponse | null>>();

const getPerksReplaysData = createServerFn({ method: 'GET' }).handler(async () => {
   const replaySlots = await optionalApiData(api.user.userControllerGetReplaySlots());
   let scoreDetails: Record<number, ScoreControllerGetScoreResponse | null> = {};

   if (replaySlots) {
      const scoreIds = new Set([...replaySlots.slots, ...replaySlots.claimable].map((slot) => slot.scoreId));
      const entries = await Promise.all([...scoreIds].map(loadScoreDetailEntry));
      scoreDetails = Object.fromEntries(entries);
   }

   return { replaySlots, scoreDetails };
});

export const Route = createFileRoute('/settings/perks/replays')({
   loader: () => getPerksReplaysData(),
   head: () => buildNoindexHead('Replay Perks', 'Manage your ScoreSaber replay slots', '/settings/perks/replays'),
   component: SettingsPerksReplaysRoute
});

function SettingsPerksReplaysRoute() {
   const data = Route.useLoaderData();

   return (
      <>
         <SetPageBackground src="/images/banner.jpg" />
         <SettingsShell activeTab="perks">
            <ReplaySlotsSection replaySlots={data.replaySlots} scoreDetails={data.scoreDetails} />
         </SettingsShell>
      </>
   );
}

async function loadScoreDetailEntry(id: number): Promise<[number, ScoreControllerGetScoreResponse | null]> {
   const cached = cachedScoreDetails.get(id);
   if (cached && cached.expiresAt > Date.now()) return [id, cached.score];
   if (cached) cachedScoreDetails.delete(id);

   let pending = pendingScoreDetails.get(id);
   if (!pending) {
      pending = optionalApiData(api.score.scoreControllerGetScore({ id, includeScoreStats: 'false' }))
         .then((score) => {
            if (score) {
               if (cachedScoreDetails.size >= MAX_CACHED_REPLAY_SCORE_DETAILS) {
                  const oldestId = cachedScoreDetails.keys().next().value;
                  if (oldestId != null) cachedScoreDetails.delete(oldestId);
               }
               cachedScoreDetails.set(id, { expiresAt: Date.now() + REPLAY_SCORE_DETAIL_CACHE_MS, score });
            }
            return score;
         })
         .finally(() => pendingScoreDetails.delete(id));
      pendingScoreDetails.set(id, pending);
   }

   const score = await pending;
   return [id, score];
}
