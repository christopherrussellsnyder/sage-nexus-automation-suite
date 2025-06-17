
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Megaphone, 
  Target, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Play, 
  Pause, 
  Settings,
  BarChart3,
  Globe
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Campaign {
  id: string;
  name: string;
  client: string;
  platforms: string[];
  status: 'active' | 'paused' | 'draft';
  budget: string;
  spent: string;
  impressions: string;
  clicks: string;
  conversions: string;
  roi: string;
  progress: number;
}

const CampaignOrchestration = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Q1 Brand Awareness',
      client: 'TechStartup Inc',
      platforms: ['Google Ads', 'Facebook', 'LinkedIn'],
      status: 'active',
      budget: '$15,000',
      spent: '$8,400',
      impressions: '245K',
      clicks: '12.3K',
      conversions: '342',
      roi: '285%',
      progress: 56
    },
    {
      id: '2',
      name: 'Holiday Sales Push',
      client: 'E-commerce Store',
      platforms: ['Facebook', 'Instagram', 'TikTok'],
      status: 'active',
      budget: '$25,000',
      spent: '$18,200',
      impressions: '1.2M',
      clicks: '45.6K',
      conversions: '1,234',
      roi: '420%',
      progress: 73
    },
    {
      id: '3',
      name: 'Lead Generation B2B',
      client: 'Software Company',
      platforms: ['LinkedIn', 'Google Ads'],
      status: 'paused',
      budget: '$10,000',
      spent: '$3,200',
      impressions: '89K',
      clicks: '5.2K',
      conversions: '89',
      roi: '180%',
      progress: 32
    }
  ]);

  const { toast } = useToast();

  const handleCampaignAction = (campaignId: string, action: 'play' | 'pause') => {
    setCampaigns(campaigns.map(campaign => 
      campaign.id === campaignId 
        ? { ...campaign, status: action === 'play' ? 'active' : 'paused' }
        : campaign
    ));
    
    toast({
      title: action === 'play' ? "Campaign Started" : "Campaign Paused",
      description: `Campaign has been ${action === 'play' ? 'activated' : 'paused'} successfully`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'paused': return 'bg-yellow-500';
      case 'draft': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getPlatformIcon = (platform: string) => {
    return <Globe className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="campaigns">Active Campaigns</TabsTrigger>
          <TabsTrigger value="create">Create Campaign</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Megaphone className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">{campaigns.filter(c => c.status === 'active').length}</p>
                    <p className="text-sm text-muted-foreground">Active Campaigns</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">$89K</p>
                    <p className="text-sm text-muted-foreground">Total Ad Spend</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="text-2xl font-bold">1.8M</p>
                    <p className="text-sm text-muted-foreground">Total Impressions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="text-2xl font-bold">295%</p>
                    <p className="text-sm text-muted-foreground">Avg ROI</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="campaigns">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Management</CardTitle>
              <CardDescription>Monitor and control your multi-platform campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaign</TableHead>
                      <TableHead>Platforms</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Budget Progress</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>ROI</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {campaigns.map((campaign) => (
                      <TableRow key={campaign.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{campaign.name}</div>
                            <div className="text-sm text-muted-foreground">{campaign.client}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {campaign.platforms.map((platform, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {platform}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(campaign.status)}`} />
                            <span className="capitalize font-medium">{campaign.status}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{campaign.spent}</span>
                              <span>{campaign.budget}</span>
                            </div>
                            <Progress value={campaign.progress} className="h-2" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{campaign.impressions} impressions</div>
                            <div>{campaign.clicks} clicks</div>
                            <div>{campaign.conversions} conversions</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-bold text-green-600">{campaign.roi}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            {campaign.status === 'active' ? (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleCampaignAction(campaign.id, 'pause')}
                              >
                                <Pause className="h-3 w-3" />
                              </Button>
                            ) : (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleCampaignAction(campaign.id, 'play')}
                              >
                                <Play className="h-3 w-3" />
                              </Button>
                            )}
                            <Button size="sm" variant="outline">
                              <Settings className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <BarChart3 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Create New Campaign</CardTitle>
              <CardDescription>Launch a new multi-platform campaign</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Megaphone className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Campaign Creation Wizard</h3>
                <p className="text-muted-foreground mb-4">
                  AI-powered campaign creation across all major platforms
                </p>
                <Button>
                  Start Campaign Wizard
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CampaignOrchestration;
