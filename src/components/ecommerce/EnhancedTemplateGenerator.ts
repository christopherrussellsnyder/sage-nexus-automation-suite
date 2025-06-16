
interface EnhancedWebsiteData {
  businessName: string;
  businessDescription: string;
  industry: string;
  targetAudience: string;
  colorScheme: string;
  businessGoals: string;
  existingWebsite: string;
  businessType: 'ecommerce' | 'service' | 'agency';
  contactInfo: {
    phone: string;
    email: string;
    address: string;
    businessHours: string;
  };
  logoUrl?: string;
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
  services: Array<{
    id: string;
    name: string;
    description: string;
    price: string;
    duration?: string;
  }>;
  calendlyLink?: string;
  shippingInfo: {
    shippingMethods: string[];
    freeShippingThreshold?: string;
    shippingZones: string[];
  };
  paymentMethods: string[];
  reviews: Array<{
    id: string;
    customerName: string;
    rating: number;
    review: string;
    date?: string;
  }>;
  faqs: Array<{
    id: string;
    question: string;
    answer: string;
  }>;
  needsPrivacyPolicy: boolean;
  needsTermsOfService: boolean;
  needsRefundPolicy: boolean;
  needsShippingPolicy: boolean;
}

interface EnhancedTemplate {
  id: number;
  name: string;
  description: string;
  preview: string;
  files: {
    'index.html': string;
    'styles.css': string;
    'script.js': string;
    'about.html': string;
    'contact.html': string;
    'products.html'?: string;
    'services.html'?: string;
    'privacy.html'?: string;
    'terms.html'?: string;
    'refund.html'?: string;
    'shipping.html'?: string;
  };
}

export const generateEnhancedTemplates = (data: EnhancedWebsiteData): EnhancedTemplate[] => {
  const templates: EnhancedTemplate[] = [];
  
  for (let i = 1; i <= 3; i++) {
    const template = generateFullTemplate(data, i);
    templates.push(template);
  }
  
  return templates;
};

const generateFullTemplate = (data: EnhancedWebsiteData, templateId: number): EnhancedTemplate => {
  const templateStyles = {
    1: { name: 'Professional Business', accent: 'Clean and trustworthy design' },
    2: { name: 'Modern Commerce', accent: 'Sales-focused with strong CTAs' },
    3: { name: 'Premium Service', accent: 'Elegant and sophisticated' }
  };

  const currentStyle = templateStyles[templateId as keyof typeof templateStyles];
  
  // Enhanced base styles with business-specific modifications
  const enhancedStyles = generateEnhancedStyles(data);
  
  // Generate main index page
  const indexHTML = generateIndexPage(data, templateId);
  
  // Generate additional pages
  const aboutHTML = generateAboutPage(data);
  const contactHTML = generateContactPage(data);
  
  // Business-specific pages
  const files: any = {
    'index.html': indexHTML,
    'styles.css': enhancedStyles,
    'script.js': generateEnhancedScript(data),
    'about.html': aboutHTML,
    'contact.html': contactHTML
  };
  
  // Add business-specific pages
  if (data.businessType === 'ecommerce' && data.products.length > 0) {
    files['products.html'] = generateProductsPage(data);
  }
  
  if ((data.businessType === 'service' || data.businessType === 'agency') && data.services.length > 0) {
    files['services.html'] = generateServicesPage(data);
  }
  
  // Add policy pages
  if (data.needsPrivacyPolicy) {
    files['privacy.html'] = generatePrivacyPolicy(data);
  }
  
  if (data.needsTermsOfService) {
    files['terms.html'] = generateTermsOfService(data);
  }
  
  if (data.needsRefundPolicy && data.businessType === 'ecommerce') {
    files['refund.html'] = generateRefundPolicy(data);
  }
  
  if (data.needsShippingPolicy && data.businessType === 'ecommerce') {
    files['shipping.html'] = generateShippingPolicy(data);
  }

  return {
    id: templateId,
    name: currentStyle.name,
    description: `${currentStyle.accent} - Fully customized for ${data.businessType} businesses`,
    preview: indexHTML,
    files
  };
};

