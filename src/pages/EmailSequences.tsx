
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmailSequenceGenerator from '@/components/copy-generation/EmailSequenceGenerator';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EmailSequences = () => {
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }

    const user = JSON.parse(userData);
    if (!user.isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!user.onboardingCompleted) {
      navigate('/survey');
      return;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Email Sequence Generator</h1>
            <p className="text-muted-foreground">
              7 different email types optimized for maximum engagement
            </p>
          </div>
        </div>
        
        <EmailSequenceGenerator />
      </div>
    </div>
  );
};

export default EmailSequences;
