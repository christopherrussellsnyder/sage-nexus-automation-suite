
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  TrendingUp, 
  BarChart3,
  MessageSquare,
  Calendar,
  Target,
  Megaphone,
  UserCheck
} from "lucide-react";
import CampaignWizard from './agency/CampaignWizard';
import LeadScoringDashboard from './agency/LeadScoringDashboard';
import CampaignResults from './agency/CampaignResults';

const AgencyDashboard = () => {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'leads' | 'social' | 'reports'>('campaigns');
  const [isCreatingCampaign, setIsCreatingCampaign] = useState(false);
  const [campaignProgress, setCampaignProgress] = useState(0);
  const [campaignData, setCampaignData] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleCreateCampaign = async (data: any) => {
    setIsCreatingCampaign(true);
    setCampaignProgress(0);

    // Simulate campaign creation process
    const steps = [
      { message: 'Analyzing industry trends', duration: 2000 },
      { message: 'Generating audience insights', duration: 3000 },
      { message: 'Creating campaign strategy', duration: 3000 },
      { message: 'Setting up automation', duration: 2000 }
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, steps[i].duration));
      setCampaignProgress((i + 1) * 25);
    }

    setIsCreatingCampaign(false);
    setCampaignData(data);
    setShowResults(true);
    console.log('Campaign created with data:', data);
  };

  const handleNurtureLead = (lead: any) => {
    console.log('Nurturing lead:', lead);
  };

  const handleScheduleMeeting = (lead: any) => {
    console.log('Scheduling meeting with lead:', lead);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Marketing Agency Hub</h2>
          <p className="text-muted-foreground">Multi-platform campaign management and optimization</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={activeTab === 'campaigns' ? 'default' : 'outline'}
            onClick={() => setActiveTab('campaigns')}
            className="flex items-center space-x-2"
          >
            <Target className="h-4 w-4" />
            <span>Campaigns</span>
          </Button>
          <Button
            variant={activeTab === 'leads' ? 'default' : 'outline'}
            onClick={() => setActiveTab('leads')}
            className="flex items-center space-x-2"
          >
            <UserCheck className="h-4 w-4" />
            <span>Lead Scoring</span>
          </Button>
          <Button
            variant={activeTab === 'social' ? 'default' : 'outline'}
            onClick={() => setActiveTab('social')}
            className="flex items-center space-x-2"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Social Media</span>
          </Button>
          <Button
            variant={activeTab === 'reports' ? 'default' : 'outline'}
            onClick={() => setActiveTab('reports')}
            className="flex items-center space-x-2"
          >
            <BarChart3 className="h-4 w-4" />
            <span>Reports</span>
          </Button>
        </div>
      </div>

      {/* Campaign Tab */}
      {activeTab === 'campaigns' && (
        <div className="space-y-6">
          {!showResults && (
            <>
              <div className="grid md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Target className="h-6 w-6 text-blue-500" />
                      <div>
                        <p className="text-2xl font-bold">24</p>
                        <p className="text-sm text-muted-foreground">Active Campaigns</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-6 w-6 text-green-500" />
                      <div>
                        <p className="text-2xl font-bold">+285%</p>
                        <p className="text-sm text-muted-foreground">Avg ROI</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Users className="h-6 w-6 text-purple-500" />
                      <div>
                        <p className="text-2xl font-bold">156K</p>
                        <p className="text-sm text-muted-foreground">Reach</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Megaphone className="h-6 w-6 text-orange-500" />
                      <div>
                        <p className="text-2xl font-bold">12.4%</p>
                        <p className="text-sm text-muted-foreground">Conversion Rate</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <CampaignWizard 
                onCreateCampaign={handleCreateCampaign}
                isCreating={isCreatingCampaign}
                progress={campaignProgress}
              />
            </>
          )}

          {showResults && campaignData && (
            <CampaignResults 
              campaignData={campaignData}
              onClose={() => setShowResults(false)}
            />
          )}
        </div>
      )}

      {/* Lead Scoring Tab */}
      {activeTab === 'leads' && (
        <LeadScoringDashboard 
          leads={[]}
          onNurtureLead={handleNurtureLead}
          onScheduleMeeting={handleScheduleMeeting}
        />
      )}

      {/* Social Media Tab */}
      {activeTab === 'social' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>Social Media Content Factory</span>
              </CardTitle>
              <CardDescription>
                AI-powered content generation and scheduling across all platforms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Social Media Factory Coming Soon</h3>
                <p className="text-muted-foreground">
                  Generate and schedule content across Facebook, Instagram, Twitter, LinkedIn, and TikTok
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Client Reporting Automation</span>
              </CardTitle>
              <CardDescription>
                Automated reports with insights from all marketing channels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Automated Reporting Coming Soon</h3>
                <p className="text-muted-foreground">
                  Generate comprehensive reports automatically from all your marketing platforms
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AgencyDashboard;
