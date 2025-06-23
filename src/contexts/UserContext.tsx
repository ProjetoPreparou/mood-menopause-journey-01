
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';

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
  saveToSupabase: () => Promise<void>;
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
  const { user } = useAuth();

  // Load user profile from Supabase when user is authenticated
  useEffect(() => {
    if (user) {
      loadUserProfile();
    } else {
      setUserData(initialUserData);
    }
  }, [user]);

  const loadUserProfile = async () => {
    if (!user) return;
    
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (profile && !error) {
      setUserData({
        name: profile.name || '',
        contact: profile.email || '',
        contactType: 'email',
        mood: profile.mood || '',
        menopauseType: profile.menopause_type as 'C' | 'S' | 'E' | null,
      });
    }
  };

  const updateUserData = (data: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...data }));
  };

  const resetUserData = () => {
    setUserData(initialUserData);
  };

  const saveToSupabase = async () => {
    if (!user) return;

    const { error } = await supabase
      .from('profiles')
      .update({
        name: userData.name,
        mood: userData.mood,
        menopause_type: userData.menopauseType,
      })
      .eq('user_id', user.id);

    if (error) {
      console.error('Error saving to Supabase:', error);
    }
  };

  return (
    <UserContext.Provider value={{ userData, updateUserData, resetUserData, saveToSupabase }}>
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
