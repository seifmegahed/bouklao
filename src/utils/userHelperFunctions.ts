import { User } from "firebase/auth";

import {
  addUserRecord,
  getUserAppData,
  getUserRecord,
} from "@/utils/firestore";

import { UserData } from "@/context/authContext";

const newUserData = (user: User): UserData => ({
  uid: user.uid,
  name: user.displayName || "",
  email: user.email || "",
  alias: "",
  score: 0,
  color: "",
});

export async function initUser(
  user: User,
  userSetter: (user: UserData) => void,
  newUserSetter: (value: boolean) => void
): Promise<User> {
  const userAppDataDoc = await getUserAppData(user.uid).catch((error) =>
    Promise.reject(error)
  );

  if (userAppDataDoc.exists()) {
    const documentData = userAppDataDoc.data();
    userSetter({
      ...documentData,
      name: user.displayName,
      email: user.email,
    } as UserData);
    newUserSetter(false);
    return Promise.resolve(user);
  }

  newUserSetter(true);

  const userRecordDoc = await getUserRecord(user.uid).catch((error) =>
    Promise.reject(error)
  );

  if (userRecordDoc.exists()) {
    return Promise.reject(new Error("User already exists"));
  }
  console.log("not working");
  await addUserRecord(user).catch((error) => Promise.reject(error));

  userSetter(newUserData(user));
  return Promise.resolve(user);
}
