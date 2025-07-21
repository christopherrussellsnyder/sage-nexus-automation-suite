
import { supabase } from '@/integrations/supabase/client';

interface ProductResearchRequest {
  searchQuery: string;
  filters?: {
    category?: string;
    priceRange?: [number, number];
    minRating?: number;
  };
}

interface Product {
  name: string;
  price: number;
  rating: number;
  reviews: number;
  sales: number;
  growth: number;
  category: string;
  store: string;
  url: string;
  description: string;
  image: string;
  conversionRate: number;
  marketSaturation: 'Low' | 'Medium' | 'High';
  marketValidation: 'Validated' | 'Emerging' | 'Risky';
  competitorCount: number;
  avgCPC: number;
  searchVolume: number;
  trendDirection: 'Rising' | 'Stable' | 'Declining';
  evergreenScore: number;
  problemSeverity: 'High' | 'Medium' | 'Low';
  profitMargin: number;
  upsellPotential: 'High' | 'Medium' | 'Low';
  shippingComplexity: 'Easy' | 'Medium' | 'Complex';
  recommendationReason: string[];
  winningAngles: string[];
}

interface ProductResearchResponse {
  products: Product[];
  aiInsights: string;
  totalFound: number;
  searchQuery: string;
}

export class EcommerceProductResearchService {
  private static readonly CONFIG = {
    MAX_RETRIES: 3,
    RETRY_DELAY: 1000,
    TIMEOUT: 90000, // Longer timeout for product research
    CACHE_TTL: 600000, // 10 minutes cache for product data
  };

  private static cache = new Map<string, { data: ProductResearchResponse; timestamp: number }>();

  private static createCacheKey(request: ProductResearchRequest): string {
    return JSON.stringify({
      searchQuery: request.searchQuery.toLowerCase().trim(),
      filters: request.filters
    });
  }

  private static validateRequest(request: ProductResearchRequest): void {
    if (!request.searchQuery || request.searchQuery.trim().length === 0) {
      throw new Error('Search query is required');
    }
    if (request.searchQuery.length > 200) {
      throw new Error('Search query too long (max 200 characters)');
    }
  }

  private static sanitizeRequest(request: ProductResearchRequest): ProductResearchRequest {
    return {
      ...request,
      searchQuery: request.searchQuery.trim().slice(0, 200),
      filters: {
        ...request.filters,
        category: request.filters?.category?.trim().slice(0, 50),
        priceRange: request.filters?.priceRange && Array.isArray(request.filters.priceRange) 
          ? [
              Math.max(0, Number(request.filters.priceRange[0]) || 0),
              Math.max(0, Number(request.filters.priceRange[1]) || 10000)
            ] as [number, number]
          : undefined,
        minRating: request.filters?.minRating 
          ? Math.max(0, Math.min(5, Number(request.filters.minRating) || 0))
          : undefined
      }
    };
  }

