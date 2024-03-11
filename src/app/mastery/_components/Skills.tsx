"use client"

import { InferSelectModel } from "drizzle-orm";
import { skills as skillsSchema, timeBlocks as timeBlocksSchema } from "~/server/db/schema";
import { SkillCard } from "./SkillCard";
import { api } from "~/trpc/react";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { TimeBlocksTable } from "./TimeBlocksTable";
import { RocketIcon } from "lucide-react";
import { Label } from "~/components/ui/label";
import { CreateSkillDialog } from "./CreateSkillDialog";
import { useMemo } from "react";

type SkillsProps = {
  initialSkills: InferSelectModel<typeof skillsSchema>[];
  initialTimeBlocks: InferSelectModel<typeof timeBlocksSchema>[];
}

export const Skills = ({ initialSkills, initialTimeBlocks }: SkillsProps) => {
  const { data: skills } = api.skill.getAllByUserId.useQuery(undefined, { initialData: initialSkills });
  const { data: timeBlocks } = api.timeBlock.getAllByUserId.useQuery(undefined, { initialData: initialTimeBlocks });

  const skillsWithTotalHours = useMemo(() => {
    return skills.map(skill => {
      const timeBlocksForSkill = timeBlocks.filter(timeBlock => timeBlock.skillId === skill.id);
      const totalHours = Number(
        (timeBlocksForSkill.reduce((acc, timeBlock) => acc + timeBlock.timeInSeconds, 0) / 3600)
          .toFixed(2)
      );
      return {
        skill,
        totalHours,
      }
    });
  }, [skills, timeBlocks])

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex justify-between items-center">
        <Label className="text-xl">Skills</Label>
        <CreateSkillDialog />
      </div>
      {skills.length === 0 ? (
        <Alert>
          <RocketIcon className="h-4 w-4" />
          <AlertTitle>No skills created!</AlertTitle>
          <AlertDescription>
            You have nothing to track here. Create your first skill now.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {skillsWithTotalHours.map(({ skill, totalHours }) => (
            <SkillCard key={skill.id} skill={skill} totalHours={totalHours} />
          ))}
        </div>
      )}

      <TimeBlocksTable skills={skills} timeBlocks={timeBlocks} />
    </div>
  )
}