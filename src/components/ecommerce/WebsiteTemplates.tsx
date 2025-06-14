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

  // Generate professional templates using Lovable's design philosophy
  const generateLovableStyleTemplates = (data: WebsiteData): Template[] => {
    // Modern, clean CSS following Lovable's principles
    const modernBaseStyles = `
      /* Lovable-inspired Design System */
      :root {
        /* Clean color palette */
        --primary: 222.2 47.4% 11.2%;
        --primary-foreground: 210 40% 98%;
        --secondary: 210 40% 96.1%;
        --secondary-foreground: 222.2 47.4% 11.2%;
        --muted: 210 40% 96.1%;
        --muted-foreground: 215.4 16.3% 46.9%;
        --background: 0 0% 100%;
        --foreground: 222.2 84% 4.9%;
        --border: 214.3 31.8% 91.4%;
        --accent: 210 40% 96.1%;
        --accent-foreground: 222.2 47.4% 11.2%;
        
        /* Typography system */
        --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        --font-size-xs: 0.75rem;
        --font-size-sm: 0.875rem;
        --font-size-base: 1rem;
        --font-size-lg: 1.125rem;
        --font-size-xl: 1.25rem;
        --font-size-2xl: 1.5rem;
        --font-size-3xl: 1.875rem;
        --font-size-4xl: 2.25rem;
        --font-size-5xl: 3rem;
        
        /* Spacing system */
        --spacing-1: 0.25rem;
        --spacing-2: 0.5rem;
        --spacing-3: 0.75rem;
        --spacing-4: 1rem;
        --spacing-6: 1.5rem;
        --spacing-8: 2rem;
        --spacing-12: 3rem;
        --spacing-16: 4rem;
        --spacing-24: 6rem;
        
        /* Border radius */
        --radius: 0.5rem;
        --radius-lg: 0.75rem;
        --radius-xl: 1rem;
      }

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: var(--font-family);
        line-height: 1.6;
        color: hsl(var(--foreground));
        background: hsl(var(--background));
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      
      /* Container system with strategic whitespace */
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 var(--spacing-4);
      }
      
      @media (min-width: 640px) {
        .container { padding: 0 var(--spacing-6); }
      }
      
      @media (min-width: 1024px) {
        .container { padding: 0 var(--spacing-8); }
      }
      
      /* Modern header with clean design */
      .header {
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid hsl(var(--border));
        padding: var(--spacing-4) 0;
        position: sticky;
        top: 0;
        z-index: 50;
        transition: all 0.3s ease;
      }
      
      .nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .logo {
        font-size: var(--font-size-2xl);
        font-weight: 700;
        color: hsl(var(--primary));
        letter-spacing: -0.025em;
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
        color: hsl(var(--muted-foreground));
        font-weight: 500;
        font-size: var(--font-size-sm);
        transition: all 0.2s ease;
        position: relative;
      }
      
      .nav-links a::after {
        content: '';
        position: absolute;
        width: 0;
        height: 2px;
        bottom: -4px;
        left: 0;
        background: hsl(var(--primary));
        transition: width 0.3s ease;
      }
      
      .nav-links a:hover {
        color: hsl(var(--primary));
      }
      
      .nav-links a:hover::after {
        width: 100%;
      }
      
      /* Modern button system */
      .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--radius);
        font-size: var(--font-size-sm);
        font-weight: 500;
        transition: all 0.2s ease;
        cursor: pointer;
        border: none;
        text-decoration: none;
        outline: none;
        white-space: nowrap;
      }
      
      .btn-primary {
        background: hsl(var(--primary));
        color: hsl(var(--primary-foreground));
        padding: var(--spacing-3) var(--spacing-6);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }
      
      .btn-primary:hover {
        background: hsl(var(--primary) / 0.9);
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
      
      .btn-secondary {
        background: hsl(var(--secondary));
        color: hsl(var(--secondary-foreground));
        padding: var(--spacing-3) var(--spacing-6);
        border: 1px solid hsl(var(--border));
      }
      
      .btn-secondary:hover {
        background: hsl(var(--secondary) / 0.8);
        transform: translateY(-1px);
      }
      
      /* Hero section with modern typography */
      .hero {
        padding: var(--spacing-24) 0;
        text-align: center;
        background: linear-gradient(135deg, hsl(var(--background)), hsl(var(--secondary) / 0.3));
        position: relative;
        overflow: hidden;
      }
      
      .hero::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at 30% 20%, hsl(var(--primary) / 0.05), transparent 50%);
        pointer-events: none;
      }
      
      .hero-content {
        position: relative;
        z-index: 1;
      }
      
      .hero h1 {
        font-size: var(--font-size-4xl);
        font-weight: 800;
        margin-bottom: var(--spacing-6);
        background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.7));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        letter-spacing: -0.025em;
        line-height: 1.1;
      }
      
      @media (min-width: 768px) {
        .hero h1 { font-size: var(--font-size-5xl); }
      }
      
      .hero p {
        font-size: var(--font-size-xl);
        color: hsl(var(--muted-foreground));
        margin-bottom: var(--spacing-8);
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
        line-height: 1.6;
      }
      
      .hero-actions {
        display: flex;
        gap: var(--spacing-4);
        justify-content: center;
        flex-wrap: wrap;
        margin-bottom: var(--spacing-12);
      }
      
      /* Modern section layouts */
      .section {
        padding: var(--spacing-24) 0;
      }
      
      .section-header {
        text-align: center;
        margin-bottom: var(--spacing-16);
      }
      
      .section-title {
        font-size: var(--font-size-4xl);
        font-weight: 700;
        margin-bottom: var(--spacing-4);
        color: hsl(var(--primary));
        letter-spacing: -0.025em;
      }
      
      .section-description {
        font-size: var(--font-size-lg);
        color: hsl(var(--muted-foreground));
        max-width: 600px;
        margin: 0 auto;
        line-height: 1.6;
      }
      
      /* Modern grid system */
      .grid {
        display: grid;
        gap: var(--spacing-8);
      }
      
      .grid-2 {
        grid-template-columns: 1fr;
      }
      
      @media (min-width: 768px) {
        .grid-2 { grid-template-columns: repeat(2, 1fr); }
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
      
      /* Modern card component */
      .card {
        background: hsl(var(--background));
        border: 1px solid hsl(var(--border));
        border-radius: var(--radius-lg);
        padding: var(--spacing-8);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      }
      
      .card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary) / 0.5));
        transform: scaleX(0);
        transition: transform 0.3s ease;
      }
      
      .card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
      }
      
      .card:hover::before {
        transform: scaleX(1);
      }
      
      .card h3 {
        font-size: var(--font-size-2xl);
        font-weight: 600;
        margin-bottom: var(--spacing-4);
        color: hsl(var(--primary));
      }
      
      .card p {
        color: hsl(var(--muted-foreground));
        line-height: 1.6;
        margin-bottom: var(--spacing-6);
      }
      
      /* Modern stats section */
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
        background: hsl(var(--secondary) / 0.5);
        border-radius: var(--radius-lg);
        backdrop-filter: blur(10px);
      }
      
      .stat-number {
        font-size: var(--font-size-4xl);
        font-weight: 800;
        color: hsl(var(--primary));
        line-height: 1;
        margin-bottom: var(--spacing-2);
      }
      
      .stat-label {
        color: hsl(var(--muted-foreground));
        font-size: var(--font-size-sm);
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      
      /* Modern badge component */
      .badge {
        display: inline-flex;
        align-items: center;
        border-radius: 9999px;
        font-size: var(--font-size-xs);
        font-weight: 500;
        padding: var(--spacing-1) var(--spacing-3);
        background: hsl(var(--accent));
        color: hsl(var(--accent-foreground));
        margin-top: var(--spacing-4);
      }
      
      /* Modern footer */
      .footer {
        background: hsl(var(--primary));
        color: hsl(var(--primary-foreground));
        padding: var(--spacing-16) 0 var(--spacing-8);
        text-align: center;
        position: relative;
      }
      
      .footer::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, hsl(var(--primary-foreground) / 0.2), transparent);
      }
      
      /* Smooth animations */
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
      
      /* Mobile optimizations */
      @media (max-width: 767px) {
        .hero {
          padding: var(--spacing-16) 0;
        }
        
        .hero h1 {
          font-size: var(--font-size-3xl);
        }
        
        .hero-actions {
          flex-direction: column;
          align-items: center;
        }
        
        .btn {
          width: 100%;
          max-width: 280px;
        }
        
        .container {
          padding: 0 var(--spacing-4);
        }
        
        .section {
          padding: var(--spacing-16) 0;
        }
      }
    `;

    const businessType = determineBusinessType(data);
    const templates: Template[] = [];

    // Generate 5 different modern templates using Lovable's design philosophy
    for (let i = 1; i <= 5; i++) {
      const template = generateModernTemplate(data, businessType, i, modernBaseStyles);
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

  const generateModernTemplate = (data: WebsiteData, businessType: string, templateId: number, baseStyles: string): Template => {
    const templateStyles = {
      1: { name: 'Clean Minimalist', accent: 'Modern & sophisticated with strategic whitespace' },
      2: { name: 'Bold Professional', accent: 'Strong typography with purposeful color use' },
      3: { name: 'Elegant Corporate', accent: 'Professional elegance with subtle animations' },
      4: { name: 'Creative Modern', accent: 'Creative layouts with engaging interactions' },
      5: { name: 'Premium Luxury', accent: 'Luxurious feel with premium design elements' }
    };

    const currentStyle = templateStyles[templateId as keyof typeof templateStyles];

    const getBusinessSpecificContent = () => {
      switch (businessType) {
        case 'ecommerce':
          return {
            heroTitle: `${data.businessName}`,
            heroSubtitle: `Discover premium products crafted for discerning customers. ${data.businessDescription}`,
            sections: ['Featured Collections', 'Why Choose Us', 'Customer Stories', 'Experience'],
            cta: 'Shop Collection',
            features: [
              'Curated premium products',
              'Exceptional customer service',
              'Fast, secure shipping',
              'Satisfaction guaranteed'
            ]
          };
        case 'services':
          return {
            heroTitle: `${data.businessName}`,
            heroSubtitle: `Professional ${data.industry.toLowerCase()} solutions that drive real results. ${data.businessDescription}`,
            sections: ['Our Approach', 'Success Stories', 'Why Partner With Us', 'Get Started'],
            cta: 'Schedule Consultation',
            features: [
              'Expert strategy development',
              'Proven track record',
              'Personalized approach',
              'Ongoing support'
            ]
          };
        case 'tech':
          return {
            heroTitle: `${data.businessName}`,
            heroSubtitle: `Next-generation technology solutions that transform how you work. ${data.businessDescription}`,
            sections: ['Innovation', 'Solutions', 'Success Stories', 'Integration'],
            cta: 'Start Free Trial',
            features: [
              'Cutting-edge technology',
              'Seamless integration',
              'Scalable solutions',
              '24/7 technical support'
            ]
          };
        default:
          return {
            heroTitle: `${data.businessName}`,
            heroSubtitle: `${data.businessDescription} Exceptional service for ${data.targetAudience}.`,
            sections: ['About Us', 'Our Services', 'Success Stories', 'Contact'],
            cta: 'Get Started',
            features: [
              'Professional excellence',
              'Proven results',
              'Personal attention',
              'Trusted expertise'
            ]
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
    <title>${data.businessName} - ${currentStyle.name}</title>
    <meta name="description" content="${data.businessDescription}">
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
                        We deliver exceptional results through innovation, expertise, and unwavering commitment to your success.
                    </p>
                </div>
                <div class="grid grid-3">
                    ${content.features.map((feature, index) => `
                        <div class="card fade-in" style="animation-delay: ${index * 0.1}s">
                            <h3>${feature}</h3>
                            <p>Our ${feature.toLowerCase()} ensures you receive the highest quality service tailored specifically for ${data.targetAudience}.</p>
                            <span class="badge">Premium Quality</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <section class="section" style="background: hsl(var(--secondary) / 0.3);" id="services">
            <div class="container">
                <div class="section-header fade-in">
                    <h2 class="section-title">Our ${content.sections[0]}</h2>
                    <p class="section-description">
                        Comprehensive solutions designed to help you achieve your ${data.businessGoals || 'business objectives'}.
                    </p>
                </div>
                <div class="grid grid-2">
                    ${content.sections.slice(1, 3).map((section, index) => `
                        <div class="card fade-in" style="animation-delay: ${index * 0.2}s">
                            <h3>${section}</h3>
                            <p>Our comprehensive approach to ${section.toLowerCase()} ensures sustainable growth and measurable results for your ${data.industry} business.</p>
                            <a href="#contact" class="btn btn-primary" style="margin-top: var(--spacing-4);">Learn More</a>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <section class="section" id="contact">
            <div class="container">
                <div class="section-header fade-in">
                    <h2 class="section-title">Ready to Transform Your Business?</h2>
                    <p class="section-description">
                        Join hundreds of successful ${data.targetAudience} who have achieved remarkable results with ${data.businessName}.
                    </p>
                </div>
                <div style="text-align: center;" class="fade-in">
                    <div style="margin-bottom: var(--spacing-8);">
                        <a href="#" class="btn btn-primary" style="margin-right: var(--spacing-4);">${content.cta}</a>
                        <a href="#" class="btn btn-secondary">Contact Us</a>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container">
            <p style="font-size: var(--font-size-lg); margin-bottom: var(--spacing-2);">&copy; 2024 ${data.businessName}. All rights reserved.</p>
            <p style="opacity: 0.8;">Empowering ${data.targetAudience} with premium ${data.industry.toLowerCase()} solutions.</p>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>`;

    const js = `
// Modern JavaScript with performance optimization
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation
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

    // Progressive header effect
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    const updateHeader = () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.8)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollY = currentScrollY;
    };
    
    // Throttled scroll listener for performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateHeader();
                ticking = false;
            });
            ticking = true;
        }
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

    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Enhanced button interactions
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Progressive stats counter (if visible)
    const statsNumbers = document.querySelectorAll('.stat-number');
    const animateValue = (element, start, end, duration) => {
        const startTimestamp = performance.now();
        const step = (timestamp) => {
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            element.textContent = current + (element.textContent.includes('%') ? '%' : '+');
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
    };

    // Animate stats when they come into view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);
                if (!isNaN(finalValue)) {
                    animateValue(target, 0, finalValue, 2000);
                }
                statsObserver.unobserve(target);
            }
        });
    });

    statsNumbers.forEach(stat => statsObserver.observe(stat));
});`;

    return {
      id: templateId,
      name: `${currentStyle.name} Template`,
      description: `${currentStyle.accent} - Professionally designed for ${data.businessName}`,
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
        const newTemplates = generateLovableStyleTemplates(websiteData);
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
