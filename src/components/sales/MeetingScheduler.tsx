
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Plus, User, Phone, Video, MapPin, Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Meeting {
  id: string;
  title: string;
  attendee: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  duration: number;
  type: 'call' | 'video' | 'in-person';
  location: string;
  notes: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  reminder: boolean;
}

interface MeetingSchedulerProps {
  onBack: () => void;
}

const MeetingScheduler = ({ onBack }: MeetingSchedulerProps) => {
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    attendee: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    duration: 60,
    type: 'video' as 'call' | 'video' | 'in-person',
    location: '',
    notes: '',
    reminder: true
  });
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: '1',
      title: 'Discovery Call - Acme Corp',
      attendee: 'John Smith',
      email: 'john@acme.com',
      phone: '+1 (555) 123-4567',
      date: '2024-01-20',
      time: '10:00',
      duration: 60,
      type: 'video',
      location: 'Zoom',
      notes: 'Initial discovery call to discuss project requirements',
      status: 'scheduled',
      reminder: true
    },
    {
      id: '2',
      title: 'Proposal Review - TechStart',
      attendee: 'Sarah Johnson',
      email: 'sarah@techstart.com',
      phone: '+1 (555) 987-6543',
      date: '2024-01-18',
      time: '14:00',
      duration: 45,
      type: 'call',
      location: 'Phone',
      notes: 'Review proposal and discuss next steps',
      status: 'completed',
      reminder: false
    }
  ]);
  const { toast } = useToast();

  const handleScheduleMeeting = () => {
    if (!newMeeting.title || !newMeeting.attendee || !newMeeting.email || !newMeeting.date || !newMeeting.time) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const meeting: Meeting = {
      id: Date.now().toString(),
      ...newMeeting,
      status: 'scheduled'
    };

    setMeetings(prev => [...prev, meeting]);
    setNewMeeting({
      title: '',
      attendee: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      duration: 60,
      type: 'video',
      location: '',
      notes: '',
      reminder: true
    });
    setShowScheduleDialog(false);

    toast({
      title: "Meeting Scheduled",
      description: `Meeting with ${meeting.attendee} has been scheduled for ${meeting.date} at ${meeting.time}`,
    });
  };

  const handleSetReminder = (meetingId: string) => {
    setMeetings(prev => prev.map(meeting => 
      meeting.id === meetingId 
        ? { ...meeting, reminder: !meeting.reminder }
        : meeting
    ));
    
    const meeting = meetings.find(m => m.id === meetingId);
    toast({
      title: "Reminder Updated",
      description: `Reminder ${meeting?.reminder ? 'disabled' : 'enabled'} for ${meeting?.title}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'call': return <Phone className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'in-person': return <MapPin className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const upcomingMeetings = meetings.filter(m => m.status === 'scheduled');
  const completedMeetings = meetings.filter(m => m.status === 'completed');

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
            Schedule and manage your client meetings and calls
          </p>
        </div>
        <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Schedule Meeting
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Schedule New Meeting</DialogTitle>
              <DialogDescription>
                Schedule a meeting with a client or prospect
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Meeting Title *</Label>
                <Input
                  id="title"
                  value={newMeeting.title}
                  onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })}
                  placeholder="Discovery Call - Client Name"
                />
              </div>
              <div>
                <Label htmlFor="attendee">Attendee Name *</Label>
                <Input
                  id="attendee"
                  value={newMeeting.attendee}
                  onChange={(e) => setNewMeeting({ ...newMeeting, attendee: e.target.value })}
                  placeholder="John Smith"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newMeeting.email}
                  onChange={(e) => setNewMeeting({ ...newMeeting, email: e.target.value })}
                  placeholder="john@company.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newMeeting.phone}
                  onChange={(e) => setNewMeeting({ ...newMeeting, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newMeeting.date}
                    onChange={(e) => setNewMeeting({ ...newMeeting, date: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newMeeting.time}
                    onChange={(e) => setNewMeeting({ ...newMeeting, time: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Select value={newMeeting.duration.toString()} onValueChange={(value) => setNewMeeting({ ...newMeeting, duration: parseInt(value) })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="90">1.5 hours</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="type">Meeting Type</Label>
                  <Select value={newMeeting.type} onValueChange={(value: 'call' | 'video' | 'in-person') => setNewMeeting({ ...newMeeting, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">Video Call</SelectItem>
                      <SelectItem value="call">Phone Call</SelectItem>
                      <SelectItem value="in-person">In Person</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="location">Location/Platform</Label>
                <Input
                  id="location"
                  value={newMeeting.location}
                  onChange={(e) => setNewMeeting({ ...newMeeting, location: e.target.value })}
                  placeholder="Zoom, Google Meet, Office, etc."
                />
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={newMeeting.notes}
                  onChange={(e) => setNewMeeting({ ...newMeeting, notes: e.target.value })}
                  placeholder="Meeting agenda, preparation notes..."
                  rows={3}
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="reminder"
                  checked={newMeeting.reminder}
                  onChange={(e) => setNewMeeting({ ...newMeeting, reminder: e.target.checked })}
                />
                <Label htmlFor="reminder">Set reminder</Label>
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleScheduleMeeting} className="flex-1">Schedule Meeting</Button>
                <Button variant="outline" onClick={() => setShowScheduleDialog(false)}>Cancel</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-500" />
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
              <Clock className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{completedMeetings.length}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Video className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">{meetings.filter(m => m.type === 'video').length}</p>
                <p className="text-sm text-muted-foreground">Video Calls</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{meetings.filter(m => m.reminder).length}</p>
                <p className="text-sm text-muted-foreground">With Reminders</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Meetings */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Meetings</CardTitle>
          <CardDescription>Your scheduled meetings and calls</CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingMeetings.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No upcoming meetings</h3>
              <p className="text-muted-foreground">Schedule your first meeting to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingMeetings.map((meeting) => (
                <div key={meeting.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        {getTypeIcon(meeting.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold">{meeting.title}</h3>
                        <p className="text-sm text-muted-foreground">{meeting.attendee}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-muted-foreground flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(meeting.date).toLocaleDateString()}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {meeting.time} ({meeting.duration}min)
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {meeting.location || meeting.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge className={getStatusColor(meeting.status)}>
                        {meeting.status}
                      </Badge>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleSetReminder(meeting.id)}
                        >
                          <Bell className={`h-3 w-3 ${meeting.reminder ? 'text-orange-500' : ''}`} />
                        </Button>
                      </div>
                    </div>
                  </div>
                  {meeting.notes && (
                    <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
                      <strong>Notes:</strong> {meeting.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Meetings */}
      {completedMeetings.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Meetings</CardTitle>
            <CardDescription>Your completed meetings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {completedMeetings.map((meeting) => (
                <div key={meeting.id} className="border rounded-lg p-4 opacity-75">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        {getTypeIcon(meeting.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold">{meeting.title}</h3>
                        <p className="text-sm text-muted-foreground">{meeting.attendee}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-muted-foreground flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(meeting.date).toLocaleDateString()}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {meeting.time} ({meeting.duration}min)
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge className={getStatusColor(meeting.status)}>
                      {meeting.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MeetingScheduler;
