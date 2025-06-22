
import { useState, useEffect } from 'react';

interface CopySettings {
  // Brand & Navigation
  brandName: string;
  brandTagline: string;
  
  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroCTA: string;
  
  // Feature Cards
  ecommerceTitle: string;
  ecommerceDescription: string;
  agencyTitle: string;
  agencyDescription: string;
  salesTitle: string;
  salesDescription: string;
  copywritingTitle: string;
  copywritingDescription: string;
  
  // Dashboard
  dashboardWelcome: string;
  dashboardSubtitle: string;
  
  // Navigation
  featuresLabel: string;
  pricingLabel: string;
  aboutLabel: string;
  signInLabel: string;
  getStartedLabel: string;
  
  // Login Page
  loginTitle: string;
  loginSubtitle: string;
  loginCardTitle: string;
  loginCardDescription: string;
  loginEmailPlaceholder: string;
  loginPasswordPlaceholder: string;
  loginButton: string;
  loginLoadingText: string;
  loginLinkText: string;
  
  // Signup Page
  signupTitle: string;
  signupSubtitle: string;
  signupCardTitle: string;
  signupCardDescription: string;
  signupEmailPlaceholder: string;
  signupPasswordPlaceholder: string;
  signupButton: string;
  signupLoadingText: string;
  signupLinkText: string;
  
  // Survey Page
  surveyTitle: string;
  surveyDescription: string;
  surveyCardTitle: string;
  surveyCardDescription: string;
  surveyQuestion1: string;
  surveyQuestion2: string;
  surveyQuestion3: string;
  surveySubmitButton: string;
  surveySubmitLoadingText: string;
  
  // Admin Panel
  adminTitle: string;
  adminDescription: string;
  adminSaveButton: string;
  adminResetButton: string;
  
  // Tool Pages
  adCopyTitle: string;
  adCopyDescription: string;
  emailSequencesTitle: string;
  emailSequencesDescription: string;
  socialContentTitle: string;
  socialContentDescription: string;
  websiteCopyTitle: string;
  websiteCopyDescription: string;
  backToDashboard: string;
  
  // Header Dropdown
  copywritingToolsLabel: string;
  accountLabel: string;
  dashboardLabel: string;
  adminPanelLabel: string;
  signOutLabel: string;
}

const defaultCopySettings: CopySettings = {
  // Brand & Navigation
  brandName: 'Sage.ai',
  brandTagline: 'AI Business Automation Suite',
  
  // Hero Section (from Index.tsx)
  heroTitle: 'Welcome to the Future of Business Automation',
  heroSubtitle: 'Transform Your Business with AI-Powered Solutions',
  heroDescription: 'Streamline operations, boost productivity, and accelerate growth with our comprehensive AI platform.',
  heroCTA: 'Get Started',
  
  // Feature Cards
  ecommerceTitle: 'E-commerce',
  ecommerceDescription: 'AI-powered product research, listing optimization, and store management',
  agencyTitle: 'Agency',
  agencyDescription: 'Complete marketing automation and client management solutions',
  salesTitle: 'Sales',
  salesDescription: 'Intelligent lead generation, prospect research, and sales automation',
  copywritingTitle: 'Copywriting',
  copywritingDescription: 'AI-generated marketing copy, content creation, and brand messaging',
  
  // Dashboard
  dashboardWelcome: 'Welcome to Your Dashboard',
  dashboardSubtitle: 'Choose your area of focus to get started',
  
  // Navigation
  featuresLabel: 'Features',
  pricingLabel: 'Pricing',
  aboutLabel: 'About',
  signInLabel: 'Sign In',
  getStartedLabel: 'Get Started',
  
  // Login Page
  loginTitle: 'Sign in to your account',
  loginSubtitle: 'create a new account',
  loginCardTitle: 'Welcome back',
  loginCardDescription: 'Sign in to your account to continue',
  loginEmailPlaceholder: 'Email address',
  loginPasswordPlaceholder: 'Password',
  loginButton: 'Sign in',
  loginLoadingText: 'Signing in...',
  loginLinkText: 'Or',
  
  // Signup Page
  signupTitle: 'Create your account',
  signupSubtitle: 'sign in to your existing account',
  signupCardTitle: 'Get started',
  signupCardDescription: 'Create your account to start using AI automation tools',
  signupEmailPlaceholder: 'Email address',
  signupPasswordPlaceholder: 'Password',
  signupButton: 'Create account',
  signupLoadingText: 'Creating account...',
  signupLinkText: 'Or',
  
  // Survey Page
  surveyTitle: 'Welcome to your AI automation platform',
  surveyDescription: 'Help us personalize your experience with these 3 quick questions',
  surveyCardTitle: "Let's customize your AI tools",
  surveyCardDescription: 'Your answers will help us show you the most relevant automation features',
  surveyQuestion1: 'What type of business do you run?',
  surveyQuestion2: "What's your primary goal with AI automation?",
  surveyQuestion3: "What's your biggest challenge right now?",
  surveySubmitButton: 'Complete Setup & Access AI Tools',
  surveySubmitLoadingText: 'Setting up your dashboard...',
  
  // Admin Panel
  adminTitle: 'Admin Panel',
  adminDescription: 'Customize all text and copy throughout the application',
  adminSaveButton: 'Save Changes',
  adminResetButton: 'Reset to Default',
  
  // Tool Pages
  adCopyTitle: 'Ad Copy Generator',
  adCopyDescription: 'Create compelling ad copy for all major social media platforms',
  emailSequencesTitle: 'Email Sequence Generator',
  emailSequencesDescription: '7 different email types optimized for maximum engagement',
  socialContentTitle: 'Social Content Generator',
  socialContentDescription: 'Viral-worthy social media content with complete captions',
  websiteCopyTitle: 'Website Copy Generator',
  websiteCopyDescription: 'Professional website copy for all your pages',
  backToDashboard: 'Back to Dashboard',
  
  // Header Dropdown
  copywritingToolsLabel: 'Copywriting Tools',
  accountLabel: 'Account',
  dashboardLabel: 'Dashboard',
  adminPanelLabel: 'Admin Panel',
  signOutLabel: 'Sign Out'
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
