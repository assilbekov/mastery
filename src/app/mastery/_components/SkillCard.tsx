"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "~/components/ui/card";
import { SkillFormInfered } from "./SkillForm";
import { InferSelectModel } from "drizzle-orm";
import { skills } from "~/server/db/schema";
import { skillIcons } from "./SkillIcons";
import { Progress } from "~/components/ui/progress";

type SkillCardProps = {
  skill: InferSelectModel<typeof skills>;
  totalHours: number;
}

export const SkillCard = ({ skill, totalHours }: SkillCardProps) => {
  const icon = skillIcons.find((icon) => icon.name === skill.icon);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center gap-1">
          <CardTitle>{skill.name}</CardTitle>
          <div className={`w-6 h-6 rounded-full ${skill.color} flex justify-center items-center`}>
            {icon && <icon.Icon color="white" width={16} height={16} />}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>
          <p>
            {totalHours} / {skill.goalInHours} hours
            <Progress value={totalHours * 100 / skill.goalInHours} className="h-2 mt-1" />
          </p>
        </CardDescription>
      </CardContent>
    </Card>
  )
}