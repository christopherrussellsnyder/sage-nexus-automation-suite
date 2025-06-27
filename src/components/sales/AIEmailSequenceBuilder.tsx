
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Sparkles, 
  Mail, 
  Edit, 
  Play, 
  Pause, 
  Copy,
  BarChart3,
  Target,
  Clock,
  Zap,
  Download,
  RefreshCw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SequenceWizard from '@/components/shared/SequenceWizard';
import AdvancedEmailEditor from '@/components/shared/AdvancedEmailEditor';
import { SequenceWizardData, EnhancedEmailSequence, EnhancedEmailTemplate } from '@/types/sequenceWizard';
import { EmailSequenceAIService } from '@/services/EmailSequenceAIService';

const AIEmailSequenceBuilder = () => {
  const [sequences, setSequences] = useState<EnhancedEmailSequence[]>([]);
  const [showWizard, setShowWizard] = useState(false);
  const [selectedSequence, setSelectedSequence] = useState<EnhancedEmailSequence | null>(null);
  const [editingEmail, setEditingEmail] = useState<EnhancedEmailTemplate | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleWizardComplete = async (data: SequenceWizardData) => {
    setIsGenerating(true);
    setShowWizard(false);
    
    try {
      console.log('Generating AI sequence with data:', data);
      const generatedSequence = await EmailSequenceAIService.generateSequence(data);
      
      setSequences(prev => [...prev, generatedSequence]);
      setSelectedSequence(generatedSequence);
      
      toast({
        title: "AI Sequence Generated!",
        description: `Created ${generatedSequence.emails.length} personalized emails with ${generatedSequence.totalWordCount.toLocaleString()} total words`,
      });
    } catch (error) {
      console.error('Error generating sequence:', error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate email sequence",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEmailEdit = (email: EnhancedEmailTemplate) => {
    setEditingEmail(email);
  };

  const handleEmailSave = (updatedEmail: EnhancedEmailTemplate) => {
    if (!selectedSequence) return;

    const updatedSequence = {
      ...selectedSequence,
      emails: selectedSequence.emails.map(email => 
        email.id === updatedEmail.id ? updatedEmail : email
      ),
      updatedAt: new Date().toISOString()
    };

    setSequences(prev => prev.map(seq => 
      seq.id === selectedSequence.id ? updatedSequence : seq
    ));
    setSelectedSequence(updatedSequence);
    setEditingEmail(null);

    toast({
      title: "Email Updated",
      description: "Your email has been saved successfully",
    });
  };

  const duplicateEmail = (email: EnhancedEmailTemplate) => {
    if (!selectedSequence) return;

    const duplicatedEmail: EnhancedEmailTemplate = {
      ...email,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: `${email.name} (Copy)`,
      sequenceDay: email.sequenceDay + 1
    };

    const updatedSequence = {
      ...selectedSequence,
      emails: [...selectedSequence.emails, duplicatedEmail].sort((a, b) => a.sequenceDay - b.sequenceDay),
      updatedAt: new Date().toISOString()
    };

    setSequences(prev => prev.map(seq => 
      seq.id === selectedSequence.id ? updatedSequence : seq
    ));
    setSelectedSequence(updatedSequence);

    toast({
      title: "Email Duplicated",
      description: "Email copied and added to sequence",
    });
  };

  const exportSequence = (sequence: EnhancedEmailSequence) => {
    const exportData = {
      ...sequence,
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${sequence.name.replace(/\s+/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Sequence Exported",
      description: "Email sequence downloaded successfully",
    });
  };

  const getTypeColor = (type: string) => {
    const colors = {
      opener: 'bg-blue-100 text-blue-800',
      value: 'bg-green-100 text-green-800',
      'social-proof': 'bg-purple-100 text-purple-800',
      'objection-handler': 'bg-orange-100 text-orange-800',
      offer: 'bg-red-100 text-red-800',
      urgency: 'bg-yellow-100 text-yellow-800',
      final: 'bg-gray-100 text-gray-800',
      'follow-up': 'bg-indigo-100 text-indigo-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (showWizard) {
    return (
      <SequenceWizard
        type="sales"
        onComplete={handleWizardComplete}
        onCancel={() => setShowWizard(false)}
      />
    );
  }

  if (isGenerating) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <RefreshCw className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-spin" />
          <h3 className="text-xl font-semibold mb-2">Generating Your AI Email Sequence</h3>
          <p className="text-muted-foreground mb-4">
            Our AI is crafting personalized, high-converting emails based on your business data...
          </p>
          <div className="max-w-md mx-auto space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
              <span>Analyzing your business profile</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              <span>Creating personalized content</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
              <span>Optimizing for conversions</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                <span>AI Email Sequence Builder</span>
              </CardTitle>
              <CardDescription>
                Create high-converting email sequences powered by artificial intelligence
              </CardDescription>
            </div>
            <Button onClick={() => setShowWizard(true)}>
              <Sparkles className="h-4 w-4 mr-2" />
              Create AI Sequence
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Sequences Overview */}
      {sequences.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Email Sequences Yet</h3>
            <p className="text-muted-foreground mb-6">
              Create your first AI-powered email sequence with personalized, high-converting content
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-6 text-sm">
              <div className="p-4 border rounded-lg">
                <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-semibold">Business Intelligence</h4>
                <p className="text-muted-foreground">AI analyzes your business data for personalized content</p>
              </div>
              <div className="p-4 border rounded-lg">
                <Zap className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold">High-Converting Content</h4>
                <p className="text-muted-foreground">500-1200 word emails with proven psychological triggers</p>
              </div>
              <div className="p-4 border rounded-lg">
                <BarChart3 className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h4 className="font-semibold">Advanced Analytics</h4>
                <p className="text-muted-foreground">Track performance and optimize with A/B testing</p>
              </div>
            </div>
            <Button onClick={() => setShowWizard(true)} size="lg">
              <Sparkles className="h-4 w-4 mr-2" />
              Create Your First AI Sequence
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Sequences List */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-lg font-semibold">Your AI Sequences</h3>
            {sequences.map((sequence) => (
              <Card 
                key={sequence.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedSequence?.id === sequence.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedSequence(sequence)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{sequence.name}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                        {sequence.description}
                      </p>
                    </div>
                    <Badge variant={sequence.aiGenerated ? 'default' : 'secondary'} className="ml-2">
                      {sequence.aiGenerated ? 'AI' : 'Manual'}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="font-medium">{sequence.emails.length}</span>
                      <span className="text-muted-foreground"> emails</span>
                    </div>
                    <div>
                      <span className="font-medium">{sequence.averageEmailLength}</span>
                      <span className="text-muted-foreground"> avg words</span>
                    </div>
                    <div>
                      <span className="font-medium">{sequence.sequenceLength}</span>
                      <span className="text-muted-foreground"> days</span>
                    </div>
                    <div>
                      <Badge variant="outline" className="text-xs px-1">
                        {sequence.businessData.sequenceType.replace('-', ' ')}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3 pt-3 border-t">
                    <Badge variant="outline" className={sequence.status === 'active' ? 'text-green-600' : ''}>
                      {sequence.status}
                    </Badge>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); exportSequence(sequence); }}>
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        {sequence.status === 'active' ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Selected Sequence Details */}
          <div className="lg:col-span-2">
            {selectedSequence ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <span>{selectedSequence.name}</span>
                        <Badge variant={selectedSequence.aiGenerated ? 'default' : 'secondary'}>
                          {selectedSequence.aiGenerated ? 'AI Generated' : 'Manual'}
                        </Badge>
                      </CardTitle>
                      <CardDescription>{selectedSequence.description}</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Analytics
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => exportSequence(selectedSequence)}>
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Sequence Stats */}
                  <div className="grid grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{selectedSequence.emails.length}</div>
                      <div className="text-xs text-muted-foreground">Total Emails</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{selectedSequence.totalWordCount.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Total Words</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{selectedSequence.averageEmailLength}</div>
                      <div className="text-xs text-muted-foreground">Avg Length</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">{selectedSequence.sequenceLength}</div>
                      <div className="text-xs text-muted-foreground">Days Long</div>
                    </div>
                  </div>

                  {/* Business Data Summary */}
                  <div className="mb-6 p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Business Profile</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Business:</span> {selectedSequence.businessData.businessName}
                      </div>
                      <div>
                        <span className="font-medium">Industry:</span> {selectedSequence.businessData.industry}
                      </div>
                      <div>
                        <span className="font-medium">Target:</span> {selectedSequence.businessData.targetAudience}
                      </div>
                      <div>
                        <span className="font-medium">Goal:</span> {selectedSequence.businessData.campaignGoal.replace('-', ' ')}
                      </div>
                    </div>
                  </div>

                  {/* Emails List */}
                  <div className="space-y-4">
                    <h4 className="font-semibold">Email Sequence</h4>
                    {selectedSequence.emails.map((email, index) => (
                      <div key={email.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600">
                              {email.sequenceDay}
                            </div>
                            <div>
                              <h5 className="font-semibold">{email.name}</h5>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge variant="outline" className={getTypeColor(email.type)}>
                                  {email.type.replace('-', ' ')}
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {email.timing}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {email.wordCount} words
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" onClick={() => duplicateEmail(email)}>
                              <Copy className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleEmailEdit(email)}>
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div>
                            <span className="text-sm font-medium">Subject: </span>
                            <span className="text-sm">{email.subject}</span>
                          </div>
                          <div>
                            <span className="text-sm font-medium">Preview: </span>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {email.body.substring(0, 150)}...
                            </p>
                          </div>
                          {email.personalizations.length > 0 && (
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-medium">Tags:</span>
                              <div className="flex flex-wrap gap-1">
                                {email.personalizations.slice(0, 3).map(tag => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                                {email.personalizations.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{email.personalizations.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Select a Sequence</h3>
                  <p className="text-muted-foreground">
                    Choose a sequence from the left to view and edit its emails
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* Advanced Email Editor */}
      {editingEmail && (
        <AdvancedEmailEditor
          email={editingEmail}
          onSave={handleEmailSave}
          onCancel={() => setEditingEmail(null)}
          isOpen={!!editingEmail}
        />
      )}
    </div>
  );
};

export default AIEmailSequenceBuilder;
