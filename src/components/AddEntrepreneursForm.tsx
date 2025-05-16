import { useForm } from '@tanstack/react-form'
import { useAddEntrepreneurs } from '../Services/EntrepreneursService'

type AddEntrepreneurFormProps = { onClose: () => void; };

const AddEntrepreneurForm = ({ onClose }: AddEntrepreneurFormProps) => {

  // 1) Obtener la mutación para añadir emprendedores
  const {
    mutate: addEntrepreneur,
    isPending: isAdding,
    isError,
    error,
    isSuccess,
  } = useAddEntrepreneurs()

  // 2 Inicializar el estado del formulario con los valores predeterminados y un manejador de envío
  const form = useForm({
    defaultValues: {
      id: '',
      name: '',
      businessName: '',
      phone: '',
      email: '',
      feriaName: '',
      standNumber: '',
      productsDescription: '',
    },
    // 3) Cuando el usuario envíe el formulario, llamamos a la mutación
    onSubmit: async ({ value }) => {
      addEntrepreneur({
        ...value,
        id: Number(value.id), // Transformar el id de string a number
      });
      form.reset();
      onClose();
    },
  })

  return (
    <form
      className="space-y-6 max-h-[80vh] overflow-y-auto p-4"
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
              required
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
              required
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

      {/* ─── Business Name Field ─────────────────────── */}
      <div className="flex flex-col">
        <label htmlFor="businessName" className="mb-1 text-gray-700 font-medium">
          Business Name:
        </label>
        <form.Field name="businessName">
          {field => (
            <input
              required
              id="businessName"
              name="businessName"
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          )}
        </form.Field>
      </div>

      {/* ─── Phone Field ─────────────────────── */}
      <div className="flex flex-col">
        <label htmlFor="phone" className="mb-1 text-gray-700 font-medium">
          Phone:
        </label>
        <form.Field name="phone">
          {field => (
            <input
              required
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
              required
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

      {/* ─── Feria Name Field ─────────────────────── */}
      <div className="flex flex-col">
        <label htmlFor="feriaName" className="mb-1 text-gray-700 font-medium">
          Feria Name:
        </label>
        <form.Field name="feriaName">
          {field => (
            <input
              required
              id="feriaName"
              name="feriaName"
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          )}
        </form.Field>
      </div>

      {/* ─── Stand Number Field ─────────────────────── */}
      <div className="flex flex-col">
        <label htmlFor="standNumber" className="mb-1 text-gray-700 font-medium">
          Stand Number:
        </label>
        <form.Field name="standNumber">
          {field => (
            <input
              required
              id="standNumber"
              name="standNumber"
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          )}
        </form.Field>
      </div>

      {/* ─── Products Description Field ─────────────────────── */}
      <div className="flex flex-col">
        <label htmlFor="productsDescription" className="mb-1 text-gray-700 font-medium">
          Products Description:
        </label>
        <form.Field name="productsDescription">
          {field => (
            <input
              required
              id="productsDescription"
              name="productsDescription"
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
          className="text-white px-4 py-2 rounded focus:ring-3 focus:ring-emerald-200 disabled:opacity-50"
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
  );
};

export default AddEntrepreneurForm;
