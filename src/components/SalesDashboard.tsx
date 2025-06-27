import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Phone, 
  Target, 
  TrendingUp, 
  Users, 
  Calendar, 
  Mail,
  MessageSquare,
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
  RefreshCw,
  Clock,
  Zap
} from 'lucide-react';
import { EnhancedEmailSequence, EnhancedEmailTemplate } from '@/types/sequenceWizard';
import { EmailSequenceAIService } from '@/services/EmailSequenceAIService';
import SequenceWizard from '@/components/shared/SequenceWizard';
import AdvancedEmailEditor from '@/components/shared/AdvancedEmailEditor';
import { useToast } from '@/hooks/use-toast';
import LeadManagement from '@/components/sales/LeadManagement';
import MeetingScheduler from '@/components/sales/MeetingScheduler';
import SalesAnalytics from '@/components/sales/SalesAnalytics';
import ProposalGenerator from '@/components/sales/ProposalGenerator';

const SalesDashboard = () => {
  const [activeSection, setActiveSection] = useState<'overview' | 'email-sequences' | 'leads' | 'scheduling' | 'analytics' | 'proposals'>('overview');
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

  if (activeSection === 'leads') {
    return <LeadManagement onBack={() => setActiveSection('overview')} />;
  }

  if (activeSection === 'scheduling') {
    return <MeetingScheduler onBack={() => setActiveSection('overview')} />;
  }

  if (activeSection === 'analytics') {
    return <SalesAnalytics onBack={() => setActiveSection('overview')} />;
  }

  if (activeSection === 'proposals') {
    return <ProposalGenerator onBack={() => setActiveSection('overview')} />;
  }

  if (activeSection === 'email-sequences') {
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
            type="sales"
            onComplete={handleWizardComplete}
            onCancel={() => setShowWizard(false)}
          />
        )}

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Button variant="outline" onClick={() => setActiveSection('overview')}>
              ← Back to Sales Overview
            </Button>
            <h2 className="text-2xl font-bold mt-4">AI Email Sequences</h2>
            <p className="text-muted-foreground">
              Create high-converting email sequences powered by AI with comprehensive business intelligence
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
              <RefreshCw className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-spin" />
              <h3 className="text-xl font-semibold mb-2">Generating Your AI Email Sequence</h3>
              <p className="text-muted-foreground mb-4">
                Our AI is crafting personalized, high-converting emails based on your business data...
              </p>
            </CardContent>
          </Card>
        )}

        {/* Main Content */}
        {sequences.length === 0 && !isGenerating ? (
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
        ) : !isGenerating && (
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
                      <Badge variant="default" className="ml-2">AI</Badge>
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
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Selected Sequence Details */}
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
                  <div className="space-y-4">
                    <h4 className="font-semibold">Email Sequence</h4>
                    {selectedSequence.emails.map((email) => (
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
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <Eye className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
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
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Sales Operations Hub</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Accelerate your sales process with AI-powered tools for lead generation, nurturing, and conversion optimization.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-gray-600">Active Leads</p>
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
                <p className="text-2xl font-bold">34%</p>
                <p className="text-sm text-gray-600">Conversion Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Phone className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">89</p>
                <p className="text-sm text-gray-600">Calls This Week</p>
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
                <p className="text-2xl font-bold">$127K</p>
                <p className="text-sm text-gray-600">Monthly Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* AI Email Sequences */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveSection('email-sequences')}>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg">AI Email Sequences</CardTitle>
                <Badge variant="secondary" className="mt-1">AI-Powered</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              Create high-converting email sequences powered by AI with comprehensive business intelligence
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

        {/* Lead Management */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveSection('leads')}>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Lead Management</CardTitle>
                <Badge variant="outline" className="mt-1">Core Feature</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              Track and manage your sales pipeline with automated lead scoring and qualification
            </CardDescription>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">156 active leads</span>
              <Button size="sm" variant="outline">Manage Leads</Button>
            </div>
          </CardContent>
        </Card>

        {/* Call Scheduling */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveSection('scheduling')}>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Phone className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Call Scheduling</CardTitle>
                <Badge variant="outline" className="mt-1">Integration</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              Automated call scheduling with calendar integration and reminder notifications
            </CardDescription>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">12 calls scheduled</span>
              <Button size="sm" variant="outline">Schedule Call</Button>
            </div>
          </CardContent>
        </Card>

        {/* Sales Analytics */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveSection('analytics')}>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Sales Analytics</CardTitle>
                <Badge variant="outline" className="mt-1">Insights</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              Comprehensive sales performance tracking with conversion analysis and forecasting
            </CardDescription>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">34% conversion rate</span>
              <Button size="sm" variant="outline">View Analytics</Button>
            </div>
          </CardContent>
        </Card>

        {/* Proposal Generator */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveSection('proposals')}>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <MessageSquare className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Proposal Generator</CardTitle>
                <Badge variant="secondary" className="mt-1">AI-Powered</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              AI-powered proposal creation with customizable templates and dynamic pricing
            </CardDescription>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">8 templates available</span>
              <Button size="sm" variant="outline">Create Proposal</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalesDashboard;
