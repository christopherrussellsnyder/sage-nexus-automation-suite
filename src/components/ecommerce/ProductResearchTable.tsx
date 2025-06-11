import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, TrendingUp, Star, Eye, Download, ExternalLink, Filter, RefreshCw } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  store_name: string;
  store_url: string;
  trending_score: number;
  conversion_rate: number;
  rating: number;
  sales_velocity: string;
  week_discovered: string;
  image_url: string;
  product_url: string;
}

interface ProductResearchTableProps {
  products: Product[];
  onViewProduct: (product: Product) => void;
  onResearchProduct: (product: Product) => void;
}

const ProductResearchTable = ({ products, onViewProduct, onResearchProduct }: ProductResearchTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('trending_score');
  const [lastUpdated, setLastUpdated] = useState('');

  // Generate 30 trending products from different stores
  const generateTrendingProducts = (): Product[] => {
    const stores = [
      'TechGear Pro', 'EcoLife Store', 'FitnessPeak', 'HomeStyle Co', 'GadgetWorld',
      'NatureBoost', 'StyleHub', 'WellnessCore', 'SmartLiving', 'UrbanTrend',
      'HealthFirst', 'TechSavvy', 'GreenEarth', 'FashionForward', 'ActiveLife',
      'ModernHome', 'PurePlus', 'TrendyTech', 'VitalityShop', 'EliteGear',
      'FreshStart', 'PowerHouse', 'ZenSpace', 'InnovateTech', 'PureForm',
      'NextGen', 'VitalCore', 'SmartChoice', 'ProActive', 'PureLiving'
    ];

    const categories = ['Electronics', 'Health & Beauty', 'Home & Garden', 'Sports & Fitness', 'Fashion'];
    
    const productTemplates = [
      { name: 'Wireless Noise-Canceling Headphones', cat: 'Electronics', price: [89, 199] },
      { name: 'Smart Fitness Tracker Watch', cat: 'Electronics', price: [49, 149] },
      { name: 'Eco-Friendly Water Bottle', cat: 'Health & Beauty', price: [19, 39] },
      { name: 'LED Strip Lights Smart RGB', cat: 'Electronics', price: [24, 59] },
      { name: 'Portable Phone Charger 20000mAh', cat: 'Electronics', price: [19, 45] },
      { name: 'Premium Yoga Mat Non-Slip', cat: 'Sports & Fitness', price: [29, 69] },
      { name: 'Bluetooth Speaker Waterproof', cat: 'Electronics', price: [34, 89] },
      { name: 'Essential Oil Diffuser Ultrasonic', cat: 'Health & Beauty', price: [24, 54] },
      { name: 'Resistance Bands Set Heavy Duty', cat: 'Sports & Fitness', price: [15, 35] },
      { name: 'Smart Home Security Camera', cat: 'Electronics', price: [45, 129] },
      { name: 'Bamboo Cutting Board Set', cat: 'Home & Garden', price: [25, 55] },
      { name: 'Memory Foam Pillow Cervical', cat: 'Health & Beauty', price: [29, 79] },
      { name: 'Stainless Steel Travel Mug', cat: 'Home & Garden', price: [18, 38] },
      { name: 'Wireless Charging Pad Fast', cat: 'Electronics', price: [19, 49] },
      { name: 'Blue Light Blocking Glasses', cat: 'Health & Beauty', price: [15, 35] },
      { name: 'Adjustable Laptop Stand Ergonomic', cat: 'Electronics', price: [22, 52] },
      { name: 'Natural Skincare Serum Vitamin C', cat: 'Health & Beauty', price: [19, 49] },
      { name: 'Smart LED Bulbs Color Changing', cat: 'Home & Garden', price: [12, 32] },
      { name: 'Protein Powder Whey Isolate', cat: 'Health & Beauty', price: [35, 75] },
      { name: 'Wireless Gaming Mouse RGB', cat: 'Electronics', price: [25, 65] },
      { name: 'Ceramic Non-Stick Pan Set', cat: 'Home & Garden', price: [45, 125] },
      { name: 'Facial Cleansing Brush Sonic', cat: 'Health & Beauty', price: [19, 49] },
      { name: 'Adjustable Dumbbells Home Gym', cat: 'Sports & Fitness', price: [89, 249] },
      { name: 'Smart Thermostat WiFi Enabled', cat: 'Electronics', price: [99, 199] },
      { name: 'Organic Green Tea Detox', cat: 'Health & Beauty', price: [15, 35] },
      { name: 'Wireless Earbuds Pro Max', cat: 'Electronics', price: [59, 159] },
      { name: 'Air Purifier HEPA Filter', cat: 'Home & Garden', price: [79, 199] },
      { name: 'Compression Leggings High Waist', cat: 'Fashion', price: [19, 49] },
      { name: 'Smart Watch Fitness Tracker', cat: 'Electronics', price: [69, 189] },
      { name: 'Collagen Powder Beauty Boost', cat: 'Health & Beauty', price: [25, 65] }
    ];

    return productTemplates.map((template, index) => {
      const store = stores[index];
      const priceRange = template.price;
      const price = Math.round((Math.random() * (priceRange[1] - priceRange[0]) + priceRange[0]) * 100) / 100;
      
      return {
        id: `product-${index + 1}`,
        name: template.name,
        description: `Premium ${template.name.toLowerCase()} with advanced features and high-quality materials`,
        category: template.cat,
        price: price,
        store_name: store,
        store_url: `https://${store.toLowerCase().replace(/\s+/g, '')}.com`,
        product_url: `https://${store.toLowerCase().replace(/\s+/g, '')}.com/products/${template.name.toLowerCase().replace(/\s+/g, '-')}`,
        trending_score: Math.floor(Math.random() * 30) + 70, // 70-100
        conversion_rate: Math.round((Math.random() * 8 + 4) * 10) / 10, // 4-12%
        rating: Math.round((Math.random() * 1.5 + 3.5) * 10) / 10, // 3.5-5.0
        sales_velocity: `+${Math.floor(Math.random() * 200) + 50}%`,
        week_discovered: new Date().toISOString().split('T')[0],
        image_url: '/placeholder.svg'
      };
    }).sort((a, b) => b.trending_score - a.trending_score);
  };

  const [weeklyProducts, setWeeklyProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Generate products and set last updated date
    setWeeklyProducts(generateTrendingProducts());
    setLastUpdated(new Date().toLocaleDateString());
  }, []);

  const refreshData = () => {
    setWeeklyProducts(generateTrendingProducts());
    setLastUpdated(new Date().toLocaleDateString());
  };

  const productsToShow = products.length > 0 ? products : weeklyProducts;
  const categories = ['all', ...Array.from(new Set(productsToShow.map(p => p.category)))];
  const priceRanges = [
    { label: 'All Prices', value: 'all' },
    { label: 'Under $25', value: '0-25' },
    { label: '$25 - $50', value: '25-50' },
    { label: '$50 - $100', value: '50-100' },
    { label: 'Over $100', value: '100+' }
  ];

  const filteredProducts = productsToShow
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === 'all' || product.category === categoryFilter) &&
      (priceFilter === 'all' || 
        (priceFilter === '0-25' && product.price < 25) ||
        (priceFilter === '25-50' && product.price >= 25 && product.price < 50) ||
        (priceFilter === '50-100' && product.price >= 50 && product.price < 100) ||
        (priceFilter === '100+' && product.price >= 100)
      )
    )
    .sort((a, b) => {
      if (sortBy === 'trending_score') return b.trending_score - a.trending_score;
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'conversion_rate') return b.conversion_rate - a.conversion_rate;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  const getTrendingColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 80) return 'bg-blue-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  const handleViewProduct = (product: Product) => {
    window.open(product.product_url, '_blank');
    onViewProduct(product);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Weekly Trending Products</span>
            </CardTitle>
            <CardDescription>
              Top 30 performing products from different Shopify stores, updated weekly
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Last updated: {lastUpdated}</span>
            <Button variant="outline" size="sm" onClick={refreshData}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={priceFilter} onValueChange={setPriceFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              {priceRanges.map(range => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="trending_score">Trending Score</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="conversion_rate">Conversion Rate</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Store</TableHead>
                <TableHead>Trending</TableHead>
                <TableHead>Conversion</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
                        <span className="text-xs text-gray-500">IMG</span>
                      </div>
                      <div>
                        <div className="font-medium line-clamp-2">{product.name}</div>
                        <div className="text-sm text-muted-foreground line-clamp-1">
                          {product.description}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{product.category}</Badge>
                  </TableCell>
                  <TableCell className="font-semibold">${product.price}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm">{product.store_name}</span>
                      <ExternalLink className="h-3 w-3 text-muted-foreground" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${getTrendingColor(product.trending_score)}`} />
                      <span className="font-medium">{product.trending_score}</span>
                      <Badge variant="outline" className="text-green-600">
                        {product.sales_velocity}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-green-600">{product.conversion_rate}%</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{product.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewProduct(product)}
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => onResearchProduct(product)}
                      >
                        <Download className="h-3 w-3" />
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
            <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductResearchTable;
