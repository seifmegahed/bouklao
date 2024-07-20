import { MovingBackgroundType } from "./types";

function MovingBackground(props: MovingBackgroundType) {
  const { image, offset, zIndex, position0, position1 } = props;

  const style0 = {
    left: `${position0}%`,
    bottom: offset,
    zIndex: zIndex,
  };
  const style1 = {
    left: `${position1}%`,
    bottom: offset,
    zIndex: zIndex,
  };

  const tailwindClass = "absolute w-[300%] max-w-[300%]";

  const image0Props = {
    src: image,
    className: tailwindClass,
    style: style0,
  };

  const image1Props = {
    src: image,
    className: tailwindClass,
    style: style1,
  };

  return (
    <>
      <img {...image0Props} />
      <img {...image1Props} />
    </>
  );
}

export default MovingBackground;
