import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Phone, Edit, Copy, Check, Mail, MessageSquare } from 'lucide-react';

interface SalesScript {
  type: string;
  title: string;
  content: string;
  description: string;
  duration: string;
  category: 'phone-scripts' | 'email-sequences';
}

interface EnhancedSalesScriptsGeneratorProps {
  data: any;
  idealCustomer?: any;
}

const EnhancedSalesScriptsGenerator = ({ data, idealCustomer }: EnhancedSalesScriptsGeneratorProps) => {
  const [selectedScript, setSelectedScript] = useState<SalesScript | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [copiedScript, setCopiedScript] = useState<string | null>(null);

  const scriptTypes = [
    // Phone Call Scripts
    {
      type: 'Cold Calling Script',
      category: 'phone-scripts',
      title: 'Initial Outreach Call',
      description: 'First contact with prospects to generate leads',
      duration: '3-5 minutes'
    },
    {
      type: 'Discovery Call Script',
      category: 'phone-scripts',
      title: 'Needs Assessment Call',
      description: 'Understanding prospect needs and qualifying opportunities',
      duration: '15-20 minutes'
    },
    {
      type: 'Demo/Presentation Script',
      category: 'phone-scripts',
      title: 'Product Demonstration Call',
      description: 'Showcasing solution and building value',
      duration: '20-30 minutes'
    },
    {
      type: 'Objection Handling Script',
      category: 'phone-scripts',
      title: 'Overcoming Common Objections',
      description: 'Responses to typical sales objections',
      duration: '5-10 minutes'
    },
    {
      type: 'Closing Script',
      category: 'phone-scripts',
      title: 'Deal Closing Conversation',
      description: 'Moving prospects to purchase decision',
      duration: '10-15 minutes'
    },
    {
      type: 'Follow-up Script',
      category: 'phone-scripts',
      title: 'Post-Meeting Follow-up',
      description: 'Maintaining momentum after meetings',
      duration: '5-8 minutes'
    },
    // Email Sequence Scripts
    {
      type: 'Initial Outreach Email',
      category: 'email-sequences',
      title: 'First Contact Email',
      description: 'Cold email to start relationship with prospects',
      duration: 'N/A'
    },
    {
      type: 'Value-Add Follow-up',
      category: 'email-sequences',
      title: 'Educational Follow-up Email',
      description: 'Providing value while staying top of mind',
      duration: 'N/A'
    },
    {
      type: 'Social Proof Email',
      category: 'email-sequences',
      title: 'Case Study & Testimonial Email',
      description: 'Building credibility with success stories',
      duration: 'N/A'
    },
    {
      type: 'Urgency Email',
      category: 'email-sequences',
      title: 'Time-Sensitive Follow-up',
      description: 'Creating urgency to drive action',
      duration: 'N/A'
    },
    {
      type: 'Break-up Email',
      category: 'email-sequences',
      title: 'Final Attempt Email',
      description: 'Last touchpoint before moving on',
      duration: 'N/A'
    },
    {
      type: 'Re-engagement Email',
      category: 'email-sequences',
      title: 'Dormant Lead Revival',
      description: 'Reactivating old prospects',
      duration: 'N/A'
    }
  ];

  const generateScriptContent = (type: string, category: string) => {
    const productToSell = data?.productToSell || 'our solution';
    const industry = idealCustomer?.customerIndustry || 'your industry';
    const businessName = data?.businessName || 'Your Company';
    const avgDealSize = idealCustomer?.averageDealSize || '$5,000';

    if (category === 'phone-scripts') {
      const phoneScripts = {
        'Cold Calling Script': `**COLD CALLING SCRIPT - Lead Generation**

**OPENING (First 15 seconds):**
"Hi [First Name], this is [Your Name] from ${businessName}. I know I'm calling out of the blue, but I have a quick question about your ${industry} business.

Are you currently struggling with generating consistent, qualified leads for ${productToSell}?"

**PERMISSION TO CONTINUE:**
"I realize I caught you at a random time. Do you have 2 minutes for me to explain why I'm calling, or should I call back at a better time?"

**VALUE PROPOSITION:**
"Great! The reason I'm calling is that we've been working with ${industry} companies like yours, and we've discovered that most are losing about ${avgDealSize} per month in potential revenue due to inconsistent lead generation.

We've developed a proven system that has helped companies like [Similar Company] increase their qualified leads by 340% and boost their monthly revenue by an average of [specific amount] within 90 days."

**QUALIFYING QUESTIONS:**
1. "How are you currently generating leads for your business?"
2. "What's your biggest challenge with your current lead generation process?"
3. "How much revenue would an extra 50 qualified leads per month be worth to you?"
4. "If I could show you how to triple your lead generation while cutting your cost per lead in half, would that be worth a 15-minute conversation?"

**CLOSE FOR APPOINTMENT:**
"Based on what you've told me, I think our lead generation system could be a perfect fit for your business. I'd like to schedule a brief 15-minute call to show you exactly how [Similar Company] went from 20 leads per month to 120 leads per month.

I have Tuesday at 2 PM or Wednesday at 10 AM available. Which works better for you?"

**OBJECTION HANDLING:**
If "Not interested": "I understand. Can I ask what you're currently doing to generate leads that's working well for you?"
If "Too busy": "I get it, and that's exactly why our clients love this system - it automates lead generation so they can focus on closing deals. When would be a better time to discuss freeing up 10 hours per week?"
If "Send me information": "I could do that, but honestly, generic information won't show you how this applies to your specific ${industry} business. What concerns you most about your current lead generation?"`,

        'Discovery Call Script': `**DISCOVERY CALL SCRIPT - Lead Generation Focus**

**OPENING & RAPPORT (2-3 minutes):**
"Hi [Name], thanks for taking the time to speak with me today. I know lead generation is a priority for you right now."

[Brief rapport building - 1-2 exchanges]

"Perfect. So just to set expectations, I'd like to spend about 15-20 minutes understanding your current lead generation situation, and then I'll share how we might be able to help you generate more qualified prospects. Sound good?"

**CURRENT SITUATION QUESTIONS:**
1. "Tell me about your current lead generation process."
2. "How many qualified leads are you generating per month right now?"
3. "What's your cost per lead currently?"
4. "What's working well with your current approach?"
5. "What are your biggest challenges with lead generation?"

**PAIN POINT EXPLORATION:**
1. "How long have you been struggling with inconsistent lead flow?"
2. "What have you tried to increase your lead generation?"
3. "What would happen to your business if your lead generation got worse over the next 6 months?"
4. "What would it mean for your revenue if you could double your qualified leads?"

**GOAL SETTING:**
1. "What's your ideal number of qualified leads per month?"
2. "What would you like your cost per lead to be?"
3. "How quickly do you need to see results?"

**DECISION MAKING PROCESS:**
1. "Who else would be involved in evaluating a lead generation solution?"
2. "What's your typical process for making decisions about marketing investments?"
3. "What budget range are you working with for lead generation?"
4. "What's your timeline for implementing a new lead generation system?"

**QUALIFICATION:**
- Budget: "Investments in lead generation systems like ours typically range from $X to $Y per month. Are you comfortable in that range?"
- Authority: "Besides yourself, who else would need to approve this type of investment?"
- Need: "On a scale of 1-10, how important is solving your lead generation problem?"
- Timeline: "When would you ideally like to have a reliable lead generation system in place?"

**NEXT STEPS:**
"Based on everything you've shared, it sounds like our lead generation system could help you reach your goal of [specific number] qualified leads per month. 

I'd like to show you exactly how it would work for your ${industry} business, including the specific strategies we'd use to generate leads in your market.

I can prepare a customized presentation that shows you our exact lead generation blueprint. Would Thursday at 2 PM or Friday at 10 AM work better for you?"`,

        'Demo/Presentation Script': `**LEAD GENERATION SYSTEM DEMONSTRATION**

**OPENING & AGENDA (2 minutes):**
"Hi everyone, thanks for joining today's call. Just to confirm, we have [list attendees] on the line.

Based on our previous conversation, [Name], you mentioned that you're currently generating [current number] leads per month but need [goal number] to hit your revenue targets.

Today I'm going to show you exactly how our lead generation system can help you achieve that goal.

Our agenda today:
1. Quick recap of your lead generation challenges (2 minutes)
2. Demo of our 3-pillar lead generation system (20 minutes)  
3. ROI calculation for your business (5 minutes)
4. Implementation timeline and next steps (3 minutes)

Sound good?"

**LEAD GENERATION CHALLENGE RECAP:**
"Just to make sure I understood correctly, your main lead generation challenges are:
- Currently generating only [number] leads per month vs your goal of [number]
- Cost per lead is too high at $[amount]
- Lead quality is inconsistent 
- Too much manual work required

Is that accurate, or did I miss anything?"

**DEMO STRUCTURE - 3-PILLAR SYSTEM:**

**Pillar 1: Multi-Channel Lead Attraction**
"First, let me show you how we attract qualified prospects across multiple channels..."

[Screen share showing lead generation channels]

"As you can see, instead of relying on just one channel, we deploy:
• LinkedIn outreach targeting your ideal customer profile
• Content marketing that attracts inbound leads
• Email sequences that nurture prospects
• Social media campaigns in your target market

For a ${industry} company like yours, this typically generates 150-300% more leads than single-channel approaches."

**Pillar 2: Lead Qualification & Scoring**
"Next, here's how we ensure you only get high-quality leads..."

[Demo lead scoring system]

"Our system automatically scores each lead based on:
• Budget qualification
• Decision-making authority  
• Timeline to purchase
• Specific needs matching your solution

This means instead of wasting time on unqualified prospects, you focus only on leads ready to buy."

**Pillar 3: Automated Follow-up & Nurturing**
"Finally, here's how we turn more leads into customers..."

[Show automated sequence]

"Our system automatically:
• Sends personalized follow-up sequences
• Provides valuable content that builds trust
• Schedules qualified prospects directly on your calendar
• Tracks engagement and prioritizes hot leads

The result? You convert 3-4x more leads into paying customers."

**ROI CALCULATION:**
"Let me show you what this looks like for your business:

Current Situation:
- [Current leads] per month × [conversion rate]% = [customers] per month
- [Customers] × $[avg deal size] = $[monthly revenue]

With Our System:
- [Projected leads] per month × [improved conversion rate]% = [new customers] per month  
- [New customers] × $[avg deal size] = $[new monthly revenue]

Monthly revenue increase: $[difference]
Annual revenue increase: $[annual difference]
Investment in our system: $[monthly cost]
Monthly ROI: [percentage]%
Payback period: [timeframe]

Does this make financial sense for your business?"

**CLOSING:**
"Based on what we've covered, our lead generation system could help you go from [current leads] to [goal leads] per month, while improving lead quality and reducing your cost per lead.

What questions do you have about moving forward?"`,

        'Objection Handling Script': `**OBJECTION HANDLING - LEAD GENERATION FOCUS**

**"IT'S TOO EXPENSIVE"**
"I understand the investment seems significant. Let me ask you this - what's it costing you NOT to have a reliable lead generation system?

You mentioned you need [number] more leads per month to hit your targets. If each lead is worth $[value] to your business, that's $[monthly loss] you're missing every month.

Our system costs $[price] per month but typically generates $[ROI amount] in additional revenue. Would you rather invest $[price] to make an extra $[larger amount], or continue missing out on $[loss amount] every month?"

**"I NEED TO THINK ABOUT IT"**
"Absolutely, this is an important decision for your business. What specifically do you need to think about?

Is it the budget? The implementation process? Getting buy-in from your team? How the system will integrate with your current processes?

[Address specific concern]

Here's what I'd suggest - while you're thinking it over, your competitors are still generating leads and growing their market share. Let's schedule a follow-up call for [specific date] so I can answer any questions that come up. What day works best for you?"

**"WE'RE HANDLING LEAD GENERATION INTERNALLY"**
"That's great that you have a system in place. Can I ask - what originally led you to take this call with me?

[Listen to response]

It sounds like while your current approach generates some leads, you're still not hitting your target of [goal number] per month. Is that accurate?

Most companies we work with keep their existing efforts and layer our system on top to fill the gaps. The result is usually 2-3x more leads without disrupting what's already working. Would it be helpful to see how that integration works?"

**"I DON'T HAVE BUDGET RIGHT NOW"**
"I totally understand budget constraints. Let me ask - if budget wasn't an issue, would you want to solve your lead generation challenges?

[If yes]: 'Great, so it's just a matter of timing. When does your next budget cycle start?'

[If no]: 'What would need to change about our approach for lead generation to become a priority?'

Also, many of our clients have found that the ROI is so strong, the system pays for itself within [timeframe]. In fact, some see positive ROI in the first month. Would it be helpful to look at some creative ways to structure this investment?"

**"I DON'T HAVE TIME TO IMPLEMENT"**
"Time is definitely valuable, and I appreciate you being upfront about that.

The good news is that our implementation process is designed specifically for busy professionals like yourself. Here's how it works:

- Week 1: 2-hour onboarding call (we do 90% of the setup)
- Week 2: 1-hour training on the system  
- Week 3: 30-minute optimization review

Total time investment: 3.5 hours to set up a system that runs on autopilot and generates leads 24/7.

Most clients tell us this 3.5-hour investment saves them 10+ hours per week they were spending on manual lead generation.

Would investing 3.5 hours to save 10+ hours every week be worth it?"

**"I NEED TO DISCUSS WITH MY TEAM"**
"Absolutely, that makes perfect sense. Who else needs to be involved in this decision?

[Get names and roles]

Would it be helpful if I prepared a brief summary of our conversation and the ROI projection to make that discussion easier?

Also, would it make sense to include them in our next call so they can ask questions directly? I'm happy to present the same information to the full team and address any concerns they might have about implementing a new lead generation system."`,

        'Closing Script': `**CLOSING SCRIPT - LEAD GENERATION SYSTEM**

**TRIAL CLOSE:**
"Based on everything we've discussed about your lead generation needs, how do you feel about moving forward with our system?"

[Listen to response and address any concerns]

**SUMMARY CLOSE:**
"Let me summarize what we've covered:

✓ You need [number] more qualified leads per month to hit your revenue goals
✓ Our system typically generates 2-3x more leads than current approaches
✓ You'll save 10+ hours per week on manual lead generation  
✓ The ROI is [percentage]% with payback in [timeframe]
✓ Implementation takes only [time] with our full support

Does this sound like the solution to your lead generation challenges?"

**ASSUMPTIVE CLOSE:**
"Great! Let's get your lead generation system set up. I have two implementation options:

Option 1: We can start next Monday with your first leads coming in within 2 weeks
Option 2: We can start the following week if you need more time to prepare your sales process

Which timeline works better for your business?"

**URGENCY CLOSE (if applicable):**
"I want to mention that we're currently offering a special bonus for businesses that get started before [date]. 

This bonus includes [specific bonus worth $value] which would be perfect for your lead generation goals because [specific benefit].

To secure this bonus, we'd need to get your agreement today. Are you ready to start generating more qualified leads?"

**DIRECT CLOSE:**
"[Name], I've shown you exactly how our system will help you generate [number] qualified leads per month and increase your revenue by $[amount].

You've confirmed that budget, timeline, and decision-making authority are all aligned.

What's stopping you from starting your lead generation transformation today?"

**ALTERNATIVE CHOICE CLOSE:**
"Would you prefer to start with our Standard Lead Generation Package at $[price] per month, or would our Premium Package with additional channels at $[price] per month be a better fit for your goals?"

**HANDLING FINAL HESITATION:**
"I can sense you might have one more concern about the lead generation system. What is it?"

[Address the concern directly]

"Other than [concern addressed], is there anything else preventing you from moving forward with solving your lead generation challenges?"

**GETTING THE COMMITMENT:**
"Perfect! Here's what happens next:

1. I'll send you the agreement to review and sign
2. Our onboarding team will contact you within 24 hours  
3. We'll schedule your system setup call for [specific date]
4. Your first qualified leads will start coming in within 2 weeks
5. You'll have [number] qualified leads per month within 90 days

Can I get your email address to send the agreement?"`,

        'Follow-up Script': `**FOLLOW-UP SCRIPT - LEAD GENERATION FOCUS**

**IMMEDIATE FOLLOW-UP (Same Day):**

"Hi [Name], I wanted to follow up on our great conversation about your lead generation goals earlier today.

I know you mentioned you needed to [specific action they mentioned - discuss with team/review budget/etc.]. 

I've put together a summary of our lead generation proposal, including the ROI calculation showing how you'd generate [number] additional leads per month. I'm sending that over now.

I also wanted to mention that I spoke with our implementation team, and they confirmed they can have your lead generation system up and running by [date] to help you hit your Q[number] goals.

What questions came up for you about the lead generation system after our call?"

**[Address any questions]**

"Based on our conversation, what's the next step from your end to move forward with solving your lead generation challenges?"

**FOLLOW-UP CALL #2 (3-5 days later):**

"Hi [Name], I'm following up on our conversation about implementing a lead generation system. You mentioned you were going to [specific action].

How did that discussion go?"

**[If positive response]:**
"That's great to hear! What was their reaction to the lead generation approach?"
"What questions did they have about the system?"
"What's the next step to get your lead generation system implemented?"

**[If need more time]:**
"No problem, I understand these decisions take time. 
What additional information would be helpful for your evaluation?
When do you expect to make a decision on your lead generation solution?"

**FOLLOW-UP CALL #3 (1 week later):**

"Hi [Name], I wanted to check in one more time about implementing the lead generation system.

I know you were evaluating this along with [other priorities]. Where does solving your lead generation challenges stand on your priority list?

[Listen to response]

Let me ask you this - every month you delay implementing a proper lead generation system, you're missing out on [number] potential qualified leads. Over 6 months, that's [number] leads worth approximately $[value] in revenue.

What would need to happen for implementing lead generation to become a priority?"

**VALUE-ADD FOLLOW-UP:**

"Hi [Name], I was just thinking about our conversation about generating more qualified leads.

I came across a case study that directly relates to your situation - it's about a ${industry} company that went from [low number] to [high number] leads per month using the exact system we discussed.

What made their success possible was [specific insight relevant to their business].

I thought you might find this interesting. I'll send it over.

By the way, have you had a chance to discuss the lead generation system with your team?"

**FINAL FOLLOW-UP:**

"Hi [Name], I've been thinking about our conversations over the past few weeks about your lead generation challenges.

I realize the timing might not be right for implementing a new system right now, and I respect that.

Let me ask you this - what would need to change in your business for lead generation to become a priority?

[Listen to response]

Would it be helpful if I checked back with you in [timeframe] to see if your lead generation needs have become more urgent?

In the meantime, I'm always here if questions come up or if you'd like to discuss lead generation strategies."`
      };

      return phoneScripts[type] || 'Phone script content will be generated here...';
    } else {
      // Email sequence scripts
      const emailScripts = {
        'Initial Outreach Email': `Subject: Quick question about your ${industry} lead generation

Hi [First Name],

I noticed [specific trigger - company growth, recent funding, job posting, etc.] and had a quick question about your lead generation process.

Are you currently getting enough qualified leads to hit your revenue targets?

Most ${industry} companies I work with are struggling with one of three things:
1. Not enough total leads coming in
2. Low-quality leads that don't convert  
3. Inconsistent lead flow month to month

We've helped companies like [Similar Company] solve this by implementing our 3-pillar lead generation system that typically increases qualified leads by 200-400% within 90 days.

Here's what [Similar Company] achieved:
• Went from 20 to 85 qualified leads per month
• Reduced cost per lead from $150 to $45
• Increased monthly revenue by $127,000

Would you be interested in a brief 15-minute call to see how this could work for your business?

Best regards,
[Your Name]
${businessName}

P.S. I've helped 50+ ${industry} companies solve their lead generation challenges. If you're not interested, no worries - but if lead generation is a priority, let's talk.`,

        'Value-Add Follow-up': `Subject: 3 lead generation mistakes that kill conversions

Hi [First Name],

I wanted to follow up on my previous email about your lead generation, but figured I'd share something valuable regardless of whether you're interested in working together.

After analyzing 200+ ${industry} lead generation campaigns, I've discovered the 3 most common mistakes that kill conversions:

**Mistake #1: Generic targeting**
Most companies cast too wide a net. The companies generating 10x more leads are laser-focused on their ideal customer profile.

**Mistake #2: No lead nurturing system**
87% of leads aren't ready to buy immediately, but most companies give up after 1-2 touchpoints.

**Mistake #3: No lead scoring**
Without proper qualification, sales teams waste time on prospects who will never buy.

[Download my free "Lead Generation Audit Checklist" to identify which mistakes you might be making]

This checklist has helped companies like [Company Name] increase their lead quality by 340% and reduce cost per lead by 60%.

Quick question: Which of these three mistakes do you think might be affecting your lead generation?

Best,
[Your Name]
${businessName}

P.S. If you're ready to solve your lead generation challenges, I have 2 spots open this month for strategy calls.`,

        'Social Proof Email': `Subject: How [Company] went from 15 to 120 qualified leads/month

Hi [First Name],

I wanted to share an incredible success story that might resonate with your lead generation situation.

[Company Name], a ${industry} business similar to yours, came to us struggling with the same challenges you mentioned:
• Only 15 qualified leads per month (needed 50+)
• High cost per lead ($200+)
• Inconsistent lead quality

Their CEO was frustrated because they had a great product but couldn't get enough qualified prospects to see it.

Here's what we implemented:

**Month 1:** Set up multi-channel lead attraction system
- LinkedIn outreach targeting ideal customers
- Content marketing to attract inbound leads  
- Email nurture sequences for lead development

**Month 2:** Implemented lead scoring and qualification
- Automated lead scoring based on fit and intent
- Created qualification framework for sales team
- Set up automated follow-up sequences

**Month 3:** Optimized and scaled what was working
- Doubled down on highest-performing channels
- Refined targeting based on data
- Expanded successful campaigns

**Results after 90 days:**
• Qualified leads: 15 → 120 per month (700% increase)
• Cost per lead: $200 → $55 (72% reduction)  
• Monthly revenue: +$280,000

"[Your Name] completely transformed our lead generation. We went from struggling to find prospects to having more qualified leads than we can handle." - CEO, [Company Name]

[Read the full case study with screenshots and exact strategies]

The system that worked for [Company Name] could work for your business too.

Interested in learning how we could adapt this approach for your ${industry} company?

Best,
[Your Name]
${businessName}`,

        'Urgency Email': `Subject: Closing the books on Q[X] - final call

Hi [First Name],

We're coming up on the end of Q[X], and I wanted to reach out one final time about your lead generation challenges.

Here's why timing matters:

If you implement a lead generation system now:
✅ You'll start seeing results within 2-3 weeks
✅ You'll be generating qualified leads throughout Q[X+1]
✅ You'll hit your revenue targets for the year

If you wait until next quarter:
❌ You'll miss the entire Q[X+1] opportunity  
❌ You'll be behind on yearly revenue goals
❌ Your competitors will continue gaining market share

I've been holding 2 implementation spots for new clients this quarter. After this week, the next available start date won't be until [date].

Based on our previous conversations, you need [number] more qualified leads per month to hit your targets. Every month you delay costs you approximately $[amount] in lost revenue.

The math is simple: 
- Lost revenue from delay: $[amount] per month
- Investment in lead generation system: $[lower amount] per month
- Net cost of waiting: $[difference] per month

Are you ready to stop losing potential revenue and start generating the leads your business needs?

[Book your strategy call now - only 2 spots left]

Best,
[Your Name]
${businessName}

P.S. After this week, we won't have availability until [date]. Don't let another quarter go by struggling with lead generation.`,

        'Break-up Email': `Subject: Moving on...

Hi [First Name],

I've reached out a few times about your lead generation challenges, but haven't heard back.

I understand - you're busy running your business, and lead generation might not be the top priority right now.

I'm going to assume you've either:
• Solved your lead generation challenges internally
• Decided to work with another provider  
• Decided lead generation isn't a priority

No hard feelings at all - I know these decisions aren't always easy.

I'll stop reaching out, but before I go, I wanted to leave you with something valuable...

[Link to free resource: "The Ultimate Lead Generation Toolkit for ${industry} Companies"]

This toolkit contains:
• Lead generation channel comparison guide
• Email templates that convert at 15%+ rates
• Lead scoring framework
• ROI calculator for lead generation investments

It's the same toolkit our clients use to generate 300% more qualified leads.

If your lead generation situation changes and you need help generating more qualified prospects, feel free to reach out.

Wishing you success,
[Your Name]
${businessName}

P.S. If I completely missed the mark and you are interested in discussing lead generation, just reply "INTERESTED" and I'll send you my calendar link.`,

        'Re-engagement Email': `Subject: Is lead generation still a priority?

Hi [First Name],

I reached out several months ago about your lead generation challenges, but the timing wasn't right.

I wanted to check in because:

1. It's a new quarter/year and priorities may have shifted
2. Your lead generation needs may have become more urgent
3. Your budget situation may have changed

A quick update on what we've been doing:

Since we last spoke, we've helped [number] more ${industry} companies solve their lead generation challenges, with an average increase of 280% in qualified leads within 90 days.

Our newest case study shows [Company Name] going from [low number] to [high number] leads per month, generating an additional $[amount] in monthly revenue.

[Read the latest case study]

If lead generation has become a priority again, I'd love to explore how we could achieve similar results for your business.

If not, no worries - I'll remove you from my follow-up list.

Either way, here's a free resource I think you'll find valuable:

[Download: "2024 Lead Generation Trends Report for ${industry} Companies"]

This report reveals:
• Which lead generation channels are working best in 2024
• Average conversion rates by industry and channel
• Budget benchmarks for lead generation ROI
• Predictions for emerging trends

Hope this is helpful!

Best,
[Your Name]
${businessName}

P.S. If you'd like to discuss your current lead generation situation, I have a few spots available for strategy calls this month.`
      };

      return emailScripts[type] || 'Email sequence content will be generated here...';
    }
  };

  const handleEditScript = (script: SalesScript) => {
    setSelectedScript(script);
    setEditedContent(script.content);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (selectedScript) {
      setSelectedScript({
        ...selectedScript,
        content: editedContent
      });
    }
    setIsEditing(false);
  };

  const handleCopyScript = (content: string, type: string) => {
    navigator.clipboard.writeText(content);
    setCopiedScript(type);
    setTimeout(() => setCopiedScript(null), 2000);
  };

  const phoneScripts = scriptTypes.filter(s => s.category === 'phone-scripts');
  const emailSequences = scriptTypes.filter(s => s.category === 'email-sequences');

  return (
    <div className="space-y-8">
      {/* Phone Call Scripts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Phone className="h-5 w-5" />
            <span>Phone Call Sales Scripts</span>
          </CardTitle>
          <CardDescription>
            Proven phone scripts optimized for {idealCustomer?.customerIndustry || 'your target market'} lead generation and deal closing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {phoneScripts.map((scriptType) => {
              const script: SalesScript = {
                type: scriptType.type,
                title: scriptType.title,
                content: generateScriptContent(scriptType.type, scriptType.category),
                description: scriptType.description,
                duration: scriptType.duration,
                category: scriptType.category as 'phone-scripts' | 'email-sequences'
              };

              return (
                <Card key={scriptType.type} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">{scriptType.title}</CardTitle>
                      <Badge variant="secondary">{scriptType.duration}</Badge>
                    </div>
                    <CardDescription className="text-xs">
                      {scriptType.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditScript(script)}
                        className="flex-1"
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        View & Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCopyScript(script.content, script.type)}
                      >
                        {copiedScript === script.type ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Email Sequence Scripts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>Email Sequence Scripts</span>
          </CardTitle>
          <CardDescription>
            High-converting email sequences for lead generation and prospect nurturing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {emailSequences.map((scriptType) => {
              const script: SalesScript = {
                type: scriptType.type,
                title: scriptType.title,
                content: generateScriptContent(scriptType.type, scriptType.category),
                description: scriptType.description,
                duration: scriptType.duration,
                category: scriptType.category as 'phone-scripts' | 'email-sequences'
              };

              return (
                <Card key={scriptType.type} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">{scriptType.title}</CardTitle>
                      <Badge variant="outline">Email</Badge>
                    </div>
                    <CardDescription className="text-xs">
                      {scriptType.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditScript(script)}
                        className="flex-1"
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        View & Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCopyScript(script.content, script.type)}
                      >
                        {copiedScript === script.type ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Edit Script Modal */}
      {isEditing && selectedScript && (
        <Card>
          <CardHeader>
            <CardTitle>Edit Script: {selectedScript.title}</CardTitle>
            <CardDescription>
              Customize this script for your specific needs and target market
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Script Title</Label>
              <Input
                id="title"
                value={selectedScript.title}
                onChange={(e) => setSelectedScript({
                  ...selectedScript,
                  title: e.target.value
                })}
              />
            </div>
            <div>
              <Label htmlFor="content">Script Content</Label>
              <Textarea
                id="content"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                rows={25}
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

export default EnhancedSalesScriptsGenerator;