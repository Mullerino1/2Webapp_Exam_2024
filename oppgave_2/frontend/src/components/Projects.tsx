
import { useState, type PropsWithChildren } from "react";
import ProjectForm from "./ProjectInfo";
import type { HandleProject, Project } from "./Types";
import { formatDistance } from "@/features/helpers/format";

type ProjectProps = {
  handleProjectMutation: HandleProject
  projects: Project[]
}

export default function Projects(
  props: Readonly<PropsWithChildren<ProjectProps>>
) {
  const { projects = [], handleProjectMutation, children } = props
  const [editing, setEditing] = useState<Project | undefined>(undefined)

  const editProject = (project: Project) => {
    if (editing?.id === project.id) return setEditing(undefined)
    setEditing(project)
  }

  const onSubmit = (id: string | undefined, data: Partial<Project>) => {
    if (id) return handleProjectMutation({ action: "update", id, project: data })
    return handleProjectMutation({ action: "add", project: data })
  }

  const removeProject = (id: string) => {
    handleProjectMutation({ action: "remove", id })
  }

  return (
    <>
      <form className="form">
        <section className="project-ideas">
          <h2>Your Projects:</h2>
          {children}
          <article>
            {projects.length === 0 ? (
              <p>You have no projects</p>
            ) : (
              projects.map((project) => {
                const projectDate = new Date(project.createdAt)
                
                const dateDistance = isNaN(projectDate.getTime())
                  ? "Invalid date"
                  : formatDistance(projectDate)

                return (
                  <section key={project.id} className="project-card">
                    <h4>{project.title}</h4>
                    <p>{project.description}</p>
                    <p>created {dateDistance}</p>
                    <p>{project.public ? "Public" : "Private"}</p>
                    {project.deleted ? (
                      <p>[DELETED]</p>
                    ) : (
                      <button onClick={() => removeProject(project.id)} type="button">
                        [remove]
                      </button>
                    )}
                    <button onClick={() => editProject(project)} type="button">
                      [{editing?.id === project.id ? "close" : "edit"}]
                    </button>
                  </section>
                )
              })
            )}
          </article>
        </section>
      </form>
      <ProjectForm key={editing?.id} onSubmit={onSubmit} project={editing} />
    </>
  )
}