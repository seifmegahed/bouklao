import { useState, ReactNode, useEffect } from "react";
import { auth } from "@/firebase-config";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { AuthContextModel, AuthContext, UserData } from "@/context/authContext";
import { updateUserAppData, updateUserScore } from "@/utils/firestore";
import { initUser } from "@/utils/userHelperFunctions";
import { toast } from "sonner";

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
    return (
      await signInWithPopup(auth, provider).catch((error) =>
        Promise.reject(error)
      )
    ).user;
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        initUser(user, setCurrentUser, setNewUser).catch((error) => {
          console.error(error);
          toast(error);
        });
      }
    });
    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
