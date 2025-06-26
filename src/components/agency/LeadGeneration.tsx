
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { UserPlus, Phone, Mail, Building, Globe, TrendingUp } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'won' | 'lost';
  estimatedValue: number;
  lastContact: string;
  notes: string;
  industry: string;
}

interface LeadGenerationProps {
  onLeadAdded?: (lead: Lead) => void;
}

const LeadGeneration = ({ onLeadAdded }: LeadGenerationProps) => {
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      company: 'TechCorp Inc',
      email: 'sarah@techcorp.com',
      phone: '+1 (555) 123-4567',
      source: 'Website Contact',
      status: 'qualified',
      estimatedValue: 25000,
      lastContact: '2024-01-20',
      notes: 'Interested in digital marketing services. Looking to start Q2.',
      industry: 'Technology'
    },
    {
      id: '2',
      name: 'Mike Chen',
      company: 'StartupXYZ',
      email: 'mike@startupxyz.com',
      phone: '+1 (555) 987-6543',
      source: 'LinkedIn',
      status: 'proposal',
      estimatedValue: 18000,
      lastContact: '2024-01-18',
      notes: 'Needs complete brand strategy. Budget confirmed.',
      industry: 'Startup'
    }
  ]);

  const [newLead, setNewLead] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    source: '',
    estimatedValue: 0,
    notes: '',
    industry: ''
  });

  const handleAddLead = () => {
    const lead: Lead = {
      id: Date.now().toString(),
      ...newLead,
      status: 'new',
      lastContact: new Date().toISOString().split('T')[0]
    };
    
    const updatedLeads = [...leads, lead];
    setLeads(updatedLeads);
    
    if (onLeadAdded) {
      onLeadAdded(lead);
    }
    
    setNewLead({
      name: '',
      company: '',
      email: '',
      phone: '',
      source: '',
      estimatedValue: 0,
      notes: '',
      industry: ''
    });
  };

  const updateLeadStatus = (leadId: string, newStatus: Lead['status']) => {
    setLeads(leads.map(lead => 
      lead.id === leadId 
        ? { ...lead, status: newStatus, lastContact: new Date().toISOString().split('T')[0] }
        : lead
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500';
      case 'contacted': return 'bg-yellow-500';
      case 'qualified': return 'bg-green-500';
      case 'proposal': return 'bg-purple-500';
      case 'won': return 'bg-green-600';
      case 'lost': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const totalValue = leads.reduce((sum, lead) => sum + lead.estimatedValue, 0);
  const qualifiedLeads = leads.filter(lead => ['qualified', 'proposal'].includes(lead.status));

  return (
    <div className="space-y-6">
      {/* Lead Generation Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <UserPlus className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{leads.length}</p>
                <p className="text-sm text-muted-foreground">Total Leads</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{qualifiedLeads.length}</p>
                <p className="text-sm text-muted-foreground">Qualified Leads</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Building className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">${totalValue.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Pipeline Value</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Globe className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{leads.filter(l => l.status === 'won').length}</p>
                <p className="text-sm text-muted-foreground">Converted</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Add New Lead */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add New Lead</CardTitle>
              <CardDescription>Capture new potential client information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="leadName">Contact Name</Label>
                <Input
                  id="leadName"
                  value={newLead.name}
                  onChange={(e) => setNewLead({...newLead, name: e.target.value})}
                  placeholder="Enter contact name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={newLead.company}
                  onChange={(e) => setNewLead({...newLead, company: e.target.value})}
                  placeholder="Enter company name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newLead.email}
                  onChange={(e) => setNewLead({...newLead, email: e.target.value})}
                  placeholder="Enter email address"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newLead.phone}
                  onChange={(e) => setNewLead({...newLead, phone: e.target.value})}
                  placeholder="Enter phone number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="source">Lead Source</Label>
                <Select value={newLead.source} onValueChange={(value) => setNewLead({...newLead, source: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Website Contact">Website Contact</SelectItem>
                    <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                    <SelectItem value="Referral">Referral</SelectItem>
                    <SelectItem value="Cold Outreach">Cold Outreach</SelectItem>
                    <SelectItem value="Social Media">Social Media</SelectItem>
                    <SelectItem value="Networking Event">Networking Event</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  value={newLead.industry}
                  onChange={(e) => setNewLead({...newLead, industry: e.target.value})}
                  placeholder="Enter industry"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimatedValue">Estimated Value ($)</Label>
                <Input
                  id="estimatedValue"
                  type="number"
                  value={newLead.estimatedValue}
                  onChange={(e) => setNewLead({...newLead, estimatedValue: parseInt(e.target.value) || 0})}
                  placeholder="Enter estimated project value"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={newLead.notes}
                  onChange={(e) => setNewLead({...newLead, notes: e.target.value})}
                  placeholder="Enter any additional notes..."
                  rows={3}
                />
              </div>

              <Button onClick={handleAddLead} className="w-full">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Lead
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Leads List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Lead Pipeline</h3>
            <Badge variant="outline">{leads.length} leads</Badge>
          </div>

          {leads.map((lead) => (
            <Card key={lead.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center space-x-2">
                      <span>{lead.name}</span>
                      <Badge variant="outline">{lead.company}</Badge>
                    </CardTitle>
                    <CardDescription className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1">
                        <Mail className="h-4 w-4" />
                        <span>{lead.email}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Phone className="h-4 w-4" />
                        <span>{lead.phone}</span>
                      </span>
                    </CardDescription>
                  </div>
                  <Badge className={`${getStatusColor(lead.status)} text-white`}>
                    {lead.status.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium">Source</p>
                    <p className="text-sm text-muted-foreground">{lead.source}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Industry</p>
                    <p className="text-sm text-muted-foreground">{lead.industry}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Estimated Value</p>
                    <p className="text-sm font-semibold text-green-600">${lead.estimatedValue.toLocaleString()}</p>
                  </div>
                </div>

                {lead.notes && (
                  <div>
                    <p className="text-sm font-medium">Notes</p>
                    <p className="text-sm text-muted-foreground">{lead.notes}</p>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Select value={lead.status} onValueChange={(value: Lead['status']) => updateLeadStatus(lead.id, value)}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="qualified">Qualified</SelectItem>
                      <SelectItem value="proposal">Proposal</SelectItem>
                      <SelectItem value="won">Won</SelectItem>
                      <SelectItem value="lost">Lost</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button size="sm" variant="outline">Contact</Button>
                  <Button size="sm" variant="outline">Schedule Call</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeadGeneration;
