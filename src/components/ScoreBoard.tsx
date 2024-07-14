import UserCard from "./UserCard";

function ScoreBoard(props: { data: { name: string; score: number }[] }) {
  const { data } = props;
  return (
    <div className="flex flex-col items-center py-5 overflow-y-scroll">
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-3">
        {data.map((user, index) => (
          <UserCard
            key={index}
            name={user.name}
            score={user.score}
            index={index + 1}
          />
        ))}
      </div>
    </div>
  );
}

export default ScoreBoard;
