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
import { movingBackgrounds } from "./gameData";

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

  const handleTouch = () => {
    document.removeEventListener("keyup", handleKey);
    setGameState(true);
    setLose(false);
  };

  const handleKey = (event: KeyboardEvent) => {
    if (event.code !== "Space") {
      document.addEventListener("keyup", handleKey, { once: true });
      return;
    }
    document.removeEventListener("touchend", handleTouch);
    setGameState(true);
    setLose(false);
  };

  useEffect(() => {
    if (gameState) {
      setScore(0);
      return;
    }

    setTimeout(() => {
      document.addEventListener("keyup", handleKey, { once: true });
      document.addEventListener("touchstart", handleTouch, { once: true });
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
      <Player lose={lose} gameState={gameState} playerRef={playerRef} />
      <Obstacles gameState={gameState} obstaclesRef={obstaclesRef} />
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
