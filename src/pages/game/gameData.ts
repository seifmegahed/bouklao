// World
export const WORLD_WIDTH = 100;
export const WORLD_HEIGHT = 30;
export const MAX_WORLD_SCALE = 10;

// Game
export const BASE_SPEED = 0.15;
// export const BASE_SPEED = 0.4;

// Player
export const PLAYER_FRAME_TIME = 8;
// export const GRAVITY = 0.01;

// export const JUMP_SPEED = 1.1;
export const GRAVITY = 0.015;
export const JUMP_SPEED = 8;

// Obstacles
// export const OBSTACLE_INTERVAL_MIN = 30 / BASE_SPEED;
// export const OBSTACLE_INTERVAL_MAX = 120 / BASE_SPEED;
export const OBSTACLE_INTERVAL_MIN = 400;
export const OBSTACLE_INTERVAL_MAX = 2000;
export const OUT_OF_BOUNDS = -10;

export type obstacle_t = {
  image: string;
  position: number;
};

export type MovingBackgroundItemType = {
  image: string;
  speed: number;
  offset: string;
  zIndex: number;
};

export const movingBackgrounds: MovingBackgroundItemType[] = [
  {
    image: "images/clouds.png",
    speed: BASE_SPEED / 4,
    offset: "10%",
    zIndex: 0,
  },
  {
    image: "images/buildings.png",
    speed: BASE_SPEED / 2,
    offset: "10%",
    zIndex: 1,
  },
  { image: "images/ground.png", speed: BASE_SPEED, offset: "0", zIndex: 2 },
];

export type MovingBackground2Type = {
  image: string;
  position0: number;
  position1: number;
  speed: number;
  offset: string;
  zIndex: number;
};

export const movingBackgrounds2: MovingBackground2Type[] = [
  {
    image: "images/clouds.png",
    speed: BASE_SPEED / 4,
    offset: "10%",
    position0: 0,
    position1: 300,
    zIndex: 0,
  },
  {
    image: "images/buildings.png",
    speed: BASE_SPEED / 2,
    offset: "10%",
    position0: 0,
    position1: 300,
    zIndex: 1,
  },
  {
    image: "images/ground.png",
    speed: BASE_SPEED,
    offset: "0%",
    position0: 0,
    position1: 300,
    zIndex: 2,
  },
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
