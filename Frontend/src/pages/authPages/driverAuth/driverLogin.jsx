import { useContext, useState } from "react";
import { Header } from "../../../components/header";
import { Footer } from "../../../components/footer";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { driverContextData } from "../../../context/driverContext";
import { AuthContext } from "../../../context/homeContext";

export const DriverLogin = () => {
    const [data, setData] = useState({ email: '', password: '' });
    const { updateDriver } = useContext(driverContextData);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/driver-home';

    const addData = (e) => {
        setData(values => {
            return { ...values, [e.target.name]: e.target.value };
        });
    }
    const submitData = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/drivers/login`, data);
            if (response.status === 200) {
                login("driver");
                const Data = response.data;
                localStorage.setItem('driverToken', Data.token);
                updateDriver(Data.driver);
                navigate(from);
            }
        } catch (error) {
            console.error("Error in Logging driver:", error.response?.data || error.message);
        }
        setData({ email: '', password: '' });
    }
    return (
        <>
            <Header />
            <div className="h-[85vh]">
                <form action="" method="post" onSubmit={(e) => submitData(e)}
                    className="mx-auto w-fit h-fit flex flex-col justify-center place-items-center gap-6 my-8">
                    <h1 className="text-3xl">What's your email?</h1>
                    <input type="text" name="email" placeholder="Enter email" value={data.email} onChange={(e) => addData(e)}
                        className="bg-gray-100 font-light w-96 h-[3.25rem] rounded-lg pl-8 placeholder:text-lg placeholder:text-black" />
                    <input type="password" name="password" placeholder="Enter password" value={data.password} onChange={(e) => addData(e)}
                        className="bg-gray-100 font-light w-96 h-[3.25rem] rounded-lg pl-8 placeholder:text-lg placeholder:text-black" />
                    <button type="submit" className="bg-black py-3 text-white w-full rounded-lg text-lg">Log in</button>
                </form>
                <div className="h-fit w-fit mx-auto flex flex-col justify-center place-items-center gap-8">
                    <div className="flex justify-center place-items-center gap-1">
                        <div className="h-[0.5px] w-40 bg-black opacity-70" />
                        <p className="opacity-70">OR</p>
                        <div className="h-[0.5px] w-40 bg-black opacity-70" />
                    </div>
                    <NavLink to='/driver-signup' className='text-sky-700 underline decoration-1 text-xl opacity-70 cursor-pointer hover:opacity-100 font-light'>New Driver? Sign up</NavLink>
                </div>
            </div>
            <Footer />
        </>
    )
}
