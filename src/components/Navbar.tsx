function Navbar() {
  return (
    <div className="flex justify-end w-screen">
      <div className="flex">
        <div className="p-5 text-xl hover:bg-black/10 cursor-pointer">Game</div>
        <div className="p-5 text-xl hover:bg-black/10 cursor-pointer">Score Board</div>
      </div>
    </div>
  );
}

export default Navbar;
