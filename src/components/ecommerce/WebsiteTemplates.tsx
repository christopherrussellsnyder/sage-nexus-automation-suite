
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Download, Palette, Layout, Smartphone, Zap } from 'lucide-react';
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
      features: ['Product Catalog', 'Shopping Cart', 'Payment Integration', 'User Reviews', 'Wishlist'],
      preview: 'Clean, modern design with focus on product showcase and seamless shopping experience',
      image: '/placeholder.svg',
      isPopular: true,
      isMobileOptimized: true,
      hasEcommerce: true
    },
    {
      id: '2',
      name: 'Professional Services',
      category: 'Business',
      industry: 'Professional Services',
      features: ['Service Pages', 'Contact Forms', 'Team Showcase', 'Testimonials', 'Blog'],
      preview: 'Professional layout highlighting expertise and building trust with potential clients',
      image: '/placeholder.svg',
      isMobileOptimized: true,
      hasEcommerce: false
    },
    {
      id: '3',
      name: 'Restaurant & Food',
      category: 'Food & Beverage',
      industry: 'Food & Beverage',
      features: ['Menu Display', 'Online Ordering', 'Reservations', 'Gallery', 'Location Map'],
      preview: 'Appetizing design that showcases food beautifully and drives online orders',
      image: '/placeholder.svg',
      isMobileOptimized: true,
      hasEcommerce: true
    },
    {
      id: '4',
      name: 'Tech Startup Landing',
      category: 'Technology',
      industry: 'Electronics & Tech',
      features: ['Hero Section', 'Feature Highlights', 'Pricing Tables', 'Demo Videos', 'Newsletter'],
      preview: 'Conversion-focused design perfect for software and tech product launches',
      image: '/placeholder.svg',
      isPopular: true,
      isMobileOptimized: true,
      hasEcommerce: false
    },
    {
      id: '5',
      name: 'Health & Wellness',
      category: 'Health',
      industry: 'Health & Beauty',
      features: ['Service Booking', 'Practitioner Profiles', 'Health Blog', 'Contact Forms', 'Resources'],
      preview: 'Calming, trustworthy design for healthcare and wellness professionals',
      image: '/placeholder.svg',
      isMobileOptimized: true,
      hasEcommerce: false
    },
    {
      id: '6',
      name: 'Creative Portfolio',
      category: 'Creative',
      industry: 'Entertainment',
      features: ['Portfolio Gallery', 'Project Showcase', 'About Story', 'Contact Forms', 'Social Links'],
      preview: 'Stunning visual design to showcase creative work and attract clients',
      image: '/placeholder.svg',
      isMobileOptimized: true,
      hasEcommerce: false
    }
  ];

  const templatesToShow = templates.length > 0 ? templates : defaultTemplates;

  const handlePreview = (template: Template) => {
    console.log('Preview template:', template);
    setSelectedTemplate(template);
    setShowPreview(true);
    onPreviewTemplate(template);
  };

  const handleSelectTemplate = (template: Template) => {
    console.log('Template selected:', template);
    onSelectTemplate(template);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Layout className="h-5 w-5" />
            <span>AI-Generated Templates</span>
          </CardTitle>
          <CardDescription>
            Choose from our curated templates, automatically customized for your industry
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templatesToShow.map((template) => (
              <Card key={template.id} className="group hover:shadow-lg transition-all duration-300">
                <div className="relative">
                  <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 rounded-t-lg flex items-center justify-center">
                    <Palette className="h-8 w-8 text-muted-foreground" />
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
                  <div className="grid grid-cols-1 gap-1">
                    {template.features.slice(0, 4).map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 text-xs">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>{feature}</span>
                      </div>
                    ))}
                    {template.features.length > 4 && (
                      <div className="text-xs text-muted-foreground">
                        +{template.features.length - 4} more features
                      </div>
                    )}
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
                      Use Template
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-4xl max-h-[80vh] overflow-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Template Preview: {selectedTemplate.name}</CardTitle>
                <Button variant="outline" onClick={() => setShowPreview(false)}>
                  Close
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                <div className="text-center space-y-4">
                  <h1 className="text-4xl font-bold">Welcome to {selectedTemplate.name}</h1>
                  <p className="text-lg text-muted-foreground max-w-2xl">
                    {selectedTemplate.preview}
                  </p>
                  <div className="flex space-x-4 justify-center">
                    <Button>Get Started</Button>
                    <Button variant="outline">Learn More</Button>
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                {selectedTemplate.features.map((feature, index) => (
                  <Card key={index}>
                    <CardContent className="p-4 text-center">
                      <h3 className="font-semibold">{feature}</h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        Feature description for {feature.toLowerCase()}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="flex space-x-4">
                <Button 
                  className="flex-1"
                  onClick={() => {
                    handleSelectTemplate(selectedTemplate);
                    setShowPreview(false);
                  }}
                >
                  Use This Template
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
