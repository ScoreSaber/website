import { createFileRoute, Outlet } from '@tanstack/react-router';
import { z } from 'zod';

import { NotFoundCard } from '@/shared/components/error/not-found-card';
import { isNumber, requestOrNotFound } from '@/shared/url-state/params';

const mapParamsSchema = z.object({
   id: isNumber
});

export const Route = createFileRoute('/map/$id')({
   params: {
      parse: (params) => requestOrNotFound(mapParamsSchema.safeParse(params)),
      stringify: (params) => ({ id: String(params.id) })
   },
   notFoundComponent: () => <NotFoundCard titleKey="mapNotFound" descriptionKey="mapNotFoundDesc" />,
   component: Outlet
});
