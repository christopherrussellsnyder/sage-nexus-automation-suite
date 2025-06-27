
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SequenceWizardData {
  businessName: string;
  industry: string;
  targetAudience: string;
  uniqueValueProp: string;
  productService: string;
  averageDealSize: string;
  salesCycle: string;
  audiencePainPoints: string[];
  competitorAnalysis: string;
  marketPosition: string;
  campaignGoal: string;
  sequenceType: string;
  preferredTone: string;
  senderName: string;
  senderTitle: string;
  companyName: string;
  contactInfo: string;
  emailCount: number;
  sequenceLength: number;
  triggerType: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: SequenceWizardData = await req.json();
    console.log('Generating enhanced email sequence for:', data.businessName);

    const sequencePrompt = createSequencePrompt(data);
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are an expert email marketing strategist specializing in high-converting email sequences. Create comprehensive, detailed email sequences that are 500-1200 words per email with proven psychological triggers and conversion optimization techniques.`
          },
          {
            role: 'user',
            content: sequencePrompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    const aiResponse = await response.json();
    const generatedContent = aiResponse.choices[0].message.content;

    // Parse the AI response and structure it
    const emailSequence = parseAIResponse(generatedContent, data);

    return new Response(JSON.stringify(emailSequence), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-enhanced-email-sequence:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

function createSequencePrompt(data: SequenceWizardData): string {
  const painPointsList = data.audiencePainPoints.join(', ');
  
  return `
Create a ${data.emailCount}-email ${data.sequenceType} sequence for:

BUSINESS PROFILE:
- Business: ${data.businessName}
- Industry: ${data.industry}
- Product/Service: ${data.productService}
- Target Audience: ${data.targetAudience}
- Unique Value Proposition: ${data.uniqueValueProp}
- Average Deal Size: ${data.averageDealSize}
- Sales Cycle: ${data.salesCycle}
- Market Position: ${data.marketPosition}

AUDIENCE INSIGHTS:
- Pain Points: ${painPointsList}
- Competitor Analysis: ${data.competitorAnalysis}

CAMPAIGN DETAILS:
- Goal: ${data.campaignGoal}
- Tone: ${data.preferredTone}
- Sender: ${data.senderName}, ${data.senderTitle}
- Company: ${data.companyName}

SEQUENCE REQUIREMENTS:
- Each email must be 500-1200 words
- Include compelling subject lines with A/B test variants
- Use personalization tags like [FIRST_NAME], [COMPANY_NAME], [INDUSTRY]
- Include clear call-to-actions
- Add social proof and case studies
- Address common objections
- Build progressive value throughout the sequence
- Include P.S. sections for additional impact

EMAIL STRUCTURE FOR EACH EMAIL:
1. Subject Line (with 2-3 variants)
2. Preheader text
3. Opening hook/personalization
4. Value proposition
5. Main content with 3-5 key points
6. Social proof/testimonial
7. Clear call-to-action
8. P.S. section
9. Professional signature

SEQUENCE FLOW:
${getSequenceFlow(data.sequenceType, data.emailCount)}

For each email, provide:
- Day number in sequence
- Email type (opener, value, social-proof, etc.)
- Subject line with variants
- Full email body (500-1200 words)
- Key psychological triggers used
- Personalization tags included

Format the response as a structured JSON with emails array containing all details.
`;
}

function getSequenceFlow(sequenceType: string, emailCount: number): string {
  const flows = {
    'cold-outreach': `
Day 1-2: Research-based introduction with curiosity gap
Day 3-5: Value demonstration with case studies
Day 6-10: Educational content establishing expertise
Day 11-15: Social proof and testimonials
Day 16-20: Objection handling and risk reversal
Day 21-25: Offer presentation with urgency
Day 26-30: Final push and relationship maintenance`,
    
    'warm-follow-up': `
Day 1: Thank you and next steps
Day 3: Value reinforcement with resources
Day 7: Case study and social proof
Day 14: Objection handling
Day 21: Direct offer with incentive
Day 30: Final follow-up`,
    
    'nurture-sequence': `
Progressive value delivery with educational content, 
social proof, and gentle calls-to-action building trust over time`,
    
    'client-onboarding': `
Welcome and expectation setting, team introductions, 
process walkthrough, milestone celebrations, and relationship building`
  };
  
  return flows[sequenceType as keyof typeof flows] || 'Progressive value delivery sequence';
}

function parseAIResponse(content: string, data: SequenceWizardData) {
  try {
    // Try to parse as JSON first
    const parsed = JSON.parse(content);
    if (parsed.emails) return parsed;
  } catch {
    // If not JSON, parse as structured text
  }

  // Fallback: Create structured response from text
  const emails = [];
  const emailSections = content.split(/Email \d+|Day \d+/).filter(section => section.trim());

  for (let i = 0; i < Math.min(emailSections.length, data.emailCount); i++) {
    const section = emailSections[i];
    const email = {
      id: `email_${i + 1}`,
      sequenceDay: i + 1,
      name: `${data.sequenceType.replace('-', ' ')} Email ${i + 1}`,
      type: getEmailType(i, data.emailCount),
      subject: extractSubject(section) || `Day ${i + 1}: ${data.businessName} - Important Message`,
      preheader: extractPreheader(section) || 'Don\'t miss this important update',
      body: extractBody(section, data) || generateFallbackEmail(i + 1, data),
      cta: extractCTA(section) || 'Learn More',
      personalizations: ['[FIRST_NAME]', '[COMPANY_NAME]', '[INDUSTRY]'],
      psychologicalTriggers: ['curiosity', 'social-proof', 'urgency'],
      timing: `Day ${i + 1}`,
      followUpStrategy: 'Email sequence continuation',
      wordCount: 0,
      readabilityScore: 75,
      abTestVariants: {
        subjectVariants: [
          `Day ${i + 1}: ${data.businessName} - Important Message`,
          `${data.targetAudience} - This Changes Everything`,
          `Quick Question About ${data.productService}`
        ],
        bodyVariants: []
      }
    };
    
    email.wordCount = email.body.split(/\s+/).length;
    emails.push(email);
  }

  return {
    name: `${data.businessName} ${data.sequenceType.replace('-', ' ')} Sequence`,
    description: `AI-generated ${data.sequenceType} sequence for ${data.targetAudience} in ${data.industry}`,
    emails,
    sequenceLength: data.sequenceLength
  };
}

function getEmailType(index: number, total: number): string {
  const types = ['opener', 'value', 'social-proof', 'objection-handler', 'offer', 'urgency', 'final'];
  const typeIndex = Math.floor((index / total) * types.length);
  return types[Math.min(typeIndex, types.length - 1)];
}

function extractSubject(section: string): string | null {
  const subjectMatch = section.match(/Subject:?\s*(.+)/i);
  return subjectMatch ? subjectMatch[1].trim() : null;
}

function extractPreheader(section: string): string | null {
  const preheaderMatch = section.match(/Preheader:?\s*(.+)/i);
  return preheaderMatch ? preheaderMatch[1].trim() : null;
}

function extractBody(section: string, data: SequenceWizardData): string | null {
  // Extract content between markers or return the whole section if it's substantial
  const cleaned = section.replace(/Subject:.*?\n/gi, '').replace(/Preheader:.*?\n/gi, '').trim();
  return cleaned.length > 200 ? cleaned : null;
}

function extractCTA(section: string): string | null {
  const ctaMatch = section.match(/CTA:?\s*(.+)/i);
  return ctaMatch ? ctaMatch[1].trim() : null;
}

function generateFallbackEmail(dayNumber: number, data: SequenceWizardData): string {
  return `Hi [FIRST_NAME],

I hope this email finds you well. I wanted to reach out because I noticed [COMPANY_NAME] is in the ${data.industry} industry, and I believe our ${data.productService} could be incredibly valuable for your team.

Here's what makes this particularly relevant for ${data.targetAudience} like yourself:

**The Challenge You're Facing:**
Many businesses in ${data.industry} struggle with ${data.audiencePainPoints[0] || 'operational efficiency'}. This leads to decreased productivity, increased costs, and missed opportunities for growth.

**Our Unique Approach:**
${data.uniqueValueProp} - This isn't just another solution. It's a comprehensive approach that addresses the root causes of these challenges.

**Proven Results:**
We've helped similar companies in your industry achieve:
• 40% improvement in operational efficiency
• 25% reduction in costs
• 60% faster time-to-market for new initiatives

**Why This Matters Now:**
The competitive landscape in ${data.industry} is evolving rapidly. Companies that don't adapt risk being left behind. With our solution, you can stay ahead of the curve and maintain your competitive edge.

**Next Steps:**
I'd love to show you exactly how this could work for [COMPANY_NAME]. Would you be open to a brief 15-minute call this week to discuss your specific situation?

You can schedule a time that works for you here: [CALENDAR_LINK]

Best regards,
${data.senderName}
${data.senderTitle}
${data.companyName}
${data.contactInfo}

P.S. I'm also including a case study of how we helped a similar company in ${data.industry} achieve remarkable results. It might give you some ideas for your own business: [CASE_STUDY_LINK]`;
}
