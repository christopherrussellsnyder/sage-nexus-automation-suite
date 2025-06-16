
// Enhanced Website Data Interface
export interface EnhancedWebsiteData {
  businessName: string;
  businessDescription: string;
  businessType: 'ecommerce' | 'service' | 'agency' | 'other';
  industry: string;
  targetAudience: string;
  
  // Contact Information
  contactInfo: {
    email: string;
    phone: string;
    address: string;
    businessHours: string;
  };
  
  // Products (for ecommerce)
  products: Array<{
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
    variants: Array<{
      name: string;
      price: number;
      inStock: boolean;
    }>;
  }>;
  
  // Services (for service/agency businesses)
  services: Array<{
    name: string;
    description: string;
    price: number;
    duration?: string;
    features: string[];
  }>;
  
  // Business Features
  logoUrl?: string;
  colorScheme: string;
  calendlyLink?: string;
  
  // Content
  reviews: Array<{
    customerName: string;
    rating: number;
    review: string;
    businessName?: string;
  }>;
  
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  
  // Payment & Shipping (for ecommerce)
  paymentMethods: string[];
  shippingInfo?: {
    methods: string[];
    freeShippingThreshold?: number;
    shippingZones: string[];
  };
  
  // Policy Requirements
  needsPrivacyPolicy: boolean;
  needsTermsOfService: boolean;
  needsRefundPolicy: boolean;
  needsShippingPolicy: boolean;
}

// Enhanced Template Interface
export interface EnhancedTemplate {
  id: number;
  name: string;
  description: string;
  preview: string;
  files: {
    [filename: string]: string;
  };
}

// Content structure for template generation
interface ContentStructure {
  headline: string;
  subheadline: string;
  ctaPrimary: string;
  ctaSecondary: string;
  aboutTitle: string;
  aboutContent: string;
  features: Array<{
    title: string;
    description: string;
    benefit: string;
  }>;
  testimonials: Array<{
    name: string;
    company: string;
    quote: string;
  }>;
  finalCta: string;
  closingContent: string;
}

// Generate enhanced templates based on business data
export const generateEnhancedTemplates = (data: EnhancedWebsiteData): EnhancedTemplate[] => {
  console.log('Generating enhanced templates for:', data.businessName);
  
  const templates: EnhancedTemplate[] = [];
  
  // Generate 3 different template styles
  for (let i = 1; i <= 3; i++) {
    const template = createEnhancedTemplate(data, i);
    templates.push(template);
  }
  
  return templates;
};

