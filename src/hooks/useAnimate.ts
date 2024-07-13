import { useEffect, useRef } from "react";

const useAnimate = (
  nextAnimationFrameHandler: (delta: number) => void,
  shouldAnimate = true
) => {
  const frame = useRef(0);
  let lastTime: number;

  const animate = () => {
    if (lastTime === undefined) {
      lastTime = frame.current;
    } else {
      nextAnimationFrameHandler(frame.current - lastTime);
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
    }

    return () => cancelAnimationFrame(frame.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldAnimate]);
};

export default useAnimate;
