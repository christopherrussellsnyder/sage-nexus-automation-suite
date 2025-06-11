
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Download, Palette, Layout, Smartphone, Zap, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface Template {
  id: string;
  name: string;
  category: string;
  industry: string;
  features: string[];
  preview: string;
  image: string;
  isPopular?: boolean;
  isMobileOptimized: boolean;
  hasEcommerce: boolean;
  pages: string[];
  demoUrl: string;
  downloadUrl: string;
}

interface WebsiteTemplatesProps {
  templates: Template[];
  onSelectTemplate: (template: Template) => void;
  onPreviewTemplate: (template: Template) => void;
}

const WebsiteTemplates = ({ templates, onSelectTemplate, onPreviewTemplate }: WebsiteTemplatesProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const defaultTemplates: Template[] = [
    {
      id: '1',
      name: 'Modern E-commerce Store',
      category: 'E-commerce',
      industry: 'Fashion & Apparel',
      features: ['Product Catalog', 'Shopping Cart', 'Payment Integration', 'User Reviews', 'Wishlist', 'Mobile Responsive'],
      preview: 'Clean, modern design with focus on product showcase and seamless shopping experience',
      image: '/placeholder.svg',
      isPopular: true,
      isMobileOptimized: true,
      hasEcommerce: true,
      pages: ['Home', 'Products', 'Product Details', 'Cart', 'Checkout', 'About', 'Contact'],
      demoUrl: 'https://modern-ecommerce-demo.com',
      downloadUrl: '#download-template-1'
    },
    {
      id: '2',
      name: 'Professional Services Hub',
      category: 'Business',
      industry: 'Professional Services',
      features: ['Service Pages', 'Contact Forms', 'Team Showcase', 'Testimonials', 'Blog', 'Appointment Booking'],
      preview: 'Professional layout highlighting expertise and building trust with potential clients',
      image: '/placeholder.svg',
      isMobileOptimized: true,
      hasEcommerce: false,
      pages: ['Home', 'Services', 'About', 'Team', 'Blog', 'Contact', 'Testimonials'],
      demoUrl: 'https://professional-services-demo.com',
      downloadUrl: '#download-template-2'
    },
    {
      id: '3',
      name: 'Restaurant & Food Delivery',
      category: 'Food & Beverage',
      industry: 'Food & Beverage',
      features: ['Menu Display', 'Online Ordering', 'Reservations', 'Gallery', 'Location Map', 'Reviews'],
      preview: 'Appetizing design that showcases food beautifully and drives online orders',
      image: '/placeholder.svg',
      isMobileOptimized: true,
      hasEcommerce: true,
      pages: ['Home', 'Menu', 'Order Online', 'Reservations', 'Gallery', 'Contact', 'Reviews'],
      demoUrl: 'https://restaurant-demo.com',
      downloadUrl: '#download-template-3'
    },
    {
      id: '4',
      name: 'Tech Startup Landing',
      category: 'Technology',
      industry: 'Electronics & Tech',
      features: ['Hero Section', 'Feature Highlights', 'Pricing Tables', 'Demo Videos', 'Newsletter', 'API Docs'],
      preview: 'Conversion-focused design perfect for software and tech product launches',
      image: '/placeholder.svg',
      isPopular: true,
      isMobileOptimized: true,
      hasEcommerce: false,
      pages: ['Home', 'Features', 'Pricing', 'Demo', 'Documentation', 'Support', 'Contact'],
      demoUrl: 'https://tech-startup-demo.com',
      downloadUrl: '#download-template-4'
    },
    {
      id: '5',
      name: 'Health & Wellness Center',
      category: 'Health',
      industry: 'Health & Beauty',
      features: ['Service Booking', 'Practitioner Profiles', 'Health Blog', 'Contact Forms', 'Resources', 'Online Store'],
      preview: 'Calming, trustworthy design for healthcare and wellness professionals',
      image: '/placeholder.svg',
      isMobileOptimized: true,
      hasEcommerce: true,
      pages: ['Home', 'Services', 'Practitioners', 'Blog', 'Shop', 'Resources', 'Contact'],
      demoUrl: 'https://wellness-demo.com',
      downloadUrl: '#download-template-5'
    },
    {
      id: '6',
      name: 'Creative Portfolio Studio',
      category: 'Creative',
      industry: 'Entertainment',
      features: ['Portfolio Gallery', 'Project Showcase', 'About Story', 'Contact Forms', 'Social Links', 'Client Portal'],
      preview: 'Stunning visual design to showcase creative work and attract clients',
      image: '/placeholder.svg',
      isMobileOptimized: true,
      hasEcommerce: false,
      pages: ['Home', 'Portfolio', 'Projects', 'About', 'Services', 'Contact', 'Blog'],
      demoUrl: 'https://creative-portfolio-demo.com',
      downloadUrl: '#download-template-6'
    }
  ];

  const templatesToShow = templates.length > 0 ? templates : defaultTemplates;

  const handlePreview = (template: Template) => {
    setSelectedTemplate(template);
    setShowPreview(true);
    onPreviewTemplate(template);
  };

  const handleSelectTemplate = (template: Template) => {
    // Simulate download process
    const downloadContent = `
# ${template.name} - Complete Website Template

## Included Pages:
${template.pages.map(page => `- ${page}.html`).join('\n')}

## Features:
${template.features.map(feature => `- ${feature}`).join('\n')}

## Installation Instructions:
1. Download all files
2. Upload to your hosting provider
3. Customize colors, text, and images
4. Connect your payment processor (if e-commerce)
5. Launch your website!

## Customization Guide:
- Edit HTML files for structure
- Modify CSS for styling
- Update images in /assets/images/
- Configure contact forms
- Set up analytics

Demo URL: ${template.demoUrl}
Support: Available 24/7

Built with modern web standards and fully responsive design.
    `;
    
    const blob = new Blob([downloadContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.name.replace(/\s+/g, '-').toLowerCase()}-template.txt`;
    a.click();
    
    onSelectTemplate(template);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Layout className="h-5 w-5" />
            <span>Website Templates</span>
          </CardTitle>
          <CardDescription>
            Choose from professional templates, fully customizable and ready to download
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templatesToShow.map((template) => (
              <Card key={template.id} className="group hover:shadow-lg transition-all duration-300">
                <div className="relative">
                  <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 rounded-t-lg flex items-center justify-center border-b">
                    <div className="text-center">
                      <Palette className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-xs text-muted-foreground">Website Preview</p>
                    </div>
                  </div>
                  {template.isPopular && (
                    <Badge className="absolute top-2 right-2 bg-orange-500">
                      Popular
                    </Badge>
                  )}
                </div>
                
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <div className="flex space-x-1">
                      {template.isMobileOptimized && (
                        <Smartphone className="h-4 w-4 text-green-600" />
                      )}
                      {template.hasEcommerce && (
                        <Zap className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Badge variant="secondary">{template.category}</Badge>
                    <Badge variant="outline">{template.industry}</Badge>
                  </div>
                  <CardDescription className="text-sm">{template.preview}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium mb-2">Included Pages ({template.pages.length}):</p>
                    <div className="grid grid-cols-2 gap-1 text-xs">
                      {template.pages.slice(0, 6).map((page, index) => (
                        <div key={index} className="flex items-center space-x-1">
                          <div className="h-1 w-1 rounded-full bg-primary" />
                          <span>{page}</span>
                        </div>
                      ))}
                      {template.pages.length > 6 && (
                        <div className="text-xs text-muted-foreground col-span-2">
                          +{template.pages.length - 6} more pages
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-2">Key Features:</p>
                    <div className="grid grid-cols-1 gap-1">
                      {template.features.slice(0, 4).map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2 text-xs">
                          <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                      {template.features.length > 4 && (
                        <div className="text-xs text-muted-foreground">
                          +{template.features.length - 4} more features
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 pt-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handlePreview(template)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Preview
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleSelectTemplate(template)}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="w-full text-xs"
                      onClick={() => window.open(template.demoUrl, '_blank')}
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View Live Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Template Preview Modal */}
      {showPreview && selectedTemplate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-6xl max-h-[90vh] overflow-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Preview: {selectedTemplate.name}</CardTitle>
                <Button variant="outline" onClick={() => setShowPreview(false)}>
                  Close Preview
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Mock website preview */}
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                <div className="text-center space-y-4 p-8">
                  <div className="bg-white rounded-lg p-6 shadow-lg max-w-2xl">
                    <h1 className="text-4xl font-bold mb-4">{selectedTemplate.name}</h1>
                    <p className="text-lg text-muted-foreground mb-6">
                      {selectedTemplate.preview}
                    </p>
                    <div className="flex space-x-4 justify-center">
                      <Button>Get Started</Button>
                      <Button variant="outline">Learn More</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Template features showcase */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">📱 Mobile Responsive</h3>
                    <p className="text-sm text-muted-foreground">
                      Optimized for all devices and screen sizes
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">⚡ Fast Loading</h3>
                    <p className="text-sm text-muted-foreground">
                      Optimized code for maximum performance
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">🎨 Customizable</h3>
                    <p className="text-sm text-muted-foreground">
                      Easy to modify colors, fonts, and layout
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              {/* All included pages */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Included Pages ({selectedTemplate.pages.length})</h3>
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {selectedTemplate.pages.map((page, index) => (
                    <Badge key={index} variant="outline" className="justify-center">
                      {page}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-4 pt-4 border-t">
                <Button 
                  className="flex-1"
                  onClick={() => {
                    handleSelectTemplate(selectedTemplate);
                    setShowPreview(false);
                  }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download This Template
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => window.open(selectedTemplate.demoUrl, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Live Demo
                </Button>
                <Button variant="outline" onClick={() => setShowPreview(false)}>
                  Continue Browsing
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default WebsiteTemplates;
