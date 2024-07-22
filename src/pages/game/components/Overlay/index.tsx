import { RefObject } from "react";

function Overlay(props: {
  state: boolean;
  forwardRef: RefObject<HTMLDivElement>;
}) {
  return (
    <div
      ref={props.forwardRef}
      className={`absolute top-0 left-0 w-full h-full ${
        props.state ? "bg-[#FEAEB0]/50 z-20" : "z-30"
      } flex items-center justify-center text-white font-bold text-3xl`}
    >
      {props.state && "Press to start"}
    </div>
  );
}

export default Overlay;
