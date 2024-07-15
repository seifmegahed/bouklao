import { useContext, createContext } from "react";

import { User } from "firebase/auth";

export type UserData = {
  uid: string;
  name: string;
  email: string;
  alias: string;
  score: number;
  color: string;
};

export type AuthContextModel = {
  user: UserData | null;
  newUser: boolean;
  updateUser: (user: UserData) => Promise<void>;
  updateScore: (user: UserData) => Promise<void>;
  login: () => Promise<User>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextModel);

export function useAuth() {
  return useContext(AuthContext);
}
