
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// Usage tracking hook removed - component disabled
import { Crown, Zap } from "lucide-react";

interface UsageTrackerProps {
  featureType?: 'website' | 'advertising' | 'email' | 'social';
  compact?: boolean;
}

const UsageTracker = ({ featureType, compact = false }: UsageTrackerProps) => {
  // Usage tracking disabled - no database tables configured
  return null;
};

export default UsageTracker;
