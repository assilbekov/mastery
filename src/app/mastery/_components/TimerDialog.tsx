"use client"

import * as React from "react"
import { Button } from "~/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "~/components/ui/drawer"
import { api } from "~/trpc/react"
import { Timer } from "./Timer"
import { Input } from "~/components/ui/input"
import type { InferSelectModel } from "drizzle-orm"
import type { skills } from "~/server/db/schema"

type TimerDialogProps = {
  open: boolean;
  skill: InferSelectModel<typeof skills>
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function TimerDialog({ skill, open, setOpen }: TimerDialogProps) {
  const utils = api.useUtils();
  const [timer, setTimer] = React.useState(0);
  const [comment, setComment] = React.useState("");
  const { mutateAsync, isLoading } = api.timeBlock.create.useMutation({
    onSuccess: () => utils.invalidate(),
  });

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimer(timer => timer + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async () => {
    await mutateAsync({
      comment,
      skillId: skill.id,
      timeInSeconds: timer,
    });
    setOpen(false);
  }

  return (
    <Drawer open={open}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Tracking {skill.name}</DrawerTitle>
            <DrawerDescription>Click submit to save tracking time</DrawerDescription>
          </DrawerHeader>
          <div className="flex justify-center p-2 mb-2">
            <Timer />
          </div>
          <Input
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Comment..."
          />
          <DrawerFooter className="flex gap-2 flex-row px-0">
            <DrawerClose className="w-full" asChild>
              <Button
                disabled={isLoading}
                variant="outline"
                onClick={() => setOpen(false)}
              >Cancel</Button>
            </DrawerClose>
            <Button
              className="w-full"
              onClick={handleSubmit}
              disabled={isLoading}
            >Submit</Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
