import { auth, firestore } from "../firebase-config";
import { useState, ReactNode } from "react";
import { AuthContextModel, AuthContext, UserData } from "./authContext";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  runTransaction,
  setDoc,
  updateDoc,
} from "firebase/firestore";

const userCollection = collection(firestore, "users");
const scoreCollection = collection(firestore, "scores");
const helpersCollection = collection(firestore, "helpers");
const aliasesDoc = doc(helpersCollection, "aliases");

const initUser = (user: User): UserData => ({
  uid: user.uid,
  name: user.displayName || "",
  email: user.email || "",
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
    updateScore,
    login,
    logout,
  };

  async function login() {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider).then(({ user }) => {
      getDoc(doc(scoreCollection, user.uid)).then(async (_doc) => {
        if (_doc.exists()) {
          const documentData = _doc.data();
          setCurrentUser({
            ...documentData,
            name: user.displayName,
            email: user.email,
          } as UserData);
          setNewUser(false);
        } else {
          await setDoc(doc(userCollection, user.uid), {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
          });
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

  async function updateScore(score: number) {
    return await updateDoc(doc(scoreCollection, currentUser!.uid), {
      score: score,
    });
  }

  async function updateUser(user: UserData) {
    setCurrentUser(user);
    return await runTransaction(firestore, async (transaction) => {
      const _aliasesDoc = await getDoc(aliasesDoc);
      transaction.set(doc(scoreCollection, user.uid), {
        uid: user.uid,
        alias: user.alias,
        score: user.score,
        color: user.color,
      });

      if (!_aliasesDoc.exists()) {
        transaction.set(aliasesDoc, { values: [user.alias] });
        return;
      }

      const aliases = _aliasesDoc.data()!.values as string[];

      if (aliases.includes(user.alias)) {
        console.log("alias already exists", aliases);
        return Promise.reject(new Error("Alias already exists"));
      }
      transaction.set(aliasesDoc, { values: [...aliases, user.alias] });
      setNewUser(false);
    });
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
