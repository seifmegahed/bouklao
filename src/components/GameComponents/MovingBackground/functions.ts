import { MovingBackground2Type } from "./types";

export const updateBackgrounds = (
  items: MovingBackground2Type[],
  delta: number,
  scale: number
) =>
  items.map((item) => ({
    ...item,
    position0:
      item.position0 < -300
        ? item.position0 + 600 - delta * item.speed * scale
        : item.position0 - delta * item.speed * scale,
    position1:
      item.position1 < -300
        ? item.position1 + 600 - delta * item.speed * scale
        : item.position1 - delta * item.speed * scale,
  }));
