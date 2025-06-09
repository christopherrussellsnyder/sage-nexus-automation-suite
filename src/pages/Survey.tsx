
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Brain } from 'lucide-react';

const Survey = () => {
  const [businessType, setBusinessType] = useState('');
  const [primaryGoal, setPrimaryGoal] = useState('');
  const [automationPriority, setAutomationPriority] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/login');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessType || !primaryGoal || !automationPriority) {
      toast({
        title: "Please complete all questions",
        description: "All questions are required to continue.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('No session found');

      const { error } = await supabase
        .from('profiles')
        .update({
          business_type: businessType,
          primary_goal: primaryGoal,
          automation_priority: automationPriority,
          onboarding_completed: true,
        })
        .eq('user_id', session.user.id);

      if (error) throw error;

      toast({
        title: "Welcome to Sage.ai!",
        description: "Your account is now configured. Let's start automating your business.",
      });

      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <Brain className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">Welcome to Sage.ai</h1>
          <p className="text-gray-600 mt-2">Let's personalize your experience with these quick questions</p>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle>Tell us about your business</CardTitle>
            <CardDescription>
              Help us customize your AI automation suite to fit your specific needs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <Label className="text-base font-medium">What type of business do you run?</Label>
                <RadioGroup value={businessType} onValueChange={setBusinessType}>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                    <RadioGroupItem value="ecommerce" id="ecommerce" />
                    <Label htmlFor="ecommerce" className="flex-1 cursor-pointer">
                      <div className="font-medium">E-commerce Store</div>
                      <div className="text-sm text-gray-500">Selling physical or digital products online</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                    <RadioGroupItem value="agency" id="agency" />
                    <Label htmlFor="agency" className="flex-1 cursor-pointer">
                      <div className="font-medium">Marketing Agency</div>
                      <div className="text-sm text-gray-500">Managing campaigns and clients</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                    <RadioGroupItem value="sales" id="sales" />
                    <Label htmlFor="sales" className="flex-1 cursor-pointer">
                      <div className="font-medium">Sales Organization</div>
                      <div className="text-sm text-gray-500">B2B sales, lead generation, and prospecting</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                    <RadioGroupItem value="content-creator" id="content-creator" />
                    <Label htmlFor="content-creator" className="flex-1 cursor-pointer">
                      <div className="font-medium">Content Creator / Copywriter</div>
                      <div className="text-sm text-gray-500">Creating content and copy for clients</div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Label className="text-base font-medium">What's your primary goal with automation?</Label>
                <RadioGroup value={primaryGoal} onValueChange={setPrimaryGoal}>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                    <RadioGroupItem value="increase-revenue" id="increase-revenue" />
                    <Label htmlFor="increase-revenue" className="flex-1 cursor-pointer">
                      <div className="font-medium">Increase Revenue & Sales</div>
                      <div className="text-sm text-gray-500">Drive more conversions and higher profits</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                    <RadioGroupItem value="save-time" id="save-time" />
                    <Label htmlFor="save-time" className="flex-1 cursor-pointer">
                      <div className="font-medium">Save Time & Increase Efficiency</div>
                      <div className="text-sm text-gray-500">Automate repetitive tasks and workflows</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                    <RadioGroupItem value="scale-operations" id="scale-operations" />
                    <Label htmlFor="scale-operations" className="flex-1 cursor-pointer">
                      <div className="font-medium">Scale Operations</div>
                      <div className="text-sm text-gray-500">Handle more clients/customers without more staff</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                    <RadioGroupItem value="improve-quality" id="improve-quality" />
                    <Label htmlFor="improve-quality" className="flex-1 cursor-pointer">
                      <div className="font-medium">Improve Quality & Consistency</div>
                      <div className="text-sm text-gray-500">Deliver better, more consistent results</div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Label className="text-base font-medium">Which area needs automation most urgently?</Label>
                <RadioGroup value={automationPriority} onValueChange={setAutomationPriority}>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                    <RadioGroupItem value="marketing-campaigns" id="marketing-campaigns" />
                    <Label htmlFor="marketing-campaigns" className="flex-1 cursor-pointer">
                      <div className="font-medium">Marketing & Campaigns</div>
                      <div className="text-sm text-gray-500">Social media, ads, email marketing</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                    <RadioGroupItem value="sales-prospecting" id="sales-prospecting" />
                    <Label htmlFor="sales-prospecting" className="flex-1 cursor-pointer">
                      <div className="font-medium">Sales & Prospecting</div>
                      <div className="text-sm text-gray-500">Lead generation, outreach, follow-ups</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                    <RadioGroupItem value="content-creation" id="content-creation" />
                    <Label htmlFor="content-creation" className="flex-1 cursor-pointer">
                      <div className="font-medium">Content & Copy Creation</div>
                      <div className="text-sm text-gray-500">Website copy, ads, emails, social posts</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                    <RadioGroupItem value="website-ecommerce" id="website-ecommerce" />
                    <Label htmlFor="website-ecommerce" className="flex-1 cursor-pointer">
                      <div className="font-medium">Website & E-commerce</div>
                      <div className="text-sm text-gray-500">Store setup, product research, optimization</div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Button type="submit" className="w-full" disabled={loading} size="lg">
                {loading ? 'Setting up your account...' : 'Complete Setup & Start Free Trial'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Survey;
