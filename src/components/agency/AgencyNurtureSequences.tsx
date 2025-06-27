
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
  Sparkles
} from 'lucide-react';
import { EnhancedEmailSequence } from '@/types/sequenceWizard';
import { EmailSequenceAIService } from '@/services/EmailSequenceAIService';
import SequenceWizard from '@/components/shared/SequenceWizard';
import AdvancedEmailEditor from '@/components/shared/AdvancedEmailEditor';
import { useToast } from '@/hooks/use-toast';

const AgencyNurtureSequences = () => {
  const [sequences, setSequences] = useState<EnhancedEmailSequence[]>([]);
  const [showWizard, setShowWizard] = useState(false);
  const [selectedSequence, setSelectedSequence] = useState<EnhancedEmailSequence | null>(null);
  const [editingEmail, setEditingEmail] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleWizardComplete = async (data: any) => {
    setIsGenerating(true);
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
      setShowWizard(false);
      
      toast({
        title: "Success!",
        description: `Created ${generatedSequence.emails.length} personalized nurture emails`,
      });
    } catch (error) {
      console.error('Error generating sequence:', error);
      toast({
        title: "Error",
        description: "Failed to generate sequence. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
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
    toast({
      title: "Sequence Deleted",
      description: "Nurture sequence has been removed",
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
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Client Nurture Sequences</h3>
          <p className="text-muted-foreground">
            AI-powered email sequences for client onboarding, retention, and growth
          </p>
        </div>
        <Button onClick={() => setShowWizard(true)} disabled={isGenerating}>
          <Sparkles className="h-4 w-4 mr-2" />
          {isGenerating ? 'Generating...' : 'Create AI Sequence'}
        </Button>
      </div>

      {/* Sequence Wizard */}
      {showWizard && (
        <SequenceWizard
          onComplete={handleWizardComplete}
          onCancel={() => setShowWizard(false)}
          type="agency"
        />
      )}

      {/* Email Editor */}
      {editingEmail && (
        <AdvancedEmailEditor
          email={editingEmail}
          onSave={(updatedEmail) => {
            if (selectedSequence) {
              const updatedSequence = {
                ...selectedSequence,
                emails: selectedSequence.emails.map(email => 
                  email.id === updatedEmail.id ? updatedEmail : email
                )
              };
              setSequences(prev => prev.map(seq => 
                seq.id === selectedSequence.id ? updatedSequence : seq
              ));
              setSelectedSequence(updatedSequence);
            }
            setEditingEmail(null);
          }}
          onCancel={() => setEditingEmail(null)}
          isOpen={!!editingEmail}
        />
      )}

      {/* Sequences List */}
      {sequences.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Nurture Sequences</h3>
            <p className="text-muted-foreground mb-4">
              Create your first AI-powered client nurture sequence to automate relationship building
            </p>
            <Button onClick={() => setShowWizard(true)}>
              <Sparkles className="h-4 w-4 mr-2" />
              Create Your First Sequence
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
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
                      {sequence.aiGenerated && (
                        <Badge variant="outline" className="text-purple-600">
                          <Sparkles className="h-3 w-3 mr-1" />
                          AI Generated
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription>{sequence.description}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleSequenceStatus(sequence.id)}
                    >
                      {sequence.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedSequence(sequence)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteSequence(sequence.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Performance Stats */}
                {sequence.performance && (
                  <div className="grid grid-cols-5 gap-4 mb-4 text-sm">
                    <div className="text-center">
                      <p className="text-lg font-bold text-blue-600">{sequence.performance.sent}</p>
                      <p className="text-xs text-muted-foreground">Sent</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-green-600">{sequence.performance.opened}</p>
                      <p className="text-xs text-muted-foreground">Opened</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-purple-600">{sequence.performance.clicked}</p>
                      <p className="text-xs text-muted-foreground">Clicked</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-orange-600">{sequence.performance.converted}</p>
                      <p className="text-xs text-muted-foreground">Converted</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-emerald-600">${sequence.performance.revenue}</p>
                      <p className="text-xs text-muted-foreground">Revenue</p>
                    </div>
                  </div>
                )}

                {/* Email List */}
                <div className="space-y-2">
                  <h4 className="font-semibold">Email Sequence ({sequence.emails.length} emails)</h4>
                  <div className="grid gap-2">
                    {sequence.emails.slice(0, 3).map((email, index) => (
                      <div key={email.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">Day {email.sequenceDay}</Badge>
                            <Badge variant="secondary">{email.type}</Badge>
                          </div>
                          <p className="font-medium mt-1">{email.subject}</p>
                          <p className="text-sm text-muted-foreground">{email.wordCount} words</p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingEmail(email)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    {sequence.emails.length > 3 && (
                      <div className="text-center py-2 text-sm text-muted-foreground">
                        +{sequence.emails.length - 3} more emails
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AgencyNurtureSequences;
