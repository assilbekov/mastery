import { z } from "zod";
import { eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs";

import { skills } from "~/server/db/schema";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const skillFormSchema = z.object({
  name: z.string(),
  color: z.string(),
  icon: z.string(),
  description: z.string().optional(),
  goalInSeconds: z.number().int().positive().optional(),
  reminderTime: z.number().int().positive().optional(),
  daysToPractice: z.array(z.string()).optional(),
})

export const skillRouter = createTRPCRouter({
  getAllByUserId: publicProcedure
  .query(async ({ ctx }) => {
    const user = await currentUser();
    if (!user) {
      throw new Error("User not found");
    }
    return ctx.db.query.skills.findMany({
      where: eq(skills.userId, user.id),
      orderBy: (skills, { desc }) => [desc(skills.updatedAt)],
    });
  }),

  get: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.query.skills.findFirst({
        where: eq(skills.id, input.id),
      });
    }),

  create: publicProcedure
    .input(skillFormSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await currentUser();
      if (!user) {
        throw new Error("User not found");
      }
      await ctx.db.insert(skills).values({
        ...input,
        userId: user.id,
        daysToPractice: input?.daysToPractice?.join(",")
      });
    }),

  update: publicProcedure
    .input(z.object({ id: z.number() }).merge(skillFormSchema))
    .mutation(async ({ ctx, input }) => {
      const user = await currentUser();
      if (!user) {
        throw new Error("User not found");
      }
      await ctx.db.update(skills).set({
        ...input,
        userId: user.id,
        daysToPractice: input?.daysToPractice?.join(",")
      }).where(eq(skills.id, input.id));
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(skills).where(eq(skills.id, input.id));
    }),
});
