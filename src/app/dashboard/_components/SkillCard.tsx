"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";
import { SkillForm } from "./SkillForm";
import type { InferSelectModel } from "drizzle-orm";
import type { skills } from "~/server/db/schema";
import { skillIcons } from "./SkillIcons";
import { Progress } from "~/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog"
import { api } from "~/trpc/react";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { TimerDialog } from "./TimerDialog";

type SkillCardProps = {
  skill: InferSelectModel<typeof skills>;
  totalHours: number;
}

const SkillCardInfo = ({ skill, totalHours, onCardClick }: SkillCardProps & { onCardClick: () => void }) => {
  const icon = skillIcons.find((icon) => icon.name === skill.icon);

  return (
    <Card onClick={onCardClick} className="cursor-pointer">
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

const SkillDropdown = ({
  skill,
  totalHours,
  onTrackClick,
  onEditClick,
  onDeleteClick,
  deleteIsLoading
}: SkillCardProps & {
  onTrackClick: () => void;
  onEditClick: () => void;
  onDeleteClick: () => Promise<void>;
  deleteIsLoading: boolean;
}) => {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    await onDeleteClick();
    setOpen(false);
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger>
        <SkillCardInfo skill={skill} totalHours={totalHours} onCardClick={() => setOpen(true)} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={onTrackClick}>Track</DropdownMenuItem>
        <DropdownMenuItem onClick={onEditClick}>Edit</DropdownMenuItem>
        <DropdownMenuItem
          className="text-white bg-red-500 hover:bg-red-600 focus:bg-red-600 active:text-white hover:text-white focus:text-white mt-1"
          disabled={deleteIsLoading}
          onClick={handleDelete}
        >Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const SkillCard = ({ skill, totalHours }: SkillCardProps) => {
  const utils = api.useUtils();
  const [editOpen, setEditOpen] = useState(false);
  const [trackOpen, setTrackOpen] = useState(false);
  const { mutateAsync, isLoading } = api.skill.update.useMutation({
    onSuccess: () => utils.skill.getAllByUserId.invalidate(),
  });
  const { mutateAsync: deleteAsyncSkill, isLoading: deleteIsLoading } = api.skill.delete.useMutation({
    onSuccess: () => utils.skill.getAllByUserId.invalidate(),
  });

  return (
    <>
      <SkillDropdown
        skill={skill}
        totalHours={totalHours}
        onTrackClick={() => setTrackOpen(true)}
        onEditClick={() => setEditOpen(true)}
        onDeleteClick={async () => await deleteAsyncSkill({ id: skill.id })}
        deleteIsLoading={deleteIsLoading}
      />

      <TimerDialog open={trackOpen} skill={skill} setOpen={setTrackOpen} />
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit skill</DialogTitle>
          </DialogHeader>
          <SkillForm
            setOpen={setEditOpen}
            onSubmit={async value => await mutateAsync({ ...value, id: skill.id })}
            isLoading={isLoading}
            defaultValues={{
              ...skill,
              description: skill.description ?? undefined,
              daysToPractice: skill.daysToPractice.split(","),
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}