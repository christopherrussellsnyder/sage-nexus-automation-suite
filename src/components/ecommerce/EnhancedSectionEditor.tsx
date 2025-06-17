
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Settings } from 'lucide-react';
import { Section, Block, BlockType } from './types';
import { EnhancedWebsiteData } from './EnhancedTemplateGenerator';

interface EnhancedSectionEditorProps {
  section: Section;
  onUpdate: (updates: any) => void;
  onAddBlock: (blockType: BlockType) => void;
  onUpdateBlock: (blockId: string, updates: any) => void;
  onDeleteBlock: (blockId: string) => void;
  websiteData: EnhancedWebsiteData;
}

const EnhancedSectionEditor = ({
  section,
  onUpdate,
  onAddBlock,
  onUpdateBlock,
  onDeleteBlock,
  websiteData
}: EnhancedSectionEditorProps) => {
  const blockTypes: { value: BlockType; label: string }[] = [
    // Text Blocks
    { value: 'heading', label: 'Heading' },
    { value: 'text', label: 'Text' },
    { value: 'rich-text-block', label: 'Rich Text' },
    { value: 'custom-html', label: 'Custom HTML' },
    
    // Media Blocks
    { value: 'image', label: 'Image' },
    { value: 'video-block', label: 'Video' },
    { value: 'image-gallery', label: 'Image Gallery' },
    { value: 'image-with-text-block', label: 'Image with Text' },
    
    // Interactive Blocks
    { value: 'button', label: 'Button' },
    { value: 'link', label: 'Link' },
    { value: 'social-icons', label: 'Social Icons' },
    { value: 'contact-info', label: 'Contact Info' },
    
    // Product Blocks
    { value: 'product-title', label: 'Product Title' },
    { value: 'product-price', label: 'Product Price' },
    { value: 'product-description', label: 'Product Description' },
    { value: 'product-vendor', label: 'Product Vendor' },
    { value: 'product-rating', label: 'Product Rating' },
    { value: 'buy-button', label: 'Buy Button' },
    { value: 'variant-picker', label: 'Variant Picker' },
    { value: 'quantity-selector', label: 'Quantity Selector' },
    
    // Dynamic Blocks
    { value: 'collection-list', label: 'Collection List' },
    { value: 'product-list', label: 'Product List' },
    { value: 'blog-posts', label: 'Blog Posts' },
    { value: 'testimonials', label: 'Testimonials' },
    { value: 'faq-collapsible', label: 'FAQ' }
  ];

  const renderSectionSettings = () => {
    switch (section.type) {
      case 'hero':
        return (
          <div className="space-y-4">
            <div>
              <Label>Headline</Label>
              <Input
                value={section.content.headline || ''}
                onChange={(e) => onUpdate({ headline: e.target.value })}
                placeholder="Enter headline..."
              />
            </div>
            <div>
              <Label>Subheadline</Label>
              <Textarea
                value={section.content.subheadline || ''}
                onChange={(e) => onUpdate({ subheadline: e.target.value })}
                placeholder="Enter subheadline..."
              />
            </div>
            <div>
              <Label>CTA Text</Label>
              <Input
                value={section.content.ctaText || ''}
                onChange={(e) => onUpdate({ ctaText: e.target.value })}
                placeholder="Button text..."
              />
            </div>
            <div>
              <Label>CTA Link</Label>
              <Input
                value={section.content.ctaLink || ''}
                onChange={(e) => onUpdate({ ctaLink: e.target.value })}
                placeholder="Button link..."
              />
            </div>
          </div>
        );

      case 'featured-collection':
        return (
          <div className="space-y-4">
            <div>
              <Label>Collection Title</Label>
              <Input
                value={section.content.title || ''}
                onChange={(e) => onUpdate({ title: e.target.value })}
                placeholder="Collection title..."
              />
            </div>
            <div>
              <Label>Products Count</Label>
              <Input
                type="number"
                value={section.content.productsCount || 6}
                onChange={(e) => onUpdate({ productsCount: parseInt(e.target.value) })}
              />
            </div>
            <div>
              <Label>Columns</Label>
              <Select
                value={section.content.columns?.toString() || '3'}
                onValueChange={(value) => onUpdate({ columns: parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 Columns</SelectItem>
                  <SelectItem value="3">3 Columns</SelectItem>
                  <SelectItem value="4">4 Columns</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={section.content.showPrices}
                onCheckedChange={(checked) => onUpdate({ showPrices: checked })}
              />
              <Label>Show Prices</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={section.content.showAddToCart}
                onCheckedChange={(checked) => onUpdate({ showAddToCart: checked })}
              />
              <Label>Show Add to Cart</Label>
            </div>
          </div>
        );

      case 'contact-form':
        return (
          <div className="space-y-4">
            <div>
              <Label>Form Title</Label>
              <Input
                value={section.content.title || ''}
                onChange={(e) => onUpdate({ title: e.target.value })}
                placeholder="Contact form title..."
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={section.content.showForm}
                onCheckedChange={(checked) => onUpdate({ showForm: checked })}
              />
              <Label>Show Contact Form</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={section.content.showContactInfo}
                onCheckedChange={(checked) => onUpdate({ showContactInfo: checked })}
              />
              <Label>Show Contact Info</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={section.content.showMap}
                onCheckedChange={(checked) => onUpdate({ showMap: checked })}
              />
              <Label>Show Map</Label>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <div>
              <Label>Section Title</Label>
              <Input
                value={section.content.title || ''}
                onChange={(e) => onUpdate({ title: e.target.value })}
                placeholder="Section title..."
              />
            </div>
            <div>
              <Label>Content</Label>
              <Textarea
                value={section.content.content || ''}
                onChange={(e) => onUpdate({ content: e.target.value })}
                placeholder="Section content..."
              />
            </div>
          </div>
        );
    }
  };

  const renderBlockEditor = (block: Block) => {
    switch (block.type) {
      case 'heading':
        return (
          <div className="space-y-2">
            <Input
              value={block.content.text || ''}
              onChange={(e) => onUpdateBlock(block.id, { text: e.target.value })}
              placeholder="Heading text..."
            />
            <Select
              value={block.content.level || 'h2'}
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
        );
      
      case 'text':
        return (
          <Textarea
            value={block.content.text || ''}
            onChange={(e) => onUpdateBlock(block.id, { text: e.target.value })}
            placeholder="Text content..."
          />
        );
      
      case 'button':
        return (
          <div className="space-y-2">
            <Input
              value={block.content.text || ''}
              onChange={(e) => onUpdateBlock(block.id, { text: e.target.value })}
              placeholder="Button text..."
            />
            <Input
              value={block.content.link || ''}
              onChange={(e) => onUpdateBlock(block.id, { link: e.target.value })}
              placeholder="Button link..."
            />
          </div>
        );
      
      default:
        return (
          <div className="text-sm text-muted-foreground">
            {block.type} block settings
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Section Settings</span>
            <Badge variant="outline">{section.type}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderSectionSettings()}
          
          <div className="mt-4 space-y-2">
            <div className="flex items-center space-x-2">
              <Switch
                checked={section.visible}
                onCheckedChange={(checked) => onUpdate({ visible: checked })}
              />
              <Label>Visible on Desktop</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={section.tabletVisible}
                onCheckedChange={(checked) => onUpdate({ tabletVisible: checked })}
              />
              <Label>Visible on Tablet</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={section.mobileVisible}
                onCheckedChange={(checked) => onUpdate({ mobileVisible: checked })}
              />
              <Label>Visible on Mobile</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Blocks</span>
            <Select onValueChange={(value) => onAddBlock(value as BlockType)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Add Block" />
              </SelectTrigger>
              <SelectContent>
                {blockTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {section.blocks?.map((block) => (
              <Card key={block.id} className="p-3">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary">{block.type}</Badge>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDeleteBlock(block.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
                {renderBlockEditor(block)}
              </Card>
            ))}
            
            {!section.blocks?.length && (
              <div className="text-center py-8 text-muted-foreground">
                No blocks yet. Add a block to get started.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedSectionEditor;
