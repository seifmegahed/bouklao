import { useState } from "react";
import useAnimationFrame from "../hooks/useAnimationFrame";

function MovingBackground(props: {
  speed: number;
  imageURL: string;
  bottomOffset: string;
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

  useAnimationFrame(update, true);

  return (
    <>
      {framePositions.map((position, index) => (
        <img
          key={`ground-${index}`}
          src={props.imageURL}
          className="moving-background"
          style={{ left: `${position}%`, bottom: props.bottomOffset }}
        />
      ))}
    </>
  );
}

export default MovingBackground;
