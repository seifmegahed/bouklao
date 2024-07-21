import MenuIcon from "../../icons/MenuIcon";

function MenuButton({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="p-3 cursor-pointer hover:bg-white/80 rounded-full z-40"
      onClick={onClick}
    >
      <MenuIcon size={32} />
    </div>
  );
}

export default MenuButton;
