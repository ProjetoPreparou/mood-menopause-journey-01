
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DayContent from '@/components/DayContent';
import { useToast } from '@/hooks/use-toast';

const DayScreen: React.FC = () => {
  const navigate = useNavigate();
  const { dayNumber } = useParams<{ dayNumber: string }>();
  const { toast } = useToast();
  
  const day = parseInt(dayNumber || '1', 10);
  
  // Garantir que day seja sempre um número válido
  const validDay = isNaN(day) ? 1 : day;

  const handleDayComplete = () => {
    // Aqui você integraria com o sistema de progresso real
    // Por exemplo: incrementProgress(day)
    
    toast({
      title: "Progresso salvo! 🌸",
      description: `Dia ${validDay} concluído com sucesso. Continue sua jornada!`,
    });
    
    // Navegar de volta ou para o próximo dia
    navigate('/dashboard'); // ou navigate(`/day/${day + 1}`) se houver próximo dia
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (validDay < 1 || validDay > 21) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="font-lora text-2xl font-bold text-[#3C3C3C] mb-4">
            Dia não encontrado
          </h1>
          <p className="font-nunito text-gray-600 mb-6">
            O Programa Florescer 21 possui apenas 21 dias.
          </p>
          <Button onClick={handleGoBack} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">
      {/* Header com navegação */}
      <div className="bg-white shadow-sm border-b border-pink-100">
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
                Programa Florescer 21
              </h1>
              <p className="font-nunito text-sm text-gray-600">
                Jornada de autodescobrimento e crescimento
              </p>
            </div>
            
            <div className="w-20"></div> {/* Spacer para centralizar o título */}
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="py-8">
        <DayContent day={validDay} onComplete={handleDayComplete} />
      </div>

      {/* Footer informativo */}
      <div className="pb-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center text-sm text-gray-500 font-nunito">
            <p>Progresso: Dia {validDay} de 21</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-[#A75C3F] h-2 rounded-full transition-all duration-300"
                style={{ width: `${(validDay / 21) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayScreen;
