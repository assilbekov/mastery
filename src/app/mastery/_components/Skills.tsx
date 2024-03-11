"use client"

import { InferSelectModel } from "drizzle-orm";
import { skills } from "~/server/db/schema";
import { SkillCard } from "./SkillCard";
import { api } from "~/trpc/react";

type SkillsProps = {
  initialSkills: InferSelectModel<typeof skills>[];
}

export const Skills = ({ initialSkills }: SkillsProps) => {
  const { data } = api.skill.getAllByUserId.useQuery(undefined, { initialData: initialSkills });
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {data.map(skill => (
        <SkillCard key={skill.id} skill={skill} totalHours={63.2} />
      ))}
    </div>
  )
}