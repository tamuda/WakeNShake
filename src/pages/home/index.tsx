import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

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
    <div className="relative flex h-screen w-full flex-col items-center justify-start overflow-hidden bg-black text-white">
      <Image
        className="absolute inset-0 h-full w-full object-cover"
        src="/images/wallpaper.png"
        alt="Background wallpaper"
        fill
        priority
      />

      {/* Time Display */}
      <div className="absolute left-1/2 top-16 z-10 -translate-x-1/2 transform">
        <div
          className="flex items-center justify-center rounded-2xl px-8 py-4 text-center font-bold"
          style={{
            fontSize: '102px',
            fontWeight: 700,
            color: 'white',
            fontFamily: '"SF Pro Rounded", sans-serif',
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '20px',
            letterSpacing: '-8px',
          }}
        >
          {time}
        </div>
      </div>
    </div>
  )
}

export default Home
