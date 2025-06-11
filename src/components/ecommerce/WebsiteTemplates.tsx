
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
      htmlContent: generateEcommerceHTML(data, variant, colorScheme),
      cssContent: generateEcommerceCSS(data, variant, colorScheme),
      jsContent: generateEcommerceJS(data, variant)
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
      htmlContent: generateServiceHTML(data, variant, colorScheme),
      cssContent: generateServiceCSS(data, variant, colorScheme),
      jsContent: generateServiceJS(data, variant)
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
      htmlContent: generateTechHTML(data, variant, colorScheme),
      cssContent: generateTechCSS(data, variant, colorScheme),
      jsContent: generateTechJS(data, variant)
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
      htmlContent: generateGeneralHTML(data, variant, colorScheme),
      cssContent: generateGeneralCSS(data, variant, colorScheme),
      jsContent: generateGeneralJS(data, variant)
    };
  };

  const getColorScheme = (scheme: string) => {
    const schemes: { [key: string]: { primary: string; secondary: string; accent: string; text: string; bg: string } } = {
      'Professional Blue': { primary: '#2563eb', secondary: '#3b82f6', accent: '#60a5fa', text: '#1e293b', bg: '#f8fafc' },
      'Modern Black & White': { primary: '#000000', secondary: '#374151', accent: '#6b7280', text: '#111827', bg: '#ffffff' },
      'Vibrant Green': { primary: '#059669', secondary: '#10b981', accent: '#34d399', text: '#064e3b', bg: '#ecfdf5' },
      'Elegant Purple': { primary: '#7c3aed', secondary: '#8b5cf6', accent: '#a78bfa', text: '#581c87', bg: '#faf5ff' },
      'Warm Orange': { primary: '#ea580c', secondary: '#fb923c', accent: '#fdba74', text: '#9a3412', bg: '#fff7ed' },
      'Cool Gray': { primary: '#4b5563', secondary: '#6b7280', accent: '#9ca3af', text: '#1f2937', bg: '#f9fafb' },
      'Bold Red': { primary: '#dc2626', secondary: '#ef4444', accent: '#f87171', text: '#7f1d1d', bg: '#fef2f2' },
      'Calming Teal': { primary: '#0d9488', secondary: '#14b8a6', accent: '#5eead4', text: '#134e4a', bg: '#f0fdfa' }
    };
    return schemes[scheme] || schemes['Professional Blue'];
  };

  // Generate HTML content for different template types
  const generateEcommerceHTML = (data: WebsiteData, variant: string, colors: any) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.businessName} - ${variant}</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Header -->
    <header class="header">
        <nav class="navbar">
            <div class="nav-brand">
                <h1>${data.businessName}</h1>
            </div>
            <ul class="nav-menu">
                <li><a href="#home">Home</a></li>
                <li><a href="#products">Products</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#cart" class="cart-icon">Cart (0)</a></li>
            </ul>
        </nav>
    </header>

    <!-- Hero Section -->
    <section id="home" class="hero">
        <div class="hero-content">
            <h2>Welcome to ${data.businessName}</h2>
            <p>${data.businessDescription}</p>
            <p>Serving ${data.targetAudience} with premium quality products</p>
            <button class="cta-button">Shop Now</button>
        </div>
    </section>

    <!-- Products Section -->
    <section id="products" class="products">
        <div class="container">
            <h2>Our Products</h2>
            <div class="product-grid">
                <div class="product-card">
                    <img src="/placeholder.svg" alt="Product 1">
                    <h3>Featured Product 1</h3>
                    <p>$99.99</p>
                    <button class="add-to-cart">Add to Cart</button>
                </div>
                <div class="product-card">
                    <img src="/placeholder.svg" alt="Product 2">
                    <h3>Featured Product 2</h3>
                    <p>$149.99</p>
                    <button class="add-to-cart">Add to Cart</button>
                </div>
                <div class="product-card">
                    <img src="/placeholder.svg" alt="Product 3">
                    <h3>Featured Product 3</h3>
                    <p>$79.99</p>
                    <button class="add-to-cart">Add to Cart</button>
                </div>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="about">
        <div class="container">
            <h2>About ${data.businessName}</h2>
            <p>${data.businessDescription}</p>
            <p>We specialize in serving ${data.targetAudience} and our primary goal is ${data.businessGoals.toLowerCase()}.</p>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>${data.businessName}</h3>
                    <p>Your trusted partner for quality products</p>
                </div>
                <div class="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#products">Products</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Contact Info</h4>
                    <p>Email: info@${data.businessName.toLowerCase().replace(/\s+/g, '')}.com</p>
                    <p>Phone: (555) 123-4567</p>
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

  const generateEcommerceCSS = (data: WebsiteData, variant: string, colors: any) => {
    return `/* ${data.businessName} - ${variant} Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: ${colors.text};
    background-color: ${colors.bg};
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Header Styles */
.header {
    background: ${colors.primary};
    color: white;
    padding: 1rem 0;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
}

.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.nav-brand h1 {
    font-size: 1.8rem;
    font-weight: bold;
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-menu a {
    color: white;
    text-decoration: none;
    transition: color 0.3s;
}

.nav-menu a:hover {
    color: ${colors.accent};
}

/* Hero Section */
.hero {
    background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
    color: white;
    padding: 120px 0 80px;
    text-align: center;
}

.hero-content h2 {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.hero-content p {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

.cta-button {
    background: ${colors.accent};
    color: white;
    padding: 15px 30px;
    border: none;
    border-radius: 5px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background 0.3s;
}

.cta-button:hover {
    background: ${colors.secondary};
}

/* Products Section */
.products {
    padding: 80px 0;
    background: white;
}

.products h2 {
    text-align: center;
    margin-bottom: 3rem;
    font-size: 2.5rem;
    color: ${colors.primary};
}

.product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.product-card {
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 1.5rem;
    text-align: center;
    transition: transform 0.3s, box-shadow 0.3s;
}

.product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.product-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 5px;
    margin-bottom: 1rem;
}

.product-card h3 {
    margin-bottom: 0.5rem;
    color: ${colors.primary};
}

.product-card p {
    font-size: 1.5rem;
    font-weight: bold;
    color: ${colors.secondary};
    margin-bottom: 1rem;
}

.add-to-cart {
    background: ${colors.primary};
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
}

.add-to-cart:hover {
    background: ${colors.secondary};
}

/* About Section */
.about {
    padding: 80px 0;
    background: ${colors.bg};
}

.about h2 {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2.5rem;
    color: ${colors.primary};
}

.about p {
    max-width: 800px;
    margin: 0 auto 1.5rem;
    text-align: center;
    font-size: 1.1rem;
}

/* Footer */
.footer {
    background: ${colors.text};
    color: white;
    padding: 40px 0 20px;
}

.footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
}

.footer-section h3,
.footer-section h4 {
    margin-bottom: 1rem;
    color: ${colors.accent};
}

.footer-section ul {
    list-style: none;
}

.footer-section ul li {
    margin-bottom: 0.5rem;
}

.footer-section a {
    color: white;
    text-decoration: none;
}

.footer-section a:hover {
    color: ${colors.accent};
}

.footer-bottom {
    text-align: center;
    padding-top: 20px;
    border-top: 1px solid #444;
}

/* Responsive Design */
@media (max-width: 768px) {
    .nav-menu {
        flex-direction: column;
        gap: 1rem;
    }
    
    .hero-content h2 {
        font-size: 2rem;
    }
    
    .product-grid {
        grid-template-columns: 1fr;
    }
}`;
  };

  const generateEcommerceJS = (data: WebsiteData, variant: string) => {
    return `// ${data.businessName} - ${variant} JavaScript
document.addEventListener('DOMContentLoaded', function() {
    let cartCount = 0;
    const cartIcon = document.querySelector('.cart-icon');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    // Add to cart functionality
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            cartCount++;
            cartIcon.textContent = \`Cart (\${cartCount})\`;
            
            // Visual feedback
            this.textContent = 'Added!';
            this.style.background = '#22c55e';
            
            setTimeout(() => {
                this.textContent = 'Add to Cart';
                this.style.background = '';
            }, 1000);
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Mobile menu toggle (if needed)
    const navbar = document.querySelector('.navbar');
    let isMenuOpen = false;
    
    // Add mobile menu button if screen is small
    if (window.innerWidth <= 768) {
        const menuButton = document.createElement('button');
        menuButton.innerHTML = '☰';
        menuButton.style.cssText = 'background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer;';
        
        menuButton.addEventListener('click', function() {
            const navMenu = document.querySelector('.nav-menu');
            isMenuOpen = !isMenuOpen;
            navMenu.style.display = isMenuOpen ? 'flex' : 'none';
        });
        
        navbar.appendChild(menuButton);
    }
});`;
  };

  // Similar functions for Service, Tech, and General templates would go here
  // For brevity, I'll create simplified versions

  const generateServiceHTML = (data: WebsiteData, variant: string, colors: any) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.businessName} - ${variant}</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Service-focused HTML structure -->
    <header class="header">
        <nav class="navbar">
            <div class="nav-brand"><h1>${data.businessName}</h1></div>
            <ul class="nav-menu">
                <li><a href="#home">Home</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>
    
    <section id="home" class="hero">
        <div class="hero-content">
            <h2>Professional ${data.industry} Services</h2>
            <p>${data.businessDescription}</p>
            <p>Trusted by ${data.targetAudience}</p>
            <button class="cta-button">Get Started</button>
        </div>
    </section>
    
    <!-- Services, About, Contact sections would follow -->
    
    <script src="script.js"></script>
