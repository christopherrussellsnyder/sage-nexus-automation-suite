import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Eye, ExternalLink, Sparkles } from 'lucide-react';

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

interface WebsiteTemplatesProps {
  templates: Template[];
  onSelectTemplate: (template: Template) => void;
  onPreviewTemplate: (template: Template) => void;
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
  const [generatedTemplates, setGeneratedTemplates] = useState<Template[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Generate professional templates that match your Sage.ai design
  const generateProfessionalTemplates = (data: WebsiteData): Template[] => {
    const baseStyles = `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        line-height: 1.6;
        color: hsl(222.2, 84%, 4.9%);
        background: hsl(0, 0%, 100%);
      }
      
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
      }
      
      .header {
        background: hsl(0, 0%, 100%);
        border-bottom: 1px solid hsl(214.3, 31.8%, 91.4%);
        padding: 1rem 0;
        position: sticky;
        top: 0;
        z-index: 50;
        backdrop-filter: blur(8px);
      }
      
      .nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .logo {
        font-size: 1.5rem;
        font-weight: bold;
        color: hsl(222.2, 47.4%, 11.2%);
      }
      
      .nav-links {
        display: flex;
        gap: 2rem;
        list-style: none;
      }
      
      .nav-links a {
        text-decoration: none;
        color: hsl(215.4, 16.3%, 46.9%);
        font-weight: 500;
        transition: color 0.2s;
      }
      
      .nav-links a:hover {
        color: hsl(222.2, 47.4%, 11.2%);
      }
      
      .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        font-weight: 500;
        transition: all 0.2s;
        cursor: pointer;
        border: none;
        text-decoration: none;
      }
      
      .btn-primary {
        background: hsl(222.2, 47.4%, 11.2%);
        color: hsl(210, 40%, 98%);
        padding: 0.5rem 1rem;
      }
      
      .btn-primary:hover {
        background: hsl(222.2, 47.4%, 8%);
      }
      
      .btn-secondary {
        background: hsl(210, 40%, 96.1%);
        color: hsl(222.2, 47.4%, 11.2%);
        padding: 0.5rem 1rem;
        border: 1px solid hsl(214.3, 31.8%, 91.4%);
      }
      
      .btn-secondary:hover {
        background: hsl(210, 40%, 94%);
      }
      
      .hero {
        padding: 6rem 0;
        text-align: center;
        background: linear-gradient(to bottom right, hsl(210, 40%, 98%), hsl(220, 13%, 95%));
      }
      
      .hero h1 {
        font-size: 3rem;
        font-weight: bold;
        margin-bottom: 1rem;
        background: linear-gradient(to right, hsl(222.2, 47.4%, 11.2%), hsl(222.2, 47.4%, 25%));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .hero p {
        font-size: 1.25rem;
        color: hsl(215.4, 16.3%, 46.9%);
        margin-bottom: 2rem;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
      }
      
      .section {
        padding: 4rem 0;
      }
      
      .grid {
        display: grid;
        gap: 2rem;
      }
      
      .grid-3 {
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      }
      
      .card {
        background: hsl(0, 0%, 100%);
        border: 1px solid hsl(214.3, 31.8%, 91.4%);
        border-radius: 0.75rem;
        padding: 2rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        transition: all 0.2s;
      }
      
      .card:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transform: translateY(-2px);
      }
      
      .card h3 {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 1rem;
      }
      
      .badge {
        display: inline-flex;
        align-items: center;
        border-radius: 9999px;
        font-size: 0.75rem;
        font-weight: 500;
        padding: 0.25rem 0.75rem;
        background: hsl(210, 40%, 96.1%);
        color: hsl(222.2, 47.4%, 11.2%);
      }
      
      .footer {
        background: hsl(222.2, 47.4%, 11.2%);
        color: hsl(210, 40%, 98%);
        padding: 3rem 0;
        text-align: center;
      }
      
      .stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 2rem;
        margin: 2rem 0;
      }
      
      .stat {
        text-align: center;
      }
      
      .stat-number {
        font-size: 2.5rem;
        font-weight: bold;
        color: hsl(222.2, 47.4%, 11.2%);
      }
      
      .stat-label {
        color: hsl(215.4, 16.3%, 46.9%);
        font-size: 0.875rem;
      }
      
      @media (max-width: 768px) {
        .hero h1 {
          font-size: 2rem;
        }
        
        .nav-links {
          display: none;
        }
        
        .container {
          padding: 0 0.5rem;
        }
      }
    `;

    const businessType = determineBusinessType(data);
    const templates: Template[] = [];

    // Generate 5 different professional templates based on business type
    for (let i = 1; i <= 5; i++) {
      const template = generateTemplate(data, businessType, i, baseStyles);
      templates.push(template);
    }

    return templates;
  };

  const determineBusinessType = (data: WebsiteData): string => {
    const industry = data.industry.toLowerCase();
    const description = data.businessDescription.toLowerCase();
    
    if (industry.includes('fashion') || industry.includes('apparel') || industry.includes('ecommerce') || description.includes('sell') || description.includes('product')) {
      return 'ecommerce';
    } else if (industry.includes('professional') || industry.includes('service') || industry.includes('consulting')) {
      return 'services';
    } else if (industry.includes('tech') || industry.includes('software') || industry.includes('startup')) {
      return 'tech';
    } else if (industry.includes('health') || industry.includes('wellness') || industry.includes('fitness')) {
      return 'health';
    } else if (industry.includes('food') || industry.includes('restaurant')) {
      return 'restaurant';
    } else {
      return 'business';
    }
  };

  const generateTemplate = (data: WebsiteData, businessType: string, templateId: number, baseStyles: string): Template => {
    const templateVariations = {
      1: 'Modern & Minimalist',
      2: 'Bold & Dynamic',
      3: 'Professional & Clean',
      4: 'Creative & Engaging',
      5: 'Elegant & Sophisticated'
    };

    const getBusinessSpecificContent = () => {
      switch (businessType) {
        case 'ecommerce':
          return {
            heroTitle: `${data.businessName} - Premium Products Online`,
            heroSubtitle: `Discover our curated collection of high-quality products. ${data.businessDescription}`,
            sections: ['Featured Products', 'Categories', 'Customer Reviews', 'Why Choose Us'],
            cta: 'Shop Now'
          };
        case 'services':
          return {
            heroTitle: `${data.businessName} - Expert ${data.industry} Services`,
            heroSubtitle: `Professional solutions tailored for your success. ${data.businessDescription}`,
            sections: ['Our Services', 'Process', 'Success Stories', 'Get Started'],
            cta: 'Get Quote'
          };
        case 'tech':
          return {
            heroTitle: `${data.businessName} - Innovation Powered Solutions`,
            heroSubtitle: `Cutting-edge technology that transforms your business. ${data.businessDescription}`,
            sections: ['Solutions', 'Technology', 'Case Studies', 'Integration'],
            cta: 'Start Free Trial'
          };
        default:
          return {
            heroTitle: `Welcome to ${data.businessName}`,
            heroSubtitle: `${data.businessDescription} Serving ${data.targetAudience} with excellence.`,
            sections: ['About Us', 'Services', 'Testimonials', 'Contact'],
            cta: 'Learn More'
          };
      }
    };

    const content = getBusinessSpecificContent();
    
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.businessName} - ${templateVariations[templateId as keyof typeof templateVariations]}</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header class="header">
        <div class="container">
            <nav class="nav">
                <div class="logo">${data.businessName}</div>
                <ul class="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#services">${content.sections[0]}</a></li>
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
                <h1>${content.heroTitle}</h1>
                <p>${content.heroSubtitle}</p>
                <div>
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
        </section>

        <section class="section" id="about">
            <div class="container">
                <h2 style="text-align: center; margin-bottom: 3rem; font-size: 2.5rem;">About ${data.businessName}</h2>
                <div class="grid grid-3">
                    ${content.sections.map(section => `
                        <div class="card">
                            <h3>${section}</h3>
                            <p>Our ${section.toLowerCase()} are designed specifically for ${data.targetAudience}. We understand your unique needs and deliver exceptional results that exceed expectations.</p>
                            <div style="margin-top: 1rem;">
                                <span class="badge">Premium Quality</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <section class="section" style="background: hsl(210, 40%, 98%);" id="services">
            <div class="container">
                <h2 style="text-align: center; margin-bottom: 3rem; font-size: 2.5rem;">Why Choose ${data.businessName}?</h2>
                <div class="grid grid-3">
                    <div class="card">
                        <h3>🚀 Fast & Reliable</h3>
                        <p>We deliver high-quality results quickly and efficiently, ensuring your ${data.businessGoals || 'business goals'} are met on time.</p>
                    </div>
                    <div class="card">
                        <h3>💎 Premium Quality</h3>
                        <p>Our commitment to excellence means you get the best possible service tailored for ${data.targetAudience}.</p>
                    </div>
                    <div class="card">
                        <h3>🎯 Results Focused</h3>
                        <p>Every solution is designed to help you achieve your specific business objectives in the ${data.industry} industry.</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="section" id="contact">
            <div class="container" style="text-align: center;">
                <h2 style="margin-bottom: 2rem; font-size: 2.5rem;">Ready to Get Started?</h2>
                <p style="font-size: 1.25rem; color: hsl(215.4, 16.3%, 46.9%); margin-bottom: 2rem;">
                    Join thousands of satisfied customers who trust ${data.businessName} for their ${data.industry.toLowerCase()} needs.
                </p>
                <div>
                    <a href="#" class="btn btn-primary" style="margin-right: 1rem;">${content.cta}</a>
                    <a href="#" class="btn btn-secondary">Contact Us</a>
                </div>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 ${data.businessName}. All rights reserved.</p>
            <p style="margin-top: 0.5rem; opacity: 0.8;">Serving ${data.targetAudience} with premium ${data.industry.toLowerCase()} solutions.</p>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>`;

    const js = `
// Professional interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
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

    // Add scroll effect to header
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // Animate cards on scroll
    const cards = document.querySelectorAll('.card');
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

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});`;

    return {
      id: templateId,
      name: `${templateVariations[templateId as keyof typeof templateVariations]} Template`,
      description: `A ${templateVariations[templateId as keyof typeof templateVariations].toLowerCase()} design perfectly tailored for ${data.businessName}`,
      preview: html,
      files: {
        'index.html': html,
        'styles.css': baseStyles,
        'script.js': js
      }
    };
  };

  // Generate templates when websiteData is available
  React.useEffect(() => {
    if (websiteData && isGenerated && generatedTemplates.length === 0) {
      setIsGenerating(true);
      setTimeout(() => {
        const newTemplates = generateProfessionalTemplates(websiteData);
        setGeneratedTemplates(newTemplates);
        setIsGenerating(false);
      }, 1000);
    }
  }, [websiteData, isGenerated, generatedTemplates.length]);

  const handlePreview = (template: Template) => {
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(template.preview);
      newWindow.document.close();
    }
  };

  const handleDownload = (template: Template) => {
    // Create a zip-like structure by downloading individual files
    Object.entries(template.files).forEach(([filename, content]) => {
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${websiteData?.businessName || 'website'}-${template.name.toLowerCase().replace(/\s+/g, '-')}-${filename}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  };

  if (!websiteData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Website Templates</CardTitle>
          <CardDescription>Generate your website details first to see personalized templates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Complete the website builder form to generate your custom templates</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isGenerating) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Generating Your Website Templates</CardTitle>
          <CardDescription>Creating 5 personalized templates for {websiteData.businessName}...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">This may take a few moments...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generated Website Templates</CardTitle>
        <CardDescription>5 professional templates customized for {websiteData.businessName}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {generatedTemplates.map((template) => (
            <Card key={template.id} className="border">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <span>{template.name}</span>
                      <Badge variant="secondary">Ready</Badge>
                    </CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Template Features:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Responsive design optimized for all devices</li>
                      <li>• Professional styling matching your brand</li>
                      <li>• Multiple pages (Home, About, Services, Contact)</li>
                      <li>• Interactive elements and smooth animations</li>
                      <li>• SEO-friendly structure and clean code</li>
                    </ul>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button 
                      onClick={() => handlePreview(template)}
                      className="flex items-center space-x-2"
                    >
                      <Eye className="h-4 w-4" />
                      <span>Preview Live Demo</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleDownload(template)}
                      className="flex items-center space-x-2"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download Files</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WebsiteTemplates;
