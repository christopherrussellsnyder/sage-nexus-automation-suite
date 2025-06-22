import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Settings, Save, RotateCcw } from 'lucide-react';
import { CopySettings } from '@/hooks/useCopySettings';

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

const AdminPanel = () => {
  const [copySettings, setCopySettings] = useState<CopySettings>(defaultCopySettings);
  const [isDirty, setIsDirty] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load saved copy settings from localStorage
    const savedSettings = localStorage.getItem('copySettings');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setCopySettings({ ...defaultCopySettings, ...parsed });
    }
  }, []);

  const handleInputChange = (field: keyof CopySettings, value: string) => {
    setCopySettings(prev => ({
      ...prev,
      [field]: value
    }));
    setIsDirty(true);
  };

  const handleSave = () => {
    localStorage.setItem('copySettings', JSON.stringify(copySettings));
    setIsDirty(false);
    toast({
      title: "Settings Saved",
      description: "Your copy changes have been saved successfully.",
    });
    
    // Trigger a page reload to apply changes
    window.location.reload();
  };

  const handleReset = () => {
    setCopySettings(defaultCopySettings);
    localStorage.removeItem('copySettings');
    setIsDirty(true);
    toast({
      title: "Settings Reset",
      description: "All copy has been reset to default values.",
    });
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Settings className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">{copySettings.adminTitle}</h1>
              <p className="text-muted-foreground">{copySettings.adminDescription}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="h-4 w-4 mr-2" />
              {copySettings.adminResetButton}
            </Button>
            <Button onClick={handleSave} disabled={!isDirty}>
              <Save className="h-4 w-4 mr-2" />
              {copySettings.adminSaveButton}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="brand" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="brand">Brand</TabsTrigger>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="auth">Auth Pages</TabsTrigger>
            <TabsTrigger value="survey">Survey</TabsTrigger>
            <TabsTrigger value="tools">Tool Pages</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          </TabsList>

          <TabsContent value="brand" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Brand & Navigation</CardTitle>
                <CardDescription>Customize your brand name, tagline, and navigation labels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="brandName">Brand Name</Label>
                    <Input
                      id="brandName"
                      value={copySettings.brandName}
                      onChange={(e) => handleInputChange('brandName', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="brandTagline">Brand Tagline</Label>
                    <Input
                      id="brandTagline"
                      value={copySettings.brandTagline}
                      onChange={(e) => handleInputChange('brandTagline', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="featuresLabel">Features Label</Label>
                    <Input
                      id="featuresLabel"
                      value={copySettings.featuresLabel}
                      onChange={(e) => handleInputChange('featuresLabel', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="pricingLabel">Pricing Label</Label>
                    <Input
                      id="pricingLabel"
                      value={copySettings.pricingLabel}
                      onChange={(e) => handleInputChange('pricingLabel', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="aboutLabel">About Label</Label>
                    <Input
                      id="aboutLabel"
                      value={copySettings.aboutLabel}
                      onChange={(e) => handleInputChange('aboutLabel', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="signInLabel">Sign In Button</Label>
                    <Input
                      id="signInLabel"
                      value={copySettings.signInLabel}
                      onChange={(e) => handleInputChange('signInLabel', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="getStartedLabel">Get Started Button</Label>
                    <Input
                      id="getStartedLabel"
                      value={copySettings.getStartedLabel}
                      onChange={(e) => handleInputChange('getStartedLabel', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="copywritingToolsLabel">Copywriting Tools Dropdown</Label>
                    <Input
                      id="copywritingToolsLabel"
                      value={copySettings.copywritingToolsLabel}
                      onChange={(e) => handleInputChange('copywritingToolsLabel', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="accountLabel">Account Dropdown</Label>
                    <Input
                      id="accountLabel"
                      value={copySettings.accountLabel}
                      onChange={(e) => handleInputChange('accountLabel', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Overview Page Hero Section</CardTitle>
                <CardDescription>Customize the main overview page hero section</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="overviewHeroTitle">Hero Title</Label>
                    <Input
                      id="overviewHeroTitle"
                      value={copySettings.overviewHeroTitle}
                      onChange={(e) => handleInputChange('overviewHeroTitle', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="overviewHeroSubtitle">Hero Subtitle</Label>
                    <Input
                      id="overviewHeroSubtitle"
                      value={copySettings.overviewHeroSubtitle}
                      onChange={(e) => handleInputChange('overviewHeroSubtitle', e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="overviewHeroDescription">Hero Description</Label>
                  <Textarea
                    id="overviewHeroDescription"
                    value={copySettings.overviewHeroDescription}
                    onChange={(e) => handleInputChange('overviewHeroDescription', e.target.value)}
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="overviewBadge1">Badge 1</Label>
                    <Input
                      id="overviewBadge1"
                      value={copySettings.overviewBadge1}
                      onChange={(e) => handleInputChange('overviewBadge1', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="overviewBadge2">Badge 2</Label>
                    <Input
                      id="overviewBadge2"
                      value={copySettings.overviewBadge2}
                      onChange={(e) => handleInputChange('overviewBadge2', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="overviewBadge3">Badge 3</Label>
                    <Input
                      id="overviewBadge3"
                      value={copySettings.overviewBadge3}
                      onChange={(e) => handleInputChange('overviewBadge3', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Stats Section</CardTitle>
                <CardDescription>Customize the statistics displayed on the overview page</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Stat 1</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="stat1Title">Title</Label>
                      <Input
                        id="stat1Title"
                        value={copySettings.stat1Title}
                        onChange={(e) => handleInputChange('stat1Title', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="stat1Value">Value</Label>
                      <Input
                        id="stat1Value"
                        value={copySettings.stat1Value}
                        onChange={(e) => handleInputChange('stat1Value', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="stat1Description">Description</Label>
                      <Input
                        id="stat1Description"
                        value={copySettings.stat1Description}
                        onChange={(e) => handleInputChange('stat1Description', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Stat 2</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="stat2Title">Title</Label>
                      <Input
                        id="stat2Title"
                        value={copySettings.stat2Title}
                        onChange={(e) => handleInputChange('stat2Title', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="stat2Value">Value</Label>
                      <Input
                        id="stat2Value"
                        value={copySettings.stat2Value}
                        onChange={(e) => handleInputChange('stat2Value', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="stat2Description">Description</Label>
                      <Input
                        id="stat2Description"
                        value={copySettings.stat2Description}
                        onChange={(e) => handleInputChange('stat2Description', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Stat 3</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="stat3Title">Title</Label>
                      <Input
                        id="stat3Title"
                        value={copySettings.stat3Title}
                        onChange={(e) => handleInputChange('stat3Title', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="stat3Value">Value</Label>
                      <Input
                        id="stat3Value"
                        value={copySettings.stat3Value}
                        onChange={(e) => handleInputChange('stat3Value', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="stat3Description">Description</Label>
                      <Input
                        id="stat3Description"
                        value={copySettings.stat3Description}
                        onChange={(e) => handleInputChange('stat3Description', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Stat 4</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="stat4Title">Title</Label>
                      <Input
                        id="stat4Title"
                        value={copySettings.stat4Title}
                        onChange={(e) => handleInputChange('stat4Title', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="stat4Value">Value</Label>
                      <Input
                        id="stat4Value"
                        value={copySettings.stat4Value}
                        onChange={(e) => handleInputChange('stat4Value', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="stat4Description">Description</Label>
                      <Input
                        id="stat4Description"
                        value={copySettings.stat4Description}
                        onChange={(e) => handleInputChange('stat4Description', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Platform Features Section</CardTitle>
                <CardDescription>Customize the platform features section title and description</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="platformFeaturesTitle">Section Title</Label>
                  <Input
                    id="platformFeaturesTitle"
                    value={copySettings.platformFeaturesTitle}
                    onChange={(e) => handleInputChange('platformFeaturesTitle', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="platformFeaturesDescription">Section Description</Label>
                  <Input
                    id="platformFeaturesDescription"
                    value={copySettings.platformFeaturesDescription}
                    onChange={(e) => handleInputChange('platformFeaturesDescription', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Value Proposition & CTA</CardTitle>
                <CardDescription>Customize the value proposition and call-to-action sections</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Value Proposition Section</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="valuePropositionTitle">Title</Label>
                      <Input
                        id="valuePropositionTitle"
                        value={copySettings.valuePropositionTitle}
                        onChange={(e) => handleInputChange('valuePropositionTitle', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="valuePropositionDescription">Description</Label>
                      <Textarea
                        id="valuePropositionDescription"
                        value={copySettings.valuePropositionDescription}
                        onChange={(e) => handleInputChange('valuePropositionDescription', e.target.value)}
                        rows={2}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="valueProposition1Title">Value Prop 1 Title</Label>
                      <Input
                        id="valueProposition1Title"
                        value={copySettings.valueProposition1Title}
                        onChange={(e) => handleInputChange('valueProposition1Title', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="valueProposition1Description">Value Prop 1 Description</Label>
                      <Textarea
                        id="valueProposition1Description"
                        value={copySettings.valueProposition1Description}
                        onChange={(e) => handleInputChange('valueProposition1Description', e.target.value)}
                        rows={2}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="valueProposition2Title">Value Prop 2 Title</Label>
                      <Input
                        id="valueProposition2Title"
                        value={copySettings.valueProposition2Title}
                        onChange={(e) => handleInputChange('valueProposition2Title', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="valueProposition2Description">Value Prop 2 Description</Label>
                      <Textarea
                        id="valueProposition2Description"
                        value={copySettings.valueProposition2Description}
                        onChange={(e) => handleInputChange('valueProposition2Description', e.target.value)}
                        rows={2}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="valueProposition3Title">Value Prop 3 Title</Label>
                      <Input
                        id="valueProposition3Title"
                        value={copySettings.valueProposition3Title}
                        onChange={(e) => handleInputChange('valueProposition3Title', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="valueProposition3Description">Value Prop 3 Description</Label>
                      <Textarea
                        id="valueProposition3Description"
                        value={copySettings.valueProposition3Description}
                        onChange={(e) => handleInputChange('valueProposition3Description', e.target.value)}
                        rows={2}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Call-to-Action Section</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="ctaTitle">CTA Title</Label>
                      <Input
                        id="ctaTitle"
                        value={copySettings.ctaTitle}
                        onChange={(e) => handleInputChange('ctaTitle', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="ctaDescription">CTA Description</Label>
                      <Input
                        id="ctaDescription"
                        value={copySettings.ctaDescription}
                        onChange={(e) => handleInputChange('ctaDescription', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="ctaPrimaryButton">Primary Button Text</Label>
                      <Input
                        id="ctaPrimaryButton"
                        value={copySettings.ctaPrimaryButton}
                        onChange={(e) => handleInputChange('ctaPrimaryButton', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="ctaSecondaryButton">Secondary Button Text</Label>
                      <Input
                        id="ctaSecondaryButton"
                        value={copySettings.ctaSecondaryButton}
                        onChange={(e) => handleInputChange('ctaSecondaryButton', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Feature Cards</CardTitle>
                <CardDescription>Customize the titles, descriptions, features, and stats for each feature area</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">E-commerce</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="ecommerceTitle">Title</Label>
                      <Input
                        id="ecommerceTitle"
                        value={copySettings.ecommerceTitle}
                        onChange={(e) => handleInputChange('ecommerceTitle', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="ecommerceDescription">Description</Label>
                      <Textarea
                        id="ecommerceDescription"
                        value={copySettings.ecommerceDescription}
                        onChange={(e) => handleInputChange('ecommerceDescription', e.target.value)}
                        rows={2}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="ecommerceFeature1">Feature 1</Label>
                      <Input
                        id="ecommerceFeature1"
                        value={copySettings.ecommerceFeature1}
                        onChange={(e) => handleInputChange('ecommerceFeature1', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="ecommerceFeature2">Feature 2</Label>
                      <Input
                        id="ecommerceFeature2"
                        value={copySettings.ecommerceFeature2}
                        onChange={(e) => handleInputChange('ecommerceFeature2', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="ecommerceFeature3">Feature 3</Label>
                      <Input
                        id="ecommerceFeature3"
                        value={copySettings.ecommerceFeature3}
                        onChange={(e) => handleInputChange('ecommerceFeature3', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="ecommerceFeature4">Feature 4</Label>
                      <Input
                        id="ecommerceFeature4"
                        value={copySettings.ecommerceFeature4}
                        onChange={(e) => handleInputChange('ecommerceFeature4', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="ecommerceStat1Key">Stat 1 Key</Label>
                      <Input
                        id="ecommerceStat1Key"
                        value={copySettings.ecommerceStat1Key}
                        onChange={(e) => handleInputChange('ecommerceStat1Key', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="ecommerceStat1Value">Stat 1 Value</Label>
                      <Input
                        id="ecommerceStat1Value"
                        value={copySettings.ecommerceStat1Value}
                        onChange={(e) => handleInputChange('ecommerceStat1Value', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="ecommerceStat2Key">Stat 2 Key</Label>
                      <Input
                        id="ecommerceStat2Key"
                        value={copySettings.ecommerceStat2Key}
                        onChange={(e) => handleInputChange('ecommerceStat2Key', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="ecommerceStat2Value">Stat 2 Value</Label>
                      <Input
                        id="ecommerceStat2Value"
                        value={copySettings.ecommerceStat2Value}
                        onChange={(e) => handleInputChange('ecommerceStat2Value', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Agency Section */}
                <div className="space-y-4">
                  <h4 className="font-medium">Agency</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="agencyTitle">Title</Label>
                      <Input
                        id="agencyTitle"
                        value={copySettings.agencyTitle}
                        onChange={(e) => handleInputChange('agencyTitle', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="agencyDescription">Description</Label>
                      <Textarea
                        id="agencyDescription"
                        value={copySettings.agencyDescription}
                        onChange={(e) => handleInputChange('agencyDescription', e.target.value)}
                        rows={2}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="agencyFeature1">Feature 1</Label>
                      <Input
                        id="agencyFeature1"
                        value={copySettings.agencyFeature1}
                        onChange={(e) => handleInputChange('agencyFeature1', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="agencyFeature2">Feature 2</Label>
                      <Input
                        id="agencyFeature2"
                        value={copySettings.agencyFeature2}
                        onChange={(e) => handleInputChange('agencyFeature2', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="agencyFeature3">Feature 3</Label>
                      <Input
                        id="agencyFeature3"
                        value={copySettings.agencyFeature3}
                        onChange={(e) => handleInputChange('agencyFeature3', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="agencyFeature4">Feature 4</Label>
                      <Input
                        id="agencyFeature4"
                        value={copySettings.agencyFeature4}
                        onChange={(e) => handleInputChange('agencyFeature4', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="agencyStat1Key">Stat 1 Key</Label>
                      <Input
                        id="agencyStat1Key"
                        value={copySettings.agencyStat1Key}
                        onChange={(e) => handleInputChange('agencyStat1Key', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="agencyStat1Value">Stat 1 Value</Label>
                      <Input
                        id="agencyStat1Value"
                        value={copySettings.agencyStat1Value}
                        onChange={(e) => handleInputChange('agencyStat1Value', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="agencyStat2Key">Stat 2 Key</Label>
                      <Input
                        id="agencyStat2Key"
                        value={copySettings.agencyStat2Key}
                        onChange={(e) => handleInputChange('agencyStat2Key', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="agencyStat2Value">Stat 2 Value</Label>
                      <Input
                        id="agencyStat2Value"
                        value={copySettings.agencyStat2Value}
                        onChange={(e) => handleInputChange('agencyStat2Value', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Sales Section */}
                <div className="space-y-4">
                  <h4 className="font-medium">Sales</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="salesTitle">Title</Label>
                      <Input
                        id="salesTitle"
                        value={copySettings.salesTitle}
                        onChange={(e) => handleInputChange('salesTitle', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="salesDescription">Description</Label>
                      <Textarea
                        id="salesDescription"
                        value={copySettings.salesDescription}
                        onChange={(e) => handleInputChange('salesDescription', e.target.value)}
                        rows={2}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="salesFeature1">Feature 1</Label>
                      <Input
                        id="salesFeature1"
                        value={copySettings.salesFeature1}
                        onChange={(e) => handleInputChange('salesFeature1', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="salesFeature2">Feature 2</Label>
                      <Input
                        id="salesFeature2"
                        value={copySettings.salesFeature2}
                        onChange={(e) => handleInputChange('salesFeature2', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="salesFeature3">Feature 3</Label>
                      <Input
                        id="salesFeature3"
                        value={copySettings.salesFeature3}
                        onChange={(e) => handleInputChange('salesFeature3', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="salesFeature4">Feature 4</Label>
                      <Input
                        id="salesFeature4"
                        value={copySettings.salesFeature4}
                        onChange={(e) => handleInputChange('salesFeature4', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="salesStat1Key">Stat 1 Key</Label>
                      <Input
                        id="salesStat1Key"
                        value={copySettings.salesStat1Key}
                        onChange={(e) => handleInputChange('salesStat1Key', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="salesStat1Value">Stat 1 Value</Label>
                      <Input
                        id="salesStat1Value"
                        value={copySettings.salesStat1Value}
                        onChange={(e) => handleInputChange('salesStat1Value', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="salesStat2Key">Stat 2 Key</Label>
                      <Input
                        id="salesStat2Key"
                        value={copySettings.salesStat2Key}
                        onChange={(e) => handleInputChange('salesStat2Key', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="salesStat2Value">Stat 2 Value</Label>
                      <Input
                        id="salesStat2Value"
                        value={copySettings.salesStat2Value}
                        onChange={(e) => handleInputChange('salesStat2Value', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Copywriting Section */}
                <div className="space-y-4">
                  <h4 className="font-medium">Copywriting</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="copywritingTitle">Title</Label>
                      <Input
                        id="copywritingTitle"
                        value={copySettings.copywritingTitle}
                        onChange={(e) => handleInputChange('copywritingTitle', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="copywritingDescription">Description</Label>
                      <Textarea
                        id="copywritingDescription"
                        value={copySettings.copywritingDescription}
                        onChange={(e) => handleInputChange('copywritingDescription', e.target.value)}
                        rows={2}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="copywritingFeature1">Feature 1</Label>
                      <Input
                        id="copywritingFeature1"
                        value={copySettings.copywritingFeature1}
                        onChange={(e) => handleInputChange('copywritingFeature1', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="copywritingFeature2">Feature 2</Label>
                      <Input
                        id="copywritingFeature2"
                        value={copySettings.copywritingFeature2}
                        onChange={(e) => handleInputChange('copywritingFeature2', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="copywritingFeature3">Feature 3</Label>
                      <Input
                        id="copywritingFeature3"
                        value={copySettings.copywritingFeature3}
                        onChange={(e) => handleInputChange('copywritingFeature3', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="copywritingFeature4">Feature 4</Label>
                      <Input
                        id="copywritingFeature4"
                        value={copySettings.copywritingFeature4}
                        onChange={(e) => handleInputChange('copywritingFeature4', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="copywritingStat1Key">Stat 1 Key</Label>
                      <Input
                        id="copywritingStat1Key"
                        value={copySettings.copywritingStat1Key}
                        onChange={(e) => handleInputChange('copywritingStat1Key', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="copywritingStat1Value">Stat 1 Value</Label>
                      <Input
                        id="copywritingStat1Value"
                        value={copySettings.copywritingStat1Value}
                        onChange={(e) => handleInputChange('copywritingStat1Value', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="copywritingStat2Key">Stat 2 Key</Label>
                      <Input
                        id="copywritingStat2Key"
                        value={copySettings.copywritingStat2Key}
                        onChange={(e) => handleInputChange('copywritingStat2Key', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="copywritingStat2Value">Stat 2 Value</Label>
                      <Input
                        id="copywritingStat2Value"
                        value={copySettings.copywritingStat2Value}
                        onChange={(e) => handleInputChange('copywritingStat2Value', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="exploreButton">Explore Button Text</Label>
                  <Input
                    id="exploreButton"
                    value={copySettings.exploreButton}
                    onChange={(e) => handleInputChange('exploreButton', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="auth" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Login & Signup Pages</CardTitle>
                <CardDescription>Customize text for authentication pages</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Login Page</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="loginTitle">Login Title</Label>
                      <Input
                        id="loginTitle"
                        value={copySettings.loginTitle}
                        onChange={(e) => handleInputChange('loginTitle', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="loginCardTitle">Login Card Title</Label>
                      <Input
                        id="loginCardTitle"
                        value={copySettings.loginCardTitle}
                        onChange={(e) => handleInputChange('loginCardTitle', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="loginCardDescription">Login Card Description</Label>
                    <Input
                      id="loginCardDescription"
                      value={copySettings.loginCardDescription}
                      onChange={(e) => handleInputChange('loginCardDescription', e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="loginButton">Login Button Text</Label>
                      <Input
                        id="loginButton"
                        value={copySettings.loginButton}
                        onChange={(e) => handleInputChange('loginButton', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="loginLoadingText">Login Loading Text</Label>
                      <Input
                        id="loginLoadingText"
                        value={copySettings.loginLoadingText}
                        onChange={(e) => handleInputChange('loginLoadingText', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Signup Page</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="signupTitle">Signup Title</Label>
                      <Input
                        id="signupTitle"
                        value={copySettings.signupTitle}
                        onChange={(e) => handleInputChange('signupTitle', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="signupCardTitle">Signup Card Title</Label>
                      <Input
                        id="signupCardTitle"
                        value={copySettings.signupCardTitle}
                        onChange={(e) => handleInputChange('signupCardTitle', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="signupCardDescription">Signup Card Description</Label>
                    <Input
                      id="signupCardDescription"
                      value={copySettings.signupCardDescription}
                      onChange={(e) => handleInputChange('signupCardDescription', e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="signupButton">Signup Button Text</Label>
                      <Input
                        id="signupButton"
                        value={copySettings.signupButton}
                        onChange={(e) => handleInputChange('signupButton', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="signupLoadingText">Signup Loading Text</Label>
                      <Input
                        id="signupLoadingText"
                        value={copySettings.signupLoadingText}
                        onChange={(e) => handleInputChange('signupLoadingText', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="survey" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Survey Page</CardTitle>
                <CardDescription>Customize onboarding survey text</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="surveyTitle">Survey Title</Label>
                  <Input
                    id="surveyTitle"
                    value={copySettings.surveyTitle}
                    onChange={(e) => handleInputChange('surveyTitle', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="surveyDescription">Survey Description</Label>
                  <Textarea
                    id="surveyDescription"
                    value={copySettings.surveyDescription}
                    onChange={(e) => handleInputChange('surveyDescription', e.target.value)}
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="surveyCardTitle">Survey Card Title</Label>
                    <Input
                      id="surveyCardTitle"
                      value={copySettings.surveyCardTitle}
                      onChange={(e) => handleInputChange('surveyCardTitle', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="surveyCardDescription">Survey Card Description</Label>
                    <Textarea
                      id="surveyCardDescription"
                      value={copySettings.surveyCardDescription}
                      onChange={(e) => handleInputChange('surveyCardDescription', e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="surveySubmitButton">Submit Button Text</Label>
                  <Input
                    id="surveySubmitButton"
                    value={copySettings.surveySubmitButton}
                    onChange={(e) => handleInputChange('surveySubmitButton', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tool Pages</CardTitle>
                <CardDescription>Customize titles and descriptions for individual tool pages</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="adCopyTitle">Ad Copy Page Title</Label>
                    <Input
                      id="adCopyTitle"
                      value={copySettings.adCopyTitle}
                      onChange={(e) => handleInputChange('adCopyTitle', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="adCopyDescription">Ad Copy Page Description</Label>
                    <Textarea
                      id="adCopyDescription"
                      value={copySettings.adCopyDescription}
                      onChange={(e) => handleInputChange('adCopyDescription', e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="emailSequencesTitle">Email Sequences Page Title</Label>
                    <Input
                      id="emailSequencesTitle"
                      value={copySettings.emailSequencesTitle}
                      onChange={(e) => handleInputChange('emailSequencesTitle', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="emailSequencesDescription">Email Sequences Page Description</Label>
                    <Textarea
                      id="emailSequencesDescription"
                      value={copySettings.emailSequencesDescription}
                      onChange={(e) => handleInputChange('emailSequencesDescription', e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="socialContentTitle">Social Content Page Title</Label>
                    <Input
                      id="socialContentTitle"
                      value={copySettings.socialContentTitle}
                      onChange={(e) => handleInputChange('socialContentTitle', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="socialContentDescription">Social Content Page Description</Label>
                    <Textarea
                      id="socialContentDescription"
                      value={copySettings.socialContentDescription}
                      onChange={(e) => handleInputChange('socialContentDescription', e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="backToDashboard">Back to Dashboard Button</Label>
                  <Input
                    id="backToDashboard"
                    value={copySettings.backToDashboard}
                    onChange={(e) => handleInputChange('backToDashboard', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dashboard" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard</CardTitle>
                <CardDescription>Customize dashboard welcome text and subtitle</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="dashboardWelcome">Welcome Title</Label>
                  <Input
                    id="dashboardWelcome"
                    value={copySettings.dashboardWelcome}
                    onChange={(e) => handleInputChange('dashboardWelcome', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="dashboardSubtitle">Subtitle</Label>
                  <Textarea
                    id="dashboardSubtitle"
                    value={copySettings.dashboardSubtitle}
                    onChange={(e) => handleInputChange('dashboardSubtitle', e.target.value)}
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
