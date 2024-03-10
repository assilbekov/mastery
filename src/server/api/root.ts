import { skillRouter } from "~/server/api/routers/skill";
import { timeBlockRouter } from "~/server/api/routers/timeBlock";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  skill: skillRouter,
  timeBlock: timeBlockRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
