
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Mail, Plus, Edit, Trash2, Send, Clock, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EmailTemplate {
  id: string;
  subject: string;
  content: string;
  delay: number; // days
  order: number;
}

interface EmailSequence {
  id: string;
  name: string;
  type: 'cold-outreach' | 'follow-up' | 'lead-nurture' | 're-engagement' | 'onboarding';
  description: string;
  templates: EmailTemplate[];
  isActive: boolean;
  createdAt: Date;
  section: 'sales' | 'agency';
}

interface EmailSequenceBuilderProps {
  section?: 'sales' | 'agency';
}

const EmailSequenceBuilder = ({ section = 'sales' }: EmailSequenceBuilderProps) => {
  const [sequences, setSequences] = useState<EmailSequence[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingSequence, setEditingSequence] = useState<EmailSequence | null>(null);
  const [selectedType, setSelectedType] = useState<EmailSequence['type']>('cold-outreach');
  const [sequenceName, setSequenceName] = useState('');
  const [sequenceDescription, setSequenceDescription] = useState('');
  const [currentTemplate, setCurrentTemplate] = useState({
    subject: '',
    content: '',
    delay: 0
  });
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const { toast } = useToast();

  // Load sequences from localStorage for the specific section
  useEffect(() => {
    const savedSequences = localStorage.getItem(`emailSequences_${section}`);
    if (savedSequences) {
      const parsed = JSON.parse(savedSequences).map((seq: any) => ({
        ...seq,
        createdAt: new Date(seq.createdAt)
      }));
      setSequences(parsed);
    }
  }, [section]);

  // Save sequences to localStorage whenever sequences change
  useEffect(() => {
    localStorage.setItem(`emailSequences_${section}`, JSON.stringify(sequences));
  }, [sequences, section]);

  const sequenceTypes = [
    {
      type: 'cold-outreach' as const,
      name: 'Cold Outreach',
      description: 'Initial contact sequence for new prospects'
    },
    {
      type: 'follow-up' as const,
      name: 'Follow-up Campaign',
      description: 'Follow-up sequence after initial contact'
    },
    {
      type: 'lead-nurture' as const,
      name: 'Lead Nurture Sequence',
      description: 'Educational content to nurture qualified leads'
    },
    {
      type: 're-engagement' as const,
      name: 'Re-engagement Campaign',
      description: 'Re-activate cold or inactive prospects'
    },
    {
      type: 'onboarding' as const,
      name: 'Client Onboarding',
      description: 'Welcome and onboard new clients'
    }
  ];

  const generateSequenceTemplate = (type: EmailSequence['type']) => {
    const templates = {
      'cold-outreach': [
        {
          subject: "Quick question about [Company Name]",
          content: "Hi [First Name],\n\nI noticed [Company Name] is doing great work in [Industry]. I'm curious - what's your biggest challenge when it comes to [relevant pain point]?\n\nI help companies like yours [specific benefit]. Would you be open to a brief 15-minute conversation this week?\n\nBest regards,\n[Your Name]",
          delay: 0,
          order: 1
        },
        {
          subject: "Following up on my email",
          content: "Hi [First Name],\n\nI sent you an email last week about [topic]. I know you're busy, so I'll keep this brief.\n\nMany [similar companies] are struggling with [pain point]. We've helped companies like [example] achieve [specific result].\n\nWould you be interested in seeing how we could help [Company Name]?\n\nBest,\n[Your Name]",
          delay: 3,
          order: 2
        },
        {
          subject: "Last attempt - [specific value proposition]",
          content: "Hi [First Name],\n\nThis will be my last email. I understand you're busy and priorities change.\n\nIf [pain point] ever becomes a priority, we're here to help. We've helped [similar company] achieve [specific result] in [timeframe].\n\nFeel free to reach out anytime.\n\nBest regards,\n[Your Name]",
          delay: 7,
          order: 3
        }
      ],
      'follow-up': [
        {
          subject: "Thanks for your time today",
          content: "Hi [First Name],\n\nThanks for taking the time to speak with me today. I enjoyed learning more about [specific challenge discussed].\n\nAs promised, I'm attaching [resource/proposal] that addresses the [specific need] we discussed.\n\nLet me know if you have any questions. I'm here to help.\n\nBest regards,\n[Your Name]",
          delay: 0,
          order: 1
        },
        {
          subject: "Checking in on [previous discussion topic]",
          content: "Hi [First Name],\n\nI wanted to follow up on our conversation about [topic]. Have you had a chance to review the [resource/proposal] I sent?\n\nI'm happy to answer any questions or schedule a quick call to discuss next steps.\n\nLooking forward to hearing from you.\n\nBest,\n[Your Name]",
          delay: 5,
          order: 2
        }
      ],
      'lead-nurture': [
        {
          subject: "Welcome! Here's what to expect",
          content: "Hi [First Name],\n\nWelcome to our community! I'm excited to share valuable insights that will help you [achieve specific goal].\n\nOver the next few weeks, you'll receive:\n• Industry insights and trends\n• Actionable tips and strategies\n• Case studies from successful companies\n• Exclusive resources and tools\n\nTo get started, here's a valuable resource: [link to resource]\n\nLooking forward to helping you succeed!\n\nBest,\n[Your Name]",
          delay: 0,
          order: 1
        },
        {
          subject: "Industry insight: [Relevant trend/tip]",
          content: "Hi [First Name],\n\nI wanted to share an important trend I'm seeing in [industry] that could impact your business.\n\n[Share specific insight with data/examples]\n\nThis is why many companies are now [taking specific action]. Here's how you can get started:\n\n1. [First step]\n2. [Second step]\n3. [Third step]\n\nNeed help implementing this? I'm here to assist.\n\nBest regards,\n[Your Name]",
          delay: 3,
          order: 2
        },
        {
          subject: "Case study: How [Company] achieved [result]",
          content: "Hi [First Name],\n\nI thought you'd find this case study interesting. [Company Name], similar to yours, was struggling with [challenge].\n\nHere's what they did:\n• [Strategy 1]\n• [Strategy 2]\n• [Strategy 3]\n\nThe result? [Specific outcome with numbers]\n\nWould you like to explore how we could achieve similar results for [their company]?\n\nBest,\n[Your Name]",
          delay: 7,
          order: 3
        }
      ],
      're-engagement': [
        {
          subject: "We miss you! Special offer inside",
          content: "Hi [First Name],\n\nI noticed it's been a while since we last connected. I hope everything is going well with [Company Name].\n\nTo re-engage, I'm offering [special offer/exclusive resource] that I think would be valuable for your [specific need].\n\nThis offer is only available for the next [timeframe]. Interested?\n\nLet me know if you'd like to reconnect and discuss how we can help.\n\nBest regards,\n[Your Name]",
          delay: 0,
          order: 1
        },
        {
          subject: "One last chance - [compelling offer]",
          content: "Hi [First Name],\n\nThis is my final attempt to reconnect. I understand priorities change and that's completely fine.\n\nIf you're still interested in [value proposition], I have one last offer that might interest you: [specific offer].\n\nNo pressure - just wanted to give you the opportunity before I remove you from my list.\n\nWishing you continued success!\n\n[Your Name]",
          delay: 5,
          order: 2
        }
      ],
      'onboarding': [
        {
          subject: "Welcome aboard! Let's get started",
          content: "Hi [First Name],\n\nWelcome to [Company Name]! We're thrilled to have you as a client and can't wait to help you achieve [specific goals].\n\nTo ensure a smooth start, here's what happens next:\n\n1. [First step] - [timeline]\n2. [Second step] - [timeline]\n3. [Third step] - [timeline]\n\nI'll be your main point of contact throughout this process. Feel free to reach out with any questions.\n\nLet's make great things happen together!\n\nBest,\n[Your Name]",
          delay: 0,
          order: 1
        },
        {
          subject: "Quick check-in on your progress",
          content: "Hi [First Name],\n\nHow are things going so far? I wanted to check in and see if you have any questions about [specific aspect of service].\n\nHere are some resources that might be helpful:\n• [Resource 1]\n• [Resource 2]\n• [Resource 3]\n\nRemember, I'm here to help make this as smooth as possible for you.\n\nBest regards,\n[Your Name]",
          delay: 7,
          order: 2
        }
      ]
    };

    return templates[type] || [];
  };

  const handleCreateSequence = () => {
    if (!sequenceName || templates.length === 0) {
      toast({
        title: "Error",
        description: "Please provide a sequence name and at least one email template",
        variant: "destructive",
      });
      return;
    }

    const sequence: EmailSequence = {
      id: Date.now().toString(),
      name: sequenceName,
      type: selectedType,
      description: sequenceDescription,
      templates: templates.map((template, index) => ({
        ...template,
        id: `${Date.now()}-${index}`,
        order: index + 1
      })),
      isActive: true,
      createdAt: new Date(),
      section
    };

    setSequences([...sequences, sequence]);
    
    // Reset form
    setSequenceName('');
    setSequenceDescription('');
    setTemplates([]);
    setCurrentTemplate({ subject: '', content: '', delay: 0 });
    setIsCreating(false);

    toast({
      title: "Sequence Created",
      description: `Email sequence "${sequence.name}" has been created successfully`,
    });
  };

  const handleEditSequence = () => {
    if (!editingSequence || !sequenceName || templates.length === 0) {
      toast({
        title: "Error",
        description: "Please provide a sequence name and at least one email template",
        variant: "destructive",
      });
      return;
    }

    const updatedSequence: EmailSequence = {
      ...editingSequence,
      name: sequenceName,
      type: selectedType,
      description: sequenceDescription,
      templates: templates.map((template, index) => ({
        ...template,
        id: template.id || `${Date.now()}-${index}`,
        order: index + 1
      }))
    };

    setSequences(sequences.map(seq => 
      seq.id === editingSequence.id ? updatedSequence : seq
    ));

    // Reset form
    setSequenceName('');
    setSequenceDescription('');
    setTemplates([]);
    setCurrentTemplate({ subject: '', content: '', delay: 0 });
    setEditingSequence(null);
    setIsEditing(false);

    toast({
      title: "Sequence Updated",
      description: `Email sequence "${updatedSequence.name}" has been updated successfully`,
    });
  };

  const openEditDialog = (sequence: EmailSequence) => {
    setEditingSequence(sequence);
    setSequenceName(sequence.name);
    setSequenceDescription(sequence.description);
    setSelectedType(sequence.type);
    setTemplates(sequence.templates);
    setIsEditing(true);
  };

  const handleDeleteSequence = (sequenceId: string) => {
    setSequences(sequences.filter(seq => seq.id !== sequenceId));
    toast({
      title: "Sequence Deleted",
      description: "Email sequence has been removed",
    });
  };

  const handleGenerateTemplate = () => {
    const generatedTemplates = generateSequenceTemplate(selectedType);
    setTemplates(generatedTemplates.map((template, index) => ({
      ...template,
      id: `generated-${index}-${Date.now()}`
    })));
    
    toast({
      title: "Templates Generated",
      description: `Generated ${generatedTemplates.length} email templates for ${selectedType}`,
    });
  };

  const addTemplate = () => {
    if (!currentTemplate.subject || !currentTemplate.content) {
      toast({
        title: "Error",
        description: "Please fill in both subject and content",
        variant: "destructive",
      });
      return;
    }

    const newTemplate: EmailTemplate = {
      id: `template-${Date.now()}`,
      subject: currentTemplate.subject,
      content: currentTemplate.content,
      delay: currentTemplate.delay,
      order: templates.length + 1
    };

    setTemplates([...templates, newTemplate]);
    setCurrentTemplate({ subject: '', content: '', delay: 0 });
  };

  const removeTemplate = (templateId: string) => {
    setTemplates(templates.filter(t => t.id !== templateId));
  };

  const toggleSequenceStatus = (sequenceId: string) => {
    setSequences(sequences.map(seq => 
      seq.id === sequenceId ? { ...seq, isActive: !seq.isActive } : seq
    ));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'cold-outreach': return 'bg-blue-500';
      case 'follow-up': return 'bg-green-500';
      case 'lead-nurture': return 'bg-purple-500';
      case 're-engagement': return 'bg-orange-500';
      case 'onboarding': return 'bg-indigo-500';
      default: return 'bg-gray-500';
    }
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
              <CardDescription>Create and manage automated email sequences</CardDescription>
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
                    Build an automated email sequence for your prospects
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  {/* Sequence Details */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="sequenceName">Sequence Name *</Label>
                      <Input
                        id="sequenceName"
                        value={sequenceName}
                        onChange={(e) => setSequenceName(e.target.value)}
                        placeholder="Cold Outreach Campaign"
                      />
                    </div>
                    <div>
                      <Label htmlFor="sequenceType">Sequence Type</Label>
                      <Select value={selectedType} onValueChange={(value: EmailSequence['type']) => setSelectedType(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {sequenceTypes.map((type) => (
                            <SelectItem key={type.type} value={type.type}>
                              {type.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="sequenceDescription">Description</Label>
                    <Textarea
                      id="sequenceDescription"
                      value={sequenceDescription}
                      onChange={(e) => setSequenceDescription(e.target.value)}
                      placeholder="Describe the purpose and target audience for this sequence..."
                      rows={2}
                    />
                  </div>

                  {/* Template Generation */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Email Templates</h3>
                      <Button onClick={handleGenerateTemplate} variant="outline">
                        Generate Templates
                      </Button>
                    </div>

                    {/* Template List */}
                    {templates.length > 0 && (
                      <div className="space-y-3 mb-4">
                        {templates.map((template, index) => (
                          <div key={template.id} className="border rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">Email {index + 1}</span>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {template.delay === 0 ? 'Immediate' : `${template.delay} days`}
                                </Badge>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => removeTemplate(template.id)}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            <p className="font-medium text-sm">{template.subject}</p>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {template.content.substring(0, 100)}...
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add Custom Template */}
                    <div className="space-y-3">
                      <h4 className="font-medium">Add Custom Email</h4>
                      <div className="grid gap-3">
                        <Input
                          placeholder="Email subject line"
                          value={currentTemplate.subject}
                          onChange={(e) => setCurrentTemplate({ ...currentTemplate, subject: e.target.value })}
                        />
                        <div className="grid grid-cols-3 gap-2">
                          <div className="col-span-2">
                            <Textarea
                              placeholder="Email content..."
                              value={currentTemplate.content}
                              onChange={(e) => setCurrentTemplate({ ...currentTemplate, content: e.target.value })}
                              rows={4}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Delay (days)</Label>
                            <Input
                              type="number"
                              min="0"
                              value={currentTemplate.delay}
                              onChange={(e) => setCurrentTemplate({ ...currentTemplate, delay: parseInt(e.target.value) || 0 })}
                            />
                            <Button onClick={addTemplate} className="w-full">
                              <Plus className="h-4 w-4 mr-1" />
                              Add
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleCreateSequence} className="flex-1">Create Sequence</Button>
                  <Button variant="outline" onClick={() => setIsCreating(false)}>Cancel</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* Sequences List */}
          {sequences.length === 0 ? (
            <div className="text-center py-8 border rounded-lg">
              <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No email sequences created yet</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {sequences.map((sequence) => (
                <Card key={sequence.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className={`${getTypeColor(sequence.type)} text-white`}>
                            {sequenceTypes.find(t => t.type === sequence.type)?.name}
                          </Badge>
                          <Badge variant={sequence.isActive ? 'default' : 'secondary'}>
                            {sequence.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                        <h4 className="font-medium">{sequence.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{sequence.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-2">
                          <div className="flex items-center space-x-1">
                            <Mail className="h-3 w-3" />
                            <span>{sequence.templates.length} emails</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{Math.max(...sequence.templates.map(t => t.delay))} day sequence</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleSequenceStatus(sequence.id)}
                        >
                          {sequence.isActive ? 'Pause' : 'Activate'}
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
                          onClick={() => handleDeleteSequence(sequence.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
              Update your automated email sequence
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {/* Sequence Details */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-sequenceName">Sequence Name *</Label>
                <Input
                  id="edit-sequenceName"
                  value={sequenceName}
                  onChange={(e) => setSequenceName(e.target.value)}
                  placeholder="Cold Outreach Campaign"
                />
              </div>
              <div>
                <Label htmlFor="edit-sequenceType">Sequence Type</Label>
                <Select value={selectedType} onValueChange={(value: EmailSequence['type']) => setSelectedType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sequenceTypes.map((type) => (
                      <SelectItem key={type.type} value={type.type}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="edit-sequenceDescription">Description</Label>
              <Textarea
                id="edit-sequenceDescription"
                value={sequenceDescription}
                onChange={(e) => setSequenceDescription(e.target.value)}
                placeholder="Describe the purpose and target audience for this sequence..."
                rows={2}
              />
            </div>

            {/* Template Management */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Email Templates</h3>
                <Button onClick={handleGenerateTemplate} variant="outline">
                  Regenerate Templates
                </Button>
              </div>

              {/* Template List */}
              {templates.length > 0 && (
                <div className="space-y-3 mb-4">
                  {templates.map((template, index) => (
                    <div key={template.id} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Email {index + 1}</span>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">
                            <Clock className="h-3 w-3 mr-1" />
                            {template.delay === 0 ? 'Immediate' : `${template.delay} days`}
                          </Badge>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeTemplate(template.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <p className="font-medium text-sm">{template.subject}</p>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {template.content.substring(0, 100)}...
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Custom Template */}
              <div className="space-y-3">
                <h4 className="font-medium">Add Custom Email</h4>
                <div className="grid gap-3">
                  <Input
                    placeholder="Email subject line"
                    value={currentTemplate.subject}
                    onChange={(e) => setCurrentTemplate({ ...currentTemplate, subject: e.target.value })}
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <Textarea
                        placeholder="Email content..."
                        value={currentTemplate.content}
                        onChange={(e) => setCurrentTemplate({ ...currentTemplate, content: e.target.value })}
                        rows={4}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Delay (days)</Label>
                      <Input
                        type="number"
                        min="0"
                        value={currentTemplate.delay}
                        onChange={(e) => setCurrentTemplate({ ...currentTemplate, delay: parseInt(e.target.value) || 0 })}
                      />
                      <Button onClick={addTemplate} className="w-full">
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleEditSequence} className="flex-1">Update Sequence</Button>
            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmailSequenceBuilder;
