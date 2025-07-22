
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Brain } from 'lucide-react';
import FeatureDashboard from '@/components/FeatureDashboard';
import Footer from '@/components/Footer';
import { useCopySettings } from '@/hooks/useCopySettings';

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const copy = useCopySettings();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // Check localStorage for demo authentication
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

      // If user hasn't completed onboarding, redirect to survey
      if (!user.onboardingCompleted) {
        navigate('/survey');
        return;
      }

      setUser(user);
      setLoading(false);
    } catch (error) {
      console.error('Error checking auth:', error);
      navigate('/login');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="nav-glass sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Brain className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">{copy.brandName}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Overview
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <FeatureDashboard />
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
