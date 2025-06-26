
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Pause, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const MeditationScreen: React.FC = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);

  const handleGoBack = () => {
    navigate(-1);
  };

  const toggleMeditation = () => {
    setIsPlaying(!isPlaying);
  };

  const meditations = [
    { title: "Meditação da Manhã", duration: "10 min", type: "Energizante" },
    { title: "Paz Interior", duration: "15 min", type: "Relaxante" },
    { title: "Amor Próprio", duration: "12 min", type: "Curativa" },
    { title: "Meditação Noturna", duration: "20 min", type: "Reconfortante" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="bg-white shadow-sm border-b border-purple-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              onClick={handleGoBack}
              variant="ghost"
              className="text-gray-600 hover:text-[#A75C3F]"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            
            <div className="text-center">
              <h1 className="font-lora text-xl font-bold text-[#3C3C3C]">
                Meditação 🕯️
              </h1>
              <p className="font-nunito text-sm text-gray-600">
                Momentos de paz e reflexão
              </p>
            </div>
            
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      <div className="py-8 max-w-2xl mx-auto p-4 space-y-6">
        {meditations.map((meditation, index) => (
          <Card key={index} className="p-4 border-purple-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-lora font-semibold text-[#3C3C3C] mb-1">
                  {meditation.title}
                </h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {meditation.duration}
                  </span>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                    {meditation.type}
                  </span>
                </div>
              </div>
              
              <Button
                onClick={toggleMeditation}
                size="sm"
                className="bg-[#A75C3F] hover:bg-[#8B4A36] text-white"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MeditationScreen;
