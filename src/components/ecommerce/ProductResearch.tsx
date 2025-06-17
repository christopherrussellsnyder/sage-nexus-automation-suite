
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TrendingUp, DollarSign, Eye, ExternalLink, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  store: string;
  category: string;
  trend: 'up' | 'down' | 'stable';
  conversionRate: string;
  revenue: string;
  views: string;
}

const ProductResearch = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const { toast } = useToast();

  const sampleProducts: Product[] = [
    {
      id: '1',
      name: 'Wireless Noise-Canceling Headphones',
      price: '$89.99',
      imageUrl: '/placeholder.svg',
      store: 'TechGear Store',
      category: 'Electronics',
      trend: 'up',
      conversionRate: '8.5%',
      revenue: '$45K',
      views: '12.3K'
    },
    {
      id: '2',
      name: 'Eco-Friendly Water Bottle',
      price: '$24.99',
      imageUrl: '/placeholder.svg',
      store: 'Green Living',
      category: 'Lifestyle',
      trend: 'up',
      conversionRate: '12.2%',
      revenue: '$38K',
      views: '18.7K'
    },
    {
      id: '3',
      name: 'LED Strip Lights RGB',
      price: '$19.99',
      imageUrl: '/placeholder.svg',
      store: 'Home Decor Plus',
      category: 'Home & Garden',
      trend: 'stable',
      conversionRate: '6.8%',
      revenue: '$29K',
      views: '9.2K'
    },
    {
      id: '4',
      name: 'Portable Phone Charger',
      price: '$34.99',
      imageUrl: '/placeholder.svg',
      store: 'Mobile Accessories',
      category: 'Electronics',
      trend: 'up',
      conversionRate: '15.1%',
      revenue: '$52K',
      views: '21.4K'
    },
    {
      id: '5',
      name: 'Yoga Mat Premium',
      price: '$39.99',
      imageUrl: '/placeholder.svg',
      store: 'Fitness World',
      category: 'Sports & Fitness',
      trend: 'down',
      conversionRate: '4.3%',
      revenue: '$18K',
      views: '7.8K'
    }
  ];

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setProducts(sampleProducts);
      setLastUpdated(new Date().toLocaleDateString());
      setLoading(false);
      toast({
        title: "Products Updated",
        description: "Latest trending products have been loaded",
      });
    }, 2000);
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? '↗️' : trend === 'down' ? '↘️' : '➡️';
  };

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Weekly Product Research</span>
              </CardTitle>
              <CardDescription>
                Top 30 trending and highest converting products updated weekly
              </CardDescription>
            </div>
            <Button onClick={loadProducts} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Loading...' : 'Refresh'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {lastUpdated && (
            <div className="mb-4">
              <Badge variant="outline">Last updated: {lastUpdated}</Badge>
            </div>
          )}
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Store</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Trend</TableHead>
                  <TableHead>Conv. Rate</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={product.imageUrl} />
                          <AvatarFallback>{product.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{product.name}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{product.store}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{product.category}</Badge>
                    </TableCell>
                    <TableCell className="font-semibold">{product.price}</TableCell>
                    <TableCell>
                      <span className={`flex items-center space-x-1 ${getTrendColor(product.trend)}`}>
                        <span>{getTrendIcon(product.trend)}</span>
                        <span className="capitalize">{product.trend}</span>
                      </span>
                    </TableCell>
                    <TableCell className="text-green-600 font-medium">{product.conversionRate}</TableCell>
                    <TableCell className="font-medium">{product.revenue}</TableCell>
                    <TableCell>{product.views}</TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductResearch;
