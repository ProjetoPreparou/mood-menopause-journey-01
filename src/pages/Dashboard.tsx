
import React, { useMemo } from 'react';
import { useUser } from "@/contexts/UserContext";
import DailyMoodSelector from "@/components/DailyMoodSelector";
import ProgressBar from "@/components/ProgressBar";
import NavigationBlocks from "@/components/NavigationBlocks";

const Dashboard = () => {
  const { userData } = useUser();

  // Memoize greeting to avoid recalculation
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  }, []);

  // Simulate current day (in a real app, this would come from user progress data)
  const currentDay = 7;
  const totalDays = 21;

  return (
    <div className="min-h-screen bg-[#FDF9F5] font-nunito">
      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Header with greeting */}
        <div className="text-center space-y-2 pt-8">
          <h1 className="font-lora text-2xl font-bold text-[#A75C3F]">
            {greeting}, {userData.name || 'amiga'}! 👋
          </h1>
          <p className="font-nunito text-gray-600 text-base">
            Como você está se sentindo hoje?
          </p>
        </div>

        {/* Daily Mood Selector */}
        <DailyMoodSelector />

        {/* Progress Bar */}
        <ProgressBar currentDay={currentDay} totalDays={totalDays} />

        {/* Navigation Blocks */}
        <div className="space-y-4">
          <h2 className="font-lora text-xl font-semibold text-[#3C3C3C] text-center">
            Sua Jornada Hoje
          </h2>
          <NavigationBlocks />
        </div>

        {/* Bottom spacing */}
        <div className="pb-8"></div>
      </div>
    </div>
  );
};

export default Dashboard;
