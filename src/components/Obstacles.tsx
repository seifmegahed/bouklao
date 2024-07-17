import { RefObject, useEffect, useState } from "react";
import useAnimate from "../hooks/useAnimate";
import {
  getNextObstacleInterval,
  getRandomObstacle,
} from "../utils/gameFunctions";
import { BASE_SPEED, obstacle_t, OUT_OF_BOUNDS } from "../pages/game/gameData";

function Obstacles(props: {
  gameState: boolean;
  obstaclesRef: RefObject<HTMLDivElement>;
}) {
  const { gameState, obstaclesRef } = props;
  const [currentObstacles, setCurrentObstacles] = useState<obstacle_t[]>([]);
  const [, setNextObstacleInterval] = useState(getNextObstacleInterval());

  const updateObstacles = (delta: number, speedScale: number) => {
    setCurrentObstacles((prev) =>
      prev
        .map((obstacle) => ({
          ...obstacle,
          position: obstacle.position - delta * BASE_SPEED * speedScale,
        }))
        .filter((obstacle) => obstacle.position > OUT_OF_BOUNDS)
    );
    setNextObstacleInterval((prev) => {
      if (prev > 0) return prev - delta;
      setCurrentObstacles((prev) => [...prev, getRandomObstacle()]);
      return getNextObstacleInterval();
    });
  };

  useEffect(() => {
    if (gameState) {
      setCurrentObstacles([]);
    }
  }, [gameState]);

  useAnimate(updateObstacles, gameState);

  return (
    <div ref={obstaclesRef}>
      {currentObstacles.map((obstacle, index) => (
        <img
          key={obstacle.image + index}
          src={obstacle.image}
          className="absolute z-10 h-[25%] bottom-[4%]"
          style={{ left: `${obstacle.position}%` }}
        />
      ))}
    </div>
  );
}

export default Obstacles;
