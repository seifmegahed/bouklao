import { RefObject, useEffect, useState } from "react";
import useAnimate from "../hooks/useAnimate";
import {
  BASE_SPEED,
  GRAVITY,
  JUMP_SPEED,
  playerFrameImages,
  playerLoseImage,
} from "../pages/game/gameData";
import { getPlayerFrame } from "../utils/gameFunctions";

// import React from "react";
// const Image = React.memo(
//   (props: {
//     src: string;
//     className: string;
//     style: { [key: string]: string };
//   }) => <img {...props} />
// );

function Player(props: {
  lose: boolean;
  gameState: boolean;
  playerRef: RefObject<HTMLDivElement>;
}) {
  const { lose, gameState } = props;

  let isJumping = false;
  let yVelocity = 0;

  const [playerPosition, setPlayerPosition] = useState(2);
  const [currentFrame, setCurrentFrame] = useState(playerFrameImages[0]);

  const handleTouch = () => {
    if (isJumping) return;
    yVelocity = JUMP_SPEED;
    isJumping = true;
  };

  const handleKey = (e: KeyboardEvent) => {
    if (e.code !== ("Space" || "ArrowUp") || isJumping) return;
    yVelocity = JUMP_SPEED;
    isJumping = true;
  };

  useEffect(() => {
    if (lose) setCurrentFrame(playerLoseImage);
  }, [lose]);

  const updatePlayer = (delta: number, speedScale: number) => {
    setCurrentFrame(getPlayerFrame(delta, isJumping, speedScale, BASE_SPEED));
    if (!isJumping) {
      setPlayerPosition(2);
      return;
    }
    yVelocity -= GRAVITY * delta;

    setPlayerPosition((prev) => {
      const factor = prev + yVelocity * delta;
      if (factor <= 0) isJumping = false;
      return factor;
    });
  };

  useEffect(() => {
    setTimeout(() => {
      document.addEventListener("keydown", handleKey);
      document.addEventListener("touchstart", handleTouch);
    }, 200);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("touchstart", handleTouch);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState]);

  useAnimate(updatePlayer, gameState);

  return (
    <>
      <div
        className="absolute left-[4%] z-10 h-[25%] overflow-visible w-[7%]"
        style={{ bottom: `calc(${playerPosition + 2} * 1%)` }}
        ref={props.playerRef}
      ></div>
      <img
        src={currentFrame}
        className="player absolute left-[3%] bottom-0 z-10 h-[40%]"
        style={{ bottom: `calc(${playerPosition + 2} * 1%)` }}
      />
    </>
  );
}

export default Player;
