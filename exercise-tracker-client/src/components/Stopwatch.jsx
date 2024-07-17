import React, { useState, useEffect, useRef } from 'react';
import './Stopwatch.css';

const Stopwatch = () => {
  const [time, setTime] = useState(() => {
    const savedTime = localStorage.getItem('stopwatch-time');
    return savedTime ? JSON.parse(savedTime) : 0;
  });
  const [running, setRunning] = useState(() => {
    const savedRunning = localStorage.getItem('stopwatch-running');
    return savedRunning ? JSON.parse(savedRunning) : false;
  });
  const clickSoundRef = useRef(null);

  useEffect(() => {
    // Preload the audio file
    clickSoundRef.current = new Audio('/audio/NOTIFICATION.mp3');
  }, []);

  const playClickSound = () => {
    clickSoundRef.current.currentTime = 0;
    clickSoundRef.current.play();
  };

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  useEffect(() => {
    localStorage.setItem('stopwatch-time', JSON.stringify(time));
  }, [time]);

  useEffect(() => {
    localStorage.setItem('stopwatch-running', JSON.stringify(running));
  }, [running]);

  return (
    <div className="stopwatch">
      <div className="numbers">
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </div>
      <div className="buttons">
        <button
          onClick={() => {
            if (!running) {
              setRunning(true);
              playClickSound();
            }
          }}
        >
          Start
        </button>
        <button
          onClick={() => {
            if (running) {
              setRunning(false);
              playClickSound();
            }
          }}
        >
          Stop
        </button>
        <button
          onClick={() => {
            if (time !== 0) {
              setTime(0);
              setRunning(false);
              playClickSound();
            }
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
