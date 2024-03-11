"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import TimePicker from 'react-time-picker';

import { Button } from "~/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { cn } from "~/lib/utils"
import { Label } from "~/components/ui/label"
import type { Dispatch, SetStateAction } from "react"
import { skillIcons } from "./SkillIcons"
import { SelectCheckbox } from "~/components/ui/select-checkbox"

const colors: string[] = [
  "bg-blue-500",
  "bg-green-500",
  "bg-pink-500",
  "bg-yellow-500",
  "bg-red-500",
  "bg-indigo-500",
  "bg-zinc-500",
  "bg-slate-500",
  "bg-cyan-500",
  "bg-purple-500",
  "bg-amber-500",
  "bg-emerald-500",
  "bg-violet-500",
  "bg-rose-500",
  "bg-lime-500",
  "bg-gray-500",
  "bg-teal-500",
  "bg-fuchsia-500",
]

const daysToPracticeOptions = [
  {
    label: "Monday",
    value: "monday",
  },
  {
    label: "Tuesday",
    value: "tuesday",
  },
  {
    label: "Wednesday",
    value: "wednesday",
  },
  {
    label: "Thursday",
    value: "thursday",
  },
  {
    label: "Friday",
    value: "friday",
  },
  {
    label: "Saturday",
    value: "saturday",
  },
  {
    label: "Sunday",
    value: "sunday",
  }
]

export const skillFormSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }),
  color: z.string({ required_error: "Please select a color" }),
  icon: z.string({ required_error: "Please select an icon" }),
  description: z.string(),
  goalInHours: z.coerce.number().int().positive(),
  reminderTime: z.string(),
  daysToPractice: z.array(z.string()),
})

export type SkillFormInfered = z.infer<typeof skillFormSchema>

export type SkillFormProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  onSubmit: (values: z.infer<typeof skillFormSchema>) => Promise<void>;
  defaultValues?: Partial<SkillFormInfered>;
}

export function SkillForm({ setOpen, onSubmit, isLoading, defaultValues }: SkillFormProps) {
  // 1. Define your form.
  const form = useForm<SkillFormInfered>({
    resolver: zodResolver(skillFormSchema),
    defaultValues,
  });

  // 2. Define a submit handler.
  async function _onSubmit(values: z.infer<typeof skillFormSchema>) {
    await onSubmit(values)
    setOpen(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(_onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Flow name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Color</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Color" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {colors.map((color) => (
                      <SelectItem key={color} value={color}>
                        <div className={cn("w-4 h-4 rounded-full", color)} />
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Icon</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Icon" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {skillIcons.map((icon) => (
                      <SelectItem key={icon.name} value={icon.name}>
                        <div className="w-4 h-4">{<icon.Icon width={14} height={14} />}</div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description <Label className="text-slate-500">(optional)</Label></FormLabel>
              <FormControl>
                <Input placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="goalInHours"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Goal in seconds</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="reminderTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Reminder time</FormLabel>
                <FormControl>
                  <TimePicker
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    onChange={field.onChange}
                    value={field.value}
                    disableClock
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="daysToPractice"
          render={({ field }) => (
            <FormItem>
              <SelectCheckbox
                title="Days to practice"
                value={field.value || ["sunday"]}
                onChange={field.onChange}
                options={daysToPracticeOptions}
              />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button disabled={isLoading} type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  )
}
