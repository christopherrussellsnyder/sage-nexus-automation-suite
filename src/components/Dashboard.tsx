
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
  Rocket,
  PenTool,
  Crown,
  BarChart3,
  Clock,
  DollarSign
} from "lucide-react";

interface DashboardProps {
  setActiveSection: (section: 'overview' | 'ecommerce' | 'agency' | 'sales' | 'copywriting') => void;
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
      stats: { stores: 12, revenue: '$45K' }
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
    },
    {
      section: 'copywriting' as const,
      title: 'AI Copywriting Suite',
      description: 'High-converting copy for websites, ads, emails, and social media',
      icon: PenTool,
      color: 'bg-orange-500',
      features: ['Website Copy', 'Ad Copy', 'Email Sequences', 'Social Content'],
      stats: { templates: 150, 'conv. rate': '400%' }
    }
  ];

  const quickStats = [
    {
      title: 'Active Projects',
      value: '24',
      description: 'Across all platforms',
      icon: BarChart3,
      color: 'text-blue-600'
    },
    {
      title: 'Time Saved',
      value: '156hrs',
      description: 'This month',
      icon: Clock,
      color: 'text-green-600'
    },
    {
      title: 'Revenue Generated',
      value: '$89K',
      description: 'Through automation',
      icon: DollarSign,
      color: 'text-purple-600'
    },
    {
      title: 'Conversion Rate',
      value: '+285%',
      description: 'Average improvement',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-12">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Brain className="h-16 w-16 text-primary" />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            Sage.ai
          </h1>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">All-in-One AI Business Automation</h2>
        <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
          Streamline your e-commerce, marketing, sales, and copywriting operations with advanced AI automation. 
          Built for entrepreneurs, agencies, and sales teams who want to scale efficiently.
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
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Platform Features */}
      <div>
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">Choose Your Automation Hub</h3>
          <p className="text-muted-foreground">Select the area where you want to start automating your business</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-6">
          {features.map((feature) => (
            <Card key={feature.section} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => setActiveSection(feature.section)}>
              <div className={`absolute top-0 left-0 w-full h-2 ${feature.color}`} />
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-lg ${feature.color} text-white`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-sm">{feature.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  {feature.features.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4 border-t flex justify-between items-center">
                  <div className="flex space-x-4">
                    {Object.entries(feature.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <p className="font-semibold text-sm">{value}</p>
                        <p className="text-xs text-muted-foreground capitalize">{key}</p>
                      </div>
                    ))}
                  </div>
                  
                  <Button size="sm" className="group">
                    Explore
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Value Proposition */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="text-center">Why Choose Sage.ai?</CardTitle>
          <CardDescription className="text-center max-w-2xl mx-auto">
            The only platform that combines e-commerce, marketing, sales, and copywriting automation in one unified system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-2">AI-Powered Intelligence</h4>
              <p className="text-sm text-muted-foreground">
                Advanced AI analyzes your business data to provide personalized automation strategies
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold mb-2">All-in-One Platform</h4>
              <p className="text-sm text-muted-foreground">
                No need for multiple tools. Everything you need to automate your business in one place
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold mb-2">Proven Results</h4>
              <p className="text-sm text-muted-foreground">
                Join thousands of businesses that have automated their operations and increased revenue
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <Card className="bg-primary text-primary-foreground">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-2">Ready to Automate Your Business?</h3>
          <p className="mb-6 opacity-90">
            Start your free trial today and see how AI can transform your operations
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="secondary" size="lg" onClick={() => setActiveSection('copywriting')}>
              <Crown className="h-4 w-4 mr-2" />
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              View Pricing
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
