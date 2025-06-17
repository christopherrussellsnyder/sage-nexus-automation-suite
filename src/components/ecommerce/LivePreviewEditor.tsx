import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Edit3, Save, Plus, Trash2, Eye, EyeOff, Move, 
  Type, Image, ShoppingCart, Layout, Palette,
  Settings, Copy, ArrowUp, ArrowDown
} from 'lucide-react';

interface Section {
  id: string;
  type: string;
  content: any;
  visible: boolean;
  mobileVisible: boolean;
  tabletVisible: boolean;
  blocks: Block[];
}

interface Block {
  id: string;
  type: string;
  content: any;
  settings: any;
}

interface LivePreviewEditorProps {
  sections: Section[];
  websiteData: any;
  onUpdateSection: (sectionId: string, updates: any) => void;
  onAddSection: (type: string, position?: number) => void;
  onDeleteSection: (sectionId: string) => void;
  onReorderSections: (fromIndex: number, toIndex: number) => void;
}

const LivePreviewEditor = ({
  sections,
  websiteData,
  onUpdateSection,
  onAddSection,
  onDeleteSection,
  onReorderSections
}: LivePreviewEditorProps) => {
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const previewRef = useRef<HTMLIFrameElement>(null);

  // Available section types with all comprehensive features
  const sectionTypes = {
    // Header Sections
    'announcement-bar': { name: 'Announcement Bar', category: 'Header' },
    'header': { name: 'Header/Navigation', category: 'Header' },
    'mega-menu': { name: 'Mega Menu', category: 'Header' },
    
    // Content Sections
    'hero': { name: 'Image Banner/Hero', category: 'Content' },
    'rich-text': { name: 'Rich Text', category: 'Content' },
    'image-with-text': { name: 'Image with Text', category: 'Content' },
    'video': { name: 'Video', category: 'Content' },
    'slideshow': { name: 'Slideshow', category: 'Content' },
    'multicolumn': { name: 'Multicolumn', category: 'Content' },
    'collage': { name: 'Collage', category: 'Content' },
    'newsletter': { name: 'Newsletter Signup', category: 'Content' },
    'contact-form': { name: 'Contact Form', category: 'Content' },
    'custom-liquid': { name: 'Custom HTML/CSS/JS', category: 'Content' },
    
    // Product Sections
    'featured-collection': { name: 'Featured Collection', category: 'Product' },
    'featured-product': { name: 'Featured Product', category: 'Product' },
    'product-info': { name: 'Product Information', category: 'Product' },
    'product-media': { name: 'Product Media Gallery', category: 'Product' },
    'product-form': { name: 'Product Form (Add to Cart)', category: 'Product' },
    'product-recommendations': { name: 'Product Recommendations', category: 'Product' },
    'related-products': { name: 'Related Products', category: 'Product' },
    'recently-viewed': { name: 'Recently Viewed Products', category: 'Product' },
    
    // Footer Sections
    'footer': { name: 'Footer', category: 'Footer' },
    'email-signup': { name: 'Email Signup', category: 'Footer' },
    'social-media': { name: 'Social Media Links', category: 'Footer' }
  };

  // Block types for sections
  const blockTypes = {
    // Text Blocks
    'heading': { name: 'Heading', category: 'Text' },
    'text': { name: 'Text/Paragraph', category: 'Text' },
    'rich-text-block': { name: 'Rich Text', category: 'Text' },
    'custom-html': { name: 'Custom HTML', category: 'Text' },
    
    // Media Blocks
    'image': { name: 'Image', category: 'Media' },
    'video-block': { name: 'Video', category: 'Media' },
    'image-gallery': { name: 'Image Gallery', category: 'Media' },
    'image-with-text-block': { name: 'Image with Text', category: 'Media' },
    
    // Interactive Blocks
    'button': { name: 'Button', category: 'Interactive' },
    'link': { name: 'Link', category: 'Interactive' },
    'social-icons': { name: 'Social Media Icons', category: 'Interactive' },
    'contact-info': { name: 'Contact Information', category: 'Interactive' },
    
    // Product Blocks
    'product-title': { name: 'Product Title', category: 'Product' },
    'product-price': { name: 'Product Price', category: 'Product' },
    'product-description': { name: 'Product Description', category: 'Product' },
    'product-vendor': { name: 'Product Vendor', category: 'Product' },
    'product-rating': { name: 'Product Rating', category: 'Product' },
    'buy-button': { name: 'Buy Button', category: 'Product' },
    'variant-picker': { name: 'Variant Picker', category: 'Product' },
    'quantity-selector': { name: 'Quantity Selector', category: 'Product' }
  };

  const generateLivePreviewHTML = () => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${websiteData.businessName} - Live Preview</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            line-height: 1.6;
        }
        
        /* Editable element styles */
        .editable-element {
            position: relative;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .editable-element:hover {
            outline: 2px dashed #3b82f6;
            outline-offset: 2px;
        }
        .editable-element.selected {
            outline: 2px solid #3b82f6;
            outline-offset: 2px;
        }
        .edit-overlay {
            position: absolute;
            top: -30px;
            left: 0;
            background: #3b82f6;
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            z-index: 1000;
        }
        
        /* Section styles */
        .section { 
            padding: 4rem 2rem; 
            position: relative;
        }
        .section.announcement-bar {
            background: #1f2937;
            color: white;
            text-align: center;
            padding: 1rem 2rem;
        }
        .section.header {
            background: white;
            border-bottom: 1px solid #e5e7eb;
            padding: 1rem 2rem;
        }
        .section.hero { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            color: white; 
            text-align: center; 
            min-height: 500px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .section.rich-text {
            background: #f9fafb;
        }
        .section.featured-collection,
        .section.featured-product {
            background: white;
        }
        .section.footer {
            background: #1f2937;
            color: white;
            margin-top: auto;
        }
        
        /* Logo integration */
        .logo {
            height: 50px;
            width: auto;
        }
        
        /* Navigation */
        .nav {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .nav-menu {
            display: flex;
            list-style: none;
            gap: 2rem;
        }
        .nav-link {
            text-decoration: none;
            color: #374151;
            font-weight: 500;
            transition: color 0.2s;
        }
        .nav-link:hover {
            color: #3b82f6;
        }
        
        /* Common elements */
        .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
        .card { 
            background: white; 
            padding: 2rem; 
            border-radius: 12px; 
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            transition: transform 0.2s ease;
        }
        .card:hover {
            transform: translateY(-2px);
        }
        .btn { 
            display: inline-block; 
            padding: 1rem 2rem; 
            background: #3b82f6; 
            color: white; 
            text-decoration: none; 
            border-radius: 8px; 
            font-weight: 600;
            border: none;
            cursor: pointer;
            transition: background 0.2s;
        }
        .btn:hover {
            background: #2563eb;
        }
        .btn.secondary {
            background: white;
            color: #3b82f6;
            border: 2px solid #3b82f6;
        }
        .section-title { 
            font-size: 2.5rem; 
            text-align: center; 
            margin-bottom: 3rem; 
            color: #1f2937; 
        }
        
        /* Product specific styles */
        .product-card {
            text-align: center;
            transition: transform 0.2s ease;
        }
        .product-card:hover {
            transform: translateY(-4px);
        }
        .product-image {
            width: 100%;
            height: 250px;
            object-fit: cover;
            border-radius: 8px;
            margin-bottom: 1rem;
        }
        .product-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: #1f2937;
        }
        .product-price {
            font-size: 1.125rem;
            font-weight: 700;
            color: #3b82f6;
            margin-bottom: 1rem;
        }
        .add-to-cart {
            width: 100%;
            padding: 0.75rem;
            background: #10b981;
            color: white;
            border: none;
            border-radius: 6px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s;
        }
        .add-to-cart:hover {
            background: #059669;
        }
        
        @media (max-width: 768px) {
            .section { padding: 2rem 1rem; }
            .section-title { font-size: 2rem; }
            .grid { grid-template-columns: 1fr; }
            .nav-menu { display: none; }
        }
    </style>
</head>
<body>
    ${sections.filter(s => s.visible).map(section => {
      switch (section.type) {
        case 'announcement-bar':
          return `
            <section class="section announcement-bar editable-element" data-section-id="${section.id}">
                <div class="edit-overlay">Announcement Bar</div>
                <div class="container">
                    <p class="editable-element" data-element="text" data-section-id="${section.id}">
                        ${section.content.text || 'Free shipping on orders over $50!'}
                    </p>
                </div>
            </section>`;
            
        case 'header':
          return `
            <header class="section header editable-element" data-section-id="${section.id}">
                <div class="edit-overlay">Header</div>
                <div class="container">
                    <nav class="nav">
                        <div class="logo-container">
                            ${websiteData.logoUrl ? 
                              `<img src="${websiteData.logoUrl}" alt="${websiteData.businessName}" class="logo editable-element" data-element="logo" data-section-id="${section.id}">` :
                              `<h2 class="editable-element" data-element="business-name" data-section-id="${section.id}">${websiteData.businessName}</h2>`
                            }
                        </div>
                        <ul class="nav-menu">
                            <li><a href="#" class="nav-link">Home</a></li>
                            <li><a href="#" class="nav-link">Products</a></li>
                            <li><a href="#" class="nav-link">About</a></li>
                            <li><a href="#" class="nav-link">Contact</a></li>
                        </ul>
                    </nav>
                </div>
            </header>`;
            
        case 'hero':
          return `
            <section class="section hero editable-element" data-section-id="${section.id}" style="background: ${section.content.backgroundColor || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}">
                <div class="edit-overlay">Hero Section</div>
                <div class="container">
                    <h1 class="editable-element" data-element="headline" data-section-id="${section.id}" style="font-size: 3rem; margin-bottom: 1rem;">
                        ${section.content.headline || 'Welcome to ' + websiteData.businessName}
                    </h1>
                    <p class="editable-element" data-element="subheadline" data-section-id="${section.id}" style="font-size: 1.25rem; margin-bottom: 2rem;">
                        ${section.content.subheadline || 'Discover amazing products and services'}
                    </p>
                    <a href="#" class="btn editable-element" data-element="cta" data-section-id="${section.id}">
                        ${section.content.ctaText || 'Get Started'}
                    </a>
                </div>
            </section>`;
            
        case 'featured-collection':
          return `
            <section class="section featured-collection editable-element" data-section-id="${section.id}">
                <div class="edit-overlay">Featured Collection</div>
                <div class="container">
                    <h2 class="section-title editable-element" data-element="title" data-section-id="${section.id}">
                        ${section.content.title || 'Featured Products'}
                    </h2>
                    <div class="grid">
                        ${websiteData.products?.slice(0, section.content.productsCount || 6).map((product: any, index: number) => `
                            <div class="card product-card editable-element" data-element="product" data-section-id="${section.id}" data-product-index="${index}">
                                <img src="${product.imageUrl || '/placeholder.svg'}" alt="${product.name}" class="product-image">
                                <h3 class="product-title editable-element" data-element="product-name" data-section-id="${section.id}" data-product-index="${index}">
                                    ${product.name}
                                </h3>
                                <p class="product-description editable-element" data-element="product-description" data-section-id="${section.id}" data-product-index="${index}">
                                    ${product.description || ''}
                                </p>
                                ${section.content.showPrices !== false ? `
                                    <p class="product-price editable-element" data-element="product-price" data-section-id="${section.id}" data-product-index="${index}">
                                        $${product.price || '0.00'}
                                    </p>
                                ` : ''}
                                ${section.content.showAddToCart !== false ? `
                                    <button class="add-to-cart editable-element" data-element="add-to-cart" data-section-id="${section.id}" data-product-index="${index}">
                                        Add to Cart
                                    </button>
                                ` : ''}
                            </div>
                        `).join('') || '<p>No products available</p>'}
                    </div>
                </div>
            </section>`;
            
        case 'rich-text':
          return `
            <section class="section rich-text editable-element" data-section-id="${section.id}">
                <div class="edit-overlay">Rich Text</div>
                <div class="container">
                    <div class="editable-element" data-element="content" data-section-id="${section.id}">
                        ${section.content.content || '<h2>About Our Company</h2><p>We are dedicated to providing exceptional products and services to our customers.</p>'}
                    </div>
                </div>
            </section>`;
            
        case 'contact-form':
          return `
            <section class="section contact-form editable-element" data-section-id="${section.id}">
                <div class="edit-overlay">Contact Form</div>
                <div class="container">
                    <h2 class="section-title editable-element" data-element="title" data-section-id="${section.id}">
                        ${section.content.title || 'Get In Touch'}
                    </h2>
                    <div class="grid">
                        <div class="card">
                            <form>
                                <div style="margin-bottom: 1rem;">
                                    <label style="display: block; margin-bottom: 0.5rem;">Name</label>
                                    <input type="text" style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px;">
                                </div>
                                <div style="margin-bottom: 1rem;">
                                    <label style="display: block; margin-bottom: 0.5rem;">Email</label>
                                    <input type="email" style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px;">
                                </div>
                                <div style="margin-bottom: 1rem;">
                                    <label style="display: block; margin-bottom: 0.5rem;">Message</label>
                                    <textarea rows="4" style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px;"></textarea>
                                </div>
                                <button type="submit" class="btn">Send Message</button>
                            </form>
                        </div>
                        <div class="card">
                            <h3>Contact Information</h3>
                            ${websiteData.contactInfo?.email ? `<p>Email: ${websiteData.contactInfo.email}</p>` : ''}
                            ${websiteData.contactInfo?.phone ? `<p>Phone: ${websiteData.contactInfo.phone}</p>` : ''}
                            ${websiteData.contactInfo?.address ? `<p>Address: ${websiteData.contactInfo.address}</p>` : ''}
                        </div>
                    </div>
                </div>
            </section>`;
            
        case 'footer':
          return `
            <footer class="section footer editable-element" data-section-id="${section.id}">
                <div class="edit-overlay">Footer</div>
                <div class="container">
                    <div class="grid">
                        <div>
                            <h3 class="editable-element" data-element="business-name" data-section-id="${section.id}">
                                ${websiteData.businessName}
                            </h3>
                            <p class="editable-element" data-element="description" data-section-id="${section.id}">
                                ${section.content.description || 'Your trusted partner for quality products and services.'}
                            </p>
                        </div>
                        <div>
                            <h4>Quick Links</h4>
                            <ul style="list-style: none;">
                                <li><a href="#" style="color: #d1d5db;">Home</a></li>
                                <li><a href="#" style="color: #d1d5db;">Products</a></li>
                                <li><a href="#" style="color: #d1d5db;">About</a></li>
                                <li><a href="#" style="color: #d1d5db;">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4>Contact</h4>
                            ${websiteData.contactInfo?.email ? `<p>${websiteData.contactInfo.email}</p>` : ''}
                            ${websiteData.contactInfo?.phone ? `<p>${websiteData.contactInfo.phone}</p>` : ''}
                        </div>
                    </div>
                    <div style="text-align: center; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #374151;">
                        <p>&copy; 2024 ${websiteData.businessName}. All rights reserved.</p>
                    </div>
                </div>
            </footer>`;
            
        default:
          return `
            <section class="section editable-element" data-section-id="${section.id}">
                <div class="edit-overlay">${section.type}</div>
                <div class="container">
                    <h2 class="section-title editable-element" data-element="title" data-section-id="${section.id}">
                        ${section.content.title || 'Section Title'}
                    </h2>
                    <div class="editable-element" data-element="content" data-section-id="${section.id}">
                        ${section.content.content || 'Section content goes here'}
                    </div>
                </div>
            </section>`;
      }
    }).join('')}
    
    <script>
        // Add click handlers for editable elements
        document.addEventListener('click', function(e) {
            const element = e.target.closest('.editable-element');
            if (element) {
                e.preventDefault();
                e.stopPropagation();
                
                // Remove previous selections
                document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
                
                // Add selection to clicked element
                element.classList.add('selected');
                
                // Notify parent window
                window.parent.postMessage({
                    type: 'elementSelected',
                    sectionId: element.dataset.sectionId,
                    elementType: element.dataset.element,
                    productIndex: element.dataset.productIndex,
                    content: element.textContent || element.innerHTML
                }, '*');
            }
        });
        
        // Add hover effects
        document.addEventListener('mouseover', function(e) {
            const element = e.target.closest('.editable-element');
            if (element && !element.classList.contains('selected')) {
                element.style.outline = '2px dashed #3b82f6';
                element.style.outlineOffset = '2px';
            }
        });
        
        document.addEventListener('mouseout', function(e) {
            const element = e.target.closest('.editable-element');
            if (element && !element.classList.contains('selected')) {
                element.style.outline = '';
                element.style.outlineOffset = '';
            }
        });
    </script>
</body>
</html>`;
  };

  // Handle messages from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'elementSelected') {
        setSelectedElement(event.data.sectionId + '_' + event.data.elementType);
        setEditMode(true);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const renderSectionPicker = () => {
    const categories = [...new Set(Object.values(sectionTypes).map(type => type.category))];
    
    return (
      <div className="space-y-4">
        <h4 className="font-medium">Add New Section</h4>
        {categories.map(category => (
          <div key={category} className="space-y-2">
            <h5 className="text-sm font-medium text-muted-foreground">{category}</h5>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(sectionTypes)
                .filter(([_, type]) => type.category === category)
                .map(([key, type]) => (
                  <Button
                    key={key}
                    variant="outline"
                    size="sm"
                    onClick={() => onAddSection(key)}
                    className="h-auto p-2 text-xs"
                  >
                    {type.name}
                  </Button>
                ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="h-full flex">
      {/* Live Preview */}
      <div className="flex-1 bg-gray-100 p-4">
        <div className="bg-white rounded-lg shadow-lg h-full overflow-hidden">
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="font-semibold">Live Preview - Click to Edit</h3>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant={editMode ? 'default' : 'outline'}
                onClick={() => setEditMode(!editMode)}
              >
                <Edit3 className="h-4 w-4 mr-1" />
                Edit Mode
              </Button>
            </div>
          </div>
          <div className="h-full overflow-auto">
            <iframe
              ref={previewRef}
              srcDoc={generateLivePreviewHTML()}
              className="w-full h-full border-0"
              title="Live Preview"
            />
          </div>
        </div>
      </div>

      {/* Edit Panel */}
      {editMode && (
        <div className="w-80 bg-white border-l p-4 overflow-auto">
          <div className="space-y-6">
            {/* Section Management */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Section Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {renderSectionPicker()}
                
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Current Sections</h4>
                  <div className="space-y-2">
                    {sections.map((section, index) => (
                      <div
                        key={section.id}
                        className="flex items-center justify-between p-2 border rounded"
                      >
                        <span className="text-sm font-medium capitalize">
                          {sectionTypes[section.type as keyof typeof sectionTypes]?.name || section.type}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                            <ArrowUp className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                            <ArrowDown className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                            <Copy className="h-3 w-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-6 w-6 p-0"
                            onClick={() => onDeleteSection(section.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Element Editor */}
            {selectedElement && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Edit Element</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="element-content">Content</Label>
                    <Textarea
                      id="element-content"
                      placeholder="Enter content..."
                      rows={4}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm">
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                    <Button size="sm" variant="outline">
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Design Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Design Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Typography</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select font" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inter">Inter</SelectItem>
                      <SelectItem value="roboto">Roboto</SelectItem>
                      <SelectItem value="arial">Arial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Color Scheme</Label>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {['#3b82f6', '#10b981', '#f59e0b', '#ef4444'].map(color => (
                      <button
                        key={color}
                        className="w-8 h-8 rounded border-2 border-gray-200"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default LivePreviewEditor;
