
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Settings, Save, RotateCcw } from 'lucide-react';

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

const AdminPanel = () => {
  const [copySettings, setCopySettings] = useState<CopySettings>(defaultCopySettings);
  const [isDirty, setIsDirty] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load saved copy settings from localStorage
    const savedSettings = localStorage.getItem('copySettings');
    if (savedSettings) {
      setCopySettings(JSON.parse(savedSettings));
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
              <h1 className="text-3xl font-bold">Admin Panel</h1>
              <p className="text-muted-foreground">Customize all text and copy throughout the application</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset to Default
            </Button>
            <Button onClick={handleSave} disabled={!isDirty}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        <Tabs defaultValue="brand" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="brand">Brand & Navigation</TabsTrigger>
            <TabsTrigger value="hero">Hero Section</TabsTrigger>
            <TabsTrigger value="features">Feature Cards</TabsTrigger>
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dashboard" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard Copy</CardTitle>
                <CardDescription>Customize text that appears on the dashboard</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
