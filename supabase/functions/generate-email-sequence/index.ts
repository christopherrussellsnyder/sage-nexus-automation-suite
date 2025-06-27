
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SequenceGenerationRequest {
  businessType: 'agency' | 'sales';
  industry: string;
  targetAudience: string;
  goals: string[];
  currentChallenges: string[];
  competitorInfo: string;
  brandVoice: 'professional' | 'casual' | 'friendly' | 'authoritative';
  sequenceType: string;
  emailCount: number;
  avgEmailLength: number;
  qualificationCriteria: any;
}

const generateEmailContent = (
  request: SequenceGenerationRequest,
  emailType: string,
  emailNumber: number,
  delay: number
) => {
  const { businessType, industry, targetAudience, brandVoice, sequenceType, avgEmailLength } = request;
  
  // Generate personalized email content based on the request parameters
  const baseContent = getBaseEmailContent(businessType, sequenceType, emailType, emailNumber);
  const personalizedContent = personalizeContent(baseContent, request);
  const expandedContent = expandContent(personalizedContent, avgEmailLength, brandVoice);
  
  return {
    id: `${Date.now()}-${emailNumber}`,
    name: getEmailName(emailType, emailNumber),
    type: emailType,
    subject: generateSubject(request, emailType, emailNumber),
    content: expandedContent,
    timing: delay === 0 ? 'Immediately' : `${delay} days later`,
    delay,
    delayUnit: 'days' as const,
    conversionRate: getExpectedConversionRate(emailType, emailNumber),
    wordCount: expandedContent.split(' ').length,
    qualificationCriteria: request.qualificationCriteria,
    personalizationTags: getPersonalizationTags(businessType),
    performance: {
      sent: 0,
      opened: 0,
      clicked: 0,
      replied: 0,
      converted: 0,
      openRate: 0,
      clickRate: 0,
      conversionRate: 0
    },
    lastModified: new Date().toISOString(),
    version: 1
  };
};

const getBaseEmailContent = (businessType: string, sequenceType: string, emailType: string, emailNumber: number) => {
  if (businessType === 'agency') {
    return getAgencyEmailContent(sequenceType, emailType, emailNumber);
  } else {
    return getSalesEmailContent(sequenceType, emailType, emailNumber);
  }
};

