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
      // title: ticket?.title ?? "",
      email: ticket?.email ?? "",
      number: ticket?.number ?? "",
      people: ticket?.people ?? "1",
      name: ticket?.name ?? "",
  
    },
    onSubmit: (data) => onSubmit(ticket?.title, data),
    validate: {
      name: (_, value) => value.length > 2,
      email: (_, value) => value.length > 5, 
      number: (_, value) => value.length > 8,
      people: (_, value) => /^[1-9]$|^10$/.test(value), //ChatGPT
      
     
    },
  })

  const labels = {
  
    add: {
      title: "Your Ticket",
      submit: "Purchase ticket",
    },
  }

  return (
    <section className="YourTicket" data-testid="ticket-idea">
      <h3>{ labels.add.title}</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="title field">
          <label htmlFor="title">Your Full Name</label>
          <input
            type="text"
            name="name"
            id="title"
            className={!isFieldInvalid("name") ? "success" : ""}
            required
            placeholder="Your Full Name"
            {...getFieldProps("name")}
          />
          {isFieldInvalid("name") && (
            <p className="field-error error">Needs three letters</p>
          )}
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="text"
            name="email"
            placeholder="your email"
            {...getFieldProps("email")}
          />
        </div>

        <div>
          <label htmlFor="number">Tlf:</label>
          <input
            id="number"
            type="text"
            name="number"
            placeholder="Your phone number"
            {...getFieldProps("number")}
          />
        </div>  

        {/* ChatGPT, wasnt sure how to set this up. */}
         <div>
          <label htmlFor="people">Number of People:</label>
          <select
            id="people"
            name="people"
            {...getFieldProps("people")}
            className={!isFieldInvalid("people") ? "success" : ""}
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          {isFieldInvalid("people") && (
            <p className="field-error error">Select a number between 1 and 10</p>
          )}
        </div>

        

        <div>
          <button type="submit" id="submit" className="success">
            { labels.add.submit}
          </button>
        </div>
      </form>
    </section>
  )
}