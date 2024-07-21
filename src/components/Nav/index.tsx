import { ReactNode, useState } from "react";

import { useAuth } from "@/context/authContext";

import Modal from "@/components/Modal";
import Login from "@/components/Login";
import UserPage from "@/components/UserPage";
import ScoreBoard from "@/components/ScoreBoard";

import MenuButton from "./MenuButton";
import NavMenu from "./NavMenu";
import MenuItem from "./MenuItem";
import { toast } from "sonner";

function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalComponent, setModalComponent] = useState<{
    component: ReactNode;
    title: string;
  } | null>(null);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const handleProfile = () => {
    setModalComponent({
      title: "Profile",
      component: <UserPage onClose={toggleMenu} />,
    });
    setMenuOpen(false);
  };

  const handleLeaderBoard = () => {
    setModalComponent({
      title: "Leader board",
      component: <ScoreBoard />,
    });
    setMenuOpen(false);
  };

  const handleSignIn = () => {
    setModalComponent({
      title: "Sign in",
      component: <Login />,
    });
    setMenuOpen(false);
  };

  const handleSignOut = () => {
    logout()
      .then(() => toast("Signed out successfully"))
      .catch((error) => {
        toast("Signed out failed");
        console.error(error);
      })
      .finally(() => setMenuOpen(false));
  };

  return (
    <>
      <Modal
        isOpen={modalComponent !== null}
        onClose={() => setModalComponent(null)}
        title={modalComponent?.title ?? ""}
      >
        {modalComponent?.component}
      </Modal>
      <div className="flex justify-end w-full p-3 relative">
        <MenuButton onClick={toggleMenu} />
      </div>
      <NavMenu onClose={toggleMenu} open={menuOpen}>
        {user ? (
          <MenuItem onClick={handleProfile}>Profile</MenuItem>
        ) : (
          <MenuItem onClick={handleSignIn}>Sign in</MenuItem>
        )}
        <MenuItem onClick={handleLeaderBoard}>Leader board</MenuItem>
        <MenuItem onClick={() => toast.error("Help!")}>Help</MenuItem>
        {user && <MenuItem onClick={handleSignOut}>Sign out</MenuItem>}
      </NavMenu>
    </>
  );
}

export default Navbar;
