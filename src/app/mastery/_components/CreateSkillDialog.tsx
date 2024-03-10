"use client"

import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { SkillForm } from "./SkillForm"
import type { SkillFormProps } from "./SkillForm"
import { useState } from "react"

type CreateSkillDialogProps = Omit<SkillFormProps, "setOpen">;

export function CreateSkillDialog(props: CreateSkillDialogProps) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Create Skill</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create a skill to master</DialogTitle>
        </DialogHeader>
        <SkillForm setOpen={setOpen} {...props} />
      </DialogContent>
    </Dialog>
  )
}