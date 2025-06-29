import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  FileText, 
  Plus, 
  Edit,
  Download,
  Send,
  Copy,
  Eye,
  Sparkles,
  DollarSign,
  Calendar,
  User,
  Settings,
  Mail,
  Phone,
  MoreHorizontal,
  Trash2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';

interface Template {
  id: number;
  name: string;
  description: string;
  category: string;
  estimatedValue: number;
  timeline: string;
  content?: string;
  isCustom?: boolean;
}

interface Proposal {
  id: number;
  title: string;
  client: string;
  value: number;
  status: string;
  createdAt: string;
  template: string;
  content?: string;
}

interface ProposalGeneratorProps {
  onBack: () => void;
}

const ProposalGenerator = ({ onBack }: ProposalGeneratorProps) => {
  const [showNewProposal, setShowNewProposal] = useState(false);
  const [showNewTemplate, setShowNewTemplate] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showSendDialog, setShowSendDialog] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [formData, setFormData] = useState({
    clientName: '',
    projectTitle: '',
    projectType: '',
    budget: '',
    timeline: '',
    description: ''
  });
  const [templateData, setTemplateData] = useState({
    name: '',
    description: '',
    category: '',
    estimatedValue: '',
    timeline: '',
    content: ''
  });
  const [sendData, setSendData] = useState({
    method: 'email',
    recipient: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  // Default templates with isCustom property
  const defaultTemplates = [
    {
      id: 1,
      name: 'Website Redesign',
      description: 'Complete website overhaul with modern design',
      category: 'Web Design',
      estimatedValue: 25000,
      timeline: '6-8 weeks',
      isCustom: false
    },
    {
      id: 2,
      name: 'Brand Identity Package',
      description: 'Logo, brand guidelines, and marketing materials',
      category: 'Branding',
      estimatedValue: 15000,
      timeline: '4-6 weeks',
      isCustom: false
    },
    {
      id: 3,
      name: 'Digital Marketing Campaign',
      description: 'Multi-channel marketing strategy and execution',
      category: 'Marketing',
      estimatedValue: 40000,
      timeline: '12 weeks',
      isCustom: false
    }
  ];

  const [customTemplates, setCustomTemplates] = useState<Template[]>([]);
  const templates = [...defaultTemplates, ...customTemplates];

  // Mock existing proposals
  const [proposals, setProposals] = useState<Proposal[]>([
    {
      id: 1,
      title: 'Acme Corp Website Redesign',
      client: 'Acme Corporation',
      value: 35000,
      status: 'sent',
      createdAt: '2024-01-15',
      template: 'Website Redesign',
      content: 'Comprehensive website redesign proposal for Acme Corporation...'
    },
    {
      id: 2,
      title: 'TechStart Branding Project',
      client: 'TechStart Inc',
      value: 18000,
      status: 'approved',
      createdAt: '2024-01-12',
      template: 'Brand Identity Package',
      content: 'Complete brand identity package for TechStart Inc...'
    },
    {
      id: 3,
      title: 'Global Solutions Marketing',
      client: 'Global Solutions',
      value: 45000,
      status: 'draft',
      createdAt: '2024-01-10',
      template: 'Digital Marketing Campaign',
      content: 'Digital marketing campaign proposal for Global Solutions...'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerateProposal = () => {
    if (!formData.clientName || !formData.projectTitle || !formData.projectType) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newProposal: Proposal = {
      id: Date.now(),
      title: `${formData.clientName} ${formData.projectTitle}`,
      client: formData.clientName,
      value: parseInt(formData.budget) || 0,
      status: 'draft',
      createdAt: new Date().toISOString().split('T')[0],
      template: formData.projectType,
      content: `Proposal for ${formData.projectTitle}\n\nClient: ${formData.clientName}\nProject Type: ${formData.projectType}\nBudget: $${formData.budget}\nTimeline: ${formData.timeline}\n\nDescription:\n${formData.description}`
    };

    setProposals(prev => [...prev, newProposal]);
    setFormData({
      clientName: '',
      projectTitle: '',
      projectType: '',
      budget: '',
      timeline: '',
      description: ''
    });
    setShowNewProposal(false);

    toast({
      title: "Proposal Generated",
      description: `Proposal for ${newProposal.client} has been created successfully`,
    });
  };

  const handlePreview = (proposal: Proposal) => {
    setSelectedProposal(proposal);
    setShowPreview(true);
  };

  const handleDownload = (proposal: Proposal) => {
    const content = proposal.content || `Proposal: ${proposal.title}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${proposal.title.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download Started",
      description: `${proposal.title} is being downloaded`,
    });
  };

  const handleEdit = (proposal: Proposal) => {
    setFormData({
      clientName: proposal.client,
      projectTitle: proposal.title.replace(proposal.client, '').trim(),
      projectType: proposal.template,
      budget: proposal.value.toString(),
      timeline: '',
      description: proposal.content || ''
    });
    setShowNewProposal(true);
  };

  const handleCreateTemplate = () => {
    if (!templateData.name || !templateData.description) {
      toast({
        title: "Error",
        description: "Please fill in template name and description",
        variant: "destructive",
      });
      return;
    }

    const newTemplate: Template = {
      id: Date.now(),
      name: templateData.name,
      description: templateData.description,
      category: templateData.category || 'Custom',
      estimatedValue: parseInt(templateData.estimatedValue) || 0,
      timeline: templateData.timeline,
      content: templateData.content,
      isCustom: true
    };

    setCustomTemplates(prev => [...prev, newTemplate]);
    setTemplateData({
      name: '',
      description: '',
      category: '',
      estimatedValue: '',
      timeline: '',
      content: ''
    });
    setShowNewTemplate(false);

    toast({
      title: "Template Created",
      description: `${newTemplate.name} template has been created successfully`,
    });
  };

  const handleSendProposal = () => {
    if (!selectedProposal || !sendData.recipient) {
      toast({
        title: "Error",
        description: "Please fill in recipient information",
        variant: "destructive",
      });
      return;
    }

    // Simulate sending proposal
    toast({
      title: "Proposal Sent",
      description: `${selectedProposal.title} has been sent via ${sendData.method} to ${sendData.recipient}`,
    });

    setSendData({
      method: 'email',
      recipient: '',
      subject: '',
      message: ''
    });
    setShowSendDialog(false);
    setSelectedProposal(null);
  };

  const handleDeleteProposal = (proposalId: number) => {
    setProposals(prev => prev.filter(p => p.id !== proposalId));
    toast({
      title: "Proposal Deleted",
      description: "The proposal has been deleted successfully",
    });
  };

  if (showNewProposal) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Button variant="outline" onClick={() => setShowNewProposal(false)}>
              ← Back to Proposals
            </Button>
            <h2 className="text-2xl font-bold mt-4">Create New Proposal</h2>
            <p className="text-muted-foreground">
              Generate a professional proposal with AI assistance
            </p>
          </div>
          <Button onClick={handleGenerateProposal}>
            <Sparkles className="h-4 w-4 mr-2" />
            Generate Proposal
          </Button>
        </div>

        {/* Form */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
              <CardDescription>Basic information about the project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Client Name *</label>
                <Input
                  placeholder="Enter client name"
                  value={formData.clientName}
                  onChange={(e) => handleInputChange('clientName', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Project Title *</label>
                <Input
                  placeholder="Enter project title"
                  value={formData.projectTitle}
                  onChange={(e) => handleInputChange('projectTitle', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Project Type *</label>
                <Select value={formData.projectType} onValueChange={(value) => handleInputChange('projectType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Website Redesign">Website Redesign</SelectItem>
                    <SelectItem value="Brand Identity Package">Brand Identity Package</SelectItem>
                    <SelectItem value="Digital Marketing Campaign">Digital Marketing Campaign</SelectItem>
                    <SelectItem value="Custom Development">Custom Development</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Budget</label>
                  <Input
                    placeholder="25000"
                    value={formData.budget}
                    onChange={(e) => handleInputChange('budget', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Timeline</label>
                  <Input
                    placeholder="6-8 weeks"
                    value={formData.timeline}
                    onChange={(e) => handleInputChange('timeline', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Project Description</label>
                <Textarea
                  placeholder="Describe the project scope and requirements"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Custom Template Dialog */}
          <Dialog open={showNewTemplate} onOpenChange={setShowNewTemplate}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Custom Template</DialogTitle>
                <DialogDescription>
                  Create a reusable proposal template
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="template-name">Template Name *</Label>
                    <Input
                      id="template-name"
                      value={templateData.name}
                      onChange={(e) => setTemplateData({ ...templateData, name: e.target.value })}
                      placeholder="Custom Service Template"
                    />
                  </div>
                  <div>
                    <Label htmlFor="template-category">Category</Label>
                    <Input
                      id="template-category"
                      value={templateData.category}
                      onChange={(e) => setTemplateData({ ...templateData, category: e.target.value })}
                      placeholder="Custom"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="template-description">Description *</Label>
                  <Input
                    id="template-description"
                    value={templateData.description}
                    onChange={(e) => setTemplateData({ ...templateData, description: e.target.value })}
                    placeholder="Brief description of the template"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="template-value">Estimated Value</Label>
                    <Input
                      id="template-value"
                      value={templateData.estimatedValue}
                      onChange={(e) => setTemplateData({ ...templateData, estimatedValue: e.target.value })}
                      placeholder="25000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="template-timeline">Timeline</Label>
                    <Input
                      id="template-timeline"
                      value={templateData.timeline}
                      onChange={(e) => setTemplateData({ ...templateData, timeline: e.target.value })}
                      placeholder="6-8 weeks"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="template-content">Template Content</Label>
                  <Textarea
                    id="template-content"
                    value={templateData.content}
                    onChange={(e) => setTemplateData({ ...templateData, content: e.target.value })}
                    placeholder="Enter the proposal template content..."
                    rows={6}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleCreateTemplate} className="flex-1">Create Template</Button>
                  <Button variant="outline" onClick={() => setShowNewTemplate(false)}>Cancel</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Enhanced Template Selection */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Choose Template</CardTitle>
                  <CardDescription>Select a template to get started quickly</CardDescription>
                </div>
                <Button variant="outline" onClick={() => setShowNewTemplate(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Template
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {templates.map((template) => (
                  <div 
                    key={template.id} 
                    className={`border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                      formData.projectType === template.name ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => handleInputChange('projectType', template.name)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{template.name}</h4>
                      <div className="flex space-x-2">
                        <Badge variant="outline">{template.category}</Badge>
                        {template.isCustom && <Badge variant="secondary">Custom</Badge>}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center">
                        <DollarSign className="h-3 w-3 mr-1" />
                        ${template.estimatedValue.toLocaleString()}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {template.timeline}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Send Proposal Dialog */}
      <Dialog open={showSendDialog} onOpenChange={setShowSendDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Proposal</DialogTitle>
            <DialogDescription>
              Send {selectedProposal?.title} to your client
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="send-method">Delivery Method</Label>
              <Select value={sendData.method} onValueChange={(value) => setSendData({ ...sendData, method: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="recipient">
                {sendData.method === 'email' ? 'Email Address' : 'Phone Number'} *
              </Label>
              <Input
                id="recipient"
                type={sendData.method === 'email' ? 'email' : 'tel'}
                value={sendData.recipient}
                onChange={(e) => setSendData({ ...sendData, recipient: e.target.value })}
                placeholder={sendData.method === 'email' ? 'client@example.com' : '+1 (555) 123-4567'}
              />
            </div>
            {sendData.method === 'email' && (
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={sendData.subject}
                  onChange={(e) => setSendData({ ...sendData, subject: e.target.value })}
                  placeholder={`Proposal: ${selectedProposal?.title}`}
                />
              </div>
            )}
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={sendData.message}
                onChange={(e) => setSendData({ ...sendData, message: e.target.value })}
                placeholder="Add a personal message..."
                rows={3}
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleSendProposal} className="flex-1">
                <Send className="h-4 w-4 mr-2" />
                Send Proposal
              </Button>
              <Button variant="outline" onClick={() => setShowSendDialog(false)}>Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Proposal Preview</DialogTitle>
            <DialogDescription>
              {selectedProposal?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">{selectedProposal?.title}</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <strong>Client:</strong> {selectedProposal?.client}
                  </div>
                  <div>
                    <strong>Value:</strong> ${selectedProposal?.value.toLocaleString()}
                  </div>
                  <div>
                    <strong>Status:</strong> {selectedProposal?.status}
                  </div>
                  <div>
                    <strong>Created:</strong> {selectedProposal?.createdAt}
                  </div>
                </div>
                <div>
                  <strong>Content:</strong>
                  <div className="mt-2 p-4 bg-white rounded border">
                    <pre className="whitespace-pre-wrap text-sm">
                      {selectedProposal?.content || 'No content available'}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Button variant="outline" onClick={onBack}>
            ← Back to Agency Overview
          </Button>
          <h2 className="text-2xl font-bold mt-4">Proposal Generator</h2>
          <p className="text-muted-foreground">
            Create professional proposals with AI-powered templates
          </p>
        </div>
        <Button onClick={() => setShowNewProposal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Proposal
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{proposals.length}</p>
                <p className="text-sm text-muted-foreground">Total Proposals</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Send className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{proposals.filter(p => p.status === 'sent').length}</p>
                <p className="text-sm text-muted-foreground">Sent</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Copy className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">{proposals.filter(p => p.status === 'approved').length}</p>
                <p className="text-sm text-muted-foreground">Approved</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">${proposals.reduce((sum, p) => sum + p.value, 0).toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Proposals List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Proposals</CardTitle>
          <CardDescription>Manage and track your client proposals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {proposals.map((proposal) => (
              <div key={proposal.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{proposal.title}</h3>
                      <p className="text-sm text-muted-foreground">{proposal.client}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-xs text-muted-foreground flex items-center">
                          <DollarSign className="h-3 w-3 mr-1" />
                          ${proposal.value.toLocaleString()}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(proposal.createdAt).toLocaleDateString()}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Settings className="h-3 w-3 mr-1" />
                          {proposal.template}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge className={getStatusColor(proposal.status)}>
                      {proposal.status}
                    </Badge>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handlePreview(proposal)}>
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleEdit(proposal)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDownload(proposal)}>
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => {
                          setSelectedProposal(proposal);
                          setShowSendDialog(true);
                        }}
                      >
                        <Send className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleDeleteProposal(proposal.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProposalGenerator;
