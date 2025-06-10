
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, Send, Save, Eye, Copy, Plus, X } from 'lucide-react';

interface EmailTemplate {
  id: number;
  name: string;
  subject: string;
  content: string;
  delay: number;
  category: string;
}

interface SalesSequenceBuilderProps {
  onSaveSequence: (sequence: any) => void;
  onDeploySequence: (sequence: any) => void;
}

const SalesSequenceBuilder = ({ onSaveSequence, onDeploySequence }: SalesSequenceBuilderProps) => {
  const [sequenceName, setSequenceName] = useState('');
  const [selectedTemplates, setSelectedTemplates] = useState<EmailTemplate[]>([]);
  const [previewTemplate, setPreviewTemplate] = useState<EmailTemplate | null>(null);

  const emailTemplates: EmailTemplate[] = [
    {
      id: 1,
      name: 'Initial Outreach - Problem Focused',
      subject: 'Quick question about {{companyName}}\'s sales process',
      content: `Hi {{firstName}},

I noticed {{companyName}} has been growing rapidly in the {{industry}} space - congratulations on your recent success!

I'm reaching out because I've been working with similar companies who've been struggling with:
• Manual lead qualification taking up too much sales time
• Difficulty tracking prospect engagement across multiple touchpoints
• Low response rates on outreach campaigns

I'd love to share how companies like yours have solved these challenges and increased their qualified leads by 40% in just 90 days.

Would you be open to a 15-minute conversation this week?

Best regards,
[Your Name]`,
      delay: 0,
      category: 'Initial Outreach'
    },
    {
      id: 2,
      name: 'Follow-up - Value Proposition',
      subject: 'Re: {{companyName}}\'s sales efficiency',
      content: `Hi {{firstName}},

I wanted to follow up on my previous email about helping {{companyName}} streamline your sales process.

Just this month, I helped a {{industry}} company similar to yours:
✓ Reduce lead qualification time by 60%
✓ Increase email response rates by 3x
✓ Generate $500K in additional pipeline in 90 days

I have a few time slots open this week if you'd like to see exactly how this could work for {{companyName}}.

Are you available for a brief call on Tuesday or Wednesday?

Best,
[Your Name]`,
      delay: 3,
      category: 'Follow-up'
    },
    {
      id: 3,
      name: 'Social Proof - Case Study',
      subject: 'How [Similar Company] increased sales by 40%',
      content: `Hi {{firstName}},

I thought you might find this case study interesting.

[Similar Company], a {{industry}} business like {{companyName}}, was struggling with the same challenges many growing companies face:
- Sales team spending 70% of time on research instead of selling
- Inconsistent follow-up leading to lost opportunities
- Difficulty scaling their outreach efforts

In just 90 days, we helped them:
→ Automate their lead research process
→ Implement personalized outreach sequences
→ Increase qualified meetings by 40%

The CEO told me it was "the best investment we've made in our sales team."

I'd love to show you exactly how we did it. Are you free for a 15-minute call this week?

Best regards,
[Your Name]`,
      delay: 7,
      category: 'Social Proof'
    },
    {
      id: 4,
      name: 'Urgency - Limited Availability',
      subject: 'Last call - {{companyName}}',
      content: `Hi {{firstName}},

I've reached out a couple of times about helping {{companyName}} streamline your sales process, but haven't heard back.

I completely understand - I know how busy things can get when you're scaling a {{industry}} business.

I only take on 3 new clients per quarter, and I have one spot left for Q4. Given {{companyName}}'s growth trajectory, I think we could achieve some incredible results together.

If you're interested in learning more, I'm available for a quick call on Friday. After that, I'll likely be booked until next quarter.

No pressure at all - just wanted to give you the opportunity before I move on.

Best,
[Your Name]`,
      delay: 14,
      category: 'Urgency'
    },
    {
      id: 5,
      name: 'Breakup Email - Last Touch',
      subject: 'Closing the loop',
      content: `Hi {{firstName}},

I've reached out a few times about helping {{companyName}} optimize your sales process, but it seems like the timing isn't right.

No worries at all - I know these decisions take time and need to align with your priorities.

I'll stop reaching out for now, but if anything changes in the future, feel free to reach out. I'll be here.

In the meantime, I thought you might find this free resource helpful: [Link to valuable resource]

Wishing you and the {{companyName}} team continued success!

Best regards,
[Your Name]

P.S. If I've misunderstood and you are interested in discussing this, just reply to this email. I'd be happy to chat.`,
      delay: 21,
      category: 'Breakup'
    },
    {
      id: 6,
      name: 'Re-engagement - New Angle',
      subject: 'New approach for {{companyName}}',
      content: `Hi {{firstName}},

Hope you've been well! I know I reached out a few months ago about sales automation for {{companyName}}.

Since then, I've been working with several {{industry}} companies and discovered a new approach that's been getting incredible results - specifically for businesses in your space.

Instead of focusing just on automation, we're now helping companies like yours:
• Identify and prioritize high-value prospects using AI
• Create hyper-personalized outreach that feels genuinely human
• Build systems that scale without losing the personal touch

The results have been phenomenal - one client saw a 200% increase in qualified meetings in just 60 days.

Would you be interested in a brief overview of this new methodology? I think {{companyName}} could be a perfect fit.

Best,
[Your Name]`,
      delay: 90,
      category: 'Re-engagement'
    },
    {
      id: 7,
      name: 'LinkedIn Connection Follow-up',
      subject: 'Thanks for connecting on LinkedIn',
      content: `Hi {{firstName}},

Thanks for connecting with me on LinkedIn! I see you're leading sales at {{companyName}} - that's exciting work you're doing in the {{industry}} space.

I've been helping sales leaders like yourself build more predictable pipeline and scale their outreach without sacrificing personalization.

I'd love to learn more about {{companyName}}'s current sales process and see if there might be some opportunities to help you hit your targets more consistently.

Would you be open to a brief conversation? I have some time slots available this week.

Looking forward to connecting!

Best,
[Your Name]`,
      delay: 1,
      category: 'LinkedIn Follow-up'
    },
    {
      id: 8,
      name: 'Event Follow-up',
      subject: 'Great meeting you at [Event Name]',
      content: `Hi {{firstName}},

It was great meeting you at [Event Name] yesterday! I really enjoyed our conversation about the challenges {{companyName}} is facing with lead qualification.

As I mentioned, I've been helping {{industry}} companies solve exactly these types of issues. The approach I shared about using AI for prospect research has helped several companies reduce their sales cycle by 30%.

I'd love to continue our conversation and show you some specific examples of how this could work for {{companyName}}.

Are you available for a 20-minute call next week? I'm free Tuesday afternoon or Thursday morning.

Looking forward to speaking with you again!

Best regards,
[Your Name]`,
      delay: 1,
      category: 'Event Follow-up'
    },
    {
      id: 9,
      name: 'Referral Introduction',
      subject: '[Mutual Contact] suggested I reach out',
      content: `Hi {{firstName}},

[Mutual Contact] suggested I reach out to you. I've been working with them to help streamline their sales process, and they thought {{companyName}} might benefit from a similar approach.

I specialize in helping {{industry}} companies like yours:
• Reduce time spent on manual prospect research
• Increase response rates through better personalization
• Build scalable systems that maintain quality

[Mutual Contact] saw a 50% increase in qualified meetings after implementing our methodology.

Would you be interested in a brief conversation to explore how this might work for {{companyName}}? I could share some specific examples from [Mutual Contact]'s implementation.

Best,
[Your Name]`,
      delay: 0,
      category: 'Referral'
    },
    {
      id: 10,
      name: 'Content Sharing - Educational',
      subject: 'Thought this might interest you',
      content: `Hi {{firstName}},

I came across this article about sales automation trends in the {{industry}} industry and thought you might find it interesting given your role at {{companyName}}.

[Link to valuable article/resource]

The section about "scaling personalized outreach" particularly resonated with me, as it's something I've been helping companies like yours implement successfully.

If you find the article useful and want to discuss how some of these concepts might apply to {{companyName}}, I'd be happy to share some practical examples.

No agenda here - just thought you might enjoy the read!

Best,
[Your Name]`,
      delay: 0,
      category: 'Content Sharing'
    }
  ];

  const addTemplate = (template: EmailTemplate) => {
    if (!selectedTemplates.find(t => t.id === template.id)) {
      setSelectedTemplates([...selectedTemplates, template]);
    }
  };

  const removeTemplate = (templateId: number) => {
    setSelectedTemplates(selectedTemplates.filter(t => t.id !== templateId));
  };

  const copyTemplate = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const handleSaveSequence = () => {
    const sequence = {
      name: sequenceName,
      templates: selectedTemplates,
      totalEmails: selectedTemplates.length,
      duration: Math.max(...selectedTemplates.map(t => t.delay)) + 1
    };
    onSaveSequence(sequence);
  };

  const handleDeploySequence = () => {
    const sequence = {
      name: sequenceName,
      templates: selectedTemplates,
      totalEmails: selectedTemplates.length,
      duration: Math.max(...selectedTemplates.map(t => t.delay)) + 1
    };
    onDeploySequence(sequence);
  };

  const categories = [...new Set(emailTemplates.map(t => t.category))];

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Email Template Library */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>Email Templates</span>
              </CardTitle>
              <CardDescription>
                Choose from proven email templates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {categories.map((category) => (
                <div key={category} className="space-y-2">
                  <h4 className="font-medium text-sm">{category}</h4>
                  {emailTemplates.filter(t => t.category === category).map((template) => (
                    <Card key={template.id} className="p-3 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h5 className="font-medium text-sm">{template.name}</h5>
                          <Badge variant="outline" className="text-xs">
                            Day {template.delay}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {template.subject}
                        </p>
                        <div className="flex space-x-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setPreviewTemplate(template)}
                            className="text-xs h-6"
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => addTemplate(template)}
                            className="text-xs h-6"
                            disabled={selectedTemplates.some(t => t.id === template.id)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sequence Builder */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Build Your Sequence</CardTitle>
              <CardDescription>
                Create a multi-step email sequence for your prospects
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sequenceName">Sequence Name</Label>
                <Input
                  id="sequenceName"
                  placeholder="Enter sequence name"
                  value={sequenceName}
                  onChange={(e) => setSequenceName(e.target.value)}
                />
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Selected Templates ({selectedTemplates.length})</h4>
                {selectedTemplates.length === 0 && (
                  <div className="text-center py-8 border-2 border-dashed rounded-lg">
                    <MessageSquare className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">No templates selected</p>
                    <p className="text-sm text-muted-foreground">Choose templates from the library to build your sequence</p>
                  </div>
                )}
                
                {selectedTemplates
                  .sort((a, b) => a.delay - b.delay)
                  .map((template, index) => (
                    <Card key={template.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge variant="outline">Day {template.delay}</Badge>
                              <h5 className="font-medium">{template.name}</h5>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              <strong>Subject:</strong> {template.subject}
                            </p>
                            <p className="text-sm line-clamp-3">{template.content}</p>
                          </div>
                          <div className="flex space-x-1 ml-4">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setPreviewTemplate(template)}
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => copyTemplate(template.content)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => removeTemplate(template.id)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>

              {selectedTemplates.length > 0 && (
                <div className="flex space-x-4 pt-4">
                  <Button
                    onClick={handleSaveSequence}
                    disabled={!sequenceName || selectedTemplates.length === 0}
                    className="flex-1"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Sequence
                  </Button>
                  <Button
                    onClick={handleDeploySequence}
                    disabled={!sequenceName || selectedTemplates.length === 0}
                    variant="outline"
                    className="flex-1"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Deploy Sequence
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Template Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{previewTemplate.name}</CardTitle>
                <Button variant="outline" onClick={() => setPreviewTemplate(null)}>
                  Close
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Subject Line:</Label>
                <p className="text-lg font-medium">{previewTemplate.subject}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Email Content:</Label>
                <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                  {previewTemplate.content}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="outline">Day {previewTemplate.delay}</Badge>
                <Badge>{previewTemplate.category}</Badge>
              </div>
              <div className="flex space-x-4">
                <Button
                  onClick={() => {
                    addTemplate(previewTemplate);
                    setPreviewTemplate(null);
                  }}
                  disabled={selectedTemplates.some(t => t.id === previewTemplate.id)}
                  className="flex-1"
                >
                  Add to Sequence
                </Button>
                <Button
                  variant="outline"
                  onClick={() => copyTemplate(previewTemplate.content)}
                  className="flex-1"
                >
                  Copy Content
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SalesSequenceBuilder;