const getAgencyEmailContent = (sequenceType: string, emailType: string, emailNumber: number) => {
  const templates = {
    'onboarding': [
      {
        type: 'welcome',
        content: `Hi [FIRST_NAME],

Welcome to the [COMPANY_NAME] family! We're absolutely thrilled to have you on board and can't wait to help you achieve your [INDUSTRY] goals.

Over the next few weeks, you'll be working with our expert team who have helped over 200+ businesses like yours achieve remarkable results. Our proven methodology has generated over $50M in additional revenue for our clients.

Here's what you can expect from us:

**Your Dedicated Success Team:**
• [ACCOUNT_MANAGER] - Your primary point of contact with 8+ years of [INDUSTRY] experience
• [PROJECT_MANAGER] - Ensuring timelines and deliverables are met
• [SPECIALIST] - Technical expert for your specific needs

**Our Proven Process:**
Week 1: Deep-dive analysis of your current situation and competitive landscape
Week 2: Strategic planning and roadmap development
Week 3-4: Implementation and optimization
Week 5+: Monitoring, reporting, and continuous improvement

**What Makes Us Different:**
Unlike other agencies that use cookie-cutter approaches, we create custom strategies based on your unique business model, target audience, and market position. Every campaign is built from the ground up with your specific goals in mind.

**Expected Outcomes:**
Based on similar clients in your industry, you can expect:
• 40-60% increase in qualified leads within 90 days
• 25-35% improvement in conversion rates
• 3-5x return on your marketing investment
• Streamlined processes that save 10+ hours per week

**Your Client Portal Access:**
You'll receive access to your dedicated client portal within 24 hours, where you can:
• Track project progress in real-time
• Access all deliverables and reports
• Communicate directly with your team
• View performance metrics and analytics

**Next Steps:**
1. [ACCOUNT_MANAGER] will call you within 24 hours to schedule your strategy session
2. We'll send you a brief questionnaire to understand your business better
3. Our team will begin the initial analysis while we prepare for our kickoff meeting

We know you have many options when it comes to [INDUSTRY] services, and we don't take your trust lightly. Our commitment is to deliver exceptional results that exceed your expectations.

If you have any questions or concerns at any point, please don't hesitate to reach out to me directly. I'm here to ensure your success.

Looking forward to an amazing partnership!

Best regards,
[SENDER_NAME]
[SENDER_TITLE]
[COMPANY_NAME]
[PHONE] | [EMAIL]

P.S. I've attached a welcome packet with additional resources and our complete service guide. Take a look when you have a moment - there are some valuable insights in there that can help you maximize your results from day one.`
      },
      {
        type: 'education',
        content: `Hi [FIRST_NAME],

I hope you're settling in well! As promised, I wanted to share some insights that will help you get the most out of our partnership.

**The #1 Mistake Most [INDUSTRY] Businesses Make**

After working with 200+ businesses in your industry, I've noticed a common pattern that costs companies like [COMPANY_NAME] thousands in lost revenue every month.

The mistake? Focusing on tactics instead of strategy.

Most businesses jump straight into tactics - running ads, posting on social media, sending emails - without understanding their customer journey or optimizing their conversion funnel.

This scattershot approach leads to:
• Wasted ad spend on unqualified traffic
• Low conversion rates despite high website traffic
• Inconsistent messaging across different touchpoints
• Difficulty measuring ROI and making data-driven decisions

**The Solution: Our Strategic Framework**

Our proprietary IMPACT framework has helped clients achieve 3-5x better results than traditional approaches:

**I - Identify Your Ideal Customer**
We don't just create buyer personas - we develop detailed customer journey maps that show exactly how your prospects think, feel, and behave at each stage of their buying process.

**M - Map Your Conversion Funnel**
We analyze every touchpoint in your customer journey to identify bottlenecks and optimization opportunities.

**P - Prioritize High-Impact Activities**
Instead of trying everything, we focus on the 20% of activities that drive 80% of your results.

**A - Automate Repetitive Processes**
We implement systems that nurture leads and customers automatically, freeing up your time for strategic work.

**C - Create Compelling Content**
Every piece of content is strategically designed to move prospects closer to a purchase decision.

**T - Test and Optimize Continuously**
We constantly test and refine every element to improve performance over time.

**Real Example: TechStart Solutions**

Before working with us, TechStart was spending $15,000/month on ads with a 2% conversion rate. They were getting traffic but struggling to convert visitors into customers.

Using our IMPACT framework, we:
• Identified that their ideal customers were concerned about implementation complexity
• Redesigned their landing pages to address these specific concerns
• Created an educational email sequence that built trust before asking for a sale
• Implemented retargeting campaigns for different stages of the buyer journey

Results after 90 days:
• Conversion rate increased from 2% to 7.3%
• Customer acquisition cost decreased by 40%
• Monthly recurring revenue increased by 180%
• Overall ROI improved from 1.3x to 4.8x

**What This Means for [COMPANY_NAME]**

Based on our initial analysis of your business, I see tremendous potential for similar improvements. Your current [SPECIFIC CHALLENGE] is actually a common issue we've solved for many clients.

In our upcoming strategy session, we'll dive deep into your specific situation and create a custom roadmap for your success.

**Action Item for You:**
Before our meeting, please think about these questions:
1. What's your biggest frustration with your current marketing efforts?
2. If you could change one thing about your customer acquisition process, what would it be?
3. What would a 50% increase in qualified leads mean for your business?

Your answers will help us create an even more targeted strategy for your success.

Looking forward to our conversation!

Best regards,
[SENDER_NAME]
[SENDER_TITLE]
[COMPANY_NAME]

P.S. I've attached a case study showing how we helped a company similar to yours achieve a 300% increase in leads within 60 days. The strategies we used could be adapted for your business as well.`
      }
    ],
    'project-completion': [
      {
        type: 'completion',
        content: `Hi [FIRST_NAME],

🎉 Congratulations! We've officially completed [PROJECT_NAME], and I couldn't be more excited to share the incredible results we've achieved together.

**The Numbers Speak for Themselves:**

When we started this project [X] weeks ago, you were facing [INITIAL_CHALLENGE]. Today, here's what we've accomplished:

📈 **Performance Metrics:**
• [METRIC_1]: Increased by [PERCENTAGE]% (from [BEFORE] to [AFTER])
• [METRIC_2]: Improved by [PERCENTAGE]% (from [BEFORE] to [AFTER])
• [METRIC_3]: Achieved [SPECIFIC_RESULT]
• Total ROI: [X]x return on your investment

💡 **Strategic Improvements:**
• Implemented [STRATEGY_1] that resulted in [SPECIFIC_OUTCOME]
• Optimized [PROCESS_2] leading to [MEASURABLE_RESULT]
• Created [DELIVERABLE_3] that will continue generating value for months to come

**What Made This Success Possible:**

Your success wasn't just about the tactics we implemented - it was about the strategic foundation we built together. Here's what made the difference:

1. **Clear Vision & Goals**: From day one, we had a clear understanding of what success looked like for [COMPANY_NAME].

2. **Data-Driven Decisions**: Every strategy was backed by solid data and market research specific to your [INDUSTRY] industry.

3. **Collaborative Partnership**: Your team's insights and feedback were invaluable in shaping the final results.

4. **Continuous Optimization**: We didn't just set it and forget it - we constantly monitored and improved performance throughout the project.

**The Long-Term Impact:**

While these immediate results are impressive, the real value lies in the long-term systems and processes we've put in place. These improvements will continue generating value for your business month after month.

Conservative estimates suggest that the work we've done together will generate an additional $[AMOUNT] in revenue over the next 12 months. But based on what I've seen from similar clients, you could see even better results.

**Your Complete Project Deliverables:**

Everything we've created for you has been uploaded to your client portal, including:
• [DELIVERABLE_1] - Complete with implementation guide
• [DELIVERABLE_2] - Ready for immediate use
• [DELIVERABLE_3] - With detailed instructions for your team
• Performance reports and analytics dashboard
• Step-by-step maintenance guide
• Contact information for ongoing support

**Client Success Story:**

Your results remind me of another client, [CLIENT_NAME], who saw similar improvements after working with us. Six months after project completion, they told me:

"The work [COMPANY_NAME] did for us didn't just improve our immediate results - it transformed how we think about our business. The systems and strategies are still driving growth today, and we've been able to scale beyond what we thought was possible."

That's the kind of lasting impact we strive for with every client.

**What's Next:**

While this project is complete, our relationship doesn't have to end here. Many of our most successful clients continue working with us in various capacities:

• **Ongoing Optimization**: Monthly reviews and improvements to maintain peak performance
• **Expansion Projects**: Applying our proven strategies to new areas of your business
• **Strategic Consulting**: Quarterly strategy sessions to ensure continued growth
• **Priority Support**: Direct access to our team for any questions or challenges

**A Personal Thank You:**

Working with you and your team has been an absolute pleasure. Your commitment to excellence and willingness to implement our recommendations made this project a joy to work on.

It's clients like you who remind me why I love what I do. Seeing [COMPANY_NAME] achieve these results is incredibly rewarding, and I'm grateful for the opportunity to be part of your success story.

**Celebration Time:**

This level of success deserves recognition! I'd love to feature your results (with your permission) as a case study to help other businesses in the [INDUSTRY] industry see what's possible.

Would you be open to a brief interview about your experience? It would help other business owners understand the value of strategic [SERVICE_TYPE] and could position you as a thought leader in your industry.

Once again, congratulations on your outstanding results!

Best regards,
[SENDER_NAME]
[SENDER_TITLE]
[COMPANY_NAME]
[PHONE] | [EMAIL]

P.S. I've scheduled a follow-up call for next week to discuss potential next steps and answer any questions about maintaining these results. Looking forward to continuing our partnership!`
      }
    ]
  };

  return templates[sequenceType]?.[emailNumber - 1] || templates['onboarding'][0];
};

