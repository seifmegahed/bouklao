import { useEffect, useState } from "react";
// import { useAuth } from "../context/authContext";
// import { getTopScore } from "../utils/gameFunctions";

function ScoreDisplay({ score, state }: { score: number; state: boolean }) {
  // const { user } = useAuth();

  const [topScore, setTopScore] = useState(0);
  useEffect(() => {
    if (!state) return;
    setTopScore((prev) => (prev > score ? prev : Math.round(score)));
  }, [score, state]);
  return (
    <div className="w-full text-right lg:text-lg text-[2vw] font-bold z-10 absolute top-0 p-3">
      <p>Top: {topScore}</p>
      <p>Score: {Math.round(score)}</p>
    </div>
  );
}

export default ScoreDisplay;
