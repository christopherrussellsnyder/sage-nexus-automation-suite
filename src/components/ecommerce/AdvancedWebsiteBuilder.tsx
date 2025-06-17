
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Monitor, Tablet, Smartphone, Save, Download, 
  Eye, Brain, Plus, Trash2, ArrowUp, ArrowDown
} from 'lucide-react';
import ComprehensiveLiveEditor from './ComprehensiveLiveEditor';
import { EnhancedWebsiteData } from './EnhancedTemplateGenerator';
import { Section, Block, ThemeSettings, SectionType, BlockType } from './types';

interface AdvancedWebsiteBuilderProps {
  websiteData: EnhancedWebsiteData;
  onSave: (sections: Section[], devicePreviews: any) => void;
}

interface BusinessInfo {
  businessName: string;
  businessType: string;
  industry: string;
  targetAudience: string;
  description: string;
  primaryGoal: string;
}

const AdvancedWebsiteBuilder = ({ websiteData, onSave }: AdvancedWebsiteBuilderProps) => {
  const [sections, setSections] = useState<Section[]>([]);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showBusinessForm, setShowBusinessForm] = useState(!sections.length);
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    businessName: websiteData.businessName || '',
    businessType: websiteData.businessType || '',
    industry: '',
    targetAudience: '',
    description: '',
    primaryGoal: ''
  });

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

  const businessTypes = [
    { value: 'ecommerce', label: 'E-commerce Store' },
    { value: 'service', label: 'Service Business' },
    { value: 'portfolio', label: 'Portfolio/Agency' },
    { value: 'blog', label: 'Blog/Content' },
    { value: 'restaurant', label: 'Restaurant' },
    { value: 'nonprofit', label: 'Non-Profit' }
  ];

  const industries = [
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Finance' },
    { value: 'education', label: 'Education' },
    { value: 'retail', label: 'Retail' },
    { value: 'food', label: 'Food & Beverage' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'fitness', label: 'Fitness' },
    { value: 'travel', label: 'Travel' },
    { value: 'other', label: 'Other' }
  ];

  const generateInitialTemplate = () => {
    const generatedSections: Section[] = [
      // Hero section
      {
        id: 'hero-1',
        type: 'hero',
        content: {
          headline: `Welcome to ${businessInfo.businessName}`,
          subheadline: businessInfo.description || `Professional ${businessInfo.businessType} services`,
          ctaText: businessInfo.businessType === 'ecommerce' ? 'Shop Now' : 'Get Started',
          ctaLink: '#',
          backgroundColor: theme.colors.primary
        },
        visible: true,
        mobileVisible: true,
        tabletVisible: true,
        blocks: [],
        settings: {}
      }
    ];

    // Add product section for e-commerce
    if (businessInfo.businessType === 'ecommerce' && websiteData.products?.length) {
      generatedSections.push({
        id: 'featured-collection-1',
        type: 'featured-collection',
        content: {
          title: 'Featured Products',
          products: websiteData.products,
          productsCount: 6,
          showPrices: true,
          showAddToCart: true
        },
        visible: true,
        mobileVisible: true,
        tabletVisible: true,
        blocks: [],
        settings: {}
      });
    }

    // Add about section
    generatedSections.push({
      id: 'rich-text-1',
      type: 'rich-text',
      content: {
        content: `<h2>About ${businessInfo.businessName}</h2><p>${businessInfo.description || 'We are dedicated to providing exceptional service to our customers.'}</p>`
      },
      visible: true,
      mobileVisible: true,
      tabletVisible: true,
      blocks: [],
      settings: {}
    });

    // Add contact section
    generatedSections.push({
      id: 'contact-1',
      type: 'contact-form',
      content: {
        title: 'Get In Touch',
        showForm: true,
        showContactInfo: true
      },
      visible: true,
      mobileVisible: true,
      tabletVisible: true,
      blocks: [],
      settings: {}
    });

    setSections(generatedSections);
    setShowBusinessForm(false);
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

  const renderBusinessForm = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Tell us about your business</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="businessName">Business Name</Label>
          <Input
            id="businessName"
            value={businessInfo.businessName}
            onChange={(e) => setBusinessInfo(prev => ({ ...prev, businessName: e.target.value }))}
          />
        </div>
        
        <div>
          <Label htmlFor="businessType">Business Type</Label>
          <Select value={businessInfo.businessType} onValueChange={(value) => setBusinessInfo(prev => ({ ...prev, businessType: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select business type" />
            </SelectTrigger>
            <SelectContent>
              {businessTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="industry">Industry</Label>
          <Select value={businessInfo.industry} onValueChange={(value) => setBusinessInfo(prev => ({ ...prev, industry: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((industry) => (
                <SelectItem key={industry.value} value={industry.value}>
                  {industry.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="description">Business Description</Label>
          <Textarea
            id="description"
            value={businessInfo.description}
            onChange={(e) => setBusinessInfo(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe what your business does..."
          />
        </div>

        <Button 
          onClick={generateInitialTemplate}
          className="w-full"
          disabled={!businessInfo.businessName || !businessInfo.businessType}
        >
          Create Website
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Top Toolbar */}
      <div className="bg-white border-b p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-bold flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>Website Builder</span>
          </h2>
          
          {!showBusinessForm && (
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
          )}
        </div>

        {!showBusinessForm && (
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
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {showBusinessForm ? (
          <div className="p-8">
            {renderBusinessForm()}
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default AdvancedWebsiteBuilder;
