
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  Mail, 
  Phone, 
  MessageSquare, 
  Target,
  BarChart3,
  Settings,
  Plus,
  Sparkles,
  Edit,
  Play,
  Pause,
  Copy,
  Download,
  Eye,
  Clock
} from 'lucide-react';
import { EnhancedEmailSequence, EnhancedEmailTemplate } from '@/types/sequenceWizard';
import { EmailSequenceAIService } from '@/services/EmailSequenceAIService';
import SequenceWizard from '@/components/shared/SequenceWizard';
import AdvancedEmailEditor from '@/components/shared/AdvancedEmailEditor';
import { useToast } from '@/hooks/use-toast';

const AgencyDashboard = () => {
  const [activeSection, setActiveSection] = useState<'overview' | 'nurture'>('overview');
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

  if (activeSection === 'nurture') {
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

        {/* Sequence Wizard */}
        {showWizard && (
          <SequenceWizard
            type="agency"
            onComplete={handleWizardComplete}
            onCancel={() => setShowWizard(false)}
          />
        )}

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Button variant="outline" onClick={() => setActiveSection('overview')}>
              ← Back to Agency Overview
            </Button>
            <h2 className="text-2xl font-bold mt-4">AI Client Nurture Sequences</h2>
            <p className="text-muted-foreground">
              AI-powered email sequences for client onboarding, retention, and growth
            </p>
          </div>
          <Button onClick={() => setShowWizard(true)} disabled={isGenerating}>
            <Sparkles className="h-4 w-4 mr-2" />
            {isGenerating ? 'Generating...' : 'Create AI Sequence'}
          </Button>
        </div>

        {isGenerating && (
          <Card>
            <CardContent className="text-center py-12">
              <Sparkles className="h-12 w-12 text-purple-600 mx-auto mb-4 animate-pulse" />
              <h3 className="text-xl font-semibold mb-2">Generating Your AI Nurture Sequence</h3>
              <p className="text-muted-foreground mb-4">
                Our AI is crafting personalized, high-converting client nurture emails...
              </p>
            </CardContent>
          </Card>
        )}

        {/* Main Content */}
        {sequences.length === 0 && !isGenerating ? (
          <Card>
            <CardContent className="text-center py-12">
              <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Nurture Sequences Yet</h3>
              <p className="text-muted-foreground mb-6">
                Create your first AI-powered client nurture sequence
              </p>
              <Button onClick={() => setShowWizard(true)} size="lg">
                <Sparkles className="h-4 w-4 mr-2" />
                Create Your First AI Sequence
              </Button>
            </CardContent>
          </Card>
        ) : !isGenerating && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Sequences List */}
            <div className="lg:col-span-1 space-y-4">
              <h3 className="text-lg font-semibold">Your AI Sequences</h3>
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
                      <Badge variant="default" className="ml-2">AI</Badge>
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
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Sequence Details */}
            <div className="lg:col-span-2">
              {selectedSequence ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{selectedSequence.name}</h3>
                      <p className="text-muted-foreground text-sm">{selectedSequence.description}</p>
                    </div>
                    <Button variant="outline" onClick={() => setSelectedSequence(null)}>
                      Close
                    </Button>
                  </div>

                  {/* Email List */}
                  <div className="space-y-3">
                    <h4 className="font-semibold">Email Sequence ({selectedSequence.emails.length} emails)</h4>
                    {selectedSequence.emails.map((email) => (
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
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <Eye className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Select a Sequence</h3>
                    <p className="text-muted-foreground">
                      Choose a nurture sequence from the left to view and edit
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Agency Operations Hub</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Streamline your agency operations with AI-powered tools for client management, project tracking, and growth optimization.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-gray-600">Active Clients</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">$47K</p>
                <p className="text-sm text-gray-600">Monthly Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">18</p>
                <p className="text-sm text-gray-600">Active Projects</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">94%</p>
                <p className="text-sm text-gray-600">Client Satisfaction</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Client Nurture Sequences */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveSection('nurture')}>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Mail className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Client Nurture Sequences</CardTitle>
                <Badge variant="secondary" className="mt-1">AI-Powered</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              AI-powered email sequences for client onboarding, retention, and growth with 500-1200 word emails
            </CardDescription>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">{sequences.length} sequences created</span>
              <Button size="sm">
                <Sparkles className="h-4 w-4 mr-2" />
                Open
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Client Management */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Client Management</CardTitle>
                <Badge variant="outline" className="mt-1">Core Feature</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              Comprehensive client relationship management with project tracking and communication history
            </CardDescription>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">24 active clients</span>
              <Button size="sm" variant="outline">Manage</Button>
            </div>
          </CardContent>
        </Card>

        {/* Project Tracking */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Project Tracking</CardTitle>
                <Badge variant="outline" className="mt-1">Core Feature</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              Track project progress, deadlines, and deliverables with automated client updates
            </CardDescription>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">18 active projects</span>
              <Button size="sm" variant="outline">View Projects</Button>
            </div>
          </CardContent>
        </Card>

        {/* Performance Analytics */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Performance Analytics</CardTitle>
                <Badge variant="outline" className="mt-1">Insights</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              Detailed analytics on client satisfaction, project profitability, and team performance
            </CardDescription>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">94% satisfaction rate</span>
              <Button size="sm" variant="outline">View Analytics</Button>
            </div>
          </CardContent>
        </Card>

        {/* Communication Hub */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <MessageSquare className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Communication Hub</CardTitle>
                <Badge variant="outline" className="mt-1">Integration</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              Centralized communication with clients across email, phone, and messaging platforms
            </CardDescription>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">12 unread messages</span>
              <Button size="sm" variant="outline">Open Hub</Button>
            </div>
          </CardContent>
        </Card>

        {/* Proposal Generator */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Settings className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Proposal Generator</CardTitle>
                <Badge variant="secondary" className="mt-1">AI-Powered</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              AI-powered proposal creation with customizable templates and pricing models
            </CardDescription>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">5 templates available</span>
              <Button size="sm" variant="outline">Create Proposal</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgencyDashboard;
