
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useUsageTracking } from "@/hooks/useUsageTracking";
import { Crown, Zap } from "lucide-react";

interface UsageTrackerProps {
  featureType?: 'website' | 'advertising' | 'email' | 'social';
  compact?: boolean;
}

const UsageTracker = ({ featureType, compact = false }: UsageTrackerProps) => {
  const { usage, subscription, getRemainingUsage, getUsagePercentage, loading } = useUsageTracking();

  if (loading) return <div>Loading usage...</div>;

  const isPremium = subscription?.subscription_type === 'premium';

  if (compact && featureType) {
    const remaining = getRemainingUsage(featureType);
    const percentage = getUsagePercentage(featureType);

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {isPremium ? 'Unlimited' : `${remaining}/5 generations left`}
          </span>
          {isPremium && <Crown className="h-4 w-4 text-yellow-500" />}
        </div>
        {!isPremium && (
          <Progress value={percentage} className="h-2" />
        )}
        {!isPremium && remaining === 0 && (
          <Button size="sm" className="w-full">
            <Crown className="h-4 w-4 mr-2" />
            Upgrade to Premium
          </Button>
        )}
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Usage Overview</span>
          {isPremium && (
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              <Crown className="h-3 w-3 mr-1" />
              Premium
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          {isPremium ? 'Unlimited generations available' : 'Track your free trial usage across all features'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(usage).map(([type, count]) => {
          const remaining = getRemainingUsage(type as keyof typeof usage);
          const percentage = getUsagePercentage(type as keyof typeof usage);
          
          return (
            <div key={type} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium capitalize">{type} Copy</span>
                <span className="text-sm text-muted-foreground">
                  {isPremium ? '∞' : `${count}/5`}
                </span>
              </div>
              {!isPremium && (
                <Progress value={percentage} className="h-2" />
              )}
            </div>
          );
        })}
        
        {!isPremium && (
          <div className="pt-4 border-t">
            <Button className="w-full" size="lg">
              <Crown className="h-4 w-4 mr-2" />
              Upgrade to Premium - $30/month
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Get unlimited generations for all copy types
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UsageTracker;
