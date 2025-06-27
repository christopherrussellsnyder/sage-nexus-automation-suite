
export interface SequenceWizardData {
  // Business Information
  businessName: string;
  industry: string;
  targetAudience: string;
  uniqueValueProp: string;
  productService: string;
  averageDealSize: string;
  salesCycle: string;
  
  // Audience & Market Data
  audiencePainPoints: string[];
  competitorAnalysis: string;
  marketPosition: string;
  
  // Campaign Specifics
  campaignGoal: 'lead-generation' | 'nurturing' | 'conversion' | 'outreach' | 'retention';
  sequenceType: 'cold-outreach' | 'warm-follow-up' | 'nurture-sequence' | 'sales-sequence' | 'client-onboarding' | 'referral-request';
  preferredTone: 'professional' | 'casual' | 'authoritative' | 'friendly';
  
  // Personalization Data
  senderName: string;
  senderTitle: string;
  companyName: string;
  contactInfo: string;
  
  // Sequence Configuration
  emailCount: number;
  sequenceLength: number; // days
  triggerType: string;
}

export interface EnhancedEmailTemplate {
  id: string;
  sequenceDay: number;
  name: string;
  type: 'opener' | 'value' | 'social-proof' | 'objection-handler' | 'offer' | 'urgency' | 'final' | 'follow-up';
  subject: string;
  preheader: string;
  body: string; // 500-1200 words for comprehensive content
  cta: string;
  personalizations: string[];
  psychologicalTriggers: string[];
  timing: string;
  followUpStrategy: string;
  wordCount: number;
  readabilityScore: number;
  abTestVariants?: {
    subjectVariants: string[];
    bodyVariants: string[];
  };
}

export interface EnhancedEmailSequence {
  id: string;
  name: string;
  description: string;
  businessData: SequenceWizardData;
  emails: EnhancedEmailTemplate[];
  aiGenerated: boolean;
  sequenceLength: number;
  totalWordCount: number;
  averageEmailLength: number;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'active' | 'paused';
  performance?: {
    sent: number;
    opened: number;
    clicked: number;
    converted: number;
    revenue: number;
  };
}
