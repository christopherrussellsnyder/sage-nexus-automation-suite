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

interface ContentStructure {
  headline: string;
  subheadline: string;
  ctaPrimary: string;
  ctaSecondary: string;
  aboutTitle: string;
  aboutContent: string;
  features: {
    title: string;
    description: string;
    benefit: string;
  }[];
  testimonials: {
    name: string;
    company: string;
    quote: string;
  }[];
  finalCta: string;
  closingContent: string;
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
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border);
      padding: var(--spacing-4) 0;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      transition: all 0.3s ease;
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
      position: relative;
    }
    
    .nav-links a:hover {
      color: var(--primary);
    }
    
    .nav-links a::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 2px;
      background: var(--accent);
      transition: width 0.2s ease;
    }
    
    .nav-links a:hover::after {
      width: 100%;
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
      position: relative;
      overflow: hidden;
    }
    
    .btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: left 0.5s;
    }
    
    .btn:hover::before {
      left: 100%;
    }
    
    .btn-primary {
      background: var(--primary);
      color: var(--primary-foreground);
      box-shadow: 0 4px 12px rgba(26, 26, 26, 0.15);
    }
    
    .btn-primary:hover {
      background: rgba(26, 26, 26, 0.9);
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(26, 26, 26, 0.2);
    }
    
    .btn-secondary {
      background: var(--secondary);
      color: var(--secondary-foreground);
      border: 1px solid var(--border);
    }
    
    .btn-secondary:hover {
      background: rgba(245, 245, 245, 0.8);
      transform: translateY(-1px);
    }
    
    .hero {
      padding: calc(var(--spacing-24) + 80px) 0 var(--spacing-24);
      text-align: center;
      background: linear-gradient(135deg, var(--background) 0%, var(--muted) 100%);
      position: relative;
      overflow: hidden;
    }
    
    .hero::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%);
      animation: float 20s ease-in-out infinite;
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(180deg); }
    }
    
    .hero-content {
      position: relative;
      z-index: 2;
    }
    
    .hero h1 {
      font-size: 3.5rem;
      font-weight: 800;
      margin-bottom: var(--spacing-6);
      color: var(--primary);
      letter-spacing: -0.025em;
      line-height: 1.1;
      background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    @media (max-width: 768px) {
      .hero h1 { font-size: 2.5rem; }
    }
    
    .hero p {
      font-size: 1.25rem;
      color: var(--muted-foreground);
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
    
    .section {
      padding: var(--spacing-24) 0;
    }
    
    .section-alternate {
      background: var(--muted);
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
      position: relative;
    }
    
    .section-title::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background: var(--accent);
      border-radius: 2px;
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
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    
    .card::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.05), transparent);
      transition: left 0.6s ease;
    }
    
    .card:hover::before {
      left: 100%;
    }
    
    .card:hover {
      transform: translateY(-6px);
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
      border-color: var(--accent);
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
      line-height: 1.6;
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
      background: var(--background);
      border-radius: var(--radius);
      border: 1px solid var(--border);
      transition: all 0.3s ease;
    }
    
    .stat:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }
    
    .stat-number {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--accent);
      margin-bottom: 0.5rem;
      display: block;
    }
    
    .stat-label {
      color: var(--muted-foreground);
      font-size: 0.875rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    
    .testimonial {
      background: var(--background);
      padding: var(--spacing-8);
      border-radius: calc(var(--radius) * 1.5);
      border: 1px solid var(--border);
      text-align: center;
      position: relative;
    }
    
    .testimonial::before {
      content: '"';
      font-size: 4rem;
      color: var(--accent);
      position: absolute;
      top: -10px;
      left: 50%;
      transform: translateX(-50%);
      font-family: serif;
    }
    
    .testimonial-quote {
      font-style: italic;
      margin-bottom: var(--spacing-4);
      color: var(--muted-foreground);
      line-height: 1.6;
    }
    
    .testimonial-author {
      font-weight: 600;
      color: var(--primary);
    }
    
    .testimonial-company {
      color: var(--muted-foreground);
      font-size: 0.875rem;
    }
    
    .cta-section {
      background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
      color: var(--primary-foreground);
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    
    .cta-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20"><defs><pattern id="grain" width="100" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="20" fill="url(%23grain)"/></svg>');
      opacity: 0.1;
    }
    
    .cta-content {
      position: relative;
      z-index: 2;
    }
    
    .footer {
      background: var(--primary);
      color: var(--primary-foreground);
      padding: var(--spacing-16) 0 var(--spacing-8);
      text-align: center;
    }
    
    .fade-in {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.6s ease;
    }
    
    .fade-in.visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    @media (max-width: 767px) {
      .hero { padding: calc(var(--spacing-16) + 80px) 0 var(--spacing-16); }
      .hero-actions { flex-direction: column; align-items: center; }
      .btn { width: 100%; max-width: 280px; }
      .section { padding: var(--spacing-16) 0; }
      .section-title { font-size: 2rem; }
    }
  `;

  const businessType = determineBusinessType(data);
  const templates: Template[] = [];

  for (let i = 1; i <= 5; i++) {
    const template = generateEnhancedTemplate(data, businessType, i, modernBaseStyles);
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

const generateContentStructure = (data: WebsiteData, businessType: string, templateId: number): ContentStructure => {
  const contentVariations = {
    1: { // Authority & Trust
      headline: `The Leading ${data.businessName} in ${data.industry}`,
      subheadline: `Join thousands of satisfied ${data.targetAudience} who trust our expertise. ${data.businessDescription}`,
      ctaPrimary: 'Get Started Today',
      ctaSecondary: 'Learn More',
      aboutTitle: 'Why Industry Leaders Choose Us',
      aboutContent: `With years of experience serving ${data.targetAudience}, we've built a reputation for delivering exceptional results. Our proven methodology combines industry best practices with innovative solutions tailored to your specific needs.`,
      features: [
        {
          title: 'Proven Expertise',
          description: 'Years of experience in the industry',
          benefit: 'Get results from day one with our tested strategies'
        },
        {
          title: 'Personalized Approach',
          description: 'Custom solutions for your business',
          benefit: 'Solutions designed specifically for your success'
        },
        {
          title: 'Ongoing Support',
          description: '24/7 dedicated customer service',
          benefit: 'Never worry about being left behind'
        }
      ],
      testimonials: [
        {
          name: 'Sarah Johnson',
          company: 'TechStart Inc.',
          quote: 'Working with them transformed our business. The results exceeded our expectations and their support is outstanding.'
        },
        {
          name: 'Michael Chen',
          company: 'Growth Dynamics',
          quote: 'Professional, reliable, and results-driven. They understand what businesses like ours need to succeed.'
        }
      ],
      finalCta: 'Start Your Success Story',
      closingContent: 'Ready to take your business to the next level? Join the companies that have already transformed their operations with our proven solutions.'
    },
    2: { // Problem-Solution
      headline: `Stop Struggling with ${data.industry} Challenges`,
      subheadline: `${data.businessName} eliminates the pain points that keep ${data.targetAudience} from achieving their goals. ${data.businessDescription}`,
      ctaPrimary: 'Solve This Now',
      ctaSecondary: 'See How It Works',
      aboutTitle: 'The Solution That Actually Works',
      aboutContent: `We understand the frustrations you face in ${data.industry}. That's why we've developed a comprehensive approach that addresses the root causes of common challenges, not just the symptoms.`,
      features: [
        {
          title: 'Problem Identification',
          description: 'We pinpoint exactly what\'s holding you back',
          benefit: 'No more guessing - get clarity on real issues'
        },
        {
          title: 'Streamlined Process',
          description: 'Simplified workflows that save time',
          benefit: 'Reduce complexity and increase efficiency'
        },
        {
          title: 'Guaranteed Results',
          description: 'Money-back guarantee on our services',
          benefit: 'Risk-free way to transform your business'
        }
      ],
      testimonials: [
        {
          name: 'David Rodriguez',
          company: 'Efficiency Pro',
          quote: 'They identified problems we didn\'t even know we had and provided solutions that actually work. Game-changer!'
        },
        {
          name: 'Lisa Thompson',
          company: 'StreamLine Solutions',
          quote: 'Finally, a service that delivers on its promises. Our productivity increased by 40% in the first month.'
        }
      ],
      finalCta: 'End Your Struggles Today',
      closingContent: 'Don\'t let another day pass dealing with the same frustrations. Take action now and experience the relief of a solution that works.'
    },
    3: { // Transformation
      headline: `Transform Your ${data.industry} Business in 90 Days`,
      subheadline: `See how ${data.businessName} helps ${data.targetAudience} achieve remarkable transformation. ${data.businessDescription}`,
      ctaPrimary: 'Start My Transformation',
      ctaSecondary: 'View Success Stories',
      aboutTitle: 'Your Journey to Success',
      aboutContent: `Transformation doesn't happen overnight, but with the right guidance, it happens faster than you think. Our proven 90-day methodology has helped hundreds of businesses like yours achieve breakthrough results.`,
      features: [
        {
          title: '90-Day Program',
          description: 'Structured transformation timeline',
          benefit: 'See measurable results in just 3 months'
        },
        {
          title: 'Step-by-Step Guidance',
          description: 'Clear roadmap to success',
          benefit: 'Never wonder what to do next'
        },
        {
          title: 'Ongoing Optimization',
          description: 'Continuous improvement process',
          benefit: 'Keep getting better results over time'
        }
      ],
      testimonials: [
        {
          name: 'Jennifer Park',
          company: 'Rapid Growth Co.',
          quote: 'In 90 days, we completely transformed our operations. The structured approach made all the difference.'
        },
        {
          name: 'Robert Kim',
          company: 'Evolution Enterprises',
          quote: 'The transformation was incredible. We\'re now operating at a level we never thought possible.'
        }
      ],
      finalCta: 'Begin Your Transformation',
      closingContent: 'Your transformation starts today. Join successful businesses who have already achieved remarkable results with our proven system.'
    },
    4: { // Premium/Exclusive
      headline: `Exclusive ${data.industry} Services for Elite ${data.targetAudience}`,
      subheadline: `${data.businessName} - Where excellence meets exclusivity in ${data.industry}. ${data.businessDescription}`,
      ctaPrimary: 'Apply for Access',
      ctaSecondary: 'Learn About Membership',
      aboutTitle: 'Why We\'re Selective About Our Clients',
      aboutContent: `We believe in providing exceptional value to a select group of clients rather than average service to everyone. This exclusive approach allows us to deliver personalized attention and superior results.`,
      features: [
        {
          title: 'White-Glove Service',
          description: 'Personalized attention to every detail',
          benefit: 'Experience service tailored just for you'
        },
        {
          title: 'Senior Team Access',
          description: 'Work directly with our top experts',
          benefit: 'Get insights from industry leaders'
        },
        {
          title: 'Custom Solutions',
          description: 'Bespoke strategies, not templates',
          benefit: 'Solutions as unique as your business'
        }
      ],
      testimonials: [
        {
          name: 'Alexandra Smith',
          company: 'Premium Partners',
          quote: 'The level of service is unmatched. They treat our business like it\'s their own most important project.'
        },
        {
          name: 'Thomas Wilson',
          company: 'Elite Ventures',
          quote: 'Worth every penny. The personalized attention and custom solutions have been game-changing.'
        }
      ],
      finalCta: 'Apply for Membership',
      closingContent: 'Spaces are limited for our exclusive program. We only accept clients who are serious about achieving exceptional results.'
    },
    5: { // Community
      headline: `Join the ${data.businessName} Community`,
      subheadline: `Where ${data.targetAudience} connect, grow, and succeed together in ${data.industry}. ${data.businessDescription}`,
      ctaPrimary: 'Join Our Community',
      ctaSecondary: 'Explore Membership',
      aboutTitle: 'More Than Service - We\'re Your Growth Partners',
      aboutContent: `Success is better when shared. Our community brings together like-minded professionals who support each other's growth while benefiting from our comprehensive services and resources.`,
      features: [
        {
          title: 'Exclusive Community',
          description: 'Connect with industry professionals',
          benefit: 'Build valuable relationships and partnerships'
        },
        {
          title: 'Monthly Events',
          description: 'Networking and educational workshops',
          benefit: 'Stay ahead with latest insights and connections'
        },
        {
          title: 'Peer Support',
          description: 'Learn from others\' experiences',
          benefit: 'Accelerate growth through shared knowledge'
        }
      ],
      testimonials: [
        {
          name: 'Maria Gonzalez',
          company: 'Community First',
          quote: 'Being part of this community has been invaluable. The connections and insights have accelerated our growth.'
        },
        {
          name: 'James Anderson',
          company: 'Collaborative Solutions',
          quote: 'The support from both the team and community members is incredible. We\'re stronger together.'
        }
      ],
      finalCta: 'Become a Member',
      closingContent: 'Ready to be part of something bigger? Join a community that celebrates your success and supports your growth journey.'
    }
  };

  return contentVariations[templateId as keyof typeof contentVariations];
};

