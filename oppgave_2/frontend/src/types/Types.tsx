
import type { z } from "zod"
import type { projectSchema } from "../Features/Helpers/validate"



export const actions = {
  add: "add",
  remove: "remove",
  update: "update",
  
} as const

export type HandleProjectProps =
  | {
      action: typeof actions.remove
      id: string
    
    }
  | {
      action: typeof actions.update
      id: string
      project: Partial<Project>
    }
  | {
      action: typeof actions.add
      project: Partial<Project>
    
    }

export type HandleProject = (props: HandleProjectProps) => void

export type Action = typeof actions

export type Project = z.infer<typeof projectSchema>