// Create individual enhanced template
const createEnhancedTemplate = (data: EnhancedWebsiteData, templateId: number): EnhancedTemplate => {
  const templateStyles = {
    1: { name: 'Modern Business', description: 'Clean, professional design focused on conversions' },
    2: { name: 'Creative Agency', description: 'Bold, modern layout with creative elements' },
    3: { name: 'Premium Executive', description: 'Elegant, luxury-focused design for premium businesses' }
  };
  
  const style = templateStyles[templateId as keyof typeof templateStyles];
  const content = generateContentStructure(data, templateId);
  
  // Enhanced modern CSS with Lovable design principles
  const modernCSS = `
    /* Lovable Design System - Clean & Modern */
    :root {
      --primary: #1a1a1a;
      --primary-foreground: #ffffff;
      --secondary: #f8fafc;
      --accent: #3b82f6;
      --muted: #64748b;
      --background: #ffffff;
      --foreground: #0f172a;
      --border: #e2e8f0;
      --radius: 0.75rem;
      --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
      --shadow-lg: 0 20px 25px -5px rgb(0 0 0 / 0.1);
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: var(--foreground);
      background: var(--background);
      -webkit-font-smoothing: antialiased;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }
    
    @media (min-width: 640px) {
      .container { padding: 0 2rem; }
    }
    
    /* Header */
    .header {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border);
      padding: 1rem 0;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
    }
    
    .nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .logo {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary);
    }
    
    .nav-links {
      display: none;
      gap: 2rem;
      list-style: none;
    }
    
    @media (min-width: 768px) {
      .nav-links { display: flex; }
    }
    
    .nav-links a {
      text-decoration: none;
      color: var(--muted);
      font-weight: 500;
      transition: color 0.2s ease;
    }
    
    .nav-links a:hover {
      color: var(--primary);
    }
    
    /* Buttons */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius);
      font-size: 0.875rem;
      font-weight: 600;
      transition: all 0.2s ease;
      cursor: pointer;
      border: none;
      text-decoration: none;
      padding: 0.75rem 1.5rem;
    }
    
    .btn-primary {
      background: var(--primary);
      color: var(--primary-foreground);
      box-shadow: var(--shadow);
    }
    
    .btn-primary:hover {
      background: rgba(26, 26, 26, 0.9);
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
    }
    
    .btn-secondary {
      background: transparent;
      color: var(--primary);
      border: 1px solid var(--border);
    }
    
    .btn-secondary:hover {
      background: var(--secondary);
    }
    
    /* Hero Section */
    .hero {
      padding: 8rem 0 4rem;
      text-align: center;
      background: linear-gradient(135deg, var(--background) 0%, var(--secondary) 100%);
    }
    
    .hero h1 {
      font-size: 3rem;
      font-weight: 800;
      margin-bottom: 1.5rem;
      color: var(--primary);
      line-height: 1.1;
    }
    
    @media (max-width: 768px) {
      .hero h1 { font-size: 2rem; }
    }
    
    .hero p {
      font-size: 1.25rem;
      color: var(--muted);
      margin-bottom: 2rem;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }
    
    .hero-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 3rem;
    }
    
    /* Sections */
    .section {
      padding: 4rem 0;
    }
    
    .section-alternate {
      background: var(--secondary);
    }
    
    .section-header {
      text-align: center;
      margin-bottom: 3rem;
    }
    
    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: var(--primary);
    }
    
    .section-description {
      font-size: 1.125rem;
      color: var(--muted);
      max-width: 600px;
      margin: 0 auto;
    }
    
    /* Grid */
    .grid {
      display: grid;
      gap: 2rem;
    }
    
    .grid-3 {
      grid-template-columns: 1fr;
    }
    
    @media (min-width: 640px) {
      .grid-3 { grid-template-columns: repeat(2, 1fr); }
    }
    
    @media (min-width: 1024px) {
      .grid-3 { grid-template-columns: repeat(3, 1fr); }
    }
    
    /* Cards */
    .card {
      background: var(--background);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 2rem;
      box-shadow: var(--shadow);
      transition: all 0.3s ease;
    }
    
    .card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
    }
    
    .card h3 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: var(--primary);
    }
    
    .card p {
      color: var(--muted);
      margin-bottom: 1.5rem;
    }
    
    /* Footer */
    .footer {
      background: var(--primary);
      color: var(--primary-foreground);
      padding: 3rem 0 2rem;
      text-align: center;
    }
    
    /* Animations */
    .fade-in {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.6s ease;
    }
    
    .fade-in.visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    /* Mobile responsiveness */
    @media (max-width: 767px) {
      .hero { padding: 6rem 0 3rem; }
      .section { padding: 3rem 0; }
      .section-title { font-size: 2rem; }
      .hero-actions { flex-direction: column; align-items: center; }
      .btn { width: 100%; max-width: 280px; }
    }
  `;
  
  // Generate complete HTML with integrated business data
  const completeHTML = generateCompleteHTML(data, content, modernCSS, style.name);
  
  return {
    id: templateId,
    name: style.name,
    description: style.description,
    preview: completeHTML,
    files: {
      'index.html': completeHTML,
      'styles.css': modernCSS,
      'script.js': generateJavaScript()
    }
  };
};

