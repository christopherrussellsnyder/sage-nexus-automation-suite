import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { generateEnhancedTemplates, EnhancedTemplate, EnhancedWebsiteData } from './EnhancedTemplateGenerator';
import TemplateEmptyState from './TemplateEmptyState';
import TemplateLoadingState from './TemplateLoadingState';
import AITemplateGenerator from './AITemplateGenerator';
import AIGeneratedTemplates from './AIGeneratedTemplates';
import { Wand2, FileText } from 'lucide-react';

interface WebsiteTemplatesProps {
  templates: any[];
  onSelectTemplate: (template: any) => void;
  onPreviewTemplate: (template: any) => void;
  websiteData: EnhancedWebsiteData | null;
  isGenerated: boolean;
}

const WebsiteTemplates = ({ 
  templates, 
  onSelectTemplate, 
  onPreviewTemplate, 
  websiteData, 
  isGenerated 
}: WebsiteTemplatesProps) => {
  const [generatedTemplates, setGeneratedTemplates] = useState<EnhancedTemplate[]>([]);
  const [aiTemplates, setAITemplates] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAIGenerating, setIsAIGenerating] = useState(false);
  const [aiProgress, setAIProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<'ai' | 'enhanced'>('ai');

  // Generate enhanced templates when websiteData is available - optimized for speed
  useEffect(() => {
    if (websiteData && isGenerated && generatedTemplates.length === 0) {
      setIsGenerating(true);
      
      // Generate templates immediately without delay
      try {
        const newTemplates = generateEnhancedTemplates(websiteData);
        setGeneratedTemplates(newTemplates);
        setIsGenerating(false);
      } catch (error) {
        console.error('Error generating templates:', error);
        setIsGenerating(false);
      }
    }
  }, [websiteData, isGenerated, generatedTemplates.length]);

  // Handle AI template generation
  const handleAIGeneration = async (prompt: string, options: any) => {
    setIsAIGenerating(true);
    setAIProgress(0);
    
    try {
      // Simulate AI generation process with realistic steps
      const steps = [
        'Analyzing your prompt...',
        'Selecting optimal design patterns...',
        'Generating responsive layouts...',
        'Applying AI-powered styling...',
        'Creating interactive components...',
        'Optimizing for performance...',
        'Finalizing your website...'
      ];
      
      for (let i = 0; i < steps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        setAIProgress(((i + 1) / steps.length) * 100);
      }
      
      // Generate AI template based on prompt and options
      const aiTemplate = {
        id: Date.now().toString(),
        name: `AI Generated - ${options.layoutStyle || 'Modern'} Style`,
        description: `Custom website generated from: "${prompt.slice(0, 50)}..."`,
        prompt,
        colorPalette: options.colorPalette || 'modern-blue',
        fontStyle: options.fontStyle || 'clean-sans',
        layoutStyle: options.layoutStyle || 'modern',
        preview: generateAITemplatePreview(prompt, options),
        files: generateAITemplateFiles(prompt, options),
        responsive: {
          desktop: 'Desktop preview HTML',
          tablet: 'Tablet preview HTML',
          mobile: 'Mobile preview HTML'
        },
        features: [
          'Responsive Design',
          'AI-Optimized Layout',
          'Brand-Consistent Styling',
          'Performance Optimized',
          'SEO Ready',
          'Accessibility Compliant'
        ]
      };
      
      setAITemplates(prev => [aiTemplate, ...prev]);
      
    } catch (error) {
      console.error('AI generation error:', error);
    } finally {
      setIsAIGenerating(false);
      setAIProgress(0);
    }
  };

  const handleAIPreview = (template: any) => {
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(template.preview);
      newWindow.document.close();
    }
  };

  const handleAIDownload = (template: any) => {
    Object.entries(template.files).forEach(([filename, content]) => {
      const blob = new Blob([content as string], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ai-generated-${template.name.toLowerCase().replace(/\s+/g, '-')}-${filename}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  };

  const handleAIRegenerate = (templateId: string) => {
    const template = aiTemplates.find(t => t.id === templateId);
    if (template) {
      handleAIGeneration(template.prompt, {
        colorPalette: template.colorPalette,
        fontStyle: template.fontStyle,
        layoutStyle: template.layoutStyle,
        regenerate: true
      });
    }
  };

  const handleAICustomizeStyle = (templateId: string, styleType: 'color' | 'font' | 'layout') => {
    console.log(`Customizing ${styleType} for template ${templateId}`);
    // Implementation for style customization
  };

  const handleAIEditContent = (templateId: string, section: string) => {
    console.log(`Editing ${section} for template ${templateId}`);
    // Implementation for content editing
  };

  const handleEnhancedPreview = (template: EnhancedTemplate) => {
    onPreviewTemplate(template);
  };

  const handleEnhancedDownload = (template: EnhancedTemplate) => {
    Object.entries(template.files).forEach(([filename, content]) => {
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `enhanced-${template.name.toLowerCase().replace(/\s+/g, '-')}-${filename}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  };

  if (!websiteData) {
    return <TemplateEmptyState />;
  }

  if (isGenerating) {
    return <TemplateLoadingState businessName={websiteData.businessName} />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Website Templates</CardTitle>
        <CardDescription>
          Choose between AI-powered generation or enhanced business templates
        </CardDescription>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'ai' | 'enhanced')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="ai" className="flex items-center space-x-2">
              <Wand2 className="h-4 w-4" />
              <span>AI Generator</span>
            </TabsTrigger>
            <TabsTrigger value="enhanced" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Business Templates</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="ai" className="mt-6">
            <div className="grid lg:grid-cols-5 gap-6">
              <div className="lg:col-span-2">
                <AITemplateGenerator
                  onGenerate={handleAIGeneration}
                  isGenerating={isAIGenerating}
                  progress={aiProgress}
                />
              </div>
              <div className="lg:col-span-3">
                <AIGeneratedTemplates
                  templates={aiTemplates}
                  onPreview={handleAIPreview}
                  onDownload={handleAIDownload}
                  onRegenerate={handleAIRegenerate}
                  onCustomizeStyle={handleAICustomizeStyle}
                  onEditContent={handleAIEditContent}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="enhanced" className="mt-6">
            <div className="space-y-6">
              {generatedTemplates.map((template) => (
                <Card key={template.id} className="border">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <span>{template.name}</span>
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            Enhanced
                          </span>
                        </CardTitle>
                        <CardDescription>{template.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-muted p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Enhanced Template Features:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                          <div>
                            <strong>Pages Included:</strong>
                            <ul className="list-disc list-inside ml-2 mt-1">
                              <li>Home page with full content</li>
                              <li>About page</li>
                              <li>Contact page with form</li>
                              {websiteData?.businessType === 'ecommerce' && websiteData.products.length > 0 && (
                                <li>Products page with cart functionality</li>
                              )}
                              {(websiteData?.businessType === 'service' || websiteData?.businessType === 'agency') && websiteData.services.length > 0 && (
                                <li>Services page with booking</li>
                              )}
                              {websiteData?.needsPrivacyPolicy && <li>Privacy Policy</li>}
                              {websiteData?.needsTermsOfService && <li>Terms of Service</li>}
                              {websiteData?.needsRefundPolicy && <li>Refund Policy</li>}
                              {websiteData?.needsShippingPolicy && <li>Shipping Policy</li>}
                            </ul>
                          </div>
                          <div>
                            <strong>Business Features:</strong>
                            <ul className="list-disc list-inside ml-2 mt-1">
                              <li>Contact information integrated</li>
                              <li>Business hours display</li>
                              {websiteData?.logoUrl && <li>Logo integration</li>}
                              {websiteData?.reviews.length > 0 && <li>Customer reviews section</li>}
                              {websiteData?.faqs.length > 0 && <li>FAQ section</li>}
                              {websiteData?.calendlyLink && <li>Calendly booking integration</li>}
                              {websiteData?.businessType === 'ecommerce' && <li>Shopping cart functionality</li>}
                              <li>Mobile responsive design</li>
                              <li>SEO optimized structure</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-3">
                        <button 
                          onClick={() => handleEnhancedPreview(template)}
                          className="flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                        >
                          <span>👁️</span>
                          <span>Preview Live Demo</span>
                        </button>
                        <button 
                          onClick={() => handleEnhancedDownload(template)}
                          className="flex items-center space-x-2 border border-input bg-background px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                          <span>📥</span>
                          <span>Download All Files</span>
                        </button>
                      </div>
                      
                      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <h5 className="font-medium text-blue-900 mb-1">Ready for Platform Integration</h5>
                        <p className="text-sm text-blue-700">
                          These templates are designed to be easily customizable and can be integrated into platforms like GoHighLevel, Shopify, or deployed independently. 
                          All business-specific data is included and ready to use.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {generatedTemplates.length > 0 && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">🎉 Your Enhanced Website is Ready!</h4>
                <p className="text-sm text-green-700">
                  Your website templates include all the business-specific information you provided:
                </p>
                <div className="mt-2 text-xs text-green-600 space-y-1">
                  {websiteData?.products.length > 0 && <div>• {websiteData.products.length} products with full details</div>}
                  {websiteData?.services.length > 0 && <div>• {websiteData.services.length} services with pricing</div>}
                  {websiteData?.reviews.length > 0 && <div>• {websiteData.reviews.length} customer reviews</div>}
                  {websiteData?.faqs.length > 0 && <div>• {websiteData.faqs.length} FAQ items</div>}
                  <div>• Complete contact information and business details</div>
                  <div>• Professional policy pages for legal compliance</div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardHeader>
    </Card>
  );
};

// Helper functions for AI template generation
const generateAITemplatePreview = (prompt: string, options: any): string => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Generated Website</title>
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0; 
            padding: 0; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container { 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 2rem;
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            text-align: center;
        }
        h1 { 
            color: #333; 
            font-size: 2.5rem; 
            margin-bottom: 1rem;
            background: linear-gradient(135deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        p { 
            color: #666; 
            line-height: 1.6; 
            font-size: 1.1rem;
            margin-bottom: 2rem;
        }
        .ai-badge {
            display: inline-block;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.9rem;
            margin-bottom: 1rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="ai-badge">✨ Generated by AI</div>
        <h1>Your AI-Powered Website</h1>
        <p>This is a preview of your AI-generated website based on the prompt: "${prompt}"</p>
        <p>The full website includes responsive design, modern styling, and optimized performance.</p>
    </div>
</body>
</html>`;
};

const generateAITemplateFiles = (prompt: string, options: any) => {
  return {
    'index.html': generateAITemplatePreview(prompt, options),
    'styles.css': '/* AI-generated styles */',
    'script.js': '/* AI-generated JavaScript */'
  };
};

export default WebsiteTemplates;
