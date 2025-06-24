
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
import { Crown, Sparkles, Calendar, Book } from 'lucide-react';

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
