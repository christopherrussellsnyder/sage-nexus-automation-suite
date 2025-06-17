import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  BarChart3, 
  DollarSign,
  RefreshCw,
  Target,
  TrendingUp,
  Briefcase,
  Calendar,
  Megaphone,
  Brain,
  Settings
} from "lucide-react";
import EnhancedMarketingWizard from './shared/EnhancedMarketingWizard';
import MarketingSolutionResults from './shared/MarketingSolutionResults';

const AgencyDashboard = () => {
  const [activeTab, setActiveTab] = useState<'clients' | 'campaigns' | 'reports' | 'intelligence'>('intelligence');
  const [isCreatingAgency, setIsCreatingAgency] = useState(false);
  const [agencyProgress, setAgencyProgress] = useState(0);
  const [marketingSolution, setMarketingSolution] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleCreateSolution = async (data: any) => {
    setIsCreatingAgency(true);
    setAgencyProgress(0);

    // Simulate progress for agency solution generation
    const steps = [
      { message: 'Analyzing client industry competitors', duration: 3000 },
      { message: 'Generating multi-client campaign strategies', duration: 4000 },
      { message: 'Creating white-label reports and dashboards', duration: 4000 },
      { message: 'Optimizing agency workflow automation', duration: 2000 }
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, steps[i].duration));
      setAgencyProgress((i + 1) * 25);
    }

    setIsCreatingAgency(false);
    setMarketingSolution(data);
    setShowResults(true);
    console.log('Complete agency solution created:', data);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Agency Management Suite</h2>
          <p className="text-muted-foreground">Comprehensive client management and campaign intelligence</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={activeTab === 'clients' ? 'default' : 'outline'}
            onClick={() => setActiveTab('clients')}
            className="flex items-center space-x-2"
          >
            <Users className="h-4 w-4" />
            <span>Clients</span>
          </Button>
          <Button
            variant={activeTab === 'campaigns' ? 'default' : 'outline'}
            onClick={() => setActiveTab('campaigns')}
            className="flex items-center space-x-2"
          >
            <Megaphone className="h-4 w-4" />
            <span>Campaigns</span>
          </Button>
          <Button
            variant={activeTab === 'reports' ? 'default' : 'outline'}
            onClick={() => setActiveTab('reports')}
            className="flex items-center space-x-2"
          >
            <BarChart3 className="h-4 w-4" />
            <span>Reports</span>
          </Button>
          <Button
            variant={activeTab === 'intelligence' ? 'default' : 'outline'}
            onClick={() => setActiveTab('intelligence')}
            className="flex items-center space-x-2"
          >
            <Brain className="h-4 w-4" />
            <span>Intelligence</span>
          </Button>
          <Button className="flex items-center space-x-2">
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </Button>
        </div>
      </div>

      {/* Intelligence Tab */}
      {activeTab === 'intelligence' && (
        <div className="space-y-6">
          {!showResults && (
            <>
              <div className="grid md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Users className="h-6 w-6 text-blue-500" />
                      <div>
                        <p className="text-2xl font-bold">24</p>
                        <p className="text-sm text-muted-foreground">Active Clients</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Megaphone className="h-6 w-6 text-green-500" />
                      <div>
                        <p className="text-2xl font-bold">147</p>
                        <p className="text-sm text-muted-foreground">Active Campaigns</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-6 w-6 text-purple-500" />
                      <div>
                        <p className="text-2xl font-bold">$845k</p>
                        <p className="text-sm text-muted-foreground">Monthly Ad Spend</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-6 w-6 text-orange-500" />
                      <div>
                        <p className="text-2xl font-bold">4.2x</p>
                        <p className="text-sm text-muted-foreground">Avg Client ROAS</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <EnhancedMarketingWizard
                onCreateSolution={handleCreateSolution}
                isCreating={isCreatingAgency}
                progress={agencyProgress}
              />
            </>
          )}

          {showResults && marketingSolution && (
            <MarketingSolutionResults
              data={marketingSolution}
              onClose={() => {
                setShowResults(false);
                setMarketingSolution(null);
              }}
            />
          )}
        </div>
      )}

      {/* Other Tabs - Placeholder Content */}
      {activeTab !== 'intelligence' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {activeTab === 'clients' && <Users className="h-5 w-5" />}
                {activeTab === 'campaigns' && <Megaphone className="h-5 w-5" />}
                {activeTab === 'reports' && <BarChart3 className="h-5 w-5" />}
                <span>
                  {activeTab === 'clients' && 'Client Management'}
                  {activeTab === 'campaigns' && 'Campaign Management'}
                  {activeTab === 'reports' && 'Reporting & Analytics'}
                </span>
              </CardTitle>
              <CardDescription>
                {activeTab === 'clients' && 'Manage client relationships and project timelines'}
                {activeTab === 'campaigns' && 'Oversee all client campaigns from one dashboard'}
                {activeTab === 'reports' && 'Generate white-label reports for clients'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Settings className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
                <p className="text-muted-foreground mb-4">
                  {activeTab === 'clients' && 'Advanced client portal with project management'}
                  {activeTab === 'campaigns' && 'Multi-client campaign orchestration and automation'}
                  {activeTab === 'reports' && 'Automated white-label reporting with custom branding'}
                </p>
                <Button variant="outline">
                  Request Early Access
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AgencyDashboard;
