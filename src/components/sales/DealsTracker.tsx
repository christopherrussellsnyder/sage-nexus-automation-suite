
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Target, DollarSign, TrendingUp, Calendar as CalendarIcon, Building, User, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface Deal {
  id: string;
  title: string;
  contactName: string;
  businessName: string;
  value: number;
  stage: 'prospecting' | 'qualified' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  probability: number;
  expectedCloseDate: Date;
  notes: string;
  createdAt: Date;
  section: 'sales' | 'agency';
}

interface DealsTrackerProps {
  section?: 'sales' | 'agency';
}

const DealsTracker = ({ section = 'sales' }: DealsTrackerProps) => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isAddingDeal, setIsAddingDeal] = useState(false);
  const [isEditingDeal, setIsEditingDeal] = useState(false);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [newDeal, setNewDeal] = useState({
    title: '',
    contactName: '',
    businessName: '',
    value: '',
    stage: 'prospecting' as Deal['stage'],
    probability: '25',
    notes: ''
  });
  const { toast } = useToast();

  // Load deals from localStorage for the specific section
  useEffect(() => {
    const savedDeals = localStorage.getItem(`deals_${section}`);
    if (savedDeals) {
      const parsed = JSON.parse(savedDeals).map((deal: any) => ({
        ...deal,
        expectedCloseDate: new Date(deal.expectedCloseDate),
        createdAt: new Date(deal.createdAt)
      }));
      setDeals(parsed);
    }
  }, [section]);

  // Save deals to localStorage whenever deals change
  useEffect(() => {
    localStorage.setItem(`deals_${section}`, JSON.stringify(deals));
  }, [deals, section]);

  const handleAddDeal = () => {
    if (!newDeal.title || !newDeal.contactName || !newDeal.businessName || !newDeal.value || !selectedDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const deal: Deal = {
      id: Date.now().toString(),
      title: newDeal.title,
      contactName: newDeal.contactName,
      businessName: newDeal.businessName,
      value: parseFloat(newDeal.value),
      stage: newDeal.stage,
      probability: parseInt(newDeal.probability),
      expectedCloseDate: selectedDate,
      notes: newDeal.notes,
      createdAt: new Date(),
      section
    };

    setDeals([...deals, deal].sort((a, b) => 
      new Date(a.expectedCloseDate).getTime() - new Date(b.expectedCloseDate).getTime()
    ));

    setNewDeal({
      title: '',
      contactName: '',
      businessName: '',
      value: '',
      stage: 'prospecting',
      probability: '25',
      notes: ''
    });
    setSelectedDate(undefined);
    setIsAddingDeal(false);

    toast({
      title: "Deal Added",
      description: `Deal "${deal.title}" has been added to your pipeline`,
    });
  };

  const handleEditDeal = () => {
    if (!editingDeal || !newDeal.title || !newDeal.contactName || !newDeal.businessName || !newDeal.value || !selectedDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const updatedDeal: Deal = {
      ...editingDeal,
      title: newDeal.title,
      contactName: newDeal.contactName,
      businessName: newDeal.businessName,
      value: parseFloat(newDeal.value),
      stage: newDeal.stage,
      probability: parseInt(newDeal.probability),
      expectedCloseDate: selectedDate,
      notes: newDeal.notes
    };

    setDeals(deals.map(deal => 
      deal.id === editingDeal.id ? updatedDeal : deal
    ).sort((a, b) => 
      new Date(a.expectedCloseDate).getTime() - new Date(b.expectedCloseDate).getTime()
    ));

    setNewDeal({
      title: '',
      contactName: '',
      businessName: '',
      value: '',
      stage: 'prospecting',
      probability: '25',
      notes: ''
    });
    setSelectedDate(undefined);
    setEditingDeal(null);
    setIsEditingDeal(false);

    toast({
      title: "Deal Updated",
      description: `Deal "${updatedDeal.title}" has been updated`,
    });
  };

  const openEditDialog = (deal: Deal) => {
    setEditingDeal(deal);
    setSelectedDate(deal.expectedCloseDate);
    setNewDeal({
      title: deal.title,
      contactName: deal.contactName,
      businessName: deal.businessName,
      value: deal.value.toString(),
      stage: deal.stage,
      probability: deal.probability.toString(),
      notes: deal.notes
    });
    setIsEditingDeal(true);
  };

  const handleDeleteDeal = (dealId: string) => {
    setDeals(deals.filter(deal => deal.id !== dealId));
    toast({
      title: "Deal Deleted",
      description: "Deal has been removed from your pipeline",
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

  const getTotalPipelineValue = () => {
    return deals
      .filter(deal => !['closed-won', 'closed-lost'].includes(deal.stage))
      .reduce((total, deal) => total + (deal.value * deal.probability / 100), 0);
  };

  const getClosedDealsValue = () => {
    return deals
      .filter(deal => deal.stage === 'closed-won')
      .reduce((total, deal) => total + deal.value, 0);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Deals Pipeline</span>
              </CardTitle>
              <CardDescription>Track and manage your sales opportunities</CardDescription>
            </div>
            <Dialog open={isAddingDeal} onOpenChange={setIsAddingDeal}>
              <DialogTrigger asChild>
                <Button>
                  <Target className="h-4 w-4 mr-2" />
                  Add Deal
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Deal</DialogTitle>
                  <DialogDescription>
                    Create a new deal opportunity
                  </DialogDescription>
                </DialogHeader>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Deal Title *</Label>
                      <Input
                        id="title"
                        value={newDeal.title}
                        onChange={(e) => setNewDeal({ ...newDeal, title: e.target.value })}
                        placeholder="Website Redesign Project"
                        className="focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactName">Contact Name *</Label>
                      <Input
                        id="contactName"
                        value={newDeal.contactName}
                        onChange={(e) => setNewDeal({ ...newDeal, contactName: e.target.value })}
                        placeholder="John Smith"
                        className="focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="businessName">Business Name *</Label>
                      <Input
                        id="businessName"
                        value={newDeal.businessName}
                        onChange={(e) => setNewDeal({ ...newDeal, businessName: e.target.value })}
                        placeholder="TechCorp Inc"
                        className="focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="value">Deal Value ($) *</Label>
                      <Input
                        id="value"
                        type="number"
                        value={newDeal.value}
                        onChange={(e) => setNewDeal({ ...newDeal, value: e.target.value })}
                        placeholder="5000"
                        className="focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="stage">Stage</Label>
                        <Select value={newDeal.stage} onValueChange={(value: Deal['stage']) => setNewDeal({ ...newDeal, stage: value })}>
                          <SelectTrigger className="focus:ring-2 focus:ring-green-500 focus:border-green-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="prospecting">Prospecting</SelectItem>
                            <SelectItem value="qualified">Qualified</SelectItem>
                            <SelectItem value="proposal">Proposal</SelectItem>
                            <SelectItem value="negotiation">Negotiation</SelectItem>
                            <SelectItem value="closed-won">Closed Won</SelectItem>
                            <SelectItem value="closed-lost">Closed Lost</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="probability">Probability (%)</Label>
                        <Select value={newDeal.probability} onValueChange={(value) => setNewDeal({ ...newDeal, probability: value })}>
                          <SelectTrigger className="focus:ring-2 focus:ring-green-500 focus:border-green-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="10">10%</SelectItem>
                            <SelectItem value="25">25%</SelectItem>
                            <SelectItem value="50">50%</SelectItem>
                            <SelectItem value="75">75%</SelectItem>
                            <SelectItem value="90">90%</SelectItem>
                            <SelectItem value="100">100%</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea
                        id="notes"
                        value={newDeal.notes}
                        onChange={(e) => setNewDeal({ ...newDeal, notes: e.target.value })}
                        placeholder="Deal details, next steps..."
                        rows={3}
                        className="focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
          {/* Pipeline Stats */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <DollarSign className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">${getTotalPipelineValue().toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Pipeline Value</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">${getClosedDealsValue().toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Closed Won</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Target className="h-8 w-8 text-purple-600" />
                  <div>
                    <p className="text-2xl font-bold">{deals.filter(d => d.stage !== 'closed-won' && d.stage !== 'closed-lost').length}</p>
                    <p className="text-sm text-muted-foreground">Active Deals</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Deals List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Active Deals</h3>
            {deals.length === 0 ? (
              <div className="text-center py-8 border rounded-lg">
                <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No deals in your pipeline yet</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {deals.map((deal) => (
                  <Card key={deal.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className={`${getStageColor(deal.stage)} text-white`}>
                              {deal.stage.replace('-', ' ')}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {deal.probability}% probability
                            </span>
                          </div>
                          <h4 className="font-medium">{deal.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                            <div className="flex items-center space-x-1">
                              <User className="h-3 w-3" />
                              <span>{deal.contactName}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Building className="h-3 w-3" />
                              <span>{deal.businessName}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <DollarSign className="h-3 w-3" />
                              <span>${deal.value.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <CalendarIcon className="h-3 w-3" />
                              <span>{format(deal.expectedCloseDate, 'MMM dd, yyyy')}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => openEditDialog(deal)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDeleteDeal(deal.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit Deal Dialog */}
      <Dialog open={isEditingDeal} onOpenChange={setIsEditingDeal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Deal</DialogTitle>
            <DialogDescription>
              Update deal information
            </DialogDescription>
          </DialogHeader>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-title">Deal Title *</Label>
                <Input
                  id="edit-title"
                  value={newDeal.title}
                  onChange={(e) => setNewDeal({ ...newDeal, title: e.target.value })}
                  placeholder="Website Redesign Project"
                  className="focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <Label htmlFor="edit-contactName">Contact Name *</Label>
                <Input
                  id="edit-contactName"
                  value={newDeal.contactName}
                  onChange={(e) => setNewDeal({ ...newDeal, contactName: e.target.value })}
                  placeholder="John Smith"
                  className="focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <Label htmlFor="edit-businessName">Business Name *</Label>
                <Input
                  id="edit-businessName"
                  value={newDeal.businessName}
                  onChange={(e) => setNewDeal({ ...newDeal, businessName: e.target.value })}
                  placeholder="TechCorp Inc"
                  className="focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <Label htmlFor="edit-value">Deal Value ($) *</Label>
                <Input
                  id="edit-value"
                  type="number"
                  value={newDeal.value}
                  onChange={(e) => setNewDeal({ ...newDeal, value: e.target.value })}
                  placeholder="5000"
                  className="focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-stage">Stage</Label>
                  <Select value={newDeal.stage} onValueChange={(value: Deal['stage']) => setNewDeal({ ...newDeal, stage: value })}>
                    <SelectTrigger className="focus:ring-2 focus:ring-green-500 focus:border-green-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prospecting">Prospecting</SelectItem>
                      <SelectItem value="qualified">Qualified</SelectItem>
                      <SelectItem value="proposal">Proposal</SelectItem>
                      <SelectItem value="negotiation">Negotiation</SelectItem>
                      <SelectItem value="closed-won">Closed Won</SelectItem>
                      <SelectItem value="closed-lost">Closed Lost</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-probability">Probability (%)</Label>
                  <Select value={newDeal.probability} onValueChange={(value) => setNewDeal({ ...newDeal, probability: value })}>
                    <SelectTrigger className="focus:ring-2 focus:ring-green-500 focus:border-green-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10%</SelectItem>
                      <SelectItem value="25">25%</SelectItem>
                      <SelectItem value="50">50%</SelectItem>
                      <SelectItem value="75">75%</SelectItem>
                      <SelectItem value="90">90%</SelectItem>
                      <SelectItem value="100">100%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="edit-notes">Notes</Label>
                <Textarea
                  id="edit-notes"
                  value={newDeal.notes}
                  onChange={(e) => setNewDeal({ ...newDeal, notes: e.target.value })}
                  placeholder="Deal details, next steps..."
                  rows={3}
                  className="focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
            <Button onClick={handleEditDeal} className="flex-1">Update Deal</Button>
            <Button variant="outline" onClick={() => setIsEditingDeal(false)}>Cancel</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DealsTracker;
