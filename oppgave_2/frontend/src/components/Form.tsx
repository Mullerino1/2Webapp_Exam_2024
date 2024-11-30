
import type { Project } from "./Types";
import useProjectReducerForm from "../hooks/useProjectReduceFrom";

type ProjectIdeaProps = {
  onSubmit: (id: string | undefined, data: Partial<Project>) => void
  project?: Project
}

export default function ProjectForm(props: Readonly<ProjectIdeaProps>) {
  const { onSubmit, project } = props
  const isEditing = !!project

  const { handleSubmit, getFieldProps, isFieldInvalid } = useProjectReducerForm({
    initialFields: { 
      title: project?.title ?? "",
      description: project?.description ?? "",
      id: project?.id ?? "",
      date: project?.createdAt ?? "" 
    },
    onSubmit: (data) => onSubmit(project?.id, data),
    validate: {
      title: (_, value) => value.length > 2,
      description: (_, value) => value.length > 5, 
      id: (_, value) => value.trim() !== "", 
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
    <section className="project-ideas" data-testid="project-idea">
      <h3>{isEditing ? labels.edit.title : labels.add.title}</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="title field">
          <label htmlFor="title">Project Name:</label>
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
          <label htmlFor="description">Describe your project:</label>
          <input
            id="description"
            type="text"
            name="description"
            placeholder="Describe your project"
            {...getFieldProps("description")}
          />
        </section>

        <section>
          <label htmlFor="id">Project ID:</label>
          <input
            id="id"
            type="text"
            name="id"
            placeholder="Enter project ID"
            {...getFieldProps("id")}
          />
        </section>

        <section>
          <label htmlFor="date">Project Date:</label>
          <input
            id="date"
            type="date"
            name="date"
            {...getFieldProps("date")}
          />
        </section>

        <div>
          <button type="submit" id="submit" className="success">
            {isEditing ? labels.edit.submit : labels.add.submit}
          </button>
        </div>
      </form>
    </section>
  )
}   