const getSalesEmailContent = (sequenceType: string, emailType: string, emailNumber: number) => {
  const templates = {
    'cold-outreach': [
      {
        type: 'welcome',
        content: `Hi [FIRST_NAME],

I hope this email finds you well. I'm reaching out because I noticed [COMPANY_NAME] has been making some impressive moves in the [INDUSTRY] space, particularly [SPECIFIC_OBSERVATION].

My name is [SENDER_NAME], and I'm the [SENDER_TITLE] at [COMPANY_NAME]. We specialize in helping [TARGET_AUDIENCE] like yourself overcome [COMMON_CHALLENGE] and achieve [DESIRED_OUTCOME].

**Why I'm Reaching Out:**

I've been researching companies in your industry, and [COMPANY_NAME] caught my attention for several reasons:
• Your recent [ACHIEVEMENT/NEWS] shows real momentum in the market
• Your approach to [BUSINESS_AREA] aligns with trends we're seeing among high-growth companies
• Based on your [COMPANY_SIZE/STAGE], you're likely facing challenges that we've helped similar companies solve

**The Challenge I See:**

Most [INDUSTRY] companies your size are struggling with [SPECIFIC_CHALLENGE]. This typically manifests as:
• [PAIN_POINT_1] - leading to [CONSEQUENCE]
• [PAIN_POINT_2] - resulting in [NEGATIVE_IMPACT]
• [PAIN_POINT_3] - causing [FRUSTRATION/COST]

Sound familiar? You're not alone. 73% of [TARGET_AUDIENCE] report experiencing these exact issues.

**The Cost of Inaction:**

Here's what's concerning: companies that don't address these challenges typically see:
• [STATISTIC_1] - e.g., 40% decrease in efficiency over 12 months
• [STATISTIC_2] - e.g., $50K+ in lost revenue per quarter
• [STATISTIC_3] - e.g., 60% higher customer acquisition costs

But here's the good news...

**The Solution:**

Over the past [X] years, we've developed a proven methodology that's helped over [NUMBER] companies like yours achieve remarkable results:

**Case Study: [SIMILAR_COMPANY]**
[SIMILAR_COMPANY], a [INDUSTRY] company similar to yours, was facing [CHALLENGE]. Within [TIMEFRAME], our solution helped them:
• Increase [METRIC] by [PERCENTAGE]%
• Reduce [COST/TIME] by [AMOUNT]
• Achieve [SPECIFIC_OUTCOME]

The CEO told us: "[TESTIMONIAL_QUOTE]"

**Our Proven Process:**

**Phase 1: Assessment & Strategy (Week 1-2)**
• Comprehensive analysis of your current [BUSINESS_AREA]
• Identification of specific bottlenecks and opportunities
• Custom strategy development based on your unique situation

**Phase 2: Implementation (Week 3-6)**
• Step-by-step execution of optimized processes
• Integration with your existing systems
• Training for your team on new methodologies

**Phase 3: Optimization (Week 7-12)**
• Continuous monitoring and refinement
• Performance tracking and reporting
• Scaling successful initiatives

**Why We're Different:**

Unlike other [INDUSTRY] solutions that offer one-size-fits-all approaches, we create custom strategies based on:
• Your specific business model and market position
• Your team's capabilities and resources
• Your short-term and long-term goals
• Your existing technology stack and processes

**The Numbers:**

Our clients typically see:
• [METRIC_1]: Average improvement of [PERCENTAGE]%
• [METRIC_2]: Median increase of [AMOUNT]
• [METRIC_3]: Typical ROI of [X]x within [TIMEFRAME]
• Client retention rate: 94% (industry average is 67%)

**What This Could Mean for [COMPANY_NAME]:**

Based on your company profile, implementing our solution could potentially:
• Increase your [RELEVANT_METRIC] by [CONSERVATIVE_ESTIMATE]%
• Save approximately [TIME/COST] per [PERIOD]
• Generate an additional $[AMOUNT] in [REVENUE/SAVINGS] annually

**No-Risk Proposition:**

I understand you're busy and probably get pitched constantly. That's why I'd like to offer you something valuable with no strings attached:

**Free [DELIVERABLE] - Worth $[VALUE]**

I'll personally conduct a 30-minute analysis of your current [BUSINESS_AREA] and provide you with:
• Specific recommendations for immediate improvements
• Identification of your biggest opportunity areas
• Benchmarking against industry leaders
• Custom action plan for the next 90 days

This analysis typically costs $[AMOUNT], but I'll provide it free because I believe in the value we can deliver to [COMPANY_NAME].

**What Other Leaders Are Saying:**

"[TESTIMONIAL_1]" - [NAME], [TITLE] at [COMPANY]

"[TESTIMONIAL_2]" - [NAME], [TITLE] at [COMPANY]

"[TESTIMONIAL_3]" - [NAME], [TITLE] at [COMPANY]

**Next Steps:**

If you're interested in exploring how we can help [COMPANY_NAME] achieve similar results, I'd love to schedule a brief 15-minute call to:
• Understand your current situation and challenges
• Share specific examples of how we've helped similar companies
• Determine if there's a good fit for working together

You can book a time that works for you here: [CALENDAR_LINK]

Or if you prefer, just reply with a time that works better for you, and I'll send over a calendar invite.

**Not Ready to Talk?**

No problem! I'll be sharing some valuable insights over the next few days that can help you improve your [BUSINESS_AREA] regardless of whether we work together.

Thank you for taking the time to read this, [FIRST_NAME]. I look forward to the possibility of helping [COMPANY_NAME] achieve its goals.

Best regards,
[SENDER_NAME]
[SENDER_TITLE]
[COMPANY_NAME]
[PHONE] | [EMAIL]

P.S. I'll be in [CITY] next week and could potentially stop by your office if you'd prefer an in-person conversation. Let me know if that would be more convenient for you.`
      }
    ]
  };

  return templates[sequenceType]?.[emailNumber - 1] || templates['cold-outreach'][0];
};