const generateEnhancedStyles = (data: EnhancedWebsiteData): string => {
  return `
    /* Enhanced Business Website Styles */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    :root {
      --primary: #1a1a1a;
      --primary-foreground: #ffffff;
      --secondary: #f5f5f5;
      --secondary-foreground: #1a1a1a;
      --muted: #f8f9fa;
      --muted-foreground: #6b7280;
      --background: #ffffff;
      --foreground: #1a1a1a;
      --border: #e5e7eb;
      --accent: #3b82f6;
      --accent-foreground: #ffffff;
      --success: #10b981;
      --warning: #f59e0b;
      --error: #ef4444;
      
      --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      --spacing-4: 1rem;
      --spacing-6: 1.5rem;
      --spacing-8: 2rem;
      --spacing-12: 3rem;
      --spacing-16: 4rem;
      --spacing-24: 6rem;
      --radius: 0.5rem;
    }
    
    body {
      font-family: var(--font-family);
      line-height: 1.6;
      color: var(--foreground);
      background: var(--background);
      -webkit-font-smoothing: antialiased;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 var(--spacing-4);
    }
    
    .header {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border);
      padding: var(--spacing-4) 0;
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
      display: flex;
      align-items: center;
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary);
    }
    
    .logo img {
      height: 40px;
      margin-right: 0.5rem;
    }
    
    .nav-links {
      display: none;
      gap: var(--spacing-6);
      list-style: none;
    }
    
    @media (min-width: 768px) {
      .nav-links { display: flex; }
    }
    
    .nav-links a {
      text-decoration: none;
      color: var(--muted-foreground);
      font-weight: 500;
      transition: color 0.2s ease;
    }
    
    .nav-links a:hover {
      color: var(--primary);
    }
    
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
      padding: 0.75rem 1.5rem;
    }
    
    .btn-primary {
      background: var(--primary);
      color: var(--primary-foreground);
    }
    
    .btn-primary:hover {
      background: rgba(26, 26, 26, 0.9);
      transform: translateY(-2px);
    }
    
    .hero {
      padding: calc(var(--spacing-24) + 80px) 0 var(--spacing-24);
      text-align: center;
      background: linear-gradient(135deg, var(--background) 0%, var(--muted) 100%);
    }
    
    .hero h1 {
      font-size: 3.5rem;
      font-weight: 800;
      margin-bottom: var(--spacing-6);
      color: var(--primary);
      line-height: 1.1;
    }
    
    .hero p {
      font-size: 1.25rem;
      color: var(--muted-foreground);
      margin-bottom: var(--spacing-8);
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }
    
    .section {
      padding: var(--spacing-16) 0;
    }
    
    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: var(--spacing-4);
      color: var(--primary);
      text-align: center;
    }
    
    .grid {
      display: grid;
      gap: var(--spacing-6);
    }
    
    .grid-2 {
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
    
    .grid-3 {
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
    
    .card {
      background: var(--background);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: var(--spacing-6);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
      transition: all 0.3s ease;
    }
    
    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }
    
    .product-card, .service-card {
      position: relative;
      overflow: hidden;
    }
    
    .product-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: var(--radius);
      margin-bottom: var(--spacing-4);
    }
    
    .price {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--accent);
      margin: var(--spacing-4) 0;
    }
    
    .add-to-cart {
      width: 100%;
      background: var(--accent);
      color: var(--accent-foreground);
      border: none;
      padding: 0.75rem;
      border-radius: var(--radius);
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .add-to-cart:hover {
      background: rgba(59, 130, 246, 0.9);
      transform: translateY(-2px);
    }
    
    .reviews-section {
      background: var(--muted);
    }
    
    .review-card {
      background: var(--background);
      padding: var(--spacing-6);
      border-radius: var(--radius);
      margin-bottom: var(--spacing-4);
    }
    
    .stars {
      color: #fbbf24;
      margin-bottom: var(--spacing-2);
    }
    
    .faq-section {
      max-width: 800px;
      margin: 0 auto;
    }
    
    .faq-item {
      border-bottom: 1px solid var(--border);
      padding: var(--spacing-4) 0;
    }
    
    .faq-question {
      font-weight: 600;
      margin-bottom: var(--spacing-2);
      cursor: pointer;
    }
    
    ${data.businessType === 'ecommerce' ? `
      .cart-widget {
        position: fixed;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
        background: var(--accent);
        color: var(--accent-foreground);
        border-radius: 50%;
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        cursor: pointer;
        z-index: 1000;
      }
      
      .checkout-section {
        background: var(--muted);
        padding: var(--spacing-8);
        border-radius: var(--radius);
        margin-top: var(--spacing-8);
      }
    ` : ''}
    
    ${(data.businessType === 'service' || data.businessType === 'agency') && data.calendlyLink ? `
      .calendly-widget {
        background: var(--accent);
        color: var(--accent-foreground);
        padding: var(--spacing-8);
        text-align: center;
        border-radius: var(--radius);
        margin: var(--spacing-8) 0;
      }
    ` : ''}
    
    .contact-info {
      background: var(--muted);
      padding: var(--spacing-6);
      border-radius: var(--radius);
      margin-bottom: var(--spacing-8);
    }
    
    .footer {
      background: var(--primary);
      color: var(--primary-foreground);
      padding: var(--spacing-16) 0 var(--spacing-8);
      text-align: center;
    }
    
    .footer-links {
      display: flex;
      justify-content: center;
      gap: var(--spacing-6);
      margin-bottom: var(--spacing-4);
      flex-wrap: wrap;
    }
    
    .footer-links a {
      color: var(--primary-foreground);
      text-decoration: none;
      opacity: 0.8;
      transition: opacity 0.2s ease;
    }
    
    .footer-links a:hover {
      opacity: 1;
    }
    
    @media (max-width: 767px) {
      .hero h1 { font-size: 2.5rem; }
      .section-title { font-size: 2rem; }
      .grid-2, .grid-3 { grid-template-columns: 1fr; }
    }
  `;
};

