import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { driverContextData } from "../context/driverContext";
import { AuthContext } from "../context/homeContext";

export const DriverProtectWrapper = ({ allowedRole, children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setDriver } = useContext(driverContextData);
    const { isAuthenticated, role } = useContext(AuthContext);
    const token = localStorage.getItem("driverToken");

    const [loading, setLoading] = useState(true); // Added a loading state

    useEffect(() => {
        async function getProfile() {
            if (!isAuthenticated) {
                // Redirect to login if not authenticated
                navigate("/driver-login", { state: { from: location } });
                return;
            }

            if (role !== allowedRole) {
                // Redirect to role-specific home page if role doesn't match
                navigate(`/${role}-home`);
                return;
            }

            if (!token) {
                // Redirect to login if no token is found
                navigate("/driver-login", { state: { from: location } });
                return;
            }

            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/drivers/profile`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                if (response.status === 200) {
                    setDriver(response.data); // Set driver data
                    setLoading(false); // Stop loading once profile is fetched
                } else {
                    // If unauthorized, clear token and redirect
                    localStorage.removeItem("driverToken");
                    navigate("/driver-login", { state: { from: location } });
                }
            } catch (error) {
                console.error("Error fetching driver profile:", error);
                localStorage.removeItem("driverToken");
                navigate("/driver-login", { state: { from: location } });
            }
        }

        getProfile();
    }, [isAuthenticated, role, allowedRole, navigate, location, token, setDriver]);

    // Display a loader while verifying the user
    if (loading) return <div>Loading...</div>;

    // Render children if authenticated, role matches, and profile is loaded
    return <>{children}</>;
};