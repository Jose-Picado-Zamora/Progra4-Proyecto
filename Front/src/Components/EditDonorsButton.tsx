import GenericModal from "../Components/GenericModal";
import EditDonorForm from "./EditDonorForm";
import { useState } from "react";
import type { Donor } from "../Services/DonorsService";

type EditDonorsButtonProps = {
  donor: Donor;
};

const EditDonorsButton = ({ donor }: EditDonorsButtonProps) => {
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
      {/* Botón estilizado */}
      <button
        onClick={() => setShowEditModal(true)}
        className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-md transition-colors"
      >
        Edit
      </button>

      {/* Modal */}
      <GenericModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        title={`Edit Donor: ${donor.name}`}
      >
        <EditDonorForm
          donor={donor}
          onSuccess={() => setShowEditModal(false)}
        />
      </GenericModal>
    </>
  );
};

export default EditDonorsButton;
