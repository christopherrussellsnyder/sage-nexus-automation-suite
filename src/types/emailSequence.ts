
export interface EmailTemplate {
  id: string;
  name: string;
  type: 'welcome' | 'social-proof' | 'education' | 'connection' | 'objection' | 'offer' | 'final' | 'follow-up' | 'demo' | 'onboarding' | 'completion';
  subject: string;
  content: string;
  timing: string;
  delay: number;
  delayUnit: 'hours' | 'days' | 'weeks';
  conversionRate: number;
  wordCount: number;
  qualificationCriteria: QualificationCriteria;
  personalizationTags: PersonalizationTag[];
  abTestVariants?: EmailVariant[];
  performance: EmailPerformance;
  lastModified: string;
  version: number;
}

export interface QualificationCriteria {
  companySize: 'startup' | 'small' | 'medium' | 'enterprise' | 'any';
  industry: string[];
  budgetRange: string;
  geography: string[];
  engagementLevel: 'cold' | 'warm' | 'hot';
  customFields: { [key: string]: any };
}

export interface PersonalizationTag {
  tag: string;
  description: string;
  example: string;
  required: boolean;
}

export interface EmailVariant {
  id: string;
  name: string;
  subject: string;
  content: string;
  performance: EmailPerformance;
}

export interface EmailPerformance {
  sent: number;
  opened: number;
  clicked: number;
  replied: number;
  converted: number;
  openRate: number;
  clickRate: number;
  conversionRate: number;
}

export interface EmailSequence {
  id: string;
  name: string;
  type: 'agency' | 'sales';
  category: string;
  description: string;
  emails: EmailTemplate[];
  status: 'draft' | 'active' | 'paused';
  qualificationCriteria: QualificationCriteria;
  stats: EmailPerformance;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export interface SequenceGenerationRequest {
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
  qualificationCriteria: QualificationCriteria;
}
