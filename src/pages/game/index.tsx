import { useEffect, useState } from "react";
import MovingBackground from "../../components/MovingBackground";

const movingBackgrounds = [
  { image: "images/ground.png", speed: 0.2, offset: "0" },
  { image: "images/buildings.png", speed: 0.1, offset: "10%" },
  { image: "images/clouds.png", speed: 0.05, offset: "10%" },
];

const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;

function Game() {
  const [worldToPixelScale, setWorldToPixelScale] = useState(
    window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT
      ? window.innerWidth / WORLD_WIDTH
      : window.innerHeight / WORLD_HEIGHT
  );

  const setWorldScale = () =>
    window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT
      ? setWorldToPixelScale(window.innerWidth / WORLD_WIDTH)
      : setWorldToPixelScale(window.innerHeight / WORLD_HEIGHT);

  useEffect(() => {
    window.addEventListener("resize", setWorldScale);
    return () => window.removeEventListener("resize", setWorldScale);
  }, []);

  return (
    <div
      className={"relative overflow-hidden"}
      style={{
        height: `${worldToPixelScale * WORLD_HEIGHT}px`,
        width: `${worldToPixelScale * WORLD_WIDTH}px`,
      }}
    >
      {movingBackgrounds.map((item) => (
        <MovingBackground
          key={item.image}
          speed={item.speed}
          imageURL={item.image}
          bottomOffset={item.offset}
        />
      ))}
    </div>
  );
}

export default Game;
