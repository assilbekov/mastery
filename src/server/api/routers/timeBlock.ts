import { z } from "zod";
import { eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs";

import { timeBlocks } from "~/server/db/schema";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const timeBlockFormSchema = z.object({
  skillId: z.number(),
  timeInSeconds: z.number().int().positive(),
  comment: z.string().optional(),
})

export const timeBlockRouter = createTRPCRouter({
  getAllByUserId: publicProcedure
    .query(async ({ ctx }) => {
      const user = await currentUser();
      if (!user) {
        throw new Error("User not found");
      }
      return ctx.db.query.timeBlocks.findMany({
        where: eq(timeBlocks.userId, user.id),
        orderBy: (timeBlocks, { desc }) => [desc(timeBlocks.updatedAt)],
      });
    }),

  create: publicProcedure
    .input(timeBlockFormSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await currentUser();
      if (!user) {
        throw new Error("User not found");
      }
      await ctx.db.insert(timeBlocks).values({
        ...input,
        userId: user.id,
      });
    }),

  update: publicProcedure
    .input(z.object({ id: z.number() }).merge(timeBlockFormSchema))
    .mutation(async ({ ctx, input }) => {
      const user = await currentUser();
      if (!user) {
        throw new Error("User not found");
      }
      await ctx.db.update(timeBlocks).set({
        ...input,
        userId: user.id,
      }).where(eq(timeBlocks.id, input.id));
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(timeBlocks).where(eq(timeBlocks.id, input.id));
    }),
});
