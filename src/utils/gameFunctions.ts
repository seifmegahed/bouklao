import { UserData } from "../context/authContext";
import {
  OBSTACLE_INTERVAL_MAX,
  OBSTACLE_INTERVAL_MIN,
  obstacle_t,
  obstacleImages,
  OUT_OF_BOUNDS,
  PLAYER_FRAME_TIME,
  playerFrameImages,
  playerJumpingImage,
} from "../pages/game/gameData";
import { updateUserScore } from "./firestore";

export const randomNumberBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);


/**
 * 
 *  Game
 */

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

/**
 * 
 *  Player
 */

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

/**
 * 
 *  Obstacles
 */

export const getNextObstacleInterval = () =>
  randomNumberBetween(OBSTACLE_INTERVAL_MIN, OBSTACLE_INTERVAL_MAX);

export const getRandomObstacle = () => ({
  image: obstacleImages[randomNumberBetween(0, obstacleImages.length - 1)],
  position: 100,
});

export const removeOutOfBoundsObstacles = (obstacles: obstacle_t[]) => {
  const newObstacles: obstacle_t[] = [];
  for (let i = 0; i < obstacles.length; i++) {
    const obstacle = obstacles[i];
    if (obstacle.position > OUT_OF_BOUNDS) newObstacles.push(obstacle);
  }
  return newObstacles;
};

export const updateObstaclePositions = (
  delta: number,
  obstacles: obstacle_t[]
) => {
  const newObstacles: obstacle_t[] = [];
  for (let i = 0; i < obstacles.length; i++) {
    const obstacle = obstacles[i];
    obstacle.position -= delta / 2;
    newObstacles.push(obstacle);
  }
  return newObstacles;
};
