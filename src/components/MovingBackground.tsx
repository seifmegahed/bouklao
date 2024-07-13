import { useEffect, useState } from "react";

function MovingBackground(props: {
  delta: number;
  speed: number;
  imageURL: string;
  bottomOffset: string;
}) {
  const [framePositions, setFramePositions] = useState([0, 300]);

  useEffect(() => {
    const factor = props.delta * props.speed * -1;
    setFramePositions((prev) =>
      prev.map((position) =>
        position <= -300 ? position + 600 + factor : position + factor
      )
    );
  }, [props.delta, props.speed]);

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
