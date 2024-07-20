import { obstacle_t } from "./types";

function Obstacle(props: obstacle_t) {
  const { image, position } = props;

  const style = {
    left: `${position}%`,
    zIndex: 11,
  };

  const tailwindClass = "absolute h-[25%] bottom-[4%]";

  const imageProps = {
    src: image,
    className: tailwindClass,
    style: style,
  };

  return <img {...imageProps} />;
}

export default Obstacle;
