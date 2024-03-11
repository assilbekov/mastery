"use client"

import { InferSelectModel } from "drizzle-orm";
import { skills as skillsSchema, timeBlocks as timeBlocksSchema } from "~/server/db/schema";
import { SkillCard } from "./SkillCard";
import { api } from "~/trpc/react";
import { TimeBlocksTable } from "./TimeBlocksTable";

type SkillsProps = {
  initialSkills: InferSelectModel<typeof skillsSchema>[];
  initialTimeBlocks: InferSelectModel<typeof timeBlocksSchema>[];
}

export const Skills = ({ initialSkills, initialTimeBlocks }: SkillsProps) => {
  const { data: skills } = api.skill.getAllByUserId.useQuery(undefined, { initialData: initialSkills });
  const { data: timeBlocks } = api.timeBlock.getAllByUserId.useQuery(undefined, { initialData: initialTimeBlocks });

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {skills.map(skill => (
          <SkillCard key={skill.id} skill={skill} totalHours={63.2} />
        ))}
      </div>

      <TimeBlocksTable initialTimeBlocks={initialTimeBlocks} />
    </div>
  )
}