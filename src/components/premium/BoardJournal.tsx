
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Book, Calendar, Heart, Sparkles, Save } from 'lucide-react';

interface JournalEntry {
  id: string;
  month_year: string;
  cycle_notes: string;
  emotional_state: string;
  reflections: string;
  updated_at: string;
}

const BoardJournal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState<JournalEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const currentMonthYear = new Date().toISOString().slice(0, 7);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('board_journal')
        .select('*')
        .eq('user_id', user.id)
        .order('month_year', { ascending: false });

      if (error) throw error;

      setEntries(data || []);
      
      // Procurar entrada do mês atual ou criar uma nova
      const currentMonthEntry = data?.find(entry => entry.month_year === currentMonthYear);
      
      if (currentMonthEntry) {
        setCurrentEntry(currentMonthEntry);
      } else {
        // Criar entrada para o mês atual
        const newEntry: Partial<JournalEntry> = {
          month_year: currentMonthYear,
          cycle_notes: '',
          emotional_state: '',
          reflections: '',
        };
        setCurrentEntry(newEntry as JournalEntry);
      }
    } catch (error) {
      console.error('Error fetching journal entries:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar o diário",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveEntry = async () => {
    if (!user || !currentEntry) return;

    setSaving(true);
    try {
      const { data, error } = await supabase
        .from('board_journal')
        .upsert({
          user_id: user.id,
          month_year: currentEntry.month_year,
          cycle_notes: currentEntry.cycle_notes,
          emotional_state: currentEntry.emotional_state,
          reflections: currentEntry.reflections,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;

      // Atualizar estado local
      setCurrentEntry(data);
      setEntries(prev => {
        const index = prev.findIndex(e => e.month_year === data.month_year);
        if (index >= 0) {
          return prev.map((e, i) => i === index ? data : e);
        } else {
          return [data, ...prev];
        }
      });

      toast({
        title: "Diário salvo!",
        description: "Suas reflexões foram salvas com sucesso",
      });
    } catch (error) {
      console.error('Error saving journal entry:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar o diário",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
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

  const selectEntry = (entry: JournalEntry) => {
    setCurrentEntry(entry);
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#A75C3F] mx-auto"></div>
        <p className="mt-2 text-gray-600">Carregando diário...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-gradient-to-r from-[#FDF9F5] to-[#F8E8F5] border-none shadow-lg">
        <div className="flex items-center space-x-3 mb-3">
          <Book className="w-6 h-6 text-[#A75C3F]" />
          <h2 className="font-lora text-2xl font-bold text-[#A75C3F]">
            Diário de Bordo 🌸
          </h2>
        </div>
        <p className="text-gray-700 leading-relaxed">
          Um espaço íntimo para registrar sua jornada, ciclo e descobertas emocionais
        </p>
      </Card>

      {/* Month Selection */}
      <div className="flex flex-wrap gap-2">
        <Badge 
          variant={currentEntry?.month_year === currentMonthYear ? "default" : "outline"}
          className={`
            cursor-pointer px-3 py-2 text-sm
            ${currentEntry?.month_year === currentMonthYear 
              ? 'bg-[#A75C3F] text-white' 
              : 'border-[#A75C3F] text-[#A75C3F]'
            }
          `}
          onClick={() => {
            const monthEntry = entries.find(e => e.month_year === currentMonthYear) || {
              month_year: currentMonthYear,
              cycle_notes: '',
              emotional_state: '',
              reflections: '',
            } as JournalEntry;
            selectEntry(monthEntry);
          }}
        >
          {formatMonthYear(currentMonthYear)} (Atual)
        </Badge>
        
        {entries
          .filter(entry => entry.month_year !== currentMonthYear)
          .map((entry) => (
            <Badge
              key={entry.id}
              variant={currentEntry?.id === entry.id ? "default" : "outline"}
              className={`
                cursor-pointer px-3 py-2 text-sm
                ${currentEntry?.id === entry.id 
                  ? 'bg-[#A75C3F] text-white' 
                  : 'border-[#A75C3F] text-[#A75C3F]'
                }
              `}
              onClick={() => selectEntry(entry)}
            >
              {formatMonthYear(entry.month_year)}
            </Badge>
          ))}
      </div>

      {currentEntry && (
        <div className="space-y-6">
          {/* Current Month Badge */}
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-[#A75C3F]" />
            <h3 className="font-lora text-xl font-semibold text-[#3C3C3C]">
              {formatMonthYear(currentEntry.month_year)}
            </h3>
            {currentEntry.month_year === currentMonthYear && (
              <Sparkles className="w-5 h-5 text-[#A75C3F]" />
            )}
          </div>

          {/* Cycle Notes */}
          <Card className="p-6 bg-white border-none shadow-lg">
            <h4 className="font-semibold text-[#3C3C3C] mb-3 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-[#A75C3F]" />
              Ciclo Atual
            </h4>
            <Textarea
              placeholder="Como está seu ciclo? Sintomas, mudanças, observações..."
              value={currentEntry.cycle_notes}
              onChange={(e) => setCurrentEntry(prev => prev ? {
                ...prev,
                cycle_notes: e.target.value
              } : prev)}
              className="min-h-[100px] border-gray-200 focus:border-[#A75C3F]"
            />
          </Card>

          {/* Emotional State */}
          <Card className="p-6 bg-gradient-to-br from-[#F8E8F5] to-[#FDF9F5] border-none shadow-lg">
            <h4 className="font-semibold text-[#3C3C3C] mb-3 flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-[#A75C3F]" />
              Estado Emocional
            </h4>
            <Textarea
              placeholder="Como você tem se sentido? Que emoções estão presentes?"
              value={currentEntry.emotional_state}
              onChange={(e) => setCurrentEntry(prev => prev ? {
                ...prev,
                emotional_state: e.target.value
              } : prev)}
              className="min-h-[100px] border-gray-200 focus:border-[#A75C3F] bg-white"
            />
          </Card>

          {/* Reflections */}
          <Card className="p-6 bg-white border-none shadow-lg">
            <h4 className="font-semibold text-[#3C3C3C] mb-3 flex items-center">
              <Book className="w-5 h-5 mr-2 text-[#A75C3F]" />
              Reflexões & Descobertas
            </h4>
            <Textarea
              placeholder="Que insights surgiram? O que você descobriu sobre si mesma?"
              value={currentEntry.reflections}
              onChange={(e) => setCurrentEntry(prev => prev ? {
                ...prev,
                reflections: e.target.value
              } : prev)}
              className="min-h-[120px] border-gray-200 focus:border-[#A75C3F]"
            />
          </Card>

          {/* Save Button */}
          <Card className="p-4 bg-gradient-to-r from-[#A75C3F] to-[#8B4A36] border-none shadow-lg">
            <Button
              onClick={saveEntry}
              disabled={saving}
              className="w-full bg-white text-[#A75C3F] hover:bg-gray-100 font-semibold"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#A75C3F] mr-2"></div>
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Diário
                </>
              )}
            </Button>
          </Card>

          {/* Last Updated */}
          {currentEntry.updated_at && (
            <p className="text-sm text-gray-500 text-center">
              Última atualização: {new Date(currentEntry.updated_at).toLocaleString('pt-BR')}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default BoardJournal;
