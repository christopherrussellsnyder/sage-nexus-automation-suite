
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DollarSign, TrendingUp, Target, Plus, Trash2, Calendar as CalendarIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface Deal {
  id: string;
  dealName: string;
  clientName: string;
  companyName: string;
  amount: number;
  stage: 'prospecting' | 'qualified' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  probability: number;
  expectedCloseDate: Date;
  actualCloseDate?: Date;
  notes: string;
  createdAt: Date;
}

const DealsTracker = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isAddingDeal, setIsAddingDeal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [newDeal, setNewDeal] = useState({
    dealName: '',
    clientName: '',
    companyName: '',
    amount: '',
    stage: 'prospecting',
    probability: '25',
    notes: ''
  });
  const { toast } = useToast();

  const stages = [
    { value: 'prospecting', label: 'Prospecting', probability: 25 },
    { value: 'qualified', label: 'Qualified', probability: 40 },
    { value: 'proposal', label: 'Proposal', probability: 60 },
    { value: 'negotiation', label: 'Negotiation', probability: 80 },
    { value: 'closed-won', label: 'Closed Won', probability: 100 },
    { value: 'closed-lost', label: 'Closed Lost', probability: 0 }
  ];

  const handleAddDeal = () => {
    if (!newDeal.dealName || !newDeal.clientName || !newDeal.companyName || !newDeal.amount || !selectedDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const deal: Deal = {
      id: Date.now().toString(),
      dealName: newDeal.dealName,
      clientName: newDeal.clientName,
      companyName: newDeal.companyName,
      amount: parseFloat(newDeal.amount),
      stage: newDeal.stage as Deal['stage'],
      probability: parseInt(newDeal.probability),
      expectedCloseDate: selectedDate,
      notes: newDeal.notes,
      createdAt: new Date(),
      ...(newDeal.stage === 'closed-won' && { actualCloseDate: new Date() })
    };

    setDeals([...deals, deal].sort((a, b) => b.amount - a.amount));

    setNewDeal({
      dealName: '',
      clientName: '',
      companyName: '',
      amount: '',
      stage: 'prospecting',
      probability: '25',
      notes: ''
    });
    setSelectedDate(undefined);
    setIsAddingDeal(false);

    toast({
      title: "Deal Added",
      description: `${deal.dealName} has been added to your pipeline`,
    });
  };

  const handleDeleteDeal = (dealId: string) => {
    setDeals(deals.filter(deal => deal.id !== dealId));
    toast({
      title: "Deal Deleted",
      description: "Deal has been removed from your pipeline",
    });
  };

  const handleUpdateDealStage = (dealId: string, newStage: Deal['stage']) => {
    setDeals(deals.map(deal => {
      if (deal.id === dealId) {
        const stageInfo = stages.find(s => s.value === newStage);
        return {
          ...deal,
          stage: newStage,
          probability: stageInfo?.probability || deal.probability,
          ...(newStage === 'closed-won' && { actualCloseDate: new Date() })
        };
      }
      return deal;
    }));

    toast({
      title: "Deal Updated",
      description: `Deal stage updated to ${newStage.replace('-', ' ')}`,
    });
  };

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

  const totalPipelineValue = deals
    .filter(deal => !['closed-won', 'closed-lost'].includes(deal.stage))
    .reduce((sum, deal) => sum + (deal.amount * deal.probability / 100), 0);

  const totalWonValue = deals
    .filter(deal => deal.stage === 'closed-won')
    .reduce((sum, deal) => sum + deal.amount, 0);

  const activeDealCount = deals.filter(deal => !['closed-won', 'closed-lost'].includes(deal.stage)).length;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-6 w-6 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{activeDealCount}</p>
                <p className="text-sm text-muted-foreground">Active Deals</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-6 w-6 text-green-500" />
              <div>
                <p className="text-2xl font-bold">${totalPipelineValue.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Pipeline Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">${totalWonValue.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Closed Won</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-6 w-6 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">
                  {activeDealCount > 0 ? Math.round(totalPipelineValue / activeDealCount) : 0}%
                </p>
                <p className="text-sm text-muted-foreground">Avg Win Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Deal Pipeline</span>
              </CardTitle>
              <CardDescription>Track and manage your sales opportunities</CardDescription>
            </div>
            <Dialog open={isAddingDeal} onOpenChange={setIsAddingDeal}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Deal
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Deal</DialogTitle>
                  <DialogDescription>
                    Add a new deal to your sales pipeline
                  </DialogDescription>
                </DialogHeader>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="dealName">Deal Name *</Label>
                      <Input
                        id="dealName"
                        value={newDeal.dealName}
                        onChange={(e) => setNewDeal({ ...newDeal, dealName: e.target.value })}
                        placeholder="Q1 Software License Deal"
                      />
                    </div>
                    <div>
                      <Label htmlFor="clientName">Client Name *</Label>
                      <Input
                        id="clientName"
                        value={newDeal.clientName}
                        onChange={(e) => setNewDeal({ ...newDeal, clientName: e.target.value })}
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input
                        id="companyName"
                        value={newDeal.companyName}
                        onChange={(e) => setNewDeal({ ...newDeal, companyName: e.target.value })}
                        placeholder="TechCorp Inc"
                      />
                    </div>
                    <div>
                      <Label htmlFor="amount">Deal Amount ($) *</Label>
                      <Input
                        id="amount"
                        type="number"
                        value={newDeal.amount}
                        onChange={(e) => setNewDeal({ ...newDeal, amount: e.target.value })}
                        placeholder="50000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="stage">Deal Stage</Label>
                      <Select 
                        value={newDeal.stage} 
                        onValueChange={(value) => {
                          const stage = stages.find(s => s.value === value);
                          setNewDeal({ 
                            ...newDeal, 
                            stage: value,
                            probability: stage?.probability.toString() || '25'
                          });
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {stages.map((stage) => (
                            <SelectItem key={stage.value} value={stage.value}>
                              {stage.label} ({stage.probability}%)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea
                        id="notes"
                        value={newDeal.notes}
                        onChange={(e) => setNewDeal({ ...newDeal, notes: e.target.value })}
                        placeholder="Deal details, next steps, key requirements..."
                        rows={3}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Expected Close Date *</Label>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                      className="rounded-md border"
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleAddDeal} className="flex-1">Add Deal</Button>
                  <Button variant="outline" onClick={() => setIsAddingDeal(false)}>Cancel</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {deals.length === 0 ? (
            <div className="text-center py-8">
              <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No deals yet</h3>
              <p className="text-muted-foreground">Add your first deal to start tracking your pipeline</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Deal</TableHead>
                    <TableHead>Client & Company</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Probability</TableHead>
                    <TableHead>Close Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deals.map((deal) => (
                    <TableRow key={deal.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{deal.dealName}</div>
                          <div className="text-sm text-muted-foreground">
                            Created {format(deal.createdAt, 'MMM dd, yyyy')}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{deal.clientName}</div>
                          <div className="text-sm text-muted-foreground">{deal.companyName}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold text-green-600">
                          ${deal.amount.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Select 
                          value={deal.stage} 
                          onValueChange={(value) => handleUpdateDealStage(deal.id, value as Deal['stage'])}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {stages.map((stage) => (
                              <SelectItem key={stage.value} value={stage.value}>
                                {stage.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getStageColor(deal.stage)} text-white`}>
                          {deal.probability}%
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {format(deal.expectedCloseDate, 'MMM dd, yyyy')}
                          {deal.actualCloseDate && (
                            <div className="text-green-600 font-medium">
                              Closed: {format(deal.actualCloseDate, 'MMM dd, yyyy')}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDeleteDeal(deal.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DealsTracker;