// Generate content structure based on business data
const generateContentStructure = (data: EnhancedWebsiteData, templateId: number): ContentStructure => {
  const businessType = data.businessType;
  
  return {
    headline: `${data.businessName} - ${businessType === 'ecommerce' ? 'Premium Products' : 'Professional Services'}`,
    subheadline: data.businessDescription,
    ctaPrimary: businessType === 'ecommerce' ? 'Shop Now' : (data.calendlyLink ? 'Book Consultation' : 'Get Started'),
    ctaSecondary: 'Learn More',
    aboutTitle: `Why Choose ${data.businessName}?`,
    aboutContent: `We specialize in delivering exceptional ${businessType === 'ecommerce' ? 'products' : 'services'} to ${data.targetAudience} in the ${data.industry} industry.`,
    features: [
      {
        title: 'Quality Guaranteed',
        description: businessType === 'ecommerce' ? 'Premium products with warranty' : 'Professional service delivery',
        benefit: 'Peace of mind with every purchase'
      },
      {
        title: 'Expert Support',
        description: '24/7 customer service',
        benefit: 'Always here when you need us'
      },
      {
        title: 'Fast Delivery',
        description: businessType === 'ecommerce' ? 'Quick shipping nationwide' : 'Rapid project completion',
        benefit: 'Get results when you need them'
      }
    ],
    testimonials: data.reviews.slice(0, 2).map(review => ({
      name: review.customerName,
      company: review.businessName || 'Satisfied Customer',
      quote: review.review
    })),
    finalCta: businessType === 'ecommerce' ? 'Start Shopping' : 'Get Started Today',
    closingContent: `Ready to experience the ${data.businessName} difference? Join hundreds of satisfied ${data.targetAudience}.`
  };
};

// Generate complete HTML document
const generateCompleteHTML = (data: EnhancedWebsiteData, content: ContentStructure, css: string, templateName: string): string => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.businessName} - ${templateName}</title>
    <meta name="description" content="${data.businessDescription}">
    <style>${css}</style>
