
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2 } from 'lucide-react';

interface LivePlayerProps {
  videoUrl: string;
  title: string;
}

const LivePlayer: React.FC<LivePlayerProps> = ({ videoUrl, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // Placeholder para controle de reprodução
    console.log(isPlaying ? 'Pausando' : 'Reproduzindo', videoUrl);
  };

  return (
    <Card className="bg-black text-white border-none overflow-hidden">
      {/* Video Placeholder */}
      <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#A75C3F] rounded-full flex items-center justify-center mb-4 mx-auto">
            {isPlaying ? (
              <Pause className="w-8 h-8 text-white" />
            ) : (
              <Play className="w-8 h-8 text-white ml-1" />
            )}
          </div>
          <p className="text-gray-300 text-sm">
            Player de vídeo - {title}
          </p>
        </div>
        
        {/* Play Button Overlay */}
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors"
        >
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            {isPlaying ? (
              <Pause className="w-10 h-10 text-white" />
            ) : (
              <Play className="w-10 h-10 text-white ml-1" />
            )}
          </div>
        </button>
      </div>

      {/* Controls */}
      <div className="p-4 bg-gray-900">
        <h4 className="font-semibold text-white mb-3">
          {title}
        </h4>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              size="sm"
              onClick={togglePlay}
              className="bg-[#A75C3F] hover:bg-[#8B4A36] text-white"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Volume2 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-sm text-gray-400">
            {isPlaying ? 'Reproduzindo...' : 'Pausado'}
          </div>
        </div>
        
        {/* Progress Bar Placeholder */}
        <div className="mt-3 bg-gray-700 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-[#A75C3F] h-full rounded-full transition-all duration-300"
            style={{ width: isPlaying ? '30%' : '0%' }}
          ></div>
        </div>
      </div>
    </Card>
  );
};

export default LivePlayer;
