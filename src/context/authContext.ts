import { useContext, createContext } from "react";

import { Auth, UserCredential } from "firebase/auth";

export type UserData = {
  uid: string;
  name: string;
  alias: string;
  score: number;
  color: string;
};

export type AuthContextModel = {
  auth: Auth;
  user: UserData | null;
  newUser: boolean;
  updateUser: (user: UserData) => Promise<void>;
  login: () => Promise<UserCredential>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextModel);

export function useAuth() {
  return useContext(AuthContext);
}
