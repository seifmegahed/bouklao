import { RefObject } from "react";

export const isCollision = (rect1: DOMRect, rect2: DOMRect) =>
  rect1.left < rect2.right &&
  rect1.top < rect2.bottom &&
  rect1.right > rect2.left &&
  rect1.bottom > rect2.top;

export const checkCollision = (
  obstaclesRef: RefObject<HTMLDivElement> | null,
  playerRef: RefObject<HTMLDivElement> | null
) => {
  const obstaclesChildren = obstaclesRef?.current?.children;
  const player = playerRef?.current;

  if (!player || !obstaclesChildren) return false;

  return [...obstaclesChildren].some((obstacle) =>
    isCollision(
      obstacle.getBoundingClientRect(),
      player.getBoundingClientRect()
    )
  );
};
