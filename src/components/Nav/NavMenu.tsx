import { ReactNode } from "react";
import ArrowRightIcon from "../../icons/ArrowRightIcon";
import MenuItem from "./MenuItem";

function NavMenu({
  onClose,
  open,
  children,
}: {
  onClose: () => void;
  open: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={`absolute flex justify-end right-0 w-full h-screen z-40 origin-top-right duration-300 ease-in-out ${
        !open &&
        "sm:-translate-y-full sm:-translate-x-0 translate-x-full sm:scale-0"
      }`}
    >
      <div className="w-full h-full sm:block hidden" onClick={onClose}></div>
      <div className="absolute flex right-0 flex-col justify-between w-full h-screen bg-white overflow-hidden sm:rounded-xl sm:h-fit sm:w-60 sm:mt-16 sm:mr-3 z-50">
        <MenuItem onClick={onClose} className="sm:hidden">
          <div className="flex justify-end w-full">
            <ArrowRightIcon />
          </div>
        </MenuItem>
        {children}
        <div className="flex-grow sm:hidden"></div>
      </div>
    </div>
  );
}

export default NavMenu;