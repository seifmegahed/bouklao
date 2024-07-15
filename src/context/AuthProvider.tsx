import { auth, firestore } from "../firebase-config";
import { useState, ReactNode } from "react";
import { AuthContextModel, AuthContext, UserData } from "./authContext";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

const userCollection = collection(firestore, "users");

const initUser = (user: User): UserData => ({
  uid: user.uid,
  name: user.displayName || "",
  alias: "",
  score: 0,
  color: "",
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [newUser, setNewUser] = useState(true);

  const value: AuthContextModel = {
    user: currentUser,
    newUser: newUser,
    updateUser,
    login,
    logout,
  };

  async function login() {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider).then(({ user }) => {
      getDoc(doc(userCollection, user.uid)).then((doc) => {
        if (doc.exists()) {
          const documentData = doc.data();
          console.log(documentData);
          setCurrentUser(documentData as UserData);
          setNewUser(false);
        } else {
          setCurrentUser(() => initUser(user));
          setNewUser(true);
        }
      });
      return user;
    });
  }

  async function logout() {
    return await signOut(auth).then(() => {
      setCurrentUser(null);
    });
  }

  async function updateUser(user: UserData) {
    setCurrentUser(user);
    setNewUser(false);
    return await setDoc(doc(userCollection, user.uid), user);
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
