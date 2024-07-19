import { useEffect, useRef } from "react";

const SPEED_INCREASE = 0.0001;

const useAnimate = (
  nextAnimationFrameHandler: (
    delta: number,
    speedScale: number
    // averageDelta: number
  ) => void,
  shouldAnimate = true
) => {
  const speedScale = useRef(1);
  const frame = useRef(0);
  const lastTime = useRef(0);

  const animate = () => {
    if (lastTime.current === 0) lastTime.current = frame.current;
    else {
      speedScale.current = speedScale.current + SPEED_INCREASE;
      nextAnimationFrameHandler(
        frame.current - lastTime.current,
        speedScale.current
      );
      lastTime.current = frame.current;
    }
    frame.current = window.requestAnimationFrame(animate);
  };

  useEffect(() => {
    // start or continue animation in case of shouldAnimate if true
    if (shouldAnimate) {
      frame.current = window.requestAnimationFrame(animate);
    } else {
      // stop animation
      window.cancelAnimationFrame(frame.current);
      speedScale.current = 1;
    }

    return () => window.cancelAnimationFrame(frame.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldAnimate]);
};

export default useAnimate;
