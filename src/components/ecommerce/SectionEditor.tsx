
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Palette, Type, Layout, Image } from 'lucide-react';

interface Section {
  id: string;
  type: 'hero' | 'features' | 'products' | 'services' | 'testimonials' | 'contact' | 'about' | 'gallery' | 'pricing' | 'faq';
  content: any;
  visible: boolean;
  mobileVisible: boolean;
  tabletVisible: boolean;
}

interface SectionEditorProps {
  section: Section;
  onUpdate: (content: any) => void;
}

const SectionEditor = ({ section, onUpdate }: SectionEditorProps) => {
  const renderHeroEditor = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="headline">Headline</Label>
        <Input
          id="headline"
          value={section.content.headline || ''}
          onChange={(e) => onUpdate({ headline: e.target.value })}
          placeholder="Enter headline"
        />
      </div>
      <div>
        <Label htmlFor="subheadline">Subheadline</Label>
        <Textarea
          id="subheadline"
          value={section.content.subheadline || ''}
          onChange={(e) => onUpdate({ subheadline: e.target.value })}
          placeholder="Enter subheadline"
        />
      </div>
      <div>
        <Label htmlFor="ctaText">Call to Action Text</Label>
        <Input
          id="ctaText"
          value={section.content.ctaText || ''}
          onChange={(e) => onUpdate({ ctaText: e.target.value })}
          placeholder="Button text"
        />
      </div>
      <div>
        <Label htmlFor="backgroundColor">Background Color</Label>
        <div className="flex items-center space-x-2">
          <Input
            id="backgroundColor"
            type="color"
            value={section.content.backgroundColor || '#667eea'}
            onChange={(e) => onUpdate({ backgroundColor: e.target.value })}
            className="w-16 h-10"
          />
          <Input
            value={section.content.backgroundColor || '#667eea'}
            onChange={(e) => onUpdate({ backgroundColor: e.target.value })}
            placeholder="#667eea"
          />
        </div>
      </div>
      <div>
        <Label>Text Alignment</Label>
        <Select 
          value={section.content.textAlign || 'center'} 
          onValueChange={(value) => onUpdate({ textAlign: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select alignment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Left</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="right">Right</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderFeaturesEditor = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Section Title</Label>
        <Input
          id="title"
          value={section.content.title || ''}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="Section title"
        />
      </div>
      <div>
        <Label>Layout Style</Label>
        <Select 
          value={section.content.layout || 'grid'} 
          onValueChange={(value) => onUpdate({ layout: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select layout" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="grid">Grid</SelectItem>
            <SelectItem value="carousel">Carousel</SelectItem>
            <SelectItem value="list">List</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Columns (Desktop)</Label>
        <Slider
          value={[section.content.columns || 3]}
          onValueChange={(value) => onUpdate({ columns: value[0] })}
          min={1}
          max={4}
          step={1}
          className="w-full"
        />
        <div className="text-sm text-muted-foreground mt-1">
          {section.content.columns || 3} columns
        </div>
      </div>
    </div>
  );

  const renderProductsEditor = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Section Title</Label>
        <Input
          id="title"
          value={section.content.title || ''}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="Products section title"
        />
      </div>
      <div>
        <Label>Display Layout</Label>
        <Select 
          value={section.content.layout || 'grid'} 
          onValueChange={(value) => onUpdate({ layout: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select layout" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="grid">Grid View</SelectItem>
            <SelectItem value="carousel">Carousel</SelectItem>
            <SelectItem value="masonry">Masonry</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Products to Show</Label>
        <Slider
          value={[section.content.productsCount || 6]}
          onValueChange={(value) => onUpdate({ productsCount: value[0] })}
          min={3}
          max={12}
          step={1}
          className="w-full"
        />
        <div className="text-sm text-muted-foreground mt-1">
          Show {section.content.productsCount || 6} products
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="showPrices"
          checked={section.content.showPrices !== false}
          onChange={(e) => onUpdate({ showPrices: e.target.checked })}
        />
        <Label htmlFor="showPrices">Show Prices</Label>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="showAddToCart"
          checked={section.content.showAddToCart !== false}
          onChange={(e) => onUpdate({ showAddToCart: e.target.checked })}
        />
        <Label htmlFor="showAddToCart">Show Add to Cart</Label>
      </div>
    </div>
  );

  const renderContactEditor = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Section Title</Label>
        <Input
          id="title"
          value={section.content.title || ''}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="Contact section title"
        />
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="showForm"
          checked={section.content.showForm !== false}
          onChange={(e) => onUpdate({ showForm: e.target.checked })}
        />
        <Label htmlFor="showForm">Show Contact Form</Label>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="showMap"
          checked={section.content.showMap === true}
          onChange={(e) => onUpdate({ showMap: e.target.checked })}
        />
        <Label htmlFor="showMap">Show Map</Label>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="showSocialLinks"
          checked={section.content.showSocialLinks === true}
          onChange={(e) => onUpdate({ showSocialLinks: e.target.checked })}
        />
        <Label htmlFor="showSocialLinks">Show Social Links</Label>
      </div>
    </div>
  );

  const renderGenericEditor = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Section Title</Label>
        <Input
          id="title"
          value={section.content.title || ''}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="Section title"
        />
      </div>
      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          value={section.content.content || ''}
          onChange={(e) => onUpdate({ content: e.target.value })}
          placeholder="Section content"
          rows={4}
        />
      </div>
    </div>
  );

  const renderSectionSpecificEditor = () => {
    switch (section.type) {
      case 'hero':
        return renderHeroEditor();
      case 'features':
        return renderFeaturesEditor();
      case 'products':
        return renderProductsEditor();
      case 'contact':
        return renderContactEditor();
      default:
        return renderGenericEditor();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-base">
          <Layout className="h-4 w-4" />
          <span>Edit {section.type.charAt(0).toUpperCase() + section.type.slice(1)} Section</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Section Visibility Controls */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Visibility</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="visible"
                checked={section.visible}
                onChange={(e) => onUpdate({ visible: e.target.checked })}
              />
              <Label htmlFor="visible">Show on Desktop</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="tabletVisible"
                checked={section.tabletVisible}
                onChange={(e) => onUpdate({ tabletVisible: e.target.checked })}
              />
              <Label htmlFor="tabletVisible">Show on Tablet</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="mobileVisible"
                checked={section.mobileVisible}
                onChange={(e) => onUpdate({ mobileVisible: e.target.checked })}
              />
              <Label htmlFor="mobileVisible">Show on Mobile</Label>
            </div>
          </div>
        </div>

        {/* Section-Specific Controls */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Section Settings</Label>
          {renderSectionSpecificEditor()}
        </div>

        {/* Advanced Styling */}
        <div className="space-y-4 border-t pt-4">
          <Label className="text-sm font-medium">Advanced Styling</Label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="paddingTop">Padding Top</Label>
              <Slider
                value={[section.content.paddingTop || 4]}
                onValueChange={(value) => onUpdate({ paddingTop: value[0] })}
                min={0}
                max={8}
                step={0.5}
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="paddingBottom">Padding Bottom</Label>
              <Slider
                value={[section.content.paddingBottom || 4]}
                onValueChange={(value) => onUpdate({ paddingBottom: value[0] })}
                min={0}
                max={8}
                step={0.5}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SectionEditor;
