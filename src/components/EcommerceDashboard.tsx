
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  RefreshCw
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
          <p className="text-muted-foreground">AI-powered product research and optimization</p>
        </div>
      </div>

      {/* Product Research Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold">Product Research</h3>
            <p className="text-muted-foreground">Discover profitable products and analyze market trends</p>
          </div>
        </div>

        <ProductResearchTable 
          products={[]}
          onViewProduct={handleViewProduct}
          onResearchProduct={handleResearchProduct}
        />
      </div>
    </div>
  );
};

export default EcommerceDashboard;
