import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const DiaryScreen: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [diaryEntry, setDiaryEntry] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleGoBack = () => {
    navigate('/premium');
  };

  const saveDiary = async () => {
    if (!diaryEntry.trim()) return;
    
    setIsSaving(true);
    // Simulate saving
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Entrada salva! 📝",
      description: "Seus pensamentos foram registrados com carinho.",
    });
    
    setIsSaving(false);
  };

  const today = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
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
              disabled={!diaryEntry.trim() || isSaving}
              className="bg-[#A75C3F] hover:bg-[#8B4A36] text-white"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Salvar
                </>
              )}
            </Button>
          </div>
        </Card>

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
      </div>
    </div>
  );
};

export default DiaryScreen;
