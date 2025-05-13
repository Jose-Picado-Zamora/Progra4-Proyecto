import { useForm } from '@tanstack/react-form'
import { useAddVolunteers } from '../Services/VolunteersService'

type AddVolunteerFormProps = { onClose: () => void; };

const AddVolunteerForm = ({ onClose }: AddVolunteerFormProps) => {
    
// 1) grab your mutation
  const {
    mutate: addVolunteer,
    isPending:
    isAdding,
    isError,
    error,
    isSuccess,
  } = useAddVolunteers()

  // 1️⃣ Initialize form state with defaultValues and a submit handler
  const form = useForm({
    defaultValues: {
      id: '',
      name: '',
      phone: '',
      email: '',
      address: '',
      rol: '',
    },
    // 3) when the user submits, call your mutation
    onSubmit: async ({ value }) => {
      addVolunteer({
        ...value,
        id: Number(value.id), // trasforma de string a number
      });
      form.reset();
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
              className= "border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              
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

      {/* ─── Name Field ─────────────────────── */}
      <div className="flex flex-col">
        <label htmlFor="phone" className="mb-1 text-gray-700 font-medium">
          Phone:
        </label>
        <form.Field name="phone">
          {field => (
            <input
              id="phone"
              name="phone"
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

      {/* ─── Address Field ─────────────────────── */}
      <div className="flex flex-col">
        <label htmlFor="address" className="mb-1 text-gray-700 font-medium">
          Address:
        </label>
        <form.Field name="address">
          {field => (
            <input
              id="address"
              name="address"
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          )}
        </form.Field>
      </div>

      {/* ─── Rol Field ─────────────────────── */}
      <div className="flex flex-col">
        <label htmlFor="solicitud" className="mb-1 text-gray-700 font-medium">
          Rol:
        </label>
        <form.Field name="rol">
          {field => (
            <input
              id="rol"
              name="rol"
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

export default AddVolunteerForm