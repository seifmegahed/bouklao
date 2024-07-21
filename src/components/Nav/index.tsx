import { useState } from "react";
import MenuButton from "./MenuButton";
import NavMenu from "./NavMenu";
import MenuItem from "./MenuItem";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <>
      <div className="flex justify-end w-full p-3 relative">
        <MenuButton onClick={toggleMenu} />
      </div>
      <NavMenu onClose={toggleMenu} open={menuOpen}>
        <MenuItem onClick={() => console.log("Profile")}>Profile</MenuItem>
        <MenuItem onClick={() => console.log("Leader board")}>
          Leader board
        </MenuItem>
        <MenuItem onClick={() => console.log("Help")}>Help</MenuItem>
        <MenuItem onClick={() => console.log("Sign out")}>Sign out</MenuItem>
      </NavMenu>
    </>
  );
}

export default Navbar;
