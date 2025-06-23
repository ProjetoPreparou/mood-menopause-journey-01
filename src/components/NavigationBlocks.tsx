
import React from 'react';
import { Card } from "@/components/ui/card";

interface NavigationBlock {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  onClick: () => void;
}

const NavigationBlocks = () => {
  const navigationBlocks: NavigationBlock[] = [
    {
      id: 'ritual',
      title: 'Ritual',
      description: 'Sua rotina diária de autocuidado',
      icon: '🧘‍♀️',
      color: 'from-pink-100 to-pink-50',
      onClick: () => console.log('Navegando para Ritual')
    },
    {
      id: 'meditacao',
      title: 'Meditação',
      description: 'Momentos de paz e reflexão',
      icon: '🕯️',
      color: 'from-purple-100 to-purple-50',
      onClick: () => console.log('Navegando para Meditação')
    },
    {
      id: 'planner',
      title: 'Planner',
      description: 'Organize seu dia com intenção',
      icon: '📋',
      color: 'from-blue-100 to-blue-50',
      onClick: () => console.log('Navegando para Planner')
    },
    {
      id: 'diario',
      title: 'Diário',
      description: 'Registre seus pensamentos',
      icon: '📝',
      color: 'from-green-100 to-green-50',
      onClick: () => console.log('Navegando para Diário')
    },
    {
      id: 'mensagem',
      title: 'Mensagem',
      description: 'Recados especiais da Célia',
      icon: '💌',
      color: 'from-orange-100 to-orange-50',
      onClick: () => console.log('Navegando para Mensagens')
    }
  ];

  return (
    <div className="space-y-3">
      {navigationBlocks.map((block) => (
        <Card
          key={block.id}
          className={`
            p-4 bg-gradient-to-r ${block.color} border-none shadow-sm 
            hover:shadow-md transition-all duration-200 cursor-pointer
            hover:scale-[1.02] active:scale-[0.98]
          `}
          onClick={block.onClick}
        >
          <div className="flex items-center space-x-4">
            <div className="text-3xl">{block.icon}</div>
            <div className="flex-1">
              <h3 className="font-lora font-semibold text-[#3C3C3C] text-lg">
                {block.title}
              </h3>
              <p className="font-nunito text-gray-600 text-sm">
                {block.description}
              </p>
            </div>
            <div className="text-[#A75C3F] text-xl">→</div>
          </div>
        </Card>
      ))}
      
      {/* Loja com destaque sutil */}
      <Card className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-[1.02] active:scale-[0.98]">
        <div className="flex items-center space-x-4">
          <div className="text-3xl">🛍️</div>
          <div className="flex-1">
            <h3 className="font-lora font-semibold text-[#3C3C3C] text-lg">
              Loja
            </h3>
            <p className="font-nunito text-gray-600 text-sm">
              Produtos especiais para sua jornada
            </p>
          </div>
          <div className="bg-[#A75C3F] text-white px-3 py-1 rounded-full text-xs font-nunito font-medium">
            Novidade
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NavigationBlocks;
