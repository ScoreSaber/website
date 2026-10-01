import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import { buildMapLeaderboardHead, getMapLeaderboardPageData, leaderboardSearchSchema } from './-leaderboard';
import { MapLeaderboardRouteContent } from './-leaderboard-content';

import { isNumber, requestOrNotFound } from '@/shared/url-state/params';

const mapParamsSchema = z.object({
   id: isNumber
});

export const Route = createFileRoute('/map/$id/')({
   params: {
      parse: (params) => requestOrNotFound(mapParamsSchema.safeParse(params)),
      stringify: (params) => ({ id: String(params.id) })
   },
   validateSearch: (search) => requestOrNotFound(leaderboardSearchSchema.safeParse(search)),
   loaderDeps: ({ search }) => search,
   loader: ({ params, deps, location }) =>
      getMapLeaderboardPageData({
         data: {
            routeName: 'map',
            mapId: params.id,
            search: deps,
            rawSearch: location.search
         }
      }),
   head: ({ loaderData }) => buildMapLeaderboardHead(loaderData, 'map'),
   component: MapRoute
});

function MapRoute() {
   const params = Route.useParams();
   const data = Route.useLoaderData();

   return (
      <MapLeaderboardRouteContent
         input={{
            routeName: 'map',
            mapId: params.id
         }}
         data={data}
      />
   );
}
