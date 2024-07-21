import { ForwardedRef } from "react";
import { obstacle_t } from "@/pages/game/components/Obstacle/types";
import Obstacle from "@/pages/game/components/Obstacle";

function Obstacles(props: {
  obstacles: obstacle_t[];
  forwardRef: ForwardedRef<HTMLDivElement>;
}) {
  const { obstacles, forwardRef } = props;
  return (
    <div ref={forwardRef}>
      {obstacles.map((item, index) => (
        <Obstacle key={item.image + index} {...item} />
      ))}
    </div>
  );
}

export default Obstacles;
