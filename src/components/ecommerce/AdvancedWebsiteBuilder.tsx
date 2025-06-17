
import React, { useState, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Monitor, Tablet, Smartphone, Wand2, Save, Download, 
  Eye, Sparkles, Brain, Plus, Trash2, ArrowUp, ArrowDown,
  ShoppingBag, Users, MessageSquare, Star, Globe, Settings,
  Package, FileText, DollarSign, BarChart3, Search, Gauge, Store
} from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import SectionEditor from './SectionEditor';
import PreviewFrame from './PreviewFrame';
import EnhancedAITemplateGenerator from './EnhancedAITemplateGenerator';
import { EnhancedWebsiteData } from './EnhancedTemplateGenerator';

interface Section {
  id: string;
  type: 'hero' | 'features' | 'products' | 'services' | 'testimonials' | 'contact' | 'about' | 'gallery' | 'pricing' | 'faq';
  content: any;
  visible: boolean;
  mobileVisible: boolean;
  tabletVisible: boolean;
}

interface AdvancedWebsiteBuilderProps {
  websiteData: EnhancedWebsiteData;
  onSave: (sections: Section[], devicePreviews: any) => void;
}

interface EnhancedAIOptions {
  businessType?: string;
  targetAudience?: string;
  contentTone?: string;
  industry?: string;
  colorPalette?: string;
  fontStyle?: string;
  layoutStyle?: string;
  language?: string;
  features?: string[];
  customTone?: string;
  seoFocused?: boolean;
  ecommerceFeatures?: boolean;
  multiLanguage?: boolean;
}

