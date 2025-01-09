import React, { useEffect, useState } from 'react'

const Moneycredit = ({ id, amount, name, timestamp }) => {
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);

    useEffect(() => {
        const [rawDate, rawTime] = timestamp.split("T");
        const cleanedTime = rawTime.replace("Z", "").split(".")[0];
        setDate(rawDate);
        setTime(cleanedTime);
    }, [timestamp]);
    return (
        <>
            <div className='dark:bg-red-700 bg-red-200 max-w-[1000px] w-full flex justify-center items-center flex-col p-4 rounded-lg'>
                <div className='w-full flex justify-center sm:justify-between items-start dark:text-white text-black flex-col sm:flex-row'>
                    <div className='font-semibold dark:text-white text-black'>
                        Transaction ID : <span className=' dark:text-gray-300 text-gray-700'>{id}</span>
                        <div >To : <span className='dark:text-blue-200 text-blue-700'>{name}</span></div>
                    </div>
                    <div className='flex justify-center items-start sm:items-end flex-col'>
                        <div className='font-bold text-[25px] dark:text-red-200 text-red-600'>- ₹ {amount}</div>
                        <div className=' text-[12px] text-center '>{date} | {time}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Moneycredit