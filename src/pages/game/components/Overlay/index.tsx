function Overlay(state: { state: boolean }) {
  if (!state.state) return null;
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-[#FEAEB0]/50 z-20 flex items-center justify-center text-white font-bold text-3xl">
      <p>Press to Start</p>
    </div>
  );
}

export default Overlay;
