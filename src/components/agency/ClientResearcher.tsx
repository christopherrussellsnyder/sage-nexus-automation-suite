
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Search, Building, User, Globe, TrendingUp, DollarSign, Users, Brain, Target, Lightbulb } from 'lucide-react';

interface ClientData {
  name: string;
  company: string;
  linkedinUrl: string;
  companyWebsite: string;
  industry: string;
  location: string;
}

interface ClientInsights {
  score: number;
  companySize: string;
  revenue: string;
  techStack: string[];
  challengeAreas: string[];
  opportunitySignals: string[];
  keyDecisionMakers: string[];
  competitorAnalysis: string[];
  marketingChannels: string[];
  budgetIndicators: string[];
}

interface ClientResearcherProps {
  onResearch?: (data: ClientData) => void;
  isResearching?: boolean;
  progress?: number;
  insights?: ClientInsights;
}

const ClientResearcher = ({ onResearch = () => {}, isResearching = false, progress = 0, insights }: ClientResearcherProps) => {
  const [formData, setFormData] = useState<ClientData>({
    name: '',
    company: '',
    linkedinUrl: '',
    companyWebsite: '',
    industry: '',
    location: ''
  });

  const [localResearching, setLocalResearching] = useState(false);
  const [localProgress, setLocalProgress] = useState(0);
  const [localInsights, setLocalInsights] = useState<ClientInsights | null>(null);

  const updateField = (field: keyof ClientData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Start local research simulation
    setLocalResearching(true);
    setLocalProgress(0);
    setLocalInsights(null);

    // Simulate research progress
    const progressInterval = setInterval(() => {
      setLocalProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setLocalResearching(false);
          
          // Generate sample insights
          const sampleInsights: ClientInsights = {
            score: Math.floor(Math.random() * 30) + 70, // 70-100
            companySize: ['Startup (1-10)', 'Small (11-50)', 'Medium (51-200)', 'Large (201-1000)', 'Enterprise (1000+)'][Math.floor(Math.random() * 5)],
            revenue: ['Under $1M', '$1M-$5M', '$5M-$20M', '$20M-$100M', '$100M+'][Math.floor(Math.random() * 5)],
            techStack: [
              'WordPress', 'Shopify', 'Salesforce', 'HubSpot', 'Google Analytics', 
              'Facebook Pixel', 'Mailchimp', 'Slack', 'Zoom', 'Microsoft 365'
            ].slice(0, Math.floor(Math.random() * 6) + 3),
            challengeAreas: [
              'Lead generation and qualification',
              'Customer retention and loyalty',
              'Brand awareness and positioning',
              'Digital marketing ROI measurement',
              'Sales and marketing alignment',
              'Content marketing strategy',
              'Social media engagement'
            ].slice(0, Math.floor(Math.random() * 4) + 2),
            opportunitySignals: [
              'Recently posted job openings for marketing roles',
              'Increased social media activity in past 3 months',
              'Mentioned scaling challenges in recent interviews',
              'Launched new product lines requiring marketing support',
              'Competitor analysis shows gaps in digital presence',
              'Recent funding round indicates growth investment'
            ].slice(0, Math.floor(Math.random() * 3) + 2),
            keyDecisionMakers: [
              `${formData.name} - Primary Contact`,
              'Chief Marketing Officer',
              'VP of Growth',
              'Digital Marketing Manager',
              'CEO/Founder'
            ].slice(0, Math.floor(Math.random() * 3) + 2),
            competitorAnalysis: [
              'Competitors using aggressive PPC strategies',
              'Industry trend toward influencer marketing',
              'Gap in content marketing compared to top competitors',
              'Opportunity to dominate local SEO space',
              'Social media presence below industry average'
            ].slice(0, Math.floor(Math.random() * 3) + 2),
            marketingChannels: [
              'Google Ads (active campaigns)',
              'Facebook/Meta advertising',
              'LinkedIn marketing',
              'Email marketing automation',
              'Content marketing/SEO',
              'Trade publications',
              'Industry events and conferences'
            ].slice(0, Math.floor(Math.random() * 4) + 3),
            budgetIndicators: [
              'Current marketing spend estimated at $10K-$25K/month',
              'Recent increase in digital advertising activity',
              'Investment in marketing automation tools',
              'Hiring indicates budget allocation for marketing growth'
            ].slice(0, Math.floor(Math.random() * 2) + 2)
          };
          
          setLocalInsights(sampleInsights);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);

    onResearch(formData);
  };

  const isFormValid = formData.name && formData.company && (formData.linkedinUrl || formData.companyWebsite);
  const currentInsights = insights || localInsights;
  const currentResearching = isResearching || localResearching;
  const currentProgress = progress || localProgress;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'High Potential';
    if (score >= 60) return 'Medium Potential';
    return 'Low Potential';
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Research Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Client Research Engine</span>
          </CardTitle>
          <CardDescription>
            AI-powered client research with insights for agency partnerships
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Client Contact Name *</Label>
              <Input
                id="name"
                placeholder="John Smith"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company Name *</Label>
              <Input
                id="company"
                placeholder="Acme Corp"
                value={formData.company}
                onChange={(e) => updateField('company', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedinUrl">LinkedIn Profile</Label>
              <Input
                id="linkedinUrl"
                placeholder="https://linkedin.com/in/johnsmith"
                value={formData.linkedinUrl}
                onChange={(e) => updateField('linkedinUrl', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyWebsite">Company Website</Label>
              <Input
                id="companyWebsite"
                placeholder="https://acmecorp.com"
                value={formData.companyWebsite}
                onChange={(e) => updateField('companyWebsite', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                placeholder="Technology, Healthcare, Manufacturing, etc."
                value={formData.industry}
                onChange={(e) => updateField('industry', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="San Francisco, CA"
                value={formData.location}
                onChange={(e) => updateField('location', e.target.value)}
              />
            </div>

            {currentResearching && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Researching client...</span>
                  <span>{Math.round(currentProgress)}%</span>
                </div>
                <Progress value={currentProgress} />
                <div className="text-xs text-muted-foreground">
                  Analyzing company data, market position, digital presence, and opportunity indicators...
                </div>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              disabled={!isFormValid || currentResearching}
            >
              <Brain className="h-4 w-4 mr-2" />
              {currentResearching ? 'Researching...' : 'Research Client'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Research Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Client Insights</span>
          </CardTitle>
          <CardDescription>
            AI-generated insights and partnership potential analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          {currentInsights ? (
            <div className="space-y-6">
              {/* Partnership Score */}
              <div className="text-center p-4 border rounded-lg">
                <div className={`text-4xl font-bold ${getScoreColor(currentInsights.score)}`}>
                  {currentInsights.score}
                </div>
                <div className="text-sm text-muted-foreground">Partnership Score</div>
                <Badge className="mt-2" variant={currentInsights.score >= 80 ? 'default' : 'secondary'}>
                  {getScoreLabel(currentInsights.score)}
                </Badge>
                <Progress value={currentInsights.score} className="mt-2" />
              </div>

              {/* Company Info */}
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center space-x-2">
                  <Building className="h-4 w-4" />
                  <span>Company Profile</span>
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Size:</span>
                    <div className="font-medium">{currentInsights.companySize}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Revenue:</span>
                    <div className="font-medium">{currentInsights.revenue}</div>
                  </div>
                </div>
              </div>

              {/* Technology Stack */}
              <div className="space-y-2">
                <h4 className="font-semibold">Current Technology Stack</h4>
                <div className="flex flex-wrap gap-1">
                  {currentInsights.techStack.map((tech, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Challenge Areas */}
              <div className="space-y-2">
                <h4 className="font-semibold text-orange-600">Challenge Areas</h4>
                <ul className="text-sm space-y-1">
                  {currentInsights.challengeAreas.map((challenge, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2" />
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Opportunity Signals */}
              <div className="space-y-2">
                <h4 className="font-semibold text-green-600">Opportunity Signals</h4>
                <ul className="text-sm space-y-1">
                  {currentInsights.opportunitySignals.map((signal, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2" />
                      <span>{signal}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Decision Makers */}
              <div className="space-y-2">
                <h4 className="font-semibold">Key Decision Makers</h4>
                <div className="space-y-1">
                  {currentInsights.keyDecisionMakers.map((person, index) => (
                    <div key={index} className="text-sm flex items-center space-x-2">
                      <User className="h-3 w-3" />
                      <span>{person}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Marketing Channels */}
              <div className="space-y-2">
                <h4 className="font-semibold">Current Marketing Channels</h4>
                <div className="flex flex-wrap gap-1">
                  {currentInsights.marketingChannels.map((channel, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {channel}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Budget Indicators */}
              <div className="space-y-2">
                <h4 className="font-semibold text-blue-600">Budget Indicators</h4>
                <ul className="text-sm space-y-1">
                  {currentInsights.budgetIndicators.map((indicator, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <DollarSign className="h-3 w-3 text-blue-500 mt-0.5" />
                      <span>{indicator}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Competitive Analysis */}
              <div className="space-y-2">
                <h4 className="font-semibold">Competitive Landscape</h4>
                <ul className="text-sm space-y-1">
                  {currentInsights.competitorAnalysis.map((analysis, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Target className="h-3 w-3 text-purple-500 mt-0.5" />
                      <span>{analysis}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Research Data</h3>
              <p className="text-muted-foreground">
                Enter client information and click "Research Client" to get AI-powered insights for your agency partnership
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientResearcher;
