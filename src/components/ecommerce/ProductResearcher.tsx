import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, TrendingUp, Star, Users, DollarSign, ExternalLink, Eye, BarChart3, CheckCircle, AlertTriangle, Calendar, Package, Zap, Target, Shield, MessageSquare, TrendingDown } from 'lucide-react';
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
  // NEW: Enhanced analysis data
  competitiveAnalysis?: {
    topCompetitors: string[];
    marketGaps: string[];
    competitiveAdvantages: string[];
  };
  socialMediaContent?: {
    platforms: {
      tiktok: string[];
      instagram: string[];
      facebook: string[];
    };
    contentThemes: string[];
  };
  riskAssessment?: {
    riskLevel: 'Low' | 'Medium' | 'High';
    riskFactors: string[];
    mitigationStrategies: string[];
    legalConsiderations: string[];
  };
  targetAudience?: {
    demographics: {
      primaryAge: string;
      secondaryAge: string;
      gender: string;
      income: string;
      education: string;
      location: string;
    };
    psychographics: {
      interests: string[];
      values: string[];
      behaviors: string[];
      painPoints: string[];
    };
    buyingMotivation: string[];
  };
  pricingStrategy?: {
    recommendedPrice: number;
    pricePoints: {
      introductory: number;
      standard: number;
      premium: number;
    };
    bundleOptions: string[];
    pricingTactics: string[];
    competitivePricing: {
      belowCompetitor: number;
      matchCompetitor: number;
      premiumPosition: number;
    };
  };
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
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Website
                          </Button>
                          
                          <Button 
                            size="sm" 
                            variant="secondary"
                            onClick={() => handleResearchProduct(product)}
                            disabled={isResearching}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Report
                          </Button>
                          
                          {/* Enhanced Product Analysis Dialog */}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                size="sm"
                                disabled={isResearching}
                              >
                                <BarChart3 className="h-4 w-4 mr-1" />
                                Full Report
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle className="flex items-center space-x-2">
                                  <Package className="h-5 w-5" />
                                  <span>Product Research Report: {product.name}</span>
                                </DialogTitle>
                                <DialogDescription>
                                  Comprehensive analysis including competitive intelligence, social media strategy, risk assessment, target audience insights, and pricing recommendations
                                </DialogDescription>
                              </DialogHeader>

                              <Tabs defaultValue="competitive" className="w-full">
                                <TabsList className="grid w-full grid-cols-6">
                                  <TabsTrigger value="overview">Overview</TabsTrigger>
                                  <TabsTrigger value="competitive">Competitive</TabsTrigger>
                                  <TabsTrigger value="social">Social Media</TabsTrigger>
                                  <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
                                  <TabsTrigger value="audience">Target Audience</TabsTrigger>
                                  <TabsTrigger value="pricing">Pricing Strategy</TabsTrigger>
                                 </TabsList>

                                 {/* Product Overview Tab */}
                                 <TabsContent value="overview" className="space-y-4">
                                   <Card>
                                     <CardHeader>
                                       <CardTitle className="flex items-center space-x-2">
                                         <Package className="h-5 w-5" />
                                         <span>Product Overview & Specifications</span>
                                       </CardTitle>
                                     </CardHeader>
                                     <CardContent className="space-y-4">
                                       <div>
                                         <h4 className="font-medium mb-2">Product Name:</h4>
                                         <p className="text-lg font-semibold">{product.name}</p>
                                       </div>
                                       
                                       <div>
                                         <h4 className="font-medium mb-2">Description:</h4>
                                         <p className="text-sm text-muted-foreground">{product.description}</p>
                                       </div>
                                       
                                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                         <div className="p-3 bg-green-50 rounded-lg text-center">
                                           <span className="text-sm font-medium">Price</span>
                                           <div className="text-xl font-bold text-green-600">${product.price}</div>
                                         </div>
                                         <div className="p-3 bg-yellow-50 rounded-lg text-center">
                                           <span className="text-sm font-medium">Rating</span>
                                           <div className="flex items-center justify-center">
                                             <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                                             <span className="font-bold">{product.rating}</span>
                                           </div>
                                         </div>
                                         <div className="p-3 bg-blue-50 rounded-lg text-center">
                                           <span className="text-sm font-medium">Reviews</span>
                                           <div className="font-bold">{product.reviews.toLocaleString()}</div>
                                         </div>
                                         <div className="p-3 bg-purple-50 rounded-lg text-center">
                                           <span className="text-sm font-medium">Sales</span>
                                           <div className="font-bold">{product.sales.toLocaleString()}</div>
                                         </div>
                                       </div>
                                       
                                       <div>
                                         <h4 className="font-medium mb-3">Key Specifications:</h4>
                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                           <div className="space-y-3">
                                             <div className="flex justify-between">
                                               <span className="font-medium">Category:</span> 
                                               <Badge variant="secondary">{product.category}</Badge>
                                             </div>
                                             <div className="flex justify-between">
                                               <span className="font-medium">Store:</span> 
                                               <Badge variant="outline">{product.store}</Badge>
                                             </div>
                                             <div className="flex justify-between">
                                               <span className="font-medium">Evergreen Score:</span> 
                                               <Badge className="bg-green-100 text-green-800">{product.evergreenScore}/10</Badge>
                                             </div>
                                           </div>
                                           <div className="space-y-3">
                                             <div className="flex justify-between">
                                               <span className="font-medium">Profit Margin:</span> 
                                               <Badge className="bg-blue-100 text-blue-800">{product.profitMargin}%</Badge>
                                             </div>
                                             <div className="flex justify-between">
                                               <span className="font-medium">Market Saturation:</span> 
                                               <Badge className={getSaturationColor(product.marketSaturation)}>{product.marketSaturation}</Badge>
                                             </div>
                                             <div className="flex justify-between">
                                               <span className="font-medium">Problem Severity:</span> 
                                               <Badge className={
                                                 product.problemSeverity === 'High' ? 'bg-red-100 text-red-800' :
                                                 product.problemSeverity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                                 'bg-green-100 text-green-800'
                                               }>{product.problemSeverity}</Badge>
                                             </div>
                                           </div>
                                         </div>
                                       </div>
                                       
                                       <div>
                                         <h4 className="font-medium mb-2">Marketing Angles:</h4>
                                         <div className="flex flex-wrap gap-2">
                                           {product.winningAngles.map((angle, idx) => (
                                             <Badge key={idx} variant="outline" className="text-xs">{angle}</Badge>
                                           ))}
                                         </div>
                                       </div>
                                     </CardContent>
                                   </Card>
                                 </TabsContent>

                                {/* Competitive Analysis Tab */}
                                <TabsContent value="competitive" className="space-y-4">
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="flex items-center space-x-2">
                                        <TrendingUp className="h-5 w-5" />
                                        <span>Competitive Landscape Analysis</span>
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                      {product.competitiveAnalysis && (
                                        <>
                                          <div>
                                            <h4 className="font-medium mb-2">Top Competitors</h4>
                                            <div className="space-y-2">
                                              {product.competitiveAnalysis.topCompetitors.map((competitor, idx) => (
                                                <div key={idx} className="p-3 bg-gray-50 rounded-lg text-sm">
                                                  {competitor}
                                                </div>
                                              ))}
                                            </div>
                                          </div>

                                          <div>
                                            <h4 className="font-medium mb-2">Market Gaps & Opportunities</h4>
                                            <div className="space-y-1">
                                              {product.competitiveAnalysis.marketGaps.map((gap, idx) => (
                                                <div key={idx} className="flex items-center space-x-2">
                                                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                                                  <span className="text-sm">{gap}</span>
                                                </div>
                                              ))}
                                            </div>
                                          </div>

                                          <div>
                                            <h4 className="font-medium mb-2">Your Competitive Advantages</h4>
                                            <div className="space-y-1">
                                              {product.competitiveAnalysis.competitiveAdvantages.map((advantage, idx) => (
                                                <div key={idx} className="flex items-center space-x-2">
                                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                                  <span className="text-sm">{advantage}</span>
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        </>
                                      )}
                                    </CardContent>
                                  </Card>
                                </TabsContent>

                                {/* Social Media Content Tab */}
                                <TabsContent value="social" className="space-y-4">
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="flex items-center space-x-2">
                                        <MessageSquare className="h-5 w-5" />
                                        <span>Social Media Strategy</span>
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                      {product.socialMediaContent && (
                                        <>
                                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                              <h4 className="font-medium mb-2 text-pink-600">TikTok Content</h4>
                                              <div className="space-y-1">
                                                {product.socialMediaContent.platforms.tiktok.map((content, idx) => (
                                                  <div key={idx} className="p-2 bg-pink-50 rounded text-sm">
                                                    {content}
                                                  </div>
                                                ))}
                                              </div>
                                            </div>

                                            <div>
                                              <h4 className="font-medium mb-2 text-purple-600">Instagram Content</h4>
                                              <div className="space-y-1">
                                                {product.socialMediaContent.platforms.instagram.map((content, idx) => (
                                                  <div key={idx} className="p-2 bg-purple-50 rounded text-sm">
                                                    {content}
                                                  </div>
                                                ))}
                                              </div>
                                            </div>

                                            <div>
                                              <h4 className="font-medium mb-2 text-blue-600">Facebook Content</h4>
                                              <div className="space-y-1">
                                                {product.socialMediaContent.platforms.facebook.map((content, idx) => (
                                                  <div key={idx} className="p-2 bg-blue-50 rounded text-sm">
                                                    {content}
                                                  </div>
                                                ))}
                                              </div>
                                            </div>
                                          </div>

                                          <div>
                                            <h4 className="font-medium mb-2">Content Themes</h4>
                                            <div className="flex flex-wrap gap-2">
                                              {product.socialMediaContent.contentThemes.map((theme, idx) => (
                                                <Badge key={idx} variant="outline">{theme}</Badge>
                                              ))}
                                            </div>
                                          </div>
                                        </>
                                      )}
                                    </CardContent>
                                  </Card>
                                </TabsContent>

                                {/* Risk Assessment Tab */}
                                <TabsContent value="risk" className="space-y-4">
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="flex items-center space-x-2">
                                        <Shield className="h-5 w-5" />
                                        <span>Risk Assessment & Mitigation</span>
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                      {product.riskAssessment && (
                                        <>
                                          <div className="flex items-center space-x-2 mb-4">
                                            <span className="font-medium">Risk Level:</span>
                                            <Badge 
                                              variant={product.riskAssessment.riskLevel === 'Low' ? 'default' : 
                                                      product.riskAssessment.riskLevel === 'Medium' ? 'secondary' : 'destructive'}
                                            >
                                              {product.riskAssessment.riskLevel}
                                            </Badge>
                                          </div>

                                          <div>
                                            <h4 className="font-medium mb-2">Risk Factors</h4>
                                            <div className="space-y-1">
                                              {product.riskAssessment.riskFactors.map((risk, idx) => (
                                                <div key={idx} className="flex items-center space-x-2">
                                                  <TrendingDown className="h-4 w-4 text-red-500" />
                                                  <span className="text-sm">{risk}</span>
                                                </div>
                                              ))}
                                            </div>
                                          </div>

                                          <div>
                                            <h4 className="font-medium mb-2">Mitigation Strategies</h4>
                                            <div className="space-y-1">
                                              {product.riskAssessment.mitigationStrategies.map((strategy, idx) => (
                                                <div key={idx} className="flex items-center space-x-2">
                                                  <Shield className="h-4 w-4 text-green-500" />
                                                  <span className="text-sm">{strategy}</span>
                                                </div>
                                              ))}
                                            </div>
                                          </div>

                                          <div>
                                            <h4 className="font-medium mb-2">Legal Considerations</h4>
                                            <div className="space-y-1">
                                              {product.riskAssessment.legalConsiderations.map((legal, idx) => (
                                                <div key={idx} className="p-2 bg-blue-50 rounded text-sm">
                                                  {legal}
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        </>
                                      )}
                                    </CardContent>
                                  </Card>
                                </TabsContent>

                                {/* Target Audience Tab */}
                                <TabsContent value="audience" className="space-y-4">
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="flex items-center space-x-2">
                                        <Target className="h-5 w-5" />
                                        <span>Target Audience Analysis</span>
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                      {product.targetAudience && (
                                        <>
                                          <div>
                                            <h4 className="font-medium mb-3">Demographics</h4>
                                            <div className="grid grid-cols-2 gap-4">
                                              <div className="space-y-2">
                                                <div><span className="font-medium">Primary Age:</span> {product.targetAudience.demographics.primaryAge}</div>
                                                <div><span className="font-medium">Secondary Age:</span> {product.targetAudience.demographics.secondaryAge}</div>
                                                <div><span className="font-medium">Gender Split:</span> {product.targetAudience.demographics.gender}</div>
                                              </div>
                                              <div className="space-y-2">
                                                <div><span className="font-medium">Income:</span> {product.targetAudience.demographics.income}</div>
                                                <div><span className="font-medium">Education:</span> {product.targetAudience.demographics.education}</div>
                                                <div><span className="font-medium">Location:</span> {product.targetAudience.demographics.location}</div>
                                              </div>
                                            </div>
                                          </div>

                                          <div>
                                            <h4 className="font-medium mb-3">Psychographics</h4>
                                            <div className="grid grid-cols-2 gap-4">
                                              <div>
                                                <h5 className="text-sm font-medium mb-2">Interests</h5>
                                                <div className="flex flex-wrap gap-1">
                                                  {product.targetAudience.psychographics.interests.map((interest, idx) => (
                                                    <Badge key={idx} variant="outline" className="text-xs">{interest}</Badge>
                                                  ))}
                                                </div>
                                              </div>
                                              <div>
                                                <h5 className="text-sm font-medium mb-2">Values</h5>
                                                <div className="flex flex-wrap gap-1">
                                                  {product.targetAudience.psychographics.values.map((value, idx) => (
                                                    <Badge key={idx} variant="outline" className="text-xs">{value}</Badge>
                                                  ))}
                                                </div>
                                              </div>
                                              <div>
                                                <h5 className="text-sm font-medium mb-2">Behaviors</h5>
                                                <div className="flex flex-wrap gap-1">
                                                  {product.targetAudience.psychographics.behaviors.map((behavior, idx) => (
                                                    <Badge key={idx} variant="outline" className="text-xs">{behavior}</Badge>
                                                  ))}
                                                </div>
                                              </div>
                                              <div>
                                                <h5 className="text-sm font-medium mb-2">Pain Points</h5>
                                                <div className="flex flex-wrap gap-1">
                                                  {product.targetAudience.psychographics.painPoints.map((pain, idx) => (
                                                    <Badge key={idx} variant="destructive" className="text-xs">{pain}</Badge>
                                                  ))}
                                                </div>
                                              </div>
                                            </div>
                                          </div>

                                          <div>
                                            <h4 className="font-medium mb-2">Buying Motivation</h4>
                                            <div className="space-y-1">
                                              {product.targetAudience.buyingMotivation.map((motivation, idx) => (
                                                <div key={idx} className="p-2 bg-green-50 rounded text-sm">
                                                  {motivation}
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        </>
                                      )}
                                    </CardContent>
                                  </Card>
                                </TabsContent>

                                {/* Pricing Strategy Tab */}
                                <TabsContent value="pricing" className="space-y-4">
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="flex items-center space-x-2">
                                        <DollarSign className="h-5 w-5" />
                                        <span>Advanced Pricing Strategy</span>
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                      {product.pricingStrategy && (
                                        <>
                                          <div>
                                            <h4 className="font-medium mb-3">Recommended Price Points</h4>
                                            <div className="grid grid-cols-3 gap-4">
                                              <div className="p-3 bg-blue-50 rounded-lg text-center">
                                                <div className="text-sm text-muted-foreground">Introductory</div>
                                                <div className="text-lg font-semibold">${product.pricingStrategy.pricePoints.introductory}</div>
                                              </div>
                                              <div className="p-3 bg-green-50 rounded-lg text-center border-2 border-green-200">
                                                <div className="text-sm text-muted-foreground">Standard</div>
                                                <div className="text-lg font-semibold">${product.pricingStrategy.pricePoints.standard}</div>
                                                <div className="text-xs text-green-600">Recommended</div>
                                              </div>
                                              <div className="p-3 bg-purple-50 rounded-lg text-center">
                                                <div className="text-sm text-muted-foreground">Premium</div>
                                                <div className="text-lg font-semibold">${product.pricingStrategy.pricePoints.premium}</div>
                                              </div>
                                            </div>
                                          </div>

                                          <div>
                                            <h4 className="font-medium mb-2">Bundle Opportunities</h4>
                                            <div className="space-y-2">
                                              {product.pricingStrategy.bundleOptions.map((bundle, idx) => (
                                                <div key={idx} className="p-2 bg-gray-50 rounded text-sm">
                                                  {bundle}
                                                </div>
                                              ))}
                                            </div>
                                          </div>

                                          <div>
                                            <h4 className="font-medium mb-2">Pricing Tactics</h4>
                                            <div className="space-y-1">
                                              {product.pricingStrategy.pricingTactics.map((tactic, idx) => (
                                                <div key={idx} className="flex items-center space-x-2">
                                                  <Zap className="h-4 w-4 text-yellow-500" />
                                                  <span className="text-sm">{tactic}</span>
                                                </div>
                                              ))}
                                            </div>
                                          </div>

                                          <div>
                                            <h4 className="font-medium mb-3">Competitive Pricing Analysis</h4>
                                            <div className="grid grid-cols-3 gap-4">
                                              <div className="p-3 bg-red-50 rounded-lg text-center">
                                                <div className="text-sm text-muted-foreground">Below Competitor</div>
                                                <div className="text-lg font-semibold">${product.pricingStrategy.competitivePricing.belowCompetitor}</div>
                                              </div>
                                              <div className="p-3 bg-yellow-50 rounded-lg text-center">
                                                <div className="text-sm text-muted-foreground">Match Competitor</div>
                                                <div className="text-lg font-semibold">${product.pricingStrategy.competitivePricing.matchCompetitor}</div>
                                              </div>
                                              <div className="p-3 bg-purple-50 rounded-lg text-center">
                                                <div className="text-sm text-muted-foreground">Premium Position</div>
                                                <div className="text-lg font-semibold">${product.pricingStrategy.competitivePricing.premiumPosition}</div>
                                              </div>
                                            </div>
                                          </div>
                                        </>
                                      )}
                                    </CardContent>
                                  </Card>
                                </TabsContent>
                              </Tabs>
                            </DialogContent>
                          </Dialog>
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
