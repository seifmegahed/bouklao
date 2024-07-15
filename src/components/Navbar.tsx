import { ReactNode, useState } from "react";
import Modal from "./Modal";
import ScoreBoard from "./ScoreBoard";
import { data } from "../.test/data";
import Login from "./Login";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<{
    component: ReactNode;
    title: string;
  }>();
  return (
    <>
      {activeItem && (
        <Modal
          title={activeItem.title}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          {activeItem.component}
        </Modal>
      )}
      <div className="flex justify-end w-screen">
        <div className="flex">
          <div
            className="p-5 text-xl hover:bg-black/10 cursor-pointer"
            onClick={() => {
              setIsOpen(true);
              setActiveItem({
                component: <ScoreBoard data={data} />,
                title: "Score Board",
              });
            }}
          >
            Score Board
          </div>
          <div
            className="p-5 text-xl hover:bg-black/10 cursor-pointer"
            onClick={() => {
              setIsOpen(true);
              setActiveItem({
                component: <Login />,
                title: "Login",
              });
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
