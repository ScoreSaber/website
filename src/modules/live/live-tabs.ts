import { z } from 'zod';

export const liveTabSchema = z.enum(['settings', 'players', 'teams', 'roles', 'rooms']);
export type LiveTab = z.infer<typeof liveTabSchema>;
export const LIVE_TABS = liveTabSchema.options;
