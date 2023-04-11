import { ReactElement, createContext, useState } from "react";
import { DEFAULT_USER } from "../constant/visitor";
import { TUser } from "../Types/TUser";

interface UserContextProps {
    children: ReactElement
}

export interface UserContextInterface {
    user :{id: number;
    pseudo: string;
    email: string;
    access_lvl: number;
    access_token: string | null;}
    onUserChange: (user: {id: number;
        pseudo: string;
        email: string;
        access_lvl: number;
        access_token: string | null;}) => void

}

export const UserContext = createContext<UserContextInterface>({
    user: DEFAULT_USER,
    onUserChange: (user: {id: number;
        pseudo: string;
        email: string;
        access_lvl: number;
        access_token: string | null;}) => {}
  });

  export const UserContextProvider = ({ children }: UserContextProps) => {
    
    const [user, setUser] = useState<TUser>(DEFAULT_USER);
  
    const handleUserChange = (user: TUser) => {
        setUser(user);
    };
  
    const contextValue = {
        user: user,
        onUserChange: handleUserChange
    };
  
    return (
      <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
    );}