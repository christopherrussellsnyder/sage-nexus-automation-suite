export interface EnhancedWebsiteData {
  businessName: string;
  businessDescription: string;
  industry: string;
  targetAudience: string;
  businessType: 'ecommerce' | 'service' | 'agency' | 'other';
  logoUrl?: string;
  colorScheme?: string;
  products: Array<{
    name: string;
    price: number;
    description: string;
    imageUrl?: string;
  }>;
  services: Array<{
    name: string;
    price: number;
    description: string;
    duration?: string;
  }>;
  reviews: Array<{
    name: string;
    rating: number;
    text: string;
    date?: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  contactInfo: {
    email: string;
    phone: string;
    address?: string;
    businessHours?: string;
  };
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  calendlyLink?: string;
  needsPrivacyPolicy: boolean;
  needsTermsOfService: boolean;
  needsRefundPolicy: boolean;
  needsShippingPolicy: boolean;
}

export interface EnhancedTemplate {
  id: number;
  name: string;
  description: string;
  preview: string;
  files: {
    [filename: string]: string;
  };
}

const generateLovableModernTemplates = (data: EnhancedWebsiteData): EnhancedTemplate[] => {
  // Modern Lovable-inspired design system with clean aesthetics
  const modernLovableStyles = `
    /* Lovable Design System - Clean & Modern */
    :root {
      /* Color System - Minimal & Professional */
      --primary: hsl(220, 13%, 13%);
      --primary-foreground: hsl(0, 0%, 98%);
      --secondary: hsl(220, 14%, 96%);
      --secondary-foreground: hsl(220, 9%, 46%);
      --muted: hsl(220, 14%, 96%);
      --muted-foreground: hsl(220, 9%, 46%);
      --accent: hsl(220, 14%, 96%);
      --accent-foreground: hsl(220, 9%, 15%);
      --background: hsl(0, 0%, 100%);
      --foreground: hsl(220, 9%, 15%);
      --border: hsl(220, 13%, 91%);
      --input: hsl(220, 13%, 91%);
      --ring: hsl(220, 13%, 13%);
      --radius: 0.5rem;
      
      /* Typography Scale */
      --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      --font-mono: Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      
      /* Spacing Scale - Strategic Whitespace */
      --space-1: 0.25rem;
      --space-2: 0.5rem;
      --space-3: 0.75rem;
      --space-4: 1rem;
      --space-6: 1.5rem;
      --space-8: 2rem;
      --space-12: 3rem;
      --space-16: 4rem;
      --space-20: 5rem;
      --space-24: 6rem;
      --space-32: 8rem;
      
      /* Shadows - Subtle & Modern */
      --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
      --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
      --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
      --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: var(--font-sans);
      line-height: 1.6;
      color: var(--foreground);
      background: var(--background);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    /* Mobile-First Container System */
    .container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 var(--space-4);
    }

    @media (min-width: 640px) {
      .container { padding: 0 var(--space-6); }
    }

    @media (min-width: 1024px) {
      .container { padding: 0 var(--space-8); }
    }

    /* Modern Header with Clean Navigation */
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 50;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid var(--border);
      transition: all 0.2s ease;
    }

    .nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 64px;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary);
      text-decoration: none;
    }

    .nav-links {
      display: none;
      align-items: center;
      gap: var(--space-8);
      list-style: none;
    }

    @media (min-width: 768px) {
      .nav-links { display: flex; }
    }

    .nav-links a {
      color: var(--muted-foreground);
      text-decoration: none;
      font-weight: 500;
      font-size: 0.875rem;
      transition: color 0.2s ease;
      position: relative;
    }

    .nav-links a:hover {
      color: var(--foreground);
    }

    /* Modern Button System */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius);
      font-size: 0.875rem;
      font-weight: 500;
      transition: all 0.2s ease;
      cursor: pointer;
      border: none;
      text-decoration: none;
      white-space: nowrap;
      outline: none;
    }

    .btn-primary {
      background: var(--primary);
      color: var(--primary-foreground);
      padding: var(--space-3) var(--space-6);
      box-shadow: var(--shadow-sm);
    }

    .btn-primary:hover {
      background: hsl(220, 13%, 20%);
      box-shadow: var(--shadow);
    }

    .btn-secondary {
      background: var(--secondary);
      color: var(--secondary-foreground);
      padding: var(--space-3) var(--space-6);
      border: 1px solid var(--border);
    }

    .btn-secondary:hover {
      background: hsl(220, 14%, 93%);
    }

    .btn-ghost {
      color: var(--foreground);
      padding: var(--space-3) var(--space-4);
    }

    .btn-ghost:hover {
      background: var(--accent);
    }

    /* Hero Section - Clean & Impactful */
    .hero {
      padding: calc(var(--space-32) + 64px) 0 var(--space-32);
      text-align: center;
      background: linear-gradient(to bottom, var(--background), var(--muted));
    }

    .hero-content {
      max-width: 768px;
      margin: 0 auto;
    }

    .hero h1 {
      font-size: clamp(2.5rem, 5vw, 4rem);
      font-weight: 800;
      line-height: 1.1;
      letter-spacing: -0.025em;
      margin-bottom: var(--space-6);
      color: var(--primary);
    }

    .hero p {
      font-size: 1.25rem;
      color: var(--muted-foreground);
      margin-bottom: var(--space-8);
      line-height: 1.6;
    }

    .hero-actions {
      display: flex;
      gap: var(--space-4);
      justify-content: center;
      flex-wrap: wrap;
    }

    /* Clean Section System */
    .section {
      padding: var(--space-24) 0;
    }

    .section-header {
      text-align: center;
      margin-bottom: var(--space-16);
      max-width: 640px;
      margin-left: auto;
      margin-right: auto;
    }

    .section-title {
      font-size: clamp(2rem, 4vw, 2.5rem);
      font-weight: 700;
      margin-bottom: var(--space-4);
      color: var(--primary);
      line-height: 1.2;
    }

    .section-description {
      font-size: 1.125rem;
      color: var(--muted-foreground);
      line-height: 1.6;
    }

    /* Modern Grid System */
    .grid {
      display: grid;
      gap: var(--space-8);
    }

    .grid-1 { grid-template-columns: 1fr; }
    
    @media (min-width: 640px) {
      .grid-2 { grid-template-columns: repeat(2, 1fr); }
    }
    
    @media (min-width: 1024px) {
      .grid-3 { grid-template-columns: repeat(3, 1fr); }
      .grid-4 { grid-template-columns: repeat(4, 1fr); }
    }

    /* Clean Card Component */
    .card {
      background: var(--background);
      border: 1px solid var(--border);
      border-radius: calc(var(--radius) * 1.5);
      padding: var(--space-8);
      box-shadow: var(--shadow-sm);
      transition: all 0.2s ease;
    }

    .card:hover {
      box-shadow: var(--shadow-md);
      transform: translateY(-2px);
    }

    .card h3 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: var(--space-3);
      color: var(--primary);
    }

    .card p {
      color: var(--muted-foreground);
      line-height: 1.6;
      margin-bottom: var(--space-4);
    }

    /* Modern Forms */
    .form-group {
      margin-bottom: var(--space-6);
    }

    .form-label {
      display: block;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--foreground);
      margin-bottom: var(--space-2);
    }

    .form-input {
      width: 100%;
      padding: var(--space-3) var(--space-4);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      background: var(--background);
      font-size: 0.875rem;
      transition: all 0.2s ease;
    }

    .form-input:focus {
      outline: none;
      border-color: var(--ring);
      box-shadow: 0 0 0 3px hsl(220, 13%, 13%, 0.1);
    }

    /* Clean Footer */
    .footer {
      background: var(--muted);
      padding: var(--space-16) 0 var(--space-8);
      text-align: center;
      border-top: 1px solid var(--border);
    }

    .footer p {
      color: var(--muted-foreground);
      font-size: 0.875rem;
    }

    /* Responsive Typography */
    @media (max-width: 640px) {
      .hero { padding: calc(var(--space-20) + 64px) 0 var(--space-20); }
      .section { padding: var(--space-16) 0; }
      .hero-actions { flex-direction: column; align-items: center; }
      .btn { width: 100%; max-width: 280px; }
    }

    /* Smooth Animations */
    .fade-in {
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.6s ease;
    }

    .fade-in.visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* Enhanced Product/Service Cards */
    .product-card, .service-card {
      background: var(--background);
      border: 1px solid var(--border);
      border-radius: calc(var(--radius) * 1.5);
      overflow: hidden;
      box-shadow: var(--shadow-sm);
      transition: all 0.3s ease;
    }

    .product-card:hover, .service-card:hover {
      box-shadow: var(--shadow-lg);
      transform: translateY(-4px);
    }

    .product-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
      background: var(--muted);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--muted-foreground);
      font-size: 0.875rem;
    }

    .product-content, .service-content {
      padding: var(--space-6);
    }

    .product-title, .service-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: var(--space-2);
      color: var(--primary);
    }

    .product-price, .service-price {
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--primary);
      margin-bottom: var(--space-4);
    }

    .product-description, .service-description {
      color: var(--muted-foreground);
      font-size: 0.875rem;
      line-height: 1.6;
      margin-bottom: var(--space-4);
    }

    /* Modern Testimonials */
    .testimonial {
      background: var(--background);
      border: 1px solid var(--border);
      border-radius: calc(var(--radius) * 1.5);
      padding: var(--space-8);
      text-align: center;
      position: relative;
      box-shadow: var(--shadow-sm);
    }

    .testimonial-quote {
      font-size: 1.125rem;
      line-height: 1.6;
      color: var(--foreground);
      margin-bottom: var(--space-6);
      font-style: italic;
    }

    .testimonial-author {
      font-weight: 600;
      color: var(--primary);
      margin-bottom: var(--space-1);
    }

    .testimonial-company {
      color: var(--muted-foreground);
      font-size: 0.875rem;
    }

    /* Contact Section */
    .contact-info {
      background: var(--muted);
      padding: var(--space-8);
      border-radius: calc(var(--radius) * 1.5);
      border: 1px solid var(--border);
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      margin-bottom: var(--space-4);
    }

    .contact-item:last-child {
      margin-bottom: 0;
    }

    .contact-icon {
      width: 20px;
      height: 20px;
      color: var(--primary);
    }

    /* FAQ Section */
    .faq-item {
      border: 1px solid var(--border);
      border-radius: var(--radius);
      margin-bottom: var(--space-4);
      overflow: hidden;
    }

    .faq-question {
      padding: var(--space-4) var(--space-6);
      background: var(--muted);
      font-weight: 600;
      color: var(--primary);
      cursor: pointer;
      border: none;
      width: 100%;
      text-align: left;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .faq-answer {
      padding: var(--space-4) var(--space-6);
      color: var(--muted-foreground);
      line-height: 1.6;
      display: none;
    }

    .faq-item.active .faq-answer {
      display: block;
    }

    /* Reviews Section */
    .review-card {
      background: var(--background);
      border: 1px solid var(--border);
      border-radius: calc(var(--radius) * 1.5);
      padding: var(--space-6);
      box-shadow: var(--shadow-sm);
    }

    .review-rating {
      display: flex;
      gap: var(--space-1);
      margin-bottom: var(--space-3);
    }

    .review-star {
      color: #fbbf24;
      width: 16px;
      height: 16px;
    }

    /* Calendly Integration */
    .calendly-container {
      min-height: 600px;
      border: 1px solid var(--border);
      border-radius: calc(var(--radius) * 1.5);
      overflow: hidden;
      background: var(--muted);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--muted-foreground);
    }
  `;

  const templates: EnhancedTemplate[] = [];
  
  // Generate 3 different template variations with Lovable design principles
  for (let i = 1; i <= 3; i++) {
    const template = generateModernTemplate(data, i, modernLovableStyles);
    templates.push(template);
  }

  return templates;
};

const generateModernTemplate = (data: EnhancedWebsiteData, templateId: number, styles: string): EnhancedTemplate => {
  const templateVariations = {
    1: { name: 'Modern Professional', theme: 'Clean corporate design with strategic whitespace' },
    2: { name: 'Creative Modern', theme: 'Bold typography with subtle animations' },
    3: { name: 'Minimal Elite', theme: 'Ultra-clean minimal design with focus on content' }
  };

  const currentTemplate = templateVariations[templateId as keyof typeof templateVariations];
  
  // Generate complete HTML with all integrated data
  const completeHTML = generateCompleteHTML(data, currentTemplate, styles);
  
  return {
    id: templateId,
    name: currentTemplate.name,
    description: `${currentTemplate.theme} - Fully responsive with integrated business data`,
    preview: completeHTML,
    files: {
      'index.html': completeHTML,
      'styles.css': styles,
      'contact.html': generateContactPage(data, styles),
      'about.html': generateAboutPage(data, styles),
      ...(data.businessType === 'ecommerce' && data.products.length > 0 && {
        'products.html': generateProductsPage(data, styles),
        'cart.js': generateCartFunctionality()
      }),
      ...(data.businessType === 'service' && data.services.length > 0 && {
        'services.html': generateServicesPage(data, styles)
      }),
      ...(data.needsPrivacyPolicy && {
        'privacy-policy.html': generatePrivacyPolicy(data, styles)
      }),
      ...(data.needsTermsOfService && {
        'terms-of-service.html': generateTermsOfService(data, styles)
      }),
      ...(data.needsRefundPolicy && {
        'refund-policy.html': generateRefundPolicy(data, styles)
      }),
      ...(data.needsShippingPolicy && {
        'shipping-policy.html': generateShippingPolicy(data, styles)
      })
    }
  };
};

const generateCompleteHTML = (data: EnhancedWebsiteData, template: { name: string, theme: string }, styles: string): string => {
  const navLinks = [
    { name: 'Home', url: 'index.html' },
    { name: 'About', url: 'about.html' },
    ...(data.businessType === 'ecommerce' && data.products.length > 0 ? [{ name: 'Products', url: 'products.html' }] : []),
    ...(data.businessType === 'service' && data.services.length > 0 ? [{ name: 'Services', url: 'services.html' }] : []),
    { name: 'Contact', url: 'contact.html' }
  ];

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.businessName} - ${template.name}</title>
  <meta name="description" content="${data.businessDescription}">
  <style>${styles}</style>
</head>
<body>
  <header class="header">
    <div class="container">
      <nav class="nav">
        <a href="index.html" class="logo">${data.businessName}</a>
        <ul class="nav-links">
          ${navLinks.map(link => `<li><a href="${link.url}">${link.name}</a></li>`).join('')}
        </ul>
        <a href="contact.html" class="btn btn-primary">Get in Touch</a>
      </nav>
    </div>
  </header>

  <main>
    <section class="hero">
      <div class="container">
        <div class="hero-content fade-in">
          <h1>Welcome to ${data.businessName}</h1>
          <p>${data.businessDescription}</p>
          <div class="hero-actions">
            ${data.businessType === 'ecommerce' && data.products.length > 0 ? 
              `<a href="products.html" class="btn btn-primary">View Products</a>` : 
              data.businessType === 'service' && data.services.length > 0 ? 
              `<a href="services.html" class="btn btn-primary">Our Services</a>` : 
              `<a href="contact.html" class="btn btn-primary">Get Started</a>`}
            <a href="about.html" class="btn btn-secondary">Learn More</a>
          </div>
        </div>
      </div>
    </section>

    ${data.products.length > 0 ? generateFeaturedProductsSection(data) : ''}
    ${data.services.length > 0 ? generateFeaturedServicesSection(data) : ''}
    ${data.reviews.length > 0 ? generateTestimonialsSection(data) : ''}
    ${data.faqs.length > 0 ? generateFAQSection(data) : ''}
    
    <section class="section">
      <div class="container">
        <div class="section-header fade-in">
          <h2 class="section-title">Why Choose ${data.businessName}?</h2>
          <p class="section-description">We're committed to delivering exceptional results for ${data.targetAudience} in the ${data.industry} industry.</p>
        </div>
        <div class="grid grid-3">
          <div class="card fade-in">
            <h3>Industry Expertise</h3>
            <p>Deep understanding of ${data.industry} challenges and opportunities.</p>
          </div>
          <div class="card fade-in">
            <h3>Customer Focus</h3>
            <p>Dedicated to providing exceptional service to ${data.targetAudience}.</p>
          </div>
          <div class="card fade-in">
            <h3>Quality Assurance</h3>
            <p>Committed to delivering the highest quality in everything we do.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section" style="background: var(--muted);">
      <div class="container">
        <div class="section-header fade-in">
          <h2 class="section-title">Ready to Get Started?</h2>
          <p class="section-description">Contact us today to learn how we can help you achieve your goals.</p>
        </div>
        <div class="text-center">
          <a href="contact.html" class="btn btn-primary">Contact Us Now</a>
        </div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container">
      <div style="margin-bottom: var(--space-8);">
        <h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: var(--space-4);">${data.businessName}</h3>
        <p style="max-width: 400px; margin: 0 auto; margin-bottom: var(--space-6);">${data.businessDescription}</p>
        
        <div style="display: flex; justify-content: center; gap: var(--space-4); margin-bottom: var(--space-6);">
          ${data.socialMedia?.facebook ? `<a href="${data.socialMedia.facebook}" class="btn btn-ghost">Facebook</a>` : ''}
          ${data.socialMedia?.instagram ? `<a href="${data.socialMedia.instagram}" class="btn btn-ghost">Instagram</a>` : ''}
          ${data.socialMedia?.twitter ? `<a href="${data.socialMedia.twitter}" class="btn btn-ghost">Twitter</a>` : ''}
          ${data.socialMedia?.linkedin ? `<a href="${data.socialMedia.linkedin}" class="btn btn-ghost">LinkedIn</a>` : ''}
        </div>
      </div>
      
      <div style="display: flex; justify-content: center; gap: var(--space-6); flex-wrap: wrap; margin-bottom: var(--space-8);">
        ${navLinks.map(link => `<a href="${link.url}" style="color: var(--muted-foreground); text-decoration: none; font-size: 0.875rem;">${link.name}</a>`).join('')}
        ${data.needsPrivacyPolicy ? `<a href="privacy-policy.html" style="color: var(--muted-foreground); text-decoration: none; font-size: 0.875rem;">Privacy Policy</a>` : ''}
        ${data.needsTermsOfService ? `<a href="terms-of-service.html" style="color: var(--muted-foreground); text-decoration: none; font-size: 0.875rem;">Terms of Service</a>` : ''}
      </div>
      
      <p>&copy; ${new Date().getFullYear()} ${data.businessName}. All rights reserved.</p>
    </div>
  </footer>

  <script>
    // Intersection Observer for animations
    document.addEventListener('DOMContentLoaded', function() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.1 });

      // Observe all fade-in elements
      document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
      });

      // FAQ functionality if present
      const faqItems = document.querySelectorAll('.faq-question');
      if (faqItems) {
        faqItems.forEach(item => {
          item.addEventListener('click', () => {
            const parent = item.parentElement;
            parent.classList.toggle('active');
          });
        });
      }
    });
  </script>
