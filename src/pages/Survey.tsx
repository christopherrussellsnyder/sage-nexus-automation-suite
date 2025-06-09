
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Survey = () => {
  const [workType, setWorkType] = useState('');
  const [goal, setGoal] = useState('');
  const [referralSource, setReferralSource] = useState('');
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
    if (!workType || !goal || !referralSource) {
      toast({
        title: "Please complete all fields",
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
          work_type: workType,
          goal: goal,
          referral_source: referralSource,
        })
        .eq('user_id', session.user.id);

      if (error) throw error;

      toast({
        title: "Setup complete!",
        description: "Welcome to Sage.ai. Let's start creating amazing copy.",
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
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Tell us about yourself</CardTitle>
            <CardDescription>
              Help us personalize your experience with a few quick questions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <Label className="text-base font-medium">What kind of work do you do?</Label>
                <RadioGroup value={workType} onValueChange={setWorkType}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="business-owner" id="business-owner" />
                    <Label htmlFor="business-owner">Business Owner</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="marketing-agency" id="marketing-agency" />
                    <Label htmlFor="marketing-agency">Marketing Agency</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="freelancer" id="freelancer" />
                    <Label htmlFor="freelancer">Freelancer/Consultant</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="employee" id="employee" />
                    <Label htmlFor="employee">Employee</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Label className="text-base font-medium">What are you trying to accomplish?</Label>
                <RadioGroup value={goal} onValueChange={setGoal}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="increase-sales" id="increase-sales" />
                    <Label htmlFor="increase-sales">Increase sales and conversions</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="save-time" id="save-time" />
                    <Label htmlFor="save-time">Save time on copywriting</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="improve-copy" id="improve-copy" />
                    <Label htmlFor="improve-copy">Improve copy quality</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="scale-business" id="scale-business" />
                    <Label htmlFor="scale-business">Scale my business</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Label className="text-base font-medium">How did you hear about us?</Label>
                <RadioGroup value={referralSource} onValueChange={setReferralSource}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="google-search" id="google-search" />
                    <Label htmlFor="google-search">Google Search</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="social-media" id="social-media" />
                    <Label htmlFor="social-media">Social Media</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="word-of-mouth" id="word-of-mouth" />
                    <Label htmlFor="word-of-mouth">Word of Mouth</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="online-ad" id="online-ad" />
                    <Label htmlFor="online-ad">Online Advertisement</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button type="submit" className="w-full" disabled={loading} size="lg">
                {loading ? 'Completing setup...' : 'Complete Setup'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Survey;
