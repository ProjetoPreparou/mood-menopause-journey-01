
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Question {
  id: string;
  text: string;
  options: { value: string; label: string; score: { C: number; S: number; E: number } }[];
}

const questions: Question[] = [
  {
    id: 'symptoms',
    text: 'Quais sintomas você tem experienciado mais?',
    options: [
      { value: 'hot-flashes', label: 'Ondas de calor frequentes', score: { C: 2, S: 1, E: 0 } },
      { value: 'irregular-periods', label: 'Períodos irregulares', score: { C: 1, S: 2, E: 1 } },
      { value: 'mood-changes', label: 'Mudanças de humor intensas', score: { C: 0, S: 2, E: 1 } },
      { value: 'energy-changes', label: 'Mudanças de energia e motivação', score: { C: 1, S: 1, E: 2 } },
    ],
  },
  {
    id: 'approach',
    text: 'Como você prefere lidar com mudanças na sua vida?',
    options: [
      { value: 'practical', label: 'De forma prática e estruturada', score: { C: 2, S: 0, E: 1 } },
      { value: 'emotional', label: 'Processando emocionalmente primeiro', score: { C: 0, S: 2, E: 1 } },
      { value: 'adventurous', label: 'Vendo como uma nova aventura', score: { C: 1, S: 1, E: 2 } },
    ],
  },
  {
    id: 'support',
    text: 'Que tipo de apoio você mais valoriza?',
    options: [
      { value: 'information', label: 'Informações claras e baseadas em evidências', score: { C: 2, S: 1, E: 0 } },
      { value: 'community', label: 'Conexão com outras mulheres', score: { C: 1, S: 2, E: 1 } },
      { value: 'empowerment', label: 'Ferramentas para empoderamento pessoal', score: { C: 0, S: 1, E: 2 } },
    ],
  },
];

interface MenopauseQuizProps {
  onComplete: (result: 'C' | 'S' | 'E') => void;
}

const MenopauseQuiz = ({ onComplete }: MenopauseQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');

  const handleNext = () => {
    if (!selectedAnswer) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
    } else {
      // Calculate result
      const scores = { C: 0, S: 0, E: 0 };
      
      newAnswers.forEach((answer, index) => {
        const question = questions[index];
        const option = question.options.find(opt => opt.value === answer);
        if (option) {
          scores.C += option.score.C;
          scores.S += option.score.S;
          scores.E += option.score.E;
        }
      });

      const result = Object.entries(scores).reduce((a, b) => 
        scores[a[0] as keyof typeof scores] > scores[b[0] as keyof typeof scores] ? a : b
      )[0] as 'C' | 'S' | 'E';

      onComplete(result);
    }
  };

  const question = questions[currentQuestion];

  return (
    <Card className="p-6 bg-[#FDF9F5] border-none shadow-lg">
      <div className="space-y-6">
        <div className="text-center">
          <div className="flex justify-center space-x-2 mb-4">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index <= currentQuestion ? 'bg-[#A75C3F]' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <h3 className="text-lg font-semibold text-[#3C3C3C] mb-2">
            Quiz: Descobrindo seu Tipo
          </h3>
          <p className="text-sm text-gray-600">
            Pergunta {currentQuestion + 1} de {questions.length}
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-base font-medium text-[#3C3C3C]">
            {question.text}
          </h4>
          
          <div className="space-y-3">
            {question.options.map((option) => (
              <Button
                key={option.value}
                variant={selectedAnswer === option.value ? "default" : "outline"}
                className={`
                  w-full p-4 h-auto text-left justify-start transition-all duration-200
                  ${selectedAnswer === option.value
                    ? 'bg-[#A75C3F] hover:bg-[#8B4A36] text-white border-[#A75C3F]'
                    : 'bg-white hover:bg-[#FDF9F5] text-[#3C3C3C] border-gray-200 hover:border-[#A75C3F]'
                  }
                `}
                onClick={() => setSelectedAnswer(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <Button
          onClick={handleNext}
          disabled={!selectedAnswer}
          className="w-full bg-[#A75C3F] hover:bg-[#8B4A36] text-white py-3 transition-all duration-200 disabled:opacity-50"
        >
          {currentQuestion < questions.length - 1 ? 'Próxima' : 'Ver Resultado'}
        </Button>
      </div>
    </Card>
  );
};

export default MenopauseQuiz;
