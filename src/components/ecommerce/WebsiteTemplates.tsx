import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { generateEnhancedTemplates, EnhancedTemplate, EnhancedWebsiteData } from './EnhancedTemplateGenerator';
import TemplateEmptyState from './TemplateEmptyState';
import TemplateLoadingState from './TemplateLoadingState';
import EnhancedAITemplateGenerator from './EnhancedAITemplateGenerator';
import AIGeneratedTemplates from './AIGeneratedTemplates';
import { Wand2, FileText, Brain } from 'lucide-react';

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

  // Enhanced AI generation handler with Shopify + Framer intelligence
  const handleEnhancedAIGeneration = async (businessDescription: string, options: any) => {
    setIsAIGenerating(true);
    setAIProgress(0);
    
    try {
      // Enhanced AI generation process with business intelligence
      const enhancedSteps = [
        'Analyzing business requirements and target audience...',
        'Applying Shopify commerce intelligence...',
        'Integrating Framer design algorithms...',
        'Generating responsive breakpoints (mobile, tablet, desktop)...',
        'Creating SEO-optimized content structure...',
        'Applying brand voice and tone consistency...',
        'Building conversion-focused layouts...',
        'Optimizing for performance and accessibility...',
        'Finalizing enhanced website experience...'
      ];
      
      for (let i = 0; i < enhancedSteps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setAIProgress(((i + 1) / enhancedSteps.length) * 100);
      }
      
      // Generate enhanced AI template with business intelligence
      const enhancedTemplate = {
        id: Date.now().toString(),
        name: `${options.businessType === 'ecommerce' ? 'E-commerce' : 'Business'} - ${options.layoutStyle || 'Enhanced'} AI`,
        description: `Intelligent website generated for ${options.industry || 'your business'} with ${options.contentTone || 'professional'} tone`,
        prompt: businessDescription,
        colorPalette: options.colorPalette || 'modern-blue',
        fontStyle: options.fontStyle || 'clean-sans',
        layoutStyle: options.layoutStyle || 'modern',
        preview: generateEnhancedAIPreview(businessDescription, options),
        files: generateEnhancedAIFiles(businessDescription, options),
        responsive: {
          desktop: generateResponsiveHTML('desktop', options),
          tablet: generateResponsiveHTML('tablet', options),
          mobile: generateResponsiveHTML('mobile', options)
        },
        features: [
          'Business Intelligence Analysis',
          'Multi-Device Responsive Design',
          'SEO & Performance Optimized',
          'Brand Voice Consistent',
          'Conversion Rate Optimized',
          'Accessibility Compliant',
          ...(options.ecommerceFeatures ? ['E-commerce Ready', 'Payment Integration'] : []),
          ...(options.multiLanguage ? ['Multi-language Support'] : []),
          ...(options.features || [])
        ]
      };
      
      setAITemplates(prev => [enhancedTemplate, ...prev]);
      
    } catch (error) {
      console.error('Enhanced AI generation error:', error);
    } finally {
      setIsAIGenerating(false);
      setAIProgress(0);
    }
  };

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
        <CardTitle>Enhanced AI Website Templates</CardTitle>
        <CardDescription>
          Next-generation AI combining Framer's design intelligence with Shopify's business optimization
        </CardDescription>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'ai' | 'enhanced')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="ai" className="flex items-center space-x-2">
              <Brain className="h-4 w-4" />
              <span>Enhanced AI Generator</span>
            </TabsTrigger>
            <TabsTrigger value="enhanced" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Business Templates</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="ai" className="mt-6">
            <div className="grid lg:grid-cols-5 gap-6">
              <div className="lg:col-span-2">
                <EnhancedAITemplateGenerator
                  onGenerate={handleEnhancedAIGeneration}
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

