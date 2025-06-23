
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDF9F5] via-white to-[#FDF9F5] flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-md">
        <div className="space-y-4">
          <div className="text-6xl mb-4">🌸</div>
          <h1 className="text-4xl font-bold text-[#A75C3F] mb-4">
            Bem-vinda à sua Jornada
          </h1>
          <p className="text-lg text-[#3C3C3C] leading-relaxed">
            Um espaço acolhedor para navegar pela menopausa com sabedoria, 
            cuidado e apoio personalizado.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button
            onClick={() => navigate('/onboarding')}
            className="w-full bg-[#A75C3F] hover:bg-[#8B4A36] text-white py-4 text-lg rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Começar Agora
          </Button>
          
          <p className="text-sm text-gray-500">
            Descobra seu perfil único e receba conteúdo personalizado
          </p>
        </div>
        
        <div className="bg-white/80 rounded-2xl p-6 shadow-lg">
          <h3 className="font-semibold text-[#3C3C3C] mb-3">
            O que você vai encontrar:
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <span className="text-[#A75C3F]">✨</span>
              <span>Quiz personalizado para descobrir seu tipo</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[#A75C3F]">💭</span>
              <span>Acompanhamento do seu humor diário</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[#A75C3F]">🎯</span>
              <span>Conteúdo exclusivo com a Célia</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[#A75C3F]">🤝</span>
              <span>Comunidade de apoio e cuidado</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
