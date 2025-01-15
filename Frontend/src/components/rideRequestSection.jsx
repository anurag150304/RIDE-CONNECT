import user_icon from '../assets/png/user_icon.png';

export const RideRequestSection = ({ riderName, pickup, drop, fair, distance, setDetails, setCkicked }) => {
    const addData = () => {
        setCkicked(true)
        setDetails(values => {
            return { ...values, riderName, pickup, drop, fair, distance }
        });
    }
    return (
        <div className="flex flex-row justify-between place-items-center gap-4 w-full rounded-xl
         bg-gray-50 p-4 cursor-pointer border-2 border-gray-100" onClick={() => addData()}>
            <div className="flex flex-col justify-center place-items-center">
                <img src={user_icon} alt="user.png" className='w-12 rounded-2xl' />
                <span>{riderName}</span>

            </div>
            <div className="flex flex-row justify-center place-items-center gap-1">
                <span>{pickup}</span>
                <div className="flex items-center justify-center h-fit w-fit">
                    <div className="w-2 h-2 bg-black rounded-full" />
                    <div className="w-10 bg-black h-[0.3px] ml-1 mr-1" />
                    <div className="w-2 h-2 bg-black" />
                </div>
                <span>{drop}</span>
            </div>
            <div className='flex flex-col justify-center place-items-end'>
                <span className='text-2xl'>&#8377;{fair}</span>
                <span className='font-light'>{distance}</span>
            </div>
        </div>
    )
}
