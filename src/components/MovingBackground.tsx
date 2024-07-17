import { useState } from "react";
import useAnimate from "../hooks/useAnimate";
import { MovingBackgroundItemType } from "../pages/game/gameData";

function MovingBackground(props: {
  item: MovingBackgroundItemType;
  gameState: boolean;
}) {
  const [framePositions, setFramePositions] = useState([0, 300]);
  const { image, speed, offset, zIndex } = props.item;
  const update = (delta: number, speedScale: number) => {
    const factor = delta * speed * speedScale;
    setFramePositions((prev) =>
      prev.map((position) =>
        position <= -300 ? position + 600 - factor : position - factor
      )
    );
  };

  useAnimate(update, props.gameState);

  return (
    <>
      {framePositions.map((position, index) => (
        <img
          key={`ground-${index}`}
          src={image}
          className="moving-background"
          style={{
            left: `${position}%`,
            bottom: offset,
            zIndex: zIndex,
          }}
        />
      ))}
    </>
  );
}

export default MovingBackground;
