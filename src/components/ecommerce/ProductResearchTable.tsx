
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, TrendingUp, Star, Eye, Download, ExternalLink, Filter } from 'lucide-react';

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

  const sampleProducts: Product[] = [
    {
      id: '1',
      name: 'Smart Wireless Earbuds Pro Max',
      description: 'Premium wireless earbuds with active noise cancellation and 30-hour battery life',
      category: 'Electronics',
      price: 89.99,
      store_name: 'TechGear Store',
      store_url: 'https://techgear.example.com',
      trending_score: 95,
      conversion_rate: 12.4,
      rating: 4.8,
      sales_velocity: '+245%',
      week_discovered: '2024-01-08',
      image_url: '/placeholder.svg'
    },
    {
      id: '2',
      name: 'Eco-Friendly Bamboo Water Bottle',
      description: 'Sustainable bamboo water bottle with temperature control and leak-proof design',
      category: 'Lifestyle',
      price: 24.99,
      store_name: 'GreenLife Co',
      store_url: 'https://greenlife.example.com',
      trending_score: 88,
      conversion_rate: 9.8,
      rating: 4.6,
      sales_velocity: '+189%',
      week_discovered: '2024-01-08',
      image_url: '/placeholder.svg'
    },
    {
      id: '3',
      name: 'LED Strip Lights RGB Gaming Setup',
      description: 'Smart LED strip lights with app control, music sync, and gaming modes',
      category: 'Home Decor',
      price: 34.99,
      store_name: 'LightUp Home',
      store_url: 'https://lightup.example.com',
      trending_score: 82,
      conversion_rate: 11.2,
      rating: 4.7,
      sales_velocity: '+156%',
      week_discovered: '2024-01-08',
      image_url: '/placeholder.svg'
    },
    {
      id: '4',
      name: 'Portable Fast Charging Power Bank',
      description: '20000mAh portable charger with wireless charging and digital display',
      category: 'Electronics',
      price: 19.99,
      store_name: 'PowerTech',
      store_url: 'https://powertech.example.com',
      trending_score: 79,
      conversion_rate: 8.9,
      rating: 4.5,
      sales_velocity: '+134%',
      week_discovered: '2024-01-08',
      image_url: '/placeholder.svg'
    },
    {
      id: '5',
      name: 'Premium Yoga Mat with Alignment Lines',
      description: 'Non-slip yoga mat with alignment guides and eco-friendly materials',
      category: 'Fitness',
      price: 39.99,
      store_name: 'FitLife Studio',
      store_url: 'https://fitlife.example.com',
      trending_score: 76,
      conversion_rate: 10.6,
      rating: 4.9,
      sales_velocity: '+128%',
      week_discovered: '2024-01-08',
      image_url: '/placeholder.svg'
    }
  ];

  const productsToShow = products.length > 0 ? products : sampleProducts;
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5" />
          <span>Weekly Trending Products</span>
        </CardTitle>
        <CardDescription>
          Top performing products from 1000+ Shopify stores, updated weekly
        </CardDescription>
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
                        onClick={() => onViewProduct(product)}
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
