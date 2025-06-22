
import { useState, useEffect } from 'react';

interface CopySettings {
  // Brand & Navigation
  brandName: string;
  brandTagline: string;
  
  // Hero Section (Overview Page)
  overviewHeroTitle: string;
  overviewHeroSubtitle: string;
  overviewHeroDescription: string;
  overviewBadge1: string;
  overviewBadge2: string;
  overviewBadge3: string;
  
  // Quick Stats (Overview Page)
  stat1Title: string;
  stat1Value: string;
  stat1Description: string;
  stat2Title: string;
  stat2Value: string;
  stat2Description: string;
  stat3Title: string;
  stat3Value: string;
  stat3Description: string;
  stat4Title: string;
  stat4Value: string;
  stat4Description: string;
  
  // Platform Features Section
  platformFeaturesTitle: string;
  platformFeaturesDescription: string;
  
  // Feature Cards
  ecommerceTitle: string;
  ecommerceDescription: string;
  ecommerceFeature1: string;
  ecommerceFeature2: string;
  ecommerceFeature3: string;
  ecommerceFeature4: string;
  ecommerceStat1Key: string;
  ecommerceStat1Value: string;
  ecommerceStat2Key: string;
  ecommerceStat2Value: string;
  
  agencyTitle: string;
  agencyDescription: string;
  agencyFeature1: string;
  agencyFeature2: string;
  agencyFeature3: string;
  agencyFeature4: string;
  agencyStat1Key: string;
  agencyStat1Value: string;
  agencyStat2Key: string;
  agencyStat2Value: string;
  
  salesTitle: string;
  salesDescription: string;
  salesFeature1: string;
  salesFeature2: string;
  salesFeature3: string;
  salesFeature4: string;
  salesStat1Key: string;
  salesStat1Value: string;
  salesStat2Key: string;
  salesStat2Value: string;
  
  copywritingTitle: string;
  copywritingDescription: string;
  copywritingFeature1: string;
  copywritingFeature2: string;
  copywritingFeature3: string;
  copywritingFeature4: string;
  copywritingStat1Key: string;
  copywritingStat1Value: string;
  copywritingStat2Key: string;
  copywritingStat2Value: string;
  
  // Value Proposition Section
  valuePropositionTitle: string;
  valuePropositionDescription: string;
  valueProposition1Title: string;
  valueProposition1Description: string;
  valueProposition2Title: string;
  valueProposition2Description: string;
  valueProposition3Title: string;
  valueProposition3Description: string;
  
  // CTA Section
  ctaTitle: string;
  ctaDescription: string;
  ctaPrimaryButton: string;
  ctaSecondaryButton: string;
  
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
  
  // Dashboard
  dashboardWelcome: string;
  dashboardSubtitle: string;
  
  // Button Labels
  exploreButton: string;
}

const defaultCopySettings: CopySettings = {
  // Brand & Navigation
  brandName: 'Sage.ai',
  brandTagline: 'AI Business Automation Suite',
  
  // Hero Section (Overview Page)
  overviewHeroTitle: 'Sage.ai',
  overviewHeroSubtitle: 'All-in-One AI Business Automation',
  overviewHeroDescription: 'Streamline your e-commerce, marketing, sales, and copywriting operations with advanced AI automation. Built for entrepreneurs, agencies, and sales teams who want to scale efficiently.',
  overviewBadge1: 'AI-Powered',
  overviewBadge2: 'Multi-Platform',
  overviewBadge3: 'Fully Automated',
  
  // Quick Stats (Overview Page)
  stat1Title: 'Active Projects',
  stat1Value: '24',
  stat1Description: 'Across all platforms',
  stat2Title: 'Time Saved',
  stat2Value: '156hrs',
  stat2Description: 'This month',
  stat3Title: 'Revenue Generated',
  stat3Value: '$89K',
  stat3Description: 'Through automation',
  stat4Title: 'Conversion Rate',
  stat4Value: '+285%',
  stat4Description: 'Average improvement',
  
  // Platform Features Section
  platformFeaturesTitle: 'Choose Your Automation Hub',
  platformFeaturesDescription: 'Select the area where you want to start automating your business',
  
  // Feature Cards
  ecommerceTitle: 'E-commerce Automation',
  ecommerceDescription: 'AI-powered website builder and product research',
  ecommerceFeature1: 'Custom Website Builder',
  ecommerceFeature2: 'Weekly Product Research',
  ecommerceFeature3: 'Trending Product Analysis',
  ecommerceFeature4: 'Store Templates',
  ecommerceStat1Key: 'stores',
  ecommerceStat1Value: '12',
  ecommerceStat2Key: 'revenue',
  ecommerceStat2Value: '$45K',
  
  agencyTitle: 'Marketing Agency Tools',
  agencyDescription: 'Multi-platform campaign management and optimization',
  agencyFeature1: 'Campaign Orchestration',
  agencyFeature2: 'Lead Scoring',
  agencyFeature3: 'Social Media Factory',
  agencyFeature4: 'Client Reporting',
  agencyStat1Key: 'clients',
  agencyStat1Value: '28',
  agencyStat2Key: 'campaigns',
  agencyStat2Value: '156',
  
  salesTitle: 'Sales Operations',
  salesDescription: 'Intelligent prospect research and sales automation',
  salesFeature1: 'Prospect Research',
  salesFeature2: 'Sales Sequences',
  salesFeature3: 'Meeting Intelligence',
  salesFeature4: 'Deal Progression',
  salesStat1Key: 'prospects',
  salesStat1Value: '340',
  salesStat2Key: 'deals',
  salesStat2Value: '89',
  
  copywritingTitle: 'AI Copywriting Suite',
  copywritingDescription: 'High-converting copy for websites, ads, emails, and social media',
  copywritingFeature1: 'Website Copy',
  copywritingFeature2: 'Ad Copy',
  copywritingFeature3: 'Email Sequences',
  copywritingFeature4: 'Social Content',
  copywritingStat1Key: 'templates',
  copywritingStat1Value: '150',
  copywritingStat2Key: 'conv. rate',
  copywritingStat2Value: '400%',
  
  // Value Proposition Section
  valuePropositionTitle: 'Why Choose Sage.ai?',
  valuePropositionDescription: 'The only platform that combines e-commerce, marketing, sales, and copywriting automation in one unified system',
  valueProposition1Title: 'AI-Powered Intelligence',
  valueProposition1Description: 'Advanced AI analyzes your business data to provide personalized automation strategies',
  valueProposition2Title: 'All-in-One Platform',
  valueProposition2Description: 'No need for multiple tools. Everything you need to automate your business in one place',
  valueProposition3Title: 'Proven Results',
  valueProposition3Description: 'Join thousands of businesses that have automated their operations and increased revenue',
  
  // CTA Section
  ctaTitle: 'Ready to Automate Your Business?',
  ctaDescription: 'Start your free trial today and see how AI can transform your operations',
  ctaPrimaryButton: 'Start Free Trial',
  ctaSecondaryButton: 'View Pricing',
  
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
  signOutLabel: 'Sign Out',
  
  // Dashboard
  dashboardWelcome: 'Welcome to Your Dashboard',
  dashboardSubtitle: 'Choose your area of focus to get started',
  
  // Button Labels
  exploreButton: 'Explore'
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
