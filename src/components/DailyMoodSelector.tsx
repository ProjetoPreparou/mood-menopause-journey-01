
import React from 'react';
import { useUser } from "@/contexts/UserContext";

interface MoodOption {
  id: string;
  emoji: string;
  label: string;
}

const moodOptions: MoodOption[] = [
  { id: 'cansada', emoji: '😴', label: 'Cansada' },
  { id: 'aflita', emoji: '😰', label: 'Aflita' },
  { id: 'sensivel', emoji: '🥺', label: 'Sensível' },
  { id: 'irritada', emoji: '😤', label: 'Irritada' },
  { id: 'esperancosa', emoji: '🌟', label: 'Esperançosa' },
];

const DailyMoodSelector = () => {
  const { userData, updateUserData } = useUser();

  const getMoodEmoji = (mood: string) => {
    const moodOption = moodOptions.find(option => option.id === mood);
    return moodOption ? moodOption.emoji : '💭';
  };

  const handleMoodSelect = (moodId: string) => {
    updateUserData({ mood: moodId });
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <h3 className="font-lora font-semibold text-[#3C3C3C] mb-3 text-center">
        Como você está se sentindo hoje?
      </h3>
      <div className="flex justify-center space-x-2">
        {moodOptions.map((mood) => (
          <button
            key={mood.id}
            onClick={() => handleMoodSelect(mood.id)}
            className={`
              w-12 h-12 rounded-full flex items-center justify-center text-2xl
              transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#A75C3F] focus:ring-opacity-50
              ${userData.mood === mood.id 
                ? 'bg-[#A75C3F] bg-opacity-10 ring-2 ring-[#A75C3F] ring-opacity-30' 
                : 'hover:bg-gray-100'
              }
            `}
            aria-label={`Selecionar humor: ${mood.label}`}
            title={mood.label}
          >
            {mood.emoji}
          </button>
        ))}
      </div>
      {userData.mood && (
        <p className="text-center text-sm text-gray-600 mt-2 font-nunito">
          Humor atual: {getMoodEmoji(userData.mood)} {moodOptions.find(m => m.id === userData.mood)?.label}
        </p>
      )}
    </div>
  );
};

export default DailyMoodSelector;
