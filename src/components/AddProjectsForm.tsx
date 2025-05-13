
import { useForm } from '@tanstack/react-form'
import { useAddProject } from '../Services/ProjectsService'

type AddProjectsFormProps = { onClose: () => void }

const AddProjectForm = ({ onClose }: AddProjectsFormProps) => {

  // 1) grab your mutation
  const {
    mutate: addProject,
    isPending:
    isAdding,
    isError,
    error,
    isSuccess,
  } = useAddProject()

  // 1️⃣ Initialize form state with defaultValues and a submit handler
  const form = useForm({
    defaultValues: {
      id: '',
      name: '',
      email: '',
      ubicacion: '',
      solicitudProyecto: '',
    },
    // 3) when the user submits, call your mutation
    onSubmit: async ({ value }) => {
      addProject({
        ...value,
        id: Number(value.id), // aquí haces la conversión a number
      });
      form.reset()
      onClose();
    },
  })

  return (
    <form
      className="space-y-6"
      onSubmit={e => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      {/* ─── ID Field ───────────────────────── */}
      <div className="flex flex-col">
        <label htmlFor="id" className="mb-1 text-gray-700 font-medium">
          ID:
        </label>
        <form.Field name="id">
          {field => (
            <input
              id="id"
              name="id"
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          )}
        </form.Field>
      </div>

      {/* ─── Name Field ─────────────────────── */}
      <div className="flex flex-col">
        <label htmlFor="name" className="mb-1 text-gray-700 font-medium">
          Name:
        </label>
        <form.Field name="name">
          {field => (
            <input
              id="name"
              name="name"
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          )}
        </form.Field>
      </div>

      {/* ─── Email Field ────────────────────── */}
      <div className="flex flex-col">
        <label htmlFor="email" className="mb-1 text-gray-700 font-medium">
          Email:
        </label>
        <form.Field name="email">
          {field => (
            <input
              id="email"
              name="email"
              type="email"
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          )}
        </form.Field>
      </div>

      {/* ─── Ubicacion Field ─────────────────────── */}
      <div className="flex flex-col">
        <label htmlFor="ubicacion" className="mb-1 text-gray-700 font-medium">
          Ubicacion:
        </label>
        <form.Field name="ubicacion">
          {field => (
            <input
              id="ubicacion"
              name="ubicacion"
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          )}
        </form.Field>
      </div>

      {/* ─── Solicitud Proyecto ─────────────────────── */}
      <div className="flex flex-col">
        <label htmlFor="solicitud" className="mb-1 text-gray-700 font-medium">
          Solicitud:
        </label>
        <form.Field name="solicitudProyecto">
          {field => (
            <input
              id="solicitud"
              name="solicitudProyecto"
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          )}
        </form.Field>
      </div>

      {/* ─── Buttons ────────────────────────── */}
      <div className="flex space-x-4">
        <button
          type="submit"
          disabled={!form.state.canSubmit}
          className={` text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50`}
          style={{ backgroundColor: '#52AC83' }}
        >
          Submit
        </button>
        <button
          type="button"
          onClick={() => form.reset()}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
        >
          Reset
        </button>
      </div>
    </form>
  )
}

export default AddProjectForm;