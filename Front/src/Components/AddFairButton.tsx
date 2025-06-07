import GenericModal from "../Components/GenericModal";
import AddFairForm from "./AddFairForm";
import { useState } from "react";

const AddFairButton = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 text-sm font-medium text-white rounded-lg focus:ring-3 focus:ring-emerald-200"
          style={{ backgroundColor: "#52AC83" }}
        >
          Add Fair
        </button>
      </div>
      <GenericModal show={showAddModal} onClose={() => setShowAddModal(false)} title="Register New Fair">
        <AddFairForm onSuccess={() => setShowAddModal(false)} />
      </GenericModal>
    </>
  );
};

export default AddFairButton;
