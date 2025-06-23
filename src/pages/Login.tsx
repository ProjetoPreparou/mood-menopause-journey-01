
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        const { error } = await signIn(formData.email, formData.password);

        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast({
              title: "Erro no login",
              description: "E-mail ou senha incorretos.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Erro no login",
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "Login realizado!",
            description: "Bem-vinda de volta!",
          });
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Error during signin:', error);
        toast({
          title: "Erro",
          description: "Erro inesperado. Tente novamente.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDF9F5] via-white to-[#FDF9F5] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="p-6 bg-gradient-to-br from-[#FDF9F5] to-white border-none shadow-xl">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-[#A75C3F] mb-2">
                Bem-vinda de volta! 🌸
              </h2>
              <p className="text-gray-600 text-sm">
                Entre na sua conta para continuar sua jornada
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  placeholder="seu@email.com"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className={`border-2 transition-colors ${
                    errors.email ? 'border-red-300' : 'border-gray-200 focus:border-[#A75C3F]'
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <Input
                  placeholder="Sua senha"
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
                type="submit"
                disabled={loading}
                className="w-full bg-[#A75C3F] hover:bg-[#8B4A36] text-white py-3 transition-all duration-200 transform hover:scale-105"
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-gray-600 text-sm">
                Primeira vez aqui?{' '}
                <Link 
                  to="/onboarding" 
                  className="text-[#A75C3F] hover:text-[#8B4A36] font-semibold"
                >
                  Crie sua conta
                </Link>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
