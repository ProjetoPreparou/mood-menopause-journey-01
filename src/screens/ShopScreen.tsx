import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const ShopScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/premium');
  };

  const products = [
    {
      id: 1,
      name: "Kit Ritual Sagrado",
      description: "Vela aromática, óleo essencial e cristais para sua prática diária",
      price: "R$ 89,90",
      image: "🕯️",
      isNew: true
    },
    {
      id: 2,
      name: "Diário da Menopausa",
      description: "Caderno especial com páginas guiadas para reflexões",
      price: "R$ 45,00",
      image: "📖",
      isNew: false
    },
    {
      id: 3,
      name: "Chá Equilibrio Feminino",
      description: "Blend especial de ervas para apoiar sua jornada",
      price: "R$ 32,50",
      image: "🍵",
      isNew: true
    },
    {
      id: 4,
      name: "Almofada de Meditação",
      description: "Conforto premium para suas práticas contemplativas",
      price: "R$ 78,00",
      image: "🪑",
      isNew: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50">
      <div className="bg-white shadow-sm border-b border-amber-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              onClick={handleGoBack}
              variant="ghost"
              className="text-gray-600 hover:text-[#A75C3F]"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            
            <div className="text-center">
              <h1 className="font-lora text-xl font-bold text-[#3C3C3C]">
                Loja 🛍️
              </h1>
              <p className="font-nunito text-sm text-gray-600">
                Produtos especiais para sua jornada
              </p>
            </div>
            
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      <div className="py-8 max-w-2xl mx-auto p-4 space-y-6">
        <Card className="p-6 bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200">
          <div className="text-center">
            <ShoppingBag className="w-12 h-12 text-[#A75C3F] mx-auto mb-4" />
            <h2 className="font-lora text-xl font-bold text-[#3C3C3C] mb-2">
              Produtos Curados com Amor
            </h2>
            <p className="font-nunito text-gray-600">
              Cada item foi escolhido especialmente para apoiar sua transformação
            </p>
          </div>
        </Card>

        <div className="grid gap-4">
          {products.map((product) => (
            <Card key={product.id} className="p-4 border-amber-200 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="text-4xl">{product.image}</div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-lora font-semibold text-[#3C3C3C]">
                      {product.name}
                    </h3>
                    {product.isNew && (
                      <Star className="w-4 h-4 text-amber-500 fill-current" />
                    )}
                  </div>
                  
                  <p className="font-nunito text-sm text-gray-600 mb-3">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-lora font-bold text-lg text-[#A75C3F]">
                      {product.price}
                    </span>
                    
                    <Button 
                      size="sm" 
                      className="bg-[#A75C3F] hover:bg-[#8B4A36] text-white"
                    >
                      Comprar
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <div className="text-center">
            <p className="font-nunito text-sm text-gray-600">
              ✨ Frete grátis para compras acima de R$ 80,00
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ShopScreen;
