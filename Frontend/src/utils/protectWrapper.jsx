import { useContext, useEffect } from "react";
import { AuthContext } from "../context/homeContext";
import { useNavigate } from "react-router-dom";

export const ProtectWrapper = ({ children }) => {
    const { isAuthenticated, role } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate(`/${role}-home`);
    }, [isAuthenticated, role, navigate]);

    if (isAuthenticated) return null;

    return <>{children}</>;
};