
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface Program21Progress {
  currentDay: number;
  completedDays: number[];
  isCompleted: boolean;
}

export const useProgram21 = () => {
  const [progress, setProgress] = useState<Program21Progress>({
    currentDay: 1,
    completedDays: [],
    isCompleted: false,
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchProgress = async () => {
    if (!user) return;

    try {
      // Aqui você buscaria o progresso real do usuário do banco de dados
      // Por enquanto, vou simular com dados locais
      const savedProgress = localStorage.getItem(`program21_progress_${user.id}`);
      if (savedProgress) {
        setProgress(JSON.parse(savedProgress));
      }
    } catch (error) {
      console.error('Erro ao buscar progresso:', error);
    } finally {
      setLoading(false);
    }
  };

  const incrementProgress = async (day: number) => {
    if (!user) return;

    const newCompletedDays = [...progress.completedDays];
    if (!newCompletedDays.includes(day)) {
      newCompletedDays.push(day);
    }

    const newProgress = {
      currentDay: Math.min(Math.max(...newCompletedDays, 0) + 1, 21),
      completedDays: newCompletedDays.sort((a, b) => a - b),
      isCompleted: newCompletedDays.length >= 21,
    };

    setProgress(newProgress);
    
    // Salvar no localStorage (em produção, salvaria no Supabase)
    localStorage.setItem(`program21_progress_${user.id}`, JSON.stringify(newProgress));

    // Aqui você salvaria no banco de dados real
    // await supabase.from('program21_progress').upsert({ user_id: user.id, ...newProgress });
  };

  const resetProgress = async () => {
    if (!user) return;

    const resetData = {
      currentDay: 1,
      completedDays: [],
      isCompleted: false,
    };

    setProgress(resetData);
    localStorage.removeItem(`program21_progress_${user.id}`);
  };

  useEffect(() => {
    fetchProgress();
  }, [user]);

  return {
    progress,
    loading,
    incrementProgress,
    resetProgress,
    refetch: fetchProgress,
  };
};
