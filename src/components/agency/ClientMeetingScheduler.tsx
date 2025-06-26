import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, Video, MapPin, Phone } from 'lucide-react';

interface Meeting {
  id: string;
  clientName: string;
  title: string;
  type: 'strategy' | 'review' | 'kickoff' | 'presentation' | 'check-in';
  date: string;
  time: string;
  duration: number;
  location: string;
  meetingType: 'in-person' | 'video' | 'phone';
  agenda: string[];
  status: 'scheduled' | 'completed' | 'cancelled';
}

const ClientMeetingScheduler = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: '1',
      clientName: 'TechStart Solutions',
      title: 'Q1 Strategy Review',
      type: 'review',
      date: '2024-01-25',
      time: '14:00',
      duration: 60,
      location: 'Conference Room A',
      meetingType: 'in-person',
      agenda: ['Review Q1 results', 'Plan Q2 campaigns', 'Budget discussion'],
      status: 'scheduled'
    },
    {
      id: '2',
      clientName: 'Growth Dynamics',
      title: 'Brand Strategy Presentation',
      type: 'presentation',
      date: '2024-01-26',
      time: '10:00',
      duration: 90,
      location: 'Zoom Meeting',
      meetingType: 'video',
      agenda: ['Present brand strategy', 'Review design concepts', 'Get feedback'],
      status: 'scheduled'
    }
  ]);

  const [newMeeting, setNewMeeting] = useState({
    clientName: '',
    title: '',
    type: '' as 'strategy' | 'review' | 'kickoff' | 'presentation' | 'check-in' | '',
    date: '',
    time: '',
    duration: 60,
    location: '',
    meetingType: '' as 'in-person' | 'video' | 'phone' | '',
    agenda: ''
  });

  const handleScheduleMeeting = () => {
    if (!newMeeting.type || !newMeeting.meetingType) return;
    
    const meeting: Meeting = {
      id: Date.now().toString(),
      clientName: newMeeting.clientName,
      title: newMeeting.title,
      type: newMeeting.type,
      date: newMeeting.date,
      time: newMeeting.time,
      duration: newMeeting.duration,
      location: newMeeting.location,
      meetingType: newMeeting.meetingType,
      agenda: newMeeting.agenda.split('\n').filter(item => item.trim()),
      status: 'scheduled'
    };
    setMeetings([...meetings, meeting]);
    setNewMeeting({
      clientName: '',
      title: '',
      type: '',
      date: '',
      time: '',
      duration: 60,
      location: '',
      meetingType: '',
      agenda: ''
    });
  };

  const getMeetingTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'phone': return Phone;
      case 'in-person': return MapPin;
      default: return Calendar;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Schedule New Meeting */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Schedule New Meeting</CardTitle>
              <CardDescription>Create a new client meeting</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="clientName">Client Name</Label>
                <Input
                  id="clientName"
                  value={newMeeting.clientName}
                  onChange={(e) => setNewMeeting({...newMeeting, clientName: e.target.value})}
                  placeholder="Enter client name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Meeting Title</Label>
                <Input
                  id="title"
                  value={newMeeting.title}
                  onChange={(e) => setNewMeeting({...newMeeting, title: e.target.value})}
                  placeholder="Enter meeting title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Meeting Type</Label>
                <Select value={newMeeting.type} onValueChange={(value: 'strategy' | 'review' | 'kickoff' | 'presentation' | 'check-in') => setNewMeeting({...newMeeting, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select meeting type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kickoff">Project Kickoff</SelectItem>
                    <SelectItem value="strategy">Strategy Session</SelectItem>
                    <SelectItem value="review">Progress Review</SelectItem>
                    <SelectItem value="presentation">Presentation</SelectItem>
                    <SelectItem value="check-in">Check-in</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newMeeting.date}
                    onChange={(e) => setNewMeeting({...newMeeting, date: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newMeeting.time}
                    onChange={(e) => setNewMeeting({...newMeeting, time: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="meetingType">Format</Label>
                <Select value={newMeeting.meetingType} onValueChange={(value: 'in-person' | 'video' | 'phone') => setNewMeeting({...newMeeting, meetingType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in-person">In-Person</SelectItem>
                    <SelectItem value="video">Video Call</SelectItem>
                    <SelectItem value="phone">Phone Call</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location/Link</Label>
                <Input
                  id="location"
                  value={newMeeting.location}
                  onChange={(e) => setNewMeeting({...newMeeting, location: e.target.value})}
                  placeholder="Meeting location or video link"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="agenda">Agenda (one item per line)</Label>
                <Textarea
                  id="agenda"
                  value={newMeeting.agenda}
                  onChange={(e) => setNewMeeting({...newMeeting, agenda: e.target.value})}
                  placeholder="Enter agenda items..."
                  rows={3}
                />
              </div>

              <Button onClick={handleScheduleMeeting} className="w-full">
                Schedule Meeting
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Scheduled Meetings */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Scheduled Meetings</h3>
            <Badge variant="outline">{meetings.length} meetings</Badge>
          </div>

          {meetings.map((meeting) => {
            const TypeIcon = getMeetingTypeIcon(meeting.meetingType);
            return (
              <Card key={meeting.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center space-x-2">
                        <span>{meeting.title}</span>
                        <Badge variant="outline">{meeting.type}</Badge>
                      </CardTitle>
                      <CardDescription className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>{meeting.clientName}</span>
                      </CardDescription>
                    </div>
                    <Badge className={`${getStatusColor(meeting.status)} text-white`}>
                      {meeting.status.toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{meeting.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{meeting.time} ({meeting.duration}min)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TypeIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{meeting.location}</span>
                    </div>
                  </div>

                  {meeting.agenda.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">Agenda:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {meeting.agenda.map((item, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-blue-500">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm" variant="outline">Send Reminder</Button>
                    <Button size="sm" variant="outline">Join Meeting</Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ClientMeetingScheduler;
