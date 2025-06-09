
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import EmailCopyGenerator from '@/components/copy-generation/EmailCopyGenerator';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EmailSequences = () => {
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/login');
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
              Create 7 different types of high-converting email templates
            </p>
          </div>
        </div>
        
        <EmailCopyGenerator />
      </div>
    </div>
  );
};

export default EmailSequences;
