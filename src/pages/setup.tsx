import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

const Setup = () => {
  const [alarmTime, setAlarmTime] = useState('')
  const [alarmType, setAlarmType] = useState('ringing')
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [label, setLabel] = useState('Alarm')
  const [repeat, setRepeat] = useState('Never')
  const [vibration, setVibration] = useState('default')
  const [snooze, setSnooze] = useState(true)
  const [currentTime, setCurrentTime] = useState('')
  const [showRepeatOptions, setShowRepeatOptions] = useState(false)
  const [selectedDays, setSelectedDays] = useState([])
  const [editingAlarm, setEditingAlarm] = useState(null)
  const [alarms, setAlarms] = useState([
<<<<<<< HEAD
    { id: 1, time: '07:30', active: true, label: 'Alarm', period: 'AM', repeat: 'Never', alarmType: 'ringing', vibration: 'default', snooze: true },
    { id: 2, time: '08:25', active: true, label: 'Alarm', period: 'AM', repeat: 'Never', alarmType: 'ringing', vibration: 'default', snooze: false },
    { id: 3, time: '16:45', active: true, label: 'Puzzle', period: 'PM', repeat: 'Never', alarmType: 'puzzle', vibration: 'default', snooze: true },
    { id: 4, time: '22:50', active: true, label: 'Shake', period: 'PM', repeat: 'Weekends', alarmType: 'ringing', vibration: 'default', snooze: true }
  ]);
  const router = useRouter();
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
=======
    {
      id: 1,
      time: '07:30',
      active: true,
      label: 'Alarm',
      period: 'AM',
      repeat: 'Never',
      alarmType: 'ringing',
      vibration: 'default',
      snooze: true,
    },
    {
      id: 2,
      time: '08:25',
      active: true,
      label: 'Alarm',
      period: 'AM',
      repeat: 'Never',
      alarmType: 'ringing',
      vibration: 'default',
      snooze: true,
    },
    {
      id: 3,
      time: '16:45',
      active: true,
      label: 'Puzzle',
      period: 'PM',
      repeat: 'Never',
      alarmType: 'puzzle',
      vibration: 'default',
      snooze: true,
    },
    {
      id: 4,
      time: '22:50',
      active: true,
      label: 'Shake',
      period: 'PM',
      repeat: 'Weekends',
      alarmType: 'ringing',
      vibration: 'default',
      snooze: true,
    },
  ])
  const router = useRouter()
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
>>>>>>> a5ed0c1fc14efa8346ca00baea6116536b98a950

  // Initialize with current time + 5 minutes and track current time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, '0')
      const minutes = now.getMinutes().toString().padStart(2, '0')
      setCurrentTime(`${hours}:${minutes}`)

      if (!alarmTime) {
        const alarmDate = new Date(now)
        alarmDate.setMinutes(now.getMinutes() + 5)
        const alarmHours = alarmDate.getHours().toString().padStart(2, '0')
        const alarmMinutes = alarmDate.getMinutes().toString().padStart(2, '0')
        setAlarmTime(`${alarmHours}:${alarmMinutes}`)
      }
    }

    updateTime()
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [alarmTime])

  const handleSetAlarm = () => {
    const now = new Date()
    const target = new Date(now)
    const [hours, minutes] = alarmTime.split(':')
    target.setHours(parseInt(hours))
    target.setMinutes(parseInt(minutes))
    target.setSeconds(0)

    const delay = target.getTime() - now.getTime()
    const h = parseInt(hours)
    const period = h >= 12 ? 'PM' : 'AM'

    if (editingAlarm) {
      setAlarms(
        alarms.map((alarm) =>
          alarm.id === editingAlarm.id
            ? {
                ...alarm,
                time: alarmTime,
                label,
                period,
                repeat,
                alarmType,
                vibration,
                snooze,
                active: true,
              }
            : alarm
        )
      )
      setEditingAlarm(null)
    } else {
      localStorage.setItem('alarmTime', target.toISOString())
      localStorage.setItem('alarmType', alarmType)

      if (delay > 0) {
        setTimeout(() => {
          router.push(`/${alarmType}`)
        }, delay)
      }

      const newAlarm = {
        id: Date.now(),
        time: alarmTime,
        active: true,
        label: label,
        period: period,
        repeat: repeat,
        alarmType: alarmType,
        vibration: vibration,
        snooze: snooze,
      }
      setAlarms([...alarms, newAlarm])
    }

    setShowTimePicker(false)
    resetAlarmForm()
  }

  const resetAlarmForm = () => {
    if (!editingAlarm) {
      const now = new Date()
      const alarmDate = new Date(now)
      alarmDate.setMinutes(now.getMinutes() + 5)
      const alarmHours = alarmDate.getHours().toString().padStart(2, '0')
      const alarmMinutes = alarmDate.getMinutes().toString().padStart(2, '0')
      setAlarmTime(`${alarmHours}:${alarmMinutes}`)
    }

    setLabel('Alarm')
    setRepeat('Never')
    setVibration('default')
    setSnooze(true)
    setAlarmType('ringing')
    setSelectedDays([])
  }

  const handleCancel = () => {
    setShowTimePicker(false)
    setEditingAlarm(null)
    resetAlarmForm()
  }

  const formatTimeDisplay = (timeString) => {
    if (!timeString) return ''
    const [hours, minutes] = timeString.split(':')
    const h = parseInt(hours)
    const period = h >= 12 ? 'PM' : 'AM'
    const formattedHour = h % 12 === 0 ? 12 : h % 12
    return `${formattedHour}:${minutes}`
  }

  const toggleAlarmActive = (id) => {
    setAlarms(
      alarms.map((alarm) =>
        alarm.id === id ? { ...alarm, active: !alarm.active } : alarm
      )
    )
  }

  const deleteAlarm = (id) => {
    setAlarms(alarms.filter((alarm) => alarm.id !== id))
  }

  const editAlarm = (alarm) => {
    if (editMode) {
      setEditingAlarm(alarm)
      setAlarmTime(alarm.time)
      setLabel(alarm.label)
      setRepeat(alarm.repeat)
      setAlarmType(alarm.alarmType || 'ringing')
      setVibration(alarm.vibration || 'default')
      setSnooze(alarm.snooze !== undefined ? alarm.snooze : true)
      setShowTimePicker(true)
    }
  }

  const handleDaySelect = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day))
    } else {
      setSelectedDays([...selectedDays, day])
    }

    if (selectedDays.length === 0) {
      setRepeat('Never')
    } else if (selectedDays.length === 7) {
      setRepeat('Every day')
    } else if (
      selectedDays.includes('Saturday') &&
      selectedDays.includes('Sunday') &&
      selectedDays.length === 2
    ) {
      setRepeat('Weekends')
    } else if (
      selectedDays.length === 5 &&
      !selectedDays.includes('Saturday') &&
      !selectedDays.includes('Sunday')
    ) {
      setRepeat('Weekdays')
    } else {
      setRepeat(selectedDays.map((d) => d.slice(0, 3)).join(', '))
    }
  }

  const RepeatOptions = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="w-4/5 max-w-md rounded-lg bg-gray-900">
        <div className="border-b border-gray-800 p-4">
          <h2 className="text-xl font-bold text-white">Repeat</h2>
        </div>
        <div className="p-2">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="flex items-center justify-between border-b border-gray-800 p-3"
              onClick={() => handleDaySelect(day)}
            >
              <span className="text-lg text-white">{day}</span>
              {selectedDays.includes(day) && (
                <span className="text-2xl text-green-500">✓</span>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-end p-4">
          <button
            className="rounded-lg bg-blue-600 px-6 py-2 text-white"
            onClick={() => setShowRepeatOptions(false)}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )

  // New toggle switch design
  const ToggleSwitch = ({ isOn, onToggle }) => (
    <div
      className={`relative inline-block h-6 w-12 rounded-full transition-colors duration-200 ${
        isOn ? 'bg-green-500' : 'bg-gray-600'
      }`}
      onClick={onToggle}
    >
      <div
        className={`absolute left-0.5 top-0.5 h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-200 ${
          isOn ? 'translate-x-6' : ''
        }`}
      />
    </div>
  )

  if (showTimePicker) {
    return (
      <div className="fullscreen-container relative flex h-screen w-screen flex-col bg-black">
        <Image
          className="absolute left-0 top-0 z-0 h-full w-full object-cover opacity-20"
          src="/images/background.png"
          alt=""
          height={1000}
          width={1000}
        />

        {/* Improved Header */}
        <div className="z-10 grid grid-cols-3 items-center bg-gray-900 bg-opacity-80 p-4 backdrop-blur-lg">
          <button
            onClick={handleCancel}
            className="justify-self-start rounded-lg bg-gray-700 px-4 py-2 text-white"
          >
            Cancel
          </button>
          <span className="text-center text-xl font-bold text-white">
            {editingAlarm ? 'Edit Alarm' : 'Add Alarm'}
          </span>
          <button
            onClick={handleSetAlarm}
            className="justify-self-end rounded-lg bg-blue-600 px-4 py-2 text-white"
          >
            Save
          </button>
        </div>

        <div className="z-10 flex flex-1 flex-col items-center justify-center">
          <div className="mb-10 text-7xl font-bold text-white">
            <input
              type="time"
              value={alarmTime}
              onChange={(e) => setAlarmTime(e.target.value)}
              className="w-full bg-transparent text-center focus:outline-none"
              style={{
                WebkitAppearance: 'none',
                MozAppearance: 'none',
              }}
            />
          </div>
        </div>

        <div className="z-10 mx-4 mb-8 overflow-hidden rounded-lg bg-gray-900 bg-opacity-80 backdrop-blur-lg">
          <div
            className="flex cursor-pointer items-center justify-between border-b border-gray-800 p-4"
            onClick={() => setShowRepeatOptions(true)}
          >
            <span className="text-lg text-white">Repeat</span>
            <span className="text-gray-400">{repeat} ›</span>
          </div>

          <div className="flex items-center justify-between border-b border-gray-800 p-4">
            <span className="text-lg text-white">Label</span>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="bg-transparent text-right text-gray-400 outline-none"
            />
          </div>

          <div className="flex items-center justify-between border-b border-gray-800 p-4">
            <span className="text-lg text-white">Alarm Mode</span>
            <select
              value={alarmType}
              onChange={(e) => setAlarmType(e.target.value)}
              className="rounded-md bg-gray-800 px-3 py-1 text-white outline-none"
            >
              <option value="ringing">Shake</option>
              <option value="puzzle">Puzzle</option>
            </select>
          </div>

          <div className="flex items-center justify-between border-b border-gray-800 p-4">
            <span className="text-lg text-white">Vibration</span>
            <select
              value={vibration}
              onChange={(e) => setVibration(e.target.value)}
              className={`rounded-md bg-gray-800 px-3 py-1 text-white outline-none ${
                alarmType === 'puzzle' ? 'opacity-50' : ''
              }`}
              disabled={alarmType === 'puzzle'}
            >
              <option value="low">Low</option>
              <option value="default">Default</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4">
            <span className="text-lg text-white">Snooze</span>
            <ToggleSwitch isOn={snooze} onToggle={() => setSnooze(!snooze)} />
          </div>
        </div>

        {showRepeatOptions && <RepeatOptions />}
      </div>
    )
  }

  return (
    <div className="fullscreen-container relative flex h-screen w-screen flex-col bg-black">
      <Image
        className="absolute left-0 top-0 z-0 h-full w-full object-cover opacity-20"
        src="/images/background.png"
        alt=""
        height={1000}
        width={1000}
      />

      {/* Header */}
      <div className="z-10 grid grid-cols-3 items-center bg-gray-900 bg-opacity-80 p-4 backdrop-blur-lg">
        <button
          onClick={() => setEditMode(!editMode)}
          className="justify-self-start rounded-lg bg-gray-700 px-4 py-2 text-white"
        >
          {editMode ? 'Done' : 'Edit'}
        </button>
        <span className="pb-4 text-center text-2xl font-bold text-white">
          Alarms
        </span>
        <button
          onClick={() => {
            setEditingAlarm(null)
            resetAlarmForm()
            setShowTimePicker(true)
          }}
          className="justify-self-end rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          +
        </button>
      </div>

      <div className="z-10 flex-1 overflow-auto px-4 pt-4">
        {alarms.map((alarm) => (
          <div
            key={alarm.id}
            className="relative mb-3 rounded-lg bg-gray-900 bg-opacity-80 backdrop-blur-lg"
            onClick={() => editAlarm(alarm)}
          >
            <div className="flex items-center justify-between p-4 pl-6">
              {editMode && (
                <div
                  className="absolute left-4 top-1/2 z-20 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-red-500"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteAlarm(alarm.id)
                  }}
                >
                  <span className="text-sm text-white">-</span>
                </div>
              )}

              <div className={`flex flex-col ${editMode ? 'ml-8' : ''}`}>
                <div className="flex items-end">
                  <span className="text-5xl text-white">
                    {formatTimeDisplay(alarm.time)}
                  </span>
                  <span className="ml-2 text-xl text-white">
                    {alarm.period}
                  </span>
                </div>
                <div className="text-gray-400">{alarm.label}</div>
              </div>

              <ToggleSwitch
                isOn={alarm.active}
                onToggle={(e) => {
                  e.stopPropagation()
                  toggleAlarmActive(alarm.id)
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Setup
