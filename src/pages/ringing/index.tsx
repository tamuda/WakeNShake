import React, { use } from 'react'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const Ringing = () => {
  const [ringing, setRinging] = useState(true)
  const [time, setTime] = useState<string>('')

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
  }

  if (!ringing) {
    return <Home />
  }
  return (
    <div className="fullscreen-container flex w-full flex-col items-center justify-center bg-black">
      <div
        className="vibrate flex flex-col items-center justify-center"
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

const Home = () => {
  const [time, setTime] = useState<string>('')
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
  return (
    <div className="fullscreen-container relative flex h-screen w-full flex-col items-center justify-start bg-black p-8 pt-16 text-white">
      <Image
        className=" absolute left-0 top-0 z-0 object-cover"
        src="/images/wallpaper.png"
        alt=""
        layout="fill"
      />
      <div
        className="pt-18  left-1/2 top-10 z-10 flex -translate-x-1/2 items-center justify-center"
        style={{
          fontSize: '102px',
          fontWeight: 700,
          color: 'white',
          fontFamily: '"SF Pro Rounded", sans-serif',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          padding: '20px',
          borderRadius: '20px',
        }}
      >
        {time}
      </div>
    </div>
  )
}

export default Ringing
