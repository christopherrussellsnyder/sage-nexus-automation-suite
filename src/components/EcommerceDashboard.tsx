
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, 
  TrendingUp, 
  DollarSign,
  BarChart3,
  Search,
  Package,
  Users,
  RefreshCw
} from 'lucide-react';
import ProductResearch from './ecommerce/ProductResearch';

const EcommerceDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'analytics' | 'stores'>('products');

  const stats = [
    {
      title: 'Active Stores',
      value: '12',
      description: 'Generated this month',
      icon: ShoppingCart,
      color: 'text-blue-600'
    },
    {
      title: 'Products Researched',
      value: '1,247',
      description: 'This week',
      icon: Search,
      color: 'text-green-600'
    },
    {
      title: 'Revenue Generated',
      value: '$89K',
      description: 'From AI stores',
      icon: DollarSign,
      color: 'text-purple-600'
    },
    {
      title: 'Conversion Rate',
      value: '4.2%',
      description: 'Average across stores',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">E-commerce Automation</h2>
          <p className="text-muted-foreground">AI-powered store creation and product research</p>
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
            variant={activeTab === 'products' ? 'default' : 'outline'}
            onClick={() => setActiveTab('products')}
            className="flex items-center space-x-2"
          >
            <Search className="h-4 w-4" />
            <span>Product Research</span>
          </Button>
          <Button
            variant={activeTab === 'analytics' ? 'default' : 'outline'}
            onClick={() => setActiveTab('analytics')}
            className="flex items-center space-x-2"
          >
            <BarChart3 className="h-4 w-4" />
            <span>Analytics</span>
          </Button>
          <Button
            variant={activeTab === 'stores' ? 'default' : 'outline'}
            onClick={() => setActiveTab('stores')}
            className="flex items-center space-x-2"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>My Stores</span>
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
      {activeTab === 'products' && <ProductResearch />}
      
      {activeTab === 'overview' && (
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="h-5 w-5" />
                <span>Recent Product Discoveries</span>
              </CardTitle>
              <CardDescription>Latest trending products found by AI</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Wireless Charging Pad</p>
                    <p className="text-sm text-muted-foreground">Electronics • $29.99</p>
                  </div>
                  <Badge variant="default">Hot</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Eco Water Bottle</p>
                    <p className="text-sm text-muted-foreground">Lifestyle • $24.99</p>
                  </div>
                  <Badge variant="secondary">Trending</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">LED Desk Lamp</p>
                    <p className="text-sm text-muted-foreground">Home • $39.99</p>
                  </div>
                  <Badge variant="outline">Rising</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Performance Overview</span>
              </CardTitle>
              <CardDescription>Your e-commerce automation results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total Stores Created</span>
                  <span className="text-2xl font-bold text-blue-600">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Products Analyzed</span>
                  <span className="text-lg font-semibold">1,247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Success Rate</span>
                  <span className="text-lg font-semibold">87%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {(activeTab === 'analytics' || activeTab === 'stores') && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>{activeTab === 'analytics' ? 'Store Analytics' : 'My E-commerce Stores'}</span>
            </CardTitle>
            <CardDescription>
              {activeTab === 'analytics' && 'Detailed performance metrics and insights'}
              {activeTab === 'stores' && 'Manage your AI-generated e-commerce stores'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Feature Available</h3>
              <p className="text-muted-foreground mb-4">
                {activeTab === 'analytics' && 'Comprehensive analytics dashboard with conversion tracking'}
                {activeTab === 'stores' && 'Store management interface with performance monitoring'}
              </p>
              <Button variant="outline">
                Access {activeTab === 'analytics' ? 'Analytics' : 'Store Manager'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EcommerceDashboard;
