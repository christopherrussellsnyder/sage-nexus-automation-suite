
interface ProductResearchAPI {
  name: string;
  price: number;
  rating: number;
  reviews: number;
  sales: number;
  growth: number;
  category: string;
  store: string;
  storeRevenue: number;
  url: string;
  productUrl: string;
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
  lastUpdated: string;
}

interface WeeklyResearchData {
  products: ProductResearchAPI[];
  lastFetched: string;
  nextUpdate: string;
  totalStoresScanned: number;
  qualifiedProducts: number;
}

export class ProductResearchService {
  private static readonly STORAGE_KEY = 'weekly_product_research';
  private static readonly API_KEY_STORAGE = 'product_research_api_key';

  static saveApiKey(apiKey: string) {
    localStorage.setItem(this.API_KEY_STORAGE, apiKey);
  }

  static getApiKey(): string | null {
    return localStorage.getItem(this.API_KEY_STORAGE);
  }

  static getStoredResearch(): WeeklyResearchData | null {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  }

  static shouldFetchNewData(): boolean {
    const stored = this.getStoredResearch();
    if (!stored) return true;
    
    const lastFetch = new Date(stored.lastFetched);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    return lastFetch < weekAgo;
  }

  static async fetchWeeklyProducts(): Promise<WeeklyResearchData> {
    try {
      const response = await fetch('/api/weekly-product-research', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          criteria: {
            minStoreRevenue: 300000, // $300K
            maxStoreRevenue: 2000000, // $2M
            minEvergreenScore: 7.5,
            minProfitMargin: 45,
            maxProducts: 30,
            storeLimit: 1000
          }
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const researchData: WeeklyResearchData = {
        products: data.products,
        lastFetched: new Date().toISOString(),
        nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        totalStoresScanned: data.totalStoresScanned || 1000,
        qualifiedProducts: data.products.length
      };

      // Store the data locally
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(researchData));
      
      return researchData;
    } catch (error) {
      console.error('Weekly product research failed:', error);
      throw new Error(`Failed to fetch weekly products: ${error.message}`);
    }
  }

  static calculateRecommendationScore(product: ProductResearchAPI): number {
    const evergreenWeight = 0.25;
    const problemWeight = 0.20;
    const profitWeight = 0.20;
    const marketWeight = 0.15;
    const shippingWeight = 0.10;
    const upsellWeight = 0.10;

    const problemScore = product.problemSeverity === 'High' ? 10 : 
                        product.problemSeverity === 'Medium' ? 7 : 4;
    const marketScore = product.marketSaturation === 'Low' ? 10 : 
                       product.marketSaturation === 'Medium' ? 7 : 4;
    const shippingScore = product.shippingComplexity === 'Easy' ? 10 : 
                         product.shippingComplexity === 'Medium' ? 7 : 4;
    const upsellScore = product.upsellPotential === 'High' ? 10 : 
                       product.upsellPotential === 'Medium' ? 7 : 4;

    return (
      (product.evergreenScore * evergreenWeight) +
      (problemScore * problemWeight) +
      (product.profitMargin / 10 * profitWeight) +
      (marketScore * marketWeight) +
      (shippingScore * shippingWeight) +
      (upsellScore * upsellWeight)
    );
  }

  static async getQualifiedProducts(): Promise<ProductResearchAPI[]> {
    // Check if we need fresh data
    if (this.shouldFetchNewData()) {
      console.log('Fetching fresh weekly product data...');
      const freshData = await this.fetchWeeklyProducts();
      return freshData.products;
    }

    // Use stored data
    const stored = this.getStoredResearch();
    return stored?.products || [];
  }

  static getNextUpdateTime(): string | null {
    const stored = this.getStoredResearch();
    return stored?.nextUpdate || null;
  }

  static getLastUpdateTime(): string | null {
    const stored = this.getStoredResearch();
    return stored?.lastFetched || null;
  }
}
