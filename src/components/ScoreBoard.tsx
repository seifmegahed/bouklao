import UserCard from "./UserCard";

function ScoreBoard(props: { data: { name: string; score: number }[] }) {
  const { data } = props;
  return (
    <div className="grid grid-rows-7 grid-flow-col gap-3">
      {data.slice(0, 21).map((user, index) => (
        <UserCard
          key={index}
          name={user.name}
          score={user.score}
          index={index + 1}
        />
      ))}
    </div>
  );
}

export default ScoreBoard;
