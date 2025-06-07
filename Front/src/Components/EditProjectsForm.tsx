import { useForm } from "@tanstack/react-form";
import { useUpdateProject } from "../Services/ProjectsService";

export type Project = {
  id: number;
  name: string;
  email: string;
  location: string;
  application: string;
};

type EditProjectFormProps = {
  project: Project;
  onSuccess: () => void;
};

const EditProjectForm = ({ project, onSuccess }: EditProjectFormProps) => {
  const {
    mutate: updateProject,
    isPending,
    isError,
    isSuccess,
  } = useUpdateProject();

  const form = useForm({
    defaultValues: project,
    onSubmit: async ({ value }) => {
      updateProject(value, {
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
      {['name', 'email', 'location', 'application'].map((fieldName) => (
        <div className="flex flex-col" key={fieldName}>
          <label htmlFor={fieldName} className="mb-1 text-gray-700 font-medium">
            {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}:
          </label>
          <form.Field name={fieldName as keyof Project}>
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
          Project successfully updated!
        </div>
      )}
      {isError && (
        <div className="text-red-600 text-sm mt-2">Failed to update project.</div>
      )}
    </form>
  );
};

export default EditProjectForm;
