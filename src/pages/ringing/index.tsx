import React, { use } from 'react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const Ringing = () => {
  const [ringing, setRinging] = useState(true)
  const [time, setTime] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    //get the current time in HH:MM format
    const updateTime = () => {
      const currentTime = new Date()
      const hours = currentTime.getHours().toString().padStart(2, '0')
      const minutes = currentTime.getMinutes().toString().padStart(2, '0')
      setTime(`${hours}:${minutes}`)
    }
    updateTime()
    const interval = setInterval(updateTime, 60000) // Update every minute
    return () => clearInterval(interval) // Cleanup interval on component unmount
  }, [])

  const stopAlarm = () => {
    setRinging(false)
    //navigate to the home page
    setTimeout(() => {
      //user router

      router.push('/home')
    }, 200)
  }

  return (
    <div className="fullscreen-container flex w-full flex-col items-center justify-center bg-black">
      <div
        className=" flex flex-col items-center justify-center"
        onClick={() => stopAlarm()}
      >
        <div className="text-4xl font-medium text-white">Alarm</div>
        <div
          style={{
            fontSize: '102px',
            fontWeight: 700,
            color: 'white',
            fontFamily: '"SF Pro Rounded", sans-serif',
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: '20px',
            borderRadius: '10px',
            letterSpacing: '-8px', // Reduced letter spacing
          }}
        >
          {time}
        </div>
        <Image
          className="small-vibrate object-cover"
          src="/images/vibration.gif"
          width={400}
          height={400}
          alt=""
        />
        <div className=" text-xl font-medium text-white">
          Shake device to stop
        </div>
      </div>
    </div>
  )
}

export default Ringing
