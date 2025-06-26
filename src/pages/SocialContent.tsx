
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SocialContentGenerator from '@/components/copy-generation/SocialContentGenerator';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCopySettings } from '@/hooks/useCopySettings';

const SocialContent = () => {
  const navigate = useNavigate();
  const copy = useCopySettings();

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
            <span>{copy.backToDashboard}</span>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{copy.socialContentTitle}</h1>
            <p className="text-muted-foreground">
              {copy.socialContentDescription}
            </p>
          </div>
        </div>
        
        <SocialContentGenerator />
      </div>
    </div>
  );
};

export default SocialContent;
