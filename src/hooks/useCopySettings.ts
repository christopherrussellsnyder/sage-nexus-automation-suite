
import { useState, useEffect } from 'react';

interface CopySettings {
  brandName: string;
  brandTagline: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroCTA: string;
  ecommerceTitle: string;
  ecommerceDescription: string;
  agencyTitle: string;
  agencyDescription: string;
  salesTitle: string;
  salesDescription: string;
  copywritingTitle: string;
  copywritingDescription: string;
  dashboardWelcome: string;
  dashboardSubtitle: string;
  featuresLabel: string;
  pricingLabel: string;
  aboutLabel: string;
  signInLabel: string;
  getStartedLabel: string;
}

const defaultCopySettings: CopySettings = {
  brandName: 'Sage.ai',
  brandTagline: 'AI Business Automation Suite',
  heroTitle: 'Welcome to the Future of Business Automation',
  heroSubtitle: 'Transform Your Business with AI-Powered Solutions',
  heroDescription: 'Streamline operations, boost productivity, and accelerate growth with our comprehensive AI platform.',
  heroCTA: 'Get Started',
  ecommerceTitle: 'E-commerce',
  ecommerceDescription: 'AI-powered product research, listing optimization, and store management',
  agencyTitle: 'Agency',
  agencyDescription: 'Complete marketing automation and client management solutions',
  salesTitle: 'Sales',
  salesDescription: 'Intelligent lead generation, prospect research, and sales automation',
  copywritingTitle: 'Copywriting',
  copywritingDescription: 'AI-generated marketing copy, content creation, and brand messaging',
  dashboardWelcome: 'Welcome to Your Dashboard',
  dashboardSubtitle: 'Choose your area of focus to get started',
  featuresLabel: 'Features',
  pricingLabel: 'Pricing',
  aboutLabel: 'About',
  signInLabel: 'Sign In',
  getStartedLabel: 'Get Started'
};

export const useCopySettings = () => {
  const [copySettings, setCopySettings] = useState<CopySettings>(defaultCopySettings);

  useEffect(() => {
    const savedSettings = localStorage.getItem('copySettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setCopySettings({ ...defaultCopySettings, ...parsed });
      } catch (error) {
        console.error('Error parsing copy settings:', error);
      }
    }
  }, []);

  return copySettings;
};

export type { CopySettings };
