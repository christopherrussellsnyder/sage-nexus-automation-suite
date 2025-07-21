
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
  subscription_type: string; // Changed from union type to string to match database
  subscription_status: string; // Changed from union type to string to match database
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
      // Check localStorage for demo authentication first
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        if (user.isAuthenticated) {
          // For demo mode, just use localStorage
          const storedUsage = localStorage.getItem('demo_usage');
          if (storedUsage) {
            setUsage(JSON.parse(storedUsage));
          }
          setLoading(false);
          return;
        }
      }

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
      // Check localStorage for demo authentication first
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        if (user.isAuthenticated) {
          // For demo mode, assume premium subscription
          setSubscription({
            subscription_type: 'premium',
            subscription_status: 'active'
          });
          return;
        }
      }

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
    const startTime = Date.now();
    let retryCount = 0;
    const maxRetries = 3;
    
    const attemptIncrement = async (): Promise<boolean> => {
      try {
        // Check localStorage for demo authentication first
        const userData = localStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          if (user.isAuthenticated) {
            // For demo mode, just increment in localStorage
            const newUsage = { ...usage, [featureType]: usage[featureType] + 1 };
            setUsage(newUsage);
            localStorage.setItem('demo_usage', JSON.stringify(newUsage));
            console.log(`Demo usage incremented for ${featureType}: ${newUsage[featureType]}`);
            return true;
          }
        }

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

        // Pre-check usage limits with enhanced validation
        if (!canUseFeature(featureType)) {
          toast({
            title: "Usage Limit Reached",
            description: `You've reached your limit of ${FREE_LIMIT} generations for ${featureType}. Upgrade to Premium for unlimited access.`,
            variant: "destructive",
          });
          return false;
        }

        // Enhanced database operation with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        try {
          const { error } = await supabase.rpc('increment_usage', {
            _user_id: user.id,
            _feature_type: featureType
          });

          clearTimeout(timeoutId);

          if (error) {
            console.error('Database increment error:', error);
            throw new Error(`Failed to increment usage: ${error.message}`);
          }

          // Optimistically update local state
          setUsage(prev => {
            const newUsage = {
              ...prev,
              [featureType]: prev[featureType] + 1
            };
            console.log(`Usage incremented for ${featureType}: ${newUsage[featureType]}`);
            return newUsage;
          });

          // Track performance
          const duration = Date.now() - startTime;
          console.log(`Usage increment completed in ${duration}ms for ${featureType}`);

          return true;

        } catch (dbError) {
          clearTimeout(timeoutId);
          throw dbError;
        }

      } catch (error) {
        console.error(`Usage increment attempt ${retryCount + 1} failed:`, error);
        
        // Retry logic for recoverable errors
        if (retryCount < maxRetries) {
          const isRetryable = 
            error.message?.includes('network') ||
            error.message?.includes('timeout') ||
            error.message?.includes('AbortError') ||
            error.message?.includes('connection');
          
          if (isRetryable) {
            retryCount++;
            const delay = Math.min(1000 * Math.pow(2, retryCount - 1), 5000); // Exponential backoff, max 5s
            console.log(`Retrying usage increment in ${delay}ms... (attempt ${retryCount}/${maxRetries})`);
            
            await new Promise(resolve => setTimeout(resolve, delay));
            return attemptIncrement();
          }
        }

        // Enhanced error handling
        const errorMessage = error.message?.includes('not authenticated') 
          ? 'Please log in to continue using this feature.'
          : 'Failed to track usage. Please try again.';

        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });

        return false;
      }
    };

    return attemptIncrement();
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
