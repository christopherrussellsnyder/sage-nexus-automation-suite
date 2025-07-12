
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface SubscriptionData {
  subscribed: boolean;
  subscription_type: string;
  subscription_status: string;
  subscription_end?: string;
}

export const useSubscription = () => {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const checkSubscription = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setSubscription({
          subscribed: false,
          subscription_type: 'free',
          subscription_status: 'inactive'
        });
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;
      setSubscription(data);
    } catch (error) {
      console.error('Error checking subscription:', error);
      toast({
        title: "Error",
        description: "Failed to check subscription status.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSubscription();

    // Listen for auth changes
    const { data: { subscription: authListener } } = supabase.auth.onAuthStateChange(() => {
      checkSubscription();
    });

    return () => authListener?.unsubscribe();
  }, []);

  const isPremium = subscription?.subscribed && subscription?.subscription_status === 'active';

  return {
    subscription,
    loading,
    isPremium,
    refreshSubscription: checkSubscription
  };
};
