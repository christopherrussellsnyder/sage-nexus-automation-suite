import { useState, useEffect } from 'react';

interface CopySettings {
  // Brand & Navigation
  brandName: string;
  brandTagline: string;
  
  // Hero Section (Overview Page) - Updated for multi-feature platform
  overviewHeroTitle: string;
  overviewHeroSubtitle: string;
  overviewHeroDescription: string;
  overviewBadge1: string;
  overviewBadge2: string;
  overviewBadge3: string;
  
  // Quick Stats (Overview Page) - Updated for platform scope
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
  
  // Platform Features Section - Updated
  platformFeaturesTitle: string;
  platformFeaturesDescription: string;
  
  // Feature Cards - Confident, benefit-focused copy
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
  
  // Value Proposition Section - Updated for platform scope
  valuePropositionTitle: string;
  valuePropositionDescription: string;
  valueProposition1Title: string;
  valueProposition1Description: string;
  valueProposition2Title: string;
  valueProposition2Description: string;
  valueProposition3Title: string;
  valueProposition3Description: string;
  
  // CTA Section - Updated
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
  brandTagline: 'Stop Guessing. Start Converting.',
  
  // Hero Section (Overview Page) - Updated for multi-feature platform
  overviewHeroTitle: 'Sage.ai',
  overviewHeroSubtitle: 'Your Complete AI Business Growth Platform',
  overviewHeroDescription: 'Stop struggling with mediocre results across your business operations. Transform everything from copywriting to sales, e-commerce, and agency management with our comprehensive AI-powered suite. Join thousands of businesses who trust Sage.ai to create data-driven competitive advantages across every aspect of their growth.',
  overviewBadge1: 'All-In-One Platform',
  overviewBadge2: 'Multi-Industry AI',
  overviewBadge3: 'Proven Results',
  
  // Quick Stats (Overview Page) - Updated for platform scope
  stat1Title: 'Business Growth',
  stat1Value: '$2.4M+',
  stat1Description: 'Revenue generated across all features',
  stat2Title: 'Average Improvement',
  stat2Value: '340%',
  stat2Description: 'Across all business functions',
  stat3Title: 'Active Businesses',
  stat3Value: '15,000+',
  stat3Description: 'Trust our AI platform',
  stat4Title: 'AI Tools Available',
  stat4Value: '500+',
  stat4Description: 'Across all business areas',
  
  // Platform Features Section - Updated
  platformFeaturesTitle: 'Choose Your AI-Powered Growth Engine',
  platformFeaturesDescription: 'Select the business area where you want to accelerate results and dominate your market with intelligent automation',
  
  // Feature Cards - Confident, benefit-focused copy
  ecommerceTitle: 'E-commerce Domination',
  ecommerceDescription: 'Build stores that convert visitors into customers on autopilot',
  ecommerceFeature1: 'AI Store Builder',
  ecommerceFeature2: 'Trending Product Intel',
  ecommerceFeature3: 'Conversion Optimization',
  ecommerceFeature4: 'Revenue Analytics',
  ecommerceStat1Key: 'stores built',
  ecommerceStat1Value: '2,500+',
  ecommerceStat2Key: 'avg revenue boost',
  ecommerceStat2Value: '285%',
  
  agencyTitle: 'Agency Scale System',
  agencyDescription: 'Manage multiple clients and campaigns without the overwhelm',
  agencyFeature1: 'Multi-Platform Orchestration',
  agencyFeature2: 'Intelligent Lead Scoring',
  agencyFeature3: 'Automated Content Factory',
  agencyFeature4: 'Client Success Reports',
  agencyStat1Key: 'agencies served',
  agencyStat1Value: '850+',
  agencyStat2Key: 'client retention',
  agencyStat2Value: '94%',
  
  salesTitle: 'Sales Acceleration Hub',
  salesDescription: 'Turn prospects into customers with precision targeting',
  salesFeature1: 'Deep Prospect Research',
  salesFeature2: 'Multi-Touch Sequences',
  salesFeature3: 'Meeting Intelligence',
  salesFeature4: 'Pipeline Optimization',
  salesStat1Key: 'deals closed',
  salesStat1Value: '12,000+',
  salesStat2Key: 'close rate boost',
  salesStat2Value: '156%',
  
  copywritingTitle: 'Copy That Converts',
  copywritingDescription: 'Create high-converting copy based on proven psychological triggers',
  copywritingFeature1: 'Website Copy Engine',
  copywritingFeature2: 'Ad Copy Generator',
  copywritingFeature3: 'Email Sequences',
  copywritingFeature4: 'Social Content',
  copywritingStat1Key: 'conversions generated',
  copywritingStat1Value: '50M+',
  copywritingStat2Key: 'avg improvement',
  copywritingStat2Value: '400%',
  