// Enhanced AI template generation helpers with Shopify + Framer intelligence
const generateEnhancedAIPreview = (businessDescription: string, options: any): string => {
  const businessType = options.businessType || 'general';
  const tone = options.contentTone || 'professional';
  const industry = options.industry || 'business';
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Enhanced AI Website - ${businessType} | ${industry}</title>
    <meta name="description" content="AI-generated ${businessType} website with ${tone} tone for ${industry} industry">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        .container { 
            max-width: 1200px; 
            margin: 0 auto; 
            padding: 2rem;
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            margin-top: 2rem;
        }
        .hero { text-align: center; padding: 4rem 2rem; }
        .hero h1 { 
            font-size: 3rem; 
            margin-bottom: 1rem;
            background: linear-gradient(135deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .features { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; padding: 2rem; }
        .feature { padding: 2rem; border: 1px solid #e2e8f0; border-radius: 8px; text-align: center; }
        .ai-badge {
            display: inline-block;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.9rem;
            margin-bottom: 2rem;
        }
        .business-info {
            background: #f8fafc;
            padding: 2rem;
            border-radius: 8px;
            margin: 2rem 0;
        }
        @media (max-width: 768px) {
            .hero h1 { font-size: 2rem; }
            .features { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="ai-badge">🧠 Enhanced AI Generated - Framer + Shopify Intelligence</div>
        <div class="hero">
            <h1>Your ${businessType.charAt(0).toUpperCase() + businessType.slice(1)} Website</h1>
            <p>Intelligently crafted for the ${industry} industry with ${tone} tone</p>
        </div>
        
        <div class="business-info">
            <h3>Business Analysis</h3>
            <p>"${businessDescription.slice(0, 200)}..."</p>
        </div>
        
        <div class="features">
            <div class="feature">
                <h3>🎯 Business Intelligence</h3>
                <p>AI analyzed your business requirements and optimized accordingly</p>
            </div>
            <div class="feature">
                <h3>📱 Responsive Design</h3>
                <p>Framer-quality responsive breakpoints for all devices</p>
            </div>
            <div class="feature">
                <h3>🚀 Performance Optimized</h3>
                <p>Shopify-grade performance and loading optimization</p>
            </div>
            ${options.ecommerceFeatures ? `
            <div class="feature">
                <h3>🛒 E-commerce Ready</h3>
                <p>Built-in shopping cart and payment integration</p>
            </div>
            ` : ''}
            ${options.seoFocused ? `
            <div class="feature">
                <h3>🔍 SEO Optimized</h3>
                <p>Search engine optimized with proper meta tags</p>
            </div>
            ` : ''}
        </div>
    </div>
</body>
</html>`;
};

const generateEnhancedAIFiles = (businessDescription: string, options: any) => {
  return {
    'index.html': generateEnhancedAIPreview(businessDescription, options),
    'styles.css': generateEnhancedCSS(options),
    'script.js': generateEnhancedJS(options),
    'README.md': generateEnhancedREADME(businessDescription, options)
  };
};

const generateResponsiveHTML = (device: string, options: any): string => {
  return `<div class="responsive-preview ${device}">
    <h3>${device.charAt(0).toUpperCase() + device.slice(1)} Preview</h3>
    <p>Optimized layout for ${device} viewing with ${options.layoutStyle} design</p>
  </div>`;
};

const generateEnhancedCSS = (options: any): string => {
  return `/* Enhanced AI Generated CSS - Framer + Shopify Intelligence */
:root {
  --primary-color: ${options.colorPalette === 'modern-blue' ? '#3B82F6' : '#8B5CF6'};
  --font-family: ${options.fontStyle === 'clean-sans' ? 'Inter, sans-serif' : 'Georgia, serif'};
}

/* Responsive breakpoints */
@media (max-width: 768px) { /* Mobile */ }
@media (min-width: 769px) and (max-width: 1024px) { /* Tablet */ }
@media (min-width: 1025px) { /* Desktop */ }

/* Performance optimizations */
* { box-sizing: border-box; }
img { max-width: 100%; height: auto; }

/* Accessibility improvements */
:focus { outline: 2px solid var(--primary-color); }
`;
};

const generateEnhancedJS = (options: any): string => {
  return `// Enhanced AI Generated JavaScript - Framer + Shopify Intelligence
document.addEventListener('DOMContentLoaded', function() {
  console.log('Enhanced AI Website Loaded');
  
  // Performance monitoring
  if ('performance' in window) {
    window.addEventListener('load', function() {
      const perfData = performance.getEntriesByType('navigation')[0];
      console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart);
    });
  }
  
  ${options.ecommerceFeatures ? `
  // E-commerce functionality
  const cart = {
    items: [],
    add: function(item) { this.items.push(item); },
    getTotal: function() { return this.items.reduce((sum, item) => sum + item.price, 0); }
  };
  ` : ''}
  
  ${options.seoFocused ? `
  // SEO enhancements
  const seo = {
    updateMetaDescription: function(desc) {
      document.querySelector('meta[name="description"]').content = desc;
    }
  };
  ` : ''}
});`;
};

const generateEnhancedREADME = (businessDescription: string, options: any): string => {
  return `# Enhanced AI Generated Website
  
## Business Analysis
${businessDescription}

## AI Features Applied
- Business Type: ${options.businessType}
- Industry: ${options.industry}
- Content Tone: ${options.contentTone}
- Layout Style: ${options.layoutStyle}

## Technologies Used
- Framer-inspired responsive design
- Shopify-grade performance optimization
- Modern CSS Grid and Flexbox
- Accessibility-first approach

## Features Included
${options.features?.map((f: string) => `- ${f}`).join('\n') || '- Standard responsive design'}

Generated by Enhanced AI combining Framer and Shopify intelligence.
`;
};

const generateAITemplatePreview = (prompt: string, options: any): string => {
  // Basic implementation for AI template preview generation
  return `<div>AI Template Preview for prompt: ${prompt}</div>`;
};

const generateAITemplateFiles = (prompt: string, options: any): { [filename: string]: string } => {
  // Basic implementation for AI template files generation
  return {
    'index.html': `<div>AI Template HTML for prompt: ${prompt}</div>`,
    'styles.css': `/* AI Template CSS */`,
    'script.js': `// AI Template JS`
  };
};

export default WebsiteTemplates;
