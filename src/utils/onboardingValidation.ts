
export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePhone = (phone: string): boolean => {
  return /^[\d\s()+-]+$/.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

export const validateOnboardingInfo = (formData: {
  name: string;
  contact: string;
  contactType: 'email' | 'phone';
  password: string;
}): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!formData.name.trim()) {
    errors.name = 'Nome é obrigatório';
  }

  if (!formData.contact.trim()) {
    errors.contact = 'E-mail é obrigatório';
  } else if (formData.contactType === 'email' && !validateEmail(formData.contact)) {
    errors.contact = 'E-mail inválido';
  }

  if (!formData.password || formData.password.length < 6) {
    errors.password = 'Senha deve ter pelo menos 6 caracteres';
  }

  return errors;
};
