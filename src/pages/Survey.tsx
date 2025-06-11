
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
  const [mainChallenge, setMainChallenge] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    // Check if user is authenticated via localStorage for demo
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    
    const user = JSON.parse(userData);
    if (!user.isAuthenticated) {
      navigate('/login');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessType || !primaryGoal || !mainChallenge) {
      toast({
        title: "Please complete all questions",
        description: "All questions are required to continue.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Update user data to mark onboarding as completed
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        const updatedUser = {
          ...user,
          onboardingCompleted: true,
          businessType,
          primaryGoal,
          mainChallenge
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }

      toast({
        title: "Welcome to your AI automation platform!",
        description: "Your account is now configured. Let's start with copywriting tools.",
      });

      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
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
          <h1 className="text-3xl font-bold text-gray-900">Welcome to your AI automation platform</h1>
          <p className="text-gray-600 mt-2">Help us personalize your experience with these 3 quick questions</p>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle>Let's customize your AI tools</CardTitle>
            <CardDescription>
              Your answers will help us show you the most relevant automation features
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
                      <div className="text-sm text-gray-500">Online retail, dropshipping, or product sales</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                    <RadioGroupItem value="agency" id="agency" />
                    <Label htmlFor="agency" className="flex-1 cursor-pointer">
                      <div className="font-medium">Marketing Agency</div>
                      <div className="text-sm text-gray-500">Digital marketing, advertising, or client services</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                    <RadioGroupItem value="sales" id="sales" />
                    <Label htmlFor="sales" className="flex-1 cursor-pointer">
                      <div className="font-medium">Sales & Business Development</div>
                      <div className="text-sm text-gray-500">B2B sales, consulting, or professional services</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                    <RadioGroupItem value="content-creator" id="content-creator" />
                    <Label htmlFor="content-creator" className="flex-1 cursor-pointer">
                      <div className="font-medium">Content Creator / Freelancer</div>
                      <div className="text-sm text-gray-500">Content creation, copywriting, or freelance services</div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Label className="text-base font-medium">What's your primary goal with AI automation?</Label>
                <RadioGroup value={primaryGoal} onValueChange={setPrimaryGoal}>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                    <RadioGroupItem value="save-time" id="save-time" />
                    <Label htmlFor="save-time" className="flex-1 cursor-pointer">
                      <div className="font-medium">Save Time & Increase Efficiency</div>
                      <div className="text-sm text-gray-500">Automate repetitive tasks and streamline workflows</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                    <RadioGroupItem value="better-content" id="better-content" />
                    <Label htmlFor="better-content" className="flex-1 cursor-pointer">
                      <div className="font-medium">Create Better Content Faster</div>
                      <div className="text-sm text-gray-500">Generate high-quality copy, emails, and marketing materials</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                    <RadioGroupItem value="scale-business" id="scale-business" />
                    <Label htmlFor="scale-business" className="flex-1 cursor-pointer">
                      <div className="font-medium">Scale My Business Operations</div>
                      <div className="text-sm text-gray-500">Handle more customers and projects without hiring more staff</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                    <RadioGroupItem value="increase-revenue" id="increase-revenue" />
                    <Label htmlFor="increase-revenue" className="flex-1 cursor-pointer">
                      <div className="font-medium">Increase Revenue & Conversions</div>
                      <div className="text-sm text-gray-500">Optimize sales processes and improve conversion rates</div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Label className="text-base font-medium">What's your biggest challenge right now?</Label>
                <RadioGroup value={mainChallenge} onValueChange={setMainChallenge}>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                    <RadioGroupItem value="content-creation" id="content-creation" />
                    <Label htmlFor="content-creation" className="flex-1 cursor-pointer">
                      <div className="font-medium">Creating Compelling Content</div>
                      <div className="text-sm text-gray-500">Writing copy that converts and engages audiences</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                    <RadioGroupItem value="lead-generation" id="lead-generation" />
                    <Label htmlFor="lead-generation" className="flex-1 cursor-pointer">
                      <div className="font-medium">Generating Quality Leads</div>
                      <div className="text-sm text-gray-500">Finding and attracting the right customers</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                    <RadioGroupItem value="time-management" id="time-management" />
                    <Label htmlFor="time-management" className="flex-1 cursor-pointer">
                      <div className="font-medium">Time Management & Productivity</div>
                      <div className="text-sm text-gray-500">Too many manual tasks taking up valuable time</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                    <RadioGroupItem value="scaling-operations" id="scaling-operations" />
                    <Label htmlFor="scaling-operations" className="flex-1 cursor-pointer">
                      <div className="font-medium">Scaling Without Overwhelming Resources</div>
                      <div className="text-sm text-gray-500">Growing the business without proportional cost increases</div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Button type="submit" className="w-full" disabled={loading} size="lg">
                {loading ? 'Setting up your dashboard...' : 'Complete Setup & Access AI Tools'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Survey;
