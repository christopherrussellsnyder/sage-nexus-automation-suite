import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Calendar, 
  Search, 
  Plus, 
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  DollarSign,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Project {
  id: number;
  name: string;
  client: string;
  status: string;
  progress: number;
  budget: number;
  spent: number;
  startDate: string;
  deadline: string;
  team: string[];
  priority: string;
  description?: string;
}

interface ProjectTrackerProps {
  onBack: () => void;
}

const ProjectTracker = ({ onBack }: ProjectTrackerProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showNewProject, setShowNewProject] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState({
    name: '',
    client: '',
    status: 'planning',
    progress: 0,
    budget: 0,
    spent: 0,
    startDate: '',
    deadline: '',
    team: [''],
    priority: 'medium',
    description: ''
  });
  const { toast } = useToast();

  // Mock project data
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: 'Website Redesign',
      client: 'Acme Corporation',
      status: 'in-progress',
      progress: 75,
      budget: 25000,
      spent: 18750,
      startDate: '2024-01-01',
      deadline: '2024-02-15',
      team: ['John Doe', 'Jane Smith'],
      priority: 'high'
    },
    {
      id: 2,
      name: 'Brand Identity',
      client: 'TechStart Inc',
      status: 'completed',
      progress: 100,
      budget: 15000,
      spent: 14200,
      startDate: '2023-12-01',
      deadline: '2024-01-10',
      team: ['Mike Johnson'],
      priority: 'medium'
    },
    {
      id: 3,
      name: 'Marketing Campaign',
      client: 'Global Solutions',
      status: 'planning',
      progress: 15,
      budget: 40000,
      spent: 2000,
      startDate: '2024-01-15',
      deadline: '2024-03-30',
      team: ['Sarah Wilson', 'David Brown'],
      priority: 'high'
    }
  ]);

  const handleAddProject = () => {
    if (!newProject.name || !newProject.client || !newProject.deadline) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const project: Project = {
      id: Date.now(),
      ...newProject,
      team: newProject.team.filter(member => member.trim() !== '')
    };

    setProjects(prev => [...prev, project]);
    setNewProject({
      name: '',
      client: '',
      status: 'planning',
      progress: 0,
      budget: 0,
      spent: 0,
      startDate: '',
      deadline: '',
      team: [''],
      priority: 'medium',
      description: ''
    });
    setShowNewProject(false);

    toast({
      title: "Project Created",
      description: `${project.name} has been created successfully`,
    });
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setNewProject({
      name: project.name,
      client: project.client,
      status: project.status,
      progress: project.progress,
      budget: project.budget,
      spent: project.spent,
      startDate: project.startDate,
      deadline: project.deadline,
      team: project.team.length > 0 ? project.team : [''],
      priority: project.priority,
      description: project.description || ''
    });
  };

  const handleUpdateProject = () => {
    if (!editingProject) return;

    const updatedProject = {
      ...editingProject,
      ...newProject,
      team: newProject.team.filter(member => member.trim() !== '')
    };

    setProjects(prev => prev.map(project => 
      project.id === editingProject.id ? updatedProject : project
    ));

    setEditingProject(null);
    setNewProject({
      name: '',
      client: '',
      status: 'planning',
      progress: 0,
      budget: 0,
      spent: 0,
      startDate: '',
      deadline: '',
      team: [''],
      priority: 'medium',
      description: ''
    });

    toast({
      title: "Project Updated",
      description: `${updatedProject.name} has been updated successfully`,
    });
  };

  const handleDeleteProject = (projectId: number) => {
    const projectToDelete = projects.find(p => p.id === projectId);
    if (!projectToDelete) return;

    setProjects(prev => prev.filter(project => project.id !== projectId));
    
    toast({
      title: "Project Deleted",
      description: `${projectToDelete.name} has been removed from your project list`,
      variant: "destructive",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'on-hold': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const ProjectForm = ({ isEdit = false }: { isEdit?: boolean }) => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="project-name">Project Name *</Label>
        <Input
          id="project-name"
          value={newProject.name}
          onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
          placeholder="Website Redesign"
        />
      </div>
      <div>
        <Label htmlFor="client">Client *</Label>
        <Input
          id="client"
          value={newProject.client}
          onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
          placeholder="Acme Corporation"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="status">Status</Label>
          <Select value={newProject.status} onValueChange={(value) => setNewProject({ ...newProject, status: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="planning">Planning</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="on-hold">On Hold</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="priority">Priority</Label>
          <Select value={newProject.priority} onValueChange={(value) => setNewProject({ ...newProject, priority: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="budget">Budget</Label>
          <Input
            id="budget"
            type="number"
            value={newProject.budget}
            onChange={(e) => setNewProject({ ...newProject, budget: parseInt(e.target.value) || 0 })}
            placeholder="25000"
          />
        </div>
        <div>
          <Label htmlFor="progress">Progress (%)</Label>
          <Input
            id="progress"
            type="number"
            min="0"
            max="100"
            value={newProject.progress}
            onChange={(e) => setNewProject({ ...newProject, progress: parseInt(e.target.value) || 0 })}
            placeholder="75"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="start-date">Start Date</Label>
          <Input
            id="start-date"
            type="date"
            value={newProject.startDate}
            onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="deadline">Deadline *</Label>
          <Input
            id="deadline"
            type="date"
            value={newProject.deadline}
            onChange={(e) => setNewProject({ ...newProject, deadline: e.target.value })}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="team">Team Members (comma separated)</Label>
        <Input
          id="team"
          value={newProject.team.join(', ')}
          onChange={(e) => setNewProject({ ...newProject, team: e.target.value.split(',').map(name => name.trim()) })}
          placeholder="John Doe, Jane Smith"
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={newProject.description}
          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
          placeholder="Project description..."
          rows={3}
        />
      </div>
      <div className="flex space-x-2">
        <Button onClick={isEdit ? handleUpdateProject : handleAddProject} className="flex-1">
          {isEdit ? 'Update Project' : 'Create Project'}
        </Button>
        <Button variant="outline" onClick={() => {
          if (isEdit) {
            setEditingProject(null);
          } else {
            setShowNewProject(false);
          }
        }}>
          Cancel
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Button variant="outline" onClick={onBack}>
            ← Back to Agency Overview
          </Button>
          <h2 className="text-2xl font-bold mt-4">Project Tracking</h2>
          <p className="text-muted-foreground">
            Track project progress, deadlines, and deliverables
          </p>
        </div>
        <Dialog open={showNewProject} onOpenChange={setShowNewProject}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>
                Add a new project to track progress and deliverables
              </DialogDescription>
            </DialogHeader>
            <ProjectForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Project Dialog */}
      <Dialog open={!!editingProject} onOpenChange={() => setEditingProject(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>
              Update project information and progress
            </DialogDescription>
          </DialogHeader>
          <ProjectForm isEdit={true} />
        </DialogContent>
      </Dialog>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{projects.filter(p => p.status !== 'completed').length}</p>
                <p className="text-sm text-muted-foreground">Active Projects</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{projects.filter(p => p.status === 'completed').length}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">
                  {projects.filter(p => new Date(p.deadline) < new Date() && p.status !== 'completed').length}
                </p>
                <p className="text-sm text-muted-foreground">Overdue</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">${projects.reduce((sum, project) => sum + project.budget, 0).toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Budget</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="planning">Planning</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="on-hold">On Hold</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <div className="flex space-x-2">
                  <Badge className={getStatusColor(project.status)}>
                    {project.status.replace('-', ' ')}
                  </Badge>
                  <Badge className={getPriorityColor(project.priority)}>
                    {project.priority}
                  </Badge>
                </div>
              </div>
              <CardDescription>{project.client}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Progress */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              {/* Budget */}
              <div className="flex justify-between text-sm">
                <span>Budget:</span>
                <span>${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}</span>
              </div>

              {/* Timeline */}
              <div className="flex justify-between text-sm">
                <span>Deadline:</span>
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {new Date(project.deadline).toLocaleDateString()}
                </span>
              </div>

              {/* Team */}
              <div>
                <span className="text-sm font-medium">Team:</span>
                <div className="flex items-center space-x-2 mt-1">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{project.team.join(', ')}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between pt-2">
                <Button size="sm" variant="outline" onClick={() => handleEditProject(project)}>
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="outline">
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleDeleteProject(project.id)} className="text-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Project
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectTracker;
