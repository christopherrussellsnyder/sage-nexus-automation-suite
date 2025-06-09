
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  Users, 
  Phone, 
  Globe, 
  Search,
  Megaphone,
  TrendingUp,
  MessageSquare,
  UserCheck,
  PhoneCall,
  Brain,
  ArrowRight,
  Zap,
  Target,
  Rocket
} from "lucide-react";

interface DashboardProps {
  setActiveSection: (section: 'overview' | 'ecommerce' | 'agency' | 'sales') => void;
}

const Dashboard = ({ setActiveSection }: DashboardProps) => {
  const features = [
    {
      section: 'ecommerce' as const,
      title: 'E-commerce Automation',
      description: 'AI-powered website builder and product research',
      icon: ShoppingCart,
      color: 'bg-blue-500',
      features: ['Custom Website Builder', 'Weekly Product Research', 'Trending Product Analysis', 'Store Templates'],
      stats: { active: 12, revenue: '$45,000' }
    },
    {
      section: 'agency' as const,
      title: 'Marketing Agency Tools',
      description: 'Multi-platform campaign management and optimization',
      icon: Users,
      color: 'bg-green-500',
      features: ['Campaign Orchestration', 'Lead Scoring', 'Social Media Factory', 'Client Reporting'],
      stats: { clients: 28, campaigns: 156 }
    },
    {
      section: 'sales' as const,
      title: 'Sales Operations',
      description: 'Intelligent prospect research and sales automation',
      icon: Phone,
      color: 'bg-purple-500',
      features: ['Prospect Research', 'Sales Sequences', 'Meeting Intelligence', 'Deal Progression'],
      stats: { prospects: 340, deals: 89 }
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-12">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Brain className="h-16 w-16 text-primary" />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            Sage.ai
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          The ultimate AI-powered business automation suite for e-commerce, marketing agencies, and sales operations. 
          Streamline your workflow with intelligent automation and data-driven insights.
        </p>
        <div className="flex items-center justify-center space-x-4 pt-4">
          <Badge variant="secondary" className="px-4 py-2">
            <Zap className="h-4 w-4 mr-2" />
            AI-Powered
          </Badge>
          <Badge variant="secondary" className="px-4 py-2">
            <Target className="h-4 w-4 mr-2" />
            Multi-Platform
          </Badge>
          <Badge variant="secondary" className="px-4 py-2">
            <Rocket className="h-4 w-4 mr-2" />
            Fully Automated
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Globe className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-muted-foreground">Active Websites</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Megaphone className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-muted-foreground">Active Campaigns</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <PhoneCall className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">89</p>
                <p className="text-sm text-muted-foreground">Active Deals</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">+127%</p>
                <p className="text-sm text-muted-foreground">Growth Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feature Cards */}
      <div className="grid lg:grid-cols-3 gap-8">
        {features.map((feature) => (
          <Card key={feature.section} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
            <div className={`absolute top-0 left-0 w-full h-2 ${feature.color}`} />
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-lg ${feature.color} text-white`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-sm">{feature.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {feature.features.map((item, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center mb-4">
                  {Object.entries(feature.stats).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <p className="text-lg font-semibold">{value}</p>
                      <p className="text-xs text-muted-foreground capitalize">{key}</p>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className="w-full group"
                  onClick={() => setActiveSection(feature.section)}
                >
                  Explore {feature.title}
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates across all platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 rounded-lg bg-muted/50">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <div className="flex-1">
                <p className="font-medium">New trending products discovered</p>
                <p className="text-sm text-muted-foreground">30 new products added to research database</p>
              </div>
              <p className="text-sm text-muted-foreground">2 minutes ago</p>
            </div>
            <div className="flex items-center space-x-4 p-4 rounded-lg bg-muted/50">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <div className="flex-1">
                <p className="font-medium">Campaign performance optimized</p>
                <p className="text-sm text-muted-foreground">3 campaigns automatically optimized for better ROI</p>
              </div>
              <p className="text-sm text-muted-foreground">15 minutes ago</p>
            </div>
            <div className="flex items-center space-x-4 p-4 rounded-lg bg-muted/50">
              <div className="h-2 w-2 rounded-full bg-purple-500" />
              <div className="flex-1">
                <p className="font-medium">Sales sequence completed</p>
                <p className="text-sm text-muted-foreground">12 prospects moved to qualified status</p>
              </div>
              <p className="text-sm text-muted-foreground">1 hour ago</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
