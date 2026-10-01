import { createFileRoute, redirect } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

import { legacyLeaderboardQuery, parseLegacyRouteId } from '../-redirects';

import { publicApi } from '@/shared/api/server-api';
import { optionalApiData } from '@/shared/result/api';

const legacyLeaderboardRedirectInputSchema = z.object({
   leaderboardId: z.string().optional(),
   search: legacyLeaderboardQuery
});

type LegacyLeaderboardRedirect =
   | { name: 'maps' }
   | { name: 'mapDifficulty'; id: number; leaderboardId: number; search: z.output<typeof legacyLeaderboardQuery> };

const getLegacyLeaderboardRedirect = createServerFn({ method: 'GET' })
   .validator((data) => legacyLeaderboardRedirectInputSchema.parse(data))
   .handler(async ({ data }): Promise<LegacyLeaderboardRedirect> => {
      const id = parseLegacyRouteId(data.leaderboardId);
      if (!id) return { name: 'maps' };

      const leaderboard = await optionalApiData(publicApi.leaderboard.leaderboardControllerGetLeaderboardById({ id }));
      if (!leaderboard) return { name: 'maps' };

      return {
         name: 'mapDifficulty',
         id: leaderboard.map.id,
         leaderboardId: leaderboard.id,
         search: data.search
      };
   });

export const Route = createFileRoute('/(legacy)/leaderboard/$leaderboardId')({
   validateSearch: (search) => search,
   loaderDeps: ({ search }) => search,
   loader: async ({ params, deps }) => {
      const target = await getLegacyLeaderboardRedirect({ data: { leaderboardId: params.leaderboardId, search: deps } });

      if (target.name === 'maps') {
         throw redirect({ to: '/maps', statusCode: 308 });
      }

      throw redirect({
         to: '/map/$id/difficulty/$leaderboardId',
         params: { id: target.id, leaderboardId: target.leaderboardId },
         search: { page: 1, ...target.search },
         statusCode: 308
      });
   }
});