const personalizeContent = (baseContent: any, request: SequenceGenerationRequest) => {
  let personalizedContent = baseContent.content;
  
  // Replace industry-specific placeholders
  personalizedContent = personalizedContent.replace(/\[INDUSTRY\]/g, request.industry);
  personalizedContent = personalizedContent.replace(/\[TARGET_AUDIENCE\]/g, request.targetAudience);
  
  // Add specific challenges and goals
  if (request.currentChallenges.length > 0) {
    personalizedContent = personalizedContent.replace(/\[COMMON_CHALLENGE\]/g, request.currentChallenges[0]);
  }
  
  if (request.goals.length > 0) {
    personalizedContent = personalizedContent.replace(/\[DESIRED_OUTCOME\]/g, request.goals[0]);
  }
  
  return personalizedContent;
};

const expandContent = (content: string, targetLength: number, brandVoice: string) => {
  // This is a simplified version - in a real implementation, you'd use AI to expand content
  // while maintaining the brand voice and ensuring it reaches the target length
  
  const currentLength = content.split(' ').length;
  
  if (currentLength < targetLength) {
    // Add more detailed examples, case studies, and explanations
    const expansions = {
      'professional': [
        '\n\n**Industry Insights:**\nOur research indicates that companies in your sector are experiencing significant challenges in this area. The data shows that organizations implementing strategic solutions see measurable improvements within 90 days.',
        '\n\n**Best Practices:**\nBased on our experience with similar organizations, we recommend a phased approach that minimizes risk while maximizing impact. This methodology has proven effective across various market conditions.',
      ],
      'casual': [
        '\n\nHere\'s the thing - I\'ve seen this same situation play out dozens of times, and there\'s almost always a straightforward solution that makes a huge difference.',
        '\n\nI know this might sound too good to be true (trust me, I get it), but the results speak for themselves. Happy to share more details if you\'re curious.',
      ],
      'friendly': [
        '\n\nI hope this gives you some helpful insights! I\'m always excited to share what we\'ve learned from working with amazing companies like yours.',
        '\n\nFeel free to reach out if you have any questions - I\'m here to help, whether we end up working together or not.',
      ],
      'authoritative': [
        '\n\n**Market Analysis:**\nOur proprietary research across 500+ companies in your sector reveals critical patterns that directly impact performance metrics. Organizations that implement our recommendations consistently outperform their competitors.',
        '\n\n**Strategic Advantage:**\nThe competitive landscape is rapidly evolving, and companies that act quickly on these insights maintain significant advantages over those that delay implementation.',
      ]
    };
    
    const voiceExpansions = expansions[brandVoice] || expansions['professional'];
    content += voiceExpansions.join('');
  }
  
  return content;
};

