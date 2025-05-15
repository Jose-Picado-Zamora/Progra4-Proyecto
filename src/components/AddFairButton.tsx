import { useState } from "react";
import AddFairForm from "./AddFairForm";
import GenericModal from "./GenericModal";

const AddFairButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setOpen(true)}
          className="px-5 py-2.5 text-sm font-medium text-white 
                     rounded-lg focus:outline-none focus:ring-3 focus:ring-emerald-200"
          style={{ backgroundColor: "#52AC83" }} 
        >
          Submit
        </button>
      </div>

      <GenericModal show={open} onClose={() => setOpen(false)}>
        <AddFairForm onSuccess={() => setOpen(false)} />
      </GenericModal>
    </>
  );
};

export default AddFairButton;
