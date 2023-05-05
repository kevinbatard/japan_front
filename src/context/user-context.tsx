import { ReactElement, createContext, useState } from 'react';
import { DEFAULT_USER } from '../constant/visitor';
import { TUser } from '../Types/TUser';

interface ConnectedContextProps {
    children: ReactElement;
}

interface ConnectedContextType {
    user: TUser;
    onUserChange: (user: TUser) => void;
    token: string | null;
    onTokenChange: (token: string | null) => void;
}

export const ConnectedContext = createContext<ConnectedContextType>({
    user: DEFAULT_USER,
    onUserChange: (user: TUser) => {},
    token: null,
    onTokenChange: (token: string | null) => {},
});
export const TokenContext = createContext({});

export const ConnectedContextProvider = ({
    children,
}: ConnectedContextProps) => {
    const [user, setUser] = useState<TUser>(DEFAULT_USER);
    const [token, setToken] = useState<string | null>(null);

    const handleUserChange = (user: TUser) => {
        setUser(user);
    };

    const handleTokenChange = (token: string | null) => {
        setToken(token);
    };

    const contextValue = {
        user: user,
        onUserChange: handleUserChange,
        token: token,
        onTokenChange: handleTokenChange,
    };

    return (
        <ConnectedContext.Provider value={contextValue}>
            {children}
        </ConnectedContext.Provider>
    );
};