const generateSubject = (request: SequenceGenerationRequest, emailType: string, emailNumber: number) => {
  const subjects = {
    'agency': {
      'welcome': `Welcome to [COMPANY_NAME] - Your Success Journey Starts Now!`,
      'education': `The #1 Mistake [INDUSTRY] Companies Make (And How to Fix It)`,
      'completion': `🎉 [PROJECT_NAME] Complete - Your Amazing Results Inside!`,
    },
    'sales': {
      'welcome': `Quick question about [COMPANY_NAME]'s [INDUSTRY] strategy`,
      'social-proof': `How [SIMILAR_COMPANY] increased [METRIC] by [PERCENTAGE]% in [TIMEFRAME]`,
      'education': `[INDUSTRY] Benchmark: Where does [COMPANY_NAME] stand?`,
    }
  };

  return subjects[request.businessType]?.[emailType] || `Email ${emailNumber}: ${emailType}`;
};

const getEmailName = (emailType: string, emailNumber: number) => {
  const names = {
    'welcome': 'Welcome & Introduction',
    'education': 'Educational Value',
    'social-proof': 'Social Proof & Results',
    'completion': 'Project Completion',
    'follow-up': 'Follow-up & Next Steps'
  };

  return names[emailType] || `Email ${emailNumber}`;
};

