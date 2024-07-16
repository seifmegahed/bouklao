import { UserData } from "../context/authContext";
import {
  PLAYER_FRAME_TIME,
  playerFrameImages,
  playerJumpingImage,
} from "../pages/game/gameData";
import { updateUserScore } from "./firestore";

export const isCollision = (rect1: DOMRect, rect2: DOMRect) =>
  rect1.left < rect2.right &&
  rect1.top < rect2.bottom &&
  rect1.right > rect2.left &&
  rect1.bottom > rect2.top;

export function getTopScore(localStorage: Storage, user: UserData | null) {
  if (user === null) return Number(localStorage.getItem("topScore") || 0);
  return user.score;
}

export async function updateTopScore(
  localStorage: Storage,
  user: UserData | null,
  score: number
) {
  localStorage.setItem("topScore", score.toString());
  if (user === null) return score;
  return await updateUserScore(user.uid, score);
}

let currentFrameTime = 0;
let playerCurrentFrame = 0;

export function getPlayerFrame(
  delta: number,
  jumping: boolean,
  speedScale: number,
  speed: number
) {
  if (jumping) return playerJumpingImage;

  if (currentFrameTime >= PLAYER_FRAME_TIME * speedScale) {
    playerCurrentFrame = (playerCurrentFrame + 1) % playerFrameImages.length;
    currentFrameTime -= PLAYER_FRAME_TIME;
    return playerFrameImages[playerCurrentFrame];
  }

  currentFrameTime += delta * speed;
  return playerFrameImages[playerCurrentFrame];
}