</body>
</html>`;
};

const generateFeaturedProductsSection = (data: EnhancedWebsiteData): string => {
  // Display up to 3 featured products
  const featuredProducts = data.products.slice(0, 3);
  
  return `
  <section class="section" style="background: var(--muted);">
    <div class="container">
      <div class="section-header fade-in">
        <h2 class="section-title">Featured Products</h2>
        <p class="section-description">Discover our most popular offerings</p>
      </div>
      <div class="grid grid-3">
        ${featuredProducts.map(product => `
          <div class="product-card fade-in">
            <div class="product-image">
              ${product.imageUrl ? 
                `<img src="${product.imageUrl}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">` : 
                `<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
                  ${product.name.charAt(0)}
                </div>`
              }
            </div>
            <div class="product-content">
              <h3 class="product-title">${product.name}</h3>
              <div class="product-price">$${product.price.toFixed(2)}</div>
              <p class="product-description">${product.description}</p>
              <a href="products.html" class="btn btn-primary">View Details</a>
            </div>
          </div>
        `).join('')}
      </div>
      ${data.products.length > 3 ? 
        `<div class="text-center" style="margin-top: var(--space-12);">
          <a href="products.html" class="btn btn-secondary">View All Products</a>
        </div>` : ''
      }
    </div>
  </section>`;
};

const generateFeaturedServicesSection = (data: EnhancedWebsiteData): string => {
  // Display up to 3 featured services
  const featuredServices = data.services.slice(0, 3);
  
  return `
  <section class="section">
    <div class="container">
      <div class="section-header fade-in">
        <h2 class="section-title">Our Services</h2>
        <p class="section-description">Professional solutions tailored to your needs</p>
      </div>
      <div class="grid grid-3">
        ${featuredServices.map(service => `
          <div class="service-card fade-in">
            <div class="service-content">
              <h3 class="service-title">${service.name}</h3>
              <div class="service-price">$${service.price.toFixed(2)}${service.duration ? ` / ${service.duration}` : ''}</div>
              <p class="service-description">${service.description}</p>
              <a href="services.html" class="btn btn-primary">Learn More</a>
            </div>
          </div>
        `).join('')}
      </div>
      ${data.services.length > 3 ? 
        `<div class="text-center" style="margin-top: var(--space-12);">
          <a href="services.html" class="btn btn-secondary">View All Services</a>
        </div>` : ''
      }
    </div>
  </section>`;
};

const generateTestimonialsSection = (data: EnhancedWebsiteData): string => {
  // Display up to 3 testimonials
  const featuredTestimonials = data.reviews.slice(0, 3);
  
  return `
  <section class="section" style="background: var(--muted);">
    <div class="container">
      <div class="section-header fade-in">
        <h2 class="section-title">What Our Clients Say</h2>
        <p class="section-description">Don't just take our word for it</p>
      </div>
      <div class="grid grid-3">
        ${featuredTestimonials.map(review => `
          <div class="testimonial fade-in">
            <div class="review-rating">
              ${Array(review.rating).fill('★').map(() => 
                `<span class="review-star">★</span>`
              ).join('')}
            </div>
            <p class="testimonial-quote">"${review.text}"</p>
            <div class="testimonial-author">${review.name}</div>
            ${review.date ? `<div class="testimonial-company">${review.date}</div>` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  </section>`;
};

const generateFAQSection = (data: EnhancedWebsiteData): string => {
  // Display up to 5 FAQs
  const featuredFAQs = data.faqs.slice(0, 5);
  
  return `
  <section class="section">
    <div class="container">
      <div class="section-header fade-in">
        <h2 class="section-title">Frequently Asked Questions</h2>
        <p class="section-description">Find answers to common questions about our products and services</p>
      </div>
      <div class="grid grid-1" style="max-width: 800px; margin: 0 auto;">
        ${featuredFAQs.map((faq, index) => `
          <div class="faq-item ${index === 0 ? 'active' : ''} fade-in">
            <button class="faq-question">
              ${faq.question}
              <span style="font-size: 1.25rem;">+</span>
            </button>
            <div class="faq-answer">
              ${faq.answer}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>`;
};

const generateContactPage = (data: EnhancedWebsiteData, styles: string): string => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Us - ${data.businessName}</title>
  <meta name="description" content="Contact ${data.businessName} for inquiries about our products and services.">
  <style>${styles}</style>
</head>
<body>
  <header class="header">
    <div class="container">
      <nav class="nav">
        <a href="index.html" class="logo">${data.businessName}</a>
        <ul class="nav-links">
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About</a></li>
          ${data.businessType === 'ecommerce' && data.products.length > 0 ? 
            `<li><a href="products.html">Products</a></li>` : ''}
          ${data.businessType === 'service' && data.services.length > 0 ? 
            `<li><a href="services.html">Services</a></li>` : ''}
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main>
    <section class="section" style="padding-top: calc(var(--space-24) + 64px);">
      <div class="container">
        <div class="section-header fade-in">
          <h1 class="section-title">Contact Us</h1>
          <p class="section-description">We'd love to hear from you. Get in touch with our team.</p>
        </div>
        
        <div class="grid grid-2" style="gap: var(--space-12);">
          <div class="fade-in">
            <div class="contact-info">
              <h3 style="margin-bottom: var(--space-6);">Contact Information</h3>
              
              <div class="contact-item">
                <span class="contact-icon">📧</span>
                <span>${data.contactInfo.email}</span>
              </div>
              
              <div class="contact-item">
                <span class="contact-icon">📞</span>
                <span>${data.contactInfo.phone}</span>
              </div>
              
              ${data.contactInfo.address ? `
              <div class="contact-item">
                <span class="contact-icon">📍</span>
                <span>${data.contactInfo.address}</span>
              </div>
              ` : ''}
              
              ${data.contactInfo.businessHours ? `
              <div class="contact-item">
                <span class="contact-icon">🕒</span>
                <span>${data.contactInfo.businessHours}</span>
              </div>
              ` : ''}
            </div>
            
            ${data.calendlyLink ? `
            <div style="margin-top: var(--space-8);">
              <h3 style="margin-bottom: var(--space-4);">Book an Appointment</h3>
              <div class="calendly-container">
                <a href="${data.calendlyLink}" target="_blank" class="btn btn-primary">Schedule a Meeting</a>
              </div>
            </div>
            ` : ''}
          </div>
          
          <div class="fade-in">
            <h3 style="margin-bottom: var(--space-6);">Send Us a Message</h3>
            <form>
              <div class="form-group">
                <label for="name" class="form-label">Your Name</label>
                <input type="text" id="name" class="form-input" required>
              </div>
              
              <div class="form-group">
                <label for="email" class="form-label">Email Address</label>
                <input type="email" id="email" class="form-input" required>
              </div>
              
              <div class="form-group">
                <label for="subject" class="form-label">Subject</label>
                <input type="text" id="subject" class="form-input">
              </div>
              
              <div class="form-group">
                <label for="message" class="form-label">Message</label>
                <textarea id="message" class="form-input" rows="5" required></textarea>
              </div>
              
              <button type="submit" class="btn btn-primary">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container">
      <p>&copy; ${new Date().getFullYear()} ${data.businessName}. All rights reserved.</p>
      <div style="display: flex; justify-content: center; gap: var(--space-6); flex-wrap: wrap; margin-top: var(--space-4);">
        <a href="index.html" style="color: var(--muted-foreground); text-decoration: none; font-size: 0.875rem;">Home</a>
        <a href="about.html" style="color: var(--muted-foreground); text-decoration: none; font-size: 0.875rem;">About</a>
        ${data.needsPrivacyPolicy ? `<a href="privacy-policy.html" style="color: var(--muted-foreground); text-decoration: none; font-size: 0.875rem;">Privacy Policy</a>` : ''}
        ${data.needsTermsOfService ? `<a href="terms-of-service.html" style="color: var(--muted-foreground); text-decoration: none; font-size: 0.875rem;">Terms of Service</a>` : ''}
      </div>
    </div>
  </footer>

  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
      });
    });
  </script>
</body>
</html>`;
};

const generateAboutPage = (data: EnhancedWebsiteData, styles: string): string => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>About Us - ${data.businessName}</title>
  <meta name="description" content="Learn more about ${data.businessName} and our mission to serve ${data.targetAudience} in the ${data.industry} industry.">
  <style>${styles}</style>
</head>
<body>
  <header class="header">
    <div class="container">
      <nav class="nav">
        <a href="index.html" class="logo">${data.businessName}</a>
        <ul class="nav-links">
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About</a></li>
          ${data.businessType === 'ecommerce' && data.products.length > 0 ? 
            `<li><a href="products.html">Products</a></li>` : ''}
          ${data.businessType === 'service' && data.services.length > 0 ? 
            `<li><a href="services.html">Services</a></li>` : ''}
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main>
    <section class="section" style="padding-top: calc(var(--space-24) + 64px);">
      <div class="container">
        <div class="section-header fade-in">
          <h1 class="section-title">About ${data.businessName}</h1>
          <p class="section-description">${data.businessDescription}</p>
        </div>
        
        <div class="grid grid-2" style="gap: var(--space-12); align-items: center;">
          <div class="fade-in">
            <h2 style="font-size: 1.75rem; margin-bottom: var(--space-4);">Our Story</h2>
            <p style="margin-bottom: var(--space-4);">
              At ${data.businessName}, we're passionate about serving ${data.targetAudience} in the ${data.industry} industry. 
              Our journey began with a simple mission: to provide exceptional products and services that make a difference.
            </p>
            <p style="margin-bottom: var(--space-4);">
              We understand the unique challenges faced by our customers, and we're committed to delivering solutions that exceed expectations.
              Our team brings years of experience and expertise to every project we undertake.
            </p>
            <p>
              Today, we continue to grow and evolve, but our core values remain the same: quality, integrity, and customer satisfaction.
            </p>
          </div>
          
          <div class="fade-in" style="background: var(--muted); border-radius: calc(var(--radius) * 1.5); height: 300px; display: flex; align-items: center; justify-content: center;">
            ${data.logoUrl ? 
              `<img src="${data.logoUrl}" alt="${data.businessName} logo" style="max-width: 80%; max-height: 80%;">` : 
              `<div style="font-size: 2rem; font-weight: 700;">${data.businessName}</div>`
            }
          </div>
        </div>
      </div>
    </section>

    <section class="section" style="background: var(--muted);">
      <div class="container">
        <div class="section-header fade-in">
          <h2 class="section-title">Our Values</h2>
          <p class="section-description">The principles that guide everything we do</p>
        </div>
        
        <div class="grid grid-3">
          <div class="card fade-in">
            <h3>Quality</h3>
            <p>We never compromise on quality. Every product and service we offer meets the highest standards of excellence.</p>
          </div>
          
          <div class="card fade-in">
            <h3>Integrity</h3>
            <p>We conduct our business with honesty, transparency, and ethical practices that build trust with our customers.</p>
          </div>
          
          <div class="card fade-in">
            <h3>Innovation</h3>
            <p>We continuously seek new and better ways to serve our customers and stay ahead in the ${data.industry} industry.</p>
          </div>
        </div>
      </div>
    </section>

    ${data.reviews.length > 0 ? `
    <section class="section">
      <div class="container">
        <div class="section-header fade-in">
          <h2 class="section-title">What Our Clients Say</h2>
          <p class="section-description">Testimonials from our valued customers</p>
        </div>
        
        <div class="grid grid-2">
          ${data.reviews.slice(0, 4).map(review => `
            <div class="testimonial fade-in">
              <div class="review-rating">
                ${Array(review.rating).fill('★').map(() => 
                  `<span class="review-star">★</span>`
                ).join('')}
              </div>
              <p class="testimonial-quote">"${review.text}"</p>
              <div class="testimonial-author">${review.name}</div>
              ${review.date ? `<div class="testimonial-company">${review.date}</div>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    </section>
    ` : ''}

    <section class="section" style="background: var(--muted);">
      <div class="container">
        <div class="section-header fade-in">
          <h2 class="section-title">Ready to Work With Us?</h2>
          <p class="section-description">Contact us today to learn how we can help you achieve your goals.</p>
        </div>
        <div class="text-center">
          <a href="contact.html" class="btn btn-primary">Get in Touch</a>
        </div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container">
      <p>&copy; ${new Date().getFullYear()} ${data.businessName}. All rights reserved.</p>
      <div style="display: flex; justify-content: center; gap: var(--space-6); flex-wrap: wrap; margin-top: var(--space-4);">
        <a href="index.html" style="color: var(--muted-foreground); text-decoration: none; font-size: 0.875rem;">Home</a>
        <a href="about.html" style="color: var(--muted-foreground); text-decoration: none; font-size: 0.875rem;">About</a>
        ${data.needsPrivacyPolicy ? `<a href="privacy-policy.html" style="color: var(--muted-foreground); text-decoration: none; font-size: 0.875rem;">Privacy Policy</a>` : ''}
        ${data.needsTermsOfService ? `<a href="terms-of-service.html" style="color: var(--muted-foreground); text-decoration: none; font-size: 0.875rem;">Terms of Service</a>` : ''}
      </div>
    </div>
  </footer>

  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
      });
    });
  </script>
