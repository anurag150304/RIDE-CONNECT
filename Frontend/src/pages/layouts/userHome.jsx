import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/png/Uber_logo.png';
import { useContext, useState, useEffect } from 'react';
import car from '../../assets/png/car.png';
import Uber_xl from '../../assets/png/Uber_xl.png';
import ride from '../../assets/png/ride.png';
import bike from '../../assets/png/bike.png';
import premium from '../../assets/png/premium.png';
import driver_logo from '../../assets/png/driver_logo.jpeg'
import { OptionCard } from '../../components/optionCard'
import { SuggestionBox } from '../../components/suggestionBox';
import { rideContextData } from '../../context/rideContext';
import { SocketContext } from '../../context/socketContext';
import { userContextData } from '../../context/userContext';
import { LiveTracking } from '../../components/LiveTracking';

export const UserHome = () => {
    const [suggestions, setSuggestions] = useState({ pickup: [], drop: [] });
    const [isSuggestionBoxVisible, setIsSuggestionBoxVisible] = useState(false);
    const [acceptedDriver, setAcceptedDriver] = useState(null);
    const [fares, setFares] = useState({ car: 0, motorcycle: 0, auto: 0 });
    const [isClicked, setIsClicked] = useState(false);
    const [isClicked2, setIsClicked2] = useState(true);
    const [isClicked3, setIsClicked3] = useState(false);
    const [isRideStarted, setIsRideStarted] = useState(false);
    const { rideData, setRideData } = useContext(rideContextData);
    const { user } = useContext(userContextData);
    const { sendMessage, receiveMessage, removeMessage } = useContext(SocketContext);
    const navigate = useNavigate();

    console.log("User Data : ", user)
    console.log("Ride Data : ", rideData)

    // Join user to the socket room
    useEffect(() => {
        sendMessage("join", { userId: user._id, userType: "user" });
    }, [user, sendMessage]);

    // Handle socket messages
    useEffect(() => {
        const handleRideConfirmed = (data) => setAcceptedDriver(data);
        const handleRideStarted = () => setIsRideStarted(true);
        const handleRideEnded = () => {
            setRideData({ pickup: "", drop: "", vehicleType: "Standard", date: "", time: "", fare: "" });
            setIsClicked(false);
            setIsClicked2(true);
            setIsClicked3(false);
            setAcceptedDriver(null);
            setFares({ car: 0, motorcycle: 0, auto: 0 });
            setIsSuggestionBoxVisible(false);
            navigate("/user-home");
        }

        receiveMessage("ride-confirmed", handleRideConfirmed);
        receiveMessage("ride-started", handleRideStarted);
        receiveMessage("ride-ended", handleRideEnded);

        return () => {
            removeMessage("ride-confirmed", handleRideConfirmed);
            removeMessage("ride-started", handleRideStarted);
            receiveMessage("ride-ended", handleRideEnded);
        };
    }, [receiveMessage, removeMessage]);

    // Update suggestion visibility
    useEffect(() => {
        if (suggestions) {
            setIsSuggestionBoxVisible(suggestions.pickup.length > 0 || suggestions.drop.length > 0);
        }
    }, [suggestions]);

    // Fetch location suggestions
    const getSuggestions = async (e) => {
        const input = e.target.value.trim();
        const fieldName = e.target.name;

        if (!input) {
            setSuggestions((prev) => ({ ...prev, [fieldName]: [] }));
            setRideData((prev) => ({ ...prev, [fieldName]: "" }));
            return;
        }
        setRideData((prev) => ({ ...prev, [fieldName]: input }));

        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input },
                headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
            });

            if (response.status === 200) {
                setSuggestions((prev) => ({ ...prev, [fieldName]: response.data.suggestions }));
            }
        } catch (error) {
            console.error("Error fetching suggestions:", error.response.data.message);
        }
    };

    // Handle suggestion selection
    const handleSuggestionClick = (location, type) => {
        setIsSuggestionBoxVisible(false);
        setSuggestions((prev) => ({ ...prev, [type]: [] }));
        setRideData((prev) => ({ ...prev, [type]: location }));
    };

    // Fetch ride fares
    const getRideDetails = async () => {
        setIsClicked(true);

        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fares`, {
                params: { pickup: rideData.pickup, destination: rideData.drop },
                headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
            });

            if (response.status === 200) setFares(response.data);
        } catch (error) {
            console.error("Error fetching ride details:", error.response.data.message);
        }
    };

    // Create a new ride
    const createNewRide = async () => {
        setIsClicked3(true);
        const vehicleTypeMap = {
            "Standard": "car",
            "Standard XL": "car",
            "Go Sedan": "car",
            "Premier": "car",
            "Moto": "motorcycle",
            "Auto": "auto"
        };

        try {
            await axios.post(
                `${import.meta.env.VITE_BASE_URL}/rides/create`,
                {
                    pickup: rideData.pickup,
                    destination: rideData.drop,
                    vehicleType: vehicleTypeMap[rideData.vehicleType],
                    fare: parseFloat(rideData.fare).toFixed(2),
                },
                { headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` } }
            );
        } catch (error) {
            console.error("Error creating ride:", error.response.data.message);
        }
    };
    return (
        <>
            <header className='flex flex-row justify-between place-items-center px-2 py-2'>
                <div className='flex flex-row justify-center place-items-center'>
                    <div className='mx-16'>
                        <Link to={'/user-home'} className='text-3xl font-medium'>Ride-Connect</Link>
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
            <main className='p-10 flex flex-row justify-between place-items-start gap-10'>
                <div className='h-[71.5vh] w-[40%] relative'>
                    {isClicked3 ? (
                        <>
                            {acceptedDriver ? (
                                <div className='p-4 border-2 border-gray-200 rounded-2xl'>
                                    <div className='w-full flex flex-col justify-center items-center gap-2'>
                                        <img src={driver_logo} alt="driver.jpeg" className='w-[30%]' />
                                        <span className='text-3xl font-medium mb-3'>{acceptedDriver.captain.fullname.firstname} {acceptedDriver.captain.fullname.lastname}</span>
                                    </div>
                                    <hr />
                                    <div className='w-full flex flex-row justify-between items-center my-4'>
                                        <span className='text-2xl font-medium'>{acceptedDriver.otp}</span>
                                        <div className='flex flex-col justify-center items-end'>
                                            <span className='text-2xl font-medium'>{acceptedDriver.captain.vehicle.plate}</span>
                                            <span className='text-xl font-light'>{acceptedDriver.captain.vehicle.model}</span>
                                        </div>
                                    </div>
                                    <hr />
                                    <p className='text-lg font-light mt-2 text-center'>Share the 4 digit code with you driver</p>
                                </div>
                            ) : (<div className='h-full w-full border-2 border-gray-100 rounded-xl overflow-y-scroll p-4 flex flex-col justify-start items-center'>
                                <div className='w-full flex flex-col justify-center items-start gap-2 mb-4'>
                                    <h1 className='text-2xl font-medium'>Looking for nearby drivers</h1>
                                    <div className='expand' />
                                </div>
                                <div className='w-full flex flex-row justify-center place-items-center my-12'>
                                    <img src={
                                        rideData.vehicleType === "Standard" ? car :
                                            rideData.vehicleType === "Standard XL" ? Uber_xl :
                                                rideData.vehicleType === "Go Sedan" ? ride :
                                                    rideData.vehicleType === "Premier" ? premium : bike}
                                        alt="vehicle.png"
                                        className='w-[30%]'
                                    />
                                </div>
                                <div className='border-b-2 border-gray-200 w-full' />
                                <div>
                                    <ul className='flex flex-col justify-center items-start gap-4'>
                                        <li className='flex justify-start items-center gap-5 p-4 border-b-2 border-gray-200 cursor-pointer'>
                                            <div className="p-[0.30rem] h-fit w-fit bg-black rounded-full flex justify-center items-center cursor-pointer" >
                                                <div className='bg-white rounded-full w-2 h-2 cursor-pointer' />
                                            </div>
                                            <div className='cursor-pointer'>
                                                <p className='cursor-pointer'>{rideData.pickup}</p>
                                            </div>
                                        </li>
                                        <li className='flex justify-start items-center gap-5 p-4 border-b-2 border-gray-200 cursor-pointer'>
                                            <div className=" bg-black p-[0.30rem] h-fit w-fit flex justify-center items-center cursor-pointer" >
                                                <div className='bg-white w-2 h-2 cursor-pointer' />
                                            </div>
                                            <div className='cursor-pointer'>
                                                <p className='cursor-pointer'>{rideData.drop}</p>
                                            </div>
                                        </li>
                                        <li className='flex justify-start items-center gap-5 p-4 border-b-2 border-gray-200 cursor-pointer w-full'>
                                            <span className='cursor-pointer'><i className="fa-solid fa-wallet text-2xl cursor-pointer" /></span>
                                            <div className='flex flex-col justify-center items-start h-fit w-full cursor-pointer'>
                                                <span className='text-xl font-meduim cursor-pointer'>&#8377;{rideData.fare}</span>
                                                <span className='text-lg font-light cursor-pointer'>Cash</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>)}
                        </>
                    ) : (
                        <>
                            <div className='border-2 border-gray-100 rounded-lg py-4 px-4' style={isClicked ? { display: 'none' } : { display: 'block' }}>
                                <h1 className='text-xl font-semibold mb-4'>Get a ride</h1>
                                <div className='relative'>
                                    <input
                                        type="text"
                                        name="pickup"
                                        value={rideData.pickup}
                                        onChange={(e) => getSuggestions(e)}
                                        placeholder="Pickup location"
                                        autoComplete='off'
                                        list="pickup-options"
                                        className="bg-gray-100 font-light w-[100%] h-[3rem] rounded-lg px-12 placeholder:text-base placeholder:text-black cursor-text"
                                    />
                                    {(isSuggestionBoxVisible && suggestions.pickup.length > 0) && <SuggestionBox type={"pickup"} DATA={suggestions} setSuggestionsAndClick={handleSuggestionClick} />}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.75em" height="1.75em" viewBox="0 0 24 24" fill="none" aria-label="Pickup location"
                                        className="pe-location-fetch css-bOZeEP absolute right-3 top-3" role="button" tabIndex="0">
                                        <path d="M10.5 13.5.5 11 21 3l-8 20.5-2.5-10Z" fill="currentColor" />
                                    </svg>
                                    <br />
                                    <div className="flex flex-col items-center justify-center h-fit w-fit absolute top-5 left-4">
                                        <div className="w-3 h-3 bg-black rounded-full" />
                                        <div className="w-[0.5px] bg-black h-10 mt-2 mb-2" />
                                        <div className="w-3 h-3 bg-black" />
                                    </div>
                                    <br />
                                    <input
                                        type="text"
                                        name="drop"
                                        value={rideData.drop}
                                        placeholder="Dropoff location"
                                        autoComplete='off'
                                        onChange={(e) => getSuggestions(e)}
                                        className="bg-gray-100 font-light w-[100%] h-[3rem] rounded-lg px-12 placeholder:text-base placeholder:text-black cursor-text"
                                    />
                                    {(isSuggestionBoxVisible && suggestions.drop.length > 0) && <SuggestionBox type={"drop"} DATA={suggestions} setSuggestionsAndClick={handleSuggestionClick} />}
                                    <div className="flex flex-row justify-between place-items-center w-[100%] gap-4 mt-5">
                                        <input
                                            type="date"
                                            name="date"
                                            value={rideData.date}
                                            onChange={(e) => setRideData(values => { return { ...values, [e.target.name]: e.target.value } })}
                                            className="bg-gray-100 font-light w-[50%] h-[3.25rem] rounded-xl px-4"
                                        />
                                        <input
                                            type="time"
                                            name="time"
                                            value={rideData.time}
                                            onChange={(e) => setRideData(values => { return { ...values, [e.target.name]: e.target.value } })}
                                            className="bg-gray-100 font-light w-[50%] h-[3.25rem] rounded-xl px-4"
                                        />
                                    </div>
                                    <button
                                        disabled={!rideData.pickup || !rideData.drop || !rideData.date || !rideData.time}
                                        className="bg-black px-7 py-3 text-white rounded-lg mt-5 w-full"
                                        style={!rideData.pickup || !rideData.drop || !rideData.date || !rideData.time ? { cursor: 'not-allowed', opacity: 0.9 } : { cursor: 'pointer', opacity: 1 }}
                                        onClick={getRideDetails}
                                    >
                                        Search
                                    </button>
                                </div>
                            </div>
                            <div
                                style={isClicked ? { display: 'block', padding: '0 0.5rem 0 0' } : { display: 'none', padding: '0 1.25rem 0 0' }}
                                className='h-[71.5vh] overflow-y-scroll rounded-lg'>
                                <h1 className='text-4xl font-medium'>Choose a ride</h1>
                                <div className='w-full my-4 border-2 border-gray-100 rounded-xl p-4 flex flex-col justify-between place-items-start'>
                                    <div className='flex flex-row justify-between place-items-center gap-2 w-full'>
                                        <span className='font-medium w-1/2 overflow-x-hidden text-nowrap text-ellipsis'>{rideData.pickup}</span>
                                        <span><i className="fa-solid fa-arrow-right" /></span>
                                        <span className='font-medium w-1/2 overflow-x-hidden text-nowrap text-ellipsis'>{rideData.drop}</span>
                                    </div>
                                    <p className='text-sm opacity-80'>Leave Now</p>
                                </div>
                                <div className='flex flex-col justify-start place-items-center gap-4'>
                                    <section>
                                        <p className="text-2xl font-medium mb-4">Recommended</p>
                                        <ul className="flex flex-col justify-start place-items-center gap-4">
                                            <OptionCard
                                                image={car}
                                                vehicleTyp={'Standard'}
                                                seats={4}
                                                delay={'3 mins away'}
                                                time={rideData.time}
                                                vehicleText={'Affordable compact rides'}
                                                discount={12}
                                                new_price={parseFloat(fares.car - fares.car * 0.12).toFixed(2)}
                                                old_price={fares.car}
                                            />
                                            <OptionCard
                                                image={Uber_xl}
                                                vehicleTyp={'Standard XL'}
                                                seats={6}
                                                delay={'7 mins away'}
                                                time={rideData.time}
                                                vehicleText={'Comfortable SUVs'}
                                                discount={8}
                                                new_price={parseFloat(
                                                    ((fares.car / 4) * 6 - (fares.car / 4) * 6 * 0.08) +
                                                    ((fares.car / 4) * 6 * 0.1)
                                                ).toFixed(2)}
                                                old_price={parseFloat(((fares.car / 4) * 6) + ((fares.car / 4) * 6 * 0.1)).toFixed(2)}
                                            />
                                            <OptionCard
                                                image={ride}
                                                vehicleTyp={'Go Sedan'}
                                                seats={4}
                                                delay={'7 mins away'}
                                                time={rideData.time}
                                                vehicleText={'Affordable sedans'}
                                                discount={5}
                                                new_price={parseFloat(
                                                    fares.car + fares.car * 0.3 - (fares.car + fares.car * 0.3) * 0.05
                                                ).toFixed(2)}
                                                old_price={parseFloat(fares.car + fares.car * 0.3).toFixed(2)}
                                            />
                                            <OptionCard
                                                image={premium}
                                                vehicleTyp={'Premier'}
                                                seats={4}
                                                delay={'3 mins away'}
                                                time={rideData.time}
                                                vehicleText={'Comfortable sedans top quality drivers'}
                                                discount={9}
                                                new_price={parseFloat(
                                                    fares.car + fares.car * 0.3 - (fares.car + fares.car * 1.2) * 0.09
                                                ).toFixed(2)}
                                                old_price={parseFloat(fares.car + fares.car * 0.3).toFixed(2)}
                                            />
                                            <OptionCard
                                                image={bike}
                                                vehicleTyp={'Moto'}
                                                seats={1}
                                                delay={'4 mins away'}
                                                time={rideData.time}
                                                vehicleText={'Affordable motorcycle rides'}
                                                discount={7}
                                                new_price={parseFloat(fares.motorcycle - fares.motorcycle * 0.07).toFixed(2)}
                                                old_price={fares.motorcycle}
                                            />
                                        </ul>
                                    </section>
                                </div>
                            </div>
                            {isClicked && (
                                <div className='absolute bottom-0 p-4 bg-white  rounded-xl shade flex flex-row justify-between place-items-center w-full'>
                                    <div className='h-9 rounded-full w-16 bg-[#e8e8e8] relative cursor-pointer' onClick={() => setIsClicked2(val => !val)}>
                                        <div className='h-9 w-9 rounded-full shadow-md shadow-black flex bg-black justify-center place-items-center absolute cursor-pointer'
                                            style={isClicked2 ? { left: '0px', backgroundColor: 'black' } : { right: '0px', backgroundColor: '#276ef1' }}>
                                            {isClicked2 ? (
                                                <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none"
                                                    className="_css-fIifVC" style={{ color: 'white' }}>
                                                    <title>Person</title>
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M17.5 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0ZM3 20c0-3.3 2.7-6 6-6h6c3.3 0 6 2.7 6 6v3H3v-3Z" fill="currentColor" />
                                                </svg>
                                            ) : (
                                                <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none"
                                                    className="_css-dfEXOe" style={{ color: 'white' }}>
                                                    <title>Briefcase</title>
                                                    <path d="M18 7V2H6v5H1v15h22V7h-5Zm-3 0H9V5h6v2Z" fill="currentColor" />
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                    <div className='flex flex-col justify-between place-items-start'>
                                        {isClicked2 ? (<span>Personal</span>) : (<span>Business</span>)}
                                        <span className='text-sm font-light'>Cash</span>
                                    </div>
                                    <button className='w-1/2 py-3 rounded-lg bg-black text-white' onClick={createNewRide}>Request {rideData.vehicleType}</button>
                                </div>
                            )}
                        </>
                    )}

                </div>
                <div className='h-[71.5vh] w-[60%]'>
                    <LiveTracking />
                </div>
            </main>
        </>
    )
}
