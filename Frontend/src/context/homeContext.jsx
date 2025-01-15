import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return JSON.parse(localStorage.getItem("isAuthenticated")) || false;
    });
    const [role, setRole] = useState(() => {
        return localStorage.getItem("role") || null;
    });

    useEffect(() => {
        localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
        if (role) {
            localStorage.setItem("role", role);
        }
    }, [isAuthenticated, role]);

    const login = (userRole) => {
        setIsAuthenticated(true);
        setRole(userRole);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setRole(null);
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("role");
    };

    const signup = (userRole) => {
        setIsAuthenticated(true);
        setRole(userRole);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, role, signup, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};