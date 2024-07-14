import { useContext, createContext } from "react";

import { Auth, User, UserCredential } from "firebase/auth";

export type AuthContextModel = {
  auth: Auth;
  user: User | null;
  login: () => Promise<UserCredential>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextModel);

export function useAuth() {
  return useContext(AuthContext);
}
