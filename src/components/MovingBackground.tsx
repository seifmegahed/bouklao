import { useState } from "react";
import useAnimate from "../hooks/useAnimate";

function MovingBackground(props: {
  speed: number;
  imageURL: string;
  bottomOffset: string;
  zIndex?: number;
}) {
  const [framePositions, setFramePositions] = useState([0, 300]);

  const update = (delta: number) => {
    const factor = delta * props.speed * -1;
    setFramePositions((prev) =>
      prev.map((position) =>
        position <= -300 ? position + 600 + factor : position + factor
      )
    );
  };

  useAnimate(update, true);

  return (
    <>
      {framePositions.map((position, index) => (
        <img
          key={`ground-${index}`}
          src={props.imageURL}
          className="moving-background"
          style={{
            left: `${position}%`,
            bottom: props.bottomOffset,
            zIndex: props.zIndex ?? 0,
          }}
        />
      ))}
    </>
  );
}

export default MovingBackground;
