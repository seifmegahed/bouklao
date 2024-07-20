import { MAX_WORLD_SCALE, WORLD_HEIGHT, WORLD_WIDTH } from "../../data";

const getGameHeight = (scale: number) =>
  (scale > MAX_WORLD_SCALE ? MAX_WORLD_SCALE : scale) * WORLD_HEIGHT + "px";

const getGameWidth = (scale: number) =>
  (scale > MAX_WORLD_SCALE ? MAX_WORLD_SCALE : scale) * WORLD_WIDTH + "px";

export const gameSize = (scale: number) => ({
  height: getGameHeight(scale),
  width: getGameWidth(scale),
});

export const getScale = (window: Window) =>
  window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT
    ? window.innerWidth / WORLD_WIDTH
    : window.innerHeight / WORLD_HEIGHT;
