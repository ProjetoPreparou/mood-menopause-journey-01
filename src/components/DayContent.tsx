
import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Play, Pause, CheckCircle, Circle, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DayContentProps {
  day: number;
  onComplete: () => void;
}

const DayContent: React.FC<DayContentProps> = ({ day, onComplete }) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isRitualComplete, setIsRitualComplete] = useState(false);
  const [reflectionText, setReflectionText] = useState('');
  const [isAudioCompleted, setIsAudioCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  // Perguntas simbólicas para cada dia (exemplo)
  const dailyQuestions = [
    "O que em mim hoje precisa ser acolhido?",
    "Qual parte de minha essência desejo nutrir?",
    "O que meu coração está tentando me dizer?",
    "Que semente emocional posso plantar hoje?",
    "Como posso honrar minha jornada até aqui?",
    "Qual aspecto de mim merece mais amor?",
    "O que preciso liberar para florescer?",
  ];

  const currentQuestion = dailyQuestions[(day - 1) % dailyQuestions.length];

  const handleAudioToggle = async () => {
    try {
      if (!audioRef.current) {
        // Criar elemento de áudio dinamicamente
        audioRef.current = new Audio(`/content/audio/audio-dia-${day}.mp3`);
        audioRef.current.addEventListener('ended', () => {
          setIsAudioPlaying(false);
          setIsAudioCompleted(true);
          toast({
            title: "Áudio concluído 🌸",
            description: "Permita-se absorver essa experiência...",
          });
        });
        audioRef.current.addEventListener('error', () => {
          toast({
            title: "Erro no áudio",
            description: "Não foi possível reproduzir o áudio. Tente novamente.",
            variant: "destructive",
          });
          setIsAudioPlaying(false);
        });
      }

      if (isAudioPlaying) {
        audioRef.current.pause();
        setIsAudioPlaying(false);
      } else {
        await audioRef.current.play();
        setIsAudioPlaying(true);
      }
    } catch (error) {
      console.error('Erro ao reproduzir áudio:', error);
      toast({
        title: "Erro no áudio",
        description: "Não foi possível reproduzir o áudio. Verifique sua conexão.",
        variant: "destructive",
      });
    }
  };

  const handleRitualToggle = () => {
    setIsRitualComplete(!isRitualComplete);
    if (!isRitualComplete) {
      toast({
        title: "Ritual marcado como feito! 🕯️",
        description: "Parabéns por honrar esse momento sagrado.",
      });
    }
  };

  const canComplete = isAudioCompleted && isRitualComplete && reflectionText.trim().length > 0;

  const handleCompleteDay = async () => {
    if (!canComplete) return;

    setIsLoading(true);
    try {
      // Simular salvamento do progresso
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Dia concluído! 🌸",
        description: `Dia ${day} do seu florescimento foi registrado com amor.`,
      });
      
      onComplete();
    } catch (error) {
      console.error('Erro ao salvar progresso:', error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar seu progresso. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto p-4">
      {/* Header do Dia */}
      <Card className="bg-gradient-to-r from-pink-50 to-rose-50 border-pink-200 p-6">
        <div className="text-center">
          <h2 className="font-lora text-2xl font-bold text-[#3C3C3C] mb-2">
            Dia {day} 🌸
          </h2>
          <p className="font-nunito text-gray-600">
            Sua jornada de florescimento continua...
          </p>
        </div>
      </Card>

      {/* Reprodução de Áudio */}
      <Card className="p-6 border-purple-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-lora text-lg font-semibold text-[#3C3C3C] mb-1">
              Áudio do Dia 🎧
            </h3>
            <p className="font-nunito text-sm text-gray-600">
              Ouça sua meditação guiada diária
            </p>
          </div>
          {isAudioCompleted && (
            <CheckCircle className="w-6 h-6 text-green-500" />
          )}
        </div>
        
        <Button
          onClick={handleAudioToggle}
          className="w-full bg-[#A75C3F] hover:bg-[#8B4A36] text-white"
          size="lg"
        >
          {isAudioPlaying ? (
            <>
              <Pause className="w-5 h-5 mr-2" />
              Pausar Áudio
            </>
          ) : (
            <>
              <Play className="w-5 h-5 mr-2" />
              Reproduzir Áudio
            </>
          )}
        </Button>
      </Card>

      {/* Ritual Diário */}
      <Card className="p-6 border-amber-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-lora text-lg font-semibold text-[#3C3C3C] mb-1">
              Ritual do Dia 🕯️
            </h3>
            <p className="font-nunito text-sm text-gray-600">
              Marque quando completar seu ritual sagrado
            </p>
          </div>
        </div>
        
        <Button
          onClick={handleRitualToggle}
          variant={isRitualComplete ? "default" : "outline"}
          className={`w-full ${
            isRitualComplete 
              ? "bg-green-500 hover:bg-green-600 text-white" 
              : "border-amber-300 hover:bg-amber-50"
          }`}
          size="lg"
        >
          {isRitualComplete ? (
            <>
              <CheckCircle className="w-5 h-5 mr-2" />
              Ritual Concluído
            </>
          ) : (
            <>
              <Circle className="w-5 h-5 mr-2" />
              Marcar Ritual como Feito
            </>
          )}
        </Button>
      </Card>

      {/* Pergunta Reflexiva */}
      <Card className="p-6 border-blue-200">
        <div className="mb-4">
          <Label className="font-lora text-lg font-semibold text-[#3C3C3C] mb-3 block">
            Reflexão do Dia 💭
          </Label>
          <p className="font-nunito text-gray-700 mb-4 italic">
            "{currentQuestion}"
          </p>
        </div>
        
        <Textarea
          value={reflectionText}
          onChange={(e) => setReflectionText(e.target.value)}
          placeholder="Escreva aqui sua reflexão do coração..."
          className="min-h-[120px] border-blue-200 focus:border-blue-400 font-nunito"
          required
        />
        
        {reflectionText.trim().length > 0 && (
          <div className="mt-2 text-sm text-green-600 font-nunito">
            ✓ Reflexão registrada com amor
          </div>
        )}
      </Card>

      {/* Botão Finalizar Dia */}
      <Card className="p-6 bg-gradient-to-r from-rose-50 to-pink-50 border-rose-200">
        <Button
          onClick={handleCompleteDay}
          disabled={!canComplete || isLoading}
          className={`w-full ${
            canComplete
              ? "bg-[#A75C3F] hover:bg-[#8B4A36] text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          size="lg"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Salvando...
            </>
          ) : (
            <>
              <Heart className="w-5 h-5 mr-2" />
              Finalizar Dia
            </>
          )}
        </Button>
        
        {!canComplete && (
          <div className="mt-3 text-sm text-gray-600 font-nunito text-center">
            Complete todos os passos: áudio, ritual e reflexão
          </div>
        )}
      </Card>
    </div>
  );
};

export default DayContent;
