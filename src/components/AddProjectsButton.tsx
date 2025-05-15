
import GenericModal from "./GenericModal";
import AddProjectForm from "./AddProjectsForm";
import { useState } from "react";


const AddProjectsButton = () =>
{
    const [showAddModal,  setShowAddModal]  = useState(false);

    const handleClose = () => {
        setShowAddModal(false);
    }
    const tpfGreen = '#52AC83';
    return (
        <>
            {/* Button row */}
            <div className="flex justify-end mb-4">
                <button
                    onClick={() => setShowAddModal(true)}
                    className={`px-5 py-2.5 text-sm font-medium text-white 
                            rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"`}
                    style={{ backgroundColor: tpfGreen }}
                >
                    Add Project
                </button>
            </div>

            {/* Modal */}
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