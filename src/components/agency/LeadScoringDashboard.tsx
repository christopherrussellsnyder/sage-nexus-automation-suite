
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { UserCheck, TrendingUp, Mail, Phone, MessageSquare, Calendar } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  jobTitle: string;
  score: number;
  status: 'hot' | 'warm' | 'cold';
  lastActivity: string;
  source: string;
  engagementLevel: number;
  notes: string;
}

interface LeadScoringDashboardProps {
  leads: Lead[];
  onNurtureLead: (lead: Lead) => void;
  onScheduleMeeting: (lead: Lead) => void;
}

const LeadScoringDashboard = ({ leads, onNurtureLead, onScheduleMeeting }: LeadScoringDashboardProps) => {
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'hot' | 'warm' | 'cold'>('all');

  const sampleLeads: Lead[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@techcorp.com',
      company: 'TechCorp Solutions',
      jobTitle: 'Marketing Director',
      score: 92,
      status: 'hot',
      lastActivity: '2 hours ago',
      source: 'LinkedIn',
      engagementLevel: 85,
      notes: 'Downloaded pricing guide, visited pricing page 3 times'
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.chen@startup.io',
      company: 'Startup.io',
      jobTitle: 'CEO',
      score: 78,
      status: 'warm',
      lastActivity: '1 day ago',
      source: 'Google Ads',
      engagementLevel: 65,
      notes: 'Attended webinar, signed up for newsletter'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily.r@consulting.com',
      company: 'Rodriguez Consulting',
      jobTitle: 'Operations Manager',
      score: 85,
      status: 'hot',
      lastActivity: '30 minutes ago',
      source: 'Website',
      engagementLevel: 78,
      notes: 'Requested demo, multiple page visits this week'
    },
    {
      id: '4',
      name: 'David Kim',
      email: 'david.kim@bigcorp.com',
      company: 'BigCorp Industries',
      jobTitle: 'VP Marketing',
      score: 45,
      status: 'cold',
      lastActivity: '1 week ago',
      source: 'Trade Show',
      engagementLevel: 25,
      notes: 'Initial contact at trade show, no follow-up engagement'
    },
    {
      id: '5',
      name: 'Lisa Thompson',
      email: 'lisa.t@agency.co',
      company: 'Creative Agency Co',
      jobTitle: 'Creative Director',
      score: 67,
      status: 'warm',
      lastActivity: '3 days ago',
      source: 'Referral',
      engagementLevel: 55,
      notes: 'Referred by existing client, opened several emails'
    }
  ];

  const leadsToShow = leads.length > 0 ? leads : sampleLeads;
  const filteredLeads = selectedStatus === 'all' 
    ? leadsToShow 
    : leadsToShow.filter(lead => lead.status === selectedStatus);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
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

  const leadStats = {
    total: leadsToShow.length,
    hot: leadsToShow.filter(l => l.status === 'hot').length,
    warm: leadsToShow.filter(l => l.status === 'warm').length,
    cold: leadsToShow.filter(l => l.status === 'cold').length,
    avgScore: Math.round(leadsToShow.reduce((sum, l) => sum + l.score, 0) / leadsToShow.length)
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <UserCheck className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{leadStats.total}</p>
                <p className="text-sm text-muted-foreground">Total Leads</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div>
                <p className="text-2xl font-bold">{leadStats.hot}</p>
                <p className="text-sm text-muted-foreground">Hot Leads</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div>
                <p className="text-2xl font-bold">{leadStats.warm}</p>
                <p className="text-sm text-muted-foreground">Warm Leads</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <div>
                <p className="text-2xl font-bold">{leadStats.cold}</p>
                <p className="text-sm text-muted-foreground">Cold Leads</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{leadStats.avgScore}</p>
                <p className="text-sm text-muted-foreground">Avg Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lead Scoring Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <UserCheck className="h-5 w-5" />
            <span>Lead Scoring Dashboard</span>
          </CardTitle>
          <CardDescription>
            AI-powered lead scoring and nurturing recommendations
          </CardDescription>
          <div className="flex space-x-2">
            {['all', 'hot', 'warm', 'cold'].map((status) => (
              <Button
                key={status}
                variant={selectedStatus === status ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedStatus(status as any)}
                className="capitalize"
              >
                {status} {status !== 'all' && `(${leadStats[status as keyof typeof leadStats]})`}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lead</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Engagement</TableHead>
                  <TableHead>Last Activity</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => (
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
                      <div>
                        <div className="font-medium">{lead.company}</div>
                        <Badge variant="outline" className="text-xs">
                          {lead.source}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`text-lg font-bold ${getScoreColor(lead.score)}`}>
                        {lead.score}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(lead.status)}`} />
                        <span className="capitalize font-medium">{lead.status}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Progress value={lead.engagementLevel} className="h-2" />
                        <span className="text-xs text-muted-foreground">{lead.engagementLevel}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{lead.lastActivity}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => onNurtureLead(lead)}
                        >
                          <Mail className="h-3 w-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => onScheduleMeeting(lead)}
                        >
                          <Calendar className="h-3 w-3" />
                        </Button>
                        <Button size="sm">
                          <MessageSquare className="h-3 w-3" />
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

export default LeadScoringDashboard;
