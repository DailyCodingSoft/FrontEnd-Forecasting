// components/ui/Modal.tsx
type ModalProps = {
  open: boolean;
  title: string;
  description: string;
  onClose: () => void;
};

const Modal = ({ open, title, description, onClose }: ModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] text-center">
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <p className="mb-4">{description}</p>

        <button
          onClick={onClose}
          className="bg-green-500 text-white px-4 py-2 rounded-full"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default Modal;