import React, { useEffect, useState } from 'react'
import Moneycredit from '../components/Moneycredit'
import Moneydebit from '../components/Moneydebit'
import { useStore } from '../store/contextStore'
import { useNavigate } from 'react-router-dom'

const History = () => {
    const [loader, setLoader] = useState(true)
    const [transactionHistory, setTransactionHistory] = useState([])
    const { backendHostLink } = useStore();
    const navigate = useNavigate()

    const getTransactionHistory = async () => {
        const response = await fetch(`${backendHostLink}/transactionHistory/${localStorage.getItem('userId')}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        const data = await response.json()
        setTransactionHistory(data.transactions)
        if(response.status===401){
            const theme = localStorage.getItem("theme");
                localStorage.clear()
                if (theme !== null) {
                    localStorage.setItem('theme', theme);
                }
                navigate('/login')
        }
    }

    useEffect(() => {
        getTransactionHistory();
        if(transactionHistory) {
            setLoader(false)
        }
    }, [setLoader,transactionHistory])

    return (
        <>
            {
                loader ? (
                    "Loading..."
                ) : (
                    <div className='dark:bg-black bg-white h-full w-screen flex justify-start items-center flex-col gap-4'>
                        <h1 className='dark:text-white text-blacktext-center text-5xl font-bold mb-7 mt-20'>History</h1>
                        <div className='flex justify-center items-center gap-4 h-auto w-full flex-col mb-7 px-2'>
                            {transactionHistory && transactionHistory.map((transaction, index) => {
                                if (transaction.to) {
                                    return <Moneycredit key={index} id={transaction.transactionId} name={transaction.to} amount={transaction.amount} timestamp={transaction.timestamp} />;
                                } else if (transaction.from) {
                                    return <Moneydebit key={index} id={transaction.transactionId} name={transaction.from} amount={transaction.amount} timestamp={transaction.timestamp} />;
                                }
                            })}
                        </div>
                    </div>
                )
            }

        </>
    )
}

export default History