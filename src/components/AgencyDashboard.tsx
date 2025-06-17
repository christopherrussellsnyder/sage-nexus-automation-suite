
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
import LeadManagement from './agency/LeadManagement';
import LeadScoringDashboard from './agency/LeadScoringDashboard';
import CampaignOrchestration from './agency/CampaignOrchestration';
import SocialMediaFactory from './agency/SocialMediaFactory';

const AgencyDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'campaigns' | 'leads' | 'scoring' | 'social' | 'clients'>('campaigns');
  const [leads, setLeads] = useState([]);

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

  const handleLeadAdded = (newLead: any) => {
    setLeads(prevLeads => [...prevLeads, newLead]);
  };

  const handleNurtureLead = (lead: any) => {
    console.log('Nurturing lead:', lead);
  };

  const handleScheduleMeeting = (lead: any) => {
    console.log('Scheduling meeting with:', lead);
  };

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
            variant={activeTab === 'scoring' ? 'default' : 'outline'}
            onClick={() => setActiveTab('scoring')}
            className="flex items-center space-x-2"
          >
            <UserCheck className="h-4 w-4" />
            <span>Lead Scoring</span>
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
      {activeTab === 'campaigns' && <CampaignOrchestration />}
      {activeTab === 'leads' && <LeadManagement onLeadAdded={handleLeadAdded} />}
      {activeTab === 'scoring' && (
        <LeadScoringDashboard 
          leads={leads} 
          onNurtureLead={handleNurtureLead}
          onScheduleMeeting={handleScheduleMeeting}
        />
      )}
      {activeTab === 'social' && <SocialMediaFactory />}

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
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">TechStartup Q1 Launch</p>
                    <p className="text-sm text-muted-foreground">InnovateTech</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="default">Active</Badge>
                    <p className="text-sm font-semibold text-green-600 mt-1">425% ROI</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">E-commerce Holiday</p>
                    <p className="text-sm text-muted-foreground">ShopMart</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary">Optimizing</Badge>
                    <p className="text-sm font-semibold text-green-600 mt-1">280% ROI</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">B2B Lead Generation</p>
                    <p className="text-sm text-muted-foreground">DataCorp</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="default">Active</Badge>
                    <p className="text-sm font-semibold text-green-600 mt-1">390% ROI</p>
                  </div>
                </div>
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
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Facebook Ads</p>
                    <p className="text-sm text-muted-foreground">342 leads</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="default">High</Badge>
                    <p className="text-sm font-semibold mt-1">$12.50 CPL</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Google Ads</p>
                    <p className="text-sm text-muted-foreground">289 leads</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="default">Very High</Badge>
                    <p className="text-sm font-semibold mt-1">$18.20 CPL</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">LinkedIn</p>
                    <p className="text-sm text-muted-foreground">156 leads</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary">High</Badge>
                    <p className="text-sm font-semibold mt-1">$24.80 CPL</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Organic Social</p>
                    <p className="text-sm text-muted-foreground">98 leads</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">Medium</Badge>
                    <p className="text-sm font-semibold mt-1">$0.00 CPL</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'clients' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Client Management &amp; Reporting</span>
            </CardTitle>
            <CardDescription>
              Comprehensive client portals with white-label reporting
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Client Portal Available</h3>
              <p className="text-muted-foreground mb-4">
                Automated client reporting with performance dashboards and insights
              </p>
              <Button variant="outline">
                Access Client Portal
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AgencyDashboard;
