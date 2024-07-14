import { ReactNode } from "react";
import ReactDOM from "react-dom";
import CloseIcon from "../icons/CloseIcon";

function Modal(props: {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { isOpen, onClose, children } = props;
  if (!isOpen) {
    return null;
  }
  return ReactDOM.createPortal(
    <div className="absolute bottom-0 top-0 left-0 right-0 flex justify-center items-center bg-black/40 z-[1000]">
      <div className="bg-white shadow-xl rounded-2xl m-5 max-w-[800px] max-h-[600px] w-full h-full flex flex-col justify-center items-center relative">
        <button
          className="absolute top-0 right-0 m-2 text-2xl text-gray-700 hover:bg-black/10 rounded-full p-3"
          onClick={onClose}
        >
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
}

export default Modal;
