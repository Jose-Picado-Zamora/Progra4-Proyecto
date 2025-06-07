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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
    >
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        {}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl leading-none"
        >
          &times;
        </button>

        {}
        {title && (
          <h2 className="text-center text-2xl font-bold mb-4">{title}</h2>
        )}

        {children}
      </div>
    </div>
  );
};

export default GenericModal;
