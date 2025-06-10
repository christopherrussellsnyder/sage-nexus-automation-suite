
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Crown } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import UsageTracker from "../UsageTracker";

interface Template {
  id: string;
  template_name: string;
  feature_type: string;
}

interface DashboardSidebarProps {
  favoriteTemplates: Template[];
  isPremium: boolean;
}

const DashboardSidebar = ({ favoriteTemplates, isPremium }: DashboardSidebarProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <UsageTracker />
      
      {favoriteTemplates.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span>Favorite Templates</span>
            </CardTitle>
            <CardDescription>Quick access to your saved templates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {favoriteTemplates.slice(0, 3).map((template) => (
                <div key={template.id} className="flex items-center justify-between p-2 rounded border">
                  <div>
                    <p className="text-sm font-medium">{template.template_name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{template.feature_type}</p>
                  </div>
                  <Button size="sm" variant="ghost">
                    View
                  </Button>
                </div>
              ))}
            </div>
            {favoriteTemplates.length > 3 && (
              <Button variant="outline" size="sm" className="w-full mt-3">
                View All Templates
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {!isPremium && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-yellow-800">
              <Crown className="h-5 w-5" />
              <span>Upgrade to Premium</span>
            </CardTitle>
            <CardDescription className="text-yellow-700">
              Unlock unlimited generations and advanced features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-yellow-600" />
                  <span>Unlimited template generations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-yellow-600" />
                  <span>Advanced customization options</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-yellow-600" />
                  <span>Priority customer support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-yellow-600" />
                  <span>Export to multiple formats</span>
                </div>
              </div>
              <Button className="w-full" onClick={() => navigate('/pricing')}>
                <Crown className="h-4 w-4 mr-2" />
                Upgrade Now - $30/month
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DashboardSidebar;
