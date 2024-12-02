"use client"


import type { z } from "zod"
import type {ticketSchema} from "@/features/helpers/validate";


export const actions = {
  add: "add",

  
} as const

export type HandleTicketProps =

  | {
      action: typeof actions.add
      ticket: Partial<Ticket>
    
    }

export type HandleTicket = (props: HandleTicketProps) => void

export type Action = typeof actions

export type Ticket = z.infer<typeof ticketSchema>


