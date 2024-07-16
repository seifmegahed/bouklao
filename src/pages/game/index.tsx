import { useEffect, useRef, useState } from "react";

import GameWrapper from "../../components/GameWrapper";
import ScoreDisplay from "../../components/ScoreDisplay";
import Player from "../../components/Player";
import Obstacles from "../../components/Obstacles";
import MovingBackground from "../../components/MovingBackground";

import useAnimate from "../../hooks/useAnimate";
import { useAuth } from "../../context/authContext";

import {
  getTopScore,
  isCollision,
  updateTopScore,
} from "../../utils/gameFunctions";
import { BASE_SPEED, movingBackgrounds, obstacleImages } from "./gameData";

function Game() {
  const { user } = useAuth();

  const [score, setScore] = useState(0);
  const [lose, setLose] = useState(false);
  const [gameState, setGameState] = useState(false);
  const [topScore, setTopScore] = useState(getTopScore(localStorage, user));

  const obstaclesRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  const updateGame = (delta: number, speedScale: number) => {
    setScore((prev) => prev + (delta * speedScale) / 70.0);

    if (!obstaclesRef?.current?.children || !playerRef?.current) return;
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
  };

  const startGameTouch = () => {
    document.removeEventListener("keyup", startGameKeyboard);
    setGameState(true);
    setLose(false);
  };

  const startGameKeyboard = (event: KeyboardEvent) => {
    if (event.code !== "Space") {
      document.addEventListener("keyup", startGameKeyboard, { once: true });
      return;
    }
    document.removeEventListener("touchend", startGameTouch);
    setGameState(true);
    setLose(false);
  };

  useEffect(() => {
    if (gameState) {
      setScore(0);
      return;
    }

    setTimeout(() => {
      document.addEventListener("keyup", startGameKeyboard, { once: true });
      document.addEventListener("touchstart", startGameTouch, { once: true });
    }, 200);

    if (score < topScore) return;

    updateTopScore(localStorage, user, Math.round(score))
      .then((_score) => {
        setTopScore(_score);
      })
      .catch((error) => {
        console.log(error);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState]);

  useAnimate(updateGame, gameState);

  return (
    <GameWrapper>
      <ScoreDisplay score={score} topScore={topScore} />
      <Player
        lose={lose}
        speed={BASE_SPEED}
        gameState={gameState}
        playerRef={playerRef}
      />
      <Obstacles
        obstacleImages={obstacleImages}
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
    </GameWrapper>
  );
}

export default Game;
