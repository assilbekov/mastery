import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  real,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `mastery_${name}`);

export const skills = createTable(
  "skill",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    userId: varchar("user_id").notNull(),
    color: varchar("color").notNull(),
    icon: varchar("icon").notNull(),
    description: varchar("description", { length: 256 }),
    goalInSeconds: real("goal_in_seconds"),
    reminderTime: real("reminder"),
    daysToPractice: varchar("days_to_practice", { length: 256 }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"),
  },
  (example) => ({
    nameIndex: index("skill_id").on(example.name),
  })
);

export const timeBlocks = createTable(
  "time_block",
  {
    id: serial("id").primaryKey(),
    userId: varchar("user_id").notNull(),
    skillId: real("skill_id").notNull().references(() => skills.id),
    timeInSeconds: real("time_in_seconds").notNull(),
    comment: varchar("comment", { length: 256 }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"),
  },
  (example) => ({
    skillIdIndex: index("skill_idx").on(example.skillId),
  })
);
