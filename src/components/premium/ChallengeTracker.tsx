
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Calendar, CheckCircle, Clock, Target } from 'lucide-react';

interface ChallengeProgress {
  day_number: number;
  completed: boolean;
  notes: string;
  completed_at: string | null;
}

interface CurrentChallenge {
  title: string;
  description: string;
  month_year: string;
}

const ChallengeTracker = () => {
  const [currentChallenge, setCurrentChallenge] = useState<CurrentChallenge | null>(null);
  const [progress, setProgress] = useState<ChallengeProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState<Record<number, string>>({});
  const { user } = useAuth();
  const { toast } = useToast();

  const currentMonthYear = new Date().toISOString().slice(0, 7); // "2024-01"

  useEffect(() => {
    fetchCurrentChallenge();
    fetchProgress();
  }, []);

  const fetchCurrentChallenge = async () => {
    try {
      const { data, error } = await supabase
        .from('premium_content')
        .select('challenge_title, challenge_description, month_year')
        .eq('month_year', currentMonthYear)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setCurrentChallenge({
          title: data.challenge_title,
          description: data.challenge_description,
          month_year: data.month_year,
        });
      }
    } catch (error) {
      console.error('Error fetching challenge:', error);
    }
  };

  const fetchProgress = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('challenge_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('month_year', currentMonthYear)
        .order('day_number');

      if (error) throw error;

      // Inicializar progresso para 7 dias
      const initialProgress: ChallengeProgress[] = Array.from({ length: 7 }, (_, i) => ({
        day_number: i + 1,
        completed: false,
        notes: '',
        completed_at: null,
      }));

      // Mesclar com dados existentes
      if (data) {
        data.forEach((item) => {
          const index = item.day_number - 1;
          if (index >= 0 && index < 7) {
            initialProgress[index] = {
              day_number: item.day_number,
              completed: item.completed,
              notes: item.notes || '',
              completed_at: item.completed_at,
            };
          }
        });
      }

      setProgress(initialProgress);
      
      // Inicializar notas
      const initialNotes: Record<number, string> = {};
      initialProgress.forEach((item) => {
        initialNotes[item.day_number] = item.notes;
      });
      setNotes(initialNotes);
      
    } catch (error) {
      console.error('Error fetching progress:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar o progresso",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleDay = async (dayNumber: number, completed: boolean) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('challenge_progress')
        .upsert({
          user_id: user.id,
          month_year: currentMonthYear,
          day_number: dayNumber,
          completed,
          notes: notes[dayNumber] || '',
          completed_at: completed ? new Date().toISOString() : null,
        });

      if (error) throw error;

      setProgress(prev => prev.map(item => 
        item.day_number === dayNumber 
          ? { ...item, completed, completed_at: completed ? new Date().toISOString() : null }
          : item
      ));

      toast({
        title: completed ? "Dia concluído!" : "Dia desmarcado",
        description: `Dia ${dayNumber} ${completed ? 'marcado como concluído' : 'desmarcado'}`,
      });
    } catch (error) {
      console.error('Error updating progress:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o progresso",
        variant: "destructive",
      });
    }
  };

  const saveNotes = async (dayNumber: number) => {
    if (!user) return;

    try {
      const dayProgress = progress.find(p => p.day_number === dayNumber);
      
      const { error } = await supabase
        .from('challenge_progress')
        .upsert({
          user_id: user.id,
          month_year: currentMonthYear,
          day_number: dayNumber,
          completed: dayProgress?.completed || false,
          notes: notes[dayNumber] || '',
          completed_at: dayProgress?.completed_at,
        });

      if (error) throw error;

      toast({
        title: "Anotações salvas!",
        description: `Suas reflexões do dia ${dayNumber} foram salvas`,
      });
    } catch (error) {
      console.error('Error saving notes:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar as anotações",
        variant: "destructive",
      });
    }
  };

  const completedDays = progress.filter(p => p.completed).length;
  const progressPercentage = (completedDays / 7) * 100;

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#A75C3F] mx-auto"></div>
        <p className="mt-2 text-gray-600">Carregando desafio...</p>
      </div>
    );
  }

  if (!currentChallenge) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Nenhum desafio disponível para este mês</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Challenge Header */}
      <Card className="p-6 bg-gradient-to-r from-[#FDF9F5] to-[#F8E8F5] border-none shadow-lg">
        <div className="flex items-center space-x-3 mb-3">
          <Target className="w-6 h-6 text-[#A75C3F]" />
          <h2 className="font-lora text-2xl font-bold text-[#A75C3F]">
            {currentChallenge.title}
          </h2>
        </div>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          {currentChallenge.description}
        </p>
        
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Progresso</span>
            <span className="text-[#A75C3F] font-semibold">
              {completedDays}/7 dias
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-[#A75C3F] to-[#8B4A36] h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </Card>

      {/* Daily Progress */}
      <div className="space-y-4">
        {progress.map((day) => (
          <Card key={day.day_number} className="p-6 bg-white border-none shadow-lg">
            <div className="flex items-start space-x-4">
              <div className="flex flex-col items-center">
                <Checkbox
                  checked={day.completed}
                  onCheckedChange={(checked) => 
                    toggleDay(day.day_number, checked as boolean)
                  }
                  className="data-[state=checked]:bg-[#A75C3F] data-[state=checked]:border-[#A75C3F]"
                />
                <div className="mt-2 text-center">
                  <p className="text-sm font-semibold text-[#A75C3F]">
                    Dia {day.day_number}
                  </p>
                  {day.completed && day.completed_at && (
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(day.completed_at).toLocaleDateString('pt-BR')}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex-1 space-y-3">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <h3 className="font-semibold text-[#3C3C3C]">
                    Reflexões do Dia {day.day_number}
                  </h3>
                  {day.completed && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                </div>
                
                <Textarea
                  placeholder="Como foi seu dia? Que reflexões surgiram?"
                  value={notes[day.day_number] || ''}
                  onChange={(e) => setNotes(prev => ({
                    ...prev,
                    [day.day_number]: e.target.value
                  }))}
                  className="min-h-[80px] border-gray-200 focus:border-[#A75C3F]"
                />
                
                <Button
                  size="sm"
                  onClick={() => saveNotes(day.day_number)}
                  className="bg-[#A75C3F] hover:bg-[#8B4A36] text-white"
                >
                  Salvar Reflexão
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Completion Message */}
      {completedDays === 7 && (
        <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-lg">
          <div className="text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <h3 className="font-lora text-xl font-bold text-green-700 mb-2">
              Parabéns! Desafio Concluído! 🎉
            </h3>
            <p className="text-green-600">
              Você completou todos os 7 dias do desafio. Continue essa jornada incrível!
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ChallengeTracker;