const getExpectedConversionRate = (emailType: string, emailNumber: number) => {
  const rates = {
    'welcome': 45.7,
    'education': 42.1,
    'social-proof': 38.2,
    'completion': 55.3,
    'follow-up': 25.8
  };

  return rates[emailType] || 30.0;
};

const getPersonalizationTags = (businessType: string) => {
  const commonTags = [
    { tag: '[FIRST_NAME]', description: 'Contact\'s first name', example: 'John', required: true },
    { tag: '[COMPANY_NAME]', description: 'Company name', example: 'Acme Corp', required: true },
    { tag: '[SENDER_NAME]', description: 'Your name', example: 'Jane Doe', required: true },
  ];

  return commonTags;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const request: SequenceGenerationRequest = await req.json();
    
    // Generate email sequence based on request
    const emails = [];
    const emailTypes = request.businessType === 'agency' 
      ? ['welcome', 'education', 'social-proof', 'completion', 'follow-up']
      : ['welcome', 'social-proof', 'education', 'objection', 'offer'];

    for (let i = 0; i < request.emailCount; i++) {
      const emailType = emailTypes[i % emailTypes.length];
      const delay = i === 0 ? 0 : Math.pow(2, i - 1); // Exponential delays: 0, 1, 2, 4, 8 days
      
      const email = generateEmailContent(request, emailType, i + 1, delay);
      emails.push(email);
    }

    const sequence = {
      id: Date.now().toString(),
      name: `${request.sequenceType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Sequence`,
      type: request.businessType,
      category: request.sequenceType,
      description: `AI-generated ${request.businessType} sequence for ${request.industry} targeting ${request.targetAudience}`,
      emails,
      status: 'draft',
      qualificationCriteria: request.qualificationCriteria,
      stats: {
        sent: 0,
        opened: 0,
        clicked: 0,
        replied: 0,
        converted: 0,
        openRate: 0,
        clickRate: 0,
        conversionRate: 0
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: [request.industry, request.sequenceType, request.brandVoice]
    };

    return new Response(JSON.stringify(sequence), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error generating email sequence:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
