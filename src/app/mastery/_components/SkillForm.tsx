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
]

export const skillFormSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }),
  color: z.enum(colors as any, { required_error: "Please select a color" }),
  monthlyAmount: z.coerce.number().min(1, { message: "Amount must be at least 1" }),
  interestRate: z.coerce.number().min(0, { message: "Interest rate must be at least 0" }),
  startDate: z.date(),
  endDate: z.date().optional(),
})

export type FinanceFormInfered = z.infer<typeof skillFormSchema>

export type SkillFormProps = {
  //setOpen: Dispatch<SetStateAction<boolean>>;
  //setOpen: () => void;
  isLoading: boolean;
  //onSubmit: (values: z.infer<typeof skillFormSchema>) => Promise<void>;
  defaultValues?: Partial<FinanceFormInfered>;
}

export function SkillForm({ isLoading, defaultValues }: SkillFormProps) {
  // 1. Define your form.
  const form = useForm<FinanceFormInfered>({
    resolver: zodResolver(skillFormSchema),
    defaultValues,
  });

  // 2. Define a submit handler.
  async function _onSubmit(values: z.infer<typeof skillFormSchema>) {
    // await onSubmit(values)
    //setOpen(false);
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
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Flow Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="monthlyAmount"
            render={({ field }) => (
              <FormItem className="w-[195px]">
                <FormLabel>Monthly Amount</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="interestRate"
            render={({ field }) => (
              <FormItem className="w-[195px]">
                <FormLabel>Interest Rate (%)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[195px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>End data <Label className="text-slate-500">(optional)</Label></FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[195px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end">
          <Button disabled={isLoading} type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  )
}
