
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Target, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  Eye,
  Edit,
  Phone,
  Mail,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Deal {
  id: string;
  name: string;
  company: string;
  value: number;
  stage: 'prospecting' | 'qualified' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  probability: number;
  expectedCloseDate: string;
  lastActivity: string;
  contactPerson: string;
  email: string;
  phone: string;
  notes: string[];
  nextSteps: string;
}

const DealsTracker = () => {
  const [deals, setDeals] = useState<Deal[]>([
    {
      id: '1',
      name: 'Enterprise Software License',
      company: 'TechCorp Solutions',
      value: 45000,
      stage: 'proposal',
      probability: 75,
      expectedCloseDate: '2024-02-15',
      lastActivity: '2 hours ago',
      contactPerson: 'Sarah Johnson',
      email: 'sarah.johnson@techcorp.com',
      phone: '+1 (555) 123-4567',
      notes: [
        'Initial demo went very well',
        'CEO is very interested in the ROI projections',
        'Need to address security concerns with IT team'
      ],
      nextSteps: 'Schedule technical review with IT team'
    },
    {
      id: '2',
      name: 'Marketing Automation Platform',
      company: 'Growth Dynamics',
      value: 28000,
      stage: 'negotiation',
      probability: 85,
      expectedCloseDate: '2024-01-30',
      lastActivity: '1 day ago',
      contactPerson: 'Michael Chen',
      email: 'michael.chen@growthdynamics.com',
      phone: '+1 (555) 987-6543',
      notes: [
        'Negotiating on implementation timeline',
        'Budget approved by finance team',
        'Competitor comparison completed'
      ],
      nextSteps: 'Send final contract proposal'
    },
    {
      id: '3',
      name: 'CRM Implementation',
      company: 'InnovateTech',
      value: 15000,
      stage: 'qualified',
      probability: 60,
      expectedCloseDate: '2024-03-01',
      lastActivity: '3 days ago',
      contactPerson: 'Emma Wilson',
      email: 'emma.wilson@innovatetech.com',
      phone: '+1 (555) 456-7890',
      notes: [
        'Qualified budget and timeline',
        'Decision maker identified',
        'Sent detailed proposal'
      ],
      nextSteps: 'Follow up on proposal review'
    }
  ]);

  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const { toast } = useToast();

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'prospecting': return 'bg-gray-500';
      case 'qualified': return 'bg-blue-500';
      case 'proposal': return 'bg-yellow-500';
      case 'negotiation': return 'bg-orange-500';
      case 'closed-won': return 'bg-green-500';
      case 'closed-lost': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 75) return 'text-green-600';
    if (probability >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const moveDealStage = (dealId: string, newStage: Deal['stage']) => {
    setDeals(deals.map(deal => 
      deal.id === dealId 
        ? { ...deal, stage: newStage, lastActivity: 'Just now' }
        : deal
    ));
    
    toast({
      title: "Deal Updated",
      description: `Deal moved to ${newStage.replace('-', ' ')} stage`,
    });
  };

  const totalPipelineValue = deals.reduce((sum, deal) => sum + deal.value, 0);
  const weightedPipelineValue = deals.reduce((sum, deal) => sum + (deal.value * deal.probability / 100), 0);

  return (
    <div className="space-y-6">
      {/* Pipeline Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{deals.length}</p>
                <p className="text-sm text-muted-foreground">Active Deals</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{formatCurrency(totalPipelineValue)}</p>
                <p className="text-sm text-muted-foreground">Pipeline Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">{formatCurrency(weightedPipelineValue)}</p>
                <p className="text-sm text-muted-foreground">Weighted Pipeline</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">28</p>
                <p className="text-sm text-muted-foreground">Avg. Sales Cycle</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Deals Table */}
      <Card>
        <CardHeader>
          <CardTitle>Deal Pipeline</CardTitle>
          <CardDescription>Track and manage your sales opportunities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Deal</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Probability</TableHead>
                  <TableHead>Close Date</TableHead>
                  <TableHead>Last Activity</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deals.map((deal) => (
                  <TableRow key={deal.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>{deal.company.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{deal.name}</div>
                          <div className="text-sm text-muted-foreground">{deal.company}</div>
                          <div className="text-xs text-muted-foreground">{deal.contactPerson}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${getStageColor(deal.stage)}`} />
                        <span className="capitalize font-medium">{deal.stage.replace('-', ' ')}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold">{formatCurrency(deal.value)}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className={`font-medium ${getProbabilityColor(deal.probability)}`}>
                          {deal.probability}%
                        </span>
                        <Progress value={deal.probability} className="w-16 h-2" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{new Date(deal.expectedCloseDate).toLocaleDateString()}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">{deal.lastActivity}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setSelectedDeal(deal)}
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>{deal.name} - Deal Details</DialogTitle>
                              <DialogDescription>
                                {deal.company} • {formatCurrency(deal.value)}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-semibold mb-2">Contact Information</h4>
                                  <div className="space-y-1 text-sm">
                                    <div>👤 {deal.contactPerson}</div>
                                    <div>📧 {deal.email}</div>
                                    <div>📞 {deal.phone}</div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2">Deal Information</h4>
                                  <div className="space-y-1 text-sm">
                                    <div>Stage: {deal.stage.replace('-', ' ')}</div>
                                    <div>Probability: {deal.probability}%</div>
                                    <div>Expected Close: {new Date(deal.expectedCloseDate).toLocaleDateString()}</div>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Notes</h4>
                                <div className="space-y-2">
                                  {deal.notes.map((note, index) => (
                                    <div key={index} className="flex items-start space-x-2">
                                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                      <span className="text-sm">{note}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Next Steps</h4>
                                <p className="text-sm text-muted-foreground">{deal.nextSteps}</p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Mail className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Phone className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DealsTracker;