  // Value Proposition Section - Updated for platform scope
  valuePropositionTitle: 'Why Sage.ai Dominates',
  valuePropositionDescription: 'Unlike single-purpose tools that leave gaps in your business growth, we provide a comprehensive AI platform that optimizes every aspect of your operations with personalized, data-driven insights.',
  valueProposition1Title: 'Complete Business Intelligence',
  valueProposition1Description: 'Our AI analyzes top-performing strategies across e-commerce, sales, marketing, and copywriting to optimize your entire business ecosystem',
  valueProposition2Title: 'Integrated Growth System',
  valueProposition2Description: 'Stop juggling multiple tools. Our unified platform ensures every business function works together for maximum results',
  valueProposition3Title: 'Cross-Platform Dominance',
  valueProposition3Description: 'Gain competitive advantages across all business areas while competitors struggle with fragmented solutions',
  
  // CTA Section - Updated
  ctaTitle: 'Ready to Transform Your Entire Business?',
  ctaDescription: 'Join thousands of businesses who have unlocked exponential growth across all operations with our comprehensive AI platform.',
  ctaPrimaryButton: 'Start My Transformation',
  ctaSecondaryButton: 'See Success Stories',
  
  // Navigation
  featuresLabel: 'Features',
  pricingLabel: 'Pricing',
  aboutLabel: 'About',
  signInLabel: 'Sign In',
  getStartedLabel: 'Get Started',
  
  // Login Page
  loginTitle: 'Welcome back to Sage.ai',
  loginSubtitle: 'create a new account',
  loginCardTitle: 'Continue Your Success',
  loginCardDescription: 'Sign in to access your AI business growth platform',
  loginEmailPlaceholder: 'Email address',
  loginPasswordPlaceholder: 'Password',
  loginButton: 'Access Dashboard',
  loginLoadingText: 'Signing you in...',
  loginLinkText: 'Or',
  
  // Signup Page
  signupTitle: 'Unlock Your Business Potential',
  signupSubtitle: 'sign in to your existing account',
  signupCardTitle: 'Start Winning Today',
  signupCardDescription: 'Join thousands who have transformed their entire business with our AI platform',
  signupEmailPlaceholder: 'Email address',
  signupPasswordPlaceholder: 'Password',
  signupButton: 'Start My Transformation',
  signupLoadingText: 'Setting up your success...',
  signupLinkText: 'Or',
  
  // Survey Page
  surveyTitle: 'Unlock your business potential with personalized AI tools',
  surveyDescription: 'Help us customize your experience for maximum results in just 3 quick questions',
  surveyCardTitle: 'Personalize Your Success Strategy',
  surveyCardDescription: 'Your answers help us show you the most relevant tools to accelerate your growth',
  surveyQuestion1: 'What type of business do you run?',
  surveyQuestion2: 'What is your primary growth goal right now?',
  surveyQuestion3: 'What is your biggest challenge holding you back?',
  surveySubmitButton: 'Unlock My Personalized Dashboard',
  surveySubmitLoadingText: 'Customizing your success tools...',
  
  // Admin Panel
  adminTitle: 'Platform Control Center',
  adminDescription: 'Customize all messaging and copy throughout your application',
  adminSaveButton: 'Apply Changes',
  adminResetButton: 'Reset to Default',
  
  // Tool Pages
  adCopyTitle: 'High-Converting Ad Copy',
  adCopyDescription: 'Create ads that stop the scroll and drive action across all platforms',
  emailSequencesTitle: 'Email Sequences That Sell',
  emailSequencesDescription: 'Build automated sequences that nurture prospects into paying customers',
  socialContentTitle: 'Viral Social Content',
  socialContentDescription: 'Create scroll-stopping content that builds your brand and drives sales',
  websiteCopyTitle: 'Website Copy That Converts',
  websiteCopyDescription: 'Transform visitors into customers with psychologically-optimized website copy',
  backToDashboard: 'Back to Dashboard',
  
  // Header Dropdown
  copywritingToolsLabel: 'AI Tools',
  accountLabel: 'Account',
  dashboardLabel: 'Dashboard',
  adminPanelLabel: 'Control Center',
  signOutLabel: 'Sign Out',
  
  // Dashboard
  dashboardWelcome: 'Ready to Dominate Your Market?',
  dashboardSubtitle: 'Choose your AI-powered weapon and start converting like never before',
  
  // Button Labels
  exploreButton: 'Start Winning'
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
