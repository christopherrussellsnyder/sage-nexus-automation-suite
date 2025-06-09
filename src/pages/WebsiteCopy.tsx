
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import WebsiteCopyGenerator from '@/components/copy-generation/WebsiteCopyGenerator';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WebsiteCopy = () => {
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
            <h1 className="text-3xl font-bold">Website Copy Generator</h1>
            <p className="text-muted-foreground">
              Generate 5 unique website copy templates based on top-performing industry analysis
            </p>
          </div>
        </div>
        
        <WebsiteCopyGenerator />
      </div>
    </div>
  );
};

export default WebsiteCopy;
