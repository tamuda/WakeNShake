// Simon Says Puzzle for Alarm - React Component
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const COLORS = [
  { name: 'red', active: 'bg-red-400', inactive: 'bg-red-600' },
  { name: 'green', active: 'bg-green-400', inactive: 'bg-green-600' },
  { name: 'blue', active: 'bg-blue-400', inactive: 'bg-blue-600' },
  { name: 'yellow', active: 'bg-yellow-400', inactive: 'bg-yellow-600' },
]

export default function SimonPuzzle({ onSuccess = () => {} }) {
  const [pattern, setPattern] = useState<number[]>([])
  const [userInput, setUserInput] = useState<number[]>([])
  const [flashingIndex, setFlashingIndex] = useState<number | null>(null)
  const [isUserTurn, setIsUserTurn] = useState(false)
  const [message, setMessage] = useState('Watch the pattern')
  const [isLoaded, setIsLoaded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsLoaded(true)
    const newPattern = Array.from({ length: 4 }, () =>
      Math.floor(Math.random() * 4)
    )
    setPattern(newPattern)
    setUserInput([])
    playPattern(newPattern)
  }, [])

  const playPattern = (sequence: number[]) => {
    let i = 0
    setMessage('Watch the pattern')
    const interval = setInterval(() => {
      setFlashingIndex(sequence[i])
      setTimeout(() => setFlashingIndex(null), 1000)
      i++
      if (i >= sequence.length) {
        clearInterval(interval)
        setTimeout(() => {
          setIsUserTurn(true)
          setMessage('Repeat the pattern')
        }, 600)
      }
    }, 800)
  }

  const handleUserClick = (index: number) => {
    if (!isUserTurn) return
    const updatedInput = [...userInput, index]
    setUserInput(updatedInput)

    if (pattern[updatedInput.length - 1] !== index) {
      setMessage('Wrong! Try again')
      setIsUserTurn(false)
      setTimeout(() => {
        setUserInput([])
        playPattern(pattern)
      }, 1000)
      return
    }

    if (updatedInput.length === pattern.length) {
      setMessage('Well done!')
      setTimeout(() => {
        onSuccess()
        // Navigate to home page after 1 second
        setTimeout(() => {
          router.push('/home')
        }, 1000)
      }, 1000)
    }
  }

  // Pre-render all possible color buttons to force Tailwind to include the classes
  return (
    <div className="fullscreen-container flex h-screen flex-col items-center justify-center bg-black">
      {/* Hidden elements to ensure Tailwind includes these classes */}
      <div className="hidden">
        <div className="bg-blue-400 bg-blue-600 bg-green-400 bg-green-600 bg-red-400 bg-red-600 bg-yellow-400 bg-yellow-600"></div>
      </div>

      <h2 className="mb-4 text-xl text-white">{message}</h2>
      <div className="grid grid-cols-2 gap-4">
        {COLORS.map((color, idx) => (
          <button
            key={idx}
            onClick={() => handleUserClick(idx)}
            className={`h-24 w-24 rounded-md transition-all duration-200 focus:outline-none ${
              flashingIndex === idx ? color.active : color.inactive
            }`}
            style={{
              backgroundColor: !isLoaded
                ? idx === 0
                  ? '#ef5350'
                  : idx === 1
                  ? '#66bb6a'
                  : idx === 2
                  ? '#42a5f5'
                  : '#ffee58'
                : undefined,
            }}
          />
        ))}
      </div>
    </div>
  )
}
