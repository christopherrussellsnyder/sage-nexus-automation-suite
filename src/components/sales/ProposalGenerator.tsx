
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  Target,
  TrendingUp
} from 'lucide-react';

interface ProposalGeneratorProps {
  onBack: () => void;
}

const ProposalGenerator = ({ onBack }: ProposalGeneratorProps) => {
  const [showNewProposal, setShowNewProposal] = useState(false);
  const [formData, setFormData] = useState({
    clientName: '',
    projectTitle: '',
    projectType: '',
    budget: '',
    timeline: '',
    description: ''
  });

  // Mock proposal templates
  const templates = [
    {
      id: 1,
      name: 'Sales Consultation',
      description: 'Comprehensive sales strategy and implementation',
      category: 'Consulting',
      estimatedValue: 15000,
      timeline: '4-6 weeks'
    },
    {
      id: 2,
      name: 'CRM Implementation',
      description: 'Custom CRM setup and team training',
      category: 'Technology',
      estimatedValue: 25000,
      timeline: '6-8 weeks'
    },
    {
      id: 3,
      name: 'Sales Training Program',
      description: 'Team training and performance optimization',
      category: 'Training',
      estimatedValue: 18000,
      timeline: '8-10 weeks'
    }
  ];

  // Mock existing proposals
  const proposals = [
    {
      id: 1,
      title: 'Digital Solutions Sales Strategy',
      client: 'Digital Solutions Inc',
      value: 35000,
      status: 'sent',
      createdAt: '2024-01-15',
      template: 'Sales Consultation'
    },
    {
      id: 2,
      title: 'TechFlow CRM Setup',
      client: 'TechFlow Corp',
      value: 28000,
      status: 'approved',
      createdAt: '2024-01-12',
      template: 'CRM Implementation'
    },
    {
      id: 3,
      title: 'StartupHub Training Program',
      client: 'StartupHub',
      value: 22000,
      status: 'draft',
      createdAt: '2024-01-10',
      template: 'Sales Training Program'
    }
  ];

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
              Generate a professional sales proposal with AI assistance
            </p>
          </div>
          <Button>
            <Sparkles className="h-4 w-4 mr-2" />
            Generate with AI
          </Button>
        </div>

        {/* Form */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
              <CardDescription>Basic information about the sales project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Client Name</label>
                <Input
                  placeholder="Enter client name"
                  value={formData.clientName}
                  onChange={(e) => handleInputChange('clientName', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Project Title</label>
                <Input
                  placeholder="Enter project title"
                  value={formData.projectTitle}
                  onChange={(e) => handleInputChange('projectTitle', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Service Type</label>
                <Select value={formData.projectType} onValueChange={(value) => handleInputChange('projectType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consulting">Sales Consulting</SelectItem>
                    <SelectItem value="training">Sales Training</SelectItem>
                    <SelectItem value="technology">CRM & Technology</SelectItem>
                    <SelectItem value="strategy">Sales Strategy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Budget</label>
                  <Input
                    placeholder="$25,000"
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
                  placeholder="Describe the sales objectives and requirements"
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
                  <div key={template.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
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

        {/* Actions */}
        <div className="flex justify-center space-x-4">
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Generate Proposal
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Button variant="outline" onClick={onBack}>
            ← Back to Sales Overview
          </Button>
          <h2 className="text-2xl font-bold mt-4">Proposal Generator</h2>
          <p className="text-muted-foreground">
            Create professional sales proposals with AI-powered templates
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
                <p className="text-2xl font-bold">18</p>
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
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Sent</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">8</p>
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
                <p className="text-2xl font-bold">$485K</p>
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
          <CardDescription>Manage and track your sales proposals</CardDescription>
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
                          <Target className="h-3 w-3 mr-1" />
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
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
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