</body>
</html>`;
};

const generateProductsPage = (data: EnhancedWebsiteData, styles: string): string => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Products - ${data.businessName}</title>
  <meta name="description" content="Explore our range of products designed for ${data.targetAudience} in the ${data.industry} industry.">
  <style>${styles}</style>
</head>
<body>
  <header class="header">
    <div class="container">
      <nav class="nav">
        <a href="index.html" class="logo">${data.businessName}</a>
        <ul class="nav-links">
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="products.html">Products</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
        <div style="display: flex; align-items: center;">
          <button id="cart-button" class="btn btn-ghost" style="position: relative;">
            🛒 Cart
            <span id="cart-count" style="position: absolute; top: -5px; right: -5px; background: var(--primary); color: var(--primary-foreground); border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 0.75rem;">0</span>
          </button>
        </div>
      </nav>
    </div>
  </header>

  <main>
    <section class="section" style="padding-top: calc(var(--space-24) + 64px);">
      <div class="container">
        <div class="section-header fade-in">
          <h1 class="section-title">Our Products</h1>
          <p class="section-description">Quality products designed for ${data.targetAudience}</p>
        </div>
        
        <div class="grid grid-3">
          ${data.products.map((product, index) => `
            <div class="product-card fade-in" data-product-id="${index}">
              <div class="product-image">
                ${product.imageUrl ? 
                  `<img src="${product.imageUrl}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">` : 
                  `<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 2rem;">
                    ${product.name.charAt(0)}
                  </div>`
                }
              </div>
              <div class="product-content">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <p class="product-description">${product.description}</p>
                <button class="btn btn-primary add-to-cart" data-product-id="${index}">Add to Cart</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  </main>

  <!-- Cart Modal -->
  <div id="cart-modal" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 100; align-items: center; justify-content: center;">
    <div style="background: var(--background); border-radius: calc(var(--radius) * 1.5); width: 90%; max-width: 600px; max-height: 80vh; overflow-y: auto; padding: var(--space-8);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-6);">
        <h2 style="font-size: 1.5rem;">Your Cart</h2>
        <button id="close-cart" class="btn btn-ghost" style="padding: var(--space-2);">✕</button>
      </div>
      
      <div id="cart-items" style="margin-bottom: var(--space-6);">
        <!-- Cart items will be inserted here -->
        <p id="empty-cart-message">Your cart is empty.</p>
      </div>
      
      <div style="display: flex; justify-content: space-between; font-weight: 600; margin-bottom: var(--space-6); padding-top: var(--space-4); border-top: 1px solid var(--border);">
        <span>Total:</span>
        <span id="cart-total">$0.00</span>
      </div>
      
      <div style="display: flex; gap: var(--space-4);">
        <button id="checkout-button" class="btn btn-primary" style="flex: 1;">Checkout</button>
        <button id="clear-cart" class="btn btn-secondary" style="flex: 1;">Clear Cart</button>
      </div>
    </div>
  </div>

  <footer class="footer">
    <div class="container">
      <p>&copy; ${new Date().getFullYear()} ${data.businessName}. All rights reserved.</p>
      <div style="display: flex; justify-content: center; gap: var(--space-6); flex-wrap: wrap; margin-top: var(--space-4);">
        <a href="index.html" style="color: var(--muted-foreground); text-decoration: none; font-size: 0.875rem;">Home</a>
        <a href="about.html" style="color: var(--muted-foreground); text-decoration: none; font-size: 0.875rem;">About</a>
        ${data.needsPrivacyPolicy ? `<a href="privacy-policy.html" style="color: var(--muted-foreground); text-decoration: none; font-size: 0.875rem;">Privacy Policy</a>` : ''}
        ${data.needsTermsOfService ? `<a href="terms-of-service.html" style="color: var(--muted-foreground); text-decoration: none; font-size: 0.875rem;">Terms of Service</a>` : ''}
        ${data.needsRefundPolicy ? `<a href="refund-policy.html" style="color: var(--muted-foreground); text-decoration: none; font-size: 0.875rem;">Refund Policy</a>` : ''}
        ${data.needsShippingPolicy ? `<a href="shipping-policy.html" style="color: var(--muted-foreground); text-decoration: none; font-size: 0.875rem;">Shipping Policy</a>` : ''}
      </div>
    </div>
  </footer>

  <script>
    document.addEventListener('DOMContentLoaded', function() {
      // Animation observer
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
      });

      // Cart functionality
      const products = ${JSON.stringify(data.products)};
      let cart = [];
      
      // Cart modal elements
      const cartModal = document.getElementById('cart-modal');
      const cartButton = document.getElementById('cart-button');
      const closeCart = document.getElementById('close-cart');
      const cartItems = document.getElementById('cart-items');
      const cartTotal = document.getElementById('cart-total');
      const cartCount = document.getElementById('cart-count');
      const checkoutButton = document.getElementById('checkout-button');
      const clearCartButton = document.getElementById('clear-cart');
      const emptyCartMessage = document.getElementById('empty-cart-message');
      
      // Add to cart buttons
      document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
          const productId = parseInt(this.getAttribute('data-product-id'));
          const product = products[productId];
          
          // Check if product is already in cart
          const existingItem = cart.find(item => item.id === productId);
          
          if (existingItem) {
            existingItem.quantity += 1;
          } else {
            cart.push({
              id: productId,
              name: product.name,
              price: product.price,
              quantity: 1
            });
          }
          
          updateCart();
          showCartModal();
        });
      });
      
      // Cart modal functions
      cartButton.addEventListener('click', showCartModal);
      closeCart.addEventListener('click', hideCartModal);
      
      checkoutButton.addEventListener('click', function() {
        alert('Thank you for your order! This is a demo checkout process.');
        cart = [];
        updateCart();
        hideCartModal();
      });
      
      clearCartButton.addEventListener('click', function() {
        cart = [];
        updateCart();
      });
      
      function showCartModal() {
        cartModal.style.display = 'flex';
      }
      
      function hideCartModal() {
        cartModal.style.display = 'none';
      }
      
      function updateCart() {
        // Update cart count
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        
        // Update cart items display
        if (cart.length === 0) {
          emptyCartMessage.style.display = 'block';
          cartItems.innerHTML = '';
          cartItems.appendChild(emptyCartMessage);
        } else {
          emptyCartMessage.style.display = 'none';
          
          let cartHTML = '';
          let total = 0;
          
          cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            cartHTML += \`
              <div style="display: flex; justify-content: space-between; margin-bottom: var(--space-4); padding-bottom: var(--space-4); border-bottom: 1px solid var(--border);">
                <div>
                  <div style="font-weight: 600;">\${item.name}</div>
                  <div style="color: var(--muted-foreground); font-size: 0.875rem;">$\${item.price.toFixed(2)} × \${item.quantity}</div>
                </div>
                <div>
                  <div style="font-weight: 600; text-align: right;">$\${itemTotal.toFixed(2)}</div>
                  <div style="display: flex; gap: var(--space-2); margin-top: var(--space-2);">
                    <button class="btn btn-ghost decrease-quantity" data-product-id="\${item.id}" style="padding: 0 var(--space-2); font-size: 1rem;">−</button>
                    <span style="display: inline-flex; align-items: center; justify-content: center; min-width: 24px;">\${item.quantity}</span>
                    <button class="btn btn-ghost increase-quantity" data-product-id="\${item.id}" style="padding: 0 var(--space-2); font-size: 1rem;">+</button>
                  </div>
                </div>
              </div>
            \`;
          });
          
          cartItems.innerHTML = cartHTML;
          cartTotal.textContent = '$' + total.toFixed(2);
          
          // Add event listeners to quantity buttons
          document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', function() {
              const productId = parseInt(this.getAttribute('data-product-id'));
              const item = cart.find(item => item.id === productId);
              if (item) {
                item.quantity += 1;
                updateCart();
              }
            });
          });
          
          document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', function() {
              const productId = parseInt(this.getAttribute('data-product-id'));
              const item = cart.find(item => item.id === productId);
              if (item) {
                item.quantity -= 1;
                if (item.quantity <= 0) {
                  cart = cart.filter(i => i.id !== productId);
                }
                updateCart();
              }
            });
          });
        }
      }
      
      // Close modal when clicking outside
      window.addEventListener('click', function(event) {
        if (event.target === cartModal) {
          hideCartModal();
        }
      });
      
      // Initialize cart
      updateCart();
    });
  </script>
</body>
</html>`;
};

const generateServicesPage = (data: EnhancedWebsiteData, styles: string): string => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Services - ${data.businessName}</title>
  <meta name="description" content="Explore our professional services designed for ${data.targetAudience} in the ${data.industry} industry.">
  <style>${styles}</style>
</head>
<body>
  <header class="header">
    <div class="container">
      <nav class="nav">
        <a href="index.html" class="logo">${data.businessName}</a>
        <ul class="nav-links">
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="services.html">Services</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main>
    <section class="section" style="padding-top: calc(var(--space-24) + 64px);">
      <div class="container">
        <div class="section-header fade-in">
          <h1 class="section-title">Our Services</h1>
          <p class="section-description">Professional solutions tailored to your needs</p>
        </div>
        
        <div class="grid grid-2">
          ${data.services.map(service => `
            <div class="service-card fade-in">
              <div class="service-content">
                <h3 class="service-title">${service.name}</h3>
                <div class="service-price">$${service.price.toFixed(2)}${service.duration ? ` / ${service.duration}` : ''}</div>
                <p class="service-description">${service.description}</p>
                ${data.calendlyLink ? 
                  `<a href="${data.calendlyLink}" target="_blank" class="btn btn-primary">Book Now</a>` : 
                  `<a href="contact.html" class="btn btn-primary">Inquire Now</a>`
                }
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <section class="section" style="background: var(--muted);">
      <div class="container">
        <div class="section-header fade-in">
          <h2 class="section-title">Our Process</h2>
          <p class="section-description">How we work with you to deliver exceptional results</p>
        </div>
        
        <div class="grid grid-3">
          <div class="card fade-in">
            <h3>1. Consultation</h3>
            <p>We begin with a thorough consultation to understand your specific needs and goals.</p>
          </div>
          
          <div class="card fade-in">
            <h3>2. Custom Solution</h3>
            <p>Our team develops a tailored solution designed specifically for your business requirements.</p>
          </div>
          
          <div class="card fade-in">
            <h3>3. Implementation</h3>
            <p>We implement the solution with attention to detail and ongoing communication.</p>
          </div>
        </div>
      </div>
    </section>

    ${data.reviews.length > 0 ? `
    <section class="section">
      <div class="container">
        <div class="section-header fade-in">
          <h2 class="section-title">Client Success Stories</h2>
          <p class="section-description">See what our clients have to say about our services</p>
        </div>
        
        <div class="grid grid-2">
          ${data.reviews.slice(0, 4).map(review => `
            <div class="testimonial fade-in">
              <div class="review-rating">
                ${Array(review.rating).fill('★').map(() => 
                  `<span class="review-star">★</span>`
                ).join('')}
              </div>
              <p class="testimonial-quote">"${review.text}"</p>
              <div class="testimonial-author">${review.name}</div>
              ${review.date ? `<div class="testimonial-company">${review.date}</div>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    </section>
    ` : ''}

    <section class="section" style="background: var(--muted);">
      <div class="container">
        <div class="section-header fade-in">
          <h2 class="section-title">Ready to Get Started?</h2>
          <p class="section-description">Contact us today to discuss your project or book a service.</p>
        </div>
        <div class="text-center">
          ${data.calendlyLink ? 
            `<a href="${data.calendlyLink}" target="_blank" class="btn btn-primary">Book a Consultation</a>` : 
            `<a href="contact.html" class="btn btn-primary">Contact Us Now</a>`
          }
        </div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container">
      <p>&copy; ${new Date().getFullYear()} ${data.businessName}. All rights reserved.</p>
      <div style="display: flex; justify-content: center; gap: var(--space-6); flex-wrap: wrap; margin-top: var(--space-4);">
        <a href="index.html" style="color: var(--muted-foreground); text-decoration: none; font-size: 0.875rem;">Home</a>
        <a href="about.html" style="color: var(--muted-foreground); text-decoration: none; font-size: 0.875rem;">About</a>
        ${data.needsPrivacyPolicy ? `<a href="privacy-policy.html" style="color: var(--muted-foreground); text-decoration: none; font-size: 0.875rem;">Privacy Policy</a>` : ''}
        ${data.needsTermsOfService ? `<a href="terms-of-service.html" style="color: var(--muted-foreground); text-decoration: none; font-size: 0.875rem;">Terms of Service</a>` : ''}
        ${data.needsRefundPolicy ? `<a href="refund-policy.html" style="color: var(--muted-foreground); text-decoration: none; font-size: 0.875rem;">Refund Policy</a>` : ''}
      </div>
    </div>
  </footer>

  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
      });
    });
  </script>
</body>
</html>`;
};

const generatePrivacyPolicy = (data: EnhancedWebsiteData, styles: string): string => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Privacy Policy - ${data.businessName}</title>
  <meta name="description" content="Privacy Policy for ${data.businessName}">
  <style>${styles}</style>
</head>
<body>
  <header class="header">
    <div class="container">
      <nav class="nav">
        <a href="index.html" class="logo">${data.businessName}</a>
        <ul class="nav-links">
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About</a></li>
          ${data.businessType === 'ecommerce' && data.products.length > 0 ? 
            `<li><a href="products.html">Products</a></li>` : ''}
          ${data.businessType === 'service' && data.services.length > 0 ? 
            `<li><a href="services.html">Services</a></li>` : ''}
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main>
    <section class="section" style="padding-top: calc(var(--space-24) + 64px);">
      <div class="container">
        <div class="section-header fade-in">
          <h1 class="section-title">Privacy Policy</h1>
          <p class="section-description">Last updated: ${new Date().toLocaleDateString()}</p>
        </div>
        
        <div class="fade-in" style="max-width: 800px; margin: 0 auto;">
          <div style="background: var(--background); border: 1px solid var(--border); border-radius: calc(var(--radius) * 1.5); padding: var(--space-8);">
            <p style="margin-bottom: var(--space-6);">
              This Privacy Policy describes how ${data.businessName} ("we", "us", or "our") collects, uses, and discloses your personal information when you visit our website or make a purchase from us.
            </p>
            
            <h2 style="font-size: 1.5rem; margin-bottom: var(--space-4); margin-top: var(--space-8);">Information We Collect</h2>
            <p style="margin-bottom: var(--space-4);">
              When you visit our site, we collect certain information about your device, your interaction with the site, and information necessary to process your purchases. We may also collect additional information if you contact us for customer support.
            </p>
            <p style="margin-bottom: var(--space-4);">
              This information may include:
            </p>
            <ul style="margin-bottom: var(--space-6); padding-left: var(--space-6);">
              <li style="margin-bottom: var(--space-2);">Personal information (name, email address, phone number)</li>
              <li style="margin-bottom: var(--space-2);">Billing and shipping address</li>
              <li style="margin-bottom: var(--space-2);">Payment information</li>
              <li style="margin-bottom: var(--space-2);">Device information (browser type, IP address)</li>
              <li style="margin-bottom: var(--space-2);">Usage data (pages visited, time spent on site)</li>
            </ul>
            
            <h2 style="font-size: 1.5rem; margin-bottom: var(--space-4); margin-top: var(--space-8);">How We Use Your Information</h2>
            <p style="margin-bottom: var(--space-4);">
              We use the information we collect to:
            </p>
            <ul style="margin-bottom: var(--space-6); padding-left: var(--space-6);">
              <li style="margin-bottom: var(--space-2);">Provide, operate, and maintain our website</li>
              <li style="margin-bottom: var(--space-2);">Process and fulfill your orders</li>
              <li style="margin-bottom: var(--space-2);">Communicate with you about your orders and provide customer support</li>
              <li style="margin-bottom: var(--space-2);">Send you marketing communications (if you've opted in)</li>
              <li style="margin-bottom: var(--space-2);">Improve and optimize our website</li>
              <li style="margin-bottom: var(--space-2);">Protect against fraud and unauthorized transactions</li>
            </ul>
            
            <h2 style="font-size: 1.5rem; margin-bottom: var(--space-4); margin-top: var(--space-8);">Sharing Your Information</h2>
            <p style="margin-bottom: var(--space-6);">
              We may share your information with third-party service providers to help us provide our services and fulfill our contracts with you. We may also share your information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.
            </p>
            
            <h2 style="font-size: 1.5rem; margin-bottom: var(--space-4); margin-top: var(--space-8);">Your Rights</h2>
            <p style="margin-bottom: var(--space-4);">
              Depending on your location, you may have certain rights regarding your personal information, such as:
            </p>
            <ul style="margin-bottom: var(--space-6); padding-left: var(--space-6);">
              <li style="margin-bottom: var(--space-2);">The right to access the personal information we have about you</li>
              <li style="margin-bottom: var(--space-2);">The right to request that we correct or update your personal information</li>
              <li style="margin-bottom: var(--space-2);">The right to request that we delete your personal information</li>
              <li style="margin-bottom: var(--space-2);">The right to opt out of marketing communications</li>
            </ul>
            
            <h2 style="font-size: 1.5rem; margin-bottom: var(--space-4); margin-top: var(--space-8);">Contact Us</h2>
            <p style="margin-bottom: var(--space-6);">
              For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by email at ${data.contactInfo.email} or by mail using the details provided below:
              <br><br>
              ${data.businessName}<br>
              ${data.contactInfo.address || '[Your Business Address]'}
            </p>
            
            <h2 style="font-size: 1.5rem; margin-bottom: var(--space-4); margin-top: var(--space-8);">Changes to This Privacy Policy</h2>
            <p style="margin-bottom: var(--space-6);">
              We may update this privacy policy from time to time in order to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will post the updated version on our website with a revised "Last updated" date.
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container">
      <p>&copy; ${new Date().getFullYear()} ${data.businessName}. All rights reserved.</p>
      <div style="display: flex; justify-content: center; gap: var(--space-6); flex-wrap: wrap; margin-top: var(--space-4);">
        <a href="index.html" style="color: var(--muted-foreground); text-decoration: none; font-size: 0.875rem;">Home</a>
        <a href="about.html" style="color: var(--muted-foreground); text-decoration: none; font-size: 0.875rem;">About</a>
        <a href="privacy-policy.html" style="color: var(--muted-foreground); text-decoration: none; font-size: 0.875rem;">Privacy Policy</a>
        ${data.needsTermsOfService ? `<a href="terms-of-service.html" style="color: var(--muted-foreground); text-decoration: none; font-size: 0.875rem;">Terms of Service</a>` : ''}
      </div>
    </div>
  </footer>

  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
      });
    });
  </script>
</body>
</html>`;
};

const generateTermsOfService = (data: EnhancedWebsiteData, styles: string): string => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Terms of Service - ${data.businessName}</title>
  <meta name="description" content="Terms of Service for ${data.businessName}">
  <style>${styles}</style>
</head>
<body>
  <header class="header">
    <div class="container">
      <nav class="nav">
        <a href="index.html" class="logo">${data.businessName}</a>
        <ul class="nav-links">
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About</a></li>
          ${data.businessType === 'ecommerce' && data.products.length > 0 ? 
            `<li><a href="products.html">Products</a></li>` : ''}
          ${data.businessType === 'service' && data.services.length > 0 ? 
            `<li><a href="services.html">Services</a></li>` : ''}
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main>
    <section class="section" style="padding-top: calc(var(--space-24) + 64px);">
      <div class="container">
        <div class="section-header fade-in">
          <h1 class="section-title">Terms of Service</h1>
          <p class="section-description">Last updated: ${new Date().toLocaleDateString()}</p>
        </div>
        
        <div class="fade-in" style="max-width: 800px; margin: 0 auto;">
          <div style="background: var(--background); border: 1px solid var(--border); border-radius: calc(var(--radius) * 1.5); padding: var(--space-8);">
            <p style="margin-bottom: var(--space-6);">
              Please read these Terms of Service ("Terms") carefully before using the website operated by ${data.businessName} ("we", "us", or "our").
            </p>
            
            <h2 style="font-size: 1.5rem; margin-bottom: var(--space-4); margin-top: var(--space-8);">Agreement to Terms</h2>
            <p style="margin-bottom: var(--space-6);">
              By accessing or using our website, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the website.
            </p>
            
            <h2 style="font-size: 1.5rem; margin-bottom: var(--space-4); margin-top: var(--space-8);">Intellectual Property</h2>
            <p style="margin-bottom: var(--space-6);">
              The website and its original content, features, and functionality are owned by ${data.businessName} and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </p>
            
            <h2 style="font-size: 1.5rem; margin-bottom: var(--space-4); margin-top: var(--space-8);">User Accounts</h2>
            <p style="margin-bottom: var(--space-6);">
              When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our website.
            </p>
            
            <h2 style="font-size: 1.5rem; margin-bottom: var(--space-4); margin-top: var(--space-8);">Products and Services</h2>
            <p style="margin-bottom: var(--space-6);">
              All products and services are subject to availability. We reserve the right to discontinue any product or service at any time. Prices for our products and services are subject to change without notice. We reserve the right to refuse service to anyone for any reason at any time.
            </p>
            
            <h2 style="font-size: 1.5rem; margin-bottom: var(--space-4); margin-top: var(--space-8);">Prohibited Uses</h2>
            <p style="margin-bottom: var(--space-4);">
              You agree not to use the website:
            </p>
            <ul style="margin-bottom: var(--space-6); padding-left: var(--space-6);">
              <li style="margin-bottom: var(--space-2);">In any way that violates any applicable federal, state, local, or international law or regulation</li>
              <li style="margin-bottom: var(--space-2);">To transmit any material that is defamatory, obscene, or offensive</li>
              <li style="margin-bottom: var(--space-2);">To impersonate or attempt to impersonate our company, an employee, or another user</li>
              <li style="margin-bottom: var(--space-2);">To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the website</li>
            </ul>
            
            <h2 style="font-size: 1.5rem; margin-bottom: var(--space-4); margin-top: var(--space-8);">Limitation of Liability</h2>
            <p style="margin-bottom: var(--space-6);">
              In no event shall ${data.businessName}, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the website.
            </p>
            
            <h2 style="font-size: 1.5rem; margin-bottom: var(--space-4); margin-top: var(--space-8);">Governing Law</h2>
            <p style="margin-bottom: var(--space-6);">
              These Terms shall be governed and construed in accordance with the laws applicable in the jurisdiction where our business is registered, without regard to its conflict of law provisions.
            </p>
            
            <h2 style="font-size: 1.5rem; margin-bottom: var(--space-4); margin-top: var(--space-8);">Changes to Terms</h2>
            <p style="margin-bottom: var(--space-6);">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
            
            <h2 style="font-size: 1.5rem; margin-bottom: var(--space-4); margin-top: var(--space-8);">Contact Us</h2>
            <p style="margin-bottom: var(--space-6);">
              If you have any questions about these Terms, please contact us at ${data.contactInfo.email}.
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container">
      <p>&copy; ${new Date().getFullYear()} ${data.businessName}. All rights reserved.</p>
      <div style="display: flex; justify-content: center; gap: var(--space-6); flex-wrap: wrap; margin-top: var(--space-4);">
        <a href="index.html" style="color: var(--muted-foreground); text-decoration: none; font-size: 0.875rem;">Home</a>
        <a href="about.html" style="color: var(--muted-foreground); text-decoration: none; font-size: 0.875rem;">About</a>
        ${data.needsPrivacyPolicy ? `<a href="privacy-policy.html" style="color: var(--muted-foreground); text-decoration: none; font-size: 0.875rem;">Privacy Policy</a>` : ''}
        <a href="terms-of-service.html" style="color: var(--muted-foreground); text-decoration: none; font-size: 0.875rem;">Terms of Service</a>
      </div>
    </div>
  </footer>

  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
      });
    });
  </script>
</body>
</html>`;
};

