
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateEnhancedTemplates, EnhancedTemplate, EnhancedWebsiteData } from './EnhancedTemplateGenerator';
import TemplateEmptyState from './TemplateEmptyState';
import TemplateLoadingState from './TemplateLoadingState';
import TemplateCard from './TemplateCard';

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
  const [isGenerating, setIsGenerating] = useState(false);

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

  const handlePreview = (template: EnhancedTemplate) => {
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(template.preview);
      newWindow.document.close();
    }
  };

  const handleDownload = (template: EnhancedTemplate) => {
    // Create a zip-like structure by downloading individual files
    Object.entries(template.files).forEach(([filename, content]) => {
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${websiteData?.businessName || 'website'}-${template.name.toLowerCase().replace(/\s+/g, '-')}-${filename}`;
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
        <CardTitle>Enhanced Website Templates</CardTitle>
        <CardDescription>
          3 professional templates customized for {websiteData.businessName} - Complete with all pages and functionality
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
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
                          {websiteData.businessType === 'ecommerce' && websiteData.products.length > 0 && (
                            <li>Products page with cart functionality</li>
                          )}
                          {(websiteData.businessType === 'service' || websiteData.businessType === 'agency') && websiteData.services.length > 0 && (
                            <li>Services page with booking</li>
                          )}
                          {websiteData.needsPrivacyPolicy && <li>Privacy Policy</li>}
                          {websiteData.needsTermsOfService && <li>Terms of Service</li>}
                          {websiteData.needsRefundPolicy && <li>Refund Policy</li>}
                          {websiteData.needsShippingPolicy && <li>Shipping Policy</li>}
                        </ul>
                      </div>
                      <div>
                        <strong>Business Features:</strong>
                        <ul className="list-disc list-inside ml-2 mt-1">
                          <li>Contact information integrated</li>
                          <li>Business hours display</li>
                          {websiteData.logoUrl && <li>Logo integration</li>}
                          {websiteData.reviews.length > 0 && <li>Customer reviews section</li>}
                          {websiteData.faqs.length > 0 && <li>FAQ section</li>}
                          {websiteData.calendlyLink && <li>Calendly booking integration</li>}
                          {websiteData.businessType === 'ecommerce' && <li>Shopping cart functionality</li>}
                          <li>Mobile responsive design</li>
                          <li>SEO optimized structure</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => handlePreview(template)}
                      className="flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                    >
                      <span>👁️</span>
                      <span>Preview Live Demo</span>
                    </button>
                    <button 
                      onClick={() => handleDownload(template)}
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
              {websiteData.products.length > 0 && <div>• {websiteData.products.length} products with full details</div>}
              {websiteData.services.length > 0 && <div>• {websiteData.services.length} services with pricing</div>}
              {websiteData.reviews.length > 0 && <div>• {websiteData.reviews.length} customer reviews</div>}
              {websiteData.faqs.length > 0 && <div>• {websiteData.faqs.length} FAQ items</div>}
              <div>• Complete contact information and business details</div>
              <div>• Professional policy pages for legal compliance</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WebsiteTemplates;