const AdvancedWebsiteBuilder = ({ websiteData, onSave }: AdvancedWebsiteBuilderProps) => {
  const [sections, setSections] = useState<Section[]>([]);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [livePreviewHtml, setLivePreviewHtml] = useState('');
  const [activeTab, setActiveTab] = useState<'generator' | 'builder' | 'preview'>('generator');

  // AI-powered section suggestions based on business type
  const getAISectionSuggestions = useCallback(() => {
    const businessType = websiteData.businessType;
    
    const baseSuggestions = [
      { type: 'hero', name: 'Hero Banner', description: 'Eye-catching main banner', icon: Sparkles },
      { type: 'about', name: 'About Section', description: 'Tell your story', icon: Users },
      { type: 'contact', name: 'Contact Info', description: 'Get in touch section', icon: MessageSquare }
    ];

    // AI-powered suggestions based on business context
    if (businessType === 'ecommerce') {
      baseSuggestions.push(
        { type: 'products', name: 'Featured Products', description: 'Showcase your best items', icon: ShoppingBag },
        { type: 'testimonials', name: 'Customer Reviews', description: 'Social proof section', icon: Star },
        { type: 'gallery', name: 'Product Gallery', description: 'Visual product showcase', icon: Globe }
      );
    }

    if (businessType === 'service' || businessType === 'agency') {
      baseSuggestions.push(
        { type: 'services', name: 'Our Services', description: 'What we offer', icon: Package },
        { type: 'pricing', name: 'Pricing Plans', description: 'Service packages', icon: DollarSign },
        { type: 'testimonials', name: 'Client Testimonials', description: 'Success stories', icon: Star }
      );
    }

    baseSuggestions.push(
      { type: 'features', name: 'Key Features', description: 'Why choose us', icon: BarChart3 },
      { type: 'faq', name: 'FAQ Section', description: 'Common questions', icon: MessageSquare }
    );

    return baseSuggestions;
  }, [websiteData]);

  // Handle AI template generation
  const handleAIGeneration = async (prompt: string, options: EnhancedAIOptions) => {
    setIsGenerating(true);
    setGenerationProgress(0);

    const steps = [
      'Analyzing your business requirements...',
      'Generating AI-powered sections...',
      'Creating personalized content...',
      'Optimizing for your industry...',
      'Applying design patterns...',
      'Building responsive layouts...'
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setGenerationProgress(((i + 1) / steps.length) * 100);
    }

    // Generate sections based on AI prompt and options
    const generatedSections: Section[] = [
      {
        id: 'hero-1',
        type: 'hero',
        content: {
          headline: `${websiteData.businessName} - ${options.contentTone === 'luxury' ? 'Premium' : 'Professional'} ${websiteData.businessType}`,
          subheadline: prompt.substring(0, 120) + '...',
          ctaText: options.businessType === 'ecommerce' ? 'Shop Now' : 'Get Started',
          backgroundImage: websiteData.logoUrl || '',
          backgroundColor: options.colorPalette === 'modern-blue' ? '#667eea' : '#764ba2'
        },
        visible: true,
        mobileVisible: true,
        tabletVisible: true
      }
    ];

    // Add AI-generated sections based on options
    if (options.ecommerceFeatures && websiteData.products.length > 0) {
      generatedSections.push({
        id: 'products-1',
        type: 'products',
        content: {
          title: 'Featured Products',
          products: websiteData.products.slice(0, 6),
          layout: 'grid'
        },
        visible: true,
        mobileVisible: true,
        tabletVisible: true
      });
    }

    if (websiteData.services.length > 0) {
      generatedSections.push({
        id: 'services-1',
        type: 'services',
        content: {
          title: 'Our Services',
          services: websiteData.services,
          layout: 'cards'
        },
        visible: true,
        mobileVisible: true,
        tabletVisible: true
      });
    }

    if (options.features?.includes('conversion-focused')) {
      generatedSections.push({
        id: 'testimonials-1',
        type: 'testimonials',
        content: {
          title: 'What Our Customers Say',
          reviews: websiteData.reviews.slice(0, 3),
          layout: 'carousel'
        },
        visible: true,
        mobileVisible: true,
        tabletVisible: true
      });
    }

    generatedSections.push({
      id: 'contact-1',
      type: 'contact',
      content: {
        title: 'Get In Touch',
        contactInfo: websiteData.contactInfo,
        showForm: true,
        showMap: false
      },
      visible: true,
      mobileVisible: true,
      tabletVisible: true
    });

    setSections(generatedSections);
    setIsGenerating(false);
    setActiveTab('builder'); // Switch to builder tab after generation
    generateLivePreview(generatedSections);
  };

  // Generate live preview HTML
  const generateLivePreview = useCallback((sectionsToPreview: Section[]) => {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${websiteData.businessName} - Live Preview</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        .section { padding: 4rem 2rem; }
        .hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-align: center; }
        .hero h1 { font-size: 3rem; margin-bottom: 1rem; }
        .hero p { font-size: 1.25rem; margin-bottom: 2rem; }
        .btn { display: inline-block; padding: 1rem 2rem; background: white; color: #333; text-decoration: none; border-radius: 8px; font-weight: 600; }
        .container { max-width: 1200px; margin: 0 auto; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
        .card { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .section-title { font-size: 2.5rem; text-align: center; margin-bottom: 3rem; color: #2d3748; }
        
        @media (max-width: 768px) {
            .hero h1 { font-size: 2rem; }
            .section { padding: 2rem 1rem; }
            .grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    ${sectionsToPreview.filter(s => s.visible).map(section => {
      switch (section.type) {
        case 'hero':
          return `
            <section class="section hero">
                <div class="container">
                    <h1>${section.content.headline}</h1>
                    <p>${section.content.subheadline}</p>
                    <a href="#" class="btn">${section.content.ctaText}</a>
                </div>
            </section>`;
        case 'products':
          return `
            <section class="section">
                <div class="container">
                    <h2 class="section-title">${section.content.title}</h2>
                    <div class="grid">
                        ${section.content.products.map((product: any) => `
                            <div class="card">
                                <h3>${product.name}</h3>
                                <p>${product.description}</p>
                                <p><strong>${product.price}</strong></p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>`;
        case 'services':
          return `
            <section class="section" style="background: #f7fafc;">
                <div class="container">
                    <h2 class="section-title">${section.content.title}</h2>
                    <div class="grid">
                        ${section.content.services.map((service: any) => `
                            <div class="card">
                                <h3>${service.name}</h3>
                                <p>${service.description}</p>
                                <p><strong>${service.price}</strong></p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>`;
        case 'testimonials':
          return `
            <section class="section">
                <div class="container">
                    <h2 class="section-title">${section.content.title}</h2>
                    <div class="grid">
                        ${section.content.reviews.map((review: any) => `
                            <div class="card">
                                <p>"${review.review}"</p>
                                <p><strong>${review.customerName}</strong></p>
                                <p>${'⭐'.repeat(review.rating)}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>`;
        case 'contact':
          return `
            <section class="section" style="background: #2d3748; color: white;">
                <div class="container">
                    <h2 class="section-title" style="color: white;">${section.content.title}</h2>
                    <div class="grid">
                        <div>
                            ${section.content.contactInfo?.email ? `<p>Email: ${section.content.contactInfo.email}</p>` : ''}
                            ${section.content.contactInfo?.phone ? `<p>Phone: ${section.content.contactInfo.phone}</p>` : ''}
                            ${section.content.contactInfo?.address ? `<p>Address: ${section.content.contactInfo.address}</p>` : ''}
                        </div>
                    </div>
                </div>
            </section>`;
        default:
          return '';
      }
    }).join('')}
</body>
</html>`;
    
    setLivePreviewHtml(html);
  }, [websiteData]);

  // Handle drag end for section reordering
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const newSections = Array.from(sections);
    const [reorderedSection] = newSections.splice(result.source.index, 1);
    newSections.splice(result.destination.index, 0, reorderedSection);

    setSections(newSections);
    generateLivePreview(newSections);
  };

  // Add new section
  const addSection = (type: Section['type']) => {
    const newSection: Section = {
      id: `${type}-${Date.now()}`,
      type,
      content: getDefaultSectionContent(type),
      visible: true,
      mobileVisible: true,
      tabletVisible: true
    };

    setSections([...sections, newSection]);
    setSelectedSection(newSection.id);
    generateLivePreview([...sections, newSection]);
  };

  // Get default content for section type
  const getDefaultSectionContent = (type: Section['type']) => {
    switch (type) {
      case 'hero':
        return {
          headline: 'Your Headline Here',
          subheadline: 'Your subheadline description',
          ctaText: 'Get Started',
          backgroundColor: '#667eea'
        };
      case 'features':
        return {
          title: 'Key Features',
          features: [
            { title: 'Feature 1', description: 'Description here', icon: 'star' },
            { title: 'Feature 2', description: 'Description here', icon: 'zap' },
            { title: 'Feature 3', description: 'Description here', icon: 'heart' }
          ]
        };
      default:
        return { title: 'Section Title', content: 'Section content here' };
    }
  };

  // Update section content
  const updateSection = (sectionId: string, newContent: any) => {
    const updatedSections = sections.map(section => 
      section.id === sectionId 
        ? { ...section, content: { ...section.content, ...newContent } }
        : section
    );
    setSections(updatedSections);
    generateLivePreview(updatedSections);
  };

  // Delete section
  const deleteSection = (sectionId: string) => {
    const updatedSections = sections.filter(s => s.id !== sectionId);
    setSections(updatedSections);
    generateLivePreview(updatedSections);
    if (selectedSection === sectionId) {
      setSelectedSection(null);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Top Toolbar */}
      <div className="bg-white border-b p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-bold flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>AI Website Builder</span>
            <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
              AI Generator + Builder
            </Badge>
          </h2>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={previewDevice === 'desktop' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPreviewDevice('desktop')}
            >
              <Monitor className="h-4 w-4" />
            </Button>
            <Button
              variant={previewDevice === 'tablet' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPreviewDevice('tablet')}
            >
              <Tablet className="h-4 w-4" />
            </Button>
            <Button
              variant={previewDevice === 'mobile' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPreviewDevice('mobile')}
            >
              <Smartphone className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {isGenerating && (
        <div className="bg-blue-50 border-b p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Generating AI-powered website...</span>
            <span className="text-sm">{Math.round(generationProgress)}%</span>
          </div>
          <Progress value={generationProgress} className="h-2" />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Sidebar - Integrated AI Generator + Builder */}
        <div className="w-80 bg-white border-r flex flex-col">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="flex-1">
            <TabsList className="grid w-full grid-cols-3 p-1 m-4">
              <TabsTrigger value="generator">AI Generator</TabsTrigger>
              <TabsTrigger value="builder">Builder</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="generator" className="flex-1 overflow-auto p-4">
              <EnhancedAITemplateGenerator
                onGenerate={handleAIGeneration}
                isGenerating={isGenerating}
                progress={generationProgress}
              />
            </TabsContent>

            <TabsContent value="builder" className="flex-1 overflow-auto p-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-3">Add Sections</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {getAISectionSuggestions().map((suggestion) => (
                      <Button
                        key={suggestion.type}
                        variant="outline"
                        size="sm"
                        onClick={() => addSection(suggestion.type as Section['type'])}
                        className="h-auto p-3 flex flex-col items-center space-y-1"
                      >
                        <suggestion.icon className="h-4 w-4" />
                        <span className="text-xs text-center font-medium">{suggestion.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Page Sections</h3>
                  <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="sections">
                      {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                          {sections.map((section, index) => (
                            <Draggable key={section.id} draggableId={section.id} index={index}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}>
                                  <Card className={`cursor-pointer transition-all ${
                                    selectedSection === section.id ? 'ring-2 ring-blue-500' : ''
                                  } ${snapshot.isDragging ? 'shadow-lg' : ''}`}>
                                    <CardContent className="p-3">
                                      <div className="flex items-center justify-between">
                                        <div 
                                          className="flex items-center space-x-2 flex-1"
                                          onClick={() => setSelectedSection(section.id)}
                                        >
                                          <div {...provided.dragHandleProps} className="cursor-grab">
                                            <ArrowUp className="h-3 w-3" />
                                            <ArrowDown className="h-3 w-3 -mt-1" />
                                          </div>
                                          <span className="font-medium capitalize">{section.type}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                          <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => deleteSection(section.id)}
                                          >
                                            <Trash2 className="h-3 w-3" />
                                          </Button>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </div>

                {/* Section Editor */}
                {selectedSection && (
                  <div className="border-t pt-4">
                    <h3 className="font-semibold mb-3">Edit Section</h3>
                    <SectionEditor
                      section={sections.find(s => s.id === selectedSection)!}
                      onUpdate={(content) => updateSection(selectedSection, content)}
                    />
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="preview" className="flex-1 overflow-auto p-4">
              <div className="space-y-4">
                <h3 className="font-semibold">Website Preview</h3>
                <p className="text-sm text-muted-foreground">
                  Your AI-generated website with custom sections
                </p>
                {sections.length === 0 && (
                  <div className="text-center py-8">
                    <Wand2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Generate a website to see the preview</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Main Preview Area */}
        <div className="flex-1 bg-gray-100 p-4">
          <PreviewFrame
            html={livePreviewHtml}
            device={previewDevice}
            businessName={websiteData.businessName}
          />
        </div>
      </div>
    </div>
  );
};

export default AdvancedWebsiteBuilder;
