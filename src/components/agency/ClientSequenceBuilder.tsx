
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Mail, 
  Clock, 
  Send, 
  Eye,
  Edit,
  Trash2,
  Copy,
  Play,
  Pause,
  BarChart3
} from 'lucide-react';

interface ClientEmail {
  id: string;
  subject: string;
  content: string;
  delay: number; // days after previous email
  delayUnit: 'hours' | 'days' | 'weeks';
}

interface ClientSequence {
  id: string;
  name: string;
  description: string;
  triggerType: 'new-client' | 'project-completion' | 'check-in' | 'upsell' | 'renewal';
  status: 'draft' | 'active' | 'paused';
  emails: ClientEmail[];
  stats: {
    sent: number;
    opened: number;
    clicked: number;
    replied: number;
  };
}

const ClientSequenceBuilder = () => {
  const [sequences, setSequences] = useState<ClientSequence[]>([
    {
      id: '1',
      name: 'New Client Onboarding',
      description: 'Welcome sequence for new clients to set expectations and build relationships',
      triggerType: 'new-client',
      status: 'active',
      emails: [
        {
          id: '1-1',
          subject: 'Welcome to [Agency Name] - Let\'s Get Started!',
          content: 'Hi [Client Name],\n\nWelcome to the [Agency Name] family! We\'re thrilled to have you on board and excited to help you achieve your marketing goals.\n\nOver the next few days, you\'ll receive emails from me with important information about:\n• Your dedicated account manager\n• Our project timeline and milestones\n• How to access your client portal\n• What to expect in your first week\n\nIf you have any questions, don\'t hesitate to reach out. We\'re here to make this as smooth as possible.\n\nBest regards,\n[Your Name]',
          delay: 0,
          delayUnit: 'hours'
        },
        {
          id: '1-2',
          subject: 'Meet Your Account Manager & Next Steps',
          content: 'Hi [Client Name],\n\nI hope you\'re settling in well! I wanted to introduce you to [Account Manager Name], who will be your primary point of contact throughout our partnership.\n\n[Account Manager Name] has over [X] years of experience in [relevant field] and has helped clients like [similar client] achieve [specific results].\n\nHere\'s what happens next:\n1. [Account Manager] will schedule a kick-off call within 48 hours\n2. We\'ll send you access to your client portal\n3. Our team will begin the discovery phase of your project\n\nExpected timeline: [Timeline]\n\nLooking forward to an amazing partnership!\n\nBest,\n[Your Name]',
          delay: 1,
          delayUnit: 'days'
        },
        {
          id: '1-3',
          subject: 'Your Client Portal is Ready + First Week Check-in',
          content: 'Hi [Client Name],\n\nYour client portal is now live! You can access it at [portal link] using these credentials:\n\nUsername: [username]\nPassword: [password]\n\nIn your portal, you\'ll find:\n• Project timeline and milestones\n• Real-time progress updates\n• All project documents and assets\n• Direct messaging with your team\n• Performance reports and analytics\n\nHow has your first week been? Any questions or concerns?\n\nWe\'re here to help!\n\nBest,\n[Account Manager Name]',
          delay: 3,
          delayUnit: 'days'
        }
      ],
      stats: { sent: 45, opened: 38, clicked: 22, replied: 8 }
    },
    {
      id: '2',
      name: 'Project Completion Follow-up',
      description: 'Follow-up sequence after completing a client project to gather feedback and explore opportunities',
      triggerType: 'project-completion',
      status: 'active',
      emails: [
        {
          id: '2-1',
          subject: 'Project Complete! Let\'s Celebrate Your Success 🎉',
          content: 'Hi [Client Name],\n\nCongratulations! We\'ve officially completed [Project Name], and the results speak for themselves:\n\n• [Key Result 1]\n• [Key Result 2]\n• [Key Result 3]\n\nIt\'s been an absolute pleasure working with you and your team. Your collaboration and insights were instrumental in achieving these outcomes.\n\nAll final deliverables have been uploaded to your client portal, and you\'ll continue to have access for the next 90 days.\n\nI\'d love to hear your thoughts on the project. Would you be open to a quick 15-minute feedback call this week?\n\nCheers to your continued success!\n\nBest,\n[Account Manager Name]',
          delay: 0,
          delayUnit: 'hours'
        },
        {
          id: '2-2',
          subject: 'Quick Favor: Would You Mind Sharing Your Experience?',
          content: 'Hi [Client Name],\n\nI hope you\'re still riding high from the success of [Project Name]!\n\nIf you have 2 minutes, would you mind leaving us a quick review? Your feedback helps other businesses discover how we can help them achieve similar results.\n\nHere are a few easy options:\n• Google Review: [link]\n• LinkedIn Recommendation: [link]\n• Case Study Participation: [link]\n\nAnd if you know any other business owners who might benefit from what we do, I\'d be grateful for an introduction.\n\nThanks for being such an amazing client!\n\nBest,\n[Your Name]',
          delay: 1,
          delayUnit: 'weeks'
        }
      ],
      stats: { sent: 23, opened: 19, clicked: 12, replied: 6 }
    }
  ]);

  const [showSequenceForm, setShowSequenceForm] = useState(false);
  const [editingSequence, setEditingSequence] = useState<ClientSequence | null>(null);
  const [editingEmail, setEditingEmail] = useState<ClientEmail | null>(null);
  const [sequenceFormData, setSequenceFormData] = useState({
    name: '',
    description: '',
    triggerType: 'new-client' as ClientSequence['triggerType']
  });
  const [emailFormData, setEmailFormData] = useState({
    subject: '',
    content: '',
    delay: 0,
    delayUnit: 'days' as 'hours' | 'days' | 'weeks'
  });

  const triggerTypeLabels = {
    'new-client': 'New Client Signup',
    'project-completion': 'Project Completion',
    'check-in': 'Regular Check-in',
    'upsell': 'Upsell Opportunity',
    'renewal': 'Contract Renewal'
  };

  const handleCreateSequence = () => {
    const newSequence: ClientSequence = {
      id: Date.now().toString(),
      ...sequenceFormData,
      status: 'draft',
      emails: [],
      stats: { sent: 0, opened: 0, clicked: 0, replied: 0 }
    };
    
    setSequences(prev => [...prev, newSequence]);
    setSequenceFormData({ name: '', description: '', triggerType: 'new-client' });
    setShowSequenceForm(false);
  };

  const handleEditSequence = (sequence: ClientSequence) => {
    setEditingSequence(sequence);
    setSequenceFormData({
      name: sequence.name,
      description: sequence.description,
      triggerType: sequence.triggerType
    });
    setShowSequenceForm(true);
  };

  const handleUpdateSequence = () => {
    if (!editingSequence) return;
    
    setSequences(prev => prev.map(seq => 
      seq.id === editingSequence.id 
        ? { ...seq, ...sequenceFormData }
        : seq
    ));
    
    setEditingSequence(null);
    setSequenceFormData({ name: '', description: '', triggerType: 'new-client' });
    setShowSequenceForm(false);
  };

  const handleAddEmail = (sequenceId: string) => {
    const newEmail: ClientEmail = {
      id: `${sequenceId}-${Date.now()}`,
      ...emailFormData
    };
    
    setSequences(prev => prev.map(seq => 
      seq.id === sequenceId 
        ? { ...seq, emails: [...seq.emails, newEmail] }
        : seq
    ));
    
    setEmailFormData({ subject: '', content: '', delay: 0, delayUnit: 'days' });
  };

  const handleToggleSequenceStatus = (sequenceId: string) => {
    setSequences(prev => prev.map(seq => 
      seq.id === sequenceId 
        ? { ...seq, status: seq.status === 'active' ? 'paused' : 'active' }
        : seq
    ));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const calculateStats = () => {
    const totalSequences = sequences.length;
    const activeSequences = sequences.filter(s => s.status === 'active').length;
    const totalSent = sequences.reduce((sum, seq) => sum + seq.stats.sent, 0);
    const totalOpened = sequences.reduce((sum, seq) => sum + seq.stats.opened, 0);
    const openRate = totalSent > 0 ? ((totalOpened / totalSent) * 100).toFixed(1) : 0;

    return { totalSequences, activeSequences, totalSent, openRate };
  };

  const stats = calculateStats();

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{stats.totalSequences}</p>
                <p className="text-xs text-muted-foreground">Total Sequences</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Play className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{stats.activeSequences}</p>
                <p className="text-xs text-muted-foreground">Active Sequences</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Send className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{stats.totalSent}</p>
                <p className="text-xs text-muted-foreground">Emails Sent</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{stats.openRate}%</p>
                <p className="text-xs text-muted-foreground">Avg Open Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Client Nurture Sequences</h3>
          <p className="text-muted-foreground">Automated email sequences for client onboarding and relationship building</p>
        </div>
        <Button onClick={() => setShowSequenceForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Sequence
        </Button>
      </div>

      {/* Sequence Form */}
      {showSequenceForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingSequence ? 'Edit Sequence' : 'Create New Sequence'}</CardTitle>
            <CardDescription>Set up an automated email sequence for your clients</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sequenceName">Sequence Name</Label>
              <Input
                id="sequenceName"
                value={sequenceFormData.name}
                onChange={(e) => setSequenceFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., New Client Onboarding"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sequenceDescription">Description</Label>
              <Textarea
                id="sequenceDescription"
                value={sequenceFormData.description}
                onChange={(e) => setSequenceFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the purpose of this sequence"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="triggerType">Trigger Type</Label>
              <Select 
                value={sequenceFormData.triggerType} 
                onValueChange={(value: any) => setSequenceFormData(prev => ({ ...prev, triggerType: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(triggerTypeLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex space-x-2">
              <Button onClick={editingSequence ? handleUpdateSequence : handleCreateSequence}>
                {editingSequence ? 'Update Sequence' : 'Create Sequence'}
              </Button>
              <Button variant="outline" onClick={() => {
                setShowSequenceForm(false);
                setEditingSequence(null);
                setSequenceFormData({ name: '', description: '', triggerType: 'new-client' });
              }}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sequences List */}
      <div className="space-y-6">
        {sequences.map((sequence) => (
          <Card key={sequence.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <span>{sequence.name}</span>
                    <Badge variant={sequence.status === 'active' ? 'default' : 'secondary'}>
                      {sequence.status}
                    </Badge>
                    <Badge variant="outline">
                      {triggerTypeLabels[sequence.triggerType]}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{sequence.description}</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleToggleSequenceStatus(sequence.id)}
                  >
                    {sequence.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditSequence(sequence)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Stats */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{sequence.stats.sent}</p>
                  <p className="text-xs text-muted-foreground">Sent</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{sequence.stats.opened}</p>
                  <p className="text-xs text-muted-foreground">Opened</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{sequence.stats.clicked}</p>
                  <p className="text-xs text-muted-foreground">Clicked</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">{sequence.stats.replied}</p>
                  <p className="text-xs text-muted-foreground">Replied</p>
                </div>
              </div>

              {/* Emails */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Email Sequence ({sequence.emails.length} emails)</h4>
                  <Button
                    size="sm"
                    onClick={() => {
                      setEditingEmail(null);
                      setEmailFormData({ subject: '', content: '', delay: 0, delayUnit: 'days' });
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Email
                  </Button>
                </div>

                {/* Add Email Form */}
                {editingEmail === null && (
                  <Card>
                    <CardContent className="p-4 space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="emailSubject">Email Subject</Label>
                          <Input
                            id="emailSubject"
                            value={emailFormData.subject}
                            onChange={(e) => setEmailFormData(prev => ({ ...prev, subject: e.target.value }))}
                            placeholder="Welcome to our agency!"
                          />
                        </div>
                        <div className="flex space-x-2">
                          <div className="space-y-2 flex-1">
                            <Label htmlFor="emailDelay">Delay</Label>
                            <Input
                              id="emailDelay"
                              type="number"
                              value={emailFormData.delay}
                              onChange={(e) => setEmailFormData(prev => ({ ...prev, delay: parseInt(e.target.value) || 0 }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="delayUnit">Unit</Label>
                            <Select 
                              value={emailFormData.delayUnit} 
                              onValueChange={(value: any) => setEmailFormData(prev => ({ ...prev, delayUnit: value }))}
                            >
                              <SelectTrigger className="w-24">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="hours">Hours</SelectItem>
                                <SelectItem value="days">Days</SelectItem>
                                <SelectItem value="weeks">Weeks</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emailContent">Email Content</Label>
                        <Textarea
                          id="emailContent"
                          value={emailFormData.content}
                          onChange={(e) => setEmailFormData(prev => ({ ...prev, content: e.target.value }))}
                          placeholder="Hi [Client Name],..."
                          rows={6}
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button onClick={() => handleAddEmail(sequence.id)}>
                          Add Email
                        </Button>
                        <Button variant="outline" onClick={() => setEditingEmail(null)}>
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Email List */}
                {sequence.emails.map((email, index) => (
                  <div key={email.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">Email {index + 1}</Badge>
                        {email.delay > 0 && (
                          <Badge variant="secondary">
                            <Clock className="h-3 w-3 mr-1" />
                            {email.delay} {email.delayUnit}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(email.content)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <h5 className="font-semibold mb-2">{email.subject}</h5>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">
                      {email.content.substring(0, 200)}...
                    </p>
                  </div>
                ))}

                {sequence.emails.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No emails in this sequence yet. Add your first email to get started.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClientSequenceBuilder;
