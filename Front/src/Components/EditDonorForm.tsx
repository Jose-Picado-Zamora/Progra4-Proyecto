import { useForm } from "@tanstack/react-form";
import { useUpdateDonor } from "../Services/DonorsService";

export type Donor = {
  id: number;
  name: string;
  email: string;
  phone: string;
  donationType: string;
  details: string;
};

type EditDonorFormProps = {
  donor: Donor;
  onSuccess: () => void;
};

const EditDonorForm = ({ donor, onSuccess }: EditDonorFormProps) => {
  const {
    mutate: updateDonor,
    isPending,
    isError,
    isSuccess,
  } = useUpdateDonor();

  const form = useForm({
    defaultValues: donor,
    onSubmit: async ({ value }) => {
      updateDonor(value, {
        onSuccess: () => {
          setTimeout(() => {
            onSuccess();
          }, 1000);
        },
      });
    },
  });

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      {['name', 'email', 'phone', 'donationType', 'details'].map((fieldName) => (
        <div className="flex flex-col" key={fieldName}>
          <label htmlFor={fieldName} className="mb-1 text-gray-700 font-medium">
            {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}:
          </label>
          <form.Field name={fieldName as keyof Donor}>
            {(field) => (
              <input
                id={fieldName}
                name={fieldName}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
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
          Donor successfully updated!
        </div>
      )}
      {isError && (
        <div className="text-red-600 text-sm mt-2">Failed to update donor.</div>
      )}
    </form>
  );
};

export default EditDonorForm;
