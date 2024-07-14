import { useState } from "react";
import Modal from "./Modal";
import ScoreBoard from "./ScoreBoard";
import { data } from "../.test/data";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<"Score" | "Login">("Score");
  return (
    <>
      <Modal title={modalType} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <>
          {modalType === "Score" ? (
            <ScoreBoard data={data} />
          ) : (
            <div>Login</div>
          )}
        </>
      </Modal>
      <div className="flex justify-end w-screen">
        <div className="flex">
          <div
            className="p-5 text-xl hover:bg-black/10 cursor-pointer"
            onClick={() => {
              setIsOpen(true);
              setModalType("Score");
            }}
          >
            Score Board
          </div>
          <div
            className="p-5 text-xl hover:bg-black/10 cursor-pointer"
            onClick={() => {
              setIsOpen(true);
              setModalType("Login");
            }}
          >
            Login
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
