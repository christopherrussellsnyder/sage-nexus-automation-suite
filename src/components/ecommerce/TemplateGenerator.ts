
interface WebsiteData {
  businessName: string;
  businessDescription: string;
  industry: string;
  targetAudience: string;
  colorScheme: string;
  businessGoals: string;
  existingWebsite: string;
}

interface Template {
  id: number;
  name: string;
  description: string;
  preview: string;
  files: {
    'index.html': string;
    'styles.css': string;
    'script.js': string;
  };
}

export const generateLovableStyleTemplates = (data: WebsiteData): Template[] => {
  const modernBaseStyles = `
    /* Lovable-inspired Design System */
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
    
    @media (min-width: 640px) {
      .container { padding: 0 var(--spacing-6); }
    }
    
    .header {
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border);
      padding: var(--spacing-4) 0;
      position: sticky;
      top: 0;
      z-index: 50;
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
      gap: var(--spacing-8);
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
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }
    
    .btn-primary:hover {
      background: rgba(26, 26, 26, 0.9);
      transform: translateY(-1px);
    }
    
    .btn-secondary {
      background: var(--secondary);
      color: var(--secondary-foreground);
      border: 1px solid var(--border);
    }
    
    .btn-secondary:hover {
      background: rgba(245, 245, 245, 0.8);
    }
    
    .hero {
      padding: var(--spacing-24) 0;
      text-align: center;
      background: linear-gradient(135deg, var(--background), var(--muted));
    }
    
    .hero h1 {
      font-size: 3rem;
      font-weight: 800;
      margin-bottom: var(--spacing-6);
      color: var(--primary);
      letter-spacing: -0.025em;
      line-height: 1.1;
    }
    
    @media (max-width: 768px) {
      .hero h1 { font-size: 2rem; }
    }
    
    .hero p {
      font-size: 1.25rem;
      color: var(--muted-foreground);
      margin-bottom: var(--spacing-8);
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }
    
    .hero-actions {
      display: flex;
      gap: var(--spacing-4);
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: var(--spacing-12);
    }
    
    .section {
      padding: var(--spacing-24) 0;
    }
    
    .section-header {
      text-align: center;
      margin-bottom: var(--spacing-16);
    }
    
    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: var(--spacing-4);
      color: var(--primary);
    }
    
    .section-description {
      font-size: 1.125rem;
      color: var(--muted-foreground);
      max-width: 600px;
      margin: 0 auto;
    }
    
    .grid {
      display: grid;
      gap: var(--spacing-8);
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
    
    .card {
      background: var(--background);
      border: 1px solid var(--border);
      border-radius: calc(var(--radius) * 1.5);
      padding: var(--spacing-8);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;
    }
    
    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }
    
    .card h3 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: var(--spacing-4);
      color: var(--primary);
    }
    
    .card p {
      color: var(--muted-foreground);
      margin-bottom: var(--spacing-6);
    }
    
    .stats {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--spacing-6);
      margin: var(--spacing-12) 0;
    }
    
    @media (min-width: 768px) {
      .stats { grid-template-columns: repeat(4, 1fr); }
    }
    
    .stat {
      text-align: center;
      padding: var(--spacing-6);
      background: var(--muted);
      border-radius: var(--radius);
    }
    
    .stat-number {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--accent);
      margin-bottom: 0.5rem;
    }
    
    .stat-label {
      color: var(--muted-foreground);
      font-size: 0.875rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    
    .footer {
      background: var(--primary);
      color: var(--primary-foreground);
      padding: var(--spacing-16) 0 var(--spacing-8);
      text-align: center;
    }
    
    .fade-in {
      opacity: 0;
      transform: translateY(20px);
      animation: fadeIn 0.6s ease forwards;
    }
    
    @keyframes fadeIn {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @media (max-width: 767px) {
      .hero { padding: var(--spacing-16) 0; }
      .hero-actions { flex-direction: column; align-items: center; }
      .btn { width: 100%; max-width: 280px; }
      .section { padding: var(--spacing-16) 0; }
    }
  `;

  const businessType = determineBusinessType(data);
  const templates: Template[] = [];

  for (let i = 1; i <= 5; i++) {
    const template = generateModernTemplate(data, businessType, i, modernBaseStyles);
    templates.push(template);
  }

  return templates;
};

const determineBusinessType = (data: WebsiteData): string => {
  const industry = data.industry.toLowerCase();
  const description = data.businessDescription.toLowerCase();
  
  if (industry.includes('fashion') || industry.includes('ecommerce') || description.includes('sell')) {
    return 'ecommerce';
  } else if (industry.includes('service') || industry.includes('consulting')) {
    return 'services';
  } else if (industry.includes('tech') || industry.includes('software')) {
    return 'tech';
  } else {
    return 'business';
  }
};

