
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Megaphone, 
  Users, 
  TrendingUp, 
  MessageSquare, 
  Target,
  BarChart3,
  Calendar,
  Star,
  Play,
  Pause,
  Settings,
  Eye,
  Share2,
  Plus,
  Clock
} from "lucide-react";

const AgencyDashboard = () => {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'leads' | 'social' | 'reports'>('campaigns');

  const campaigns = [
    {
      id: 1,
      name: "Tech Startup Q4 Campaign",
      platform: "Google Ads + Facebook",
      status: "Active",
      budget: "$5,000",
      spent: "$3,240",
      impressions: "124K",
      clicks: "2.4K",
      conversions: 89,
      roas: "3.2x"
    },
    {
      id: 2,
      name: "E-commerce Holiday Sale",
      platform: "Facebook + Instagram",
      status: "Active",
      budget: "$8,000",
      spent: "$6,120",
      impressions: "245K",
      clicks: "4.8K",
      conversions: 156,
      roas: "4.1x"
    },
    {
      id: 3,
      name: "B2B LinkedIn Campaign",
      platform: "LinkedIn",
      status: "Paused",
      budget: "$3,000",
      spent: "$1,890",
      impressions: "45K",
      clicks: "890",
      conversions: 23,
      roas: "2.8x"
    }
  ];

  const leads = [
    {
      id: 1,
      name: "Sarah Johnson",
      company: "TechCorp Inc.",
      score: 92,
      status: "Hot",
      source: "Google Ads",
      value: "$12,000",
      lastActivity: "2 hours ago"
    },
    {
      id: 2,
      name: "Mike Chen",
      company: "StartupXYZ",
      score: 78,
      status: "Warm",
      source: "LinkedIn",
      value: "$8,500",
      lastActivity: "1 day ago"
    },
    {
      id: 3,
      name: "Emma Wilson",
      company: "GrowthCo",
      score: 65,
      status: "Cold",
      source: "Facebook",
      value: "$5,200",
      lastActivity: "3 days ago"
    }
  ];

  const socialPosts = [
    {
      id: 1,
      platform: "Facebook",
      content: "🚀 Boost your business with AI-powered marketing automation...",
      scheduled: "Today 2:00 PM",
      status: "Scheduled",
      engagement: "Est. 2.4K reach"
    },
    {
      id: 2,
      platform: "Instagram",
      content: "✨ Transform your marketing strategy with data-driven insights...",
      scheduled: "Today 4:00 PM",
      status: "Scheduled",
      engagement: "Est. 1.8K reach"
    },
    {
      id: 3,
      platform: "LinkedIn",
      content: "📊 How B2B companies are scaling with marketing automation...",
      scheduled: "Tomorrow 10:00 AM",
      status: "Draft",
      engagement: "Est. 850 reach"
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'campaigns':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">Campaign Management</h3>
                <p className="text-muted-foreground">Multi-platform campaign orchestration and optimization</p>
              </div>
              <Button className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>New Campaign</span>
              </Button>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Megaphone className="h-6 w-6 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold">12</p>
                      <p className="text-sm text-muted-foreground">Active Campaigns</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-6 w-6 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold">3.4x</p>
                      <p className="text-sm text-muted-foreground">Avg ROAS</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Target className="h-6 w-6 text-purple-500" />
                    <div>
                      <p className="text-2xl font-bold">268</p>
                      <p className="text-sm text-muted-foreground">Conversions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-6 w-6 text-orange-500" />
                    <div>
                      <p className="text-2xl font-bold">$45K</p>
                      <p className="text-sm text-muted-foreground">Monthly Spend</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Active Campaigns</CardTitle>
                <CardDescription>Real-time campaign performance and optimization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campaigns.map((campaign) => (
                    <div key={campaign.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{campaign.name}</h4>
                          <p className="text-sm text-muted-foreground">{campaign.platform}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={campaign.status === 'Active' ? 'default' : 'secondary'}>
                            {campaign.status}
                          </Badge>
                          <Button size="sm" variant="outline">
                            {campaign.status === 'Active' ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                          </Button>
                          <Button size="sm" variant="outline">
                            <Settings className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-6 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Budget</p>
                          <p className="font-medium">{campaign.budget}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Spent</p>
                          <p className="font-medium">{campaign.spent}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Impressions</p>
                          <p className="font-medium">{campaign.impressions}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Clicks</p>
                          <p className="font-medium">{campaign.clicks}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Conversions</p>
                          <p className="font-medium">{campaign.conversions}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">ROAS</p>
                          <p className="font-medium text-green-600">{campaign.roas}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Budget Usage</span>
                          <span>{Math.round((parseFloat(campaign.spent.replace('$', '').replace(',', '')) / parseFloat(campaign.budget.replace('$', '').replace(',', ''))) * 100)}%</span>
                        </div>
                        <Progress value={Math.round((parseFloat(campaign.spent.replace('$', '').replace(',', '')) / parseFloat(campaign.budget.replace('$', '').replace(',', ''))) * 100)} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'leads':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">Lead Management</h3>
                <p className="text-muted-foreground">Intelligent lead scoring and nurturing automation</p>
              </div>
              <Input placeholder="Search leads..." className="max-w-sm" />
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Users className="h-6 w-6 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold">156</p>
                      <p className="text-sm text-muted-foreground">Total Leads</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Star className="h-6 w-6 text-yellow-500" />
                    <div>
                      <p className="text-2xl font-bold">23</p>
                      <p className="text-sm text-muted-foreground">Hot Leads</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-6 w-6 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold">78</p>
                      <p className="text-sm text-muted-foreground">Avg Score</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Target className="h-6 w-6 text-purple-500" />
                    <div>
                      <p className="text-2xl font-bold">34%</p>
                      <p className="text-sm text-muted-foreground">Conversion Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Lead Pipeline</CardTitle>
                <CardDescription>Automatically scored and qualified leads</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leads.map((lead) => (
                    <div key={lead.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{lead.name}</h4>
                          <p className="text-sm text-muted-foreground">{lead.company}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={lead.status === 'Hot' ? 'destructive' : lead.status === 'Warm' ? 'default' : 'secondary'}>
                            {lead.status}
                          </Badge>
                          <div className="text-right">
                            <p className="text-sm font-medium">Score: {lead.score}</p>
                            <div className="w-20 h-2 bg-muted rounded-full">
                              <div 
                                className="h-full bg-primary rounded-full" 
                                style={{ width: `${lead.score}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Source</p>
                          <p className="font-medium">{lead.source}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Value</p>
                          <p className="font-medium">{lead.value}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Last Activity</p>
                          <p className="font-medium">{lead.lastActivity}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">View</Button>
                          <Button size="sm">Contact</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'social':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">Social Media Factory</h3>
                <p className="text-muted-foreground">Automated content generation and community management</p>
              </div>
              <Button className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Create Content</span>
              </Button>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-6 w-6 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold">24</p>
                      <p className="text-sm text-muted-foreground">Scheduled Posts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-6 w-6 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold">89</p>
                      <p className="text-sm text-muted-foreground">Responses Automated</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-6 w-6 text-purple-500" />
                    <div>
                      <p className="text-2xl font-bold">+45%</p>
                      <p className="text-sm text-muted-foreground">Engagement Growth</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Eye className="h-6 w-6 text-orange-500" />
                    <div>
                      <p className="text-2xl font-bold">12.4K</p>
                      <p className="text-sm text-muted-foreground">Weekly Reach</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Content Calendar</CardTitle>
                <CardDescription>AI-generated content scheduled for optimal engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {socialPosts.map((post) => (
                    <div key={post.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Badge variant="outline">{post.platform}</Badge>
                          <Badge variant={post.status === 'Scheduled' ? 'default' : 'secondary'}>
                            {post.status}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Share2 className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Settings className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-sm mb-3 line-clamp-2">{post.content}</p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span>{post.scheduled}</span>
                          </div>
                          <span className="text-muted-foreground">{post.engagement}</span>
                        </div>
                        <Button size="sm">
                          {post.status === 'Draft' ? 'Schedule' : 'Edit'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'reports':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">Client Reports</h3>
                <p className="text-muted-foreground">Automated performance dashboards and insights</p>
              </div>
              <Button className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Generate Report</span>
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-6 w-6 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold">28</p>
                      <p className="text-sm text-muted-foreground">Active Clients</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-6 w-6 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold">156</p>
                      <p className="text-sm text-muted-foreground">Reports Generated</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-6 w-6 text-purple-500" />
                    <div>
                      <p className="text-2xl font-bold">24h</p>
                      <p className="text-sm text-muted-foreground">Auto Updates</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Star className="h-6 w-6 text-orange-500" />
                    <div>
                      <p className="text-2xl font-bold">98%</p>
                      <p className="text-sm text-muted-foreground">Client Satisfaction</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                  <CardDescription>Real-time metrics across all clients</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Campaign Performance</span>
                      <span className="text-green-600">+12% vs last month</span>
                    </div>
                    <Progress value={78} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Lead Generation</span>
                      <span className="text-green-600">+8% vs last month</span>
                    </div>
                    <Progress value={65} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>ROI Achievement</span>
                      <span className="text-green-600">+15% vs last month</span>
                    </div>
                    <Progress value={89} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Reports</CardTitle>
                  <CardDescription>Latest automated client reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium">TechCorp Monthly Report</p>
                        <p className="text-sm text-muted-foreground">Generated 2 hours ago</p>
                      </div>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium">StartupXYZ Performance</p>
                        <p className="text-sm text-muted-foreground">Generated 5 hours ago</p>
                      </div>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium">GrowthCo Campaign Analysis</p>
                        <p className="text-sm text-muted-foreground">Generated 1 day ago</p>
                      </div>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
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
          <h2 className="text-3xl font-bold">Marketing Agency Suite</h2>
          <p className="text-muted-foreground">AI-powered campaign management and client operations</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={activeTab === 'campaigns' ? 'default' : 'outline'}
            onClick={() => setActiveTab('campaigns')}
            className="flex items-center space-x-2"
          >
            <Megaphone className="h-4 w-4" />
            <span>Campaigns</span>
          </Button>
          <Button
            variant={activeTab === 'leads' ? 'default' : 'outline'}
            onClick={() => setActiveTab('leads')}
            className="flex items-center space-x-2"
          >
            <Users className="h-4 w-4" />
            <span>Leads</span>
          </Button>
          <Button
            variant={activeTab === 'social' ? 'default' : 'outline'}
            onClick={() => setActiveTab('social')}
            className="flex items-center space-x-2"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Social</span>
          </Button>
          <Button
            variant={activeTab === 'reports' ? 'default' : 'outline'}
            onClick={() => setActiveTab('reports')}
            className="flex items-center space-x-2"
          >
            <BarChart3 className="h-4 w-4" />
            <span>Reports</span>
          </Button>
        </div>
      </div>

      {renderContent()}
    </div>
  );
};

export default AgencyDashboard;
