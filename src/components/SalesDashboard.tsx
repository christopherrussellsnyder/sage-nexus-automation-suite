import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  Users, 
  BarChart3,
  RefreshCw,
  MessageSquare,
  Mail,
  Calendar,
  Target,
  TrendingUp,
  Zap
} from "lucide-react";
import EnhancedMarketingWizard from './shared/EnhancedMarketingWizard';
import MarketingSolutionResults from './shared/MarketingSolutionResults';

const SalesDashboard = () => {
  const [activeTab, setActiveTab] = useState<'leads' | 'calls' | 'follow-up' | 'intelligence'>('intelligence');
  const [isCreatingSales, setIsCreatingSales] = useState(false);
  const [salesProgress, setSalesProgress] = useState(0);
  const [marketingSolution, setMarketingSolution] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleCreateSolution = async (data: any) => {
    setIsCreatingSales(true);
    setSalesProgress(0);

    // Simulate progress for sales solution generation
    const steps = [
      { message: 'Analyzing competitor sales strategies', duration: 3000 },
      { message: 'Generating lead qualification frameworks', duration: 4000 },
      { message: 'Creating personalized sales sequences', duration: 4000 },
      { message: 'Optimizing conversion funnels', duration: 2000 }
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, steps[i].duration));
      setSalesProgress((i + 1) * 25);
    }

    setIsCreatingSales(false);
    setMarketingSolution(data);
    setShowResults(true);
    console.log('Complete sales solution created:', data);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Sales Automation Suite</h2>
          <p className="text-muted-foreground">AI-powered lead generation and sales optimization</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={activeTab === 'leads' ? 'default' : 'outline'}
            onClick={() => setActiveTab('leads')}
            className="flex items-center space-x-2"
          >
            <Users className="h-4 w-4" />
            <span>Lead Gen</span>
          </Button>
          <Button
            variant={activeTab === 'calls' ? 'default' : 'outline'}
            onClick={() => setActiveTab('calls')}
            className="flex items-center space-x-2"
          >
            <Phone className="h-4 w-4" />
            <span>Sales Calls</span>
          </Button>
          <Button
            variant={activeTab === 'follow-up' ? 'default' : 'outline'}
            onClick={() => setActiveTab('follow-up')}
            className="flex items-center space-x-2"
          >
            <Mail className="h-4 w-4" />
            <span>Follow-up</span>
          </Button>
          <Button
            variant={activeTab === 'intelligence' ? 'default' : 'outline'}
            onClick={() => setActiveTab('intelligence')}
            className="flex items-center space-x-2"
          >
            <BarChart3 className="h-4 w-4" />
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
                        <p className="text-2xl font-bold">500+</p>
                        <p className="text-sm text-muted-foreground">Qualified Leads</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-6 w-6 text-green-500" />
                      <div>
                        <p className="text-2xl font-bold">45%</p>
                        <p className="text-sm text-muted-foreground">Call Success Rate</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Target className="h-6 w-6 text-purple-500" />
                      <div>
                        <p className="text-2xl font-bold">23%</p>
                        <p className="text-sm text-muted-foreground">Conversion Rate</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-6 w-6 text-orange-500" />
                      <div>
                        <p className="text-2xl font-bold">$185k</p>
                        <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <EnhancedMarketingWizard
                onCreateSolution={handleCreateSolution}
                isCreating={isCreatingSales}
                progress={salesProgress}
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
                {activeTab === 'leads' && <Users className="h-5 w-5" />}
                {activeTab === 'calls' && <Phone className="h-5 w-5" />}
                {activeTab === 'follow-up' && <Mail className="h-5 w-5" />}
                <span>
                  {activeTab === 'leads' && 'Lead Generation'}
                  {activeTab === 'calls' && 'Sales Call Management'}
                  {activeTab === 'follow-up' && 'Follow-up Automation'}
                </span>
              </CardTitle>
              <CardDescription>
                {activeTab === 'leads' && 'Generate qualified leads with AI-powered targeting'}
                {activeTab === 'calls' && 'Optimize sales calls with conversation intelligence'}
                {activeTab === 'follow-up' && 'Automate follow-up sequences for higher conversion'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Zap className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
                <p className="text-muted-foreground mb-4">
                  {activeTab === 'leads' && 'Advanced lead scoring and qualification automation'}
                  {activeTab === 'calls' && 'AI-powered call analysis and coaching recommendations'}
                  {activeTab === 'follow-up' && 'Personalized follow-up sequences with optimal timing'}
                </p>
                <Button variant="outline">
                  Join Waitlist
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SalesDashboard;
