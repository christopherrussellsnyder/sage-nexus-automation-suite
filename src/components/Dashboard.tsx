
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
import { useCopySettings } from '@/hooks/useCopySettings';

interface DashboardProps {
  setActiveSection: (section: 'overview' | 'ecommerce' | 'agency' | 'sales' | 'copywriting') => void;
}

const Dashboard = ({ setActiveSection }: DashboardProps) => {
  const copy = useCopySettings();

  const features = [
    {
      section: 'ecommerce' as const,
      title: copy.ecommerceTitle,
      description: copy.ecommerceDescription,
      icon: ShoppingCart,
      color: 'bg-blue-500',
      features: [copy.ecommerceFeature1, copy.ecommerceFeature2, copy.ecommerceFeature3, copy.ecommerceFeature4],
      stats: { [copy.ecommerceStat1Key]: copy.ecommerceStat1Value, [copy.ecommerceStat2Key]: copy.ecommerceStat2Value }
    },
    {
      section: 'agency' as const,
      title: copy.agencyTitle,
      description: copy.agencyDescription,
      icon: Users,
      color: 'bg-green-500',
      features: [copy.agencyFeature1, copy.agencyFeature2, copy.agencyFeature3, copy.agencyFeature4],
      stats: { [copy.agencyStat1Key]: copy.agencyStat1Value, [copy.agencyStat2Key]: copy.agencyStat2Value }
    },
    {
      section: 'sales' as const,
      title: copy.salesTitle,
      description: copy.salesDescription,
      icon: Phone,
      color: 'bg-purple-500',
      features: [copy.salesFeature1, copy.salesFeature2, copy.salesFeature3, copy.salesFeature4],
      stats: { [copy.salesStat1Key]: copy.salesStat1Value, [copy.salesStat2Key]: copy.salesStat2Value }
    },
    {
      section: 'copywriting' as const,
      title: copy.copywritingTitle,
      description: copy.copywritingDescription,
      icon: PenTool,
      color: 'bg-orange-500',
      features: [copy.copywritingFeature1, copy.copywritingFeature2, copy.copywritingFeature3, copy.copywritingFeature4],
      stats: { [copy.copywritingStat1Key]: copy.copywritingStat1Value, [copy.copywritingStat2Key]: copy.copywritingStat2Value }
    }
  ];

  const quickStats = [
    {
      title: copy.stat1Title,
      value: copy.stat1Value,
      description: copy.stat1Description,
      icon: BarChart3,
      color: 'text-blue-600'
    },
    {
      title: copy.stat2Title,
      value: copy.stat2Value,
      description: copy.stat2Description,
      icon: Clock,
      color: 'text-green-600'
    },
    {
      title: copy.stat3Title,
      value: copy.stat3Value,
      description: copy.stat3Description,
      icon: DollarSign,
      color: 'text-purple-600'
    },
    {
      title: copy.stat4Title,
      value: copy.stat4Value,
      description: copy.stat4Description,
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
            {copy.overviewHeroTitle}
          </h1>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">{copy.overviewHeroSubtitle}</h2>
        <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
          {copy.overviewHeroDescription}
        </p>
        <div className="flex items-center justify-center space-x-4 pt-4">
          <Badge variant="secondary" className="px-4 py-2">
            <Zap className="h-4 w-4 mr-2" />
            {copy.overviewBadge1}
          </Badge>
          <Badge variant="secondary" className="px-4 py-2">
            <Target className="h-4 w-4 mr-2" />
            {copy.overviewBadge2}
          </Badge>
          <Badge variant="secondary" className="px-4 py-2">
            <Rocket className="h-4 w-4 mr-2" />
            {copy.overviewBadge3}
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
          <h3 className="text-2xl font-bold mb-2">{copy.platformFeaturesTitle}</h3>
          <p className="text-muted-foreground">{copy.platformFeaturesDescription}</p>
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
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="text-center">{copy.valuePropositionTitle}</CardTitle>
          <CardDescription className="text-center max-w-2xl mx-auto">
            {copy.valuePropositionDescription}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-2">{copy.valueProposition1Title}</h4>
              <p className="text-sm text-muted-foreground">
                {copy.valueProposition1Description}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold mb-2">{copy.valueProposition2Title}</h4>
              <p className="text-sm text-muted-foreground">
                {copy.valueProposition2Description}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold mb-2">{copy.valueProposition3Title}</h4>
              <p className="text-sm text-muted-foreground">
                {copy.valueProposition3Description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <Card className="bg-primary text-primary-foreground">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-2">{copy.ctaTitle}</h3>
          <p className="mb-6 opacity-90">
            {copy.ctaDescription}
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="secondary" size="lg" onClick={() => setActiveSection('copywriting')}>
              <Crown className="h-4 w-4 mr-2" />
              {copy.ctaPrimaryButton}
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              {copy.ctaSecondaryButton}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
