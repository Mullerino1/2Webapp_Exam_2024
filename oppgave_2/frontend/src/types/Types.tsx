// need to set up a types file 

import type { z } from "zod"
// import type { ticketSchema } from "../Features/Helpers/validate"
import type { ticketSchema } from "@/features/helpers/validate"



export const actions = {
  add: "add",
  remove: "remove",
  
} as const

export type HandleTicketProps =
  | {
      action: typeof actions.remove
      id: string
    }
  | {
      action: typeof actions.add
      project: Partial<Ticket>
    
    }

export type HandleTicket = (props: HandleTicketProps) => void

export type Action = typeof actions

export type Ticket = z.infer<typeof ticketSchema>


