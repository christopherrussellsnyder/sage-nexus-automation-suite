
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Mail, Send, Calendar, User, Eye, Clock } from 'lucide-react';

interface EmailSequence {
  id: string;
  name: string;
  purpose: 'onboarding' | 'nurture' | 'follow-up' | 'retention' | 'upsell';
  status: 'draft' | 'active' | 'paused';
  emails: EmailTemplate[];
  clients: string[];
  openRate: number;
  clickRate: number;
}

interface EmailTemplate {
  id: string;
  subject: string;
  content: string;
  delayDays: number;
  order: number;
}

const ClientSequenceBuilder = () => {
  const [sequences, setSequences] = useState<EmailSequence[]>([
    {
      id: '1',
      name: 'New Client Onboarding',
      purpose: 'onboarding',
      status: 'active',
      emails: [
        {
          id: '1',
          subject: 'Welcome to Our Agency!',
          content: 'Thank you for choosing our agency. Here\'s what to expect...',
          delayDays: 0,
          order: 1
        },
        {
          id: '2',
          subject: 'Your Project Timeline',
          content: 'Here\'s your detailed project timeline and milestones...',
          delayDays: 3,
          order: 2
        }
      ],
      clients: ['TechStart Solutions', 'Growth Dynamics'],
      openRate: 85,
      clickRate: 32
    }
  ]);

  const [selectedSequence, setSelectedSequence] = useState<string>('');
  const [newEmail, setNewEmail] = useState({
    subject: '',
    content: '',
    delayDays: 0
  });

  const [newSequence, setNewSequence] = useState({
    name: '',
    purpose: 'onboarding' as const,
    status: 'draft' as const
  });

  const createNewSequence = () => {
    const sequence: EmailSequence = {
      id: Date.now().toString(),
      ...newSequence,
      emails: [],
      clients: [],
      openRate: 0,
      clickRate: 0
    };
    setSequences([...sequences, sequence]);
    setNewSequence({ name: '', purpose: 'onboarding', status: 'draft' });
  };

  const addEmailToSequence = () => {
    if (!selectedSequence || !newEmail.subject || !newEmail.content) return;

    const sequenceIndex = sequences.findIndex(s => s.id === selectedSequence);
    if (sequenceIndex === -1) return;

    const updatedSequences = [...sequences];
    const newEmailTemplate: EmailTemplate = {
      id: Date.now().toString(),
      ...newEmail,
      order: updatedSequences[sequenceIndex].emails.length + 1
    };

    updatedSequences[sequenceIndex].emails.push(newEmailTemplate);
    setSequences(updatedSequences);
    setNewEmail({ subject: '', content: '', delayDays: 0 });
  };

  const getPurposeColor = (purpose: string) => {
    switch (purpose) {
      case 'onboarding': return 'bg-blue-500';
      case 'nurture': return 'bg-green-500';
      case 'follow-up': return 'bg-yellow-500';
      case 'retention': return 'bg-purple-500';
      case 'upsell': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'draft': return 'bg-gray-500';
      case 'paused': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Create New Sequence */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create New Sequence</CardTitle>
              <CardDescription>Build automated email sequences for clients</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sequenceName">Sequence Name</Label>
                <Input
                  id="sequenceName"
                  value={newSequence.name}
                  onChange={(e) => setNewSequence({...newSequence, name: e.target.value})}
                  placeholder="Enter sequence name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="purpose">Purpose</Label>
                <Select value={newSequence.purpose} onValueChange={(value: any) => setNewSequence({...newSequence, purpose: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="onboarding">Client Onboarding</SelectItem>
                    <SelectItem value="nurture">Relationship Nurturing</SelectItem>
                    <SelectItem value="follow-up">Project Follow-up</SelectItem>
                    <SelectItem value="retention">Client Retention</SelectItem>
                    <SelectItem value="upsell">Service Upsell</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={createNewSequence} className="w-full">
                Create Sequence
              </Button>
            </CardContent>
          </Card>

          {/* Add Email to Sequence */}
          {sequences.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Add Email</CardTitle>
                <CardDescription>Add email to existing sequence</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="selectSequence">Select Sequence</Label>
                  <Select value={selectedSequence} onValueChange={setSelectedSequence}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose sequence" />
                    </SelectTrigger>
                    <SelectContent>
                      {sequences.map(seq => (
                        <SelectItem key={seq.id} value={seq.id}>
                          {seq.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emailSubject">Email Subject</Label>
                  <Input
                    id="emailSubject"
                    value={newEmail.subject}
                    onChange={(e) => setNewEmail({...newEmail, subject: e.target.value})}
                    placeholder="Enter email subject"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="delayDays">Delay (Days)</Label>
                  <Input
                    id="delayDays"
                    type="number"
                    value={newEmail.delayDays}
                    onChange={(e) => setNewEmail({...newEmail, delayDays: parseInt(e.target.value) || 0})}
                    placeholder="Days after previous email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emailContent">Email Content</Label>
                  <Textarea
                    id="emailContent"
                    value={newEmail.content}
                    onChange={(e) => setNewEmail({...newEmail, content: e.target.value})}
                    placeholder="Enter email content..."
                    rows={4}
                  />
                </div>

                <Button onClick={addEmailToSequence} className="w-full">
                  Add Email
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Email Sequences List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Email Sequences</h3>
            <Badge variant="outline">{sequences.length} sequences</Badge>
          </div>

          {sequences.map((sequence) => (
            <Card key={sequence.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center space-x-2">
                      <Mail className="h-5 w-5" />
                      <span>{sequence.name}</span>
                    </CardTitle>
                    <CardDescription className="flex items-center space-x-2">
                      <Badge className={`${getPurposeColor(sequence.purpose)} text-white`}>
                        {sequence.purpose}
                      </Badge>
                      <Badge className={`${getStatusColor(sequence.status)} text-white`}>
                        {sequence.status}
                      </Badge>
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Sequence Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{sequence.emails.length}</p>
                    <p className="text-sm text-muted-foreground">Emails</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{sequence.openRate}%</p>
                    <p className="text-sm text-muted-foreground">Open Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{sequence.clickRate}%</p>
                    <p className="text-sm text-muted-foreground">Click Rate</p>
                  </div>
                </div>

                {/* Email List */}
                <div className="space-y-2">
                  <p className="font-medium">Email Sequence:</p>
                  {sequence.emails.map((email, index) => (
                    <div key={email.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline">{index + 1}</Badge>
                        <div>
                          <p className="font-medium text-sm">{email.subject}</p>
                          <p className="text-xs text-muted-foreground">
                            {email.delayDays === 0 ? 'Immediate' : `After ${email.delayDays} days`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Active Clients */}
                {sequence.clients.length > 0 && (
                  <div>
                    <p className="font-medium mb-2">Active Clients:</p>
                    <div className="flex flex-wrap gap-1">
                      {sequence.clients.map((client, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          <User className="h-3 w-3 mr-1" />
                          {client}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientSequenceBuilder;
