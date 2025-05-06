import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';


const Setup = () => {
  const [alarmTime, setAlarmTime] = useState('');
  const [alarmType, setAlarmType] = useState('ringing');
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [label, setLabel] = useState('Alarm');
  const [repeat, setRepeat] = useState('Never');
  const [vibration, setVibration] = useState('default');
  const [snooze, setSnooze] = useState(true);
  const [currentTime, setCurrentTime] = useState('');
  const [showRepeatOptions, setShowRepeatOptions] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [editingAlarm, setEditingAlarm] = useState(null);
  const [alarms, setAlarms] = useState([
    { id: 1, time: '07:30', active: true, label: 'Alarm', period: 'AM', repeat: 'Never', alarmType: 'ringing', vibration: 'default', snooze: true },
    { id: 2, time: '08:25', active: true, label: 'Alarm', period: 'AM', repeat: 'Never', alarmType: 'ringing', vibration: 'default', snooze: false },
    { id: 3, time: '16:45', active: true, label: 'Puzzle', period: 'PM', repeat: 'Never', alarmType: 'puzzle', vibration: 'default', snooze: true },
    { id: 4, time: '22:50', active: true, label: 'Shake', period: 'PM', repeat: 'Weekends', alarmType: 'ringing', vibration: 'default', snooze: true }
  ]);
  const router = useRouter();
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


   // Initialize with current time + 5 minutes and track current time
   useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
     
      if (!alarmTime) {
        const alarmDate = new Date(now);
        alarmDate.setMinutes(now.getMinutes() + 5);
        const alarmHours = alarmDate.getHours().toString().padStart(2, '0');
        const alarmMinutes = alarmDate.getMinutes().toString().padStart(2, '0');
        setAlarmTime(`${alarmHours}:${alarmMinutes}`);
      }
    };
   
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, [alarmTime]);


  const handleSetAlarm = () => {
    const now = new Date();
    const target = new Date(now);
    const [hours, minutes] = alarmTime.split(':');
    target.setHours(parseInt(hours));
    target.setMinutes(parseInt(minutes));
    target.setSeconds(0);


    const delay = target.getTime() - now.getTime();
    const h = parseInt(hours);
    const period = h >= 12 ? 'PM' : 'AM';
   
    if (editingAlarm) {
      setAlarms(alarms.map(alarm =>
        alarm.id === editingAlarm.id ? {
          ...alarm,
          time: alarmTime,
          label,
          period,
          repeat,
          alarmType,
          vibration,
          snooze,
          active: true
        } : alarm
      ));
      setEditingAlarm(null);
    } else {
      localStorage.setItem('alarmTime', target.toISOString());
      localStorage.setItem('alarmType', alarmType);
     
      if (delay > 0) {
        setTimeout(() => {
          router.push(`/${alarmType}`);
        }, delay);
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
        snooze: snooze
      };
      setAlarms([...alarms, newAlarm]);
    }
   
    setShowTimePicker(false);
    resetAlarmForm();
  };


  const resetAlarmForm = () => {
    if (!editingAlarm) {
      const now = new Date();
      const alarmDate = new Date(now);
      alarmDate.setMinutes(now.getMinutes() + 5);
      const alarmHours = alarmDate.getHours().toString().padStart(2, '0');
      const alarmMinutes = alarmDate.getMinutes().toString().padStart(2, '0');
      setAlarmTime(`${alarmHours}:${alarmMinutes}`);
    }
   
    setLabel('Alarm');
    setRepeat('Never');
    setVibration('default');
    setSnooze(true);
    setAlarmType('ringing');
    setSelectedDays([]);
  };


  const handleCancel = () => {
    setShowTimePicker(false);
    setEditingAlarm(null);
    resetAlarmForm();
  };


  const formatTimeDisplay = (timeString) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const h = parseInt(hours);
    const period = h >= 12 ? 'PM' : 'AM';
    const formattedHour = h % 12 === 0 ? 12 : h % 12;
    return `${formattedHour}:${minutes}`;
  };


  const toggleAlarmActive = (id) => {
    setAlarms(alarms.map(alarm =>
      alarm.id === id ? { ...alarm, active: !alarm.active } : alarm
    ));
  };


  const deleteAlarm = (id) => {
    setAlarms(alarms.filter(alarm => alarm.id !== id));
  };


  const editAlarm = (alarm) => {
    if (editMode) {
      setEditingAlarm(alarm);
      setAlarmTime(alarm.time);
      setLabel(alarm.label);
      setRepeat(alarm.repeat);
      setAlarmType(alarm.alarmType || 'ringing');
      setVibration(alarm.vibration || 'default');
      setSnooze(alarm.snooze !== undefined ? alarm.snooze : true);
      setShowTimePicker(true);
    }
  };


  const handleDaySelect = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
   
    if (selectedDays.length === 0) {
      setRepeat('Never');
    } else if (selectedDays.length === 7) {
      setRepeat('Every day');
    } else if (selectedDays.includes('Saturday') && selectedDays.includes('Sunday') && selectedDays.length === 2) {
      setRepeat('Weekends');
    } else if (selectedDays.length === 5 && !selectedDays.includes('Saturday') && !selectedDays.includes('Sunday')) {
      setRepeat('Weekdays');
    } else {
      setRepeat(selectedDays.map(d => d.slice(0, 3)).join(', '));
    }
  };


  const RepeatOptions = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-gray-900 rounded-lg w-4/5 max-w-md">
        <div className="border-b border-gray-800 p-4">
          <h2 className="text-xl font-bold text-white">Repeat</h2>
        </div>
        <div className="p-2">
          {daysOfWeek.map(day => (
            <div
              key={day}
              className="flex justify-between items-center p-3 border-b border-gray-800"
              onClick={() => handleDaySelect(day)}
            >
              <span className="text-lg text-white">{day}</span>
              {selectedDays.includes(day) && (
                <span className="text-green-500 text-2xl">✓</span>
              )}
            </div>
          ))}
        </div>
        <div className="p-4 flex justify-end">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
            onClick={() => setShowRepeatOptions(false)}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );


  // New toggle switch design
  const ToggleSwitch = ({ isOn, onToggle }) => (
    <div
      className={`relative inline-block w-12 h-6 rounded-full transition-colors duration-200 ${isOn ? 'bg-green-500' : 'bg-gray-600'}`}
      onClick={onToggle}
    >
      <div
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${isOn ? 'translate-x-6' : ''}`}
      />
    </div>
  );


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
        <div className="grid grid-cols-3 items-center p-4 bg-gray-900 bg-opacity-80 backdrop-blur-lg z-10">
        <button
            onClick={handleCancel}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg justify-self-start"
        >
            Cancel
        </button>
        <span className="text-xl font-bold text-white text-center">
            {editingAlarm ? 'Edit Alarm' : 'Add Alarm'}
        </span>
        <button
            onClick={handleSetAlarm}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg justify-self-end"
        >
            Save
        </button>
        </div>


        <div className="flex-1 flex flex-col items-center justify-center z-10">
          <div className="text-white text-7xl font-bold mb-10">
            <input
              type="time"
              value={alarmTime}
              onChange={(e) => setAlarmTime(e.target.value)}
              className="bg-transparent text-center focus:outline-none w-full"
              style={{
                WebkitAppearance: 'none',
                MozAppearance: 'none'
              }}
            />
          </div>
        </div>


        <div className="rounded-lg bg-gray-900 bg-opacity-80 backdrop-blur-lg mx-4 mb-8 overflow-hidden z-10">
          <div
            className="flex justify-between items-center p-4 border-b border-gray-800 cursor-pointer"
            onClick={() => setShowRepeatOptions(true)}
          >
            <span className="text-lg text-white">Repeat</span>
            <span className="text-gray-400">{repeat} ›</span>
          </div>
         
          <div className="flex justify-between items-center p-4 border-b border-gray-800">
            <span className="text-lg text-white">Label</span>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="text-right bg-transparent text-gray-400 outline-none"
            />
          </div>
         
          <div className="flex justify-between items-center p-4 border-b border-gray-800">
            <span className="text-lg text-white">Alarm Mode</span>
            <select
              value={alarmType}
              onChange={(e) => setAlarmType(e.target.value)}
              className="bg-gray-800 text-white px-3 py-1 rounded-md outline-none"
            >
              <option value="ringing">Shake</option>
              <option value="puzzle">Puzzle</option>
            </select>
          </div>
         
          <div className="flex justify-between items-center p-4 border-b border-gray-800">
            <span className="text-lg text-white">Vibration</span>
            <select
              value={vibration}
              onChange={(e) => setVibration(e.target.value)}
              className={`bg-gray-800 text-white px-3 py-1 rounded-md outline-none ${alarmType === 'puzzle' ? 'opacity-50' : ''}`}
              disabled={alarmType === 'puzzle'}
            >
              <option value="low">Low</option>
              <option value="default">Default</option>
              <option value="high">High</option>
            </select>
          </div>
         
          <div className="flex justify-between items-center p-4">
            <span className="text-lg text-white">Snooze</span>
            <ToggleSwitch isOn={snooze} onToggle={() => setSnooze(!snooze)} />
          </div>
        </div>


        {showRepeatOptions && <RepeatOptions />}
      </div>
    );
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
      <div className="grid grid-cols-3 items-center p-4 bg-gray-900 bg-opacity-80 backdrop-blur-lg z-10">
        <button
            onClick={() => setEditMode(!editMode)}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg justify-self-start"
        >
            {editMode ? 'Done' : 'Edit'}
        </button>
        <span className="text-2xl font-bold text-white text-center">Alarms</span>
        <button
            onClick={() => {
            setEditingAlarm(null);
            resetAlarmForm();
            setShowTimePicker(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg justify-self-end"
        >
            +
        </button>
       </div>




      <div className="px-4 flex-1 overflow-auto z-10">
        {alarms.map((alarm) => (
          <div
            key={alarm.id}
            className="bg-gray-900 bg-opacity-80 backdrop-blur-lg rounded-lg mb-3 relative"
            onClick={() => editAlarm(alarm)}
          >
            <div className="flex items-center justify-between p-4 pl-6">
              {editMode && (
                <div
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center z-20"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteAlarm(alarm.id);
                  }}
                >
                  <span className="text-white text-sm">-</span>
                </div>
              )}
             
              <div className={`flex flex-col ${editMode ? 'ml-8' : ''}`}>
                <div className="flex items-end">
                  <span className="text-5xl text-white">
                    {formatTimeDisplay(alarm.time)}
                  </span>
                  <span className="text-xl ml-2 text-white">{alarm.period}</span>
                </div>
                <div className="text-gray-400">{alarm.label}</div>
              </div>
             
              <ToggleSwitch
                isOn={alarm.active}
                onToggle={(e) => {
                  e.stopPropagation();
                  toggleAlarmActive(alarm.id);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Setup;

