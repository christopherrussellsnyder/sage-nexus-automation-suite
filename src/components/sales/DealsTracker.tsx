
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar } from '@/components/ui/calendar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Target, DollarSign, Calendar as CalendarIcon, User, Building, Trash2, Edit, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface Deal {
  id: string;
  title: string;
  contactName: string;
  company: string;
  value: number;
  stage: 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  probability: number;
  closeDate: Date;
  notes: string;
  createdAt: string;
  section: 'sales' | 'agency';
}

const DealsTracker = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isAddingDeal, setIsAddingDeal] = useState(false);
  const [isEditingDeal, setIsEditingDeal] = useState(false);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [newDeal, setNewDeal] = useState({
    title: '',
    contactName: '',
    company: '',
    value: '',
    stage: 'prospecting',
    probability: '25',
    notes: ''
  });
  const { toast } = useToast();

  // Determine current section based on URL or context
  const currentSection = window.location.pathname.includes('agency') ? 'agency' : 'sales';

  // Load deals from localStorage on component mount
  useEffect(() => {
    const savedDeals = localStorage.getItem(`dealsTracker_${currentSection}`);
    if (savedDeals) {
      const parsedDeals = JSON.parse(savedDeals).map((deal: any) => ({
        ...deal,
        closeDate: new Date(deal.closeDate)
      }));
      setDeals(parsedDeals);
    }
  }, [currentSection]);

  // Save deals to localStorage whenever deals change
  useEffect(() => {
    if (deals.length >= 0) {
      localStorage.setItem(`dealsTracker_${currentSection}`, JSON.stringify(deals));
    }
  }, [deals, currentSection]);

  const stages = [
    { value: 'prospecting', label: 'Prospecting', probability: 25, color: 'bg-gray-500' },
    { value: 'qualification', label: 'Qualification', probability: 40, color: 'bg-blue-500' },
    { value: 'proposal', label: 'Proposal', probability: 60, color: 'bg-yellow-500' },
    { value: 'negotiation', label: 'Negotiation', probability: 80, color: 'bg-orange-500' },
    { value: 'closed-won', label: 'Closed Won', probability: 100, color: 'bg-green-500' },
    { value: 'closed-lost', label: 'Closed Lost', probability: 0, color: 'bg-red-500' }
  ];

  const handleAddDeal = () => {
    if (!newDeal.title || !newDeal.contactName || !newDeal.company || !newDeal.value || !selectedDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const selectedStage = stages.find(s => s.value === newDeal.stage);
    
    const deal: Deal = {
      id: Date.now().toString(),
      title: newDeal.title,
      contactName: newDeal.contactName,
      company: newDeal.company,
      value: parseFloat(newDeal.value),
      stage: newDeal.stage as Deal['stage'],
      probability: selectedStage?.probability || parseInt(newDeal.probability),
      closeDate: selectedDate,
      notes: newDeal.notes,
      createdAt: new Date().toISOString(),
      section: currentSection
    };

    const updatedDeals = [...deals, deal].sort((a, b) => 
      new Date(a.closeDate).getTime() - new Date(b.closeDate).getTime()
    );
    setDeals(updatedDeals);

    setNewDeal({
      title: '',
      contactName: '',
      company: '',
      value: '',
      stage: 'prospecting',
      probability: '25',
      notes: ''
    });
    setSelectedDate(undefined);
    setIsAddingDeal(false);

    toast({
      title: "Deal Added",
      description: `Deal "${deal.title}" has been added to ${currentSection === 'sales' ? 'Sales' : 'Agency'} pipeline`,
    });
  };

  const handleEditDeal = (deal: Deal) => {
    setEditingDeal(deal);
    setSelectedDate(deal.closeDate);
    setNewDeal({
      title: deal.title,
      contactName: deal.contactName,
      company: deal.company,
      value: deal.value.toString(),
      stage: deal.stage,
      probability: deal.probability.toString(),
      notes: deal.notes
    });
    setIsEditingDeal(true);
  };

  const handleUpdateDeal = () => {
    if (!editingDeal || !newDeal.title || !newDeal.contactName || !newDeal.company || !newDeal.value || !selectedDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const selectedStage = stages.find(s => s.value === newDeal.stage);
    
    const updatedDeal: Deal = {
      ...editingDeal,
      title: newDeal.title,
      contactName: newDeal.contactName,
      company: newDeal.company,
      value: parseFloat(newDeal.value),
      stage: newDeal.stage as Deal['stage'],
      probability: selectedStage?.probability || parseInt(newDeal.probability),
      closeDate: selectedDate,
      notes: newDeal.notes
    };

    const updatedDeals = deals.map(deal => 
      deal.id === editingDeal.id ? updatedDeal : deal
    );
    setDeals(updatedDeals);

    setNewDeal({
      title: '',
      contactName: '',
      company: '',
      value: '',
      stage: 'prospecting',
      probability: '25',
      notes: ''
    });
    setSelectedDate(undefined);
    setIsEditingDeal(false);
    setEditingDeal(null);

    toast({
      title: "Deal Updated",
      description: `Deal "${updatedDeal.title}" has been updated successfully`,
    });
  };

  const handleDeleteDeal = (dealId: string) => {
    const updatedDeals = deals.filter(deal => deal.id !== dealId);
    setDeals(updatedDeals);
    toast({
      title: "Deal Deleted",
      description: "Deal has been removed from your pipeline",
    });
  };

  const getStageInfo = (stage: string) => {
    return stages.find(s => s.value === stage) || stages[0];
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const totalPipelineValue = deals
    .filter(deal => !['closed-won', 'closed-lost'].includes(deal.stage))
    .reduce((sum, deal) => sum + (deal.value * deal.probability / 100), 0);

  const wonDeals = deals.filter(deal => deal.stage === 'closed-won');
  const totalWonValue = wonDeals.reduce((sum, deal) => sum + deal.value, 0);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-8 w-8 text-blue-600" />
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
              <DollarSign className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">${totalWonValue.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Won Deals</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{deals.length}</p>
                <p className="text-sm text-muted-foreground">Total Deals</p>
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
                <span>Deals Pipeline - {currentSection === 'sales' ? 'Sales' : 'Agency'}</span>
              </CardTitle>
              <CardDescription>Track and manage your {currentSection === 'sales' ? 'sales' : 'agency'} deals</CardDescription>
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
                    Create a new deal in your pipeline
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
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactName">Contact Name *</Label>
                      <Input
                        id="contactName"
                        value={newDeal.contactName}
                        onChange={(e) => setNewDeal({ ...newDeal, contactName: e.target.value })}
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Company *</Label>
                      <Input
                        id="company"
                        value={newDeal.company}
                        onChange={(e) => setNewDeal({ ...newDeal, company: e.target.value })}
                        placeholder="TechCorp Inc"
                      />
                    </div>
                    <div>
                      <Label htmlFor="value">Deal Value *</Label>
                      <Input
                        id="value"
                        type="number"
                        value={newDeal.value}
                        onChange={(e) => setNewDeal({ ...newDeal, value: e.target.value })}
                        placeholder="50000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="stage">Stage</Label>
                      <Select value={newDeal.stage} onValueChange={(value) => setNewDeal({ ...newDeal, stage: value })}>
                        <SelectTrigger>
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
                    </div>
                    <div>
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea
                        id="notes"
                        value={newDeal.notes}
                        onChange={(e) => setNewDeal({ ...newDeal, notes: e.target.value })}
                        placeholder="Deal notes and details..."
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
                    <TableHead>Contact</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Probability</TableHead>
                    <TableHead>Close Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deals.map((deal) => {
                    const stageInfo = getStageInfo(deal.stage);
                    return (
                      <TableRow key={deal.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{deal.title}</div>
                            <div className="text-sm text-muted-foreground">{deal.company}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{getInitials(deal.contactName)}</AvatarFallback>
                            </Avatar>
                            <span>{deal.contactName}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">${deal.value.toLocaleString()}</div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${stageInfo.color} text-white`}>
                            {stageInfo.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress value={deal.probability} className="w-16" />
                            <span className="text-sm">{deal.probability}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {format(deal.closeDate, 'MMM dd, yyyy')}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleEditDeal(deal)}
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
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
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
                />
              </div>
              <div>
                <Label htmlFor="edit-contactName">Contact Name *</Label>
                <Input
                  id="edit-contactName"
                  value={newDeal.contactName}
                  onChange={(e) => setNewDeal({ ...newDeal, contactName: e.target.value })}
                  placeholder="John Smith"
                />
              </div>
              <div>
                <Label htmlFor="edit-company">Company *</Label>
                <Input
                  id="edit-company"
                  value={newDeal.company}
                  onChange={(e) => setNewDeal({ ...newDeal, company: e.target.value })}
                  placeholder="TechCorp Inc"
                />
              </div>
              <div>
                <Label htmlFor="edit-value">Deal Value *</Label>
                <Input
                  id="edit-value"
                  type="number"
                  value={newDeal.value}
                  onChange={(e) => setNewDeal({ ...newDeal, value: e.target.value })}
                  placeholder="50000"
                />
              </div>
              <div>
                <Label htmlFor="edit-stage">Stage</Label>
                <Select value={newDeal.stage} onValueChange={(value) => setNewDeal({ ...newDeal, stage: value })}>
                  <SelectTrigger>
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
              </div>
              <div>
                <Label htmlFor="edit-notes">Notes</Label>
                <Textarea
                  id="edit-notes"
                  value={newDeal.notes}
                  onChange={(e) => setNewDeal({ ...newDeal, notes: e.target.value })}
                  placeholder="Deal notes and details..."
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
            <Button onClick={handleUpdateDeal} className="flex-1">Update Deal</Button>
            <Button variant="outline" onClick={() => setIsEditingDeal(false)}>Cancel</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DealsTracker;
