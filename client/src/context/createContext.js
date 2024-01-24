import { createContext, useEffect, useState } from "react";

export const DarkModeContext = createContext();

export const DarkModeContextProvider = ({ children }) => {
  const [currentMode, setCurrentMode] = useState(
    JSON.parse(localStorage.getItem("darkmode")) || null
  );

  const darkMode = () => {
    setCurrentMode(!currentMode);
  };

  useEffect(() => {
    localStorage.setItem("darkmode", JSON.stringify(currentMode));
  }, [currentMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, currentMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
