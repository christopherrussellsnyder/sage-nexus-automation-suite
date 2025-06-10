
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Target, Users, DollarSign, TrendingUp, Download, Copy } from 'lucide-react';

interface CampaignData {
  clientName: string;
  industry: string;
  objectives: string[];
  targetAudience: string;
  budget: number;
  duration: string;
  geographic: string;
  keyMessages: string;
  competitors: string;
}

interface CampaignResultsProps {
  campaignData: CampaignData;
  onClose: () => void;
}

const CampaignResults = ({ campaignData, onClose }: CampaignResultsProps) => {
  const campaignStrategy = {
    overview: `Complete marketing campaign strategy for ${campaignData.clientName} in the ${campaignData.industry} industry`,
    targetingStrategy: {
      primaryAudience: campaignData.targetAudience,
      demographics: 'Ages 25-45, Urban professionals, College-educated',
      psychographics: 'Tech-savvy, efficiency-focused, growth-minded',
      platforms: ['Facebook', 'LinkedIn', 'Google Ads', 'Email Marketing']
    },
    contentStrategy: [
      {
        platform: 'Facebook',
        content: 'Engaging video content showcasing success stories and client testimonials',
        frequency: 'Daily posts, 3x weekly video content'
      },
      {
        platform: 'LinkedIn',
        content: 'Professional thought leadership articles and industry insights',
        frequency: '3x weekly posts, weekly article'
      },
      {
        platform: 'Google Ads',
        content: 'Targeted search ads focusing on key pain points and solutions',
        frequency: 'Continuous with A/B testing'
      },
      {
        platform: 'Email',
        content: 'Nurture sequences with educational content and case studies',
        frequency: '2x weekly newsletters, automated sequences'
      }
    ],
    budgetAllocation: [
      { platform: 'Facebook Ads', amount: Math.round(campaignData.budget * 0.3), percentage: 30 },
      { platform: 'Google Ads', amount: Math.round(campaignData.budget * 0.35), percentage: 35 },
      { platform: 'LinkedIn Ads', amount: Math.round(campaignData.budget * 0.25), percentage: 25 },
      { platform: 'Creative & Tools', amount: Math.round(campaignData.budget * 0.1), percentage: 10 }
    ],
    kpis: [
      { metric: 'Lead Generation', target: '500+ qualified leads', tracking: 'CRM integration' },
      { metric: 'Cost Per Lead', target: `$${Math.round(campaignData.budget / 500)}`, tracking: 'Platform analytics' },
      { metric: 'Conversion Rate', target: '8-12%', tracking: 'Landing page analytics' },
      { metric: 'ROI', target: '300%+', tracking: 'Revenue attribution' }
    ]
  };

  const exportCampaign = () => {
    const content = `
MARKETING CAMPAIGN STRATEGY
Client: ${campaignData.clientName}
Industry: ${campaignData.industry}
Budget: $${campaignData.budget}
Duration: ${campaignData.duration}

TARGETING STRATEGY:
- Primary Audience: ${campaignStrategy.targetingStrategy.primaryAudience}
- Demographics: ${campaignStrategy.targetingStrategy.demographics}
- Psychographics: ${campaignStrategy.targetingStrategy.psychographics}
- Platforms: ${campaignStrategy.targetingStrategy.platforms.join(', ')}

BUDGET ALLOCATION:
${campaignStrategy.budgetAllocation.map(item => `- ${item.platform}: $${item.amount} (${item.percentage}%)`).join('\n')}

CONTENT STRATEGY:
${campaignStrategy.contentStrategy.map(item => `
${item.platform}:
- Content: ${item.content}
- Frequency: ${item.frequency}
`).join('\n')}

KEY PERFORMANCE INDICATORS:
${campaignStrategy.kpis.map(kpi => `- ${kpi.metric}: ${kpi.target} (${kpi.tracking})`).join('\n')}
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${campaignData.clientName}-campaign-strategy.txt`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Campaign Strategy Generated</span>
              </CardTitle>
              <CardDescription>{campaignStrategy.overview}</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={exportCampaign}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Targeting Strategy */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Targeting Strategy</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">Primary Audience</h4>
                  <p className="text-sm text-muted-foreground">{campaignStrategy.targetingStrategy.primaryAudience}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">Demographics</h4>
                  <p className="text-sm text-muted-foreground">{campaignStrategy.targetingStrategy.demographics}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">Psychographics</h4>
                  <p className="text-sm text-muted-foreground">{campaignStrategy.targetingStrategy.psychographics}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">Platforms</h4>
                  <div className="flex flex-wrap gap-1">
                    {campaignStrategy.targetingStrategy.platforms.map((platform, index) => (
                      <Badge key={index} variant="secondary">{platform}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Budget Allocation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Budget Allocation</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {campaignStrategy.budgetAllocation.map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{item.platform}</h4>
                        <p className="text-2xl font-bold text-green-600">${item.amount}</p>
                      </div>
                      <Badge variant="outline">{item.percentage}%</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Content Strategy */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Content Strategy</h3>
            <div className="space-y-3">
              {campaignStrategy.contentStrategy.map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">{item.platform}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{item.content}</p>
                    <Badge variant="outline">{item.frequency}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* KPIs */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Key Performance Indicators</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {campaignStrategy.kpis.map((kpi, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <h4 className="font-medium">{kpi.metric}</h4>
                    <p className="text-lg font-semibold text-blue-600">{kpi.target}</p>
                    <p className="text-xs text-muted-foreground">{kpi.tracking}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignResults;
