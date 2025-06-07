import GenericModal from "../Components/GenericModal";
import EditProjectForm from "./EditProjectsForm";
import { useState } from "react";
import type { Project } from "../Services/ProjectsService";

type EditProjectButtonProps = {
  project: Project;
};

const EditProjectButton = ({ project }: EditProjectButtonProps) => {
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
        title={`Edit project: ${project?.name ?? ''}`}
      >
        <EditProjectForm
          project={project}
          onSuccess={() => setShowEditModal(false)}
        />
      </GenericModal>
    </>
  );
};

export default EditProjectButton;
