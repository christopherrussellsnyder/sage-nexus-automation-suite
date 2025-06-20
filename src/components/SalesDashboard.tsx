
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Phone, 
  Users, 
  Target, 
  TrendingUp,
  Calendar,
  DollarSign,
  UserCheck,
  FileText,
  MessageSquare,
  BarChart3,
  Mail
} from 'lucide-react';
import DealsTracker from './sales/DealsTracker';
import MeetingScheduler from './sales/MeetingScheduler';
import EmailSequenceBuilder from './sales/EmailSequenceBuilder';
import LeadManagement from './agency/LeadManagement';
import LeadScoringDashboard from './agency/LeadScoringDashboard';

const SalesDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'prospects' | 'deals' | 'sequences' | 'meetings'>('deals');
  const [leads, setLeads] = useState<any[]>([]);

  const handleLeadAdded = (lead: any) => {
    setLeads(prev => [...prev, lead]);
  };

  const handleNurtureLead = (lead: any) => {
    console.log('Nurturing lead:', lead);
  };

  const handleScheduleMeeting = (lead: any) => {
    console.log('Scheduling meeting with:', lead);
  };

  // Calculate metrics based on actual data - start from 0
  const activeProspects = leads.length;
  const dealsClosedThisMonth = 0; // Will be calculated from actual deals
  const meetingsBookedThisWeek = 0; // Will be calculated from actual meetings
  const conversionRate = 0; // Will be calculated from actual conversion data

  const stats = [
    {
      title: 'Active Prospects',
      value: activeProspects.toString(),
      description: 'In pipeline',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Deals Closed',
      value: `$${dealsClosedThisMonth.toLocaleString()}`,
      description: 'This month',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Meetings Booked',
      value: meetingsBookedThisWeek.toString(),
      description: 'This week',
      icon: Calendar,
      color: 'text-purple-600'
    },
    {
      title: 'Conversion Rate',
      value: `${conversionRate}%`,
      description: 'Prospect to customer',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Sales Operations</h2>
          <p className="text-muted-foreground">Intelligent prospect research and sales automation</p>
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
            variant={activeTab === 'prospects' ? 'default' : 'outline'}
            onClick={() => setActiveTab('prospects')}
            className="flex items-center space-x-2"
          >
            <UserCheck className="h-4 w-4" />
            <span>Prospects</span>
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
            variant={activeTab === 'sequences' ? 'default' : 'outline'}
            onClick={() => setActiveTab('sequences')}
            className="flex items-center space-x-2"
          >
            <Mail className="h-4 w-4" />
            <span>Email Sequences</span>
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
      {activeTab === 'deals' && <DealsTracker />}
      {activeTab === 'meetings' && <MeetingScheduler />}
      {activeTab === 'sequences' && <EmailSequenceBuilder />}
      
      {activeTab === 'prospects' && (
        <div className="space-y-6">
          <LeadManagement onLeadAdded={handleLeadAdded} />
          <LeadScoringDashboard 
            leads={leads} 
            onNurtureLead={handleNurtureLead}
            onScheduleMeeting={handleScheduleMeeting}
          />
        </div>
      )}
      
      {activeTab === 'overview' && (
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Phone className="h-5 w-5" />
                <span>Sales Performance</span>
              </CardTitle>
              <CardDescription>Track your sales metrics and pipeline health</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Pipeline Value</span>
                  <span className="text-2xl font-bold text-green-600">$0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Avg Deal Size</span>
                  <span className="text-lg font-semibold">$0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Sales Cycle</span>
                  <span className="text-lg font-semibold">0 days</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Recent Activities</span>
              </CardTitle>
              <CardDescription>Latest prospect interactions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leads.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No recent activities</p>
                ) : (
                  <>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Prospect added: {leads[leads.length - 1]?.name}</span>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SalesDashboard;
