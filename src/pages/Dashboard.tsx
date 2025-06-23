
import React, { useMemo } from 'react';
import { useUser } from "@/contexts/UserContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import DailyMoodSelector from "@/components/DailyMoodSelector";
import ProgressBar from "@/components/ProgressBar";
import NavigationBlocks from "@/components/NavigationBlocks";
import LogoutButton from "@/components/LogoutButton";

const Dashboard = () => {
  const { userData } = useUser();
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  // Memoize greeting to avoid recalculation
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  }, []);

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDF9F5] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A75C3F] mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated (will redirect)
  if (!user) {
    return null;
  }

  // Simulate current day (in a real app, this would come from user progress data)
  const currentDay = 7;
  const totalDays = 21;

  return (
    <div className="min-h-screen bg-[#FDF9F5] font-nunito">
      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Header with greeting and logout */}
        <div className="flex justify-between items-start pt-8">
          <div className="text-center space-y-2 flex-1">
            <h1 className="font-lora text-2xl font-bold text-[#A75C3F]">
              {greeting}, {userData.name || 'amiga'}! 👋
            </h1>
            <p className="font-nunito text-gray-600 text-base">
              Como você está se sentindo hoje?
            </p>
          </div>
          <LogoutButton />
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
