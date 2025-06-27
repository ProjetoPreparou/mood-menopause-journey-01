
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Heart } from 'lucide-react';
import { DiaryEntry, formatDisplayDate } from '@/services/diary';

interface EntryCardProps {
  entry: DiaryEntry;
}

const EntryCard: React.FC<EntryCardProps> = ({ entry }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const excerpt = entry.text.length > 100 
    ? entry.text.substring(0, 100) + '...' 
    : entry.text;

  return (
    <Card className="p-4 bg-gradient-to-r from-pink-50 to-rose-50 border-pink-200 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-3">
        <Heart className="w-4 h-4 text-[#A75C3F] mt-1 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-lora font-semibold text-[#3C3C3C] text-sm">
              {formatDisplayDate(entry.date)}
            </h3>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-[#A75C3F] hover:text-[#8B4A36] text-xs h-auto p-1"
                >
                  Ver Completo
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="font-lora text-[#3C3C3C] flex items-center">
                    <Heart className="w-5 h-5 text-[#A75C3F] mr-2" />
                    Reflexão de {formatDisplayDate(entry.date)}
                  </DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                  <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg p-4 border border-pink-200">
                    <p className="font-nunito text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {entry.text}
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <p className="font-nunito text-gray-600 text-sm leading-relaxed">
            {excerpt}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default EntryCard;
