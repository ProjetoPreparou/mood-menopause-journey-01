
export interface DiaryEntry {
  date: string;
  text: string;
  createdAt: string;
}

export const saveDiaryEntry = (date: string, text: string) => {
  try {
    const entry: DiaryEntry = {
      date,
      text,
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem(`diary_${date}`, JSON.stringify(entry));
    
    // Atualizar lista de entradas
    const existingEntries = getAllDiaryEntries();
    const updatedEntries = existingEntries.filter(e => e.date !== date);
    updatedEntries.unshift(entry);
    
    localStorage.setItem('diary_entries', JSON.stringify(updatedEntries.slice(0, 30))); // Manter últimas 30 entradas
    
    return { success: true };
  } catch (error) {
    console.error('Erro ao salvar entrada do diário:', error);
    return { success: false };
  }
};

export const getDiaryEntry = (date: string): DiaryEntry | null => {
  try {
    const saved = localStorage.getItem(`diary_${date}`);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Erro ao recuperar entrada do diário:', error);
    return null;
  }
};

export const getAllDiaryEntries = (): DiaryEntry[] => {
  try {
    const saved = localStorage.getItem('diary_entries');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Erro ao recuperar histórico do diário:', error);
    return [];
  }
};

export const getTodayDateString = () => {
  return new Date().toISOString().split('T')[0];
};

export const formatDisplayDate = (dateString: string) => {
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};
