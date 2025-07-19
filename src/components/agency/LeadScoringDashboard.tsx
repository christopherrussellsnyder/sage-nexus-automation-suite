
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { BarChart3, TrendingUp, Users, Mail, Phone, Calendar, Trash2 } from 'lucide-react';
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
}

interface LeadScoringDashboardProps {
  leads: Lead[];
  onNurtureLead: (lead: Lead) => void;
  onScheduleMeeting: (lead: Lead) => void;
  onDeleteLead?: (leadId: string) => void;
}

const LeadScoringDashboard = ({ leads, onNurtureLead, onScheduleMeeting, onDeleteLead }: LeadScoringDashboardProps) => {
  const { toast } = useToast();

  const handleDeleteLead = (leadId: string, leadName: string) => {
    if (onDeleteLead) {
      onDeleteLead(leadId);
      toast({
        title: "Lead Deleted",
        description: `${leadName} has been removed from the scoring dashboard`,
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hot': return 'bg-red-500';
      case 'warm': return 'bg-yellow-500';
      case 'cold': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-red-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-blue-600';
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const hotLeads = leads.filter(lead => lead.status === 'hot');
  const warmLeads = leads.filter(lead => lead.status === 'warm');
  const coldLeads = leads.filter(lead => lead.status === 'cold');

  const averageScore = leads.length > 0 
    ? Math.round(leads.reduce((sum, lead) => sum + lead.score, 0) / leads.length)
    : 0;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{averageScore}</p>
                <p className="text-sm text-muted-foreground">Avg Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{hotLeads.length}</p>
                <p className="text-sm text-muted-foreground">Hot Leads</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{warmLeads.length}</p>
                <p className="text-sm text-muted-foreground">Warm Leads</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{coldLeads.length}</p>
                <p className="text-sm text-muted-foreground">Cold Leads</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lead Scoring Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Lead Scoring Dashboard</span>
          </CardTitle>
          <CardDescription>AI-powered lead scoring and prioritization</CardDescription>
        </CardHeader>
        <CardContent>
          {leads.length === 0 ? (
            <div className="text-center py-8">
              <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No leads to score</h3>
              <p className="text-muted-foreground">Add leads to see AI-powered scoring and recommendations</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Lead</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads
                    .sort((a, b) => b.score - a.score)
                    .map((lead) => (
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
                          <div className="flex items-center space-x-2">
                            <div className={`text-2xl font-bold ${getScoreColor(lead.score)}`}>
                              {lead.score}
                            </div>
                            <Progress value={lead.score} className="w-16" />
                          </div>
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
                              onClick={() => onNurtureLead(lead)}
                              disabled={lead.status === 'cold'}
                            >
                              <Mail className="h-3 w-3" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => onScheduleMeeting(lead)}
                              disabled={lead.status === 'cold'}
                            >
                              <Calendar className="h-3 w-3" />
                            </Button>
                            {lead.phone && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => window.open(`tel:${lead.phone}`)}
                              >
                                <Phone className="h-3 w-3" />
                              </Button>
                            )}
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleDeleteLead(lead.id, lead.name)}
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

      {/* Lead Insights */}
      {leads.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Scoring Insights</CardTitle>
              <CardDescription>How leads are scored in our system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Scoring Factors:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Company size and profile (+20 points)</li>
                  <li>• Job title and seniority (+25 points)</li>
                  <li>• Professional email domain (+20 points)</li>
                  <li>• Lead source quality (+10-30 points)</li>
                  <li>• Engagement level and notes (+10 points)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Status Ranges:</h4>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span>Hot: 80+ points</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span>Warm: 60-79 points</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span>Cold: Below 60 points</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Next Actions</CardTitle>
              <CardDescription>Recommended actions for your leads</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {hotLeads.length > 0 && (
                  <div className="p-3 border rounded-lg bg-red-50">
                    <h4 className="font-medium text-red-800 mb-1">
                      🔥 {hotLeads.length} Hot Lead{hotLeads.length > 1 ? 's' : ''}
                    </h4>
                    <p className="text-sm text-red-600">
                      Schedule meetings immediately - high conversion potential
                    </p>
                  </div>
                )}
                {warmLeads.length > 0 && (
                  <div className="p-3 border rounded-lg bg-yellow-50">
                    <h4 className="font-medium text-yellow-800 mb-1">
                      🌡️ {warmLeads.length} Warm Lead{warmLeads.length > 1 ? 's' : ''}
                    </h4>
                    <p className="text-sm text-yellow-600">
                      Send nurture emails and build relationships
                    </p>
                  </div>
                )}
                {coldLeads.length > 0 && (
                  <div className="p-3 border rounded-lg bg-blue-50">
                    <h4 className="font-medium text-blue-800 mb-1">
                      ❄️ {coldLeads.length} Cold Lead{coldLeads.length > 1 ? 's' : ''}
                    </h4>
                    <p className="text-sm text-blue-600">
                      Long-term nurturing - add more qualifying information
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default LeadScoringDashboard;
