import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import { getTopScore, updateTopScore } from "./functions";
import { toast } from "sonner";

function ScoreDisplay({ score, state }: { score: number; state: boolean }) {
  const { user } = useAuth();

  const [topScore, setTopScore] = useState(getTopScore(localStorage, user));

  useEffect(() => {
    setTopScore(getTopScore(localStorage, user));
  }, [user]);

  useEffect(() => {
    if (!state) return;
    setTopScore((prev) => {
      if (prev > score) return prev;
      const newTopScore = Math.round(score);
      toast(`New top score: ${newTopScore}!!`);
      updateTopScore(localStorage, user, newTopScore)
        .then(() => toast(`Top score updated!`))
        .catch((error) => {
          toast(error.message);
          console.error(error);
        });
      return newTopScore;
    });
  }, [score, state, user]);

  return (
    <div className="w-full text-right lg:text-lg md:text-[2vw] font-bold z-10 absolute top-0 px-3">
      <p>Top: {topScore}</p>
      <p>Score: {Math.round(score)}</p>
    </div>
  );
}

export default ScoreDisplay;
