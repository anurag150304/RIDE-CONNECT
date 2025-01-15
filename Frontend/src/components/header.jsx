import uberLogo from '../assets/png/Uber_logo_white.png';
import { NavLink, useLocation } from 'react-router-dom'
import { AuthHeader } from './authHeader';
import { useState } from 'react';

export const Header = () => {
    const location = useLocation();
    const hideComponent = ['/user-login', '/driver-login', '/user-signup', '/driver-signup'].includes(location.pathname);
    const [isClicked, setIsClicked] = useState(false);
    const [Auth, setAuth] = useState("");

    const handleHeader = (e) => {
        setAuth(e.target.innerText);
        setIsClicked(true);
    }
    return (
        <>
            <header className="px-16 bg-black text-white flex flex-row justify-between place-items-center py-3.5 max-[1135.5px]:px-5 relative z-10">
                <nav className='h-fit w-fit flex flex-row justify-between place-items-center gap-10'>
                    <div>
                        <NavLink to='/'><img src={uberLogo} alt="png" className='w-16 cursor-pointer' /></NavLink>
                    </div>
                    {!hideComponent && <ul className="list-none flex flex-row place-items-center gap-8 text-base font-normal max-[1135px]:hidden">
                        <li><NavLink to='/user-login' className='cursor-pointer'>Ride</NavLink></li>
                        <li><NavLink to='/driver-login' className='cursor-pointer'>Drive</NavLink></li>
                        <li className='cursor-pointer'>Business</li>
                        <li className='cursor-pointer'>Uber Eats</li>
                        <li>
                            <div>About &nbsp;<i className="fa-solid fa-angle-down cursor-pointer" /></div>
                        </li>
                    </ul>}
                </nav>
                {!hideComponent && <div className='flex flex-row justify-center place-items-center gap-8'>
                    <ul className='h-fit w-fit flex flex-row justify-between place-items-center gap-8 max-[1135px]:hidden'>
                        <li><span className='flex flex-row justify-center place-items-center gap-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none">
                                <path d="M12 1C5.9 1 1 5.9 1 12s4.9 11 11 11 11-4.9 11-11S18.1 1 12 1Zm8 11c0 .7-.1 1.4-.3 2-.6-1.5-1.6-3.1-3-4.7l1.8-1.8c1 1.3 1.5 2.8 1.5 4.5ZM6.5 6.5c1.3 0 3.6.8 6 2.9l-3.2 3.2C7.1 9.8 6.5 7.5 6.5 6.5Zm8.1 5c2.3 2.7 2.9 5 2.9 6-1.3 0-3.6-.8-6-2.9l3.1-3.1Zm1.9-6.1-1.9 1.9c-1.6-1.4-3.2-2.4-4.7-3 .7-.2 1.3-.3 2-.3 1.8 0 3.3.5 4.6 1.4ZM4 12c0-.7.1-1.4.3-2 .6 1.5 1.6 3.1 3 4.7l-1.8 1.8C4.5 15.2 4 13.7 4 12Zm3.5 6.6 1.9-1.9c1.6 1.4 3.2 2.4 4.7 3-.7.2-1.3.3-2 .3-1.8 0-3.3-.5-4.6-1.4Z" fill="currentColor" />
                            </svg> EN</span></li>
                        <li><NavLink to='/help'>Help</NavLink></li>
                    </ul>
                    <div>
                        <button onClick={(e) => handleHeader(e)} className='mr-5'>Log in</button>
                        <button onClick={(e) => handleHeader(e)} className='bg-white text-black py-1.5 px-3.5 rounded-full font-medium cursor-pointer'>Sign up</button>
                    </div>
                </div>}
            </header>
            <AuthHeader clicked={isClicked} setClicked={setIsClicked} Auth={Auth} />
        </>
    )
}
