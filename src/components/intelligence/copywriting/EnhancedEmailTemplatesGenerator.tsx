import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Edit, Copy, Check, Download, Sparkles } from 'lucide-react';

interface EmailTemplate {
  type: string;
  subject: string;
  content: string;
  description: string;
  category: 'lead-generation' | 'client-service';
}

interface EnhancedEmailTemplatesGeneratorProps {
  data: any;
  clientInfo?: any;
}

const EnhancedEmailTemplatesGenerator = ({ data, clientInfo }: EnhancedEmailTemplatesGeneratorProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);

  const emailTypes = [
    // Lead Generation Templates for User
    {
      type: 'Personalized Outreach',
      category: 'lead-generation',
      description: 'Cold outreach emails for new prospects to grow your copywriting business',
      subject: `Transform Your ${clientInfo?.industry || 'Business'} Copy Into Sales Machines`
    },
    {
      type: 'Content Marketing Emails',
      category: 'lead-generation', 
      description: 'Value-driven educational content to attract copywriting clients',
      subject: 'The #1 Copy Mistake Costing You $10K+ Per Month'
    },
    {
      type: 'Event Driven Emails',
      category: 'lead-generation',
      description: 'Time-sensitive promotional emails for your copywriting services',
      subject: 'Last Chance: Free Copy Audit Ends Tonight'
    },
    {
      type: 'Re-Engagement and Retention Emails',
      category: 'lead-generation',
      description: 'Win-back campaigns for inactive prospects in your list',
      subject: 'Did Your Copy Stop Converting? Here\'s Why...'
    },
    {
      type: 'Social Proof and Trust Building Emails',
      category: 'lead-generation',
      description: 'Case study and testimonial emails to build credibility',
      subject: 'How I Helped [Client] Increase Sales by 340% With Better Copy'
    },
    {
      type: 'Lead Nurturing Emails',
      category: 'lead-generation',
      description: 'Educational sequence to convert prospects into clients',
      subject: 'Copywriting Mastery: Lesson 1 - Psychology That Sells'
    },
    // Client Service Templates
    {
      type: 'Client Personalized Outreach',
      category: 'client-service',
      description: 'Outreach templates for your clients\' campaigns',
      subject: `${clientInfo?.businessName || 'Your Brand'} - Exclusive Solution for ${clientInfo?.targetAudience || 'You'}`
    },
    {
      type: 'Client Content Marketing',
      category: 'client-service',
      description: 'Educational content for your clients\' audiences',
      subject: `Insider Secrets: How to 10x Your ${clientInfo?.industry || 'Business'} Results`
    },
    {
      type: 'Client Event Driven',
      category: 'client-service',
      description: 'Promotional campaigns for your clients\' offers',
      subject: 'ENDING SOON: Exclusive Access to [Client Offer]'
    },
    {
      type: 'Client Re-Engagement',
      category: 'client-service',
      description: 'Win-back sequences for your clients\' inactive subscribers',
      subject: 'We Miss You - Special Offer Inside'
    },
    {
      type: 'Client Social Proof',
      category: 'client-service',
      description: 'Social proof campaigns for your clients',
      subject: 'Real Results: How [Customer] Achieved [Specific Outcome]'
    },
    {
      type: 'Client Lead Nurturing',
      category: 'client-service',
      description: 'Educational sequences for your clients\' leads',
      subject: 'Step 1: The Foundation of [Desired Outcome]'
    }
  ];

  const generateEmailContent = (type: string, category: string) => {
    const isLeadGeneration = category === 'lead-generation';
    const businessName = data?.businessName || 'Your Copywriting Business';
    const clientBusinessName = clientInfo?.businessName || 'Your Client';
    const industry = clientInfo?.industry || 'your industry';
    
    if (isLeadGeneration) {
      // Templates for copywriter to generate leads
      const leadGenTemplates = {
        'Personalized Outreach': `Subject: Transform Your ${industry} Copy Into Sales Machines

Hi [First Name],

I noticed that ${clientBusinessName} is doing great work in the ${industry} space, but I had a question about your marketing copy...

Are you getting the conversions you want from your current sales pages and emails?

Most ${industry} businesses I work with are losing 60-80% of potential sales due to weak copy that doesn't connect with their audience.

Here's what one of my recent ${industry} clients achieved after I rewrote their sales funnel:
• Email open rates increased from 18% to 42%
• Landing page conversions jumped from 2.1% to 7.8% 
• Monthly revenue grew by $73,000 in just 90 days

[Social Proof: "Working with ${businessName} was the best investment we made this year." - Sarah, TechCorp CEO]

I specialize in helping ${industry} companies like yours turn browsers into buyers with psychology-driven copy that actually converts.

Would you be interested in a quick 15-minute call to see how we could increase your conversions?

Best regards,
${businessName}
Professional Copywriter & Conversion Specialist`,

        'Content Marketing Emails': `Subject: The #1 Copy Mistake Costing You $10K+ Per Month

Hi [First Name],

After analyzing 200+ ${industry} websites over the past year, I've discovered a pattern that's costing business owners thousands in lost revenue.

The mistake? Writing copy that talks about features instead of transformations.

Here's what I mean:

❌ "Our premium software includes 47 advanced features"
✅ "Save 15 hours per week on manual tasks while increasing accuracy by 94%"

❌ "High-quality materials and expert craftsmanship" 
✅ "Lasts 3x longer than competitors, saving you $2,400 in replacement costs"

The psychology is simple: People don't buy products - they buy better versions of themselves.

[Case Study: How changing just 3 headlines increased client revenue by $47,000]

I've created a free "Feature-to-Benefit Conversion Framework" that shows you exactly how to transform any feature into a compelling benefit that drives sales.

[Download the free framework here]

This framework has helped my clients:
• Increase email click-through rates by 156%
• Boost landing page conversions by 89%
• Generate an extra $200K+ in revenue

Want to see what this could do for your ${industry} business?

Talk soon,
${businessName}

P.S. This framework is the same one I use for Fortune 500 companies, but I'm sharing it free because I believe every business deserves copy that converts.`,

        'Event Driven Emails': `Subject: Last Chance: Free Copy Audit Ends Tonight

Hi [First Name],

This is it - your final opportunity to get a professional copy audit worth $500 absolutely free.

At midnight tonight, I'm closing the doors on my "Copy That Converts" audit program.

Here's what happens after midnight:
❌ Free audit becomes $500 
❌ 1-on-1 strategy session bonus disappears
❌ Only 5 spots left for this quarter

[URGENT: Claim your free audit now]

But here's why you don't want to miss this...

During these audits, I typically find 3-5 "revenue leaks" that business owners don't even know exist.

Just last week, I showed a ${industry} client how to fix one headline and it increased their conversions by 67% overnight.

That single change generated an extra $28,000 in the first month.

My recent audit discoveries:
• Email subject line fix = +$15,000/month
• Landing page headline change = +89% conversions  
• Call-to-action button rewording = +156% clicks

[Get your free copy audit before midnight]

Don't let weak copy cost you another month of sales.

${businessName}
Conversion Copywriter

P.S. I'm only doing 5 more audits this quarter. After tonight, the next available slot isn't until January.`,

        'Re-Engagement and Retention Emails': `Subject: Did Your Copy Stop Converting? Here's Why...

Hi [First Name],

I noticed you haven't opened my emails in a while, and I'm wondering if something changed.

Maybe your marketing is working great now?
Maybe you found another copywriter?
Or maybe you're just buried in other priorities?

[If you want to keep getting copy tips that convert, click here]

But before you go, I wanted to share something that might help...

I just finished a case study showing how one ${industry} business owner went from 1.2% conversions to 6.8% conversions using a simple "3-Hook Formula."

It's only available to my most engaged subscribers, but since we've been connected for a while, I'd love to share it with you.

[Get exclusive access to the 467% conversion increase case study]

This case study reveals:
• The exact 3-hook framework that hooks readers instantly
• Why 97% of copy fails in the first 8 seconds
• The psychological trigger that forces people to keep reading
• Word-for-word examples you can swipe and deploy

If you're ready to turn your copy into a sales machine, this case study will show you exactly how.

Still want to hear from me?

Best,
${businessName}

P.S. If you'd rather not receive these emails anymore, no hard feelings - just unsubscribe below.`,

        'Social Proof and Trust Building Emails': `Subject: How I Helped [Client] Increase Sales by 340% With Better Copy

Hi [First Name],

I want to share an incredible success story that proves the power of psychology-driven copy.

${clientBusinessName} came to me with a problem you might relate to: Great products, but copy that wasn't converting.

Their numbers were painful:
• Landing page conversion rate: 1.8%
• Email open rate: 16%  
• Monthly sales: Stuck at $32,000 for 8 months

Their copy was making three critical mistakes:
1. Talking about features instead of transformations
2. No emotional connection with the audience
3. Weak calls-to-action that didn't create urgency

Here's what we changed:

✅ Rewrote the headline using the "Problem-Agitation-Solution" framework
✅ Added emotional triggers that connected with their audience's deepest desires
✅ Created urgency and scarcity that felt authentic, not pushy
✅ Developed a 5-email nurture sequence based on buyer psychology

The results after 90 days blew my mind:
• Conversion rate: 1.8% → 6.1% (239% increase)
• Email open rate: 16% → 38% (138% increase)
• Monthly sales: $32,000 → $141,000 (341% increase)

[Read the full case study with before/after screenshots]

"${businessName} completely transformed how we communicate with our customers. The ROI was 2,847% in just 90 days." - CEO, ${clientBusinessName}

The best part? We achieved these results without spending a penny more on advertising.

We just made the existing copy work harder.

Want to see if I can do something similar for your business?

[Book a free 15-minute copy strategy call]

Best,
${businessName}

P.S. I'm only taking 3 new clients this quarter. If you're serious about growing your sales, let's talk.`,

        'Lead Nurturing Emails': `Subject: Copywriting Mastery: Lesson 1 - Psychology That Sells

Hi [First Name],

Welcome to the Copywriting Mastery series!

Over the next 7 days, I'm going to share the exact psychology-driven framework that's helped my clients generate over $4.2M in additional revenue.

Today we start with the foundation: The 3-Brain Buying System.

Most copywriters fail because they only appeal to the logical brain. But here's the secret: People buy with emotion and justify with logic.

Your copy needs to speak to all three brains:

🧠 **Reptilian Brain**: Survival, safety, instant gratification
🧠 **Limbic Brain**: Emotions, relationships, status  
🧠 **Neocortex Brain**: Logic, features, rational thinking

[Brain 1 Deep-Dive: How to trigger the "instant buy" reflex]

Here's what happened when I applied this for a ${industry} client:

Before: "Our advanced software increases productivity"
After: "Never miss another deadline or disappoint your boss again"

The results?
• 67% more email clicks
• 156% higher conversion rate
• $89,000 more revenue in 60 days

"I had no idea copy could be so powerful. This framework changed everything." - Marketing Director, TechCorp

Tomorrow, I'll show you the exact words that make people's wallets fall open (ethically, of course).

[Download today's worksheet: The 3-Brain Copy Audit]

Talk tomorrow,
${businessName}

P.S. Don't miss tomorrow's email - it contains the "magic words" that increased one client's sales by 234%.`
      };
      
      return leadGenTemplates[type] || 'Lead generation template content will be generated here...';
    } else {
      // Templates for clients
      const clientTemplates = {
        'Client Personalized Outreach': `Subject: ${clientBusinessName} - Exclusive Solution for ${clientInfo?.targetAudience || 'You'}

Hi [First Name],

I noticed you're interested in ${clientInfo?.productService || 'solutions'} for ${industry} professionals, and I thought you'd want to see this.

Most ${industry} professionals struggle with ${clientInfo?.challenges || 'achieving consistent results'}. What if I told you there's a proven system that can solve this in the next 30 days?

Here's what recent customers achieved:
• [Specific Result 1]
• [Specific Result 2] 
• [Specific Result 3]

[Social Proof: Customer testimonial with specific numbers]

${clientBusinessName} specializes in helping ${industry} professionals like you achieve ${clientInfo?.desiredOutcome || 'better results'} without ${clientInfo?.painPoints || 'the usual hassles'}.

Would you like to see how this could work for your specific situation?

[Schedule a 15-minute consultation]

Best regards,
[Your Name]
${clientBusinessName}`,

        'Client Content Marketing': `Subject: Insider Secrets: How to 10x Your ${industry} Results

Hi [First Name],

After working with 100+ ${industry} professionals, I've discovered a pattern that separates the top performers from everyone else.

The secret? They focus on ${clientInfo?.keySuccessFactor || 'the fundamentals'} instead of chasing the latest trends.

Here's the framework:

Step 1: [Specific actionable tip]
Step 2: [Specific actionable tip]
Step 3: [Specific actionable tip]

[Case Study: How [Customer Name] achieved [Specific Result]]

Most people in ${industry} make the mistake of ${clientInfo?.commonMistake || 'focusing on the wrong metrics'}.

But when you apply this framework, here's what happens:
• [Specific benefit 1]
• [Specific benefit 2]
• [Specific benefit 3]

[Download the complete framework]

${clientBusinessName} has been helping ${industry} professionals implement this system for [time period], with consistently impressive results.

Want to see how this applies to your situation?

Best,
[Your Name]
${clientBusinessName}`,

        'Client Event Driven': `Subject: ENDING SOON: Exclusive Access to [Client Offer]

Hi [First Name],

This is your final reminder - our exclusive ${clientInfo?.productService || 'program'} for ${industry} professionals closes tomorrow at midnight.

After tomorrow:
❌ Price increases by 50%
❌ Bonus materials worth $[value] disappear
❌ Limited spots are gone until next quarter

[URGENT: Secure your spot now]

Here's what you get when you join today:
✅ [Specific benefit 1]
✅ [Specific benefit 2]
✅ [Specific benefit 3]
✅ [Exclusive bonus for today only]

Recent results from participants:
• [Customer name]: [Specific result]
• [Customer name]: [Specific result]
• [Customer name]: [Specific result]

"[Powerful testimonial with specific outcome]" - [Customer Name], [Title]

Don't miss this opportunity to [desired transformation].

[Claim your spot before midnight]

Best,
[Your Name]
${clientBusinessName}

P.S. We only run this program twice per year. The next enrollment won't be until [date].`,

        'Client Re-Engagement': `Subject: We Miss You - Special Offer Inside

Hi [First Name],

I noticed you haven't engaged with our content lately, and I wanted to reach out personally.

Maybe our recent updates weren't relevant to your current ${industry} challenges?
Maybe you're busy with other priorities?
Or maybe our emails ended up in spam?

[If you want to continue receiving valuable insights, click here]

Before you decide, I wanted to share something special...

I just created an exclusive resource specifically for ${industry} professionals who want to ${clientInfo?.desiredOutcome || 'achieve better results'}.

It's called "[Resource Name]" and it reveals:
• [Specific value 1]
• [Specific value 2]
• [Specific value 3]

This resource normally costs $[price], but I'm sharing it free with our most valued subscribers.

[Get exclusive access here]

If you're ready to take your ${industry} results to the next level, this resource will show you exactly how.

Still want to hear from us?

Best,
[Your Name]
${clientBusinessName}`,

        'Client Social Proof': `Subject: Real Results: How [Customer] Achieved [Specific Outcome]

Hi [First Name],

I love sharing success stories from our ${industry} community, and this one will inspire you.

[Customer Name] came to us struggling with ${clientInfo?.commonChallenge || 'typical industry challenges'}.

Their situation before working with us:
• [Specific pain point 1]
• [Specific pain point 2]
• [Specific pain point 3]

Here's what we implemented:
✅ [Specific solution 1]
✅ [Specific solution 2]
✅ [Specific solution 3]

The results after [time period]:
• [Specific measurable result 1]
• [Specific measurable result 2]
• [Specific measurable result 3]

"[Detailed testimonial with specific numbers and outcomes]" - [Customer Name], [Title]

[Read the full case study]

What made the difference? ${clientBusinessName}'s proven system for ${clientInfo?.keyBenefit || 'achieving results'}.

If you're facing similar challenges in your ${industry} business, we might be able to help.

[Schedule a consultation to discuss your situation]

Best,
[Your Name]
${clientBusinessName}`,

        'Client Lead Nurturing': `Subject: Step 1: The Foundation of [Desired Outcome]

Hi [First Name],

Welcome to the ${industry} Mastery series!

Over the next 5 days, I'll share the exact framework that's helped hundreds of ${industry} professionals achieve ${clientInfo?.desiredOutcome || 'exceptional results'}.

Today we start with the foundation: [Core Principle].

Most people in ${industry} focus on [wrong approach] when they should be focusing on [right approach].

Here's why this matters:
• [Specific reason 1]
• [Specific reason 2]
• [Specific reason 3]

[Deep dive into core principle with actionable steps]

Success Story: [Customer name] applied this principle and achieved [specific result] in just [timeframe].

"[Short testimonial]" - [Customer Name]

Tomorrow, I'll show you [next topic] - the missing piece that 90% of ${industry} professionals ignore.

[Download today's action sheet]

To your success,
[Your Name]
${clientBusinessName}

P.S. Don't miss tomorrow's email - it contains the strategy that helped one client [specific impressive result].`
      };
      
      return clientTemplates[type] || 'Client service template content will be generated here...';
    }
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

  const leadGenTemplates = emailTypes.filter(t => t.category === 'lead-generation');
  const clientServiceTemplates = emailTypes.filter(t => t.category === 'client-service');

  return (
    <div className="space-y-8">
      {/* Lead Generation Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5" />
            <span>Lead Generation Email Templates</span>
          </CardTitle>
          <CardDescription>
            Proven email templates to attract and convert copywriting clients for your business
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {leadGenTemplates.map((emailType) => {
              const template: EmailTemplate = {
                type: emailType.type,
                subject: emailType.subject,
                content: generateEmailContent(emailType.type, emailType.category),
                description: emailType.description,
                category: emailType.category as 'lead-generation' | 'client-service'
              };

              return (
                <Card key={emailType.type} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">{emailType.type}</CardTitle>
                      <Badge variant="secondary">Lead Gen</Badge>
                    </div>
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

      {/* Client Service Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>Client Service Email Templates</span>
          </CardTitle>
          <CardDescription>
            Ready-to-use email templates for your client campaigns and services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {clientServiceTemplates.map((emailType) => {
              const template: EmailTemplate = {
                type: emailType.type,
                subject: emailType.subject,
                content: generateEmailContent(emailType.type, emailType.category),
                description: emailType.description,
                category: emailType.category as 'lead-generation' | 'client-service'
              };

              return (
                <Card key={emailType.type} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">{emailType.type.replace('Client ', '')}</CardTitle>
                      <Badge variant="outline">Client</Badge>
                    </div>
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
                rows={20}
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

export default EnhancedEmailTemplatesGenerator;