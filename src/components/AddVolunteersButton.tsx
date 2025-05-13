
import GenericModal from "../Components/GenericModal";
import AddVolunteersForm from "./AddVolunteersForm";
import { useState } from "react";


const AddVolunteersButton = () =>
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
                    Add Volunteer
                </button>
            </div>

            {/* Modal */}
            <GenericModal
                show={showAddModal}
                onClose={handleClose}
                title="Create New Volunteer"
            >
                <AddVolunteersForm onClose={handleClose}/>
            </GenericModal>
            
        </>
    )
}

export default AddVolunteersButton;