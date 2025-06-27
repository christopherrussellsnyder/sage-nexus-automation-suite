
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Plus, 
  Video,
  Phone,
  User,
  MapPin,
  Bell,
  Check,
  X,
  Edit,
  MoreHorizontal
} from 'lucide-react';

interface MeetingSchedulerProps {
  onBack: () => void;
}

const MeetingScheduler = ({ onBack }: MeetingSchedulerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showNewMeeting, setShowNewMeeting] = useState(false);
  const [meetingData, setMeetingData] = useState({
    title: '',
    attendee: '',
    type: '',
    duration: '',
    description: ''
  });

  // Mock meetings data
  const meetings = [
    {
      id: 1,
      title: 'Sales Discovery Call',
      attendee: 'Sarah Williams - Digital Solutions Inc',
      type: 'video',
      date: '2024-01-16',
      time: '10:00 AM',
      duration: '30 min',
      status: 'confirmed',
      description: 'Initial discovery call to understand requirements'
    },
    {
      id: 2,
      title: 'Product Demo',
      attendee: 'Michael Chen - TechFlow Corp',
      type: 'video',
      date: '2024-01-16',
      time: '2:00 PM',
      duration: '45 min',
      status: 'pending',
      description: 'Demonstrate platform features and capabilities'
    },
    {
      id: 3,
      title: 'Follow-up Meeting',
      attendee: 'Emma Rodriguez - StartupHub',
      type: 'phone',
      date: '2024-01-17',
      time: '11:00 AM',
      duration: '30 min',
      status: 'confirmed',
      description: 'Follow up on proposal discussion'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'phone': return <Phone className="h-4 w-4" />;
      case 'in-person': return <MapPin className="h-4 w-4" />;
      default: return <CalendarIcon className="h-4 w-4" />;
    }
  };

  const todaysMeetings = meetings.filter(meeting => 
    meeting.date === new Date().toISOString().split('T')[0]
  );

  const upcomingMeetings = meetings.filter(meeting => 
    new Date(meeting.date) > new Date()
  );

  if (showNewMeeting) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Button variant="outline" onClick={() => setShowNewMeeting(false)}>
              ← Back to Calendar
            </Button>
            <h2 className="text-2xl font-bold mt-4">Schedule New Meeting</h2>
            <p className="text-muted-foreground">
              Create and schedule a new meeting with automated reminders
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Meeting Details</CardTitle>
              <CardDescription>Configure your meeting settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Meeting Title</label>
                <Input
                  placeholder="Enter meeting title"
                  value={meetingData.title}
                  onChange={(e) => setMeetingData(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Attendee</label>
                <Input
                  placeholder="Enter attendee name"
                  value={meetingData.attendee}
                  onChange={(e) => setMeetingData(prev => ({ ...prev, attendee: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Meeting Type</label>
                  <Select value={meetingData.type} onValueChange={(value) => setMeetingData(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">Video Call</SelectItem>
                      <SelectItem value="phone">Phone Call</SelectItem>
                      <SelectItem value="in-person">In Person</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Duration</label>
                  <Select value={meetingData.duration} onValueChange={(value) => setMeetingData(prev => ({ ...prev, duration: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Meeting agenda and notes"
                  value={meetingData.description}
                  onChange={(e) => setMeetingData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>
              <div className="flex space-x-2">
                <Button>
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Schedule Meeting
                </Button>
                <Button variant="outline">
                  <Bell className="h-4 w-4 mr-2" />
                  Set Reminder
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Select Date & Time</CardTitle>
              <CardDescription>Choose when to schedule the meeting</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
              <div className="mt-4">
                <label className="text-sm font-medium">Available Time Slots</label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'].map((time) => (
                    <Button key={time} variant="outline" size="sm">
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
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
          <h2 className="text-2xl font-bold mt-4">Meeting Scheduler</h2>
          <p className="text-muted-foreground">
            Manage your sales meetings with automated scheduling and reminders
          </p>
        </div>
        <Button onClick={() => setShowNewMeeting(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Schedule Meeting
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{todaysMeetings.length}</p>
                <p className="text-sm text-muted-foreground">Today's Meetings</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{upcomingMeetings.length}</p>
                <p className="text-sm text-muted-foreground">Upcoming</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Check className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-muted-foreground">This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Video className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">89%</p>
                <p className="text-sm text-muted-foreground">Show Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Calendar and Meetings */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>Select date to view meetings</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Meetings List */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's Meetings</CardTitle>
              <CardDescription>Your scheduled meetings for today</CardDescription>
            </CardHeader>
            <CardContent>
              {todaysMeetings.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No meetings scheduled for today</p>
              ) : (
                <div className="space-y-3">
                  {todaysMeetings.map((meeting) => (
                    <div key={meeting.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{meeting.title}</h4>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(meeting.status)}>
                            {meeting.status}
                          </Badge>
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          {meeting.attendee}
                        </span>
                        <span className="flex items-center">
                          {getTypeIcon(meeting.type)}
                          <span className="ml-1">{meeting.type}</span>
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {meeting.time} ({meeting.duration})
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Meetings</CardTitle>
              <CardDescription>Your scheduled meetings for the coming days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingMeetings.map((meeting) => (
                  <div key={meeting.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{meeting.title}</h4>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(meeting.status)}>
                          {meeting.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                      <span className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        {meeting.attendee}
                      </span>
                      <span className="flex items-center">
                        <CalendarIcon className="h-3 w-3 mr-1" />
                        {new Date(meeting.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {meeting.time}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{meeting.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MeetingScheduler;
