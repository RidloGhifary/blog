import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const DarkModeContext = createContext();

export const DarkModeContextProvider = ({ children }) => {
  // const baseUrl = process.env.REACT_APP_BASE_URL;
  const currentPath = window.location.pathname;

  const [currentMode, setCurrentMode] = useState(
    JSON.parse(localStorage.getItem("darkmode")) || null
  );

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const darkMode = () => {
    setCurrentMode(!currentMode);
  };

  const login = async (inputs) => {
    const res = await axios.post(`/auth/login`, inputs);
    setCurrentUser(res.data);
  };

  const logout = async () => {
    await axios.post(`/auth/logout`);
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("darkmode", JSON.stringify(currentMode));
    localStorage.setItem("user", JSON.stringify(currentUser));

    if (
      (currentUser !== null && currentPath === "/login") ||
      currentPath === "/register"
    )
      window.location.href = "/";
  }, [currentMode, currentUser, currentPath]);

  return (
    <DarkModeContext.Provider
      value={{ darkMode, currentMode, login, logout, currentUser }}>
      {children}
    </DarkModeContext.Provider>
  );
};
