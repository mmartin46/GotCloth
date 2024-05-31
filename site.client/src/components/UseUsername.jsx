// John 3:5
import { createContext, useRef, useContext } from 'react';

const UsernameContext = createContext();

export const UsernameProvider = ({ children }) => {
    const username = useRef("Guest");

    return (
        <UsernameContext.Provider value={username}>
            {children}
        </UsernameContext.Provider>
    );
};

export const useUsername = () => {
    return useContext(UsernameContext);
}