import { createContext, useState } from "react"

export const userContextData = createContext();
export const UserContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const updateUser = (newUser) => setUser(newUser);
    return (<userContextData.Provider value={{ user, setUser, loading, setLoading, error, setError, updateUser }}>
        <>{children}</>
    </userContextData.Provider>)
}