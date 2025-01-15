import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../../components/header";
import { Footer } from "../../../components/footer";
import { useContext, useState } from "react";
import { driverContextData } from "../../../context/driverContext";
import axios from "axios";
import { AuthContext } from "../../../context/homeContext";

export const DriverSignup = () => {
    const [data, setData] = useState({
        fullname: { firstname: "", lastname: "" },
        email: "",
        password: "",
        vehicle: { model: "", plate: "", capacity: "", vehicleType: "" }
    });

    const { updateDriver } = useContext(driverContextData);
    const { signup } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/driver-home';

    const addData = (e) => {
        const { name, value } = e.target;
        if (name.startsWith("fullname")) {
            const key = name.split("[")[1].split("]")[0];
            setData(values => ({ ...values, fullname: { ...values.fullname, [key]: value } }));
        }
        else if (name.startsWith("vehicle")) {
            const key = name.split("[")[1].split("]")[0];
            setData(values => ({ ...values, vehicle: { ...values.vehicle, [key]: value } }));
        }
        else {
            setData(values => ({ ...values, [name]: value }));
        }
    };

    const submitData = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/drivers/register`, data);
            if (response.status === 201) {
                signup("driver");
                const DATA = response.data;
                localStorage.setItem('driverToken', DATA.token);
                updateDriver(DATA.driver);
                navigate(from);
            }
        } catch (error) {
            console.error("Error in registering driver:", error.response?.data || error.message);
        }
        setData({
            fullname: { firstname: "", lastname: "" },
            email: "",
            password: "",
            vehicle: { model: "", plate: "", capacity: "", vehicleType: "" }
        });
    };

    return (
        <>
            <Header />
            <div className="p-6">
                <form
                    action=""
                    method="post"
                    onSubmit={(e) => submitData(e)}
                    className="mx-auto w-[40%] h-fit flex flex-col justify-center place-items-center gap-6 my-8">
                    <div className="w-full flex flex-col justify-center place-items-start gap-4">
                        <p className="text-xl font-medium opacity-80 cursor-pointer">What's your name</p>
                        <div className="w-full flex justify-center place-items-center gap-4">
                            <input
                                type="text"
                                placeholder="First name"
                                name="fullname[firstname]"
                                value={data.fullname.firstname}
                                onChange={addData}
                                className="bg-gray-100 font-light w-full h-[3.25rem] rounded-lg pl-8 placeholder:text-lg placeholder:text-black cursor-pointer" />
                            <input
                                type="text"
                                placeholder="Last name"
                                name="fullname[lastname]"
                                value={data.fullname.lastname}
                                onChange={addData}
                                className="bg-gray-100 font-light w-full h-[3.25rem] rounded-lg pl-8 placeholder:text-lg placeholder:text-black cursor-pointer" />
                        </div>
                    </div>
                    <div className="w-full flex flex-col justify-center place-items-start gap-4">
                        <label htmlFor="email" className="text-xl font-medium opacity-80 cursor-pointer">
                            What's your email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="example@gmail.com"
                            value={data.email}
                            onChange={addData}
                            className="bg-gray-100 font-light w-full h-[3.25rem] rounded-lg pl-8 placeholder:text-lg placeholder:text-black cursor-pointer" />
                    </div>
                    <div className="w-full flex flex-col justify-center place-items-start gap-4">
                        <label htmlFor="pass" className="text-xl font-medium opacity-80 cursor-pointer">
                            Enter password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="pass"
                            placeholder="Password"
                            value={data.password}
                            onChange={addData}
                            className="bg-gray-100 font-light w-full h-[3.25rem] rounded-lg pl-8 placeholder:text-lg placeholder:text-black cursor-pointer" />
                    </div>
                    <div className="w-full flex flex-col justify-center place-items-start gap-4">
                        <p className="text-xl font-medium opacity-80 cursor-pointer">Vehicle Information</p>
                        <div className="w-full flex justify-center place-items-center gap-4">
                            <input
                                type="text"
                                placeholder="Model"
                                name="vehicle[model]"
                                value={data.vehicle.model}
                                onChange={addData}
                                className="bg-gray-100 font-light w-full h-[3.25rem] rounded-lg pl-8 placeholder:text-lg placeholder:text-black cursor-pointer" />
                            <input
                                type="text"
                                placeholder="Plate"
                                name="vehicle[plate]"
                                value={data.vehicle.plate}
                                onChange={addData}
                                className="bg-gray-100 font-light w-full h-[3.25rem] rounded-lg pl-8 placeholder:text-lg placeholder:text-black cursor-pointer" />
                        </div>
                        <div className="w-full flex justify-center place-items-center gap-4">
                            <input
                                type="number"
                                placeholder="Capacity"
                                name="vehicle[capacity]"
                                value={data.vehicle.capacity}
                                onChange={addData}
                                className="bg-gray-100 font-light w-full h-[3.25rem] rounded-lg pl-8 placeholder:text-lg placeholder:text-black cursor-pointer" />
                            <select
                                name="vehicle[vehicleType]"
                                value={data.vehicle.vehicleType}
                                onChange={addData}
                                className="bg-gray-100 font-light w-full h-[3.25rem] rounded-lg pl-8 text-lg text-black cursor-pointer">
                                <option value="" disabled>Vehicle type</option>
                                <option value="car">Car</option>
                                <option value="bike">Bike</option>
                                <option value="van">Van</option>
                            </select>
                        </div>
                    </div>
                    <div className="w-full flex justify-center place-items-center gap-16">
                        <button type="submit" className="bg-black py-3 px-10 text-white rounded-lg text-lg">
                            Create
                        </button>
                        <NavLink
                            to="/driver-login"
                            className="underline decoration-1 text-xl opacity-70 cursor-pointer hover:opacity-100 font-light
                            text-sky-700">
                            Existing driver...? <span>Log in</span>
                        </NavLink>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
}
