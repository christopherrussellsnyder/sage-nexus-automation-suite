
import { SequenceWizardData, EnhancedEmailSequence, EnhancedEmailTemplate } from '@/types/sequenceWizard';

export class EmailSequenceAIService {
  private static readonly API_BASE_URL = 'https://qtckfvprvpxbbteinxve.supabase.co/functions/v1';

  static async generateSequence(data: SequenceWizardData): Promise<EnhancedEmailSequence> {
    try {
      console.log('Generating AI email sequence with data:', data);
      
      const response = await fetch(`${this.API_BASE_URL}/generate-enhanced-email-sequence`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0Y2tmdnBydnB4YmJ0ZWlueHZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzMjY0MTcsImV4cCI6MjA2NDkwMjQxN30.0he21MpcO1l-pdiMcfekTtzlSiVRNYSaDWjHa_SFFBs`
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`Failed to generate sequence: ${response.status} ${response.statusText}`);
      }

      const generatedSequence = await response.json();
      
      // Calculate metadata
      const totalWordCount = generatedSequence.emails.reduce((sum: number, email: EnhancedEmailTemplate) => sum + email.wordCount, 0);
      const averageEmailLength = Math.round(totalWordCount / generatedSequence.emails.length);

      const enhancedSequence: EnhancedEmailSequence = {
        ...generatedSequence,
        id: `seq_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        businessData: data,
        aiGenerated: true,
        totalWordCount,
        averageEmailLength,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'draft'
      };

      return enhancedSequence;
    } catch (error) {
      console.error('Error generating AI email sequence:', error);
      throw new Error(`Failed to generate email sequence: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  static async optimizeEmailContent(email: EnhancedEmailTemplate, businessData: SequenceWizardData): Promise<EnhancedEmailTemplate> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/optimize-email-content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0Y2tmdnBydnB4YmJ0ZWlueHZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzMjY0MTcsImV4cCI6MjA2NDkwMjQxN30.0he21MpcO1l-pdiMcfekTtzlSiVRNYSaDWjHa_SFFBs`
        },
        body: JSON.stringify({ email, businessData })
      });

      if (!response.ok) {
        throw new Error(`Failed to optimize email: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error optimizing email content:', error);
      throw error;
    }
  }

  static calculateReadabilityScore(text: string): number {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const words = text.split(/\s+/).filter(w => w.length > 0).length;
    const avgWordsPerSentence = words / sentences || 0;
    
    if (avgWordsPerSentence < 15) return 90; // Easy
    if (avgWordsPerSentence < 20) return 70; // Medium
    return 50; // Hard
  }

  static extractPersonalizationTags(text: string): string[] {
    const tagPattern = /\[([A-Z_]+)\]/g;
    const matches = text.match(tagPattern);
    return matches ? [...new Set(matches)] : [];
  }

  static analyzeEmailContent(body: string): {
    wordCount: number;
    readabilityScore: number;
    personalizations: string[];
    hasCallToAction: boolean;
    hasSocialProof: boolean;
  } {
    const wordCount = body.split(/\s+/).filter(w => w.length > 0).length;
    const readabilityScore = this.calculateReadabilityScore(body);
    const personalizations = this.extractPersonalizationTags(body);
    const hasCallToAction = /\b(click|call|schedule|book|download|sign up|get started|learn more)\b/i.test(body);
    const hasSocialProof = /\b(customer|client|testimonial|review|case study|success|result)\b/i.test(body);

    return {
      wordCount,
      readabilityScore,
      personalizations,
      hasCallToAction,
      hasSocialProof
    };
  }
}
