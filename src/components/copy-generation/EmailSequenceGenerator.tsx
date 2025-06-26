import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Mail, Save, RefreshCw, Download, Lightbulb } from "lucide-react";

interface EmailTemplate {
  id: number;
  type: string;
  subject: string;
  body: string;
  purpose: string;
  day: number;
  solutionFocus: string;
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
        type: "Welcome & Solution Introduction",
        subject: `Welcome! Here's the solution to your ${emailData.targetAudience} challenges`,
        body: `Hi there!\n\nWelcome to the ${emailData.businessName} family!\n\nI know you're here because you're facing the same challenges most ${emailData.targetAudience} struggle with daily.\n\nThe frustration of [specific problem]...\nThe stress of [related challenge]...\nThe overwhelm of [industry-specific issue]...\n\nI've been there. That's exactly why I created the solution you're about to discover.\n\nOver the next few days, I'll show you how our solution has helped thousands of ${emailData.targetAudience} transform their results.\n\nHere's what you can expect:\n• Real solutions to your biggest challenges\n• Proven strategies that actually work\n• Success stories from people just like you\n\nYour transformation starts now.\n\nTo your success,\nThe ${emailData.businessName} Team\n\nP.S. Check your inbox tomorrow for the first solution...`,
        purpose: "Introduces the solution concept and sets transformation expectations",
        day: 1,
        solutionFocus: "Positions the business as a solution provider, not a product seller"
      },
      {
        id: 2,
        type: "Problem Amplification & Solution Preview",
        subject: `The hidden cost of NOT solving your ${emailData.product} challenge`,
        body: `Hi [Name],\n\nLet me ask you something...\n\nWhat's the real cost of continuing to struggle with [specific problem] for another 6 months?\n\nI'm not talking about money (though that's part of it).\n\nI'm talking about:\n• The stress and frustration that keeps you up at night\n• The opportunities you'll miss while competitors move ahead\n• The confidence that erodes with each failed attempt\n• The relationships that suffer when work overwhelms life\n\nHere's the truth: Most ${emailData.targetAudience} try to solve this with [common wrong solution].\n\nBut that approach misses the real problem entirely.\n\nThe REAL solution is [solution concept] - and I'll show you exactly how it works.\n\nTomorrow, I'll share the exact case study of how [Customer Name] solved this challenge in just 30 days.\n\nStay tuned,\n[Your Name]\n\nP.S. This solution costs less than what you're losing by not fixing this problem.`,
        purpose: "Amplifies the pain while previewing the solution approach",
        day: 3,
        solutionFocus: "Focuses on the cost of NOT having the solution rather than selling the product"
      },
      {
        id: 3,
        type: "Solution Success Story",
        subject: `How [Customer Name] solved their ${emailData.product} problem (case study)`,
        body: `Hi [Name],\n\nI want to share Sarah's story with you.\n\nSarah is a ${emailData.targetAudience} who was struggling with exactly what you're facing.\n\nFor months, she tried everything:\n❌ [Common solution attempt 1]\n❌ [Common solution attempt 2]\n❌ [Common solution attempt 3]\n\nNothing worked. Sound familiar?\n\nThen Sarah discovered our solution approach.\n\nWithin 30 days:\n✅ [Specific result 1]\n✅ [Specific result 2]\n✅ [Specific result 3]\n\nHere's what Sarah said:\n\n"I couldn't believe how simple the solution was once I understood the real problem. This didn't just fix my immediate challenge - it transformed how I approach my entire business."\n\nThe difference? Sarah stopped trying to patch the symptoms and started addressing the root cause.\n\nOur solution doesn't just fix the problem - it prevents it from happening again.\n\nWant to see exactly how Sarah did it?\n\n[View Full Case Study]\n\nTalk soon,\n[Your Name]\n\nP.S. Sarah's results aren't unique. We have hundreds of similar stories.`,
        purpose: "Demonstrates the solution in action through social proof",
        day: 5,
        solutionFocus: "Shows transformation through solution implementation, not product features"
      },
      {
        id: 4,
        type: "Solution Objection Handling",
        subject: `"But what if your solution doesn't work for MY situation?"`,
        body: `Hi [Name],\n\nI get this question a lot:\n\n"Your solution sounds great, but what if my situation is different? What if it doesn't work for me?"\n\nI understand the concern. You've probably been burned before.\n\nHere's the truth:\n\nOur solution works because it addresses the fundamental challenge that ALL ${emailData.targetAudience} face - regardless of their specific situation.\n\nWhether you're:\n• Just starting out or been in business for years\n• Working with a small budget or large investment\n• In [niche 1] or [niche 2]\n\nThe core problem remains the same. And so does the solution.\n\nBut don't take my word for it...\n\nHere are results from ${emailData.targetAudience} in different situations:\n\n[Testimonial 1 - Beginner]\n[Testimonial 2 - Experienced]\n[Testimonial 3 - Different niche]\n\nPlus, we're so confident our solution will work for you that we offer a 60-day money-back guarantee.\n\nIf you don't see results, you get every penny back. No questions asked.\n\nWhy can we do this? Because we've seen this solution work hundreds of times.\n\nReady to make this your success story?\n\n[Get Your Solution]\n\nTo your success,\n[Your Name]`,
        purpose: "Addresses solution doubts and reduces perceived risk",
        day: 7,
        solutionFocus: "Emphasizes solution universality and risk-free trial"
      },
      {
        id: 5,
        type: "Final Solution Call",
        subject: `Last chance: Don't let another month pass without this solution`,
        body: `Hi [Name],\n\nThis is it.\n\nIn a few hours, this opportunity closes.\n\nI don't want you to wake up next month, still struggling with the same challenges, wishing you had taken action today.\n\nHere's what you get when you implement our solution:\n\n✅ The exact framework that's solved this problem for 500+ ${emailData.targetAudience}\n✅ Step-by-step implementation guide\n✅ Direct access to our support team\n✅ 60-day money-back guarantee\n✅ [Bonus solutions]\n\nBut more importantly, here's what you STOP dealing with:\n\n❌ The daily frustration of [problem]\n❌ The stress of [related issue]\n❌ The lost opportunities while you struggle\n❌ The feeling that you're behind your competition\n\nThe solution is here. The guarantee removes all risk.\n\nThe only question is: Will you implement it?\n\n[Get Your Solution Now]\n\nDon't let another month pass.\n\nYour solution is waiting,\n[Your Name]\n\nP.S. Remember, if this doesn't solve your problem, you get every penny back. There's literally no risk - except the risk of doing nothing.`,
        purpose: "Creates urgency while reinforcing solution benefits",
        day: 10,
        solutionFocus: "Final emphasis on solution outcomes and transformation"
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
              <CardTitle>Solution-Focused Email Sequence</CardTitle>
              <CardDescription>
                Create emails that sell solutions, not products
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
              
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5" />
                  <div className="text-xs text-blue-800">
                    <p className="font-medium">Solution-Focused Approach:</p>
                    <p>These emails focus on selling the solution and transformation, not the product itself. People buy outcomes, not features.</p>
                  </div>
                </div>
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
                Generate Solution-Focused Sequence
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
                    <div className="mt-2">
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        <Lightbulb className="h-3 w-3 mr-1" />
                        {template.solutionFocus}
                      </Badge>
                    </div>
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
                <h3 className="text-lg font-semibold mb-2">Ready to Generate Solution-Focused Emails?</h3>
                <p className="text-muted-foreground mb-4">
                  Create email sequences that sell transformations, not products
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
