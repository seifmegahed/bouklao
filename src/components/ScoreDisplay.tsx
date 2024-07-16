function ScoreDisplay({
  score,
  topScore,
}: {
  score: number;
  topScore: number;
}) {
  return (
    <div className="w-full text-right lg:text-lg text-[2vw] font-bold z-10 absolute top-0 p-3">
      <p>Top: {Math.round(topScore)}</p>
      <p>Score: {Math.round(score)}</p>
    </div>
  );
}

export default ScoreDisplay;
