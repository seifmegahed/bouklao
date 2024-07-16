import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { getTopScores, UserAppDataType } from "../utils/firestore";

function ScoreBoard() {
  const [data, setData] = useState<UserAppDataType[]>([]);
  useEffect(() => {
    getTopScores(50).then((res) => setData(res));
  }, []);
  return (
    <div className="flex flex-col items-center py-5 overflow-y-scroll">
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-3">
        {data.map((user, index) => (
          <UserCard
            key={index}
            name={user.alias}
            score={user.score}
            index={index + 1}
          />
        ))}
      </div>
    </div>
  );
}

export default ScoreBoard;
