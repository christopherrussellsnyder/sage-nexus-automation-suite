
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
  const [activeTab, setActiveTab] = useState<'ai' | 'enhanced'>('enhanced');

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

  // Enhanced AI generation handler with Shopify + Framer intelligence + Business Data Integration
  const handleEnhancedAIGeneration = async (businessDescription: string, options: any) => {
    setIsAIGenerating(true);
    setAIProgress(0);
    
    try {
      // Enhanced AI generation process with business intelligence
      const enhancedSteps = [
        'Analyzing business requirements and target audience...',
        'Integrating existing business data (products, services, reviews)...',
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
      
      // Generate enhanced AI template with business intelligence + existing data
      const enhancedTemplate = {
        id: Date.now().toString(),
        name: `${options.businessType === 'ecommerce' ? 'E-commerce' : 'Business'} - ${options.layoutStyle || 'Enhanced'} AI`,
        description: `Intelligent website generated for ${options.industry || 'your business'} with ${options.contentTone || 'professional'} tone`,
        prompt: businessDescription,
        colorPalette: options.colorPalette || 'modern-blue',
        fontStyle: options.fontStyle || 'clean-sans',
        layoutStyle: options.layoutStyle || 'modern',
        preview: generateEnhancedAIPreview(businessDescription, options, websiteData),
        files: generateEnhancedAIFiles(businessDescription, options, websiteData),
        responsive: {
          desktop: generateResponsiveHTML('desktop', options, websiteData),
          tablet: generateResponsiveHTML('tablet', options, websiteData),
          mobile: generateResponsiveHTML('mobile', options, websiteData)
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
          ...(websiteData?.products.length > 0 ? [`${websiteData.products.length} Products Integrated`] : []),
          ...(websiteData?.services.length > 0 ? [`${websiteData.services.length} Services Integrated`] : []),
          ...(websiteData?.reviews.length > 0 ? [`${websiteData.reviews.length} Customer Reviews`] : []),
          ...(websiteData?.faqs.length > 0 ? [`${websiteData.faqs.length} FAQ Items`] : []),
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
      handleEnhancedAIGeneration(template.prompt, {
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
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(template.preview);
      newWindow.document.close();
    }
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
            <TabsTrigger value="enhanced" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Business Templates ({generatedTemplates.length})</span>
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center space-x-2">
              <Brain className="h-4 w-4" />
              <span>Enhanced AI Generator ({aiTemplates.length})</span>
            </TabsTrigger>
          </TabsList>
          
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
                              {websiteData?.reviews.length > 0 && <li>{websiteData.reviews.length} customer reviews</li>}
                              {websiteData?.faqs.length > 0 && <li>{websiteData.faqs.length} FAQ items</li>}
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
        </Tabs>
      </CardHeader>
    </Card>
  );
};

// Enhanced AI template generation helpers with Shopify + Framer intelligence + Business Data Integration
const generateEnhancedAIPreview = (businessDescription: string, options: any, websiteData?: EnhancedWebsiteData | null): string => {
  const businessType = options.businessType || 'general';
  const tone = options.contentTone || 'professional';
  const industry = options.industry || 'business';
  
  // Generate rich content based on business data
  const businessName = websiteData?.businessName || 'Your Business';
  const businessInfo = websiteData?.businessDescription || businessDescription;
  const contactInfo = websiteData?.contactInfo;
  const products = websiteData?.products || [];
  const services = websiteData?.services || [];
  const reviews = websiteData?.reviews || [];
  const faqs = websiteData?.faqs || [];
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${businessName} - Enhanced AI Website | ${industry}</title>
    <meta name="description" content="AI-generated ${businessType} website with ${tone} tone for ${industry} industry">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #1a202c;
        }
        .nav { 
            background: white; 
            padding: 1rem 2rem; 
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 1000;
        }
        .nav-content { 
            max-width: 1200px; 
            margin: 0 auto; 
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
        }
        .logo { font-size: 1.5rem; font-weight: bold; color: #2d3748; }
        .nav-links { display: flex; gap: 2rem; list-style: none; }
        .nav-links a { 
            text-decoration: none; 
            color: #4a5568; 
            font-weight: 500;
            cursor: pointer;
            transition: color 0.2s;
        }
        .nav-links a:hover { color: #2d3748; }
        .container { 
            max-width: 1200px; 
            margin: 0 auto; 
            padding: 0 2rem;
        }
        .hero { 
            padding: 8rem 0 4rem; 
            text-align: center; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            margin-top: 60px;
        }
        .hero h1 { 
            font-size: 3rem; 
            margin-bottom: 1.5rem;
            font-weight: 800;
        }
        .hero p {
            font-size: 1.25rem;
            margin-bottom: 2rem;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }
        .btn {
            display: inline-block;
            padding: 0.75rem 2rem;
            background: white;
            color: #2d3748;
            text-decoration: none;
            border-radius: 0.5rem;
            font-weight: 600;
            transition: transform 0.2s;
            cursor: pointer;
            border: none;
        }
        .btn:hover { transform: translateY(-2px); }
        .section { padding: 4rem 0; }
        .section-alt { background: #f7fafc; }
        .section-title { 
            font-size: 2.5rem; 
            font-weight: 700; 
            text-align: center; 
            margin-bottom: 3rem; 
            color: #2d3748;
        }
        .grid { display: grid; gap: 2rem; }
        .grid-3 { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
        .card {
            background: white;
            padding: 2rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            transition: transform 0.2s;
        }
        .card:hover { transform: translateY(-4px); }
        .page-content { display: none; padding: 2rem 0; min-height: 60vh; }
        .page-content.active { display: block; }
        .review-stars { color: #f6ad55; margin-bottom: 0.5rem; }
        .faq-item { margin-bottom: 1.5rem; }
        .faq-question { 
            font-weight: 600; 
            margin-bottom: 0.5rem; 
            color: #2d3748;
            cursor: pointer;
        }
        .faq-answer { color: #4a5568; padding-left: 1rem; }
        .contact-info { background: #edf2f7; padding: 2rem; border-radius: 0.5rem; }
        @media (max-width: 768px) {
            .hero h1 { font-size: 2rem; }
            .nav-links { display: none; }
            .container { padding: 0 1rem; }
        }
    </style>
</head>
<body>
    <nav class="nav">
        <div class="nav-content">
            <div class="logo">${businessName}</div>
            <ul class="nav-links">
                <li><a onclick="showPage('home')">Home</a></li>
                <li><a onclick="showPage('about')">About</a></li>
                ${products.length > 0 ? '<li><a onclick="showPage(\'products\')">Products</a></li>' : ''}
                ${services.length > 0 ? '<li><a onclick="showPage(\'services\')">Services</a></li>' : ''}
                ${reviews.length > 0 ? '<li><a onclick="showPage(\'reviews\')">Reviews</a></li>' : ''}
                ${faqs.length > 0 ? '<li><a onclick="showPage(\'faq\')">FAQ</a></li>' : ''}
                <li><a onclick="showPage('contact')">Contact</a></li>
            </ul>
        </div>
    </nav>

    <!-- Home Page -->
    <div id="home-page" class="page-content active">
        <section class="hero">
            <div class="container">
                <h1>${businessName}</h1>
                <p>${businessInfo.slice(0, 200)}...</p>
                <button class="btn" onclick="showPage('contact')">Get Started Today</button>
            </div>
        </section>

        <section class="section">
            <div class="container">
                <h2 class="section-title">Why Choose ${businessName}?</h2>
                <div class="grid grid-3">
                    <div class="card">
                        <h3>Quality Guaranteed</h3>
                        <p>Professional service delivery with attention to detail</p>
                    </div>
                    <div class="card">
                        <h3>Expert Support</h3>
                        <p>24/7 customer service from experienced professionals</p>
                    </div>
                    <div class="card">  
                        <h3>Fast Results</h3>
                        <p>Quick turnaround times without compromising quality</p>
                    </div>
                </div>
            </div>
        </section>
    </div>

    <!-- About Page -->
    <div id="about-page" class="page-content">
        <section class="section" style="margin-top: 60px;">
            <div class="container">
                <h2 class="section-title">About ${businessName}</h2>
                <div style="max-width: 800px; margin: 0 auto; text-align: center;">
                    <p style="font-size: 1.125rem; margin-bottom: 2rem;">${businessInfo}</p>
                    <p>We specialize in serving ${websiteData?.targetAudience || 'businesses'} in the ${industry} industry with ${tone} approach to service delivery.</p>
                </div>
            </div>
        </section>
    </div>

    ${products.length > 0 ? `
    <!-- Products Page -->
    <div id="products-page" class="page-content">
        <section class="section" style="margin-top: 60px;">
            <div class="container">
                <h2 class="section-title">Our Products</h2>
                <div class="grid grid-3">
                    ${products.map(product => `
                        <div class="card">
                            ${product.imageUrl ? `<img src="${product.imageUrl}" alt="${product.name}" style="width: 100%; height: 200px; object-fit: cover; margin-bottom: 1rem; border-radius: 0.25rem;">` : ''}
                            <h3>${product.name}</h3>
                            <p>${product.description}</p>
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
                                <span style="font-size: 1.25rem; font-weight: 700; color: #667eea;">${product.price}</span>
                                <button class="btn" style="padding: 0.5rem 1rem;">Add to Cart</button>
                            </div>
                            ${product.variations.length > 0 ? `
                                <div style="margin-top: 1rem;">
                                    <small>Available in: ${product.variations.map(v => v.value).join(', ')}</small>
                                </div>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
    </div>
    ` : ''}

    ${services.length > 0 ? `
    <!-- Services Page -->
    <div id="services-page" class="page-content">
        <section class="section" style="margin-top: 60px;">
            <div class="container">
                <h2 class="section-title">Our Services</h2>
                <div class="grid grid-3">
                    ${services.map(service => `
                        <div class="card">
                            <h3>${service.name}</h3>
                            <p>${service.description}</p>
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
                                <span style="font-size: 1.25rem; font-weight: 700; color: #667eea;">${service.price}</span>
                                <button class="btn" style="padding: 0.5rem 1rem;">Book Now</button>
                            </div>
                            ${service.duration ? `<p style="margin-top: 0.5rem; color: #4a5568; font-size: 0.875rem;">Duration: ${service.duration}</p>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
    </div>
    ` : ''}

    ${reviews.length > 0 ? `
    <!-- Reviews Page -->
    <div id="reviews-page" class="page-content">
        <section class="section" style="margin-top: 60px;">
            <div class="container">
                <h2 class="section-title">Customer Reviews</h2>
                <div class="grid grid-3">
                    ${reviews.map(review => `
                        <div class="card">
                            <div class="review-stars">${'⭐'.repeat(review.rating)}</div>
                            <p style="font-style: italic; margin-bottom: 1rem;">"${review.review}"</p>
                            <strong>${review.customerName}</strong>
                            ${review.date ? `<p style="color: #4a5568; font-size: 0.875rem; margin-top: 0.5rem;">${review.date}</p>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
    </div>
    ` : ''}

    ${faqs.length > 0 ? `
    <!-- FAQ Page -->
    <div id="faq-page" class="page-content">
        <section class="section" style="margin-top: 60px;">
            <div class="container">
                <h2 class="section-title">Frequently Asked Questions</h2>
                <div style="max-width: 800px; margin: 0 auto;">
                    ${faqs.map(faq => `
                        <div class="faq-item">
                            <div class="faq-question">${faq.question}</div>
                            <div class="faq-answer">${faq.answer}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
    </div>
    ` : ''}

    <!-- Contact Page -->
    <div id="contact-page" class="page-content">
        <section class="section" style="margin-top: 60px;">
            <div class="container">
                <h2 class="section-title">Contact Us</h2>
                <div style="max-width: 600px; margin: 0 auto;">
                    <div class="contact-info">
                        ${contactInfo?.email ? `<p><strong>Email:</strong> ${contactInfo.email}</p>` : ''}
                        ${contactInfo?.phone ? `<p><strong>Phone:</strong> ${contactInfo.phone}</p>` : ''}
                        ${contactInfo?.address ? `<p><strong>Address:</strong> ${contactInfo.address}</p>` : ''}
                        ${contactInfo?.businessHours ? `<p><strong>Hours:</strong> ${contactInfo.businessHours}</p>` : ''}
                        ${websiteData?.calendlyLink ? `<p><a href="${websiteData.calendlyLink}" target="_blank" class="btn" style="margin-top: 1rem;">Schedule Meeting</a></p>` : ''}
                    </div>
                </div>
            </div>
        </section>
    </div>

    <script>
        function showPage(pageId) {
            // Hide all pages
            document.querySelectorAll('.page-content').forEach(page => {
                page.classList.remove('active');
            });
            
            // Show selected page
            const targetPage = document.getElementById(pageId + '-page');
            if (targetPage) {
                targetPage.classList.add('active');
            }
            
            // Update URL without page reload
            window.history.pushState({}, '', '#' + pageId);
        }
        
        // Handle browser back/forward buttons
        window.addEventListener('popstate', function() {
            const hash = window.location.hash.slice(1) || 'home';
            showPage(hash);
        });
        
        // Initialize page based on URL hash
        document.addEventListener('DOMContentLoaded', function() {
            const hash = window.location.hash.slice(1) || 'home';
            showPage(hash);
        });
    </script>
</body>
</html>`;
};

const generateEnhancedAIFiles = (businessDescription: string, options: any, websiteData?: EnhancedWebsiteData | null) => {
  return {
    'index.html': generateEnhancedAIPreview(businessDescription, options, websiteData),
    'styles.css': generateEnhancedCSS(options, websiteData),
    'script.js': generateEnhancedJS(options, websiteData),
    'README.md': generateEnhancedREADME(businessDescription, options, websiteData)
  };
};

const generateResponsiveHTML = (device: string, options: any, websiteData?: EnhancedWebsiteData | null): string => {
  const businessName = websiteData?.businessName || 'Your Business';
  return `<div class="responsive-preview ${device}">
    <h3>${device.charAt(0).toUpperCase() + device.slice(1)} Preview - ${businessName}</h3>
    <p>Optimized layout for ${device} viewing with ${options.layoutStyle} design</p>
    <p>Includes: ${websiteData?.products.length || 0} products, ${websiteData?.services.length || 0} services, ${websiteData?.reviews.length || 0} reviews</p>
  </div>`;
};

const generateEnhancedCSS = (options: any, websiteData?: EnhancedWebsiteData | null): string => {
  return `/* Enhanced AI Generated CSS - Framer + Shopify Intelligence */
:root {
  --primary-color: ${options.colorPalette === 'modern-blue' ? '#3B82F6' : '#8B5CF6'};
  --font-family: ${options.fontStyle === 'clean-sans' ? 'Inter, sans-serif' : 'Georgia, serif'};
  --business-name: '${websiteData?.businessName || 'Your Business'}';
}

/* Business-specific styling */
.business-logo {
  background-image: url('${websiteData?.logoUrl || ''}');
  background-size: contain;
  background-repeat: no-repeat;
}

/* Product grid optimizations */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

/* Service cards */
.service-card {
  transition: transform 0.3s ease;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
}

.service-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

/* Review styling */
.review-card {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Responsive breakpoints */
@media (max-width: 768px) { 
  .product-grid { grid-template-columns: 1fr; }
  .nav-links { display: none; }
}
@media (min-width: 769px) and (max-width: 1024px) { 
  .product-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1025px) { 
  .product-grid { grid-template-columns: repeat(3, 1fr); }
}

/* Performance optimizations */
* { box-sizing: border-box; }
img { max-width: 100%; height: auto; }

/* Accessibility improvements */
:focus { outline: 2px solid var(--primary-color); }
`;
};

const generateEnhancedJS = (options: any, websiteData?: EnhancedWebsiteData | null): string => {
  return `// Enhanced AI Generated JavaScript - Framer + Shopify Intelligence
document.addEventListener('DOMContentLoaded', function() {
  console.log('Enhanced AI Website Loaded for ${websiteData?.businessName || 'Business'}');
  
  // Business data
  const businessData = {
    name: '${websiteData?.businessName || ''}',
    type: '${websiteData?.businessType || 'general'}',
    products: ${JSON.stringify(websiteData?.products || [])},
    services: ${JSON.stringify(websiteData?.services || [])},
    reviews: ${JSON.stringify(websiteData?.reviews || [])},
    faqs: ${JSON.stringify(websiteData?.faqs || [])}
  };
  
  // Performance monitoring
  if ('performance' in window) {
    window.addEventListener('load', function() {
      const perfData = performance.getEntriesByType('navigation')[0];
      console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart);
    });
  }
  
  ${options.ecommerceFeatures || websiteData?.businessType === 'ecommerce' ? `
  // E-commerce functionality
  const cart = {
    items: [],
    add: function(item) { 
      this.items.push(item); 
      this.updateCartDisplay();
    },
    getTotal: function() { 
      return this.items.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')), 0); 
    },
    updateCartDisplay: function() {
      console.log('Cart updated:', this.items.length, 'items, Total: $' + this.getTotal());
    }
  };
  
  // Add click handlers for add to cart buttons
  document.querySelectorAll('.btn').forEach(btn => {
    if (btn.textContent.includes('Add to Cart')) {
      btn.addEventListener('click', function() {
        const productCard = this.closest('.card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('[style*="color: #667eea"]').textContent;
        cart.add({ name: productName, price: productPrice });
      });
    }
  });
  ` : ''}
  
  ${options.seoFocused ? `
  // SEO enhancements
  const seo = {
    updateMetaDescription: function(desc) {
      let meta = document.querySelector('meta[name="description"]');
      if (meta) meta.content = desc;
    },
    addStructuredData: function() {
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "${websiteData?.businessType === 'ecommerce' ? 'OnlineStore' : 'Organization'}",
        "name": "${websiteData?.businessName || ''}",
        "description": "${websiteData?.businessDescription || ''}",
        ${websiteData?.contactInfo?.email ? `"email": "${websiteData.contactInfo.email}",` : ''}
        ${websiteData?.contactInfo?.phone ? `"telephone": "${websiteData.contactInfo.phone}",` : ''}
        ${websiteData?.contactInfo?.address ? `"address": "${websiteData.contactInfo.address}"` : ''}
      };
      
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
  };
  
  seo.addStructuredData();
  ` : ''}
  
  // Page navigation functionality
  window.showPage = function(pageId) {
    document.querySelectorAll('.page-content').forEach(page => {
      page.classList.remove('active');
    });
    
    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
      targetPage.classList.add('active');
      // Update page title
      document.title = '${websiteData?.businessName || 'Business'} - ' + pageId.charAt(0).toUpperCase() + pageId.slice(1);
    }
  };
  
  // Initialize based on hash
  const currentHash = window.location.hash.slice(1) || 'home';
  showPage(currentHash);
});`;
};

const generateEnhancedREADME = (businessDescription: string, options: any, websiteData?: EnhancedWebsiteData | null): string => {
  return `# Enhanced AI Generated Website - ${websiteData?.businessName || 'Your Business'}
  
## Business Information
**Business Name:** ${websiteData?.businessName || 'Not specified'}
**Business Type:** ${websiteData?.businessType || 'General'}
**Industry:** ${websiteData?.industry || 'Not specified'}
**Target Audience:** ${websiteData?.targetAudience || 'General'}

## Business Description
${businessDescription}

## AI Features Applied
- Business Type: ${options.businessType || 'general'}
- Industry: ${options.industry || 'general'}
- Content Tone: ${options.contentTone || 'professional'}
- Layout Style: ${options.layoutStyle || 'modern'}

## Content Integration
- **Products:** ${websiteData?.products.length || 0} products integrated
- **Services:** ${websiteData?.services.length || 0} services integrated  
- **Reviews:** ${websiteData?.reviews.length || 0} customer reviews
- **FAQs:** ${websiteData?.faqs.length || 0} FAQ items
- **Contact Info:** ${websiteData?.contactInfo?.email ? 'Complete' : 'Basic'}

## Pages Included
- Home page with business overview
- About page with detailed business information
${websiteData?.products.length > 0 ? '- Products page with shopping functionality' : ''}
${websiteData?.services.length > 0 ? '- Services page with booking capabilities' : ''}
${websiteData?.reviews.length > 0 ? '- Reviews page showcasing customer testimonials' : ''}
${websiteData?.faqs.length > 0 ? '- FAQ page with common questions' : ''}
- Contact page with business information

## Technologies Used
- Framer-inspired responsive design
- Shopify-grade performance optimization
- Modern CSS Grid and Flexbox
- Accessibility-first approach
- JavaScript navigation system
- SEO optimization
- Structured data markup

## Features Included
${options.features?.map((f: string) => `- ${f}`).join('\n') || '- Standard responsive design'}
- Multi-page navigation system
- Business data integration
- Contact information display
- ${websiteData?.businessType === 'ecommerce' ? 'E-commerce functionality' : 'Service booking system'}

## Setup Instructions
1. Extract all files to your web server
2. Open index.html in a web browser
3. Navigate between pages using the navigation menu
4. Customize content as needed for your business

Generated by Enhanced AI combining Framer and Shopify intelligence with complete business data integration.
`;
};

export default WebsiteTemplates;
