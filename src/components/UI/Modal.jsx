import { Modal } from "react-overlays";

const DevBrosModal = ({ open, onClose, children, ...props }) => {
  return (
    <Modal
      show={open}
      onHide={onClose}
      onBackdropClick={onClose}
      aria-labelledby="modal-label"
      className="w-full h-screen absolute left-0 top-0 bg-[rgba(0,0,0,.4)] flex justify-center items-center z-50"
      {...props}
    >
      <div className="card bg-neutral text-neutral-content w-full max-w-3xl h-full max-h-[50vh] relative">
        <div className="card-body">{children}</div>
        <button
          className="btn btn-circle absolute top-4 right-4"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </Modal>
  );
};

export default DevBrosModal;
