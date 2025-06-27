
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Mail, 
  Plus, 
  Edit, 
  Trash2, 
  Copy, 
  Eye, 
  BarChart3, 
  Wand2,
  Clock,
  TrendingUp,
  Users,
  RefreshCw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { EmailSequence, EmailTemplate } from '@/types/emailSequence';
import { EmailSequenceService } from '@/services/EmailSequenceService';
import RichTextEditor from '@/components/shared/RichTextEditor';
import SequenceGenerationWizard from '@/components/shared/SequenceGenerationWizard';
import QualificationBuilder from '@/components/shared/QualificationBuilder';

const EnhancedEmailSequenceBuilder = () => {
  const [sequences, setSequences] = useState<EmailSequence[]>([]);
  const [selectedSequence, setSelectedSequence] = useState<EmailSequence | null>(null);
  const [editingEmail, setEditingEmail] = useState<EmailTemplate | null>(null);
  const [showEmailEditor, setShowEmailEditor] = useState(false);
  const [showGenerationWizard, setShowGenerationWizard] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadSequences();
  }, []);

  const loadSequences = () => {
    const storedSequences = EmailSequenceService.getStoredSequences();
    setSequences(storedSequences.filter(seq => seq.type === 'sales'));
  };

  const handleSequenceGenerated = (sequence: EmailSequence) => {
    setSequences(prev => [...prev, sequence]);
    setSelectedSequence(sequence);
    toast({
      title: "Sequence Generated!",
      description: `Created ${sequence.emails.length} email templates ready for customization.`,
    });
  };

  const handleEditEmail = (email: EmailTemplate) => {
    setEditingEmail({ ...email });
    setShowEmailEditor(true);
  };

  const handleSaveEmail = () => {
    if (!editingEmail || !selectedSequence) return;

    EmailSequenceService.updateEmailTemplate(selectedSequence.id, editingEmail.id, {
      subject: editingEmail.subject,
      content: editingEmail.content,
      wordCount: editingEmail.content.split(' ').length
    });

    // Update local state
    const updatedSequence = {
      ...selectedSequence,
      emails: selectedSequence.emails.map(email => 
        email.id === editingEmail.id ? editingEmail : email
      )
    };
    
    setSelectedSequence(updatedSequence);
    setSequences(prev => prev.map(seq => 
      seq.id === selectedSequence.id ? updatedSequence : seq
    ));

    setShowEmailEditor(false);
    setEditingEmail(null);

    toast({
      title: "Email Updated",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleDuplicateEmail = (email: EmailTemplate) => {
    if (!selectedSequence) return;

    EmailSequenceService.duplicateEmail(selectedSequence.id, email.id);
    loadSequences();
    
    // Update selected sequence
    const updatedSequence = EmailSequenceService.getStoredSequences()
      .find(seq => seq.id === selectedSequence.id);
    if (updatedSequence) {
      setSelectedSequence(updatedSequence);
    }

    toast({
      title: "Email Duplicated",
      description: "A copy of the email has been added to your sequence.",
    });
  };

  const handleDeleteEmail = (emailId: string) => {
    if (!selectedSequence) return;

    const updatedEmails = selectedSequence.emails.filter(email => email.id !== emailId);
    const updatedSequence = { ...selectedSequence, emails: updatedEmails };
    
    EmailSequenceService.saveSequence(updatedSequence);
    setSelectedSequence(updatedSequence);
    setSequences(prev => prev.map(seq => 
      seq.id === selectedSequence.id ? updatedSequence : seq
    ));

    toast({
      title: "Email Deleted",
      description: "The email has been removed from your sequence.",
    });
  };

  const toggleSequenceStatus = (sequenceId: string) => {
    const sequence = sequences.find(seq => seq.id === sequenceId);
    if (sequence) {
      const updatedSequence = {
        ...sequence,
        status: sequence.status === 'active' ? 'paused' : 'active'
      } as EmailSequence;
      
      EmailSequenceService.saveSequence(updatedSequence);
      setSequences(prev => prev.map(seq => 
        seq.id === sequenceId ? updatedSequence : seq
      ));
    }
  };

  const getSequenceStats = () => {
    const totalSequences = sequences.length;
    const activeSequences = sequences.filter(s => s.status === 'active').length;
    const totalEmails = sequences.reduce((sum, seq) => sum + seq.emails.length, 0);
    const avgWordsPerEmail = totalEmails > 0 
      ? Math.round(sequences.reduce((sum, seq) => 
          sum + seq.emails.reduce((emailSum, email) => emailSum + email.wordCount, 0), 0) / totalEmails)
      : 0;

    return { totalSequences, activeSequences, totalEmails, avgWordsPerEmail };
  };

  const stats = getSequenceStats();

  return (
    <div className="space-y-6">
      {/* Email Editor Dialog */}
      <Dialog open={showEmailEditor} onOpenChange={setShowEmailEditor}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Email Template</DialogTitle>
            <DialogDescription>
              Customize your email content with rich formatting and personalization
            </DialogDescription>
          </DialogHeader>
          {editingEmail && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="emailSubject">Subject Line</Label>
                <Input
                  id="emailSubject"
                  value={editingEmail.subject}
                  onChange={(e) => setEditingEmail({ ...editingEmail, subject: e.target.value })}
                  placeholder="Enter compelling subject line..."
                />
              </div>
              
              <div className="space-y-2">
                <Label>Email Content</Label>
                <RichTextEditor
                  content={editingEmail.content}
                  onChange={(content) => setEditingEmail({ ...editingEmail, content, wordCount: content.split(' ').length })}
                  onSave={handleSaveEmail}
                  onCancel={() => setShowEmailEditor(false)}
                  type="sales"
                  showPersonalizationTags={true}
                />
              </div>
              
              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>Words: {editingEmail.wordCount}</span>
                  <Badge variant={editingEmail.wordCount >= 300 && editingEmail.wordCount <= 800 ? 'default' : 'secondary'}>
                    {editingEmail.wordCount >= 300 && editingEmail.wordCount <= 800 ? 'Optimal Length' : 'Adjust Length'}
                  </Badge>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => setShowEmailEditor(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveEmail}>
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Generation Wizard */}
      <SequenceGenerationWizard
        isOpen={showGenerationWizard}
        onClose={() => setShowGenerationWizard(false)}
        onGenerated={handleSequenceGenerated}
        type="sales"
      />

      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>Advanced Email Sequence Builder</span>
              </CardTitle>
              <CardDescription>
                Create high-converting email sequences with AI-powered content and advanced editing
              </CardDescription>
            </div>
            <Button onClick={() => setShowGenerationWizard(true)}>
              <Wand2 className="h-4 w-4 mr-2" />
              Generate with AI
            </Button>
          </div>
        </CardHeader>
      </Card>

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
              <TrendingUp className="h-5 w-5 text-green-600" />
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
              <Edit className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{stats.totalEmails}</p>
                <p className="text-xs text-muted-foreground">Total Email Templates</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{stats.avgWordsPerEmail}</p>
                <p className="text-xs text-muted-foreground">Avg Words/Email</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      {sequences.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Email Sequences</h3>
            <p className="text-muted-foreground mb-4">
              Create your first AI-powered email sequence with detailed, high-converting content
            </p>
            <Button onClick={() => setShowGenerationWizard(true)}>
              <Wand2 className="h-4 w-4 mr-2" />
              Generate Your First Sequence
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Sequences List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Your Sequences</h3>
              <Button size="sm" onClick={() => setShowGenerationWizard(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Sequence
              </Button>
            </div>
            {sequences.map((sequence) => (
              <Card key={sequence.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{sequence.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {sequence.emails.length} emails • {sequence.category}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={sequence.status === 'active' ? 'default' : 'secondary'}>
                        {sequence.status}
                      </Badge>
                      <Button size="sm" variant="outline" onClick={() => setSelectedSequence(sequence)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                    <span>Avg. {Math.round(sequence.emails.reduce((sum, email) => sum + email.wordCount, 0) / sequence.emails.length)} words/email</span>
                    <span>Created {new Date(sequence.createdAt).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant={sequence.status === 'active' ? 'secondary' : 'default'}
                      onClick={() => toggleSequenceStatus(sequence.id)}
                      className="flex-1"
                    >
                      {sequence.status === 'active' ? 'Pause' : 'Activate'}
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setSelectedSequence(sequence)}
                    >
                      <Eye className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sequence Editor */}
          {selectedSequence && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{selectedSequence.name}</h3>
                <Button variant="outline" onClick={() => setSelectedSequence(null)}>
                  Close Editor
                </Button>
              </div>
              
              <Card>
                <CardContent className="p-4">
                  <Tabs defaultValue="emails">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="emails">Email Templates</TabsTrigger>
                      <TabsTrigger value="qualification">Qualification</TabsTrigger>
                      <TabsTrigger value="performance">Performance</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="emails" className="space-y-4 mt-4">
                      {selectedSequence.emails.map((email, index) => (
                        <Card key={email.id}>
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <CardTitle className="text-base flex items-center space-x-2">
                                  <span>Email {index + 1}: {email.name}</span>
                                  <Badge variant="outline" className="text-xs">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {email.timing}
                                  </Badge>
                                </CardTitle>
                                <CardDescription className="flex items-center space-x-2 mt-1">
                                  <Badge variant="secondary">{email.wordCount} words</Badge>
                                  <Badge variant="outline">{email.conversionRate}% CR</Badge>
                                </CardDescription>
                              </div>
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline" onClick={() => handleEditEmail(email)}>
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => handleDuplicateEmail(email)}>
                                  <Copy className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => handleDeleteEmail(email.id)}>
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div className="space-y-3">
                              <div>
                                <Label className="text-xs font-medium">Subject Line:</Label>
                                <p className="text-sm bg-gray-50 p-2 rounded">{email.subject}</p>
                              </div>
                              <div>
                                <Label className="text-xs font-medium">Content Preview:</Label>
                                <p className="text-sm text-muted-foreground bg-gray-50 p-3 rounded max-h-32 overflow-hidden">
                                  {email.content.substring(0, 300)}...
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="qualification" className="mt-4">
                      <QualificationBuilder
                        criteria={selectedSequence.qualificationCriteria}
                        onChange={(criteria) => {
                          const updatedSequence = { ...selectedSequence, qualificationCriteria: criteria };
                          EmailSequenceService.saveSequence(updatedSequence);
                          setSelectedSequence(updatedSequence);
                        }}
                        type="sales"
                      />
                    </TabsContent>
                    
                    <TabsContent value="performance" className="mt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-2">
                              <Users className="h-5 w-5 text-blue-500" />
                              <div>
                                <p className="text-2xl font-bold">{selectedSequence.stats.sent}</p>
                                <p className="text-sm text-muted-foreground">Total Sent</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-2">
                              <TrendingUp className="h-5 w-5 text-green-500" />
                              <div>
                                <p className="text-2xl font-bold">
                                  {selectedSequence.stats.sent > 0 
                                    ? Math.round((selectedSequence.stats.converted / selectedSequence.stats.sent) * 100)
                                    : 0}%
                                </p>
                                <p className="text-sm text-muted-foreground">Conversion Rate</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EnhancedEmailSequenceBuilder;