</head>
<body>
    <header class="header">
        <div class="container">
            <nav class="nav">
                <div class="logo">
                    ${data.logoUrl ? `<img src="${data.logoUrl}" alt="${data.businessName}" style="height: 40px;">` : data.businessName}
                </div>
                <ul class="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    ${data.businessType === 'ecommerce' && data.products.length > 0 ? '<li><a href="#products">Products</a></li>' : ''}
                    ${(data.businessType === 'service' || data.businessType === 'agency') && data.services.length > 0 ? '<li><a href="#services">Services</a></li>' : ''}
                    ${data.reviews.length > 0 ? '<li><a href="#reviews">Reviews</a></li>' : ''}
                    ${data.faqs.length > 0 ? '<li><a href="#faq">FAQ</a></li>' : ''}
                    <li><a href="#contact">Contact</a></li>
                </ul>
                <div>
                    <a href="#contact" class="btn btn-primary">${content.ctaPrimary}</a>
                </div>
            </nav>
        </div>
    </header>

    <main>
        <section class="hero" id="home">
            <div class="container">
                <div class="fade-in">
                    <h1>${content.headline}</h1>
                    <p>${content.subheadline}</p>
                    <div class="hero-actions">
                        <a href="#contact" class="btn btn-primary">${content.ctaPrimary}</a>
                        <a href="#about" class="btn btn-secondary">${content.ctaSecondary}</a>
                    </div>
                </div>
            </div>
        </section>

        <section class="section" id="about">
            <div class="container">
                <div class="section-header fade-in">
                    <h2 class="section-title">${content.aboutTitle}</h2>
                    <p class="section-description">${content.aboutContent}</p>
                </div>
                <div class="grid grid-3">
                    ${content.features.map(feature => `
                        <div class="card fade-in">
                            <h3>${feature.title}</h3>
                            <p>${feature.description}</p>
                            <div style="color: var(--accent); font-weight: 600;">✓ ${feature.benefit}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        ${data.businessType === 'ecommerce' && data.products.length > 0 ? generateProductsSection(data.products) : ''}
        ${(data.businessType === 'service' || data.businessType === 'agency') && data.services.length > 0 ? generateServicesSection(data.services, data.calendlyLink) : ''}
        ${data.reviews.length > 0 ? generateReviewsSection(data.reviews) : ''}
        ${data.faqs.length > 0 ? generateFAQSection(data.faqs) : ''}

        <section class="section section-alternate" id="contact">
            <div class="container">
                <div class="section-header fade-in">
                    <h2 class="section-title">Get In Touch</h2>
                    <p class="section-description">${content.closingContent}</p>
                </div>
                <div class="grid" style="grid-template-columns: 1fr; max-width: 600px; margin: 0 auto;">
                    <div class="card fade-in">
                        <h3>Contact Information</h3>
                        <div style="space-y: 1rem;">
                            ${data.contactInfo.email ? `<p><strong>Email:</strong> ${data.contactInfo.email}</p>` : ''}
                            ${data.contactInfo.phone ? `<p><strong>Phone:</strong> ${data.contactInfo.phone}</p>` : ''}
                            ${data.contactInfo.address ? `<p><strong>Address:</strong> ${data.contactInfo.address}</p>` : ''}
                            ${data.contactInfo.businessHours ? `<p><strong>Hours:</strong> ${data.contactInfo.businessHours}</p>` : ''}
                        </div>
                        ${data.calendlyLink ? `
                            <div style="margin-top: 1.5rem;">
                                <a href="${data.calendlyLink}" class="btn btn-primary" target="_blank">Schedule Meeting</a>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 ${data.businessName}. All rights reserved.</p>
            <div style="margin-top: 1rem; display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap;">
                ${data.needsPrivacyPolicy ? '<a href="#privacy" style="color: var(--primary-foreground); opacity: 0.8;">Privacy Policy</a>' : ''}
                ${data.needsTermsOfService ? '<a href="#terms" style="color: var(--primary-foreground); opacity: 0.8;">Terms of Service</a>' : ''}
                ${data.needsRefundPolicy ? '<a href="#refund" style="color: var(--primary-foreground); opacity: 0.8;">Refund Policy</a>' : ''}
                ${data.needsShippingPolicy ? '<a href="#shipping" style="color: var(--primary-foreground); opacity: 0.8;">Shipping Policy</a>' : ''}
            </div>
        </div>
    </footer>

    <script>${generateJavaScript()}</script>
</body>
</html>`;
};

// Generate products section for ecommerce
const generateProductsSection = (products: EnhancedWebsiteData['products']): string => {
  return `
    <section class="section" id="products">
        <div class="container">
            <div class="section-header fade-in">
                <h2 class="section-title">Our Products</h2>
                <p class="section-description">Discover our premium product collection</p>
            </div>
            <div class="grid grid-3">
                ${products.slice(0, 6).map(product => `
                    <div class="card fade-in">
                        ${product.imageUrl ? `<img src="${product.imageUrl}" alt="${product.name}" style="width: 100%; height: 200px; object-fit: cover; border-radius: var(--radius); margin-bottom: 1rem;">` : ''}
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
                            <span style="font-size: 1.25rem; font-weight: 700; color: var(--accent);">$${product.price}</span>
                            <button class="btn btn-primary" onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
                        </div>
                        ${product.variants.length > 0 ? `
                            <div style="margin-top: 1rem;">
                                <select style="width: 100%; padding: 0.5rem; border: 1px solid var(--border); border-radius: var(--radius);">
                                    ${product.variants.map(variant => `<option value="${variant.name}">${variant.name} - $${variant.price}</option>`).join('')}
                                </select>
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
  `;
};

// Generate services section for service/agency businesses
const generateServicesSection = (services: EnhancedWebsiteData['services'], calendlyLink?: string): string => {
  return `
    <section class="section" id="services">
        <div class="container">
            <div class="section-header fade-in">
                <h2 class="section-title">Our Services</h2>
                <p class="section-description">Professional services tailored to your needs</p>
            </div>
            <div class="grid grid-3">
                ${services.map(service => `
                    <div class="card fade-in">
                        <h3>${service.name}</h3>
                        <p>${service.description}</p>
                        ${service.features.length > 0 ? `
                            <ul style="margin: 1rem 0; padding-left: 1rem;">
                                ${service.features.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                        ` : ''}
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
                            <span style="font-size: 1.25rem; font-weight: 700; color: var(--accent);">$${service.price}</span>
                            ${calendlyLink ? 
                                `<a href="${calendlyLink}" class="btn btn-primary" target="_blank">Book Now</a>` :
                                '<button class="btn btn-primary">Get Started</button>'
                            }
                        </div>
                        ${service.duration ? `<p style="margin-top: 0.5rem; color: var(--muted); font-size: 0.875rem;">Duration: ${service.duration}</p>` : ''}
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
  `;
};

// Generate reviews section
const generateReviewsSection = (reviews: EnhancedWebsiteData['reviews']): string => {
  return `
    <section class="section section-alternate" id="reviews">
        <div class="container">
            <div class="section-header fade-in">
                <h2 class="section-title">What Our Customers Say</h2>
                <p class="section-description">Real feedback from real customers</p>
            </div>
            <div class="grid grid-3">
                ${reviews.slice(0, 6).map(review => `
                    <div class="card fade-in">
                        <div style="display: flex; margin-bottom: 1rem;">
                            ${Array.from({length: review.rating}, () => '⭐').join('')}
                        </div>
                        <p style="font-style: italic; margin-bottom: 1rem;">"${review.review}"</p>
                        <div>
                            <strong>${review.customerName}</strong>
                            ${review.businessName ? `<br><small style="color: var(--muted);">${review.businessName}</small>` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
  `;
};

// Generate FAQ section
const generateFAQSection = (faqs: EnhancedWebsiteData['faqs']): string => {
  return `
    <section class="section" id="faq">
        <div class="container">
            <div class="section-header fade-in">
                <h2 class="section-title">Frequently Asked Questions</h2>
                <p class="section-description">Find answers to common questions</p>
            </div>
            <div style="max-width: 800px; margin: 0 auto;">
                ${faqs.map((faq, index) => `
                    <div class="card fade-in" style="margin-bottom: 1rem;">
                        <h3 style="cursor: pointer;" onclick="toggleFAQ(${index})">${faq.question} <span id="faq-icon-${index}">+</span></h3>
                        <div id="faq-answer-${index}" style="display: none; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border);">
                            <p>${faq.answer}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
  `;
};

// Generate JavaScript for interactivity
const generateJavaScript = (): string => {
  return `
    // Smooth scrolling
    document.addEventListener('DOMContentLoaded', function() {
        // Fade in animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        });
        
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
        
        // Smooth scroll for nav links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    });
    
    // Shopping cart functionality
    let cart = [];
    
    function addToCart(productName, price) {
        cart.push({ name: productName, price: price });
        alert(productName + ' added to cart! Total items: ' + cart.length);
        updateCartDisplay();
    }
    
    function updateCartDisplay() {
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        console.log('Cart total: $' + total.toFixed(2));
    }
    
    // FAQ toggle functionality
    function toggleFAQ(index) {
        const answer = document.getElementById('faq-answer-' + index);
        const icon = document.getElementById('faq-icon-' + index);
        
        if (answer.style.display === 'none' || answer.style.display === '') {
            answer.style.display = 'block';
            icon.textContent = '-';
        } else {
            answer.style.display = 'none';
            icon.textContent = '+';
        }
    }
  `;
};
