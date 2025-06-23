
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ResultContent {
  title: string;
  description: string;
  characteristics: string[];
  message: string;
  videoPlaceholder: string;
}

const resultContent: Record<'C' | 'S' | 'E', ResultContent> = {
  C: {
    title: 'Mulher Centrada',
    description: 'Você tem uma abordagem equilibrada e prática para navegar pela menopausa.',
    characteristics: [
      'Busca informações baseadas em evidências',
      'Mantém uma rotina estruturada',
      'Foca em soluções práticas e eficazes'
    ],
    message: 'Célia diz: "Sua abordagem centrada é uma grande fortaleza. Continue confiando na sua sabedoria interior."',
    videoPlaceholder: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop'
  },
  S: {
    title: 'Mulher Sensível',
    description: 'Você navega pela menopausa com consciência emocional e conexão profunda.',
    characteristics: [
      'Valoriza conexões emocionais autênticas',
      'Busca apoio em comunidade',
      'Processa mudanças com profundidade'
    ],
    message: 'Célia diz: "Sua sensibilidade é um superpoder. Permita-se sentir e confie no seu processo."',
    videoPlaceholder: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=300&fit=crop'
  },
  E: {
    title: 'Mulher em Expansão',
    description: 'Você vê a menopausa como uma oportunidade de crescimento e transformação.',
    characteristics: [
      'Abraça mudanças como oportunidades',
      'Busca empoderamento pessoal',
      'Tem uma visão otimista do futuro'
    ],
    message: 'Célia diz: "Sua energia expansiva é inspiradora. Continue se reinventando e brilhando!"',
    videoPlaceholder: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop'
  }
};

interface QuizResultProps {
  result: 'C' | 'S' | 'E';
  onContinue: () => void;
}

const QuizResult = ({ result, onContinue }: QuizResultProps) => {
  const content = resultContent[result];

  return (
    <Card className="p-6 bg-gradient-to-br from-[#FDF9F5] to-white border-none shadow-xl max-w-md mx-auto">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <div className="text-4xl mb-2">✨</div>
          <h3 className="text-2xl font-bold text-[#A75C3F]">
            {content.title}
          </h3>
          <p className="text-gray-600 text-sm">
            {content.description}
          </p>
        </div>

        <div className="bg-white/80 rounded-lg p-4 space-y-3">
          <h4 className="font-semibold text-[#3C3C3C] text-sm">
            Suas características:
          </h4>
          <ul className="space-y-2 text-sm text-gray-600">
            {content.characteristics.map((char, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-[#A75C3F] mt-1">•</span>
                <span>{char}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-to-r from-[#A75C3F]/10 to-[#A75C3F]/5 rounded-lg p-4">
          <div className="relative">
            <img 
              src={content.videoPlaceholder} 
              alt="Mensagem da Célia"
              className="w-full h-32 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
              <div className="bg-white/90 rounded-full p-2">
                <svg className="w-6 h-6 text-[#A75C3F]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 5v10l8-5-8-5z"/>
                </svg>
              </div>
            </div>
          </div>
          <p className="text-sm text-[#3C3C3C] mt-3 italic">
            {content.message}
          </p>
        </div>

        <Button
          onClick={onContinue}
          className="w-full bg-[#A75C3F] hover:bg-[#8B4A36] text-white py-3 rounded-full transition-all duration-200 transform hover:scale-105"
        >
          Continuar para o Dashboard
        </Button>
      </div>
    </Card>
  );
};

export default QuizResult;
