
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Crown, Brain, Zap, Target, Rocket, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Footer from '@/components/Footer';
import PricingCard from '@/components/PricingCard';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

const Pricing = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userSubscription, setUserSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSubscriptionStatus();
  }, []);

  const checkSubscriptionStatus = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;
      setUserSubscription(data);
    } catch (error) {
      console.error('Error checking subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartTrial = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/signup');
      return;
    }
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
              <Brain className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">Sage.ai</span>
            </div>
            <Button variant="outline" onClick={() => navigate('/')}>
              Back to Home
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Brain className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold">Transform Your Business with AI</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get unlimited access to our complete AI business automation suite. 
            E-commerce, marketing, sales, and copywriting tools all included.
          </p>
          <div className="flex items-center justify-center space-x-4 mt-6">
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-blue-500" />
              <span className="text-sm text-muted-foreground">AI-Powered</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-green-500" />
              <span className="text-sm text-muted-foreground">All-in-One</span>
            </div>
            <div className="flex items-center space-x-2">
              <Rocket className="h-5 w-5 text-purple-500" />
              <span className="text-sm text-muted-foreground">Fully Automated</span>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 mb-20">
          {!loading && (
            <>
              <PricingCard 
                plan="free" 
                isCurrentPlan={!userSubscription?.subscribed}
                userSubscription={userSubscription}
              />
              <PricingCard 
                plan="premium" 
                isCurrentPlan={userSubscription?.subscribed}
                userSubscription={userSubscription}
              />
            </>
          )}
          
          {loading && (
            <div className="col-span-2 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-muted-foreground">Loading pricing information...</p>
            </div>
          )}
        </div>

        {/* Value Proposition */}
        <div className="max-w-6xl mx-auto mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">Everything You Need to Automate Your Business</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">E-commerce Hub</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• AI website builder</li>
                  <li>• Product research engine</li>
                  <li>• Trending analysis</li>
                  <li>• Store optimization</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">Marketing Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Campaign automation</li>
                  <li>• Lead scoring system</li>
                  <li>• Social content factory</li>
                  <li>• Performance tracking</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Rocket className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Sales Operations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Prospect research AI</li>
                  <li>• Sales sequence automation</li>
                  <li>• Meeting intelligence</li>
                  <li>• Deal tracking</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-lg">AI Copywriting</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Website copy generation</li>
                  <li>• Ad copy creation</li>
                  <li>• Email sequences</li>
                  <li>• Social content</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-2">What happens after my free trial?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                After using your free trial limits, you'll need to upgrade to Premium ($30/month) to continue using Sage.ai with unlimited access to all features.
              </p>
              
              <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Yes, you can cancel your subscription at any time through the customer portal. You'll retain access until the end of your billing period.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What does the $30/month include?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Premium gives you unlimited access to all AI features: copywriting, intelligence insights, product research, website building, campaign automation, and priority support.
              </p>
              
              <h3 className="font-semibold mb-2">Is there customer support?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Yes! Premium subscribers get priority support via email and chat. Free trial users have access to our knowledge base and community forum.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="max-w-4xl mx-auto mt-16 text-center">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Business?</h3>
              <p className="mb-6 opacity-90">
                Join thousands of businesses that have automated their operations with Sage.ai. 
                Start your free trial today and see the difference AI automation can make.
              </p>
              <div className="flex justify-center space-x-4">
                <Button size="lg" variant="secondary" onClick={handleStartTrial}>
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Start Free Trial
                </Button>
                <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Pricing;
