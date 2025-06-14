
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MessageSquare, Plus, Edit, Trash2, Play, Save } from 'lucide-react';

interface SequenceStep {
  id: string;
  type: 'email' | 'call' | 'linkedin' | 'sms';
  delay: number;
  subject?: string;
  content: string;
  isEditable: boolean;
}

interface SalesSequence {
  id: string;
  name: string;
  description: string;
  steps: SequenceStep[];
  isActive: boolean;
}

interface SalesSequenceBuilderProps {
  onSaveSequence: (sequence: SalesSequence) => void;
  onDeploySequence: (sequence: SalesSequence) => void;
}

const SalesSequenceBuilder = ({ onSaveSequence, onDeploySequence }: SalesSequenceBuilderProps) => {
  const [sequences, setSequences] = useState<SalesSequence[]>([]);
  const [selectedSequence, setSelectedSequence] = useState<SalesSequence | null>(null);
  const [editingStep, setEditingStep] = useState<SequenceStep | null>(null);
  const [showStepDialog, setShowStepDialog] = useState(false);
  const [sequenceName, setSequenceName] = useState('');
  const [sequenceDescription, setSequenceDescription] = useState('');

  const prebuiltTemplates: SalesSequence[] = [
    {
      id: 'cold-outreach',
      name: 'Cold Outreach Sequence',
      description: 'Professional cold outreach sequence for new prospects',
      isActive: false,
      steps: [
        {
          id: '1',
          type: 'email',
          delay: 0,
          subject: 'Quick question about [Company Name]',
          content: 'Hi [First Name],\n\nI noticed [Company Name] is [specific observation]. I help companies like yours [value proposition].\n\nWould you be open to a quick 15-minute call to discuss how we could help [Company Name] [specific benefit]?\n\nBest regards,\n[Your Name]',
          isEditable: true
        },
        {
          id: '2',
          type: 'email',
          delay: 3,
          subject: 'Following up on my previous email',
          content: 'Hi [First Name],\n\nI wanted to follow up on my previous email about helping [Company Name] [specific benefit].\n\nI understand you\'re busy, but I have some ideas that could [specific value] for your team.\n\nWould you be available for a brief call this week?\n\nBest,\n[Your Name]',
          isEditable: true
        },
        {
          id: '3',
          type: 'linkedin',
          delay: 7,
          content: 'Hi [First Name], I sent you a couple of emails about helping [Company Name] with [specific solution]. Would love to connect and share some insights that could be valuable for your business.',
          isEditable: true
        }
      ]
    },
    {
      id: 'warm-follow-up',
      name: 'Warm Lead Follow-up',
      description: 'Follow-up sequence for leads who showed interest',
      isActive: false,
      steps: [
        {
          id: '1',
          type: 'email',
          delay: 0,
          subject: 'Thanks for your interest in [Product/Service]',
          content: 'Hi [First Name],\n\nThank you for your interest in [Product/Service]. I wanted to personally reach out to see how we can best help [Company Name].\n\nBased on what you shared, I think [specific solution] would be perfect for your needs.\n\nWould you like to schedule a demo to see it in action?\n\nBest regards,\n[Your Name]',
          isEditable: true
        },
        {
          id: '2',
          type: 'call',
          delay: 2,
          content: 'Follow-up call to discuss their specific needs and answer any questions about the demo.',
          isEditable: true
        },
        {
          id: '3',
          type: 'email',
          delay: 5,
          subject: 'Checking in - any questions about [Product/Service]?',
          content: 'Hi [First Name],\n\nI wanted to check in and see if you had any questions about [Product/Service] after our conversation.\n\nI\'m here to help with any concerns or to provide additional information you might need.\n\nLooking forward to hearing from you!\n\nBest,\n[Your Name]',
          isEditable: true
        }
      ]
    }
  ];

  const handleCreateFromTemplate = (template: SalesSequence) => {
    const newSequence = {
      ...template,
      id: Date.now().toString(),
      name: `${template.name} - Copy`,
      steps: template.steps.map(step => ({ ...step, id: Date.now().toString() + Math.random() }))
    };
    setSelectedSequence(newSequence);
    setSequenceName(newSequence.name);
    setSequenceDescription(newSequence.description);
  };

  const handleEditStep = (step: SequenceStep) => {
    setEditingStep({ ...step });
    setShowStepDialog(true);
  };

  const handleSaveStep = () => {
    if (!editingStep || !selectedSequence) return;

    const updatedSteps = selectedSequence.steps.map(step =>
      step.id === editingStep.id ? editingStep : step
    );

    setSelectedSequence({
      ...selectedSequence,
      steps: updatedSteps
    });

    setShowStepDialog(false);
    setEditingStep(null);
  };

  const handleDeleteStep = (stepId: string) => {
    if (!selectedSequence) return;

    const updatedSteps = selectedSequence.steps.filter(step => step.id !== stepId);
    setSelectedSequence({
      ...selectedSequence,
      steps: updatedSteps
    });
  };

  const handleAddStep = () => {
    const newStep: SequenceStep = {
      id: Date.now().toString(),
      type: 'email',
      delay: 1,
      subject: '',
      content: '',
      isEditable: true
    };
    setEditingStep(newStep);
    setShowStepDialog(true);
  };

  const handleSaveSequence = () => {
    if (!selectedSequence) return;

    const updatedSequence = {
      ...selectedSequence,
      name: sequenceName,
      description: sequenceDescription
    };

    setSequences([...sequences, updatedSequence]);
    onSaveSequence(updatedSequence);
    
    // Reset form
    setSelectedSequence(null);
    setSequenceName('');
    setSequenceDescription('');
  };

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'email': return '📧';
      case 'call': return '📞';
      case 'linkedin': return '💼';
      case 'sms': return '💬';
      default: return '📧';
    }
  };

  const getDelayText = (delay: number) => {
    if (delay === 0) return 'Immediately';
    if (delay === 1) return '1 day later';
    return `${delay} days later`;
  };

  return (
    <div className="space-y-6">
      {/* Step Editing Dialog */}
      <Dialog open={showStepDialog} onOpenChange={setShowStepDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Sequence Step</DialogTitle>
            <DialogDescription>
              Customize this step in your sales sequence
            </DialogDescription>
          </DialogHeader>
          {editingStep && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="stepType">Step Type</Label>
                  <Select
                    value={editingStep.type}
                    onValueChange={(value: any) => setEditingStep({ ...editingStep, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="call">Phone Call</SelectItem>
                      <SelectItem value="linkedin">LinkedIn Message</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="delay">Delay (days)</Label>
                  <Input
                    id="delay"
                    type="number"
                    value={editingStep.delay}
                    onChange={(e) => setEditingStep({ ...editingStep, delay: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
              
              {editingStep.type === 'email' && (
                <div>
                  <Label htmlFor="subject">Email Subject</Label>
                  <Input
                    id="subject"
                    value={editingStep.subject || ''}
                    onChange={(e) => setEditingStep({ ...editingStep, subject: e.target.value })}
                    placeholder="Email subject line"
                  />
                </div>
              )}
              
              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={editingStep.content}
                  onChange={(e) => setEditingStep({ ...editingStep, content: e.target.value })}
                  placeholder="Step content..."
                  rows={6}
                />
              </div>
              
              <div className="flex space-x-2">
                <Button onClick={handleSaveStep} className="flex-1">Save Step</Button>
                <Button variant="outline" onClick={() => setShowStepDialog(false)}>Cancel</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {!selectedSequence ? (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sales Sequence Templates</CardTitle>
              <CardDescription>Choose from pre-built templates or create your own sequence</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {prebuiltTemplates.map((template) => (
                  <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm text-muted-foreground">{template.steps.length} steps</p>
                        <div className="flex flex-wrap gap-1">
                          {template.steps.slice(0, 3).map((step, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {getStepIcon(step.type)} {step.type}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button 
                        onClick={() => handleCreateFromTemplate(template)}
                        className="w-full"
                      >
                        Use This Template
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {sequences.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Your Sequences</CardTitle>
                <CardDescription>Manage your created sequences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sequences.map((sequence) => (
                    <div key={sequence.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{sequence.name}</h3>
                        <p className="text-sm text-muted-foreground">{sequence.description}</p>
                        <p className="text-xs text-muted-foreground">{sequence.steps.length} steps</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => setSelectedSequence(sequence)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" onClick={() => onDeploySequence(sequence)}>
                          <Play className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Build Your Sequence</CardTitle>
                  <CardDescription>Customize your sales sequence steps</CardDescription>
                </div>
                <Button variant="outline" onClick={() => setSelectedSequence(null)}>
                  Back to Templates
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sequenceName">Sequence Name</Label>
                  <Input
                    id="sequenceName"
                    value={sequenceName}
                    onChange={(e) => setSequenceName(e.target.value)}
                    placeholder="My Custom Sequence"
                  />
                </div>
                <div>
                  <Label htmlFor="sequenceDescription">Description</Label>
                  <Input
                    id="sequenceDescription"
                    value={sequenceDescription}
                    onChange={(e) => setSequenceDescription(e.target.value)}
                    placeholder="Sequence description"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Sequence Steps</CardTitle>
                <Button onClick={handleAddStep}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Step
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedSequence.steps.map((step, index) => (
                  <div key={step.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">
                          {getStepIcon(step.type)} {step.type}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {getDelayText(step.delay)}
                        </span>
                      </div>
                      {step.subject && (
                        <p className="font-medium">{step.subject}</p>
                      )}
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {step.content}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleEditStep(step)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDeleteStep(step.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex space-x-4 pt-4">
                <Button onClick={handleSaveSequence} className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  Save Sequence
                </Button>
                <Button variant="outline" onClick={() => onDeploySequence(selectedSequence)} className="flex-1">
                  <Play className="h-4 w-4 mr-2" />
                  Deploy Sequence
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SalesSequenceBuilder;
