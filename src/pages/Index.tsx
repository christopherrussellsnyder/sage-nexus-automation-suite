
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
import IntelligenceDashboard from "@/components/IntelligenceDashboard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useCopySettings } from '@/hooks/useCopySettings';

const Index = () => {
  const [activeSection, setActiveSection] = useState<'overview' | 'intelligence' | 'ecommerce' | 'agency' | 'sales' | 'copywriting'>('overview');
  const copy = useCopySettings();

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
        return <Dashboard setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      
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
