
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  Users, 
  Phone, 
  BarChart3, 
  Globe, 
  Search,
  Megaphone,
  TrendingUp,
  MessageSquare,
  UserCheck,
  PhoneCall,
  Brain
} from "lucide-react";
import Dashboard from "@/components/Dashboard";
import EcommerceDashboard from "@/components/EcommerceDashboard";
import AgencyDashboard from "@/components/AgencyDashboard";
import SalesDashboard from "@/components/SalesDashboard";
import IntelligenceDashboard from "@/components/IntelligenceDashboard";
import Footer from "@/components/Footer";
import { useCopySettings } from '@/hooks/useCopySettings';

const Index = () => {
  const [activeSection, setActiveSection] = useState<'overview' | 'intelligence' | 'ecommerce' | 'agency' | 'sales'>('overview');
  const copy = useCopySettings();

  const handleSetActiveSection = (section: 'ecommerce' | 'agency' | 'sales' | 'overview') => {
    setActiveSection(section);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'intelligence':
        return <IntelligenceDashboard />;
      case 'ecommerce':
        return <EcommerceDashboard />;
      case 'agency':
        return <AgencyDashboard />;
      case 'sales':
        return <SalesDashboard />;
      default:
        return <Dashboard setActiveSection={handleSetActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Platform Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Brain className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">{copy.brandName}</span>
              </div>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                {copy.brandTagline}
              </Badge>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant={activeSection === 'overview' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveSection('overview')}
                className="flex items-center space-x-2"
              >
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Overview</span>
              </Button>
              <Button
                variant={activeSection === 'intelligence' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveSection('intelligence')}
                className="flex items-center space-x-2"
              >
                <Brain className="h-4 w-4" />
                <span className="hidden sm:inline">Intelligence</span>
              </Button>
              <Button
                variant={activeSection === 'ecommerce' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveSection('ecommerce')}
                className="flex items-center space-x-2"
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden sm:inline">{copy.ecommerceTitle}</span>
              </Button>
              <Button
                variant={activeSection === 'agency' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveSection('agency')}
                className="flex items-center space-x-2"
              >
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">{copy.agencyTitle}</span>
              </Button>
              <Button
                variant={activeSection === 'sales' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveSection('sales')}
                className="flex items-center space-x-2"
              >
                <Phone className="h-4 w-4" />
                <span className="hidden sm:inline">{copy.salesTitle}</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
