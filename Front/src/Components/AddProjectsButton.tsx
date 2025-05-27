
import GenericModal from "./GenericModal";
import AddProjectForm from "./AddProjectsForm";
import { useState } from "react";


const AddProjectsButton = () =>
{
    const [showAddModal,  setShowAddModal]  = useState(false);

    const handleClose = () => {
        setShowAddModal(false);
    }

    return (
        <>
            
            <div className="flex justify-end mb-4">
                <button
                    onClick={() => setShowAddModal(true)}
                    className="px-5 py-2.5 text-sm font-medium text-white 
                            rounded-lg focus:ring-3 focus:ring-emerald-200"
                    style={{ backgroundColor: '#52AC83' }}
                >
                    Add Project
                </button>
            </div>

          
            <GenericModal
                show={showAddModal}
                onClose={() => handleClose()}
                title="Create New Project"
            >
                <AddProjectForm onClose={handleClose}/>
            </GenericModal>
            
        </>
    )
}

export default AddProjectsButton;