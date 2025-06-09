
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface UsageData {
  website: number;
  advertising: number;
  email: number;
  social: number;
}

export interface SubscriptionData {
  subscription_type: 'free' | 'premium';
  subscription_status: 'active' | 'cancelled' | 'expired';
}

export const useUsageTracking = () => {
  const [usage, setUsage] = useState<UsageData>({ website: 0, advertising: 0, email: 0, social: 0 });
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const FREE_LIMIT = 5;

  useEffect(() => {
    fetchUsageData();
    fetchSubscriptionData();
  }, []);

  const fetchUsageData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('user_usage')
        .select('feature_type, usage_count')
        .eq('user_id', user.id);

      if (error) throw error;

      const usageMap: UsageData = { website: 0, advertising: 0, email: 0, social: 0 };
      data?.forEach(item => {
        usageMap[item.feature_type as keyof UsageData] = item.usage_count;
      });

      setUsage(usageMap);
    } catch (error) {
      console.error('Error fetching usage data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubscriptionData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('user_subscriptions')
        .select('subscription_type, subscription_status')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      setSubscription(data);
    } catch (error) {
      console.error('Error fetching subscription data:', error);
    }
  };

  const canUseFeature = (featureType: keyof UsageData): boolean => {
    if (subscription?.subscription_type === 'premium') return true;
    return usage[featureType] < FREE_LIMIT;
  };

  const incrementUsage = async (featureType: keyof UsageData): Promise<boolean> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      if (!canUseFeature(featureType)) {
        toast({
          title: "Usage Limit Reached",
          description: `You've reached your limit of ${FREE_LIMIT} generations for ${featureType}. Upgrade to Premium for unlimited access.`,
          variant: "destructive",
        });
        return false;
      }

      const { error } = await supabase.rpc('increment_usage', {
        _user_id: user.id,
        _feature_type: featureType
      });

      if (error) throw error;

      setUsage(prev => ({
        ...prev,
        [featureType]: prev[featureType] + 1
      }));

      return true;
    } catch (error) {
      console.error('Error incrementing usage:', error);
      toast({
        title: "Error",
        description: "Failed to track usage. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const getRemainingUsage = (featureType: keyof UsageData): number => {
    if (subscription?.subscription_type === 'premium') return -1; // Unlimited
    return Math.max(0, FREE_LIMIT - usage[featureType]);
  };

  const getUsagePercentage = (featureType: keyof UsageData): number => {
    if (subscription?.subscription_type === 'premium') return 0;
    return (usage[featureType] / FREE_LIMIT) * 100;
  };

  return {
    usage,
    subscription,
    loading,
    canUseFeature,
    incrementUsage,
    getRemainingUsage,
    getUsagePercentage,
    refreshUsage: fetchUsageData
  };
};
