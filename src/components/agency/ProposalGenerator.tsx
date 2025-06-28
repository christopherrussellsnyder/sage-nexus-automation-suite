
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
  Settings
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  const [showPreview, setShowPreview] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [formData, setFormData] = useState({
    clientName: '',
    projectTitle: '',
    projectType: '',
    budget: '',
    timeline: '',
    description: ''
  });
  const { toast } = useToast();

  // Mock proposal templates
  const templates = [
    {
      id: 1,
      name: 'Website Redesign',
      description: 'Complete website overhaul with modern design',
      category: 'Web Design',
      estimatedValue: 25000,
      timeline: '6-8 weeks'
    },
    {
      id: 2,
      name: 'Brand Identity Package',
      description: 'Logo, brand guidelines, and marketing materials',
      category: 'Branding',
      estimatedValue: 15000,
      timeline: '4-6 weeks'
    },
    {
      id: 3,
      name: 'Digital Marketing Campaign',
      description: 'Multi-channel marketing strategy and execution',
      category: 'Marketing',
      estimatedValue: 40000,
      timeline: '12 weeks'
    }
  ];

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

          <Card>
            <CardHeader>
              <CardTitle>Choose Template</CardTitle>
              <CardDescription>Select a template to get started quickly</CardDescription>
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
                      <Badge variant="outline">{template.category}</Badge>
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

      {/* Proposals List */}
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
