
import React, { useState, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Edit3, 
  Trash2, 
  Plus, 
  ArrowUp, 
  ArrowDown, 
  Eye, 
  EyeOff,
  Settings,
  Palette,
  Type,
  Layout
} from 'lucide-react';
import { Section, Block, ThemeSettings, SectionType, BlockType } from './types';
import { EnhancedWebsiteData } from './EnhancedTemplateGenerator';

interface ComprehensiveLiveEditorProps {
  sections: Section[];
  websiteData: EnhancedWebsiteData;
  theme: ThemeSettings;
  onUpdateSection: (sectionId: string, updates: any) => void;
  onAddSection: (type: SectionType, position?: number) => void;
  onDeleteSection: (sectionId: string) => void;
  onReorderSections: (fromIndex: number, toIndex: number) => void;
  onUpdateTheme: (updates: Partial<ThemeSettings>) => void;
  onAddBlock: (sectionId: string, blockType: BlockType) => void;
  onUpdateBlock: (sectionId: string, blockId: string, updates: any) => void;
  onDeleteBlock: (sectionId: string, blockId: string) => void;
}

const ComprehensiveLiveEditor = ({
  sections,
  websiteData,
  theme,
  onUpdateSection,
  onAddSection,
  onDeleteSection,
  onReorderSections,
  onUpdateTheme,
  onAddBlock,
  onUpdateBlock,
  onDeleteBlock
}: ComprehensiveLiveEditorProps) => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [editingElement, setEditingElement] = useState<string | null>(null);
  const [showThemeEditor, setShowThemeEditor] = useState(false);

  const renderSection = useCallback((section: Section, index: number) => {
    const isSelected = selectedSection === section.id;
    
    return (
      <div
        key={section.id}
        className={`relative group border-2 ${isSelected ? 'border-blue-500' : 'border-transparent'} rounded-lg transition-all hover:border-gray-300`}
        onClick={() => setSelectedSection(section.id)}
      >
        {/* Section Controls */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex space-x-1">
          <Button
            size="sm"
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation();
              onReorderSections(index, Math.max(0, index - 1));
            }}
          >
            <ArrowUp className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation();
              onReorderSections(index, Math.min(sections.length - 1, index + 1));
            }}
          >
            <ArrowDown className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation();
              setEditingElement(section.id);
            }}
          >
            <Edit3 className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteSection(section.id);
            }}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>

        {/* Section Badge */}
        <div className="absolute top-2 left-2 z-10">
          <Badge variant="outline" className="bg-white">
            {section.type.replace('-', ' ')}
          </Badge>
        </div>

        {/* Section Content */}
        <div className="p-4 min-h-[100px]">
          {renderSectionContent(section)}
        </div>

        {/* Add Section Button */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="outline"
            className="bg-white"
            onClick={(e) => {
              e.stopPropagation();
              onAddSection('rich-text', index + 1);
            }}
          >
            <Plus className="h-3 w-3 mr-1" />
            Add Section
          </Button>
        </div>
      </div>
    );
  }, [selectedSection, sections.length, onReorderSections, onDeleteSection, onAddSection]);

  const renderSectionContent = (section: Section) => {
    switch (section.type) {
      case 'hero':
        return (
          <div 
            className="text-center py-16 px-4 rounded-lg"
            style={{ backgroundColor: section.content.backgroundColor || theme.colors.primary }}
          >
            <h1 
              className="text-4xl font-bold mb-4 text-white cursor-pointer hover:bg-black/10 p-2 rounded"
              onClick={() => handleInlineEdit(section.id, 'headline', section.content.headline)}
            >
              {section.content.headline || 'Your Headline Here'}
            </h1>
            <p 
              className="text-xl mb-6 text-white/90 cursor-pointer hover:bg-black/10 p-2 rounded"
              onClick={() => handleInlineEdit(section.id, 'subheadline', section.content.subheadline)}
            >
              {section.content.subheadline || 'Your subheadline description'}
            </p>
            <div className="space-x-4">
              <Button 
                className="cursor-pointer"
                onClick={() => handleInlineEdit(section.id, 'ctaText', section.content.ctaText)}
              >
                {section.content.ctaText || 'Get Started'}
              </Button>
              {section.content.secondaryCta && (
                <Button 
                  variant="outline" 
                  className="cursor-pointer"
                  onClick={() => handleInlineEdit(section.id, 'secondaryCta', section.content.secondaryCta)}
                >
                  {section.content.secondaryCta}
                </Button>
              )}
            </div>
          </div>
        );

      case 'featured-collection':
        return (
          <div className="py-8">
            <h2 
              className="text-3xl font-bold text-center mb-8 cursor-pointer hover:bg-gray-100 p-2 rounded"
              onClick={() => handleInlineEdit(section.id, 'title', section.content.title)}
            >
              {section.content.title || 'Featured Products'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(websiteData.products || []).slice(0, section.content.productsCount || 6).map((product) => (
                <Card key={product.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    {product.imageUrl && (
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        className="w-full h-48 object-cover mb-4 rounded"
                      />
                    )}
                    <h3 className="font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-2">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">${product.price}</span>
                      <Button size="sm">Add to Cart</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'contact-form':
        return (
          <div className="py-8">
            <h2 
              className="text-3xl font-bold text-center mb-8 cursor-pointer hover:bg-gray-100 p-2 rounded"
              onClick={() => handleInlineEdit(section.id, 'title', section.content.title)}
            >
              {section.content.title || 'Contact Us'}
            </h2>
            <div className="max-w-2xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-4">Get in Touch</h3>
                  <div className="space-y-4">
                    <Input placeholder="Your Name" />
                    <Input placeholder="Your Email" />
                    <Textarea placeholder="Your Message" rows={4} />
                    <Button>Send Message</Button>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Contact Information</h3>
                  <div className="space-y-2 text-gray-600">
                    {websiteData.contactInfo?.email && <p>Email: {websiteData.contactInfo.email}</p>}
                    {websiteData.contactInfo?.phone && <p>Phone: {websiteData.contactInfo.phone}</p>}
                    {websiteData.contactInfo?.address && <p>Address: {websiteData.contactInfo.address}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'rich-text':
        return (
          <div 
            className="py-8 cursor-pointer hover:bg-gray-50 p-4 rounded"
            onClick={() => handleInlineEdit(section.id, 'content', section.content.content)}
            dangerouslySetInnerHTML={{ 
              __html: section.content.content || '<h2>Rich Text Section</h2><p>Click to edit this content...</p>' 
            }}
          />
        );

      case 'newsletter':
        return (
          <div className="py-8 text-center bg-gray-50 rounded-lg">
            <h2 
              className="text-3xl font-bold mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded"
              onClick={() => handleInlineEdit(section.id, 'title', section.content.title)}
            >
              {section.content.title || 'Subscribe to Our Newsletter'}
            </h2>
            <p 
              className="text-gray-600 mb-6 cursor-pointer hover:bg-gray-100 p-2 rounded"
              onClick={() => handleInlineEdit(section.id, 'description', section.content.description)}
            >
              {section.content.description || 'Get the latest updates and offers.'}
            </p>
            <div className="max-w-md mx-auto flex gap-2">
              <Input placeholder="Your email address" className="flex-1" />
              <Button>Subscribe</Button>
            </div>
          </div>
        );

      default:
        return (
          <div className="py-8 text-center text-gray-500">
            <p>Section type: {section.type}</p>
            <p>Click to configure this section</p>
          </div>
        );
    }
  };

  const handleInlineEdit = (sectionId: string, field: string, currentValue: string) => {
    const newValue = prompt(`Edit ${field}:`, currentValue);
    if (newValue !== null && newValue !== currentValue) {
      onUpdateSection(sectionId, { [field]: newValue });
    }
  };

  return (
    <div className="h-full bg-gray-50">
      {/* Theme Editor Toggle */}
      <div className="p-4 bg-white border-b flex justify-between items-center">
        <h3 className="font-semibold">Live Website Editor</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowThemeEditor(!showThemeEditor)}
        >
          <Palette className="h-4 w-4 mr-2" />
          Theme Settings
        </Button>
      </div>

      {/* Theme Editor Panel */}
      {showThemeEditor && (
        <div className="p-4 bg-white border-b">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Primary Color</label>
              <input
                type="color"
                value={theme.colors.primary}
                onChange={(e) => onUpdateTheme({ colors: { ...theme.colors, primary: e.target.value } })}
                className="w-full h-10 rounded border"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Secondary Color</label>
              <input
                type="color"
                value={theme.colors.secondary}
                onChange={(e) => onUpdateTheme({ colors: { ...theme.colors, secondary: e.target.value } })}
                className="w-full h-10 rounded border"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Accent Color</label>
              <input
                type="color"
                value={theme.colors.accent}
                onChange={(e) => onUpdateTheme({ colors: { ...theme.colors, accent: e.target.value } })}
                className="w-full h-10 rounded border"
              />
            </div>
          </div>
        </div>
      )}

      {/* Live Preview */}
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {sections.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-4">No sections yet</h3>
              <p className="text-gray-600 mb-6">Add your first section to get started</p>
              <Button onClick={() => onAddSection('hero')}>
                <Plus className="h-4 w-4 mr-2" />
                Add Hero Section
              </Button>
            </div>
          ) : (
            sections.map((section, index) => renderSection(section, index))
          )}
          
          {/* Add First Section Button */}
          {sections.length > 0 && (
            <div className="text-center py-8">
              <Button
                variant="outline"
                onClick={() => onAddSection('rich-text')}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Another Section
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveLiveEditor;
