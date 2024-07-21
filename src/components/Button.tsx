import { ReactNode } from "react";

function Button({
  onClick,
  disabled = false,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      className={`${
        disabled ? "bg-gray-300" : "hover:bg-[#FEAEB0] bg-[#FF85A9]"
      } w-48 text-white font-bold py-2 px-4 rounded`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
