
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Plus, 
  Building2, 
  DollarSign, 
  Calendar, 
  User, 
  Phone, 
  Mail,
  Edit,
  Trash2,
  TrendingUp,
  Clock,
  CheckCircle2
} from 'lucide-react';

interface ClientProject {
  id: string;
  clientName: string;
  company: string;
  projectTitle: string;
  projectValue: number;
  status: 'discovery' | 'proposal' | 'negotiation' | 'active' | 'completed' | 'on-hold';
  startDate: string;
  estimatedCompletion: string;
  contactEmail: string;
  contactPhone: string;
  description: string;
  progress: number;
  nextMilestone: string;
  retainerAmount?: number;
  projectType: 'one-time' | 'retainer' | 'performance';
}

const ClientTracker = () => {
  const [projects, setProjects] = useState<ClientProject[]>([
    {
      id: '1',
      clientName: 'Sarah Johnson',
      company: 'TechStart Solutions',
      projectTitle: 'Complete Digital Marketing Strategy',
      projectValue: 25000,
      status: 'active',
      startDate: '2024-01-15',
      estimatedCompletion: '2024-04-15',
      contactEmail: 'sarah@techstart.com',
      contactPhone: '+1 (555) 123-4567',
      description: 'Comprehensive digital marketing overhaul including website redesign, SEO optimization, and social media strategy.',
      progress: 65,
      nextMilestone: 'Website launch and SEO implementation',
      retainerAmount: 5000,
      projectType: 'retainer'
    },
    {
      id: '2',
      clientName: 'Mike Chen',
      company: 'Growth Dynamics',
      projectTitle: 'Lead Generation Campaign',
      projectValue: 15000,
      status: 'proposal',
      startDate: '2024-02-01',
      estimatedCompletion: '2024-05-01',
      contactEmail: 'mike@growthdynamics.com',
      contactPhone: '+1 (555) 987-6543',
      description: 'B2B lead generation campaign with content marketing and LinkedIn advertising.',
      progress: 10,
      nextMilestone: 'Proposal approval and contract signing',
      projectType: 'performance'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProject, setEditingProject] = useState<ClientProject | null>(null);
  const [formData, setFormData] = useState<Partial<ClientProject>>({
    clientName: '',
    company: '',
    projectTitle: '',
    projectValue: 0,
    status: 'discovery',
    startDate: '',
    estimatedCompletion: '',
    contactEmail: '',
    contactPhone: '',
    description: '',
    progress: 0,
    nextMilestone: '',
    projectType: 'one-time'
  });

  const statusColors = {
    'discovery': 'bg-blue-100 text-blue-800',
    'proposal': 'bg-yellow-100 text-yellow-800',
    'negotiation': 'bg-orange-100 text-orange-800',
    'active': 'bg-green-100 text-green-800',
    'completed': 'bg-purple-100 text-purple-800',
    'on-hold': 'bg-gray-100 text-gray-800'
  };

  const updateField = (field: keyof ClientProject, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProject) {
      // Update existing project
      setProjects(prev => prev.map(project => 
        project.id === editingProject.id 
          ? { ...project, ...formData }
          : project
      ));
      setEditingProject(null);
    } else {
      // Add new project
      const newProject: ClientProject = {
        ...formData as ClientProject,
        id: Date.now().toString()
      };
      setProjects(prev => [...prev, newProject]);
    }
    
    setFormData({
      clientName: '',
      company: '',
      projectTitle: '',
      projectValue: 0,
      status: 'discovery',
      startDate: '',
      estimatedCompletion: '',
      contactEmail: '',
      contactPhone: '',
      description: '',
      progress: 0,
      nextMilestone: '',
      projectType: 'one-time'
    });
    setShowAddForm(false);
  };

  const handleEdit = (project: ClientProject) => {
    setEditingProject(project);
    setFormData(project);
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  const calculateStats = () => {
    const totalValue = projects.reduce((sum, project) => sum + project.projectValue, 0);
    const activeProjects = projects.filter(p => p.status === 'active').length;
    const completedProjects = projects.filter(p => p.status === 'completed').length;
    const avgProjectValue = projects.length > 0 ? totalValue / projects.length : 0;

    return { totalValue, activeProjects, completedProjects, avgProjectValue };
  };

  const stats = calculateStats();

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">${stats.totalValue.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Total Pipeline Value</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{stats.activeProjects}</p>
                <p className="text-xs text-muted-foreground">Active Projects</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{stats.completedProjects}</p>
                <p className="text-xs text-muted-foreground">Completed Projects</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">${stats.avgProjectValue.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Avg Project Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Client Projects</h3>
          <p className="text-muted-foreground">Track and manage your agency's client projects</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Project</span>
        </Button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingProject ? 'Edit Project' : 'Add New Client Project'}</CardTitle>
            <CardDescription>
              {editingProject ? 'Update project details' : 'Enter details for the new client project'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clientName">Client Name *</Label>
                  <Input
                    id="clientName"
                    value={formData.clientName}
                    onChange={(e) => updateField('clientName', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company *</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => updateField('company', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectTitle">Project Title *</Label>
                  <Input
                    id="projectTitle"
                    value={formData.projectTitle}
                    onChange={(e) => updateField('projectTitle', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectValue">Project Value ($) *</Label>
                  <Input
                    id="projectValue"
                    type="number"
                    value={formData.projectValue}
                    onChange={(e) => updateField('projectValue', parseInt(e.target.value) || 0)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select value={formData.status} onValueChange={(value) => updateField('status', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="discovery">Discovery</SelectItem>
                      <SelectItem value="proposal">Proposal</SelectItem>
                      <SelectItem value="negotiation">Negotiation</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="on-hold">On Hold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectType">Project Type *</Label>
                  <Select value={formData.projectType} onValueChange={(value) => updateField('projectType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="one-time">One-time Project</SelectItem>
                      <SelectItem value="retainer">Monthly Retainer</SelectItem>
                      <SelectItem value="performance">Performance-based</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => updateField('startDate', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estimatedCompletion">Estimated Completion</Label>
                  <Input
                    id="estimatedCompletion"
                    type="date"
                    value={formData.estimatedCompletion}
                    onChange={(e) => updateField('estimatedCompletion', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => updateField('contactEmail', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    value={formData.contactPhone}
                    onChange={(e) => updateField('contactPhone', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="progress">Progress (%)</Label>
                  <Input
                    id="progress"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.progress}
                    onChange={(e) => updateField('progress', parseInt(e.target.value) || 0)}
                  />
                </div>

                {formData.projectType === 'retainer' && (
                  <div className="space-y-2">
                    <Label htmlFor="retainerAmount">Monthly Retainer ($)</Label>
                    <Input
                      id="retainerAmount"
                      type="number"
                      value={formData.retainerAmount || ''}
                      onChange={(e) => updateField('retainerAmount', parseInt(e.target.value) || 0)}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Project Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nextMilestone">Next Milestone</Label>
                <Input
                  id="nextMilestone"
                  value={formData.nextMilestone}
                  onChange={(e) => updateField('nextMilestone', e.target.value)}
                />
              </div>

              <div className="flex space-x-2">
                <Button type="submit">
                  {editingProject ? 'Update Project' : 'Add Project'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingProject(null);
                    setFormData({
                      clientName: '',
                      company: '',
                      projectTitle: '',
                      projectValue: 0,
                      status: 'discovery',
                      startDate: '',
                      estimatedCompletion: '',
                      contactEmail: '',
                      contactPhone: '',
                      description: '',
                      progress: 0,
                      nextMilestone: '',
                      projectType: 'one-time'
                    });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Projects List */}
      <div className="space-y-4">
        {projects.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No client projects yet</h3>
              <p className="text-muted-foreground">Add your first client project to get started</p>
            </CardContent>
          </Card>
        ) : (
          projects.map((project) => (
            <Card key={project.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold">{project.projectTitle}</h3>
                      <Badge className={statusColors[project.status]}>
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </Badge>
                      <Badge variant="outline">
                        {project.projectType}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-1">{project.clientName} • {project.company}</p>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(project)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(project.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="font-semibold">${project.projectValue.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Project Value</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="font-semibold">
                        {project.estimatedCompletion ? 
                          new Date(project.estimatedCompletion).toLocaleDateString() : 
                          'Not set'
                        }
                      </p>
                      <p className="text-xs text-muted-foreground">Est. Completion</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-purple-600" />
                    <div>
                      <p className="font-semibold">{project.progress}%</p>
                      <p className="text-xs text-muted-foreground">Progress</p>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-muted-foreground mb-1">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} />
                </div>

                {/* Contact Info */}
                <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-3">
                  {project.contactEmail && (
                    <div className="flex items-center space-x-1">
                      <Mail className="h-3 w-3" />
                      <span>{project.contactEmail}</span>
                    </div>
                  )}
                  {project.contactPhone && (
                    <div className="flex items-center space-x-1">
                      <Phone className="h-3 w-3" />
                      <span>{project.contactPhone}</span>
                    </div>
                  )}
                </div>

                {/* Next Milestone */}
                {project.nextMilestone && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <span className="font-medium">Next: {project.nextMilestone}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ClientTracker;
