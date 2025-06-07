import { useForm, useField } from "@tanstack/react-form";
import { useAddFair } from "../Services/FairsService";
import { useState } from "react";
import CenterAlert from "./CenterAlert";

type AddFairFormProps = {
  onSuccess: () => void;
};

const AddFairForm = ({ onSuccess }: AddFairFormProps) => {
  const { mutate: addFair } = useAddFair();
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      location: "",
      date: "",
    },
    onSubmit: async ({ value }) => {
      const { name, description, location, date } = value;

      if (!name.trim() || !description.trim() || !location.trim() || !date.trim()) {
        setErrorMessage("Please complete all fields before submitting.");
        return;
      }

      form.reset(); 

      addFair(value, {
        onSuccess: () => {
          onSuccess();
        },
      });
    },
    touchOnBlur: true,
    touchOnChange: true,
  });

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      {errorMessage && (
        <CenterAlert
          message={errorMessage}
          onClose={() => setErrorMessage("")}
        />
      )}

      {["name", "description", "location", "date"].map((fieldName) => {
        const field = useField({
          form,
          name: fieldName,
          validators: {
            onChange: (value) =>
              typeof value === "string" && value.trim() === ""
                ? "Required"
                : undefined,
          },
        });

        return (
          <div className="flex flex-col" key={fieldName}>
            <label htmlFor={fieldName} className="mb-1 text-gray-700 font-medium">
              {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}:
            </label>
            <input
              type={fieldName === "date" ? "date" : "text"}
              id={fieldName}
              name={fieldName}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none"
            />
            {field.state.meta.touchedErrors?.[0] && (
              <span className="text-red-500 text-sm mt-1">
                {field.state.meta.touchedErrors[0]}
              </span>
            )}
          </div>
        );
      })}

      <div className="flex space-x-4">
        <button
          type="submit"
          className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
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

export default AddFairForm;
