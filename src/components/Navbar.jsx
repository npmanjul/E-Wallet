import React from 'react'
import Themetoggle from './Themetoggle'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();

    const logout = () => {
        const theme = localStorage.getItem("theme");
            localStorage.clear()
            if (theme !== null) {
                localStorage.setItem('theme', theme);
            }
        navigate('/login');
    }

    const location = useLocation();

    return (
        <>
            <div className='fixed top-0 left-0 w-full z-10 flex justify-between items-center py-4 px-6 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 '>
                <Link to='/'>
                    <div className='font-bold text-3xl text-gray-800 dark:text-white flex items-center justify-center gap-2 '>
                        <span>
                            <svg class="w-10 h-10 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M12 14a3 3 0 0 1 3-3h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4a3 3 0 0 1-3-3Zm3-1a1 1 0 1 0 0 2h4v-2h-4Z" clip-rule="evenodd" />
                                <path fill-rule="evenodd" d="M12.293 3.293a1 1 0 0 1 1.414 0L16.414 6h-2.828l-1.293-1.293a1 1 0 0 1 0-1.414ZM12.414 6 9.707 3.293a1 1 0 0 0-1.414 0L5.586 6h6.828ZM4.586 7l-.056.055A2 2 0 0 0 3 9v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2h-4a5 5 0 0 1 0-10h4a2 2 0 0 0-1.53-1.945L17.414 7H4.586Z" clip-rule="evenodd" />
                            </svg>
                        </span>

                        E-Wallet
                    </div>
                </Link>

                <div className='flex justify-center items-center gap-2'>
                    <Themetoggle />
                    {
                        localStorage.getItem('userId') ? (
                            <div className='flex justify-center items-center gap-2 cursor-pointer invert-1 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 p-3 rounded-lg dark:hover:bg-slate-600 text-white  ' onClick={logout}>
                                <svg xmlns="http://www.w3.org/2000/svg" className='h-6 w-6 invert-[80%] dark:invert-0' viewBox="0 0 24 24" width="96" height="96" fill="rgba(255,255,255,1)"><path d="M5 22C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V6H18V4H6V20H18V18H20V21C20 21.5523 19.5523 22 19 22H5ZM18 16V13H11V11H18V8L23 12L18 16Z"></path></svg>
                                <span className='text-[16px] text-center font-bold dark:text-white text-gray-800 hidden sm:block'>Logout</span>
                            </div>
                        ) : (
                            <>
                                {
                                    location.pathname === '/login' ? (
                                        <Link to='/signup'>
                                            <div className='bg-blue-600 py-3 px-6 rounded-[25px] text-white font-semibold text-[16px]'>Sign Up</div>
                                        </Link>
                                    ) : (
                                        <Link to='/login'>
                                            <div className='bg-blue-600 py-3 px-6 rounded-[25px] text-white font-semibold text-[16px]'>Login</div>
                                        </Link>
                                    )
                                }
                            </>
                        )
                    }
                </div>
            </div>
            <div className='h-[80px] bg-white dark:bg-black'></div>
        </>
    )
}

export default Navbar