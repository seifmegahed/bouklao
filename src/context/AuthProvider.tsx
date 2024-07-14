import { auth } from "../firebase-config";
import { useState, useEffect, ReactNode } from "react";
import { AuthContextModel, AuthContext } from "./authContext";
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const value: AuthContextModel = {
    auth: auth,
    user: currentUser,
    login,
    logout,
  };

  async function login() {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider);
  }

  async function logout() {
    return await signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
