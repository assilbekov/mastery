"use client"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { SkillForm } from "./SkillForm"
import { api } from "~/trpc/react"

export function CreateSkillDialog() {
  const utils = api.useUtils();
  const [open, setOpen] = useState(false);
  const { mutateAsync, isLoading } = api.skill.create.useMutation({
    onSuccess: () => utils.skill.getAllByUserId.invalidate(),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} size="sm">Create Skill</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create a skill to master</DialogTitle>
        </DialogHeader>
        <SkillForm
          setOpen={setOpen}
          onSubmit={mutateAsync}
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