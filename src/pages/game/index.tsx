import { useEffect, useRef, useState } from "react";
import MovingBackground from "../../components/MovingBackground";
import Player from "../../components/Player";
import Obstacles from "../../components/Obstacles";
import useAnimate from "../../hooks/useAnimate";

const BASE_SPEED = 0.15;
const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;

const movingBackgrounds = [
  { image: "images/clouds.png", speed: BASE_SPEED / 4, offset: "10%" },
  { image: "images/buildings.png", speed: BASE_SPEED / 2, offset: "10%" },
  { image: "images/ground.png", speed: BASE_SPEED, offset: "0" },
];

function isCollision(rect1: DOMRect, rect2: DOMRect) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  );
}

function Game() {
  const [gameState, setGameState] = useState(false);
  const [lose, setLose] = useState(false);
  const obstaclesRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLImageElement>(null);
  const [worldToPixelScale, setWorldToPixelScale] = useState(
    window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT
      ? window.innerWidth / WORLD_WIDTH
      : window.innerHeight / WORLD_HEIGHT
  );

  const setWorldScale = () =>
    window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT
      ? setWorldToPixelScale(window.innerWidth / WORLD_WIDTH)
      : setWorldToPixelScale(window.innerHeight / WORLD_HEIGHT);

  const updateGame = () => {
    if (obstaclesRef?.current?.children && playerRef?.current) {
      [...obstaclesRef.current.children].forEach((child) => {
        if (
          isCollision(
            child.getBoundingClientRect(),
            playerRef.current!.getBoundingClientRect()
          )
        ) {
          setLose(true);
          setGameState(false);
        }
      });
    }
  };

  useEffect(() => {
    window.addEventListener("resize", setWorldScale);
    return () => window.removeEventListener("resize", setWorldScale);
  }, []);

  useAnimate(updateGame);

  return (
    <div
      className={"relative overflow-hidden"}
      style={{
        height: `${worldToPixelScale * WORLD_HEIGHT}px`,
        width: `${worldToPixelScale * WORLD_WIDTH}px`,
      }}
    >
      <button
        className="absolute top-0 right-0 z-30 rounded-md bg-red-500 px-4 py-2 text-white"
        onClick={() => {
          setGameState(!gameState);
          setLose(false);
        }}
      >
        {gameState ? "Pause" : "Resume"}
      </button>
      <Player
        lose={lose}
        speed={BASE_SPEED}
        gameState={gameState}
        playerRef={playerRef}
      />
      <Obstacles
        obstacleImages={[
          "images/bottle1.png",
          "images/bottle2.png",
          "images/bottle3.png",
        ]}
        gameState={gameState}
        speed={BASE_SPEED}
        obstaclesRef={obstaclesRef}
      />
      {movingBackgrounds.map((item, index) => (
        <MovingBackground
          key={item.image}
          gameState={gameState}
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
