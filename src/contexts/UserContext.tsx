
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserData {
  name: string;
  contact: string;
  contactType: 'email' | 'phone';
  mood: string;
  menopauseType: 'C' | 'S' | 'E' | null;
}

interface UserContextType {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  resetUserData: () => void;
}

const initialUserData: UserData = {
  name: '',
  contact: '',
  contactType: 'email',
  mood: '',
  menopauseType: null,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserData>(initialUserData);

  const updateUserData = (data: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...data }));
  };

  const resetUserData = () => {
    setUserData(initialUserData);
  };

  return (
    <UserContext.Provider value={{ userData, updateUserData, resetUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
