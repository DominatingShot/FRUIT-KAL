import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const ampm = hours >= 12 ? 'PM' : 'AM';

      const formattedTime = `${
        hours % 12 || 12
      }:${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')} ${ampm}`;

      setCurrentTime(formattedTime);
    };

    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <nav className="bg-red-500 p-2 flex justify-between items-center shadow-md">
      <h1 className="text-white text-xl font-bold">Nutrition Dashboard</h1>
      <div className="text-white text-sm font-medium">{currentTime}</div>
    </nav>
  );
};

export default Navbar;
