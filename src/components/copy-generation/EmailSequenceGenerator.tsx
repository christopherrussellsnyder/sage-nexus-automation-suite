
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Mail, Save, RefreshCw, Download } from "lucide-react";

interface EmailTemplate {
  id: number;
  type: string;
  subject: string;
  body: string;
  purpose: string;
  day: number;
}

const EmailSequenceGenerator = () => {
  const [emailData, setEmailData] = useState({
    businessName: '',
    product: '',
    targetAudience: '',
    sequenceType: '',
    goal: '',
    description: ''
  });
  
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [loading, setLoading] = useState(false);

  const generateEmailSequence = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const generatedTemplates: EmailTemplate[] = [
      {
        id: 1,
        type: "Welcome Email",
        subject: `Welcome to ${emailData.businessName}! Here's what's next...`,
        body: `Hi there!\n\nWelcome to the ${emailData.businessName} family! We're thrilled to have you join our community of ${emailData.targetAudience}.\n\nHere's what you can expect:\n• Exclusive tips and insights\n• Early access to new features\n• Special member-only offers\n\nTo get started, check out our most popular resource: [Link]\n\nBest regards,\nThe ${emailData.businessName} Team`,
        purpose: "Sets expectations and provides immediate value",
        day: 1
      },
      {
        id: 2,
        type: "Value-First Email",
        subject: `Free Resource: The Ultimate ${emailData.product} Guide`,
        body: `Hi [Name],\n\nYesterday I promised you valuable insights, and I'm delivering!\n\nI've put together an exclusive guide that shows ${emailData.targetAudience} exactly how to maximize their results with ${emailData.product}.\n\nInside you'll discover:\n• 5 proven strategies that work\n• Common mistakes to avoid\n• Step-by-step implementation guide\n\nDownload your free copy here: [Link]\n\nTo your success,\n[Your Name]`,
        purpose: "Builds trust by providing free value",
        day: 3
      },
      {
        id: 3,
        type: "Social Proof Email",
        subject: `How [Customer Name] achieved amazing results`,
        body: `Hi [Name],\n\nI wanted to share an incredible success story from one of our ${emailData.targetAudience}.\n\nMeet [Customer Name]. Just 30 days ago, they were struggling with [problem]. Today? They've completely transformed their results using our ${emailData.product}.\n\nHere's what they said:\n"[Testimonial quote about amazing results]"\n\nThe best part? You can achieve similar results too.\n\nReady to get started? [Link]\n\nCheers,\n[Your Name]`,
        purpose: "Uses social proof to build credibility",
        day: 5
      },
      {
        id: 4,
        type: "Objection Handling Email",
        subject: `"But what if it doesn't work for me?"`,
        body: `Hi [Name],\n\nI get this question a lot from ${emailData.targetAudience}:\n\n"Your ${emailData.product} sounds great, but what if it doesn't work for MY specific situation?"\n\nIt's a fair concern. Here's the truth:\n\nOur ${emailData.product} is designed specifically for ${emailData.targetAudience} who face exactly the challenges you're dealing with.\n\nPlus, we offer a 60-day money-back guarantee because we're that confident in our results.\n\nStill have questions? Reply to this email and I'll personally help you.\n\nBest,\n[Your Name]`,
        purpose: "Addresses common concerns and objections",
        day: 7
      },
      {
        id: 5,
        type: "Urgency Email",
        subject: `Last chance: Special offer expires tonight`,
        body: `Hi [Name],\n\nThis is it - your final opportunity to join ${emailData.businessName} at our special introductory price.\n\nIn less than 12 hours, this offer expires and the price goes back to its regular amount.\n\nDon't let this opportunity slip away. Join the hundreds of ${emailData.targetAudience} who are already seeing incredible results.\n\nSecure your spot now: [Link]\n\nTime's running out!\n\n[Your Name]\n\nP.S. Remember, this comes with our 60-day guarantee. You have nothing to lose and everything to gain.`,
        purpose: "Creates urgency to drive immediate action",
        day: 10
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
              <CardTitle>Email Sequence Information</CardTitle>
              <CardDescription>
                Create a complete email sequence for your audience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  placeholder="Your business name"
                  value={emailData.businessName}
                  onChange={(e) => setEmailData({...emailData, businessName: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="product">Product/Service</Label>
                <Input
                  id="product"
                  placeholder="What are you promoting?"
                  value={emailData.product}
                  onChange={(e) => setEmailData({...emailData, product: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sequenceType">Sequence Type</Label>
                <Select value={emailData.sequenceType} onValueChange={(value) => setEmailData({...emailData, sequenceType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sequence type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="welcome">Welcome Series</SelectItem>
                    <SelectItem value="nurture">Nurture Sequence</SelectItem>
                    <SelectItem value="sales">Sales Sequence</SelectItem>
                    <SelectItem value="onboarding">Onboarding Series</SelectItem>
                    <SelectItem value="reengagement">Re-engagement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Input
                  id="targetAudience"
                  placeholder="e.g., Small business owners, Coaches"
                  value={emailData.targetAudience}
                  onChange={(e) => setEmailData({...emailData, targetAudience: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Sequence Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your email sequence goals"
                  value={emailData.description}
                  onChange={(e) => setEmailData({...emailData, description: e.target.value})}
                />
              </div>
              
              <Button 
                onClick={generateEmailSequence} 
                className="w-full" 
                disabled={loading}
                size="lg"
              >
                {loading ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Mail className="h-4 w-4 mr-2" />
                )}
                Generate Email Sequence
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {templates.length > 0 && (
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Generated Email Sequence</h3>
            </div>
          )}
          
          {templates.map((template) => (
            <Card key={template.id} className="relative">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      Day {template.day}: {template.type}
                      <Badge variant="secondary">{template.purpose}</Badge>
                    </CardTitle>
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
                <div className="space-y-3 p-4 border rounded-lg bg-purple-50">
                  <div>
                    <Label className="text-sm font-medium">Subject Line:</Label>
                    <p className="text-lg font-bold">{template.subject}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Email Body:</Label>
                    <div className="bg-white p-3 rounded border">
                      <pre className="whitespace-pre-wrap text-sm">{template.body}</pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {templates.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Mail className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Ready to Generate Email Sequence?</h3>
                <p className="text-muted-foreground mb-4">
                  Create a complete email sequence optimized for maximum engagement
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailSequenceGenerator;
