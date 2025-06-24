
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import LivePlayer from './LivePlayer';
import { Play, Users, Calendar, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PremiumContent {
  id: string;
  month_year: string;
  title: string;
  description: string;
  audio_files: string[];
  challenge_title: string;
  challenge_description: string;
  menu_content: any;
  live_video_url: string;
  live_title: string;
  community_link: string;
}

const MonthlyContent = () => {
  const [content, setContent] = useState<PremiumContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContent, setSelectedContent] = useState<PremiumContent | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('premium_content')
        .select('*')
        .order('month_year', { ascending: false });

      if (error) throw error;
      
      setContent(data || []);
      if (data && data.length > 0) {
        setSelectedContent(data[0]); // Seleciona o conteúdo mais recente
      }
    } catch (error) {
      console.error('Error fetching content:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar o conteúdo",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatMonthYear = (monthYear: string) => {
    const [year, month] = monthYear.split('-');
    const monthNames = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const openCommunity = () => {
    if (selectedContent?.community_link) {
      window.open(selectedContent.community_link, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#A75C3F] mx-auto"></div>
        <p className="mt-2 text-gray-600">Carregando conteúdo...</p>
      </div>
    );
  }

  if (!selectedContent) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Nenhum conteúdo disponível ainda</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Month Selection */}
      <div className="flex flex-wrap gap-2 justify-center">
        {content.map((item) => (
          <Button
            key={item.id}
            variant={selectedContent.id === item.id ? 'default' : 'outline'}
            onClick={() => setSelectedContent(item)}
            className={`
              ${selectedContent.id === item.id 
                ? 'bg-[#A75C3F] text-white' 
                : 'border-[#A75C3F] text-[#A75C3F] hover:bg-[#A75C3F] hover:text-white'
              }
            `}
          >
            {formatMonthYear(item.month_year)}
          </Button>
        ))}
      </div>

      {/* Content Header */}
      <Card className="p-6 bg-gradient-to-r from-[#FDF9F5] to-[#F8E8F5] border-none shadow-lg">
        <div className="flex items-center space-x-3 mb-3">
          <Sparkles className="w-6 h-6 text-[#A75C3F]" />
          <h2 className="font-lora text-2xl font-bold text-[#A75C3F]">
            {selectedContent.title}
          </h2>
        </div>
        <p className="text-gray-700 text-lg leading-relaxed">
          {selectedContent.description}
        </p>
        <Badge className="mt-3 bg-[#A75C3F] text-white">
          {formatMonthYear(selectedContent.month_year)}
        </Badge>
      </Card>

      {/* Audio Content */}
      <Card className="p-6 bg-white border-none shadow-lg">
        <h3 className="font-lora text-xl font-semibold text-[#3C3C3C] mb-4 flex items-center">
          <Play className="w-5 h-5 mr-2 text-[#A75C3F]" />
          Áudios Exclusivos
        </h3>
        <div className="space-y-3">
          {selectedContent.audio_files.map((audioUrl, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-[#FDF9F5] rounded-lg">
              <span className="font-nunito text-gray-700">
                Áudio {index + 1} - Sessão Premium
              </span>
              <Button 
                size="sm" 
                className="bg-[#A75C3F] hover:bg-[#8B4A36] text-white"
                onClick={() => {
                  // Placeholder para reprodução do áudio
                  toast({
                    title: "Reproduzindo",
                    description: `Áudio ${index + 1} iniciado`,
                  });
                }}
              >
                <Play className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Live Content */}
      <Card className="p-6 bg-white border-none shadow-lg">
        <h3 className="font-lora text-xl font-semibold text-[#3C3C3C] mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-[#A75C3F]" />
          Live Exclusiva
        </h3>
        <LivePlayer 
          videoUrl={selectedContent.live_video_url}
          title={selectedContent.live_title}
        />
      </Card>

      {/* Symbolic Menu */}
      {selectedContent.menu_content && (
        <Card className="p-6 bg-gradient-to-br from-[#F8E8F5] to-[#FDF9F5] border-none shadow-lg">
          <h3 className="font-lora text-xl font-semibold text-[#3C3C3C] mb-4">
            🌸 Cardápio Simbólico
          </h3>
          <div className="space-y-3">
            {Object.entries(selectedContent.menu_content).map(([key, value]) => (
              <div key={key} className="flex items-start space-x-3">
                <div className="w-3 h-3 bg-[#A75C3F] rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-[#3C3C3C] capitalize">
                    {key.replace('_', ' ')}
                  </p>
                  <p className="text-gray-600 font-nunito">
                    {value as string}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Community Access */}
      <Card className="p-6 bg-gradient-to-r from-[#A75C3F] to-[#8B4A36] text-white border-none shadow-lg">
        <h3 className="font-lora text-xl font-semibold mb-3 flex items-center">
          <Users className="w-5 h-5 mr-2" />
          Comunidade Secreta
        </h3>
        <p className="text-white/90 mb-4">
          Conecte-se com outras mulheres na mesma jornada. Compartilhe experiências e receba apoio.
        </p>
        <Button 
          onClick={openCommunity}
          className="bg-white text-[#A75C3F] hover:bg-gray-100"
        >
          Entrar na Comunidade
        </Button>
      </Card>
    </div>
  );
};

export default MonthlyContent;
