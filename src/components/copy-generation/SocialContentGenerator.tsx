
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Share2, Save, RefreshCw, Download } from "lucide-react";

interface SocialTemplate {
  id: number;
  platform: string;
  postType: string;
  caption: string;
  hashtags: string[];
  callToAction: string;
  engagement: string;
}

const SocialContentGenerator = () => {
  const [socialData, setSocialData] = useState({
    businessName: '',
    topic: '',
    platform: '',
    tone: '',
    targetAudience: '',
    goal: '',
    description: ''
  });
  
  const [templates, setTemplates] = useState<SocialTemplate[]>([]);
  const [loading, setLoading] = useState(false);

  const generateSocialContent = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const generatedTemplates: SocialTemplate[] = [
      {
        id: 1,
        platform: socialData.platform,
        postType: "Educational Post",
        caption: `💡 Quick tip for ${socialData.targetAudience}!\n\nStruggling with ${socialData.topic}? Here's what most people get wrong:\n\n❌ They try to do everything at once\n✅ Instead, focus on ONE thing first\n\nI learned this the hard way with ${socialData.businessName}. Once I focused on just the basics, everything changed.\n\nWhat's YOUR biggest challenge right now? Drop it in the comments! 👇`,
        hashtags: [`#${socialData.topic.replace(/\s+/g, '')}`, `#${socialData.businessName.replace(/\s+/g, '')}`, '#tips', '#business', '#growth'],
        callToAction: "Comment with your biggest challenge",
        engagement: "Question-based engagement to drive comments"
      },
      {
        id: 2,
        platform: socialData.platform,
        postType: "Behind the Scenes",
        caption: `Behind the scenes at ${socialData.businessName} 👀\n\nEveryone sees the success, but here's what really happens:\n\n🌅 5 AM: Planning the day\n☕ 6 AM: Coffee and strategy\n💻 7 AM: Deep work begins\n🎯 12 PM: Client calls\n📚 6 PM: Learning new skills\n\nIt's not glamorous, but it's real. Building something meaningful takes consistency, not perfection.\n\nWhat does YOUR daily routine look like?`,
        hashtags: [`#BehindTheScenes`, `#${socialData.businessName.replace(/\s+/g, '')}`, '#entrepreneurlife', '#reallife', '#hustle'],
        callToAction: "Share your daily routine",
        engagement: "Personal storytelling to build connection"
      },
      {
        id: 3,
        platform: socialData.platform,
        postType: "Value-First Post",
        caption: `🎯 The ${socialData.topic} mistake that's costing you results:\n\nMost ${socialData.targetAudience} think they need to [common misconception].\n\nBut here's the truth:\n\n👉 Step 1: [Actionable advice]\n👉 Step 2: [Specific tip]\n👉 Step 3: [Clear next step]\n\nTry this for just 7 days and watch what happens.\n\nSave this post for later! 💾`,
        hashtags: [`#${socialData.topic.replace(/\s+/g, '')}tips`, '#value', '#results', '#actionable', '#growth'],
        callToAction: "Save this post",
        engagement: "Actionable tips that provide immediate value"
      },
      {
        id: 4,
        platform: socialData.platform,
        postType: "Social Proof",
        caption: `🔥 RESULTS ALERT! 🔥\n\nJust got this message from one of our amazing ${socialData.targetAudience}:\n\n"I implemented what ${socialData.businessName} taught me about ${socialData.topic} and saw immediate results! This is exactly what I needed."\n\nThis is WHY we do what we do! 💪\n\nSeeing our community win never gets old.\n\nWho else is ready for their breakthrough moment? 🙋‍♀️`,
        hashtags: [`#${socialData.businessName.replace(/\s+/g, '')}results`, '#transformation', '#success', '#community', '#breakthrough'],
        callToAction: "Ready for your breakthrough?",
        engagement: "Social proof to build credibility and inspire action"
      },
      {
        id: 5,
        platform: socialData.platform,
        postType: "Inspirational Quote",
        caption: `"The ${socialData.topic} you want is on the other side of the work you're avoiding."\n\nRead that again. 👆\n\nI see so many talented ${socialData.targetAudience} who have everything they need to succeed... except the willingness to do the work.\n\nAt ${socialData.businessName}, we believe in taking action over perfection.\n\nWhat's ONE action you can take TODAY? 🚀`,
        hashtags: [`#motivation`, `#${socialData.topic.replace(/\s+/g, '')}`, '#action', '#mindset', '#success'],
        callToAction: "Share one action you'll take today",
        engagement: "Motivational content to inspire action"
      }
    ];
    
    setTemplates(generatedTemplates);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Social Content Information</CardTitle>
              <CardDescription>
                Create viral-worthy social media content with captions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  placeholder="Your business name"
                  value={socialData.businessName}
                  onChange={(e) => setSocialData({...socialData, businessName: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="topic">Topic/Theme</Label>
                <Input
                  id="topic"
                  placeholder="What's the main topic?"
                  value={socialData.topic}
                  onChange={(e) => setSocialData({...socialData, topic: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="platform">Platform</Label>
                <Select value={socialData.platform} onValueChange={(value) => setSocialData({...socialData, platform: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tone">Tone</Label>
                <Select value={socialData.tone} onValueChange={(value) => setSocialData({...socialData, tone: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="inspiring">Inspiring</SelectItem>
                    <SelectItem value="educational">Educational</SelectItem>
                    <SelectItem value="humorous">Humorous</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Input
                  id="targetAudience"
                  placeholder="e.g., Entrepreneurs, Coaches"
                  value={socialData.targetAudience}
                  onChange={(e) => setSocialData({...socialData, targetAudience: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Content Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what you want to communicate"
                  value={socialData.description}
                  onChange={(e) => setSocialData({...socialData, description: e.target.value})}
                />
              </div>
              
              <Button 
                onClick={generateSocialContent} 
                className="w-full" 
                disabled={loading}
                size="lg"
              >
                {loading ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Share2 className="h-4 w-4 mr-2" />
                )}
                Generate Social Content
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {templates.length > 0 && (
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Generated Social Content</h3>
            </div>
          )}
          
          {templates.map((template) => (
            <Card key={template.id} className="relative">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      Post {template.id}: {template.postType}
                      <Badge variant="secondary">{template.platform}</Badge>
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground mt-1">
                      {template.engagement}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Save className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 p-4 border rounded-lg bg-orange-50">
                  <div>
                    <Label className="text-sm font-medium">Caption:</Label>
                    <div className="bg-white p-3 rounded border mt-2">
                      <pre className="whitespace-pre-wrap text-sm">{template.caption}</pre>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Hashtags:</Label>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {template.hashtags.map((hashtag, index) => (
                        <Badge key={index} variant="outline" className="text-blue-600">
                          {hashtag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Call to Action:</Label>
                    <p className="font-medium text-orange-600 mt-1">{template.callToAction}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {templates.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Share2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Ready to Generate Social Content?</h3>
                <p className="text-muted-foreground mb-4">
                  Create viral-worthy social media content with complete captions
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialContentGenerator;
