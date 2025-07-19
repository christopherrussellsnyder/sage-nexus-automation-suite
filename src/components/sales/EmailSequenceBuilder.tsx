
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Mail, Plus, Trash2, Play, Eye, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EmailSequence {
  id: string;
  name: string;
  type: 'cold-outreach' | 'follow-up' | 'nurture' | 're-engagement';
  emails: EmailTemplate[];
  createdAt: string;
  status: 'draft' | 'active' | 'paused';
}

interface EmailTemplate {
  id: string;
  subject: string;
  content: string;
  delayDays: number;
}

const EmailSequenceBuilder = () => {
  const [sequences, setSequences] = useState<EmailSequence[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('');
  const [sequenceName, setSequenceName] = useState('');
  const [generatingSequence, setGeneratingSequence] = useState(false);
  const { toast } = useToast();

  const sequenceTemplates = {
    'cold-outreach': {
      name: 'Cold Outreach Campaign',
      description: 'Professional cold email sequence for new prospects',
      emails: [
        {
          subject: 'Quick question about {{company_name}}',
          content: `Hi {{first_name}},

I noticed {{company_name}} has been growing rapidly in the {{industry}} space. I'm impressed by your recent {{recent_achievement}}.

I work with companies similar to yours to help them {{value_proposition}}. Would you be open to a brief conversation about how we might be able to help {{company_name}} achieve similar results?

Best regards,
{{sender_name}}`,
          delayDays: 0
        },
        {
          subject: 'Following up on my previous email',
          content: `Hi {{first_name}},

I wanted to follow up on my previous email regarding {{company_name}}.

I understand you're busy, but I believe there's a real opportunity here. Many companies in your position have seen {{specific_benefit}} within {{timeframe}}.

Would a quick 15-minute call this week work for you?

Best,
{{sender_name}}`,
          delayDays: 3
        },
        {
          subject: 'Last attempt - {{company_name}} opportunity',
          content: `Hi {{first_name}},

This will be my final email regarding the opportunity I mentioned for {{company_name}}.

If now isn't the right time, I completely understand. However, if you'd like to explore how we can help {{company_name}} {{specific_outcome}}, please let me know.

Best of luck with your current initiatives.

{{sender_name}}`,
          delayDays: 7
        }
      ]
    },
    'follow-up': {
      name: 'Follow-up Sequence',
      description: 'Nurture leads who showed initial interest',
      emails: [
        {
          subject: 'Thanks for your interest in our solution',
          content: `Hi {{first_name}},

Thank you for your interest in learning more about how we can help {{company_name}}.

As promised, I'm sending you some additional information that shows how companies similar to yours have achieved {{specific_results}}.

When would be a good time for a brief call to discuss your specific needs?

Best regards,
{{sender_name}}`,
          delayDays: 0
        },
        {
          subject: 'Case study: How {{similar_company}} achieved {{result}}',
          content: `Hi {{first_name}},

I thought you'd find this case study interesting. {{similar_company}}, a company similar to {{company_name}}, was able to {{achievement}} using our solution.

The key was {{key_strategy}}, which I believe could work well for {{company_name}} too.

Would you like to discuss how we could implement something similar for you?

Best,
{{sender_name}}`,
          delayDays: 4
        }
      ]
    },
    'nurture': {
      name: 'Lead Nurture Sequence',
      description: 'Long-term nurturing for potential customers',
      emails: [
        {
          subject: 'Valuable insights for {{company_name}}',
          content: `Hi {{first_name}},

I came across an article that made me think of {{company_name}} and the challenges you mentioned regarding {{pain_point}}.

The article discusses {{relevant_topic}} and provides some actionable insights that might be helpful for your team.

No agenda here - just wanted to share something valuable.

Best,
{{sender_name}}`,
          delayDays: 0
        },
        {
          subject: 'Industry update: {{relevant_news}}',
          content: `Hi {{first_name}},

Thought you'd be interested in this recent development in the {{industry}} industry: {{relevant_news}}.

Given {{company_name}}'s position in the market, this could present both opportunities and challenges. How are you planning to adapt?

Happy to discuss if you'd like a second opinion.

Best regards,
{{sender_name}}`,
          delayDays: 14
        },
        {
          subject: 'Quick check-in',
          content: `Hi {{first_name}},

Hope things are going well at {{company_name}}. I've been following your recent {{company_updates}} - congratulations on the progress!

Just wanted to check in and see if there's anything I can help with. Whether it's {{service_area_1}} or {{service_area_2}}, I'm here if you need support.

Best,
{{sender_name}}`,
          delayDays: 30
        }
      ]
    },
    're-engagement': {
      name: 'Re-engagement Campaign',
      description: 'Win back inactive leads or past customers',
      emails: [
        {
          subject: 'We miss you, {{first_name}}',
          content: `Hi {{first_name}},

It's been a while since we last connected, and I wanted to reach out to see how things are going at {{company_name}}.

I know priorities shift and timing isn't always right, but I'm curious - are you still facing challenges with {{original_pain_point}}?

We've made some significant improvements to our solution since we last spoke, and I'd love to share what's new.

Would you be open to a brief catch-up call?

Best,
{{sender_name}}`,
          delayDays: 0
        },
        {
          subject: 'New solution for {{pain_point}}',
          content: `Hi {{first_name}},

I remember you mentioned {{specific_challenge}} was a priority for {{company_name}}.

We've just launched a new feature that directly addresses this issue, and early results from companies like yours show {{impressive_results}}.

I'd love to show you how this could work for {{company_name}}. Are you available for a quick demo this week?

Best regards,
{{sender_name}}`,
          delayDays: 5
        },
        {
          subject: 'Special offer for {{company_name}}',
          content: `Hi {{first_name}},

I wanted to extend a special offer to {{company_name}} as a way to reconnect and demonstrate the value we can provide.

For a limited time, we're offering {{special_offer}} to select companies in the {{industry}} space.

This could be a great opportunity to finally tackle {{pain_point}} without the usual investment concerns.

Interested in learning more?

Best,
{{sender_name}}`,
          delayDays: 10
        }
      ]
    }
  };

  const generateSequence = async () => {
    if (!selectedType || !sequenceName) {
      toast({
        title: "Error",
        description: "Please select a sequence type and enter a name",
        variant: "destructive",
      });
      return;
    }

    setGeneratingSequence(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      const template = sequenceTemplates[selectedType as keyof typeof sequenceTemplates];
      
      const newSequence: EmailSequence = {
        id: Date.now().toString(),
        name: sequenceName,
        type: selectedType as EmailSequence['type'],
        emails: template.emails.map((email, index) => ({
          id: `${Date.now()}-${index}`,
          ...email
        })),
        createdAt: new Date().toISOString(),
        status: 'draft'
      };

      setSequences(prev => [...prev, newSequence]);
      setSelectedType('');
      setSequenceName('');
      setIsCreating(false);

      toast({
        title: "Sequence Created",
        description: `${template.name} has been generated successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate email sequence",
        variant: "destructive",
      });
    } finally {
      setGeneratingSequence(false);
    }
  };

  const deleteSequence = (sequenceId: string) => {
    setSequences(prev => prev.filter(seq => seq.id !== sequenceId));
    toast({
      title: "Sequence Deleted",
      description: "Email sequence has been removed",
    });
  };

  const updateSequenceStatus = (sequenceId: string, status: EmailSequence['status']) => {
    setSequences(prev => prev.map(seq => 
      seq.id === sequenceId ? { ...seq, status } : seq
    ));
    toast({
      title: "Status Updated",
      description: `Sequence status changed to ${status}`,
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'cold-outreach': return 'bg-blue-500';
      case 'follow-up': return 'bg-purple-500';
      case 'nurture': return 'bg-green-500';
      case 're-engagement': return 'bg-orange-500';
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
            <Button onClick={() => setIsCreating(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Sequence
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isCreating && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Create New Email Sequence</CardTitle>
                <CardDescription>Choose a template and customize your email sequence</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="sequenceName">Sequence Name</Label>
                  <Input
                    id="sequenceName"
                    value={sequenceName}
                    onChange={(e) => setSequenceName(e.target.value)}
                    placeholder="Enter sequence name"
                  />
                </div>
                <div>
                  <Label htmlFor="sequenceType">Sequence Type</Label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sequence type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cold-outreach">Cold Outreach Campaign</SelectItem>
                      <SelectItem value="follow-up">Follow-up Sequence</SelectItem>
                      <SelectItem value="nurture">Lead Nurture Sequence</SelectItem>
                      <SelectItem value="re-engagement">Re-engagement Campaign</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {selectedType && (
                  <div className="p-4 border rounded-lg bg-muted/50">
                    <h4 className="font-medium mb-2">{sequenceTemplates[selectedType as keyof typeof sequenceTemplates].name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {sequenceTemplates[selectedType as keyof typeof sequenceTemplates].description}
                    </p>
                    <p className="text-sm font-medium">
                      {sequenceTemplates[selectedType as keyof typeof sequenceTemplates].emails.length} emails included
                    </p>
                  </div>
                )}
                <div className="flex space-x-2">
                  <Button 
                    onClick={generateSequence} 
                    disabled={generatingSequence || !selectedType || !sequenceName}
                    className="flex-1"
                  >
                    {generatingSequence ? 'Generating...' : 'Create Sequence'}
                  </Button>
                  <Button variant="outline" onClick={() => setIsCreating(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {sequences.length === 0 ? (
            <div className="text-center py-8">
              <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No email sequences yet</h3>
              <p className="text-muted-foreground">Create your first automated email sequence to start nurturing leads</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sequences.map((sequence) => (
                <Card key={sequence.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium">{sequence.name}</h4>
                          <Badge className={`${getTypeColor(sequence.type)} text-white`}>
                            {sequence.type.replace('-', ' ')}
                          </Badge>
                          <Badge className={`${getStatusColor(sequence.status)} text-white`}>
                            {sequence.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {sequence.emails.length} emails • Created {new Date(sequence.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3" />
                        </Button>
                        {sequence.status === 'draft' && (
                          <Button 
                            size="sm" 
                            onClick={() => updateSequenceStatus(sequence.id, 'active')}
                          >
                            <Play className="h-3 w-3" />
                          </Button>
                        )}
                        {sequence.status === 'active' && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => updateSequenceStatus(sequence.id, 'paused')}
                          >
                            Pause
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => deleteSequence(sequence.id)}
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
    </div>
  );
};

export default EmailSequenceBuilder;
