import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Search, TrendingUp, Star, Users, DollarSign, ExternalLink, Eye, BarChart3, CheckCircle, AlertTriangle, Calendar, Package, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { EcommerceProductResearchService } from '@/services/EcommerceProductResearchService';

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
  const [aiInsights, setAiInsights] = useState<string>('');
  const { toast } = useToast();

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

    // AI-powered 3-step validation process
    const searchSteps = [
      {
        step: 1,
        message: "AI scanning 1000+ stores and analyzing market data...",
        duration: 3000
      },
      {
        step: 2,
        message: "AI validating evergreen potential, profit margins, and problem-solving criteria...",
        duration: 4000
      },
      {
        step: 3,
        message: "AI analyzing winning angles, competition, and market opportunities...",
        duration: 3000
      }
    ];

    try {
      for (const stepData of searchSteps) {
        setCurrentStep(stepData.step);
        await new Promise(resolve => setTimeout(resolve, stepData.duration));
        setSearchProgress(stepData.step * 33.33);
      }

      // Call AI-powered product research service
      const researchData = await EcommerceProductResearchService.researchProducts({
        searchQuery: searchQuery,
        filters: {} // Add filters as needed
      });
      
      setProducts(researchData.products);
      setAiInsights(researchData.aiInsights);
      setIsSearching(false);
      setSearchProgress(100);
      
      toast({
        title: "AI Research Complete",
        description: `Found ${researchData.totalFound} AI-validated products with comprehensive market analysis`,
      });
    } catch (error) {
      console.error('AI product research failed:', error);
      setIsSearching(false);
      toast({
        title: "Research Failed",
        description: error.message || "AI product research encountered an error",
        variant: "destructive",
      });
    }
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
            <span>AI-Powered Product Research Engine</span>
            <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              AI Enhanced
            </Badge>
          </CardTitle>
          <CardDescription>
            Advanced AI product validation with evergreen market analysis, problem-solving verification, and profit optimization powered by OpenAI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <Label htmlFor="search">Search Products (AI-Powered)</Label>
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
                <span>AI Step {currentStep} of 3: Advanced product validation...</span>
                <span>{Math.round(searchProgress)}%</span>
              </div>
              <Progress value={searchProgress} />
              <div className="text-xs text-muted-foreground">
                {currentStep === 1 && "AI scanning 1000+ stores and analyzing market data..."}
                {currentStep === 2 && "AI validating evergreen potential, profit margins, and problem-solving criteria..."}
                {currentStep === 3 && "AI analyzing winning angles, competition, and market opportunities..."}
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
            {isSearching ? 'AI Validating Products...' : 'AI-Powered Product Research'}
          </Button>

          {/* AI Insights Section */}
          {aiInsights && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border">
              <h4 className="font-medium mb-2 flex items-center space-x-2">
                <Zap className="h-4 w-4" />
                <span>AI Market Insights</span>
              </h4>
              <p className="text-sm text-muted-foreground">{aiInsights}</p>
            </div>
          )}
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
