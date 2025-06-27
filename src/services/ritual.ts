
export const saveRitualCompletion = (date: string) => {
  try {
    localStorage.setItem(`ritual_${date}`, "done");
    return { success: true };
  } catch (error) {
    console.error('Erro ao salvar ritual:', error);
    return { success: false };
  }
};

export const getRitualCompletion = (date: string) => {
  try {
    return localStorage.getItem(`ritual_${date}`) === "done";
  } catch (error) {
    console.error('Erro ao recuperar ritual:', error);
    return false;
  }
};

export const getTodayDateString = () => {
  return new Date().toISOString().split('T')[0];
};
