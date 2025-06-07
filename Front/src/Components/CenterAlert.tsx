import { X } from "lucide-react";

type Props = {
  message: string;
  onClose: () => void;
};

const CenterAlert = ({ message, onClose }: Props) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="relative bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded shadow-lg pointer-events-auto max-w-md w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-600 hover:text-red-800 font-bold"
          aria-label="Close"
        >
          <X size={16} />
        </button>
        <strong className="font-bold block mb-1">Error</strong>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default CenterAlert;
