"use client"

import type { Row } from "@tanstack/react-table"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"

import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { api } from "~/trpc/react"
import type { InferSelectModel } from "drizzle-orm"
import type { timeBlocks } from "~/server/db/schema"

interface TimeBlockActionsProps {
  row: Row<InferSelectModel<typeof timeBlocks>>
}

export function TimeBlockActions({ row }: TimeBlockActionsProps) {
  const utils = api.useUtils();
  const { mutate: deleteMutate, isLoading: deleteIsLoading } = api.timeBlock.delete.useMutation({
    onSuccess: () => utils.timeBlock.getAllByUserId.invalidate()
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem
          className="text-white bg-red-500 hover:bg-red-600 focus:bg-red-600 active:text-white hover:text-white focus:text-white mt-1"
          disabled={deleteIsLoading}
          onClick={() => deleteMutate({ id: row.original.id })}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
