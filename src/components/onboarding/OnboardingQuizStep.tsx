
import React from 'react';
import MenopauseQuiz from "@/components/MenopauseQuiz";

interface OnboardingQuizStepProps {
  onComplete: (result: 'C' | 'S' | 'E') => void;
}

const OnboardingQuizStep = ({ onComplete }: OnboardingQuizStepProps) => {
  return <MenopauseQuiz onComplete={onComplete} />;
};

export default OnboardingQuizStep;
