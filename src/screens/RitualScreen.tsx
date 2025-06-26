
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Candle, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const RitualScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">
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
                Ritual Sagrado 🧘‍♀️
              </h1>
              <p className="font-nunito text-sm text-gray-600">
                Sua rotina diária de autocuidado
              </p>
            </div>
            
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      <div className="py-8 max-w-2xl mx-auto p-4 space-y-6">
        <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <div className="text-center mb-6">
            <Candle className="w-12 h-12 text-[#A75C3F] mx-auto mb-4" />
            <h2 className="font-lora text-2xl font-bold text-[#3C3C3C] mb-2">
              Momento Sagrado
            </h2>
            <p className="font-nunito text-gray-600">
              Reserve este tempo para se conectar consigo mesma
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-lora font-semibold text-[#3C3C3C] mb-2">
                Respiração Consciente
              </h3>
              <p className="font-nunito text-gray-600 text-sm">
                Inspire profundamente por 4 segundos, segure por 4, expire por 6
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-lora font-semibold text-[#3C3C3C] mb-2">
                Gratidão Diária
              </h3>
              <p className="font-nunito text-gray-600 text-sm">
                Pense em 3 coisas pelas quais você é grata hoje
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-lora font-semibold text-[#3C3C3C] mb-2">
                Intenção do Dia
              </h3>
              <p className="font-nunito text-gray-600 text-sm">
                Defina uma intenção amorosa para hoje
              </p>
            </div>
          </div>

          <Button className="w-full mt-6 bg-[#A75C3F] hover:bg-[#8B4A36] text-white">
            <Heart className="w-4 h-4 mr-2" />
            Concluir Ritual
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default RitualScreen;
