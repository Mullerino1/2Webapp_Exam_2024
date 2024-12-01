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

  // const editProject = (ticket: Ticket) => {
  //   if (editing?.id === ticket.id) return setEditing(undefined)
  //   setEditing(ticket)
  // }

  const onSubmit = (id: string | undefined, data: Partial<Ticket>) => {
    if (id) return handleProjectMutation({ id, ticket: data })
    return handleProjectMutation({ action: "add", ticket: data })
  }

  // const removeProject = (id: string) => {
  //   handleProjectMutation({ action: "remove", id })
  // }

  return (
    <>
      <form className="form">
        <section className="YourTicket">
          {/* <h2>Your Ticket</h2> */}
          {/* {children}
          <article>
            {tickets.length === 0 ? (
              <p>You have no projects</p>
            ) : (
              tickets.map((ticket) => {
                const projectDate = new Date(ticket.createdAt)
                
                const dateDistance = isNaN(projectDate.getTime())
                  ? "Invalid date"
                  : formatDistance(projectDate)

                return (
                  <section key={ticket.id}>
                    <h4>{ticket.title}</h4>
                    <p>{ticket.description}</p>
                    <p>created {dateDistance}</p>
                    <p>{ticket.public ? "Public" : "Private"}</p>
                    {ticket.deleted ? (
                      <p>[DELETED]</p>
                    ) : (
                      <button onClick={() => removeProject(ticket.id)} type="button">
                        [remove]
                      </button>
                    )}
                    <button onClick={() => editProject(ticket)} type="button">
                      [{editing?.id === ticket.id ? "close" : "edit"}]
                    </button>
                  </section>
                )
              })
            )}
          </article> */}
        </section> 
      </form>
      <TicketForm key={editing?.id} onSubmit={onSubmit} ticket={editing} />
    </>
  )
}