import GenericModal from "../Components/GenericModal";
import AddDonorForm from "./AddDonorsForm";
import { useState } from "react";

const AddDonorsButton = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <>
      {/* Button row */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 text-sm font-medium text-white 
                    rounded-lg focus:ring-3 focus:ring-emerald-200"
          style={{ backgroundColor: "#52AC83" }} // TPF Green
        >
          Add Donor
        </button>
      </div>

      {/* Modal */}
      <GenericModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Register New Donor"
      >
      <AddDonorForm onSuccess={() => setShowAddModal(false)} />
      </GenericModal>
    </>
  );
};

export default AddDonorsButton;
