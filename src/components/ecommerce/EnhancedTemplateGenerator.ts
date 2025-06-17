
export interface EnhancedWebsiteData {
  businessName: string;
  businessType: string;
  logoUrl?: string;
  contactInfo?: {
    email: string;
    phone: string;
    address: string;
    website?: string;
  };
  products?: Array<{
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
  }>;
  services?: Array<{
    id: string;
    name: string;
    description: string;
    price?: number;
  }>;
  reviews?: Array<{
    id: string;
    customerName: string;
    rating: number;
    comment: string;
    avatar?: string;
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
}

export const generateEnhancedWebsiteData = (prompt: string): EnhancedWebsiteData => {
  // Extract business information from prompt
  const businessName = extractBusinessName(prompt) || 'Your Business';
  const businessType = extractBusinessType(prompt) || 'business';
  
  return {
    businessName,
    businessType,
    contactInfo: {
      email: 'contact@yourbusiness.com',
      phone: '+1 (555) 123-4567',
      address: '123 Business St, City, State 12345'
    },
    products: generateSampleProducts(businessType),
    services: generateSampleServices(businessType),
    reviews: generateSampleReviews(),
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
    features: ['responsive', 'seo-optimized', 'mobile-friendly']
  };
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
    category: template.category
  }));
};

const generateSampleServices = (businessType: string) => {
  const serviceTemplates = {
    'agency': [
      { name: 'Web Design', description: 'Custom website design and development' },
      { name: 'Digital Marketing', description: 'Comprehensive marketing strategies' },
      { name: 'Branding', description: 'Complete brand identity solutions' }
    ],
    'consulting': [
      { name: 'Strategy Consulting', description: 'Business strategy and planning' },
      { name: 'Process Optimization', description: 'Improve operational efficiency' },
      { name: 'Growth Planning', description: 'Scale your business effectively' }
    ]
  };
  
  const templates = serviceTemplates[businessType as keyof typeof serviceTemplates] || serviceTemplates.agency;
  
  return templates.map((template, index) => ({
    id: `service-${index + 1}`,
    name: template.name,
    description: template.description,
    price: 299 + (index * 100)
  }));
};

const generateSampleReviews = () => [
  {
    id: 'review-1',
    customerName: 'Sarah Johnson',
    rating: 5,
    comment: 'Excellent service and quality products. Highly recommend!',
    avatar: '/placeholder.svg'
  },
  {
    id: 'review-2',
    customerName: 'Mike Chen',
    rating: 5,
    comment: 'Outstanding experience from start to finish. Very professional.',
    avatar: '/placeholder.svg'
  },
  {
    id: 'review-3',
    customerName: 'Emily Davis',
    rating: 4,
    comment: 'Great value for money and excellent customer support.',
    avatar: '/placeholder.svg'
  }
];
