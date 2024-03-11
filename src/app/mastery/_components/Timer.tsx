"use client"

import { useState, useEffect } from 'react';

export const Timer = () => {
  const [timer, setTimer] = useState(0);
  
  const minutes = timer % 60;
  const hours = Math.floor(timer / 60) % 24;
  const days = Math.floor(timer / 60 / 24);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(timer => timer + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="timer">
      <h1>Timer</h1>
      <p>{days} days {hours} hours {minutes} minutes</p>
    </div>
  );
};