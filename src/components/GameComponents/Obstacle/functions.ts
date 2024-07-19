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