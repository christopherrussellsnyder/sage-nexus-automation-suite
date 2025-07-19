
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
import { Mail, Plus, Trash2, Edit, Eye, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EmailSequence {
  id: string; 
  name: string;
  type: 'cold-outreach' | 'follow-up' | 'lead-nurture' | 're-engagement' | 'onboarding';
  status: 'active' | 'paused' | 'draft';
  emails: EmailTemplate[];
  createdAt: string;
  section: 'sales' | 'agency';
}

interface EmailTemplate {
  id: string;
  subject: string;
  content: string;
  dayDelay: number;
}

interface EmailSequenceBuilderProps {
  section?: 'sales' | 'agency';
}

const EmailSequenceBuilder = ({ section = 'sales' }: EmailSequenceBuilderProps) => {
  const [sequences, setSequences] = useState<EmailSequence[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingSequence, setEditingSequence] = useState<EmailSequence | null>(null);
  const [previewSequence, setPreviewSequence] = useState<EmailSequence | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [newSequence, setNewSequence] = useState({
    name: '',
    type: 'cold-outreach' as const,
    emails: [{ id: '1', subject: '', content: '', dayDelay: 0 }] as EmailTemplate[]
  });
  const { toast } = useToast();

  // Load sequences from localStorage on mount - section specific
  useEffect(() => {
    const savedSequences = localStorage.getItem(`emailSequences_${section}`);
    if (savedSequences) {
      setSequences(JSON.parse(savedSequences));
    }
  }, [section]);

  // Save sequences to localStorage whenever sequences change
  useEffect(() => {
    localStorage.setItem(`emailSequences_${section}`, JSON.stringify(sequences));
  }, [sequences, section]);

  const sequenceTemplates = {
    'cold-outreach': {
      name: 'Cold Outreach Campaign',
      emails: [
        {
          id: '1',
          subject: 'Quick question about [Company Name]',
          content: `Hi [First Name],

I noticed [Company Name] is doing some interesting work in [Industry]. I'm reaching out because we help companies like yours [specific benefit].

Would you be open to a brief 15-minute conversation to explore how we might help [Company Name] [achieve specific goal]?

Best regards,
[Your Name]`,
          dayDelay: 0
        },
        {
          id: '2', 
          subject: 'Following up on my previous email',
          content: `Hi [First Name],

I wanted to circle back on my previous email about helping [Company Name] with [specific challenge].

I understand you're busy, but I believe we could help you [specific benefit] in just [timeframe].

Would Thursday or Friday work better for a quick call?

Best,
[Your Name]`,
          dayDelay: 3
        },
        {
          id: '3',
          subject: 'Last follow-up - [Specific Value Proposition]',
          content: `Hi [First Name],

This will be my last follow-up. I don't want to be a pest, but I wanted to share one final thought.

Companies like [Similar Company] have seen [specific result] after working with us. If you ever want to explore how this could work for [Company Name], I'm here.

Feel free to reach out anytime.

Best,
[Your Name]`,
          dayDelay: 7
        }
      ]
    },
    'follow-up': {
      name: 'Meeting Follow-up Sequence',
      emails: [
        {
          id: '1',
          subject: 'Thank you for your time today',
          content: `Hi [First Name],

Thank you for taking the time to speak with me today about [Company Name]'s [discussed topic].

As promised, I'm attaching [mentioned resource/proposal]. 

Next steps:
- [Action item 1]
- [Action item 2]

I'll follow up next week to see how things are progressing.

Best regards,
[Your Name]`,
          dayDelay: 0
        },
        {
          id: '2',
          subject: 'Checking in on our conversation',
          content: `Hi [First Name],

I wanted to follow up on our conversation last week about [discussed topic].

Have you had a chance to review [sent material]? I'd love to hear your thoughts and answer any questions.

Would you like to schedule a brief follow-up call this week?

Best,
[Your Name]`,
          dayDelay: 5
        }
      ]
    },
    'lead-nurture': {
      name: 'Lead Nurture Sequence',
      emails: [
        {
          id: '1',
          subject: 'Welcome! Here\'s what you can expect',
          content: `Hi [First Name],

Welcome to our community! I'm excited to help you [achieve their goal].

Over the next few weeks, I'll be sharing valuable insights about [relevant topic] that can help [Company Name] [specific benefit].

Here's what you can expect:
- Weekly industry insights
- Case studies from similar companies
- Actionable tips you can implement immediately

Looking forward to supporting your success!

Best,
[Your Name]`,
          dayDelay: 0
        },
        {
          id: '2',
          subject: 'Case Study: How [Similar Company] achieved [Result]',
          content: `Hi [First Name],

I wanted to share an interesting case study that might resonate with your situation at [Company Name].

[Similar Company] was facing [similar challenge] and was able to [achieve specific result] by [solution approach].

The key factors in their success were:
- [Factor 1]
- [Factor 2]
- [Factor 3]

Would you like to discuss how a similar approach might work for [Company Name]?

Best,
[Your Name]`,
          dayDelay: 7
        },
        {
          id: '3',
          subject: '5 quick wins for [Their Industry]',
          content: `Hi [First Name],

Here are 5 quick wins that companies in [Their Industry] are using to [achieve benefit]:

1. [Quick win 1]
2. [Quick win 2]  
3. [Quick win 3]
4. [Quick win 4]
5. [Quick win 5]

Which of these resonates most with your current priorities at [Company Name]?

Happy to discuss how to implement any of these strategies.

Best,
[Your Name]`,
          dayDelay: 14
        },
        {
          id: '4',
          subject: 'Ready to take the next step?',
          content: `Hi [First Name],

Over the past few weeks, I've shared insights about [relevant topics] that can help [Company Name] [achieve goals].

Many companies at this stage are ready to move from learning to implementation.

If you're interested in exploring how we can help [Company Name] [specific outcome], I'd love to set up a brief strategy call.

Are you free for a 20-minute conversation this week?

Best,
[Your Name]`,
          dayDelay: 21
        }
      ]
    },
    're-engagement': {
      name: 'Re-engagement Campaign',
      emails: [
        {
          id: '1',
          subject: 'We miss you at [Company Name]',
          content: `Hi [First Name],

I noticed it's been a while since we last connected about [Company Name]'s [relevant area].

A lot has changed in [industry/area] recently, and I thought you might be interested in some of the new developments that could impact [Company Name].

Specifically:
- [Recent development 1]
- [Recent development 2]
- [Recent development 3]

Would you like to catch up on how these changes might affect your current strategy?

Best,
[Your Name]`,
          dayDelay: 0
        },
        {
          id: '2',
          subject: 'New opportunities in [Their Industry]',
          content: `Hi [First Name],

I've been working with several companies in [Their Industry] lately and seeing some interesting trends that might interest you.

Companies are now focusing on:
- [Trend 1] - resulting in [benefit]
- [Trend 2] - leading to [outcome]
- [Trend 3] - creating [opportunity]

Is [Company Name] exploring any of these areas? I'd love to share what's working for similar companies.

Worth a quick call?

Best,
[Your Name]`,
          dayDelay: 7
        },
        {
          id: '3',
          subject: 'Last attempt - but I have something special',
          content: `Hi [First Name],

I don't want to keep bothering you, but I came across something that made me think of [Company Name].

[Specific insight/opportunity/resource] that could be particularly relevant given [their situation/challenge].

If this isn't the right time, no worries at all. But if you're curious, I'm happy to share more details.

Either way, I wish you and [Company Name] continued success.

Best,
[Your Name]`,
          dayDelay: 14
        }
      ]
    },
    'onboarding': {
      name: 'Client Onboarding Sequence',
      emails: [
        {
          id: '1',
          subject: 'Welcome aboard! Let\'s get started',
          content: `Hi [First Name],

Welcome to [Company Name]! We're thrilled to be working with you.

To ensure a smooth start, here's what happens next:

Week 1: [Activity 1]
Week 2: [Activity 2]
Week 3: [Activity 3]

Your dedicated account manager is [Name] and they'll be in touch within 24 hours.

Looking forward to achieving great results together!

Best,
[Your Name]`,
          dayDelay: 0
        },
        {
          id: '2',
          subject: 'How are things going so far?',
          content: `Hi [First Name],

It's been a week since we started working together. How are things going so far?

I wanted to check in and see if you have any questions or if there's anything we can do to improve your experience.

Remember, we're here to help you succeed, so don't hesitate to reach out.

Best,
[Your Name]`,
          dayDelay: 7
        }
      ]
    }
  };

  const generateSequence = (type: string) => {
    const template = sequenceTemplates[type as keyof typeof sequenceTemplates];
    if (template) {
      setNewSequence({
        name: template.name,
        type: type as any,
        emails: template.emails
      });
    }
  };

  const handleCreateSequence = () => {
    if (!newSequence.name || newSequence.emails.some(email => !email.subject || !email.content)) {
      toast({
        title: "Error",
        description: "Please fill in sequence name and all email templates",
        variant: "destructive",
      });
      return;
    }

    const sequence: EmailSequence = {
      id: Date.now().toString(),
      name: newSequence.name,
      type: newSequence.type,
      status: 'draft',
      emails: newSequence.emails,
      createdAt: new Date().toISOString(),
      section
    };

    setSequences([...sequences, sequence]);
    
    setNewSequence({
      name: '',
      type: 'cold-outreach',
      emails: [{ id: '1', subject: '', content: '', dayDelay: 0 }]
    });
    setIsCreating(false);

    toast({
      title: "Sequence Created",
      description: `${sequence.name} has been created successfully`,
    });
  };

  const handleEditSequence = () => {
    if (!editingSequence || !newSequence.name || newSequence.emails.some(email => !email.subject || !email.content)) {
      toast({
        title: "Error",
        description: "Please fill in sequence name and all email templates",
        variant: "destructive",
      });
      return;
    }

    const updatedSequence: EmailSequence = {
      ...editingSequence,
      name: newSequence.name,
      type: newSequence.type,
      emails: newSequence.emails
    };

    setSequences(sequences.map(seq => 
      seq.id === editingSequence.id ? updatedSequence : seq
    ));

    setNewSequence({
      name: '',
      type: 'cold-outreach',
      emails: [{ id: '1', subject: '', content: '', dayDelay: 0 }]
    });
    setEditingSequence(null);
    setIsEditing(false);

    toast({
      title: "Sequence Updated",
      description: `${updatedSequence.name} has been updated successfully`,
    });
  };

  const openEditDialog = (sequence: EmailSequence) => {
    setEditingSequence(sequence);
    setNewSequence({
      name: sequence.name,
      type: sequence.type,
      emails: [...sequence.emails]
    });
    setIsEditing(true);
  };

  const handleDeleteSequence = (sequenceId: string) => {
    setSequences(sequences.filter(seq => seq.id !== sequenceId));
    toast({
      title: "Sequence Deleted",
      description: "Email sequence has been removed",
    });
  };

  const handleToggleStatus = (sequenceId: string) => {
    setSequences(sequences.map(seq => 
      seq.id === sequenceId 
        ? { ...seq, status: seq.status === 'active' ? 'paused' : 'active' as const }
        : seq
    ));
  };

  const addEmailTemplate = () => {
    const newEmail: EmailTemplate = {
      id: Date.now().toString(),
      subject: '',
      content: '',
      dayDelay: 0
    };
    setNewSequence({
      ...newSequence,
      emails: [...newSequence.emails, newEmail]
    });
  };

  const removeEmailTemplate = (emailId: string) => {
    setNewSequence({
      ...newSequence,
      emails: newSequence.emails.filter(email => email.id !== emailId)
    });
  };

  const updateEmailTemplate = (emailId: string, field: keyof EmailTemplate, value: string | number) => {
    setNewSequence({
      ...newSequence,
      emails: newSequence.emails.map(email => 
        email.id === emailId ? { ...email, [field]: value } : email
      )
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'paused': return 'bg-yellow-500';
      case 'draft': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const copySequence = (sequence: EmailSequence) => {
    const copiedSequence: EmailSequence = {
      ...sequence,
      id: Date.now().toString(),
      name: `${sequence.name} (Copy)`,
      status: 'draft',
      createdAt: new Date().toISOString()
    };

    setSequences([...sequences, copiedSequence]);
    toast({
      title: "Sequence Copied",
      description: `${copiedSequence.name} has been created`,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>Email Sequence Builder</span>
              </CardTitle>
              <CardDescription>Create and manage automated email sequences for your campaigns</CardDescription>
            </div>
            <Dialog open={isCreating} onOpenChange={setIsCreating}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Sequence
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create Email Sequence</DialogTitle>
                  <DialogDescription>
                    Create a new automated email sequence
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="sequence-name">Sequence Name *</Label>
                      <Input
                        id="sequence-name"
                        value={newSequence.name}
                        onChange={(e) => setNewSequence({ ...newSequence, name: e.target.value })}
                        placeholder="My Email Sequence"
                      />
                    </div>
                    <div>
                      <Label htmlFor="sequence-type">Sequence Type</Label>
                      <Select 
                        value={newSequence.type} 
                        onValueChange={(value) => {
                          setNewSequence({ 
                            ...newSequence, 
                            type: value as any 
                          });
                          generateSequence(value);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cold-outreach">Cold Outreach</SelectItem>
                          <SelectItem value="follow-up">Follow-up</SelectItem>
                          <SelectItem value="lead-nurture">Lead Nurture</SelectItem>
                          <SelectItem value="re-engagement">Re-engagement</SelectItem>
                          <SelectItem value="onboarding">Onboarding</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Email Templates</h3>
                      <Button onClick={addEmailTemplate} size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Email
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {newSequence.emails.map((email, index) => (
                        <Card key={email.id}>
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-sm">Email {index + 1}</CardTitle>
                              {newSequence.emails.length > 1 && (
                                <Button 
                                  onClick={() => removeEmailTemplate(email.id)}
                                  size="sm" 
                                  variant="outline"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              )}
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <Label>Subject Line *</Label>
                                <Input
                                  value={email.subject}
                                  onChange={(e) => updateEmailTemplate(email.id, 'subject', e.target.value)}
                                  placeholder="Email subject"
                                />
                              </div>
                              <div>
                                <Label>Day Delay</Label>
                                <Input
                                  type="number"
                                  value={email.dayDelay}
                                  onChange={(e) => updateEmailTemplate(email.id, 'dayDelay', parseInt(e.target.value) || 0)}
                                  placeholder="0"
                                />
                              </div>
                            </div>
                            <div>
                              <Label>Email Content *</Label>
                              <Textarea
                                value={email.content}
                                onChange={(e) => updateEmailTemplate(email.id, 'content', e.target.value)}
                                placeholder="Email content..."
                                rows={6}
                              />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button onClick={handleCreateSequence} className="flex-1">Create Sequence</Button>
                    <Button variant="outline" onClick={() => setIsCreating(false)}>Cancel</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {sequences.length === 0 ? (
            <div className="text-center py-8">
              <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No sequences yet</h3>
              <p className="text-muted-foreground">Create your first email sequence to start automating your outreach</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sequence Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Emails</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sequences.map((sequence) => (
                    <TableRow key={sequence.id}>
                      <TableCell>
                        <div className="font-medium">{sequence.name}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {sequence.type.replace('-', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{sequence.emails.length} emails</span>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(sequence.status)} text-white capitalize`}>
                          {sequence.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {new Date(sequence.createdAt).toLocaleDateString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setPreviewSequence(sequence);
                              setIsPreviewOpen(true);
                            }}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => openEditDialog(sequence)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => copySequence(sequence)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleToggleStatus(sequence.id)}
                          >
                            {sequence.status === 'active' ? 'Pause' : 'Activate'}
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDeleteSequence(sequence.id)}
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

      {/* Edit Sequence Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Email Sequence</DialogTitle>
            <DialogDescription>
              Update your email sequence
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-sequence-name">Sequence Name *</Label>
                <Input
                  id="edit-sequence-name"
                  value={newSequence.name}
                  onChange={(e) => setNewSequence({ ...newSequence, name: e.target.value })}
                  placeholder="My Email Sequence"
                />
              </div>
              <div>
                <Label htmlFor="edit-sequence-type">Sequence Type</Label>
                <Select 
                  value={newSequence.type} 
                  onValueChange={(value) => {
                    setNewSequence({ 
                      ...newSequence, 
                      type: value as any 
                    });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cold-outreach">Cold Outreach</SelectItem>
                    <SelectItem value="follow-up">Follow-up</SelectItem>
                    <SelectItem value="lead-nurture">Lead Nurture</SelectItem>
                    <SelectItem value="re-engagement">Re-engagement</SelectItem>
                    <SelectItem value="onboarding">Onboarding</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Email Templates</h3>
                <Button onClick={addEmailTemplate} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Email
                </Button>
              </div>
              
              <div className="space-y-4">
                {newSequence.emails.map((email, index) => (
                  <Card key={email.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">Email {index + 1}</CardTitle>
                        {newSequence.emails.length > 1 && (
                          <Button 
                            onClick={() => removeEmailTemplate(email.id)}
                            size="sm" 
                            variant="outline"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label>Subject Line *</Label>
                          <Input
                            value={email.subject}
                            onChange={(e) => updateEmailTemplate(email.id, 'subject', e.target.value)}
                            placeholder="Email subject"
                          />
                        </div>
                        <div>
                          <Label>Day Delay</Label>
                          <Input
                            type="number"
                            value={email.dayDelay}
                            onChange={(e) => updateEmailTemplate(email.id, 'dayDelay', parseInt(e.target.value) || 0)}
                            placeholder="0"
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Email Content *</Label>
                        <Textarea
                          value={email.content}
                          onChange={(e) => updateEmailTemplate(email.id, 'content', e.target.value)}
                          placeholder="Email content..."
                          rows={6}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleEditSequence} className="flex-1">Update Sequence</Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Preview Sequence Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Preview: {previewSequence?.name}</DialogTitle>
            <DialogDescription>
              Review your email sequence
            </DialogDescription>
          </DialogHeader>
          {previewSequence && (
            <div className="space-y-6">
              {previewSequence.emails.map((email, index) => (
                <Card key={email.id}>
                  <CardHeader>
                    <CardTitle className="text-sm">
                      Email {index + 1} {email.dayDelay > 0 && `(Day ${email.dayDelay})`}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-xs uppercase tracking-wide text-muted-foreground">Subject</Label>
                      <p className="font-medium">{email.subject}</p>
                    </div>
                    <div>
                      <Label className="text-xs uppercase tracking-wide text-muted-foreground">Content</Label>
                      <div className="bg-muted p-4 rounded-md whitespace-pre-wrap text-sm">
                        {email.content}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmailSequenceBuilder;
