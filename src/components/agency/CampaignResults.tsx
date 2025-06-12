
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { 
  TrendingUp, 
  Users, 
  Target, 
  DollarSign, 
  Eye, 
  MousePointer,
  Download,
  Share2,
  Calendar
} from 'lucide-react';
import EnhancedCampaignStrategy from './EnhancedCampaignStrategy';
import { useState } from 'react';

interface CampaignResultsProps {
  campaignData: any;
  onClose: () => void;
}

const CampaignResults = ({ campaignData, onClose }: CampaignResultsProps) => {
  const [showEnhancedStrategy, setShowEnhancedStrategy] = useState(false);

  if (showEnhancedStrategy) {
    return (
      <EnhancedCampaignStrategy 
        campaignData={campaignData}
        onClose={() => setShowEnhancedStrategy(false)}
      />
    );
  }

  // Generate industry-specific metrics and projections
  const getProjectedMetrics = () => {
    const budget = campaignData.budget || 10000;
    const baseMetrics = {
      reach: Math.floor(budget * 12),
      impressions: Math.floor(budget * 45),
      clicks: Math.floor(budget * 2.1),
      leads: Math.floor(budget * 0.15),
      conversions: Math.floor(budget * 0.08),
      roas: 3.2 + Math.random() * 1.8
    };
    return baseMetrics;
  };

  const projectedMetrics = getProjectedMetrics();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Campaign Strategy Complete</h2>
          <p className="text-muted-foreground">
            AI-generated campaign strategy for {campaignData.clientName}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onClose}>
            Create Another
          </Button>
          <Button onClick={() => setShowEnhancedStrategy(true)}>
            View Advanced Strategy
          </Button>
        </div>
      </div>

      {/* Campaign Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Campaign Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium">Client:</Label>
                <p className="font-bold">{campaignData.clientName}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Industry:</Label>
                <Badge variant="secondary">{campaignData.industry}</Badge>
              </div>
              <div>
                <Label className="text-sm font-medium">Budget:</Label>
                <p className="font-bold">${campaignData.budget?.toLocaleString()}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Duration:</Label>
                <p>{campaignData.duration}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium">Objectives:</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {campaignData.objectives?.map((obj: string, index: number) => (
                    <Badge key={index} variant="outline">{obj}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Target Audience:</Label>
                <p className="text-sm">{campaignData.targetAudience}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Geographic:</Label>
                <p>{campaignData.geographic || 'Not specified'}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projected Performance */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{projectedMetrics.reach.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Projected Reach</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MousePointer className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{projectedMetrics.clicks.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Expected Clicks</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">{projectedMetrics.leads.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Qualified Leads</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{projectedMetrics.roas.toFixed(1)}x</p>
                <p className="text-sm text-muted-foreground">Projected ROAS</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Action Items */}
      <Card>
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
          <CardDescription>
            Immediate actions to launch your campaign successfully
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
              <div>
                <h4 className="font-medium">Set up tracking and analytics</h4>
                <p className="text-sm text-muted-foreground">Install Facebook Pixel, Google Analytics, and conversion tracking</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
              <div>
                <h4 className="font-medium">Create landing pages</h4>
                <p className="text-sm text-muted-foreground">Design optimized landing pages for each campaign objective</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
              <div>
                <h4 className="font-medium">Develop creative assets</h4>
                <p className="text-sm text-muted-foreground">Create 3-5 variations of ad creative for each platform</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">4</div>
              <div>
                <h4 className="font-medium">Launch with 20% budget</h4>
                <p className="text-sm text-muted-foreground">Start with a small budget to test and optimize before scaling</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <Button variant="outline" className="flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Download Strategy</span>
        </Button>
        <Button variant="outline" className="flex items-center space-x-2">
          <Share2 className="h-4 w-4" />
          <span>Share with Team</span>
        </Button>
        <Button variant="outline" className="flex items-center space-x-2">
          <Calendar className="h-4 w-4" />
          <span>Schedule Review</span>
        </Button>
      </div>
    </div>
  );
};

export default CampaignResults;
