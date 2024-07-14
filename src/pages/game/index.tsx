import { useEffect, useRef, useState } from "react";
import MovingBackground from "../../components/MovingBackground";
import Player from "../../components/Player";
import Obstacles from "../../components/Obstacles";
import useAnimate from "../../hooks/useAnimate";

const BASE_SPEED = 0.15;
const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;

const MAX_WORLD_SCALE = 10;

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
  const [gameState, setGameState] = useState(true);
  const [lose, setLose] = useState(false);
  const obstaclesRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
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

  const startGame = (event: KeyboardEvent) => {
    if (event.code === "Space") {
      setGameState(!gameState);
      setLose(false);
    } else {
      window.addEventListener("keyup", startGame, { once: true });
    }
  };

  useEffect(() => {
    if (!gameState)
      setTimeout(() => {
        window.addEventListener("keyup", startGame, { once: true });
      }, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState]);

  useAnimate(updateGame);

  return (
    <div
      className={"relative overflow-hidden"}
      style={{
        height: `${
          (worldToPixelScale > MAX_WORLD_SCALE
            ? MAX_WORLD_SCALE
            : worldToPixelScale) * WORLD_HEIGHT
        }px`,
        width: `${
          (worldToPixelScale > MAX_WORLD_SCALE
            ? MAX_WORLD_SCALE
            : worldToPixelScale) * WORLD_WIDTH
        }px`,
      }}
    >
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
