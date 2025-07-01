
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Clock, User, Building, Trash2, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface Meeting {
  id: string;
  title: string;
  contactName: string;
  businessName: string;
  date: Date;
  time: string;
  duration: string;
  notes: string;
  type: 'sales' | 'demo' | 'follow-up' | 'discovery' | 'closing';
  status: 'scheduled' | 'completed' | 'cancelled';
}

const MeetingScheduler = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [isScheduling, setIsScheduling] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    contactName: '',
    businessName: '',
    time: '',
    duration: '60',
    notes: '',
    type: 'sales'
  });
  const { toast } = useToast();

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  const durations = ['30', '45', '60', '90', '120'];

  const isTimeSlotAvailable = (date: Date, time: string) => {
    return !meetings.some(meeting => 
      meeting.date.toDateString() === date.toDateString() && 
      meeting.time === time &&
      meeting.status === 'scheduled'
    );
  };

  const handleScheduleMeeting = () => {
    if (!selectedDate || !newMeeting.title || !newMeeting.contactName || !newMeeting.businessName || !newMeeting.time) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (!isTimeSlotAvailable(selectedDate, newMeeting.time)) {
      toast({
        title: "Time Conflict",
        description: "This time slot is already booked. Please choose another time.",
        variant: "destructive",
      });
      return;
    }

    const meeting: Meeting = {
      id: Date.now().toString(),
      title: newMeeting.title,
      contactName: newMeeting.contactName,
      businessName: newMeeting.businessName,
      date: selectedDate,
      time: newMeeting.time,
      duration: newMeeting.duration,
      notes: newMeeting.notes,
      type: newMeeting.type as Meeting['type'],
      status: 'scheduled'
    };

    setMeetings([...meetings, meeting].sort((a, b) => 
      new Date(a.date.toDateString() + ' ' + a.time).getTime() - 
      new Date(b.date.toDateString() + ' ' + b.time).getTime()
    ));

    setNewMeeting({
      title: '',
      contactName: '',
      businessName: '',
      time: '',
      duration: '60',
      notes: '',
      type: 'sales'
    });
    setSelectedDate(undefined);
    setIsScheduling(false);

    toast({
      title: "Meeting Scheduled",
      description: `Meeting with ${meeting.contactName} scheduled for ${format(meeting.date, 'MMM dd, yyyy')} at ${meeting.time}`,
    });
  };

  const handleDeleteMeeting = (meetingId: string) => {
    setMeetings(meetings.filter(meeting => meeting.id !== meetingId));
    toast({
      title: "Meeting Deleted",
      description: "Meeting has been removed from your calendar",
    });
  };

  const handleUpdateMeetingStatus = (meetingId: string, status: Meeting['status']) => {
    setMeetings(meetings.map(meeting => 
      meeting.id === meetingId ? { ...meeting, status } : meeting
    ));
    toast({
      title: "Meeting Updated",
      description: `Meeting status changed to ${status}`,
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'sales': return 'bg-blue-500';
      case 'demo': return 'bg-green-500';
      case 'follow-up': return 'bg-yellow-500';
      case 'discovery': return 'bg-purple-500';
      case 'closing': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'text-blue-600';
      case 'completed': return 'text-green-600';
      case 'cancelled': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const upcomingMeetings = meetings.filter(meeting => 
    meeting.status === 'scheduled' && 
    new Date(meeting.date.toDateString() + ' ' + meeting.time) >= new Date()
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5" />
                <span>Meeting Scheduler</span>
              </CardTitle>
              <CardDescription>Schedule and manage your sales meetings</CardDescription>
            </div>
            <Dialog open={isScheduling} onOpenChange={setIsScheduling}>
              <DialogTrigger asChild>
                <Button>
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Schedule Meeting
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Schedule New Meeting</DialogTitle>
                  <DialogDescription>
                    Add a new meeting to your calendar
                  </DialogDescription>
                </DialogHeader>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Meeting Title *</Label>
                      <Input
                        id="title"
                        value={newMeeting.title}
                        onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })}
                        placeholder="Sales Discovery Call"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactName">Contact Name *</Label>
                      <Input
                        id="contactName"
                        value={newMeeting.contactName}
                        onChange={(e) => setNewMeeting({ ...newMeeting, contactName: e.target.value })}
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <Label htmlFor="businessName">Business Name *</Label>
                      <Input
                        id="businessName"
                        value={newMeeting.businessName}
                        onChange={(e) => setNewMeeting({ ...newMeeting, businessName: e.target.value })}
                        placeholder="TechCorp Inc"
                      />
                    </div>
                    <div>
                      <Label htmlFor="type">Meeting Type</Label>
                      <Select value={newMeeting.type} onValueChange={(value) => setNewMeeting({ ...newMeeting, type: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sales">Sales Call</SelectItem>
                          <SelectItem value="demo">Product Demo</SelectItem>
                          <SelectItem value="follow-up">Follow-up</SelectItem>
                          <SelectItem value="discovery">Discovery Call</SelectItem>
                          <SelectItem value="closing">Closing Call</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="time">Time *</Label>
                        <Select value={newMeeting.time} onValueChange={(value) => setNewMeeting({ ...newMeeting, time: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem 
                                key={time} 
                                value={time}
                                disabled={selectedDate ? !isTimeSlotAvailable(selectedDate, time) : false}
                              >
                                {time} {selectedDate && !isTimeSlotAvailable(selectedDate, time) ? '(Booked)' : ''}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="duration">Duration (min)</Label>
                        <Select value={newMeeting.duration} onValueChange={(value) => setNewMeeting({ ...newMeeting, duration: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {durations.map((duration) => (
                              <SelectItem key={duration} value={duration}>
                                {duration} min
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
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
                  </div>
                  <div>
                    <Label>Select Date *</Label>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                      className="rounded-md border"
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleScheduleMeeting} className="flex-1">Schedule Meeting</Button>
                  <Button variant="outline" onClick={() => setIsScheduling(false)}>Cancel</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Upcoming Meetings */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Upcoming Meetings</h3>
              {upcomingMeetings.length === 0 ? (
                <div className="text-center py-8 border rounded-lg">
                  <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No upcoming meetings scheduled</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {upcomingMeetings.slice(0, 5).map((meeting) => (
                    <Card key={meeting.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge className={`${getTypeColor(meeting.type)} text-white`}>
                                {meeting.type}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {format(meeting.date, 'MMM dd, yyyy')} at {meeting.time}
                              </span>
                            </div>
                            <h4 className="font-medium">{meeting.title}</h4>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                              <div className="flex items-center space-x-1">
                                <User className="h-3 w-3" />
                                <span>{meeting.contactName}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Building className="h-3 w-3" />
                                <span>{meeting.businessName}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>{meeting.duration} min</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-1">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleUpdateMeetingStatus(meeting.id, 'completed')}
                            >
                              Complete
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleDeleteMeeting(meeting.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* All Meetings */}
            <div>
              <h3 className="text-lg font-semibold mb-4">All Meetings</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {meetings.length === 0 ? (
                  <div className="text-center py-8 border rounded-lg">
                    <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No meetings scheduled yet</p>
                  </div>
                ) : (
                  meetings.map((meeting) => (
                    <div key={meeting.id} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <Badge variant="outline" className={`${getTypeColor(meeting.type)} text-white`}>
                              {meeting.type}
                            </Badge>
                            <span className={`text-sm font-medium ${getStatusColor(meeting.status)}`}>
                              {meeting.status}
                            </span>
                          </div>
                          <h4 className="font-medium text-sm">{meeting.title}</h4>
                          <p className="text-xs text-muted-foreground">
                            {meeting.contactName} • {meeting.businessName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {format(meeting.date, 'MMM dd, yyyy')} at {meeting.time}
                          </p>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDeleteMeeting(meeting.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MeetingScheduler;
