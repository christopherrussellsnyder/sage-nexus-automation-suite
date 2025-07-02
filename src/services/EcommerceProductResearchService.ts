
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
  static async researchProducts(request: ProductResearchRequest): Promise<ProductResearchResponse> {
    console.log('Starting AI-powered product research for:', request.searchQuery);

    try {
      // Call the Supabase Edge Function with e-commerce-specific API key
      const { data, error } = await supabase.functions.invoke('ecommerce-product-research', {
        body: request
      });

      if (error) {
        console.error('Product research error:', error);
        throw new Error(error.message || 'Failed to research products with AI');
      }

      if (!data) {
        throw new Error('No product data received from AI research');
      }

      console.log('AI product research completed successfully');
      return data as ProductResearchResponse;
    } catch (error) {
      console.error('Error in AI product research:', error);
      throw error;
    }
  }

  static saveApiKey(apiKey: string): void {
    // API keys are now handled at the service level for e-commerce research
    console.log('API keys are managed per feature - E-commerce API key configured');
  }
}
