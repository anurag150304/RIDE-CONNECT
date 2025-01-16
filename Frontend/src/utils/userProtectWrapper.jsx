import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { userContextData } from "../context/userContext";
import axios from "axios";
import { AuthContext } from "../context/homeContext";

export const UserProtectWrapper = ({ allowedRole, children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem("userToken");
    const { setUser } = useContext(userContextData);
    const { isAuthenticated, role } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getProfile() {
            if (!isAuthenticated) {
                // Redirect to login if not authenticated
                navigate("/user-login", { state: { from: location } });
                return;
            }

            if (role !== allowedRole) {
                // Redirect to role-specific home page if role doesn't match
                navigate(`/${role}-home`);
                return;
            }

            if (!token) {
                // Redirect to login if no token is found
                navigate("/user-login", { state: { from: location } });
                return;
            }

            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/users/profile`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                if (response.status === 200) {
                    setUser(response.data); // Set user data
                    setLoading(false); // Stop loading once profile is fetched
                } else {
                    // If unauthorized, clear token and redirect
                    localStorage.removeItem("userToken");
                    navigate("/user-login", { state: { from: location } });
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
                localStorage.removeItem("userToken");
                navigate("/user-login", { state: { from: location } });
            }
        }

        getProfile();
    }, [isAuthenticated, role, allowedRole, navigate, location, token, setUser]);

    // Display a loader while verifying the user
    if (loading) return <div>Loading...</div>;

    // Render children if authenticated, role matches, and profile is loaded
    return <>{children}</>;
};