const generateModernTemplate = (data: WebsiteData, businessType: string, templateId: number, baseStyles: string): Template => {
  const templateStyles = {
    1: { name: 'Clean Minimalist', accent: 'Modern & sophisticated' },
    2: { name: 'Bold Professional', accent: 'Strong typography' },
    3: { name: 'Elegant Corporate', accent: 'Professional elegance' },
    4: { name: 'Creative Modern', accent: 'Creative layouts' },
    5: { name: 'Premium Luxury', accent: 'Luxurious feel' }
  };

  const currentStyle = templateStyles[templateId as keyof typeof templateStyles];

  const getBusinessSpecificContent = () => {
    switch (businessType) {
      case 'ecommerce':
        return {
          heroTitle: `${data.businessName}`,
          heroSubtitle: `Discover premium products. ${data.businessDescription}`,
          sections: ['Products', 'About', 'Reviews', 'Contact'],
          cta: 'Shop Now',
          features: ['Premium quality', 'Fast shipping', 'Great service', 'Money back guarantee']
        };
      case 'services':
        return {
          heroTitle: `${data.businessName}`,
          heroSubtitle: `Professional services that deliver results. ${data.businessDescription}`,
          sections: ['Services', 'About', 'Testimonials', 'Contact'],
          cta: 'Get Started',
          features: ['Expert team', 'Proven results', 'Personal approach', '24/7 support']
        };
      default:
        return {
          heroTitle: `${data.businessName}`,
          heroSubtitle: `${data.businessDescription}`,
          sections: ['About', 'Services', 'Portfolio', 'Contact'],
          cta: 'Learn More',
          features: ['Quality work', 'Professional team', 'Great results', 'Trusted service']
        };
    }
  };

  const content = getBusinessSpecificContent();
  
  const completeHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.businessName} - ${currentStyle.name}</title>
    <meta name="description" content="${data.businessDescription}">
    <style>
        ${baseStyles}
    </style>
</head>
<body>
    <header class="header">
        <div class="container">
            <nav class="nav">
                <div class="logo">${data.businessName}</div>
                <ul class="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
                <div>
                    <a href="#contact" class="btn btn-primary">${content.cta}</a>
                </div>
            </nav>
        </div>
    </header>

    <main>
        <section class="hero" id="home">
            <div class="container">
                <div class="hero-content fade-in">
                    <h1>${content.heroTitle}</h1>
                    <p>${content.heroSubtitle}</p>
                    <div class="hero-actions">
                        <a href="#services" class="btn btn-primary">${content.cta}</a>
                        <a href="#about" class="btn btn-secondary">Learn More</a>
                    </div>
                    <div class="stats">
                        <div class="stat">
                            <div class="stat-number">500+</div>
                            <div class="stat-label">Happy Clients</div>
                        </div>
                        <div class="stat">
                            <div class="stat-number">99%</div>
                            <div class="stat-label">Success Rate</div>
                        </div>
                        <div class="stat">
                            <div class="stat-number">24/7</div>
                            <div class="stat-label">Support</div>
                        </div>
                        <div class="stat">
                            <div class="stat-number">5+</div>
                            <div class="stat-label">Years Experience</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="section" id="about">
            <div class="container">
                <div class="section-header fade-in">
                    <h2 class="section-title">Why Choose ${data.businessName}?</h2>
                    <p class="section-description">
                        We deliver exceptional results through innovation and expertise.
                    </p>
                </div>
                <div class="grid grid-3">
                    ${content.features.map((feature, index) => `
                        <div class="card fade-in">
                            <h3>${feature}</h3>
                            <p>Our ${feature.toLowerCase()} ensures you receive the highest quality service tailored for ${data.targetAudience}.</p>
                            <a href="#contact" class="btn btn-primary">Learn More</a>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <section class="section" id="contact">
            <div class="container">
                <div class="section-header fade-in">
                    <h2 class="section-title">Ready to Get Started?</h2>
                    <p class="section-description">
                        Contact us today to learn how we can help you achieve your goals.
                    </p>
                </div>
                <div style="text-align: center;" class="fade-in">
                    <a href="#" class="btn btn-primary" style="margin-right: 1rem;">${content.cta}</a>
                    <a href="#" class="btn btn-secondary">Contact Us</a>
                </div>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 ${data.businessName}. All rights reserved.</p>
            <p style="opacity: 0.8; margin-top: 0.5rem;">Professional ${data.industry.toLowerCase()} solutions for ${data.targetAudience}.</p>
        </div>
    </footer>

    <script>
        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Fade in animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        });

        document.querySelectorAll('.fade-in').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
    </script>
</body>
</html>`;

  const js = `
// Smooth scrolling for navigation
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animation observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});`;

  return {
    id: templateId,
    name: `${currentStyle.name} Template`,
    description: `${currentStyle.accent} - Professionally designed for ${data.businessName}`,
    preview: completeHTML,
    files: {
      'index.html': completeHTML,
      'styles.css': baseStyles,
      'script.js': js
    }
  };
};

export type { WebsiteData, Template };
