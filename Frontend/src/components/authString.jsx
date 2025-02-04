import { NavLink } from 'react-router-dom'

export const AuthString = ({ text, link }) => {
    return (
        <NavLink to={link} className="cursor-pointer hover:opacity-70 w-full">
            <div className="flex flex-col justify-between place-items-center cursor-pointer">
                <div className="flex flex-row justify-center place-items-center cursor-pointer gap-14 pb-6 pt-3">
                    <span className="text-3xl font-semibold w-80 cursor-pointer">{text}</span>
                    <span className="text-3xl font-semibold"><i className="fa-solid fa-arrow-right cursor-pointer" /></span>
                </div>
                <div className="h-[0.6px] w-full bg-black opacity-70 cursor-pointer" />
            </div>
        </NavLink>
    )
}
