
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  Users, 
  Phone, 
  BarChart3, 
  Brain,
  TrendingUp,
  Target,
  Zap,
  ArrowRight
} from "lucide-react";
import { useCopySettings } from '@/hooks/useCopySettings';
import HeroSection from './dashboard/HeroSection';
import ValueProposition from './dashboard/ValueProposition';
import StatsGrid from './dashboard/StatsGrid';
import FeatureCard from './dashboard/FeatureCard';

interface DashboardProps {
  setActiveSection: (section: 'overview' | 'intelligence' | 'ecommerce' | 'agency' | 'sales') => void;
}

const Dashboard = ({ setActiveSection }: DashboardProps) => {
  const copy = useCopySettings();

  const features = [
    {
      title: "Intelligence Suite",
      description: "AI-powered business intelligence with comprehensive analysis across all business functions",
      icon: Brain,
      color: "bg-purple-500",
      onClick: () => setActiveSection('intelligence'),
      features: ['Market Analysis', 'Competitor Intelligence', 'Copywriting AI', 'Strategic Planning']
    },
    {
      title: copy.ecommerceTitle,
      description: copy.ecommerceDescription,
      icon: ShoppingCart,
      color: "bg-blue-500",
      onClick: () => setActiveSection('ecommerce'),
      features: ['Product Research', 'Market Analysis', 'Competitor Tracking', 'SEO Optimization']
    },
    {
      title: copy.agencyTitle,
      description: copy.agencyDescription,
      icon: Users,
      color: "bg-green-500",
      onClick: () => setActiveSection('agency'),
      features: ['Client Management', 'Lead Generation', 'Project Tracking', 'Performance Analytics']
    },
    {
      title: copy.salesTitle,
      description: copy.salesDescription,
      icon: Phone,
      color: "bg-orange-500",
      onClick: () => setActiveSection('sales'),
      features: ['Prospect Research', 'Deal Tracking', 'Email Sequences', 'Sales Analytics']
    }
  ];

  return (
    <div className="space-y-12">
      <HeroSection />
      <ValueProposition />
      <StatsGrid />
      
      {/* Features Grid */}
      <section>
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold">Choose Your Business Focus</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select the area that best matches your business needs to access specialized tools and intelligence
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              color={feature.color}
              features={feature.features}
              onClick={feature.onClick}
            />
          ))}
        </div>
      </section>

      {/* Quick Start */}
      <section className="bg-muted/50 rounded-lg p-8">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Get Started with Intelligence</h2>
          <p className="text-muted-foreground">
            Begin with our unified Intelligence Suite for comprehensive business analysis
          </p>
          <Button 
            onClick={() => setActiveSection('intelligence')} 
            size="lg"
            className="flex items-center space-x-2"
          >
            <Brain className="h-5 w-5" />
            <span>Start Intelligence Analysis</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
