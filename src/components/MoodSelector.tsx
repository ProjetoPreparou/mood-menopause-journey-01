
import React from 'react';
import { Button } from "@/components/ui/button";

interface MoodOption {
  id: string;
  emoji: string;
  label: string;
  description: string;
}

const moodOptions: MoodOption[] = [
  { id: 'cansada', emoji: '😴', label: 'Cansada', description: 'Sentindo fadiga e baixa energia' },
  { id: 'aflita', emoji: '😰', label: 'Aflita', description: 'Ansiosa e preocupada' },
  { id: 'sensivel', emoji: '🥺', label: 'Sensível', description: 'Emotiva e delicada' },
  { id: 'irritada', emoji: '😤', label: 'Irritada', description: 'Impaciente e frustrada' },
  { id: 'esperancosa', emoji: '🌟', label: 'Esperançosa', description: 'Otimista e confiante' },
];

interface MoodSelectorProps {
  selectedMood: string;
  onMoodSelect: (mood: string) => void;
}

const MoodSelector = ({ selectedMood, onMoodSelect }: MoodSelectorProps) => {
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-[#3C3C3C] mb-2">
          Como você está se sentindo hoje?
        </h3>
        <p className="text-sm text-gray-600">
          Escolha o humor que mais representa seu estado atual
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {moodOptions.map((mood) => (
          <Button
            key={mood.id}
            variant={selectedMood === mood.id ? "default" : "outline"}
            className={`
              p-4 h-auto justify-start text-left transition-all duration-200 hover:scale-105
              ${selectedMood === mood.id 
                ? 'bg-[#A75C3F] hover:bg-[#8B4A36] text-white border-[#A75C3F]' 
                : 'bg-white hover:bg-[#FDF9F5] text-[#3C3C3C] border-gray-200 hover:border-[#A75C3F]'
              }
            `}
            onClick={() => onMoodSelect(mood.id)}
          >
            <div className="flex items-center space-x-4 w-full">
              <span className="text-2xl">{mood.emoji}</span>
              <div className="flex-1">
                <div className="font-medium">{mood.label}</div>
                <div className={`text-sm opacity-80 ${selectedMood === mood.id ? 'text-white' : 'text-gray-500'}`}>
                  {mood.description}
                </div>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
