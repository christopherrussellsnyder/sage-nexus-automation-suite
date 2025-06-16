
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Zap, 
  Clock, 
  Gauge, 
  Smartphone, 
  Monitor, 
  Globe,
  RefreshCw,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

interface PerformanceMetrics {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
  mobileScore: number;
  desktopScore: number;
}

interface PerformanceMonitorProps {
  websiteUrl: string;
  onOptimize: (optimizations: string[]) => void;
}

const PerformanceMonitor = ({ websiteUrl, onOptimize }: PerformanceMonitorProps) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 2.1,
    firstContentfulPaint: 1.2,
    largestContentfulPaint: 2.5,
    cumulativeLayoutShift: 0.1,
    firstInputDelay: 50,
    mobileScore: 78,
    desktopScore: 92
  });
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [optimizations, setOptimizations] = useState([
    'Compress images to reduce load time',
    'Minify CSS and JavaScript files',
    'Enable browser caching',
    'Optimize font loading strategy',
    'Reduce third-party script impact'
  ]);

  const runPerformanceTest = async () => {
    setIsAnalyzing(true);
    
    // Simulate performance analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate realistic performance metrics
    setMetrics({
      loadTime: 1.8 + Math.random() * 0.6,
      firstContentfulPaint: 0.9 + Math.random() * 0.4,
      largestContentfulPaint: 2.0 + Math.random() * 0.8,
      cumulativeLayoutShift: Math.random() * 0.2,
      firstInputDelay: 30 + Math.random() * 40,
      mobileScore: 75 + Math.floor(Math.random() * 20),
      desktopScore: 85 + Math.floor(Math.random() * 15)
    });
    
    setIsAnalyzing(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return 'default';
    if (score >= 50) return 'secondary';
    return 'destructive';
  };

  const applyOptimizations = () => {
    onOptimize(optimizations);
    // Simulate improved metrics after optimization
    setMetrics(prev => ({
      ...prev,
      loadTime: Math.max(0.8, prev.loadTime - 0.5),
      mobileScore: Math.min(100, prev.mobileScore + 10),
      desktopScore: Math.min(100, prev.desktopScore + 5)
    }));
  };

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5" />
              <span>Performance Overview</span>
            </div>
            <Button onClick={runPerformanceTest} disabled={isAnalyzing} size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              {isAnalyzing ? 'Testing...' : 'Run Test'}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Mobile Score */}
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Smartphone className="h-5 w-5" />
                <span className="font-medium">Mobile</span>
              </div>
              <div className={`text-3xl font-bold ${getScoreColor(metrics.mobileScore)}`}>
                {metrics.mobileScore}
              </div>
              <Badge variant={getScoreBadge(metrics.mobileScore)} className="mt-2">
                {metrics.mobileScore >= 90 ? 'Good' : metrics.mobileScore >= 50 ? 'Needs Improvement' : 'Poor'}
              </Badge>
            </div>

            {/* Desktop Score */}
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Monitor className="h-5 w-5" />
                <span className="font-medium">Desktop</span>
              </div>
              <div className={`text-3xl font-bold ${getScoreColor(metrics.desktopScore)}`}>
                {metrics.desktopScore}
              </div>
              <Badge variant={getScoreBadge(metrics.desktopScore)} className="mt-2">
                {metrics.desktopScore >= 90 ? 'Good' : metrics.desktopScore >= 50 ? 'Needs Improvement' : 'Poor'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Core Web Vitals */}
      <Card>
        <CardHeader>
          <CardTitle>Core Web Vitals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">First Contentful Paint</span>
              </div>
              <div className="text-right">
                <div className="font-semibold">{metrics.firstContentfulPaint.toFixed(1)}s</div>
                <Badge variant={metrics.firstContentfulPaint <= 1.8 ? 'default' : 'secondary'} className="text-xs">
                  {metrics.firstContentfulPaint <= 1.8 ? 'Good' : 'Needs Improvement'}
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Gauge className="h-4 w-4" />
                <span className="text-sm font-medium">Largest Contentful Paint</span>
              </div>
              <div className="text-right">
                <div className="font-semibold">{metrics.largestContentfulPaint.toFixed(1)}s</div>
                <Badge variant={metrics.largestContentfulPaint <= 2.5 ? 'default' : 'secondary'} className="text-xs">
                  {metrics.largestContentfulPaint <= 2.5 ? 'Good' : 'Needs Improvement'}
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">Cumulative Layout Shift</span>
              </div>
              <div className="text-right">
                <div className="font-semibold">{metrics.cumulativeLayoutShift.toFixed(2)}</div>
                <Badge variant={metrics.cumulativeLayoutShift <= 0.1 ? 'default' : 'secondary'} className="text-xs">
                  {metrics.cumulativeLayoutShift <= 0.1 ? 'Good' : 'Needs Improvement'}
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4" />
                <span className="text-sm font-medium">First Input Delay</span>
              </div>
              <div className="text-right">
                <div className="font-semibold">{metrics.firstInputDelay.toFixed(0)}ms</div>
                <Badge variant={metrics.firstInputDelay <= 100 ? 'default' : 'secondary'} className="text-xs">
                  {metrics.firstInputDelay <= 100 ? 'Good' : 'Needs Improvement'}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Optimization Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5" />
            <span>Optimization Opportunities</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 mb-4">
            {optimizations.map((optimization, index) => (
              <div key={index} className="flex items-center space-x-2 p-2 border rounded">
                <TrendingUp className="h-4 w-4 text-blue-500" />
                <span className="text-sm">{optimization}</span>
              </div>
            ))}
          </div>
          
          <Button onClick={applyOptimizations} className="w-full">
            <Zap className="h-4 w-4 mr-2" />
            Apply Auto-Optimizations
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceMonitor;
