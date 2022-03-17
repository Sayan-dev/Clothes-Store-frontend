import { createContext } from "react";

export const AuthContext = createContext<{
  isLoggedIn: boolean;
  token: string | null;
  user: any;
  login: (
    token: string | null,
    user: any
  ) => void;
  logout: () => void;
}>({
  isLoggedIn: false,
  token: null,
  user: null,
  login: (
    token: string | null,
    user: any
  ) => {},
  logout: () => {},
});