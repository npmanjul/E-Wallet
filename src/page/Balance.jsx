import React, { useState } from 'react'
import { useStore } from '../store/contextStore';
import { useNavigate } from 'react-router-dom';

const Balance = () => {
    const [balance, setBalance] = useState(0);
    const { backendHostLink } = useStore();
    const navigate = useNavigate()

    const getBalance = async () => {
        try {
            const response = await fetch(`${backendHostLink}/balance/${localStorage.getItem('userId')}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            const data = await response.json();
            setBalance(data.balance);
            if(response.status===401){
                const theme = localStorage.getItem("theme");
                localStorage.clear()
                if (theme !== null) {
                    localStorage.setItem('theme', theme);
                }
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
        }
    }

    useState(() => {
        getBalance()
    }, []);

    return (
        <>
            <div className='dark:bg-black bg-white h-screen w-screen flex justify-center items-center flex-col gap-4'>
                    <h1 className='dark:text-white text-black text-center text-5xl font-bold mb-6'>Wallet Balance 🤑</h1>
                <div className='dark:bg-slate-600 bg-slate-200 p-9 flex justify-center items-center rounded-lg flex-col gap-4'>
                    <img src='/image.png' alt="logo" className='w-[100px] h-[100px]'/>
                    <div className='dark:text-white text-gray-700 text-center font-bold  flex justify-between items-center gap-3' >
                        <span className='text-[40px]'>₹ {balance.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Balance