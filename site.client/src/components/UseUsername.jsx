// John 3:5
import { createContext, useContext, useEffect, useState } from 'react';

const UsernameContext = createContext();

export const UsernameProvider = ({ children }) => {
    const [username, setUsername] = useState(() => {

        return localStorage.getItem('username') || "Guest";
    });

    useEffect(() => {

        localStorage.setItem('username', username);
    }, [username]);

    return (
        <UsernameContext.Provider value={{ username, setUsername }}>
            {children}
        </UsernameContext.Provider>
    );
};

export const useUsername = () => {
    return useContext(UsernameContext);
}