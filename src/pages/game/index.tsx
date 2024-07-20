import { useLayoutEffect, useRef, useState } from "react";

import GameWrapper from "./components/GameWrapper";
import ScoreDisplay from "./components/ScoreDisplay";
import Obstacles from "./components/Obstacles";
import MovingBackgrounds from "./components/MovingBackgrounds";
import Player from "./components/Player";

import { updateBackgrounds } from "./components/MovingBackground/functions";
import { getPlayerFrame } from "./components/functions";
import { checkCollision } from "./components/Player/functions";
import { obstacle_t } from "./components/Obstacle/types";
import {
  getObstacleInterval,
  getRandomObstacle,
  updateObstacles,
} from "./components/Obstacle/functions";

import {
  BASE_SPEED,
  GRAVITY,
  JUMP_SPEED,
  movingBackgrounds,
  playerFrameImages,
  playerLoseImage,
} from "./data";

const SPEED_SCALE_INCREASE = 0.00001;

function Game() {
  const [backgrounds, setBackgrounds] = useState(movingBackgrounds);
  const [playerFrame, setPlayerFrame] = useState(playerFrameImages[0]);
  const [obstacles, setObstacles] = useState<obstacle_t[]>([]);
  const [playerPosition, setPlayerPosition] = useState(0);
  const [score, setScore] = useState(0);
  const [overlay, setOverlay] = useState(false);

  const lastTime = useRef(0);
  const yVelocity = useRef(0);
  const playerJumping = useRef(false);
  const delta = useRef(0);
  const animationRef = useRef<number | null>(null);
  const gameState = useRef(false);
  const speedScale = useRef(1);
  const nextObstacleInterval = useRef(getObstacleInterval(speedScale.current));

  const obstaclesRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const playerProps = {
    image: playerFrame,
    position: playerPosition,
    forwardRef: playerRef,
  };

  useLayoutEffect(() => {
    const container = containerRef.current;

    const update = (time: number) => {
      delta.current = time - lastTime.current;
      if (lastTime.current === 0) {
        lastTime.current = time;
        animationRef.current = requestAnimationFrame(update);
        return;
      }

      setScore((prev) => prev + delta.current * 0.01);
      speedScale.current =
        speedScale.current + SPEED_SCALE_INCREASE * delta.current;

      if (!gameState.current) return;

      setBackgrounds((prev) =>
        updateBackgrounds(prev, delta.current, speedScale.current)
      );

      setObstacles((prev) =>
        updateObstacles(prev, delta.current, BASE_SPEED * speedScale.current)
      );

      if (nextObstacleInterval.current < 0) {
        setObstacles((prev) => [...prev, getRandomObstacle()]);
        nextObstacleInterval.current = getObstacleInterval(speedScale.current);
      } else
        nextObstacleInterval.current =
          nextObstacleInterval.current - delta.current;

      setPlayerFrame(
        getPlayerFrame(delta.current, playerJumping.current, speedScale.current)
      );

      if (playerJumping.current) {
        yVelocity.current = yVelocity.current - GRAVITY * delta.current;
        // console.log("playerJumping", yVelocity.current);
        delta.current = delta.current + 1;
        setPlayerPosition((_prevPosition) => {
          const factor = _prevPosition + yVelocity.current * delta.current;
          if (factor <= 0) {
            playerJumping.current = false;
            return 0;
          }
          return factor;
        });
      }

      if (checkCollision(obstaclesRef, playerRef)) {
        setPlayerFrame(playerLoseImage);
        gameState.current = false;
        setOverlay(true);
        window.removeEventListener("keydown", handleKey);
        container?.removeEventListener("touchstart", handleTouch);
        setTimeout(() => {
          container?.addEventListener("touchstart", handleTouch, {
            once: true,
          });
          window.addEventListener("keydown", handleKey, { once: true });
        }, 300);
      }

      lastTime.current = time;
      animationRef.current = requestAnimationFrame(update);
    };

    const handleStart = () => {
      setScore(0);
      setOverlay(false);
      gameState.current = true;
      speedScale.current = 1;
      lastTime.current = 0;
      setObstacles([]);
      setPlayerPosition(0);
      animationRef.current = requestAnimationFrame(update);
      container?.addEventListener("touchstart", handleTouch);
      window.addEventListener("keydown", handleKey);
    };

    const handleControl = () => {
      if (playerJumping.current) return;
      yVelocity.current = JUMP_SPEED;
      playerJumping.current = true;
    };

    const handleTouch = () => {
      if (gameState.current) handleControl();
      else handleStart();
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.code !== "Space") {
        if (!gameState.current)
          window.addEventListener("keydown", handleKey, { once: true });
        return;
      }
      if (gameState.current) handleControl();
      else handleStart();
    };

    container?.addEventListener("touchstart", handleTouch, { once: true });
    window.addEventListener("keydown", handleKey, { once: true });

    animationRef.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("keydown", handleKey);
      container?.removeEventListener("touchstart", handleTouch);
      if (animationRef.current !== null)
        cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="h-full" ref={containerRef}>
      {overlay && (
        <div className="absolute top-0 left-0 w-full h-full bg-pink-500/50 z-20 flex items-center justify-center text-white font-bold text-3xl">
          <p>Press to Start</p>
        </div>
      )}
      <GameWrapper onTouch={() => console.log("touch")}>
        <ScoreDisplay score={score} state={overlay} />
        <Obstacles obstacles={obstacles} forwardRef={obstaclesRef} />
        <MovingBackgrounds items={backgrounds} />
        <Player {...playerProps} />
      </GameWrapper>
    </div>
  );
}

export default Game;
