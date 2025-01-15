import { useContext } from "react";
import { rideContextData } from "../context/rideContext";

export const OptionCard = ({ image, vehicleTyp, seats, delay, time, vehicleText, discount, new_price, old_price }) => {
    const { setRideData } = useContext(rideContextData);
    return (
        <li className='flex flex-row justify-between place-items-center gap-4 w-full rounded-xl bg-gray-100 p-4 cursor-pointer'
            onClick={() => setRideData(values => {
                return { ...values, vehicleType: vehicleTyp, fare: new_price }
            })}>
            <div>
                <img src={image} alt="car.png" className='w-20 cursor-pointer' />
            </div>
            <div>
                <p>
                    <span className='text-2xl font-medium cursor-pointer'>{vehicleTyp}</span> &nbsp;
                    <span><i className="fa-solid fa-user cursor-pointer" style={{ fontSize: '0.7rem' }} /></span>&nbsp;
                    <span className="cursor-pointer">{seats}</span>
                </p>
                <p className='text-sm flex place-items-center gap-1 font-light cursor-pointer'>{delay}
                    <i className="fa-solid fa-circle cursor-pointer" style={{ fontSize: '0.2rem' }} />
                    {time}</p>
                <p className='font-light cursor-pointer'>{vehicleText}</p>
            </div>
            <div className='flex flex-col justify-center place-items-end cursor-pointer'>
                {discount && (
                    <span className='flex flex-row justify-start place-items-center text-sm cursor-pointer' style={{ color: '#06c167' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="cursor-pointer"
                            style={{ color: '#06c167' }}>
                            <title>Tag</title>
                            <path d="m10 24 12-12V2H12L0 14l10 10Z" fill="currentColor" />
                        </svg> {discount}% off
                    </span>
                )}
                {discount ? (
                    <>
                        <span className='text-2xl cursor-pointer'>&#8377;{new_price}</span>
                        <span className='line-through font-light cursor-pointer'>&#8377;{old_price}</span>
                    </>
                ) : (
                    <span className='text-2xl font-medium text-nowrap cursor-pointer'>Select Time</span>
                )}

            </div>
        </li>
    )
}
