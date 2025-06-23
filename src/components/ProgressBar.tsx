
import React from 'react';

interface ProgressBarProps {
  currentDay: number;
  totalDays: number;
}

const ProgressBar = ({ currentDay, totalDays }: ProgressBarProps) => {
  const progressPercentage = (currentDay / totalDays) * 100;

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <div className="text-center mb-4">
        <h3 className="font-lora font-semibold text-[#3C3C3C] text-lg">
          Sua Jornada
        </h3>
        <p className="font-nunito text-gray-600 text-sm">
          Dia {currentDay} de {totalDays}
        </p>
      </div>
      
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div 
            className="bg-gradient-to-r from-[#A75C3F] to-[#D4A574] h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        <div className="flex justify-between items-center">
          {Array.from({ length: Math.min(7, totalDays) }, (_, index) => {
            const dayNumber = Math.floor((index * totalDays) / 6) + 1;
            const isCompleted = dayNumber <= currentDay;
            
            return (
              <div
                key={index}
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-lg
                  transition-all duration-300
                  ${isCompleted 
                    ? 'bg-[#A75C3F] text-white' 
                    : 'bg-gray-200 text-gray-400'
                  }
                `}
              >
                🌸
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
