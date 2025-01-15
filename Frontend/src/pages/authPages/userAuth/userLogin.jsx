import axios from "axios";
import { useContext, useState } from "react";
import { Header } from "../../../components/header";
import { Footer } from "../../../components/footer";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { userContextData } from "../../../context/userContext";
import { AuthContext } from "../../../context/homeContext";

export const UserLogin = () => {
    const [info, setInfo] = useState({ email: '', password: '' });
    const { updateUser } = useContext(userContextData);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/user-home';

    const addData = (e) => {
        setInfo(values => {
            return { ...values, [e.target.name]: e.target.value };
        });
    }
    const submitData = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, info);
            if (response.status === 200) {
                login("user");
                const Data = response.data;
                localStorage.setItem('userToken', Data.token);
                updateUser(Data.user);
                navigate(from);
            }
        } catch (error) {
            console.error("Error in Logging user:", error.response?.data || error.message);
        }
        setInfo({ email: '', password: '' });
    }
    return (
        <>
            <Header />
            <div className="h-[85vh]">
                <form action="#" method="post" onSubmit={(e) => submitData(e)}
                    className="mx-auto w-fit h-fit flex flex-col justify-center place-items-center gap-6 my-8">
                    <h1 className="text-3xl">What's your email?</h1>
                    <input type="text" name="email" placeholder="Enter email" value={info.email} onChange={(e) => addData(e)}
                        className="bg-gray-100 font-light w-96 h-[3.25rem] rounded-lg pl-8 placeholder:text-lg placeholder:text-black" />
                    <input type="password" name="password" placeholder="Enter password" value={info.password} onChange={(e) => addData(e)}
                        className="bg-gray-100 font-light w-96 h-[3.25rem] rounded-lg pl-8 placeholder:text-lg placeholder:text-black" />
                    <button type="submit" className="bg-black py-3 text-white w-full rounded-lg text-lg">Continue</button>
                </form>
                <div className="h-fit w-fit mx-auto flex flex-col justify-center place-items-center gap-8">
                    <div className="flex justify-center place-items-center gap-1">
                        <div className="h-[0.5px] w-40 bg-black opacity-70" />
                        <p className="opacity-70">OR</p>
                        <div className="h-[0.5px] w-40 bg-black opacity-70" />
                    </div>
                    <NavLink to='/user-signup' className='text-sky-700 underline decoration-1 text-xl opacity-70 cursor-pointer hover:opacity-100 font-light'>New User? Sign up</NavLink>
                </div>
            </div>
            <Footer />
        </>
    )
}
