import { Modal } from "react-overlays";
import { motion } from "framer-motion";

const DevBrosModal = ({ open, onClose, children, ...props }) => {
  return (
    <Modal
      show={open}
      onHide={onClose}
      onBackdropClick={onClose}
      aria-labelledby="modal-label"
      className="w-full h-screen absolute left-0 top-0 bg-[rgba(0,0,0,.4)] flex justify-center items-center z-50 backdrop-blur-md"
      {...props}
    >
      <div className="w-full h-screen flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full h-screen flex justify-center items-center"
        >
          {children}
        </motion.div>
        <button
          className="btn btn-circle border-1 border-primary fixed top-4 right-4"
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
