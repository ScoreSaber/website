import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import { buildMapLeaderboardHead, getMapLeaderboardPageData, leaderboardSearchSchema } from '../../-leaderboard';
import { MapLeaderboardRouteContent } from '../../-leaderboard-content';

import { isNumber, requestOrNotFound } from '@/shared/url-state/params';

const mapDifficultyParamsSchema = z.object({
   id: isNumber,
   leaderboardId: isNumber
});

export const Route = createFileRoute('/map/$id/difficulty/$leaderboardId')({
   params: {
      parse: (params) => requestOrNotFound(mapDifficultyParamsSchema.safeParse(params)),
      stringify: (params) => ({ id: String(params.id), leaderboardId: String(params.leaderboardId) })
   },
   validateSearch: (search) => requestOrNotFound(leaderboardSearchSchema.safeParse(search)),
   loaderDeps: ({ search }) => search,
   loader: ({ params, deps, location }) =>
      getMapLeaderboardPageData({
         data: {
            routeName: 'mapDifficulty',
            mapId: params.id,
            leaderboardId: params.leaderboardId,
            search: deps,
            rawSearch: location.search
         }
      }),
   head: ({ loaderData }) => buildMapLeaderboardHead(loaderData, 'mapDifficulty'),
   component: MapDifficultyRoute
});

function MapDifficultyRoute() {
   const params = Route.useParams();
   const data = Route.useLoaderData();

   return (
      <MapLeaderboardRouteContent
         input={{
            routeName: 'mapDifficulty',
            mapId: params.id
         }}
         data={data}
      />
   );
}
