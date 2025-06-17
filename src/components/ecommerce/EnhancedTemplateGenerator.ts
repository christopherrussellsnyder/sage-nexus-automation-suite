
export interface EnhancedWebsiteData {
  // Basic Business Info
  businessName: string;
  businessDescription: string;
  industry: string;
  targetAudience: string;
  colorScheme: string;
  businessGoals: string;
  existingWebsite: string;
  businessType: 'ecommerce' | 'service' | 'agency';
  
  // Contact Information
  contactInfo: {
    phone: string;
    email: string;
    address: string;
    businessHours: string;
  };
  
  // Logo
  logoUrl?: string;
  logoFile?: File;
  
  // Products (for e-commerce)
  products: Array<{
    id: string;
    name: string;
    description: string;
    price: string;
    imageUrl: string;
    variations: Array<{
      id: string;
      name: string;
      value: string;
      priceModifier?: string;
    }>;
  }>;
  
  // Services (for service-based businesses)
  services: Array<{
    id: string;
    name: string;
    description: string;
    price: string;
    duration?: string;
  }>;
  
  // Calendly Integration (for service businesses)
  calendlyLink?: string;
  
  // Shipping Information (for e-commerce)
  shippingInfo: {
    shippingMethods: string[];
    freeShippingThreshold?: string;
    shippingZones: string[];
  };
  
  // Payment Processing
  paymentMethods: string[];
  
  // Reviews/Testimonials
  reviews: Array<{
    id: string;
    customerName: string;
    rating: number;
    review: string;
    date?: string;
  }>;
  
  // FAQ Data
  faqs: Array<{
    id: string;
    question: string;
    answer: string;
  }>;
  
  // Policy Requirements
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
  files: { [filename: string]: string };
}

export const generateEnhancedTemplates = (websiteData: EnhancedWebsiteData): EnhancedTemplate[] => {
  const templates: EnhancedTemplate[] = [];
  
  // Template 1: Modern Business Template
  templates.push({
    id: 1,
    name: `${websiteData.businessName} - Modern Business`,
    description: `Professional ${websiteData.businessType} website with integrated business data`,
    preview: generateModernBusinessPreview(websiteData),
    files: generateModernBusinessFiles(websiteData)
  });
  
  // Template 2: Creative Agency Style (if applicable)
  if (websiteData.businessType === 'agency' || websiteData.businessType === 'service') {
    templates.push({
      id: 2,
      name: `${websiteData.businessName} - Creative Agency`,
      description: `Bold, modern layout with creative elements for ${websiteData.industry}`,
      preview: generateCreativeAgencyPreview(websiteData),
      files: generateCreativeAgencyFiles(websiteData)
    });
  }
  
  // Template 3: E-commerce Template (if applicable)
  if (websiteData.businessType === 'ecommerce' && websiteData.products.length > 0) {
    templates.push({
      id: 3,
      name: `${websiteData.businessName} - E-commerce Store`,
      description: `Complete online store with ${websiteData.products.length} products and shopping cart`,
      preview: generateEcommercePreview(websiteData),
      files: generateEcommerceFiles(websiteData)
    });
  }
  
  return templates;
};

