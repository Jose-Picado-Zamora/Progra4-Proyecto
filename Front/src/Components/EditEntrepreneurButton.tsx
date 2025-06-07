import GenericModal from "../Components/GenericModal";
import EditEntrepreneurForm from "./EditEntrepreneurForm";
import { useState } from "react";
import type { Entrepreneur } from "../Services/EntrepreneursService";

type EditEntrepreneurButtonProps = {
  entrepreneur: Entrepreneur;
};

const EditEntrepreneurButton = ({ entrepreneur }: EditEntrepreneurButtonProps) => {
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
        title={`Edit Entrepreneur: ${entrepreneur.name}`}
      >
        <EditEntrepreneurForm
          entrepreneur={entrepreneur}
          onSuccess={() => setShowEditModal(false)}
        />
      </GenericModal>
    </>
  );
};

export default EditEntrepreneurButton;