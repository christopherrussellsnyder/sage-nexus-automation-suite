
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
  Search
} from 'lucide-react';
import DealsTracker from './sales/DealsTracker';
import ProspectResearch from './sales/ProspectResearch';

const SalesDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'prospects' | 'deals' | 'sequences' | 'meetings'>('prospects');

  const stats = [
    {
      title: 'Active Prospects',
      value: '147',
      description: 'In pipeline',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Deals Closed',
      value: '$89K',
      description: 'This month',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Meetings Booked',
      value: '23',
      description: 'This week',
      icon: Calendar,
      color: 'text-purple-600'
    },
    {
      title: 'Conversion Rate',
      value: '24%',
      description: '+5% vs last month',
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
            <Search className="h-4 w-4" />
            <span>Prospect Research</span>
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
            <MessageSquare className="h-4 w-4" />
            <span>Sequences</span>
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
      {activeTab === 'prospects' && <ProspectResearch />}
      {activeTab === 'deals' && <DealsTracker />}
      
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
                  <span className="text-2xl font-bold text-green-600">$247K</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Avg Deal Size</span>
                  <span className="text-lg font-semibold">$8,900</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Sales Cycle</span>
                  <span className="text-lg font-semibold">28 days</span>
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
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Deal closed: TechCorp - $15K</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Meeting scheduled with DataFlow Inc</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm">Proposal sent to CloudTech Solutions</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {(activeTab === 'sequences' || activeTab === 'meetings') && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>{activeTab === 'sequences' ? 'Sales Sequences' : 'Meeting Intelligence'}</span>
            </CardTitle>
            <CardDescription>
              {activeTab === 'sequences' && 'Automated email sequences and follow-ups with behavioral triggers'}
              {activeTab === 'meetings' && 'AI meeting transcription, analysis and deal progression tracking'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Phone className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Advanced {activeTab === 'sequences' ? 'Sequence' : 'Meeting'} Tools Available</h3>
              <p className="text-muted-foreground mb-4">
                {activeTab === 'sequences' && 'Multi-channel sales sequences with real-time behavioral adaptation'}
                {activeTab === 'meetings' && 'AI-powered call analysis with automatic CRM updates and coaching insights'}
              </p>
              <Button variant="outline">
                Access {activeTab === 'sequences' ? 'Sequence Builder' : 'Meeting Intelligence'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SalesDashboard;
