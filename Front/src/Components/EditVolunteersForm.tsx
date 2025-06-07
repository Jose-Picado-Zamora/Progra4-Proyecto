import { useForm } from "@tanstack/react-form";
import { useUpdateVolunteer } from "../Services/VolunteersService";

export type Volunteer = {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  rol: string;
  projectName: string;
};

type EditVolunteersFormProps = {
  volunteer: Volunteer;
  onSuccess: () => void;
};

const EditVolunteersForm = ({ volunteer, onSuccess }: EditVolunteersFormProps) => {
  const {
    mutate: updateVolunteer,
    isPending,
    isError,
    isSuccess,
  } = useUpdateVolunteer();

  const form = useForm({
    defaultValues: volunteer,
    onSubmit: async ({ value }) => {
      updateVolunteer(value, {
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
      {['name', 'phone', 'email', 'address', 'rol', 'projectName'].map((fieldName) => (
        <div className="flex flex-col" key={fieldName}>
          <label htmlFor={fieldName} className="mb-1 text-gray-700 font-medium">
            {fieldName === 'rol' ? 'Role' : 
             fieldName === 'projectName' ? 'Project Name' :
             fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}:
          </label>
          <form.Field name={fieldName as keyof Volunteer}>
            {(field) => (
              <input
                id={fieldName}
                name={fieldName}
                type={fieldName === 'email' ? 'email' : 'text'}
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
          style={{ backgroundColor: "#52AC83" }} // TPF Green
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
          Volunteer successfully updated!
        </div>
      )}
      {isError && (
        <div className="text-red-600 text-sm mt-2">Failed to update volunteer.</div>
      )}
    </form>
  );
};

export default EditVolunteersForm;