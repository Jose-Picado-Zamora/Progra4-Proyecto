import GenericModal from "../Components/GenericModal";
import EditVolunteersForm from "./EditVolunteersForm";
import { useState } from "react";
import type { Volunteer } from "../Services/VolunteersService";

type EditVolunteersButtonProps = {
  volunteer: Volunteer;
};

const EditVolunteersButton = ({ volunteer }: EditVolunteersButtonProps) => {
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
      {/* Styled button */}
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
        title={`Edit Volunteer: ${volunteer.name}`}
      >
        <EditVolunteersForm
          volunteer={volunteer}
          onSuccess={() => setShowEditModal(false)}
        />
      </GenericModal>
    </>
  );
};

export default EditVolunteersButton;