import { auth } from "../firebase-config";
import { useState, ReactNode } from "react";
import { AuthContextModel, AuthContext, UserData } from "./authContext";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

import { updateUserAppData, updateUserScore } from "../utils/firestore";
import { initUser } from "../utils/userHelperFunctions";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [newUser, setNewUser] = useState(true);

  const value: AuthContextModel = {
    user: currentUser,
    newUser: newUser,
    updateUser,
    updateScore,
    login,
    logout,
  };

  async function login() {
    const provider = new GoogleAuthProvider();
    const user = (
      await signInWithPopup(auth, provider).catch((error) =>
        Promise.reject(error)
      )
    ).user;
    return await initUser(user, setCurrentUser, setNewUser);
  }

  async function logout() {
    return await signOut(auth).then(() => {
      setCurrentUser(null);
    });
  }

  async function updateScore(user: UserData) {
    setCurrentUser(user);
    return await updateUserScore(currentUser!.uid, user.score);
  }

  async function updateUser(user: UserData) {
    setCurrentUser(user);
    return await updateUserAppData(user).then(() => setNewUser(false));
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
