
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  PenTool, 
  Target, 
  BarChart3,
  RefreshCw,
  Zap,
  Brain,
  MessageSquare,
  FileText,
  Megaphone,
  Mail,
  Globe,
  Share2,
  CheckCircle,
  TrendingUp,
  Eye,
  Sparkles
} from "lucide-react";
import CopyGenerationHub from './copywriting/CopyGenerationHub';
import CompetitiveIntelligencePanel from './copywriting/CompetitiveIntelligencePanel';

const CopywritingDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'website' | 'ads' | 'emails' | 'social' | 'intelligence'>('overview');

  const copyTypes = [
    {
      title: 'Website Copy',
      description: 'Headlines, landing pages, product descriptions, and more',
      icon: Globe,
      features: ['Headlines', 'Product descriptions', 'Value propositions', 'CTAs'],
      color: 'bg-blue-500'
    },
    {
      title: 'Ad Copy',
      description: 'High-converting ads for all major platforms',
      icon: Megaphone,
      features: ['Facebook ads', 'Google ads', 'Instagram ads', 'TikTok ads'],
      color: 'bg-green-500'
    },
    {
      title: 'Email Marketing',
      description: 'Complete email sequences that convert',
      icon: Mail,
      features: ['Welcome series', 'Sales sequences', 'Newsletter content', 'Subject lines'],
      color: 'bg-purple-500'
    },
    {
      title: 'Social Content',
      description: 'Engaging posts for all social platforms',
      icon: Share2,
      features: ['Post captions', 'Story content', 'Video scripts', 'Hashtag strategies'],
      color: 'bg-orange-500'
    }
  ];

  const intelligenceFeatures = [
    {
      title: 'AI-Powered Copy Generation',
      description: 'Advanced AI trained on high-converting copy from your specific niche',
      features: ['Niche-specific training', 'Psychology triggers', 'Proven frameworks'],
      icon: Brain
    },
    {
      title: 'Multiple Copy Types',
      description: 'Generate copy for websites, ads, emails, and social media',
      features: ['Website copy', 'Ad copy', 'Email sequences', 'Social content'],
      icon: FileText
    },
    {
      title: '5 Variations Per Request',
      description: 'Get multiple options to choose from for every copy request',
      features: ['Multiple options', 'A/B test ready', 'Endless regeneration'],
      icon: Zap
    },
    {
      title: 'Competitive Intelligence',
      description: 'Copy insights based on what\'s working in your industry',
      features: ['Industry analysis', 'Competitor insights', 'Market trends'],
      icon: TrendingUp
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">AI Copywriting Suite</h2>
          <p className="text-muted-foreground">Niche-specific copy generation powered by competitive intelligence</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={activeTab === 'overview' ? 'default' : 'outline'}
            onClick={() => setActiveTab('overview')}
            className="flex items-center space-x-2"
          >
            <Eye className="h-4 w-4" />
            <span>Overview</span>
          </Button>
          <Button
            variant={activeTab === 'website' ? 'default' : 'outline'}
            onClick={() => setActiveTab('website')}
            className="flex items-center space-x-2"
          >
            <Globe className="h-4 w-4" />
            <span>Website</span>
          </Button>
          <Button
            variant={activeTab === 'ads' ? 'default' : 'outline'}
            onClick={() => setActiveTab('ads')}
            className="flex items-center space-x-2"
          >
            <Megaphone className="h-4 w-4" />
            <span>Ads</span>
          </Button>
          <Button
            variant={activeTab === 'emails' ? 'default' : 'outline'}
            onClick={() => setActiveTab('emails')}
            className="flex items-center space-x-2"
          >
            <Mail className="h-4 w-4" />
            <span>Emails</span>
          </Button>
          <Button
            variant={activeTab === 'social' ? 'default' : 'outline'}
            onClick={() => setActiveTab('social')}
            className="flex items-center space-x-2"
          >
            <Share2 className="h-4 w-4" />
            <span>Social</span>
          </Button>
          <Button
            variant={activeTab === 'intelligence' ? 'default' : 'outline'}
            onClick={() => setActiveTab('intelligence')}
            className="flex items-center space-x-2"
          >
            <Brain className="h-4 w-4" />
            <span>Intelligence</span>
          </Button>
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Main Feature Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {copyTypes.map((type, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${type.color} text-white`}>
                      <type.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl">{type.title}</CardTitle>
                      <CardDescription className="mt-2">{type.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {type.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button 
                    className="w-full mt-4" 
                    onClick={() => setActiveTab(type.title.toLowerCase().split(' ')[0] as any)}
                  >
                    Generate {type.title}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Intelligence Features */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Advanced Features</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {intelligenceFeatures.map((feature, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start space-x-3">
                      <feature.icon className="h-6 w-6 text-blue-500 mt-1" />
                      <div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                        <CardDescription className="mt-1">{feature.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {feature.features.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Copy Generation Tabs */}
      {(activeTab === 'website' || activeTab === 'ads' || activeTab === 'emails' || activeTab === 'social') && (
        <CopyGenerationHub activeType={activeTab} />
      )}

      {/* Intelligence Tab */}
      {activeTab === 'intelligence' && (
        <CompetitiveIntelligencePanel />
      )}
    </div>
  );
};

export default CopywritingDashboard;
