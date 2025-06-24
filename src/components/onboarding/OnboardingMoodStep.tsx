
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import MoodSelector from "@/components/MoodSelector";

interface OnboardingMoodStepProps {
  selectedMood: string;
  onMoodSelect: (mood: string) => void;
  onNext: () => void;
}

const OnboardingMoodStep = ({ selectedMood, onMoodSelect, onNext }: OnboardingMoodStepProps) => {
  return (
    <Card className="p-6 bg-gradient-to-br from-[#FDF9F5] to-white border-none shadow-xl">
      <MoodSelector
        selectedMood={selectedMood}
        onMoodSelect={onMoodSelect}
      />
      <Button
        onClick={onNext}
        disabled={!selectedMood}
        className="w-full mt-6 bg-[#A75C3F] hover:bg-[#8B4A36] text-white py-3 transition-all duration-200 disabled:opacity-50"
      >
        Continuar
      </Button>
    </Card>
  );
};

export default OnboardingMoodStep;
