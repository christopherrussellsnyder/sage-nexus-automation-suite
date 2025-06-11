import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Download, Palette, Layout, Smartphone, Zap, ExternalLink, Code, FileText, ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Template {
  id: string;
  name: string;
  category: string;
  industry: string;
  features: string[];
  preview: string;
  image: string;
  isPopular?: boolean;
  isMobileOptimized: boolean;
  hasEcommerce: boolean;
  pages: string[];
  demoUrl: string;
  downloadUrl: string;
  htmlContent: string;
  cssContent: string;
  jsContent: string;
}

interface WebsiteData {
  businessName: string;
  businessDescription: string;
  industry: string;
  targetAudience: string;
  colorScheme: string;
  businessGoals: string;
  existingWebsite: string;
}

interface WebsiteTemplatesProps {
  templates: Template[];
  onSelectTemplate: (template: Template) => void;
  onPreviewTemplate: (template: Template) => void;
  websiteData?: WebsiteData;
  isGenerated?: boolean;
}

const WebsiteTemplates = ({ templates, onSelectTemplate, onPreviewTemplate, websiteData, isGenerated = false }: WebsiteTemplatesProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [generatedTemplates, setGeneratedTemplates] = useState<Template[]>([]);

  useEffect(() => {
    if (websiteData && isGenerated) {
      generatePersonalizedTemplates(websiteData);
    }
  }, [websiteData, isGenerated]);

  const generatePersonalizedTemplates = (data: WebsiteData) => {
    const isEcommerce = data.industry.toLowerCase().includes('e-commerce') || 
                       data.industry.toLowerCase().includes('fashion') ||
                       data.industry.toLowerCase().includes('retail') ||
                       data.businessGoals.toLowerCase().includes('sales');

    const isService = data.industry.toLowerCase().includes('professional') ||
                     data.industry.toLowerCase().includes('consulting') ||
                     data.industry.toLowerCase().includes('agency') ||
                     data.industry.toLowerCase().includes('service');

    const isTech = data.industry.toLowerCase().includes('tech') ||
                  data.industry.toLowerCase().includes('software') ||
                  data.industry.toLowerCase().includes('saas') ||
                  data.industry.toLowerCase().includes('startup');

    const templates: Template[] = [];

    // Generate 5 personalized templates based on business type
    if (isEcommerce) {
      templates.push(
        generateEcommerceTemplate(data, 1, 'Modern Storefront'),
        generateEcommerceTemplate(data, 2, 'Premium Marketplace'),
        generateEcommerceTemplate(data, 3, 'Minimalist Shop'),
        generateEcommerceTemplate(data, 4, 'Brand Showcase'),
        generateEcommerceTemplate(data, 5, 'Mobile-First Store')
      );
    } else if (isService) {
      templates.push(
        generateServiceTemplate(data, 1, 'Professional Hub'),
        generateServiceTemplate(data, 2, 'Corporate Elite'),
        generateServiceTemplate(data, 3, 'Modern Agency'),
        generateServiceTemplate(data, 4, 'Trust Builder'),
        generateServiceTemplate(data, 5, 'Results Focused')
      );
    } else if (isTech) {
      templates.push(
        generateTechTemplate(data, 1, 'Startup Landing'),
        generateTechTemplate(data, 2, 'SaaS Platform'),
        generateTechTemplate(data, 3, 'Tech Innovation'),
        generateTechTemplate(data, 4, 'Product Showcase'),
        generateTechTemplate(data, 5, 'Developer Focused')
      );
    } else {
      // General business templates
      templates.push(
        generateGeneralTemplate(data, 1, 'Business Professional'),
        generateGeneralTemplate(data, 2, 'Modern Corporate'),
        generateGeneralTemplate(data, 3, 'Industry Leader'),
        generateGeneralTemplate(data, 4, 'Customer Focused'),
        generateGeneralTemplate(data, 5, 'Growth Oriented')
      );
    }

    setGeneratedTemplates(templates);
  };

  const generateEcommerceTemplate = (data: WebsiteData, id: number, variant: string): Template => {
    const colorScheme = getColorScheme(data.colorScheme);
    
    return {
      id: `ecom-${id}`,
      name: `${data.businessName} - ${variant}`,
      category: 'E-commerce',
      industry: data.industry,
      features: [
        'Product Catalog',
        'Shopping Cart & Checkout',
        'Payment Integration',
        'Customer Reviews',
        'Inventory Management',
        'Order Tracking',
        'Wishlist & Favorites',
        'Search & Filters',
        'Mobile Responsive',
        'SEO Optimized'
      ],
      preview: `${variant} design optimized for ${data.targetAudience} with focus on ${data.businessGoals.toLowerCase()}`,
      image: '/placeholder.svg',
      isPopular: id === 1,
      isMobileOptimized: true,
      hasEcommerce: true,
      pages: [
        'Home',
        'Products',
        'Product Details',
        'Shopping Cart',
        'Checkout',
        'Account Dashboard',
        'Order History',
        'About Us',
        'Contact',
        'FAQ',
        'Shipping & Returns',
        'Privacy Policy'
      ],
      demoUrl: `https://${data.businessName.toLowerCase().replace(/\s+/g, '-')}-${variant.toLowerCase().replace(/\s+/g, '-')}.demo.com`,
      downloadUrl: '#download',
      htmlContent: generateProfessionalEcommerceHTML(data, variant, colorScheme, id),
      cssContent: generateProfessionalEcommerceCSS(data, variant, colorScheme, id),
      jsContent: generateProfessionalEcommerceJS(data, variant)
    };
  };

  const generateServiceTemplate = (data: WebsiteData, id: number, variant: string): Template => {
    const colorScheme = getColorScheme(data.colorScheme);
    
    return {
      id: `service-${id}`,
      name: `${data.businessName} - ${variant}`,
      category: 'Professional Services',
      industry: data.industry,
      features: [
        'Service Showcase',
        'Contact Forms',
        'Appointment Booking',
        'Team Profiles',
        'Client Testimonials',
        'Case Studies',
        'Blog/Resources',
        'Portfolio Gallery',
        'Lead Generation',
        'Analytics Integration'
      ],
      preview: `${variant} design for ${data.targetAudience} focusing on ${data.businessGoals.toLowerCase()}`,
      image: '/placeholder.svg',
      isPopular: id === 1,
      isMobileOptimized: true,
      hasEcommerce: false,
      pages: [
        'Home',
        'Services',
        'About',
        'Team',
        'Portfolio',
        'Case Studies',
        'Testimonials',
        'Blog',
        'Contact',
        'Book Consultation',
        'Resources',
        'Privacy Policy'
      ],
      demoUrl: `https://${data.businessName.toLowerCase().replace(/\s+/g, '-')}-${variant.toLowerCase().replace(/\s+/g, '-')}.demo.com`,
      downloadUrl: '#download',
      htmlContent: generateProfessionalServiceHTML(data, variant, colorScheme, id),
      cssContent: generateProfessionalServiceCSS(data, variant, colorScheme, id),
      jsContent: generateProfessionalServiceJS(data, variant)
    };
  };

  const generateTechTemplate = (data: WebsiteData, id: number, variant: string): Template => {
    const colorScheme = getColorScheme(data.colorScheme);
    
    return {
      id: `tech-${id}`,
      name: `${data.businessName} - ${variant}`,
      category: 'Technology',
      industry: data.industry,
      features: [
        'Hero Landing Section',
        'Feature Highlights',
        'Pricing Tables',
        'Demo/Trial Signup',
        'API Documentation',
        'Integration Showcase',
        'Customer Stories',
        'Developer Resources',
        'Support Center',
        'Analytics Dashboard'
      ],
      preview: `${variant} design for ${data.targetAudience} with focus on ${data.businessGoals.toLowerCase()}`,
      image: '/placeholder.svg',
      isPopular: id === 1,
      isMobileOptimized: true,
      hasEcommerce: false,
      pages: [
        'Home',
        'Features',
        'Pricing',
        'Demo',
        'Documentation',
        'API Reference',
        'Integrations',
        'Case Studies',
        'Blog',
        'Support',
        'About',
        'Contact'
      ],
      demoUrl: `https://${data.businessName.toLowerCase().replace(/\s+/g, '-')}-${variant.toLowerCase().replace(/\s+/g, '-')}.demo.com`,
      downloadUrl: '#download',
      htmlContent: generateProfessionalTechHTML(data, variant, colorScheme, id),
      cssContent: generateProfessionalTechCSS(data, variant, colorScheme, id),
      jsContent: generateProfessionalTechJS(data, variant)
    };
  };

  const generateGeneralTemplate = (data: WebsiteData, id: number, variant: string): Template => {
    const colorScheme = getColorScheme(data.colorScheme);
    
    return {
      id: `general-${id}`,
      name: `${data.businessName} - ${variant}`,
      category: 'Business',
      industry: data.industry,
      features: [
        'Professional Homepage',
        'About Company',
        'Services/Products',
        'Contact Forms',
        'Team Showcase',
        'Client Testimonials',
        'News/Blog',
        'Gallery/Portfolio',
        'Location/Map',
        'Social Media Integration'
      ],
      preview: `${variant} design tailored for ${data.targetAudience} in ${data.industry}`,
      image: '/placeholder.svg',
      isPopular: id === 1,
      isMobileOptimized: true,
      hasEcommerce: data.businessGoals.toLowerCase().includes('sales'),
      pages: [
        'Home',
        'About',
        'Services',
        'Products',
        'Team',
        'Testimonials',
        'Blog',
        'Gallery',
        'Contact',
        'FAQ',
        'Privacy Policy'
      ],
      demoUrl: `https://${data.businessName.toLowerCase().replace(/\s+/g, '-')}-${variant.toLowerCase().replace(/\s+/g, '-')}.demo.com`,
      downloadUrl: '#download',
      htmlContent: generateProfessionalGeneralHTML(data, variant, colorScheme, id),
      cssContent: generateProfessionalGeneralCSS(data, variant, colorScheme, id),
      jsContent: generateProfessionalGeneralJS(data, variant)
    };
  };

  const getColorScheme = (scheme: string) => {
    const schemes: { [key: string]: { primary: string; secondary: string; accent: string; text: string; bg: string; muted: string; border: string } } = {
      'Professional Blue': { 
        primary: 'hsl(221.2 83.2% 53.3%)', 
        secondary: 'hsl(210 40% 98%)', 
        accent: 'hsl(210 40% 96.1%)', 
        text: 'hsl(222.2 84% 4.9%)', 
        bg: 'hsl(0 0% 100%)',
        muted: 'hsl(210 40% 96.1%)',
        border: 'hsl(214.3 31.8% 91.4%)'
      },
      'Modern Black & White': { 
        primary: 'hsl(0 0% 9%)', 
        secondary: 'hsl(0 0% 96.1%)', 
        accent: 'hsl(0 0% 89.1%)', 
        text: 'hsl(0 0% 3.9%)', 
        bg: 'hsl(0 0% 100%)',
        muted: 'hsl(0 0% 96.1%)',
        border: 'hsl(0 0% 89.1%)'
      },
      'Vibrant Green': { 
        primary: 'hsl(142.1 76.2% 36.3%)', 
        secondary: 'hsl(138 76.5% 96.7%)', 
        accent: 'hsl(138 76.5% 90.2%)', 
        text: 'hsl(140 75% 4%)', 
        bg: 'hsl(0 0% 100%)',
        muted: 'hsl(142.1 84.2% 95.9%)',
        border: 'hsl(142.1 84.2% 89.8%)'
      }
    };
    return schemes[scheme] || schemes['Professional Blue'];
  };

  // Professional E-commerce HTML Generation
  const generateProfessionalEcommerceHTML = (data: WebsiteData, variant: string, colors: any, id: number) => {
    const brandName = data.businessName;
    const description = data.businessDescription;
    const audience = data.targetAudience;
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${brandName} - Premium ${variant}</title>
    <meta name="description" content="${description}">
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <!-- Navigation Header -->
    <header class="header">
        <div class="nav-container">
            <div class="nav-brand">
                <h1 class="brand-name">${brandName}</h1>
            </div>
            <nav class="nav-menu">
                <a href="#home" class="nav-link">Home</a>
                <a href="#products" class="nav-link">Products</a>
                <a href="#about" class="nav-link">About</a>
                <a href="#contact" class="nav-link">Contact</a>
                <div class="cart-wrapper">
                    <button class="cart-btn">
                        <span class="cart-icon">🛒</span>
                        <span class="cart-count">0</span>
                    </button>
                </div>
            </nav>
            <button class="mobile-menu-btn">☰</button>
        </div>
    </header>

    <!-- Hero Section -->
    <section id="home" class="hero">
        <div class="hero-container">
            <div class="hero-content">
                <div class="hero-badge">New Collection Available</div>
                <h1 class="hero-title">
                    Welcome to <span class="brand-highlight">${brandName}</span>
                </h1>
                <p class="hero-subtitle">
                    ${description} Designed for ${audience} who value quality and style.
                </p>
                <div class="hero-cta">
                    <button class="btn-primary">Shop Now</button>
                    <button class="btn-secondary">View Collection</button>
                </div>
                <div class="hero-stats">
                    <div class="stat">
                        <span class="stat-number">10K+</span>
                        <span class="stat-label">Happy Customers</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">500+</span>
                        <span class="stat-label">Products</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">98%</span>
                        <span class="stat-label">Satisfaction</span>
                    </div>
                </div>
            </div>
            <div class="hero-visual">
                <div class="hero-image-placeholder">
                    <div class="floating-card">
                        <div class="card-content">
                            <div class="product-preview"></div>
                            <div class="preview-details">
                                <div class="preview-title">Featured Product</div>
                                <div class="preview-price">$199</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="features">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">Why Choose ${brandName}?</h2>
                <p class="section-subtitle">We deliver excellence in every aspect of your shopping experience</p>
            </div>
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">🚚</div>
                    <h3 class="feature-title">Free Shipping</h3>
                    <p class="feature-description">Free delivery on all orders over $50. Fast and reliable shipping worldwide.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">⭐</div>
                    <h3 class="feature-title">Premium Quality</h3>
                    <p class="feature-description">Carefully curated products that meet our high standards for quality and design.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🔒</div>
                    <h3 class="feature-title">Secure Payment</h3>
                    <p class="feature-description">Your payment information is protected with bank-level security encryption.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">💬</div>
                    <h3 class="feature-title">24/7 Support</h3>
                    <p class="feature-description">Our dedicated support team is here to help you anytime, anywhere.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Products Section -->
    <section id="products" class="products">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">Featured Products</h2>
                <p class="section-subtitle">Discover our most popular items loved by ${audience}</p>
            </div>
            <div class="products-grid">
                <div class="product-card">
                    <div class="product-image">
                        <div class="product-badge">New</div>
                        <div class="product-placeholder">Product Image</div>
                        <div class="product-overlay">
                            <button class="quick-view">Quick View</button>
                        </div>
                    </div>
                    <div class="product-info">
                        <h3 class="product-name">Premium Product 1</h3>
                        <p class="product-description">High-quality product designed for modern ${audience}</p>
                        <div class="product-rating">
                            <div class="stars">★★★★★</div>
                            <span class="rating-count">(128 reviews)</span>
                        </div>
                        <div class="product-price">
                            <span class="current-price">$149.99</span>
                            <span class="original-price">$199.99</span>
                        </div>
                        <button class="add-to-cart">Add to Cart</button>
                    </div>
                </div>
                <div class="product-card">
                    <div class="product-image">
                        <div class="product-badge bestseller">Bestseller</div>
                        <div class="product-placeholder">Product Image</div>
                        <div class="product-overlay">
                            <button class="quick-view">Quick View</button>
                        </div>
                    </div>
                    <div class="product-info">
                        <h3 class="product-name">Premium Product 2</h3>
                        <p class="product-description">Award-winning design perfect for ${audience}</p>
                        <div class="product-rating">
                            <div class="stars">★★★★★</div>
                            <span class="rating-count">(89 reviews)</span>
                        </div>
                        <div class="product-price">
                            <span class="current-price">$199.99</span>
                        </div>
                        <button class="add-to-cart">Add to Cart</button>
                    </div>
                </div>
                <div class="product-card">
                    <div class="product-image">
                        <div class="product-placeholder">Product Image</div>
                        <div class="product-overlay">
                            <button class="quick-view">Quick View</button>
                        </div>
                    </div>
                    <div class="product-info">
                        <h3 class="product-name">Premium Product 3</h3>
                        <p class="product-description">Innovative solution for discerning ${audience}</p>
                        <div class="product-rating">
                            <div class="stars">★★★★☆</div>
                            <span class="rating-count">(67 reviews)</span>
                        </div>
                        <div class="product-price">
                            <span class="current-price">$89.99</span>
                        </div>
                        <button class="add-to-cart">Add to Cart</button>
                    </div>
                </div>
            </div>
            <div class="view-all">
                <button class="btn-secondary">View All Products</button>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="about">
        <div class="container">
            <div class="about-content">
                <div class="about-text">
                    <div class="section-header">
                        <h2 class="section-title">About ${brandName}</h2>
                        <p class="section-subtitle">${description}</p>
                    </div>
                    <p class="about-description">
                        We are passionate about serving ${audience} with products that combine innovation, 
                        quality, and style. Our mission is ${data.businessGoals.toLowerCase()}, and we're 
                        committed to delivering exceptional value to our customers.
                    </p>
                    <div class="about-features">
                        <div class="about-feature">
                            <div class="feature-number">5+</div>
                            <div class="feature-text">Years of Excellence</div>
                        </div>
                        <div class="about-feature">
                            <div class="feature-number">50K+</div>
                            <div class="feature-text">Satisfied Customers</div>
                        </div>
                        <div class="about-feature">
                            <div class="feature-number">99%</div>
                            <div class="feature-text">Quality Guarantee</div>
                        </div>
                    </div>
                    <button class="btn-primary">Learn More</button>
                </div>
                <div class="about-visual">
                    <div class="about-image-placeholder">About Image</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3 class="footer-title">${brandName}</h3>
                    <p class="footer-description">${description}</p>
                    <div class="social-links">
                        <a href="#" class="social-link">Facebook</a>
                        <a href="#" class="social-link">Instagram</a>
                        <a href="#" class="social-link">Twitter</a>
                    </div>
                </div>
                <div class="footer-section">
                    <h4 class="footer-subtitle">Quick Links</h4>
                    <div class="footer-links">
                        <a href="#home" class="footer-link">Home</a>
                        <a href="#products" class="footer-link">Products</a>
                        <a href="#about" class="footer-link">About</a>
                        <a href="#contact" class="footer-link">Contact</a>
                    </div>
                </div>
                <div class="footer-section">
                    <h4 class="footer-subtitle">Customer Service</h4>
                    <div class="footer-links">
                        <a href="#" class="footer-link">Help Center</a>
                        <a href="#" class="footer-link">Shipping Info</a>
                        <a href="#" class="footer-link">Returns</a>
                        <a href="#" class="footer-link">Size Guide</a>
                    </div>
                </div>
                <div class="footer-section">
                    <h4 class="footer-subtitle">Contact Info</h4>
                    <div class="contact-info">
                        <p>Email: hello@${brandName.toLowerCase().replace(/\s+/g, '')}.com</p>
                        <p>Phone: (555) 123-4567</p>
                        <p>Address: 123 Business St, City, State 12345</p>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 ${brandName}. All rights reserved.</p>
                <div class="footer-legal">
                    <a href="#" class="legal-link">Privacy Policy</a>
                    <a href="#" class="legal-link">Terms of Service</a>
                </div>
            </div>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>`;
  };

  // Professional E-commerce CSS Generation
  const generateProfessionalEcommerceCSS = (data: WebsiteData, variant: string, colors: any, id: number) => {
    return `/* ${data.businessName} - ${variant} Professional Styles */

/* Reset and Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --primary: ${colors.primary};
    --secondary: ${colors.secondary};
    --accent: ${colors.accent};
    --text: ${colors.text};
    --background: ${colors.bg};
    --muted: ${colors.muted};
    --border: ${colors.border};
    --radius: 8px;
    --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    line-height: 1.6;
    color: var(--text);
    background-color: var(--background);
    scroll-behavior: smooth;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
}

/* Header Styles */
.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border);
    z-index: 1000;
    transition: all 0.3s ease;
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
}

