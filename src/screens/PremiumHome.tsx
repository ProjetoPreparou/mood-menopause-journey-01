
import React, { useState, useEffect } from 'react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import MonthlyContent from '@/components/premium/MonthlyContent';
import ChallengeTracker from '@/components/premium/ChallengeTracker';
import BoardJournal from '@/components/premium/BoardJournal';
import { Crown, Sparkles, Calendar, Book, Heart, Flame, Play, Edit, MessageCircle, ShoppingBag } from 'lucide-react';

const PremiumHome = () => {
  const { subscription } = useSubscription();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState<'content' | 'challenge' | 'journal'>('content');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
  }, [user, navigate]);

  if (subscription.loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FDF9F5] via-white to-[#F8E8F5] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A75C3F] mx-auto"></div>
          <p className="mt-4 text-gray-600">Verificando assinatura...</p>
        </div>
      </div>
    );
  }

  if (!subscription.isActive) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FDF9F5] via-white to-[#F8E8F5] p-4">
        <div className="max-w-md mx-auto pt-8">
          <Card className="p-8 text-center bg-gradient-to-br from-white to-[#FDF9F5] border-none shadow-lg">
            <Crown className="w-16 h-16 text-[#A75C3F] mx-auto mb-4" />
            <h1 className="font-lora text-2xl font-bold text-[#A75C3F] mb-4">
              Florescer Premium 🌸
            </h1>
            <p className="text-gray-600 mb-6">
              Acesse conteúdos exclusivos, desafios mensais e nossa comunidade secreta
            </p>
            <div className="space-y-3 text-left mb-6">
              <div className="flex items-center space-x-3">
                <Sparkles className="w-5 h-5 text-[#A75C3F]" />
                <span className="text-sm">3 áudios exclusivos por mês</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-[#A75C3F]" />
                <span className="text-sm">Desafios de 7 dias</span>
              </div>
              <div className="flex items-center space-x-3">
                <Book className="w-5 h-5 text-[#A75C3F]" />
                <span className="text-sm">Lives exclusivas</span>
              </div>
            </div>
            <Button 
              className="w-full bg-[#A75C3F] hover:bg-[#8B4A36] text-white"
              onClick={() => navigate('/subscription')}
            >
              Assinar Premium
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  const premiumSections = [
    {
      id: 'ritual',
      title: 'Ritual',
      description: 'Sua rotina diária de autocuidado',
      icon: Flame,
      color: 'from-pink-100 to-pink-50',
      route: '/ritual'
    },
    {
      id: 'meditation',
      title: 'Meditação',
      description: 'Áudios exclusivos mensais',
      icon: Play,
      color: 'from-purple-100 to-purple-50',
      route: '/meditation'
    },
    {
      id: 'planner',
      title: 'Planner',
      description: 'Organize seu mês com intenção',
      icon: Calendar,
      color: 'from-blue-100 to-blue-50',
      route: '/planner'
    },
    {
      id: 'diary',
      title: 'Diário',
      description: 'Reflexões livres e guiadas',
      icon: Edit,
      color: 'from-green-100 to-green-50',
      route: '/diary'
    },
    {
      id: 'message',
      title: 'Mensagem',
      description: 'Recados semanais da Célia',
      icon: MessageCircle,
      color: 'from-orange-100 to-orange-50',
      route: '/messages'
    },
    {
      id: 'shop',
      title: 'Loja',
      description: 'Produtos simbólicos exclusivos',
      icon: ShoppingBag,
      color: 'from-amber-100 to-amber-50',
      route: '/shop'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDF9F5] via-white to-[#F8E8F5] font-nunito">
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Header Premium */}
        <div className="text-center pt-8 pb-4">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Crown className="w-8 h-8 text-[#A75C3F]" />
            <h1 className="font-lora text-3xl font-bold text-[#A75C3F]">
              Florescer Premium
            </h1>
          </div>
          <Badge className="bg-gradient-to-r from-[#A75C3F] to-[#8B4A36] text-white">
            Assinatura Ativa
          </Badge>
        </div>

        {/* Premium Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {premiumSections.map((section) => {
            const IconComponent = section.icon;
            return (
              <Card
                key={section.id}
                className={`
                  p-6 bg-gradient-to-r ${section.color} border-none shadow-sm 
                  hover:shadow-md transition-all duration-200 cursor-pointer
                  hover:scale-[1.02] active:scale-[0.98]
                `}
                onClick={() => navigate(section.route)}
              >
                <div className="flex items-center space-x-4">
                  <IconComponent className="w-8 h-8 text-[#A75C3F]" />
                  <div className="flex-1">
                    <h3 className="font-lora font-semibold text-[#3C3C3C] text-lg">
                      {section.title}
                    </h3>
                    <p className="font-nunito text-gray-600 text-sm">
                      {section.description}
                    </p>
                  </div>
                  <div className="text-[#A75C3F] text-xl">→</div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center space-x-2">
          <Button
            variant={currentTab === 'content' ? 'default' : 'outline'}
            onClick={() => setCurrentTab('content')}
            className={currentTab === 'content' ? 'bg-[#A75C3F] text-white' : 'border-[#A75C3F] text-[#A75C3F]'}
          >
            Conteúdo Mensal
          </Button>
          <Button
            variant={currentTab === 'challenge' ? 'default' : 'outline'}
            onClick={() => setCurrentTab('challenge')}
            className={currentTab === 'challenge' ? 'bg-[#A75C3F] text-white' : 'border-[#A75C3F] text-[#A75C3F]'}
          >
            Desafio
          </Button>
          <Button
            variant={currentTab === 'journal' ? 'default' : 'outline'}
            onClick={() => setCurrentTab('journal')}
            className={currentTab === 'journal' ? 'bg-[#A75C3F] text-white' : 'border-[#A75C3F] text-[#A75C3F]'}
          >
            Diário de Bordo
          </Button>
        </div>

        {/* Content Area */}
        <div className="mt-6">
          {currentTab === 'content' && <MonthlyContent />}
          {currentTab === 'challenge' && <ChallengeTracker />}
          {currentTab === 'journal' && <BoardJournal />}
        </div>

        {/* Back Button */}
        <div className="text-center pt-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="text-[#A75C3F] hover:bg-[#A75C3F] hover:text-white"
          >
            Voltar ao Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PremiumHome;
