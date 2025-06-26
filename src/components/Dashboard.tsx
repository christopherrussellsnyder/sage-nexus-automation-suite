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
  Crown,
  BarChart3,
  Clock,
  DollarSign
} from "lucide-react";
import { useCopySettings } from '@/hooks/useCopySettings';

interface DashboardProps {
  setActiveSection: (section: 'overview' | 'ecommerce' | 'agency' | 'sales') => void;
}

const Dashboard = ({ setActiveSection }: DashboardProps) => {
  const copy = useCopySettings();

  const features = [
    {
      section: 'ecommerce' as const,
      title: copy.ecommerceTitle,
      description: copy.ecommerceDescription,
      icon: ShoppingCart,
      color: 'bg-primary',
      features: [copy.ecommerceFeature1, copy.ecommerceFeature2, copy.ecommerceFeature3, copy.ecommerceFeature4],
      stats: { [copy.ecommerceStat1Key]: copy.ecommerceStat1Value, [copy.ecommerceStat2Key]: copy.ecommerceStat2Value }
    },
    {
      section: 'agency' as const,
      title: copy.agencyTitle,
      description: copy.agencyDescription,
      icon: Users,
      color: 'bg-accent',
      features: [copy.agencyFeature1, copy.agencyFeature2, copy.agencyFeature3, copy.agencyFeature4],
      stats: { [copy.agencyStat1Key]: copy.agencyStat1Value, [copy.agencyStat2Key]: copy.agencyStat2Value }
    },
    {
      section: 'sales' as const,
      title: copy.salesTitle,
      description: copy.salesDescription,
      icon: Phone,
      color: 'bg-primary',
      features: [copy.salesFeature1, copy.salesFeature2, copy.salesFeature3, copy.salesFeature4],
      stats: { [copy.salesStat1Key]: copy.salesStat1Value, [copy.salesStat2Key]: copy.salesStat2Value }
    }
  ];

  const quickStats = [
    {
      title: copy.stat1Title,
      value: copy.stat1Value,
      description: copy.stat1Description,
      icon: DollarSign,
      color: 'text-primary'
    },
    {
      title: copy.stat2Title,
      value: copy.stat2Value,
      description: copy.stat2Description,
      icon: TrendingUp,
      color: 'text-accent'
    },
    {
      title: copy.stat3Title,
      value: copy.stat3Value,
      description: copy.stat3Description,
      icon: Users,
      color: 'text-primary'
    },
    {
      title: copy.stat4Title,
      value: copy.stat4Value,
      description: copy.stat4Description,
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
            {copy.overviewHeroTitle}
          </h1>
        </div>
        <h2 className="text-3xl font-bold text-foreground">{copy.overviewHeroSubtitle}</h2>
        <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
          {copy.overviewHeroDescription}
        </p>
        <div className="flex items-center justify-center space-x-4 pt-4">
          <Badge variant="secondary" className="px-4 py-2 bg-card border-primary/20">
            <Zap className="h-4 w-4 mr-2 text-primary" />
            {copy.overviewBadge1}
          </Badge>
          <Badge variant="secondary" className="px-4 py-2 bg-card border-primary/20">
            <Target className="h-4 w-4 mr-2 text-primary" />
            {copy.overviewBadge2}
          </Badge>
          <Badge variant="secondary" className="px-4 py-2 bg-card border-primary/20">
            <Rocket className="h-4 w-4 mr-2 text-primary" />
            {copy.overviewBadge3}
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
          <h3 className="text-2xl font-bold mb-2 text-foreground">{copy.platformFeaturesTitle}</h3>
          <p className="text-muted-foreground">{copy.platformFeaturesDescription}</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-6">
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
                    {copy.exploreButton}
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
          <CardTitle className="text-center text-foreground">{copy.valuePropositionTitle}</CardTitle>
          <CardDescription className="text-center max-w-2xl mx-auto text-muted-foreground">
            {copy.valuePropositionDescription}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/20">
                <Brain className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-semibold mb-2 text-foreground">{copy.valueProposition1Title}</h4>
              <p className="text-sm text-muted-foreground">
                {copy.valueProposition1Description}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-accent/20">
                <Rocket className="h-8 w-8 text-accent" />
              </div>
              <h4 className="font-semibold mb-2 text-foreground">{copy.valueProposition2Title}</h4>
              <p className="text-sm text-muted-foreground">
                {copy.valueProposition2Description}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/20">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-semibold mb-2 text-foreground">{copy.valueProposition3Title}</h4>
              <p className="text-sm text-muted-foreground">
                {copy.valueProposition3Description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <Card className="bg-primary text-primary-foreground border-primary">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-2">{copy.ctaTitle}</h3>
          <p className="mb-6 opacity-90">
            {copy.ctaDescription}
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="secondary" size="lg" onClick={() => setActiveSection('ecommerce')} className="button-glow">
              <Crown className="h-4 w-4 mr-2" />
              {copy.ctaPrimaryButton}
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
              {copy.ctaSecondaryButton}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
