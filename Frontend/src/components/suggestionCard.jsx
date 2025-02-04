export const SuggestionCard = ({ image, heading, text, btn_text }) => {
    return (
        <div className='h-44 w-[60%] flex flex-row justify-between place-items-center p-4 rounded-lg bg-gray-100 max-[431px]:w-full'>
            <div>
                <p className='text-lg font-medium'>{heading}</p>
                <p className='text-sm font-normal'>{text}</p>
                <button className='bg-white px-3 py-2 rounded-full mt-3 max-[425.5px]:px-6'>{btn_text}</button>
            </div>
            <div>
                <img src={image} alt="ride" className='w-[100%]' />
            </div>
        </div>
    )
}

