
export interface EnhancedWebsiteData {
  businessName: string;
  businessType: string;
  businessDescription?: string;
  industry?: string;
  targetAudience?: string;
  logoUrl?: string;
  contactInfo?: {
    email: string;
    phone: string;
    address: string;
    website?: string;
    businessHours?: string;
  };
  products?: Array<{
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    imageUrl?: string;
    category: string;
    variations?: Array<{
      type: string;
      value: string;
    }>;
  }>;
  services?: Array<{
    id: string;
    name: string;
    description: string;
    price?: number;
    duration?: string;
  }>;
  reviews?: Array<{
    id: string;
    customerName: string;
    rating: number;
    comment: string;
    review?: string;
    avatar?: string;
    date?: string;
  }>;
  faqs?: Array<{
    id: string;
    question: string;
    answer: string;
  }>;
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  colors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  features?: string[];
  calendlyLink?: string;
  needsPrivacyPolicy?: boolean;
  needsTermsOfService?: boolean;
  needsRefundPolicy?: boolean;
  needsShippingPolicy?: boolean;
}

export interface EnhancedTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  files: Record<string, string>;
  responsive?: {
    desktop?: string;
    tablet?: string;
    mobile?: string;
  };
  features?: string[];
}

export const generateEnhancedWebsiteData = (prompt: string): EnhancedWebsiteData => {
  // Extract business information from prompt
  const businessName = extractBusinessName(prompt) || 'Your Business';
  const businessType = extractBusinessType(prompt) || 'business';
  
  return {
    businessName,
    businessType,
    businessDescription: prompt,
    contactInfo: {
      email: 'contact@yourbusiness.com',
      phone: '+1 (555) 123-4567',
      address: '123 Business St, City, State 12345',
      businessHours: 'Mon-Fri 9AM-5PM'
    },
    products: generateSampleProducts(businessType),
    services: generateSampleServices(businessType),
    reviews: generateSampleReviews(),
    faqs: generateSampleFAQs(businessType),
    socialMedia: {
      facebook: '#',
      twitter: '#',
      instagram: '#',
      linkedin: '#'
    },
    colors: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      accent: '#f59e0b'
    },
    features: ['responsive', 'seo-optimized', 'mobile-friendly'],
    needsPrivacyPolicy: true,
    needsTermsOfService: true,
    needsRefundPolicy: businessType === 'ecommerce',
    needsShippingPolicy: businessType === 'ecommerce'
  };
};

export const generateEnhancedTemplates = (websiteData: EnhancedWebsiteData): EnhancedTemplate[] => {
  return [
    {
      id: 'enhanced-modern',
      name: `${websiteData.businessName} - Modern Template`,
      description: `Professional ${websiteData.businessType} website with modern design`,
      preview: generateEnhancedPreview(websiteData, 'modern'),
      files: generateEnhancedFiles(websiteData, 'modern'),
      features: [
        'Responsive Design',
        'SEO Optimized',
        'Contact Integration',
        ...(websiteData.products?.length ? ['Product Showcase'] : []),
        ...(websiteData.services?.length ? ['Service Pages'] : []),
        ...(websiteData.reviews?.length ? ['Customer Reviews'] : [])
      ]
    },
    {
      id: 'enhanced-minimal',
      name: `${websiteData.businessName} - Minimal Template`,
      description: `Clean and minimal ${websiteData.businessType} website`,
      preview: generateEnhancedPreview(websiteData, 'minimal'),
      files: generateEnhancedFiles(websiteData, 'minimal'),
      features: [
        'Clean Design',
        'Fast Loading',
        'Mobile Optimized',
        'Business Focus'
      ]
    }
  ];
};

