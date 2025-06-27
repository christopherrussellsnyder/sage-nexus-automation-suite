
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, RefreshCw, Clock, TrendingUp, CheckCircle, Database, Zap } from 'lucide-react';
import { ProductResearchService } from '@/services/ProductResearchService';
import { useToast } from '@/hooks/use-toast';

const WeeklyProductsStatus = () => {
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);
  const [nextUpdate, setNextUpdate] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [daysUntilUpdate, setDaysUntilUpdate] = useState<number>(0);
  const { toast } = useToast();

  useEffect(() => {
    updateStatus();
    const interval = setInterval(updateStatus, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const updateStatus = () => {
    const lastUpdateTime = ProductResearchService.getLastUpdateTime();
    const nextUpdateTime = ProductResearchService.getNextUpdateTime();
    const source = ProductResearchService.getDataSource();
    
    setLastUpdate(lastUpdateTime);
    setNextUpdate(nextUpdateTime);
    setDataSource(source);

    if (nextUpdateTime) {
      const now = new Date();
      const next = new Date(nextUpdateTime);
      const diffTime = next.getTime() - now.getTime();
      const diffDays = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
      setDaysUntilUpdate(diffDays);
    }
  };

  const handleForceRefresh = async () => {
    setIsRefreshing(true);
    try {
      await ProductResearchService.fetchWeeklyProducts();
      updateStatus();
      toast({
        title: "Products Updated Successfully",
        description: "Fetched fresh product data from high-revenue Shopify stores via live API",
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to fetch fresh product data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getUpdateProgress = () => {
    if (!lastUpdate || !nextUpdate) return 0;
    
    const last = new Date(lastUpdate);
    const next = new Date(nextUpdate);
    const now = new Date();
    
    const totalDuration = next.getTime() - last.getTime();
    const elapsed = now.getTime() - last.getTime();
    
    return Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
  };

  const getDataSourceBadge = () => {
    if (dataSource === 'live_api') {
      return (
        <Badge variant="default" className="bg-green-100 text-green-800">
          <Zap className="h-3 w-3 mr-1" />
          Live API Data
        </Badge>
      );
    }
    return (
      <Badge variant="secondary">
        <Database className="h-3 w-3 mr-1" />
        Enhanced Mock Data
      </Badge>
    );
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5" />
          <span>Weekly Product Research Status</span>
          {getDataSourceBadge()}
        </CardTitle>
        <CardDescription>
          Automated weekly scanning of 1000+ high-revenue Shopify stores ($300K-$2M revenue) with direct product links
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Last Update</span>
            </div>
            {lastUpdate ? (
              <div className="text-sm">
                {formatDate(lastUpdate)}
                <Badge variant="secondary" className="ml-2">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Complete
                </Badge>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">No data yet</div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Next Update</span>
            </div>
            {nextUpdate ? (
              <div className="text-sm">
                {formatDate(nextUpdate)}
                <Badge variant="outline" className="ml-2">
                  {daysUntilUpdate} days
                </Badge>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">Calculating...</div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <RefreshCw className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Update Progress</span>
            </div>
            <div className="space-y-1">
              <Progress value={getUpdateProgress()} />
              <div className="text-xs text-muted-foreground">
                {Math.round(getUpdateProgress())}% through current cycle
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            {dataSource === 'live_api' 
              ? 'Products sourced via live API with direct Shopify store links' 
              : 'Using enhanced mock data - configure API key for live data'
            }
          </div>
          <Button 
            onClick={handleForceRefresh}
            disabled={isRefreshing}
            variant="outline"
            size="sm"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Updating...' : 'Force Update'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyProductsStatus;
