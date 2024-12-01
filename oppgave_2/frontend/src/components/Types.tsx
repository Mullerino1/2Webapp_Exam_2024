// export type Id = ReturnType<typeof crypto.randomUUID>

// export type Project = {
//     id: string
//     title: string
//     description: string
//     deleted?: boolean
//     publishedAt?: boolean
//     public?: boolean
//     status?: boolean
//     tags: string
// }
import type { z } from "zod"
import type {projectSchema} from "@/features/helpers/validate";

// export type Habit = {
//   id: string;
//   title: string;
//   createdAt: string;
//   categories: string[];
//   userId: string;
//   endedAt: string | null;
// };

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


