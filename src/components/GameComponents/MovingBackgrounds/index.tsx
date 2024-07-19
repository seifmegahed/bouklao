import MovingBackground2 from "../MovingBackground";
import { MovingBackground2Type } from "../MovingBackground/types";

function MovingBackgrounds(props: { items: MovingBackground2Type[] }) {
  const { items } = props;
  return (
    <>
      {items.map((item) => (
        <MovingBackground2 key={item.image} {...item} />
      ))}
    </>
  );
}

export default MovingBackgrounds;
