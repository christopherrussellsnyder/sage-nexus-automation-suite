
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Target, Plus, Trash2, Edit, DollarSign, Calendar as CalendarIcon, User, Building } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface Deal {
  id: string;
  title: string;
  contactName: string;
  company: string;
  value: number;
  stage: 'prospecting' | 'qualified' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  probability: number;
  expectedCloseDate: Date;
  notes: string;
  createdAt: string;
  section: 'sales' | 'agency';
}

interface DealsTrackerProps {
  section?: 'sales' | 'agency';
}

const DealsTracker = ({ section = 'sales' }: DealsTrackerProps) => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [newDeal, setNewDeal] = useState({
    title: '',
    contactName: '',
    company: '',
    value: 0,
    stage: 'prospecting' as const,
    probability: 10,
    notes: ''
  });
  const { toast } = useToast();

  // Load deals from localStorage on mount - section specific
  useEffect(() => {
    const savedDeals = localStorage.getItem(`deals_${section}`);
    if (savedDeals) {
      const parsed = JSON.parse(savedDeals).map((deal: any) => ({
        ...deal,
        expectedCloseDate: new Date(deal.expectedCloseDate)
      }));
      setDeals(parsed);
    }
  }, [section]);

  // Save deals to localStorage whenever deals change
  useEffect(() => {
    localStorage.setItem(`deals_${section}`, JSON.stringify(deals));
  }, [deals, section]);

  const handleCreateDeal = () => {
    if (!newDeal.title || !newDeal.contactName || !newDeal.company || !selectedDate) {
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
      company: newDeal.company,
      value: newDeal.value,
      stage: newDeal.stage,
      probability: newDeal.probability,
      expectedCloseDate: selectedDate,
      notes: newDeal.notes,
      createdAt: new Date().toISOString(),
      section
    };

    setDeals([...deals, deal].sort((a, b) => 
      new Date(a.expectedCloseDate).getTime() - new Date(b.expectedCloseDate).getTime()
    ));

    setNewDeal({
      title: '',
      contactName: '',
      company: '',
      value: 0,
      stage: 'prospecting',
      probability: 10,
      notes: ''
    });
    setSelectedDate(undefined);
    setIsCreating(false);

    toast({
      title: "Deal Created",
      description: `${deal.title} has been added to your pipeline`,
    });
  };

  const handleEditDeal = () => {
    if (!editingDeal || !newDeal.title || !newDeal.contactName || !newDeal.company || !selectedDate) {
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
      company: newDeal.company,
      value: newDeal.value,
      stage: newDeal.stage,
      probability: newDeal.probability,
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
      company: '',
      value: 0,
      stage: 'prospecting',
      probability: 10,
      notes: ''
    });
    setSelectedDate(undefined);
    setEditingDeal(null);
    setIsEditing(false);

    toast({
      title: "Deal Updated",
      description: `${updatedDeal.title} has been updated successfully`,
    });
  };

  const openEditDialog = (deal: Deal) => {
    setEditingDeal(deal);
    setSelectedDate(deal.expectedCloseDate);
    setNewDeal({
      title: deal.title,
      contactName: deal.contactName,
      company: deal.company,
      value: deal.value,
      stage: deal.stage,
      probability: deal.probability,
      notes: deal.notes
    });
    setIsEditing(true);
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

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const totalPipelineValue = deals
    .filter(deal => !['closed-won', 'closed-lost'].includes(deal.stage))
    .reduce((sum, deal) => sum + deal.value, 0);

  const wonDeals = deals.filter(deal => deal.stage === 'closed-won');
  const totalWonValue = wonDeals.reduce((sum, deal) => sum + deal.value, 0);

  const activeDeals = deals.filter(deal => !['closed-won', 'closed-lost'].includes(deal.stage));

  const sectionTitle = section === 'sales' ? 'Sales Pipeline' : 'Agency Deals';

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>{sectionTitle}</span>
              </CardTitle>
              <CardDescription>Track your deals through the sales pipeline</CardDescription>
            </div>
            <Dialog open={isCreating} onOpenChange={setIsCreating}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Deal
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Deal</DialogTitle>
                  <DialogDescription>
                    Add a new deal to your pipeline
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
                      <Label htmlFor="value">Deal Value ($)</Label>
                      <Input
                        id="value"
                        type="number"
                        value={newDeal.value}
                        onChange={(e) => setNewDeal({ ...newDeal, value: parseFloat(e.target.value) || 0 })}
                        placeholder="10000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="stage">Deal Stage</Label>
                      <Select value={newDeal.stage} onValueChange={(value) => setNewDeal({ ...newDeal, stage: value as any })}>
                        <SelectTrigger>
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
                      <Input
                        id="probability"
                        type="number"
                        min="0"
                        max="100"
                        value={newDeal.probability}
                        onChange={(e) => setNewDeal({ ...newDeal, probability: parseInt(e.target.value) || 0 })}
                        placeholder="50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea
                        id="notes"
                        value={newDeal.notes}
                        onChange={(e) => setNewDeal({ ...newDeal, notes: e.target.value })}
                        placeholder="Deal notes and next steps..."
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
                  <Button onClick={handleCreateDeal} className="flex-1">Create Deal</Button>
                  <Button variant="outline" onClick={() => setIsCreating(false)}>Cancel</Button>
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
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-green-500" />
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
                  <Target className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">{activeDeals.length}</p>
                    <p className="text-sm text-muted-foreground">Active Deals</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="text-2xl font-bold">${totalWonValue.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Won This Month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {deals.length === 0 ? (
            <div className="text-center py-8 border rounded-lg">
              <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No deals yet</h3>
              <p className="text-muted-foreground">Create your first deal to start tracking your pipeline</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Deal</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Value</TableHead>
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
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>{getInitials(deal.contactName)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{deal.title}</div>
                            <div className="text-sm text-muted-foreground">{deal.contactName}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{deal.company}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">${deal.value.toLocaleString()}</div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getStageColor(deal.stage)} text-white capitalize`}>
                          {deal.stage.replace('-', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{deal.probability}%</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{format(deal.expectedCloseDate, 'MMM dd, yyyy')}</span>
                      </TableCell>
                      <TableCell>
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
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Deal Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
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
                <Label htmlFor="edit-value">Deal Value ($)</Label>
                <Input
                  id="edit-value"
                  type="number"
                  value={newDeal.value}
                  onChange={(e) => setNewDeal({ ...newDeal, value: parseFloat(e.target.value) || 0 })}
                  placeholder="10000"
                />
              </div>
              <div>
                <Label htmlFor="edit-stage">Deal Stage</Label>
                <Select value={newDeal.stage} onValueChange={(value) => setNewDeal({ ...newDeal, stage: value as any })}>
                  <SelectTrigger>
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
                <Input
                  id="edit-probability"
                  type="number"
                  min="0"
                  max="100"
                  value={newDeal.probability}
                  onChange={(e) => setNewDeal({ ...newDeal, probability: parseInt(e.target.value) || 0 })}
                  placeholder="50"
                />
              </div>
              <div>
                <Label htmlFor="edit-notes">Notes</Label>
                <Textarea
                  id="edit-notes"
                  value={newDeal.notes}
                  onChange={(e) => setNewDeal({ ...newDeal, notes: e.target.value })}
                  placeholder="Deal notes and next steps..."
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
            <Button onClick={handleEditDeal} className="flex-1">Update Deal</Button>
            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DealsTracker;
