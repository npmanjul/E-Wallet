import React from 'react'

const Notification = () => {
  return (
    <>
      <div className='h-screen w-screen bg-white dark:bg-black flex justify-center items-center'>
        <div className='flex flex-col items-center justify-center gap-5 py-6 px-2'>
          <h1 className='text-[2rem] sm:text-[4.5rem] font-bold text-center text-gray-800 dark:text-white'>Notification</h1>
          <p className='text-center text-gray-800 dark:text-white'>No messages here yet</p>
        </div>
      </div>
    </>
  )
}

export default Notification