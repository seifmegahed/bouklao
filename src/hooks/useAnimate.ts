import { useEffect, useRef } from "react";

const SPEED_INCREASE = 0.0001;

const useAnimate = (
  nextAnimationFrameHandler: (delta: number, speedScale: number) => void,
  shouldAnimate = true
) => {
  const frame = useRef(0);
  const speedScale = useRef(1);
  let lastTime: number;

  const animate = () => {
    if (lastTime === undefined) {
      lastTime = frame.current;
    } else {
      speedScale.current = speedScale.current + SPEED_INCREASE;
      nextAnimationFrameHandler(frame.current - lastTime, speedScale.current);
      lastTime = frame.current;
    }
    frame.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    // start or continue animation in case of shouldAnimate if true
    if (shouldAnimate) {
      frame.current = requestAnimationFrame(animate);
    } else {
      // stop animation
      cancelAnimationFrame(frame.current);
      speedScale.current = 1;
    }

    return () => cancelAnimationFrame(frame.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldAnimate]);
};

export default useAnimate;
