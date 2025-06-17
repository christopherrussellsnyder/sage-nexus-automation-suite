
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Calendar,
  UserCheck,
  BarChart3,
  Target,
  Brain,
  MessageSquare,
  FileText
} from 'lucide-react';
import LeadManagement from './agency/LeadManagement';
import LeadScoringDashboard from './agency/LeadScoringDashboard';
import MarketingIntelligence from './agency/MarketingIntelligence';
import DealsTracker from './sales/DealsTracker';
import MeetingScheduler from './sales/MeetingScheduler';

const AgencyDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'scoring' | 'intelligence' | 'deals' | 'meetings'>('overview');
  const [leads, setLeads] = useState<any[]>([]);

  const stats = [
    {
      title: 'Active Leads',
      value: '89',
      description: 'In pipeline',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Revenue This Month',
      value: '$47K',
      description: 'From closed deals',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Meetings Scheduled',
      value: '18',
      description: 'This week',
      icon: Calendar,
      color: 'text-purple-600'
    },
    {
      title: 'Conversion Rate',
      value: '28%',
      description: '+6% vs last month',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ];

  const handleLeadAdded = (lead: any) => {
    setLeads(prev => [...prev, lead]);
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
          <h2 className="text-3xl font-bold">Agency Operations</h2>
          <p className="text-muted-foreground">Lead management, marketing intelligence, and client operations</p>
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
            variant={activeTab === 'leads' ? 'default' : 'outline'}
            onClick={() => setActiveTab('leads')}
            className="flex items-center space-x-2"
          >
            <Users className="h-4 w-4" />
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
            variant={activeTab === 'intelligence' ? 'default' : 'outline'}
            onClick={() => setActiveTab('intelligence')}
            className="flex items-center space-x-2"
          >
            <Brain className="h-4 w-4" />
            <span>Marketing Intelligence</span>
          </Button>
          <Button
            variant={activeTab === 'deals' ? 'default' : 'outline'}
            onClick={() => setActiveTab('deals')}
            className="flex items-center space-x-2"
          >
            <Target className="h-4 w-4" />
            <span>Deals</span>
          </Button>
          <Button
            variant={activeTab === 'meetings' ? 'default' : 'outline'}
            onClick={() => setActiveTab('meetings')}
            className="flex items-center space-x-2"
          >
            <Calendar className="h-4 w-4" />
            <span>Meetings</span>
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
                <Users className="h-5 w-5" />
                <span>Lead Pipeline Health</span>
              </CardTitle>
              <CardDescription>Track your lead generation and conversion metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Pipeline Value</span>
                  <span className="text-2xl font-bold text-green-600">$156K</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Avg Deal Size</span>
                  <span className="text-lg font-semibold">$5,200</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Sales Cycle</span>
                  <span className="text-lg font-semibold">35 days</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>Recent Activities</span>
              </CardTitle>
              <CardDescription>Latest client interactions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">New lead: TechStartup Inc - Hot lead</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Meeting scheduled with Digital Solutions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm">Proposal sent to E-commerce Brand</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'leads' && <LeadManagement onLeadAdded={handleLeadAdded} />}
      {activeTab === 'scoring' && (
        <LeadScoringDashboard 
          leads={leads} 
          onNurtureLead={handleNurtureLead}
          onScheduleMeeting={handleScheduleMeeting}
        />
      )}
      {activeTab === 'intelligence' && <MarketingIntelligence />}
      {activeTab === 'deals' && <DealsTracker />}
      {activeTab === 'meetings' && <MeetingScheduler />}
    </div>
  );
};

export default AgencyDashboard;
