"use client";

import { createContext, useState, useContext } from "react";

// create context
const GlobalContext = createContext();

// create Provider
export const GlobalProvider = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0);

  return (
    <GlobalContext.Provider value={{ unreadCount, setUnreadCount }}>
      {children}
    </GlobalContext.Provider>
  );
};

// export global context hook
export function useGlobalContext() {
  return useContext(GlobalContext);
}
