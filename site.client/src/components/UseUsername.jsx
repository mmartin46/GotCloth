// John 3:5
import { createContext, useContext, useState } from 'react';

const UsernameContext = createContext();

export const UsernameProvider = ({ children }) => {
    const [username, setUsername] = useState("Guest");

    return (
        <UsernameContext.Provider value={{ username, setUsername }}>
            {children}
        </UsernameContext.Provider>
    );
};

export const useUsername = () => {
    return useContext(UsernameContext);
}