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
import SalesSequenceBuilder from './sales/SalesSequenceBuilder';
import MeetingScheduler from './sales/MeetingScheduler';
import DealsTracker from './sales/DealsTracker';

const SalesDashboard = () => {
  const [activeTab, setActiveTab] = useState<'sequences' | 'meetings' | 'deals'>('sequences');

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
          <p className="text-muted-foreground">Intelligent sales automation and pipeline management</p>
        </div>
        <div className="flex space-x-2">
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

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-6 w-6 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">340</p>
                <p className="text-sm text-muted-foreground">Active Prospects</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-6 w-6 text-purple-500" />
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
              <Target className="h-6 w-6 text-green-500" />
              <div>
                <p className="text-2xl font-bold">89</p>
                <p className="text-sm text-muted-foreground">Active Deals</p>
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

      {/* Sequences Tab */}
      {activeTab === 'sequences' && (
        <SalesSequenceBuilder 
          onSaveSequence={handleSaveSequence}
          onDeploySequence={handleDeploySequence}
        />
      )}

      {/* Meetings Tab */}
      {activeTab === 'meetings' && (
        <MeetingScheduler />
      )}

      {/* Deals Tab */}
      {activeTab === 'deals' && (
        <DealsTracker />
      )}
    </div>
  );
};

export default SalesDashboard;
