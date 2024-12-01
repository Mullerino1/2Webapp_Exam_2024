"use client"


import { endpoints } from "@/config/urls";
import type { Ticket } from "@/components/Types";
import { validateProject } from "@/features/helpers/validate";

const url = endpoints
console.log(url)

const remove = async (id: string) => {
    
  try {
    const removeProject = await fetch(`${url}/${id}`, {
      method: "DELETE",
    })
    if (!removeProject.ok) throw new Error("failed to remove project")

  } catch (error) {
    console.error(error)
    throw error
  }
}

const create = async (data: Partial<Ticket>) => {
  try {
    const createdTicket = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      
    })
    if (!createdTicket.ok) throw new Error("failed to create ticket")

    return await createdTicket.json()
  } catch (error) {
    console.error(error)
  }
}

const list = async () => {
    try {
        const fetchTickets = await fetch(url, {   
        })
        if (!fetchTickets.ok) throw new Error("failed to fetch tickets")
        const tickets = await fetchTickets.json()
        return validateProject(tickets.data)
    } catch (error) {
        console.log(error)
    }
}

const listProjects = async (): Promise <{
    data: (Ticket & {tickets: Ticket[]}) []
}> => {
    try {
        const response = await fetch(url, {
           
        })
        if(!response.ok) throw new Error("Failed to fetch tickets")
            const projectData = await response.json()
        const tickets = validateProject(projectData.data)

        if (!tickets.success) return {data: []}
        const data = await Promise.all(
            tickets.data.map(async (ticket) => {
                const projectResponse = await fetch(`${url}/${ticket.id}/tickets`, {
                    
                })
                if (!projectResponse.ok) throw new Error("failed to fetch tickets")
                    return await projectResponse.json()
            })
        )
        return { data}
    } catch (error){
    console.error(error)
    return { data: []}
    }
}


const update = async (id: string, data: Partial<Ticket>) => {
  try {
    const updateProject = await fetch(`${url}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      
    })
    if (!updateProject.ok) throw new Error("failed to update project")

  } catch (error) {
    console.error(error)
  }
}

export default { remove, create, update, list, listProjects }