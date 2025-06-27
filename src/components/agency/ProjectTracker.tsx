
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
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
  Edit
} from 'lucide-react';

interface ProjectTrackerProps {
  onBack: () => void;
}

const ProjectTracker = ({ onBack }: ProjectTrackerProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock project data
  const projects = [
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
  ];

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
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">18</p>
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
                <p className="text-2xl font-bold">24</p>
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
                <p className="text-2xl font-bold">3</p>
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
                <p className="text-2xl font-bold">$180K</p>
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
                <Button size="sm" variant="outline">
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button size="sm" variant="outline">
                  <MoreHorizontal className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectTracker;
