import { RefObject, useEffect, useState } from "react";
import useAnimate from "../hooks/useAnimate";
import {
  getNextObstacleInterval,
  getRandomObstacle,
  removeOutOfBoundsObstacles,
  updateObstaclePositions,
} from "../utils/gameFunctions";
import { BASE_SPEED, obstacle_t } from "../pages/game/gameData";

let nextObstacleInterval = getNextObstacleInterval();

function Obstacles(props: {
  gameState: boolean;
  obstaclesRef: RefObject<HTMLDivElement>;
}) {
  const { gameState, obstaclesRef } = props;
  const [currentObstacles, setCurrentObstacles] = useState<obstacle_t[]>([]);

  const updateObstacles = (delta: number, speedScale: number) =>
    setCurrentObstacles((prev) => {
      const newObstacles = removeOutOfBoundsObstacles(
        updateObstaclePositions(delta * BASE_SPEED * speedScale, prev)
      );
      if (nextObstacleInterval <= 0) {
        newObstacles.push(getRandomObstacle());
        nextObstacleInterval = getNextObstacleInterval();
      }
      nextObstacleInterval -= delta;
      return newObstacles;
    });

  useEffect(() => {
    if (gameState) {
      setCurrentObstacles([]);
    }
  }, [gameState]);

  useAnimate(updateObstacles, gameState);

  return (
    <>
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
    </>
  );
}

export default Obstacles;
