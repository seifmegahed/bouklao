import { ReactNode } from "react";
import ReactDOM from "react-dom";

import ModalCloseButton from "./ModalCloseButton";

function Modal(props: {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
}) {
  const { isOpen, onClose, children, title } = props;
  // if (!isOpen) {
  //   return null;
  // }
  return ReactDOM.createPortal(
    <div
      className={`absolute h-screen w-screen flex justify-center items-center z-[1000] ${
        !isOpen && "scale-0 opacity-0"
      } duration-300 ease-in-out`}
    >
      <div className="bg-white shadow-xl rounded-2xl w-full h-full m-5 max-w-[800px] max-h-[800px] p-5 flex flex-col">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-4xl text-gray-500">{title}</h1>
          <ModalCloseButton onClose={onClose} />
        </div>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
}

export default Modal;
