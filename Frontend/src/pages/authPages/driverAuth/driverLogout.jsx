import axios from "axios";
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../../context/homeContext";
import { driverContextData } from "../../../context/driverContext";

export const DriverLogout = () => {
    const { updateDriver } = useContext(driverContextData);
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        async function Logout() {
            const token = localStorage.getItem('driverToken');
            if (!token) navigate('/driver-login');
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/drivers/logout`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.status === 200) {
                    logout();
                    localStorage.removeItem('driverToken');
                    updateDriver(null);
                    navigate('/');
                }
            } catch (error) {
                console.log(error.message);
            }

        }
        Logout();
    }, [navigate]);

    return (<div>Driver Logged Out</div>)
}