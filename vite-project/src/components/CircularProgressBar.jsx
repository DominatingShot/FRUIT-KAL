import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CircularProgressBar = ({ value, max }) => {
  return (
    <div className="w-48 h-48"> {/* Adjusted size of the progress bar */}
      <CircularProgressbar
        value={value}
        maxValue={max}
        text={`${value}/${max} kcal`}
        styles={buildStyles({
          pathColor: '#ff4d4d',
          textColor: '#333',
          trailColor: '#e6e6e6',
          textSize: '10px', // Adjust text size to fit better
        })}
      />
    </div>
  );
};

export default CircularProgressBar;
