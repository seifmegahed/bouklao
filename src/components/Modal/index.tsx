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
      className={`absolute h-screen w-full flex justify-center items-center z-[1000] overflow-clip sm:py-2 ${
        !isOpen && "scale-0 opacity-0"
      } duration-300 ease-in-out`}
    >
      <div className="shadow-xl sm:rounded-2xl h-full w-full sm:max-w-[800px] sm:max-h-[800px] flex flex-col overflow-hidden bg-white">
        <div className="flex justify-between items-center w-full bg-gray-100">
          <h1 className="text-4xl p-5 text-gray-500">{title}</h1>
          <ModalCloseButton onClose={onClose} />
        </div>
        <hr></hr>
        <div className="p-5 overflow-y-scroll lg:h-fit h-full">
          {children}
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
}

export default Modal;
