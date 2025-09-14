
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
// Usage tracking hook removed - database not configured
import { Globe, Save, RefreshCw, Download } from "lucide-react";

interface WebsiteSection {
  id: number;
  section: string;
  headline: string;
  subheadline?: string;
  body: string;
  cta?: string;
  purpose: string;
}

const WebsiteCopyGenerator = () => {
  const [websiteData, setWebsiteData] = useState({
    businessName: '',
    industry: '',
    targetAudience: '',
    mainService: '',
    uniqueValue: '',
    goals: '',
    tone: 'professional'
  });
  
  const [sections, setSections] = useState<WebsiteSection[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Usage tracking disabled
  const canUseFeature = () => true;
  const incrementUsage = async () => true;

  const generateWebsiteCopy = async () => {
    if (!canUseFeature()) return;
    
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const generatedSections: WebsiteSection[] = [
      {
        id: 1,
        section: "Hero Section",
        headline: `Transform Your Business with ${websiteData.businessName}`,
        subheadline: `The leading ${websiteData.industry} solution trusted by ${websiteData.targetAudience}`,
        body: `${websiteData.businessName} helps ${websiteData.targetAudience} achieve their goals through our innovative ${websiteData.mainService}. Join thousands of satisfied customers who have transformed their business with our proven solutions.`,
        cta: "Get Started Today",
        purpose: "Capture attention and communicate primary value proposition"
      },
      {
        id: 2,
        section: "About Section",
        headline: "Why Choose Us?",
        body: `At ${websiteData.businessName}, we understand the challenges facing ${websiteData.targetAudience} in today's competitive ${websiteData.industry} landscape. Our team of experts has developed ${websiteData.mainService} that delivers real results. ${websiteData.uniqueValue}`,
        purpose: "Build credibility and explain unique advantages"
      },
      {
        id: 3,
        section: "Services Section",
        headline: "Our Services",
        body: `We offer comprehensive ${websiteData.mainService} designed specifically for ${websiteData.targetAudience}. Our proven methodology has helped businesses across the ${websiteData.industry} industry achieve measurable success.`,
        purpose: "Detail service offerings and benefits"
      },
      {
        id: 4,
        section: "CTA Section",
        headline: "Ready to Get Started?",
        body: `Join the hundreds of ${websiteData.targetAudience} who have already transformed their business with ${websiteData.businessName}. Take the first step toward achieving your goals today.`,
        cta: "Start Your Transformation",
        purpose: "Drive conversions with compelling call-to-action"
      }
    ];
    
    await incrementUsage();
    setSections(generatedSections);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Website Information</CardTitle>
              <CardDescription>
                Tell us about your business for personalized website copy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  placeholder="Your business name"
                  value={websiteData.businessName}
                  onChange={(e) => setWebsiteData({...websiteData, businessName: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  placeholder="e.g., Technology, Healthcare, Finance"
                  value={websiteData.industry}
                  onChange={(e) => setWebsiteData({...websiteData, industry: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Input
                  id="targetAudience"
                  placeholder="e.g., Small business owners, Entrepreneurs"
                  value={websiteData.targetAudience}
                  onChange={(e) => setWebsiteData({...websiteData, targetAudience: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mainService">Main Service/Product</Label>
                <Input
                  id="mainService"
                  placeholder="What do you offer?"
                  value={websiteData.mainService}
                  onChange={(e) => setWebsiteData({...websiteData, mainService: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="uniqueValue">Unique Value Proposition</Label>
                <Textarea
                  id="uniqueValue"
                  placeholder="What makes you different?"
                  value={websiteData.uniqueValue}
                  onChange={(e) => setWebsiteData({...websiteData, uniqueValue: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tone">Tone of Voice</Label>
                <Select value={websiteData.tone} onValueChange={(value) => setWebsiteData({...websiteData, tone: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="authoritative">Authoritative</SelectItem>
                    <SelectItem value="conversational">Conversational</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                onClick={generateWebsiteCopy} 
                className="w-full" 
                disabled={loading || !canUseFeature()}
                size="lg"
              >
                {loading ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Globe className="h-4 w-4 mr-2" />
                )}
                Generate Website Copy
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {sections.length > 0 && (
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Generated Website Sections</h3>
            </div>
          )}
          
          {sections.map((section) => (
            <Card key={section.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {section.section}
                      <Badge variant="secondary">{section.section.toLowerCase().replace(' ', '-')}</Badge>
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground mt-1">
                      {section.purpose}
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
                <div className="space-y-3 p-4 border rounded-lg bg-blue-50">
                  <div>
                    <Label className="text-sm font-medium">Headline:</Label>
                    <p className="text-lg font-bold">{section.headline}</p>
                  </div>
                  {section.subheadline && (
                    <div>
                      <Label className="text-sm font-medium">Subheadline:</Label>
                      <p className="text-muted-foreground">{section.subheadline}</p>
                    </div>
                  )}
                  <div>
                    <Label className="text-sm font-medium">Body Copy:</Label>
                    <p className="text-muted-foreground">{section.body}</p>
                  </div>
                  {section.cta && (
                    <div>
                      <Label className="text-sm font-medium">Call to Action:</Label>
                      <p className="font-medium text-blue-600">{section.cta}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
          
          {sections.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Globe className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Ready to Generate Website Copy?</h3>
                <p className="text-muted-foreground mb-4">
                  Fill out your business information and generate professional website copy with section-by-section breakdowns
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebsiteCopyGenerator;