.brand-name {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--primary);
    letter-spacing: -0.025em;
}

.nav-menu {
    display: flex;
    align-items: center;
    gap: 2rem;
}

.nav-link {
    text-decoration: none;
    color: var(--text);
    font-weight: 500;
    transition: color 0.3s ease;
    position: relative;
}

.nav-link:hover {
    color: var(--primary);
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--primary);
    transition: width 0.3s ease;
}

.nav-link:hover::after {
    width: 100%;
}

.cart-wrapper {
    position: relative;
}

.cart-btn {
    background: var(--primary);
    color: white;
    border: none;
    padding: 0.75rem 1rem;
    border-radius: var(--radius);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
    transition: all 0.3s ease;
}

.cart-btn:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}

.cart-count {
    background: rgba(255, 255, 255, 0.2);
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    font-size: 0.875rem;
    min-width: 1.5rem;
    text-align: center;
}

.mobile-menu-btn {
    display: none;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: var(--text);
    cursor: pointer;
}

/* Hero Section */
.hero {
    padding: 140px 0 80px;
    background: linear-gradient(135deg, var(--background) 0%, var(--muted) 100%);
    position: relative;
    overflow: hidden;
}

.hero::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%);
}

.hero-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
}

.hero-content {
    position: relative;
    z-index: 2;
}

