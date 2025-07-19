
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  TrendingUp, 
  Palette, 
  Search, 
  Target,
  BarChart3,
  Zap,
  Globe
} from "lucide-react";
import ProductResearcher from './ecommerce/ProductResearcher';
import AITemplateGenerator from './ecommerce/AITemplateGenerator';
import PerformanceMonitor from './ecommerce/PerformanceMonitor';
import SEOOptimizer from './ecommerce/SEOOptimizer';

const EcommerceDashboard = () => {
  const [activeTab, setActiveTab] = useState<'research' | 'templates' | 'performance' | 'seo'>('research');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">E-commerce Domination</h2>
          <p className="text-muted-foreground">AI-powered e-commerce intelligence and optimization</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={activeTab === 'research' ? 'default' : 'outline'}
            onClick={() => setActiveTab('research')}
            className="flex items-center space-x-2"
          >
            <Search className="h-4 w-4" />
            <span>Product Research</span>
          </Button>
          <Button
            variant={activeTab === 'templates' ? 'default' : 'outline'}
            onClick={() => setActiveTab('templates')}
            className="flex items-center space-x-2"
          >
            <Palette className="h-4 w-4" />
            <span>AI Templates</span>
          </Button>
          <Button
            variant={activeTab === 'performance' ? 'default' : 'outline'}
            onClick={() => setActiveTab('performance')}
            className="flex items-center space-x-2"
          >
            <BarChart3 className="h-4 w-4" />
            <span>Performance</span>
          </Button>
          <Button
            variant={activeTab === 'seo' ? 'default' : 'outline'}
            onClick={() => setActiveTab('seo')}
            className="flex items-center space-x-2"
          >
            <Target className="h-4 w-4" />
            <span>SEO Optimizer</span>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <ShoppingCart className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">0</p>
                <p className="text-sm text-muted-foreground">Products Analyzed</p>
                <p className="text-xs text-muted-foreground">This month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">0</p>
                <p className="text-sm text-muted-foreground">Templates Generated</p>
                <p className="text-xs text-muted-foreground">AI-powered</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Zap className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">0</p>
                <p className="text-sm text-muted-foreground">Optimizations</p>
                <p className="text-xs text-muted-foreground">Performance boost</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Globe className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">0</p>
                <p className="text-sm text-muted-foreground">SEO Score</p>
                <p className="text-xs text-muted-foreground">Average rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tab Content */}
      {activeTab === 'research' && <ProductResearcher />}
      {activeTab === 'templates' && <AITemplateGenerator />}
      {activeTab === 'performance' && <PerformanceMonitor />}
      {activeTab === 'seo' && <SEOOptimizer />}
    </div>
  );
};

export default EcommerceDashboard;
