import { ReactNode, useEffect, useState } from "react";

import { useAuth } from "@/context/authContext";

import InputField from "@/components/InputField";
import Loading from "@/components/Loading";
import CatIcon from "@/icons/CatIcon";

import { getAliases } from "@/utils/firestore";
import { toast } from "sonner";

function UserPage({ onClose }: { onClose: () => void }) {
  const { user, updateUser, newUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [alias, setAlias] = useState(user!.alias);
  const [aliases, setAliases] = useState<string[]>([]);
  const [error, setError] = useState("");

  const handleSave = () => {
    setLoading(true);
    updateUser({ ...user!, alias })
      .then(() => {
        onClose();
        toast("Saved!");
      })
      .catch((error) => {
        console.log(error);
        toast("Failed to save! :(");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!newUser) return;
    setLoading(true);
    getAliases()
      .catch(console.error)
      .then((res) => setAliases(res ?? []))
      .finally(() => setLoading(false));
  }, [newUser]);

  const handleChange = (value: string) => {
    setAlias(value.replace(" ", ""));
    if (aliases.includes(value.toLowerCase())) {
      setError("Name already exists");
    } else {
      setError("");
    }
  };

  return (
    <>
      <Loading state={loading} />
      <div className="grid md:grid-cols-2 gap-4 overflow-y-scroll">
        <div className="md:row-span-3 flex items-center justify-center">
          <CatIcon size={"250"} />
        </div>
        <InputField
          label="Username"
          value={alias}
          onChange={handleChange}
          error={error !== ""}
          errorMessage={error}
          disabled={!newUser}
        />
        <InputField label="Name" disabled value={user!.name} />
        <InputField label="Top Score" disabled value={user!.score + ""} />
        <div className="md:col-span-2 flex justify-end">
          <Button onClick={handleSave} disabled={alias === user!.alias}>
            Save
          </Button>
        </div>
        {newUser && (
          <div className="w-full text-sm text-center md:col-span-2 my-5">
            <p>Add a username to be displayed on the score board.</p>
            <p>username cannot contain spaces.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default UserPage;

function Button({
  onClick,
  disabled = false,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      className={`${
        disabled ? "bg-gray-300" : "hover:bg-[#FEAEB0] bg-[#FF85A9]"
      } w-48 text-white font-bold py-2 px-4 rounded`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