.hero-badge {
    display: inline-block;
    background: var(--primary);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 50px;
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 2rem;
    animation: fadeInUp 0.6s ease-out;
}

.hero-title {
    font-size: 3.5rem;
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: 1.5rem;
    color: var(--text);
    animation: fadeInUp 0.6s ease-out 0.2s both;
}

.brand-highlight {
    color: var(--primary);
    position: relative;
}

.hero-subtitle {
    font-size: 1.25rem;
    color: #6b7280;
    margin-bottom: 2rem;
    line-height: 1.6;
    animation: fadeInUp 0.6s ease-out 0.4s both;
}

.hero-cta {
    display: flex;
    gap: 1rem;
    margin-bottom: 3rem;
    animation: fadeInUp 0.6s ease-out 0.6s both;
}

.btn-primary {
    background: var(--primary);
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: var(--radius);
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1rem;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
    background: color-mix(in srgb, var(--primary) 90%, black);
}

.btn-secondary {
    background: transparent;
    color: var(--text);
    border: 2px solid var(--border);
    padding: 1rem 2rem;
    border-radius: var(--radius);
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1rem;
}

.btn-secondary:hover {
    border-color: var(--primary);
    color: var(--primary);
    transform: translateY(-2px);
    box-shadow: var(--shadow);
}

