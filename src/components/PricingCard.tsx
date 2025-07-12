
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';

interface PricingCardProps {
  plan: 'free' | 'premium';
  isCurrentPlan?: boolean;
  userSubscription?: any;
}

const PricingCard = ({ plan, isCurrentPlan = false, userSubscription }: PricingCardProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to subscribe to our premium plan.",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      // Open Stripe checkout in a new tab
      window.open(data.url, '_blank');
    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        title: "Subscription Error",
        description: "Failed to start subscription process. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      // Open customer portal in a new tab
      window.open(data.url, '_blank');
    } catch (error) {
      console.error('Portal error:', error);
      toast({
        title: "Error",
        description: "Failed to open customer portal. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (plan === 'free') {
    return (
      <Card className={`relative ${isCurrentPlan ? 'border-2 border-primary' : ''}`}>
        {isCurrentPlan && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <Badge variant="default">Current Plan</Badge>
          </div>
        )}
        <CardHeader>
          <CardTitle>Free Trial</CardTitle>
          <CardDescription>Perfect for testing our AI automation platform</CardDescription>
          <div className="text-3xl font-bold">$0<span className="text-lg font-normal text-muted-foreground">/trial</span></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mb-6">
            <div className="text-sm font-medium text-foreground mb-3">What's Included:</div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                <span>Limited access to all features (5 uses per feature)</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                <span>AI copywriting for ads, emails, websites</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                <span>Basic intelligence insights</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                <span>Limited product research (3 products)</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                <span>Community support</span>
              </li>
            </ul>
          </div>
          <Button className="w-full" variant="outline" disabled={isCurrentPlan}>
            {isCurrentPlan ? 'Your Current Plan' : 'Start Free Trial'}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`border-2 border-primary relative ${isCurrentPlan ? 'bg-primary/5' : ''}`}>
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
        <Badge className="bg-primary text-primary-foreground">
          {isCurrentPlan ? 'Your Plan' : 'Most Popular'}
        </Badge>
      </div>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Crown className="h-5 w-5 text-yellow-500 mr-2" />
          Premium Plan
        </CardTitle>
        <CardDescription>Complete AI business automation suite with unlimited access</CardDescription>
        <div className="text-3xl font-bold">$30<span className="text-lg font-normal text-muted-foreground">/month</span></div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-6">
          <div className="text-sm font-medium text-foreground mb-3">Everything in Free Trial, plus:</div>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
              <span><strong>Unlimited</strong> AI copywriting generation</span>
            </li>
            <li className="flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
              <span><strong>Unlimited</strong> intelligence insights</span>
            </li>
            <li className="flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
              <span>Access to all <strong>30 weekly trending products</strong></span>
            </li>
            <li className="flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
              <span>Advanced e-commerce website builder</span>
            </li>
            <li className="flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
              <span>Campaign management & automation</span>
            </li>
            <li className="flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
              <span>Lead scoring & management</span>
            </li>
            <li className="flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
              <span>Sales sequence automation</span>
            </li>
            <li className="flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
              <span>Priority customer support</span>
            </li>
            <li className="flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
              <span>Export capabilities</span>
            </li>
            <li className="flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
              <span>Custom integrations</span>
            </li>
          </ul>
        </div>
        {isCurrentPlan ? (
          <Button 
            className="w-full" 
            variant="outline" 
            onClick={handleManageSubscription}
            disabled={loading}
          >
            <Crown className="h-4 w-4 mr-2" />
            {loading ? 'Loading...' : 'Manage Subscription'}
          </Button>
        ) : (
          <Button 
            className="w-full bg-primary hover:bg-primary/90" 
            onClick={handleSubscribe}
            disabled={loading}
          >
            <Zap className="h-4 w-4 mr-2" />
            {loading ? 'Processing...' : 'Upgrade to Premium'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default PricingCard;
