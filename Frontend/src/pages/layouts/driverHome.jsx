import axios from 'axios';
import { Link } from "react-router-dom"
import logo from '../../assets/png/Uber_logo.png';
import user_logo from '../../assets/png/basic.jpg';
import { useContext, useEffect, useState } from "react";
import { FourDigitInput } from "../../components/fourDigitInput";
import { SocketContext } from "../../context/socketContext";
import { driverContextData } from "../../context/driverContext";
import { LiveTracking } from '../../components/LiveTracking';

export const DriverHome = () => {
    const [rideRequest, setRideRequest] = useState(null);
    const [fourDigit, setFourDigit] = useState(["", "", "", ""]);
    const [isClicked, setIsClicked] = useState(false);
    const [isClicked2, setIsClicked2] = useState(true);
    const [isRideStarted, setIsRideStarted] = useState(false);
    const { driver } = useContext(driverContextData);
    const { sendMessage, receiveMessage, removeMessage } = useContext(SocketContext);

    const resetAll = async () => {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
            { rideId: rideRequest._id },
            { headers: { Authorization: `Bearer ${localStorage.getItem("driverToken")}` } });
        if (response.status === 200) {
            setRideRequest(null);
            setFourDigit(["", "", "", ""]);
            setIsClicked(false);
            setIsClicked2(true);
            setIsRideStarted(false);
        }
    }

    /**
     * Function to fetch and send driver location to the server
     */
    const sendDriverLocation = () => {
        if (!navigator.geolocation) {
            console.error("Geolocation is not supported by this browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                sendMessage("update-driver-location", {
                    driverId: driver._id,
                    location: { ltd: latitude, lng: longitude },
                });
            },
            (error) => console.error("Error fetching location:", error.response.data.message)
        );
    };

    useEffect(() => {
        // Join driver to socket room
        sendMessage("join", { userId: driver._id, userType: "driver" });

        // Send driver location periodically
        const interval = setInterval(sendDriverLocation, 10_000);

        // Cleanup on component unmount
        return () => clearInterval(interval);
    }, [driver, sendMessage]);

    useEffect(() => {
        const handleNewRide = (data) => {
            setRideRequest(data);
        };

        // Listen for new ride events
        receiveMessage("new-ride", handleNewRide);

        // Cleanup on unmount
        return () => removeMessage("new-ride", handleNewRide);
    }, [receiveMessage, removeMessage]);

    /**
     * Confirm the ride
     */
    const confirmRide = async () => {
        if (!rideRequest?._id) {
            console.error("No ride request available to confirm.");
            return;
        }

        setIsClicked(true);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/rides/confirm-ride`,
                { rideId: rideRequest._id },
                { headers: { Authorization: `Bearer ${localStorage.getItem("driverToken")}` } }
            );

            if (response.status === 200) {
                setRideRequest(response.data);
            }
        } catch (error) {
            console.error("Error confirming ride:", error.response.data.message);
        }
    };

    /**
     * Start the ride
     */
    const startRide = async () => {
        if (!rideRequest?._id) {
            console.error("No ride request available to start.");
            return;
        }

        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
                {
                    params: { rideId: rideRequest._id, otp: fourDigit.join("") },
                    headers: { Authorization: `Bearer ${localStorage.getItem("driverToken")}` },
                }
            );

            if (response.status === 200) {
                setIsRideStarted(true);
            }
        } catch (error) {
            console.error("Error starting ride:", error.response.data.message);
        }
    };
    return (
        <>
            <header className='flex flex-row justify-between place-items-center px-2 py-2'>
                <div className='flex flex-row justify-center place-items-center'>
                    <div className='mx-16'>
                        <Link to={'/driver-home'} className='text-3xl font-medium'>Ride-Connect</Link>
                    </div>
                    <div className='ml-8'>
                        <ul className='flex flex-row justify-center place-items-center gap-8 mt-4'>
                            <li className='flex flex-row justify-center place-items-center gap-2 cursor-pointer'>
                                <span>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className='cursor-pointer'>
                                        <title>Car front</title>
                                        <path d="m20.9 9-1.5-4.6c-.3-.8-1-1.4-1.9-1.4H6.4c-.9 0-1.6.5-1.9 1.4L3 9H1v3h1v9h4v-2h12v2h4v-9h1V9h-2.1ZM5 14h4v2H5v-2Zm10 2v-2h4v2h-4ZM7.1 6h9.7l1.3 4H5.8l1.3-4Z" fill="currentColor" />
                                    </svg>
                                </span>
                                <span className='text-sm font-medium cursor-pointer'>Ride</span>
                            </li>
                            <li className='flex flex-row justify-center place-items-center gap-2 cursor-pointer'>
                                <span>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className='cursor-pointer'>
                                        <title>Box isometric package</title>
                                        <g fill="currentColor">
                                            <path d="M21.9 6.4 12 1.5 8.1 3.4l9.9 5 3.9-2ZM2.1 6.4l3.8-1.9 9.9 5-3.8 1.9-9.9-5ZM11 23 1 18V8.1l10 5V23ZM19 13.8v-3.7l4-2V18l-10 5v-9.9l4-2v3.7l2-1Z" />
                                        </g>
                                    </svg>
                                </span>
                                <span className='text-sm font-medium'>Package</span>
                            </li>
                            <li className='flex flex-row justify-center place-items-center gap-2 cursor-pointer'>
                                <span>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className='cursor-pointer'>
                                        <title>Car clock</title>
                                        <path d="M18 0c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6Zm3 7h-4V2h2v3h2v2Z" fill="currentColor" />,
                                        <path d="M18.2 14H18c-3.7 0-6.9-2.6-7.8-6H6.4c-.9 0-1.6.5-1.9 1.3L2.8 14H1v3h1v6h4v-1h9v1h4v-6h1v-3h-1.8ZM8 19H4v-2h4v2Zm9 0h-4v-2h4v2Z" fill="currentColor" />
                                    </svg>
                                </span>
                                <span className='text-sm font-medium cursor-pointer'>Rentals</span>
                            </li>
                            <li className='flex flex-row justify-center place-items-center gap-2 cursor-pointer'>
                                <span>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className='cursor-pointer'>
                                        <title>Bus</title>
                                        <path d="M23 9h-1V5c0-2.21-1.79-4-4-4H6C3.79 1 2 2.79 2 5v4H1v5h1v9h4v-2h12v2h4v-9h1V9Zm-4-3v7H5V6h14ZM9 18H5v-2h4v2Zm10-2v2h-4v-2h4Z" fill="currentColor" />
                                    </svg>
                                </span>
                                <span className='text-sm font-medium cursor-pointer'>Shuttle</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='flex flex-row justify-center place-items-center gap-3 mr-16'>
                    <button className='bg-[#f3f3f3] font-medium px-4 py-1 rounded-full cursor-pointer'>Activity</button>
                    <div className='flex flex-row justify-center place-items-center gap-2'>
                        <span><i className="fa-regular fa-circle-user text-4xl opacity-70" /></span>
                        <span><i className="fa-solid fa-angle-down text-lg" /></span>
                    </div>
                </div>
            </header >
            <div className='h-1 bg-gray-100' />
            <main className='p-10 flex flex-row justify-between place-items-center gap-10'>
                <div className='h-fit relative' style={isClicked ? { width: '30%' } : { width: '45%' }}>
                    <div className='w-full h-full bg-gray-50 border-2 border-gray-100 rounded-lg p-4'>
                        {isClicked ? (
                            <>
                                {isRideStarted ? (
                                    <div className='w-full flex flex-col justify-center items-center gap-6'>
                                        <div className="w-full flex flex-row justify-center items-center gap-2 my-4">
                                            <span className="font-light w-[80%] text-nowrap overflow-x-hidden text-ellipsis">{rideRequest.pickup}</span>
                                            <div className="flex items-center justify-center h-fit w-full relative">
                                                <div className="w-3 h-3 bg-black rounded-full" />
                                                <div className="w-[70%] bg-black h-[0.3px] ml-1 mr-1" />
                                                <span className="absolute top-2 font-light text-sm">{rideRequest.distance}</span>
                                                <div className="w-3 h-3 bg-black" />
                                            </div>
                                            <span className="font-light w-[80%] text-nowrap overflow-x-hidden text-ellipsis">{rideRequest.destination}</span>
                                        </div>
                                        <div>
                                            <span className='text-xl font-light'><b>Total fare :</b> &#8377;{rideRequest.fare}</span>
                                        </div>
                                        <button className='bg-black text-white w-full py-2 rounded-lg' onClick={resetAll}>Finish Ride</button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col justify-center place-items-center">
                                        <div className="flex flex-col justify-center place-items-center gap-2 my-8">
                                            <FourDigitInput otp={fourDigit} setOtp={setFourDigit} />
                                            <span className="text-lg font-light">Enter 4 digit code</span>
                                        </div>
                                        <button className="bg-black border-2 border-black w-[60%] py-2 text-white rounded-full text-lg"
                                            onClick={startRide}>Start Ride</button>
                                    </div>
                                )}
                            </>
                        ) : (<>
                            {rideRequest ? (
                                <>
                                    {(isClicked2 && rideRequest) && (
                                        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-lg w-11/12 max-w-md border border-gray-200 z-50">
                                            <h2 className="text-lg font-bold text-gray-800 mb-2">
                                                New Ride Request
                                            </h2>
                                            <p className="text-gray-700">
                                                <strong>Rider:</strong> {rideRequest.userID.fullname.firstname} {rideRequest.userID.fullname.lastname}
                                            </p>
                                            <button onClick={() => setIsClicked2(false)}
                                                className="mt-3 bg-blue-600 text-white px-5 py-1 rounded-lg shadow hover:bg-blue-700 focus:outline-none">
                                                OK
                                            </button>
                                        </div>
                                    )}
                                    <div className="flex flex-col justify-center place-items-center gap-2">
                                        <img src={user_logo} alt="user.jpg" className="w-20 rounded-full" />
                                        <p className="text-3xl font-medium">{rideRequest.userID.fullname.firstname} {rideRequest.userID.fullname.lastname}</p>
                                    </div>
                                    <div className="w-full flex flex-row justify-center items-center gap-2 my-8">
                                        <span className="font-light">{rideRequest.pickup}</span>
                                        <div className="flex items-center justify-center h-fit w-full relative">
                                            <div className="w-3 h-3 bg-black rounded-full" />
                                            <div className="w-[70%] bg-black h-[0.3px] ml-1 mr-1" />
                                            <span className="absolute top-2 font-light">{rideRequest.distance}</span>
                                            <div className="w-3 h-3 bg-black" />
                                        </div>
                                        <span className="font-light">{rideRequest.destination}</span>
                                    </div>
                                    <div className="flex flex-row justify-between place-items-center gap-4 mt-12">
                                        <button className="bg-black py-2 px-7 rounded-full text-white border-2 border-black hover:bg-white hover:text-black"
                                            onClick={confirmRide}>Accept</button>
                                        <span className="text-3xl">&#8377;{rideRequest.fare}</span>
                                        <button className="bg-white py-2 px-7 rounded-full text-black border-2 border-black hover:bg-black hover:text-white"
                                            onClick={() => setRideRequest(null)}>Decline</button>
                                    </div>
                                </>
                            ) : (
                                <div className="text-3xl font-medium text-center">No Ride Requests....</div>
                            )}</>)}
                    </div>
                </div>
                <div className='h-[71.5vh]' style={isClicked ? { width: '70%' } : { width: '55%' }}>
                    <LiveTracking />
                </div>
            </main >
        </>
    )
}
