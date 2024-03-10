import { createContext, useContext, useState } from "react";

export const addData = createContext();
export const updateUserContext = createContext();

export const ContextProvider = ({ children }) => {
  const [userAdd, setUserAdd] = useState();
  const [updateUser, setUpdateUser] = useState();
  return (
    <addData.Provider value={{ userAdd, setUserAdd }}>
      <updateUserContext.Provider value={{ updateUser, setUpdateUser }}>
        {children}
      </updateUserContext.Provider>
    </addData.Provider>
  );
};

export const useUserContext = () => useContext(addData);
export const useUpdateUserContext = () => useContext(updateUserContext);
