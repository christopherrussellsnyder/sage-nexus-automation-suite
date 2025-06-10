
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Phone, MessageSquare, Video, Calendar, Plus, Send } from 'lucide-react';

interface SequenceStep {
  id: string;
  type: 'email' | 'call' | 'linkedin' | 'video' | 'directmail';
  delay: number;
  delayUnit: 'hours' | 'days' | 'weeks';
  subject?: string;
  content: string;
  isPersonalized: boolean;
}

interface SalesSequenceBuilderProps {
  onSaveSequence: (sequence: SequenceStep[]) => void;
  onDeploySequence: (sequence: SequenceStep[]) => void;
}

const SalesSequenceBuilder = ({ onSaveSequence, onDeploySequence }: SalesSequenceBuilderProps) => {
  const [sequenceName, setSequenceName] = useState('');
  const [steps, setSteps] = useState<SequenceStep[]>([]);
  const [currentStep, setCurrentStep] = useState<SequenceStep>({
    id: '',
    type: 'email',
    delay: 1,
    delayUnit: 'days',
    content: '',
    isPersonalized: true
  });

  const stepTypes = [
    { type: 'email', label: 'Email', icon: Mail, color: 'bg-blue-500' },
    { type: 'call', label: 'Phone Call', icon: Phone, color: 'bg-green-500' },
    { type: 'linkedin', label: 'LinkedIn Message', icon: MessageSquare, color: 'bg-blue-600' },
    { type: 'video', label: 'Video Message', icon: Video, color: 'bg-purple-500' },
    { type: 'directmail', label: 'Direct Mail', icon: Send, color: 'bg-orange-500' }
  ];

  const emailTemplates = {
    introduction: `Hi there,

I hope this email finds you well. I came across your company and was impressed by your work.

I'd love to learn more about your current challenges and share how we've helped similar companies.

Would you be open to a brief 15-minute conversation next week?

Best regards,
[Your Name]`,
    
    followUp: `Hi there,

I wanted to follow up on my previous email about our conversation.

I noticed that your company recently made some updates. This actually reminded me of a similar situation we helped another company with.

The results were impressive.

Would you have 10 minutes for a quick call this week?

Best,
[Your Name]`,
    
    valueProposition: `Hi there,

Quick question: How much time does your team spend on manual processes each week?

We recently helped a similar company reduce this by 50% while improving efficiency.

Here's a 2-minute case study link.

Worth a brief conversation?

Best,
[Your Name]`
  };

  const addStep = () => {
    const newStep = {
      ...currentStep,
      id: Date.now().toString()
    };
    setSteps([...steps, newStep]);
    setCurrentStep({
      id: '',
      type: 'email',
      delay: 1,
      delayUnit: 'days',
      content: '',
      isPersonalized: true
    });
  };

  const removeStep = (stepId: string) => {
    setSteps(steps.filter(step => step.id !== stepId));
  };

  const updateCurrentStep = (field: keyof SequenceStep, value: any) => {
    setCurrentStep(prev => ({ ...prev, [field]: value }));
  };

  const useTemplate = (templateKey: keyof typeof emailTemplates) => {
    updateCurrentStep('content', emailTemplates[templateKey]);
  };

  const getStepIcon = (type: string) => {
    const stepType = stepTypes.find(s => s.type === type);
    if (!stepType) return Mail;
    return stepType.icon;
  };

  const getStepColor = (type: string) => {
    const stepType = stepTypes.find(s => s.type === type);
    return stepType?.color || 'bg-gray-500';
  };

  return (
    <div className="space-y-6">
      {/* Sequence Builder Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Send className="h-5 w-5" />
            <span>Sales Sequence Builder</span>
          </CardTitle>
          <CardDescription>
            Create multi-channel automated sales sequences with AI personalization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sequenceName">Sequence Name</Label>
              <Input
                id="sequenceName"
                placeholder="e.g., SaaS Decision Maker Outreach"
                value={sequenceName}
                onChange={(e) => setSequenceName(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Step Builder */}
        <Card>
          <CardHeader>
            <CardTitle>Add New Step</CardTitle>
            <CardDescription>Configure the next step in your sequence</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="details" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Step Details</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-4">
                <div className="space-y-2">
                  <Label>Step Type</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {stepTypes.map((type) => (
                      <Button
                        key={type.type}
                        variant={currentStep.type === type.type ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => updateCurrentStep('type', type.type)}
                        className="flex items-center space-x-2"
                      >
                        <type.icon className="h-4 w-4" />
                        <span>{type.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="delay">Delay</Label>
                    <Input
                      id="delay"
                      type="number"
                      min="1"
                      value={currentStep.delay}
                      onChange={(e) => updateCurrentStep('delay', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="delayUnit">Unit</Label>
                    <Select value={currentStep.delayUnit} onValueChange={(value) => updateCurrentStep('delayUnit', value)}>
                      <SelectTrigger>
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

                {currentStep.type === 'email' && (
                  <div className="space-y-2">
                    <Label htmlFor="subject">Email Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Quick question about your company"
                      value={currentStep.subject || ''}
                      onChange={(e) => updateCurrentStep('subject', e.target.value)}
                    />
                  </div>
                )}
              </TabsContent>

              <TabsContent value="content" className="space-y-4">
                {currentStep.type === 'email' && (
                  <div className="space-y-2">
                    <Label>Email Templates</Label>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => useTemplate('introduction')}
                      >
                        Introduction
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => useTemplate('followUp')}
                      >
                        Follow Up
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => useTemplate('valueProposition')}
                      >
                        Value Prop
                      </Button>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Enter your message content... Use placeholders like [First Name], [Company Name], etc. for personalization"
                    value={currentStep.content}
                    onChange={(e) => updateCurrentStep('content', e.target.value)}
                    rows={8}
                  />
                  <div className="text-xs text-muted-foreground">
                    Use variables like [First Name], [Company Name], [Industry] for AI personalization
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <Button onClick={addStep} className="w-full" disabled={!currentStep.content}>
              <Plus className="h-4 w-4 mr-2" />
              Add Step to Sequence
            </Button>
          </CardContent>
        </Card>

        {/* Sequence Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Sequence Preview</CardTitle>
            <CardDescription>
              {steps.length} steps configured
            </CardDescription>
          </CardHeader>
          <CardContent>
            {steps.length > 0 ? (
              <div className="space-y-4">
                {steps.map((step, index) => {
                  const StepIcon = getStepIcon(step.type);
                  return (
                    <div key={step.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-full ${getStepColor(step.type)} text-white`}>
                            <StepIcon className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="font-medium">
                              Step {index + 1}: {stepTypes.find(t => t.type === step.type)?.label}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              After {step.delay} {step.delayUnit}
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeStep(step.id)}
                        >
                          Remove
                        </Button>
                      </div>
                      
                      {step.subject && (
                        <div className="text-sm">
                          <span className="font-medium">Subject:</span> {step.subject}
                        </div>
                      )}
                      
                      <div className="text-sm bg-gray-50 p-2 rounded">
                        {step.content.substring(0, 100)}...
                      </div>
                      
                      {step.isPersonalized && (
                        <Badge variant="secondary" className="text-xs">
                          AI Personalized
                        </Badge>
                      )}
                    </div>
                  );
                })}
                
                <div className="flex space-x-2 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => onSaveSequence(steps)}
                    disabled={steps.length === 0}
                  >
                    Save Sequence
                  </Button>
                  <Button 
                    onClick={() => onDeploySequence(steps)}
                    disabled={steps.length === 0}
                  >
                    Deploy Sequence
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Send className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Steps Added</h3>
                <p className="text-muted-foreground">
                  Add your first step to start building your sales sequence
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalesSequenceBuilder;
