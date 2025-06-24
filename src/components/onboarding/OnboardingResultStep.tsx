
import React from 'react';
import QuizResult from "@/components/QuizResult";

interface OnboardingResultStepProps {
  result: 'C' | 'S' | 'E';
  onContinue: () => void;
  loading: boolean;
}

const OnboardingResultStep = ({ result, onContinue, loading }: OnboardingResultStepProps) => {
  return (
    <QuizResult
      result={result}
      onContinue={onContinue}
      loading={loading}
    />
  );
};

export default OnboardingResultStep;
