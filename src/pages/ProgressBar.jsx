import React from 'react';
import '../assets/styles/ProgressBar.css';

export default function ProgressBar({ steps }) {
  return (
    <div>
    <div className="progress-bar">

      {steps.map((step, index) => (

        <div
          key={index}
          className={`circle ${step.correct === null ? '' : step.correct ? 'correct' : 'incorrect'}`}>
          {index + 1}
        </div>
      ))}
    </div>
    <div>
    <div className="progress-info">
        {steps.filter(step => step.correct !== null).length}/{steps.length} questions answered
      </div>
    </div>
    </div>
  );
}
