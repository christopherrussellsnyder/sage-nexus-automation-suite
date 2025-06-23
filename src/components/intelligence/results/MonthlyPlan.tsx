
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Eye, Copy } from 'lucide-react';

interface MonthlyPlanProps {
  data: any;
}

const MonthlyPlan = ({ data }: MonthlyPlanProps) => {
  const sampleDays = [
    {
      day: 1,
      platform: 'Facebook',
      contentType: 'ad',
      hook: 'Are you still struggling with low conversion rates in your business?',
      body: 'Our proven system helps businesses achieve consistent growth without the typical challenges...',
      cta: 'Get Started Today',
      visualSuggestion: 'Split-screen showing before/after results with customer testimonial overlay',
      expectedMetrics: {
        reach: 15000,
        engagement: 450,
        cost: 125,
        conversions: 12
      }
    },
    {
      day: 2,
      platform: 'Instagram',
      contentType: 'organic',
      hook: 'Small business owners love this one simple trick that boosts results by 300%',
      body: 'Behind-the-scenes look at how we help businesses transform their operations...',
      cta: 'Learn More',
      visualSuggestion: 'Behind-the-scenes video showing product/service in action',
      expectedMetrics: {
        reach: 8500,
        engagement: 680,
        cost: 0,
        conversions: 8
      }
    },
    {
      day: 3,
      platform: 'Google',
      contentType: 'ad',
      hook: 'Discover how our premium solution transforms your business',
      body: 'Join thousands of successful businesses who have already made the switch...',
      cta: 'Book a Demo',
      visualSuggestion: 'Professional product demonstration with clear value proposition',
      expectedMetrics: {
        reach: 5200,
        engagement: 156,
        cost: 180,
        conversions: 18
      }
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="h-5 w-5" />
          <span>30-Day Content Plan</span>
        </CardTitle>
        <CardDescription>
          Daily content recommendations optimized for each platform (showing first 3 days)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {sampleDays.map((day, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Badge variant="outline">Day {day.day}</Badge>
                  <Badge className={day.platform === 'Facebook' ? 'bg-blue-500' : 
                                   day.platform === 'Instagram' ? 'bg-pink-500' : 
                                   'bg-green-500'}>
                    {day.platform}
                  </Badge>
                  <Badge variant={day.contentType === 'ad' ? 'default' : 'secondary'}>
                    {day.contentType.toUpperCase()}
                  </Badge>
                </div>
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Hook</label>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm bg-gray-50 p-2 rounded flex-1">{day.hook}</p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => copyToClipboard(day.hook)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Body</label>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm bg-gray-50 p-2 rounded flex-1">{day.body}</p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => copyToClipboard(day.body)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Call to Action</label>
                    <p className="text-sm bg-gray-50 p-2 rounded">{day.cta}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Visual Suggestion</label>
                    <p className="text-sm bg-gray-50 p-2 rounded">{day.visualSuggestion}</p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div className="text-center p-2 bg-blue-50 rounded">
                    <div className="font-semibold text-blue-600">{day.expectedMetrics.reach.toLocaleString()}</div>
                    <div className="text-muted-foreground">Reach</div>
                  </div>
                  <div className="text-center p-2 bg-green-50 rounded">
                    <div className="font-semibold text-green-600">{day.expectedMetrics.engagement}</div>
                    <div className="text-muted-foreground">Engagement</div>
                  </div>
                  <div className="text-center p-2 bg-purple-50 rounded">
                    <div className="font-semibold text-purple-600">{day.expectedMetrics.conversions}</div>
                    <div className="text-muted-foreground">Conversions</div>
                  </div>
                  <div className="text-center p-2 bg-orange-50 rounded">
                    <div className="font-semibold text-orange-600">
                      {day.expectedMetrics.cost > 0 ? `$${day.expectedMetrics.cost}` : 'Free'}
                    </div>
                    <div className="text-muted-foreground">Cost</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <div className="text-center p-4 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-muted-foreground">+ 27 more days of optimized content</p>
            <Button variant="outline" className="mt-2">
              View Full Calendar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyPlan;