const generateEnhancedTemplate = (data: WebsiteData, businessType: string, templateId: number, baseStyles: string): Template => {
  const templateStyles = {
    1: { name: 'Authority Pro', accent: 'Trust & credibility focused' },
    2: { name: 'Solution Master', accent: 'Problem-solving approach' },
    3: { name: 'Transform Elite', accent: 'Transformation-focused' },
    4: { name: 'Premium Exclusive', accent: 'Luxury & exclusivity' },
    5: { name: 'Community Connect', accent: 'Community & belonging' }
  };

  const currentStyle = templateStyles[templateId as keyof typeof templateStyles];
  const content = generateContentStructure(data, businessType, templateId);
  
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
    <header class="header" id="header">
        <div class="container">
            <nav class="nav">
                <div class="logo">${data.businessName}</div>
                <ul class="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#testimonials">Reviews</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
                <div>
                    <a href="#contact" class="btn btn-primary">${content.ctaPrimary}</a>
                </div>
            </nav>
        </div>
    </header>

    <main>
        <!-- TOP SECTION: Hero with compelling headline and clear value proposition -->
        <section class="hero" id="home">
            <div class="container">
                <div class="hero-content fade-in">
                    <h1>${content.headline}</h1>
                    <p>${content.subheadline}</p>
                    <div class="hero-actions">
                        <a href="#contact" class="btn btn-primary">${content.ctaPrimary}</a>
                        <a href="#about" class="btn btn-secondary">${content.ctaSecondary}</a>
                    </div>
                    <div class="stats">
                        <div class="stat">
                            <span class="stat-number" data-target="500">0</span>
                            <div class="stat-label">Happy Clients</div>
                        </div>
                        <div class="stat">
                            <span class="stat-number" data-target="99">0</span>
                            <div class="stat-label">Success Rate</div>
                        </div>
                        <div class="stat">
                            <span class="stat-number" data-target="24">0</span>
                            <div class="stat-label">Hour Support</div>
                        </div>
                        <div class="stat">
                            <span class="stat-number" data-target="5">0</span>
                            <div class="stat-label">Years Experience</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- MIDDLE SECTION: Detailed about section with features and benefits -->
        <section class="section" id="about">
            <div class="container">
                <div class="section-header fade-in">
                    <h2 class="section-title">${content.aboutTitle}</h2>
                    <p class="section-description">${content.aboutContent}</p>
                </div>
                <div class="grid grid-3">
                    ${content.features.map((feature, index) => `
                        <div class="card fade-in" style="animation-delay: ${index * 0.2}s;">
                            <h3>${feature.title}</h3>
                            <p>${feature.description}</p>
                            <div style="color: var(--accent); font-weight: 600; font-size: 0.875rem; margin-bottom: 1rem;">
                                ✓ ${feature.benefit}
                            </div>
                            <a href="#contact" class="btn btn-primary">Learn More</a>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <!-- MIDDLE SECTION: Social proof with testimonials -->
        <section class="section section-alternate" id="testimonials">
            <div class="container">
                <div class="section-header fade-in">
                    <h2 class="section-title">What Our Clients Say</h2>
                    <p class="section-description">
                        Don't just take our word for it - hear from ${data.targetAudience} who have transformed their businesses
                    </p>
                </div>
                <div class="grid" style="grid-template-columns: 1fr; gap: 2rem;">
                    ${content.testimonials.map((testimonial, index) => `
                        <div class="testimonial fade-in" style="animation-delay: ${index * 0.3}s;">
                            <p class="testimonial-quote">${testimonial.quote}</p>
                            <div class="testimonial-author">${testimonial.name}</div>
                            <div class="testimonial-company">${testimonial.company}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <!-- BOTTOM SECTION: Strong closing CTA -->
        <section class="section cta-section" id="contact">
            <div class="container">
                <div class="cta-content fade-in">
                    <h2 class="section-title" style="color: var(--primary-foreground); margin-bottom: var(--spacing-6);">
                        Ready to Get Started?
                    </h2>
                    <p style="font-size: 1.25rem; margin-bottom: var(--spacing-8); max-width: 600px; margin-left: auto; margin-right: auto; opacity: 0.9;">
                        ${content.closingContent}
                    </p>
                    <div style="display: flex; gap: var(--spacing-4); justify-content: center; flex-wrap: wrap;">
                        <a href="#" class="btn" style="background: var(--primary-foreground); color: var(--primary); font-weight: 600;">
                            ${content.finalCta}
                        </a>
                        <a href="#" class="btn" style="background: transparent; color: var(--primary-foreground); border: 2px solid var(--primary-foreground);">
                            Contact Us
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Additional value section -->
        <section class="section">
            <div class="container">
                <div class="section-header fade-in">
                    <h2 class="section-title">Why Choose ${data.businessName}?</h2>
                    <p class="section-description">
                        We're committed to delivering exceptional results for ${data.targetAudience} in the ${data.industry} industry
                    </p>
                </div>
                <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem;">
                    <div class="card fade-in">
                        <h3>Industry Expertise</h3>
                        <p>Deep understanding of ${data.industry} challenges and opportunities</p>
                    </div>
                    <div class="card fade-in">
                        <h3>Proven Results</h3>
                        <p>Track record of success with businesses like yours</p>
                    </div>
                    <div class="card fade-in">
                        <h3>Personal Attention</h3>
                        <p>Dedicated support and customized solutions</p>
                    </div>
                    <div class="card fade-in">
                        <h3>Long-term Partnership</h3>
                        <p>Ongoing support to ensure continued success</p>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 ${data.businessName}. All rights reserved.</p>
            <p style="opacity: 0.8; margin-top: 0.5rem;">
                Professional ${data.industry.toLowerCase()} solutions for ${data.targetAudience}
            </p>
            <div style="margin-top: 1rem; display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap;">
                <a href="#" style="color: var(--primary-foreground); opacity: 0.8; text-decoration: none;">Privacy Policy</a>
                <a href="#" style="color: var(--primary-foreground); opacity: 0.8; text-decoration: none;">Terms of Service</a>
                <a href="#contact" style="color: var(--primary-foreground); opacity: 0.8; text-decoration: none;">Contact</a>
            </div>
        </div>
    </footer>

    <script>
        // Enhanced animations and interactions
        document.addEventListener('DOMContentLoaded', function() {
            // Smooth scrolling
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        const headerHeight = document.getElementById('header').offsetHeight;
                        const targetPosition = target.offsetTop - headerHeight;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // Animated counters
            function animateCounter(element) {
                const target = parseInt(element.getAttribute('data-target'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    element.textContent = Math.floor(current) + (target === 99 ? '%' : target === 24 ? '/7' : target === 5 ? '+' : '+');
                }, 16);
            }

            // Intersection Observer for animations
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        
                        // Animate counters when stats section is visible
                        if (entry.target.querySelector('.stat-number')) {
                            const counters = entry.target.querySelectorAll('.stat-number');
                            counters.forEach(counter => {
                                if (!counter.classList.contains('animated')) {
                                    counter.classList.add('animated');
                                    animateCounter(counter);
                                }
                            });
                        }
                    }
                });
            }, { threshold: 0.1 });

            // Observe all fade-in elements
            document.querySelectorAll('.fade-in').forEach(el => {
                observer.observe(el);
            });

            // Header scroll effect
            let lastScrollTop = 0;
            window.addEventListener('scroll', () => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const header = document.getElementById('header');
                
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
    </script>
</body>
</html>`;

  const js = `
// Enhanced interactions and animations
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

    // Advanced animation observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Counter animations
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    if (!counter.classList.contains('animated')) {
                        counter.classList.add('animated');
                        animateCounter(counter);
                    }
                });
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + (target === 99 ? '%' : target === 24 ? '/7' : target === 5 ? '+' : '+');
        }, 16);
    }
});`;

  return {
    id: templateId,
    name: `${currentStyle.name}`,
    description: `${currentStyle.accent} - Professionally designed with structured content sections`,
    preview: completeHTML,
    files: {
      'index.html': completeHTML,
      'styles.css': baseStyles,
      'script.js': js
    }
  };
};

export type { WebsiteData, Template };
