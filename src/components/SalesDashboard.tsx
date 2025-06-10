
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  Search, 
  TrendingUp,
  Users,
  Target,
  Calendar,
  DollarSign,
  MessageSquare
} from "lucide-react";
import ProspectResearcher from './sales/ProspectResearcher';
import SalesSequenceBuilder from './sales/SalesSequenceBuilder';

const SalesDashboard = () => {
  const [activeTab, setActiveTab] = useState<'research' | 'sequences' | 'meetings' | 'deals'>('research');
  const [isResearching, setIsResearching] = useState(false);
  const [researchProgress, setResearchProgress] = useState(0);
  const [prospectInsights, setProspectInsights] = useState(null);

  const handleProspectResearch = async (prospectData: any) => {
    setIsResearching(true);
    setResearchProgress(0);

    // Simulate research process
    const steps = [
      { message: 'Analyzing LinkedIn profile', duration: 2000 },
      { message: 'Gathering company information', duration: 3000 },
      { message: 'Scanning recent news', duration: 2000 },
      { message: 'Generating insights', duration: 3000 }
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, steps[i].duration));
      setResearchProgress((i + 1) * 25);
    }

    // Set mock insights
    const mockInsights = {
      score: 85,
      companySize: '100-500 employees',
      revenue: '$10M - $50M',
      techStack: ['Salesforce', 'HubSpot', 'AWS', 'React', 'Node.js'],
      painPoints: [
        'Manual lead qualification process',
        'Low email response rates',
        'Difficulty tracking prospect engagement',
        'Sales team spending too much time on research'
      ],
      buyingSignals: [
        'Recently posted job openings for sales roles',
        'Downloaded pricing guide from competitor',
        'CEO mentioned scaling challenges in recent interview',
        'Company secured Series B funding 6 months ago'
      ],
      decisionMakers: [
        'John Smith - VP Sales',
        'Sarah Johnson - CMO',
        'Mike Davis - CEO'
      ],
      recentNews: [
        'Announced expansion into European markets',
        'Partnership with major technology vendor',
        'Featured in industry publication about growth'
      ]
    };

    setProspectInsights(mockInsights);
    setIsResearching(false);
    console.log('Research completed for:', prospectData);
  };

  const handleSaveSequence = (sequence: any) => {
    console.log('Saving sequence:', sequence);
  };

  const handleDeploySequence = (sequence: any) => {
    console.log('Deploying sequence:', sequence);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Sales Operations Hub</h2>
          <p className="text-muted-foreground">Intelligent prospect research and sales automation</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={activeTab === 'research' ? 'default' : 'outline'}
            onClick={() => setActiveTab('research')}
            className="flex items-center space-x-2"
          >
            <Search className="h-4 w-4" />
            <span>Research</span>
          </Button>
          <Button
            variant={activeTab === 'sequences' ? 'default' : 'outline'}
            onClick={() => setActiveTab('sequences')}
            className="flex items-center space-x-2"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Sequences</span>
          </Button>
          <Button
            variant={activeTab === 'meetings' ? 'default' : 'outline'}
            onClick={() => setActiveTab('meetings')}
            className="flex items-center space-x-2"
          >
            <Calendar className="h-4 w-4" />
            <span>Meetings</span>
          </Button>
          <Button
            variant={activeTab === 'deals' ? 'default' : 'outline'}
            onClick={() => setActiveTab('deals')}
            className="flex items-center space-x-2"
          >
            <Target className="h-4 w-4" />
            <span>Deals</span>
          </Button>
        </div>
      </div>

      {/* Research Tab */}
      {activeTab === 'research' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-6 w-6 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">340</p>
                    <p className="text-sm text-muted-foreground">Prospects</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">89</p>
                    <p className="text-sm text-muted-foreground">Qualified Leads</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Phone className="h-6 w-6 text-purple-500" />
                  <div>
                    <p className="text-2xl font-bold">45</p>
                    <p className="text-sm text-muted-foreground">Meetings Booked</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-6 w-6 text-orange-500" />
                  <div>
                    <p className="text-2xl font-bold">$2.3M</p>
                    <p className="text-sm text-muted-foreground">Pipeline Value</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <ProspectResearcher 
            onResearch={handleProspectResearch}
            isResearching={isResearching}
            progress={researchProgress}
            insights={prospectInsights}
          />
        </div>
      )}

      {/* Sequences Tab */}
      {activeTab === 'sequences' && (
        <SalesSequenceBuilder 
          onSaveSequence={handleSaveSequence}
          onDeploySequence={handleDeploySequence}
        />
      )}

      {/* Meetings Tab */}
      {activeTab === 'meetings' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Meeting Intelligence</span>
              </CardTitle>
              <CardDescription>
                AI-powered call recording, analysis, and CRM updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Meeting Intelligence Coming Soon</h3>
                <p className="text-muted-foreground">
                  Record calls, analyze conversations, and automatically update your CRM
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Deals Tab */}
      {activeTab === 'deals' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Deal Pipeline</span>
              </CardTitle>
              <CardDescription>
                Track and manage your sales opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Deal Pipeline Coming Soon</h3>
                <p className="text-muted-foreground">
                  Manage your deals with AI-powered insights and progression tracking
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SalesDashboard;
