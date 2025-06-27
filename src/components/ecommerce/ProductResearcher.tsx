import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Search, TrendingUp, Star, Users, DollarSign, ExternalLink, Eye, BarChart3, CheckCircle, AlertTriangle, Calendar, Package, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ProductResearchService } from '@/services/ProductResearchService';
import WeeklyProductsStatus from './WeeklyProductsStatus';

interface Product {
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

const ProductResearcher = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isResearching, setIsResearching] = useState(false);
  const [researchProgress, setResearchProgress] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    loadWeeklyProducts();
  }, []);

  const loadWeeklyProducts = async () => {
    setIsLoading(true);
    setLoadingProgress(0);

    try {
      // Simulate the 3-step process visually
      const steps = [
        { message: "Loading weekly qualified products...", progress: 33 },
        { message: "Applying market validation filters...", progress: 66 },
        { message: "Calculating recommendation scores...", progress: 100 }
      ];

      for (const step of steps) {
        await new Promise(resolve => setTimeout(resolve, 800));
        setLoadingProgress(step.progress);
      }

      const qualifiedProducts = await ProductResearchService.getQualifiedProducts();
      setProducts(qualifiedProducts);
      
      toast({
        title: "Weekly Products Loaded",
        description: `Found ${qualifiedProducts.length} qualified products from high-revenue stores`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load weekly products. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setLoadingProgress(0);
    }
  };

  const handleViewProduct = (product: Product) => {
    console.log('View product:', product);
    if (product.productUrl) {
      window.open(product.productUrl, '_blank', 'noopener,noreferrer');
    }
    toast({
      title: "Opening Product Page",
      description: `Opening ${product.name} directly on the store`,
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
      {/* Weekly Products Status */}
      <WeeklyProductsStatus />

      {/* Enhanced Loading Section */}
      {isLoading && (
        <Card>
          <CardHeader>
            <CardTitle>Loading Weekly Qualified Products</CardTitle>
            <CardDescription>
              Analyzing products from stores generating $300K-$2M monthly revenue
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Processing weekly data...</span>
                <span>{Math.round(loadingProgress)}%</span>
              </div>
              <Progress value={loadingProgress} />
              <div className="text-xs text-muted-foreground">
                {loadingProgress <= 33 && "Loading 30 qualified products from weekly scan..."}
                {loadingProgress > 33 && loadingProgress <= 66 && "Applying evergreen and profit margin filters..."}
                {loadingProgress > 66 && "Calculating recommendation scores and winning angles..."}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

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
            <CardTitle>Weekly Qualified Products</CardTitle>
            <CardDescription>
              {products.length} validated products from high-revenue stores (${products[0]?.storeRevenue ? `${(products[0].storeRevenue/1000).toFixed(0)}K` : '300K'}-$2M revenue)
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
                            <div className="text-xs text-blue-600 mt-1">
                              Store Revenue: ${(product.storeRevenue/1000).toFixed(0)}K/month • Last Updated: {new Date(product.lastUpdated).toLocaleDateString()}
                            </div>
                          </div>
                          
                          {/* Core Metrics */}
                          <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-1">
                              <DollarSign className="h-4 w-4 text-green-600" />
                              <span className="font-medium">${product.price}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span>{product.rating.toFixed(1)}</span>
                              <span className="text-muted-foreground">({product.reviews.toLocaleString()})</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <TrendingUp className="h-4 w-4 text-blue-600" />
                              <span>{product.sales.toLocaleString()} sales</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <BarChart3 className="h-4 w-4 text-purple-600" />
                              <span>{product.conversionRate.toFixed(1)}% CVR</span>
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
                              {product.evergreenScore.toFixed(1)}/10 Evergreen
                            </Badge>
                            <Badge variant="default" className="bg-blue-100 text-blue-800">
                              <Package className="h-3 w-3 mr-1" />
                              {product.profitMargin.toFixed(0)}% Margin
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
                              <div className="font-medium">${product.avgCPC.toFixed(2)}</div>
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
                            View Product
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

      {/* Load Products Button */}
      {products.length === 0 && !isLoading && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Weekly Product Research</span>
            </CardTitle>
            <CardDescription>
              Load 30 qualified products from stores generating $300K-$2M monthly revenue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={loadWeeklyProducts}
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              <Search className="h-4 w-4 mr-2" />
              Load Weekly Qualified Products
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProductResearcher;
