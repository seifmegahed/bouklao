export const WORLD_WIDTH = 100;
export const WORLD_HEIGHT = 30;
export const MAX_WORLD_SCALE = 10;

export const BASE_SPEED = 0.15;

// Player
export const PLAYER_FRAME_TIME = 4;
export const GRAVITY = 0.01;
export const JUMP_SPEED = 1.1;

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
