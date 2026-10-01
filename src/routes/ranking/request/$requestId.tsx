import { createFileRoute, redirect } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';

import { parseLegacyRouteId } from '@/routes/(legacy)/-redirects';
import { publicApi } from '@/shared/api/server-api';
import { optionalApiData } from '@/shared/result/api';

type RankRequestRedirect = { name: 'rankRequests' } | { name: 'map'; id: number } | { name: 'mapDifficulty'; id: number; leaderboardId: number };

const getRankRequestRedirect = createServerFn({ method: 'GET' })
   .validator((data: { requestId?: string }) => data)
   .handler(async ({ data }): Promise<RankRequestRedirect> => {
      const id = parseLegacyRouteId(data.requestId);
      if (!id) return { name: 'rankRequests' };

      const request = await optionalApiData(publicApi.ranking.rankingControllerGetRequestById({ id }));
      if (!request) return { name: 'rankRequests' };

      const leaderboard = request.difficulties[0]?.leaderboard;
      if (!leaderboard) return { name: 'map', id: request.map.id };

      return { name: 'mapDifficulty', id: request.map.id, leaderboardId: leaderboard.id };
   });

export const Route = createFileRoute('/ranking/request/$requestId')({
   loader: async ({ params }) => {
      const target = await getRankRequestRedirect({ data: { requestId: params.requestId } });

      if (target.name === 'rankRequests') {
         throw redirect({ to: '/ranking/requests', search: { page: 1 }, statusCode: 301 });
      }

      if (target.name === 'map') {
         throw redirect({
            to: '/map/$id',
            params: { id: target.id },
            search: { page: 1, tab: 'rank-request' },
            statusCode: 301
         });
      }

      throw redirect({
         to: '/map/$id/difficulty/$leaderboardId',
         params: { id: target.id, leaderboardId: target.leaderboardId },
         search: { page: 1, tab: 'rank-request' },
         statusCode: 301
      });
   },
   component: RankingRequestRoute
});

function RankingRequestRoute() {
   return null;
}
