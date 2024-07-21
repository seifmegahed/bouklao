import MenuIcon from "../../icons/MenuIcon";

function MenuButton({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="p-3 cursor-pointer hover:bg-white/80 bg-white/40 rounded-full z-40"
      onClick={onClick}
    >
      <MenuIcon />
    </div>
  );
}

export default MenuButton;
