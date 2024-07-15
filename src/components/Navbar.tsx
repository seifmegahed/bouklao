import { ReactNode, useEffect, useState } from "react";
import Modal from "./Modal";
import ScoreBoard from "./ScoreBoard";
import { data } from "../.test/data";
import Login from "./Login";
import { useAuth } from "../context/authContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const [activeItem, setActiveItem] = useState<{
    component: ReactNode;
    title: string;
  }>();

  useEffect(() => {
    if (user && activeItem?.title === "Sign in") {
      setIsOpen(false);
    }
  }, [user, activeItem]);

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
          {user ? (
            <div
              className="p-5 text-xl hover:bg-black/10 cursor-pointer"
              onClick={logout}
            >
              Sign out
            </div>
          ) : (
            <div
              className="p-5 text-xl hover:bg-black/10 cursor-pointer"
              onClick={() => {
                setIsOpen(true);
                setActiveItem({
                  component: <Login />,
                  title: "Sign in",
                });
              }}
            >
              Sign in
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
