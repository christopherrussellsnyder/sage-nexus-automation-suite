
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Target, 
  TrendingUp,
  Megaphone,
  BarChart3,
  UserCheck,
  Calendar,
  DollarSign,
  Globe,
  MessageSquare
} from 'lucide-react';

const AgencyDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'campaigns' | 'leads' | 'social' | 'clients'>('overview');

  const stats = [
    {
      title: 'Active Clients',
      value: '28',
      description: 'Across all campaigns',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Campaign ROI',
      value: '340%',
      description: 'Average return',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Leads Generated',
      value: '1,247',
      description: 'This month',
      icon: Target,
      color: 'text-purple-600'
    },
    {
      title: 'Ad Spend',
      value: '$89K',
      description: 'Total managed',
      icon: DollarSign,
      color: 'text-orange-600'
    }
  ];

  const recentCampaigns = [
    { name: 'TechStartup Q1 Launch', client: 'InnovateTech', status: 'Active', roi: '425%' },
    { name: 'E-commerce Holiday', client: 'ShopMart', status: 'Optimizing', roi: '280%' },
    { name: 'B2B Lead Generation', client: 'DataCorp', status: 'Active', roi: '390%' }
  ];

  const leadMetrics = [
    { source: 'Facebook Ads', leads: 342, quality: 'High', cost: '$12.50' },
    { source: 'Google Ads', leads: 289, quality: 'Very High', cost: '$18.20' },
    { source: 'LinkedIn', leads: 156, quality: 'High', cost: '$24.80' },
    { source: 'Organic Social', leads: 98, quality: 'Medium', cost: '$0.00' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Marketing Agency Hub</h2>
          <p className="text-muted-foreground">Multi-platform campaign management and optimization</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={activeTab === 'overview' ? 'default' : 'outline'}
            onClick={() => setActiveTab('overview')}
            className="flex items-center space-x-2"
          >
            <BarChart3 className="h-4 w-4" />
            <span>Overview</span>
          </Button>
          <Button
            variant={activeTab === 'campaigns' ? 'default' : 'outline'}
            onClick={() => setActiveTab('campaigns')}
            className="flex items-center space-x-2"
          >
            <Megaphone className="h-4 w-4" />
            <span>Campaigns</span>
          </Button>
          <Button
            variant={activeTab === 'leads' ? 'default' : 'outline'}
            onClick={() => setActiveTab('leads')}
            className="flex items-center space-x-2"
          >
            <Target className="h-4 w-4" />
            <span>Lead Management</span>
          </Button>
          <Button
            variant={activeTab === 'social' ? 'default' : 'outline'}
            onClick={() => setActiveTab('social')}
            className="flex items-center space-x-2"
          >
            <Globe className="h-4 w-4" />
            <span>Social Factory</span>
          </Button>
          <Button
            variant={activeTab === 'clients' ? 'default' : 'outline'}
            onClick={() => setActiveTab('clients')}
            className="flex items-center space-x-2"
          >
            <Users className="h-4 w-4" />
            <span>Clients</span>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
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

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Megaphone className="h-5 w-5" />
                <span>Active Campaigns</span>
              </CardTitle>
              <CardDescription>Current campaign performance overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCampaigns.map((campaign, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{campaign.name}</p>
                      <p className="text-sm text-muted-foreground">{campaign.client}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={campaign.status === 'Active' ? 'default' : 'secondary'}>
                        {campaign.status}
                      </Badge>
                      <p className="text-sm font-semibold text-green-600 mt-1">{campaign.roi} ROI</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Lead Sources Performance</span>
              </CardTitle>
              <CardDescription>Lead generation by platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leadMetrics.map((source, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{source.source}</p>
                      <p className="text-sm text-muted-foreground">{source.leads} leads</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={source.quality === 'Very High' ? 'default' : source.quality === 'High' ? 'secondary' : 'outline'}>
                        {source.quality}
                      </Badge>
                      <p className="text-sm font-semibold mt-1">{source.cost} CPL</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'leads' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <UserCheck className="h-5 w-5" />
              <span>Lead Management & Scoring</span>
            </CardTitle>
            <CardDescription>AI-powered lead qualification and nurturing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">847</p>
                      <p className="text-sm text-muted-foreground">Hot Leads</p>
                      <p className="text-xs text-muted-foreground">Score 80+</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-600">1,234</p>
                      <p className="text-sm text-muted-foreground">Warm Leads</p>
                      <p className="text-xs text-muted-foreground">Score 50-79</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">2,156</p>
                      <p className="text-sm text-muted-foreground">Cold Leads</p>
                      <p className="text-xs text-muted-foreground">Score &lt;50</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="text-center py-8">
                <Target className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Advanced Lead Management</h3>
                <p className="text-muted-foreground mb-4">
                  AI-powered lead scoring with behavioral tracking and automated nurturing sequences
                </p>
                <Button>
                  View Lead Dashboard
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab !== 'overview' && activeTab !== 'leads' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>
                {activeTab === 'campaigns' ? 'Campaign Orchestration' : 
                 activeTab === 'social' ? 'Social Media Factory' : 'Client Management'}
              </span>
            </CardTitle>
            <CardDescription>
              {activeTab === 'campaigns' && 'Multi-platform campaign creation and optimization'}
              {activeTab === 'social' && 'Automated social media content generation and scheduling'}
              {activeTab === 'clients' && 'Client relationship management and reporting'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Feature Coming Soon</h3>
              <p className="text-muted-foreground mb-4">
                {activeTab === 'campaigns' && 'Advanced campaign management with cross-platform optimization'}
                {activeTab === 'social' && 'AI-powered content creation with automated posting schedules'}
                {activeTab === 'clients' && 'Comprehensive client portals with white-label reporting'}
              </p>
              <Button variant="outline">
                Get Notified
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AgencyDashboard;
