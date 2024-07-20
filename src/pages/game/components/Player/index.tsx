import { ForwardedRef } from "react";

function Player(props: {
  image: string;
  position: number;
  forwardRef: ForwardedRef<HTMLDivElement>;
}) {
  const { image, position, forwardRef } = props;

  return (
    <>
      <div
        className="absolute left-[4.5%] z-10 h-[25%] overflow-visible w-[6%]"
        style={{ bottom: `${position + 4}%` }}
        ref={forwardRef}
      ></div>
      <img
        src={image}
        className="absolute z-10 h-[40%] left-[3%]"
        style={{ bottom: `${position + 4}%` }}
      />
    </>
  );
}

export default Player;
