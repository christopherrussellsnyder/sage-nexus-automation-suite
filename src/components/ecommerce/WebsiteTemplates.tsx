
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Download, Palette, Layout, Zap } from "lucide-react";

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
  id: string;
  name: string;
  description: string;
  features: string[];
  preview: string;
  files: {
    'index.html': string;
    'styles.css': string;
    'script.js': string;
    'about.html': string;
    'services.html': string;
    'contact.html': string;
    'pricing.html'?: string;
    'products.html'?: string;
  };
}

interface WebsiteTemplatesProps {
  templates: any[];
  onSelectTemplate: (template: any) => void;
  onPreviewTemplate: (template: any) => void;
  websiteData: WebsiteData | null;
  isGenerated: boolean;
}

const WebsiteTemplates = ({ 
  templates, 
  onSelectTemplate, 
  onPreviewTemplate, 
  websiteData, 
  isGenerated 
}: WebsiteTemplatesProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const generateTemplateContent = (templateType: string, data: WebsiteData) => {
    const businessName = data.businessName || 'Your Business';
    const description = data.businessDescription || 'Professional services for your needs';
    const industry = data.industry || 'Business';
    const colorScheme = data.colorScheme || 'blue';
    
    // Determine primary and secondary colors based on color scheme
    const colors = {
      blue: { primary: '#3B82F6', secondary: '#1E40AF', accent: '#EFF6FF', text: '#1F2937' },
      green: { primary: '#10B981', secondary: '#047857', accent: '#ECFDF5', text: '#1F2937' },
      purple: { primary: '#8B5CF6', secondary: '#7C3AED', accent: '#F3E8FF', text: '#1F2937' },
      red: { primary: '#EF4444', secondary: '#DC2626', accent: '#FEF2F2', text: '#1F2937' },
      orange: { primary: '#F97316', secondary: '#EA580C', accent: '#FFF7ED', text: '#1F2937' }
    };
    
    const selectedColors = colors[colorScheme as keyof typeof colors] || colors.blue;

    const baseCSS = `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        line-height: 1.6;
        color: ${selectedColors.text};
        background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      }
      
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
      }
      
      /* Header Styles */
      header {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid rgba(226, 232, 240, 0.8);
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        padding: 1rem 0;
      }
      
      nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .logo {
        font-size: 1.8rem;
        font-weight: 700;
        color: ${selectedColors.primary};
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      
      .nav-links {
        display: flex;
        list-style: none;
        gap: 2rem;
        align-items: center;
      }
      
      .nav-links a {
        text-decoration: none;
        color: ${selectedColors.text};
        font-weight: 500;
        transition: color 0.3s ease;
      }
      
      .nav-links a:hover {
        color: ${selectedColors.primary};
      }
      
      .cta-button {
        background: ${selectedColors.primary};
        color: white;
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        text-decoration: none;
        font-weight: 600;
        transition: all 0.3s ease;
        border: none;
        cursor: pointer;
      }
      
      .cta-button:hover {
        background: ${selectedColors.secondary};
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
      
      /* Hero Section */
      .hero {
        background: linear-gradient(135deg, ${selectedColors.accent} 0%, rgba(255, 255, 255, 0.9) 100%);
        padding: 8rem 0 4rem;
        text-align: center;
      }
      
      .hero h1 {
        font-size: 3.5rem;
        font-weight: 800;
        color: ${selectedColors.text};
        margin-bottom: 1.5rem;
        line-height: 1.2;
      }
      
      .hero p {
        font-size: 1.25rem;
        color: #64748b;
        margin-bottom: 2.5rem;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
      }
      
      .hero-buttons {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
      }
      
      .btn-secondary {
        background: white;
        color: ${selectedColors.primary};
        border: 2px solid ${selectedColors.primary};
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        text-decoration: none;
        font-weight: 600;
        transition: all 0.3s ease;
      }
      
      .btn-secondary:hover {
        background: ${selectedColors.primary};
        color: white;
      }
      
      /* Stats Section */
      .stats {
        background: white;
        padding: 4rem 0;
        margin: 2rem 0;
        border-radius: 1rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      }
      
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 2rem;
        text-align: center;
      }
      
      .stat-item h3 {
        font-size: 2.5rem;
        font-weight: 700;
        color: ${selectedColors.primary};
        margin-bottom: 0.5rem;
      }
      
      .stat-item p {
        color: #64748b;
        font-weight: 500;
      }
      
      /* Features Section */
      .features {
        padding: 4rem 0;
      }
      
      .features h2 {
        text-align: center;
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 3rem;
        color: ${selectedColors.text};
      }
      
      .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
      }
      
      .feature-card {
        background: white;
        padding: 2rem;
        border-radius: 1rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      
      .feature-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
      }
      
      .feature-icon {
        width: 60px;
        height: 60px;
        background: ${selectedColors.accent};
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1.5rem;
        font-size: 1.5rem;
      }
      
      .feature-card h3 {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 1rem;
        color: ${selectedColors.text};
      }
      
      .feature-card p {
        color: #64748b;
        line-height: 1.6;
      }
      
      /* Footer */
      footer {
        background: ${selectedColors.text};
        color: white;
        padding: 3rem 0 1rem;
        margin-top: 4rem;
      }
      
      .footer-content {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
        margin-bottom: 2rem;
      }
      
      .footer-section h3 {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 1rem;
        color: ${selectedColors.primary};
      }
      
      .footer-section ul {
        list-style: none;
      }
      
      .footer-section ul li {
        margin-bottom: 0.5rem;
      }
      
      .footer-section ul li a {
        color: #cbd5e1;
        text-decoration: none;
        transition: color 0.3s ease;
      }
      
      .footer-section ul li a:hover {
        color: ${selectedColors.primary};
      }
      
      .footer-bottom {
        border-top: 1px solid #334155;
        padding-top: 1rem;
        text-align: center;
        color: #94a3b8;
      }
      
      /* Responsive Design */
      @media (max-width: 768px) {
        .hero h1 {
          font-size: 2.5rem;
        }
        
        .nav-links {
          display: none;
        }
        
        .features-grid {
          grid-template-columns: 1fr;
        }
        
        .hero-buttons {
          flex-direction: column;
          align-items: center;
        }
      }
    `;

    const generateIndexHTML = () => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${businessName} - ${description}</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <nav class="container">
            <a href="#" class="logo">
                <span>🚀</span> ${businessName}
            </a>
            <ul class="nav-links">
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="services.html">Services</a></li>
                ${templateType === 'ecommerce' ? '<li><a href="products.html">Products</a></li>' : ''}
                ${templateType !== 'ecommerce' ? '<li><a href="pricing.html">Pricing</a></li>' : ''}
                <li><a href="contact.html">Contact</a></li>
                <li><a href="#" class="cta-button">Get Started</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section class="hero">
            <div class="container">
                <h1>${businessName}</h1>
                <p>${description}</p>
                <div class="hero-buttons">
                    <a href="#" class="cta-button">Get Started Today</a>
                    <a href="#" class="btn-secondary">Learn More</a>
                </div>
            </div>
        </section>

        <section class="stats">
            <div class="container">
                <div class="stats-grid">
                    <div class="stat-item">
                        <h3>500+</h3>
                        <p>Happy Clients</p>
                    </div>
                    <div class="stat-item">
                        <h3>99%</h3>
                        <p>Success Rate</p>
                    </div>
                    <div class="stat-item">
                        <h3>24/7</h3>
                        <p>Support</p>
                    </div>
                    <div class="stat-item">
                        <h3>5+ Years</h3>
                        <p>Experience</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="features">
            <div class="container">
                <h2>Why Choose ${businessName}?</h2>
                <div class="features-grid">
                    <div class="feature-card">
                        <div class="feature-icon">⚡</div>
                        <h3>Fast & Reliable</h3>
                        <p>We deliver high-quality results quickly and efficiently, ensuring your ${industry.toLowerCase()} needs are met on time.</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">🎯</div>
                        <h3>Targeted Solutions</h3>
                        <p>Our services are specifically designed for ${data.targetAudience.toLowerCase()}, ensuring maximum relevance and impact.</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">🔧</div>
                        <h3>Expert Team</h3>
                        <p>Our experienced professionals have years of expertise in ${industry.toLowerCase()} and deliver exceptional results.</p>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>${businessName}</h3>
                    <p>${description}</p>
                </div>
                <div class="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="about.html">About Us</a></li>
                        <li><a href="services.html">Services</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3>Contact Info</h3>
                    <ul>
                        <li>Email: info@${businessName.toLowerCase().replace(/\s+/g, '')}.com</li>
                        <li>Phone: (555) 123-4567</li>
                        <li>Address: 123 Business St, City, State 12345</li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 ${businessName}. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>`;

    return {
      'index.html': generateIndexHTML(),
      'styles.css': baseCSS,
      'script.js': `
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

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Feature card animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});`,
      'about.html': `<!DOCTYPE html><html><head><title>About - ${businessName}</title><link rel="stylesheet" href="styles.css"></head><body><header><nav class="container"><a href="index.html" class="logo"><span>🚀</span> ${businessName}</a></nav></header><main style="padding-top: 100px;"><div class="container"><h1>About ${businessName}</h1><p>${description}</p></div></main></body></html>`,
      'services.html': `<!DOCTYPE html><html><head><title>Services - ${businessName}</title><link rel="stylesheet" href="styles.css"></head><body><header><nav class="container"><a href="index.html" class="logo"><span>🚀</span> ${businessName}</a></nav></header><main style="padding-top: 100px;"><div class="container"><h1>Our Services</h1><p>Professional ${industry.toLowerCase()} services tailored for ${data.targetAudience.toLowerCase()}.</p></div></main></body></html>`,
      'contact.html': `<!DOCTYPE html><html><head><title>Contact - ${businessName}</title><link rel="stylesheet" href="styles.css"></head><body><header><nav class="container"><a href="index.html" class="logo"><span>🚀</span> ${businessName}</a></nav></header><main style="padding-top: 100px;"><div class="container"><h1>Contact Us</h1><p>Get in touch with ${businessName} today!</p></div></main></body></html>`,
      ...(templateType === 'ecommerce' ? {
        'products.html': `<!DOCTYPE html><html><head><title>Products - ${businessName}</title><link rel="stylesheet" href="styles.css"></head><body><header><nav class="container"><a href="index.html" class="logo"><span>🚀</span> ${businessName}</a></nav></header><main style="padding-top: 100px;"><div class="container"><h1>Our Products</h1><p>Discover our amazing ${industry.toLowerCase()} products.</p></div></main></body></html>`
      } : {
        'pricing.html': `<!DOCTYPE html><html><head><title>Pricing - ${businessName}</title><link rel="stylesheet" href="styles.css"></head><body><header><nav class="container"><a href="index.html" class="logo"><span>🚀</span> ${businessName}</a></nav></header><main style="padding-top: 100px;"><div class="container"><h1>Pricing</h1><p>Affordable ${industry.toLowerCase()} solutions for ${data.targetAudience.toLowerCase()}.</p></div></main></body></html>`
      })
    };
  };

  const generateTemplatesBasedOnData = (data: WebsiteData): Template[] => {
    if (!data) return [];

    const industry = data.industry.toLowerCase();
    const businessType = data.businessDescription.toLowerCase();
    
    // Determine the primary template type based on industry and description
    let templateTypes: string[] = [];
    
    if (industry.includes('ecommerce') || industry.includes('retail') || industry.includes('store') || 
        businessType.includes('sell') || businessType.includes('product') || businessType.includes('shop')) {
      templateTypes = ['modern-ecommerce', 'minimalist-store', 'premium-retail', 'boutique-shop', 'marketplace'];
    } else if (industry.includes('agency') || industry.includes('marketing') || industry.includes('digital') ||
               businessType.includes('agency') || businessType.includes('marketing')) {
      templateTypes = ['agency-pro', 'creative-agency', 'digital-hub', 'marketing-studio', 'brand-agency'];
    } else if (industry.includes('restaurant') || industry.includes('food') || industry.includes('cafe') ||
               businessType.includes('restaurant') || businessType.includes('food')) {
      templateTypes = ['restaurant-modern', 'cafe-bistro', 'food-delivery', 'fine-dining', 'casual-eatery'];
    } else if (industry.includes('tech') || industry.includes('software') || industry.includes('startup') ||
               businessType.includes('tech') || businessType.includes('software')) {
      templateTypes = ['tech-startup', 'saas-platform', 'software-company', 'tech-innovation', 'digital-solution'];
    } else if (industry.includes('health') || industry.includes('medical') || industry.includes('wellness') ||
               businessType.includes('health') || businessType.includes('medical')) {
      templateTypes = ['health-center', 'medical-practice', 'wellness-hub', 'healthcare-pro', 'fitness-studio'];
    } else {
      // Default to professional services
      templateTypes = ['professional-hub', 'business-pro', 'service-excellence', 'corporate-modern', 'expert-solutions'];
    }

    return templateTypes.map((type, index) => {
      const templateType = industry.includes('ecommerce') || industry.includes('retail') || 
                          businessType.includes('sell') || businessType.includes('product') ? 'ecommerce' : 'service';
      
      const files = generateTemplateContent(templateType, data);
      
      return {
        id: `template-${index + 1}`,
        name: type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        description: `A ${type.replace('-', ' ')} template perfectly designed for ${data.businessName}`,
        features: [
          'Responsive Design',
          'Modern UI/UX',
          'SEO Optimized',
          'Fast Loading',
          'Mobile Friendly',
          'Professional Layout'
        ],
        preview: files['index.html'],
        files: files
      };
    });
  };

  const generatedTemplates = websiteData ? generateTemplatesBasedOnData(websiteData) : [];

  const handlePreview = (template: Template) => {
    // Create a blob URL for the HTML content
    const htmlBlob = new Blob([template.preview], { type: 'text/html' });
    const url = URL.createObjectURL(htmlBlob);
    setPreviewUrl(url);
    
    // Open in new window for better preview experience
    window.open(url, '_blank', 'width=1200,height=800');
  };

  const handleDownload = (template: Template) => {
    // Create zip-like structure by downloading individual files
    Object.entries(template.files).forEach(([filename, content]) => {
      const blob = new Blob([content], { 
        type: filename.endsWith('.html') ? 'text/html' : 
              filename.endsWith('.css') ? 'text/css' : 
              filename.endsWith('.js') ? 'text/javascript' : 'text/plain'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  };

  if (!isGenerated || !websiteData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Layout className="h-5 w-5" />
            <span>Website Templates</span>
          </CardTitle>
          <CardDescription>
            Complete the form on the left to generate personalized website templates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Palette className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">
              Fill out your business details to see AI-generated templates tailored specifically for your needs
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Layout className="h-5 w-5" />
            <span>Generated Templates for {websiteData.businessName}</span>
          </CardTitle>
          <CardDescription>
            5 personalized website templates based on your business data
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-4">
        {generatedTemplates.map((template) => (
          <Card key={template.id} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-blue-500" />
                    <span>{template.name}</span>
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {template.description}
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePreview(template)}
                    className="flex items-center space-x-1"
                  >
                    <Eye className="h-4 w-4" />
                    <span>Preview</span>
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleDownload(template)}
                    className="flex items-center space-x-1"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {template.features.map((feature, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
              <div className="bg-muted rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-2">Includes:</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                  {Object.keys(template.files).map((filename) => (
                    <div key={filename} className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>{filename}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WebsiteTemplates;