.hero-stats {
    display: flex;
    gap: 2rem;
    animation: fadeInUp 0.6s ease-out 0.8s both;
}

.stat {
    text-align: center;
}

.stat-number {
    display: block;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary);
}

.stat-label {
    font-size: 0.875rem;
    color: #6b7280;
}

.hero-visual {
    position: relative;
    z-index: 1;
}

.hero-image-placeholder {
    position: relative;
    height: 400px;
    background: linear-gradient(135deg, var(--primary), var(--accent));
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeInRight 0.8s ease-out 0.4s both;
}

.floating-card {
    position: absolute;
    top: 20px;
    right: -20px;
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: var(--shadow-lg);
    animation: float 3s ease-in-out infinite;
}

.card-content {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.product-preview {
    width: 60px;
    height: 60px;
    background: var(--muted);
    border-radius: 8px;
}

.preview-title {
    font-weight: 600;
    margin-bottom: 0.25rem;
}

.preview-price {
    color: var(--primary);
    font-weight: 700;
}

/* Features Section */
.features {
    padding: 80px 0;
    background: var(--background);
}

.section-header {
    text-align: center;
    margin-bottom: 4rem;
}

.section-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: var(--text);
}

.section-subtitle {
    font-size: 1.125rem;
    color: #6b7280;
    max-width: 600px;
    margin: 0 auto;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
}

