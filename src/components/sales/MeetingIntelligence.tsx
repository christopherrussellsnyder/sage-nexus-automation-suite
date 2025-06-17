
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Phone, 
  Video, 
  Calendar, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock,
  User,
  FileText,
  Mic,
  PlayCircle
} from 'lucide-react';

interface Meeting {
  id: string;
  title: string;
  participant: string;
  company: string;
  date: string;
  duration: number;
  type: 'call' | 'video' | 'in-person';
  status: 'completed' | 'scheduled' | 'cancelled';
  sentiment: 'positive' | 'neutral' | 'negative';
  keyInsights: string[];
  nextSteps: string[];
  dealImpact: 'high' | 'medium' | 'low';
  transcriptionAvailable: boolean;
}

const MeetingIntelligence = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: '1',
      title: 'TechCorp Discovery Call',
      participant: 'Sarah Johnson',
      company: 'TechCorp Solutions',
      date: '2024-01-15 14:00',
      duration: 45,
      type: 'video',
      status: 'completed',
      sentiment: 'positive',
      keyInsights: [
        'Budget confirmed at $50K for Q1',
        'Decision timeline: end of February',
        'Main pain point: manual reporting processes',
        'Competitor evaluation in progress'
      ],
      nextSteps: [
        'Send technical demo video',
        'Schedule follow-up with IT team',
        'Prepare ROI calculation worksheet'
      ],
      dealImpact: 'high',
      transcriptionAvailable: true
    },
    {
      id: '2',
      title: 'Growth Dynamics Pricing Discussion',
      participant: 'Michael Chen',
      company: 'Growth Dynamics',
      date: '2024-01-14 10:30',
      duration: 30,
      type: 'call',
      status: 'completed',
      sentiment: 'neutral',
      keyInsights: [
        'Price sensitivity around implementation costs',
        'Need to justify ROI to finance team',
        'Interested in phased rollout approach',
        'Comparing with 2 other vendors'
      ],
      nextSteps: [
        'Prepare competitive analysis',
        'Create phased implementation proposal',
        'Schedule CFO introduction call'
      ],
      dealImpact: 'medium',
      transcriptionAvailable: true
    },
    {
      id: '3',
      title: 'InnovateTech Follow-up',
      participant: 'Emma Wilson',
      company: 'InnovateTech',
      date: '2024-01-16 15:00',
      duration: 0,
      type: 'video',
      status: 'scheduled',
      sentiment: 'neutral',
      keyInsights: [],
      nextSteps: [],
      dealImpact: 'medium',
      transcriptionAvailable: false
    }
  ]);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      case 'neutral': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <CheckCircle className="h-4 w-4" />;
      case 'negative': return <AlertCircle className="h-4 w-4" />;
      case 'neutral': return <Clock className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getMeetingTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'call': return <Phone className="h-4 w-4" />;
      case 'in-person': return <User className="h-4 w-4" />;
      default: return <Phone className="h-4 w-4" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const completedMeetings = meetings.filter(m => m.status === 'completed');
  const avgDuration = completedMeetings.reduce((sum, m) => sum + m.duration, 0) / completedMeetings.length || 0;
  const positiveMeetings = completedMeetings.filter(m => m.sentiment === 'positive').length;
  const sentimentScore = (positiveMeetings / completedMeetings.length * 100) || 0;

  return (
    <div className="space-y-6">
      <Tabs defaultValue="meetings" className="space-y-6">
        <TabsList>
          <TabsTrigger value="meetings">Meeting History</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="coaching">Coaching</TabsTrigger>
        </TabsList>

        <TabsContent value="meetings">
          {/* Meeting Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">{meetings.length}</p>
                    <p className="text-sm text-muted-foreground">Total Meetings</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">{Math.round(avgDuration)}m</p>
                    <p className="text-sm text-muted-foreground">Avg Duration</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="text-2xl font-bold">{Math.round(sentimentScore)}%</p>
                    <p className="text-sm text-muted-foreground">Positive Sentiment</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Mic className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="text-2xl font-bold">{meetings.filter(m => m.transcriptionAvailable).length}</p>
                    <p className="text-sm text-muted-foreground">Transcribed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Meeting Intelligence Dashboard</CardTitle>
              <CardDescription>AI-powered meeting analysis and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Meeting</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Sentiment</TableHead>
                      <TableHead>Deal Impact</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {meetings.map((meeting) => (
                      <TableRow key={meeting.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{meeting.title}</div>
                            <div className="text-sm text-muted-foreground">{meeting.participant} • {meeting.company}</div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(meeting.date).toLocaleString()}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getMeetingTypeIcon(meeting.type)}
                            <span className="capitalize">{meeting.type}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {meeting.status === 'completed' ? (
                            <span>{meeting.duration}m</span>
                          ) : (
                            <Badge variant="outline">{meeting.status}</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {meeting.status === 'completed' && (
                            <div className={`flex items-center space-x-2 ${getSentimentColor(meeting.sentiment)}`}>
                              {getSentimentIcon(meeting.sentiment)}
                              <span className="capitalize">{meeting.sentiment}</span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${getImpactColor(meeting.dealImpact)}`} />
                            <span className="capitalize">{meeting.dealImpact}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            {meeting.transcriptionAvailable && (
                              <Button size="sm" variant="outline">
                                <FileText className="h-3 w-3" />
                              </Button>
                            )}
                            <Button size="sm" variant="outline">
                              <PlayCircle className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Key Insights Extracted</CardTitle>
                <CardDescription>AI-identified talking points from recent meetings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {completedMeetings.map((meeting) => (
                    meeting.keyInsights.length > 0 && (
                      <div key={meeting.id} className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">{meeting.title}</h4>
                        <div className="space-y-2">
                          {meeting.keyInsights.map((insight, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                              <span className="text-sm">{insight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Next Steps Tracking</CardTitle>
                <CardDescription>AI-recommended follow-up actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {completedMeetings.map((meeting) => (
                    meeting.nextSteps.length > 0 && (
                      <div key={meeting.id} className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">{meeting.title}</h4>
                        <div className="space-y-2">
                          {meeting.nextSteps.map((step, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="coaching">
          <Card>
            <CardHeader>
              <CardTitle>AI Sales Coaching</CardTitle>
              <CardDescription>Personalized coaching based on meeting performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Strengths Identified</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Strong discovery questioning</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Good rapport building</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Clear next steps communication</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Areas for Improvement</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                        <span className="text-sm">Could improve objection handling</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                        <span className="text-sm">More specific pain point discovery</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                        <span className="text-sm">Stronger closing techniques</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">This Week's Focus</h4>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm">
                      <strong>Primary Goal:</strong> Improve objection handling by preparing 3 common objection responses before each call.
                    </p>
                    <p className="text-sm mt-2">
                      <strong>Practice Area:</strong> When prospects mention budget concerns, pivot to ROI discussion rather than discount.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MeetingIntelligence;
