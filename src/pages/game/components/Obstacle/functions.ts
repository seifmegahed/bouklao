import {
  OBSTACLE_INTERVAL_MAX,
  OBSTACLE_INTERVAL_MIN,
  obstacleImages,
} from "../../data";

export const randomNumberBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const getObstacleInterval = (speedScale: number) =>
  randomNumberBetween(OBSTACLE_INTERVAL_MIN, OBSTACLE_INTERVAL_MAX) /
  speedScale;

export const getRandomObstacle = () => ({
  image: obstacleImages[randomNumberBetween(0, obstacleImages.length - 1)],
  position: 100,
});
