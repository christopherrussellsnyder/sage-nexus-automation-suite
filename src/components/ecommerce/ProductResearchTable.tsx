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

  // 30 products from growing stores with strong metrics and potential (1 per store)
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
    },
    {
      name: "Bamboo Phone Stand",
      price: 19.99,
      rating: 4.4,
      reviews: 892,
      sales: 4560,
      growth: 312,
      category: "Accessories",
      store: "EcoTech Solutions",
      url: "https://example.com/bamboo-stand",
      description: "Sustainable bamboo phone stand with adjustable angles",
      image: "/api/placeholder/80/80"
    },
    {
      name: "Resistance Band Set",
      price: 29.99,
      rating: 4.6,
      reviews: 2134,
      sales: 9876,
      growth: 278,
      category: "Fitness",
      store: "HomeFit Hub",
      url: "https://example.com/resistance-bands",
      description: "Complete resistance band workout kit with door anchor",
      image: "/api/placeholder/80/80"
    },
    {
      name: "Blue Light Blocking Glasses",
      price: 39.99,
      rating: 4.3,
      reviews: 1567,
      sales: 7432,
      growth: 201,
      category: "Health",
      store: "VisionCare Co",
      url: "https://example.com/blue-light-glasses",
      description: "Computer glasses to reduce eye strain and improve sleep",
      image: "/api/placeholder/80/80"
    },
    {
      name: "Portable Phone Charger",
      price: 49.99,
      rating: 4.7,
      reviews: 3421,
      sales: 18650,
      growth: 156,
      category: "Electronics",
      store: "PowerUp Tech",
      url: "https://example.com/portable-charger",
      description: "Fast-charging power bank with wireless charging capability",
      image: "/api/placeholder/80/80"
    },
    {
      name: "Essential Oil Diffuser",
      price: 59.99,
      rating: 4.8,
      reviews: 2876,
      sales: 11230,
      growth: 223,
      category: "Home & Garden",
      store: "Aromatherapy Plus",
      url: "https://example.com/oil-diffuser",
      description: "Ultrasonic aromatherapy diffuser with LED mood lighting",
      image: "/api/placeholder/80/80"
    },
    {
      name: "Yoga Mat with Alignment",
      price: 69.99,
      rating: 4.5,
      reviews: 1876,
      sales: 8943,
      growth: 189,
      category: "Fitness",
      store: "ZenFit Studio",
      url: "https://example.com/yoga-mat",
      description: "Non-slip yoga mat with body alignment guides",
      image: "/api/placeholder/80/80"
    },
    {
      name: "Coffee Grinder Manual",
      price: 79.99,
      rating: 4.6,
      reviews: 1432,
      sales: 5678,
      growth: 267,
      category: "Kitchen",
      store: "BrewMaster Co",
      url: "https://example.com/coffee-grinder",
      description: "Precision manual burr grinder for perfect coffee",
      image: "/api/placeholder/80/80"
    },
    {
      name: "Pet GPS Tracker",
      price: 99.99,
      rating: 4.4,
      reviews: 987,
      sales: 3456,
      growth: 345,
      category: "Pet Care",
      store: "PetSafe Innovations",
      url: "https://example.com/pet-tracker",
      description: "Real-time GPS tracking collar for dogs and cats",
      image: "/api/placeholder/80/80"
    },
    {
      name: "Skincare LED Mask",
      price: 149.99,
      rating: 4.2,
      reviews: 765,
      sales: 2341,
      growth: 398,
      category: "Beauty",
      store: "GlowSkin Beauty",
      url: "https://example.com/led-mask",
      description: "Professional LED light therapy mask for anti-aging",
      image: "/api/placeholder/80/80"
    },
    {
      name: "Smart Plant Monitor",
      price: 54.99,
      rating: 4.3,
      reviews: 1234,
      sales: 4567,
      growth: 234,
      category: "Home & Garden",
      store: "PlantCare Pro",
      url: "https://example.com/plant-monitor",
      description: "WiFi-enabled plant health monitoring system",
      image: "/api/placeholder/80/80"
    },
    {
      name: "Meal Prep Containers",
      price: 34.99,
      rating: 4.7,
      reviews: 2345,
      sales: 12456,
      growth: 178,
      category: "Kitchen",
      store: "MealPrep Masters",
      url: "https://example.com/meal-prep",
      description: "Glass meal prep containers with leak-proof lids",
      image: "/api/placeholder/80/80"
    },
    {
      name: "Posture Corrector",
      price: 29.99,
      rating: 4.1,
      reviews: 1876,
      sales: 8765,
      growth: 245,
      category: "Health",
      store: "PostureFix Co",
      url: "https://example.com/posture-corrector",
      description: "Adjustable back brace for improved posture",
      image: "/api/placeholder/80/80"
    },
    {
      name: "Wireless Car Charger",
      price: 39.99,
      rating: 4.5,
      reviews: 1543,
      sales: 7891,
      growth: 212,
      category: "Auto",
      store: "CarTech Solutions",
      url: "https://example.com/car-charger",
      description: "Fast wireless charging mount for smartphones",
      image: "/api/placeholder/80/80"
    },
    {
      name: "Sleep Tracking Ring",
      price: 199.99,
      rating: 4.6,
      reviews: 876,
      sales: 2134,
      growth: 456,
      category: "Electronics",
      store: "SleepTech Innovations",
      url: "https://example.com/sleep-ring",
      description: "Advanced sleep and activity tracking smart ring",
      image: "/api/placeholder/80/80"
    },
    {
      name: "Ceramic Hair Straightener",
      price: 79.99,
      rating: 4.4,
      reviews: 2109,
      sales: 9876,
      growth: 167,
      category: "Beauty",
      store: "StylePro Beauty",
      url: "https://example.com/hair-straightener",
      description: "Professional ceramic hair straightener with heat protection",
      image: "/api/placeholder/80/80"
    },
    {
      name: "Smart Doorbell Camera",
      price: 159.99,
      rating: 4.3,
      reviews: 1432,
      sales: 5678,
      growth: 289,
      category: "Home Security",
      store: "SecureHome Tech",
      url: "https://example.com/doorbell-camera",
      description: "WiFi video doorbell with motion detection",
      image: "/api/placeholder/80/80"
    },
    {
      name: "Ergonomic Mouse Pad",
      price: 24.99,
      rating: 4.2,
      reviews: 987,
      sales: 4321,
      growth: 198,
      category: "Office",
      store: "ErgoWork Solutions",
      url: "https://example.com/mouse-pad",
      description: "Memory foam wrist support mouse pad",
      image: "/api/placeholder/80/80"
    },
    {
      name: "Reusable Food Wraps",
      price: 19.99,
      rating: 4.6,
      reviews: 1765,
      sales: 8432,
      growth: 234,
      category: "Kitchen",
      store: "EcoKitchen Co",
      url: "https://example.com/food-wraps",
      description: "Beeswax food wraps as plastic alternative",
      image: "/api/placeholder/80/80"
    },
    {
      name: "Bluetooth Sleep Headphones",
      price: 49.99,
      rating: 4.4,
      reviews: 1234,
      sales: 6789,
      growth: 276,
      category: "Electronics",
      store: "SleepSound Audio",
      url: "https://example.com/sleep-headphones",
      description: "Ultra-thin wireless headphones for sleeping",
      image: "/api/placeholder/80/80"
    },
    {
      name: "Magnetic Phone Mount",
      price: 14.99,
      rating: 4.3,
      reviews: 2876,
      sales: 15432,
      growth: 189,
      category: "Auto",
      store: "DriveEasy Accessories",
      url: "https://example.com/phone-mount",
      description: "Strong magnetic car phone mount for dashboard",
      image: "/api/placeholder/80/80"
    },
    {
      name: "Compression Knee Sleeve",
      price: 19.99,
      rating: 4.5,
      reviews: 1543,
      sales: 7654,
      growth: 223,
      category: "Sports",
      store: "ActiveSupport Gear",
      url: "https://example.com/knee-sleeve",
      description: "Medical grade compression sleeve for knee support",
      image: "/api/placeholder/80/80"
    },
    {
      name: "Digital Kitchen Scale",
      price: 29.99,
      rating: 4.7,
      reviews: 2109,
      sales: 9876,
      growth: 178,
      category: "Kitchen",
      store: "PrecisionCook Tools",
      url: "https://example.com/kitchen-scale",
      description: "High-precision digital scale with app connectivity",
      image: "/api/placeholder/80/80"
    },
    {
      name: "Air Purifying Plants Kit",
      price: 39.99,
      rating: 4.6,
      reviews: 876,
      sales: 3456,
      growth: 312,
      category: "Home & Garden",
      store: "CleanAir Plants",
      url: "https://example.com/plants-kit",
      description: "Starter kit with 3 air-purifying plants and pots",
      image: "/api/placeholder/80/80"
    },
    {
      name: "Laptop Cooling Pad",
      price: 34.99,
      rating: 4.2,
      reviews: 1432,
      sales: 6789,
      growth: 234,
      category: "Electronics",
      store: "CoolTech Solutions",
      url: "https://example.com/cooling-pad",
      description: "RGB laptop cooling pad with adjustable fans",
      image: "/api/placeholder/80/80"
    },
    {
      name: "Silicone Baking Mats",
      price: 22.99,
      rating: 4.8,
      reviews: 1987,
      sales: 8765,
      growth: 198,
      category: "Kitchen",
      store: "BakeEasy Supplies",
      url: "https://example.com/baking-mats",
      description: "Non-stick silicone baking mats set of 3",
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
              30 trending products from growing stores with strong metrics and upside potential
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