const generateRefundPolicy = (data: EnhancedWebsiteData, styles: string): string => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Refund Policy - ${data.businessName}</title>
  <meta name="description" content="Refund Policy for ${data.businessName}">
  <style>${styles}</style>
</head>
<body>
  <header class="header">
    <div class="container">
      <nav class="nav">
        <a href="index.html" class="logo">${data.businessName}</a>
        <ul class="nav-links">
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About</a></li>
          ${data.businessType === 'ecommerce' && data.products.length > 0 ? 
            `<li><a href="products.html">Products</a></li>` : ''}
          ${data.businessType === 'service' && data.services.length > 0 ? 
            `<li><a href="services.html">Services</a></li>` : ''}
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main>
    <section class="section" style="padding-top: calc(var(--space-24) + 64px);">
      <div class="container">
        <div class="section-header fade-in">
          <h1 class="section-title">Refund Policy</h1>
          <p class="section-description">Last updated: ${new Date().toLocaleDateString()}</p>
        </div>
        
        <div class="fade-in" style="max-width: 800px; margin: 0 auto;">
          <div style="background: var(--background); border: 1px solid var(--border); border-radius: calc(var(--radius) * 1.5); padding: var(--space-8);">
            <p style="margin-bottom: var(--space-6);">
              Thank you for shopping at ${data.businessName}. We want to ensure your satisfaction with our products and services. This Refund Policy outlines our guidelines for returns and refunds.
            </p>
            
            <h2 style="font-size: 1.5rem; margin-bottom: var(--space-4); margin-top: var(--space-8);">Returns</h2>
            <p style="margin-bottom: var(--space-6);">
              You have ${data.businessType === 'ecommerce' ? '30 days' : '14 days'} from the date of purchase to return an item. To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging. For digital products or services, special terms may apply.
            </p>
            
            <h2 style="font-size: 1.5rem; margin-bottom: var(--space-4); margin-top: var(--space-8);">Refunds</h2>
            <p style="margin-bottom: var(--space-4);">
              Once we receive and inspect your return, we will notify you about the status of your refund. If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within ${data.businessType === 'ecommerce' ? '10-14 business days' : '5-7 business days'}.
            </p>
            <p style="margin-bottom: var(--space-6);">
              Please note that depending on your credit card company, it may take an additional 2-10 business days after your credit is applied for it to post to your account.
            </p>
            
            <h2 style="font-size: 1.5rem; margin-bottom: var(--space-4); margin-top: var(--space-8);">Late or Missing Refunds</h2>
            <p style="margin-bottom: var(--space-6);">
              If you haven't received a refund yet, first check your bank account again. Then contact your credit card company, it may take some time before your refund is officially posted. Next, contact your bank. There is often some processing time before a refund is posted. If you've done all of this and you still have not received your refund yet, please contact us at ${data.contactInfo.email}.
            </p>
            
            <h2 style="font-size: 1.5rem; margin-bottom: var(--space-4); margin-top: var(--space-8);">Exchanges</h2>
            <p style="margin-bottom: var(--space-6);">
              We only replace items if they are defective or damaged. If you need to exchange it for the same item, send us an email at ${data.contactInfo.email} and we will guide you through the process.
            </p>
            
            ${data.businessType === 'ecommerce' ? `
            <h2 style="font-size: 1.5rem; margin-bottom: var(--space-4); margin-top: var(--space-8);">Shipping</h2>
            <p style="margin-bottom: var(--space-4);">
              To return your product, you should mail your product to: [Your Return Address].
            </p>
            <p style="margin-bottom: var(--space-6);">
              You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.
            </p>
            ` : ''}
            
            ${data.businessType === 'service' ? `
            <h2 style="font-size: 1.5rem; margin-bottom: var(--space-4); margin-top: var(--space-8);">Service Cancellations</h2>
            <p style="margin-bottom: var(--space-6);">
              For services, cancellations made at least 48 hours before the scheduled service time will receive a full refund. Cancellations made less than 48 hours before the scheduled service time may be subject to a cancellation fee of up to 50% of the service cost.
            </p>
            ` : ''}
            
            <h2 style="font-size: 1.5rem; margin-bottom: var(--space-4); margin-top: var(--space-8);">Contact Us</h2>
            <p style="margin-bottom: var(--space-6);">
              If you have any questions about our Refund Policy, please contact us at ${data.contactInfo.email} or ${data.contactInfo.phone}.
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container">
      <p>&copy; ${new Date().getFullYear()} ${data.businessName}. All rights reserved.</p>
      <div style="display: flex; justify-content: center; gap: var(--space-6); flex-wrap: wrap; margin-top: var(--space-4);">
        <a href="index.html" style="color: var(--muted-foreground); text-decoration: none; font-size: 0.875rem;">Home</a>
        <a href="about.html" style="color: var(--muted-foreground); text-decoration: none; font-size: 0.875rem;">About</a>
        ${data.needsPrivacyPolicy ? `<a href="privacy-policy.html" style="color: var(--muted-foreground); text-decoration: none; font-size: 0.875rem;">Privacy Policy</a>` : ''}
        ${data.needsTermsOfService ? `<a href="terms-of-service.html" style="color: var(--muted-foreground); text-decoration: none; font-size: 0.875rem;">Terms of Service</a>` : ''}
        <a href="refund-policy.html" style="color: var(--muted-foreground); text-decoration: none; font-size: 0.875rem;">Refund Policy</a>
      </div>
    </div>
  </footer>

  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
      });
    });
  </script>
