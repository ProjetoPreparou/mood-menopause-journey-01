
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface FormData {
  name: string;
  contact: string;
  contactType: 'email' | 'phone';
  password: string;
}

interface OnboardingInfoStepProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  errors: Record<string, string>;
  loading: boolean;
  onSubmit: () => void;
}

const OnboardingInfoStep = ({ 
  formData, 
  setFormData, 
  errors, 
  loading, 
  onSubmit 
}: OnboardingInfoStepProps) => {
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
            onClick={onSubmit}
            disabled={loading}
            className="w-full bg-[#A75C3F] hover:bg-[#8B4A36] text-white py-3 transition-all duration-200 transform hover:scale-105"
          >
            {loading ? 'Salvando...' : 'Continuar'}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default OnboardingInfoStep;
