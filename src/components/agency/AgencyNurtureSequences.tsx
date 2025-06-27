
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Mail, 
  Users, 
  TrendingUp, 
  Calendar,
  Edit,
  Play,
  Pause,
  Trash2,
  Sparkles,
  Copy,
  Eye,
  Download
} from 'lucide-react';
import { EnhancedEmailSequence, EnhancedEmailTemplate } from '@/types/sequenceWizard';
import { EmailSequenceAIService } from '@/services/EmailSequenceAIService';
import SequenceWizard from '@/components/shared/SequenceWizard';
import AdvancedEmailEditor from '@/components/shared/AdvancedEmailEditor';
import { useToast } from '@/hooks/use-toast';

const AgencyNurtureSequences = () => {
  const [sequences, setSequences] = useState<EnhancedEmailSequence[]>([]);
  const [showWizard, setShowWizard] = useState(false);
  const [selectedSequence, setSelectedSequence] = useState<EnhancedEmailSequence | null>(null);
  const [editingEmail, setEditingEmail] = useState<EnhancedEmailTemplate | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleWizardComplete = async (data: any) => {
    setIsGenerating(true);
    setShowWizard(false);
    
    try {
      console.log('Generating agency nurture sequence with data:', data);
      
      // Adapt data for agency context
      const agencyData = {
        ...data,
        sequenceType: 'client-onboarding',
        campaignGoal: 'nurturing',
        emailCount: 8,
        sequenceLength: 21
      };

      const generatedSequence = await EmailSequenceAIService.generateSequence(agencyData);
      
      setSequences(prev => [...prev, generatedSequence]);
      setSelectedSequence(generatedSequence);
      
      toast({
        title: "AI Sequence Generated!",
        description: `Created ${generatedSequence.emails.length} personalized nurture emails with ${generatedSequence.totalWordCount.toLocaleString()} total words`,
      });
    } catch (error) {
      console.error('Error generating sequence:', error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate nurture sequence",
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
      description: "Your nurture email has been saved successfully",
    });
  };

  const toggleSequenceStatus = (sequenceId: string) => {
    setSequences(prev => prev.map(seq => 
      seq.id === sequenceId 
        ? { ...seq, status: seq.status === 'active' ? 'paused' : 'active' }
        : seq
    ));
  };

  const deleteSequence = (sequenceId: string) => {
    setSequences(prev => prev.filter(seq => seq.id !== sequenceId));
    if (selectedSequence?.id === sequenceId) {
      setSelectedSequence(null);
    }
    toast({
      title: "Sequence Deleted",
      description: "Nurture sequence has been removed",
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
    a.download = `${sequence.name.replace(/\s+/g, '-')}-nurture-sequence.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Sequence Exported",
      description: "Nurture sequence downloaded successfully",
    });
  };

  const calculateStats = () => {
    const totalSequences = sequences.length;
    const activeSequences = sequences.filter(s => s.status === 'active').length;
    const totalEmails = sequences.reduce((sum, seq) => sum + seq.emails.length, 0);
    const avgLength = sequences.length > 0 ? Math.round(sequences.reduce((sum, seq) => sum + seq.averageEmailLength, 0) / sequences.length) : 0;

    return { totalSequences, activeSequences, totalEmails, avgLength };
  };

  const stats = calculateStats();

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
        type="agency"
        onComplete={handleWizardComplete}
        onCancel={() => setShowWizard(false)}
      />
    );
  }

  if (isGenerating) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <Sparkles className="h-12 w-12 text-purple-600 mx-auto mb-4 animate-pulse" />
          <h3 className="text-xl font-semibold mb-2">Generating Your AI Nurture Sequence</h3>
          <p className="text-muted-foreground mb-4">
            Our AI is crafting personalized, high-converting client nurture emails based on your business data...
          </p>
          <div className="max-w-md mx-auto space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse" />
              <span>Analyzing your agency profile</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              <span>Creating client-focused content</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
              <span>Optimizing for retention</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Advanced Email Editor */}
      {editingEmail && (
        <AdvancedEmailEditor
          email={editingEmail}
          onSave={handleEmailSave}
          onCancel={() => setEditingEmail(null)}
          isOpen={!!editingEmail}
        />
      )}

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
              <Users className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{stats.totalEmails}</p>
                <p className="text-xs text-muted-foreground">Total Emails</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{stats.avgLength}</p>
                <p className="text-xs text-muted-foreground">Avg Words/Email</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                <span>AI Client Nurture Sequences</span>
              </CardTitle>
              <CardDescription>
                AI-powered email sequences for client onboarding, retention, and growth with 500-1200 word emails
              </CardDescription>
            </div>
            <Button onClick={() => setShowWizard(true)} disabled={isGenerating}>
              <Sparkles className="h-4 w-4 mr-2" />
              {isGenerating ? 'Generating...' : 'Create AI Sequence'}
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Main Content */}
      {sequences.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Nurture Sequences Yet</h3>
            <p className="text-muted-foreground mb-6">
              Create your first AI-powered client nurture sequence with comprehensive, personalized content
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-6 text-sm">
              <div className="p-4 border rounded-lg">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-semibold">Client Intelligence</h4>
                <p className="text-muted-foreground">AI analyzes your agency data for personalized client content</p>
              </div>
              <div className="p-4 border rounded-lg">
                <Mail className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold">Long-form Content</h4>
                <p className="text-muted-foreground">500-1200 word emails with proven client retention strategies</p>
              </div>
              <div className="p-4 border rounded-lg">
                <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h4 className="font-semibold">Advanced Analytics</h4>
                <p className="text-muted-foreground">Track client engagement and optimize with A/B testing</p>
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
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Your AI Sequences</h3>
              <Button size="sm" onClick={() => setShowWizard(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New
              </Button>
            </div>
            
            {sequences.map((sequence) => (
              <Card 
                key={sequence.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedSequence?.id === sequence.id ? 'ring-2 ring-purple-500' : ''
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
                    <div className="flex flex-col space-y-1 ml-2">
                      <Badge variant={sequence.aiGenerated ? 'default' : 'secondary'} className="text-xs">
                        {sequence.aiGenerated ? 'AI' : 'Manual'}
                      </Badge>
                      <Badge variant={sequence.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                        {sequence.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                    <div>
                      <span className="font-medium">{sequence.emails.length}</span>
                      <span className="text-muted-foreground"> emails</span>
                    </div>
                    <div>
                      <span className="font-medium">{sequence.averageEmailLength}</span>
                      <span className="text-muted-foreground"> avg words</span>
                    </div>
                  </div>

                  <div className="flex space-x-1">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSequenceStatus(sequence.id);
                      }}
                      className="flex-1 text-xs"
                    >
                      {sequence.status === 'active' ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        exportSequence(sequence);
                      }}
                    >
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sequence Details */}
          {selectedSequence ? (
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{selectedSequence.name}</h3>
                  <p className="text-muted-foreground text-sm">{selectedSequence.description}</p>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => deleteSequence(selectedSequence.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedSequence(null)}>
                    Close
                  </Button>
                </div>
              </div>

              {/* Performance Stats */}
              {selectedSequence.performance && (
                <div className="grid grid-cols-5 gap-4 mb-4">
                  <Card>
                    <CardContent className="p-3 text-center">
                      <p className="text-lg font-bold text-blue-600">{selectedSequence.performance.sent}</p>
                      <p className="text-xs text-muted-foreground">Sent</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-3 text-center">
                      <p className="text-lg font-bold text-green-600">{selectedSequence.performance.opened}</p>
                      <p className="text-xs text-muted-foreground">Opened</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-3 text-center">
                      <p className="text-lg font-bold text-purple-600">{selectedSequence.performance.clicked}</p>
                      <p className="text-xs text-muted-foreground">Clicked</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-3 text-center">
                      <p className="text-lg font-bold text-orange-600">{selectedSequence.performance.converted}</p>
                      <p className="text-xs text-muted-foreground">Converted</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-3 text-center">
                      <p className="text-lg font-bold text-emerald-600">${selectedSequence.performance.revenue}</p>
                      <p className="text-xs text-muted-foreground">Revenue</p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Email List */}
              <div className="space-y-3">
                <h4 className="font-semibold">Email Sequence ({selectedSequence.emails.length} emails)</h4>
                {selectedSequence.emails.map((email, index) => (
                  <Card key={email.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">Day {email.sequenceDay}</Badge>
                          <Badge className={getTypeColor(email.type)}>{email.type}</Badge>
                          <span className="font-medium">{email.name}</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEmailEdit(email)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => duplicateEmail(email)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Subject:</p>
                          <p className="text-sm bg-gray-50 p-2 rounded">{email.subject}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Preview:</p>
                          <p className="text-sm text-muted-foreground bg-gray-50 p-3 rounded line-clamp-3">
                            {email.body.substring(0, 200)}...
                          </p>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{email.wordCount} words</span>
                          <span>Readability: {email.readabilityScore}/100</span>
                          <span>{email.personalizations.length} personalizations</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="text-center py-12">
                  <Eye className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Select a Sequence</h3>
                  <p className="text-muted-foreground">
                    Choose a nurture sequence from the left to view and edit its emails
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AgencyNurtureSequences;
