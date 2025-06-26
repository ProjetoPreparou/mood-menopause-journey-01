import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Pause, Clock, Download, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const MeditationScreen: React.FC = () => {
  const navigate = useNavigate();
  const [playingId, setPlayingId] = useState<number | null>(null);

  const handleGoBack = () => {
    navigate('/dashboard');
  };

  const toggleMeditation = (id: number) => {
    setPlayingId(playingId === id ? null : id);
  };

  const meditations = [
    { 
      id: 1,
      title: "Meditação da Manhã", 
      duration: "10 min", 
      type: "Energizante",
      description: "Comece seu dia com energia renovada e intenções claras",
      isNew: true
    },
    { 
      id: 2,
      title: "Paz Interior", 
      duration: "15 min", 
      type: "Relaxante",
      description: "Encontre calma no meio da tempestade emocional",
      isNew: false
    },
    { 
      id: 3,
      title: "Amor Próprio", 
      duration: "12 min", 
      type: "Curativa",
      description: "Cultive uma relação amorosa consigo mesma",
      isNew: true
    },
    { 
      id: 4,
      title: "Meditação Noturna", 
      duration: "20 min", 
      type: "Reconfortante",
      description: "Prepare-se para uma noite de sono reparador",
      isNew: false
    }
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
                Áudios exclusivos Premium
              </p>
            </div>
            
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      <div className="py-8 max-w-2xl mx-auto p-4 space-y-6">
        {/* Premium Notice */}
        <Card className="p-4 bg-gradient-to-r from-[#A75C3F] to-[#8B4A36] text-white border-none">
          <div className="flex items-center space-x-3">
            <Volume2 className="w-6 h-6" />
            <div>
              <h3 className="font-lora font-semibold">Meditações Premium</h3>
              <p className="font-nunito text-sm text-white/90">
                3 novos áudios toda semana, especialmente gravados pela Célia
              </p>
            </div>
          </div>
        </Card>

        {meditations.map((meditation) => (
          <Card key={meditation.id} className="p-6 border-purple-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-lora font-semibold text-[#3C3C3C]">
                    {meditation.title}
                  </h3>
                  {meditation.isNew && (
                    <Badge className="bg-purple-100 text-purple-800 text-xs">
                      Novo
                    </Badge>
                  )}
                </div>
                <p className="font-nunito text-gray-600 text-sm mb-3">
                  {meditation.description}
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {meditation.duration}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {meditation.type}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <Button
                onClick={() => toggleMeditation(meditation.id)}
                className="bg-[#A75C3F] hover:bg-[#8B4A36] text-white"
              >
                {playingId === meditation.id ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Pausar
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Reproduzir
                  </>
                )}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="text-[#A75C3F] border-[#A75C3F]"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>

            {playingId === meditation.id && (
              <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="font-nunito text-sm text-purple-700">
                    Reproduzindo... 2:34 / {meditation.duration}
                  </span>
                </div>
                <div className="w-full bg-purple-200 rounded-full h-2 mt-2">
                  <div className="bg-purple-500 h-2 rounded-full w-1/4"></div>
                </div>
              </div>
            )}
          </Card>
        ))}

        {/* Tips Card */}
        <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <div className="text-center">
            <h3 className="font-lora font-semibold text-[#3C3C3C] text-sm mb-2">
              💡 Dica Premium
            </h3>
            <p className="font-nunito text-gray-600 text-sm">
              Use fones de ouvido para uma experiência mais imersiva. Reserve 10 minutos sem interrupções.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MeditationScreen;
