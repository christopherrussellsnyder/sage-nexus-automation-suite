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
  // Handle AI-generated copywriting recommendations structure
  const copyRecommendations = data.copywritingRecommendations || [];
  
  console.log('CopywritingRecommendations - Raw data:', copyRecommendations);
  
  // Transform AI array data into comprehensive display format
  const transformedRecommendations = Array.isArray(copyRecommendations) 
    ? copyRecommendations.map((rec: any, index: number) => ({
        type: rec.type || rec.copyType || `Copy Type ${index + 1}`,
        headline: rec.headline || rec.title || '',
        content: rec.content || rec.body || rec.description || '',
        cta: rec.cta || rec.callToAction || 'Learn More',
        platform: rec.platform || 'Multi-Platform',
        priority: rec.priority || 'High',
        reasoning: rec.reasoning || rec.strategicReasoning || 'AI-optimized for maximum engagement',
        emotionalTriggers: rec.emotionalTriggers || rec.triggers || ['persuasion', 'trust', 'results'],
        audience: rec.audience || 'user'
      }))
    : [];
  
  const copyData = transformedRecommendations;
  
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
        <div className="space-y-4">
          {copyData.map((recommendation: any, index: number) => (
            <EnhancedCopyRecommendationCard key={index} recommendation={recommendation} />
          ))}
          {copyData.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Copywriting recommendations will be generated based on your business information.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const EnhancedCopyRecommendationCard = ({ recommendation }: { recommendation: any }) => (
  <div className="border rounded-lg p-4 space-y-4">
    <div className="flex items-center justify-between">
      <Badge variant="outline" className="capitalize">
        {recommendation.type || 'general'}
      </Badge>
      {recommendation.priority && (
        <Badge variant={recommendation.priority === 'high' ? 'default' : 'secondary'}>
          {recommendation.priority} Priority
        </Badge>
      )}
    </div>
    
    <div className="space-y-3">
      <div>
        <h5 className="font-medium text-sm text-muted-foreground mb-1">Headline:</h5>
        <h4 className="font-semibold text-lg">{recommendation.headline}</h4>
      </div>
      
      <div>
        <h5 className="font-medium text-sm text-muted-foreground mb-1">Content:</h5>
        <p className="text-sm leading-relaxed">{recommendation.content}</p>
      </div>
      
      <div>
        <h5 className="font-medium text-sm text-muted-foreground mb-1">Call to Action:</h5>
        <Badge variant="secondary" className="font-medium">{recommendation.cta}</Badge>
      </div>
    </div>
    
    {recommendation.platform && (
      <div className="pt-2 border-t">
        <span className="text-xs text-muted-foreground">
          Optimized for {recommendation.platform}
        </span>
      </div>
    )}
    
    {recommendation.reasoning && (
      <div className="bg-muted/50 p-3 rounded text-xs">
        <h6 className="font-medium mb-1">Strategic Reasoning:</h6>
        <p>{recommendation.reasoning}</p>
      </div>
    )}
    
    {recommendation.emotionalTriggers && recommendation.emotionalTriggers.length > 0 && (
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
  </div>
);

const DefaultCopyRecommendations = ({ businessType, audience }: { businessType: string; audience: string }) => {
  const recommendations = getDefaultRecommendations(businessType, audience);
  
  return (
    <div className="space-y-4">
      {recommendations.map((rec, index) => (
        <EnhancedCopyRecommendationCard key={index} recommendation={rec} />
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