import ride from '../assets/png/ride.png';
import carRentals from '../assets/png/car-rentals.png';
import reserveClock from '../assets/png/reserve_clock.png';
import earnerIllustra from '../assets/images/earner-illustra.webp'
import square from '../assets/images/u4b-square.webp';
import homePage from '../assets/images/OOW_homepage_highlight.webp';
import uberOne from '../assets/images/uber-one.webp';
import userUber from '../assets/images/Final-Download-Uber-App.webp';
import driverUber from '../assets/images/driver-app.webp';
import { SuggestionCard } from './suggestionCard';
import { LiveTracking } from './LiveTracking';

export const Main = () => {
    return (
        <>
            <main className='p-20'>
                <div className="flex flex-row justify-center">
                    <div className="w-1/2">
                        <h1 className="text-6xl font-semibold text-wrap mb-4">Go anywhere <br />with Uber</h1>
                        <div className="w-44 flex flex-row justify-between place-items-center mb-12">
                            <div>
                                <button className="p-2 bg-gray-200 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="m20.9 9-1.5-4.6c-.3-.8-1-1.4-1.9-1.4H6.4c-.9 0-1.6.5-1.9 1.4L3 9H1v3h1v9h4v-2h12v2h4v-9h1V9h-2.1ZM5 14h4v2H5v-2Zm10 2v-2h4v2h-4ZM7.1 6h9.7l1.3 4H5.8l1.3-4Z" fill="currentColor" />
                                    </svg>
                                </button>
                                <p className="font-medium">Ride</p>
                            </div>
                            <div>
                                <button className="p-2 bg-gray-200 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <g fill="currentColor">
                                            <path fillRule="evenodd" clipRule="evenodd" d="m18.41 2.41 3.17 3.17a4.834 4.834 0 0 1 0 6.84L16.5 17.5l-10-10 5.08-5.09C12.53 1.47 13.76 1 15 1c1.24 0 2.47.47 3.41 1.41ZM13.25 8 16 10.75l2.25-2.25-2.75-2.75L13.25 8Z" />
                                            <path d="M2 21 .5 19.5l7.25-7.25 3.5 3.5L6 21H2Z" />
                                        </g>
                                    </svg>
                                </button>
                                <p className="font-medium">Rent</p>
                            </div>
                        </div>
                        <div className="relative">
                            <input type="text" name="pickup" placeholder="Pickup location"
                                className="bg-gray-100 font-light w-[75%] h-[3.25rem] rounded-lg pl-12 placeholder:text-lg placeholder:text-black" />
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.75em" height="1.75em" viewBox="0 0 24 24" fill="none" aria-label="Pickup location"
                                className="pe-location-fetch css-bOZeEP absolute right-40 top-3" role="button" tabIndex="0">
                                <path d="M10.5 13.5.5 11 21 3l-8 20.5-2.5-10Z" fill="currentColor" />
                            </svg>
                            <br />
                            <div className="flex flex-col items-center justify-center h-fit w-fit absolute top-5 left-4">
                                <div className="w-3 h-3 bg-black rounded-full" />
                                <div className="w-[0.5px] bg-black h-12 mt-2 mb-2" />
                                <div className="w-3 h-3 bg-black" />
                            </div>
                            <br />
                            <input type="text" name="drop" placeholder="Dropoff location"
                                className="bg-gray-100 font-light w-[75%] h-[3.25rem] rounded-lg pl-12 placeholder:text-lg placeholder:text-black" />
                            <div className="flex flex-row justify-between place-items-center w-[75%] gap-4 mt-5">
                                <input type="date" name="date" className="bg-gray-100 font-light w-[50%] h-[3.25rem] rounded-xl px-4" />
                                <input type="time" name="time" className="bg-gray-100 font-light w-[50%] h-[3.25rem] rounded-xl px-4" />
                            </div>
                            <button className="bg-black px-7 py-3 text-white rounded-lg mt-5">See prices</button>
                        </div>
                    </div>
                    <div className="h-[32rem] w-1/2" >
                        <LiveTracking />
                    </div>
                </div>
                <div className='mt-36'>
                    <h1 className='text-4xl font-semibold mb-12'>Suggestions</h1>
                    <div className='flex flex-row justify-between place-items-center gap-5'>
                        <SuggestionCard
                            image={ride}
                            heading='Ride'
                            text='Go anywhere with Uber. Request a ride, hop in, and go.'
                            btn_text='Details'
                        />
                        <SuggestionCard
                            image={carRentals}
                            heading='Rental Cars'
                            text='Your perfect rental car is a few click away. Learn more about Uber Rent.'
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
                <div className='mt-36 pb-20 flex flex-col gap-32'>
                    <section className='flex flex-row justify-between place-items-center gap-36'>
                        <div><img src={earnerIllustra} alt="earner-illustra" className='w-[90em]' /></div>
                        <div>
                            <h1 className='text-6xl font-medium'>Drive when you want, make what you need</h1>
                            <p className='text-lg my-8'>Make money on your schedule with deliveries or rides—or both. You can use your own car or choose a rental through Uber.</p>
                            <div>
                                <button className='bg-black text-white px-7 py-3 rounded-lg font-medium'>Get started</button>
                                <button className='text-lg ml-8 decoration-1 underline underline-offset-8 opacity-80 hover:opacity-100'>Already have an account? Sign in</button>
                            </div>
                        </div>
                    </section>
                    <section className='flex flex-row justify-between place-items-center gap-36'>
                        <div>
                            <h1 className='text-6xl font-medium'>The Uber you know, reimagined for business</h1>
                            <p className='text-lg my-8'>Uber for Business is a platform for managing global rides and meals, and local deliveries, for companies of any size.</p>
                            <div>
                                <button className='bg-black text-white px-7 py-3 rounded-lg font-medium'>Get started</button>
                                <button className='text-lg ml-8 decoration-1 underline underline-offset-8 opacity-80 hover:opacity-100'>Check out our solutions</button>
                            </div>
                        </div>
                        <div><img src={square} alt="earner-illustra" className='w-[90em]' /></div>
                    </section>
                    <section className='flex flex-row justify-between place-items-center gap-36'>
                        <div><img src={homePage} alt="earner-illustra" className='w-[110em]' /></div>
                        <div>
                            <h1 className='text-6xl font-medium'>We’re on our way so you can be on yours</h1>
                            <p className='text-lg my-8'>On our way: 3 little words that shape everything we do. And we’re not just talking about a simple ride or meal. Check out our new brand campaign, a celebration of how showing up for others can lead to amazing things.</p>
                            <div>
                                <button className='bg-black text-white px-7 py-3 rounded-lg font-medium'>Learn more</button>
                            </div>
                        </div>
                    </section>
                    <section className='flex flex-row justify-between place-items-center gap-36'>
                        <div>
                            <h1 className='text-6xl font-medium'>Save on Uber and Uber Eats with Uber One membership</h1>
                            <p className='text-lg mt-8 mb-4'>Become an Uber One member for savings and exclusive perks on Uber and Uber Eats.</p>
                            <p className='text-lg mb-8'>Sign up for just $9.99/month.</p>
                            <div>
                                <button className='bg-black text-white px-7 py-3 rounded-lg font-medium'>Sign up to save</button>
                            </div>
                        </div>
                        <div><img src={uberOne} alt="earner-illustra" className='w-[90em]' /></div>
                    </section>
                </div>
            </main >
            <div className='bg-[#f6f6f6] pt-40 pb-16 px-16 flex justify-center place-items-center gap-10'>
                <div className='w-1/2 h-56 bg-white flex justify-between place-items-center px-8 rounded-md'>
                    <img src={userUber} alt="QR-Code" className='w-[32%]' />
                    <div>
                        <p className='text-2xl font-medium'>Download the Uber app</p>
                        <p className='text-lg'>Scan to download</p>
                    </div>
                    <span><i className="fa-solid fa-arrow-right text-xl" /></span>
                </div>
                <div className='w-1/2 h-56 bg-white flex justify-between place-items-center px-8 rounded-md'>
                    <img src={driverUber} alt="QR-Code" className='w-[32%]' />
                    <div>
                        <p className='text-2xl font-medium'>Download the Driver app</p>
                        <p className='text-lg'>Scan to download</p>
                    </div>
                    <span><i className="fa-solid fa-arrow-right text-xl" /></span>
                </div>
            </div>
        </>
    )
}
