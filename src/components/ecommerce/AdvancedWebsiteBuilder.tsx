
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
import LivePreviewEditor from './LivePreviewEditor';
import EnhancedAITemplateGenerator from './EnhancedAITemplateGenerator';
import { EnhancedWebsiteData } from './EnhancedTemplateGenerator';

interface Block {
  id: string;
  type: string;
  content: any;
  settings: any;
}

interface Section {
  id: string;
  type: 'hero' | 'features' | 'products' | 'services' | 'testimonials' | 'contact' | 'about' | 'gallery' | 'pricing' | 'faq' | 'header' | 'footer' | 'announcement-bar' | 'featured-collection' | 'featured-product' | 'rich-text' | 'contact-form';
  content: any;
  visible: boolean;
  mobileVisible: boolean;
  tabletVisible: boolean;
  blocks: Block[];
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
  const [activeTab, setActiveTab] = useState<'generator' | 'builder' | 'preview'>('generator');

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

    // Generate comprehensive sections based on AI prompt and options
    const generatedSections: Section[] = [
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
        blocks: []
      },
      
      // Hero section
      {
        id: 'hero-1',
        type: 'hero',
        content: {
          headline: `${websiteData.businessName} - ${options.contentTone === 'luxury' ? 'Premium' : 'Professional'} ${websiteData.businessType}`,
          subheadline: prompt.substring(0, 120) + '...',
          ctaText: options.businessType === 'ecommerce' ? 'Shop Now' : 'Get Started',
          ctaLink: options.businessType === 'ecommerce' ? '/products' : '/contact',
          backgroundImage: websiteData.logoUrl || '',
          backgroundColor: options.colorPalette === 'modern-blue' ? '#667eea' : '#764ba2'
        },
        visible: true,
        mobileVisible: true,
        tabletVisible: true,
        blocks: []
      }
    ];

    // Add e-commerce sections if enabled
    if (options.ecommerceFeatures && websiteData.products.length > 0) {
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
          showProductImages: true
        },
        visible: true,
        mobileVisible: true,
        tabletVisible: true,
        blocks: []
      });
    }

    // Add services section if available
    if (websiteData.services.length > 0) {
      generatedSections.push({
        id: 'services-1',
        type: 'services',
        content: {
          title: 'Our Services',
          services: websiteData.services,
          layout: 'cards',
          showPricing: true
        },
        visible: true,
        mobileVisible: true,
        tabletVisible: true,
        blocks: []
      });
    }

    // Add testimonials if conversion-focused
    if (options.features?.includes('conversion-focused') && websiteData.reviews.length > 0) {
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
        tabletVisible: true,
        blocks: []
      });
    }

    // Add contact section
    generatedSections.push({
      id: 'contact-1',
      type: 'contact-form',
      content: {
        title: 'Get In Touch',
        contactInfo: websiteData.contactInfo,
        showForm: true,
        showContactInfo: true,
        showMap: false
      },
      visible: true,
      mobileVisible: true,
      tabletVisible: true,
      blocks: []
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
      blocks: []
    });

    setSections(generatedSections);
    setIsGenerating(false);
    setActiveTab('preview'); // Switch to preview tab after generation
  };

  // Handle drag end for section reordering
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const newSections = Array.from(sections);
    const [reorderedSection] = newSections.splice(result.source.index, 1);
    newSections.splice(result.destination.index, 0, reorderedSection);

    setSections(newSections);
  };

  // Add new section
  const addSection = (type: Section['type'], position?: number) => {
    const newSection: Section = {
      id: `${type}-${Date.now()}`,
      type,
      content: getDefaultSectionContent(type),
      visible: true,
      mobileVisible: true,
      tabletVisible: true,
      blocks: []
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
  const getDefaultSectionContent = (type: Section['type']) => {
    switch (type) {
      case 'hero':
        return {
          headline: 'Your Headline Here',
          subheadline: 'Your subheadline description',
          ctaText: 'Get Started',
          ctaLink: '#',
          backgroundColor: '#667eea'
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
  const addBlock = (sectionId: string, blockType: string) => {
    const newBlock: Block = {
      id: `block-${Date.now()}`,
      type: blockType,
      content: getDefaultBlockContent(blockType),
      settings: {}
    };

    updateSection(sectionId, {
      blocks: [...(sections.find(s => s.id === sectionId)?.blocks || []), newBlock]
    });
  };

  const updateBlock = (sectionId: string, blockId: string, updates: any) => {
    const section = sections.find(s => s.id === sectionId);
    if (section) {
      const updatedBlocks = section.blocks.map(block =>
        block.id === blockId ? { ...block, content: { ...block.content, ...updates } } : block
      );
      updateSection(sectionId, { blocks: updatedBlocks });
    }
  };

  const deleteBlock = (sectionId: string, blockId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (section) {
      const updatedBlocks = section.blocks.filter(block => block.id !== blockId);
      updateSection(sectionId, { blocks: updatedBlocks });
    }
  };

  const getDefaultBlockContent = (blockType: string) => {
    switch (blockType) {
      case 'heading':
        return { text: 'New Heading', level: 'h2' };
      case 'text':
        return { text: 'Enter your text here...' };
      case 'button':
        return { text: 'Click Here', link: '#' };
      case 'image':
        return { src: '', alt: '', caption: '' };
      default:
        return {};
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
              AI Generator + Live Editor
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
          <Button variant="outline" onClick={() => onSave(sections, {})}>
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
                                          <span className="font-medium capitalize">{section.type.replace('-', ' ')}</span>
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
            <LivePreviewEditor
              sections={sections}
              websiteData={websiteData}
              onUpdateSection={updateSection}
              onAddSection={addSection}
              onDeleteSection={deleteSection}
              onReorderSections={reorderSections}
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
