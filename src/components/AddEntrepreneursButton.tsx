import { useState } from 'react';
import GenericModal from "../Components/GenericModal";
import AddEntrepreneurForm from './AddEntrepreneursForm';

const AddEntrepreneursButton = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  const handleClose = () => {
    setShowAddModal(false);
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 text-sm font-medium focus:ring-3 focus:ring-emerald-200 text-white rounded-lg"
          style={{ backgroundColor: "#52AC83 "}}
        >
          Add Entrepreneur
        </button>
      </div>

      <GenericModal show={showAddModal} onClose={handleClose} title="Create New Entrepreneur">
        <AddEntrepreneurForm onClose={handleClose} />
      </GenericModal>
    </>
  );
};

export default AddEntrepreneursButton;
