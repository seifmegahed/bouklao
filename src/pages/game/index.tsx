import { useEffect, useState } from "react";
import MovingBackground from "../../components/MovingBackground";
import Player from "./components/Player";
import Obstacles from "../../components/Obstacles";
import useAnimate from "../../hooks/useAnimate";

const BASE_SPEED = 0.15;
const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;
const SPEED_INCREASE = 0.00002;

const movingBackgrounds = [
  { image: "images/clouds.png", speed: BASE_SPEED / 4, offset: "10%" },
  { image: "images/buildings.png", speed: BASE_SPEED / 2, offset: "10%" },
  { image: "images/ground.png", speed: BASE_SPEED, offset: "0" },
];

function Game() {
  let speedScale = 1;
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

  useAnimate(() => (speedScale += SPEED_INCREASE));

  return (
    <div
      className={"relative overflow-hidden"}
      style={{
        height: `${worldToPixelScale * WORLD_HEIGHT}px`,
        width: `${worldToPixelScale * WORLD_WIDTH}px`,
      }}
    >
      <Player lose={false} speed={BASE_SPEED} />
      <Obstacles
        obstacleImages={[
          "images/bottle1.png",
          "images/bottle2.png",
          "images/bottle3.png",
        ]}
        speed={BASE_SPEED}
      />
      {movingBackgrounds.map((item, index) => (
        <MovingBackground
          key={item.image}
          speed={item.speed}
          imageURL={item.image}
          bottomOffset={item.offset}
          zIndex={index}
        />
      ))}
    </div>
  );
}

export default Game;
