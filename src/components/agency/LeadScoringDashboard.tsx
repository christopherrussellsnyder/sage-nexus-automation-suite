
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { UserCheck, TrendingUp, Mail, Phone, MessageSquare, Calendar, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  section: 'sales' | 'agency';
}

interface LeadScoringDashboardProps {
  leads?: Lead[];
  onNurtureLead: (lead: Lead) => void;
  onScheduleMeeting: (lead: Lead) => void;
  section?: 'sales' | 'agency';
}

const LeadScoringDashboard = ({ leads: propLeads, onNurtureLead, onScheduleMeeting, section = 'agency' }: LeadScoringDashboardProps) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'hot' | 'warm' | 'cold'>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [emailDialog, setEmailDialog] = useState(false);
  const [meetingDialog, setMeetingDialog] = useState(false);
  const [emailData, setEmailData] = useState({ subject: '', message: '' });
  const [meetingData, setMeetingData] = useState({ date: '', time: '', agenda: '' });
  const { toast } = useToast();

  // Load leads from localStorage based on section
  useEffect(() => {
    const storageKey = section === 'sales' ? 'salesProspects' : 'leadManagementLeads';
    const savedLeads = localStorage.getItem(storageKey);
    
    if (savedLeads) {
      const parsedLeads = JSON.parse(savedLeads).map((lead: any) => ({
        ...lead,
        lastActivity: lead.lastActivity || 'Recently added',
        engagementLevel: lead.engagementLevel || Math.floor(Math.random() * 100),
        section
      }));
      setLeads(parsedLeads);
    } else if (propLeads) {
      setLeads(propLeads);
    }
  }, [propLeads, section]);

  const filteredLeads = selectedStatus === 'all' 
    ? leads 
    : leads.filter(lead => lead.status === selectedStatus);

  const handleSendEmail = () => {
    if (!selectedLead || !emailData.subject || !emailData.message) {
      toast({
        title: "Error",
        description: "Please fill in all email fields",
        variant: "destructive",
      });
      return;
    }

    // Create mailto link with pre-filled content
    const subject = encodeURIComponent(emailData.subject);
    const body = encodeURIComponent(emailData.message);
    window.open(`mailto:${selectedLead.email}?subject=${subject}&body=${body}`);
    
    onNurtureLead(selectedLead);
    setEmailDialog(false);
    setEmailData({ subject: '', message: '' });
    
    toast({
      title: "Email Prepared",
      description: `Email draft opened for ${selectedLead.name}`,
    });
  };

  const handleScheduleMeeting = () => {
    if (!selectedLead || !meetingData.date || !meetingData.time) {
      toast({
        title: "Error",
        description: "Please fill in meeting date and time",
        variant: "destructive",
      });
      return;
    }

    onScheduleMeeting(selectedLead);
    setMeetingDialog(false);
    setMeetingData({ date: '', time: '', agenda: '' });
    
    toast({
      title: "Meeting Scheduled",
      description: `Meeting scheduled with ${selectedLead.name} for ${meetingData.date} at ${meetingData.time}`,
    });
  };

  const handleDeleteLead = (leadId: string) => {
    const updatedLeads = leads.filter(lead => lead.id !== leadId);
    setLeads(updatedLeads);
    
    // Update localStorage
    const storageKey = section === 'sales' ? 'salesProspects' : 'leadManagementLeads';
    localStorage.setItem(storageKey, JSON.stringify(updatedLeads));
    
    const leadType = section === 'sales' ? 'Prospect' : 'Lead';
    toast({
      title: `${leadType} Deleted`,
      description: `${leadType} has been removed from your scoring dashboard`,
    });
  };

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

  // Calculate metrics based on actual data
  const leadStats = {
    total: leads.length,
    hot: leads.filter(l => l.status === 'hot').length,
    warm: leads.filter(l => l.status === 'warm').length,
    cold: leads.filter(l => l.status === 'cold').length,
    avgScore: leads.length > 0 ? Math.round(leads.reduce((sum, l) => sum + l.score, 0) / leads.length) : 0
  };

  const sectionTitle = section === 'sales' ? 'Prospect Scoring Dashboard' : 'Lead Scoring Dashboard';
  const sectionDescription = section === 'sales' 
    ? 'AI-powered prospect scoring and nurturing recommendations'
    : 'AI-powered lead scoring and nurturing recommendations';

  return (
    <div className="space-y-6">
      {/* Email Dialog */}
      <Dialog open={emailDialog} onOpenChange={setEmailDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Email to {selectedLead?.name}</DialogTitle>
            <DialogDescription>
              Compose an email to nurture this {section === 'sales' ? 'prospect' : 'lead'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={emailData.subject}
                onChange={(e) => setEmailData({...emailData, subject: e.target.value})}
                placeholder="Email subject"
              />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={emailData.message}
                onChange={(e) => setEmailData({...emailData, message: e.target.value})}
                placeholder="Your email message..."
                rows={5}
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleSendEmail} className="flex-1">Send Email</Button>
              <Button variant="outline" onClick={() => setEmailDialog(false)}>Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Meeting Dialog */}
      <Dialog open={meetingDialog} onOpenChange={setMeetingDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Meeting with {selectedLead?.name}</DialogTitle>
            <DialogDescription>
              Set up a meeting with this {section === 'sales' ? 'prospect' : 'lead'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={meetingData.date}
                onChange={(e) => setMeetingData({...meetingData, date: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={meetingData.time}
                onChange={(e) => setMeetingData({...meetingData, time: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="agenda">Agenda (Optional)</Label>
              <Textarea
                id="agenda"
                value={meetingData.agenda}
                onChange={(e) => setMeetingData({...meetingData, agenda: e.target.value})}
                placeholder="Meeting agenda..."
                rows={3}
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleScheduleMeeting} className="flex-1">Schedule Meeting</Button>
              <Button variant="outline" onClick={() => setMeetingDialog(false)}>Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Stats Cards - Dynamic based on actual data */}
      <div className="grid md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <UserCheck className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{leadStats.total}</p>
                <p className="text-sm text-muted-foreground">Total {section === 'sales' ? 'Prospects' : 'Leads'}</p>
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
                <p className="text-sm text-muted-foreground">Hot {section === 'sales' ? 'Prospects' : 'Leads'}</p>
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
                <p className="text-sm text-muted-foreground">Warm {section === 'sales' ? 'Prospects' : 'Leads'}</p>
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
                <p className="text-sm text-muted-foreground">Cold {section === 'sales' ? 'Prospects' : 'Leads'}</p>
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
            <span>{sectionTitle}</span>
          </CardTitle>
          <CardDescription>
            {sectionDescription}
            <br />
            <strong>Lead Scoring Explanation:</strong> Leads are scored based on multiple factors including:
            <ul className="list-disc list-inside mt-2 text-sm">
              <li>Company size (20 points for established companies)</li>
              <li>Job title (25 points for decision-makers like CEO, CTO, VP, Director, Manager)</li>
              <li>Professional email domain (20 points for business emails)</li>
              <li>Lead source (LinkedIn: 25pts, Referral: 30pts, Website: 15pts, Event: 20pts, Cold outreach: 10pts)</li>
              <li>Engagement level (10 points for detailed notes indicating interaction)</li>
            </ul>
            <strong>Status levels:</strong> Hot (80+ points), Warm (60-79 points), Cold (below 60 points)
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
          {leads.length === 0 ? (
            <div className="text-center py-8">
              <UserCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No {section === 'sales' ? 'prospects' : 'leads'} yet</h3>
              <p className="text-muted-foreground">Add {section === 'sales' ? 'prospects' : 'leads'} to start tracking and scoring them</p>
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
                            onClick={() => {
                              setSelectedLead(lead);
                              setEmailData({
                                subject: `Following up - ${lead.company}`,
                                message: `Hi ${lead.name},\n\nI hope this email finds you well. I wanted to follow up on our previous conversation...\n\nBest regards`
                              });
                              setEmailDialog(true);
                            }}
                          >
                            <Mail className="h-3 w-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setSelectedLead(lead);
                              setMeetingDialog(true);
                            }}
                          >
                            <Calendar className="h-3 w-3" />
                          </Button>
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
    </div>
  );
};

export default LeadScoringDashboard;
