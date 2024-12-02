//Code fomr class and previous deliveries
"use client"

import { useState, type PropsWithChildren } from "react";
import TicketForm from "./TicketInfo";
import type { HandleProject, Ticket } from "./Types";
import { formatDistance } from "@/features/helpers/format";

type TicketProps = {
  handleProjectMutation: HandleProject
  tickets: Ticket[]
}

export default function Tickets(
  props: Readonly<PropsWithChildren<TicketProps>>
) {
  const { tickets = [], handleProjectMutation, children } = props
  const [editing, setEditing] = useState<Ticket | undefined>(undefined)

  const onSubmit = (id: string | undefined, data: Partial<Ticket>) => {
    if (id) return handleProjectMutation({ id, ticket: data })
    return handleProjectMutation({ action: "add", ticket: data })
  }


  return (
    <>
      <form className="form">
        <section className="YourTicket">
        </section> 
      </form>
      <TicketForm key={editing?.id} onSubmit={onSubmit} ticket={editing} />
    </>
  )
}