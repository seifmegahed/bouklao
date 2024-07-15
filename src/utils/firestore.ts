import { collection, doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase-config";

export const scoreCollection = collection(firestore, "scores");
export const helpersCollection = collection(firestore, "helpers");
export const aliasesDoc = doc(helpersCollection, "aliases");

export async function getAliases() {
  const _aliasesDoc = await getDoc(aliasesDoc);
  return _aliasesDoc.data()!.values as string[];
}
