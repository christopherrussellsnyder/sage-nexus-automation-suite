
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  Search, 
  Plus, 
  Mail, 
  Phone, 
  Calendar,
  DollarSign,
  TrendingUp,
  Filter,
  MoreHorizontal,
  Edit,
  Star,
  Target
} from 'lucide-react';

interface LeadManagementProps {
  onBack: () => void;
}

const LeadManagement = ({ onBack }: LeadManagementProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock lead data
  const leads = [
    {
      id: 1,
      name: 'Sarah Williams',
      company: 'Digital Solutions Inc',
      email: 'sarah@digitalsolutions.com',
      phone: '+1 (555) 123-4567',
      status: 'hot',
      score: 85,
      value: 45000,
      source: 'Website',
      lastContact: '2024-01-15',
      nextAction: 'Follow-up call'
    },
    {
      id: 2,
      name: 'Michael Chen',
      company: 'TechFlow Corp',
      email: 'michael@techflow.com',
      phone: '+1 (555) 987-6543',
      status: 'warm',
      score: 72,
      value: 32000,
      source: 'LinkedIn',
      lastContact: '2024-01-12',
      nextAction: 'Send proposal'
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      company: 'StartupHub',
      email: 'emma@startuphub.com',
      phone: '+1 (555) 456-7890',
      status: 'cold',
      score: 45,
      value: 18000,
      source: 'Referral',
      lastContact: '2024-01-08',
      nextAction: 'Qualifying call'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hot': return 'bg-red-100 text-red-800';
      case 'warm': return 'bg-yellow-100 text-yellow-800';
      case 'cold': return 'bg-blue-100 text-blue-800';
      case 'qualified': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Button variant="outline" onClick={onBack}>
            ← Back to Sales Overview
          </Button>
          <h2 className="text-2xl font-bold mt-4">Lead Management</h2>
          <p className="text-muted-foreground">
            Track and manage your sales pipeline with automated lead scoring
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Lead
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-muted-foreground">Total Leads</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-2xl font-bold">28</p>
                <p className="text-sm text-muted-foreground">Hot Leads</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">34%</p>
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">$425K</p>
                <p className="text-sm text-muted-foreground">Pipeline Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="hot">Hot</SelectItem>
            <SelectItem value="warm">Warm</SelectItem>
            <SelectItem value="cold">Cold</SelectItem>
            <SelectItem value="qualified">Qualified</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lead Pipeline</CardTitle>
          <CardDescription>
            Manage your leads with automated scoring and qualification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredLeads.map((lead) => (
              <div key={lead.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{lead.name}</h3>
                      <p className="text-sm text-muted-foreground">{lead.company}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {lead.email}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {lead.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className={`font-semibold ${getScoreColor(lead.score)}`}>{lead.score}</p>
                      <p className="text-xs text-muted-foreground">Score</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold">${lead.value.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Value</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold">{lead.source}</p>
                      <p className="text-xs text-muted-foreground">Source</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold">{lead.nextAction}</p>
                      <p className="text-xs text-muted-foreground">Next Action</p>
                    </div>
                    <Badge className={getStatusColor(lead.status)}>
                      {lead.status}
                    </Badge>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadManagement;
