"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { cn } from "~/lib/utils"
import { CalendarIcon } from "@radix-ui/react-icons"
import { Calendar } from "~/components/ui/calendar"
import { Label } from "~/components/ui/label"
import type { Dispatch, SetStateAction } from "react"

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
  "bg-coral-500",
  "bg-gray-500",
  "bg-teal-500",
  "bg-fuchsia-500",
  "bg-gold-500",
  "bg-orchid-500",
  "bg-salmon-500",
  "bg-turquoise-500",
  "bg-crimson-500",
  "bg-olive-500",
  "bg-plum-500",
  "bg-sienna-500",
  "bg-steel-500",
  "bg-aqua-500",
  "bg-lilac-500",
  "bg-magenta-500",
  "bg-ivory-500",
  "bg-azure-500",
  "bg-peach-500",
  "bg-mint-500",
  "bg-lavender-500",
]

const icons = [
  "apple",
  "alarm-clock",
  "bug",
  "cannabis",
  "dollar-sign",
  "cactus",
  "crown",
  "cloud",
  "diamond",
  "eye",
  "fire",
  "gift",
  "heart",
  "ice-cream",
  "key",
  "lightning",
  "moon",
  "notebook",
  "octagon",
  "paw",
  "question-mark",
  "rocket",
  "star",
  "trending-up",
  "umbrella",
  "volcano",
  "water",
  "x",
  "yin-yang",
  "z",
];

const frequencies = [
  "daily",
  "weekly",
  "bi-weekly",
  "monthly",
  "quarterly",
  "semi-annually",
  "annually",
]

const daysToPractice = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
]

export const skillFormSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }),
  color: z.enum(colors as any, { required_error: "Please select a color" }),
  icon: z.enum(icons as any, { required_error: "Please select an icon" }),
  description: z.string().optional(),
  goalInSeconds: z.number().int().positive().optional(),
  reminderTime: z.number().int().positive().optional(),
  daysToPractice: z.array(z.enum(daysToPractice as any)).optional(),
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
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
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
            <FormItem>
              <FormLabel>Icon</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Icon" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {icons.map((icon) => (
                    <SelectItem key={icon} value={icon}>
                      <div className="w-4 h-4">{icon}</div>
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
        <FormField
          control={form.control}
          name="goalInSeconds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Goal in seconds <Label className="text-slate-500">(optional)</Label></FormLabel>
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
            <FormItem>
              <FormLabel>Reminder time <Label className="text-slate-500">(optional)</Label></FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="daysToPractice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Days to practice <Label className="text-slate-500">(optional)</Label></FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value as any}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Days to practice" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {daysToPractice.map((day) => (
                    <SelectItem key={day} value={day}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
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
