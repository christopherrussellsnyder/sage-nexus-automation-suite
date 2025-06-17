
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import CopywritingDashboard from '@/components/CopywritingDashboard';
import SalesDashboard from '@/components/SalesDashboard';
import AgencyDashboard from '@/components/AgencyDashboard';

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [activeDashboard, setActiveDashboard] = useState<'copywriting' | 'sales' | 'agency'>('copywriting');

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

  const renderActiveDashboard = () => {
    switch (activeDashboard) {
      case 'sales':
        return <SalesDashboard />;
      case 'agency':
        return <AgencyDashboard />;
      default:
        return <CopywritingDashboard />;
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
        <div className="flex items-center justify-center space-x-4 mb-8">
          <button 
            onClick={() => setActiveDashboard('copywriting')}
            className={`px-4 py-2 rounded-md ${activeDashboard === 'copywriting' ? 'bg-primary text-white' : 'bg-muted'}`}
          >
            Copywriting
          </button>
          <button 
            onClick={() => setActiveDashboard('sales')}
            className={`px-4 py-2 rounded-md ${activeDashboard === 'sales' ? 'bg-primary text-white' : 'bg-muted'}`}
          >
            Sales
          </button>
          <button 
            onClick={() => setActiveDashboard('agency')}
            className={`px-4 py-2 rounded-md ${activeDashboard === 'agency' ? 'bg-primary text-white' : 'bg-muted'}`}
          >
            Agency
          </button>
        </div>
        {renderActiveDashboard()}
      </div>
    </div>
  );
};

export default Dashboard;