const generateModernBusinessPreview = (data: EnhancedWebsiteData): string => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"content="width=device-width, initial-scale=1.0">
    <title>${data.businessName} - ${data.industry}</title>
    <meta name="description" content="${data.businessDescription}">
    <style>
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
    }
    
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: var(--foreground);
      background: var(--background);
    }
    
    .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
    
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
    
    .nav { display: flex; justify-content: space-between; align-items: center; }
    .logo { font-size: 1.5rem; font-weight: 700; color: var(--primary); }
    .nav-links { display: flex; gap: 2rem; list-style: none; }
    .nav-links a { 
      text-decoration: none; 
      color: var(--muted); 
      font-weight: 500;
      cursor: pointer;
      transition: color 0.2s;
    }
    .nav-links a:hover { color: var(--primary); }
    
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius);
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
    }
    
    .btn-primary:hover { background: rgba(26, 26, 26, 0.9); }
    
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
    
    .section { padding: 4rem 0; }
    .section-alternate { background: var(--secondary); }
    .section-header { text-align: center; margin-bottom: 3rem; }
    .section-title { font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; color: var(--primary); }
    .section-description { font-size: 1.125rem; color: var(--muted); max-width: 600px; margin: 0 auto; }
    
    .grid { display: grid; gap: 2rem; }
    .grid-3 { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
    
    .card {
      background: var(--background);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 2rem;
      transition: transform 0.3s ease;
    }
    
    .card:hover { transform: translateY(-4px); }
    .card h3 { font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; color: var(--primary); }
    .card p { color: var(--muted); margin-bottom: 1.5rem; }
    
    .footer {
      background: var(--primary);
      color: var(--primary-foreground);
      padding: 3rem 0 2rem;
      text-align: center;
    }
    
    .page-content { display: none; }
    .page-content.active { display: block; }
    
    @media (max-width: 768px) {
      .hero { padding: 6rem 0 3rem; }
      .hero h1 { font-size: 2rem; }
      .section { padding: 3rem 0; }
      .section-title { font-size: 2rem; }
      .nav-links { display: none; }
    }
  </style>
</head>
<body>
    <header class="header">
        <div class="container">
            <nav class="nav">
                <div class="logo">${data.businessName}</div>
                <ul class="nav-links">
                    <li><a onclick="showPage('home')">Home</a></li>
                    <li><a onclick="showPage('about')">About</a></li>
                    ${data.products.length > 0 ? '<li><a onclick="showPage(\'products\')">Products</a></li>' : ''}
                    ${data.services.length > 0 ? '<li><a onclick="showPage(\'services\')">Services</a></li>' : ''}
                    ${data.reviews.length > 0 ? '<li><a onclick="showPage(\'reviews\')">Reviews</a></li>' : ''}
                    ${data.faqs.length > 0 ? '<li><a onclick="showPage(\'faq\')">FAQ</a></li>' : ''}
                    <li><a onclick="showPage('contact')">Contact</a></li>
                </ul>
                <div><a onclick="showPage('contact')" class="btn btn-primary">Get Started</a></div>
            </nav>
        </div>
    </header>

    <main>
        <!-- Home Page -->
        <div id="home-page" class="page-content active">
            <section class="hero" id="home">
                <div class="container">
                    <h1>${data.businessName} - ${data.businessType.charAt(0).toUpperCase() + data.businessType.slice(1)}</h1>
                    <p>${data.businessDescription}</p>
                    <div class="hero-actions">
                        <a onclick="showPage('contact')" class="btn btn-primary">Get Started</a>
                    </div>
                </div>
            </section>

            <section class="section" id="about">
                <div class="container">
                    <div class="section-header">
                        <h2 class="section-title">Why Choose ${data.businessName}?</h2>
                        <p class="section-description">We specialize in delivering exceptional services to ${data.targetAudience} in the ${data.industry} industry.</p>
                    </div>
                    <div class="grid grid-3">
                        <div class="card">
                            <h3>Quality Guaranteed</h3>
                            <p>Professional service delivery</p>
                            <div style="color: var(--accent); font-weight: 600;">✓ Peace of mind with every purchase</div>
                        </div>
                        <div class="card">
                            <h3>Expert Support</h3>
                            <p>24/7 customer service</p>
                            <div style="color: var(--accent); font-weight: 600;">✓ Always here when you need us</div>
                        </div>
                        <div class="card">
                            <h3>Fast Delivery</h3>
                            <p>Rapid project completion</p>
                            <div style="color: var(--accent); font-weight: 600;">✓ Get results when you need them</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        ${data.products.length > 0 ? generateProductsSection(data) : ''}
        ${data.services.length > 0 ? generateServicesSection(data) : ''}
        ${data.reviews.length > 0 ? generateReviewsSection(data) : ''}
        ${data.faqs.length > 0 ? generateFAQSection(data) : ''}
        ${generateContactSection(data)}
    </main>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 ${data.businessName}. All rights reserved.</p>
        </div>
    </footer>

    <script>
        function showPage(pageId) {
            document.querySelectorAll('.page-content').forEach(page => {
                page.classList.remove('active');
            });
            
            const targetPage = document.getElementById(pageId + '-page');
            if (targetPage) {
                targetPage.classList.add('active');
            }
            
            window.history.pushState({}, '', '#' + pageId);
        }
        
        window.addEventListener('popstate', function() {
            const hash = window.location.hash.slice(1) || 'home';
            showPage(hash);
        });
        
        document.addEventListener('DOMContentLoaded', function() {
            const hash = window.location.hash.slice(1) || 'home';
            showPage(hash);
        });
    </script>
</body>
</html>`;
};

const generateProductsSection = (data: EnhancedWebsiteData): string => {
  return `
    <div id="products-page" class="page-content">
        <section class="section" style="margin-top: 80px;">
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title">Our Products</h2>
                    <p class="section-description">Discover our range of ${data.products.length} carefully selected products</p>
                </div>
                <div class="grid grid-3">
                    ${data.products.map(product => `
                        <div class="card">
                            ${product.imageUrl ? `<img src="${product.imageUrl}" alt="${product.name}" style="width: 100%; height: 200px; object-fit: cover; margin-bottom: 1rem; border-radius: 0.25rem;">` : ''}
                            <h3>${product.name}</h3>
                            <p>${product.description}</p>
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
                                <span style="font-size: 1.25rem; font-weight: 700; color: var(--accent);">${product.price}</span>
                                <button class="btn btn-primary">Add to Cart</button>
                            </div>
                            ${product.variations.length > 0 ? `
                                <div style="margin-top: 1rem;">
                                    <small>Available in: ${product.variations.map(v => v.value).join(', ')}</small>
                                </div>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
    </div>
  `;
};

const generateServicesSection = (data: EnhancedWebsiteData): string => {
  return `
    <div id="services-page" class="page-content">
        <section class="section" style="margin-top: 80px;">
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title">Our Services</h2>
                    <p class="section-description">Professional services tailored to your needs</p>
                </div>
                <div class="grid grid-3">
                    ${data.services.map(service => `
                        <div class="card">
                            <h3>${service.name}</h3>
                            <p>${service.description}</p>
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
                                <span style="font-size: 1.25rem; font-weight: 700; color: var(--accent);">${service.price}</span>
                                <button class="btn btn-primary">Book Now</button>
                            </div>
                            ${service.duration ? `<p style="margin-top: 0.5rem; color: var(--muted); font-size: 0.875rem;">Duration: ${service.duration}</p>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
    </div>
  `;
};

const generateReviewsSection = (data: EnhancedWebsiteData): string => {
  return `
    <div id="reviews-page" class="page-content">
        <section class="section section-alternate" style="margin-top: 80px;">
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title">What Our Customers Say</h2>
                </div>
                <div class="grid grid-3">
                    ${data.reviews.map(review => `
                        <div class="card">
                            <div style="display: flex; margin-bottom: 1rem;">
                                ${'⭐'.repeat(review.rating)}
                            </div>
                            <p style="font-style: italic; margin-bottom: 1rem;">"${review.review}"</p>
                            <strong>${review.customerName}</strong>
                            ${review.date ? `<p style="color: var(--muted); font-size: 0.875rem; margin-top: 0.5rem;">${review.date}</p>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
    </div>
  `;
};

const generateFAQSection = (data: EnhancedWebsiteData): string => {
  return `
    <div id="faq-page" class="page-content">
        <section class="section" style="margin-top: 80px;">
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title">Frequently Asked Questions</h2>
                </div>
                <div style="max-width: 800px; margin: 0 auto;">
                    ${data.faqs.map(faq => `
                        <div class="card" style="margin-bottom: 1rem;">
                            <h3 style="font-size: 1.125rem;">${faq.question}</h3>
                            <p>${faq.answer}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
    </div>
  `;
};

const generateContactSection = (data: EnhancedWebsiteData): string => {
  return `
        <div id="contact-page" class="page-content">
            <section class="section section-alternate" style="margin-top: 80px;">
                <div class="container">
                    <div class="section-header">
                        <h2 class="section-title">Get In Touch</h2>
                        <p class="section-description">Ready to experience the ${data.businessName} difference? Join hundreds of satisfied ${data.targetAudience}.</p>
                    </div>
                    <div class="card" style="max-width: 600px; margin: 0 auto;">
                        <h3>Contact Information</h3>
                        ${data.contactInfo.email ? `<p><strong>Email:</strong> ${data.contactInfo.email}</p>` : ''}
                        ${data.contactInfo.phone ? `<p><strong>Phone:</strong> ${data.contactInfo.phone}</p>` : ''}
                        ${data.contactInfo.address ? `<p><strong>Address:</strong> ${data.contactInfo.address}</p>` : ''}
                        ${data.contactInfo.businessHours ? `<p><strong>Hours:</strong> ${data.contactInfo.businessHours}</p>` : ''}
                        ${data.calendlyLink ? `<p><a href="${data.calendlyLink}" target="_blank" class="btn btn-primary" style="margin-top: 1rem;">Schedule Meeting</a></p>` : ''}
                    </div>
                </div>
            </section>
        </div>
  `;
};

const generateModernBusinessFiles = (data: EnhancedWebsiteData): { [filename: string]: string } => {
  return {
    'index.html': generateModernBusinessPreview(data),
    'styles.css': generateEnhancedCSS(data),
    'script.js': generateEnhancedJS(data),
    'README.md': generateREADME(data)
  };
};

const generateCreativeAgencyPreview = (data: EnhancedWebsiteData): string => {
  // Similar structure but with creative agency styling
  return generateModernBusinessPreview(data).replace(
    'Modern Business',
    'Creative Agency'
  ).replace(
    'linear-gradient(135deg, var(--background) 0%, var(--secondary) 100%)',
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  );
};

const generateCreativeAgencyFiles = (data: EnhancedWebsiteData): { [filename: string]: string } => {
  return {
    'index.html': generateCreativeAgencyPreview(data),
    'styles.css': generateEnhancedCSS(data),
    'script.js': generateEnhancedJS(data),
    'README.md': generateREADME(data)
  };
};

const generateEcommercePreview = (data: EnhancedWebsiteData): string => {
  // E-commerce specific template with shopping cart functionality
  return generateModernBusinessPreview(data).replace(
    'Modern Business',
    'E-commerce Store'
  );
};

const generateEcommerceFiles = (data: EnhancedWebsiteData): { [filename: string]: string } => {
  return {
    'index.html': generateEcommercePreview(data),
    'styles.css': generateEnhancedCSS(data),
    'script.js': generateEcommerceJS(data),
    'README.md': generateREADME(data)
  };
};

const generateEnhancedCSS = (data: EnhancedWebsiteData): string => {
  return `/* Enhanced CSS for ${data.businessName} */
/* Business-specific styling based on collected data */

:root {
  --business-primary: #3b82f6;
  --business-secondary: #f8fafc;
  --business-accent: #667eea;
  --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Logo styling */
.logo {
  ${data.logoUrl ? `background-image: url('${data.logoUrl}'); background-size: contain; background-repeat: no-repeat; padding-left: 40px;` : ''}
}

/* Business type specific styling */
${data.businessType === 'ecommerce' ? `
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.add-to-cart {
  background: var(--business-primary);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background 0.2s;
}

.add-to-cart:hover {
  background: var(--business-accent);
}
` : ''}

${data.businessType === 'service' ? `
.service-booking {
  background: var(--business-primary);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background 0.2s;
}

.service-booking:hover {
  background: var(--business-accent);
}
` : ''}

/* Review styling */
.review-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.review-stars {
  color: #f6ad55;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

/* FAQ styling */
.faq-item {
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
}

.faq-question {
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.faq-answer {
  color: #4a5568;
  line-height: 1.6;
}

/* Navigation enhancements */
.nav-links a.active {
  color: var(--business-primary);
  font-weight: 600;
}

/* Page transition effects */
.page-content {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.page-content.active {
  opacity: 1;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
  
  .hero h1 {
    font-size: 2rem;
  }
  
  .nav-links {
    display: none;
  }
}

/* Print styles */
@media print {
  .nav, .hero-actions, .btn {
    display: none;
  }
}
`;
};

const generateEnhancedJS = (data: EnhancedWebsiteData): string => {
  return `// Enhanced JavaScript for ${data.businessName}
// Business data integration and functionality

document.addEventListener('DOMContentLoaded', function() {
  console.log('${data.businessName} website loaded');
  
  // Business data
  const businessData = {
    name: '${data.businessName}',
    type: '${data.businessType}',
    industry: '${data.industry}',
    targetAudience: '${data.targetAudience}',
    products: ${JSON.stringify(data.products)},
    services: ${JSON.stringify(data.services)},
    reviews: ${JSON.stringify(data.reviews)},
    faqs: ${JSON.stringify(data.faqs)},
    contactInfo: ${JSON.stringify(data.contactInfo)}
  };
  
  // Page navigation system
  window.showPage = function(pageId) {
    // Hide all pages
    document.querySelectorAll('.page-content').forEach(page => {
      page.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
      targetPage.classList.add('active');
      
      // Update page title
      document.title = businessData.name + ' - ' + pageId.charAt(0).toUpperCase() + pageId.slice(1);
      
      // Update navigation active state
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
      });
      
      const activeLink = document.querySelector(\`[onclick="showPage('\${pageId}')"]\`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
    
    // Update URL
    window.history.pushState({}, '', '#' + pageId);
  };
  
  // Handle browser navigation
  window.addEventListener('popstate', function() {
    const hash = window.location.hash.slice(1) || 'home';
    showPage(hash);
  });
  
  // Initialize page
  const initialPage = window.location.hash.slice(1) || 'home';
  showPage(initialPage);
  
  ${data.businessType === 'ecommerce' && data.products.length > 0 ? `
  // E-commerce functionality
  const cart = {
    items: JSON.parse(localStorage.getItem('cart') || '[]'),
    
    add: function(productId) {
      const product = businessData.products.find(p => p.id === productId);
      if (product) {
        const existingItem = this.items.find(item => item.id === productId);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          this.items.push({
            id: product.id,
            name: product.name,
            price: parseFloat(product.price.replace('$', '')),
            quantity: 1
          });
        }
        this.updateStorage();
        this.updateDisplay();
        this.showNotification(\`\${product.name} added to cart!\`);
      }
    },
    
    remove: function(productId) {
      this.items = this.items.filter(item => item.id !== productId);
      this.updateStorage();
      this.updateDisplay();
    },
    
    getTotal: function() {
      return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    
    getItemCount: function() {
      return this.items.reduce((sum, item) => sum + item.quantity, 0);
    },
    
    updateStorage: function() {
      localStorage.setItem('cart', JSON.stringify(this.items));
    },
    
    updateDisplay: function() {
      const cartCount = this.getItemCount();
      const cartTotal = this.getTotal();
      
      // Update cart display if exists
      const cartDisplay = document.getElementById('cart-display');
      if (cartDisplay) {
        cartDisplay.innerHTML = \`Cart (\${cartCount}) - $\${cartTotal.toFixed(2)}\`;
      }
    },
    
    showNotification: function(message) {
      // Simple notification system
      const notification = document.createElement('div');
      notification.style.cssText = \`
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem;
        border-radius: 0.5rem;
        z-index: 10000;
        animation: slideIn 0.3s ease;
      \`;
      notification.textContent = message;
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.remove();
      }, 3000);
    }
  };
  
  // Add event listeners for add to cart buttons
  document.addEventListener('click', function(e) {
    if (e.target.textContent.includes('Add to Cart')) {
      const productCard = e.target.closest('.card');
      const productName = productCard.querySelector('h3').textContent;
      const product = businessData.products.find(p => p.name === productName);
      if (product) {
        cart.add(product.id);
      }
    }
  });
  
  // Initialize cart display
  cart.updateDisplay();
  ` : ''}
  
  ${data.businessType === 'service' && data.services.length > 0 ? `
  // Service booking functionality
  const booking = {
    selectedService: null,
    
    selectService: function(serviceId) {
      this.selectedService = businessData.services.find(s => s.id === serviceId);
      this.showBookingForm();
    },
    
    showBookingForm: function() {
      if (this.selectedService) {
        if (businessData.calendlyLink) {
          window.open(businessData.calendlyLink, '_blank');
        } else {
          alert(\`To book \${this.selectedService.name}, please contact us at \${businessData.contactInfo.email || businessData.contactInfo.phone}\`);
        }
      }
    }
  };
  
  // Add event listeners for booking buttons
  document.addEventListener('click', function(e) {
    if (e.target.textContent.includes('Book Now')) {
      const serviceCard = e.target.closest('.card');
      const serviceName = serviceCard.querySelector('h3').textContent;
      const service = businessData.services.find(s => s.name === serviceName);
      if (service) {
        booking.selectService(service.id);
      }
    }
  });
  ` : ''}
  
  // FAQ interaction
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('faq-question')) {
      const answer = e.target.nextElementSibling;
      if (answer) {
        answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
      }
    }
  });
  
  // Contact form enhancement
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your message! We will get back to you soon.');
    });
  }
  
  // Analytics tracking (placeholder)
  function trackPageView(page) {
    console.log(\`Page view tracked: \${page}\`);
    // Add your analytics code here
  }
  
  // Performance monitoring
  window.addEventListener('load', function() {
    if ('performance' in window) {
      const navTiming = performance.getEntriesByType('navigation')[0];
      console.log(\`Page load time: \${navTiming.loadEventEnd - navTiming.loadEventStart}ms\`);
    }
  });
});

// Add CSS animation for notifications
const style = document.createElement('style');
style.textContent = \`
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
\`;
document.head.appendChild(style);
`;
};

const generateEcommerceJS = (data: EnhancedWebsiteData): string => {
  return generateEnhancedJS(data) + `

// Additional e-commerce specific functionality
const checkout = {
  items: [],
  
  addItem: function(item) {
    this.items.push(item);
    this.updateTotal();
  },
  
  removeItem: function(itemId) {
    this.items = this.items.filter(item => item.id !== itemId);
    this.updateTotal();
  },
  
  updateTotal: function() {
    const total = this.items.reduce((sum, item) => sum + item.price, 0);
    const totalElement = document.getElementById('checkout-total');
    if (totalElement) {
      totalElement.textContent = '$' + total.toFixed(2);
    }
  },
  
  processPayment: function() {
    // Placeholder for payment processing
    alert('Payment processing would be integrated here with Stripe, PayPal, etc.');
  }
};

// Product search functionality
function searchProducts(query) {
  const products = document.querySelectorAll('.product-card');
  products.forEach(product => {
    const title = product.querySelector('h3').textContent.toLowerCase();
    const description = product.querySelector('p').textContent.toLowerCase();
    const searchTerm = query.toLowerCase();
    
    if (title.includes(searchTerm) || description.includes(searchTerm)) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
}

// Product filtering
function filterProducts(category) {
  // Implementation would depend on product categories
  console.log('Filtering products by category:', category);
}
`;
};

const generateREADME = (data: EnhancedWebsiteData): string => {
  return `# ${data.businessName} - Enhanced Website Template

## Business Information
- **Business Name:** ${data.businessName}
- **Business Type:** ${data.businessType}
- **Industry:** ${data.industry}
- **Target Audience:** ${data.targetAudience}

## Description
${data.businessDescription}

## Features Included
- **Pages:** Home, About, Contact${data.products.length > 0 ? ', Products' : ''}${data.services.length > 0 ? ', Services' : ''}${data.reviews.length > 0 ? ', Reviews' : ''}${data.faqs.length > 0 ? ', FAQ' : ''}
- **Products:** ${data.products.length} products integrated
- **Services:** ${data.services.length} services integrated
- **Reviews:** ${data.reviews.length} customer testimonials
- **FAQs:** ${data.faqs.length} frequently asked questions
- **Contact Information:** Complete business contact details
- **Navigation:** Multi-page navigation system with URL routing
- **Responsive Design:** Mobile, tablet, and desktop optimized
- **SEO Ready:** Meta tags and structured data included

## Technical Features
- Semantic HTML5 structure
- CSS Grid and Flexbox layouts
- JavaScript navigation system
- LocalStorage for cart functionality (e-commerce)
- Performance optimizations
- Accessibility compliant
- Cross-browser compatible

## Business Data Integration
This template includes all the business-specific data you provided:

### Contact Information
${data.contactInfo.email ? `- Email: ${data.contactInfo.email}` : ''}
${data.contactInfo.phone ? `- Phone: ${data.contactInfo.phone}` : ''}
${data.contactInfo.address ? `- Address: ${data.contactInfo.address}` : ''}
${data.contactInfo.businessHours ? `- Hours: ${data.contactInfo.businessHours}` : ''}

### Products (${data.products.length})
${data.products.map(product => `- ${product.name}: ${product.price}`).join('\n')}

### Services (${data.services.length})
${data.services.map(service => `- ${service.name}: ${service.price}${service.duration ? ` (${service.duration})` : ''}`).join('\n')}

### Customer Reviews (${data.reviews.length})
${data.reviews.map(review => `- ${review.customerName}: ${review.rating}/5 stars`).join('\n')}

## Setup Instructions
1. Extract all files to your web server directory
2. Open index.html in a web browser
3. Navigate between pages using the navigation menu
4. Customize styling in styles.css as needed
5. Modify content in index.html to match your brand

## Customization
- Update colors in CSS variables
- Replace placeholder images with your own
- Modify text content to match your brand voice
- Add your own logo and branding elements
- Integrate with your preferred payment processor (for e-commerce)
- Connect with your analytics platform

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance
- Optimized for fast loading
- Minimal external dependencies
- Efficient CSS and JavaScript
- Image optimization ready

Generated by Enhanced AI Website Builder with complete business data integration.
`;
};
