
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  TrendingUp, 
  Target, 
  Calendar,
  FileText,
  BarChart3,
  Lightbulb,
  RefreshCw
} from "lucide-react";
import CampaignWizard from './agency/CampaignWizard';
import CampaignResults from './agency/CampaignResults';
import LeadManagement from './agency/LeadManagement';
import LeadScoringDashboard from './agency/LeadScoringDashboard';

const AgencyDashboard = () => {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'leads' | 'scoring'>('campaigns');
  const [campaignData, setCampaignData] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleCreateCampaign = (data: any) => {
    setIsCreating(true);
    setProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsCreating(false);
          setCampaignData(data);
          setShowResults(true);
          return 100;
        }
        return prev + 25;
      });
    }, 1000);
  };

  const handleNurtureLead = (lead: any) => {
    console.log('Nurturing lead:', lead);
  };

  const handleScheduleMeeting = (lead: any) => {
    console.log('Scheduling meeting with:', lead);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Agency Suite</h2>
          <p className="text-muted-foreground">Comprehensive client and campaign management</p>
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
            <Users className="h-4 w-4" />
            <span>Lead Management</span>
          </Button>
          <Button
            variant={activeTab === 'scoring' ? 'default' : 'outline'}
            onClick={() => setActiveTab('scoring')}
            className="flex items-center space-x-2"
          >
            <BarChart3 className="h-4 w-4" />
            <span>Lead Scoring</span>
          </Button>
          <Button className="flex items-center space-x-2">
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </Button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'campaigns' && (
        <div className="space-y-6">
          {!showResults && (
            <CampaignWizard 
              onCreateCampaign={handleCreateCampaign}
              isCreating={isCreating}
              progress={progress}
            />
          )}
          
          {showResults && campaignData && (
            <CampaignResults 
              campaignData={campaignData}
              onClose={() => setShowResults(false)}
            />
          )}
        </div>
      )}

      {activeTab === 'leads' && (
        <LeadManagement />
      )}

      {activeTab === 'scoring' && (
        <LeadScoringDashboard 
          leads={[]}
          onNurtureLead={handleNurtureLead}
          onScheduleMeeting={handleScheduleMeeting}
        />
      )}
    </div>
  );
};

export default AgencyDashboard;
