
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Copy, Save, RefreshCw, Download } from "lucide-react";

interface AdTemplate {
  id: number;
  platform: string;
  approach: string;
  headline: string;
  body: string;
  cta: string;
  psychology: string;
}

const AdCopyGenerator = () => {
  const [adData, setAdData] = useState({
    businessName: '',
    product: '',
    targetAudience: '',
    platform: '',
    goal: '',
    budget: '',
    description: ''
  });
  
  const [templates, setTemplates] = useState<AdTemplate[]>([]);
  const [loading, setLoading] = useState(false);

  const generateAdTemplates = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const generatedTemplates: AdTemplate[] = [
      {
        id: 1,
        platform: adData.platform,
        approach: "Problem-Solution",
        headline: `Stop struggling with ${adData.product}!`,
        body: `${adData.businessName} helps ${adData.targetAudience} solve their biggest challenges with our proven ${adData.product} solution.`,
        cta: "Get Started Today",
        psychology: "Identifies pain points and offers immediate relief"
      },
      {
        id: 2,
        platform: adData.platform,
        approach: "Social Proof",
        headline: `Join 10,000+ ${adData.targetAudience} who trust ${adData.businessName}`,
        body: `See why industry leaders choose our ${adData.product} for guaranteed results. Don't miss out on what everyone's talking about.`,
        cta: "Join Now",
        psychology: "Uses social validation and FOMO to drive action"
      },
      {
        id: 3,
        platform: adData.platform,
        approach: "Urgency & Scarcity",
        headline: `Limited Time: ${adData.product} 50% Off`,
        body: `${adData.businessName} is offering exclusive savings for ${adData.targetAudience}. Only 48 hours left!`,
        cta: "Claim Your Discount",
        psychology: "Creates urgency through time-limited offers"
      },
      {
        id: 4,
        platform: adData.platform,
        approach: "Transformation",
        headline: `Transform your results with ${adData.businessName}`,
        body: `From frustrated ${adData.targetAudience} to success story. See how our ${adData.product} delivers real results.`,
        cta: "Start Your Transformation",
        psychology: "Focuses on before/after transformation"
      },
      {
        id: 5,
        platform: adData.platform,
        approach: "Authority & Trust",
        headline: `The #1 ${adData.product} trusted by experts`,
        body: `${adData.businessName} - the proven choice for ${adData.targetAudience} who demand excellence.`,
        cta: "See Why We're #1",
        psychology: "Establishes authority and credibility"
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
              <CardTitle>Ad Campaign Information</CardTitle>
              <CardDescription>
                Provide details about your ad campaign for personalized copy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  placeholder="Your business name"
                  value={adData.businessName}
                  onChange={(e) => setAdData({...adData, businessName: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="product">Product/Service</Label>
                <Input
                  id="product"
                  placeholder="What are you advertising?"
                  value={adData.product}
                  onChange={(e) => setAdData({...adData, product: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="platform">Platform</Label>
                <Select value={adData.platform} onValueChange={(value) => setAdData({...adData, platform: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="google">Google Ads</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Input
                  id="targetAudience"
                  placeholder="e.g., Small business owners, Parents"
                  value={adData.targetAudience}
                  onChange={(e) => setAdData({...adData, targetAudience: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Campaign Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your campaign goals and key messages"
                  value={adData.description}
                  onChange={(e) => setAdData({...adData, description: e.target.value})}
                />
              </div>
              
              <Button 
                onClick={generateAdTemplates} 
                className="w-full" 
                disabled={loading}
                size="lg"
              >
                {loading ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Copy className="h-4 w-4 mr-2" />
                )}
                Generate 5 Ad Templates
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {templates.length > 0 && (
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Generated Ad Copy Templates</h3>
            </div>
          )}
          
          {templates.map((template) => (
            <Card key={template.id} className="relative">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      Ad {template.id}: {template.approach}
                      <Badge variant="secondary">{template.platform}</Badge>
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground mt-1">
                      {template.psychology}
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
                    <p className="text-lg font-bold">{template.headline}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Body Copy:</Label>
                    <p className="text-muted-foreground">{template.body}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Call to Action:</Label>
                    <p className="font-medium text-blue-600">{template.cta}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {templates.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Copy className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Ready to Generate Ad Copy?</h3>
                <p className="text-muted-foreground mb-4">
                  Fill out your campaign information and generate 5 unique ad templates
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdCopyGenerator;
