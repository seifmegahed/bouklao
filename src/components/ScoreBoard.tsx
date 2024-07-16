import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { getTopScores, UserAppDataType } from "../utils/firestore";

function ScoreBoard() {
  const [data, setData] = useState<UserAppDataType[]>([]);
  useEffect(() => {
    getTopScores(50).then((res) => {
      // const arr = new Array(100).fill(res[0]);
      // setData(arr);
      setData(res);
    });
  }, []);
  return (
    <div className="grid md:grid-cols-2 gap-3 py-10 overflow-hidden h-full">
      <div className="md:flex hidden flex-col items-center gap-3 w-full border-2 border-pink-100 rounded-lg p-3">
        <p className="text-xl font-bold text-gray-600">Top 3 </p>
        {data.slice(0, 3).map((user, index) => (
          <UserCard
            key={user.alias}
            name={user.alias}
            score={user.score}
            index={index + 1}
          />
        ))}
      </div>
      <div className="flex flex-col items-center gap-3 w-full border-2 border-pink-100 rounded-lg p-3 overflow-scroll h-full">
        <p className="text-xl font-bold text-gray-600">Top 100 </p>
        {data.map((user, index) => (
          <div key={user.alias} className="flex gap-3 items-center">
            <p className="text-xl font-bold text-gray-600 w-8 text-right">{index + 1}</p>
            <UserCard
              key={user.alias}
              name={user.alias}
              score={user.score}
              index={index + 1}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScoreBoard;
