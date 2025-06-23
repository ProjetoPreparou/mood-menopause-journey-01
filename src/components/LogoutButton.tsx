
import React from 'react';
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const LogoutButton = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logout realizado",
        description: "Até breve!",
      });
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
      toast({
        title: "Erro",
        description: "Erro ao fazer logout. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      className="text-[#A75C3F] border-[#A75C3F] hover:bg-[#A75C3F] hover:text-white"
    >
      Sair
    </Button>
  );
};

export default LogoutButton;
