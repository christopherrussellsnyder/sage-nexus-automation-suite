import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar, Users, Target, TrendingUp } from 'lucide-react';

interface ContentCalendarProps {
  data: any;
  businessType: string;
  variant?: 'user' | 'client';
  title?: string;
}

const ContentCalendar = ({ data, businessType, variant = 'user', title }: ContentCalendarProps) => {
  // Access content calendar from the correct structure
  const monthlyPlan = data.monthlyPlan?.contentCalendar || data.contentCalendar || [];
  const clientDeliveryPlan = data.clientDeliveryPlan?.contentCalendar || [];
  const agencyGrowthPlan = data.agencyGrowthPlan?.contentCalendar || [];
  
  // Transform string data into structured format if needed
  const parseContentData = (content: any) => {
    if (Array.isArray(content)) return content;
    if (typeof content === 'string') {
      // Parse string content into structured format
      const lines = content.split('\n').filter(line => line.trim());
      return lines.map((line, index) => {
        const dayMatch = line.match(/Day (\d+):/);
        const day = dayMatch ? dayMatch[1] : index + 1;
        const description = line.replace(/Day \d+:\s*/, '').trim();
        
        return {
          day: day,
          platform: 'Multi-Platform',
          contentType: 'content',
          hook: description.substring(0, 50) + '...',
          body: description,
          cta: 'Learn More',
          visualSuggestion: 'Professional imagery recommended',
          expectedMetrics: {
            reach: 1000 + (index * 200),
            engagement: '3.5%',
            conversions: 15 + index
          },
          strategicReasoning: 'Designed to maximize engagement and drive conversions'
        };
      });
    }
    return [];
  };

  const parsedMonthlyPlan = parseContentData(monthlyPlan);
  const parsedClientPlan = parseContentData(clientDeliveryPlan);
  const parsedAgencyPlan = parseContentData(agencyGrowthPlan);
  
  const showDualPlans = businessType === 'agency' && (parsedClientPlan.length > 0 || parsedAgencyPlan.length > 0);
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-primary" />
          <CardTitle>AI Generated 30 Day Optimized Content Calendar</CardTitle>
        </div>
        <CardDescription>
          Strategic content planning for maximum engagement and conversion
        </CardDescription>
      </CardHeader>
      <CardContent>
        {showDualPlans ? (
          <Tabs defaultValue="agency" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="agency">
                <Users className="h-4 w-4 mr-2" />
                Agency Growth
              </TabsTrigger>
              <TabsTrigger value="client">
                <Target className="h-4 w-4 mr-2" />
                Client Services
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="agency">
              <ContentCalendarGrid content={parsedAgencyPlan.length > 0 ? parsedAgencyPlan : parsedMonthlyPlan} />
            </TabsContent>
            
            <TabsContent value="client">
              <ContentCalendarGrid content={parsedClientPlan} />
            </TabsContent>
          </Tabs>
        ) : (
          <ContentCalendarGrid content={parsedMonthlyPlan} />
        )}
      </CardContent>
    </Card>
  );
};

const ContentCalendarGrid = ({ content }: { content: any[] }) => {
  const contentArray = Array.isArray(content) ? content : [];
  
  if (!contentArray || contentArray.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>Content calendar will be generated based on your business information.</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-96">
      <div className="space-y-3">
        {contentArray.map((item: any, index: number) => (
          <ContentCard key={index} content={item} />
        ))}
      </div>
    </ScrollArea>
  );
};

const ContentCard = ({ content }: { content: any }) => (
  <div className="border rounded-lg p-4 space-y-3">
    <div className="flex justify-between items-start">
      <div className="flex items-center space-x-2">
        <Badge variant="outline">Day {content.day}</Badge>
        <Badge variant="secondary">{content.platform}</Badge>
        <Badge variant={content.contentType === 'ad' ? 'default' : 'outline'}>
          {content.contentType}
        </Badge>
        {content.contentFor && (
          <Badge variant="secondary">For {content.contentFor}</Badge>
        )}
      </div>
      {content.expectedMetrics?.cost && (
        <Badge variant="outline">${content.expectedMetrics.cost}</Badge>
      )}
    </div>
    
    <div className="space-y-2">
      <div>
        <h5 className="font-medium text-sm">Hook:</h5>
        <p className="text-sm text-muted-foreground">{content.hook}</p>
      </div>
      
      <div>
        <h5 className="font-medium text-sm">Content:</h5>
        <p className="text-sm text-muted-foreground">{content.body}</p>
      </div>
      
      <div>
        <h5 className="font-medium text-sm">Call to Action:</h5>
        <p className="text-sm text-muted-foreground font-medium">{content.cta}</p>
      </div>
    </div>
    
    {content.visualSuggestion && (
      <div className="bg-muted/50 p-3 rounded">
        <h6 className="font-medium text-xs text-muted-foreground mb-1">Visual Suggestion:</h6>
        <p className="text-xs">{content.visualSuggestion}</p>
      </div>
    )}
    
    {content.expectedMetrics && (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
        {content.expectedMetrics.reach && (
          <div className="text-center">
            <p className="font-medium">{content.expectedMetrics.reach.toLocaleString()}</p>
            <p className="text-muted-foreground">Reach</p>
          </div>
        )}
        {content.expectedMetrics.engagement && (
          <div className="text-center">
            <p className="font-medium">{content.expectedMetrics.engagement}</p>
            <p className="text-muted-foreground">Engagement</p>
          </div>
        )}
        {content.expectedMetrics.conversions && (
          <div className="text-center">
            <p className="font-medium">{content.expectedMetrics.conversions}</p>
            <p className="text-muted-foreground">Conversions</p>
          </div>
        )}
        {content.expectedMetrics.ctr && (
          <div className="text-center">
            <p className="font-medium">{content.expectedMetrics.ctr}</p>
            <p className="text-muted-foreground">CTR</p>
          </div>
        )}
      </div>
    )}
    
    {content.strategicReasoning && (
      <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded text-xs">
        <h6 className="font-medium mb-1">Strategic Reasoning:</h6>
        <p>{content.strategicReasoning}</p>
      </div>
    )}
    
    {content.copywritingFocus && (
      <div className="flex flex-wrap gap-1">
        <Badge variant="outline" className="text-xs">
          {content.copywritingFocus}
        </Badge>
        {content.psychologicalTriggers?.map((trigger: string, i: number) => (
          <Badge key={i} variant="secondary" className="text-xs">
            {trigger}
          </Badge>
        ))}
      </div>
    )}
  </div>
);

export default ContentCalendar;