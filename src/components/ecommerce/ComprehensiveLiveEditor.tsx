
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { 
  Edit3, Save, Plus, Trash2, Eye, EyeOff, Move, 
  Type, Image, ShoppingCart, Layout, Palette,
  Settings, Copy, ArrowUp, ArrowDown, Monitor,
  Tablet, Smartphone, Wand2, Grid, List,
  Search, Filter, Tag, Star, Heart, Share2
} from 'lucide-react';
import { Section, Block, ThemeSettings, SectionType, BlockType } from './types';

interface ComprehensiveLiveEditorProps {
  sections: Section[];
  websiteData: any;
  theme: ThemeSettings;
  onUpdateSection: (sectionId: string, updates: any) => void;
  onAddSection: (type: SectionType, position?: number) => void;
  onDeleteSection: (sectionId: string) => void;
  onReorderSections: (fromIndex: number, toIndex: number) => void;
  onUpdateTheme: (theme: Partial<ThemeSettings>) => void;
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
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activePanel, setActivePanel] = useState<'sections' | 'design' | 'content' | 'seo'>('sections');
  const [editingContent, setEditingContent] = useState<any>({});
  const previewRef = useRef<HTMLIFrameElement>(null);

  // Comprehensive section types with all features
  const sectionTypes = {
    // Header Sections
    'announcement-bar': { name: 'Announcement Bar', category: 'Header', icon: 'megaphone' },
    'header': { name: 'Header/Navigation', category: 'Header', icon: 'navigation' },
    'mega-menu': { name: 'Mega Menu', category: 'Header', icon: 'menu' },
    
    // Content Sections
    'hero': { name: 'Image Banner/Hero', category: 'Content', icon: 'image' },
    'rich-text': { name: 'Rich Text', category: 'Content', icon: 'type' },
    'image-with-text': { name: 'Image with Text', category: 'Content', icon: 'layout' },
    'video': { name: 'Video', category: 'Content', icon: 'video' },
    'slideshow': { name: 'Slideshow', category: 'Content', icon: 'images' },
    'multicolumn': { name: 'Multicolumn', category: 'Content', icon: 'grid' },
    'collage': { name: 'Collage', category: 'Content', icon: 'grid-3x3' },
    'newsletter': { name: 'Newsletter Signup', category: 'Content', icon: 'mail' },
    'contact-form': { name: 'Contact Form', category: 'Content', icon: 'mail' },
    'custom-liquid': { name: 'Custom HTML/CSS/JS', category: 'Content', icon: 'code' },
    
    // Product Sections
    'featured-collection': { name: 'Featured Collection', category: 'Product', icon: 'shopping-bag' },
    'featured-product': { name: 'Featured Product', category: 'Product', icon: 'package' },
    'product-info': { name: 'Product Information', category: 'Product', icon: 'info' },
    'product-media': { name: 'Product Media Gallery', category: 'Product', icon: 'image' },
    'product-form': { name: 'Product Form (Add to Cart)', category: 'Product', icon: 'shopping-cart' },
    'product-recommendations': { name: 'Product Recommendations', category: 'Product', icon: 'star' },
    'related-products': { name: 'Related Products', category: 'Product', icon: 'link' },
    'recently-viewed': { name: 'Recently Viewed Products', category: 'Product', icon: 'eye' },
    
    // Footer Sections
    'footer': { name: 'Footer', category: 'Footer', icon: 'layout' },
    'email-signup': { name: 'Email Signup', category: 'Footer', icon: 'mail' },
    'social-media': { name: 'Social Media Links', category: 'Footer', icon: 'share-2' }
  };

  // Block types for comprehensive content management
  const blockTypes = {
    // Text Blocks
    'heading': { name: 'Heading', category: 'Text', icon: 'type' },
    'text': { name: 'Text/Paragraph', category: 'Text', icon: 'align-left' },
    'rich-text-block': { name: 'Rich Text', category: 'Text', icon: 'edit-3' },
    'custom-html': { name: 'Custom HTML', category: 'Text', icon: 'code' },
    
    // Media Blocks
    'image': { name: 'Image', category: 'Media', icon: 'image' },
    'video-block': { name: 'Video', category: 'Media', icon: 'video' },
    'image-gallery': { name: 'Image Gallery', category: 'Media', icon: 'images' },
    'image-with-text-block': { name: 'Image with Text', category: 'Media', icon: 'layout' },
    
    // Interactive Blocks
    'button': { name: 'Button', category: 'Interactive', icon: 'mouse-pointer' },
    'link': { name: 'Link', category: 'Interactive', icon: 'link' },
    'social-icons': { name: 'Social Media Icons', category: 'Interactive', icon: 'share-2' },
    'contact-info': { name: 'Contact Information', category: 'Interactive', icon: 'phone' },
    
    // Product Blocks
    'product-title': { name: 'Product Title', category: 'Product', icon: 'type' },
    'product-price': { name: 'Product Price', category: 'Product', icon: 'dollar-sign' },
    'product-description': { name: 'Product Description', category: 'Product', icon: 'file-text' },
    'product-vendor': { name: 'Product Vendor', category: 'Product', icon: 'building' },
    'product-rating': { name: 'Product Rating', category: 'Product', icon: 'star' },
    'buy-button': { name: 'Buy Button', category: 'Product', icon: 'shopping-cart' },
    'variant-picker': { name: 'Variant Picker', category: 'Product', icon: 'sliders' },
    'quantity-selector': { name: 'Quantity Selector', category: 'Product', icon: 'plus-minus' },
    
    // Dynamic Blocks
    'collection-list': { name: 'Collection List', category: 'Dynamic', icon: 'list' },
    'product-list': { name: 'Product List', category: 'Dynamic', icon: 'package' },
    'blog-posts': { name: 'Blog Posts', category: 'Dynamic', icon: 'file-text' },
    'testimonials': { name: 'Testimonials', category: 'Dynamic', icon: 'message-circle' },
    'faq-collapsible': { name: 'FAQ/Collapsible Content', category: 'Dynamic', icon: 'help-circle' }
  };

  const generateComprehensiveHTML = () => {
    const { colors, typography, layout } = theme;
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${websiteData.businessName} - Live Preview</title>
    <link href="https://fonts.googleapis.com/css2?family=${typography.headingFont.replace(' ', '+')}:wght@400;600;700&family=${typography.bodyFont.replace(' ', '+')}:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary-color: ${colors.primary};
            --secondary-color: ${colors.secondary};
            --text-color: ${colors.text};
            --background-color: ${colors.background};
            --accent-color: ${colors.accent};
            --success-color: ${colors.success};
            --error-color: ${colors.error};
            --warning-color: ${colors.warning};
            --heading-font: '${typography.headingFont}', serif;
            --body-font: '${typography.bodyFont}', sans-serif;
            --container-width: ${layout.containerWidth};
            --section-spacing: ${layout.sectionSpacing}rem;
            --grid-gap: ${layout.gridGap}rem;
            --border-radius-sm: ${layout.borderRadius.sm};
            --border-radius-md: ${layout.borderRadius.md};
            --border-radius-lg: ${layout.borderRadius.lg};
        }
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body { 
            font-family: var(--body-font);
            line-height: ${typography.lineHeight.normal};
            color: var(--text-color);
            background-color: var(--background-color);
        }
        
        /* Typography */
        h1, h2, h3, h4, h5, h6 {
            font-family: var(--heading-font);
            font-weight: ${typography.headingFontWeight};
            line-height: ${typography.lineHeight.tight};
            letter-spacing: ${typography.letterSpacing.tight};
        }
        
        h1 { font-size: ${typography.fontSize['3xl']}; }
        h2 { font-size: ${typography.fontSize['2xl']}; }
        h3 { font-size: ${typography.fontSize.xl}; }
        h4 { font-size: ${typography.fontSize.lg}; }
        h5, h6 { font-size: ${typography.fontSize.base}; }
        
        p { 
            font-size: ${typography.fontSize.base};
            line-height: ${typography.lineHeight.normal};
            margin-bottom: 1rem;
        }
        
        /* Layout */
        .container { 
            max-width: var(--container-width); 
            margin: 0 auto; 
            padding: 0 1rem; 
        }
        
        /* Editable elements */
        .editable-element {
            position: relative;
            cursor: pointer;
            transition: all 0.2s ease;
            outline: none;
        }
        
        .editable-element:hover {
            outline: 2px dashed var(--primary-color);
            outline-offset: 2px;
            background: rgba(59, 130, 246, 0.05);
        }
        
        .editable-element.selected {
            outline: 2px solid var(--primary-color);
            outline-offset: 2px;
            background: rgba(59, 130, 246, 0.1);
        }
        
        .edit-overlay {
            position: absolute;
            top: -30px;
            left: 0;
            background: var(--primary-color);
            color: white;
            padding: 4px 8px;
            border-radius: var(--border-radius-sm);
            font-size: 12px;
            z-index: 1000;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.2s ease;
        }
        
        .editable-element:hover .edit-overlay,
        .editable-element.selected .edit-overlay {
            opacity: 1;
        }
        
        /* Sections */
        .section { 
            padding: var(--section-spacing) 0;
            position: relative;
        }
        
        .section.full-width {
            width: 100vw;
            margin-left: calc(-50vw + 50%);
        }
        
        /* Grid system */
        .grid { 
            display: grid; 
            gap: var(--grid-gap);
        }
        
        .grid-cols-1 { grid-template-columns: 1fr; }
        .grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
        .grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
        .grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
        .grid-cols-5 { grid-template-columns: repeat(5, 1fr); }
        .grid-cols-6 { grid-template-columns: repeat(6, 1fr); }
        
        /* Responsive grid */
        @media (max-width: 768px) {
            .grid-cols-2, .grid-cols-3, .grid-cols-4, .grid-cols-5, .grid-cols-6 {
                grid-template-columns: 1fr;
            }
        }
        
        @media (min-width: 769px) and (max-width: 1024px) {
            .grid-cols-3, .grid-cols-4, .grid-cols-5, .grid-cols-6 {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        
        /* Cards */
        .card { 
            background: white; 
            padding: 2rem; 
            border-radius: var(--border-radius-lg);
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 30px rgba(0,0,0,0.15);
        }
        
        /* Buttons */
        .btn { 
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            padding: 0.75rem 1.5rem; 
            background: var(--primary-color); 
            color: white; 
            text-decoration: none; 
            border-radius: var(--border-radius-md);
            font-family: var(--body-font);
            font-weight: 600;
            font-size: ${typography.fontSize.base};
            border: none;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        .btn:hover {
            background: color-mix(in srgb, var(--primary-color) 85%, black);
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        
        .btn.secondary {
            background: white;
            color: var(--primary-color);
            border: 2px solid var(--primary-color);
        }
        
        .btn.secondary:hover {
            background: var(--primary-color);
            color: white;
        }
        
        /* Specific section styles */
        .section.announcement-bar {
            background: var(--text-color);
            color: white;
            text-align: center;
            padding: 1rem 0;
            font-size: ${typography.fontSize.sm};
        }
        
        .section.header {
            background: white;
            border-bottom: 1px solid #e5e7eb;
            padding: 1rem 0;
            position: sticky;
            top: 0;
            z-index: 100;
        }
        
        .section.hero { 
            background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%); 
            color: white; 
            text-align: center; 
            min-height: 60vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .section.footer {
            background: var(--text-color);
            color: white;
            margin-top: auto;
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
            align-items: center;
        }
        
        .nav-link {
            text-decoration: none;
            color: var(--text-color);
            font-weight: 500;
            transition: color 0.2s;
            position: relative;
        }
        
        .nav-link:hover {
            color: var(--primary-color);
        }
        
        .nav-link::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 2px;
            bottom: -4px;
            left: 0;
            background-color: var(--primary-color);
            transform: scaleX(0);
            transition: transform 0.2s ease;
        }
        
        .nav-link:hover::after {
            transform: scaleX(1);
        }
        
        /* Logo */
        .logo {
            height: 50px;
            width: auto;
            max-width: 200px;
        }
        
        /* Product styles */
        .product-card {
            text-align: center;
            transition: transform 0.2s ease;
            overflow: hidden;
        }
        
        .product-card:hover {
            transform: translateY(-4px);
        }
        
        .product-image {
            width: 100%;
            height: 250px;
            object-fit: cover;
            border-radius: var(--border-radius-md);
            margin-bottom: 1rem;
            transition: transform 0.3s ease;
        }
        
        .product-card:hover .product-image {
            transform: scale(1.05);
        }
        
        .product-title {
            font-size: ${typography.fontSize.lg};
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: var(--text-color);
        }
        
        .product-price {
            font-size: ${typography.fontSize.lg};
            font-weight: 700;
            color: var(--primary-color);
            margin-bottom: 1rem;
        }
        
        .product-price.sale {
            color: var(--error-color);
        }
        
        .product-price-compare {
            text-decoration: line-through;
            color: #9ca3af;
            font-size: ${typography.fontSize.base};
            margin-left: 0.5rem;
        }
        
        .add-to-cart {
            width: 100%;
            padding: 0.75rem;
            background: var(--success-color);
            color: white;
            border: none;
            border-radius: var(--border-radius-md);
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            font-size: ${typography.fontSize.base};
        }
        
        .add-to-cart:hover {
            background: color-mix(in srgb, var(--success-color) 85%, black);
            transform: translateY(-1px);
        }
        
        /* Forms */
        .form-group {
            margin-bottom: 1.5rem;
        }
        
        .form-label {
            display: block;
            font-weight: 500;
            margin-bottom: 0.5rem;
            color: var(--text-color);
        }
        
        .form-input {
            width: 100%;
            padding: 0.75rem;
            border: 2px solid #e5e7eb;
            border-radius: var(--border-radius-md);
            font-size: ${typography.fontSize.base};
            transition: border-color 0.2s;
        }
        
        .form-input:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        .form-textarea {
            min-height: 120px;
            resize: vertical;
        }
        
        /* Newsletter */
        .newsletter-form {
            display: flex;
            gap: 1rem;
            max-width: 400px;
            margin: 0 auto;
        }
        
        .newsletter-input {
            flex: 1;
        }
        
        /* Social icons */
        .social-icons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            align-items: center;
        }
        
        .social-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            background: var(--primary-color);
            color: white;
            text-decoration: none;
            border-radius: 50%;
            transition: all 0.2s ease;
        }
        
        .social-icon:hover {
            background: var(--secondary-color);
            transform: translateY(-2px);
        }
        
        /* Responsive design */
        @media (max-width: 768px) {
            .section { padding: calc(var(--section-spacing) * 0.75) 0; }
            .nav-menu { display: none; }
            .newsletter-form { flex-direction: column; }
            
            h1 { font-size: ${typography.fontSize['2xl']}; }
            h2 { font-size: ${typography.fontSize.xl}; }
            
            .hero {
                min-height: 50vh;
                text-align: center;
            }
        }
        
        @media (min-width: 769px) and (max-width: 1024px) {
            .section { padding: calc(var(--section-spacing) * 0.85) 0; }
        }
        
        /* Animation utilities */
        .fade-in {
            animation: fadeIn 0.6s ease-out;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .slide-in-left {
            animation: slideInLeft 0.6s ease-out;
        }
        
        @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-30px); }
            to { opacity: 1; transform: translateX(0); }
        }
        
        .slide-in-right {
            animation: slideInRight 0.6s ease-out;
        }
        
        @keyframes slideInRight {
            from { opacity: 0; transform: translateX(30px); }
            to { opacity: 1; transform: translateX(0); }
        }
        
        /* Content blocks */
        .content-block {
            margin-bottom: 2rem;
        }
        
        .content-block:last-child {
            margin-bottom: 0;
        }
        
        /* Video responsive */
        .video-wrapper {
            position: relative;
            padding-bottom: 56.25%;
            height: 0;
            overflow: hidden;
        }
        
        .video-wrapper iframe,
        .video-wrapper video {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        
        /* Image gallery */
        .image-gallery {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
        }
        
        .gallery-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-radius: var(--border-radius-md);
            cursor: pointer;
            transition: transform 0.2s ease;
        }
        
        .gallery-image:hover {
            transform: scale(1.05);
        }
        
        /* Slideshow */
        .slideshow {
            position: relative;
            overflow: hidden;
            border-radius: var(--border-radius-lg);
        }
        
        .slide {
            display: none;
            position: relative;
        }
        
        .slide.active {
            display: block;
        }
        
        .slide img {
            width: 100%;
            height: 400px;
            object-fit: cover;
        }
        
        .slide-content {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(transparent, rgba(0,0,0,0.7));
            color: white;
            padding: 2rem;
        }
        
        /* Rating stars */
        .rating {
            display: flex;
            gap: 2px;
            color: #fbbf24;
        }
        
        /* Badges */
        .badge {
            display: inline-block;
            padding: 0.25rem 0.5rem;
            background: var(--accent-color);
            color: white;
            font-size: ${typography.fontSize.xs};
            font-weight: 600;
            border-radius: var(--border-radius-sm);
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        
        .badge.sale {
            background: var(--error-color);
        }
        
        .badge.new {
            background: var(--success-color);
        }
        
        /* Quantity selector */
        .quantity-selector {
            display: flex;
            align-items: center;
            border: 2px solid #e5e7eb;
            border-radius: var(--border-radius-md);
            overflow: hidden;
        }
        
        .quantity-btn {
            background: #f9fafb;
            border: none;
            padding: 0.5rem;
            cursor: pointer;
            transition: background 0.2s;
        }
        
        .quantity-btn:hover {
            background: #e5e7eb;
        }
        
        .quantity-input {
            border: none;
            text-align: center;
            width: 60px;
            padding: 0.5rem;
        }
        
        /* Variant picker */
        .variant-picker {
            margin-bottom: 1rem;
        }
        
        .variant-options {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
        }
        
        .variant-option {
            padding: 0.5rem 1rem;
            border: 2px solid #e5e7eb;
            border-radius: var(--border-radius-md);
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .variant-option:hover {
            border-color: var(--primary-color);
        }
        
        .variant-option.selected {
            border-color: var(--primary-color);
            background: var(--primary-color);
            color: white;
        }
        
        /* FAQ/Collapsible */
        .faq-item {
            border: 1px solid #e5e7eb;
            border-radius: var(--border-radius-md);
            margin-bottom: 1rem;
            overflow: hidden;
        }
        
        .faq-question {
            background: #f9fafb;
            padding: 1rem;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: 600;
        }
        
        .faq-answer {
            padding: 1rem;
            display: none;
        }
        
        .faq-item.open .faq-answer {
            display: block;
        }
        
        /* Testimonials */
        .testimonial {
            text-align: center;
            padding: 2rem;
        }
        
        .testimonial-content {
            font-style: italic;
            font-size: ${typography.fontSize.lg};
            margin-bottom: 1rem;
        }
        
        .testimonial-author {
            font-weight: 600;
            color: var(--primary-color);
        }
        
        /* Mobile hamburger menu */
        .mobile-menu-toggle {
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--text-color);
        }
        
        @media (max-width: 768px) {
            .mobile-menu-toggle {
                display: block;
            }
            
            .nav-menu {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                flex-direction: column;
                padding: 1rem;
                box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            }
            
            .nav-menu.open {
                display: flex;
            }
        }
    </style>
</head>
<body>
    ${sections.filter(s => s.visible).map(section => renderSection(section)).join('')}
    
    <script>
        // Enhanced interactivity
        document.addEventListener('click', function(e) {
            const element = e.target.closest('.editable-element');
            if (element) {
                e.preventDefault();
                e.stopPropagation();
                
                // Remove previous selections
                document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
                
                // Add selection to clicked element
                element.classList.add('selected');
                
                // Get all relevant data
                const elementData = {
                    type: 'elementSelected',
                    sectionId: element.dataset.sectionId,
                    elementType: element.dataset.element,
                    blockId: element.dataset.blockId,
                    productIndex: element.dataset.productIndex,
                    content: element.textContent || element.innerHTML,
                    tagName: element.tagName.toLowerCase(),
                    className: element.className,
                    attributes: Array.from(element.attributes).reduce((acc, attr) => {
                        acc[attr.name] = attr.value;
                        return acc;
                    }, {})
                };
                
                // Notify parent window
                window.parent.postMessage(elementData, '*');
            }
        });
        
        // Enhanced hover effects
        document.addEventListener('mouseover', function(e) {
            const element = e.target.closest('.editable-element');
            if (element && !element.classList.contains('selected')) {
                element.style.outline = '2px dashed var(--primary-color)';
                element.style.outlineOffset = '2px';
                element.style.background = 'rgba(59, 130, 246, 0.05)';
            }
        });
        
        document.addEventListener('mouseout', function(e) {
            const element = e.target.closest('.editable-element');
            if (element && !element.classList.contains('selected')) {
                element.style.outline = '';
                element.style.outlineOffset = '';
                element.style.background = '';
            }
        });
        
        // Mobile menu toggle
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('mobile-menu-toggle')) {
                const menu = document.querySelector('.nav-menu');
                menu.classList.toggle('open');
            }
        });
        
        // FAQ toggle
        document.addEventListener('click', function(e) {
            if (e.target.closest('.faq-question')) {
                const faqItem = e.target.closest('.faq-item');
                faqItem.classList.toggle('open');
            }
        });
        
        // Quantity selector
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('quantity-btn')) {
                const input = e.target.parentElement.querySelector('.quantity-input');
                const increment = e.target.textContent === '+';
                let value = parseInt(input.value) || 1;
                
                if (increment) {
                    value++;
                } else if (value > 1) {
                    value--;
                }
                
                input.value = value;
            }
        });
        
        // Variant picker
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('variant-option')) {
                const options = e.target.parentElement.querySelectorAll('.variant-option');
                options.forEach(opt => opt.classList.remove('selected'));
                e.target.classList.add('selected');
            }
        });
        
        // Add to cart animations
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('add-to-cart')) {
                e.target.textContent = 'Added!';
                e.target.style.background = 'var(--success-color)';
                setTimeout(() => {
                    e.target.textContent = 'Add to Cart';
                    e.target.style.background = '';
                }, 2000);
            }
        });
        
        // Slideshow functionality
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');
        
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            if (slides[index]) {
                slides[index].classList.add('active');
            }
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        
        if (slides.length > 0) {
            showSlide(0);
            setInterval(nextSlide, 5000); // Auto-advance every 5 seconds
        }
        
        // Lazy loading for images
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
        
        // Smooth scrolling for anchor links
        document.addEventListener('click', function(e) {
            if (e.target.matches('a[href^="#"]')) {
                e.preventDefault();
                const target = document.querySelector(e.target.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
        
        // Form validation
        document.addEventListener('submit', function(e) {
            const form = e.target;
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = 'var(--error-color)';
                    isValid = false;
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    </script>
</body>
</html>`;
  };

  const renderSection = (section: Section) => {
    const { content, type, blocks } = section;
    
    switch (type) {
      case 'announcement-bar':
        return `
          <section class="section announcement-bar editable-element" data-section-id="${section.id}">
              <div class="edit-overlay">Announcement Bar</div>
              <div class="container">
                  <p class="editable-element" data-element="text" data-section-id="${section.id}">
                      ${content.text || 'Free shipping on orders over $50! 🚚'}
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
                          <li><a href="#" class="nav-link">Collections</a></li>
                          <li><a href="#" class="nav-link">About</a></li>
                          <li><a href="#" class="nav-link">Contact</a></li>
                          ${content.showSearch ? '<li><a href="#" class="nav-link">🔍</a></li>' : ''}
                          ${content.showCart ? '<li><a href="#" class="nav-link">🛒</a></li>' : ''}
                      </ul>
                      <button class="mobile-menu-toggle">☰</button>
                  </nav>
              </div>
          </header>`;
          
      case 'hero':
        return `
          <section class="section hero editable-element fade-in" data-section-id="${section.id}" 
                   style="background: ${content.backgroundColor || 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)'}; 
                          ${content.backgroundImage ? `background-image: url(${content.backgroundImage}); background-size: cover; background-position: center;` : ''}">
              <div class="edit-overlay">Hero Section</div>
              <div class="container">
                  <div class="content-block">
                      <h1 class="editable-element slide-in-left" data-element="headline" data-section-id="${section.id}" 
                          style="margin-bottom: 1rem;">
                          ${content.headline || `Welcome to ${websiteData.businessName}`}
                      </h1>
                      <p class="editable-element slide-in-right" data-element="subheadline" data-section-id="${section.id}" 
                         style="font-size: 1.25rem; margin-bottom: 2rem; opacity: 0.9;">
                          ${content.subheadline || 'Discover amazing products and exceptional service'}
                      </p>
                      <div class="slide-in-left" style="animation-delay: 0.3s;">
                          <a href="${content.ctaLink || '#'}" class="btn editable-element" data-element="cta" data-section-id="${section.id}">
                              ${content.ctaText || 'Shop Now'}
                          </a>
                          ${content.secondaryCta ? `
                              <a href="${content.secondaryCtaLink || '#'}" class="btn secondary editable-element" 
                                 data-element="secondary-cta" data-section-id="${section.id}" style="margin-left: 1rem;">
                                  ${content.secondaryCta}
                              </a>
                          ` : ''}
                      </div>
                  </div>
              </div>
          </section>`;
          
      case 'featured-collection':
        return `
          <section class="section featured-collection editable-element" data-section-id="${section.id}">
              <div class="edit-overlay">Featured Collection</div>
              <div class="container">
                  <h2 class="editable-element" data-element="title" data-section-id="${section.id}" 
                      style="text-align: center; margin-bottom: 3rem; font-size: 2.5rem;">
                      ${content.title || 'Featured Products'}
                  </h2>
                  <div class="grid grid-cols-${content.columns || 3}">
                      ${websiteData.products?.slice(0, content.productsCount || 6).map((product: any, index: number) => `
                          <div class="card product-card editable-element fade-in" 
                               data-element="product" data-section-id="${section.id}" data-product-index="${index}">
                              ${product.badge ? `<div class="badge ${product.badge.type}">${product.badge.text}</div>` : ''}
                              <img src="${product.imageUrl || '/placeholder.svg'}" alt="${product.name}" class="product-image">
                              <h3 class="product-title editable-element" data-element="product-name" data-section-id="${section.id}" data-product-index="${index}">
                                  ${product.name}
                              </h3>
                              ${product.vendor ? `
                                  <p class="product-vendor editable-element" data-element="product-vendor" data-section-id="${section.id}" data-product-index="${index}">
                                      by ${product.vendor}
                                  </p>
                              ` : ''}
                              <p class="product-description editable-element" data-element="product-description" data-section-id="${section.id}" data-product-index="${index}">
                                  ${product.description || ''}
                              </p>
                              ${product.rating ? `
                                  <div class="rating">
                                      ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
                                      <span>(${product.reviews || 0})</span>
                                  </div>
                              ` : ''}
                              ${content.showPrices !== false ? `
                                  <div class="product-price editable-element" data-element="product-price" data-section-id="${section.id}" data-product-index="${index}">
                                      $${product.price || '0.00'}
                                      ${product.comparePrice ? `<span class="product-price-compare">$${product.comparePrice}</span>` : ''}
                                  </div>
                              ` : ''}
                              ${product.variants && product.variants.length > 0 ? `
                                  <div class="variant-picker">
                                      <div class="variant-options">
                                          ${product.variants.map((variant: any) => `
                                              <div class="variant-option" data-variant="${variant.id}">
                                                  ${variant.name}
                                              </div>
                                          `).join('')}
                                      </div>
                                  </div>
                              ` : ''}
                              ${content.showAddToCart !== false ? `
                                  <div style="display: flex; gap: 1rem; align-items: center;">
                                      <div class="quantity-selector">
                                          <button class="quantity-btn">-</button>
                                          <input type="number" value="1" min="1" class="quantity-input">
                                          <button class="quantity-btn">+</button>
                                      </div>
                                      <button class="add-to-cart editable-element" data-element="add-to-cart" 
                                              data-section-id="${section.id}" data-product-index="${index}">
                                          Add to Cart
                                      </button>
                                  </div>
                              ` : ''}
                              ${content.showWishlist ? `
                                  <button class="btn secondary" style="margin-top: 0.5rem;">
                                      ♡ Add to Wishlist
                                  </button>
                              ` : ''}
                          </div>
                      `).join('') || '<p>No products available</p>'}
                  </div>
                  ${content.showViewAll ? `
                      <div style="text-align: center; margin-top: 2rem;">
                          <a href="/collections/all" class="btn">View All Products</a>
                      </div>
                  ` : ''}
              </div>
          </section>`;
          
      case 'rich-text':
        return `
          <section class="section rich-text editable-element" data-section-id="${section.id}">
              <div class="edit-overlay">Rich Text</div>
              <div class="container">
                  <div class="content-block editable-element" data-element="content" data-section-id="${section.id}">
                      ${content.content || `
                          <h2>About Our Company</h2>
                          <p>We are dedicated to providing exceptional products and services to our customers. Our commitment to quality and customer satisfaction has made us a trusted name in the industry.</p>
                          <h3>Why Choose Us?</h3>
                          <ul>
                              <li>Premium quality products</li>
                              <li>Exceptional customer service</li>
                              <li>Fast and reliable shipping</li>
                              <li>100% satisfaction guarantee</li>
                          </ul>
                      `}
                  </div>
              </div>
          </section>`;
          
      case 'image-with-text':
        return `
          <section class="section image-with-text editable-element" data-section-id="${section.id}">
              <div class="edit-overlay">Image with Text</div>
              <div class="container">
                  <div class="grid grid-cols-2" style="align-items: center; gap: 3rem;">
                      <div class="${content.imagePosition === 'right' ? 'order-2' : ''}">
                          <img src="${content.image || '/placeholder.svg'}" alt="${content.imageAlt || 'Image'}" 
                               class="editable-element" data-element="image" data-section-id="${section.id}"
                               style="width: 100%; border-radius: var(--border-radius-lg);">
                      </div>
                      <div class="${content.imagePosition === 'right' ? 'order-1' : ''}">
                          <h2 class="editable-element" data-element="heading" data-section-id="${section.id}"
                              style="margin-bottom: 1rem;">
                              ${content.heading || 'Our Story'}
                          </h2>
                          <p class="editable-element" data-element="text" data-section-id="${section.id}"
                             style="margin-bottom: 2rem; font-size: 1.125rem; line-height: 1.7;">
                              ${content.text || 'Learn about our journey, values, and commitment to excellence.'}
                          </p>
                          <a href="${content.buttonLink || '#'}" class="btn editable-element" 
                             data-element="button" data-section-id="${section.id}">
                              ${content.buttonText || 'Learn More'}
                          </a>
                      </div>
                  </div>
              </div>
          </section>`;
          
      case 'newsletter':
        return `
          <section class="section newsletter editable-element" data-section-id="${section.id}" 
                   style="background: #f9fafb; text-align: center;">
              <div class="edit-overlay">Newsletter</div>
              <div class="container">
                  <h2 class="editable-element" data-element="title" data-section-id="${section.id}"
                      style="margin-bottom: 1rem;">
                      ${content.title || 'Stay Updated'}
                  </h2>
                  <p class="editable-element" data-element="description" data-section-id="${section.id}"
                     style="margin-bottom: 2rem; font-size: 1.125rem;">
                      ${content.description || 'Subscribe to our newsletter for the latest updates and exclusive offers.'}
                  </p>
                  <form class="newsletter-form">
                      <input type="email" placeholder="Enter your email" class="form-input newsletter-input" required>
                      <button type="submit" class="btn">Subscribe</button>
                  </form>
                  ${content.showPrivacyNote ? `
                      <p style="margin-top: 1rem; font-size: 0.875rem; color: #6b7280;">
                          We respect your privacy. Unsubscribe at any time.
                      </p>
                  ` : ''}
              </div>
          </section>`;
          
      case 'contact-form':
        return `
          <section class="section contact-form editable-element" data-section-id="${section.id}">
              <div class="edit-overlay">Contact Form</div>
              <div class="container">
                  <h2 class="editable-element" data-element="title" data-section-id="${section.id}"
                      style="text-align: center; margin-bottom: 3rem;">
                      ${content.title || 'Get In Touch'}
                  </h2>
                  <div class="grid grid-cols-2" style="gap: 3rem;">
                      ${content.showForm !== false ? `
                          <div class="card">
                              <form>
                                  <div class="form-group">
                                      <label class="form-label">Name *</label>
                                      <input type="text" class="form-input" required>
                                  </div>
                                  <div class="form-group">
                                      <label class="form-label">Email *</label>
                                      <input type="email" class="form-input" required>
                                  </div>
                                  <div class="form-group">
                                      <label class="form-label">Phone</label>
                                      <input type="tel" class="form-input">
                                  </div>
                                  <div class="form-group">
                                      <label class="form-label">Subject</label>
                                      <input type="text" class="form-input">
                                  </div>
                                  <div class="form-group">
                                      <label class="form-label">Message *</label>
                                      <textarea rows="5" class="form-input form-textarea" required></textarea>
                                  </div>
                                  <button type="submit" class="btn" style="width: 100%;">Send Message</button>
                              </form>
                          </div>
                      ` : ''}
                      ${content.showContactInfo !== false ? `
                          <div class="card">
                              <h3 style="margin-bottom: 2rem;">Contact Information</h3>
                              <div class="content-block">
                                  ${websiteData.contactInfo?.email ? `
                                      <div style="display: flex; align-items: center; margin-bottom: 1rem;">
                                          <span style="margin-right: 1rem;">📧</span>
                                          <div>
                                              <strong>Email</strong><br>
                                              <a href="mailto:${websiteData.contactInfo.email}">${websiteData.contactInfo.email}</a>
                                          </div>
                                      </div>
                                  ` : ''}
                                  ${websiteData.contactInfo?.phone ? `
                                      <div style="display: flex; align-items: center; margin-bottom: 1rem;">
                                          <span style="margin-right: 1rem;">📞</span>
                                          <div>
                                              <strong>Phone</strong><br>
                                              <a href="tel:${websiteData.contactInfo.phone}">${websiteData.contactInfo.phone}</a>
                                          </div>
                                      </div>
                                  ` : ''}
                                  ${websiteData.contactInfo?.address ? `
                                      <div style="display: flex; align-items: center; margin-bottom: 1rem;">
                                          <span style="margin-right: 1rem;">📍</span>
                                          <div>
                                              <strong>Address</strong><br>
                                              ${websiteData.contactInfo.address}
                                          </div>
                                      </div>
                                  ` : ''}
                                  ${content.showSocialLinks ? `
                                      <div style="margin-top: 2rem;">
                                          <strong>Follow Us</strong>
                                          <div class="social-icons" style="margin-top: 1rem;">
                                              <a href="#" class="social-icon">f</a>
                                              <a href="#" class="social-icon">t</a>
                                              <a href="#" class="social-icon">i</a>
                                              <a href="#" class="social-icon">in</a>
                                          </div>
                                      </div>
                                  ` : ''}
                              </div>
                          </div>
                      ` : ''}
                  </div>
              </div>
          </section>`;
          
      case 'footer':
        return `
          <footer class="section footer editable-element" data-section-id="${section.id}">
              <div class="edit-overlay">Footer</div>
              <div class="container">
                  <div class="grid grid-cols-4" style="gap: 2rem; margin-bottom: 2rem;">
                      <div>
                          <h3 class="editable-element" data-element="business-name" data-section-id="${section.id}"
                              style="margin-bottom: 1rem;">
                              ${websiteData.businessName}
                          </h3>
                          <p class="editable-element" data-element="description" data-section-id="${section.id}"
                             style="opacity: 0.8; line-height: 1.6;">
                              ${content.description || 'Your trusted partner for quality products and exceptional service.'}
                          </p>
                          ${content.showSocialLinks !== false ? `
                              <div class="social-icons" style="margin-top: 1.5rem; justify-content: flex-start;">
                                  <a href="#" class="social-icon">f</a>
                                  <a href="#" class="social-icon">t</a>
                                  <a href="#" class="social-icon">i</a>
                                  <a href="#" class="social-icon">in</a>
                              </div>
                          ` : ''}
                      </div>
                      <div>
                          <h4 style="margin-bottom: 1rem;">Quick Links</h4>
                          <ul style="list-style: none; line-height: 2;">
                              <li><a href="#" style="color: rgba(255,255,255,0.8); text-decoration: none;">Home</a></li>
                              <li><a href="#" style="color: rgba(255,255,255,0.8); text-decoration: none;">Products</a></li>
                              <li><a href="#" style="color: rgba(255,255,255,0.8); text-decoration: none;">Collections</a></li>
                              <li><a href="#" style="color: rgba(255,255,255,0.8); text-decoration: none;">About</a></li>
                              <li><a href="#" style="color: rgba(255,255,255,0.8); text-decoration: none;">Contact</a></li>
                          </ul>
                      </div>
                      <div>
                          <h4 style="margin-bottom: 1rem;">Customer Care</h4>
                          <ul style="list-style: none; line-height: 2;">
                              <li><a href="#" style="color: rgba(255,255,255,0.8); text-decoration: none;">Shipping Info</a></li>
                              <li><a href="#" style="color: rgba(255,255,255,0.8); text-decoration: none;">Returns</a></li>
                              <li><a href="#" style="color: rgba(255,255,255,0.8); text-decoration: none;">Size Guide</a></li>
                              <li><a href="#" style="color: rgba(255,255,255,0.8); text-decoration: none;">FAQ</a></li>
                              <li><a href="#" style="color: rgba(255,255,255,0.8); text-decoration: none;">Support</a></li>
                          </ul>
                      </div>
                      <div>
                          <h4 style="margin-bottom: 1rem;">Contact</h4>
                          <div style="line-height: 2; color: rgba(255,255,255,0.8);">
                              ${websiteData.contactInfo?.email ? `<p>📧 ${websiteData.contactInfo.email}</p>` : ''}
                              ${websiteData.contactInfo?.phone ? `<p>📞 ${websiteData.contactInfo.phone}</p>` : ''}
                              ${websiteData.contactInfo?.address ? `<p>📍 ${websiteData.contactInfo.address}</p>` : ''}
                          </div>
                          ${content.showNewsletter !== false ? `
                              <div style="margin-top: 1.5rem;">
                                  <h5 style="margin-bottom: 0.5rem;">Newsletter</h5>
                                  <div style="display: flex; gap: 0.5rem;">
                                      <input type="email" placeholder="Your email" 
                                             style="flex: 1; padding: 0.5rem; border: none; border-radius: 4px;">
                                      <button class="btn" style="padding: 0.5rem 1rem;">Subscribe</button>
                                  </div>
                              </div>
                          ` : ''}
                      </div>
                  </div>
                  <div style="text-align: center; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.1);">
                      <p style="opacity: 0.6;">
                          &copy; ${new Date().getFullYear()} ${websiteData.businessName}. All rights reserved. | 
                          <a href="#" style="color: rgba(255,255,255,0.8);">Privacy Policy</a> | 
                          <a href="#" style="color: rgba(255,255,255,0.8);">Terms of Service</a>
                      </p>
                  </div>
              </div>
          </footer>`;
          
      default:
        return `
          <section class="section editable-element" data-section-id="${section.id}">
              <div class="edit-overlay">${section.type}</div>
              <div class="container">
                  <h2 class="editable-element" data-element="title" data-section-id="${section.id}"
                      style="text-align: center; margin-bottom: 2rem;">
                      ${content.title || 'Section Title'}
                  </h2>
                  <div class="content-block editable-element" data-element="content" data-section-id="${section.id}">
                      ${content.content || 'Section content goes here'}
                  </div>
                  ${blocks && blocks.length > 0 ? `
                      <div class="content-blocks">
                          ${blocks.map(block => renderBlock(block, section.id)).join('')}
                      </div>
                  ` : ''}
              </div>
          </section>`;
    }
  };

  const renderBlock = (block: Block, sectionId: string) => {
    const { content, type } = block;
    
    switch (type) {
      case 'heading':
        return `
          <${content.level || 'h2'} class="content-block editable-element" 
                                      data-element="heading" data-section-id="${sectionId}" data-block-id="${block.id}">
              ${content.text || 'Heading Text'}
          </${content.level || 'h2'}>`;
          
      case 'text':
        return `
          <p class="content-block editable-element" 
             data-element="text" data-section-id="${sectionId}" data-block-id="${block.id}">
              ${content.text || 'Your text content here...'}
          </p>`;
          
      case 'button':
        return `
          <a href="${content.link || '#'}" 
             class="btn content-block editable-element" 
             data-element="button" data-section-id="${sectionId}" data-block-id="${block.id}">
              ${content.text || 'Click Here'}
          </a>`;
          
      case 'image':
        return `
          <div class="content-block">
              <img src="${content.src || '/placeholder.svg'}" 
                   alt="${content.alt || 'Image'}" 
                   class="editable-element"
                   data-element="image" data-section-id="${sectionId}" data-block-id="${block.id}"
                   style="width: 100%; border-radius: var(--border-radius-md);">
              ${content.caption ? `
                  <p class="editable-element" 
                     data-element="caption" data-section-id="${sectionId}" data-block-id="${block.id}"
                     style="text-align: center; margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280;">
                      ${content.caption}
                  </p>
              ` : ''}
          </div>`;
          
      default:
        return `
          <div class="content-block editable-element" 
               data-element="block" data-section-id="${sectionId}" data-block-id="${block.id}">
              ${content.text || `${type} block content`}
          </div>`;
    }
  };

  // Handle messages from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'elementSelected') {
        setSelectedElement(event.data.sectionId + '_' + event.data.elementType);
        setEditingContent({
          sectionId: event.data.sectionId,
          elementType: event.data.elementType,
          blockId: event.data.blockId,
          content: event.data.content,
          attributes: event.data.attributes
        });
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
            <div className="grid grid-cols-1 gap-2">
              {Object.entries(sectionTypes)
                .filter(([_, type]) => type.category === category)
                .map(([key, type]) => (
                  <Button
                    key={key}
                    variant="outline"
                    size="sm"
                    onClick={() => onAddSection(key as SectionType)}
                    className="h-auto p-3 text-left justify-start"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center">
                        <span className="text-xs">📄</span>
                      </div>
                      <span className="text-sm">{type.name}</span>
                    </div>
                  </Button>
                ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderBlockPicker = (sectionId: string) => {
    const categories = [...new Set(Object.values(blockTypes).map(type => type.category))];
    
    return (
      <div className="space-y-4">
        <h4 className="font-medium">Add Block</h4>
        {categories.map(category => (
          <div key={category} className="space-y-2">
            <h5 className="text-sm font-medium text-muted-foreground">{category}</h5>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(blockTypes)
                .filter(([_, type]) => type.category === category)
                .map(([key, type]) => (
                  <Button
                    key={key}
                    variant="outline"
                    size="sm"
                    onClick={() => onAddBlock(sectionId, key as BlockType)}
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

  const renderContentEditor = () => {
    if (!editingContent.sectionId) return null;

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Edit Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="element-content">Content</Label>
            <Textarea
              id="element-content"
              value={editingContent.content || ''}
              onChange={(e) => setEditingContent({...editingContent, content: e.target.value})}
              placeholder="Enter content..."
              rows={4}
            />
          </div>
          <div className="flex space-x-2">
            <Button 
              size="sm"
              onClick={() => {
                if (editingContent.blockId) {
                  onUpdateBlock(editingContent.sectionId, editingContent.blockId, {
                    text: editingContent.content
                  });
                } else {
                  onUpdateSection(editingContent.sectionId, {
                    [editingContent.elementType]: editingContent.content
                  });
                }
              }}
            >
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => setEditingContent({})}
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderThemeEditor = () => (
    <div className="space-y-4">
      <h4 className="font-medium">Theme Settings</h4>
      
      {/* Color Settings */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Colors</Label>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(theme.colors).map(([key, value]) => (
            <div key={key} className="space-y-1">
              <Label className="text-xs capitalize">{key.replace(/([A-Z])/g, ' $1')}</Label>
              <div className="flex items-center space-x-2">
                <Input
                  type="color"
                  value={value}
                  onChange={(e) => onUpdateTheme({
                    colors: { ...theme.colors, [key]: e.target.value }
                  })}
                  className="w-8 h-8 p-0 border-0"
                />
                <Input
                  value={value}
                  onChange={(e) => onUpdateTheme({
                    colors: { ...theme.colors, [key]: e.target.value }
                  })}
                  className="text-xs"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography Settings */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Typography</Label>
        <div className="space-y-2">
          <div>
            <Label className="text-xs">Heading Font</Label>
            <Select 
              value={theme.typography.headingFont} 
              onValueChange={(value) => onUpdateTheme({
                typography: { ...theme.typography, headingFont: value }
              })}
            >
              <SelectTrigger className="text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Inter">Inter</SelectItem>
                <SelectItem value="Roboto">Roboto</SelectItem>
                <SelectItem value="Playfair Display">Playfair Display</SelectItem>
                <SelectItem value="Montserrat">Montserrat</SelectItem>
                <SelectItem value="Open Sans">Open Sans</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs">Body Font</Label>
            <Select 
              value={theme.typography.bodyFont} 
              onValueChange={(value) => onUpdateTheme({
                typography: { ...theme.typography, bodyFont: value }
              })}
            >
              <SelectTrigger className="text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Inter">Inter</SelectItem>
                <SelectItem value="Roboto">Roboto</SelectItem>
                <SelectItem value="Open Sans">Open Sans</SelectItem>
                <SelectItem value="Lato">Lato</SelectItem>
                <SelectItem value="Source Sans Pro">Source Sans Pro</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Layout Settings */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Layout</Label>
        <div className="space-y-2">
          <div>
            <Label className="text-xs">Container Width</Label>
            <Slider
              value={[parseInt(theme.layout.containerWidth.replace('px', ''))]}
              onValueChange={([value]) => onUpdateTheme({
                layout: { ...theme.layout, containerWidth: `${value}px` }
              })}
              min={1000}
              max={1400}
              step={50}
              className="w-full"
            />
            <div className="text-xs text-muted-foreground mt-1">
              {theme.layout.containerWidth}
            </div>
          </div>
          <div>
            <Label className="text-xs">Section Spacing</Label>
            <Slider
              value={[theme.layout.sectionSpacing]}
              onValueChange={([value]) => onUpdateTheme({
                layout: { ...theme.layout, sectionSpacing: value }
              })}
              min={2}
              max={8}
              step={0.5}
              className="w-full"
            />
            <div className="text-xs text-muted-foreground mt-1">
              {theme.layout.sectionSpacing}rem
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full flex">
      {/* Live Preview */}
      <div className="flex-1 bg-gray-100 p-4">
        <div className="bg-white rounded-lg shadow-lg h-full overflow-hidden">
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h3 className="font-semibold">Live Preview</h3>
              <Badge variant="secondary">Click to Edit</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant={previewMode === 'desktop' ? 'default' : 'outline'}
                onClick={() => setPreviewMode('desktop')}
              >
                <Monitor className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant={previewMode === 'tablet' ? 'default' : 'outline'}
                onClick={() => setPreviewMode('tablet')}
              >
                <Tablet className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant={previewMode === 'mobile' ? 'default' : 'outline'}
                onClick={() => setPreviewMode('mobile')}
              >
                <Smartphone className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant={editMode ? 'default' : 'outline'}
                onClick={() => setEditMode(!editMode)}
              >
                <Edit3 className="h-4 w-4 mr-1" />
                Edit
              </Button>
            </div>
          </div>
          <div className="h-full overflow-auto">
            <div 
              className={`transition-all duration-300 ${
                previewMode === 'mobile' ? 'max-w-sm mx-auto' : 
                previewMode === 'tablet' ? 'max-w-3xl mx-auto' : 'w-full'
              }`}
            >
              <iframe
                ref={previewRef}
                srcDoc={generateComprehensiveHTML()}
                className="w-full h-full border-0"
                title="Live Preview"
                style={{ minHeight: '800px' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Edit Panel */}
      {editMode && (
        <div className="w-80 bg-white border-l overflow-auto">
          <Tabs value={activePanel} onValueChange={(value) => setActivePanel(value as any)} className="h-full">
            <TabsList className="grid w-full grid-cols-4 p-1 m-4">
              <TabsTrigger value="sections" className="text-xs">Sections</TabsTrigger>
              <TabsTrigger value="content" className="text-xs">Content</TabsTrigger>
              <TabsTrigger value="design" className="text-xs">Design</TabsTrigger>
              <TabsTrigger value="seo" className="text-xs">SEO</TabsTrigger>
            </TabsList>

            <div className="p-4 space-y-6">
              <TabsContent value="sections" className="space-y-4 mt-0">
                {renderSectionPicker()}
                
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Current Sections</h4>
                  <div className="space-y-2">
                    {sections.map((section, index) => (
                      <div key={section.id} className="border rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium capitalize">
                            {sectionTypes[section.type as keyof typeof sectionTypes]?.name || section.type}
                          </span>
                          <div className="flex items-center space-x-1">
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-6 w-6 p-0"
                              onClick={() => onReorderSections(index, Math.max(0, index - 1))}
                            >
                              <ArrowUp className="h-3 w-3" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-6 w-6 p-0"
                              onClick={() => onReorderSections(index, Math.min(sections.length - 1, index + 1))}
                            >
                              <ArrowDown className="h-3 w-3" />
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
                        
                        {/* Block Management */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">Blocks ({section.blocks?.length || 0})</span>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-6 text-xs px-2"
                              onClick={() => setSelectedElement(section.id)}
                            >
                              <Plus className="h-3 w-3 mr-1" />
                              Add Block
                            </Button>
                          </div>
                          
                          {selectedElement === section.id && (
                            <div className="mt-2 p-2 bg-gray-50 rounded">
                              {renderBlockPicker(section.id)}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="content" className="space-y-4 mt-0">
                {renderContentEditor()}
                
                {/* Quick content tools */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Quick Tools</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button size="sm" variant="outline" className="w-full justify-start">
                      <Type className="h-4 w-4 mr-2" />
                      Text Editor
                    </Button>
                    <Button size="sm" variant="outline" className="w-full justify-start">
                      <Image className="h-4 w-4 mr-2" />
                      Image Library
                    </Button>
                    <Button size="sm" variant="outline" className="w-full justify-start">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Product Picker
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="design" className="space-y-4 mt-0">
                {renderThemeEditor()}
              </TabsContent>

              <TabsContent value="seo" className="space-y-4 mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">SEO Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="page-title">Page Title</Label>
                      <Input
                        id="page-title"
                        placeholder="Enter page title..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="meta-description">Meta Description</Label>
                      <Textarea
                        id="meta-description"
                        placeholder="Enter meta description..."
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="keywords">Keywords</Label>
                      <Input
                        id="keywords"
                        placeholder="keyword1, keyword2, keyword3"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default ComprehensiveLiveEditor;
