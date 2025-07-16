import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Users, Zap, Target } from 'lucide-react';

interface CopywritingRecommendationsProps {
  data: any;
  businessType: string;
}

const CopywritingRecommendations = ({ data, businessType }: CopywritingRecommendationsProps) => {
  const copyData = Array.isArray(data.copywritingRecommendations) ? data.copywritingRecommendations : [];
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-primary" />
          <CardTitle>AI Copywriting Recommendations</CardTitle>
        </div>
        <CardDescription>
          AI-powered copy optimization strategies and recommendations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {businessType === 'agency' || businessType === 'copywriting' ? (
          <Tabs defaultValue="user" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="user">
                <Users className="h-4 w-4 mr-2" />
                For Your Business
              </TabsTrigger>
              <TabsTrigger value="client">
                <Target className="h-4 w-4 mr-2" />
                For Your Clients
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="user" className="space-y-4">
              <h4 className="font-semibold">Copy for Client Acquisition</h4>
              <div className="space-y-4">
                {copyData.filter((item: any) => item.audience === 'user' || !item.audience).map((recommendation: any, index: number) => (
                  <CopyRecommendationCard key={`user-${index}`} recommendation={recommendation} />
                ))}
                {copyData.length === 0 && (
                  <DefaultCopyRecommendations businessType={businessType} audience="user" />
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="client" className="space-y-4">
              <h4 className="font-semibold">Copy for Client Campaigns</h4>
              <div className="space-y-4">
                {copyData.filter((item: any) => item.audience === 'client').map((recommendation: any, index: number) => (
                  <CopyRecommendationCard key={`client-${index}`} recommendation={recommendation} />
                ))}
                {copyData.filter((item: any) => item.audience === 'client').length === 0 && (
                  <DefaultCopyRecommendations businessType={businessType} audience="client" />
                )}
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="space-y-4">
            {copyData.map((recommendation: any, index: number) => (
              <CopyRecommendationCard key={index} recommendation={recommendation} />
            ))}
            {copyData.length === 0 && (
              <DefaultCopyRecommendations businessType={businessType} audience="user" />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const CopyRecommendationCard = ({ recommendation }: { recommendation: any }) => (
  <div className="border rounded-lg p-4 space-y-3">
    <div className="flex justify-between items-start">
      <h5 className="font-medium">{recommendation.copyType || recommendation.title}</h5>
      <Badge variant="outline">{recommendation.priority || 'High'}</Badge>
    </div>
    
    {recommendation.recommendations && (
      <div className="space-y-2">
        <h6 className="text-sm font-medium text-muted-foreground">Recommendations:</h6>
        <ul className="text-sm space-y-1">
          {recommendation.recommendations.map((rec: string, i: number) => (
            <li key={i} className="flex items-start">
              <span className="text-primary mr-2">•</span>
              {rec}
            </li>
          ))}
        </ul>
      </div>
    )}
    
    {recommendation.emotionalTriggers && (
      <div className="space-y-2">
        <h6 className="text-sm font-medium text-muted-foreground">Emotional Triggers:</h6>
        <div className="flex flex-wrap gap-1">
          {recommendation.emotionalTriggers.map((trigger: string, i: number) => (
            <Badge key={i} variant="secondary" className="text-xs">
              {trigger}
            </Badge>
          ))}
        </div>
      </div>
    )}
    
    {recommendation.examples && recommendation.examples.length > 0 && (
      <div className="space-y-2">
        <h6 className="text-sm font-medium text-muted-foreground">Examples:</h6>
        {recommendation.examples.map((example: any, i: number) => (
          <div key={i} className="bg-muted/50 p-3 rounded text-xs space-y-2">
            <div>
              <span className="font-medium">Before:</span> {example.before}
            </div>
            <div>
              <span className="font-medium">After:</span> {example.after}
            </div>
            <div className="text-muted-foreground">
              <span className="font-medium">Improvement:</span> {example.improvement}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

const DefaultCopyRecommendations = ({ businessType, audience }: { businessType: string; audience: string }) => {
  const recommendations = getDefaultRecommendations(businessType, audience);
  
  return (
    <div className="space-y-4">
      {recommendations.map((rec, index) => (
        <CopyRecommendationCard key={index} recommendation={rec} />
      ))}
    </div>
  );
};

const getDefaultRecommendations = (businessType: string, audience: string) => {
  if (businessType === 'sales') {
    return [
      {
        copyType: 'Email Sequences',
        recommendations: [
          'Use value-first approach in initial outreach',
          'Include specific metrics and results in follow-ups',
          'Create urgency with limited-time offers',
          'Personalize based on prospect research'
        ],
        emotionalTriggers: ['urgency', 'social proof', 'fear of missing out'],
        examples: [{
          before: 'Hi, I wanted to reach out about our service.',
          after: 'Hi [Name], noticed your company grew 40% last year. Here\'s how we helped similar companies scale even faster...',
          improvement: 'Personalized opening with specific research and immediate value proposition'
        }]
      },
      {
        copyType: 'Phone Call Scripts',
        recommendations: [
          'Start with permission-based opening',
          'Lead with customer pain points',
          'Use storytelling to build rapport',
          'End with clear next steps'
        ],
        emotionalTriggers: ['curiosity', 'credibility', 'trust'],
        examples: [{
          before: 'Hi, do you have time to talk about our product?',
          after: 'Hi [Name], I have a 2-minute idea that helped [Similar Company] increase revenue by 30%. Is this a bad time?',
          improvement: 'Permission-based approach with specific social proof and time boundary'
        }]
      }
    ];
  }

  if (businessType === 'copywriting') {
    if (audience === 'user') {
      return [
        {
          copyType: 'Client Acquisition Copy',
          recommendations: [
            'Showcase specific results and metrics',
            'Use before/after case studies',
            'Address common client pain points',
            'Include testimonials and social proof'
          ],
          emotionalTriggers: ['credibility', 'results', 'transformation'],
          examples: [{
            before: 'I write good copy for businesses.',
            after: 'I helped [Client] increase email open rates by 73% and generate $50K in additional revenue with one email sequence.',
            improvement: 'Specific metrics and results with social proof'
          }]
        }
      ];
    } else {
      return [
        {
          copyType: 'Client Campaign Copy',
          recommendations: [
            'Research target audience pain points deeply',
            'Use industry-specific language and terms',
            'Include compelling headlines and hooks',
            'Optimize for conversion at every touchpoint'
          ],
          emotionalTriggers: ['desire', 'urgency', 'social proof'],
          examples: [{
            before: 'Buy our product today.',
            after: 'Join 10,000+ [Industry] professionals who increased productivity by 40% in just 30 days.',
            improvement: 'Social proof with specific metrics and timeframe'
          }]
        }
      ];
    }
  }

  // Default recommendations for ecommerce and agency
  return [
    {
      copyType: 'Ad Copy Optimization',
      recommendations: [
        'Test emotional vs rational appeals',
        'Use power words and action verbs',
        'Include specific benefits over features',
        'Create compelling calls-to-action'
      ],
      emotionalTriggers: ['desire', 'urgency', 'exclusivity'],
      examples: [{
        before: 'Quality products at great prices.',
        after: 'Save 40% on premium [Product] - Limited time offer for new customers only.',
        improvement: 'Specific discount with urgency and exclusivity'
      }]
    }
  ];
};

export default CopywritingRecommendations;