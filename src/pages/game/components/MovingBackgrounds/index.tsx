import MovingBackground from "../MovingBackground";
import { MovingBackgroundType } from "../MovingBackground/types";

function MovingBackgrounds(props: { items: MovingBackgroundType[] }) {
  const { items } = props;
  return (
    <>
      {items.map((item) => (
        <MovingBackground key={item.image} {...item} />
      ))}
    </>
  );
}

export default MovingBackgrounds;
