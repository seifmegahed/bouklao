import { MovingBackgroundType } from "@/pages/game/components/MovingBackground/types";

// World
export const WORLD_WIDTH = 100;
export const WORLD_HEIGHT = 30;
export const MAX_WORLD_SCALE = 10;

// Game
export const BASE_SPEED = 0.05;
export const SPEED_SCALE_INCREASE = 0.00001;

// Player
export const PLAYER_FRAME_TIME = 80;

export const GRAVITY = 0.0015;
export const JUMP_SPEED = 0.45;

// Obstacles
export const OBSTACLE_INTERVAL_MIN = 800;
export const OBSTACLE_INTERVAL_MAX = 2000;
export const OUT_OF_BOUNDS = -10;

export const movingBackgrounds: MovingBackgroundType[] = [
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
