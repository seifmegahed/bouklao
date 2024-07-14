import { useEffect, useState } from "react";
import useAnimate from "../../../hooks/useAnimate";

const playerLoseImage = "images/player-lose.png";
const playerJumpingImage = "images/player-jumping.png";
const playerFrameImages = [
  "images/player-run-0.png",
  "images/player-run-1.png",
];
const FRAME_TIME = 4;

const GRAVITY = 0.01;
const JUMP_SPEED = 1.1;

function Player(props: { speed: number; lose: boolean }) {
  const { speed, lose } = props;

  let currentFrameTime = 0;
  let playerCurrentFrame = 0;
  let isJumping = false;
  let yVelocity = 0;

  const [playerPosition, setPlayerPosition] = useState(2);
  const [currentFrame, setCurrentFrame] = useState(
    playerFrameImages[playerCurrentFrame]
  );

  const handleTouch = () => {
    if (!isJumping) {
      yVelocity = JUMP_SPEED;
      isJumping = true;
    }
  };

  const handleKey = (e: KeyboardEvent) => {
    if (e.code === ("Space" || "ArrowUp") && !isJumping) {
      yVelocity = JUMP_SPEED;
      isJumping = true;
    }
  };

  const updatePlayer = (delta: number) => {
    if (isJumping) {
      setCurrentFrame(playerJumpingImage);
      yVelocity -= GRAVITY * delta;

      setPlayerPosition((prev) => {
        let factor = prev + yVelocity * delta;
        if (factor <= 0) {
          yVelocity = 0;
          isJumping = false;
          factor = 0;
        }
        return factor;
      });

      return;
    }

    if (lose) {
      setCurrentFrame(playerLoseImage);
      return;
    }

    setPlayerPosition(2);
    if (currentFrameTime >= FRAME_TIME) {
      playerCurrentFrame = (playerCurrentFrame + 1) % playerFrameImages.length;
      setCurrentFrame(playerFrameImages[playerCurrentFrame]);
      currentFrameTime -= FRAME_TIME;
    }
    currentFrameTime += delta * speed;
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.addEventListener("touchstart", handleTouch);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("touchstart", handleTouch);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useAnimate(updatePlayer);

  return (
    <img
      src={currentFrame}
      className="player absolute left-6 bottom-0 z-10 h-[50%]"
      style={{ bottom: `calc(${playerPosition + 2} * 1%)` }}
    />
  );
}

export default Player;
