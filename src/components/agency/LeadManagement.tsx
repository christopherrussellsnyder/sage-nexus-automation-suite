
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
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { UserPlus, Mail, Phone, MessageSquare, Trash2, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  source: string;
  notes: string;
  score: number;
  status: 'hot' | 'warm' | 'cold';
  createdAt: string;
  section: 'sales' | 'agency';
}

interface LeadManagementProps {
  onLeadAdded?: (lead: Lead) => void;
  section?: 'sales' | 'agency';
}

const LeadManagement = ({ onLeadAdded, section = 'agency' }: LeadManagementProps) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isAddingLead, setIsAddingLead] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [newLead, setNewLead] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    source: '',
    notes: ''
  });
  const { toast } = useToast();

  // Load leads from localStorage on component mount - section specific
  useEffect(() => {
    const storageKey = section === 'sales' ? 'salesProspects' : 'leadManagementLeads';
    const savedLeads = localStorage.getItem(storageKey);
    if (savedLeads) {
      setLeads(JSON.parse(savedLeads));
    }
  }, [section]);

  // Save leads to localStorage whenever leads change - section specific
  useEffect(() => {
    const storageKey = section === 'sales' ? 'salesProspects' : 'leadManagementLeads';
    localStorage.setItem(storageKey, JSON.stringify(leads));
  }, [leads, section]);

  const calculateLeadScore = (lead: any): { score: number; status: 'hot' | 'warm' | 'cold' } => {
    let score = 0;
    
    // Company size factor
    if (lead.company.length > 10) score += 20;
    
    // Job title factor
    if (['CEO', 'CTO', 'VP', 'Director', 'Manager'].some(title => 
      lead.jobTitle.toLowerCase().includes(title.toLowerCase()))) {
      score += 25;
    }
    
    // Email domain factor (professional email)
    if (lead.email.includes('@') && !['gmail', 'yahoo', 'hotmail'].some(domain => 
      lead.email.includes(domain))) {
      score += 20;
    }
    
    // Source factor
    const sourceScores: { [key: string]: number } = {
      'linkedin': 25,
      'referral': 30,
      'website': 15,
      'cold-outreach': 10,
      'event': 20
    };
    score += sourceScores[lead.source.toLowerCase()] || 10;
    
    // Notes factor (detailed notes indicate higher engagement)
    if (lead.notes.length > 50) score += 10;
    
    // Determine status based on score
    let status: 'hot' | 'warm' | 'cold';
    if (score >= 80) status = 'hot';
    else if (score >= 60) status = 'warm';
    else status = 'cold';
    
    return { score, status };
  };

  const handleAddLead = () => {
    if (!newLead.name || !newLead.email || !newLead.company) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const { score, status } = calculateLeadScore(newLead);
    
    const lead: Lead = {
      id: Date.now().toString(),
      ...newLead,
      score,
      status,
      createdAt: new Date().toISOString(),
      section
    };

    const updatedLeads = [...leads, lead];
    setLeads(updatedLeads);
    
    // Notify parent component if callback is provided
    if (onLeadAdded) {
      onLeadAdded(lead);
    }

    setNewLead({
      name: '',
      email: '',
      phone: '',
      company: '',
      jobTitle: '',
      source: '',
      notes: ''
    });
    setIsAddingLead(false);

    const leadType = section === 'sales' ? 'prospect' : 'lead';
    toast({
      title: `${leadType.charAt(0).toUpperCase() + leadType.slice(1)} Added`,
      description: `${lead.name} has been added with a ${status} score of ${score}`,
    });
  };

  const handleEditLead = () => {
    if (!editingLead || !newLead.name || !newLead.email || !newLead.company) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const { score, status } = calculateLeadScore(newLead);
    
    const updatedLead: Lead = {
      ...editingLead,
      ...newLead,
      score,
      status
    };

    setLeads(leads.map(lead => 
      lead.id === editingLead.id ? updatedLead : lead
    ));

    setNewLead({
      name: '',
      email: '',
      phone: '',
      company: '',
      jobTitle: '',
      source: '',
      notes: ''
    });
    setEditingLead(null);
    setIsEditing(false);

    const leadType = section === 'sales' ? 'prospect' : 'lead';
    toast({
      title: `${leadType.charAt(0).toUpperCase() + leadType.slice(1)} Updated`,
      description: `${updatedLead.name} has been updated successfully`,
    });
  };

  const openEditDialog = (lead: Lead) => {
    setEditingLead(lead);
    setNewLead({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      company: lead.company,
      jobTitle: lead.jobTitle,
      source: lead.source,
      notes: lead.notes
    });
    setIsEditing(true);
  };

  const handleDeleteLead = (leadId: string) => {
    setLeads(leads.filter(lead => lead.id !== leadId));
    const leadType = section === 'sales' ? 'Prospect' : 'Lead';
    toast({
      title: `${leadType} Deleted`,
      description: `${leadType} has been removed from your list`,
    });
  };

  const handleEmailLead = (lead: Lead) => {
    const subject = encodeURIComponent(`Following up - ${lead.company}`);
    const body = encodeURIComponent(`Hi ${lead.name},\n\nI hope this email finds you well. I wanted to follow up on our previous conversation...\n\nBest regards`);
    window.open(`mailto:${lead.email}?subject=${subject}&body=${body}`);
  };

  const handleCallLead = (lead: Lead) => {
    window.open(`tel:${lead.phone}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hot': return 'bg-red-500';
      case 'warm': return 'bg-yellow-500';
      case 'cold': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const sectionTitle = section === 'sales' ? 'Prospect Management' : 'Lead Management';
  const sectionDescription = section === 'sales' 
    ? 'Add and manage your sales prospects with AI-powered scoring'
    : 'Add and manage your incoming leads with AI-powered scoring. Leads automatically sync to Lead Scoring dashboard.';
  const addButtonText = section === 'sales' ? 'Add Prospect' : 'Add Lead';
  const dialogTitle = section === 'sales' ? 'Add New Prospect' : 'Add New Lead';
  const dialogDescription = section === 'sales' 
    ? 'Add a new prospect and get an automatic AI score based on their profile'
    : 'Add a new lead and get an automatic AI score based on their profile';

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{sectionTitle}</CardTitle>
              <CardDescription>{sectionDescription}</CardDescription>
            </div>
            <Dialog open={isAddingLead} onOpenChange={setIsAddingLead}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  {addButtonText}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>{dialogTitle}</DialogTitle>
                  <DialogDescription>
                    {dialogDescription}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={newLead.name}
                      onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newLead.email}
                      onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                      placeholder="john@company.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={newLead.phone}
                      onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Company *</Label>
                    <Input
                      id="company"
                      value={newLead.company}
                      onChange={(e) => setNewLead({ ...newLead, company: e.target.value })}
                      placeholder="TechCorp Inc"
                    />
                  </div>
                  <div>
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input
                      id="jobTitle"
                      value={newLead.jobTitle}
                      onChange={(e) => setNewLead({ ...newLead, jobTitle: e.target.value })}
                      placeholder="Marketing Director"
                    />
                  </div>
                  <div>
                    <Label htmlFor="source">Lead Source</Label>
                    <Select value={newLead.source} onValueChange={(value) => setNewLead({ ...newLead, source: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                        <SelectItem value="website">Website</SelectItem>
                        <SelectItem value="referral">Referral</SelectItem>
                        <SelectItem value="cold-outreach">Cold Outreach</SelectItem>
                        <SelectItem value="event">Event</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      value={newLead.notes}
                      onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
                      placeholder="Additional information about this lead..."
                      rows={3}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={handleAddLead} className="flex-1">{addButtonText}</Button>
                    <Button variant="outline" onClick={() => setIsAddingLead(false)}>Cancel</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {leads.length === 0 ? (
            <div className="text-center py-8">
              <UserPlus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">{section === 'sales' ? 'No prospects yet' : 'No leads yet'}</h3>
              <p className="text-muted-foreground">{section === 'sales' ? 'Add your first prospect to get started with AI-powered scoring' : 'Add your first lead to get started with AI-powered scoring'}</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{section === 'sales' ? 'Prospect' : 'Lead'}</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>{getInitials(lead.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{lead.name}</div>
                            <div className="text-sm text-muted-foreground">{lead.jobTitle}</div>
                            <div className="text-xs text-muted-foreground">{lead.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{lead.company}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-lg font-bold text-blue-600">{lead.score}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(lead.status)}`} />
                          <span className="capitalize font-medium">{lead.status}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">{lead.source}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => openEditDialog(lead)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleEmailLead(lead)}
                          >
                            <Mail className="h-3 w-3" />
                          </Button>
                          {lead.phone && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleCallLead(lead)}
                            >
                              <Phone className="h-3 w-3" />
                            </Button>
                          )}
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDeleteLead(lead.id)}
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

      {/* Edit Lead Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit {section === 'sales' ? 'Prospect' : 'Lead'}</DialogTitle>
            <DialogDescription>
              Update {section === 'sales' ? 'prospect' : 'lead'} information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Name *</Label>
              <Input
                id="edit-name"
                value={newLead.name}
                onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                placeholder="John Smith"
              />
            </div>
            <div>
              <Label htmlFor="edit-email">Email *</Label>
              <Input
                id="edit-email"
                type="email"
                value={newLead.email}
                onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                placeholder="john@company.com"
              />
            </div>
            <div>
              <Label htmlFor="edit-phone">Phone</Label>
              <Input
                id="edit-phone"
                value={newLead.phone}
                onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div>
              <Label htmlFor="edit-company">Company *</Label>
              <Input
                id="edit-company"
                value={newLead.company}
                onChange={(e) => setNewLead({ ...newLead, company: e.target.value })}
                placeholder="TechCorp Inc"
              />
            </div>
            <div>
              <Label htmlFor="edit-jobTitle">Job Title</Label>
              <Input
                id="edit-jobTitle"
                value={newLead.jobTitle}
                onChange={(e) => setNewLead({ ...newLead, jobTitle: e.target.value })}
                placeholder="Marketing Director"
              />
            </div>
            <div>
              <Label htmlFor="edit-source">Lead Source</Label>
              <Select value={newLead.source} onValueChange={(value) => setNewLead({ ...newLead, source: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="referral">Referral</SelectItem>
                  <SelectItem value="cold-outreach">Cold Outreach</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-notes">Notes</Label>
              <Textarea
                id="edit-notes"
                value={newLead.notes}
                onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
                placeholder="Additional information about this lead..."
                rows={3}
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleEditLead} className="flex-1">Update {section === 'sales' ? 'Prospect' : 'Lead'}</Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LeadManagement;
