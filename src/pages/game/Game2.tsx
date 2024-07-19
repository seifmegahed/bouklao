import { useLayoutEffect, useRef, useState } from "react";
import {
  BASE_SPEED,
  GRAVITY,
  JUMP_SPEED,
  movingBackgrounds2,
  obstacle_t,
  playerFrameImages,
  playerLoseImage,
} from "../../pages/game/gameData";

import GameWrapper from "../../components/GameWrapper";
import Player from "../../components/GameComponents/Player";
import Obstacles from "../../components/GameComponents/Obstacles";
import MovingBackgrounds from "../../components/GameComponents/MovingBackgrounds";

import { updateBackgrounds } from "../../components/GameComponents/MovingBackground/functions";
import { updateObstacles } from "../../components/GameComponents/Obstacle/functions";
import { checkCollision } from "../../components/GameComponents/Player/functions";
import {
  getNextObstacleInterval,
  getPlayerFrame,
  getRandomObstacle,
} from "../../utils/gameFunctions";

const SPEED_SCALE = 0.5;

function Game2() {
  const [, setNextObstacleInterval] = useState(getNextObstacleInterval());
  const [backgrounds, setBackgrounds] = useState(movingBackgrounds2);
  const [playerFrame, setPlayerFrame] = useState(playerFrameImages[0]);
  const [obstacles, setObstacles] = useState<obstacle_t[]>([]);
  const [playerPosition, setPlayerPosition] = useState(0);
  const [gameState, setGameState] = useState(false);

  const lastTime = useRef(0);
  const yVelocity = useRef(0);
  const playerJumping = useRef(false);
  const obstaclesRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const playerProps = {
    image: playerFrame,
    position: playerPosition,
    forwardRef: playerRef,
  };

  useLayoutEffect(() => {
    let timerId: number;
    gameState && setObstacles([]);

    const handleControl = () => {
      if (!gameState) setGameState(true);
      if (playerJumping.current) return;
      yVelocity.current = JUMP_SPEED;
      playerJumping.current = true;
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.code !== "Space") return;
      handleControl();
    };

    const update = (time: number) => {
      const delta = time - lastTime.current;

      if (!gameState) return;
      if (delta === 0) return;

      setBackgrounds((prev) => updateBackgrounds(prev, delta, SPEED_SCALE));

      setObstacles((prev) =>
        updateObstacles(prev, delta, BASE_SPEED * SPEED_SCALE)
      );

      setNextObstacleInterval((prev) => {
        if (prev > 0) return prev - delta;
        setObstacles((prev) => [...prev, getRandomObstacle()]);
        return getNextObstacleInterval();
      });

      setPlayerFrame(
        getPlayerFrame(delta, playerJumping.current, SPEED_SCALE, BASE_SPEED)
      );

      setPlayerPosition((prev) => {
        if (!playerJumping.current) return 0;
        yVelocity.current -= GRAVITY * delta;
        const factor = prev + yVelocity.current;
        if (factor <= 0) playerJumping.current = false;
        return factor;
      });

      if (checkCollision(obstaclesRef, playerRef)) {
        setPlayerFrame(playerLoseImage);
        setGameState(false);
      }

      lastTime.current = time;
      timerId = requestAnimationFrame(update);
    };

    document.addEventListener("keydown", handleKey);
    containerRef.current?.addEventListener("touchstart", handleControl);
    timerId = requestAnimationFrame(update);

    return () => {
      removeEventListener("keydown", handleKey);
      removeEventListener("touchstart", handleControl);
      cancelAnimationFrame(timerId);
    };
  }, [gameState]);

  return (
    <div ref={containerRef}>
      <GameWrapper onTouch={() => console.log("touch")}>
        <Obstacles obstacles={obstacles} forwardRef={obstaclesRef} />
        <MovingBackgrounds items={backgrounds} />
        <Player {...playerProps} />
      </GameWrapper>
    </div>
  );
}

export default Game2;
