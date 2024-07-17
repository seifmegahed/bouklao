// World
export const WORLD_WIDTH = 100;
export const WORLD_HEIGHT = 30;
export const MAX_WORLD_SCALE = 10;

// Game
// export const BASE_SPEED = 0.15;
export const BASE_SPEED = 0.15;

// Player
export const PLAYER_FRAME_TIME = 5;
export const GRAVITY = 0.01;
export const JUMP_SPEED = 1.1;

// Obstacles
export const OBSTACLE_INTERVAL_MIN = 60/BASE_SPEED;
export const OBSTACLE_INTERVAL_MAX = 100/BASE_SPEED;
export const OUT_OF_BOUNDS = -10;

export type obstacle_t = {
  image: string;
  position: number;
};

export const movingBackgrounds = [
  { image: "images/clouds.png", speed: BASE_SPEED / 4, offset: "10%" },
  { image: "images/buildings.png", speed: BASE_SPEED / 2, offset: "10%" },
  { image: "images/ground.png", speed: BASE_SPEED, offset: "0" },
];

export const obstacleImages = [
  "images/bottle1.png",
  "images/bottle2.png",
  "images/bottle3.png",
];

export const playerLoseImage = "images/player-lose.png";
export const playerJumpingImage = "images/player-jumping.png";
export const playerFrameImages = [
  "images/player-run-0.png",
  "images/player-run-1.png",
];
