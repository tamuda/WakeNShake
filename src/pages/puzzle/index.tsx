// Simon Says Puzzle for Alarm - React Component
import React, { useState, useEffect } from 'react'

const COLORS = ['red', 'green', 'blue', 'yellow']

export default function SimonPuzzle({ onSuccess }: { onSuccess: () => void }) {
  const [pattern, setPattern] = useState<number[]>([])
  const [userInput, setUserInput] = useState<number[]>([])
  const [flashingIndex, setFlashingIndex] = useState<number | null>(null)
  const [isUserTurn, setIsUserTurn] = useState(false)
  const [message, setMessage] = useState('Watch the pattern')

  useEffect(() => {
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
      setTimeout(() => setFlashingIndex(null), 500)
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
      }, 1000)
    }
  }

  return (
    <div className="fullscreen-container flex h-screen flex-col items-center justify-center bg-black">
      <h2 className="mb-4 text-xl text-white">{message}</h2>
      <div className="grid grid-cols-2 gap-4">
        {COLORS.map((color, idx) => (
          <button
            key={idx}
            onClick={() => handleUserClick(idx)}
            className={`h-24 w-24 rounded-md transition-all duration-200 focus:outline-none ${
              flashingIndex === idx ? `bg-${color}-400` : `bg-${color}-600`
            }`}
          />
        ))}
      </div>
    </div>
  )
}
