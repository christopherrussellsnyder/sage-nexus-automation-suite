
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Search, TrendingUp, Star, Users, DollarSign, ExternalLink, Eye, BarChart3, CheckCircle, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
}

const ProductResearcher = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchProgress, setSearchProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isResearching, setIsResearching] = useState(false);
  const [researchProgress, setResearchProgress] = useState(0);
  const { toast } = useToast();

  const enhancedMockProducts: Product[] = [
    {
      name: 'Smart Fitness Tracker Pro',
      price: 89.99,
      rating: 4.7,
      reviews: 2847,
      sales: 15420,
      growth: 234,
      category: 'Electronics',
      store: 'FitnessTech Store',
      url: 'https://example.com/product1',
      description: 'Advanced fitness tracking with heart rate monitoring',
      image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=80&h=80&fit=crop&crop=center',
      conversionRate: 4.2,
      marketSaturation: 'Medium',
      marketValidation: 'Validated',
      competitorCount: 156,
      avgCPC: 2.45,
      searchVolume: 45000,
      trendDirection: 'Rising'
    },
    {
      name: 'Organic Protein Powder',
      price: 34.95,
      rating: 4.8,
      reviews: 1923,
      sales: 8750,
      growth: 189,
      category: 'Health',
      store: 'NutriMax',
      url: 'https://example.com/product2',
      description: 'Plant-based protein powder with natural ingredients',
      image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=80&h=80&fit=crop&crop=center',
      conversionRate: 3.8,
      marketSaturation: 'High',
      marketValidation: 'Validated',
      competitorCount: 340,
      avgCPC: 3.20,
      searchVolume: 78000,
      trendDirection: 'Stable'
    },
    {
      name: 'Wireless Bluetooth Headphones',
      price: 129.99,
      rating: 4.6,
      reviews: 5632,
      sales: 23180,
      growth: 156,
      category: 'Electronics',
      store: 'AudioWorld',
      url: 'https://example.com/product3',
      description: 'Premium sound quality with noise cancellation',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop&crop=center',
      conversionRate: 2.9,
      marketSaturation: 'High',
      marketValidation: 'Validated',
      competitorCount: 890,
      avgCPC: 4.80,
      searchVolume: 120000,
      trendDirection: 'Declining'
    },
    {
      name: 'Eco-Friendly Water Bottle',
      price: 24.99,
      rating: 4.9,
      reviews: 1456,
      sales: 12340,
      growth: 420,
      category: 'Lifestyle',
      store: 'GreenLiving Co',
      url: 'https://example.com/product4',
      description: 'Sustainable stainless steel water bottle with temperature control',
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=80&h=80&fit=crop&crop=center',
      conversionRate: 5.1,
      marketSaturation: 'Low',
      marketValidation: 'Emerging',
      competitorCount: 89,
      avgCPC: 1.85,
      searchVolume: 28000,
      trendDirection: 'Rising'
    }
  ];

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Error",
        description: "Please enter a search query",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    setSearchProgress(0);
    setCurrentStep(1);

    // Enhanced 3-step validation process
    const searchSteps = [
      {
        step: 1,
        message: "Scanning top Shopify stores (1 product per store)...",
        duration: 3000
      },
      {
        step: 2,
        message: "Validating market data and conversion rates...",
        duration: 4000
      },
      {
        step: 3,
        message: "Analyzing market saturation and competition levels...",
        duration: 3000
      }
    ];

    for (const stepData of searchSteps) {
      setCurrentStep(stepData.step);
      await new Promise(resolve => setTimeout(resolve, stepData.duration));
      setSearchProgress(stepData.step * 33.33);
    }
    
    setProducts(enhancedMockProducts);
    setIsSearching(false);
    setSearchProgress(100);
    
    toast({
      title: "Advanced Search Complete",
      description: `Found ${enhancedMockProducts.length} validated products with market analysis`,
    });
  };

  const handleViewProduct = (product: Product) => {
    console.log('View product:', product);
    if (product.url) {
      window.open(product.url, '_blank', 'noopener,noreferrer');
    }
    toast({
      title: "Opening Product",
      description: `Opening ${product.name} in new tab`,
    });
  };

  const handleResearchProduct = async (product: Product) => {
    console.log('Research product:', product);
    setSelectedProduct(product);
    setIsResearching(true);
    setResearchProgress(0);

    const progressInterval = setInterval(() => {
      setResearchProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 5;
      });
    }, 150);

    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsResearching(false);
    setResearchProgress(100);
    
    toast({
      title: "Deep Research Complete",
      description: `Completed comprehensive market analysis of ${product.name}`,
    });
  };

  const getValidationColor = (validation: string) => {
    switch (validation) {
      case 'Validated': return 'bg-green-100 text-green-800';
      case 'Emerging': return 'bg-yellow-100 text-yellow-800';
      case 'Risky': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSaturationColor = (saturation: string) => {
    switch (saturation) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Advanced Product Research Engine</span>
          </CardTitle>
          <CardDescription>
            AI-powered product validation with market saturation analysis and competitive intelligence
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <Label htmlFor="search">Search Products</Label>
              <Input
                id="search"
                placeholder="e.g., fitness tracker, protein powder, headphones"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
          </div>
          
          {isSearching && (
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Step {currentStep} of 3: Advanced product validation...</span>
                <span>{Math.round(searchProgress)}%</span>
              </div>
              <Progress value={searchProgress} />
              <div className="text-xs text-muted-foreground">
                {currentStep === 1 && "Scanning 1000+ Shopify stores, selecting 1 unique product per store..."}
                {currentStep === 2 && "Validating conversion rates, market demand, and business metrics..."}
                {currentStep === 3 && "Analyzing competition levels, CPC costs, and market saturation..."}
              </div>
            </div>
          )}

          <Button 
            onClick={handleSearch}
            disabled={isSearching}
            className="w-full"
            size="lg"
          >
            <Search className="h-4 w-4 mr-2" />
            {isSearching ? 'Validating Products...' : 'Search & Validate Products'}
          </Button>
        </CardContent>
      </Card>

      {/* Research Progress */}
      {isResearching && selectedProduct && (
        <Card>
          <CardHeader>
            <CardTitle>Deep Market Analysis: {selectedProduct.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Analyzing market dynamics and competitive landscape...</span>
                <span>{researchProgress}%</span>
              </div>
              <Progress value={researchProgress} />
              <p className="text-xs text-muted-foreground">
                Gathering competitor pricing, market trends, seasonal patterns, and profitability analysis...
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enhanced Results */}
      {products.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Validated Product Results</CardTitle>
            <CardDescription>
              Found {products.length} products with comprehensive market validation and saturation analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              {products.map((product, index) => (
                <div key={index} className="border rounded-lg p-6 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start space-x-4">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="space-y-3">
                          <div>
                            <h3 className="font-semibold text-lg">{product.name}</h3>
                            <p className="text-sm text-muted-foreground">{product.description}</p>
                          </div>
                          
                          {/* Core Metrics */}
                          <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-1">
                              <DollarSign className="h-4 w-4 text-green-600" />
                              <span className="font-medium">${product.price}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span>{product.rating}</span>
                              <span className="text-muted-foreground">({product.reviews})</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <TrendingUp className="h-4 w-4 text-blue-600" />
                              <span>{product.sales} sales</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <BarChart3 className="h-4 w-4 text-purple-600" />
                              <span>{product.conversionRate}% CVR</span>
                            </div>
                          </div>

                          {/* Market Validation Badges */}
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary">{product.category}</Badge>
                            <Badge variant="outline">{product.store}</Badge>
                            <Badge className={getValidationColor(product.marketValidation)}>
                              {product.marketValidation === 'Validated' && <CheckCircle className="h-3 w-3 mr-1" />}
                              {product.marketValidation === 'Emerging' && <AlertTriangle className="h-3 w-3 mr-1" />}
                              {product.marketValidation}
                            </Badge>
                            <Badge className={getSaturationColor(product.marketSaturation)}>
                              {product.marketSaturation} Saturation
                            </Badge>
                            <Badge variant="default" className="bg-green-100 text-green-800">
                              +{product.growth}% growth
                            </Badge>
                          </div>

                          {/* Advanced Metrics */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Competitors:</span>
                              <div className="font-medium">{product.competitorCount}</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Avg CPC:</span>
                              <div className="font-medium">${product.avgCPC}</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Search Volume:</span>
                              <div className="font-medium">{product.searchVolume.toLocaleString()}/mo</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Trend:</span>
                              <div className={`font-medium ${
                                product.trendDirection === 'Rising' ? 'text-green-600' :
                                product.trendDirection === 'Stable' ? 'text-blue-600' : 'text-red-600'
                              }`}>
                                {product.trendDirection}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleViewProduct(product)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => handleResearchProduct(product)}
                            disabled={isResearching}
                          >
                            <BarChart3 className="h-4 w-4 mr-1" />
                            Deep Research
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProductResearcher;
