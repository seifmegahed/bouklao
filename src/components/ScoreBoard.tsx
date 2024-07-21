import { useEffect, useState } from "react";

import UserCard from "@/components/UserCard";

import { getTopScores, UserAppDataType } from "@/utils/firestore";
import { toast } from "sonner";

function ScoreBoard() {
  const [data, setData] = useState<UserAppDataType[]>([]);

  useEffect(() => {
    getTopScores(50)
      .then((res) => {
        setData(res);
      })
      .catch((error) => {
        toast("Failed to get top scores");
        console.error(error);
      });
  }, []);
  return (
    <div className="grid md:grid-cols-2 gap-3 py-10 overflow-hidden h-full">
      <div className="md:flex hidden flex-col items-center gap-3 w-full border-2 border-pink-100 rounded-lg p-3 overflow-y-scroll">
        <p className="text-xl font-bold text-gray-600">Top 3</p>
        {data.slice(0, 3).map((user, index) => (
          <UserCard
            key={user.alias}
            name={user.alias}
            score={user.score}
            index={index + 1}
          />
        ))}
      </div>
      <div className="flex flex-col items-center gap-3 w-full border-2 border-pink-100 rounded-lg p-3 overflow-y-scroll h-full">
        <p className="text-xl font-bold text-gray-600">Top 100 </p>
        <div className="flex gap-3 items-center">
          <p className="text-xl font-bold text-gray-600 w-8 text-right">666</p>
          <UserCard name="bouklao" score={666} index={666} />
        </div>
        {data.map((user, index) => (
          <div key={user.alias} className="flex gap-3 items-center">
            <p className="text-xl font-bold text-gray-600 w-8 text-right">
              {index + 1}
            </p>
            <UserCard name={user.alias} score={user.score} index={index + 1} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScoreBoard;
