import { z } from "zod";

export {ticketSchema, ticketsSchema } 

const ticketSchema = z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.string().datetime(),
    public: z.boolean(),
    deleted: z.boolean(),
    tags: z.array(z.string()),
    date: z.string().datetime(),
    slug: z.string(),
    email: z.string(),
    number: z.string(),
    people: z.string(),
    name: z.string(),
  
    
})

const ticketsSchema = z.array(ticketSchema)

export function validateTicket(data: unknown) {
    return ticketsSchema.safeParse(data)
}