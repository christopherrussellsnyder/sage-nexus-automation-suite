
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Layout, Type, Palette, Image, ShoppingCart, 
  Settings, Eye, EyeOff, Plus, Trash2, Move
} from 'lucide-react';

interface Block {
  id: string;
  type: string;
  content: any;
  settings: any;
}

interface Section {
  id: string;
  type: string;
  content: any;
  visible: boolean;
  mobileVisible: boolean;
  tabletVisible: boolean;
  blocks: Block[];
}

interface EnhancedSectionEditorProps {
  section: Section;
  onUpdate: (updates: any) => void;
  onAddBlock: (blockType: string) => void;
  onUpdateBlock: (blockId: string, updates: any) => void;
  onDeleteBlock: (blockId: string) => void;
  websiteData: any;
}

const EnhancedSectionEditor = ({
  section,
  onUpdate,
  onAddBlock,
  onUpdateBlock,
  onDeleteBlock,
  websiteData
}: EnhancedSectionEditorProps) => {
  const [activeTab, setActiveTab] = useState('content');

  const blockTypes = {
    'heading': { name: 'Heading', icon: Type },
    'text': { name: 'Text/Paragraph', icon: Type },
    'image': { name: 'Image', icon: Image },
    'button': { name: 'Button', icon: Layout },
    'product-price': { name: 'Product Price', icon: ShoppingCart },
    'add-to-cart': { name: 'Add to Cart Button', icon: ShoppingCart },
    'product-gallery': { name: 'Product Gallery', icon: Image },
    'variant-picker': { name: 'Variant Picker', icon: Settings }
  };

  const renderContentEditor = () => {
    switch (section.type) {
      case 'hero':
        return (
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
                rows={3}
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
              <Label htmlFor="ctaLink">Call to Action Link</Label>
              <Input
                id="ctaLink"
                value={section.content.ctaLink || ''}
                onChange={(e) => onUpdate({ ctaLink: e.target.value })}
                placeholder="Button link URL"
              />
            </div>
          </div>
        );

      case 'featured-collection':
      case 'featured-product':
        return (
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
              <Label>Products to Display</Label>
              <Slider
                value={[section.content.productsCount || 6]}
                onValueChange={(value) => onUpdate({ productsCount: value[0] })}
                min={1}
                max={12}
                step={1}
                className="w-full"
              />
              <div className="text-sm text-muted-foreground mt-1">
                Show {section.content.productsCount || 6} products
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="showPrices">Show Prices</Label>
                <Switch
                  id="showPrices"
                  checked={section.content.showPrices !== false}
                  onCheckedChange={(checked) => onUpdate({ showPrices: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="showAddToCart">Show Add to Cart</Label>
                <Switch
                  id="showAddToCart"
                  checked={section.content.showAddToCart !== false}
                  onCheckedChange={(checked) => onUpdate({ showAddToCart: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="showProductImages">Show Product Images</Label>
                <Switch
                  id="showProductImages"
                  checked={section.content.showProductImages !== false}
                  onCheckedChange={(checked) => onUpdate({ showProductImages: checked })}
                />
              </div>
            </div>
          </div>
        );

      case 'contact-form':
        return (
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
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="showForm">Show Contact Form</Label>
                <Switch
                  id="showForm"
                  checked={section.content.showForm !== false}
                  onCheckedChange={(checked) => onUpdate({ showForm: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="showContactInfo">Show Contact Info</Label>
                <Switch
                  id="showContactInfo"
                  checked={section.content.showContactInfo !== false}
                  onCheckedChange={(checked) => onUpdate({ showContactInfo: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="showMap">Show Map</Label>
                <Switch
                  id="showMap"
                  checked={section.content.showMap === true}
                  onCheckedChange={(checked) => onUpdate({ showMap: checked })}
                />
              </div>
            </div>
          </div>
        );

      default:
        return (
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
    }
  };

  const renderStyleEditor = () => (
    <div className="space-y-6">
      {/* Background */}
      <div className="space-y-3">
        <h4 className="font-medium">Background</h4>
        <div className="space-y-2">
          <div>
            <Label htmlFor="backgroundColor">Background Color</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="backgroundColor"
                type="color"
                value={section.content.backgroundColor || '#ffffff'}
                onChange={(e) => onUpdate({ backgroundColor: e.target.value })}
                className="w-16 h-10"
              />
              <Input
                value={section.content.backgroundColor || '#ffffff'}
                onChange={(e) => onUpdate({ backgroundColor: e.target.value })}
                placeholder="#ffffff"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="backgroundImage">Background Image URL</Label>
            <Input
              id="backgroundImage"
              value={section.content.backgroundImage || ''}
              onChange={(e) => onUpdate({ backgroundImage: e.target.value })}
              placeholder="Image URL"
            />
          </div>
        </div>
      </div>

      {/* Spacing */}
      <div className="space-y-3">
        <h4 className="font-medium">Spacing</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Padding Top</Label>
            <Slider
              value={[section.content.paddingTop || 4]}
              onValueChange={(value) => onUpdate({ paddingTop: value[0] })}
              min={0}
              max={8}
              step={0.5}
              className="w-full"
            />
            <div className="text-xs text-muted-foreground mt-1">
              {section.content.paddingTop || 4}rem
            </div>
          </div>
          <div>
            <Label>Padding Bottom</Label>
            <Slider
              value={[section.content.paddingBottom || 4]}
              onValueChange={(value) => onUpdate({ paddingBottom: value[0] })}
              min={0}
              max={8}
              step={0.5}
              className="w-full"
            />
            <div className="text-xs text-muted-foreground mt-1">
              {section.content.paddingBottom || 4}rem
            </div>
          </div>
        </div>
      </div>

      {/* Layout */}
      <div className="space-y-3">
        <h4 className="font-medium">Layout</h4>
        <div>
          <Label>Content Alignment</Label>
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
        {(section.type === 'featured-collection' || section.type === 'featured-product') && (
          <div>
            <Label>Grid Columns (Desktop)</Label>
            <Slider
              value={[section.content.columns || 3]}
              onValueChange={(value) => onUpdate({ columns: value[0] })}
              min={1}
              max={4}
              step={1}
              className="w-full"
            />
            <div className="text-xs text-muted-foreground mt-1">
              {section.content.columns || 3} columns
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderBlocksEditor = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">Section Blocks</h4>
        <Select onValueChange={(value) => onAddBlock(value)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Add Block" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(blockTypes).map(([key, type]) => (
              <SelectItem key={key} value={key}>
                {type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        {section.blocks?.map((block, index) => (
          <Card key={block.id} className="p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Move className="h-4 w-4 text-muted-foreground" />
                <Badge variant="secondary">
                  {blockTypes[block.type as keyof typeof blockTypes]?.name || block.type}
                </Badge>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onDeleteBlock(block.id)}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
            
            {/* Block-specific editors */}
            {block.type === 'heading' && (
              <div className="space-y-2">
                <Input
                  value={block.content.text || ''}
                  onChange={(e) => onUpdateBlock(block.id, { text: e.target.value })}
                  placeholder="Heading text"
                />
                <Select
                  value={block.settings.level || 'h2'}
                  onValueChange={(value) => onUpdateBlock(block.id, { level: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="h1">H1</SelectItem>
                    <SelectItem value="h2">H2</SelectItem>
                    <SelectItem value="h3">H3</SelectItem>
                    <SelectItem value="h4">H4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            {block.type === 'text' && (
              <Textarea
                value={block.content.text || ''}
                onChange={(e) => onUpdateBlock(block.id, { text: e.target.value })}
                placeholder="Text content"
                rows={2}
              />
            )}
            
            {block.type === 'button' && (
              <div className="space-y-2">
                <Input
                  value={block.content.text || ''}
                  onChange={(e) => onUpdateBlock(block.id, { text: e.target.value })}
                  placeholder="Button text"
                />
                <Input
                  value={block.content.link || ''}
                  onChange={(e) => onUpdateBlock(block.id, { link: e.target.value })}
                  placeholder="Button link"
                />
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-base">
          <Layout className="h-4 w-4" />
          <span>Edit {section.type.charAt(0).toUpperCase() + section.type.slice(1)} Section</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Visibility Controls */}
        <div className="space-y-3">
          <h4 className="font-medium">Visibility</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="visible">Desktop</Label>
              <Switch
                id="visible"
                checked={section.visible}
                onCheckedChange={(checked) => onUpdate({ visible: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="tabletVisible">Tablet</Label>
              <Switch
                id="tabletVisible"
                checked={section.tabletVisible}
                onCheckedChange={(checked) => onUpdate({ tabletVisible: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="mobileVisible">Mobile</Label>
              <Switch
                id="mobileVisible"
                checked={section.mobileVisible}
                onCheckedChange={(checked) => onUpdate({ mobileVisible: checked })}
              />
            </div>
          </div>
        </div>

        {/* Tabbed Editor */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="style">Style</TabsTrigger>
            <TabsTrigger value="blocks">Blocks</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content" className="space-y-4">
            {renderContentEditor()}
          </TabsContent>
          
          <TabsContent value="style" className="space-y-4">
            {renderStyleEditor()}
          </TabsContent>
          
          <TabsContent value="blocks" className="space-y-4">
            {renderBlocksEditor()}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EnhancedSectionEditor;
