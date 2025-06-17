
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Globe, 
  Calendar, 
  MessageSquare, 
  Image as ImageIcon, 
  Video, 
  TrendingUp,
  Users,
  Heart,
  Share,
  Zap
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SocialPost {
  id: string;
  content: string;
  platform: string;
  scheduledFor: string;
  status: 'scheduled' | 'published' | 'draft';
  engagement: {
    likes: number;
    shares: number;
    comments: number;
  };
}

const SocialMediaFactory = () => {
  const [posts, setPosts] = useState<SocialPost[]>([
    {
      id: '1',
      content: '🚀 Exciting news! Our new product launch is just around the corner. Stay tuned for something amazing! #innovation #startup',
      platform: 'Instagram',
      scheduledFor: '2024-01-15 10:00',
      status: 'scheduled',
      engagement: { likes: 0, shares: 0, comments: 0 }
    },
    {
      id: '2',
      content: 'Behind the scenes look at our team working hard to deliver exceptional results for our clients 💪 #teamwork #dedication',
      platform: 'LinkedIn',
      scheduledFor: '2024-01-14 14:30',
      status: 'published',
      engagement: { likes: 45, shares: 12, comments: 8 }
    }
  ]);

  const [contentForm, setContentForm] = useState({
    topic: '',
    platform: '',
    tone: '',
    includeHashtags: true,
    includeEmojis: true
  });

  const { toast } = useToast();

  const generateContent = () => {
    if (!contentForm.topic || !contentForm.platform) {
      toast({
        title: "Missing Information",
        description: "Please fill in topic and platform",
        variant: "destructive",
      });
      return;
    }

    // Simulate AI content generation
    const newPost: SocialPost = {
      id: Date.now().toString(),
      content: `AI-generated content about ${contentForm.topic} for ${contentForm.platform} in ${contentForm.tone} tone. This is optimized for maximum engagement! ${contentForm.includeHashtags ? '#marketing #AI #automation' : ''} ${contentForm.includeEmojis ? '🚀💡✨' : ''}`,
      platform: contentForm.platform,
      scheduledFor: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
      status: 'draft',
      engagement: { likes: 0, shares: 0, comments: 0 }
    };

    setPosts([newPost, ...posts]);
    
    toast({
      title: "Content Generated",
      description: "New social media content has been created!",
    });

    // Reset form
    setContentForm({
      topic: '',
      platform: '',
      tone: '',
      includeHashtags: true,
      includeEmojis: true
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500';
      case 'scheduled': return 'bg-blue-500';
      case 'draft': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getPlatformIcon = (platform: string) => {
    return <Globe className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="generate" className="space-y-6">
        <TabsList>
          <TabsTrigger value="generate">Content Generator</TabsTrigger>
          <TabsTrigger value="calendar">Content Calendar</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="generate">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>AI Content Generator</span>
                </CardTitle>
                <CardDescription>Generate engaging social media content automatically</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="topic">Content Topic</Label>
                  <Input
                    id="topic"
                    placeholder="e.g., Product launch, Company culture, Industry insights"
                    value={contentForm.topic}
                    onChange={(e) => setContentForm({...contentForm, topic: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="platform">Platform</Label>
                  <Select value={contentForm.platform} onValueChange={(value) => setContentForm({...contentForm, platform: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Instagram">Instagram</SelectItem>
                      <SelectItem value="Facebook">Facebook</SelectItem>
                      <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                      <SelectItem value="Twitter">Twitter</SelectItem>
                      <SelectItem value="TikTok">TikTok</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="tone">Content Tone</Label>
                  <Select value={contentForm.tone} onValueChange={(value) => setContentForm({...contentForm, tone: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="humorous">Humorous</SelectItem>
                      <SelectItem value="inspirational">Inspirational</SelectItem>
                      <SelectItem value="educational">Educational</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      checked={contentForm.includeHashtags}
                      onChange={(e) => setContentForm({...contentForm, includeHashtags: e.target.checked})}
                    />
                    <span className="text-sm">Include Hashtags</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      checked={contentForm.includeEmojis}
                      onChange={(e) => setContentForm({...contentForm, includeEmojis: e.target.checked})}
                    />
                    <span className="text-sm">Include Emojis</span>
                  </label>
                </div>

                <Button onClick={generateContent} className="w-full">
                  Generate Content
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Generated Content</CardTitle>
                <CardDescription>Your latest AI-generated posts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {posts.slice(0, 5).map((post) => (
                    <div key={post.id} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getPlatformIcon(post.platform)}
                          <span className="font-medium text-sm">{post.platform}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(post.status)}`} />
                          <span className="text-xs capitalize">{post.status}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{post.content}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Scheduled: {new Date(post.scheduledFor).toLocaleDateString()}</span>
                        {post.status === 'published' && (
                          <div className="flex space-x-3">
                            <span className="flex items-center space-x-1">
                              <Heart className="h-3 w-3" />
                              <span>{post.engagement.likes}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Share className="h-3 w-3" />
                              <span>{post.engagement.shares}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <MessageSquare className="h-3 w-3" />
                              <span>{post.engagement.comments}</span>
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Content Calendar</span>
              </CardTitle>
              <CardDescription>Schedule and manage your social media posts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Content Calendar View</h3>
                <p className="text-muted-foreground mb-4">
                  Visual calendar interface for content scheduling
                </p>
                <Button variant="outline">
                  View Calendar
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">847</p>
                    <p className="text-sm text-muted-foreground">Total Posts</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">12.5K</p>
                    <p className="text-sm text-muted-foreground">Total Engagement</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="text-2xl font-bold">4.2%</p>
                    <p className="text-sm text-muted-foreground">Avg Engagement Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SocialMediaFactory;
