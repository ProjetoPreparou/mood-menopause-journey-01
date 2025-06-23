
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useUser } from "@/contexts/UserContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from 'react-router-dom';
import MoodSelector from "@/components/MoodSelector";
import MenopauseQuiz from "@/components/MenopauseQuiz";
import QuizResult from "@/components/QuizResult";
import { useToast } from "@/hooks/use-toast";

type OnboardingStep = 'info' | 'mood' | 'quiz' | 'result';

const Onboarding = () => {
  const [step, setStep] = useState<OnboardingStep>('info');
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    contactType: 'email' as 'email' | 'phone',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { userData, updateUserData } = useUser();
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^[\d\s()+-]+$/.test(phone) && phone.replace(/\D/g, '').length >= 10;
  };

  const handleInfoSubmit = async () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.contact.trim()) {
      newErrors.contact = 'E-mail é obrigatório';
    } else if (formData.contactType === 'email' && !validateEmail(formData.contact)) {
      newErrors.contact = 'E-mail inválido';
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        updateUserData({
          name: formData.name,
          contact: formData.contact,
          contactType: formData.contactType
        });
        setStep('mood');
      } catch (error) {
        console.error('Error saving user data:', error);
        toast({
          title: "Erro",
          description: "Erro ao salvar dados. Tente novamente.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleMoodSelect = (mood: string) => {
    updateUserData({ mood });
  };

  const handleMoodNext = () => {
    if (userData.mood) {
      setStep('quiz');
    }
  };

  const handleQuizComplete = (result: 'C' | 'S' | 'E') => {
    updateUserData({ menopauseType: result });
    setStep('result');
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      const { error } = await signUp(formData.contact, formData.password, {
        name: userData.name,
        mood: userData.mood,
        menopauseType: userData.menopauseType
      });

      if (error) {
        console.error('Signup error:', error);
        toast({
          title: "Erro no cadastro",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Cadastro realizado!",
          description: "Bem-vinda! Você será redirecionada em instantes.",
        });
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      }
    } catch (error) {
      console.error('Error during signup:', error);
      toast({
        title: "Erro",
        description: "Erro inesperado. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 'info':
        return (
          <Card className="p-6 bg-gradient-to-br from-[#FDF9F5] to-white border-none shadow-xl">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-[#A75C3F] mb-2">
                  Bem-vinda! 🌸
                </h2>
                <p className="text-gray-600 text-sm">
                  Vamos começar conhecendo você melhor
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Input
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className={`border-2 transition-colors ${
                      errors.name ? 'border-red-300' : 'border-gray-200 focus:border-[#A75C3F]'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <Input
                    placeholder="seu@email.com"
                    type="email"
                    value={formData.contact}
                    onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
                    className={`border-2 transition-colors ${
                      errors.contact ? 'border-red-300' : 'border-gray-200 focus:border-[#A75C3F]'
                    }`}
                  />
                  {errors.contact && (
                    <p className="text-red-500 text-xs mt-1">{errors.contact}</p>
                  )}
                </div>

                <div>
                  <Input
                    placeholder="Senha (mínimo 6 caracteres)"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className={`border-2 transition-colors ${
                      errors.password ? 'border-red-300' : 'border-gray-200 focus:border-[#A75C3F]'
                    }`}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                  )}
                </div>

                <Button
                  onClick={handleInfoSubmit}
                  disabled={loading}
                  className="w-full bg-[#A75C3F] hover:bg-[#8B4A36] text-white py-3 transition-all duration-200 transform hover:scale-105"
                >
                  {loading ? 'Salvando...' : 'Continuar'}
                </Button>
              </div>
            </div>
          </Card>
        );

      case 'mood':
        return (
          <Card className="p-6 bg-gradient-to-br from-[#FDF9F5] to-white border-none shadow-xl">
            <MoodSelector
              selectedMood={userData.mood}
              onMoodSelect={handleMoodSelect}
            />
            <Button
              onClick={handleMoodNext}
              disabled={!userData.mood}
              className="w-full mt-6 bg-[#A75C3F] hover:bg-[#8B4A36] text-white py-3 transition-all duration-200 disabled:opacity-50"
            >
              Continuar
            </Button>
          </Card>
        );

      case 'quiz':
        return <MenopauseQuiz onComplete={handleQuizComplete} />;

      case 'result':
        return (
          <QuizResult
            result={userData.menopauseType!}
            onContinue={handleComplete}
            loading={loading}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDF9F5] via-white to-[#FDF9F5] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {renderStep()}
      </div>
    </div>
  );
};

export default Onboarding;
