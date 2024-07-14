import { RefObject, useEffect, useState } from "react";
import useAnimate from "../hooks/useAnimate";

const OBSTACLE_INTERVAL_MIN = 450;
const OBSTACLE_INTERVAL_MAX = 500;
const OUT_OF_BOUNDS = -10;

type obstacle_t = {
  image: string;
  position: number;
};

function randomNumberBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function Obstacles(props: {
  obstacleImages: string[];
  speed: number;
  gameState: boolean;
  obstaclesRef: RefObject<HTMLDivElement>;
}) {
  const { gameState } = props;
  const [currentObstacles, setCurrentObstacles] = useState<obstacle_t[]>([]);

  let nextObstacleInterval = randomNumberBetween(
    OBSTACLE_INTERVAL_MIN,
    OBSTACLE_INTERVAL_MAX
  );

  const updateObstacles = (delta: number, speedScale: number) => {
    setCurrentObstacles((prev) => {
      const newObstacles: obstacle_t[] = [];

      for (let i = 0; i < prev.length; i++) {
        const obstacle = prev[i];
        obstacle.position -= (delta * (props.speed * speedScale)) / 2;
        if (obstacle.position > OUT_OF_BOUNDS) newObstacles.push(obstacle);
      }

      if (nextObstacleInterval <= 0) {
        newObstacles.push({
          image:
            props.obstacleImages[
              randomNumberBetween(0, props.obstacleImages.length - 1)
            ],
          position: 100,
        });
        nextObstacleInterval = randomNumberBetween(
          OBSTACLE_INTERVAL_MIN,
          OBSTACLE_INTERVAL_MAX
        );
      }
      nextObstacleInterval -= delta;
      return newObstacles;
    });
  };

  useAnimate(updateObstacles, gameState);

  useEffect(() => {
    if (gameState) {
      setCurrentObstacles([]);
    }
  }, [gameState]);

  return (
    <div ref={props.obstaclesRef}>
      {currentObstacles.map((obstacle, index) => (
        <img
          key={obstacle.image + index}
          src={obstacle.image}
          className="absolute z-10 h-[25%] bottom-[4%] border border-black"
          style={{ left: `${obstacle.position}%` }}
        />
      ))}
    </div>
  );
}

export default Obstacles;