const extractBusinessName = (prompt: string): string | null => {
  // Simple extraction logic - in a real app, this would be more sophisticated
  const namePatterns = [
    /(?:company|business|store|shop|brand|name|called)(?:\s+is|\s+called|\s+named)?\s+([A-Z][a-zA-Z\s&]+)/i,
    /^([A-Z][a-zA-Z\s&]+)(?:\s+is|\s+will\s+be)/i
  ];
  
  for (const pattern of namePatterns) {
    const match = prompt.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  
  return null;
};

const extractBusinessType = (prompt: string): string => {
  const typeKeywords = {
    'ecommerce': ['shop', 'store', 'ecommerce', 'e-commerce', 'retail', 'sell', 'products'],
    'restaurant': ['restaurant', 'cafe', 'food', 'dining', 'menu'],
    'agency': ['agency', 'services', 'consulting', 'marketing', 'design'],
    'portfolio': ['portfolio', 'artist', 'photographer', 'designer', 'creative'],
    'blog': ['blog', 'magazine', 'news', 'articles', 'content'],
    'saas': ['saas', 'software', 'platform', 'app', 'tool'],
    'fitness': ['gym', 'fitness', 'workout', 'health', 'training'],
    'education': ['school', 'education', 'course', 'learning', 'teaching']
  };
  
  const lowerPrompt = prompt.toLowerCase();
  
  for (const [type, keywords] of Object.entries(typeKeywords)) {
    if (keywords.some(keyword => lowerPrompt.includes(keyword))) {
      return type;
    }
  }
  
  return 'business';
};

const generateSampleProducts = (businessType: string) => {
  const productTemplates = {
    'ecommerce': [
      { name: 'Premium Product', category: 'Featured', price: 99.99 },
      { name: 'Best Seller', category: 'Popular', price: 79.99 },
      { name: 'New Arrival', category: 'Latest', price: 129.99 }
    ],
    'restaurant': [
      { name: 'Signature Dish', category: 'Main Course', price: 24.99 },
      { name: 'Chef Special', category: 'Specials', price: 28.99 },
      { name: 'Popular Choice', category: 'Favorites', price: 19.99 }
    ],
    'fitness': [
      { name: 'Personal Training', category: 'Services', price: 75.00 },
      { name: 'Group Classes', category: 'Classes', price: 25.00 },
      { name: 'Nutrition Plan', category: 'Programs', price: 99.00 }
    ]
  };
  
  const templates = productTemplates[businessType as keyof typeof productTemplates] || productTemplates.ecommerce;
  
  return templates.map((template, index) => ({
    id: `product-${index + 1}`,
    name: template.name,
    price: template.price,
    description: `High-quality ${template.name.toLowerCase()} designed to meet your needs.`,
    image: '/placeholder.svg',
    imageUrl: '/placeholder.svg',
    category: template.category,
    variations: [
      { type: 'Size', value: 'Medium' },
      { type: 'Color', value: 'Blue' }
    ]
  }));
};

const generateSampleServices = (businessType: string) => {
  const serviceTemplates = {
    'agency': [
      { name: 'Web Design', description: 'Custom website design and development', duration: '2-4 weeks' },
      { name: 'Digital Marketing', description: 'Comprehensive marketing strategies', duration: '1-3 months' },
      { name: 'Branding', description: 'Complete brand identity solutions', duration: '3-6 weeks' }
    ],
    'consulting': [
      { name: 'Strategy Consulting', description: 'Business strategy and planning', duration: '4-8 weeks' },
      { name: 'Process Optimization', description: 'Improve operational efficiency', duration: '2-6 weeks' },
      { name: 'Growth Planning', description: 'Scale your business effectively', duration: '6-12 weeks' }
    ]
  };
  
  const templates = serviceTemplates[businessType as keyof typeof serviceTemplates] || serviceTemplates.agency;
  
  return templates.map((template, index) => ({
    id: `service-${index + 1}`,
    name: template.name,
    description: template.description,
    price: 299 + (index * 100),
    duration: template.duration
  }));
};

const generateSampleReviews = () => [
  {
    id: 'review-1',
    customerName: 'Sarah Johnson',
    rating: 5,
    comment: 'Excellent service and quality products. Highly recommend!',
    review: 'Excellent service and quality products. Highly recommend!',
    avatar: '/placeholder.svg',
    date: '2024-01-15'
  },
  {
    id: 'review-2',
    customerName: 'Mike Chen',
    rating: 5,
    comment: 'Outstanding experience from start to finish. Very professional.',
    review: 'Outstanding experience from start to finish. Very professional.',
    avatar: '/placeholder.svg',
    date: '2024-01-10'
  },
  {
    id: 'review-3',
    customerName: 'Emily Davis',
    rating: 4,
    comment: 'Great value for money and excellent customer support.',
    review: 'Great value for money and excellent customer support.',
    avatar: '/placeholder.svg',
    date: '2024-01-05'
  }
];

const generateSampleFAQs = (businessType: string) => [
  {
    id: 'faq-1',
    question: 'What are your business hours?',
    answer: 'We are open Monday through Friday from 9 AM to 5 PM.'
  },
  {
    id: 'faq-2',
    question: 'How can I contact you?',
    answer: 'You can reach us by phone, email, or through our contact form on this website.'
  },
  {
    id: 'faq-3',
    question: businessType === 'ecommerce' ? 'What is your return policy?' : 'Do you offer consultations?',
    answer: businessType === 'ecommerce' 
      ? 'We offer a 30-day return policy on all products in original condition.'
      : 'Yes, we offer free initial consultations to discuss your needs.'
  }
];

const generateEnhancedPreview = (websiteData: EnhancedWebsiteData, style: string): string => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${websiteData.businessName} - ${style.charAt(0).toUpperCase() + style.slice(1)} Template</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
        .header { background: #f8f9fa; padding: 1rem; text-align: center; }
        .content { padding: 2rem; max-width: 1200px; margin: 0 auto; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
        .card { background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    </style>
</head>
<body>
    <div class="header">
        <h1>${websiteData.businessName}</h1>
        <p>${websiteData.businessDescription || 'Welcome to our business'}</p>
    </div>
    <div class="content">
        <div class="grid">
            ${websiteData.products?.map(product => `
                <div class="card">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p><strong>$${product.price}</strong></p>
                </div>
            `).join('') || ''}
            ${websiteData.services?.map(service => `
                <div class="card">
                    <h3>${service.name}</h3>
                    <p>${service.description}</p>
                    <p><strong>$${service.price}</strong></p>
                </div>
            `).join('') || ''}
        </div>
    </div>
</body>
</html>`;
};

const generateEnhancedFiles = (websiteData: EnhancedWebsiteData, style: string): Record<string, string> => {
  return {
    'index.html': generateEnhancedPreview(websiteData, style),
    'styles.css': `/* ${style} styles for ${websiteData.businessName} */
body { font-family: Arial, sans-serif; }
.header { background: ${websiteData.colors?.primary || '#3b82f6'}; }`,
    'README.md': `# ${websiteData.businessName} - ${style} Template\n\nGenerated website template for ${websiteData.businessType} business.`
  };
};
