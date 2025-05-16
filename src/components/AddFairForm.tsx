import { useState } from "react";
import { useAddFair } from "../Services/FairsService";

type Props = {
  onSuccess: () => void;
};

const AddFairForm = ({ onSuccess }: Props) => {
  const { mutate: addFair, isPending } = useAddFair();

  const initialForm = {
    name: "",
    date: "",
    location: "",
    type: "",
    objective: "",
    organizer: "",
    details: "",
    audience: "",
    stands: 0, 
  };

  const [form, setForm] = useState(initialForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name === "stands" ? Math.max(0, Number(value)) : value, 
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    
    if (!form.stands || form.stands <= 0) {
      alert("La cantidad de stands debe ser mayor a 0.");
      return;
    }

    addFair(form, { onSuccess });
  };

  const handleReset = () => {
    setForm(initialForm);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-h-[80vh] overflow-y-auto p-4"
    >
      {Object.entries(form).map(([key, value]) => (
        <div className="flex flex-col" key={key}>
          <label
            htmlFor={key}
            className="mb-1 text-gray-700 font-medium capitalize"
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}:
          </label>

          {key === "details" ? (
            <textarea
              id={key}
              name={key}
              value={value}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          ) : (
            <input
              type={key === "date" ? "date" : key === "stands" ? "number" : "text"}
              id={key}
              name={key}
              value={value}
              min={key === "stands" ? 1 : undefined} 
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          )}
        </div>
      ))}

      <div className="flex space-x-4">
        <button
          type="submit"
          className="text-white px-4 py-2 rounded hover:bg-opacity-90 disabled:opacity-50"
          style={{ backgroundColor: "#52AC83" }}
          disabled={isPending}
        >
          {isPending ? "Saving..." : "Add Fair"}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default AddFairForm;
