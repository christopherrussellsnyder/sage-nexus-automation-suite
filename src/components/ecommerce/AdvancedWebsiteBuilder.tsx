import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Monitor, Tablet, Smartphone, Wand2, Save, Download, 
  Eye, Brain, Plus, Trash2, ArrowUp, ArrowDown
} from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import EnhancedSectionEditor from './EnhancedSectionEditor';
import ComprehensiveLiveEditor from './ComprehensiveLiveEditor';
import EnhancedAITemplateGenerator from './EnhancedAITemplateGenerator';
import { EnhancedWebsiteData } from './EnhancedTemplateGenerator';
import { Section, Block, ThemeSettings, SectionType, BlockType } from './types';

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
  const [activeTab, setActiveTab] = useState<'generator' | 'builder' | 'preview'>('generator');

  // Default theme settings
  const [theme, setTheme] = useState<ThemeSettings>({
    colors: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      text: '#1f2937',
      background: '#ffffff',
      accent: '#f59e0b',
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b'
    },
    typography: {
      headingFont: 'Inter',
      bodyFont: 'Inter',
      buttonFont: 'Inter',
      headingFontWeight: '600',
      bodyFontWeight: '400',
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem'
      },
      lineHeight: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.625
      },
      letterSpacing: {
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em'
      }
    },
    layout: {
      containerWidth: '1200px',
      sectionSpacing: 4,
      gridGap: 2,
      borderRadius: {
        sm: '0.25rem',
        md: '0.5rem',
        lg: '0.75rem'
      }
    },
    responsive: {
      breakpoints: {
        mobile: '768px',
        tablet: '1024px',
        desktop: '1200px'
      }
    }
  });

  // Handle AI template generation with comprehensive features
  const handleAIGeneration = async (prompt: string, options: EnhancedAIOptions) => {
    setIsGenerating(true);
    setGenerationProgress(0);

    const steps = [
      'Analyzing your business requirements...',
      'Generating AI-powered sections...',
      'Creating personalized content...',
      'Optimizing for your industry...',
      'Applying design patterns...',
      'Building responsive layouts...',
      'Integrating e-commerce features...',
      'Setting up SEO optimization...'
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setGenerationProgress(((i + 1) / steps.length) * 100);
    }

    // Update theme based on options
    if (options.colorPalette) {
      const colorPalettes = {
        'modern-blue': { primary: '#3b82f6', secondary: '#8b5cf6' },
        'warm-orange': { primary: '#f59e0b', secondary: '#ef4444' },
        'nature-green': { primary: '#10b981', secondary: '#059669' },
        'luxury-purple': { primary: '#8b5cf6', secondary: '#7c3aed' }
      };
      
      const palette = colorPalettes[options.colorPalette as keyof typeof colorPalettes];
      if (palette) {
        setTheme(prev => ({
          ...prev,
          colors: { ...prev.colors, ...palette }
        }));
      }
    }

    // Generate comprehensive sections based on AI prompt and options
    const generatedSections: Section[] = [
      // Announcement bar
      {
        id: 'announcement-bar-1',
        type: 'announcement-bar',
        content: {
          text: options.ecommerceFeatures ? 'Free shipping on orders over $50! 🚚' : 'Welcome to our website! 🎉'
        },
        visible: true,
        mobileVisible: true,
        tabletVisible: true,
        blocks: [],
        settings: { backgroundColor: theme.colors.text }
      },
      
      // Header section with logo integration
      {
        id: 'header-1',
        type: 'header',
        content: {
          logo: websiteData.logoUrl,
          businessName: websiteData.businessName,
          navigation: ['Home', 'Products', 'Services', 'About', 'Contact'],
          showSearch: true,
          showCart: options.ecommerceFeatures
        },
        visible: true,
        mobileVisible: true,
        tabletVisible: true,
        blocks: [],
        settings: {}
      },
      
      // Hero section
      {
        id: 'hero-1',
        type: 'hero',
        content: {
          headline: `${websiteData.businessName} - ${options.contentTone === 'luxury' ? 'Premium' : 'Professional'} ${websiteData.businessType}`,
          subheadline: prompt.length > 50 ? prompt.substring(0, 120) + '...' : 'Discover our amazing products and services tailored just for you.',
          ctaText: options.businessType === 'ecommerce' ? 'Shop Now' : 'Get Started',
          ctaLink: options.businessType === 'ecommerce' ? '/products' : '/contact',
          secondaryCta: options.ecommerceFeatures ? 'View Collections' : 'Learn More',
          secondaryCtaLink: options.ecommerceFeatures ? '/collections' : '/about',
          backgroundImage: websiteData.logoUrl || '',
          backgroundColor: theme.colors.primary
        },
        visible: true,
        mobileVisible: true,
        tabletVisible: true,
        blocks: [],
        settings: {}
      }
    ];

    // Add e-commerce sections if enabled
    if (options.ecommerceFeatures && websiteData.products && websiteData.products.length > 0) {
      generatedSections.push({
        id: 'featured-collection-1',
        type: 'featured-collection',
        content: {
          title: 'Featured Products',
          products: websiteData.products,
          layout: 'grid',
          columns: 3,
          productsCount: 6,
          showPrices: true,
          showAddToCart: true,
          showProductImages: true,
          showWishlist: true,
          showViewAll: true
        },
        visible: true,
        mobileVisible: true,
        tabletVisible: true,
        blocks: [],
        settings: {}
      });
    }

    // Add services section if available
    if (websiteData.services && websiteData.services.length > 0) {
      generatedSections.push({
        id: 'services-1',
        type: 'multicolumn',
        content: {
          title: 'Our Services',
          columns: websiteData.services.slice(0, 3).map((service: any) => ({
            title: service.name,
            content: service.description,
            icon: '⚡',
            button: { text: 'Learn More', link: '#' }
          })),
          layout: 'cards'
        },
        visible: true,
        mobileVisible: true,
        tabletVisible: true,
        blocks: [],
        settings: {}
      });
    }

    // Add image with text section
    generatedSections.push({
      id: 'image-with-text-1',
      type: 'image-with-text',
      content: {
        heading: 'Why Choose Us?',
        text: `At ${websiteData.businessName}, we're committed to delivering exceptional ${options.businessType === 'ecommerce' ? 'products' : 'services'} that exceed your expectations. Our team brings years of experience and dedication to every project.`,
        buttonText: 'Learn More',
        buttonLink: '/about',
        image: '/placeholder.svg',
        imageAlt: 'About our company',
        imagePosition: 'left'
      },
      visible: true,
      mobileVisible: true,
      tabletVisible: true,
      blocks: [],
      settings: {}
    });

    // Add testimonials if conversion-focused
    if (options.features?.includes('conversion-focused') && websiteData.reviews && websiteData.reviews.length > 0) {
      generatedSections.push({
        id: 'testimonials-1',
        type: 'multicolumn',
        content: {
          title: 'What Our Customers Say',
          columns: websiteData.reviews.slice(0, 3).map((review: any) => ({
            content: `"${review.comment}"`,
            author: review.customerName,
            rating: review.rating,
            avatar: review.avatar
          })),
          layout: 'testimonials'
        },
        visible: true,
        mobileVisible: true,
        tabletVisible: true,
        blocks: [],
        settings: {}
      });
    }

    // Add newsletter section
    generatedSections.push({
      id: 'newsletter-1',
      type: 'newsletter',
      content: {
        title: 'Stay Updated',
        description: 'Subscribe to our newsletter for the latest updates, exclusive offers, and insider news.',
        showPrivacyNote: true
      },
      visible: true,
      mobileVisible: true,
      tabletVisible: true,
      blocks: [],
      settings: { backgroundColor: '#f9fafb' }
    });

    // Add contact section
    generatedSections.push({
      id: 'contact-1',
      type: 'contact-form',
      content: {
        title: 'Get In Touch',
        contactInfo: websiteData.contactInfo,
        showForm: true,
        showContactInfo: true,
        showMap: false,
        showSocialLinks: true
      },
      visible: true,
      mobileVisible: true,
      tabletVisible: true,
      blocks: [],
      settings: {}
    });

    // Add footer
    generatedSections.push({
      id: 'footer-1',
      type: 'footer',
      content: {
        businessName: websiteData.businessName,
        description: `Your trusted partner for quality ${websiteData.businessType === 'ecommerce' ? 'products' : 'services'}.`,
        contactInfo: websiteData.contactInfo,
        showSocialLinks: true,
        showNewsletter: true
      },
      visible: true,
      mobileVisible: true,
      tabletVisible: true,
      blocks: [],
      settings: {}
    });

    setSections(generatedSections);
    setIsGenerating(false);
    setActiveTab('preview'); // Switch to preview tab after generation
  };

  // Add new section
  const addSection = (type: SectionType, position?: number) => {
    const newSection: Section = {
      id: `${type}-${Date.now()}`,
      type,
      content: getDefaultSectionContent(type),
      visible: true,
      mobileVisible: true,
      tabletVisible: true,
      blocks: [],
      settings: {}
    };

    if (position !== undefined) {
      const newSections = [...sections];
      newSections.splice(position, 0, newSection);
      setSections(newSections);
    } else {
      setSections([...sections, newSection]);
    }
    
    setSelectedSection(newSection.id);
  };

  // Get default content for section type
  const getDefaultSectionContent = (type: SectionType) => {
    switch (type) {
      case 'hero':
        return {
          headline: 'Your Headline Here',
          subheadline: 'Your subheadline description',
          ctaText: 'Get Started',
          ctaLink: '#',
          backgroundColor: theme.colors.primary
        };
      case 'featured-collection':
        return {
          title: 'Featured Products',
          productsCount: 6,
          columns: 3,
          showPrices: true,
          showAddToCart: true,
          showProductImages: true
        };
      case 'contact-form':
        return {
          title: 'Contact Us',
          showForm: true,
          showContactInfo: true,
          showMap: false
        };
      case 'rich-text':
        return {
          content: '<h2>Rich Text Section</h2><p>Add your content here...</p>'
        };
      case 'newsletter':
        return {
          title: 'Subscribe to Our Newsletter',
          description: 'Get the latest updates and offers.',
          showPrivacyNote: true
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
  };

  // Delete section
  const deleteSection = (sectionId: string) => {
    const updatedSections = sections.filter(s => s.id !== sectionId);
    setSections(updatedSections);
    if (selectedSection === sectionId) {
      setSelectedSection(null);
    }
  };

  // Reorder sections
  const reorderSections = (fromIndex: number, toIndex: number) => {
    const newSections = [...sections];
    const [movedSection] = newSections.splice(fromIndex, 1);
    newSections.splice(toIndex, 0, movedSection);
    setSections(newSections);
  };

  // Block management functions
  const addBlock = (sectionId: string, blockType: BlockType) => {
    const newBlock: Block = {
      id: `block-${Date.now()}`,
      type: blockType,
      content: getDefaultBlockContent(blockType),
      settings: {}
    };

    const section = sections.find(s => s.id === sectionId);
    if (section) {
      updateSection(sectionId, {
        blocks: [...(section.blocks || []), newBlock]
      });
    }
  };

  const updateBlock = (sectionId: string, blockId: string, updates: any) => {
    const section = sections.find(s => s.id === sectionId);
    if (section) {
      const updatedBlocks = (section.blocks || []).map(block =>
        block.id === blockId ? { ...block, content: { ...block.content, ...updates } } : block
      );
      updateSection(sectionId, { blocks: updatedBlocks });
    }
  };

  const deleteBlock = (sectionId: string, blockId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (section) {
      const updatedBlocks = (section.blocks || []).filter(block => block.id !== blockId);
      updateSection(sectionId, { blocks: updatedBlocks });
    }
  };

  const getDefaultBlockContent = (blockType: BlockType) => {
    switch (blockType) {
      case 'heading':
        return { text: 'New Heading', level: 'h2' };
      case 'text':
        return { text: 'Enter your text here...' };
      case 'button':
        return { text: 'Click Here', link: '#' };
      case 'image':
        return { src: '/placeholder.svg', alt: 'Image', caption: '' };
      default:
        return { text: `${blockType} content` };
    }
  };

  const updateTheme = (updates: Partial<ThemeSettings>) => {
    setTheme(prev => ({
      ...prev,
      ...updates,
      colors: { ...prev.colors, ...(updates.colors || {}) },
      typography: { ...prev.typography, ...(updates.typography || {}) },
      layout: { ...prev.layout, ...(updates.layout || {}) }
    }));
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Top Toolbar */}
      <div className="bg-white border-b p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-bold flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>Comprehensive Website Builder</span>
            <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
              Full-Featured AI Builder
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
          <Button variant="outline" onClick={() => onSave(sections, { theme, previewDevice })}>
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
            <span className="text-sm font-medium">Generating comprehensive AI-powered website...</span>
            <span className="text-sm">{Math.round(generationProgress)}%</span>
          </div>
          <Progress value={generationProgress} className="h-2" />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Sidebar - AI Generator + Builder */}
        <div className="w-80 bg-white border-r flex flex-col">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="flex-1">
            <TabsList className="grid w-full grid-cols-3 p-1 m-4">
              <TabsTrigger value="generator">AI Generator</TabsTrigger>
              <TabsTrigger value="builder">Builder</TabsTrigger>
              <TabsTrigger value="preview">Live Edit</TabsTrigger>
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
                  <h3 className="font-semibold mb-3">Page Sections</h3>
                  <div className="space-y-2">
                    {sections.map((section, index) => (
                      <Card key={section.id} className={`cursor-pointer transition-all ${
                        selectedSection === section.id ? 'ring-2 ring-blue-500' : ''
                      }`}>
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            <div 
                              className="flex items-center space-x-2 flex-1"
                              onClick={() => setSelectedSection(section.id)}
                            >
                              <span className="font-medium capitalize">{section.type.replace('-', ' ')}</span>
                              <Badge variant="outline" className="text-xs">
                                {section.blocks?.length || 0} blocks
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => reorderSections(index, Math.max(0, index - 1))}
                              >
                                <ArrowUp className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => reorderSections(index, Math.min(sections.length - 1, index + 1))}
                              >
                                <ArrowDown className="h-3 w-3" />
                              </Button>
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
                    ))}
                  </div>
                </div>

                {/* Section Editor */}
                {selectedSection && (
                  <div className="border-t pt-4">
                    <EnhancedSectionEditor
                      section={sections.find(s => s.id === selectedSection)!}
                      onUpdate={(updates) => updateSection(selectedSection, updates)}
                      onAddBlock={(blockType) => addBlock(selectedSection, blockType)}
                      onUpdateBlock={(blockId, updates) => updateBlock(selectedSection, blockId, updates)}
                      onDeleteBlock={(blockId) => deleteBlock(selectedSection, blockId)}
                      websiteData={websiteData}
                    />
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="preview" className="flex-1 p-0">
              <div className="h-full">
                <div className="p-4 border-b">
                  <h3 className="font-semibold">Live Preview Editor</h3>
                  <p className="text-sm text-muted-foreground">Click elements to edit directly</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Main Preview Area */}
        <div className="flex-1 bg-gray-100">
          {activeTab === 'preview' ? (
            <ComprehensiveLiveEditor
              sections={sections}
              websiteData={websiteData}
              theme={theme}
              onUpdateSection={updateSection}
              onAddSection={addSection}
              onDeleteSection={deleteSection}
              onReorderSections={reorderSections}
              onUpdateTheme={updateTheme}
              onAddBlock={addBlock}
              onUpdateBlock={updateBlock}
              onDeleteBlock={deleteBlock}
            />
          ) : (
            <div className="p-4 h-full">
              <Card className="h-full bg-white">
                <CardContent className="p-4 h-full">
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    {sections.length === 0 ? (
                      <div className="text-center">
                        <Wand2 className="h-12 w-12 mx-auto mb-4" />
                        <p>Generate a website to see the preview</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Eye className="h-12 w-12 mx-auto mb-4" />
                        <p>Switch to "Live Edit" tab to see your website</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvancedWebsiteBuilder;
