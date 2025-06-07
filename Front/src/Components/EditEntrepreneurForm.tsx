import { useForm } from "@tanstack/react-form";
import { useUpdateEntrepreneur } from "../Services/EntrepreneursService";

export type Entrepreneur = {
  id: number;
  name: string;
  businessName: string;
  phone: string;
  email: string;
  feriaName: string;
  standNumber: string;
  productsDescription: string;
};

type EditEntrepreneurFormProps = {
  entrepreneur: Entrepreneur;
  onSuccess: () => void;
};

const EditEntrepreneurForm = ({ entrepreneur, onSuccess }: EditEntrepreneurFormProps) => {
  const {
    mutate: updateEntrepreneur,
    isPending,
    isError,
    isSuccess,
  } = useUpdateEntrepreneur();

  const form = useForm({
    defaultValues: entrepreneur,
    onSubmit: async ({ value }) => {
      updateEntrepreneur(value, {
        onSuccess: () => {
          setTimeout(() => {
            onSuccess();
          }, 1000);
        },
      });
    },
  });

  const fields = [
    { name: 'name', label: 'Name' },
    { name: 'businessName', label: 'Business Name' },
    { name: 'phone', label: 'Phone' },
    { name: 'email', label: 'Email' },
    { name: 'feriaName', label: 'Feria Name' },
    { name: 'standNumber', label: 'Stand Number' },
    { name: 'productsDescription', label: 'Products Description' },
  ];

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      {fields.map(({ name, label }) => (
        <div className="flex flex-col" key={name}>
          <label htmlFor={name} className="mb-1 text-gray-700 font-medium">
            {label}:
          </label>
          <form.Field name={name as keyof Entrepreneur}>
            {(field) => (
              name === 'productsDescription' ? (
                <textarea
                  id={name}
                  name={name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  rows={3}
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              ) : (
                <input
                  id={name}
                  name={name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              )
            )}
          </form.Field>
        </div>
      ))}

      <div className="flex space-x-4">
        <button
          type="submit"
          disabled={!form.state.canSubmit || isPending}
          className="bg-blue-600 text-white px-4 py-2 rounded focus:ring-3 focus:ring-emerald-200 disabled:opacity-50"
          style={{ backgroundColor: "#52AC83" }}
        >
          Save Changes
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
          Entrepreneur successfully updated!
        </div>
      )}
      {isError && (
        <div className="text-red-600 text-sm mt-2">Failed to update entrepreneur.</div>
      )}
    </form>
  );
};

export default EditEntrepreneurForm;