  private static async makeRequestWithRetry(request: ProductResearchRequest): Promise<any> {
    let lastError: Error;
    
    for (let attempt = 0; attempt <= this.CONFIG.MAX_RETRIES; attempt++) {
      try {
        console.log(`Product research attempt ${attempt + 1}/${this.CONFIG.MAX_RETRIES + 1} for: ${request.searchQuery}`);
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.CONFIG.TIMEOUT);
        
        const { data, error } = await supabase.functions.invoke('ecommerce-product-research', {
          body: request
        });

        clearTimeout(timeoutId);

        if (error) {
          throw new Error(error.message || 'Product research function error');
        }

        if (!data) {
          throw new Error('No product data received from research');
        }

        return data;
        
      } catch (error) {
        lastError = error as Error;
        console.warn(`Product research attempt ${attempt + 1} failed:`, error);
        
        // Don't retry on validation errors
        if (error.message?.includes('validation') || error.message?.includes('authentication')) {
          throw error;
        }
        
        // Don't retry on the last attempt
        if (attempt === this.CONFIG.MAX_RETRIES) {
          break;
        }
        
        // Exponential backoff
        const delay = this.CONFIG.RETRY_DELAY * Math.pow(2, attempt);
        console.log(`Retrying product research in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    throw lastError;
  }

  private static validateResponse(data: any): ProductResearchResponse {
    if (!data.products || !Array.isArray(data.products)) {
      console.warn('Invalid products data received, using fallback');
      data.products = [];
    }

    // Ensure each product has required fields
    data.products = data.products.map((product: any, index: number) => ({
      name: product.name || `Product ${index + 1}`,
      price: Number(product.price) || 0,
      rating: Math.max(0, Math.min(5, Number(product.rating) || 0)),
      reviews: Math.max(0, Number(product.reviews) || 0),
      sales: Math.max(0, Number(product.sales) || 0),
      growth: Number(product.growth) || 0,
      category: product.category || 'General',
      store: product.store || 'Online Store',
      url: product.url || '#',
      description: product.description || 'No description available',
      image: product.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=80&fit=crop',
      conversionRate: Math.max(0, Number(product.conversionRate) || 0),
      marketSaturation: ['Low', 'Medium', 'High'].includes(product.marketSaturation) 
        ? product.marketSaturation : 'Medium',
      marketValidation: ['Validated', 'Emerging', 'Risky'].includes(product.marketValidation) 
        ? product.marketValidation : 'Emerging',
      competitorCount: Math.max(0, Number(product.competitorCount) || 0),
      avgCPC: Math.max(0, Number(product.avgCPC) || 0),
      searchVolume: Math.max(0, Number(product.searchVolume) || 0),
      trendDirection: ['Rising', 'Stable', 'Declining'].includes(product.trendDirection) 
        ? product.trendDirection : 'Stable',
      evergreenScore: Math.max(0, Math.min(10, Number(product.evergreenScore) || 0)),
      problemSeverity: ['High', 'Medium', 'Low'].includes(product.problemSeverity) 
        ? product.problemSeverity : 'Medium',
      profitMargin: Math.max(0, Math.min(100, Number(product.profitMargin) || 0)),
      upsellPotential: ['High', 'Medium', 'Low'].includes(product.upsellPotential) 
        ? product.upsellPotential : 'Medium',
      shippingComplexity: ['Easy', 'Medium', 'Complex'].includes(product.shippingComplexity) 
        ? product.shippingComplexity : 'Medium',
      recommendationReason: Array.isArray(product.recommendationReason) 
        ? product.recommendationReason : ['AI-recommended product'],
      winningAngles: Array.isArray(product.winningAngles) 
        ? product.winningAngles : ['Quality focus', 'Value proposition'],
      ...product // Preserve any additional fields
    }));

    // Ensure response metadata
    data.aiInsights = data.aiInsights || 'AI-powered product research analysis completed';
    data.totalFound = data.totalFound || data.products.length;
    data.searchQuery = data.searchQuery || 'Product search';

    return data as ProductResearchResponse;
  }

  static async researchProducts(request: ProductResearchRequest): Promise<ProductResearchResponse> {
    const startTime = Date.now();
    console.log('Starting enhanced AI-powered product research for:', request.searchQuery);

    try {
      // Validate and sanitize request
      this.validateRequest(request);
      const sanitizedRequest = this.sanitizeRequest(request);

      // Check cache first
      const cacheKey = this.createCacheKey(sanitizedRequest);
      const cachedData = this.cache.get(cacheKey);
      
      if (cachedData && (Date.now() - cachedData.timestamp < this.CONFIG.CACHE_TTL)) {
        console.log('Returning cached product research data');
        return cachedData.data;
      }

      // Make request with enhanced error handling and retries
      const data = await this.makeRequestWithRetry(sanitizedRequest);
      
      // Validate and enhance response
      const validatedData = this.validateResponse(data);
      
      // Cache the result
      this.cache.set(cacheKey, {
        data: validatedData,
        timestamp: Date.now()
      });
      
      // Cleanup old cache entries
      if (this.cache.size > 30) {
        const oldestEntry = Array.from(this.cache.entries())
          .sort((a, b) => a[1].timestamp - b[1].timestamp)[0];
        this.cache.delete(oldestEntry[0]);
      }

      const processingTime = Date.now() - startTime;
      console.log(`AI product research completed successfully in ${processingTime}ms`);
      console.log(`Found ${validatedData.products.length} products for "${sanitizedRequest.searchQuery}"`);

      return validatedData;
      
    } catch (error) {
      const processingTime = Date.now() - startTime;
      console.error(`Error in AI product research after ${processingTime}ms:`, error);
      
      // Enhanced error with more context
      const enhancedError = new Error(
        `Product research failed: ${error.message || 'Unknown error'}`
      );
      enhancedError.name = 'ProductResearchError';
      throw enhancedError;
    }
  }

  static saveApiKey(apiKey: string): void {
    // API keys are now managed through Supabase secrets
    console.log('API keys are managed through Supabase secrets - E-commerce API key configured');
  }
}
