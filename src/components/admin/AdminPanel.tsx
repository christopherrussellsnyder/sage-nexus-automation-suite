
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
  
  // Hero Section
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
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="brand">Brand</TabsTrigger>
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="auth">Auth Pages</TabsTrigger>
            <TabsTrigger value="survey">Survey</TabsTrigger>
            <TabsTrigger value="tools">Tool Pages</TabsTrigger>
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

          <TabsContent value="hero" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
                <CardDescription>Customize the main hero section text and call-to-action</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="heroTitle">Hero Title</Label>
                  <Input
                    id="heroTitle"
                    value={copySettings.heroTitle}
                    onChange={(e) => handleInputChange('heroTitle', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
                  <Input
                    id="heroSubtitle"
                    value={copySettings.heroSubtitle}
                    onChange={(e) => handleInputChange('heroSubtitle', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="heroDescription">Hero Description</Label>
                  <Textarea
                    id="heroDescription"
                    value={copySettings.heroDescription}
                    onChange={(e) => handleInputChange('heroDescription', e.target.value)}
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="heroCTA">Hero Call-to-Action Button</Label>
                  <Input
                    id="heroCTA"
                    value={copySettings.heroCTA}
                    onChange={(e) => handleInputChange('heroCTA', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Feature Cards</CardTitle>
                <CardDescription>Customize the titles and descriptions for each feature area</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ecommerceTitle">E-commerce Title</Label>
                    <Input
                      id="ecommerceTitle"
                      value={copySettings.ecommerceTitle}
                      onChange={(e) => handleInputChange('ecommerceTitle', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="ecommerceDescription">E-commerce Description</Label>
                    <Textarea
                      id="ecommerceDescription"
                      value={copySettings.ecommerceDescription}
                      onChange={(e) => handleInputChange('ecommerceDescription', e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="agencyTitle">Agency Title</Label>
                    <Input
                      id="agencyTitle"
                      value={copySettings.agencyTitle}
                      onChange={(e) => handleInputChange('agencyTitle', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="agencyDescription">Agency Description</Label>
                    <Textarea
                      id="agencyDescription"
                      value={copySettings.agencyDescription}
                      onChange={(e) => handleInputChange('agencyDescription', e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="salesTitle">Sales Title</Label>
                    <Input
                      id="salesTitle"
                      value={copySettings.salesTitle}
                      onChange={(e) => handleInputChange('salesTitle', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="salesDescription">Sales Description</Label>
                    <Textarea
                      id="salesDescription"
                      value={copySettings.salesDescription}
                      onChange={(e) => handleInputChange('salesDescription', e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="copywritingTitle">Copywriting Title</Label>
                    <Input
                      id="copywritingTitle"
                      value={copySettings.copywritingTitle}
                      onChange={(e) => handleInputChange('copywritingTitle', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="copywritingDescription">Copywriting Description</Label>
                    <Textarea
                      id="copywritingDescription"
                      value={copySettings.copywritingDescription}
                      onChange={(e) => handleInputChange('copywritingDescription', e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dashboardWelcome">Dashboard Welcome Title</Label>
                    <Input
                      id="dashboardWelcome"
                      value={copySettings.dashboardWelcome}
                      onChange={(e) => handleInputChange('dashboardWelcome', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dashboardSubtitle">Dashboard Subtitle</Label>
                    <Textarea
                      id="dashboardSubtitle"
                      value={copySettings.dashboardSubtitle}
                      onChange={(e) => handleInputChange('dashboardSubtitle', e.target.value)}
                      rows={2}
                    />
                  </div>
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
