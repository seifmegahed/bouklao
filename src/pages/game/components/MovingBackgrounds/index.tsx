import MovingBackground from "@/pages/game/components/MovingBackground";
import { MovingBackgroundType } from "@/pages/game/components/MovingBackground/types";

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
