
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  TrendingUp, 
  BarChart3,
  RefreshCw,
  Star,
  DollarSign,
  ShoppingBag
} from "lucide-react";
import ProductResearchTable from './ecommerce/ProductResearchTable';

const EcommerceDashboard = () => {
  const handleViewProduct = (product: any) => {
    console.log('View product:', product);
  };

  const handleResearchProduct = (product: any) => {
    console.log('Research product:', product);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">E-commerce Suite</h2>
          <p className="text-muted-foreground">AI-powered product research and analysis</p>
        </div>
        <Button className="flex items-center space-x-2">
          <RefreshCw className="h-4 w-4" />
          <span>Refresh Data</span>
        </Button>
      </div>

      {/* Product Research Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Weekly Product Research</h3>
          <p className="text-muted-foreground">Top 30 trending products updated weekly from 1000+ Shopify stores</p>
        </div>
      </div>

      {/* Research Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-6 w-6 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">30</p>
                <p className="text-sm text-muted-foreground">Products Found</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-green-500" />
              <div>
                <p className="text-2xl font-bold">+156%</p>
                <p className="text-sm text-muted-foreground">Avg Growth</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="h-6 w-6 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">4.7</p>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-6 w-6 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">10.2%</p>
                <p className="text-sm text-muted-foreground">Avg Conversion</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Product Research Table */}
      <ProductResearchTable 
        products={[]}
        onViewProduct={handleViewProduct}
        onResearchProduct={handleResearchProduct}
      />
    </div>
  );
};

export default EcommerceDashboard;
