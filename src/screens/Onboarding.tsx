
import React, { useState } from 'react';
import { useUser } from "@/contexts/UserContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { validateOnboardingInfo } from "@/utils/onboardingValidation";
import OnboardingInfoStep from "@/components/onboarding/OnboardingInfoStep";
import OnboardingMoodStep from "@/components/onboarding/OnboardingMoodStep";
import OnboardingQuizStep from "@/components/onboarding/OnboardingQuizStep";
import OnboardingResultStep from "@/components/onboarding/OnboardingResultStep";

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

  const handleInfoSubmit = async () => {
    const newErrors = validateOnboardingInfo(formData);
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
          <OnboardingInfoStep
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            loading={loading}
            onSubmit={handleInfoSubmit}
          />
        );

      case 'mood':
        return (
          <OnboardingMoodStep
            selectedMood={userData.mood}
            onMoodSelect={handleMoodSelect}
            onNext={handleMoodNext}
          />
        );

      case 'quiz':
        return <OnboardingQuizStep onComplete={handleQuizComplete} />;

      case 'result':
        return (
          <OnboardingResultStep
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
