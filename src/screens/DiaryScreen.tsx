
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Heart, Flower } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { saveDiaryEntry, getDiaryEntry, getAllDiaryEntries, getTodayDateString, DiaryEntry } from '@/services/diary';
import EntryCard from '@/components/Diary/EntryCard';

const DiaryScreen: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [diaryEntry, setDiaryEntry] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [hasExistingEntry, setHasExistingEntry] = useState(false);
  const [historyEntries, setHistoryEntries] = useState<DiaryEntry[]>([]);
  const [showSavedMessage, setShowSavedMessage] = useState(false);
  const historyRef = useRef<HTMLDivElement>(null);
  
  const todayDate = getTodayDateString();

  useEffect(() => {
    // Carregar entrada do dia atual se existir
    const existingEntry = getDiaryEntry(todayDate);
    if (existingEntry) {
      setDiaryEntry(existingEntry.text);
      setHasExistingEntry(true);
    }
    
    // Carregar histórico (excluir entrada de hoje)
    const allEntries = getAllDiaryEntries();
    const historyOnly = allEntries.filter(entry => entry.date !== todayDate).slice(0, 7);
    setHistoryEntries(historyOnly);
  }, [todayDate]);

  const handleGoBack = () => {
    navigate('/dashboard');
  };

  const saveDiary = async () => {
    if (!diaryEntry.trim()) return;
    
    const saving = hasExistingEntry;
    saving ? setIsUpdating(true) : setIsSaving(true);
    
    try {
      // Simular delay de salvamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const result = saveDiaryEntry(todayDate, diaryEntry.trim());
      
      if (result.success) {
        setHasExistingEntry(true);
        setShowSavedMessage(true);
        
        // Atualizar histórico
        const allEntries = getAllDiaryEntries();
        const historyOnly = allEntries.filter(entry => entry.date !== todayDate).slice(0, 7);
        setHistoryEntries(historyOnly);
        
        toast({
          title: "Reflexão salva! 📝",
          description: "Seus pensamentos foram registrados com carinho.",
        });
        
        // Scroll automático para histórico após 1 segundo
        setTimeout(() => {
          if (historyRef.current) {
            historyRef.current.scrollIntoView({ behavior: 'smooth' });
          }
        }, 1000);
        
        // Esconder mensagem após 3 segundos
        setTimeout(() => {
          setShowSavedMessage(false);
        }, 3000);
      } else {
        toast({
          title: "Erro ao salvar",
          description: "Tente novamente em alguns instantes.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
      setIsUpdating(false);
    }
  };

  const today = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-green-100">
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
                Diário 📝
              </h1>
              <p className="font-nunito text-sm text-gray-600">
                Registre seus pensamentos
              </p>
            </div>
            
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      <div className="py-8 max-w-2xl mx-auto p-4 space-y-6">
        {/* Editor Principal */}
        <Card className="p-6 border-green-200">
          <div className="text-center mb-6">
            <h2 className="font-lora text-2xl font-bold text-[#3C3C3C] mb-2">
              {today}
            </h2>
            <p className="font-nunito text-gray-600 italic">
              "Escreva do coração, para o coração..."
            </p>
          </div>

          <Textarea
            value={diaryEntry}
            onChange={(e) => setDiaryEntry(e.target.value)}
            placeholder="Querido diário, hoje eu sinto..."
            className="min-h-[300px] border-green-200 focus:border-green-400 font-nunito text-base leading-relaxed"
          />

          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-500">
              {diaryEntry.length} caracteres
            </span>
            
            <Button
              onClick={saveDiary}
              disabled={!diaryEntry.trim() || isSaving || isUpdating}
              className="bg-[#A75C3F] hover:bg-[#8B4A36] text-white"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Salvando...
                </>
              ) : isUpdating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Atualizando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {hasExistingEntry ? 'Atualizar' : 'Salvar'}
                </>
              )}
            </Button>
          </div>

          {/* Feedback Visual */}
          {showSavedMessage && (
            <div className="mt-4 text-center">
              <span className="inline-flex items-center text-green-600 text-sm bg-green-50 px-3 py-1 rounded-full border border-green-200">
                <Heart className="w-4 h-4 mr-1" />
                ✅ Reflexão salva com amor
              </span>
            </div>
          )}
        </Card>

        {/* Dica de hoje */}
        <Card className="p-4 bg-gradient-to-r from-pink-50 to-rose-50 border-pink-200">
          <div className="flex items-center space-x-3">
            <Heart className="w-6 h-6 text-[#A75C3F]" />
            <div>
              <h3 className="font-lora font-semibold text-[#3C3C3C] text-sm">
                Dica de hoje
              </h3>
              <p className="font-nunito text-gray-600 text-sm">
                Não julgue seus sentimentos, apenas os observe com amor.
              </p>
            </div>
          </div>
        </Card>

        {/* Histórico de Reflexões */}
        {historyEntries.length > 0 && (
          <div ref={historyRef} className="space-y-4">
            <div className="text-center">
              <h3 className="font-lora text-xl font-bold text-[#3C3C3C] mb-2 flex items-center justify-center">
                <Flower className="w-5 h-5 text-[#A75C3F] mr-2" />
                📖 Histórico de Reflexões
              </h3>
              <p className="font-nunito text-gray-600 text-sm">
                Suas últimas jornadas de autoconhecimento
              </p>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {historyEntries.map((entry, index) => (
                <EntryCard key={`${entry.date}-${index}`} entry={entry} />
              ))}
            </div>
          </div>
        )}

        {/* Mensagem quando não há histórico */}
        {historyEntries.length === 0 && (
          <Card className="p-6 text-center bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <Flower className="w-8 h-8 text-[#A75C3F] mx-auto mb-3" />
            <h3 className="font-lora font-semibold text-[#3C3C3C] mb-2">
              Suas reflexões aparecerão aqui
            </h3>
            <p className="font-nunito text-gray-600 text-sm">
              Continue escrevendo para criar seu histórico pessoal de crescimento
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DiaryScreen;
