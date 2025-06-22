
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Brain } from 'lucide-react';
import { useCopySettings } from '@/hooks/useCopySettings';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const copy = useCopySettings();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate loading time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check if user has completed onboarding
      const existingUser = localStorage.getItem('user');
      const userData = existingUser ? JSON.parse(existingUser) : null;
      
      // Store user data in localStorage for demo purposes
      const newUserData = { 
        email, 
        isAuthenticated: true,
        onboardingCompleted: userData?.onboardingCompleted || false
      };
      localStorage.setItem('user', JSON.stringify(newUserData));

      toast({
        title: "Welcome back!",
        description: "You've been successfully logged in.",
      });

      // Redirect based on onboarding status
      if (!newUserData.onboardingCompleted) {
        navigate('/survey');
      } else {
        navigate('/dashboard');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Brain className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {copy.loginTitle}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {copy.loginLinkText}{' '}
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              {copy.loginSubtitle}
            </Link>
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{copy.loginCardTitle}</CardTitle>
            <CardDescription>{copy.loginCardDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <Input
                  type="email"
                  placeholder={copy.loginEmailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder={copy.loginPasswordPlaceholder}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? copy.loginLoadingText : copy.loginButton}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
