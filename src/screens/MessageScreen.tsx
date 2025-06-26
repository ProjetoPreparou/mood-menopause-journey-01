
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const MessageScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const messages = [
    {
      id: 1,
      title: "Bem-vinda à sua jornada! 🌸",
      content: "Querida, que alegria ter você aqui! Lembre-se: cada passo é uma vitória, cada dia é uma nova oportunidade de florescer.",
      date: "Hoje",
      isNew: true
    },
    {
      id: 2,
      title: "O poder da paciência 💫",
      content: "A menopausa é como uma borboleta saindo do casulo. O processo pode ser desconfortável, mas o resultado é uma transformação linda e poderosa.",
      date: "Ontem",
      isNew: false
    },
    {
      id: 3,
      title: "Você não está sozinha 🤝",
      content: "Milhares de mulheres passam por essa fase. Compartilhe suas experiências, ouça outras histórias, e lembre-se: juntas somos mais fortes.",
      date: "2 dias atrás",
      isNew: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="bg-white shadow-sm border-b border-orange-100">
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
                Mensagens 💌
              </h1>
              <p className="font-nunito text-sm text-gray-600">
                Recados especiais da Célia
              </p>
            </div>
            
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      <div className="py-8 max-w-2xl mx-auto p-4 space-y-6">
        <Card className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-[#A75C3F] rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-lora font-bold text-[#3C3C3C]">Célia</h2>
              <p className="font-nunito text-sm text-gray-600">Sua mentora de vida</p>
            </div>
          </div>
          <p className="font-nunito text-gray-700 italic">
            "Cada mulher que passa pela menopausa carrega dentro de si uma sabedoria única. 
            Você está se tornando a versão mais poderosa de si mesma."
          </p>
        </Card>

        <div className="space-y-4">
          {messages.map((message) => (
            <Card key={message.id} className={`p-4 border-orange-200 ${message.isNew ? 'bg-orange-50' : 'bg-white'}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <h3 className="font-lora font-semibold text-[#3C3C3C]">
                    {message.title}
                  </h3>
                  {message.isNew && (
                    <Star className="w-4 h-4 text-amber-500 fill-current" />
                  )}
                </div>
                <span className="text-xs text-gray-500">{message.date}</span>
              </div>
              
              <p className="font-nunito text-gray-700 leading-relaxed">
                {message.content}
              </p>
            </Card>
          ))}
        </div>

        <Card className="p-4 bg-gradient-to-r from-pink-50 to-rose-50 border-pink-200">
          <div className="text-center">
            <Heart className="w-8 h-8 text-[#A75C3F] mx-auto mb-2" />
            <p className="font-nunito text-sm text-gray-600">
              Novas mensagens chegam semanalmente. Fique atenta! 💕
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MessageScreen;
