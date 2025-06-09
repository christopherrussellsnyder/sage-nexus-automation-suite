
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
  Brain,
  PenTool
} from "lucide-react";
import Dashboard from "@/components/Dashboard";
import EcommerceDashboard from "@/components/EcommerceDashboard";
import AgencyDashboard from "@/components/AgencyDashboard";
import SalesDashboard from "@/components/SalesDashboard";
import CopywritingDashboard from "@/components/CopywritingDashboard";

const Index = () => {
  const [activeSection, setActiveSection] = useState<'overview' | 'ecommerce' | 'agency' | 'sales' | 'copywriting'>('overview');

  const renderContent = () => {
    switch (activeSection) {
      case 'ecommerce':
        return <EcommerceDashboard />;
      case 'agency':
        return <AgencyDashboard />;
      case 'sales':
        return <SalesDashboard />;
      case 'copywriting':
        return <CopywritingDashboard />;
      default:
        return <Dashboard setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Platform Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="hidden sm:inline-flex">
                AI Business Automation Suite
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
                variant={activeSection === 'ecommerce' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveSection('ecommerce')}
                className="flex items-center space-x-2"
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden sm:inline">E-commerce</span>
              </Button>
              <Button
                variant={activeSection === 'agency' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveSection('agency')}
                className="flex items-center space-x-2"
              >
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Agency</span>
              </Button>
              <Button
                variant={activeSection === 'sales' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveSection('sales')}
                className="flex items-center space-x-2"
              >
                <Phone className="h-4 w-4" />
                <span className="hidden sm:inline">Sales</span>
              </Button>
              <Button
                variant={activeSection === 'copywriting' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveSection('copywriting')}
                className="flex items-center space-x-2"
              >
                <PenTool className="h-4 w-4" />
                <span className="hidden sm:inline">Copywriting</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
