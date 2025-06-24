
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';

interface SubscriptionData {
  isActive: boolean;
  status: string;
  currentPeriodEnd: string | null;
  loading: boolean;
}

interface SubscriptionContextType {
  subscription: SubscriptionData;
  checkSubscription: () => Promise<void>;
  createCheckoutSession: () => Promise<void>;
}

const initialSubscription: SubscriptionData = {
  isActive: false,
  status: 'inactive',
  currentPeriodEnd: null,
  loading: true,
};

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const [subscription, setSubscription] = useState<SubscriptionData>(initialSubscription);
  const { user } = useAuth();

  const checkSubscription = async () => {
    if (!user) {
      setSubscription({ ...initialSubscription, loading: false });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching subscription:', error);
        setSubscription({ ...initialSubscription, loading: false });
        return;
      }

      if (data) {
        const isActive = data.status === 'active' && 
          data.current_period_end && 
          new Date(data.current_period_end) > new Date();

        setSubscription({
          isActive,
          status: data.status,
          currentPeriodEnd: data.current_period_end,
          loading: false,
        });
      } else {
        setSubscription({ ...initialSubscription, loading: false });
      }
    } catch (error) {
      console.error('Error checking subscription:', error);
      setSubscription({ ...initialSubscription, loading: false });
    }
  };

  const createCheckoutSession = async () => {
    // Placeholder para integração com Stripe
    console.log('Criando sessão de checkout...');
    // TODO: Implementar integração com Stripe
  };

  useEffect(() => {
    checkSubscription();
  }, [user]);

  return (
    <SubscriptionContext.Provider value={{ subscription, checkSubscription, createCheckoutSession }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};