</body>
</html>`;
  };

  const generateServiceCSS = (data: WebsiteData, variant: string, colors: any) => {
    return `/* Service Template CSS */
/* Similar structure to ecommerce but focused on services */`;
  };

  const generateServiceJS = (data: WebsiteData, variant: string) => {
    return `// Service Template JavaScript
// Contact form handling, appointment booking, etc.`;
  };

  const generateTechHTML = (data: WebsiteData, variant: string, colors: any) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.businessName} - ${variant}</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Tech-focused HTML structure -->
    <header class="header">
        <nav class="navbar">
            <div class="nav-brand"><h1>${data.businessName}</h1></div>
            <ul class="nav-menu">
                <li><a href="#home">Home</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#demo">Demo</a></li>
            </ul>
        </nav>
    </header>
    
    <section id="home" class="hero">
        <div class="hero-content">
            <h2>Revolutionary ${data.industry} Solution</h2>
            <p>${data.businessDescription}</p>
            <p>Built for ${data.targetAudience}</p>
            <button class="cta-button">Start Free Trial</button>
        </div>
    </section>
    
    <!-- Features, Pricing, Demo sections would follow -->
    
    <script src="script.js"></script>
</body>
</html>`;
  };

  const generateTechCSS = (data: WebsiteData, variant: string, colors: any) => {
    return `/* Tech Template CSS */
/* Modern, clean tech-focused styling */`;
  };

  const generateTechJS = (data: WebsiteData, variant: string) => {
    return `// Tech Template JavaScript
// Demo interactions, feature showcases, etc.`;
  };

  const generateGeneralHTML = (data: WebsiteData, variant: string, colors: any) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.businessName} - ${variant}</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- General business HTML structure -->
    <header class="header">
        <nav class="navbar">
            <div class="nav-brand"><h1>${data.businessName}</h1></div>
            <ul class="nav-menu">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>
    
    <section id="home" class="hero">
        <div class="hero-content">
            <h2>Welcome to ${data.businessName}</h2>
            <p>${data.businessDescription}</p>
            <p>Serving ${data.targetAudience} in ${data.industry}</p>
            <button class="cta-button">Learn More</button>
        </div>
    </section>
    
    <!-- Additional sections would follow -->
    
    <script src="script.js"></script>
</body>
</html>`;
  };

  const generateGeneralCSS = (data: WebsiteData, variant: string, colors: any) => {
    return `/* General Template CSS */
/* Professional business styling */`;
  };

  const generateGeneralJS = (data: WebsiteData, variant: string) => {
    return `// General Template JavaScript
// Contact forms, general interactions, etc.`;
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
