"use client"


import type { z } from "zod"
import type {projectSchema} from "@/features/helpers/validate";


export const actions = {
  add: "add",

  
} as const

export type HandleProjectProps =

  | {
      action: typeof actions.add
      ticket: Partial<Ticket>
    
    }

export type HandleProject = (props: HandleProjectProps) => void

export type Action = typeof actions

export type Ticket = z.infer<typeof projectSchema>


