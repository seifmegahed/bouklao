import {
  OBSTACLE_INTERVAL_MAX,
  OBSTACLE_INTERVAL_MIN,
  obstacleImages,
} from "../../data";
import { randomNumberBetween } from "../functions";
import { obstacle_t } from "./types";

export const updateObstacles = (
  obstacles: obstacle_t[],
  delta: number,
  speedScale: number
): obstacle_t[] =>
  obstacles
    .map((obstacle) => ({
      ...obstacle,
      position: obstacle.position - delta * speedScale,
    }))
    .filter((obstacle) => obstacle.position > -10);

export const getObstacleInterval = (speedScale: number) =>
  randomNumberBetween(OBSTACLE_INTERVAL_MIN, OBSTACLE_INTERVAL_MAX) /
  speedScale;

export const getRandomObstacle = () => ({
  image: obstacleImages[randomNumberBetween(0, obstacleImages.length - 1)],
  position: 100,
});
