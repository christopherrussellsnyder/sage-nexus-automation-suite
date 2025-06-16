
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  Users, 
  Eye, 
  MousePointer, 
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Globe,
  Smartphone,
  Monitor,
  Calendar,
  Target
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface AnalyticsData {
  visitors: number;
  pageViews: number;
  bounceRate: number;
  conversionRate: number;
  revenue: number;
  orders: number;
  avgOrderValue: number;
  topPages: Array<{ page: string; views: number }>;
  trafficSources: Array<{ source: string; visitors: number; color: string }>;
  deviceBreakdown: Array<{ device: string; percentage: number }>;
  visitorsOverTime: Array<{ date: string; visitors: number; conversions: number }>;
}

interface AdvancedAnalyticsProps {
  websiteName: string;
  timeRange: '7d' | '30d' | '90d';
  onTimeRangeChange: (range: '7d' | '30d' | '90d') => void;
}

const AdvancedAnalytics = ({ websiteName, timeRange, onTimeRangeChange }: AdvancedAnalyticsProps) => {
  const [analyticsData] = useState<AnalyticsData>({
    visitors: 12543,
    pageViews: 28432,
    bounceRate: 34.2,
    conversionRate: 3.8,
    revenue: 45670,
    orders: 287,
    avgOrderValue: 159.20,
    topPages: [
      { page: '/home', views: 8932 },
      { page: '/products', views: 6221 },
      { page: '/about', views: 3847 },
      { page: '/contact', views: 2156 },
      { page: '/blog', views: 1876 }
    ],
    trafficSources: [
      { source: 'Organic Search', visitors: 6234, color: '#8884d8' },
      { source: 'Direct', visitors: 3421, color: '#82ca9d' },
      { source: 'Social Media', visitors: 1876, color: '#ffc658' },
      { source: 'Referral', visitors: 987, color: '#ff7c7c' },
      { source: 'Email', visitors: 234, color: '#8dd1e1' }
    ],
    deviceBreakdown: [
      { device: 'Desktop', percentage: 48.2 },
      { device: 'Mobile', percentage: 42.8 },
      { device: 'Tablet', percentage: 9.0 }
    ],
    visitorsOverTime: [
      { date: '2024-01-01', visitors: 1234, conversions: 47 },
      { date: '2024-01-02', visitors: 1567, conversions: 52 },
      { date: '2024-01-03', visitors: 1890, conversions: 68 },
      { date: '2024-01-04', visitors: 1456, conversions: 41 },
      { date: '2024-01-05', visitors: 2134, conversions: 89 },
      { date: '2024-01-06', visitors: 1876, conversions: 73 },
      { date: '2024-01-07', visitors: 2345, conversions: 92 }
    ]
  });

  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Advanced Analytics</h3>
          <p className="text-muted-foreground">Comprehensive insights for {websiteName}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={timeRange === '7d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onTimeRangeChange('7d')}
          >
            7 Days
          </Button>
          <Button
            variant={timeRange === '30d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onTimeRangeChange('30d')}
          >
            30 Days
          </Button>
          <Button
            variant={timeRange === '90d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onTimeRangeChange('90d')}
          >
            90 Days
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-xl font-bold">{analyticsData.visitors.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Unique Visitors</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-xl font-bold">{analyticsData.pageViews.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Page Views</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-xl font-bold">${analyticsData.revenue.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-xl font-bold">{analyticsData.conversionRate}%</p>
                <p className="text-xs text-muted-foreground">Conversion Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="ecommerce">E-commerce</TabsTrigger>
          <TabsTrigger value="behavior">Behavior</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Visitors Over Time */}
          <Card>
            <CardHeader>
              <CardTitle>Visitors & Conversions Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analyticsData.visitorsOverTime}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="visitors" stroke="#8884d8" strokeWidth={2} />
                  <Line type="monotone" dataKey="conversions" stroke="#82ca9d" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Device Breakdown */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Device Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analyticsData.deviceBreakdown.map((device, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {device.device === 'Desktop' && <Monitor className="h-4 w-4" />}
                        {device.device === 'Mobile' && <Smartphone className="h-4 w-4" />}
                        {device.device === 'Tablet' && <Monitor className="h-4 w-4" />}
                        <span className="text-sm">{device.device}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold">{device.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Pages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analyticsData.topPages.map((page, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{page.page}</span>
                      <Badge variant="secondary">{page.views.toLocaleString()}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="traffic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analyticsData.trafficSources}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ source, percentage }) => `${source} (${percentage}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="visitors"
                  >
                    {analyticsData.trafficSources.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ecommerce" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <ShoppingCart className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-xl font-bold">{analyticsData.orders}</p>
                    <p className="text-xs text-muted-foreground">Total Orders</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-xl font-bold">${analyticsData.avgOrderValue.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">Avg Order Value</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="text-xl font-bold">{analyticsData.conversionRate}%</p>
                    <p className="text-xs text-muted-foreground">Conversion Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="behavior" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Bounce Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-500">
                    {analyticsData.bounceRate}%
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Visitors who left after viewing one page
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Pages per Session</span>
                    <span className="font-semibold">2.8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Avg Session Duration</span>
                    <span className="font-semibold">3:24</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Return Visitors</span>
                    <span className="font-semibold">42%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedAnalytics;
