
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown,
  Target, 
  DollarSign,
  Users,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Award
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts';

interface SalesAnalyticsProps {
  onBack: () => void;
}

const SalesAnalytics = ({ onBack }: SalesAnalyticsProps) => {
  // Mock data for charts
  const salesData = [
    { month: 'Jan', revenue: 85000, leads: 120, conversions: 18 },
    { month: 'Feb', revenue: 92000, leads: 140, conversions: 22 },
    { month: 'Mar', revenue: 78000, leads: 110, conversions: 15 },
    { month: 'Apr', revenue: 105000, leads: 160, conversions: 28 },
    { month: 'May', revenue: 118000, leads: 180, conversions: 32 },
    { month: 'Jun', revenue: 127000, leads: 195, conversions: 38 }
  ];

  const conversionFunnelData = [
    { stage: 'Leads', count: 1000, color: '#3B82F6' },
    { stage: 'Qualified', count: 450, color: '#10B981' },
    { stage: 'Proposals', count: 180, color: '#F59E0B' },
    { stage: 'Closed', count: 65, color: '#EF4444' }
  ];

  const leadSourceData = [
    { source: 'Website', leads: 340, revenue: 125000 },
    { source: 'LinkedIn', leads: 280, revenue: 98000 },
    { source: 'Referrals', leads: 220, revenue: 145000 },
    { source: 'Email', leads: 180, revenue: 67000 },
    { source: 'Other', leads: 120, revenue: 45000 }
  ];

  const topPerformers = [
    { name: 'Sarah Johnson', deals: 12, revenue: 245000, conversion: 38 },
    { name: 'Mike Wilson', deals: 9, revenue: 189000, conversion: 32 },
    { name: 'Emma Davis', deals: 8, revenue: 156000, conversion: 28 },
    { name: 'John Smith', deals: 7, revenue: 134000, conversion: 25 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Button variant="outline" onClick={onBack}>
            ← Back to Sales Overview
          </Button>
          <h2 className="text-2xl font-bold mt-4">Sales Analytics</h2>
          <p className="text-muted-foreground">
            Comprehensive sales performance tracking and conversion analysis
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-3xl font-bold">$605K</p>
                <p className="text-sm flex items-center text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +18.5% from last month
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                <p className="text-3xl font-bold">34%</p>
                <p className="text-sm flex items-center text-blue-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +3% improvement
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Leads</p>
                <p className="text-3xl font-bold">195</p>
                <p className="text-sm flex items-center text-purple-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +15 new this week
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Deal Size</p>
                <p className="text-3xl font-bold">$18K</p>
                <p className="text-sm flex items-center text-red-600">
                  <TrendingDown className="h-4 w-4 mr-1" />
                  -2% from last month
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Performance Trend</CardTitle>
            <CardDescription>Monthly revenue, leads, and conversions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value, name) => [
                  name === 'revenue' ? `$${value.toLocaleString()}` : value,
                  name === 'revenue' ? 'Revenue' : name === 'leads' ? 'Leads' : 'Conversions'
                ]} />
                <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="leads" stroke="#10B981" strokeWidth={2} />
                <Line type="monotone" dataKey="conversions" stroke="#F59E0B" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Conversion Funnel */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Funnel</CardTitle>
            <CardDescription>Lead progression through sales stages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {conversionFunnelData.map((stage, index) => (
                <div key={stage.stage} className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{stage.stage}</span>
                    <span className="text-sm text-muted-foreground">{stage.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-8">
                    <div
                      className="h-8 rounded-full flex items-center justify-center text-white font-medium"
                      style={{
                        width: `${(stage.count / conversionFunnelData[0].count) * 100}%`,
                        backgroundColor: stage.color
                      }}
                    >
                      {index > 0 && (
                        <span className="text-xs">
                          {Math.round((stage.count / conversionFunnelData[index - 1].count) * 100)}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lead Sources and Top Performers */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Lead Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Sources Performance</CardTitle>
            <CardDescription>Revenue and lead count by source</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={leadSourceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="source" />
                <YAxis />
                <Tooltip formatter={(value, name) => [
                  name === 'revenue' ? `$${value.toLocaleString()}` : value,
                  name === 'revenue' ? 'Revenue' : 'Leads'
                ]} />
                <Bar dataKey="leads" fill="#3B82F6" />
                <Bar dataKey="revenue" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
            <CardDescription>Sales team performance leaderboard</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((performer, index) => (
                <div key={performer.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-medium">{performer.name}</h4>
                      <p className="text-sm text-muted-foreground">{performer.deals} deals closed</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${performer.revenue.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">{performer.conversion}% conversion</p>
                  </div>
                  {index === 0 && (
                    <Badge variant="secondary" className="ml-2">
                      <Award className="h-3 w-3 mr-1" />
                      Top Performer
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Sales Activity</CardTitle>
          <CardDescription>Latest updates from your sales pipeline</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <div className="p-2 bg-green-100 rounded-lg">
                <Activity className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Deal closed with TechFlow Corp</p>
                <p className="text-sm text-muted-foreground">$45,000 contract signed by Michael Chen</p>
              </div>
              <Badge variant="secondary">2 hours ago</Badge>
            </div>
            
            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">New qualified lead added</p>
                <p className="text-sm text-muted-foreground">Sarah Williams from Digital Solutions scheduled demo</p>
              </div>
              <Badge variant="secondary">5 hours ago</Badge>
            </div>
            
            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Target className="h-4 w-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Monthly target achieved</p>
                <p className="text-sm text-muted-foreground">Revenue goal exceeded by 18% this month</p>
              </div>
              <Badge variant="secondary">1 day ago</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesAnalytics;
