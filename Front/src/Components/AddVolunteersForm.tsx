import { useForm } from '@tanstack/react-form';
import { useAddVolunteers } from '../Services/VolunteersService';

type AddVolunteersFormProps = {
  onSuccess: () => void;
};

const AddVolunteersForm = ({ onSuccess }: AddVolunteersFormProps) => {
  const {
    mutate: addVolunteer,
    isPending: isAdding,
    isError,
    error,
    isSuccess,
  } = useAddVolunteers();

  const form = useForm({
    defaultValues: {
      id: '',
      name: '',
      phone: '',
      email: '',
      address: '',
      rol: '',
      projectName: '',
    },
    onSubmit: async ({ value }) => {
      const { id, name, phone, email, address, rol, projectName } = value;

      // Validation similar to AddDonorsForm
      if (
        !id ||
        !name.trim() ||
        !phone.trim() ||
        !email.trim() ||
        !address.trim() ||
        !rol.trim() ||
        !projectName.trim()
      ) {
        alert('Please fill in all fields before submitting.');
        return;
      }

      addVolunteer(
        { ...value, id: Number(value.id) },
        {
          onSuccess: () => {
            setTimeout(() => {
              form.reset();
              onSuccess();
            }, 1500);
          },
        }
      );
    },
  });

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      {/* ─── ID Field ───────────────────────── */}
      <div className="flex flex-col">
        <label htmlFor="id" className="mb-1 text-gray-700 font-medium">
          ID:
        </label>
        <form.Field name="id">
          {(field) => (
            <input
              id="id"
              name="id"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
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
          {(field) => (
            <input
              id="name"
              name="name"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
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
          {(field) => (
            <input
              id="phone"
              name="phone"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
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
          {(field) => (
            <input
              id="email"
              name="email"
              type="email"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
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
          {(field) => (
            <input
              id="address"
              name="address"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          )}
        </form.Field>
      </div>

      {/* ─── Role Field ─────────────────────── */}
      <div className="flex flex-col">
        <label htmlFor="rol" className="mb-1 text-gray-700 font-medium">
          Role:
        </label>
        <form.Field name="rol">
          {(field) => (
            <input
              id="rol"
              name="rol"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          )}
        </form.Field>
      </div>

      {/* ─── Project Name Field ─────────────────────── */}
      <div className="flex flex-col">
        <label htmlFor="projectName" className="mb-1 text-gray-700 font-medium">
          Project Name:
        </label>
        <form.Field name="projectName">
          {(field) => (
            <input
              id="projectName"
              name="projectName"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
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
          className="bg-blue-600 text-white px-4 py-2 rounded focus:ring-3 focus:ring-emerald-200 disabled:opacity-50"
          style={{ backgroundColor: '#52AC83' }} // TPF Green
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

      {isSuccess && (
        <div className="text-green-600 text-sm mt-2">
          Volunteer successfully added!
        </div>
      )}
      {isError && (
        <div className="text-red-600 text-sm mt-2">Failed to add volunteer.</div>
      )}
    </form>
  );
};

export default AddVolunteersForm;