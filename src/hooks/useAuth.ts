import { useState, useCallback, useEffect } from "react";
import Cookies from "js-cookie";

export const useAuth = () => {
  const isSsr = typeof window === "undefined";
  const localData = !isSsr ? localStorage.getItem("userData") : null;
  const userToken = localData ? JSON.parse(localData).token : null;
  const [token, setToken] = useState<string | null>(userToken);
  const [user, setuser] = useState<any>(null);

  const login = useCallback((token, user) => {
    setToken(token);
    setuser(user);

    const userDataJson = JSON.stringify({
      user,
    });
    localStorage.setItem("userData", userDataJson);
    Cookies.set("token", token);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setuser(null);
    localStorage.removeItem("userData");
    Cookies.set("token", null);
    window.location.href = process.env.GATSBY_HOME_URL;
  }, []);

  useEffect(() => {
    const localStorageData = localStorage.getItem("userData");
    const getToken = Cookies.get("token");
    if (localStorageData && getToken) {
      const storedData = JSON.parse(localStorageData);
      login(
        getToken,
        storedData.user
      );
    }
  }, [login]);
  return { token, login, logout, user };
};