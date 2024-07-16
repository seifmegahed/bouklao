import { useEffect, useState } from "react";
import { getScale, gameSize } from "../utils/gameScreen";

function GameWrapper({ children }: { children: React.ReactNode }) {
  const [worldScale, setWorldScale] = useState(getScale(window));
  useEffect(() => {
    window.addEventListener("resize", () => setWorldScale(getScale(window)));
    return () =>
      window.removeEventListener("resize", () =>
        setWorldScale(getScale(window))
      );
  }, []);
  return (
    <div className={"relative overflow-hidden"} style={gameSize(worldScale)}>
      {children}
    </div>
  );
}

export default GameWrapper;
