import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/homeContext";
import { userContextData } from "../../../context/userContext";

export const UserLogout = () => {
    const { updateUser } = useContext(userContextData);
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        async function Logout() {
            const token = localStorage.getItem('userToken');
            if (!token) navigate('/user-login');
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.status === 200) {
                    logout();
                    localStorage.removeItem('userToken');
                    updateUser(null);
                    return navigate('/');
                }
            } catch (error) {
                console.log(error.response.data.message);
            }
        }
        Logout();
    }, []);

    return (<h1>User Logged Out</h1>)
}