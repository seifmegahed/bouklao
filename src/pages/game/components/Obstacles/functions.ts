import { OUT_OF_BOUNDS } from "@/pages/game/data";
import { obstacle_t } from "@/pages/game/components/Obstacle/types";

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
    .filter((obstacle) => obstacle.position > OUT_OF_BOUNDS);
