import { createContext, useContext, useState } from "react";

export const addData = createContext();

export const ContextProvider = ({ children }) => {
  const [userAdd, setUserAdd] = useState();
  return (
    <addData.Provider value={{ userAdd, setUserAdd }}>
      {children}
    </addData.Provider>
  );
};

export const useUserContext = () => useContext(addData);
