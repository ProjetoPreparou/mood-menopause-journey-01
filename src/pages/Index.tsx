
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from 'react';

const Index = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDF9F5] via-white to-[#FDF9F5] flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-md">
        <div className="space-y-4">
          <h1 className="font-lora text-4xl font-bold text-[#A75C3F]">
            Jornada Menopausa 🌸
          </h1>
          <p className="font-nunito text-lg text-gray-600">
            Sua companheira na jornada da menopausa
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => navigate('/onboarding')}
            className="w-full bg-[#A75C3F] hover:bg-[#8B4A36] text-white py-3 text-lg transition-all duration-200 transform hover:scale-105"
          >
            Começar Jornada
          </Button>
          
          <Button
            onClick={() => navigate('/login')}
            variant="outline"
            className="w-full border-[#A75C3F] text-[#A75C3F] hover:bg-[#A75C3F] hover:text-white py-3 text-lg"
          >
            Já tenho conta
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