.feature-card {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    text-align: center;
    border: 1px solid var(--border);
    transition: all 0.3s ease;
}

.feature-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    border-color: var(--primary);
}

.feature-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.feature-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--text);
}

.feature-description {
    color: #6b7280;
    line-height: 1.6;
}

/* Products Section */
.products {
    padding: 80px 0;
    background: var(--muted);
}

.products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
}

.product-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s ease;
    border: 1px solid var(--border);
}

.product-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
}

.product-image {
    position: relative;
    height: 250px;
    overflow: hidden;
}

.product-placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--muted), var(--accent));
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6b7280;
    font-weight: 500;
}

.product-badge {
    position: absolute;
    top: 12px;
    left: 12px;
    background: var(--primary);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 500;
    z-index: 2;
}

.product-badge.bestseller {
    background: #f59e0b;
}

.product-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.product-card:hover .product-overlay {
    opacity: 1;
}

.quick-view {
    background: white;
    color: var(--text);
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: var(--radius);
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
}

.quick-view:hover {
    background: var(--primary);
    color: white;
}

.product-info {
    padding: 1.5rem;
}

.product-name {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--text);
}

.product-description {
    color: #6b7280;
    font-size: 0.875rem;
    margin-bottom: 1rem;
}

.product-rating {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.stars {
    color: #fbbf24;
    font-size: 0.875rem;
}

.rating-count {
    color: #6b7280;
    font-size: 0.875rem;
}

.product-price {
    margin-bottom: 1rem;
}

.current-price {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--primary);
    margin-right: 0.5rem;
}

.original-price {
    color: #6b7280;
    text-decoration: line-through;
    font-size: 1rem;
}

.add-to-cart {
    width: 100%;
    background: var(--primary);
    color: white;
    border: none;
    padding: 0.75rem;
    border-radius: var(--radius);
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
}

.add-to-cart:hover {
    background: color-mix(in srgb, var(--primary) 90%, black);
    transform: translateY(-1px);
}

.view-all {
    text-align: center;
}

/* About Section */
.about {
    padding: 80px 0;
    background: var(--background);
}

.about-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
}

.about-text .section-header {
    text-align: left;
    margin-bottom: 2rem;
}

.about-description {
    color: #6b7280;
    margin-bottom: 2rem;
    line-height: 1.7;
}

.about-features {
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;
}

.about-feature {
    text-align: center;
}

.feature-number {
    font-size: 2rem;
    font-weight: 700;
    color: var(--primary);
    margin-bottom: 0.25rem;
}

.feature-text {
    font-size: 0.875rem;
    color: #6b7280;
}

.about-visual {
    position: relative;
}

.about-image-placeholder {
    height: 400px;
    background: linear-gradient(135deg, var(--accent), var(--primary));
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 500;
}

/* Footer */
.footer {
    background: var(--text);
    color: white;
    padding: 60px 0 30px;
}

.footer-content {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 3rem;
    margin-bottom: 3rem;
}

.footer-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: var(--primary);
}

.footer-subtitle {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 1rem;
}

.footer-description {
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 1.5rem;
    line-height: 1.6;
}

.social-links {
    display: flex;
    gap: 1rem;
}

.social-link {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    transition: color 0.3s ease;
}

.social-link:hover {
    color: var(--primary);
}

