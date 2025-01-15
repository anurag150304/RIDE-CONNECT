export const SuggestionBox = ({ type, DATA = {}, setSuggestionsAndClick }) => {
    const suggestions = type === "pickup" ? DATA.pickup : DATA.drop;
    return (
        <div className="h-56 w-full bg-white p-4 rounded-xl absolute z-10" style={{ boxShadow: '0px 0px 13px #0000003c' }}>
            <ul className="h-full w-full overflow-y-scroll flex flex-col justify-start place-items-center gap-4">
                {suggestions.map((value, idx) => (
                    <li key={idx} className="flex flex-row justify-start place-items-center gap-2 w-full hover:bg-gray-100 py-3 px-2 rounded-xl
                    hover:shadow-lg shadow-black cursor-pointer"
                        onClick={() => setSuggestionsAndClick(value.description, type)}>
                        <span className="bg-gray-200 w-[2.65rem] h-9 rounded-full flex flex-row justify-center place-items-center cursor-pointer">
                            <i className="fa-solid fa-location-dot cursor-pointer" />
                        </span>
                        <span className="font-light w-full text-nowrap text-ellipsis overflow-x-hidden cursor-pointer">{value.description}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};