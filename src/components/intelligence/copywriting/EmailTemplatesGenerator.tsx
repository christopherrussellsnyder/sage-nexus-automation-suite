
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Edit, Copy, Check } from 'lucide-react';

interface EmailTemplate {
  type: string;
  subject: string;
  content: string;
  description: string;
}

interface EmailTemplatesGeneratorProps {
  data: any;
  clientInfo?: any;
}

const EmailTemplatesGenerator = ({ data, clientInfo }: EmailTemplatesGeneratorProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);

  const emailTypes = [
    {
      type: 'Personalized Outreach',
      description: 'Cold outreach emails for new prospects',
      subject: `${data?.businessName || 'Your Business'} - Solution for ${clientInfo?.industry || 'Your Industry'}`
    },
    {
      type: 'Content Marketing Emails',
      description: 'Value-driven educational content',
      subject: 'Insider Tips: How to 10x Your Results This Quarter'
    },
    {
      type: 'Event Driven Emails',
      description: 'Time-sensitive promotional emails',
      subject: 'Last Chance: Exclusive Offer Expires Tonight'
    },
    {
      type: 'Re-Engagement and Retention Emails',
      description: 'Win-back campaigns for inactive subscribers',
      subject: 'We Miss You - Here\'s 50% Off to Come Back'
    },
    {
      type: 'Social Proof and Trust Building Emails',
      description: 'Testimonial and case study emails',
      subject: 'How [Client Name] Achieved 300% Growth in 90 Days'
    },
    {
      type: 'Lead Nurturing Emails',
      description: 'Educational sequence for prospects',
      subject: 'Step 1: The Foundation of Successful [Industry] Growth'
    }
  ];

  const generateEmailContent = (type: string) => {
    const templates = {
      'Personalized Outreach': `Hi [First Name],

I noticed that ${clientInfo?.businessName || 'your company'} is working in the ${clientInfo?.industry || 'industry'} space, and I thought you might find this interesting.

Most ${clientInfo?.industry || 'businesses'} struggle with ${clientInfo?.challenges || 'converting leads into paying customers'}. What if I told you there's a simple framework that can increase your conversion rates by 40-60% in the next 30 days?

Here's what one of my recent clients achieved:
• Increased email open rates by 85%
• Boosted conversion rates from 2.1% to 3.8%
• Generated an additional $47,000 in revenue last month

[Social Proof Element: "Sarah from TechCorp saw similar results in just 3 weeks"]

Would you be interested in a 15-minute conversation to see how this could work for ${clientInfo?.businessName || 'your business'}?

Best regards,
${data?.businessName || 'Your Name'}
${data?.title || 'Professional Copywriter'}`,

      'Content Marketing Emails': `Subject: The #1 Mistake Killing Your ${clientInfo?.industry || 'Business'} Growth

Hi [First Name],

After working with 50+ ${clientInfo?.industry || 'businesses'} over the past year, I've noticed a pattern that's costing owners thousands in lost revenue.

The mistake? Focusing on features instead of transformations.

Here's what I mean:
• Bad: "Our software has 47 features"
• Good: "Save 10 hours per week on manual tasks"
• Bad: "Premium quality materials"
• Good: "Lasts 3x longer than competitors"

[Case Study: How changing just 3 headlines increased client revenue by $23,000]

The psychology behind this is simple: People don't buy products, they buy better versions of themselves.

[Click here to download my "Feature-to-Benefit Conversion Framework"]

Talk soon,
${data?.businessName || 'Your Name'}`,

      'Event Driven Emails': `Subject: ⏰ ENDING TONIGHT: Your 48-Hour Window Closes

Hi [First Name],

This is it - your last chance to get in.

At midnight tonight, I'm closing the doors on my ${clientInfo?.industry || 'Business'} Conversion Blueprint program.

Here's what happens after midnight:
❌ Price goes from $297 to $497
❌ 1-on-1 strategy call bonus disappears
❌ 67 limited spots are gone until next quarter

[URGENT: Only 12 spots remaining]

But here's the thing - this isn't just about the discount.

My clients typically see results like:
• Jessica increased her email list by 340% in 60 days
• Mike generated $18,000 in new revenue in his first month
• Sarah boosted her conversion rate from 1.2% to 4.7%

[Click here to secure your spot before midnight]

Don't let this opportunity slip away.

${data?.businessName || 'Your Name'}
P.S. I won't be offering this price again until 2024.`,

      'Re-Engagement and Retention Emails': `Subject: Did I do something wrong?

Hi [First Name],

I noticed you haven't opened my emails in a while, and I'm wondering if I did something to upset you.

Maybe my content isn't hitting the mark anymore?
Maybe you're too busy with other priorities?
Or maybe my emails are ending up in your spam folder?

[If you want to keep receiving valuable ${clientInfo?.industry || 'business'} insights, click here]

But if you'd rather not hear from me anymore, I totally understand. You can unsubscribe below with no hard feelings.

Before you go though, I wanted to share something special...

I just finished a case study showing how one business owner increased their revenue by 156% using a simple 3-step framework. It's only available to my most engaged subscribers.

[Get exclusive access to the 156% growth case study]

If this resonates with where you want to take your business, I'd love to continue sharing insights with you.

Best,
${data?.businessName || 'Your Name'}`,

      'Social Proof and Trust Building Emails': `Subject: How ${clientInfo?.businessName || 'TechCorp'} 3x'd Their Revenue in 90 Days

Hi [First Name],

I want to share an incredible success story from one of my recent clients.

${clientInfo?.businessName || 'TechCorp'} came to me with a problem you might relate to: They had great ${clientInfo?.productService || 'products'} but were struggling to communicate their value effectively.

Their sales pages were converting at just 1.2%.
Their emails had a 14% open rate.
Their revenue had plateaued for 8 months.

Here's what we changed:

✅ Rewrote their homepage using the "Problem-Agitation-Solution" framework
✅ Created a 7-email nurture sequence focused on transformation
✅ Developed social proof campaigns showcasing real results

The results after 90 days:
• Conversion rate: 1.2% → 3.8% (216% increase)
• Email open rate: 14% → 31% (121% increase)  
• Monthly revenue: $28,000 → $87,000 (211% increase)

[Read the full case study with screenshots and templates]

"${data?.businessName || 'The copywriter'} completely transformed how we communicate with our customers. The ROI was incredible." - CEO, ${clientInfo?.businessName || 'TechCorp'}

Want to see if we can achieve similar results for your business?

[Schedule a 15-minute strategy call]

Best,
${data?.businessName || 'Your Name'}`,

      'Lead Nurturing Emails': `Subject: Foundation Step 1: The ${clientInfo?.industry || 'Business'} Growth Framework

Hi [First Name],

Welcome to the ${clientInfo?.industry || 'Business'} Growth Masterclass series!

Over the next 7 days, I'm going to share the exact framework that's helped my clients generate over $2.3M in additional revenue.

Today we start with the foundation: The 3-Pillar Growth System.

Most ${clientInfo?.industry || 'business'} owners focus on tactics (social media, ads, content) without understanding the underlying strategy. That's why they stay stuck.

The 3 pillars are:
1. MESSAGE: What you say to attract ideal customers
2. MARKET: Who you're saying it to  
3. MEDIUM: Where you're saying it

[Pillar 1 Deep-Dive: The "Message-Market Match" Framework]

Here's what Sarah from ${clientInfo?.industry || 'RetailCorp'} said after implementing just Pillar 1:

"Within 2 weeks of fixing our message, our conversion rate doubled. We went from 2.1% to 4.3% overnight."

Tomorrow, I'll show you how to identify your perfect market using my "Customer Avatar Blueprint."

[Download today's worksheet: Message Clarity Exercise]

Talk tomorrow,
${data?.businessName || 'Your Name'}

P.S. Don't miss tomorrow's email - it contains the #1 mistake that kills conversions.`
    };

    return templates[type] || 'Template content will be generated here...';
  };

  const handleEditTemplate = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setEditedContent(template.content);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (selectedTemplate) {
      setSelectedTemplate({
        ...selectedTemplate,
        content: editedContent
      });
    }
    setIsEditing(false);
  };

  const handleCopyTemplate = (content: string, type: string) => {
    navigator.clipboard.writeText(content);
    setCopiedTemplate(type);
    setTimeout(() => setCopiedTemplate(null), 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>Email Templates Library</span>
          </CardTitle>
          <CardDescription>
            Industry-optimized email templates for {clientInfo?.industry || 'your client\'s industry'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {emailTypes.map((emailType) => {
              const template: EmailTemplate = {
                type: emailType.type,
                subject: emailType.subject,
                content: generateEmailContent(emailType.type),
                description: emailType.description
              };

              return (
                <Card key={emailType.type} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">{emailType.type}</CardTitle>
                    <CardDescription className="text-xs">
                      {emailType.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      <div>
                        <Label className="text-xs text-muted-foreground">Subject Line:</Label>
                        <p className="text-sm font-medium">{emailType.subject}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditTemplate(template)}
                          className="flex-1"
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCopyTemplate(template.content, template.type)}
                        >
                          {copiedTemplate === template.type ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Edit Template Modal */}
      {isEditing && selectedTemplate && (
        <Card>
          <CardHeader>
            <CardTitle>Edit Template: {selectedTemplate.type}</CardTitle>
            <CardDescription>
              Customize this template for your specific needs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="subject">Subject Line</Label>
              <Input
                id="subject"
                value={selectedTemplate.subject}
                onChange={(e) => setSelectedTemplate({
                  ...selectedTemplate,
                  subject: e.target.value
                })}
              />
            </div>
            <div>
              <Label htmlFor="content">Email Content</Label>
              <Textarea
                id="content"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                rows={15}
                className="font-mono text-sm"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveEdit}>
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EmailTemplatesGenerator;