.footer-links {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.footer-link {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    transition: color 0.3s ease;
}

.footer-link:hover {
    color: white;
}

.contact-info p {
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 0.5rem;
}

.footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-legal {
    display: flex;
    gap: 2rem;
}

.legal-link {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    font-size: 0.875rem;
    transition: color 0.3s ease;
}

.legal-link:hover {
    color: white;
}

/* Animations */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeInRight {
    from {
        opacity: 0;
        transform: translateX(30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes float {
    0%, 100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-10px);
    }
}

/* Responsive Design */
@media (max-width: 768px) {
    .nav-menu {
        display: none;
    }
    
    .mobile-menu-btn {
        display: block;
    }
    
    .hero-container {
        grid-template-columns: 1fr;
        gap: 2rem;
        text-align: center;
    }
    
    .hero-title {
        font-size: 2.5rem;
    }
    
    .hero-cta {
        flex-direction: column;
        align-items: center;
    }
    
    .hero-stats {
        justify-content: center;
    }
    
    .about-content {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
    
    .about-text .section-header {
        text-align: center;
    }
    
    .footer-content {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
    
    .footer-bottom {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
    }
}

@media (max-width: 480px) {
    .container {
        padding: 0 1rem;
    }
    
    .hero {
        padding: 120px 0 60px;
    }
    
    .hero-title {
        font-size: 2rem;
    }
    
    .section-title {
        font-size: 2rem;
    }
    
    .products-grid {
        grid-template-columns: 1fr;
    }
}`;
  };

  // Professional E-commerce JavaScript Generation
  const generateProfessionalEcommerceJS = (data: WebsiteData, variant: string) => {
    return `// ${data.businessName} - ${variant} Professional JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Cart functionality
    let cartCount = 0;
    let cartItems = [];
    
    const cartCountElement = document.querySelector('.cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartBtn = document.querySelector('.cart-btn');
    
    // Initialize cart
    function updateCartDisplay() {
        cartCountElement.textContent = cartCount;
        cartBtn.classList.toggle('has-items', cartCount > 0);
    }
    
    // Add to cart functionality
    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            const productPrice = productCard.querySelector('.current-price').textContent;
            
            // Add item to cart
            cartItems.push({
                name: productName,
                price: productPrice,
                id: Date.now() + index
            });
            
            cartCount++;
            updateCartDisplay();
            
            // Visual feedback
            const originalText = this.textContent;
            this.textContent = 'Added!';
            this.style.background = '#22c55e';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = '';
                this.disabled = false;
            }, 1500);
            
            // Show success animation
            showCartAnimation();
        });
    });
    
    // Cart animation
    function showCartAnimation() {
        cartBtn.style.transform = 'scale(1.1)';
        setTimeout(() => {
            cartBtn.style.transform = '';
        }, 200);
    }
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('mobile-active');
            this.textContent = navMenu.classList.contains('mobile-active') ? '✕' : '☰';
        });
    }
    
    // Quick view functionality
    document.querySelectorAll('.quick-view').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            
            // Simple modal simulation
            alert(\`Quick view for: \${productName}\\n\\nThis would normally open a detailed product modal with more images, specifications, and purchase options.\`);
        });
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.feature-card, .product-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Product hover effects
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Newsletter signup (placeholder)
    function setupNewsletterSignup() {
        const newsletterForms = document.querySelectorAll('.newsletter-form');
        newsletterForms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = this.querySelector('input[type="email"]').value;
                
                if (email) {
                    alert('Thank you for subscribing! You\\'ll receive updates about our latest products and offers.');
                    this.reset();
                } else {
                    alert('Please enter a valid email address.');
                }
            });
        });
    }
    
    setupNewsletterSignup();
    
    // Performance optimization: Lazy load images when they exist
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    console.log('${data.businessName} website loaded successfully!');
});

// Additional utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = \`notification notification-\${type}\`;
    notification.textContent = message;
    
    notification.style.cssText = \`
        position: fixed;
        top: 20px;
        right: 20px;
        background: \${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    \`;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}`;
  };

  // Generate similar professional templates for Service, Tech, and General
  const generateProfessionalServiceHTML = (data: WebsiteData, variant: string, colors: any, id: number) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.businessName} - Professional ${variant}</title>
    <meta name="description" content="${data.businessDescription}">
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <!-- Navigation -->
    <header class="header">
        <div class="nav-container">
            <div class="nav-brand">
                <h1 class="brand-name">${data.businessName}</h1>
            </div>
            <nav class="nav-menu">
                <a href="#home" class="nav-link">Home</a>
                <a href="#services" class="nav-link">Services</a>
                <a href="#about" class="nav-link">About</a>
                <a href="#team" class="nav-link">Team</a>
                <a href="#contact" class="nav-link">Contact</a>
                <button class="btn-primary">Get Quote</button>
            </nav>
            <button class="mobile-menu-btn">☰</button>
        </div>
    </header>

    <!-- Hero Section -->
    <section id="home" class="hero">
        <div class="hero-container">
            <div class="hero-content">
                <div class="hero-badge">Trusted Professionals</div>
                <h1 class="hero-title">
                    Expert <span class="brand-highlight">${data.industry}</span> Services
                </h1>
                <p class="hero-subtitle">
                    ${data.businessDescription} We help ${data.targetAudience} achieve their goals with professional expertise and personalized solutions.
                </p>
                <div class="hero-cta">
                    <button class="btn-primary">Schedule Consultation</button>
                    <button class="btn-secondary">View Portfolio</button>
                </div>
                <div class="hero-stats">
                    <div class="stat">
                        <span class="stat-number">500+</span>
                        <span class="stat-label">Satisfied Clients</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">15+</span>
                        <span class="stat-label">Years Experience</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">99%</span>
                        <span class="stat-label">Success Rate</span>
                    </div>
                </div>
            </div>
            <div class="hero-visual">
                <div class="hero-image-placeholder">Professional Team</div>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="services">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">Our Services</h2>
                <p class="section-subtitle">Comprehensive solutions tailored to your needs</p>
            </div>
            <div class="services-grid">
                <div class="service-card">
                    <div class="service-icon">🎯</div>
                    <h3 class="service-title">Strategic Consulting</h3>
                    <p class="service-description">Expert guidance to help you make informed decisions and achieve your business objectives.</p>
                    <a href="#" class="service-link">Learn More →</a>
                </div>
                <div class="service-card">
                    <div class="service-icon">⚡</div>
                    <h3 class="service-title">Implementation</h3>
                    <p class="service-description">Full-service implementation to bring your vision to life with precision and efficiency.</p>
                    <a href="#" class="service-link">Learn More →</a>
                </div>
                <div class="service-card">
                    <div class="service-icon">📈</div>
                    <h3 class="service-title">Optimization</h3>
                    <p class="service-description">Continuous improvement and optimization to maximize your return on investment.</p>
                    <a href="#" class="service-link">Learn More →</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3 class="footer-title">${data.businessName}</h3>
                    <p class="footer-description">${data.businessDescription}</p>
                </div>
                <div class="footer-section">
                    <h4 class="footer-subtitle">Services</h4>
                    <div class="footer-links">
                        <a href="#" class="footer-link">Consulting</a>
                        <a href="#" class="footer-link">Implementation</a>
                        <a href="#" class="footer-link">Support</a>
                    </div>
                </div>
                <div class="footer-section">
                    <h4 class="footer-subtitle">Contact</h4>
                    <div class="contact-info">
                        <p>Email: info@${data.businessName.toLowerCase().replace(/\s+/g, '')}.com</p>
                        <p>Phone: (555) 123-4567</p>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 ${data.businessName}. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>`;
  };

  const generateProfessionalServiceCSS = (data: WebsiteData, variant: string, colors: any, id: number) => {
    return `/* ${data.businessName} - ${variant} Professional Service Styles */
