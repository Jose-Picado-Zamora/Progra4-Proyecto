

import { ReactNode } from "react";

type GenericModalProps = {
  show: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

const GenericModal = ({ show, onClose, title, children }: GenericModalProps) => {

    if (!show) return null;

    return (
      // backdrop
      <div className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
        {/* panel */}
        <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6">
          {/* close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl leading-none"
          >
            &times;
          </button>
  
          {/* optional title */}
          {title && <h2 className="mb-4 text-xl font-semibold">{title}</h2>}
  
          {/* whatever you pass in */}
          {children}
        </div>
      </div>
    );
  
}

export default GenericModal;
