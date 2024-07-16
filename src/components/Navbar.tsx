import { ReactNode, useEffect, useMemo, useState } from "react";

import { useAuth } from "../context/authContext";

import Modal from "./Modal";
import Login from "./Login";
import UserPage from "./UserPage";
import ScoreBoard from "./ScoreBoard";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, newUser } = useAuth();

  const [activeItem, setActiveItem] = useState<{
    component: ReactNode;
    title: string;
  }>();

  const userPageObject = useMemo(() => {
    return {
      title: "User Page",
      component: (
        <UserPage
          onClose={() => {
            setIsOpen(false);
          }}
        />
      ),
    };
  }, []);

  const loginPageObject = {
    title: "Sign in",
    component: <Login />,
  };

  const scoreBoardPageObject = {
    title: "Score Board",
    component: <ScoreBoard />,
  };

  useEffect(() => {
    if (user && activeItem?.title === "Sign in") {
      setIsOpen(false);
    }
  }, [user, activeItem]);

  useEffect(() => {
    if (newUser && user) {
      setIsOpen(true);
      setActiveItem(userPageObject);
    }
  }, [newUser, user, userPageObject]);

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
          {user && (
            <div
              className="p-5 text-2xl font-bold text-gray-700 hover:bg-black/10 cursor-pointer"
              onClick={() => {
                setActiveItem(scoreBoardPageObject);
                setIsOpen(true);
              }}
            >
              Score Board
            </div>
          )}
          <div
            className="p-5 text-2xl font-bold text-gray-700 hover:bg-black/10 cursor-pointer"
            onClick={() => {
              setActiveItem(user ? userPageObject : loginPageObject);
              setIsOpen(true);
            }}
          >
            {user
              ? user.alias === ""
                ? user.name.replace(" ", "")
                : user.alias
              : "Sign in"}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
