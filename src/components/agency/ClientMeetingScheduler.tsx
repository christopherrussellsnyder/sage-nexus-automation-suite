
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Video, 
  MapPin,
  Plus,
  Edit,
  Trash2,
  Phone,
  Coffee,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';
import { format } from 'date-fns';

interface ClientMeeting {
  id: string;
  clientName: string;
  company: string;
  title: string;
  type: 'discovery' | 'strategy' | 'review' | 'check-in' | 'presentation' | 'closure';
  format: 'in-person' | 'video-call' | 'phone-call';
  date: Date;
  duration: number; // minutes
  location?: string;
  meetingLink?: string;
  agenda: string;
  attendees: string[];
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  notes?: string;
  outcomes?: string[];
  followUpTasks?: string[];
}

const ClientMeetingScheduler = () => {
  const [meetings, setMeetings] = useState<ClientMeeting[]>([
    {
      id: '1',
      clientName: 'Sarah Johnson',
      company: 'TechStart Solutions',
      title: 'Q1 Strategy Review',
      type: 'review',
      format: 'video-call',
      date: new Date('2024-01-25T14:00:00'),
      duration: 60,
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      agenda: 'Review Q1 performance metrics, discuss Q2 strategy, and plan upcoming campaigns.',
      attendees: ['Sarah Johnson', 'Mark Thompson', 'You'],
      status: 'scheduled',
      notes: 'Prepare Q1 performance report and Q2 strategy deck'
    },
    {
      id: '2',
      clientName: 'Mike Chen',
      company: 'Growth Dynamics',
      title: 'Project Kickoff Meeting',
      type: 'discovery',
      format: 'video-call',
      date: new Date('2024-01-28T10:00:00'),
      duration: 90,
      meetingLink: 'https://zoom.us/j/123456789',
      agenda: 'Project overview, stakeholder introductions, timeline discussion, and requirements gathering.',
      attendees: ['Mike Chen', 'Lisa Park', 'David Kumar', 'You'],
      status: 'scheduled'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingMeeting, setEditingMeeting] = useState<ClientMeeting | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [formData, setFormData] = useState<Partial<ClientMeeting>>({
    clientName: '',
    company: '',
    title: '',
    type: 'discovery',
    format: 'video-call',
    date: new Date(),
    duration: 60,
    location: '',
    meetingLink: '',
    agenda: '',
    attendees: [],
    status: 'scheduled'
  });

  const meetingTypeColors = {
    'discovery': 'bg-blue-100 text-blue-800',
    'strategy': 'bg-purple-100 text-purple-800',
    'review': 'bg-green-100 text-green-800',
    'check-in': 'bg-yellow-100 text-yellow-800',
    'presentation': 'bg-orange-100 text-orange-800',
    'closure': 'bg-red-100 text-red-800'
  };

  const meetingTypeIcons = {
    'discovery': Coffee,
    'strategy': TrendingUp,
    'review': CheckCircle2,
    'check-in': Clock,
    'presentation': Video,
    'closure': CheckCircle2
  };

  const updateField = (field: keyof ClientMeeting, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingMeeting) {
      setMeetings(prev => prev.map(meeting => 
        meeting.id === editingMeeting.id 
          ? { ...meeting, ...formData }
          : meeting
      ));
      setEditingMeeting(null);
    } else {
      const newMeeting: ClientMeeting = {
        ...formData as ClientMeeting,
        id: Date.now().toString(),
        attendees: formData.attendees || []
      };
      setMeetings(prev => [...prev, newMeeting]);
    }
    
    setFormData({
      clientName: '',
      company: '',
      title: '',
      type: 'discovery',
      format: 'video-call',
      date: new Date(),
      duration: 60,
      location: '',
      meetingLink: '',
      agenda: '',
      attendees: [],
      status: 'scheduled'
    });
    setShowForm(false);
  };

  const handleEdit = (meeting: ClientMeeting) => {
    setEditingMeeting(meeting);
    setFormData(meeting);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setMeetings(prev => prev.filter(meeting => meeting.id !== id));
  };

  const handleStatusChange = (id: string, status: ClientMeeting['status']) => {
    setMeetings(prev => prev.map(meeting => 
      meeting.id === id ? { ...meeting, status } : meeting
    ));
  };

  const calculateStats = () => {
    const totalMeetings = meetings.length;
    const scheduledMeetings = meetings.filter(m => m.status === 'scheduled').length;
    const completedMeetings = meetings.filter(m => m.status === 'completed').length;
    const thisWeekMeetings = meetings.filter(m => {
      const now = new Date();
      const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
      const weekEnd = new Date(now.setDate(now.getDate() - now.getDay() + 6));
      return m.date >= weekStart && m.date <= weekEnd;
    }).length;

    return { totalMeetings, scheduledMeetings, completedMeetings, thisWeekMeetings };
  };

  const stats = calculateStats();

  const upcomingMeetings = meetings
    .filter(m => m.status === 'scheduled' && m.date > new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{stats.totalMeetings}</p>
                <p className="text-xs text-muted-foreground">Total Meetings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{stats.scheduledMeetings}</p>
                <p className="text-xs text-muted-foreground">Scheduled</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{stats.completedMeetings}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{stats.thisWeekMeetings}</p>
                <p className="text-xs text-muted-foreground">This Week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Client Meetings</h3>
          <p className="text-muted-foreground">Schedule and manage meetings with your clients</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Schedule Meeting
        </Button>
      </div>

      {/* Quick Overview */}
      {upcomingMeetings.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Meetings</CardTitle>
            <CardDescription>Your next client meetings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingMeetings.map((meeting) => {
                const Icon = meetingTypeIcons[meeting.type];
                return (
                  <div key={meeting.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{meeting.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {meeting.clientName} • {format(meeting.date, 'MMM dd, yyyy')} at {format(meeting.date, 'h:mm a')}
                        </p>
                      </div>
                    </div>
                    <Badge className={meetingTypeColors[meeting.type]}>
                      {meeting.type}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Meeting Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingMeeting ? 'Edit Meeting' : 'Schedule New Meeting'}</CardTitle>
            <CardDescription>
              {editingMeeting ? 'Update meeting details' : 'Schedule a meeting with your client'}
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
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => updateField('company', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Meeting Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => updateField('title', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Meeting Type *</Label>
                  <Select value={formData.type} onValueChange={(value) => updateField('type', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="discovery">Discovery Call</SelectItem>
                      <SelectItem value="strategy">Strategy Session</SelectItem>
                      <SelectItem value="review">Performance Review</SelectItem>
                      <SelectItem value="check-in">Regular Check-in</SelectItem>
                      <SelectItem value="presentation">Presentation</SelectItem>
                      <SelectItem value="closure">Project Closure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="format">Meeting Format *</Label>
                  <Select value={formData.format} onValueChange={(value) => updateField('format', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video-call">Video Call</SelectItem>
                      <SelectItem value="phone-call">Phone Call</SelectItem>
                      <SelectItem value="in-person">In Person</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={formData.duration}
                    onChange={(e) => updateField('duration', parseInt(e.target.value) || 60)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Date & Time *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.date ? format(formData.date, 'PPP') : 'Pick a date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.date}
                        onSelect={(date) => updateField('date', date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.date ? format(formData.date, 'HH:mm') : ''}
                    onChange={(e) => {
                      const [hours, minutes] = e.target.value.split(':');
                      const newDate = new Date(formData.date || new Date());
                      newDate.setHours(parseInt(hours), parseInt(minutes));
                      updateField('date', newDate);
                    }}
                  />
                </div>

                {formData.format === 'video-call' && (
                  <div className="space-y-2">
                    <Label htmlFor="meetingLink">Meeting Link</Label>
                    <Input
                      id="meetingLink"
                      value={formData.meetingLink}
                      onChange={(e) => updateField('meetingLink', e.target.value)}
                      placeholder="https://meet.google.com/..."
                    />
                  </div>
                )}

                {formData.format === 'in-person' && (
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => updateField('location', e.target.value)}
                      placeholder="123 Main St, City, State"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="agenda">Meeting Agenda</Label>
                <Textarea
                  id="agenda"
                  value={formData.agenda}
                  onChange={(e) => updateField('agenda', e.target.value)}
                  rows={3}
                  placeholder="What will you discuss in this meeting?"
                />
              </div>

              <div className="flex space-x-2">
                <Button type="submit">
                  {editingMeeting ? 'Update Meeting' : 'Schedule Meeting'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setShowForm(false);
                    setEditingMeeting(null);
                    setFormData({
                      clientName: '',
                      company: '',
                      title: '',
                      type: 'discovery',
                      format: 'video-call',
                      date: new Date(),
                      duration: 60,
                      location: '',
                      meetingLink: '',
                      agenda: '',
                      attendees: [],
                      status: 'scheduled'
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

      {/* Meetings List */}
      <div className="space-y-4">
        {meetings.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No meetings scheduled</h3>
              <p className="text-muted-foreground">Schedule your first client meeting to get started</p>
            </CardContent>
          </Card>
        ) : (
          meetings
            .sort((a, b) => b.date.getTime() - a.date.getTime())
            .map((meeting) => {
              const Icon = meetingTypeIcons[meeting.type];
              return (
                <Card key={meeting.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Icon className="h-5 w-5 text-muted-foreground" />
                          <h3 className="text-lg font-semibold">{meeting.title}</h3>
                          <Badge className={meetingTypeColors[meeting.type]}>
                            {meeting.type}
                          </Badge>
                          <Badge variant={meeting.status === 'scheduled' ? 'default' : 'secondary'}>
                            {meeting.status}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-1">
                          {meeting.clientName} • {meeting.company}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center space-x-1">
                            <CalendarIcon className="h-4 w-4" />
                            <span>{format(meeting.date, 'MMM dd, yyyy')}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{format(meeting.date, 'h:mm a')} ({meeting.duration} min)</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            {meeting.format === 'video-call' && <Video className="h-4 w-4" />}
                            {meeting.format === 'phone-call' && <Phone className="h-4 w-4" />}
                            {meeting.format === 'in-person' && <MapPin className="h-4 w-4" />}
                            <span className="capitalize">{meeting.format.replace('-', ' ')}</span>
                          </div>
                        </div>
                        {meeting.agenda && (
                          <p className="text-sm bg-gray-50 p-2 rounded">{meeting.agenda}</p>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {meeting.status === 'scheduled' && (
                          <>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleStatusChange(meeting.id, 'completed')}
                            >
                              Mark Complete
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleEdit(meeting)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        <Button size="sm" variant="outline" onClick={() => handleDelete(meeting.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Meeting Link or Location */}
                    {meeting.meetingLink && (
                      <div className="flex items-center space-x-2 mb-2">
                        <Video className="h-4 w-4 text-blue-600" />
                        <a 
                          href={meeting.meetingLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm"
                        >
                          Join Meeting
                        </a>
                      </div>
                    )}

                    {meeting.location && (
                      <div className="flex items-center space-x-2 mb-2">
                        <MapPin className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{meeting.location}</span>
                      </div>
                    )}

                    {/* Attendees */}
                    {meeting.attendees.length > 0 && (
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Attendees: {meeting.attendees.join(', ')}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })
        )}
      </div>
    </div>
  );
};

export default ClientMeetingScheduler;
