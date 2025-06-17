
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import FeatureDashboard from '@/components/FeatureDashboard';

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

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
      <div className="container mx-auto px-4 py-8">
        <FeatureDashboard />
      </div>
    </div>
  );
};

export default Dashboard;
