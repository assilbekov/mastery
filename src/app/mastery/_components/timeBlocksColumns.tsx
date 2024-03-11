"use client"

import type { ColumnDef } from "@tanstack/react-table"
import type { InferSelectModel } from "drizzle-orm"

import type { timeBlocks } from "~/server/db/schema"
import { DataTableColumnHeader } from "./DataTableColumnHeader"
import { formatDate } from "~/lib/utils";
import { TimeBlockActions } from "./TimeBlockActions"
import { Label } from "~/components/ui/label"

export const timeBlocksColumns: ColumnDef<InferSelectModel<typeof timeBlocks>>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div className="flex space-x-2">{row.getValue("skillId")}</div>,
    enableHiding: false,
  },
  {
    accessorKey: "timeInSeconds",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tracked time" />
    ),
    cell: ({ row }) => {
      const timeInSeconds: number = row.getValue("timeInSeconds") || 0;
      const seconds = timeInSeconds % 60;
      const minutes = Math.floor(timeInSeconds / 60) % 60;
      const hours = Math.floor(timeInSeconds / 3600) % 24;
      return (
        <Label className="text-xl">
          {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </Label>
      )
    },
  },
  {
    accessorKey: "comment",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Comment" />
    ),
    cell: ({ row }) => <div className="flex space-x-2">{row.getValue("comment")}</div>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created date" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        {formatDate(row.getValue("createdAt"))}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <TimeBlockActions row={row} />,
  },
]
