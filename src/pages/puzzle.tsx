import React, { useState, useEffect } from 'react';
import Image from 'next/image';


// Import the Home component
const Home = () => {
  const [time, setTime] = useState<string>('');
 
  useEffect(() => {
    //get the current time in HH:MM format
    const updateTime = () => {
      const currentTime = new Date();
      const hours = currentTime.getHours().toString().padStart(2, '0');
      const minutes = currentTime.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);
 
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
  );
};


const Puzzle = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [solved, setSolved] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [showHome, setShowHome] = useState(false); // Add state to control showing Home component


  useEffect(() => {
    // Generate math problem
    const generateProblem = () => {
      const a = Math.floor(Math.random() * 20) + 1;
      const b = Math.floor(Math.random() * 20) + 1;
      setQuestion(`${a} + ${b}`);
      setCorrectAnswer(a + b);
    };
   
    generateProblem();


    // Set current time
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
   
    updateTime();
    const timeInterval = setInterval(updateTime, 60000); // Update every minute


    // Play alarm sound (if available)
    try {
      const audio = new Audio('/alarm-sound.mp3');
      audio.loop = true;
      audio.play().catch(error => console.log('Audio play failed:', error));
     
      return () => {
        clearInterval(timeInterval);
        audio.pause();
      };
    } catch (error) {
      console.log('Audio creation failed:', error);
      return () => clearInterval(timeInterval);
    }
  }, []);


  const checkAnswer = () => {
    if (parseInt(answer) === correctAnswer) {
      setSolved(true);
      // Show Home component after 2 seconds, instead of routing
      setTimeout(() => {
        setShowHome(true);
      }, 2000);
    } else {
      alert('Wrong answer! Try again.');
      setAnswer('');
    }
  };


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      checkAnswer();
    }
  };


  // Render Home if showHome is true
  if (showHome) {
    return <Home />;
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
            marginBottom: '40px'
          }}
        >
          {currentTime}
        </div>
        <div className="text-6xl mb-12 text-white">✓</div>
        <div className="text-4xl font-medium text-white">Alarm Stopped</div>
        <p className="text-xl font-medium text-white mt-8">Redirecting to home...</p>
      </div>
    );
  }


  return (
    <div className="fullscreen-container flex w-full flex-col items-center justify-center bg-black">
      <Image
        className="absolute left-0 top-0 z-0 h-full w-full object-cover opacity-20"
        src="/images/star.jpg"
        alt=""
        height={1000}
        width={1000}
      />
     
      <div className="text-4xl font-medium text-white mb-4 z-10">Alarm</div>
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
          marginBottom: '40px'
        }}
        className="z-10"
      >
        {currentTime}
      </div>
     
      <div
        className="w-full max-w-md rounded-xl p-6 mb-8 z-10"
        style={{
          backdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(23, 23, 23, 0.8)'
        }}
      >
        <h2 className="text-2xl mb-6 text-center text-white font-medium">Solve to stop the alarm:</h2>
        <div className="text-4xl text-center mb-8 text-white">{question} = ?</div>
       
        <div className="flex items-center justify-center mb-6">
          <input
            type="number"
            style={{
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(30, 30, 30, 0.8)'
            }}
            className="text-white text-4xl p-4 rounded-lg w-32 text-center"
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
            backgroundColor: 'rgba(50, 50, 50, 0.8)'
          }}
          className="w-full py-4 text-2xl font-medium text-white rounded-lg hover:bg-gray-700 transition duration-300"
        >
          Submit
        </button>
      </div>
    </div>
  );
}


export default Puzzle;

