
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Building2, 
  DollarSign, 
  Calendar, 
  User, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface ClientProject {
  id: string;
  clientName: string;
  projectType: string;
  value: number;
  startDate: string;
  endDate: string;
  status: 'planning' | 'in-progress' | 'review' | 'completed' | 'on-hold';
  progress: number;
  nextMilestone: string;
  teamMembers: string[];
}

const ClientProjectTracker = () => {
  const [projects] = useState<ClientProject[]>([
    {
      id: '1',
      clientName: 'TechStart Solutions',
      projectType: 'Digital Marketing Campaign',
      value: 25000,
      startDate: '2024-01-15',
      endDate: '2024-04-15',
      status: 'in-progress',
      progress: 65,
      nextMilestone: 'Campaign Launch',
      teamMembers: ['Sarah', 'Mike', 'Alex']
    },
    {
      id: '2',
      clientName: 'Growth Dynamics',
      projectType: 'Brand Strategy & Design',
      value: 18000,
      startDate: '2024-02-01',
      endDate: '2024-05-01',
      status: 'review',
      progress: 85,
      nextMilestone: 'Final Presentation',
      teamMembers: ['Emma', 'David']
    },
    {
      id: '3',
      clientName: 'Enterprise Solutions Inc',
      projectType: 'Lead Generation System',
      value: 35000,
      startDate: '2024-01-01',
      endDate: '2024-06-01',
      status: 'in-progress',
      progress: 40,
      nextMilestone: 'System Integration',
      teamMembers: ['John', 'Lisa', 'Mark', 'Anna']
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'review': return 'bg-yellow-500';
      case 'planning': return 'bg-gray-500';
      case 'on-hold': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'in-progress': return Clock;
      case 'review': return AlertCircle;
      case 'planning': return Calendar;
      case 'on-hold': return AlertCircle;
      default: return Clock;
    }
  };

  const totalProjectValue = projects.reduce((sum, project) => sum + project.value, 0);
  const averageProgress = Math.round(projects.reduce((sum, project) => sum + project.progress, 0) / projects.length);

  return (
    <div className="space-y-6">
      {/* Project Overview Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Building2 className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{projects.length}</p>
                <p className="text-sm text-muted-foreground">Active Projects</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">${totalProjectValue.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Project Value</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{averageProgress}%</p>
                <p className="text-sm text-muted-foreground">Average Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <User className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{projects.filter(p => p.status === 'completed').length}</p>
                <p className="text-sm text-muted-foreground">Completed Projects</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Client Projects</h3>
          <Button>Add New Project</Button>
        </div>

        {projects.map((project) => {
          const StatusIcon = getStatusIcon(project.status);
          return (
            <Card key={project.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center space-x-2">
                      <span>{project.clientName}</span>
                      <Badge variant="outline">{project.projectType}</Badge>
                    </CardTitle>
                    <CardDescription>
                      ${project.value.toLocaleString()} • {project.startDate} - {project.endDate}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <StatusIcon className="h-4 w-4" />
                    <Badge className={`${getStatusColor(project.status)} text-white`}>
                      {project.status.replace('-', ' ').toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Project Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Next Milestone</p>
                    <p className="text-sm text-muted-foreground">{project.nextMilestone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Team Members</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {project.teamMembers.map((member, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {member}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">View Details</Button>
                  <Button size="sm" variant="outline">Update Progress</Button>
                  <Button size="sm" variant="outline">Schedule Meeting</Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ClientProjectTracker;
