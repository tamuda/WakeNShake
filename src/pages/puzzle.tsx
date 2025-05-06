<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
=======
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
>>>>>>> a5ed0c1fc14efa8346ca00baea6116536b98a950

// Import the Home component
const Home = () => {
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

  return (
    <div className="fullscreen-container relative flex h-screen w-screen flex-col items-center justify-start bg-black p-8 pt-16 text-white">
      <Image
        className="absolute left-0 top-0 z-0 h-full w-full object-cover"
        src="/images/wallpaper.png"
        alt=""
        height={1000}
        width={1000}
      />
      <div
        className="pt-18 left-1/2 top-10 z-10 flex -translate-x-1/2 items-center justify-center font-bold"
        style={{
          fontSize: '102px',
          fontWeight: 700,
          color: 'white',
          fontFamily: '"SF Pro Rounded", sans-serif',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          padding: '20px',
          borderRadius: '20px',
          letterSpacing: '-8px', // Reduced letter spacing
        }}
      >
        {time}
      </div>
    </div>
  )
}

const Puzzle = () => {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [correctAnswer, setCorrectAnswer] = useState(0)
  const [solved, setSolved] = useState(false)
  const [currentTime, setCurrentTime] = useState('')
  const [showHome, setShowHome] = useState(false) // Add state to control showing Home
  const router = useRouter()

  useEffect(() => {
    // Generate math problem
    const generateProblem = () => {
      const a = Math.floor(Math.random() * 20) + 1
      const b = Math.floor(Math.random() * 20) + 1
      setQuestion(`${a} + ${b}`)
      setCorrectAnswer(a + b)
    }

    generateProblem()

    // Set current time
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, '0')
      const minutes = now.getMinutes().toString().padStart(2, '0')
      setCurrentTime(`${hours}:${minutes}`)
    }

    updateTime()
    const timeInterval = setInterval(updateTime, 60000) // Update every minute

    // Play alarm sound (if available)
    try {
      const audio = new Audio('/alarm-sound.mp3')
      audio.loop = true
      audio.play().catch((error) => console.log('Audio play failed:', error))

      return () => {
        clearInterval(timeInterval)
        audio.pause()
      }
    } catch (error) {
      console.log('Audio creation failed:', error)
      return () => clearInterval(timeInterval)
    }
  }, [])

  const checkAnswer = () => {
    if (parseInt(answer) === correctAnswer) {
      setSolved(true)
      // Show Home component after 2 seconds, instead of routing
      setTimeout(() => {
        router.push('/home')
      }, 2000)
    } else {
      alert('Wrong answer! Try again.')
      setAnswer('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      checkAnswer()
    }
  }

  // Render Home if showHome is true
  if (showHome) {
    return <Home />
  }

  if (solved) {
    return (
      <div className="fullscreen-container flex w-full flex-col items-center justify-center bg-black">
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
            letterSpacing: '-8px',
            marginBottom: '40px',
          }}
        >
          {currentTime}
        </div>
        <div className="mb-12 text-6xl text-white">✓</div>
        <div className="text-4xl font-medium text-white">Alarm Stopped</div>
        <p className="mt-8 text-xl font-medium text-white">
          Redirecting to home...
        </p>
      </div>
    )
  }

  return (
    <div className="fullscreen-container flex w-full flex-col items-center justify-center bg-black">
      <Image
        className="absolute left-0 top-0 z-0 h-full w-full object-cover opacity-20"
        src="/images/background.png"
        alt=""
        height={1000}
        width={1000}
      />

      <div className="z-10 mb-4 text-4xl font-medium text-white">Alarm</div>
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
          letterSpacing: '-8px',
          marginBottom: '40px',
        }}
        className="z-10"
      >
        {currentTime}
      </div>

      <div
        className="z-10 mb-8 w-full max-w-md rounded-xl p-6"
        style={{
          backdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(23, 23, 23, 0.8)',
        }}
      >
        <h2 className="mb-6 text-center text-2xl font-medium text-white">
          Solve to stop the alarm:
        </h2>
        <div className="mb-8 text-center text-4xl text-white">
          {question} = ?
        </div>

        <div className="mb-6 flex items-center justify-center">
          <input
            type="number"
            style={{
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(30, 30, 30, 0.8)',
            }}
            className="w-32 rounded-lg p-4 text-center text-4xl text-white"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyPress={handleKeyPress}
            autoFocus
          />
        </div>

        <button
          onClick={checkAnswer}
          style={{
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(50, 50, 50, 0.8)',
          }}
          className="w-full rounded-lg py-4 text-2xl font-medium text-white transition duration-300 hover:bg-gray-700"
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export default Puzzle
