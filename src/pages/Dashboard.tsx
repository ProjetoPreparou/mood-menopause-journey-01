
import React from 'react';
import { useUser } from "@/contexts/UserContext";
import { Card } from "@/components/ui/card";

const Dashboard = () => {
  const { userData } = useUser();

  const getMoodEmoji = (mood: string) => {
    const moodMap: Record<string, string> = {
      'cansada': '😴',
      'aflita': '😰',
      'sensivel': '🥺',
      'irritada': '😤',
      'esperancosa': '🌟',
    };
    return moodMap[mood] || '💭';
  };

  const getTypeTitle = (type: 'C' | 'S' | 'E') => {
    const typeMap = {
      'C': 'Mulher Centrada',
      'S': 'Mulher Sensível',
      'E': 'Mulher em Expansão'
    };
    return typeMap[type];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDF9F5] via-white to-[#FDF9F5] p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-[#A75C3F]">
            Olá, {userData.name}! 👋
          </h1>
          <p className="text-gray-600">
            Bem-vinda ao seu espaço personalizado
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 bg-gradient-to-br from-white to-[#FDF9F5] border-none shadow-lg">
            <div className="text-center space-y-3">
              <div className="text-4xl">{getMoodEmoji(userData.mood)}</div>
              <h3 className="font-semibold text-[#3C3C3C]">Seu Humor Hoje</h3>
              <p className="text-sm text-gray-600 capitalize">
                {userData.mood}
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-white to-[#FDF9F5] border-none shadow-lg">
            <div className="text-center space-y-3">
              <div className="text-4xl">✨</div>
              <h3 className="font-semibold text-[#3C3C3C]">Seu Tipo</h3>
              <p className="text-sm text-gray-600">
                {userData.menopauseType ? getTypeTitle(userData.menopauseType) : 'Não definido'}
              </p>
            </div>
          </Card>
        </div>

        <Card className="p-6 bg-gradient-to-br from-[#A75C3F]/5 to-white border-none shadow-lg">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold text-[#A75C3F]">
              Seu Plano Personalizado
            </h3>
            <p className="text-gray-600">
              Com base no seu perfil, preparamos conteúdos especiais para você.
            </p>
            <div className="flex justify-center">
              <div className="bg-white rounded-lg p-4 text-left max-w-md">
                <h4 className="font-medium text-[#3C3C3C] mb-2">Próximos passos:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Explore seu conteúdo personalizado</li>
                  <li>• Acompanhe seu humor diário</li>
                  <li>• Acesse recursos exclusivos</li>
                  <li>• Conecte-se com a comunidade</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
