import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { Mail, Edit3, Copy, Download } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface EmailTemplate {
  type: string;
  subject: string;
  personalGreeting: string;
  hookOpening: string;
  mainContent: string;
  bulletPoints: string[];
  socialProof: string;
  cta: string;
  personalSignoff: string;
  signature: string;
  purpose: string;
  industry: string;
}

interface EmailTemplatesProps {
  data: any;
  businessType: string | null;
}

const EmailTemplates = ({ data, businessType }: EmailTemplatesProps) => {
  const { toast } = useToast();
  const [selectedEmailType, setSelectedEmailType] = useState<string>('personalized-outreach');
  const [editingTemplate, setEditingTemplate] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<string>('');

  // Email types based on user requirements
  const emailTypes = [
    'personalized-outreach',
    'content-marketing',
    'event-driven',
    'reengagement-retention',
    'social-proof-trust',
    'lead-nurturing'
  ];

  const getEmailTemplates = (): EmailTemplate[] => {
    const clientDetails = data.formData?.clientDetails || {};
    const businessData = data.formData || {};
    const industry = clientDetails.industry || businessData.industry || 'general';
    
    return [
      {
        type: 'personalized-outreach',
        subject: `Quick question about ${clientDetails.businessName || '[Client Business]'}'s email marketing`,
        personalGreeting: `Hi ${clientDetails.contactName || '[Client Name]'},`,
        hookOpening: `I noticed ${clientDetails.businessName || '[Client Business]'} has been growing in the ${industry} space, and I'm curious about your current email marketing approach.`,
        mainContent: `Many ${industry} businesses I work with struggle with low open rates and conversions from their email campaigns. I recently helped a similar company increase their email revenue by 340% in just 90 days.\n\nThe key was implementing a strategic sequence that speaks directly to ${clientDetails.targetAudience || '[target audience]'}'s pain points while building genuine trust.\n\nI'd love to share some insights specific to your industry that could help ${clientDetails.businessName || '[Client Business]'} achieve similar results.`,
        bulletPoints: [
          'Industry-specific email strategies that convert',
          'Subject line formulas that boost open rates',
          'Segmentation tactics for higher engagement'
        ],
        socialProof: `Recent client testimonial: "Working with [Your Name] transformed our email marketing. We went from 12% open rates to 38% in two months." - CEO, ${industry} Company`,
        cta: 'Would you be open to a brief 15-minute call this week to discuss your current email challenges?',
        personalSignoff: 'Best regards,',
        signature: '[Your Name]\n[Your Title]\n[Your Contact Information]',
        purpose: 'Initial outreach to potential clients',
        industry: industry
      },
      {
        type: 'content-marketing',
        subject: `${industry} Email Marketing Insights: Boost Your Revenue This Quarter`,
        personalGreeting: 'Hello [Subscriber Name],',
        hookOpening: `Are you leaving money on the table with your current email marketing strategy?`,
        mainContent: `Most ${industry} businesses are missing out on 30-40% of potential email revenue because they're using generic templates instead of psychology-driven copy.\n\nToday, I'm sharing three proven strategies that have generated over $2M in email revenue for my clients:\n\nStrategy #1: The "Problem-Agitation-Solution" framework that turns subscribers into buyers\nStrategy #2: Personalization tactics that go beyond first names\nStrategy #3: The perfect email sequence length for maximum conversions`,
        bulletPoints: [
          'Increase email open rates by 25%+',
          'Boost click-through rates by 40%+',
          'Generate more revenue per subscriber'
        ],
        socialProof: 'These strategies have been tested across 50+ campaigns with an average ROI of 4,200%.',
        cta: 'Download the complete Email Marketing Blueprint (FREE for the next 48 hours)',
        personalSignoff: 'To your success,',
        signature: '[Your Name]\nEmail Marketing Specialist\n[Website]',
        purpose: 'Value-driven content to nurture leads',
        industry: industry
      },
      {
        type: 'event-driven',
        subject: `${clientDetails.businessName || '[Client Business]'} - Time-Sensitive Opportunity`,
        personalGreeting: `Hi ${clientDetails.contactName || '[Client Name]'},`,
        hookOpening: 'I have some exciting news that could significantly impact your Q4 revenue.',
        mainContent: `I just finalized my availability for Q4, and I have one spot remaining for a new email marketing project.\n\nGiven the holiday season approaching, this is the perfect time to implement a high-converting email sequence that could increase your revenue by 50-100% during the busiest shopping period.\n\nLast year, I helped [Similar Client] generate an additional $125,000 in revenue during Q4 with a strategic email campaign.`,
        bulletPoints: [
          'Holiday-specific email sequences',
          'Urgency-driven copywriting',
          'Customer retention strategies'
        ],
        socialProof: 'Previous Q4 campaigns averaged 28% higher conversion rates than regular campaigns.',
        cta: 'I need to confirm this spot by Friday. Are you available for a brief call to discuss your Q4 goals?',
        personalSignoff: 'Limited spots available,',
        signature: '[Your Name]\n[Contact Information]',
        purpose: 'Creating urgency for time-sensitive opportunities',
        industry: industry
      },
      {
        type: 'reengagement-retention',
        subject: 'We miss you at [Your Business Name]...',
        personalGreeting: 'Hey [Client Name],',
        hookOpening: `It's been a while since we last connected, and I wanted to reach out personally.`,
        mainContent: `I understand that business priorities shift, and email marketing might have taken a backseat to other initiatives.\n\nBut I also know that you invested in email marketing because you recognized its potential to drive significant revenue for ${clientDetails.businessName || '[Client Business]'}.\n\nI'd love to understand what's changed and see if there's a way I can help you achieve your original goals with a fresh approach.`,
        bulletPoints: [
          'No long-term commitments required',
          'Flexible project-based work',
          'Results-focused approach'
        ],
        socialProof: 'I recently helped a client who had been inactive for 8 months achieve a 45% increase in email revenue within 60 days.',
        cta: 'Would you be open to a quick 10-minute conversation to explore if there\'s a fit for working together again?',
        personalSignoff: 'Looking forward to reconnecting,',
        signature: '[Your Name]',
        purpose: 'Re-engaging past clients or inactive prospects',
        industry: industry
      },
      {
        type: 'social-proof-trust',
        subject: 'How [Similar Company] Increased Email Revenue by 340%',
        personalGreeting: `Hi ${clientDetails.contactName || '[Name]'},`,
        hookOpening: 'I thought you\'d be interested in this case study from a company similar to yours.',
        mainContent: `[Client Company], a ${industry} business with similar challenges to ${clientDetails.businessName || '[Your Business]'}, was struggling with low email engagement and declining sales.\n\nIn just 90 days, we implemented a strategic email marketing overhaul that resulted in:\n\n• 340% increase in email-driven revenue\n• 67% improvement in open rates\n• 89% boost in click-through rates\n• 156% increase in customer lifetime value`,
        bulletPoints: [
          'Strategic sequence development',
          'A/B tested subject lines and content',
          'Advanced segmentation strategies'
        ],
        socialProof: `"The results speak for themselves. Our email marketing went from being an afterthought to our primary revenue driver." - CEO, [Client Company]`,
        cta: 'I\'d love to show you the exact strategies we used. Are you available for a brief call this week?',
        personalSignoff: 'Excited to share these insights,',
        signature: '[Your Name]\nEmail Marketing Strategist',
        purpose: 'Building credibility through proven results',
        industry: industry
      },
      {
        type: 'lead-nurturing',
        subject: `Day 3: The #1 Mistake Killing Your Email Conversions`,
        personalGreeting: 'Hi [Subscriber],',
        hookOpening: `Yesterday, I shared the importance of email segmentation. Today, let's talk about the biggest conversion killer I see in 80% of email campaigns.`,
        mainContent: `The mistake? Generic, feature-focused copy that doesn't address your subscriber's specific situation.\n\nYour audience doesn't care about your features. They care about outcomes and transformations.\n\nInstead of saying "Our email platform has advanced automation," try "Imagine waking up to $5,000 in sales that happened while you slept."\n\nThis shift in messaging can increase your email conversions by 200-300%.`,
        bulletPoints: [
          'Focus on outcomes, not features',
          'Use story-driven content',
          'Address specific pain points'
        ],
        socialProof: 'This strategy alone helped one client increase their email conversion rate from 2.1% to 6.8%.',
        cta: 'Tomorrow, I\'ll share the exact email template that generates $50K+ per month. Stay tuned!',
        personalSignoff: 'Your copy coach,',
        signature: '[Your Name]',
        purpose: 'Educating and warming up prospects over time',
        industry: industry
      }
    ];
  };

  const templates = getEmailTemplates();
  const currentTemplate = templates.find(t => t.type === selectedEmailType) || templates[0];

  const handleCopyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied to clipboard",
      description: "Email template has been copied to your clipboard.",
    });
  };

  const handleEdit = (field: string, currentContent: string) => {
    setEditingTemplate(field);
    setEditedContent(currentContent);
  };

  const handleSaveEdit = () => {
    // Here you would typically save to a backend or state management
    toast({
      title: "Template updated",
      description: "Your changes have been saved.",
    });
    setEditingTemplate(null);
    setEditedContent('');
  };

  const getEmailTypeName = (type: string) => {
    const names = {
      'personalized-outreach': 'Personalized Outreach',
      'content-marketing': 'Content Marketing',
      'event-driven': 'Event Driven',
      'reengagement-retention': 'Re-engagement & Retention',
      'social-proof-trust': 'Social Proof & Trust Building',
      'lead-nurturing': 'Lead Nurturing'
    };
    return names[type] || type;
  };

  const formatFullEmail = (template: EmailTemplate) => {
    return `Subject: ${template.subject}

${template.personalGreeting}

${template.hookOpening}

${template.mainContent}

Key Benefits:
${template.bulletPoints.map(point => `• ${point}`).join('\n')}

${template.socialProof}

${template.cta}

${template.personalSignoff}
${template.signature}`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>AI-Generated Email Templates</span>
          </CardTitle>
          <CardDescription>
            Customized email templates for copywriting business based on client information and industry best practices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <Label htmlFor="emailType">Email Type:</Label>
            <Select value={selectedEmailType} onValueChange={setSelectedEmailType}>
              <SelectTrigger className="w-[300px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {emailTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {getEmailTypeName(type)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Template Components */}
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Purpose</Label>
                <p className="text-sm text-muted-foreground bg-blue-50 p-2 rounded">{currentTemplate.purpose}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Subject Line</Label>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit('subject', currentTemplate.subject)}>
                    <Edit3 className="h-3 w-3" />
                  </Button>
                </div>
                {editingTemplate === 'subject' ? (
                  <div className="space-y-2">
                    <Textarea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      rows={2}
                    />
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={handleSaveEdit}>Save</Button>
                      <Button size="sm" variant="outline" onClick={() => setEditingTemplate(null)}>Cancel</Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm bg-gray-50 p-3 rounded border">{currentTemplate.subject}</p>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Personal Greeting</Label>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit('greeting', currentTemplate.personalGreeting)}>
                    <Edit3 className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-sm bg-gray-50 p-3 rounded border">{currentTemplate.personalGreeting}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Hook/Opening Statement</Label>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit('hook', currentTemplate.hookOpening)}>
                    <Edit3 className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-sm bg-yellow-50 p-3 rounded border border-yellow-200">{currentTemplate.hookOpening}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Main Content</Label>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit('content', currentTemplate.mainContent)}>
                    <Edit3 className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-sm bg-gray-50 p-3 rounded border whitespace-pre-line">{currentTemplate.mainContent}</p>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">Key Benefits/Bullet Points</Label>
                <div className="space-y-1">
                  {currentTemplate.bulletPoints.map((point, index) => (
                    <div key={index} className="flex items-start space-x-2 text-sm bg-green-50 p-2 rounded border border-green-200">
                      <span className="text-green-600 font-bold">•</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Template Continuation */}
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Social Proof/Credibility</Label>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit('social', currentTemplate.socialProof)}>
                    <Edit3 className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-sm bg-purple-50 p-3 rounded border border-purple-200">{currentTemplate.socialProof}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Call-to-Action</Label>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit('cta', currentTemplate.cta)}>
                    <Edit3 className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-sm bg-red-50 p-3 rounded border border-red-200 font-medium">{currentTemplate.cta}</p>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">Personal Sign-off & Signature</Label>
                <div className="bg-gray-50 p-3 rounded border">
                  <p className="text-sm">{currentTemplate.personalSignoff}</p>
                  <p className="text-sm whitespace-pre-line mt-2">{currentTemplate.signature}</p>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">Complete Email Preview</Label>
                <div className="bg-white border rounded-lg p-4 max-h-60 overflow-y-auto">
                  <pre className="text-xs whitespace-pre-wrap font-sans">{formatFullEmail(currentTemplate)}</pre>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button 
                  onClick={() => handleCopyToClipboard(formatFullEmail(currentTemplate))}
                  className="flex-1"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Complete Email
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export All
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-700">
              <strong>💡 Pro Tip:</strong> These templates are generated based on your client information and industry best practices. 
              Customize the placeholder text with specific details about your client's business for maximum effectiveness.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailTemplates;