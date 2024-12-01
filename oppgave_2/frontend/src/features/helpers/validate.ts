import { z } from "zod";

export {projectSchema, projectsSchema } 

const projectSchema = z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.string().datetime(),
    public: z.boolean(),
    deleted: z.boolean(),
    tags: z.array(z.string()),
    date: z.string().datetime(),
    slug: z.string(),
  
    
})

const projectsSchema = z.array(projectSchema)

export function validateProject(data: unknown) {
    return projectsSchema.safeParse(data)
}