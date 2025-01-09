import React, { use, useEffect, useState } from 'react'
import { useStore } from '../store/contextStore';
import toast from 'react-hot-toast';
import PinVerificationModal from '../components/PinVerification';
import { useNavigate } from 'react-router-dom';

const Transfermoney = () => {
    const [accountId_QR, setAccountId_QR] = useState('')
    const [accountId_Input, setAccountId_Input] = useState('')
    const [accountDetailsList, setAccountDetailsList] = useState([])
    const [money, setMoney] = useState('')
    const { scanResult } = useStore();
    const { backendHostLink } = useStore();
    const navigate = useNavigate()

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'accountDetails') {
            setAccountId_Input(value);
        } else if (name === 'money') {
            if (value <= 100000) {
                setMoney(value);
            } else {
                toast.error('Transaction amount should be less than 100000')
            }
        }
    }

    let bodyData = {};

    if (/^\d+$/.test(accountId_QR || accountId_Input)) {
        bodyData.phone = accountId_QR || accountId_Input;
    } else if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(accountId_QR || accountId_Input)) {
        bodyData.email = accountId_QR || accountId_Input;
    } else {
        bodyData.userId = accountId_QR || accountId_Input;
    }

    const getAccountDetails = async () => {
        try {
            const response = await fetch(`${backendHostLink}/transaction/accountdetail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(bodyData),
            });
            const data = await response.json();
            setAccountDetailsList(data)
            if(response.status===401){
                const theme = localStorage.getItem("theme");
                localStorage.clear()
                if (theme !== null) {
                    localStorage.setItem('theme', theme);
                }
                navigate('/login')
            }
        } catch (error) {
            toast.error('Error Occured')
        }
    }


    const moneyTransfer = async () => {
        try {
            const response = await fetch(`${backendHostLink}/transaction/transferAmount`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    from: localStorage.getItem('userId'),
                    to: accountDetailsList.userId,
                    amount: money
                })
            })

            const data = await response.json()
            // console.log(response)
            if (response.ok) {
                // window.location.reload();
                toast.success('Money Transfered Successfully')
                navigate('/history')
                setAccountId_QR('')
                setAccountId_Input('')
                setMoney('')
                setAccountDetailsList([])
            }else{
                toast.error(data.message)
            }
        } catch (err) {
            toast.error('Error Occured')
        }
    }

    useEffect(() => {
        if (scanResult) {
            setAccountId_QR(scanResult)
            if (accountId_QR) {
                getAccountDetails()
            }
        }
    }, [accountId_QR])

    return (
        <>
            <div className='dark:bg-black bg-white h-screen w-screen flex justify-center items-center '>
                <div className='flex justify-center items-center flex-col gap-4'>
                    <h1 className='dark:text-white text-black text-center text-5xl font-bold mb-3'>Transfer Money</h1>
                    {
                        !accountId_QR ? (
                            <div className='flex justify-center items-center gap-4 flex-col sm:flex-row w-full'>
                                <input type='text'
                                    placeholder='Enter mobile number or email'
                                    className='focus:outline-none w-full sm:w-[400px] h-[50px] p-2 px-5 bg-slate-200 rounded-lg text-black border-none'
                                    value={accountId_Input}
                                    onChange={handleChange}
                                    name='accountDetails'
                                />
                                <button
                                    className='bg-blue-500 text-white rounded-lg py-3 px-6 sm:w-auto w-full'
                                    onClick={getAccountDetails}
                                >
                                    Search
                                </button>
                            </div>
                        ) : (
                            ""
                        )
                    }

                    {
                        accountDetailsList.userId ? (
                            <div className='dark:text-white text-black text-center text-xl font-bold mt-4 flex justify-between items-center gap-3 dark:bg-slate-700 bg-slate-200 px-7 py-4 rounded-lg' >
                                <img src={accountDetailsList.image ? accountDetailsList.image : ""} alt="profile" className='w-[60px] h-[60px] rounded-full' />
                                <div className='flex flex-col justify-center items-start'>
                                    <span>{accountDetailsList.name ? accountDetailsList.name : ""}</span>
                                    <span className='text-[15px]'>{accountDetailsList.userId ? accountDetailsList.userId : ""}</span>
                                </div>
                            </div>
                        ) : (
                            <>
                                {
                                    accountDetailsList.message ? (
                                        <>
                                            <div className='text-white text-center text-xl font-bold mt-4 flex justify-between items-center gap-3 bg-slate-500 px-7 py-4 rounded-lg' >
                                                {accountDetailsList.message}
                                            </div>
                                        </>
                                    ) : (
                                        ""
                                    )
                                }
                            </>

                        )
                    }

                    <div className='sm:w-auto flex justify-center items-center flex-col gap-4 w-full'>
                        <div className='flex justify-center items-center'>
                            {
                                money.length > 0 ? <div className='dark:text-white text-black text-center sm:text-[150px] text-[50px]'>₹</div> : null
                            }
                            <input
                                type="number"
                                value={money}
                                onChange={handleChange}
                                style={{
                                    width: `${Math.max(3, money.length + 1)}ch`, // Adjust width based on length
                                }}
                                className="focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none h-[250px]  text-center rounded-lg dark:text-white text-black border-0  bg-transparent sm:text-[150px] text-[50px]"
                                placeholder='₹ 0'
                                name='money'
                                required
                            />
                        </div>
                        <div className='w-full sm:w-[500px]'>
                            {
                                accountDetailsList.userId && money > 0 ? (
                                    <PinVerificationModal functionCall={moneyTransfer} />
                                ) : (
                                    <button className='bg-green-500 hover:bg-green-600 text-white rounded-lg py-3 px-6  sm:w-[500px] w-full' >Send Money</button>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Transfermoney