
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  Calendar, 
  Play, 
  Pause, 
  Edit,
  Copy,
  TrendingUp,
  Users,
  Target
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Sequence {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'draft';
  enrolledProspects: number;
  responseRate: number;
  steps: SequenceStep[];
  createdAt: string;
}

interface SequenceStep {
  id: string;
  type: 'email' | 'call' | 'linkedin' | 'wait';
  delay: number;
  subject?: string;
  content: string;
  order: number;
}

const SalesSequences = () => {
  const [sequences, setSequences] = useState<Sequence[]>([
    {
      id: '1',
      name: 'Enterprise Software Outreach',
      description: 'Multi-touch sequence for enterprise software prospects',
      status: 'active',
      enrolledProspects: 47,
      responseRate: 24.5,
      steps: [
        {
          id: 's1',
          type: 'email',
          delay: 0,
          subject: 'Quick question about {{company}} scaling challenges',
          content: 'Hi {{firstName}},\n\nI noticed {{company}} has been growing rapidly. Are you facing any challenges with your current software infrastructure?\n\nBest,\n{{signature}}',
          order: 1
        },
        {
          id: 's2',
          type: 'wait',
          delay: 3,
          content: 'Wait 3 days',
          order: 2
        },
        {
          id: 's3',
          type: 'email',
          delay: 0,
          subject: 'Following up on {{company}} scaling',
          content: 'Hi {{firstName}},\n\nJust wanted to follow up on my previous email. Would you be open to a brief 15-minute call to discuss how we\'ve helped similar companies scale?\n\nBest,\n{{signature}}',
          order: 3
        }
      ],
      createdAt: '2024-01-10'
    },
    {
      id: '2',
      name: 'SaaS Demo Follow-up',
      description: 'Post-demo nurturing sequence',
      status: 'active',
      enrolledProspects: 23,
      responseRate: 31.2,
      steps: [
        {
          id: 's4',
          type: 'email',
          delay: 1,
          subject: 'Thanks for the demo - next steps?',
          content: 'Hi {{firstName}},\n\nThanks for taking the time to see our demo yesterday. What are your thoughts on how this could help {{company}}?\n\nBest,\n{{signature}}',
          order: 1
        },
        {
          id: 's5',
          type: 'call',
          delay: 2,
          content: 'Follow-up call to discuss implementation timeline and budget',
          order: 2
        }
      ],
      createdAt: '2024-01-08'
    }
  ]);

  const [newSequence, setNewSequence] = useState({
    name: '',
    description: '',
    industry: '',
    persona: ''
  });

  const { toast } = useToast();

  const handleSequenceAction = (sequenceId: string, action: 'play' | 'pause') => {
    setSequences(sequences.map(sequence => 
      sequence.id === sequenceId 
        ? { ...sequence, status: action === 'play' ? 'active' : 'paused' }
        : sequence
    ));
    
    toast({
      title: action === 'play' ? "Sequence Activated" : "Sequence Paused",
      description: `Sequence has been ${action === 'play' ? 'activated' : 'paused'} successfully`,
    });
  };

  const generateSequence = () => {
    if (!newSequence.name || !newSequence.industry) {
      toast({
        title: "Missing Information",
        description: "Please fill in sequence name and target industry",
        variant: "destructive",
      });
      return;
    }

    const aiGeneratedSequence: Sequence = {
      id: Date.now().toString(),
      name: newSequence.name,
      description: newSequence.description,
      status: 'draft',
      enrolledProspects: 0,
      responseRate: 0,
      steps: [
        {
          id: 'ai1',
          type: 'email',
          delay: 0,
          subject: `Helping ${newSequence.industry} companies scale efficiently`,
          content: `Hi {{firstName}},\n\nI've been working with several ${newSequence.industry} companies lately and noticed a common challenge around scaling operations.\n\nWould you be open to a brief conversation about how {{company}} is handling this?\n\nBest,\n{{signature}}`,
          order: 1
        },
        {
          id: 'ai2',
          type: 'wait',
          delay: 3,
          content: 'Wait 3 days',
          order: 2
        },
        {
          id: 'ai3',
          type: 'linkedin',
          delay: 0,
          content: `Quick follow-up on my email about ${newSequence.industry} scaling challenges. Would love to share some insights that might be relevant to {{company}}.`,
          order: 3
        }
      ],
      createdAt: new Date().toISOString().split('T')[0]
    };

    setSequences([aiGeneratedSequence, ...sequences]);
    
    toast({
      title: "Sequence Generated",
      description: "AI has created a new sales sequence based on your inputs",
    });

    setNewSequence({ name: '', description: '', industry: '', persona: '' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'paused': return 'bg-yellow-500';
      case 'draft': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="h-4 w-4" />;
      case 'call': return <Phone className="h-4 w-4" />;
      case 'linkedin': return <MessageSquare className="h-4 w-4" />;
      case 'wait': return <Calendar className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="sequences" className="space-y-6">
        <TabsList>
          <TabsTrigger value="sequences">Active Sequences</TabsTrigger>
          <TabsTrigger value="create">Create Sequence</TabsTrigger>
          <TabsTrigger value="analytics">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="sequences">
          <Card>
            <CardHeader>
              <CardTitle>Sales Sequences</CardTitle>
              <CardDescription>Automated multi-touch sales campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Sequence</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Enrolled</TableHead>
                      <TableHead>Response Rate</TableHead>
                      <TableHead>Steps</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sequences.map((sequence) => (
                      <TableRow key={sequence.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{sequence.name}</div>
                            <div className="text-sm text-muted-foreground">{sequence.description}</div>
                            <div className="text-xs text-muted-foreground">Created: {sequence.createdAt}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(sequence.status)}`} />
                            <span className="capitalize font-medium">{sequence.status}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold">{sequence.enrolledProspects}</span>
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold text-green-600">{sequence.responseRate}%</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            {sequence.steps.slice(0, 3).map((step) => (
                              <div key={step.id} className="flex items-center space-x-1 text-xs">
                                {getStepIcon(step.type)}
                              </div>
                            ))}
                            {sequence.steps.length > 3 && (
                              <span className="text-xs text-muted-foreground">+{sequence.steps.length - 3}</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            {sequence.status === 'active' ? (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleSequenceAction(sequence.id, 'pause')}
                              >
                                <Pause className="h-3 w-3" />
                              </Button>
                            ) : (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleSequenceAction(sequence.id, 'play')}
                              >
                                <Play className="h-3 w-3" />
                              </Button>
                            )}
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Copy className="h-3 w-3" />
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
        </TabsContent>

        <TabsContent value="create">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Sequence Generator</CardTitle>
                <CardDescription>Create personalized sales sequences using AI</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Sequence Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Enterprise SaaS Outreach"
                    value={newSequence.name}
                    onChange={(e) => setNewSequence({...newSequence, name: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of this sequence's purpose"
                    value={newSequence.description}
                    onChange={(e) => setNewSequence({...newSequence, description: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="industry">Target Industry</Label>
                  <Select value={newSequence.industry} onValueChange={(value) => setNewSequence({...newSequence, industry: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="persona">Target Persona</Label>
                  <Select value={newSequence.persona} onValueChange={(value) => setNewSequence({...newSequence, persona: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select persona" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ceo">CEO/Founder</SelectItem>
                      <SelectItem value="cto">CTO/Tech Lead</SelectItem>
                      <SelectItem value="vp-sales">VP of Sales</SelectItem>
                      <SelectItem value="vp-marketing">VP of Marketing</SelectItem>
                      <SelectItem value="operations">Operations Manager</SelectItem>
                      <SelectItem value="procurement">Procurement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={generateSequence} className="w-full">
                  Generate AI Sequence
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sequence Templates</CardTitle>
                <CardDescription>Pre-built templates for common scenarios</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="border rounded-lg p-3">
                    <h4 className="font-medium">Cold Outreach Template</h4>
                    <p className="text-sm text-muted-foreground">5-touch sequence for new prospects</p>
                    <Button size="sm" variant="outline" className="mt-2">Use Template</Button>
                  </div>
                  <div className="border rounded-lg p-3">
                    <h4 className="font-medium">Demo Follow-up</h4>
                    <p className="text-sm text-muted-foreground">Post-demo nurturing sequence</p>
                    <Button size="sm" variant="outline" className="mt-2">Use Template</Button>
                  </div>
                  <div className="border rounded-lg p-3">
                    <h4 className="font-medium">Re-engagement</h4>
                    <p className="text-sm text-muted-foreground">Win back dormant prospects</p>
                    <Button size="sm" variant="outline" className="mt-2">Use Template</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">26.8%</p>
                    <p className="text-sm text-muted-foreground">Avg Response Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">142</p>
                    <p className="text-sm text-muted-foreground">Active Prospects</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="text-2xl font-bold">18</p>
                    <p className="text-sm text-muted-foreground">Meetings Booked</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SalesSequences;
