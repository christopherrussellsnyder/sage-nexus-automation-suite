
import { EmailSequence, EmailTemplate, SequenceGenerationRequest } from '@/types/emailSequence';

export class EmailSequenceService {
  private static readonly STORAGE_KEY = 'email_sequences';
  private static readonly API_BASE_URL = 'https://qtckfvprvpxbbteinxve.supabase.co/functions/v1';

  static getStoredSequences(): EmailSequence[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  static saveSequence(sequence: EmailSequence): void {
    const sequences = this.getStoredSequences();
    const existingIndex = sequences.findIndex(s => s.id === sequence.id);
    
    if (existingIndex >= 0) {
      sequences[existingIndex] = { ...sequence, updatedAt: new Date().toISOString() };
    } else {
      sequences.push({ ...sequence, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sequences));
  }

  static async generateSequence(request: SequenceGenerationRequest): Promise<EmailSequence> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/generate-email-sequence`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0Y2tmdnBydnB4YmJ0ZWlueHZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzMjY0MTcsImV4cCI6MjA2NDkwMjQxN30.0he21MpcO1l-pdiMcfekTtzlSiVRNYSaDWjHa_SFFBs`
        },
        body: JSON.stringify(request)
      });

      if (!response.ok) {
        throw new Error(`Failed to generate sequence: ${response.status}`);
      }

      const generatedSequence = await response.json();
      return generatedSequence;
    } catch (error) {
      console.error('Error generating email sequence:', error);
      throw error;
    }
  }

  static updateEmailTemplate(sequenceId: string, templateId: string, updates: Partial<EmailTemplate>): void {
    const sequences = this.getStoredSequences();
    const sequenceIndex = sequences.findIndex(s => s.id === sequenceId);
    
    if (sequenceIndex >= 0) {
      const emailIndex = sequences[sequenceIndex].emails.findIndex(e => e.id === templateId);
      if (emailIndex >= 0) {
        sequences[sequenceIndex].emails[emailIndex] = {
          ...sequences[sequenceIndex].emails[emailIndex],
          ...updates,
          lastModified: new Date().toISOString(),
          version: sequences[sequenceIndex].emails[emailIndex].version + 1
        };
        
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sequences));
      }
    }
  }

  static duplicateEmail(sequenceId: string, templateId: string): void {
    const sequences = this.getStoredSequences();
    const sequenceIndex = sequences.findIndex(s => s.id === sequenceId);
    
    if (sequenceIndex >= 0) {
      const emailIndex = sequences[sequenceIndex].emails.findIndex(e => e.id === templateId);
      if (emailIndex >= 0) {
        const originalEmail = sequences[sequenceIndex].emails[emailIndex];
        const duplicatedEmail: EmailTemplate = {
          ...originalEmail,
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: `${originalEmail.name} (Copy)`,
          lastModified: new Date().toISOString(),
          version: 1
        };
        
        sequences[sequenceIndex].emails.splice(emailIndex + 1, 0, duplicatedEmail);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sequences));
      }
    }
  }

  static getPersonalizationTags(type: 'agency' | 'sales'): PersonalizationTag[] {
    const commonTags = [
      { tag: '[FIRST_NAME]', description: 'Contact\'s first name', example: 'John', required: true },
      { tag: '[LAST_NAME]', description: 'Contact\'s last name', example: 'Smith', required: false },
      { tag: '[COMPANY_NAME]', description: 'Company name', example: 'Acme Corp', required: true },
      { tag: '[INDUSTRY]', description: 'Industry sector', example: 'Technology', required: false },
      { tag: '[CITY]', description: 'Contact\'s city', example: 'New York', required: false },
      { tag: '[SENDER_NAME]', description: 'Your name', example: 'Jane Doe', required: true },
      { tag: '[SENDER_TITLE]', description: 'Your title', example: 'Account Manager', required: false },
    ];

    if (type === 'agency') {
      return [
        ...commonTags,
        { tag: '[PROJECT_NAME]', description: 'Current project name', example: 'Website Redesign', required: false },
        { tag: '[ACCOUNT_MANAGER]', description: 'Account manager name', example: 'Sarah Johnson', required: false },
        { tag: '[PROJECT_TIMELINE]', description: 'Project timeline', example: '6 weeks', required: false },
        { tag: '[PORTAL_LINK]', description: 'Client portal link', example: 'https://portal.agency.com', required: false },
      ];
    } else {
      return [
        ...commonTags,
        { tag: '[PRODUCT_NAME]', description: 'Product or service name', example: 'CRM Software', required: false },
        { tag: '[MEETING_LINK]', description: 'Meeting booking link', example: 'https://cal.com/demo', required: false },
        { tag: '[CASE_STUDY]', description: 'Relevant case study', example: 'TechCorp success story', required: false },
        { tag: '[DEMO_LINK]', description: 'Demo or trial link', example: 'https://demo.product.com', required: false },
      ];
    }
  }
}
