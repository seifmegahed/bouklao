import CatIcon from "@/icons/CatIcon";

function UserCard(props: {
  name: string;
  score: number;
  index: number;
  color?: string;
}) {
  const { name, score } = props;
  return (
    <div className="flex items-center justify-between w-[230px] gap-2 rounded-xl bg-pink-100 p-2 hover:scale-105 transition-all duration-300 ease-in-out">
      <div className="flex flex-row items-center max-w-[170px]">
        <CatIcon size="40" color={props.color} />
        <p className="truncate">{name}</p>
      </div>
      <p>{score}</p>
    </div>
  );
}

export default UserCard;
