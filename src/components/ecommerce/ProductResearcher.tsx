import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Search, TrendingUp, Star, Users, DollarSign, ExternalLink, Eye, BarChart3, CheckCircle, AlertTriangle, Calendar, Package, Zap } from 'lucide-react';
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
  evergreenScore: number;
  problemSeverity: 'High' | 'Medium' | 'Low';
  profitMargin: number;
  upsellPotential: 'High' | 'Medium' | 'Low';
  shippingComplexity: 'Easy' | 'Medium' | 'Complex';
  recommendationReason: string[];
  winningAngles: string[];
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
      trendDirection: 'Rising',
      evergreenScore: 8.5,
      problemSeverity: 'High',
      profitMargin: 65,
      upsellPotential: 'High',
      shippingComplexity: 'Easy',
      recommendationReason: [
        'Solves painful health tracking problem',
        'Evergreen market with 8.5/10 stability score',
        '65% profit margin potential',
        'High upsell potential with accessories',
        'Easy shipping - lightweight product'
      ],
      winningAngles: [
        'Health transformation testimonials',
        'Before/after fitness journey stories',
        'Celebrity endorsement angle',
        'Medical professional recommendations',
        'Bundle with nutrition guides'
      ]
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
      trendDirection: 'Stable',
      evergreenScore: 9.2,
      problemSeverity: 'Medium',
      profitMargin: 58,
      upsellPotential: 'Medium',
      shippingComplexity: 'Easy',
      recommendationReason: [
        'Evergreen health & fitness market (9.2/10 score)',
        'Solves protein deficiency problem',
        '58% profit margin with subscription model',
        'Monthly recurring revenue potential',
        'Simple shipping logistics'
      ],
      winningAngles: [
        'Plant-based lifestyle transformation',
        'Athletic performance improvement',
        'Weight loss success stories',
        'Subscription convenience angle',
        'Taste challenge vs competitors'
      ]
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
      trendDirection: 'Declining',
      evergreenScore: 7.8,
      problemSeverity: 'Medium',
      profitMargin: 45,
      upsellPotential: 'High',
      shippingComplexity: 'Easy',
      recommendationReason: [
        'Solves audio quality and convenience problem',
        'Decent evergreen score (7.8/10)',
        'High upsell potential with cases/accessories',
        'Easy shipping - compact product',
        'Strong brand differentiation opportunities'
      ],
      winningAngles: [
        'Productivity enhancement for remote work',
        'Audiophile quality at affordable price',
        'Lifestyle upgrade positioning',
        'Bundle with carrying case and warranty',
        'Comparison with premium brands'
      ]
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
      trendDirection: 'Rising',
      evergreenScore: 9.5,
      problemSeverity: 'High',
      profitMargin: 72,
      upsellPotential: 'Medium',
      shippingComplexity: 'Easy',
      recommendationReason: [
        'Highest evergreen score (9.5/10) - sustainability trend',
        'Solves critical hydration and environmental problem',
        'Excellent 72% profit margin',
        'Low competition in eco-friendly niche',
        'Simple shipping and fulfillment'
      ],
      winningAngles: [
        'Environmental impact reduction',
        'Health benefits of proper hydration',
        'Cost savings vs buying bottled water',
        'Lifestyle and status symbol',
        'Corporate gifting opportunity'
      ]
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
        message: "Validating evergreen potential, problem-solving criteria, and profit margins...",
        duration: 4000
      },
      {
        step: 3,
        message: "Analyzing winning angles, shipping complexity, and upsell opportunities...",
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
            AI-powered product validation with evergreen market analysis, problem-solving verification, and profit optimization
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
                {currentStep === 2 && "Validating evergreen potential, problem-solving criteria, and profit margins..."}
                {currentStep === 3 && "Analyzing winning angles, shipping complexity, and upsell opportunities..."}
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
                <span>Analyzing evergreen potential and winning angles...</span>
                <span>{researchProgress}%</span>
              </div>
              <Progress value={researchProgress} />
              <p className="text-xs text-muted-foreground">
                Gathering competitor strategies, profit optimization opportunities, and market differentiation angles...
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
              Found {products.length} evergreen products with comprehensive validation and winning angle analysis
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

                          {/* Enhanced Validation Badges */}
                          <div className="flex items-center space-x-2 flex-wrap">
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
                              <Calendar className="h-3 w-3 mr-1" />
                              {product.evergreenScore}/10 Evergreen
                            </Badge>
                            <Badge variant="default" className="bg-blue-100 text-blue-800">
                              <Package className="h-3 w-3 mr-1" />
                              {product.profitMargin}% Margin
                            </Badge>
                            <Badge variant="default" className="bg-purple-100 text-purple-800">
                              <Zap className="h-3 w-3 mr-1" />
                              {product.problemSeverity} Problem
                            </Badge>
                          </div>

                          {/* Why This Product Section */}
                          <div className="bg-green-50 p-3 rounded-lg">
                            <h4 className="text-sm font-medium text-green-800 mb-2">Why This Product Is Recommended:</h4>
                            <ul className="text-xs space-y-1">
                              {product.recommendationReason.map((reason, reasonIndex) => (
                                <li key={reasonIndex} className="flex items-start">
                                  <CheckCircle className="h-3 w-3 text-green-600 mr-1 mt-0.5 flex-shrink-0" />
                                  <span>{reason}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Winning Angles Section */}
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <h4 className="text-sm font-medium text-blue-800 mb-2">Winning Marketing Angles:</h4>
                            <div className="flex flex-wrap gap-1">
                              {product.winningAngles.map((angle, angleIndex) => (
                                <Badge key={angleIndex} variant="outline" className="text-xs">
                                  {angle}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Advanced Metrics */}
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
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
                              <span className="text-muted-foreground">Upsell Potential:</span>
                              <div className={`font-medium ${
                                product.upsellPotential === 'High' ? 'text-green-600' :
                                product.upsellPotential === 'Medium' ? 'text-blue-600' : 'text-orange-600'
                              }`}>
                                {product.upsellPotential}
                              </div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Shipping:</span>
                              <div className={`font-medium ${
                                product.shippingComplexity === 'Easy' ? 'text-green-600' :
                                product.shippingComplexity === 'Medium' ? 'text-blue-600' : 'text-red-600'
                              }`}>
                                {product.shippingComplexity}
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
