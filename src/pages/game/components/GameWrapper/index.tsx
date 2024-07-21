import { useEffect, useState } from "react";
import { getScale, gameSize } from "./functions";
import Overlay from "@/pages/game/components/Overlay";

function GameWrapper({
  children,
  forwardRef,
  overlay,
}: {
  children: React.ReactNode;
  forwardRef: React.RefObject<HTMLDivElement>;
  overlay: boolean;
}) {
  const [worldScale, setWorldScale] = useState(getScale(window));
  useEffect(() => {
    window.addEventListener("resize", () => setWorldScale(getScale(window)));
    return () =>
      window.removeEventListener("resize", () =>
        setWorldScale(getScale(window))
      );
  }, []);
  return (
    <div
      className="flex items-center justify-center h-full w-full no-select"
      ref={forwardRef}
    >
      <Overlay state={overlay} />
      <div
        className={"relative overflow-hidden no-select"}
        style={gameSize(worldScale)}
      >
        {children}
      </div>
    </div>
  );
}

export default GameWrapper;