const generateIndexPage = (data: EnhancedWebsiteData, templateId: number): string => {
  const businessTypeContent = generateBusinessSpecificContent(data);
  const reviewsHTML = generateReviewsHTML(data.reviews);
  const faqHTML = generateFAQHTML(data.faqs);
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.businessName} - ${data.businessDescription}</title>
    <meta name="description" content="${data.businessDescription}">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header class="header">
        <div class="container">
            <nav class="nav">
                <div class="logo">
                    ${data.logoUrl ? `<img src="${data.logoUrl}" alt="${data.businessName}" />` : ''}
                    ${data.businessName}
                </div>
                <ul class="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    ${data.businessType === 'ecommerce' && data.products.length > 0 ? '<li><a href="#products">Products</a></li>' : ''}
                    ${(data.businessType === 'service' || data.businessType === 'agency') && data.services.length > 0 ? '<li><a href="#services">Services</a></li>' : ''}
                    <li><a href="#reviews">Reviews</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
                <div>
                    <a href="#contact" class="btn btn-primary">Get Started</a>
                </div>
            </nav>
        </div>
    </header>

    <main>
        <section id="home" class="hero">
            <div class="container">
                <h1>Welcome to ${data.businessName}</h1>
                <p>${data.businessDescription}</p>
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-bottom: 2rem;">
                    ${data.businessType === 'ecommerce' ? '<a href="#products" class="btn btn-primary">Shop Now</a>' : ''}
                    ${data.businessType === 'service' && data.calendlyLink ? `<a href="${data.calendlyLink}" target="_blank" class="btn btn-primary">Book Consultation</a>` : ''}
                    ${data.businessType === 'agency' ? '<a href="#services" class="btn btn-primary">Our Services</a>' : ''}
                    <a href="#about" class="btn" style="background: transparent; border: 2px solid var(--primary); color: var(--primary);">Learn More</a>
                </div>
                
                ${data.contactInfo.businessHours ? `
                <div class="contact-info">
                    <h3>Business Hours</h3>
                    <p>${data.contactInfo.businessHours}</p>
                </div>
                ` : ''}
            </div>
        </section>

        <section id="about" class="section">
            <div class="container">
                <h2 class="section-title">About ${data.businessName}</h2>
                <div class="grid grid-2" style="align-items: center;">
                    <div>
                        <p style="font-size: 1.125rem; margin-bottom: 1.5rem;">${data.businessDescription}</p>
                        <p>We specialize in serving ${data.targetAudience} in the ${data.industry} industry. Our goal is to ${data.businessGoals.toLowerCase()}.</p>
                    </div>
                    <div style="text-align: center;">
                        <div class="card">
                            <h3>Why Choose Us?</h3>
                            <ul style="text-align: left; margin-top: 1rem;">
                                <li>Expert knowledge in ${data.industry}</li>
                                <li>Dedicated to ${data.targetAudience}</li>
                                <li>Proven track record of success</li>
                                <li>Personalized service approach</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        ${businessTypeContent}
        ${reviewsHTML}
        ${faqHTML}

        <section id="contact" class="section" style="background: var(--muted);">
            <div class="container">
                <h2 class="section-title">Contact Us</h2>
                <div class="grid grid-2">
                    <div class="card">
                        <h3>Get In Touch</h3>
                        <div style="margin-top: 1rem;">
                            ${data.contactInfo.phone ? `<p><strong>Phone:</strong> ${data.contactInfo.phone}</p>` : ''}
                            ${data.contactInfo.email ? `<p><strong>Email:</strong> ${data.contactInfo.email}</p>` : ''}
                            ${data.contactInfo.address ? `<p><strong>Address:</strong> ${data.contactInfo.address}</p>` : ''}
                            ${data.contactInfo.businessHours ? `<p><strong>Hours:</strong> ${data.contactInfo.businessHours}</p>` : ''}
                        </div>
                        ${data.paymentMethods.length > 0 ? `
                        <div style="margin-top: 1.5rem;">
                            <h4>We Accept:</h4>
                            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.5rem;">
                                ${data.paymentMethods.map(method => `<span style="background: var(--primary); color: var(--primary-foreground); padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.75rem;">${method}</span>`).join('')}
                            </div>
                        </div>
                        ` : ''}
                    </div>
                    <div class="card">
                        <h3>Send us a Message</h3>
                        <form style="margin-top: 1rem;">
                            <input type="text" placeholder="Your Name" style="width: 100%; padding: 0.75rem; margin-bottom: 1rem; border: 1px solid var(--border); border-radius: var(--radius);" required>
                            <input type="email" placeholder="Your Email" style="width: 100%; padding: 0.75rem; margin-bottom: 1rem; border: 1px solid var(--border); border-radius: var(--radius);" required>
                            <textarea placeholder="Your Message" rows="4" style="width: 100%; padding: 0.75rem; margin-bottom: 1rem; border: 1px solid var(--border); border-radius: var(--radius); resize: vertical;" required></textarea>
                            <button type="submit" class="btn btn-primary" style="width: 100%;">Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </main>

    ${data.businessType === 'ecommerce' ? `
    <div class="cart-widget" onclick="toggleCart()">
        🛒 <span id="cart-count">0</span>
    </div>
    ` : ''}

    <footer class="footer">
        <div class="container">
            <div class="footer-links">
                <a href="about.html">About</a>
                <a href="contact.html">Contact</a>
                ${data.needsPrivacyPolicy ? '<a href="privacy.html">Privacy Policy</a>' : ''}
                ${data.needsTermsOfService ? '<a href="terms.html">Terms of Service</a>' : ''}
                ${data.needsRefundPolicy ? '<a href="refund.html">Refund Policy</a>' : ''}
                ${data.needsShippingPolicy ? '<a href="shipping.html">Shipping Policy</a>' : ''}
            </div>
            <p>&copy; 2024 ${data.businessName}. All rights reserved.</p>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>`;
};

const generateBusinessSpecificContent = (data: EnhancedWebsiteData): string => {
  if (data.businessType === 'ecommerce' && data.products.length > 0) {
    return `
        <section id="products" class="section">
            <div class="container">
                <h2 class="section-title">Our Products</h2>
                <div class="grid grid-3">
                    ${data.products.map(product => `
                        <div class="card product-card">
                            ${product.imageUrl ? `<img src="${product.imageUrl}" alt="${product.name}" class="product-image">` : ''}
                            <h3>${product.name}</h3>
                            <p>${product.description}</p>
                            <div class="price">${product.price}</div>
                            ${product.variations.length > 0 ? `
                                <select style="width: 100%; padding: 0.5rem; margin-bottom: 1rem; border: 1px solid var(--border); border-radius: var(--radius);">
                                    ${product.variations.map(variation => `<option value="${variation.value}">${variation.name}: ${variation.value}</option>`).join('')}
                                </select>
                            ` : ''}
                            <button class="add-to-cart" onclick="addToCart('${product.id}', '${product.name}', '${product.price}')">
                                Add to Cart
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
    `;
  } else if ((data.businessType === 'service' || data.businessType === 'agency') && data.services.length > 0) {
    return `
        <section id="services" class="section">
            <div class="container">
                <h2 class="section-title">Our Services</h2>
                ${data.calendlyLink ? `
                <div class="calendly-widget">
                    <h3>Ready to Get Started?</h3>
                    <p>Book a consultation to discuss your needs</p>
                    <a href="${data.calendlyLink}" target="_blank" class="btn" style="background: var(--background); color: var(--accent); margin-top: 1rem;">Schedule Meeting</a>
                </div>
                ` : ''}
                <div class="grid grid-2">
                    ${data.services.map(service => `
                        <div class="card service-card">
                            <h3>${service.name}</h3>
                            <p>${service.description}</p>
                            <div class="price">${service.price}</div>
                            ${service.duration ? `<p><strong>Duration:</strong> ${service.duration}</p>` : ''}
                            <button class="add-to-cart" onclick="bookService('${service.id}', '${service.name}', '${service.price}')">
                                Book Now
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
    `;
  }
  return '';
};

const generateReviewsHTML = (reviews: any[]): string => {
  if (reviews.length === 0) return '';
  
  return `
    <section id="reviews" class="section reviews-section">
        <div class="container">
            <h2 class="section-title">What Our Customers Say</h2>
            <div class="grid grid-2">
                ${reviews.map(review => `
                    <div class="review-card">
                        <div class="stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
                        <p>"${review.review}"</p>
                        <p style="margin-top: 1rem; font-weight: 600;">- ${review.customerName}</p>
                        ${review.date ? `<p style="font-size: 0.875rem; color: var(--muted-foreground);">${review.date}</p>` : ''}
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
  `;
};

const generateFAQHTML = (faqs: any[]): string => {
  if (faqs.length === 0) return '';
  
  return `
    <section class="section">
        <div class="container">
            <h2 class="section-title">Frequently Asked Questions</h2>
            <div class="faq-section">
                ${faqs.map(faq => `
                    <div class="faq-item">
                        <div class="faq-question">${faq.question}</div>
                        <div class="faq-answer" style="color: var(--muted-foreground);">${faq.answer}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
  `;
};

const generateAboutPage = (data: EnhancedWebsiteData): string => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About ${data.businessName}</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header class="header">
        <div class="container">
            <nav class="nav">
                <div class="logo">
                    ${data.logoUrl ? `<img src="${data.logoUrl}" alt="${data.businessName}" />` : ''}
                    ${data.businessName}
                </div>
                <ul class="nav-links">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="about.html">About</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main>
        <section class="section" style="padding-top: calc(var(--spacing-24) + 80px);">
            <div class="container">
                <h1 class="section-title">About ${data.businessName}</h1>
                <div class="card" style="max-width: 800px; margin: 0 auto;">
                    <p style="font-size: 1.125rem; margin-bottom: 1.5rem;">${data.businessDescription}</p>
                    <p>We are dedicated to serving ${data.targetAudience} in the ${data.industry} industry. Our mission is to ${data.businessGoals.toLowerCase()} through exceptional service and expertise.</p>
                </div>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 ${data.businessName}. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>`;
};

const generateContactPage = (data: EnhancedWebsiteData): string => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact ${data.businessName}</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header class="header">
        <div class="container">
            <nav class="nav">
                <div class="logo">
                    ${data.logoUrl ? `<img src="${data.logoUrl}" alt="${data.businessName}" />` : ''}
                    ${data.businessName}
                </div>
                <ul class="nav-links">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="about.html">About</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main>
        <section class="section" style="padding-top: calc(var(--spacing-24) + 80px);">
            <div class="container">
                <h1 class="section-title">Contact Us</h1>
                <div class="grid grid-2">
                    <div class="card">
                        <h3>Get In Touch</h3>
                        <div style="margin-top: 1rem;">
                            ${data.contactInfo.phone ? `<p><strong>Phone:</strong> ${data.contactInfo.phone}</p>` : ''}
                            ${data.contactInfo.email ? `<p><strong>Email:</strong> ${data.contactInfo.email}</p>` : ''}
                            ${data.contactInfo.address ? `<p><strong>Address:</strong> ${data.contactInfo.address}</p>` : ''}
                            ${data.contactInfo.businessHours ? `<p><strong>Hours:</strong> ${data.contactInfo.businessHours}</p>` : ''}
                        </div>
                    </div>
                    <div class="card">
                        <h3>Send us a Message</h3>
                        <form style="margin-top: 1rem;">
                            <input type="text" placeholder="Your Name" style="width: 100%; padding: 0.75rem; margin-bottom: 1rem; border: 1px solid var(--border); border-radius: var(--radius);" required>
                            <input type="email" placeholder="Your Email" style="width: 100%; padding: 0.75rem; margin-bottom: 1rem; border: 1px solid var(--border); border-radius: var(--radius);" required>
                            <textarea placeholder="Your Message" rows="4" style="width: 100%; padding: 0.75rem; margin-bottom: 1rem; border: 1px solid var(--border); border-radius: var(--radius); resize: vertical;" required></textarea>
                            <button type="submit" class="btn btn-primary" style="width: 100%;">Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 ${data.businessName}. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>`;
};

const generateProductsPage = (data: EnhancedWebsiteData): string => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Products - ${data.businessName}</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header class="header">
        <div class="container">
            <nav class="nav">
                <div class="logo">
                    ${data.logoUrl ? `<img src="${data.logoUrl}" alt="${data.businessName}" />` : ''}
                    ${data.businessName}
                </div>
                <ul class="nav-links">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="about.html">About</a></li>
                    <li><a href="products.html">Products</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main>
        <section class="section" style="padding-top: calc(var(--spacing-24) + 80px);">
            <div class="container">
                <h1 class="section-title">Our Products</h1>
                <div class="grid grid-3">
                    ${data.products.map(product => `
                        <div class="card product-card">
                            ${product.imageUrl ? `<img src="${product.imageUrl}" alt="${product.name}" class="product-image">` : ''}
                            <h3>${product.name}</h3>
                            <p>${product.description}</p>
                            <div class="price">${product.price}</div>
                            ${product.variations.length > 0 ? `
                                <select style="width: 100%; padding: 0.5rem; margin-bottom: 1rem; border: 1px solid var(--border); border-radius: var(--radius);">
                                    ${product.variations.map(variation => `<option value="${variation.value}">${variation.name}: ${variation.value}</option>`).join('')}
                                </select>
                            ` : ''}
                            <button class="add-to-cart" onclick="addToCart('${product.id}', '${product.name}', '${product.price}')">
                                Add to Cart
                            </button>
                        </div>
                    `).join('')}
                </div>
                
                ${data.shippingInfo.shippingMethods.length > 0 ? `
                <div class="card" style="margin-top: 2rem;">
                    <h3>Shipping Information</h3>
                    <p>We offer the following shipping methods:</p>
                    <ul>
                        ${data.shippingInfo.shippingMethods.map(method => `<li>${method}</li>`).join('')}
                    </ul>
                    ${data.shippingInfo.freeShippingThreshold ? `<p>Free shipping on orders over ${data.shippingInfo.freeShippingThreshold}!</p>` : ''}
                </div>
                ` : ''}
            </div>
        </section>
    </main>

    <div class="cart-widget" onclick="toggleCart()">
        🛒 <span id="cart-count">0</span>
    </div>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 ${data.businessName}. All rights reserved.</p>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>`;
};

const generateServicesPage = (data: EnhancedWebsiteData): string => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Services - ${data.businessName}</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header class="header">
        <div class="container">
            <nav class="nav">
                <div class="logo">
                    ${data.logoUrl ? `<img src="${data.logoUrl}" alt="${data.businessName}" />` : ''}
                    ${data.businessName}
                </div>
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
        <section class="section" style="padding-top: calc(var(--spacing-24) + 80px);">
            <div class="container">
                <h1 class="section-title">Our Services</h1>
                
                ${data.calendlyLink ? `
                <div class="calendly-widget" style="margin-bottom: 2rem;">
                    <h3>Ready to Get Started?</h3>
                    <p>Book a consultation to discuss your needs</p>
                    <a href="${data.calendlyLink}" target="_blank" class="btn" style="background: var(--background); color: var(--accent); margin-top: 1rem;">Schedule Meeting</a>
                </div>
                ` : ''}
                
                <div class="grid grid-2">
                    ${data.services.map(service => `
                        <div class="card service-card">
                            <h3>${service.name}</h3>
                            <p>${service.description}</p>
                            <div class="price">${service.price}</div>
                            ${service.duration ? `<p><strong>Duration:</strong> ${service.duration}</p>` : ''}
                            <button class="add-to-cart" onclick="bookService('${service.id}', '${service.name}', '${service.price}')">
                                Book Now
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 ${data.businessName}. All rights reserved.</p>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>`;
};

const generatePrivacyPolicy = (data: EnhancedWebsiteData): string => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Privacy Policy - ${data.businessName}</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header class="header">
        <div class="container">
            <nav class="nav">
                <div class="logo">
                    ${data.logoUrl ? `<img src="${data.logoUrl}" alt="${data.businessName}" />` : ''}
                    ${data.businessName}
                </div>
                <ul class="nav-links">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main>
        <section class="section" style="padding-top: calc(var(--spacing-24) + 80px);">
            <div class="container">
                <div style="max-width: 800px; margin: 0 auto;">
                    <h1 class="section-title">Privacy Policy</h1>
                    <div class="card">
                        <p><strong>Last updated:</strong> ${new Date().toLocaleDateString()}</p>
                        
                        <h3>Information We Collect</h3>
                        <p>We collect information you provide directly to us, such as when you contact us, use our services, or make a purchase.</p>
                        
                        <h3>How We Use Your Information</h3>
                        <p>We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.</p>
                        
                        <h3>Information Sharing</h3>
                        <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>
                        
                        <h3>Data Security</h3>
                        <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
                        
                        <h3>Contact Us</h3>
                        <p>If you have any questions about this Privacy Policy, please contact us at ${data.contactInfo.email}.</p>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 ${data.businessName}. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>`;
};

const generateTermsOfService = (data: EnhancedWebsiteData): string => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Terms of Service - ${data.businessName}</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header class="header">
        <div class="container">
            <nav class="nav">
                <div class="logo">
                    ${data.logoUrl ? `<img src="${data.logoUrl}" alt="${data.businessName}" />` : ''}
                    ${data.businessName}
                </div>
                <ul class="nav-links">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main>
        <section class="section" style="padding-top: calc(var(--spacing-24) + 80px);">
            <div class="container">
                <div style="max-width: 800px; margin: 0 auto;">
                    <h1 class="section-title">Terms of Service</h1>
                    <div class="card">
                        <p><strong>Last updated:</strong> ${new Date().toLocaleDateString()}</p>
                        
                        <h3>Acceptance of Terms</h3>
                        <p>By accessing and using our services, you accept and agree to be bound by the terms and provision of this agreement.</p>
                        
                        <h3>Use License</h3>
                        <p>Permission is granted to temporarily use our services for personal, non-commercial transitory viewing only.</p>
                        
                        <h3>Disclaimer</h3>
                        <p>The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
                        
                        <h3>Limitations</h3>
                        <p>In no event shall ${data.businessName} or its suppliers be liable for any damages arising out of the use or inability to use our services.</p>
                        
                        <h3>Contact Information</h3>
                        <p>Questions about the Terms of Service should be sent to us at ${data.contactInfo.email}.</p>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 ${data.businessName}. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>`;
};

const generateRefundPolicy = (data: EnhancedWebsiteData): string => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Refund Policy - ${data.businessName}</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header class="header">
        <div class="container">
            <nav class="nav">
                <div class="logo">
                    ${data.logoUrl ? `<img src="${data.logoUrl}" alt="${data.businessName}" />` : ''}
                    ${data.businessName}
                </div>
                <ul class="nav-links">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main>
        <section class="section" style="padding-top: calc(var(--spacing-24) + 80px);">
            <div class="container">
                <div style="max-width: 800px; margin: 0 auto;">
                    <h1 class="section-title">Refund Policy</h1>
                    <div class="card">
                        <p><strong>Last updated:</strong> ${new Date().toLocaleDateString()}</p>
                        
                        <h3>30-Day Return Policy</h3>
                        <p>We offer a 30-day return policy for most items. Items must be returned in their original condition with all packaging and accessories.</p>
                        
                        <h3>Refund Process</h3>
                        <p>Once we receive and inspect your returned item, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.</p>
                        
                        <h3>Processing Time</h3>
                        <p>If your refund is approved, it will be processed and a credit will automatically be applied to your original method of payment within 5-10 business days.</p>
                        
                        <h3>Shipping Costs</h3>
                        <p>Original shipping costs are non-refundable. You will be responsible for paying for your own shipping costs for returning items unless the return is due to our error.</p>
                        
                        <h3>Contact Us</h3>
                        <p>If you have any questions about our refund policy, please contact us at ${data.contactInfo.email} or ${data.contactInfo.phone}.</p>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 ${data.businessName}. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>`;
};

const generateShippingPolicy = (data: EnhancedWebsiteData): string => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shipping Policy - ${data.businessName}</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header class="header">
        <div class="container">
            <nav class="nav">
                <div class="logo">
                    ${data.logoUrl ? `<img src="${data.logoUrl}" alt="${data.businessName}" />` : ''}
                    ${data.businessName}
                </div>
                <ul class="nav-links">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main>
        <section class="section" style="padding-top: calc(var(--spacing-24) + 80px);">
            <div class="container">
                <div style="max-width: 800px; margin: 0 auto;">
                    <h1 class="section-title">Shipping Policy</h1>
                    <div class="card">
                        <p><strong>Last updated:</strong> ${new Date().toLocaleDateString()}</p>
                        
                        <h3>Shipping Methods</h3>
                        ${data.shippingInfo.shippingMethods.length > 0 ? `
                        <p>We offer the following shipping methods:</p>
                        <ul>
                            ${data.shippingInfo.shippingMethods.map(method => `<li>${method}</li>`).join('')}
                        </ul>
                        ` : '<p>Standard shipping is available for all orders.</p>'}
                        
                        <h3>Processing Time</h3>
                        <p>Orders are typically processed within 1-2 business days. You will receive a shipping confirmation email with tracking information once your order has shipped.</p>
                        
                        ${data.shippingInfo.freeShippingThreshold ? `
                        <h3>Free Shipping</h3>
                        <p>We offer free shipping on orders over ${data.shippingInfo.freeShippingThreshold}.</p>
                        ` : ''}
                        
                        <h3>Delivery Times</h3>
                        <p>Delivery times vary depending on your location and the shipping method selected. Standard shipping typically takes 3-7 business days.</p>
                        
                        <h3>International Shipping</h3>
                        <p>We currently ship to select international destinations. Additional customs fees and import duties may apply for international orders.</p>
                        
                        <h3>Contact Us</h3>
                        <p>If you have any questions about shipping, please contact us at ${data.contactInfo.email} or ${data.contactInfo.phone}.</p>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 ${data.businessName}. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>`;
};

const generateEnhancedScript = (data: EnhancedWebsiteData): string => {
  return `
// Enhanced Website Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Cart functionality for e-commerce
    ${data.businessType === 'ecommerce' ? `
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    function addToCart(id, name, price) {
        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showAddedToCartMessage(name);
    }
    
    function updateCartCount() {
        const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = cartCount;
        }
    }
    
    function showAddedToCartMessage(itemName) {
        const message = document.createElement('div');
        message.textContent = itemName + ' added to cart!';
        message.style.cssText = 'position: fixed; top: 20px; right: 20px; background: var(--success); color: white; padding: 1rem; border-radius: 0.5rem; z-index: 10000; animation: slideIn 0.3s ease;';
        document.body.appendChild(message);
        setTimeout(() => {
            message.remove();
        }, 3000);
    }
    
    function toggleCart() {
        // Simple cart display - in a real implementation, this would open a cart modal
        alert('Cart contains ' + cart.length + ' items. Total: $' + cart.reduce((total, item) => total + (parseFloat(item.price.replace('$', '')) * item.quantity), 0).toFixed(2));
    }
    
    // Initialize cart count
    updateCartCount();
    
    // Make functions global
    window.addToCart = addToCart;
    window.toggleCart = toggleCart;
    ` : ''}
    
    // Service booking functionality
    ${(data.businessType === 'service' || data.businessType === 'agency') ? `
    function bookService(id, name, price) {
        if ('${data.calendlyLink}') {
            window.open('${data.calendlyLink}', '_blank');
        } else {
            // Redirect to contact page or show booking form
            alert('Thank you for your interest in ' + name + '. Please contact us to schedule this service.');
        }
    }
    
    window.bookService = bookService;
    ` : ''}
    
    // Form handling
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real implementation, this would submit to a backend
            alert('Thank you for your message! We will get back to you soon.');
            form.reset();
        });
    });
    
    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isOpen = answer.style.display === 'block';
            
            // Close all answers
            document.querySelectorAll('.faq-answer').forEach(ans => {
                ans.style.display = 'none';
            });
            
            // Toggle current answer
            if (!isOpen) {
                answer.style.display = 'block';
            }
        });
    });
    
    // Header scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const header = document.querySelector('.header');
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        // Add shadow on scroll
        if (scrollTop > 10) {
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
});

// CSS animations
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

export type { EnhancedWebsiteData, EnhancedTemplate };
export { generateEnhancedTemplates };