</body>
</html>`;
};

const generateShippingPolicy = (data: EnhancedWebsiteData, styles: string): string => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Shipping Policy - ${data.businessName}</title>
  <meta name="description" content="Shipping Policy for ${data.businessName}">
  <style>${styles}</style>
</head>
<body>
  <header class="header">
    <div class="container">
      <nav class="nav">
        <a href="index.html" class="logo">${data.businessName}</a>
        <ul class="nav-links">
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About</a></li>
          ${data.businessType === 'ecommerce' && data.products.length > 0 ? 
            `<li><a href="products.html">Products</a></li>` : ''}
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main>
    <section class="section" style="padding-top: calc(var(--space-24) + 64px);">
      <div class="container">
        <div class="section-header fade-in">
          <h1 class="section-title">Shipping Policy</h1>
          <p class="section-description">Last updated: ${new Date().toLocaleDateString()}</p>
        </div>
        
        <div class="fade-in" style="max-width: 800px; margin: 0 auto;">
          <div style="background: var(--background); border: 1px solid var(--border); border-radius: calc(var(--radius) * 1.5); padding: var(--space-8);">
            <p style="margin-bottom: var(--space-6);">
              Thank you for shopping at ${data.businessName}. This Shipping Policy outlines our procedures and policies regarding the shipment of our products.
            </p>
            
            <h2 style="font-size: 1.5rem; margin-bottom: var(--space-4); margin-top: var(--space-8);">Processing Time</h2>
            <p style="margin-bottom: var(--space-6);">
              All orders are processed within 1-3 business days. Orders are not shipped or delivered on weekends or holidays. If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery. If there will be a significant delay in the shipment of your order, we will contact you via email.
            </p>
            
            <h2 style="font-size: 1.5rem; margin-bottom: var(--space-4); margin-top: var(--space-8);">Shipping Rates & Delivery Times</h2>
            <p style="margin-bottom: var(--space-4);">
              Shipping charges for your order will be calculated and displayed at checkout. We offer the following shipping options:
            </p>
            <ul style="margin-bottom: var(--space-6); padding-left: var(--space-6);">
              <li style="margin-bottom: var(--space-2);">Standard Shipping (5-7 business days)</li>
              <li style="margin-bottom: var(--space-2);">Expedited Shipping (2-3 business days)</li>
              <li style="margin-bottom: var(--space-2);">Overnight Shipping (1 business day)</li>
            </ul>
            <p style="margin-bottom: var(--space-6);">
              Delivery times may vary, especially during peak periods or adverse weather conditions.
            </p>
            
            <h2 style="font-size: 1.5rem; margin-bottom: var(--space-4); margin-top: var(--space-8);">Shipping Confirmation & Order Tracking</h2>
            <p style="margin-bottom: var(--space-6);">
              You will receive a Shipping Confirmation email once your order has shipped containing your tracking number(s). The tracking number will be active within 24 hours.
            </p>
            
            <h2 style="font-size: 1.5rem; margin-bottom: var(--space-4); margin-top: var(--space-8);">International Shipping</h2>
            <p style="margin-bottom: var(--space-6);">
              We currently ship to the following countries: [List of countries]. International orders may be subject to import duties and taxes, which are the responsibility of the recipient. We are not responsible for delays due to customs.
            </p>
            
            <h2 style="font-size: 1.5rem; margin-bottom: var(--space-4); margin-top: var(--space-8);">Damages</h2>
            <p style="margin-bottom: var(--space-6);">
              ${data.businessName} is not liable for any products damaged or lost during shipping. If you received your order damaged, please contact the shipment carrier to file a claim. Please save all packaging materials and damaged goods before filing a claim.
            </p>
            
            <h2 style="font-size: 1.5rem; margin-bottom: var(--space-4); margin-top: var(--space-8);">Missing or Lost Packages</h2>
            <p style="margin-bottom: var(--space-6);">
              If you haven't received your order within the estimated delivery time, please contact us at ${data.contactInfo.email} with your order number and we will look into it for you.
            </p>
            
            <h2 style="font-size: 1.5rem; margin-bottom: var(--space-4); margin-top: var(--space-8);">Contact Us</h2>
            <p style="margin-bottom: var(--space-6);">
              If you have any questions about our Shipping Policy, please contact us at ${data.contactInfo.email} or ${data.contactInfo.phone}.
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container">
      <p>&copy; ${new Date().getFullYear()} ${data.businessName}. All rights reserved.</p>
      <div style="display: flex; justify-content: center; gap: var(--space-6); flex-wrap: wrap; margin-top: var(--space-4);">
        <a href="index.html" style="color: var(--muted-foreground); text-decoration: none; font-size: 0.875rem;">Home</a>
        <a href="about.html" style="color: var(--muted-foreground); text-decoration: none; font-size: 0.875rem;">About</a>
        ${data.needsPrivacyPolicy ? `<a href="privacy-policy.html" style="color: var(--muted-foreground); text-decoration: none; font-size: 0.875rem;">Privacy Policy</a>` : ''}
        ${data.needsTermsOfService ? `<a href="terms-of-service.html" style="color: var(--muted-foreground); text-decoration: none; font-size: 0.875rem;">Terms of Service</a>` : ''}
        ${data.needsRefundPolicy ? `<a href="refund-policy.html" style="color: var(--muted-foreground); text-decoration: none; font-size: 0.875rem;">Refund Policy</a>` : ''}
        <a href="shipping-policy.html" style="color: var(--muted-foreground); text-decoration: none; font-size: 0.875rem;">Shipping Policy</a>
      </div>
    </div>
  </footer>

  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
      });
    });
  </script>
</body>
</html>`;
};

const generateCartFunctionality = (): string => {
  return `// Cart functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize cart
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Update cart count
  function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
      cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
  }
  
  // Save cart to localStorage
  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
  }
  
  // Add to cart
  function addToCart(productId, name, price) {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: productId,
        name: name,
        price: price,
        quantity: 1
      });
    }
    
    saveCart();
  }
  
  // Remove from cart
  function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
  }
  
  // Update quantity
  function updateQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        removeFromCart(productId);
      } else {
        saveCart();
      }
    }
  }
  
  // Calculate total
  function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
  
  // Initialize cart on page load
  updateCartCount();
  
  // Export cart functions
  window.cartFunctions = {
    addToCart,
    removeFromCart,
    updateQuantity,
    calculateTotal,
    getCart: () => cart
  };
});`;
};

export { generateLovableModernTemplates as generateEnhancedTemplates };
export type { EnhancedWebsiteData, EnhancedTemplate };
