import { createFileRoute, redirect } from '@tanstack/react-router';

import { legacyLeaderboardsQuery } from './-redirects';

export const Route = createFileRoute('/(legacy)/leaderboards')({
   validateSearch: (search) => legacyLeaderboardsQuery.parse(search),
   loaderDeps: ({ search }) => search,
   loader: ({ deps }) => {
      throw redirect({ to: '/maps', search: { ...deps, page: deps.page && deps.page > 1 ? deps.page : undefined }, statusCode: 308 });
   }
});
