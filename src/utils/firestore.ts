import {
  collection,
  doc,
  getDoc,
  runTransaction,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../firebase-config";
import { UserData } from "../context/authContext";
import { User } from "firebase/auth";

const userCollection = collection(firestore, "users");
const scoreCollection = collection(firestore, "scores");
const helpersCollection = collection(firestore, "helpers");

const aliasesDoc = doc(helpersCollection, "aliases");

export async function getAliases() {
  const _aliasesDoc = await getDoc(aliasesDoc);
  return _aliasesDoc.data()!.values as string[];
}

export const updateUserAppData = async (user: UserData) =>
  await runTransaction(firestore, async (transaction) => {
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
  });

export const getUserRecord = async (uid: string) =>
  await getDoc(doc(userCollection, uid));

export const getUserAppData = async (uid: string) =>
  await getDoc(doc(scoreCollection, uid));

export const addUserRecord = async (user: User) =>
  await setDoc(doc(userCollection, user.uid), {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
  });

export const updateUserScore = async (uid: string, score: number) =>
  await updateDoc(doc(scoreCollection, uid), {
    score: score,
  }).then(() => score);
