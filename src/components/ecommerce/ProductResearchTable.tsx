
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
  TableRow,
} from '@/components/ui/table';
import { 
  Search, 
  ExternalLink, 
  TrendingUp, 
  Star,
  DollarSign,
  Eye,
  Filter,
  SortAsc,
  BarChart3
} from 'lucide-react';

interface Product {
  id: string;
  title: string;
  price: number;
  rating: number;
  reviews: number;
  growthRate: number;
  category: string;
  store: string;
  url: string;
  imageUrl: string;
  sales: number;
  conversionRate: number;
  adSpend: number;
  profitMargin: number;
}

interface ProductResearchTableProps {
  products: Product[];
  onViewProduct: (product: Product) => void;
  onResearchProduct: (product: Product) => void;
}

const ProductResearchTable = ({ products, onViewProduct, onResearchProduct }: ProductResearchTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'growth' | 'sales' | 'rating'>('growth');

  // Mock data for demonstration
  const mockProducts: Product[] = [
    {
      id: '1',
      title: 'Smart Fitness Tracker with Heart Rate Monitor',
      price: 89.99,
      rating: 4.7,
      reviews: 2456,
      growthRate: 187,
      category: 'Health & Fitness',
      store: 'FitTech Store',
      url: 'https://example.com/product1',
      imageUrl: '/placeholder-product.jpg',
      sales: 15420,
      conversionRate: 12.3,
      adSpend: 2850,
      profitMargin: 45
    },
    {
      id: '2',
      title: 'Eco-Friendly Bamboo Phone Case',
      price: 24.99,
      rating: 4.9,
      reviews: 1834,
      growthRate: 245,
      category: 'Phone Accessories',
      store: 'Green Tech',
      url: 'https://example.com/product2',
      imageUrl: '/placeholder-product.jpg',
      sales: 8920,
      conversionRate: 15.7,
      adSpend: 1200,
      profitMargin: 62
    },
    {
      id: '3',
      title: 'LED Strip Lights with App Control',
      price: 34.99,
      rating: 4.5,
      reviews: 3421,
      growthRate: 156,
      category: 'Home & Garden',
      store: 'Smart Home Plus',
      url: 'https://example.com/product3',
      imageUrl: '/placeholder-product.jpg',
      sales: 12350,
      conversionRate: 9.8,
      adSpend: 3400,
      profitMargin: 38
    },
    {
      id: '4',
      title: 'Wireless Charging Pad with Stand',
      price: 45.99,
      rating: 4.6,
      reviews: 1967,
      growthRate: 203,
      category: 'Electronics',
      store: 'Tech Innovators',
      url: 'https://example.com/product4',
      imageUrl: '/placeholder-product.jpg',
      sales: 9870,
      conversionRate: 11.2,
      adSpend: 2100,
      profitMargin: 51
    },
    {
      id: '5',
      title: 'Portable Coffee Grinder Manual',
      price: 67.99,
      rating: 4.8,
      reviews: 1456,
      growthRate: 178,
      category: 'Kitchen & Dining',
      store: 'Coffee Connoisseur',
      url: 'https://example.com/product5',
      imageUrl: '/placeholder-product.jpg',
      sales: 6540,
      conversionRate: 14.5,
      adSpend: 1800,
      profitMargin: 55
    }
  ];

  const displayProducts = products.length > 0 ? products : mockProducts;

  const filteredProducts = displayProducts
    .filter(product => 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'growth':
          return b.growthRate - a.growthRate;
        case 'sales':
          return b.sales - a.sales;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const getGrowthColor = (growth: number) => {
    if (growth >= 200) return 'text-green-600';
    if (growth >= 150) return 'text-blue-600';
    if (growth >= 100) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const getGrowthBadgeVariant = (growth: number) => {
    if (growth >= 200) return 'default';
    if (growth >= 150) return 'secondary';
    return 'outline';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Product Research Results</CardTitle>
            <CardDescription>
              Trending products from 1000+ Shopify stores, updated weekly
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm" onClick={() => {
              const nextSort = sortBy === 'growth' ? 'sales' : sortBy === 'sales' ? 'rating' : 'growth';
              setSortBy(nextSort);
            }}>
              <SortAsc className="h-4 w-4 mr-2" />
              Sort by {sortBy}
            </Button>
          </div>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search products or categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Growth</TableHead>
              <TableHead>Sales</TableHead>
              <TableHead>Metrics</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <BarChart3 className="h-6 w-6 text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{product.title}</p>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                      <p className="text-xs text-blue-600">{product.store}</p>
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
                    <span className="font-medium">{product.rating}</span>
                    <span className="text-xs text-muted-foreground">({product.reviews})</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getGrowthBadgeVariant(product.growthRate)}>
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +{product.growthRate}%
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="font-medium">{product.sales.toLocaleString()}</span>
                  <p className="text-xs text-muted-foreground">{product.conversionRate}% CVR</p>
                </TableCell>
                <TableCell>
                  <div className="text-xs space-y-1">
                    <div>Ad Spend: ${product.adSpend}</div>
                    <div>Margin: {product.profitMargin}%</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewProduct(product)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => onResearchProduct(product)}
                    >
                      <BarChart3 className="h-3 w-3 mr-1" />
                      Research
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No products found matching your search.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductResearchTable;
