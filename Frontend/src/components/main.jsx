import ride from '../assets/png/ride.png';
import carRentals from '../assets/png/car-rentals.png';
import reserveClock from '../assets/png/reserve_clock.png';
import { SuggestionCard } from './suggestionCard';
import { LiveTracking } from './LiveTracking';
import { useNavigate } from 'react-router-dom';

export const Main = () => {
    const navigate = useNavigate();
    return (
        <main className='p-20 max-[1024px]:px-12 max-[1024px]:py-15'>
            <div className="flex flex-row justify-center items-center gap-4 max-[607.5px]:flex-wrap max-[607.5px]:gap-20 max-[425.5px]:w-full">
                <div className="w-1/2 max-[607.5px]:w-[80%]">
                    <h1 className="text-6xl font-semibold text-wrap mb-10">Go anywhere</h1>
                    <div className="relative w-full">
                        <input
                            type="text"
                            name="pickup"
                            placeholder="Pickup location"
                            autoComplete='on'
                            list="pickup-options"
                            className="bg-gray-100 font-light w-[75%] max-[431px]:w-full h-[3.25rem] rounded-lg pl-12 placeholder:text-lg placeholder:text-black" />
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.75em" height="1.75em" viewBox="0 0 24 24" fill="none" aria-label="Pickup location"
                            className="pe-location-fetch css-bOZeEP absolute right-[8.5rem] top-3 max-[1025px]:right-[7.5rem] max-[431px]:right-[1rem]" role="button" tabIndex="0">
                            <path d="M10.5 13.5.5 11 21 3l-8 20.5-2.5-10Z" fill="currentColor" />
                        </svg>
                        <br />
                        <div className="flex flex-col items-center justify-center h-fit w-fit absolute top-5 left-4">
                            <div className="w-3 h-3 bg-black rounded-full" />
                            <div className="w-[0.5px] bg-black h-12 mt-2 mb-2" />
                            <div className="w-3 h-3 bg-black" />
                        </div>
                        <br />
                        <input
                            type="text"
                            name="drop"
                            placeholder="Dropoff location"
                            autoComplete='on'
                            className="bg-gray-100 font-light w-[75%] max-[431px]:w-full h-[3.25rem] rounded-lg pl-12 placeholder:text-lg placeholder:text-black" />
                        <div className="flex flex-row justify-between place-items-center w-[75%] gap-4 mt-5 max-[425.5px]:w-full">
                            <input
                                type="date"
                                name="date"
                                className="bg-gray-100 font-light w-[50%] h-[3.25rem] rounded-xl px-4" />
                            <input
                                type="time"
                                name="time"
                                className="bg-gray-100 font-light w-[50%] h-[3.25rem] rounded-xl px-4" />
                        </div>
                        <button
                            onClick={() => navigate("/user-home")}
                            className="bg-black px-7 max-[425.5px]:px-10 py-3 text-white rounded-lg mt-5 max-[425.5px]:">See prices</button>
                    </div>
                </div>
                <div className="h-[30rem] w-1/2 max-[1024px]:h-[27rem] max-[607.5px]:w-[80%] max-[431px]:w-full" >
                    <LiveTracking />
                </div>
            </div>
            <div className='mt-28'>
                <h1 className='text-4xl font-semibold mb-12'>Suggestions</h1>
                <div className='flex flex-row justify-between place-items-center gap-5 max-[607.5px]:flex-wrap'>
                    <SuggestionCard
                        image={ride}
                        heading='Ride'
                        text='Go anywhere. Request a ride, hop in, and go.'
                        btn_text='Details'
                    />
                    <SuggestionCard
                        image={carRentals}
                        heading='Rental Cars'
                        text='Your perfect rental car is a few click away. Learn more about Rent.'
                        btn_text='Details'
                    />
                    <SuggestionCard
                        image={reserveClock}
                        heading='Reserve'
                        text='Reserve your ride in advance so you can relax on the day of your trip.'
                        btn_text='Reserve'
                    />
                </div>
            </div>
        </main >
    )
}
