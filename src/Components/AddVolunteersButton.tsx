
import GenericModal from "./GenericModal";
import AddVolunteersForm from "./AddVolunteersForm";
import { useState } from "react";


const AddVolunteersButton = () =>
{
    const [showAddModal,  setShowAddModal]  = useState(false);
    
    const handleClose = () => {
        setShowAddModal(false);
    }

    return (
        <>
            {/* Button row */}
            <div className="flex justify-end mb-4">
                <button
                    onClick={() => setShowAddModal(true)}
                    className="px-5 py-2.5 text-sm font-medium text-white 
                                rounded-lg focus:ring-3 focus:ring-emerald-200"
                    style={{ backgroundColor: "#52AC83" }}  // TPF Green       
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