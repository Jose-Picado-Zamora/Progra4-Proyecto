import { useForm } from "@tanstack/react-form";
import { useAddDonor } from "../Services/DonorsService";

type AddDonorsFormProps = {
  onSuccess: () => void;
};

const AddDonorsForm = ({ onSuccess }: AddDonorsFormProps) => {
  const {
    mutate: addDonor,
    isPending: isAdding,
    isError,
    error,
    isSuccess,
  } = useAddDonor();

  const form = useForm({
    defaultValues: {
      id: "",
      name: "",
      email: "",
      phone: "",
      donationType: "",
      details: "",
    },
    onSubmit: async ({ value }) => {

      const { id, name, email, phone, donationType, details } = value;

      if (
        !id ||
        !name.trim() ||
        !email.trim() ||
        !phone.trim() ||
        !donationType.trim() ||
        !details.trim()
      ) {
        alert("Please fill in all fields before submitting.");
        return;
      }

      addDonor(
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
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        </form.Field>
      </div>

      {/* ─── Donation Type Field ─────────────────────── */}
      <div className="flex flex-col">
        <label
          htmlFor="donationType"
          className="mb-1 text-gray-700 font-medium"
        >
          Donation Type:
        </label>
        <form.Field name="donationType">
          {(field) => (
            <input
              id="donationType"
              name="donationType"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        </form.Field>
      </div>

      {/* ─── Details Field ─────────────────────── */}
      <div className="flex flex-col">
        <label htmlFor="details" className="mb-1 text-gray-700 font-medium">
          Details:
        </label>
        <form.Field name="details">
          {(field) => (
            <input
              id="details"
              name="details"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        </form.Field>
      </div>

      {/* ─── Buttons ────────────────────────── */}
      <div className="flex space-x-4">
        <button
          type="submit"
          disabled={!form.state.canSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
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
          Donor successfully added!
        </div>
      )}
      {isError && (
        <div className="text-red-600 text-sm mt-2">Failed to add donor.</div>
      )}
    </form>
  );
};

export default AddDonorsForm;