/* Similar professional styling as e-commerce but adapted for services */
/* Base styles would be similar to the e-commerce CSS above */
/* This is a simplified version for brevity */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --primary: ${colors.primary};
    --secondary: ${colors.secondary};
    --accent: ${colors.accent};
    --text: ${colors.text};
    --background: ${colors.bg};
    --muted: ${colors.muted};
    --border: ${colors.border};
}

body {
    font-family: 'Inter', sans-serif;
    line-height: 1.6;
    color: var(--text);
    background-color: var(--background);
}

/* Professional service-specific styles */
.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.service-card {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid var(--border);
    transition: all 0.3s ease;
}

.service-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

/* Additional professional styling similar to e-commerce template */`;
  };

  const generateProfessionalServiceJS = (data: WebsiteData, variant: string) => {
    return `// ${data.businessName} - ${variant} Professional Service JavaScript
// Contact form handling, appointment booking, service-specific features
document.addEventListener('DOMContentLoaded', function() {
    console.log('${data.businessName} service website loaded');
    
    // Service-specific functionality
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const serviceName = this.querySelector('.service-title').textContent;
            console.log('Service selected:', serviceName);
        });
    });
});`;
  };

  // Similar functions for Tech and General templates (simplified for brevity)
  const generateProfessionalTechHTML = (data: WebsiteData, variant: string, colors: any, id: number) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.businessName} - ${variant}</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <header class="header">
        <div class="nav-container">
            <h1 class="brand-name">${data.businessName}</h1>
            <nav class="nav-menu">
                <a href="#home">Home</a>
                <a href="#features">Features</a>
                <a href="#pricing">Pricing</a>
                <a href="#demo">Demo</a>
            </nav>
        </div>
    </header>
    
    <section id="home" class="hero">
        <div class="hero-container">
            <h1 class="hero-title">Innovative ${data.industry} Solutions</h1>
            <p class="hero-subtitle">${data.businessDescription}</p>
            <button class="btn-primary">Start Free Trial</button>
        </div>
    </section>
    
    <script src="script.js"></script>
</body>
</html>`;
  };

  const generateProfessionalTechCSS = (data: WebsiteData, variant: string, colors: any, id: number) => {
    return `/* Modern tech-focused CSS with professional styling */`;
  };

  const generateProfessionalTechJS = (data: WebsiteData, variant: string) => {
    return `// Tech-focused JavaScript functionality`;
  };

  const generateProfessionalGeneralHTML = (data: WebsiteData, variant: string, colors: any, id: number) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.businessName} - ${variant}</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <header class="header">
        <div class="nav-container">
            <h1 class="brand-name">${data.businessName}</h1>
            <nav class="nav-menu">
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#services">Services</a>
                <a href="#contact">Contact</a>
            </nav>
        </div>
    </header>
    
    <section id="home" class="hero">
        <div class="hero-container">
            <h1 class="hero-title">Welcome to ${data.businessName}</h1>
            <p class="hero-subtitle">${data.businessDescription}</p>
            <button class="btn-primary">Get Started</button>
        </div>
    </section>
    
    <script src="script.js"></script>
