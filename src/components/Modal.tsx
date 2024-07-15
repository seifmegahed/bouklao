import { ReactNode } from "react";
import ReactDOM from "react-dom";
import CloseIcon from "../icons/CloseIcon";

function Modal(props: {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
}) {
  const { isOpen, onClose, children, title } = props;
  if (!isOpen) {
    return null;
  }
  return ReactDOM.createPortal(
    <div className="absolute h-screen w-screen flex justify-center items-center bg-black/40 z-[1000]">
      <div className="bg-white shadow-xl rounded-2xl w-full h-full m-5 max-w-[800px] max-h-[600px] p-5 flex flex-col">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-4xl text-gray-500">{title}</h1>
          <button
            className="m-2 text-2xl text-gray-700 hover:bg-black/10 rounded-full p-3"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
}

export default Modal;
