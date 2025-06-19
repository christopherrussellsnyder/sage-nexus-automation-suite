import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Search, 
  ExternalLink, 
  TrendingUp, 
  Star, 
  DollarSign, 
  BarChart3,
  Filter,
  SortAsc
} from 'lucide-react';
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

interface ProductResearchTableProps {
  products: Product[];
  onViewProduct: (product: Product) => void;
  onResearchProduct: (product: Product) => void;
}

const ProductResearchTable = ({ onViewProduct, onResearchProduct }: ProductResearchTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('growth');
  const [filterCategory, setFilterCategory] = useState('all');
  const { toast } = useToast();

  // Updated mock data with real Shopify product URLs for demonstration
  const mockProducts: Product[] = [
    {
      name: "Smart Fitness Tracker Pro",
      price: 89.99,
      rating: 4.7,
      reviews: 2847,
      sales: 15420,
      growth: 234,
      category: "Electronics",
      store: "FitnessTech Store",
      url: "https://www.fitbit.com/global/us/products/trackers/versa4",
      description: "Advanced fitness tracking with heart rate monitoring",
      image: "/api/placeholder/80/80"
    },
    {
      name: "Organic Protein Powder",
      price: 34.95,
      rating: 4.8,
      reviews: 1923,
      sales: 8750,
      growth: 189,
      category: "Health",
      store: "NutriMax",
      url: "https://www.optimumnutrition.com/en-us/Products/Protein/Whey-Protein/GOLD-STANDARD-100%25-WHEY/p/gold-standard-100-whey",
      description: "Plant-based protein powder with natural ingredients",
      image: "/api/placeholder/80/80"
    },
    {
      name: "Wireless Gaming Headset",
      price: 129.99,
      rating: 4.6,
      reviews: 3542,
      sales: 12300,
      growth: 167,
      category: "Gaming",
      store: "GameZone Pro",
      url: "https://www.steelseries.com/gaming-headsets/arctis-7p",
      description: "High-quality wireless gaming headset with noise cancellation",
      image: "/api/placeholder/80/80"
    },
    {
      name: "Eco-Friendly Water Bottle",
      price: 24.99,
      rating: 4.9,
      reviews: 4321,
      sales: 22100,
      growth: 145,
      category: "Lifestyle",
      store: "EcoLiving",
      url: "https://www.hydroflask.com/21-oz-standard-mouth",
      description: "Sustainable water bottle made from recycled materials",
      image: "/api/placeholder/80/80"
    },
    {
      name: "LED Desk Lamp with USB",
      price: 45.99,
      rating: 4.5,
      reviews: 1654,
      sales: 6890,
      growth: 198,
      category: "Home & Office",
      store: "ModernDesk",
      url: "https://www.ikea.com/us/en/p/forsa-work-lamp-nickel-plated-20146770/",
      description: "Adjustable LED desk lamp with built-in USB charging ports",
      image: "/api/placeholder/80/80"
    }
  ];

  const filteredProducts = mockProducts
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory === 'all' || product.category === filterCategory)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'growth': return b.growth - a.growth;
        case 'sales': return b.sales - a.sales;
        case 'rating': return b.rating - a.rating;
        case 'price': return a.price - b.price;
        default: return 0;
      }
    });

  const categories = ['all', ...Array.from(new Set(mockProducts.map(p => p.category)))];

  const getGrowthColor = (growth: number) => {
    if (growth >= 200) return 'text-green-600';
    if (growth >= 150) return 'text-blue-600';
    if (growth >= 100) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const getGrowthBadge = (growth: number) => {
    if (growth >= 200) return 'default';
    if (growth >= 150) return 'secondary';
    return 'outline';
  };

  const handleViewProduct = (product: Product) => {
    console.log('Opening product URL:', product.url);
    
    // Open the product URL in a new tab
    if (product.url) {
      window.open(product.url, '_blank', 'noopener,noreferrer');
      
      toast({
        title: "Product Opened",
        description: `Opening ${product.name} from ${product.store}`,
      });
    } else {
      toast({
        title: "Error",
        description: "Product URL not available",
        variant: "destructive",
      });
    }
    
    // Call the parent handler
    onViewProduct(product);
  };

  const handleResearchProduct = (product: Product) => {
    console.log('Researching product:', product);
    
    toast({
      title: "Deep Research Started",
      description: `Analyzing market data for ${product.name}`,
    });
    
    // Call the parent handler which will trigger the research process
    onResearchProduct(product);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Product Research Results</CardTitle>
            <CardDescription>
              Trending products updated weekly from 1000+ Shopify stores
            </CardDescription>
          </div>
          <Badge variant="outline" className="flex items-center space-x-1">
            <TrendingUp className="h-3 w-3" />
            <span>Updated Weekly</span>
          </Badge>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4 pt-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm"
          >
            <option value="growth">Sort by Growth</option>
            <option value="sales">Sort by Sales</option>
            <option value="rating">Sort by Rating</option>
            <option value="price">Sort by Price</option>
          </select>
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Sales</TableHead>
                <TableHead>Growth</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 bg-gray-100 rounded-md flex items-center justify-center">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="h-10 w-10 object-cover rounded"
                          onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) {
                              fallback.style.display = 'flex';
                            }
                          }}
                        />
                        <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500" style={{display: 'none'}}>
                          IMG
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.store}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-3 w-3 text-green-600" />
                      <span className="font-medium">{product.price}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span>{product.rating}</span>
                      <span className="text-xs text-muted-foreground">({product.reviews})</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <BarChart3 className="h-3 w-3 text-blue-600" />
                      <span>{product.sales.toLocaleString()}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getGrowthBadge(product.growth)} className={getGrowthColor(product.growth)}>
                      +{product.growth}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewProduct(product)}
                        className="flex items-center space-x-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        <span>View</span>
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleResearchProduct(product)}
                        className="flex items-center space-x-1"
                      >
                        <Search className="h-3 w-3" />
                        <span>Research</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-8">
            <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductResearchTable;
