import { UserData } from "../../../../context/authContext";
import { updateUserScore } from "../../../../utils/firestore";

export function getTopScore(localStorage: Storage, user: UserData | null) {
  if (user === null) return Number(localStorage.getItem("topScore") || 0);
  return user.score;
}

export async function updateTopScore(
  localStorage: Storage,
  user: UserData | null,
  score: number
) {
  localStorage.setItem("topScore", score.toString());
  if (user === null) return score;
  return await updateUserScore(user.uid, score);
}