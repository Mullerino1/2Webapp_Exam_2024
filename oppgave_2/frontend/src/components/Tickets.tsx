"use client"


import { useState, type PropsWithChildren } from "react";
import TicketForm from "./TicketInfo";
import type { HandleTicket, Ticket } from "./Types";
import { formatDistance } from "@/features/helpers/format";

type TicketProps = {
  handleTicketMutation: HandleTicket
  tickets: Ticket[]
}

export default function Tickets(
  props: Readonly<PropsWithChildren<TicketProps>>
) {
  const { tickets = [], handleTicketMutation, children } = props
  const [editing, setEditing] = useState<Ticket | undefined>(undefined)

  const onSubmit = (id: string | undefined, data: Partial<Ticket>) => {
    if (id) return handleTicketMutation({ id, ticket: data })
    return handleTicketMutation({ action: "add", ticket: data })
  }

  return (
    <>
      <form className="form">
        <section className="YourTicket">
         
        </section> 
      </form>
      <TicketForm onSubmit={onSubmit}/>
    </>
  )
}