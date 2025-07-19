
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Phone, 
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
  DollarSign,
  Mail,
  FileText
} from "lucide-react";
import { useCopySettings } from '@/hooks/useCopySettings';

interface DashboardProps {
  setActiveSection: (section: 'overview' | 'agency' | 'sales' | 'copywriting') => void;
}

const Dashboard = ({ setActiveSection }: DashboardProps) => {
  const copy = useCopySettings();

  const features = [
    {
      section: 'copywriting' as const,
      title: 'AI Copywriting Suite',
      description: 'Generate high-converting copy for ads, emails, websites, and social media',
      icon: PenTool,
      color: 'bg-primary',
      features: ['Ad Copy Generation', 'Email Templates', 'Website Copy', 'Social Content'],
      stats: { 'Templates': '500+', 'Conversion': '3.2x' }
    },
    {
      section: 'agency' as const,
      title: 'Agency Scale System',
      description: 'Complete lead management, scoring, and campaign automation',
      icon: Users,
      color: 'bg-accent',
      features: ['Lead Management', 'Lead Scoring', 'Campaign Tracking', 'Client Analytics'],
      stats: { 'Leads': '10k+', 'Conversion': '45%' }
    },
    {
      section: 'sales' as const,
      title: 'Sales Automation Hub',
      description: 'Prospect research, email sequences, and meeting scheduling',
      icon: Phone,
      color: 'bg-primary',
      features: ['Prospect Research', 'Email Sequences', 'Meeting Scheduler', 'Deal Tracking'],
      stats: { 'Prospects': '5k+', 'Close Rate': '28%' }
    }
  ];

  const quickStats = [
    {
      title: 'Revenue Generated',
      value: '$2.4M+',
      description: 'By our AI-powered campaigns',
      icon: DollarSign,
      color: 'text-primary'
    },
    {
      title: 'Conversion Rate',
      value: '+185%',
      description: 'Average improvement',
      icon: TrendingUp,
      color: 'text-accent'
    },
    {
      title: 'Active Users',
      value: '25,000+',
      description: 'Marketing professionals',
      icon: Users,
      color: 'text-primary'
    },
    {
      title: 'Templates Generated',
      value: '1M+',
      description: 'High-converting copies',
      icon: BarChart3,
      color: 'text-accent'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-12">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Brain className="h-16 w-16 text-primary" />
          <h1 className="text-5xl font-bold text-gradient">
            Sage.ai
          </h1>
        </div>
        <h2 className="text-3xl font-bold text-foreground">AI-Powered Marketing & Sales Platform</h2>
        <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
          Transform your business with intelligent copywriting, automated lead management, and powerful sales tools. 
          Generate high-converting content, manage prospects, and scale your operations with AI precision.
        </p>
        <div className="flex items-center justify-center space-x-4 pt-4">
          <Badge variant="secondary" className="px-4 py-2 bg-card border-primary/20">
            <Zap className="h-4 w-4 mr-2 text-primary" />
            AI-Powered Copy
          </Badge>
          <Badge variant="secondary" className="px-4 py-2 bg-card border-primary/20">
            <Target className="h-4 w-4 mr-2 text-primary" />
            Lead Automation
          </Badge>
          <Badge variant="secondary" className="px-4 py-2 bg-card border-primary/20">
            <Rocket className="h-4 w-4 mr-2 text-primary" />
            Sales Optimization
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index} className="card-hover bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
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
          <h3 className="text-2xl font-bold mb-2 text-foreground">Comprehensive Marketing & Sales Solutions</h3>
          <p className="text-muted-foreground">Everything you need to generate leads, create compelling copy, and close more deals</p>
        </div>
        
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card 
              key={feature.section} 
              className="relative overflow-hidden group card-hover cursor-pointer bg-card border-border" 
              onClick={() => setActiveSection(feature.section)}
            >
              <div className={`absolute top-0 left-0 w-full h-2 ${feature.color}`} />
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-lg ${feature.color} text-primary-foreground`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">{feature.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  {feature.features.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4 border-t border-border flex justify-between items-center">
                  <div className="flex space-x-4">
                    {Object.entries(feature.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <p className="font-semibold text-sm text-primary">{value}</p>
                        <p className="text-xs text-muted-foreground capitalize">{key}</p>
                      </div>
                    ))}
                  </div>
                  
                  <Button size="sm" className="group button-glow">
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
      <Card className="bg-gradient-to-r from-card to-card/80 border-primary/20 card-hover">
        <CardHeader>
          <CardTitle className="text-center text-foreground">Why Choose Sage.ai for Your Business?</CardTitle>
          <CardDescription className="text-center max-w-2xl mx-auto text-muted-foreground">
            Leverage AI-powered tools to streamline your marketing operations, generate compelling content, 
            and convert more prospects into paying customers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/20">
                <Brain className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-semibold mb-2 text-foreground">AI-Driven Intelligence</h4>
              <p className="text-sm text-muted-foreground">
                Advanced algorithms analyze top-performing content to create personalized, high-converting copy for your specific audience
              </p>
            </div>
            <div className="text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-accent/20">
                <Rocket className="h-8 w-8 text-accent" />
              </div>
              <h4 className="font-semibold mb-2 text-foreground">Automated Workflows</h4>
              <p className="text-sm text-muted-foreground">
                Streamline your entire sales and marketing process with automated lead scoring, email sequences, and prospect research
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/20">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-semibold mb-2 text-foreground">Proven Results</h4>
              <p className="text-sm text-muted-foreground">
                Our AI-generated content delivers 185% better conversion rates based on analysis of thousands of successful campaigns
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <Card className="bg-primary text-primary-foreground border-primary">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-2">Ready to Transform Your Marketing?</h3>
          <p className="mb-6 opacity-90">
            Join thousands of marketers and sales professionals who trust Sage.ai to generate high-converting content and automate their workflows
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="secondary" size="lg" onClick={() => setActiveSection('copywriting')} className="button-glow">
              <Crown className="h-4 w-4 mr-2" />
              Start Creating Copy
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
              View All Features
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
