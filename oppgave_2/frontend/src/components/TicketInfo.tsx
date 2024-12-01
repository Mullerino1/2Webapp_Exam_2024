"use client"

import useProjectReducerForm from "@/hooks/useTicketReducerForm";
import type { Ticket } from "./Types";

type TicketIdeaProps = {
  onSubmit: (id: string | undefined, data: Partial<Ticket>) => void
  ticket?: Ticket
}

export default function TicketForm(props: Readonly<TicketIdeaProps>) {
  const { onSubmit, ticket } = props
  const isEditing = !!ticket

  const { handleSubmit, getFieldProps, isFieldInvalid } = useProjectReducerForm({
    initialFields: { 
      title: ticket?.title ?? "",
      description: ticket?.description ?? "",
      date: ticket?.createdAt ?? "" 
    },
    onSubmit: (data) => onSubmit(ticket?.title, data),
    validate: {
      title: (_, value) => value.length > 2,
      description: (_, value) => value.length > 5, 
      date: (_, value) => !!Date.parse(value) 
    },
  })

  const labels = {
    edit: {
      title: "Edit Project Title",
      submit: "Update Project",
    },
    add: {
      title: "Add a New Project",
      submit: "Add Project",
    },
  }

  return (
    <section className="YourTicket" data-testid="ticket-idea">
      <h3>{isEditing ? labels.edit.title : labels.add.title}</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="title field">
          <label htmlFor="title">Your Full Name</label>
          <input
            type="text"
            name="title"
            id="title"
            className={!isFieldInvalid("title") ? "success" : ""}
            required
            placeholder="Add title"
            {...getFieldProps("title")}
          />
          {isFieldInvalid("title") && (
            <p className="field-error error">Needs three letters</p>
          )}
        </div>

        <section>
          <label htmlFor="description">Email:</label>
          <input
            id="description"
            type="text"
            name="description"
            placeholder="Describe your ticket"
            {...getFieldProps("description")}
          />
        </section>

        {/* <section>
          <label htmlFor="id">Project ID:</label>
          <input
            id="id"
            type="text"
            name="id"
            placeholder="Enter ticket ID"
            {...getFieldProps("id")}
          />
        </section> */}

        {/* <section>
          <label htmlFor="date">Project Date:</label>
          <input
            id="date"
            type="date"
            name="date"
            {...getFieldProps("date")}
          />
        </section> */}

        <div>
          <button type="submit" id="submit" className="success">
            {isEditing ? labels.edit.submit : labels.add.submit}
          </button>
        </div>
      </form>
    </section>
  )
}