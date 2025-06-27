
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ProductCriteria {
  minStoreRevenue: number;
  maxStoreRevenue: number;
  minEvergreenScore: number;
  minProfitMargin: number;
  maxProducts: number;
  storeLimit: number;
}

interface StoreData {
  name: string;
  revenue: number;
  products: any[];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { criteria } = await req.json() as { criteria: ProductCriteria };
    
    console.log('Starting weekly product research with criteria:', criteria);
    
    // Simulate comprehensive product research process
    const researchResults = await performWeeklyResearch(criteria);
    
    return new Response(
      JSON.stringify(researchResults),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (error) {
    console.error('Weekly product research error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to perform weekly product research',
        details: error.message 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});

async function performWeeklyResearch(criteria: ProductCriteria) {
  // Step 1: Store Scanning (33% progress)
  console.log('Step 1: Scanning high-revenue Shopify stores...');
  const qualifiedStores = await scanHighRevenueStores(criteria);
  
  // Step 2: Market Validation (66% progress)
  console.log('Step 2: Validating evergreen potential and profit margins...');
  const validatedProducts = await validateMarketPotential(qualifiedStores, criteria);
  
  // Step 3: Business Viability (100% progress)
  console.log('Step 3: Analyzing winning angles and business viability...');
  const finalProducts = await analyzeBusinessViability(validatedProducts, criteria);
  
  return {
    products: finalProducts.slice(0, criteria.maxProducts),
    totalStoresScanned: qualifiedStores.length,
    timestamp: new Date().toISOString(),
    criteria: criteria
  };
}

async function scanHighRevenueStores(criteria: ProductCriteria) {
  // Simulate scanning stores with revenue between $300K-$2M
  const mockStores: StoreData[] = [
    {
      name: 'TechGadgets Pro',
      revenue: 1500000,
      products: generateMockProducts('electronics', 'TechGadgets Pro', 1500000)
    },
    {
      name: 'Wellness Essentials',
      revenue: 800000,
      products: generateMockProducts('health', 'Wellness Essentials', 800000)
    },
    {
      name: 'Home Innovations',
      revenue: 1200000,
      products: generateMockProducts('home', 'Home Innovations', 1200000)
    },
    {
      name: 'Fitness Forward',
      revenue: 600000,
      products: generateMockProducts('fitness', 'Fitness Forward', 600000)
    },
    {
      name: 'EcoLiving Store',
      revenue: 950000,
      products: generateMockProducts('lifestyle', 'EcoLiving Store', 950000)
    }
  ];
  
  return mockStores.filter(store => 
    store.revenue >= criteria.minStoreRevenue && 
    store.revenue <= criteria.maxStoreRevenue
  );
}

async function validateMarketPotential(stores: StoreData[], criteria: ProductCriteria) {
  const allProducts = stores.flatMap(store => 
    store.products.map(product => ({
      ...product,
      storeRevenue: store.revenue
    }))
  );
  
  // Filter by evergreen score and profit margin
  return allProducts.filter(product => 
    product.evergreenScore >= criteria.minEvergreenScore &&
    product.profitMargin >= criteria.minProfitMargin
  );
}

async function analyzeBusinessViability(products: any[], criteria: ProductCriteria) {
  // Add winning angles and business viability analysis
  return products.map(product => ({
    ...product,
    recommendationReason: generateRecommendationReasons(product),
    winningAngles: generateWinningAngles(product),
    lastUpdated: new Date().toISOString()
  }));
}

function generateMockProducts(category: string, storeName: string, storeRevenue: number) {
  const categoryProducts = {
    electronics: [
      {
        name: 'Smart Fitness Tracker Pro Max',
        price: 199.99,
        category: 'Electronics',
        description: 'Advanced fitness tracking with AI-powered health insights'
      },
      {
        name: 'Wireless Charging Station Hub',
        price: 89.99,
        category: 'Electronics', 
        description: 'Multi-device wireless charging with fast-charge technology'
      }
    ],
    health: [
      {
        name: 'Organic Superfood Protein Blend',
        price: 49.95,
        category: 'Health',
        description: 'Plant-based protein with 20+ superfoods and adaptogens'
      },
      {
        name: 'Sleep Optimization Supplement',
        price: 34.99,
        category: 'Health',
        description: 'Natural sleep aid with melatonin and calming herbs'
      }
    ],
    home: [
      {
        name: 'Smart Air Purifier Pro',
        price: 299.99,
        category: 'Home',
        description: 'HEPA filtration with app control and air quality monitoring'
      },
      {
        name: 'Ergonomic Standing Desk Converter',
        price: 179.99,
        category: 'Home',
        description: 'Height-adjustable desktop converter for healthy working'
      }
    ],
    fitness: [
      {
        name: 'Resistance Band Training System',
        price: 79.99,
        category: 'Fitness',
        description: 'Complete home gym with resistance bands and workout guide'
      },
      {
        name: 'Smart Water Bottle with Hydration Tracking',
        price: 59.99,
        category: 'Fitness',
        description: 'Tracks water intake with app integration and reminders'
      }
    ],
    lifestyle: [
      {
        name: 'Bamboo Travel Cutlery Set',
        price: 24.99,
        category: 'Lifestyle',
        description: 'Eco-friendly portable utensils with carrying case'
      },
      {
        name: 'Essential Oil Diffuser with Timer',
        price: 69.99,
        category: 'Lifestyle',
        description: 'Ultrasonic aromatherapy diffuser with mood lighting'
      }
    ]
  };

  const baseProducts = categoryProducts[category] || categoryProducts.electronics;
  
  return baseProducts.map((product, index) => ({
    ...product,
    rating: 4.3 + Math.random() * 0.6,
    reviews: Math.floor(1000 + Math.random() * 4000),
    sales: Math.floor(5000 + Math.random() * 20000),
    growth: Math.floor(120 + Math.random() * 300),
    store: storeName,
    url: `https://${storeName.toLowerCase().replace(/\s+/g, '')}.com`,
    productUrl: `https://${storeName.toLowerCase().replace(/\s+/g, '')}.com/products/${product.name.toLowerCase().replace(/\s+/g, '-')}`,
    image: `https://images.unsplash.com/photo-${1500000000000 + index}?w=200&h=200&fit=crop&crop=center`,
    conversionRate: 2.8 + Math.random() * 2.5,
    marketSaturation: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
    marketValidation: ['Validated', 'Emerging'][Math.floor(Math.random() * 2)],
    competitorCount: Math.floor(50 + Math.random() * 500),
    avgCPC: 1.5 + Math.random() * 4,
    searchVolume: Math.floor(20000 + Math.random() * 100000),
    trendDirection: ['Rising', 'Stable'][Math.floor(Math.random() * 2)],
    evergreenScore: 7.5 + Math.random() * 2.5,
    problemSeverity: ['High', 'Medium'][Math.floor(Math.random() * 2)],
    profitMargin: 45 + Math.random() * 30,
    upsellPotential: ['High', 'Medium'][Math.floor(Math.random() * 2)],
    shippingComplexity: ['Easy', 'Medium'][Math.floor(Math.random() * 2)]
  }));
}

function generateRecommendationReasons(product: any): string[] {
  const reasons = [
    `Evergreen score of ${product.evergreenScore.toFixed(1)}/10 indicates stable market`,
    `${product.profitMargin.toFixed(0)}% profit margin exceeds minimum requirements`,
    `Solves ${product.problemSeverity.toLowerCase()} severity problem with real demand`,
    `${product.shippingComplexity.toLowerCase()} shipping reduces fulfillment complexity`,
    `${product.upsellPotential.toLowerCase()} upsell potential increases customer value`
  ];
  
  if (product.marketSaturation === 'Low') {
    reasons.push('Low market saturation presents growth opportunity');
  }
  
  if (product.trendDirection === 'Rising') {
    reasons.push('Rising trend direction indicates growing market interest');
  }
  
  return reasons.slice(0, 5);
}

function generateWinningAngles(product: any): string[] {
  const angles = [
    'Problem-solution positioning with testimonials',
    'Before/after transformation stories',
    'Expert recommendation and endorsements',
    'Limited-time bundle offers with bonuses',
    'Social proof and customer success stories'
  ];
  
  if (product.category === 'Health') {
    angles.push('Health transformation case studies');
    angles.push('Medical professional endorsements');
  }
  
  if (product.category === 'Electronics') {
    angles.push('Tech innovation and feature comparisons');
    angles.push('Productivity enhancement messaging');
  }
  
  return angles.slice(0, 5);
}
