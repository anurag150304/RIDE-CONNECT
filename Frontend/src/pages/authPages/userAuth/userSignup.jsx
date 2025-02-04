import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Header } from "../../../components/header";
import { Footer } from "../../../components/footer";
import { useContext, useState } from "react";
import axios from 'axios';
import { userContextData } from "../../../context/userContext";
import { AuthContext } from "../../../context/homeContext";

export const UserSignup = () => {
    const [info, setInfo] = useState({ fullname: { firstname: "", lastname: "" }, email: "", password: "" });
    const { updateUser } = useContext(userContextData);
    const { signup } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/user-home';

    const addData = (e) => {
        const { name, value } = e.target;
        if (name.startsWith("fullname")) {
            const key = name.split("[")[1].split("]")[0];
            setInfo(values => ({ ...values, fullname: { ...values.fullname, [key]: value } }));
        } else {
            setInfo(values => ({ ...values, [name]: value }));
        }
    };

    const submitData = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, info);
            if (response.status === 201) {
                signup("user");
                const Data = response.data;
                localStorage.setItem('userToken', Data.token);
                updateUser(Data.user);
                navigate(from);
            }
        } catch (error) {
            console.error("Error in registering user:", error.response?.data || error.message);
        }
    };

    return (
        <>
            <Header />
            <div className="p-6">
                <form
                    action="#"
                    method="post"
                    onSubmit={(e) => submitData(e)}
                    className="mx-auto max-w-lg w-[80%] flex flex-col justify-center items-center gap-6 my-8"
                >
                    {/* Name Section */}
                    <div className="w-full flex flex-col justify-center items-start gap-4">
                        <p className="text-lg sm:text-xl font-medium opacity-80">What's your name</p>
                        <div className="w-full flex flex-col sm:flex-row gap-4">
                            <input
                                type="text"
                                placeholder="First name"
                                name="fullname[firstname]"
                                value={info.fullname.firstname}
                                onChange={addData}
                                className="bg-gray-100 w-full h-[3rem] rounded-lg pl-4 placeholder:text-base sm:placeholder:text-lg"
                            />
                            <input
                                type="text"
                                placeholder="Last name"
                                name="fullname[lastname]"
                                value={info.fullname.lastname}
                                onChange={addData}
                                className="bg-gray-100 w-full h-[3rem] rounded-lg pl-4 placeholder:text-base sm:placeholder:text-lg"
                            />
                        </div>
                    </div>

                    {/* Email Section */}
                    <div className="w-full flex flex-col gap-4">
                        <label htmlFor="email" className="text-lg sm:text-xl font-medium opacity-80">What's your email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="example@gmail.com"
                            value={info.email}
                            onChange={addData}
                            className="bg-gray-100 w-full h-[3rem] rounded-lg pl-4 placeholder:text-base sm:placeholder:text-lg"
                        />
                    </div>

                    {/* Password Section */}
                    <div className="w-full flex flex-col gap-4">
                        <label htmlFor="pass" className="text-lg sm:text-xl font-medium opacity-80">Enter password</label>
                        <input
                            type="password"
                            name="password"
                            id="pass"
                            placeholder="Password"
                            value={info.password}
                            onChange={addData}
                            className="bg-gray-100 w-full h-[3rem] rounded-lg pl-4 placeholder:text-base sm:placeholder:text-lg"
                        />
                    </div>

                    {/* Button & Login Link */}
                    <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-16">
                        <button type="submit" className="bg-black py-3 px-8 text-white rounded-lg text-lg w-full sm:w-auto">
                            Create
                        </button>
                        <NavLink
                            to="/user-login"
                            className="underline text-lg sm:text-xl opacity-70 hover:opacity-100 text-sky-700"
                        >
                            Existing user? <span>Log in</span>
                        </NavLink>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
}