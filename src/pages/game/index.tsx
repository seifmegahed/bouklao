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

  const obstaclesChildren = obstaclesRef?.current?.children;
  const player = playerRef?.current;

  const checkCollision = () => {
    if (!obstaclesChildren || !player) return;
    [...obstaclesChildren].forEach((child) => {
      if (
        !isCollision(
          child.getBoundingClientRect(),
          player.getBoundingClientRect()
        )
      )
        return;
      setGameState(false);
      setLose(true);
    });
  };

  const updateGame = (delta: number, speedScale: number) => {
    setScore((prev) => prev + (delta * speedScale) / 70.0);
    setTimeout(() => checkCollision(), 10);
  };

  const handleTouch = () => {
    if (gameState) return;
    document.removeEventListener("keyup", handleKey);
    setScore(0);
    setLose(false);
    setGameState(true);
  };

  const handleKey = (event: KeyboardEvent) => {
    if (event.code !== "Space") {
      document.addEventListener("keyup", handleKey, { once: true });
      return;
    }
    setScore(0);
    setLose(false);
    setGameState(true);
  };

  useEffect(() => {
    setTimeout(() => {
      document.addEventListener("keyup", handleKey, { once: true });
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

  useEffect(() => {
    setTopScore(getTopScore(localStorage, user));
  }, [user]);

  useAnimate(updateGame, gameState);

  return (
    <GameWrapper onTouch={handleTouch}>
      <ScoreDisplay score={score} topScore={topScore} />
      <Player lose={lose} gameState={gameState} playerRef={playerRef} />
      <Obstacles gameState={gameState} obstaclesRef={obstaclesRef} />
      {movingBackgrounds.map((item) => (
        <MovingBackground key={item.image} item={item} gameState={gameState} />
      ))}
    </GameWrapper>
  );
}

export default Game;