</body>
</html>`;
  };

  const generateProfessionalGeneralCSS = (data: WebsiteData, variant: string, colors: any, id: number) => {
    return `/* Professional general business CSS */`;
  };

  const generateProfessionalGeneralJS = (data: WebsiteData, variant: string) => {
    return `// General business JavaScript functionality`;
  };

  const templatesToShow = isGenerated ? generatedTemplates : templates;

  const handlePreview = (template: Template) => {
    setSelectedTemplate(template);
    setShowPreview(true);
    onPreviewTemplate(template);
  };

  const handleSelectTemplate = (template: Template) => {
    // Create a complete download package
    const downloadContent = {
      'index.html': template.htmlContent,
      'styles.css': template.cssContent,
      'script.js': template.jsContent,
      'README.md': `# ${template.name}

## Installation Instructions:
1. Extract all files to your web server directory
2. Open index.html in your browser to view the website
3. Customize the content, colors, and styling as needed
4. For e-commerce functionality, integrate with your preferred payment processor

## Customization Guide:
- Edit index.html for content changes
- Modify styles.css for design changes
- Update script.js for functionality changes
- Replace placeholder images with your actual images

## Features Included:
${template.features.map(feature => `- ${feature}`).join('\n')}

## Pages Included:
${template.pages.map(page => `- ${page}`).join('\n')}

Built with modern web standards and optimized for all devices.
`
    };

    // Create and download a zip-like text file with all content
    const fullContent = Object.entries(downloadContent)
      .map(([filename, content]) => `=== ${filename} ===\n${content}\n\n`)
      .join('');
    
    const blob = new Blob([fullContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.name.replace(/\s+/g, '-').toLowerCase()}-complete-website.txt`;
    a.click();
    
    onSelectTemplate(template);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Layout className="h-5 w-5" />
            <span>
              {isGenerated ? 'Your Personalized Website Templates' : 'Website Templates'}
            </span>
          </CardTitle>
          <CardDescription>
            {isGenerated 
              ? `5 custom templates generated for ${websiteData?.businessName || 'your business'}`
              : 'Choose from professional templates, fully customizable and ready to download'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {templatesToShow.length === 0 && isGenerated && (
            <div className="text-center py-8">
              <Layout className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Generating Your Templates...</h3>
              <p className="text-muted-foreground">
                Please wait while we create personalized website templates for your business.
              </p>
            </div>
          )}
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templatesToShow.map((template) => (
              <Card key={template.id} className="group hover:shadow-lg transition-all duration-300">
                <div className="relative">
                  <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 rounded-t-lg flex items-center justify-center border-b">
                    <div className="text-center">
                      <Palette className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-xs text-muted-foreground">Live Preview Available</p>
                    </div>
                  </div>
                  {template.isPopular && (
                    <Badge className="absolute top-2 right-2 bg-orange-500">
                      Recommended
                    </Badge>
                  )}
                </div>
                
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <div className="flex space-x-1">
                      {template.isMobileOptimized && (
                        <Smartphone className="h-4 w-4 text-green-600" />
                      )}
                      {template.hasEcommerce && (
                        <ShoppingCart className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Badge variant="secondary">{template.category}</Badge>
                    <Badge variant="outline">{template.industry}</Badge>
                  </div>
                  <CardDescription className="text-sm">{template.preview}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium mb-2">Included Pages ({template.pages.length}):</p>
                    <div className="grid grid-cols-2 gap-1 text-xs">
                      {template.pages.slice(0, 6).map((page, index) => (
                        <div key={index} className="flex items-center space-x-1">
                          <div className="h-1 w-1 rounded-full bg-primary" />
                          <span>{page}</span>
                        </div>
                      ))}
                      {template.pages.length > 6 && (
                        <div className="text-xs text-muted-foreground col-span-2">
                          +{template.pages.length - 6} more pages
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-2">Key Features:</p>
                    <div className="grid grid-cols-1 gap-1">
                      {template.features.slice(0, 4).map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2 text-xs">
                          <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                      {template.features.length > 4 && (
                        <div className="text-xs text-muted-foreground">
                          +{template.features.length - 4} more features
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 pt-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handlePreview(template)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Preview
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleSelectTemplate(template)}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="w-full text-xs"
                      onClick={() => window.open(template.demoUrl, '_blank')}
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View Live Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Template Preview Modal */}
      {showPreview && selectedTemplate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-6xl max-h-[90vh] overflow-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Preview: {selectedTemplate.name}</CardTitle>
                <Button variant="outline" onClick={() => setShowPreview(false)}>
                  Close Preview
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Live Website Preview */}
              <div className="aspect-video bg-white rounded-lg border-2 border-gray-200 overflow-hidden">
                <iframe
                  src={`data:text/html;charset=utf-8,${encodeURIComponent(selectedTemplate.htmlContent)}`}
                  className="w-full h-full"
                  title="Website Preview"
                />
              </div>
              
              {/* Template Details */}
              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      HTML Structure
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Complete HTML5 structure with semantic elements and accessibility features
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 flex items-center">
                      <Palette className="h-4 w-4 mr-2" />
                      CSS Styling
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Responsive CSS with custom color scheme and modern design patterns
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 flex items-center">
                      <Code className="h-4 w-4 mr-2" />
                      JavaScript Features
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Interactive elements, form handling, and mobile-responsive navigation
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              {/* All included pages */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Complete Website Package ({selectedTemplate.pages.length} pages)</h3>
                <div className="grid md:grid-cols-4 lg:grid-cols-6 gap-2">
                  {selectedTemplate.pages.map((page, index) => (
                    <Badge key={index} variant="outline" className="justify-center">
                      {page}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-4 pt-4 border-t">
                <Button 
                  className="flex-1"
                  onClick={() => {
                    handleSelectTemplate(selectedTemplate);
                    setShowPreview(false);
                  }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Complete Website
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => window.open(selectedTemplate.demoUrl, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Live Demo
                </Button>
                <Button variant="outline" onClick={() => setShowPreview(false)}>
                  Continue Browsing
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default WebsiteTemplates;
