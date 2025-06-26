
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  BarChart3,
  RefreshCw,
  Building2,
  Target,
  Calendar,
  Mail,
  UserPlus,
  TrendingUp,
  DollarSign,
  UserCheck
} from "lucide-react";
import LeadGeneration from './agency/LeadGeneration';
import ClientScoringDashboard from './agency/ClientScoringDashboard';
import ClientProjectTracker from './agency/ClientProjectTracker';
import ClientSequenceBuilder from './agency/ClientSequenceBuilder';
import ClientMeetingScheduler from './agency/ClientMeetingScheduler';

const AgencyDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'scoring' | 'projects' | 'sequences' | 'meetings'>('overview');
  const [leads, setLeads] = useState<any[]>([]);

  const handleNurtureLead = (lead: any) => {
    console.log('Adding lead to nurture sequence:', lead);
    // Implementation would add lead to email sequence
  };

  const handleScheduleMeeting = (lead: any) => {
    console.log('Scheduling meeting with lead:', lead);
    // Implementation would open meeting scheduler with lead data
  };

  const handleLeadAdded = (lead: any) => {
    setLeads(prev => [...prev, lead]);
  };

  // Calculate agency metrics
  const agencyStats = [
    {
      title: 'Active Clients',
      value: '24',
      description: 'Current client projects',
      icon: Building2,
      color: 'text-blue-600'
    },
    {
      title: 'Monthly Revenue',
      value: '$127K',
      description: 'This month',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Potential Clients',
      value: leads.length.toString(),
      description: 'In pipeline',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: 'Conversion Rate',
      value: '18%',
      description: 'Lead to client',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Agency Management Suite</h2>
          <p className="text-muted-foreground">Comprehensive client management and business intelligence</p>
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
            <UserPlus className="h-4 w-4" />
            <span>Lead Generation</span>
          </Button>
          <Button
            variant={activeTab === 'scoring' ? 'default' : 'outline'}
            onClick={() => setActiveTab('scoring')}
            className="flex items-center space-x-2"
          >
            <Target className="h-4 w-4" />
            <span>Client Scoring</span>
          </Button>
          <Button
            variant={activeTab === 'projects' ? 'default' : 'outline'}
            onClick={() => setActiveTab('projects')}
            className="flex items-center space-x-2"
          >
            <Building2 className="h-4 w-4" />
            <span>Client Projects</span>
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
            <span>Client Meetings</span>
          </Button>
          <Button className="flex items-center space-x-2">
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </Button>
        </div>
      </div>

      {/* Agency Stats */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-4 gap-6">
            {agencyStats.map((stat, index) => (
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

          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building2 className="h-5 w-5" />
                  <span>Agency Performance</span>
                </CardTitle>
                <CardDescription>Track your agency metrics and client satisfaction</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Monthly Recurring Revenue</span>
                    <span className="text-2xl font-bold text-green-600">$127K</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Avg Client Value</span>
                    <span className="text-lg font-semibold">$5,300</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Client Retention</span>
                    <span className="text-lg font-semibold">94%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Avg Project Length</span>
                    <span className="text-lg font-semibold">6.2 months</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Recent Client Activities</span>
                </CardTitle>
                <CardDescription>Latest client interactions and project updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">New client project signed: TechStart Solutions</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Strategy meeting scheduled: Growth Dynamics</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">Project milestone completed: Marketing Automation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm">New lead qualification: Enterprise Solutions Inc</span>
                  </div>
                  {leads.length > 0 && (
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">New potential client added: {leads[leads.length - 1]?.name}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Tab Content */}
      {activeTab === 'leads' && (
        <LeadGeneration onLeadAdded={handleLeadAdded} />
      )}

      {activeTab === 'scoring' && (
        <ClientScoringDashboard 
          leads={leads}
          onNurtureLead={handleNurtureLead}
          onScheduleMeeting={handleScheduleMeeting}
        />
      )}

      {activeTab === 'projects' && (
        <ClientProjectTracker />
      )}

      {activeTab === 'sequences' && (
        <ClientSequenceBuilder />
      )}

      {activeTab === 'meetings' && (
        <ClientMeetingScheduler />
      )}
    </div>
  );
};

export default AgencyDashboard;
