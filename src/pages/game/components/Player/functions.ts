import { RefObject } from "react";
import {
  PLAYER_FRAME_TIME,
  playerFrameImages,
  playerJumpingImage,
} from "@/pages/game/data";

let currentFrameTime = 0;
let playerCurrentFrame = 0;

export function getPlayerFrame(
  delta: number,
  jumping: boolean,
  speedScale: number
) {
  if (jumping) return playerJumpingImage;

  if (currentFrameTime >= PLAYER_FRAME_TIME * speedScale) {
    playerCurrentFrame = (playerCurrentFrame + 1) % playerFrameImages.length;
    currentFrameTime -= PLAYER_FRAME_TIME;
    return playerFrameImages[playerCurrentFrame];
  }

  currentFrameTime += delta * speedScale;
  return playerFrameImages[playerCurrentFrame];
}

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
