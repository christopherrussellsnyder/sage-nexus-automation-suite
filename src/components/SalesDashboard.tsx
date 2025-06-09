
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  Mail, 
  Phone, 
  Calendar,
  Target,
  TrendingUp,
  User,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  Play,
  Pause,
  Settings,
  Eye,
  Plus,
  Filter
} from "lucide-react";

const SalesDashboard = () => {
  const [activeTab, setActiveTab] = useState<'prospects' | 'sequences' | 'meetings' | 'deals'>('prospects');

  const prospects = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "VP Marketing",
      company: "TechCorp Inc.",
      email: "sarah@techcorp.com",
      phone: "+1 (555) 123-4567",
      score: 94,
      status: "Qualified",
      source: "LinkedIn",
      lastContact: "2 hours ago",
      nextAction: "Schedule Demo"
    },
    {
      id: 2,
      name: "Mike Chen",
      title: "CEO",
      company: "StartupXYZ",
      email: "mike@startupxyz.com",
      phone: "+1 (555) 987-6543",
      score: 87,
      status: "Researching",
      source: "Cold Email",
      lastContact: "1 day ago",
      nextAction: "Follow-up Call"
    },
    {
      id: 3,
      name: "Emma Wilson",
      title: "Head of Growth",
      company: "ScaleUp Co",
      email: "emma@scaleup.co",
      phone: "+1 (555) 456-7890",
      score: 72,
      status: "New",
      source: "Referral",
      lastContact: "3 days ago",
      nextAction: "Send Proposal"
    }
  ];

  const sequences = [
    {
      id: 1,
      name: "SaaS Decision Maker Sequence",
      type: "Email + LinkedIn",
      prospects: 45,
      status: "Active",
      openRate: "34%",
      responseRate: "12%",
      steps: 7,
      currentStep: 3
    },
    {
      id: 2,
      name: "Enterprise Follow-up",
      type: "Email + Phone",
      prospects: 23,
      status: "Active",
      openRate: "28%",
      responseRate: "8%",
      steps: 5,
      currentStep: 2
    },
    {
      id: 3,
      name: "Referral Nurture",
      type: "Multi-channel",
      prospects: 12,
      status: "Paused",
      openRate: "42%",
      responseRate: "18%",
      steps: 4,
      currentStep: 1
    }
  ];

  const meetings = [
    {
      id: 1,
      prospect: "Sarah Johnson",
      company: "TechCorp Inc.",
      type: "Demo Call",
      date: "Today 2:00 PM",
      duration: "30 min",
      status: "Scheduled",
      sentiment: "Positive",
      keyPoints: ["Budget confirmed", "Decision timeline: Q1", "Technical requirements discussed"]
    },
    {
      id: 2,
      prospect: "Mike Chen",
      company: "StartupXYZ",
      type: "Discovery Call",
      date: "Tomorrow 10:00 AM",
      duration: "45 min",
      status: "Confirmed",
      sentiment: "Interested",
      keyPoints: ["Pain points identified", "Current solution limitations", "ROI expectations"]
    },
    {
      id: 3,
      prospect: "Emma Wilson",
      company: "ScaleUp Co",
      type: "Proposal Review",
      date: "Friday 3:00 PM",
      duration: "60 min",
      status: "Tentative",
      sentiment: "Neutral",
      keyPoints: ["Pricing concerns", "Implementation timeline", "Team training needs"]
    }
  ];

  const deals = [
    {
      id: 1,
      prospect: "TechCorp Inc.",
      value: "$45,000",
      stage: "Proposal Sent",
      probability: 75,
      closeDate: "Jan 15, 2024",
      lastActivity: "Proposal reviewed",
      nextStep: "Follow-up call scheduled"
    },
    {
      id: 2,
      prospect: "StartupXYZ",
      value: "$28,000",
      stage: "Demo Completed",
      probability: 60,
      closeDate: "Jan 22, 2024",
      lastActivity: "Technical questions answered",
      nextStep: "Send customized proposal"
    },
    {
      id: 3,
      prospect: "ScaleUp Co",
      value: "$67,000",
      stage: "Negotiation",
      probability: 85,
      closeDate: "Jan 30, 2024",
      lastActivity: "Contract terms discussed",
      nextStep: "Legal review pending"
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'prospects':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">Prospect Research</h3>
                <p className="text-muted-foreground">AI-powered prospect qualification and research</p>
              </div>
              <div className="flex space-x-2">
                <Input placeholder="Search prospects..." className="max-w-sm" />
                <Button variant="outline">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Prospect
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <User className="h-6 w-6 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold">340</p>
                      <p className="text-sm text-muted-foreground">Total Prospects</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Target className="h-6 w-6 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold">89</p>
                      <p className="text-sm text-muted-foreground">Qualified</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-6 w-6 text-purple-500" />
                    <div>
                      <p className="text-2xl font-bold">82</p>
                      <p className="text-sm text-muted-foreground">Avg Score</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-6 w-6 text-orange-500" />
                    <div>
                      <p className="text-2xl font-bold">28%</p>
                      <p className="text-sm text-muted-foreground">Conversion Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Prospect Pipeline</CardTitle>
                <CardDescription>AI-researched and qualified prospects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {prospects.map((prospect) => (
                    <div key={prospect.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{prospect.name}</h4>
                          <p className="text-sm text-muted-foreground">{prospect.title} at {prospect.company}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={prospect.status === 'Qualified' ? 'default' : prospect.status === 'Researching' ? 'secondary' : 'outline'}>
                            {prospect.status}
                          </Badge>
                          <div className="text-right">
                            <p className="text-sm font-medium">Score: {prospect.score}</p>
                            <div className="w-20 h-2 bg-muted rounded-full">
                              <div 
                                className="h-full bg-primary rounded-full" 
                                style={{ width: `${prospect.score}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-3">
                        <div>
                          <p className="text-muted-foreground">Email</p>
                          <p className="font-medium">{prospect.email}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Phone</p>
                          <p className="font-medium">{prospect.phone}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Source</p>
                          <p className="font-medium">{prospect.source}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Last Contact</p>
                          <p className="font-medium">{prospect.lastContact}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="h-4 w-4 text-orange-500" />
                          <span className="text-sm font-medium">Next: {prospect.nextAction}</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Mail className="h-3 w-3 mr-1" />
                            Email
                          </Button>
                          <Button size="sm">
                            <Phone className="h-3 w-3 mr-1" />
                            Call
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'sequences':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">Sales Sequences</h3>
                <p className="text-muted-foreground">Automated multi-channel sales sequences</p>
              </div>
              <Button className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>New Sequence</span>
              </Button>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-6 w-6 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold">8</p>
                      <p className="text-sm text-muted-foreground">Active Sequences</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-6 w-6 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold">156</p>
                      <p className="text-sm text-muted-foreground">Emails Sent</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Eye className="h-6 w-6 text-purple-500" />
                    <div>
                      <p className="text-2xl font-bold">34%</p>
                      <p className="text-sm text-muted-foreground">Open Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-6 w-6 text-orange-500" />
                    <div>
                      <p className="text-2xl font-bold">12%</p>
                      <p className="text-sm text-muted-foreground">Response Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Active Sequences</CardTitle>
                <CardDescription>Multi-channel sales automation sequences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sequences.map((sequence) => (
                    <div key={sequence.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{sequence.name}</h4>
                          <p className="text-sm text-muted-foreground">{sequence.type}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={sequence.status === 'Active' ? 'default' : 'secondary'}>
                            {sequence.status}
                          </Badge>
                          <Button size="sm" variant="outline">
                            {sequence.status === 'Active' ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                          </Button>
                          <Button size="sm" variant="outline">
                            <Settings className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-5 gap-4 text-sm mb-3">
                        <div>
                          <p className="text-muted-foreground">Prospects</p>
                          <p className="font-medium">{sequence.prospects}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Open Rate</p>
                          <p className="font-medium">{sequence.openRate}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Response Rate</p>
                          <p className="font-medium text-green-600">{sequence.responseRate}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Steps</p>
                          <p className="font-medium">{sequence.steps}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Progress</p>
                          <p className="font-medium">Step {sequence.currentStep}/{sequence.steps}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Sequence Progress</span>
                          <span>{Math.round((sequence.currentStep / sequence.steps) * 100)}%</span>
                        </div>
                        <Progress value={Math.round((sequence.currentStep / sequence.steps) * 100)} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'meetings':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">Meeting Intelligence</h3>
                <p className="text-muted-foreground">AI-powered meeting analysis and insights</p>
              </div>
              <Button className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Schedule Meeting</span>
              </Button>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-6 w-6 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold">12</p>
                      <p className="text-sm text-muted-foreground">This Week</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-6 w-6 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold">8.5h</p>
                      <p className="text-sm text-muted-foreground">Total Duration</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-6 w-6 text-purple-500" />
                    <div>
                      <p className="text-2xl font-bold">78%</p>
                      <p className="text-sm text-muted-foreground">Positive Sentiment</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-6 w-6 text-orange-500" />
                    <div>
                      <p className="text-2xl font-bold">34</p>
                      <p className="text-sm text-muted-foreground">Opportunities</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Meetings</CardTitle>
                <CardDescription>AI-analyzed meetings with key insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {meetings.map((meeting) => (
                    <div key={meeting.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{meeting.prospect}</h4>
                          <p className="text-sm text-muted-foreground">{meeting.company} • {meeting.type}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={meeting.status === 'Scheduled' ? 'default' : meeting.status === 'Confirmed' ? 'secondary' : 'outline'}>
                            {meeting.status}
                          </Badge>
                          <Badge variant={meeting.sentiment === 'Positive' ? 'default' : meeting.sentiment === 'Interested' ? 'secondary' : 'outline'}>
                            {meeting.sentiment}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4 text-sm mb-3">
                        <div>
                          <p className="text-muted-foreground">Date & Time</p>
                          <p className="font-medium">{meeting.date}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Duration</p>
                          <p className="font-medium">{meeting.duration}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Type</p>
                          <p className="font-medium">{meeting.type}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Key Points:</p>
                        <ul className="text-sm space-y-1">
                          {meeting.keyPoints.map((point, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex justify-end space-x-2 mt-3">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          Details
                        </Button>
                        <Button size="sm" variant="outline">
                          <Calendar className="h-3 w-3 mr-1" />
                          Reschedule
                        </Button>
                        <Button size="sm">
                          Join Meeting
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'deals':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">Deal Pipeline</h3>
                <p className="text-muted-foreground">AI-powered deal progression and forecasting</p>
              </div>
              <Button className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>New Deal</span>
              </Button>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Target className="h-6 w-6 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold">24</p>
                      <p className="text-sm text-muted-foreground">Active Deals</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-6 w-6 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold">$340K</p>
                      <p className="text-sm text-muted-foreground">Pipeline Value</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-6 w-6 text-purple-500" />
                    <div>
                      <p className="text-2xl font-bold">73%</p>
                      <p className="text-sm text-muted-foreground">Avg Probability</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-6 w-6 text-orange-500" />
                    <div>
                      <p className="text-2xl font-bold">18</p>
                      <p className="text-sm text-muted-foreground">Avg Days to Close</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Active Deals</CardTitle>
                <CardDescription>Deal progression with AI-powered insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deals.map((deal) => (
                    <div key={deal.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{deal.prospect}</h4>
                          <p className="text-sm text-muted-foreground">{deal.stage}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-600">{deal.value}</p>
                          <p className="text-sm text-muted-foreground">{deal.probability}% probability</p>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4 text-sm mb-3">
                        <div>
                          <p className="text-muted-foreground">Close Date</p>
                          <p className="font-medium">{deal.closeDate}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Last Activity</p>
                          <p className="font-medium">{deal.lastActivity}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Next Step</p>
                          <p className="font-medium">{deal.nextStep}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-3">
                        <div className="flex justify-between text-sm">
                          <span>Deal Probability</span>
                          <span>{deal.probability}%</span>
                        </div>
                        <Progress value={deal.probability} />
                      </div>
                      
                      <div className="flex justify-end space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          Add Note
                        </Button>
                        <Button size="sm">
                          Update Stage
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Sales Operations Suite</h2>
          <p className="text-muted-foreground">AI-powered sales automation and intelligence</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={activeTab === 'prospects' ? 'default' : 'outline'}
            onClick={() => setActiveTab('prospects')}
            className="flex items-center space-x-2"
          >
            <Search className="h-4 w-4" />
            <span>Prospects</span>
          </Button>
          <Button
            variant={activeTab === 'sequences' ? 'default' : 'outline'}
            onClick={() => setActiveTab('sequences')}
            className="flex items-center space-x-2"
          >
            <Mail className="h-4 w-4" />
            <span>Sequences</span>
          </Button>
          <Button
            variant={activeTab === 'meetings' ? 'default' : 'outline'}
            onClick={() => setActiveTab('meetings')}
            className="flex items-center space-x-2"
          >
            <Calendar className="h-4 w-4" />
            <span>Meetings</span>
          </Button>
          <Button
            variant={activeTab === 'deals' ? 'default' : 'outline'}
            onClick={() => setActiveTab('deals')}
            className="flex items-center space-x-2"
          >
            <Target className="h-4 w-4" />
            <span>Deals</span>
          </Button>
        </div>
      </div>

      {renderContent()}
    </div>
  );
};

export default SalesDashboard;
