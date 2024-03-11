"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "~/components/ui/card";
import { SkillForm } from "./SkillForm";
import { InferSelectModel } from "drizzle-orm";
import { skills } from "~/server/db/schema";
import { skillIcons } from "./SkillIcons";
import { Progress } from "~/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { api } from "~/trpc/react";
import { useState } from "react";

type SkillCardProps = {
  skill: InferSelectModel<typeof skills>;
  totalHours: number;
}

const SkillCardInfo = ({ skill, totalHours, onCardClick }: SkillCardProps & { onCardClick: () => void }) => {
  const icon = skillIcons.find((icon) => icon.name === skill.icon);

  return (
    <Card onClick={onCardClick}>
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

export const SkillCard = ({ skill, totalHours }: SkillCardProps) => {
  const utils = api.useUtils();
  const [open, setOpen] = useState(false);
  const { mutateAsync, isLoading } = api.skill.update.useMutation({
    onSuccess: () => utils.skill.getAllByUserId.invalidate(),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SkillCardInfo onCardClick={() => setOpen(true)} skill={skill} totalHours={totalHours} />
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create a skill to master</DialogTitle>
        </DialogHeader>
        <SkillForm
          setOpen={setOpen}
          onSubmit={async value => await mutateAsync({ ...value, id: skill.id })}
          isLoading={isLoading}
          defaultValues={{
            name: "",
            icon: "dumbbell",
            color: "bg-blue-500",
            description: "",
            goalInHours: 100,
            reminderTime: "12:30",
            daysToPractice: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
          }}
        />
      </DialogContent>
    </Dialog>
  )
}