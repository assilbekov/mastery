"use client"

import { useState, useEffect } from 'react';
import { Label } from '~/components/ui/label';

export const Timer = () => {
  const [timer, setTimer] = useState(0);

  const seconds = timer % 60;
  const minutes = Math.floor(timer / 60) % 60;
  const hours = Math.floor(timer / 3600) % 24;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(timer => timer + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-48 h-48 bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-500 rounded-full flex justify-center items-center p-2">
      <div className="bg-white w-full h-full rounded-full flex justify-center items-center">
        <Label className="text-xl">
          {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </Label>
      </div>
    </div>
  )
};