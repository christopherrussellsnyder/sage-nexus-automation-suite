import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown,
  Users, 
  DollarSign,
  Calendar,
  Target,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';

interface AnalyticsDashboardProps {
  onBack: () => void;
}

const AnalyticsDashboard = ({ onBack }: AnalyticsDashboardProps) => {
  // Mock data for charts
  const revenueData = [
    { month: 'Jan', revenue: 45000, projects: 8 },
    { month: 'Feb', revenue: 52000, projects: 10 },
    { month: 'Mar', revenue: 48000, projects: 9 },
    { month: 'Apr', revenue: 61000, projects: 12 },
    { month: 'May', revenue: 55000, projects: 11 },
    { month: 'Jun', revenue: 67000, projects: 14 }
  ];

  const clientSatisfactionData = [
    { name: 'Excellent', value: 60, color: '#10B981' },
    { name: 'Good', value: 25, color: '#3B82F6' },
    { name: 'Average', value: 12, color: '#F59E0B' },
    { name: 'Poor', value: 3, color: '#EF4444' }
  ];

  const projectTypeData = [
    { type: 'Web Design', count: 15, revenue: 180000 },
    { type: 'Branding', count: 8, revenue: 95000 },
    { type: 'Marketing', count: 12, revenue: 145000 },
    { type: 'Consulting', count: 6, revenue: 75000 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Button variant="outline" onClick={onBack}>
            ← Back to Agency Overview
          </Button>
          <h2 className="text-2xl font-bold mt-4">Performance Analytics</h2>
          <p className="text-muted-foreground">
            Detailed insights into agency performance and client satisfaction
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
                <p className="text-3xl font-bold">$495K</p>
                <p className="text-sm flex items-center text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +12.5% from last month
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
                <p className="text-sm font-medium text-muted-foreground">Active Clients</p>
                <p className="text-3xl font-bold">24</p>
                <p className="text-sm flex items-center text-blue-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +3 new this month
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Project Completion</p>
                <p className="text-3xl font-bold">94%</p>
                <p className="text-sm flex items-center text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +2% improvement
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Project Value</p>
                <p className="text-3xl font-bold">$32K</p>
                <p className="text-sm flex items-center text-red-600">
                  <TrendingDown className="h-4 w-4 mr-1" />
                  -5% from last month
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
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue and project count over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value, name) => [
                  name === 'revenue' ? `$${value.toLocaleString()}` : value,
                  name === 'revenue' ? 'Revenue' : 'Projects'
                ]} />
                <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="projects" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Client Satisfaction */}
        <Card>
          <CardHeader>
            <CardTitle>Client Satisfaction</CardTitle>
            <CardDescription>Distribution of client satisfaction ratings</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={clientSatisfactionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {clientSatisfactionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-4 mt-4">
              {clientSatisfactionData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Types Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Project Types Performance</CardTitle>
          <CardDescription>Analysis by project category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={projectTypeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip formatter={(value, name) => [
                  name === 'revenue' ? `$${value.toLocaleString()}` : value,
                  name === 'revenue' ? 'Revenue' : 'Count'
                ]} />
                <Bar dataKey="count" fill="#3B82F6" />
                <Bar dataKey="revenue" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Top Performing Categories</h4>
              {projectTypeData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h5 className="font-medium">{item.type}</h5>
                    <p className="text-sm text-muted-foreground">{item.count} projects</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${item.revenue.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">
                      ${(item.revenue / item.count).toLocaleString()} avg
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest agency performance updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <div className="p-2 bg-green-100 rounded-lg">
                <Activity className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Project completed for Acme Corporation</p>
                <p className="text-sm text-muted-foreground">Website redesign delivered on time</p>
              </div>
              <Badge variant="secondary">2 hours ago</Badge>
            </div>
            
            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">New client onboarded</p>
                <p className="text-sm text-muted-foreground">TechStart Inc signed $75K contract</p>
              </div>
              <Badge variant="secondary">1 day ago</Badge>
            </div>
            
            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Target className="h-4 w-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Monthly goal achieved</p>
                <p className="text-sm text-muted-foreground">Revenue target exceeded by 12%</p>
              </div>
              <Badge variant="secondary">3 days ago</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
