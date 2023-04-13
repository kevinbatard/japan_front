import { ReactElement, createContext, useState } from "react";
import { DEFAULT_USER } from "../constant/visitor";
import { TUser } from "../Types/TUser";

interface UserContextProps {
  children: ReactElement;
}

export const UserContext = createContext({
  user: DEFAULT_USER,
  onUserChange: (user: TUser) => {},
});

export const UserContextProvider = ({ children }: UserContextProps) => {
  const [user, setUser] = useState<TUser>(DEFAULT_USER);

  const handleUserChange = (user: TUser) => {
    setUser(user);
  };

  const contextValue = {
    user: user,
    onUserChange: handleUserChange,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
