import { useState } from "react";
import { useAuth } from "../context/authContext";
import CatIcon from "../icons/CatIcon";
import InputField from "./InputField";
import Loading from "./Loading";

function UserPage({ onClose }: { onClose: () => void }) {
  const { user, updateUser, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [alias, setAlias] = useState(user!.alias);

  const handleSave = () => {
    setLoading(true);
    updateUser({ ...user!, alias })
      .then(() => {
        onClose();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Loading state={loading} />
      <div className="grid md:grid-cols-2 gap-4 overflow-y-scroll">
        <div className="md:row-span-3 flex items-center justify-center">
          <CatIcon size={"250"} />
        </div>
        <InputField
          label="Alias"
          value={alias}
          onChange={(value) => setAlias(value.replace(" ", ""))}
          error={false}
        />
        <InputField
          label="Name"
          disabled
          value={user!.name}
          onChange={() => {}}
          error={false}
        />
        <InputField
          label="Top Score"
          disabled
          value={user!.score + ""}
          onChange={() => {}}
          error={false}
        />
        <div className="md:col-span-2 flex justify-between">
          <button
            className="bg-pink-500 hover:bg-pink-700 w-48 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              onClose();
              logout();
            }}
          >
            Sign Out
          </button>
          <button
            className={`${
              alias === user!.alias
                ? "bg-gray-300"
                : "bg-pink-500 hover:bg-pink-700"
            } w-48 text-white font-bold py-2 px-4 rounded`}
            onClick={handleSave}
            disabled={alias === user!.alias}
          >
            Save
          </button>
        </div>
        <div className="w-full text-sm text-center md:col-span-2 my-5">
          Add an alias to your to be displayed on the score board
        </div>
      </div>
    </>
  );
}

export default UserPage;
