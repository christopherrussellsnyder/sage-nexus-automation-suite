
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Search, TrendingUp, Star, Users, DollarSign, ExternalLink, Eye, BarChart3 } from 'lucide-react';
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
}

const ProductResearcher = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchProgress, setSearchProgress] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isResearching, setIsResearching] = useState(false);
  const [researchProgress, setResearchProgress] = useState(0);
  const { toast } = useToast();

  const mockProducts: Product[] = [
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
      image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=80&h=80&fit=crop&crop=center'
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
      image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=80&h=80&fit=crop&crop=center'
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
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop&crop=center'
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

    // Simulate search progress
    const progressInterval = setInterval(() => {
      setSearchProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setProducts(mockProducts);
    setIsSearching(false);
    setSearchProgress(100);
    
    toast({
      title: "Search Complete",
      description: `Found ${mockProducts.length} products`,
    });
  };

  const handleViewProduct = (product: Product) => {
    console.log('View product:', product);
    window.open(product.url, '_blank');
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

    // Simulate research progress
    const progressInterval = setInterval(() => {
      setResearchProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 5;
      });
    }, 150);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsResearching(false);
    setResearchProgress(100);
    
    toast({
      title: "Research Complete",
      description: `Completed detailed analysis of ${product.name}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Product Research Engine</span>
          </CardTitle>
          <CardDescription>
            Search and analyze products across multiple platforms for competitive intelligence
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
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Searching products...</span>
                <span>{searchProgress}%</span>
              </div>
              <Progress value={searchProgress} />
            </div>
          )}

          <Button 
            onClick={handleSearch}
            disabled={isSearching}
            className="w-full"
            size="lg"
          >
            <Search className="h-4 w-4 mr-2" />
            {isSearching ? 'Searching...' : 'Search Products'}
          </Button>
        </CardContent>
      </Card>

      {/* Research Progress */}
      {isResearching && selectedProduct && (
        <Card>
          <CardHeader>
            <CardTitle>Researching: {selectedProduct.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Analyzing product data...</span>
                <span>{researchProgress}%</span>
              </div>
              <Progress value={researchProgress} />
              <p className="text-xs text-muted-foreground">
                Gathering competitor data, price history, reviews, and market trends...
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {products.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
            <CardDescription>Found {products.length} products matching your search</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {products.map((product, index) => (
                <div key={index} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start space-x-4">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">{product.description}</p>
                          <div className="flex items-center space-x-4 mt-2">
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
                          </div>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="secondary">{product.category}</Badge>
                            <Badge variant="outline">{product.store}</Badge>
                            <Badge variant="default" className="bg-green-100 text-green-800">
                              +{product.growth}% growth
                            </Badge>
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
                            Research
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
