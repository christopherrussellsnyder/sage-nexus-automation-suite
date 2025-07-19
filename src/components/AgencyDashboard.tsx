
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  BarChart3,
  RefreshCw,
  Target,
  Mail,
  Calendar,
  DollarSign
} from "lucide-react";
import LeadManagement from './agency/LeadManagement';
import LeadScoringDashboard from './agency/LeadScoringDashboard';
import DealsTracker from './sales/DealsTracker';
import EmailSequenceBuilder from './sales/EmailSequenceBuilder';
import MeetingScheduler from './sales/MeetingScheduler';

const AgencyDashboard = () => {
  const [activeTab, setActiveTab] = useState<'leads' | 'scoring' | 'deals' | 'sequences' | 'meetings'>('leads');
  const [leads, setLeads] = useState<any[]>([]);

  const handleLeadAdded = (lead: any) => {
    setLeads(prev => [...prev, lead]);
  };

  const handleNurtureLead = (lead: any) => {
    console.log('Nurturing lead:', lead);
  };

  const handleScheduleMeeting = (lead: any) => {
    console.log('Scheduling meeting with:', lead);
  };

  const handleDeleteLead = (leadId: string) => {
    setLeads(prev => prev.filter(lead => lead.id !== leadId));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Agency Suite</h2>
          <p className="text-muted-foreground">Comprehensive lead management and scoring</p>
        </div>
        <div className="flex space-x-2">
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
          <Button
            variant={activeTab === 'deals' ? 'default' : 'outline'}
            onClick={() => setActiveTab('deals')}
            className="flex items-center space-x-2"
          >
            <Target className="h-4 w-4" />
            <span>Deals</span>
          </Button>
          <Button
            variant={activeTab === 'sequences' ? 'default' : 'outline'}
            onClick={() => setActiveTab('sequences')}
            className="flex items-center space-x-2"
          >
            <Mail className="h-4 w-4" />
            <span>Email Sequences</span>
          </Button>
          <Button
            variant={activeTab === 'meetings' ? 'default' : 'outline'}
            onClick={() => setActiveTab('meetings')}
            className="flex items-center space-x-2"
          >
            <Calendar className="h-4 w-4" />
            <span>Meetings</span>
          </Button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'leads' && (
        <LeadManagement onLeadAdded={handleLeadAdded} />
      )}

      {activeTab === 'scoring' && (
        <LeadScoringDashboard 
          leads={leads}
          onNurtureLead={handleNurtureLead}
          onScheduleMeeting={handleScheduleMeeting}
          onDeleteLead={handleDeleteLead}
        />
      )}

      {activeTab === 'deals' && <DealsTracker />}
      {activeTab === 'sequences' && <EmailSequenceBuilder />}
      {activeTab === 'meetings' && <MeetingScheduler />}
    </div>
  );
};

export default AgencyDashboard;
